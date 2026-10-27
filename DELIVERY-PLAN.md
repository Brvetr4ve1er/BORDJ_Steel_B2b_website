# Delivery Readiness — Strengthening & Cleaning Plan

Audit run **2026-10-26** against `claude/project-cleanup-plan-DhvG5` @ `69ff794`.

**Supersedes `TODO.md`**, which is dated June–July and whose "Remaining" list is now
measurably stale — three of its six open items were verified already done during this
audit (see T3-1). `KNOWN-ISSUES.md` (2026-07-29) is still **accurate** and remains the
reference for client-blocked content items; this plan folds in its survivors rather than
restating them.

---

## Verdict

**The code is in good shape. The release is not.**

Engineering quality is genuinely high — every gate is green, there is no deferred
technical debt hiding behind suppressions, and the accessibility and SEO scaffolding are
real rather than decorative. What stands between this repo and a delivered site is
**one critical dependency vulnerability**, **a domain decision nobody has made**, and
**a contact form with no credentials**.

Nothing in Tier 1 or Tier 3 needs the client. Tier 2 is the critical path.

### Baseline — measured, not assumed

| Check | Result |
|---|---|
| `tsc --noEmit` | **0 errors** (strict + `noUncheckedIndexedAccess` + `noImplicitOverride`) |
| `next lint` | **0 warnings** |
| `next build` | **exit 0** — 18 routes + 13 SSG blog pages |
| `vitest run` | **134 passed / 134**, 5 files |
| `TODO`/`FIXME`/`HACK` in `src/` | **0** |
| `any` / `@ts-ignore` / `@ts-expect-error` / `eslint-disable` | **0** |
| Raw `<img>` tags | **0** — all 32 images go through `next/image`, all have `alt` |
| Unreferenced source files | **1** (`src/hooks/use-breakpoint.ts`) |
| Unused dependencies | **0** — `three`/`sharp`/`react-dom`/`tailwindcss-animate` all used indirectly |
| Missing referenced assets | **0** across `/logos/*`, `/documents/*`, `/media/*` |
| Bundle | 102 kB shared; routes 157–231 kB first-load |
| CI | build + lint + typecheck + **test**, all four required |
| Source size | 20,647 LOC across ~130 TS/TSX files · `public/` 18.79 MB / 120 files |

---

## Tier 1 — Security. Do now, needs nobody.

> This tier is the reason the plan exists. Everything here is a version bump plus
> verification, and it is the only part of this document that is genuinely urgent.

### T1-1 🔴 **CRITICAL — Next.js 15.5.21 → 15.5.28**

`npm audit` reports Next as **critical**, vulnerable range `… – 15.5.27`. Among the six
advisories, two matter here specifically:

- **Unauthenticated Remote Code Execution in the Image Optimization API when AVIF files
  are used.** This site has AVIF **enabled** — `next.config.ts:54`,
  `formats: ['image/avif', 'image/webp']`. This is not a theoretical match; the site runs
  in exactly the vulnerable configuration, and every page serves optimized images.
- **Cache poisoning of SSG and ISR pages in self-hosted applications**, leading to
  cross-user content substitution and persistent denial of service. 31 of this site's
  pages are statically prerendered.

Also fixed in range: unauthenticated RCE on Windows-hosted servers, a second Image
Optimization RCE via SVG, and a Server Actions DoS.

**Action:** `npm i next@15.5.28` — a patch bump on the same minor, no breaking changes.
**Do not** jump to 16.x as part of this fix (see T4-4).

### T1-2 🟠 **HIGH — sharp 0.35.3 → 0.35.5**

Vulnerable `≤ 0.35.5-rc.1`; 0.35.5 final is published. Two CVE groups in bundled native
libraries: libheif (`GHSA-g89c-p67h-r497`, `GHSA-2jg2-4ch7-h545`) and librsvg
(`CVE-2026-96889`).

Worth knowing before you execute: `package.json` declares `"overrides": { "sharp": "$sharp" }`,
so bumping the direct dependency **also** replaces the copy Next resolves internally. One
change closes both audit entries.

### T1-3 🟡 Bump `eslint-config-next` in lockstep

It is pinned **exact** at `15.5.9` (no caret) while `next` carries `^15.5.19`. Bump both
together or the lint rules drift from the framework they are linting.

### T1-4 🟡 Transitive + dev-only advisories

`brace-expansion`, `js-yaml`, `nanoid`, `source-map-js`, `postcss-selector-parser` (DoS /
CPU-exhaustion class), plus `vitest` 4.1.10 → path traversal and code injection via
`@vitest/mocker`, and `vite` → `launch-editor` command execution. All dev or build-time.
`npm audit fix` resolves them; run it **after** T1-1/T1-2 so the tree settles once.

### T1-5 🟠 No rate limiting on `POST /api/contact`

`src/app/api/contact/route.ts` defends with a honeypot field and a 2.5 s minimum fill
time — both cheap, both effective against naive bots, neither a rate limit. The route's
own comment says so honestly and defers it. It is a public unauthenticated endpoint that
sends mail on demand; left as-is, a trivial loop burns the Resend quota and floods the
client's inbox.

**Action:** add a limit at the host's edge once **T3-4** settles which host that is (edge
rules need no shared state, so this is the cleanest option); as an interim, a small
in-route token bucket is better than nothing even though it resets on cold start. **Or**
record it as consciously accepted risk with the client. Any of those is defensible;
silence is not.

### T1-6 ✅ Re-verify after the bumps

`typecheck` → `lint` → `build` → `test`, then load the four product pages and confirm
images still serve. The AVIF code path is precisely what T1-1 changes, so that is the one
behaviour worth looking at with your eyes rather than trusting the build.

---

## Tier 2 — Blocked on the client. This is the critical path.

> None of this is engineering work. Each item is a fact, a file, or a decision only the
> client can supply. Ranked by what unblocks the most.

### T2-1 🔴 The canonical domain — the keystone

`siteMetadata.siteUrl` (`src/config/company-data.ts:212`) is `https://bordj-steel.com`.
Every URL on the site derives from it: `metadataBase`, canonical tags, OG/Twitter cards,
`sitemap.xml`, `robots.txt`, and the Organization JSON-LD. Nothing hardcodes a domain
around it — verified.

The evidence (gathered 2026-07-29, unchanged):

| Host | Resolves to | State |
|---|---|---|
| `bordj-steel.com` | `10.45.72.212` | **private RFC1918** — serves nothing publicly |
| `bordjsteel.dz` | `41.111.205.14` | real host, **expired TLS certificate**, serves the *old* site |
| `bordjsteelb2b.netlify.app` | Netlify | where the *new* site deploys |

So the configured canonical currently points at an address that cannot serve anyone, and
the domain all the copy and email addresses use shows a browser security warning before
any content loads.

This cannot be resolved by lookup — it is a deployment decision. **It also gates T2-2**,
because Resend will only send from a domain verified by DNS.

**Once decided it is a one-line change.** Fix the expired certificate in the same pass;
it outranks every content item below.

### T2-2 🔴 Contact form has no credentials — the only interactive feature is dead

`RESEND_API_KEY` and `CONTACT_FROM` are both unset. The route then returns **503** and the
form shows the direct address instead. That behaviour is correct and deliberate — it
never claims success for a message it did not send, which was the exact defect of the old
`mailto:` version — but the net effect today is that a visitor cannot contact the company
through the site that promises a reply within 24 hours.

Needs: a Resend account, an API key, and a verified sending domain (**depends on T2-1**).

### T2-3 🔴 Contradictory capacity figures rendered to visitors

The site states different numbers for the same quantity, all live simultaneously:

- **Galvanisation annual capacity** — `60 000 T/an` (homepage hero + units block),
  `25 000 tonnes/an` (galvanisation stat + subtitle), `20 000 t/an` (body copy).
  *Three values. Most severe item on this list.*
- **Charpente** — hero `25 000 T/an` vs production table `12 000 T/an`; PRS `3 000` vs `2 000`.
- **Charpente units maths** — "1500 T/mois (25000 T/an)", but 1500 × 12 = 18 000, and the
  table says 1 000 T/mois.

Each needs one confirmed value, then stated **once** in config.

### T2-4 🔴 Fire-class contradiction — commercially dangerous

The sandwich-panel hero claims **Euroclasse B-s2,d0** while the spec tables say
**"B3 : standard"**. B3 is the *easily flammable* class. These are not two ways of saying
one thing; publishing both is a liability on a product sold for cold rooms and cladding.
Needs client confirmation before launch, not after.

### T2-5 🟠 Galvanisation bath dimensions and max piece length

`12 × 1,5 × 3 m` vs `13 × 1,8 × 3,5 m`; max piece `13 m` vs `15 m`. Related: the
"Bains de traitement : 13" stat is a **count** rendered with a length unit — likely
confused with the 13 m bath length.

### T2-6 🟠 Five phone numbers unverified

### T2-7 🟡 Client files — each re-enables existing code with no change

- **ISO 9001 / 14001 / 45001 PDFs** → `public/documents/` as `Bordj-Steel-ISO-9001.pdf`
  (`-14001`, `-45001`). The three cards already render a disabled *"Bientôt disponible"*
  control instead of a dead link; dropping the files in re-enables them.
- **EN / AR catalogues** — only `Bordj-Steel-Catalogue-FR.pdf` exists. As with the ISO
  cards, these links are already disabled rather than broken, so **zero** referenced
  documents 404 today; supplying the files re-enables them with no code change.
- **Photo of the "Cornière d'angle extérieur"** — it previously showed the *interior*
  part's photo, i.e. the wrong product. The wrong image was removed and the renderer now
  shows "Photo à venir" rather than lying to a buyer.
- **Tazedj's identity** — `src` deliberately empty; the domain does not resolve and the
  nearest match is an unrelated beverage brand. The carousel shows the name as text.

### T2-8 🟡 Stale timeline entry (2025) in the history section

---

## Tier 3 — Cleaning. Safe, no client input, do alongside Tier 1.

### T3-1 Retire `TODO.md`

Verified during this audit — three of its six open items are **already done**:

| TODO.md claim | Reality |
|---|---|
| "Remove the ~18 unused shadcn/ui primitives" | **False.** All 21 files in `ui/` are imported ≥1× |
| "`/logos/*.webp` that don't exist (`biolab`, `batimetal`, `man`)" | **False.** All present; **zero** missing logo refs |
| "Remove the `dynamic(() => Promise.resolve(X))` anti-pattern" | **Gone.** Only an explanatory comment remains |

Leaving it in the repo hands the next maintainer three phantom tasks. Delete it; this file
replaces it.

### T3-2 Delete 4 orphaned media files — 4 of 120 files, 0.55 MB of 18.79 MB

**CORRECTED 2026-10-27. This item originally read "17 orphaned files, 2.90 MB".
That figure was wrong: 13 of those 17 are live assets.** The scan behind it read
only `.ts`/`.tsx` sources, so it never opened
`placeholder-images.json` — the file that actually references them, and which is
imported by eight modules (`home-page-hero.tsx`, `vision-mission.tsx`,
`SandwichPanelsPageContent.tsx`, `company-data.ts` and the four product data
files). Two of the thirteen are the homepage hero and the homepage About photo.
Only 4 of the 17 are genuinely unreferenced.

A JSON file holding image records is exactly where a media reference lives, so a
dead-asset scan that cannot read JSON cannot answer this question. Any future
sweep must resolve references through `placeholder-images.json` as well as
through the source tree.

`tests/media-integrity.test.ts` asserts only *referenced → exists*, so **no test breaks**.
Worth adding the reverse assertion in the same change so orphans cannot re-accumulate
silently.

### T3-3 Delete `src/hooks/use-breakpoint.ts`

32 lines, zero importers — the only unreferenced source file in the tree.

### T3-4 Pick one host and delete the other three configs

Four deployment targets are configured for one site:

| File | Target | Note |
|---|---|---|
| `firebase.json` | classic Firebase Hosting | its `headers` block is **not read** by App Hosting, Netlify, or `next start` |
| `apphosting.yaml` | Firebase App Hosting | `maxInstances: 1` — a hard production traffic ceiling |
| `.idx/` | Google Project IDX | 26 KB of dev-environment config |
| *(Netlify)* | referenced in comments; `bordjsteelb2b.netlify.app` is the live deploy | |

`KNOWN-ISSUES.md` says the new site deploys to Netlify. If that holds, the other three are
dead weight that will mislead whoever inherits this.

**Keep `next.config.ts`'s headers** — they are host-independent and deliberately so. Once
`firebase.json` goes, drop the "keep the two in sync" comment with it.

### T3-5 Rewrite `.env.local.example`

Still advertises `FIREBASE_PROJECT_ID`, `REDIS_HOST`, `REDIS_PORT` and a `SOME_API_KEY`
placeholder — none of which exist in the codebase any more. Keep only `RESEND_API_KEY` and
`CONTACT_FROM` (whose existing comments are good and should survive).

### T3-6 Recruitment page: listings to config, and fix the stale dates

`src/components/pages/recruitment-page.tsx` holds two job listings inline, against
`CLAUDE.md`'s "content lives in `src/config/`".

Worse, their timestamps are **hardcoded relative strings** — `"Publié il y a 1 mois"` and
`"Publié il y a 2 mois"` — written months ago and wrong today. They will keep being wrong.
Store real dates and format them at render.

### T3-7 `sitemap.ts` — stop claiming everything changed

Every entry gets `lastModified: new Date()`, so each build tells crawlers all 30 URLs
changed just now. That trains crawlers to ignore the signal. Use each article's own date,
and a real content date for static routes.

### T3-8 Small corrections in `layout.tsx`

- Empty `<head></head>` — dead markup, remove.
- `icons: { icon: '/favicon.ico', apple: '/favicon.ico' }` is redundant with the
  `src/app/favicon.ico` file convention, and a `.ico` is a poor apple-touch-icon. Add a
  180 × 180 PNG or drop the `apple` entry.

### T3-9 Move `placeholder-images.json` out of `src/app/`

It sits at `src/app/lib/placeholder-images.json` — a data file inside the App Router
directory, while both `src/config/` and `src/lib/` exist. Harmless to Next, confusing to
humans. **10 import sites**; move and update all of them in one commit per `CLAUDE.md`,
then build before committing.

### T3-10 `ui/` has drifted from "shadcn primitives only"

Seven domain components now live there: `blog-post-card`, `steel-loader`, `ken-burns`,
`video-loop`, `download-button`, `hover-image-gallery`, `image-dialog`. Either move them
to `components/` or amend the `CLAUDE.md` convention to match reality. Not blocking —
but the rule currently describes something untrue.

### T3-11 Prune superseded docs

`docs/archive/` holds five superseded reports (`AUDIT_REPORT`, `CLEANUP_AND_IMPROVEMENT_PLAN`,
`PROJECT_CONTEXT`, `REFACTOR_ANALYSIS`, `TECHNICAL_REPORT`) plus a `docs/superpowers/specs/`
design doc. Keep a dated index or delete; right now they read as current guidance.

### T3-12 Node 20 → 22 LTS

Pinned consistently in `.github/workflows/ci.yml` (×4 jobs), `.nvmrc`, and
`engines.node` — good. But Node 20 ("Iron") left maintenance at its **end-of-life in
April 2026** and no longer receives security patches from the Node.js project. Shipping a
client site on an unpatched runtime is the problem, independent of which host it lands on.
Bump all four places plus `@types/node` together.

### T3-13 `technical-hero.tsx` is 850 lines

The largest file in the tree, and it carries the hero for most routes. Decompose while it
is still understood.

---

## Tier 4 — Deferred, paid, or post-launch

### T4-1 💰 Four under-supplied full-bleed heroes

Recrutement (1200 px — worst), home (1920 px), references (2600 px), one tall blog photo.
Roughly 180–270 Magnific credits each. **Paid — needs explicit approval per generation.**

### T4-2 💰 Three "Nos Projets" frames at 1920 px

2× output is 3840 px, which lands in the L/XL tier — up to ~3,240 credits for the trio.
**Paid.**

### T4-3 Smoke tests — the honest reading of "134 passing"

All five test files cover **config and data integrity**: capacity figures, product tables,
navigation config, media references. There are **zero** render or route tests. The suite is
genuinely valuable — it is what catches the capacity contradictions — but it would not
notice a page that throws. Add route smoke tests (every route returns 200), one
`ProductVariantDetails` render test, and a contact-form submit test.

### T4-4 Next 16 migration — a separate project, not part of T1-1

`next lint` is already deprecated and is **removed in Next 16**, so CI breaks on upgrade
until migrated (`npx @next/codemod@canary next-lint-to-eslint-cli .`). Next 16 also implies
React 19. Keep this away from the security patch.

### T4-5 ⚠️ Apostrophe consistency — scope carefully or skip

`src/config/` carries **81 U+2019** and **81 ASCII** apostrophes. Tempting to normalise;
**don't bulk-normalise.** The standing rule is that client copy is preserved
character-for-character *including U+2019*, and the ASCII matches include code comments
and alt text rather than only client prose. A blind pass violates a hard constraint for
cosmetic gain. If it happens at all: list the dev-authored strings first, confirm the list,
then change only those.

### T4-6 Catalogue PDF is 4.9 MB

Previously declined on good grounds: no `qpdf`/`ghostscript` on this machine, and
recompressing the client's official catalogue risks degrading a document that is only
fetched on an explicit download click — it never loads during page render. Revisit only if
a lossless-only pass is available.

### T4-7 Content roadmap — 12 researched items

Already specced in `KNOWN-ISSUES.md` (FAQ galvanisation, normes & réglementation, glossaire,
case studies, PEB page, wilaya coverage…). Needs sign-off, not engineering.

---

## Suggested order

1. **Tier 1 entire** — one branch, bumps + verification. Hours, not days. Unblocks nothing
   else but is the only urgent item.
2. **Tier 3 in parallel** — independent of the client; T3-1 through T3-8 are small and safe.
3. **Escalate Tier 2 now**, in one document to the client. T2-1 gates T2-2, and T2-3/T2-4
   are factual errors a buyer could act on. Everything else waits on these answers.
4. **Tier 4 after launch**, except T4-3 (smoke tests), which is worth having *before*
   the first production deploy.

**Shortest honest path to delivery:** T1 (security) + T2-1 (domain) + T2-2 (contact form)
+ T2-3/T2-4 (contradictory and dangerous figures). Everything else is improvement, not
blocker.
