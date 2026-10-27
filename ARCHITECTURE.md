# Architecture Overview

This document provides a high-level overview of the BORDJ STEEL web application's architecture, including folder structure, key design patterns, and identified technical debt.

## Folder Structure

-   **/src/app/**: The core of the Next.js application, using the App Router paradigm. Each folder within corresponds to a public URL route (e.g., `/src/app/products/charpente-metallique` maps to `/products/charpente-metallique`).
    -   `layout.tsx`: The root layout, which applies to all pages.
    -   `globals.css`: Global styles and Tailwind CSS theme configuration.
    -   `page.tsx`: The entry file for a specific route.

-   **/src/components/**: Contains all React components.
    -   `/ui/`: Houses the shadcn/ui primitives (e.g., `Button`, `Card`) **and** the shared presentational components reused across pages (e.g., `steel-loader`, `ken-burns`) — the convention `CLAUDE.md` records.
    -   `/product-variants/`: Contains components specific to different product types.
    -   Other files are application-specific components (e.g., `navbar.tsx`, `footer.tsx`).

-   **/src/config/**: Stores static data, such as text content, navigation links, and product specifications, separating content from the UI code.

-   **/src/lib/**: Contains utility functions (`utils.ts`).

-   **/src/hooks/**: Home to custom React hooks used across the application (`use-toast.ts`).

-   **/public/**: Contains static assets like the brand logo and the product catalogue PDF, served directly. `sitemap.xml` and `robots.txt` are generated dynamically by `src/app/sitemap.ts` and `src/app/robots.ts`.

## Build & CI

-   The build is **strict**: `next.config.ts` no longer suppresses errors, so `next build` fails on TypeScript or ESLint errors.
-   `.github/workflows/ci.yml` runs five jobs on every push/PR: `build`, `lint`, `typecheck` and `test` are **required**; `audit` (`npm audit --omit=dev`) is **advisory** — it carries `continue-on-error` and must not be added to branch protection, by design. Watch the four required jobs run green on this repo once before requiring them in branch protection, so a protection rule cannot lock merges on a workflow that has never completed here.
-   Canonical site URL is centralized at `companyData.siteMetadata.siteUrl` (used by metadata, sitemap and robots).

## Deployment

-   The site is served from **Netlify** (`bordjsteelb2b.netlify.app`). **No deploy config file remains in the repo**: `firebase.json`, `apphosting.yaml` and `.idx/` were removed when deployment was consolidated onto one host.
-   Security and cache headers are therefore declared in `next.config.ts:20-29`, not in host config. They are host-independent by design: they ship inside the application, so they apply on Netlify today and would survive a move to any other Node host. The comment at `next.config.ts:7-15` asks that they not be pushed back out into a host-specific config file — that is deliberate, not an oversight.
-   The Node major is pinned in `.nvmrc` (22) and in `package.json`'s `engines` field.
-   **Firestore & Firebase Auth**: Not used. The unused Firebase client SDK and Genkit scaffolding were removed during cleanup.
-   The canonical hostname is **still an open client decision** — see `docs/CLIENT-DECISIONS.md` question 1.

## Known Technical Debt & Architectural Issues

1.  **Product page components are still the largest in `components/pages/`**: `pages/charpente-metallique/CharpenteMetalliquePageContent.tsx`, `pages/chaudronnerie/ChaudronneriePageContent.tsx` and `pages/galvanisation/GalvanisationPageContent.tsx`, roughly 320–375 lines each. They could be decomposed into `components/sections/<product>/` like the history page already is. The `dynamic(() => Promise.resolve(...))` anti-pattern they used to carry is gone: each of the three routes now splits at a real `dynamic(() => import(...))` boundary in its `page.tsx`.

2.  **Overuse of Client Components**: `"use client"` is still used more broadly than necessary, largely driven by `<AnimatedWrapper>`. The boundary should be pushed to interactive leaf components.

### Resolved
-   **"Unused UI primitives"** — a false claim, now verified: all 20 files in `/src/components/ui/` have at least one importer outside themselves.
-   Product-variant duplication — now a single generic `ProductVariantDetails` renderer.
-   Dead/duplicate code (`clients.tsx`, duplicate `AnimatedWrapper`, stale `expandable-cards.tsx`, unused Firebase/Genkit) removed.
-   Two pages broken by unresolved imports (`/contact`, `/about/history`) fixed.
-   Non-functional contact form, broken sitemap, and ~50 npm vulnerabilities fixed.
