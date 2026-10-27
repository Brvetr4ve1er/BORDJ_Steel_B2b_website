# Known Issues — Bordj Steel B2B

> **Status as of 2026-10-27.** Every engineering item this project has raised is closed.
> What remains is **eight items blocked on the client** and **three deliberate deferrals**,
> each listed below with its reason. None of the eleven is engineering work.
>
> Gates on this tree: `typecheck` ✔ `lint` ✔ `test` ✔ 259/259 `build` ✔ 21 routes.
> `npm audit --omit=dev` → **0 vulnerabilities**.

## How to read this file

This is the **register**, and it is meant to be true on the day you read it. Two sibling
documents carry the other halves:

| You want | Read |
|---|---|
| What the client must decide or supply | `docs/CLIENT-DECISIONS.md` — 18 numbered questions, in French, ready to send |
| What was planned and in what order | `DELIVERY-PLAN.md` |
| How the code is organised | `ARCHITECTURE.md` |
| Conventions and editing rules | `CLAUDE.md` |

A caution learned here: this file previously opened with *"Status as of 2026-07-29: every
engineering item is closed"* and kept saying it for three months while real work happened
around it. **If you change the code, change the date and the claim on this line.** A register
that is confidently stale is worse than no register, because it is believed.

---

## 🔒 Blocked on the client — 8 items

These are facts, files and decisions only Bordj Steel can supply. All eight are already
written up for the client, in French, in `docs/CLIENT-DECISIONS.md`.

### 🔴 1. The canonical domain — the one blocker

`siteMetadata.siteUrl` in `src/config/company-data.ts` is `https://bordj-steel.com`, which
resolves to **10.45.72.212** — a private RFC1918 address that serves nothing publicly.
Everything derives from that value: every `<link rel="canonical">`, the 30-URL sitemap,
`metadataBase`, the OpenGraph tags and the JSON-LD. So every canonical on the site currently
points at a host nobody can reach.

Meanwhile `bordjsteel.dz` resolves to a real Algerian host, serves the **old** site, and
presents an **expired TLS certificate**; the new site deploys to Netlify. The final hostname
is therefore a deployment decision, not a lookup.

**It is a one-line change once answered** — verified by grep: nothing else hardcodes a domain.
→ `docs/CLIENT-DECISIONS.md` Q1.

### 🟠 2. Fire classification of the sandwich panels

The site publishes **both** `B,S2-d0` and `B3 : standard` for the same product. B3 is the
*easily flammable* class. This is the one open item with commercial and safety consequences.
→ Q2.

### 🟠 3–6. Figures that contradict each other in public

| What | The contradiction |
|---|---|
| Galvanisation annual capacity | 60 000 / 25 000 / 20 000 t/an, all three live |
| Charpente annual capacity | hero 25 000 T/an vs production table 12 000 T/an; PRS 3 000 vs 2 000 |
| Charpente monthly maths | "1500 T/mois (25000 T/an)" — 1 500 × 12 = 18 000 |
| Galvanisation bath dimensions | 12×1,5×3 m vs 13×1,8×3,5 m; max piece 13 m vs 15 m |

Each is guarded so it cannot drift further: `tests/charpente-capacity.test.ts` and
`tests/galvanisation-capacity.test.ts` assert the figures stay in exactly one place, and
deliberately assert nothing about which value is right. → Q3–Q8.

### 🟠 7. The 5 m³ buried tank — table vs plan

`src/config/chaudronnerie-tables.ts` gives Ø 1 250 / virole 3 850 / total 4 290 for the 5 m³
tank. The client's own plate, rendered a few sections below it on the same page, gives
Ø 1 500 / virole 2 580 / total 3 092. Both are internally coherent designs; they cannot be the
same product. The table's unit weights are also implausible — 469 kg for 5 m³ against 468 kg
for 3 m³. The page's drawing prints only the min/max **envelope**, which stays true under
either answer. → Q17.

### 🟡 8. Files, text and rights the client must provide

- Three ISO certificate PDFs — buttons already render a disabled "Bientôt disponible"; dropping
  the files into `public/documents/` re-enables them **with no code change**.
- EN and AR catalogues — same mechanism.
- A photo of the *cornière d'angle extérieur*.
- The identity of "Tazedj" (its domain does not resolve; the carousel shows clean text).
- The full text of one job advert, currently published as "Missions principales :" and nothing
  after it, plus real publication dates for both.
- Photography rights: the Terms page asserts ownership of all site images, while `docs/MEDIA.md`
  records part of the photography as third-party stock or generated. The clause was **not**
  edited in-repo — narrowing a legal claim is the client's call. → Q16.
- Two load tables with empty cells, where "missing" and "not permitted" currently look identical
  to a reader. → Q18.

---

## ⏸️ Deliberately deferred — 3 items

Each was confirmed real and then judged not worth doing now. Reasons, so a later reader does
not re-litigate them:

1. **Footer links lose contrast on hover** — 9.0:1 at rest, 2.98:1 under the cursor. Cosmetic,
   and the resting state is what carries the information.
2. **Five indexable routes have no crawlable internal link**, `/recrutement` among them. Real
   SEO weight, but the fix is a navigation decision rather than a defect repair, and it is
   better made once the domain is settled.
3. **Module-level `"use client"` on five page-content modules** — genuinely costs ~9–11 kB
   gzipped, but unpicking the client boundary on five finished pages at final delivery is the
   kind of change `CLAUDE.md` means by "stability over novelty".

---

## ✅ Closed — the record

### Close-out audit, 2026-10-27

Nine dimensions — accessibility, security, correctness, SEO, performance, content integrity,
dead code, build/CI, tests — each audited and then **adversarially re-checked by a second pass
whose job was to refute it**. 414 file-reads, 93 raw findings, **85 confirmed and 16 overturned**.

The 74 fix-now items are all applied. Highlights, because they are the kind of thing that
reaches a visitor:

- **Contrast.** The homepage "Chiffres clés" figures were brand red on dark grey at **1.49:1**
  — under half the floor for large text. The `/recrutement` h1 was brand red over an unscrimmed
  photograph. Both fixed, along with 32 technical-figure labels at 2.56:1 (the `WF.labelMuted` token, darkened to #5b6b82 — verified 5.43:1 on white and 4.95:1 on the figures’ own fill) and several sub-4.5:1 captions.
- **A clock bug that silently dropped messages.** The contact route compared the server's clock
  to the browser's, so a visitor whose clock ran ahead got a success toast and no e-mail was
  sent. The client now sends a *duration*, so one clock is read instead of two.
- **A rate limiter keyed on a header the caller controls.** It now reads Netlify's
  `x-nf-client-connection-ip` first, with a test that rotates `x-forwarded-for` to prove the
  limiter still holds.
- **A blank column.** Hovering deep into one charpente pillar's gallery and then switching
  pillars left the left-hand column empty.
- **Structured data named the company after its own tagline.** The Organization `name` was the
  full page title.
- **Dead weight removed**, verified by grepping import paths *and* bare symbols: the
  `AnimatedNumber` chain, `StatsCards`, `DetailedStatCard`, `algeria-wilayas.json`, orphaned CSS
  and two unreferenced media files. `/products/galvanisation-a-chaud` dropped from **231 kB to
  186 kB** First Load.
- **`noUnusedLocals` and `noUnusedParameters` are now on**, and the 27 unused declarations they
  surfaced are cleared.
- **The documentation was the worst-maintained thing in the repo.** `ARCHITECTURE.md` described
  a Firebase pipeline that had been deleted; `README.md` contradicted itself inside one file and
  described the test suite wrongly in four ways; `CLAUDE.md` told contributors CI enforced three
  gates when it enforces four. All corrected against measured facts.

Sixteen findings were **overturned** by the verification pass, and that is worth recording too:
among them a claim that the security headers "apply on Netlify" that nobody had measured (a
verifier ran `curl` and confirmed all four, byte-for-byte), and a proposal to enable
`noUnusedLocals` as a free tidy-up (measured first: 27 errors, so it was sequenced behind the
cleanup instead of breaking the build).

### Earlier waves

- **2026-10** — contact form hardening, dead-code sweep, media corrections. Six images that
  showed the wrong product entirely were replaced; the chaudronnerie lead drawing was redrawn as
  the buried tank the page actually documents, after it was found to be a vertical silo; four of
  the five sandwich-panel tabs were leading with stock photography unrelated to the product.
- **2026-07-29** — the 52 findings of the July audit, closed in two waves on disjoint file sets.
  Product tables (the worst rendering defect this project has had — a fractional `colSpan={0.5}`
  and a `[1,1,1,1,8]` span distribution against 4/4/2 data groups), positional array coupling,
  the footer-year hydration mismatch, branded French `not-found` and `global-error` boundaries,
  security headers moved into `next.config.ts` so they survive a host change, and 18 "useless
  element" findings including a logo mask shipping ~15× per blog page to drive an effect that
  mathematically could never render.

### Rejected by verification, logged for transparency

Claims that did not survive checking, so nobody re-files them: duplicate Certifications
components (each has a distinct purpose, all imports resolve); "charpente defaults to
`pillars[0]`" (selection is by `id` via `.find()`); `use-toast` re-subscribing per toast (cheap,
correct, the standard shadcn pattern); the 404 page's canonical (served 404 and noindexed, so no
crawler reads it); `Cache-Control: immutable` on unhashed assets (measured inert on the host this
actually deploys to); and the CI `continue-on-error` on the audit job (a documented deliberate
choice, with its reasoning in the workflow file).

---

*Register current as of 2026-10-27. Everything open requires a client-supplied file, a factual
figure only the client knows, or a deployment decision.*
