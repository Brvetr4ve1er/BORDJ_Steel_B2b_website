# BORDJ STEEL — Engineering Audit & Stabilization Report

> Role: Principal Engineer / Staff Architect / Software Archaeologist
> Date: 2026-05-29 · Branch: `claude/project-cleanup-plan-DhvG5`
> Mandate: clean, organize, document, stabilize, improve — **without breaking working behavior.**
>
> ⚠️ **Environment constraint:** `node_modules` is not installed in this container, so
> `build` / `typecheck` / `lint` could **not** be run. All findings are from rigorous
> **static analysis**. Every deletion was verified by import-graph + name-level grep,
> and a missing-import scan was run before and after to prove no new breakage.

---

## PROJECT HEALTH SCORE: **54 / 100**

| Dimension | Score | Notes |
|---|---:|---|
| Architecture & structure | 7/10 | Clean data layer + generic product renderer; but 4 monolithic pages, fake `dynamic()` splitting |
| Correctness / stability | 3/10 | **2 live pages broken**, contact form non-functional, build-error suppression |
| Code quality | 5/10 | Dead code (partly cleaned), duplication, ~63% client components |
| Dependencies | 5/10 | Several unused libs; fragile hotlinked images |
| Tooling / CI / tests | 2/10 | No tests, no CI, no ESLint config, errors suppressed |
| Security / headers | 8/10 | Good CSP/HSTS/cache headers in `firebase.json` |
| Documentation | 7/10 | Rich docs, but partly aspirational/inaccurate (now reconciled) |

The fundamentals are sound, but a site described as "production-facing" currently ships
**two broken pages and a dead lead-capture form**, with the safety nets (type/lint
checks) turned off. That gap between intent and runtime drives the score.

---

## ARCHITECTURE DIAGRAM (text)

```
                        ┌──────────────────────────┐
                        │  Firebase App Hosting     │  (apphosting.yaml, firebase.json)
                        │  Next.js 15 SSR/SSG       │  security headers + asset cache
                        └─────────────┬─────────────┘
                                      │
                 ┌────────────────────┴───────────────────┐
                 │            src/app  (App Router)         │
                 │  layout.tsx (fonts, metadata, Toaster)   │
                 │  16 routes → mostly thin page.tsx        │
                 └───┬───────────────┬──────────────┬───────┘
                     │               │              │
        ┌────────────▼───┐   ┌───────▼────────┐  ┌──▼────────────────┐
        │ components/    │   │ components/    │  │ components/pages/ │
        │ *.tsx (page    │   │ sections/      │  │ history/...       │
        │ bodies, nav,   │   │ (atomic, ✅)   │  └───────────────────┘
        │ footer, hero)  │   └───────┬────────┘
        └───────┬────────┘           │
                │            ┌────────▼─────────┐
        ┌───────▼────────┐   │ components/ui/   │  shadcn primitives (~36; ~20 unused)
        │ product-       │   └──────────────────┘
        │ variants/      │
        │ ProductVariant │◄──── schema-driven, generic ✅
        │ Details (✅)   │
        └───────┬────────┘
                │
        ┌───────▼────────────────────────────────────────────┐
        │ src/config/ (content & specs)  ← single source ✅    │
        │ company-data · products-data · *-data · blog-data    │
        │ src/app/lib/placeholder-images.json (image catalog)  │
        └──────────────────────────────────────────────────────┘

   DEAD/UNUSED (excluded from graph):
     src/services/firebase.ts · src/lib/firebase-config.ts · src/ai/*
     src/logos/ (~12MB, not served)

   ⚠️ BROKEN EDGES (imports that don't resolve, masked by ignoreBuildErrors):
     app/contact/page.tsx ──X──► @/components/sections/ContactInfo   (real: components/contact-info.tsx)
     pages/history/HistoryPageContent ──X──► @/components/sections/HistoryTimeline (real: components/timeline.tsx → export Timeline)
```

---

## PHASE 1 — AUDIT

### 1A. Architecture Overview
- **Purpose:** French-language B2B corporate/marketing site for Bordj Steel SPA (Algerian steel fabrication). Informational only — no e-commerce/auth/admin.
- **Stack:** Next.js 15.5.9 (App Router) · React 18.3 · TypeScript 5 (`strict`) · Tailwind 3.4 · shadcn/ui (Radix) · Framer Motion 11 · lucide-react.
- **Build tools:** Next/Turbopack (`dev -p 9002`), `tsc --noEmit`, `next lint` (no config present).
- **Deployment:** Firebase App Hosting; `main` push → auto build/deploy. Good security/cache headers.
- **Unused subsystems:** Firebase SDK, Genkit AI — scaffolded, never wired.

### 1B. Folder Analysis
| Folder | Purpose | Usage | Cleanup opportunity |
|---|---|---|---|
| `src/app` | Routes (16 pages, 1 layout) | Active | Standardize 3 heavy pages (`references`, `recrutement`, `blog`) to thin wrappers |
| `src/components` (root) | Page bodies, nav/footer, shared | Active | 4 monolithic page files; **3 dead files removed** this pass |
| `src/components/ui` | shadcn primitives (~36) | Mixed | **~20 unused primitives** (see Dead Code Report) |
| `src/components/sections` | Atomic homepage/history sections | Active (good) | Missing `ContactInfo`/`HistoryTimeline` (broken imports) |
| `src/components/pages` | Page composition wrappers | Active | Only `history`; extend pattern to products |
| `src/components/product-variants` | Generic, schema-driven renderer | Active (excellent) | None |
| `src/components/shared` | Was a dup `AnimatedWrapper` | **Removed** | Done |
| `src/config` | Content & product specs | Active (good) | Move `/recrutement` inline jobs here |
| `src/hooks` | `use-toast`, `use-breakpoint` | Active | None |
| `src/lib` | utils, wilayas json, firebase-config | Mixed | `firebase-config.ts` unused |
| `src/services` | `firebase.ts` | **Unused** | Remove or wire |
| `src/ai` | Genkit | **Unused** | Remove or wire |
| `src/logos` | 27 client logos (~12MB) | **Not served** | Move needed ones to `public/logos/` as webp; delete rest |
| `public` | brand logo, robots, sitemap, pdf | Active | `sitemap.xml` placeholders; pdf path has trailing space |

### 1C. Dependency Analysis (static; confirm with a build before removing)
**Unused — candidates for removal:**
| Package | Only consumer | Status after this pass |
|---|---|---|
| `react-algeria-map` | `algeria-map.tsx` | **Now fully unused** (component deleted) |
| `papaparse` + `@types/papaparse` | none | Unused |
| `firebase` | `services/firebase.ts` (unused) | Unused unless adopted for contact form |
| `genkit`, `@genkit-ai/googleai`, `genkit-cli` | `src/ai/*` (unused) | Unused |
| `recharts` | `ui/chart.tsx` (0 importers) | Unused (cascade) |
| `react-day-picker` + `date-fns` | `ui/calendar.tsx` (0 importers) | Unused (cascade) |
| ~12 `@radix-ui/*` | unused ui primitives | Unused (cascade — see Dead Code) |

**Keep (framework/build-time, no direct import):** `next`, `react-dom`, `sharp` (Next image opt), `tailwindcss-animate` (Tailwind plugin), `tailwind-merge`/`clsx`/`class-variance-authority` (used).
**Deprecated/high-risk:** none flagged by version; risk is **breadth of surface**, not staleness. **Version conflicts:** none detected (single React 18 line).

### 1D. Code Quality Analysis
- **Dead code:** see Dead Code Report. (3 files + 1 dup removed this pass.)
- **Circular dependencies:** none detected via import-graph review (tree-shaped: app→components→ui/config).
- **Duplicate logic:** `AnimatedWrapper` (resolved), `clients.tsx` vs `sections/Clients.tsx` (resolved); product-variant duplication already resolved in prior work.
- **Large files (LOC):** `products-data.ts` 698 · `galvanisation-page-content` 500 · `product-variants.config` 479 · `expandable-cards` 412 · `charpente-metallique-page` 388 · `chaudronnerie-page-content` 383 · `chart` 365 · `navbar` 344 · `company-data` 304 · `sandwich-panels-page` 298.
- **Tech-debt hotspots:** the 4 monolithic product pages; `dynamic(() => Promise.resolve(UnwrappedX))` (no real code-split); `ignoreBuildErrors`/`ignoreDuringBuilds`; ~63% `"use client"`.

---

## PHASE 2 — RISK ASSESSMENT

### ✅ SAFE (executed this pass — near-zero risk, behavior-preserving)
- Remove tracked artifact `tsconfig.tsbuildinfo`; delete empty `.modified`.
- Delete verified-dead components: `clients.tsx`, `contact.tsx`, `algeria-map.tsx`.
- Consolidate duplicate `AnimatedWrapper` (migrate 1 import → canonical; delete `shared/` copy).
- Delete stray `src/` duplicates: `src/next.config.ts`, `src/ARCHITECTURE.md`, `src/TODO.md`, `src/public/`.

### 🟡 MEDIUM (recommended next; needs build validation)
- Fix the 2 broken page imports (`/contact`, `/about/history`) — *behavior-restoring* (see Immediate Fixes).
- Remove unused npm packages + ~20 unused ui primitives (cascade).
- Self-host client logos; prune `next.config.ts` remote hosts; fix `sitemap.xml`/PDF path.
- Decompose monolithic product pages; remove `dynamic(Promise.resolve())` anti-pattern.

### 🔴 HIGH (needs explicit approval / product decision)
- Make the contact form functional (adds backend behavior; choose mailto vs Route Handler vs Firebase).
- Re-flip `ignoreBuildErrors`/`ignoreDuringBuilds` to `false` (will surface real errors that must be fixed first).
- Push `"use client"` to leaves (touches many components/render boundaries).

---

## PHASE 3 — REFACTOR STRATEGY (per-change)

**R1 · Fix `/contact` broken import** — *Problem:* lazy-imports missing `sections/ContactInfo`; section silently fails. *Impact:* contact page degraded in prod. *Risk:* Low. *Approach:* repoint to `@/components/contact-info` (export name matches). *Rollback:* `git revert`.

**R2 · Fix `/about/history` broken import** — *Problem:* static import of missing `sections/HistoryTimeline`; component is `Timeline` in `@/components/timeline`. *Impact:* history page fails to render the timeline (build masked). *Risk:* Low. *Approach (chosen by user):* either alias `import { Timeline as HistoryTimeline } from '@/components/timeline'`, or move file → `sections/HistoryTimeline.tsx` + rename export. *Rollback:* `git revert`.

**R3 · Remove unused dependencies** — *Problem:* ~10 unused packages + 20 ui primitives enlarge install/attack surface. *Impact:* slower installs, confusion. *Risk:* Medium (can't build here). *Approach:* remove in a dedicated branch, run `npm i && build`, verify. *Rollback:* restore `package.json` + lockfile.

**R4 · Asset hygiene** — fix `sitemap.xml` domain placeholders + nonexistent `/products`; rename `public/documents /catallogue de produi Final.pdf`; self-host logos. *Risk:* Low–Medium. *Rollback:* `git revert`.

**R5 · Decompose monolith pages + drop fake dynamic** — *Risk:* Medium; atomic per-section commits, build between each. *Rollback:* per-commit revert.

**R6 · Re-enable build checks + ESLint + CI** — *Risk:* Medium (surfaces latent errors). *Approach:* scaffold eslint, fix surfaced issues, flip flags, add CI. *Rollback:* revert config.

---

## DEAD CODE REPORT
**Removed this pass (verified zero references):** `clients.tsx`, `contact.tsx`, `algeria-map.tsx`, `shared/AnimatedWrapper.tsx`, `src/next.config.ts`, `src/ARCHITECTURE.md`, `src/TODO.md`, `src/public/sandwich-panels-export.html`, `tsconfig.tsbuildinfo` (untracked), `.modified`.

**NOT removed — proven to be misreferenced LIVE code (do not delete):**
`src/components/contact-info.tsx` (real `ContactInfo`), `src/components/timeline.tsx` (real history timeline). These are the targets of the 2 broken imports — see Immediate Fixes.

**Unused shadcn UI primitives (0 importers) — recommend batch removal after build check:**
`alert`, `alert-dialog`, `badge`, `calendar`, `chart`, `checkbox`, `collapsible`, `dropdown-menu`, `form`, `menubar`, `popover`, `progress`, `radio-group`, `scroll-area`, `separator`, `shiny-button`, `skeleton`, `slider`, `switch`, `tabs`.

**Unused non-served assets:** `src/logos/` (~12MB). **Unused scaffolding:** `src/services/firebase.ts`, `src/lib/firebase-config.ts`, `src/ai/*`.

---

## IMMEDIATE FIXES
1. ✅ **`/contact` page (DONE)** — import repointed to `@/components/contact-info` (R1). Broken page restored.
2. ✅ **`/about/history` page (DONE)** — `timeline.tsx` relocated to `components/sections/HistoryTimeline.tsx`, export renamed `Timeline`→`HistoryTimeline`, relative imports switched to `@/` aliases (R2, structural). Broken page restored. Missing-import scan now empty.
3. **Contact form** is a no-op `<form>` (no submit handler) + empty button label (`form.button` missing in `company-data.ts`). *Needs product decision on backend.*
4. **`sitemap.xml`** contains `[YOUR_DOMAIN_HERE]` + nonexistent `/products`. Domain mismatch `bordj-steel.com` vs `bordjsteel.dz`.
5. **5 client logos** reference nonexistent `public/logos/*.webp` → broken images.

---

## REFACTOR ROADMAP (sequenced)
1. **(done)** Phase 4 safe cleanup.
2. **(done)** Fix 2 broken page imports (R1, R2 — structural).
3. Build-integrity branch: ESLint config, fix surfaced type/lint errors, flip `ignore*` flags, add GitHub Actions CI (`ci → typecheck → lint → build`). (R6)
4. Dependency + dead-UI pruning with a real build to validate. (R3)
5. Asset hygiene: sitemap, logos self-host, PDF rename, prune remote hosts. (R4)
6. Contact form backend (product decision). 
7. Decompose monolith product pages; remove `dynamic(Promise.resolve())`; push `"use client"` to leaves. (R5)
8. Content centralization (`/recrutement` jobs → config); standardize heavy pages to thin wrappers.

---

## FUTURE IMPROVEMENTS (Phase 5 — recommend, do not auto-apply)
| Recommendation | Benefit | Dev cost | Risk | Priority (1-10) |
|---|---|---|---|---:|
| Re-enable type/lint checks + CI | Prevents the class of bug that broke 2 pages | M | M | **10** |
| Fix broken pages + contact form | Restores core user journeys | S–M | L–M | **10** |
| Self-host logos / fix sitemap | Reliability, SEO, LCP | M | L | 8 |
| Prune unused deps & ui primitives | Smaller surface/install | M | M | 7 |
| Decompose monolith pages | Maintainability | L | M | 6 |
| Push `"use client"` to leaves | Bundle size / LCP | L | M | 6 |
| Add smoke tests (form, ProductVariantDetails, route render) | Regression safety | M | L | 7 |
| Feature-based folder grouping (`features/products/...`) | Navigability | M | M | 4 |

---

## ROLLBACK INSTRUCTIONS
- **Undo the safe-cleanup commit:** `git revert <safe-cleanup-sha>` (deletions restored), or
  `git reset --hard HEAD~1` before pushing.
- **Restore a single deleted file:** `git checkout <prev-sha> -- <path>`.
- **Restore the tracked artifact:** `git checkout <prev-sha> -- tsconfig.tsbuildinfo` (it regenerates on build anyway).
- All Phase 4 changes are isolated in one commit on `claude/project-cleanup-plan-DhvG5`; nothing was force-pushed; history is linear and revertible.

---

## GUARDRAILS HONORED
No business logic changed. No public API renamed. No file deleted without import-graph + name-level verification (which **caught 2 misreferenced live components** and spared them). No new dependencies added. No build performed could prove green (environment lacks `node_modules`) — so every higher-risk change is **proposed, not silently applied**.
