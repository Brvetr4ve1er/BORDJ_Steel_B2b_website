/**
 * The contact route's input handling — every branch that answers before a
 * message is sent, and the one that sends it.
 *
 * WHY THIS FILE EXISTS. This route is the site's only delivery mechanism for an
 * enquiry. It replaced a `mailto:` link that looked like it worked and often
 * did nothing at all, and the page promises a reply within 24 hours. A
 * regression here is invisible from the outside: a 200 is exactly what a
 * swallowed message looks like, which is the failure the route was written to
 * end. So the assertions below are not only about status codes — on every path
 * that must not send, they also assert that nothing was sent.
 *
 * NO NETWORK, EVER. `fetch` is stubbed for the whole file and the API key is
 * synthetic, so no request leaves the process and no provider quota is spent.
 * The one test that exercises a successful send inspects the request the route
 * *would* have made.
 *
 * TIME IS FROZEN. The route reads `Date.now()` in three places — the rate
 * limiter's window, the minimum-fill-time check, and nothing else. Pinning it
 * makes the too-fast branch and the `Retry-After` header exact values rather
 * than ranges, and keeps the suite from depending on how fast the machine is.
 *
 * THE RATE LIMITER IS MODULE STATE. Its `Map` lives in the imported module and
 * therefore spans this whole file: a test that reused another's address would
 * inherit its count and fail depending on ordering. Every request here is given
 * its own address from a counter, and the one test that is *about* the limiter
 * sends its six requests from a single address of its own. The documentation
 * block in the route calls the `unidentified` bucket shared, which is why no
 * test omits the header.
 */
import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  type Mock,
  type MockInstance,
} from 'vitest';
import { POST } from '@/app/api/contact/route';
import { companyData } from '@/config/company-data';

/** Any fixed instant. Nothing in the route depends on which one. */
const NOW = Date.UTC(2026, 0, 15, 9, 30, 0);

/** Documented in the route: five per ten minutes, per address. */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_S = 600;

/** Documented in the route: the minimum plausible human fill time. */
const MIN_FILL_MS = 2500;

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/**
 * The shape of the one call the route makes. Narrower than `fetch`'s own
 * signature on purpose: it is what lets the assertions read `init.body` as a
 * string without a cast at every use.
 */
type SendFn = (
  url: string,
  init: { body?: string; headers?: Record<string, string> },
) => Promise<Response>;

let fetchMock: Mock<SendFn>;
let errorLog: MockInstance<typeof console.error>;

/**
 * A fresh address per request, from the documentation range reserved for
 * examples (RFC 5737), so no test can be poisoned by another's limiter count.
 * The route never parses the address — it is a Map key — so the counter is
 * free to run past 255 rather than wrapping into a collision.
 */
let addressSeq = 0;
const nextAddress = () => `203.0.113.${(addressSeq += 1)}`;

function post(body: unknown, address: string = nextAddress()): Promise<Response> {
  return POST(
    new Request('https://bordj-steel.com/api/contact', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-forwarded-for': address },
      body: typeof body === 'string' ? body : JSON.stringify(body),
    }),
  );
}

/** A submission that passes every check up to the configuration gate. */
const validBody = {
  name: 'Amine Belkacem',
  email: 'amine@exemple.dz',
  subject: 'Demande de devis',
  message: 'Bonjour, merci de me transmettre un devis pour une charpente.',
};

/** Both variables the route needs before it will attempt a send. */
function configure(): void {
  // Synthetic, and never used against the real API: `fetch` is stubbed.
  vi.stubEnv('RESEND_API_KEY', 're_test_key_not_a_real_credential');
  vi.stubEnv('CONTACT_FROM', 'site@exemple.dz');
}

beforeEach(() => {
  vi.spyOn(Date, 'now').mockReturnValue(NOW);
  fetchMock = vi.fn<SendFn>(() => Promise.resolve(new Response('{}', { status: 200 })));
  vi.stubGlobal('fetch', fetchMock);
  // The route logs on every failure path by design ("fails loudly"). Silencing
  // it keeps the expected logs out of the reporter without hiding the calls —
  // the spy still records them, which is what the 503 and 502 tests assert on.
  errorLog = vi.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('contact route — spam traps answer 200 and send nothing', () => {
  it('a filled honeypot is accepted and discarded', async () => {
    // 200, not 400: a bot that learns which field gave it away fills in the
    // next one. The response must be indistinguishable from a real success.
    const res = await post({ ...validBody, company: 'Acme Corp' });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('a submission faster than a human could type is accepted and discarded', async () => {
    const res = await post({ ...validBody, startedAt: NOW - (MIN_FILL_MS - 1) });

    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ ok: true });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('a submission at exactly the minimum fill time is not treated as a bot', async () => {
    // The boundary, because `<` and `<=` are one character apart and the wrong
    // one silently drops a real enquiry that happened to be typed quickly.
    configure();
    const res = await post({ ...validBody, startedAt: NOW - MIN_FILL_MS });

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('a missing startedAt is not treated as too fast', async () => {
    // `startedAt` comes from the client, so it can be absent. Defaulting to 0
    // must mean "unknown", not "instant".
    configure();
    const res = await post(validBody);

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe('contact route — invalid input answers 400 and sends nothing', () => {
  it('a body that is not JSON', async () => {
    const res = await post('{ not json');

    expect(res.status).toBe(400);
    expect(await res.json()).toEqual({ error: 'Requête invalide.' });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  const cases: Array<[string, Record<string, unknown>]> = [
    ['no name', { email: 'a@exemple.dz', message: 'Bonjour.' }],
    ['no email', { name: 'Amine', message: 'Bonjour.' }],
    ['no message', { name: 'Amine', email: 'a@exemple.dz' }],
    ['a blank name', { name: '   ', email: 'a@exemple.dz', message: 'Bonjour.' }],
    ['an email with no @', { name: 'Amine', email: 'amine.exemple.dz', message: 'Bonjour.' }],
    ['an email with no domain dot', { name: 'Amine', email: 'amine@exemple', message: 'Bonjour.' }],
    ['an email with a space', { name: 'Amine', email: 'am ine@exemple.dz', message: 'Bonjour.' }],
    ['a non-string name', { name: 42, email: 'a@exemple.dz', message: 'Bonjour.' }],
    // The 5 000-character cap. A message past it is rejected rather than
    // truncated: half an enquiry delivered as though it were whole is worse
    // than a visitor being told to shorten it.
    ['an over-long message', { name: 'Amine', email: 'a@exemple.dz', message: 'x'.repeat(5001) }],
  ];

  it.each(cases)('rejects %s', async (_label, body) => {
    const res = await post(body);

    expect(res.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('accepts a message of exactly the maximum length', async () => {
    configure();
    const res = await post({ ...validBody, message: 'x'.repeat(5000) });

    expect(res.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe('contact route — an unconfigured deployment answers 503', () => {
  it('reports unavailable rather than faking success when the API key is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', '');
    vi.stubEnv('CONTACT_FROM', 'site@exemple.dz');

    const res = await post(validBody);

    // The whole point of the route: it never returns success for a message it
    // did not send. That was the exact failure of the mailto version.
    expect(res.status).toBe(503);
    expect(await res.json()).toEqual({ error: 'Le formulaire est momentanément indisponible.' });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(errorLog).toHaveBeenCalled();
  });

  it('reports unavailable when the sender address is missing', async () => {
    vi.stubEnv('RESEND_API_KEY', 're_test_key_not_a_real_credential');
    vi.stubEnv('CONTACT_FROM', '');

    const res = await post(validBody);

    expect(res.status).toBe(503);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('contact route — the rate limiter', () => {
  it('lets five through from one address and holds the sixth', async () => {
    configure();
    // One address of its own, so this test neither inherits nor leaves a count
    // that another test could trip over.
    const address = '198.51.100.7';

    for (let i = 0; i < RATE_LIMIT_MAX; i += 1) {
      const res = await post(validBody, address);
      expect(res.status, `submission ${i + 1} of ${RATE_LIMIT_MAX} should pass`).toBe(200);
    }

    const blocked = await post(validBody, address);
    expect(blocked.status).toBe(429);
    // Exact, because the clock is frozen: the whole ten-minute window is left.
    expect(blocked.headers.get('Retry-After')).toBe(String(RATE_LIMIT_WINDOW_S));
    expect(fetchMock).toHaveBeenCalledTimes(RATE_LIMIT_MAX);
  });

  it('counts per address, so one sender cannot block another', async () => {
    configure();
    const noisy = '198.51.100.8';
    for (let i = 0; i < RATE_LIMIT_MAX + 1; i += 1) await post(validBody, noisy);

    const other = await post(validBody, '198.51.100.9');
    expect(other.status).toBe(200);
  });

  it('counts a trapped submission too, but still tells it nothing', async () => {
    // The limit is applied above the body — see ORDER OF THE CHECKS in the
    // route — so a bot cannot get unlimited free 200s out of the honeypot.
    const address = '198.51.100.10';
    for (let i = 0; i < RATE_LIMIT_MAX; i += 1) {
      const res = await post({ ...validBody, company: 'Acme Corp' }, address);
      expect(res.status).toBe(200);
    }

    const blocked = await post({ ...validBody, company: 'Acme Corp' }, address);
    expect(blocked.status).toBe(429);
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe('contact route — the send itself', () => {
  function sentPayload(): Record<string, unknown> {
    const call = fetchMock.mock.calls[0];
    if (!call) throw new Error('the route made no request');
    const [url, init] = call;
    expect(url).toBe(RESEND_ENDPOINT);
    return JSON.parse(init.body ?? '{}') as Record<string, unknown>;
  }

  it('addresses the message to the address the contact page itself shows', async () => {
    configure();
    const res = await post(validBody);
    expect(res.status).toBe(200);

    const payload = sentPayload();
    // Destination comes from config precisely so the address a visitor reads
    // and the address a message reaches cannot drift apart.
    expect(payload.to).toEqual([companyData.pages.contact.content.emails[0]]);
    // The whole point of the route: hitting reply answers the visitor.
    expect(payload.reply_to).toBe(validBody.email);
  });

  it('keeps an injected newline out of the subject line', async () => {
    configure();
    await post({
      ...validBody,
      subject: 'Devis\r\nBcc: ailleurs@exemple.dz',
    });

    const subject = String(sentPayload().subject);
    expect(subject).not.toMatch(/[\r\n]/);
    expect(subject).toContain('Devis');
  });

  it('escapes the visitor copy in the HTML part', async () => {
    configure();
    await post({ ...validBody, message: 'Voir <script>alert(1)</script> ci-joint.' });

    const payload = sentPayload();
    expect(String(payload.html)).not.toContain('<script>');
    expect(String(payload.html)).toContain('&lt;script&gt;');
    // The plain-text part carries the message verbatim, which is correct: it is
    // never parsed as markup.
    expect(String(payload.text)).toContain('<script>');
  });

  it('answers 502 when the provider rejects the send', async () => {
    configure();
    fetchMock.mockResolvedValueOnce(new Response('{"message":"domain not verified"}', { status: 422 }));

    const res = await post(validBody);

    expect(res.status).toBe(502);
    // Never echo the provider body to the visitor: it can carry key details.
    expect(await res.json()).toEqual({
      error: "L'envoi a échoué. Merci de réessayer ou de nous écrire directement.",
    });
  });

  it('answers 502 when the provider is unreachable', async () => {
    configure();
    fetchMock.mockRejectedValueOnce(new Error('ENOTFOUND api.resend.com'));

    const res = await post(validBody);

    expect(res.status).toBe(502);
    expect(errorLog).toHaveBeenCalled();
  });
});
