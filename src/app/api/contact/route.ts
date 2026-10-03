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
 * naive bots. Neither is rate limiting — real rate limiting needs state shared
 * across instances (Redis or similar) and is noted as a follow-up rather than
 * faked with an in-memory counter that resets on every cold start.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

/** Minimum plausible time for a human to fill the form. */
const MIN_FILL_MS = 2500;

type Payload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot. Hidden from people; bots fill it in. */
  company?: unknown;
  /** Client timestamp from when the form mounted. */
  startedAt?: unknown;
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
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'Requête invalide.' }, { status: 400 });
  }

  // Honeypot and timing. Answer 200 so a bot learns nothing from the response,
  // but send nothing.
  const trap = typeof body.company === 'string' ? body.company.trim() : '';
  const startedAt = typeof body.startedAt === 'number' ? body.startedAt : 0;
  const tooFast = startedAt > 0 && Date.now() - startedAt < MIN_FILL_MS;
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
