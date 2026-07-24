# Product Wireframes — Design Spec

**Date:** 2026-07-24
**Status:** Approved (design), pending implementation

## Goal

On each of the four product pages, render an animated, data-driven SVG technical
wireframe of the product, drawn with **anime.js**. Wireframes animate in on scroll
(lines trace, dimension callouts stagger in) and, where the spec data supports it,
expose controls that redraw the geometry live. Every dimension shown must come from
that page's real config data; nothing is invented.

## Scope

All four product pages, fidelity-matched to available data:

| Page | Route | Wireframe | Control |
|---|---|---|---|
| Sandwich Panels | `/products/sandwich-panels` | Panel cross-section: two profiled steel skins + foam core, trapezoidal rib | Core thickness toggle 30/35/40/50/60mm → redraws core height + total-thickness label + weight |
| Charpente | `/products/charpente-metallique` | PRS profile: I/L end-section + elevation, dimensioned | Profile toggle: L/I ↔ caisson (box) |
| Galvanisation | `/products/galvanisation-a-chaud` | Zinc-bath cross-section (12×1.5×3m) with beam immersing, 450°C callout | Static reveal |
| Chaudronnerie | `/products/chaudronnerie` | Silo/tank elevation: cylinder + conical hopper, ladder/platform labels | Static reveal |

**Fidelity note:** Sandwich + Charpente are fully dimensioned from exact table
values. Galvanisation + Chaudronnerie are accurate *schematics* — correct
proportions and real labels/figures, but not every millimetre is spec-derived
(the data does not exist).

## Data sources (verified present)

- Sandwich: `src/config/product-variants.config.ts` (couverture/bardage dimension
  tables: thicknesses 30–60mm, skin 0.5–0.7mm, width 1000mm, per-type weights) +
  `src/config/sandwich-panels-data.ts` (`sandwichHeroStats`: 30–200mm, 15.4m max).
- Charpente: `src/config/charpente-metallique-data.ts` (PRS: 350–2000mm web,
  ≤16000mm length; "forme L ou caissons").
- Galvanisation: `src/config/galvanisation-data.ts` (bath 12×1,5×3m, 450°C, 13 bains).
- Chaudronnerie: `src/config/chaudronnerie-data.ts` (silos feature list; schematic).

## Architecture (Approach A — primitive + figures)

```
src/components/wireframes/
  use-draw-in.ts            # client hook: IntersectionObserver -> run anime.js draw-in;
                            # honours prefers-reduced-motion (renders final state instantly);
                            # returns a ref + a `play` trigger; cleans up on unmount.
  ProductWireframe.tsx      # client shell: reserved responsive aspect box, <svg viewBox>,
                            # figure caption, optional controls slot. Owns anime.js lifecycle
                            # via use-draw-in. No product-specific geometry.
  figures/
    SandwichPanelFigure.tsx     # geometry from thickness state; renders skins/core/ribs/labels
    CharpenteProfileFigure.tsx  # I/L vs caisson geometry; dimension callouts
    GalvanisationBathFigure.tsx # static bath + immersing beam
    ChaudronnerieSiloFigure.tsx # static silo elevation
  wireframe.css (or inline) # stroke tokens, dashed dimension lines, label type
```

- Each **figure** is a pure function of its props (state) → SVG children. It exposes
  `className` hooks (`.wf-line`, `.wf-dim`, `.wf-label`) that the shell's anime.js
  targets for draw-in / fade. Figures hold no animation logic.
- **Controls** (thickness / profile) are real `<button aria-pressed>` in a thin
  per-page wrapper; changing state recomputes geometry and re-triggers the draw of
  the changed elements only.
- **Interface per figure:** props in (state + resolved data), SVG out; testable/
  viewable in isolation.

## anime.js integration

- Add `animejs` (v4, ESM) to dependencies. Confirm exact draw API against the
  installed package types before coding (`svg.createDrawable` + `draw`, `animate`,
  `stagger`). Pin the version.
- Scoped **only** to `src/components/wireframes/**`. Framer Motion remains the
  animation system everywhere else. This is a deliberate, contained second-library
  exception, made because anime.js was explicitly requested (noted vs. the
  CLAUDE.md "no parallel systems" guidance).
- Reduced motion: if `prefers-reduced-motion: reduce`, skip animation and render the
  fully-drawn final state.

## Placement

Each wireframe is its own `<section>` placed just after the hero / atop the spec
area of its page, so the drawing anchors the numbers that follow. Match each page's
existing container/section rhythm; server pages render the client wireframe as a leaf.

## Quality floor

- Responsive: SVG scales via viewBox; controls stack on mobile.
- Reserved aspect box → no layout shift.
- Keyboard-accessible controls, visible focus, `aria-pressed`.
- `prefers-reduced-motion` respected.
- French labels/copy, consistent with the site.

## Verification

- `npm run typecheck`, `npm run lint`, `npx next build` (all pages).
- Dev-server DOM checks: each wireframe section present, SVG renders, controls toggle
  changes geometry (measure a dimension element), zero console errors.

## Out of scope

- No backend, no data model changes, no changes to the spec tables themselves.
- No wireframes outside the four product pages.
