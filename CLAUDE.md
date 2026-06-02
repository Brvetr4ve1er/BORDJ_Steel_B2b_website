# Contributor & Agent Guide

Practical guide for working in this repository. See `README.md` for the project
overview and `ARCHITECTURE.md` for structure.

## Commands

```bash
npm install         # install dependencies
npm run dev         # dev server on http://localhost:9002 (Turbopack)
npm run build       # production build — fails on type or lint errors
npm run lint        # next lint
npm run typecheck   # tsc --noEmit
```

Run `typecheck`, `lint` and `build` before pushing — CI enforces all three.

## Conventions

- **Next.js App Router.** Routes live in `src/app/**`; each `page.tsx` should be a
  thin wrapper that renders one component from `src/components/pages/**`.
- **Component layers:** `ui/` = shadcn primitives; `sections/` = atomic page sections;
  `pages/` = composition wrappers; `product-variants/` = the generic product renderer.
- **Content lives in `src/config/`** (`company-data.ts`, `*-data.ts`,
  `product-variants.config.ts`). Prefer editing config over hardcoding copy in JSX.
- **Path alias:** import via `@/*` (→ `src/*`), not long relative paths.
- **Server-first:** keep components server-rendered; add `"use client"` only on the
  smallest interactive/animated leaf.
- **Canonical URL:** use `companyData.siteMetadata.siteUrl` — never hardcode the domain.
- The product variant renderer is data-driven: section `type` discriminants are
  camelCase (`keyValue`, `imageGrid`, `table`, `list`, `text`, `image`) and must match
  `product-variant-schema.ts` and `ProductVariantDetails.tsx`.

## Editing rules

- Do not introduce parallel product systems or duplicate components.
- Do not rewrite or "normalize" product content unless restoring it verbatim.
- Prefer deleting/archiving legacy code over keeping hybrids — **but verify zero
  usage first** (grep imports *and* names; the repo has had imports pointing at
  the wrong path, so a file that looks dead may be a misreferenced live one).
- Moves must be atomic: move a file **and** update every import in the same commit,
  then build before committing.
- Do not re-enable `ignoreBuildErrors` / `ignoreDuringBuilds` to paper over errors.
- Stability over novelty. This is a real client project.
