# BORDJ STEEL — Cleanup & Improvement Plan

> Companion to `PROJECT_CONTEXT.md`. Every item below was verified against the
> current source. Items are ordered so that low-risk, high-value work comes first
> and risky refactors come last. Each item lists **why**, **what to do**, and
> **risk**.

**Legend** — Effort: 🟢 small · 🟡 medium · 🔴 large. Risk: same scale.

---

## Phase 0 — Triage / Correctness (do first; user-visible bugs)

These are broken things on a live client site. Highest priority despite small size.

### 0.1 Fix the contact form (it does nothing) 🟡 / risk 🟡
`src/components/contact/home-page-contact-form.tsx` is a `<form>` with no
`onSubmit`, no `action`, no state. A B2B lead form that silently discards
submissions is the single worst defect here.
- **Do:** Wire it with `react-hook-form` (already a dependency) + a submission
  target. Options: a `mailto:` fallback (zero-infra), a Next.js Route Handler
  (`app/api/contact/route.ts`) that emails via a provider, or Firebase
  (already configured). Add success/error toasts (`useToast` already present),
  validation, and disabled/loading states.
- **Also:** add the missing `form.button` label to `company-data.ts` (currently
  the submit button renders an empty label).

### 0.2 Fix broken client-logo references 🟢 / risk 🟢
5 logos point at `/logos/*.webp` with no `public/logos/` dir → broken images.
- **Do:** Create `public/logos/`, add the real `.webp` files (convert from
  `src/logos/` with `sharp`), and update paths. Decide per-logo: self-host vs
  external URL (see 1.4).

### 0.3 Fix `sitemap.xml` + domain consistency 🟢 / risk 🟢
- Replace `https://[YOUR_DOMAIN_HERE]/` with the real domain.
- Remove the non-existent `/products` entry (no such route).
- Reconcile `bordj-steel.com` (metadata/robots) vs `bordjsteel.dz` (email) — pick
  one canonical domain. Better: generate the sitemap dynamically via
  `app/sitemap.ts` so it can't drift from the route tree.

---

## Phase 1 — Repository Hygiene (fast, safe, high signal-to-noise)

### 1.1 Stop tracking build artifacts / junk 🟢 / risk 🟢
- `git rm --cached tsconfig.tsbuildinfo .modified` (both are tracked; the first is
  244 KB and already matches `.gitignore`). Delete `.modified` (empty, purposeless).
- Consider adding `next-env.d.ts` to `.gitignore` (Next regenerates it).

### 1.2 Delete stray duplicate files at `src/` level 🟢 / risk 🟢
Remove the orphan copies that duplicate root config/docs and confuse navigation:
- `src/next.config.ts` (root `next.config.ts` is the real one)
- `src/ARCHITECTURE.md`, `src/TODO.md` (root copies are canonical)
- `src/public/sandwich-panels-export.html` (stray; `src/public` isn't a Next public dir)
- `public/sandwich-panels-export.html` if confirmed unreferenced (it is, currently).

### 1.3 Remove dead components 🟢 / risk 🟢
Verified zero/near-zero imports (grep-confirmed):
- `src/components/clients.tsx` (replaced by `sections/Clients.tsx`)
- `src/components/shared/AnimatedWrapper.tsx` → migrate the one importer
  (`app/contact/page.tsx`) to `@/components/animated-wrapper`, then delete the
  `shared/` duplicate. **Pick ONE canonical AnimatedWrapper.**
- Verify-then-delete: `contact.tsx`, `contact-info.tsx`, `algeria-map.tsx`,
  `timeline.tsx` (no detected imports). Confirm each with a final grep before removal.

### 1.4 Resolve the `src/logos/` mess (~12 MB) 🟡 / risk 🟢
- Either move the logos you actually want into `public/logos/` as optimized `.webp`
  (rename to the lowercase paths the data expects), or delete `src/logos/` entirely
  if all client logos are intended to be external.
- Strongly prefer **self-hosting** over hotlinking (see 2.3) — Facebook-CDN and
  brandfetch URLs in `company-data.ts` will expire/rot.

### 1.5 Remove unused backend/AI scaffolding (decide intent first) 🟢 / risk 🟡
`src/services/firebase.ts`, `src/lib/firebase-config.ts`, `src/ai/*`, and the
`genkit*`/`firebase` dependencies are unused.
- **If** the contact form (0.1) will use Firebase, keep `firebase` and wire it.
- **Otherwise** delete the files and drop `firebase`, `genkit`, `@genkit-ai/googleai`,
  `genkit-cli` from `package.json` (and the `genkit:*` scripts). This trims install
  size and removes confusing dead surface. ⚠️ Confirm with stakeholder since README
  names Firebase as host (App Hosting stays regardless — that's config, not the SDK).

### 1.6 Catalogue PDF cleanup 🟢 / risk 🟢
`public/documents /catallogue de produi Final.pdf` has a trailing-space folder name
and typo'd filename. Rename to `public/documents/catalogue-produits.pdf` and update
the reference in `company-data.ts` / blog page. (Trailing-space paths break on some
hosts/CLIs.)

---

## Phase 2 — Build Integrity & Tooling (prevents regressions)

### 2.1 Stop suppressing errors in builds 🟡 / risk 🟡
`next.config.ts` sets `typescript.ignoreBuildErrors: true` and
`eslint.ignoreDuringBuilds: true`. This lets broken code ship.
- **Do:** Run `npm run typecheck` and `next lint`, fix what surfaces, then flip both
  to `false`. Treat this as a gate before further refactoring (Phase 4 needs it).

### 2.2 Add a real ESLint config 🟢 / risk 🟢
`lint` calls `next lint` but no config exists. Run `next lint` once to scaffold
`eslint.config.mjs` (or `.eslintrc.json`) with `next/core-web-vitals`.

### 2.3 Harden / self-host external images 🟡 / risk 🟢
28 whitelisted remote hosts in `next.config.ts`, several pointing at volatile CDNs.
- **Do:** Download client logos once, store optimized `.webp` in `public/logos/`,
  point `company-data.ts` at local paths, and prune the `remotePatterns` list to
  only hosts still needed. Improves reliability, LCP, and privacy.

### 2.4 Add minimal CI + tests 🟡 / risk 🟢
No tests, no CI workflow in-repo.
- **Do:** Add a GitHub Actions workflow running `npm ci → typecheck → lint → build`.
- Add a lightweight smoke layer (e.g. Vitest + Testing Library) starting with the
  contact form and `ProductVariantDetails` rendering. (Optional but recommended.)

---

## Phase 3 — Performance (measurable wins)

### 3.1 Remove the `dynamic(Promise.resolve(...))` anti-pattern 🟡 / risk 🟡
In the product pages, sections are declared as inline `UnwrappedX` functions then
wrapped in `dynamic(() => Promise.resolve(UnwrappedX))`. Same module ⇒ **no
code-split**, only overhead. This is coupled with Phase 4 (extract to real files,
then `next/dynamic` actually splits them).

### 3.2 Push `"use client"` to leaves 🔴 / risk 🟡
~63% of files are client components, mostly because `AnimatedWrapper` and product
page bodies are marked client at the top.
- **Do:** Keep page bodies as Server Components; isolate animation into small client
  leaf wrappers. Render static content (headings, copy, tables) on the server.
  This is the biggest bundle/LCP lever and pairs naturally with Phase 4.

### 3.3 Audit Framer Motion footprint 🟢 / risk 🟢
With animation isolated, confirm motion is only imported in client leaves. Consider
`LazyMotion`/`m` to shrink the motion bundle.

---

## Phase 4 — Maintainability Refactors (largest; do after Phases 0–2 land)

### 4.1 Decompose the 4 monolithic product pages 🔴 / risk 🟡
`galvanisation-page-content.tsx` (500), `charpente-metallique-page.tsx` (388),
`chaudronnerie-page-content.tsx` (383), `sandwich-panels-page.tsx` (298).
- **Do:** Mirror the pattern already proven on the history page:
  `components/pages/<product>/` (composition) + `components/sections/<product>/*`
  (one file per section: Hero, Process, Benefits, CTA, …).
- **Rule (from `REFACTOR_ANALYSIS.md` lessons):** moves must be **atomic** — move a
  file AND update all imports in the same verified commit; build between each.

### 4.2 Finish content centralization 🟡 / risk 🟡
- Move `/recrutement` job listings (inline at `page.tsx:27-46`) into
  `src/config/recrutement-data.ts`.
- Sweep product/section components for hardcoded French copy and lift it into the
  existing `config/*-data.ts` files, so non-devs can edit content. (Incremental —
  do it section-by-section as you decompose in 4.1.)

### 4.3 Standardize the page pattern 🟢 / risk 🟢
Enforce: every `app/**/page.tsx` is a thin wrapper that renders one
`components/pages/**` component (most already are; `/references`, `/recrutement`,
`/media-center/blog` are the outliers to bring in line).

---

## Phase 5 — Documentation (close the loop)

### 5.1 Reconcile the docs 🟢 / risk 🟢
`README.md`, `ARCHITECTURE.md`, `REFACTOR_ANALYSIS.md`, `TECHNICAL_REPORT.md`, and
`TODO.md` overlap and are partly out of date (e.g. they still call product-variant
duplication "untouched" though it's resolved). Consolidate to: `README.md` (intro),
`ARCHITECTURE.md` (kept current), `TODO.md` (live backlog) — fold the rest in or
archive. `PROJECT_CONTEXT.md` is the current factual baseline.

### 5.2 Add a `CLAUDE.md` / contributor guide 🟢 / risk 🟢
Capture the editing rules already in README (no parallel product systems, atomic
moves, prefer deletion over hybrids) plus the dev commands and the page pattern.

---

## Suggested Execution Order (sequenced PRs)

1. **PR-1 Hygiene** — Phase 1 (1.1–1.4, 1.6) + Phase 0.2/0.3. Pure deletes + asset
   fixes; safe, instantly shrinks and de-clutters the repo.
2. **PR-2 Correctness** — 0.1 contact form (+ decide 1.5 Firebase here).
3. **PR-3 Build gates** — Phase 2 (un-suppress errors, ESLint, CI). Must precede
   refactors so they're protected.
4. **PR-4 Product page decomposition** — 4.1, one product per PR; fold in 3.1.
5. **PR-5 Client-boundary + content centralization** — 3.2, 4.2, 4.3.
6. **PR-6 Docs** — Phase 5.

**Quick wins (could ship today):** 1.1, 1.2, 1.3, 0.2, 0.3, 2.2, 1.6.
