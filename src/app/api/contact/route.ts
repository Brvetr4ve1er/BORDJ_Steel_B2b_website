import { NextResponse } from 'next/server';
import { companyData } from '@/config/company-data';

/**
 * Contact form delivery.
 *
 * WHAT THIS REPLACED. The form used to build a `mailto:` and set
 * `window.location.href`. That looks like it works and frequently does not: a
 * visitor reading webmail in a browser has no mail client registered, so the
 * click did nothing at all — no message, no error, no record. The site promises
 * a reply within 24 hours and had no mechanism by which anyone would learn
 * there was something to reply to. This route is that mechanism.
 *
 * NO SDK ON PURPOSE. Resend is a plain HTTPS API, so this is one `fetch`. The
 * route therefore carries no provider dependency and runs unchanged on Netlify,
 * Vercel or any Node host — which matters while the hosting target for this
 * site is still undecided.
 *
 * FAILS LOUDLY, NEVER SILENTLY. If the API key is missing the route returns 503
 * and the form shows the direct address instead. It does NOT return success for
 * a message it did not send; that is the exact failure the mailto version had.
 *
 * SPAM. A honeypot field plus a minimum fill time. Both are cheap and catch
 * naive bots. Neither is a rate limit, which is the next paragraph.
 *
 * RATE LIMIT, AND WHAT IT IS NOT. Five submissions per ten minutes per address,
 * counted in a Map in this module. Be exact about what that buys: the Map lives
 * in one server instance's memory, so the count is per-instance and empty again
 * after a cold start. It is a speed bump, not a guarantee. It stops a trivial
 * loop from burning the Resend quota and filling the client's inbox; it does not
 * stop a patient flood spread across instances or addresses. The durable fix is
 * a rate-limit rule at the host's edge — that needs no shared state and belongs
 * to whichever host this site lands on, a decision still open. This exists so
 * the window until then is not wide open, and it is deliberately the kind of
 * code that can be deleted the day the edge rule exists.
 *
 * ORDER OF THE CHECKS. The limit is applied before the body is even read,
 * because every branch below it costs something. The 5 000-character cap applies
 * to the message after parsing, so `request.json()` parses a body of whatever
 * size the host accepts before anything rejects it; and a send costs quota and
 * the client's attention. The honeypot keeps its semantics exactly — inside the
 * limit a trapped submission still answers 200 and still sends nothing, so a bot
 * learns nothing about the trap. Over the limit it gets the same 429 a human
 * clicking too often would get, which says "too many requests from this address"
 * and nothing about which field gave it away. A blocked request is not logged,
 * deliberately: a request flood would otherwise become a log flood.
 *
 * WHOSE ADDRESS. There is no socket to ask here, so the address comes from a
 * header: x-nf-client-connection-ip first, then x-forwarded-for, then x-real-ip.
 * The Netlify header leads because it is the one client address the deploy
 * target guarantees to a function and the platform sets it itself; on any other
 * host it is simply absent and the code falls through unchanged. The
 * x-forwarded-for branch takes the FIRST comma-separated entry, and that is
 * worth being exact about: an edge APPENDS to whatever chain arrived, so a
 * caller sending its own x-forwarded-for puts a value of its choosing at that
 * position and the real address lands after it. Index [0] is the client-chosen
 * end of the chain, not reliably the client. It stays index [0] regardless,
 * because choosing another entry safely needs the exact hop count in front of
 * this function and nobody has measured it — behind two hops the rightmost entry
 * is the host's own internal proxy, the same string for every visitor, which is
 * the shared bucket below by accident. One more reason the edge rule is the real
 * answer. When none of the three headers is present every caller shares a single
 * bucket. That is the intended trade: a shared bucket degrades to "five messages
 * per ten minutes from this site" rather than to no limit at all, and a host that
 * strips these headers announces itself at once.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/** Minimum plausible time for a human to fill the form. */
const MIN_FILL_MS = 2500;

/**
 * Five per ten minutes, per address. Chosen so it cannot plausibly catch a
 * person: an enquiry is one submission, a failed send is a second, a follow-up
 * about something else is a third. Even a whole office behind one NAT address
 * does not send a sixth contact form within ten minutes — and if one somehow
 * does, the direct e-mail address sits under the form and still works.
 */
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;

/**
 * Ceiling on tracked addresses. Without it, a client cycling forged addresses
 * would turn this Map into a memory leak with a request loop for a pump. At
 * this size the Map costs well under a megabyte, and the eviction below means
 * reaching the ceiling degrades the limiter rather than the instance.
 */
const RATE_LIMIT_MAX_KEYS = 5000;

/** Longest plausible address text (IPv6 with a scope is 45). Longer is not one. */
const MAX_ADDRESS_CHARS = 64;

/** Bucket for callers no proxy identified. See WHOSE ADDRESS above. */
const SHARED_ADDRESS = 'unidentified';

type RateWindow = { count: number; resetAt: number };

/** Per-instance and non-durable on purpose. See RATE LIMIT above. */
const windows = new Map<string, RateWindow>();

/**
 * Makes room for one more address: expired windows first, since they are dead
 * weight, then the oldest live window if the ceiling still holds. A Map
 * iterates in insertion order and `recordHit` always deletes before inserting,
 * so the first key is the oldest. No timer anywhere — a `setInterval` here
 * would hold a serverless instance open and outlive the test process.
 */
function makeRoom(now: number): void {
  for (const [key, win] of windows) {
    if (win.resetAt <= now) windows.delete(key);
  }
  while (windows.size >= RATE_LIMIT_MAX_KEYS) {
    const oldest = windows.keys().next();
    if (oldest.done) break;
    windows.delete(oldest.value);
  }
}

/**
 * Counts one request against `address`. Returns 0 when it may proceed, or the
 * milliseconds left in the window when it may not. A blocked request does not
 * increment the count, so hammering cannot push its own window further away.
 */
function recordHit(address: string, now: number): number {
  const open = windows.get(address);
  if (open && open.resetAt > now) {
    if (open.count >= RATE_LIMIT_MAX) return open.resetAt - now;
    open.count += 1;
    return 0;
  }
  windows.delete(address);
  if (windows.size >= RATE_LIMIT_MAX_KEYS) makeRoom(now);
  windows.set(address, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
  return 0;
}

/**
 * The caller's address, as the platform or the nearest proxy reported it. Every
 * branch returns a string and nothing here can throw: a missing header, an empty
 * one, a bare comma and a kilobyte of junk all end up in the shared bucket
 * rather than in an exception or in an oversized Map key.
 */
function addressOf(request: Request): string {
  // Ahead of the forwarded chain on purpose: the platform writes this one and
  // the caller cannot, so rotating x-forwarded-for buys no fresh bucket here.
  // Absent on every other host, which is why the branch is free. See WHOSE
  // ADDRESS above.
  const netlify = request.headers.get('x-nf-client-connection-ip')?.trim() ?? '';
  if (netlify && netlify.length <= MAX_ADDRESS_CHARS) return netlify.toLowerCase();
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    const first = forwarded.split(',')[0]?.trim() ?? '';
    if (first && first.length <= MAX_ADDRESS_CHARS) return first.toLowerCase();
  }
  const real = request.headers.get('x-real-ip')?.trim() ?? '';
  if (real && real.length <= MAX_ADDRESS_CHARS) return real.toLowerCase();
  return SHARED_ADDRESS;
}

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot. Hidden from people; bots fill it in. */
  company?: unknown;
  /** Milliseconds the form was open, measured on the client. */
  elapsedMs?: unknown;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null;
  const t = v.trim();
  if (!t || t.length > max) return null;
  return t;
}

/** Keeps a header-injected newline out of the subject line. */
function oneLine(s: string): string {
  return s.replace(/[\r\n]+/g, ' ').trim();
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function POST(request: Request) {
  // First, above reading the body: see ORDER OF THE CHECKS above.
  const waitMs = recordHit(addressOf(request), Date.now());
  if (waitMs > 0) {
    return NextResponse.json(
      {
        error:
          'Trop de demandes depuis votre connexion. Merci de patienter quelques minutes avant de réessayer.',
      },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.max(1, Math.ceil(waitMs / 1000))) },
      }
    );
  }

  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  // Honeypot and timing. Answer 200 so a bot learns nothing from the response,
  // but send nothing.
  const trap = typeof body.company === 'string' ? body.company.trim() : '';
  const elapsedMs = typeof body.elapsedMs === 'number' ? body.elapsedMs : -1;
  const tooFast = elapsedMs >= 0 && elapsedMs < MIN_FILL_MS;
  if (trap || tooFast) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const message = str(body.message, 5000);
  const subject = typeof body.subject === 'string' ? str(body.subject, 160) : null;

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: 'Merci de vérifier votre nom, votre e-mail et votre message.' },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  // Destination comes from config, so the address a visitor sees on the page and
  // the address a message is delivered to cannot drift apart.
  const to = companyData.pages.contact.content.emails[0];

  if (!apiKey || !from || !to) {
    console.error(
      '[contact] not configured — need RESEND_API_KEY and CONTACT_FROM; destination comes from config'
    );
    return NextResponse.json(
      { error: 'Le formulaire est momentanément indisponible.' },
      { status: 503 }
    );
  }

  const lines = [
    `Nom : ${name}`,
    `E-mail : ${email}`,
    subject ? `Objet : ${subject}` : null,
    '',
    message,
  ].filter((l): l is string => l !== null);

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        // The whole point: hitting reply in the inbox answers the visitor.
        reply_to: email,
        subject: oneLine(subject ? `${subject} — ${name}` : `Demande de contact — ${name}`),
        text: lines.join('\n'),
        html: `<pre style="font:14px/1.6 ui-sans-serif,system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(
          lines.join('\n')
        )}</pre>`,
      }),
    });

    if (!res.ok) {
      // Never echo the provider body to the client; it can contain key details.
      console.error('[contact] resend rejected the send:', res.status, await res.text());
      return NextResponse.json(
        { error: "L'envoi a échoué. Merci de réessayer ou de nous écrire directement." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error('[contact] resend unreachable:', err);
    return NextResponse.json(
      { error: "L'envoi a échoué. Merci de réessayer ou de nous écrire directement." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
