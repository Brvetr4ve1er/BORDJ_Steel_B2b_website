# BORDJ STEEL — Full Project Context

> Generated from a complete read of the repository on 2026-05-29.
> This document describes **what the project actually is today**, verified against
> the source code — not aspirational state. Where the code diverges from the
> existing docs (`README.md`, `ARCHITECTURE.md`, `REFACTOR_ANALYSIS.md`), the
> divergence is called out explicitly.

---

## 1. What This Is

The official corporate / B2B marketing website for **Bordj Steel SPA**, an
Algerian steel-construction and metal-fabrication company (Bordj Bou Arréridj).
It is a **purely informational / branding** site — no e-commerce, no auth, no
dashboards, no admin. Content is in **French** (`<html lang="fr">`), with some
Arabic strings in the data layer.

- **Primary domain (intended):** `bordj-steel.com` (set in `metadataBase`)
- **Contact email in data:** `commercial@bordjsteel.dz`  ⚠️ *domain mismatch — see §9*
- **Canonical source of truth (per README):** Firebase Studio; GitHub mirrors it.

---

## 2. Tech Stack

| Layer | Choice | Version |
|---|---|---|
| Framework | Next.js (App Router) | 15.5.9 |
| Runtime UI | React | 18.3.1 |
| Language | TypeScript | 5.x (`strict: true`) |
| Styling | Tailwind CSS | 3.4.1 |
| Components | shadcn/ui (Radix primitives) | — |
| Animation | Framer Motion | 11.x |
| Icons | lucide-react | 0.475 |
| Charts | recharts | 2.15 |
| Carousels | embla-carousel | 8.x |
| Forms | react-hook-form | 7.x |
| Images | sharp | 0.34 |
| AI (unused) | Genkit + `@genkit-ai/googleai` | 1.14 |
| Backend (unused) | firebase | 11.9 |
| Hosting | Firebase App Hosting | — |
| Dev port | `9002` (`next dev --turbopack`) | — |

**Scripts:** `dev`, `build`, `start`, `lint` (`next lint`), `typecheck` (`tsc --noEmit`),
`genkit:dev`, `genkit:watch`.

---

## 3. Directory Map

```
/                         repo root
├─ README.md / ARCHITECTURE.md / TODO.md / REFACTOR_ANALYSIS.md / TECHNICAL_REPORT.md
├─ next.config.ts         image remotePatterns (28 hosts), build-error suppression
├─ tailwind.config.ts     theme tokens, fonts, animations
├─ firebase.json          App Hosting + security headers + cache headers
├─ apphosting.yaml        maxInstances: 1
├─ components.json        shadcn config
├─ .idx/                  Firebase Studio (Project IDX) workspace config
├─ public/
│  ├─ bordj-steel-logo.svg
│  ├─ robots.txt          → points at bordj-steel.com/sitemap.xml
│  ├─ sitemap.xml         ⚠️ contains placeholder [YOUR_DOMAIN_HERE]
│  ├─ sandwich-panels-export.html   (unreferenced)
│  └─ "documents "/catallogue de produi Final.pdf  ⚠️ trailing space + typos, 5 MB
└─ src/
   ├─ app/                App Router routes (16 page.tsx + 1 root layout)
   ├─ components/
   │  ├─ ui/              36 shadcn/ui primitives + a few custom
   │  ├─ sections/        atomic homepage/history sections (6 files)
   │  │  └─ history/      ActivitiesSection, CertificationsSection, TeamsSection
   │  ├─ pages/history/   HistoryPageContent (composition wrapper)
   │  ├─ product-variants/ ProductVariantDetails (generic) + 2 icon files
   │  ├─ contact/         home-page-contact-form
   │  ├─ icons/           baths-icon
   │  ├─ shared/          AnimatedWrapper  ⚠️ duplicate, near-dead
   │  └─ *.tsx            ~29 page-level / shared components
   ├─ config/             8 data files (content + product specs) — see §6
   ├─ hooks/              use-toast, use-breakpoint
   ├─ lib/                utils.ts, algeria-wilayas.json, firebase-config.ts
   ├─ services/           firebase.ts  ⚠️ unused
   ├─ ai/                 genkit.ts, dev.ts  ⚠️ unused
   ├─ logos/              27 client-logo image files  ⚠️ NOT web-served (see §8)
   ├─ public/             sandwich-panels-export.html  ⚠️ stray duplicate dir
   ├─ ARCHITECTURE.md / TODO.md / next.config.ts  ⚠️ stray duplicates of root files
   └─ app/lib/placeholder-images.json   image catalog (actively used)
```

Path alias: `@/*` → `./src/*`.

---

## 4. Routes (App Router)

| URL | `page.tsx` lines | Shape |
|---|---|---|
| `/` | 8 | thin → `<HomePage>` |
| `/about/history` | 11 | thin → `HistoryPageContent` |
| `/contact` | 51 | mixed; exports `metadata` |
| `/references` | 107 | inline data + rendering |
| `/recrutement` | 220 | **heavy** — job listings hardcoded inline, filter/form state |
| `/media-center` | 44 | hub page |
| `/media-center/blog` | 237 | **heavy** — `"use client"`, search/filter/tabs |
| `/media-center/blog/[slug]` | 88 | dynamic; `generateStaticParams`, metadata |
| `/media-center/actualites` | 45 | thin |
| `/media-center/videos` | 45 | thin |
| `/media-center/gallery` | 45 | thin |
| `/products/charpente-metallique` | 20 | thin → page component |
| `/products/chaudronnerie` | 20 | thin |
| `/products/galvanisation-a-chaud` | 21 | thin |
| `/products/sandwich-panels` | 23 | thin |

Root `layout.tsx` (61 lines): loads Montserrat + Roboto via `next/font`, sets full
`metadata` (title template, description, OpenGraph `fr_FR`, Twitter card) pulled from
`company-data.ts`, mounts `<Toaster>`.

> ⚠️ There is **no `/products` index route**, but `sitemap.xml` lists `/products`.

---

## 5. Architecture Patterns

- **Server-first intent, client-heavy reality.** `home-page.tsx` (30 lines) and
  `product-page-layout.tsx` (22 lines) are clean server orchestrators using
  `next/dynamic` to compose sections. But **71 of 112 TS/TSX files (~63%) carry
  `"use client"`**, and the four product page bodies are top-level client
  components. The client boundary is **not** pushed to leaves.
- **Data-driven product rendering — done well.** `product-variants/ProductVariantDetails.tsx`
  (169 lines) is a fully generic, schema-driven renderer (`keyValue | list | table |
  text | image | imageGrid` section map). The legacy per-product components
  (`CouvertureProduct`, `BardageProduct`, …) were removed — this previously
  high-priority debt is **resolved**.
- **`next/dynamic` anti-pattern.** The monolithic product pages "decompose" by
  declaring inline `UnwrappedX` functions and wrapping them in
  `dynamic(() => Promise.resolve(UnwrappedX))`. Because the function is already in
  the same module, this yields **no code-splitting** — only overhead and noise.
- **Content centralization is partial.** Product specs, company info, blog posts,
  and navigation live in `/src/config`. But large amounts of copy remain hardcoded
  in JSX, and `/recrutement` job data is inline.

---

## 6. Data / Config Layer (`src/config/`)

| File | Lines | Holds |
|---|---|---|
| `company-data.ts` | 304 | Master config: metadata, nav menu, socials, contact, team, certifications, **client logos** |
| `products-data.ts` | 698 | Sandwich-panel (couverture) specs, tables, coatings, dimensions |
| `product-variants.config.ts` | 479 | 5 variants (couverture, bardage, frigorifique, tn40, hibond77) |
| `product-variant-schema.ts` | 126 | TS interfaces for the variant renderer |
| `blog-data.ts` | 173 | 7+ blog articles (linked to `[slug]`) |
| `charpente-metallique-data.ts` | 147 | Charpente specs |
| `galvanisation-data.ts` | 142 | Galvanisation process/specs + icon map |
| `chaudronnerie-data.ts` | 162 | Boilermaking specs |

`src/app/lib/placeholder-images.json` (149 lines) is an actively-used image catalog
(hero, facilities, references, etc.), imported by ~10 components/configs.

---

## 7. Backend / Integrations Status

| Capability | State |
|---|---|
| Firebase App Hosting (deploy) | **Active** — `firebase.json` + `apphosting.yaml` |
| Firestore / Firebase Auth | **Not used** — `src/services/firebase.ts` (17 lines) & `src/lib/firebase-config.ts` (placeholders) have **zero imports** |
| Genkit / Google AI | **Not used** — `src/ai/genkit.ts` exports `ai`, never imported; `src/ai/dev.ts` empty |
| Contact form submission | **Non-functional** — `home-page-contact-form.tsx` has a `<form>` with no `onSubmit`/`action`/handler; submitting does nothing. Also references `contact.content.form.button`, a field that does **not exist** in `company-data.ts` → empty button label |

`firebase.json` sets good security headers (HSTS, X-Content-Type-Options,
X-Frame-Options, CSP `frame-ancestors`) and long-lived immutable cache for static
assets.

---

## 8. Assets

- **Brand logo:** `public/bordj-steel-logo.svg` ✓ served correctly.
- **Client logos — broken/fragile:**
  - In `company-data.ts`, ~22 client logos. **Most hotlink third-party URLs**
    (condor.dz, sonatrach.com, brandfetch, pinterest, wikimedia, **Facebook CDN
    URLs with expiry tokens** like `oe=691A3A01`). These are fragile and will rot.
  - **4 logos** reference local paths `/logos/biolab.webp`, `/logos/batimetal.webp`,
    `/logos/man.webp`, `/logos/amimer_energie.webp`, `/logos/imetal.webp` — **but
    there is no `public/logos/` directory**, so these render broken.
  - `src/logos/` holds **27 image files (~12 MB**, e.g. `Sonlgaz.png` 3.2 MB,
    `GCB_Logo.svg.png` 2.2 MB, `Softal.png` 2.1 MB) with mismatched names/formats.
    Because they live under `src/` (not `public/`) they are **never web-served** —
    effectively 12 MB of dead weight in the repo.
- `next.config.ts` whitelists **28 remote image hosts** to support the hotlinking.

---

## 9. Known Issues Inventory (verified)

**Dead / orphan code**
- `src/components/clients.tsx` — 0 imports (live version is `sections/Clients.tsx`).
- `src/components/shared/AnimatedWrapper.tsx` — near-dead duplicate of
  `src/components/animated-wrapper.tsx` (used by ~20 files); only `app/contact/page.tsx`
  imports the duplicate.
- `src/components/contact.tsx`, `contact-info.tsx`, `algeria-map.tsx`, `timeline.tsx`
  — no detectable imports (verify before deleting).
- `src/services/firebase.ts`, `src/lib/firebase-config.ts`, `src/ai/*` — unused.
- `public/sandwich-panels-export.html` & `src/public/sandwich-panels-export.html`
  — unreferenced.
- `src/logos/` — 12 MB, not served.

**Stray duplicate files at the wrong level**
- `src/next.config.ts`, `src/ARCHITECTURE.md`, `src/TODO.md`, `src/public/` —
  duplicate/orphan copies of root-level files (content differs from root).

**Committed build artifacts / junk**
- `tsconfig.tsbuildinfo` (244 KB) and `.modified` (empty) are **tracked** despite
  `*.tsbuildinfo` being in `.gitignore` (added after the file was committed).

**Correctness / functional**
- Contact form does not submit (§7).
- Empty submit-button label — `form.button` missing in data (§7).
- 5 broken client-logo references (§8).
- `sitemap.xml` contains `https://[YOUR_DOMAIN_HERE]/` placeholders and lists a
  non-existent `/products` route.
- Domain inconsistency: `bordj-steel.com` (metadata/robots) vs `bordjsteel.dz`
  (email).
- `next.config.ts`: `typescript.ignoreBuildErrors: true` and
  `eslint.ignoreDuringBuilds: true` — type/lint errors are suppressed in CI/build.

**Maintainability**
- 4 monolithic page components: `galvanisation-page-content.tsx` (500),
  `charpente-metallique-page.tsx` (388), `chaudronnerie-page-content.tsx` (383),
  `sandwich-panels-page.tsx` (298) — still inline despite `REFACTOR_ANALYSIS.md`
  claiming product pages were decomposed (only the **history** page was actually
  split into `sections/history/`).
- `next/dynamic(Promise.resolve(...))` anti-pattern (§5).
- ~63% of files are client components.

**Tooling gaps**
- `lint` script calls `next lint`, but **no ESLint config** file exists.
- **No tests** of any kind, **no CI** workflow in-repo.

---

## 10. Doc-vs-Reality Reconciliation

| Existing doc claim | Reality |
|---|---|
| README: "product-variants duplication still untouched" | **Resolved** — now a single generic renderer |
| REFACTOR_ANALYSIS: "pages decomposed app→pages→sections" | **Only history page**; the 4 product pages remain monolithic |
| REFACTOR_ANALYSIS: "dead code removed (`language-context`, `logger`)" | Those two are gone, but **new dead code accumulated** (clients.tsx, shared/AnimatedWrapper, firebase, ai, src/logos) |
| TODO: "remove `depcheck-report.json`" | Not present; `.gitignore` already lists it |

The existing markdown docs are **partly aspirational**. This file supersedes them as
the factual baseline.
