# Architecture Overview

This document provides a high-level overview of the BORDJ STEEL web application's architecture, including folder structure, key design patterns, and identified technical debt.

## Folder Structure

-   **/src/app/**: The core of the Next.js application, using the App Router paradigm. Each folder within corresponds to a public URL route (e.g., `/src/app/products/charpente-metallique` maps to `/products/charpente-metallique`).
    -   `layout.tsx`: The root layout, which applies to all pages.
    -   `globals.css`: Global styles and Tailwind CSS theme configuration.
    -   `page.tsx`: The entry file for a specific route.

-   **/src/components/**: Contains all React components.
    -   `/ui/`: Houses the base components provided by ShadCN UI (e.g., `Button`, `Card`).
    -   `/product-variants/`: Contains components specific to different product types. **(Note: High level of code duplication here)**.
    -   Other files are application-specific components (e.g., `navbar.tsx`, `footer.tsx`).

-   **/src/config/**: Stores static data, such as text content, navigation links, and product specifications, separating content from the UI code.

-   **/src/lib/**: Contains utility functions (`utils.ts`) and static JSON assets (`algeria-wilayas.json`).

-   **/src/hooks/**: Home to custom React hooks used across the application (e.g., `use-breakpoint.ts`).

-   **/public/**: Contains static assets like the brand logo and the product catalogue PDF, served directly. `sitemap.xml` and `robots.txt` are generated dynamically by `src/app/sitemap.ts` and `src/app/robots.ts`.

## Build & CI

-   The build is **strict**: `next.config.ts` no longer suppresses errors, so `next build` fails on TypeScript or ESLint errors.
-   `.github/workflows/ci.yml` runs `build`, `lint` and `typecheck` on every push/PR; all three are green and safe to require in branch protection.
-   Canonical site URL is centralized at `companyData.siteMetadata.siteUrl` (used by metadata, sitemap and robots).

## Firebase Services

-   **Firebase App Hosting**: The primary service used for building and deploying the Next.js application. Configuration is managed in `apphosting.yaml` and `firebase.json`.
-   **Firestore & Firebase Auth**: Not used. The unused Firebase client SDK and Genkit scaffolding were removed during cleanup; only the App Hosting deploy config remains.

## Known Technical Debt & Architectural Issues

1.  **Monolithic Product Pages**: `galvanisation-page-content.tsx`, `charpente-metallique-page.tsx` and `chaudronnerie-page-content.tsx` remain large single files and use an ineffective `dynamic(() => Promise.resolve(...))` pattern (no real code-splitting). They should be decomposed into `components/sections/<product>/` like the history page already is.

2.  **Overuse of Client Components**: `"use client"` is still used more broadly than necessary, largely driven by `<AnimatedWrapper>`. The boundary should be pushed to interactive leaf components.

3.  **Unused UI primitives**: ~18 shadcn/ui primitives in `/src/components/ui/` have no importers and remain as an unused component library.

### Resolved
-   Product-variant duplication — now a single generic `ProductVariantDetails` renderer.
-   Dead/duplicate code (`clients.tsx`, duplicate `AnimatedWrapper`, stale `expandable-cards.tsx`, unused Firebase/Genkit) removed.
-   Two pages broken by unresolved imports (`/contact`, `/about/history`) fixed.
-   Non-functional contact form, broken sitemap, and ~50 npm vulnerabilities fixed.
