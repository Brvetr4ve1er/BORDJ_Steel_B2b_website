# Project TODO & Roadmap

Status of cleanup/hardening work on the BORDJ STEEL codebase.

## ✅ Done

- [x] Remove dead code & duplicates (`clients.tsx`, `contact.tsx`, `algeria-map.tsx`,
      duplicate `AnimatedWrapper`, stale `expandable-cards.tsx`, stray `src/` config copies).
- [x] Fix two pages broken by unresolved imports (`/contact`, `/about/history`).
- [x] Make the contact form functional (react-hook-form + validation + mailto submission).
- [x] Abstract product-variant logic into one generic `ProductVariantDetails` (already done upstream; schema types reconciled).
- [x] Add ESLint config + GitHub Actions CI (`build`, `lint`, `typecheck`).
- [x] Reach 0 type errors / 0 lint issues; enable **strict builds** (removed `ignore*` flags).
- [x] Dynamic `sitemap.ts` + `robots.ts`; centralize canonical site URL.
- [x] Remove unused dependencies & subsystems (Firebase SDK, Genkit, recharts,
      react-day-picker, date-fns, papaparse, react-algeria-map): 52 → 2 npm vulns.
- [x] Fix the catalogue PDF path (was in a trailing-space folder).

## 🔧 Remaining

### Maintainability
- [ ] Decompose the monolithic product pages (`galvanisation`, `charpente`, `chaudronnerie`)
      into `components/sections/<product>/`, mirroring the history page.
- [ ] Remove the `dynamic(() => Promise.resolve(UnwrappedX))` anti-pattern (no code-split benefit).
- [ ] Push `"use client"` down to interactive leaf components.
- [ ] Standardize heavy routes (`/references`, `/recrutement`, `/media-center/blog`) to thin wrappers
      that render a single `components/pages/**` component.
- [ ] Move `/recrutement` inline job listings into `src/config/`.
- [ ] Remove the ~18 unused shadcn/ui primitives (or keep deliberately as a library).

### Content / assets (need client-provided files or decisions)
- [ ] Confirm the canonical domain (`bordj-steel.com` vs `bordjsteel.dz`) and set `siteMetadata.siteUrl`.
- [ ] Self-host client logos; replace hotlinked third-party CDN URLs. A few entries
      reference `/logos/*.webp` that don't exist (`biolab`, `batimetal`, `man`).
- [ ] Provide the EN/AR catalogue PDFs and the ISO 9001/14001/45001 certificate PDFs
      referenced by `/media-center/blog?tab=catalogue` (currently 404).

### Hardening
- [ ] Address the 2 remaining (transitive, build-time) npm vulnerabilities when a clean fix lands.
- [ ] Add smoke tests (contact form, `ProductVariantDetails`, route render).
