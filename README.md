
# BORDJ STEEL — Corporate Website  
**Client project · Industrial / Construction sector · Algeria**

This repository contains the source code for the **official corporate website of Bordj Steel**, a company specializing in steel construction systems and metal fabrication.

This was a **paid, professional project**, designed and built to modern standards, with a strong focus on clarity, performance, scalability, and long-term maintainability.

The website serves as Bordj Steel’s **primary digital presence** — not a demo, not a concept, but a real production-facing platform.

---

## 🧭 Project Intent

The goal of this project was to give Bordj Steel a website that:

- Clearly communicates their **industrial expertise**
- Presents complex steel products in a **structured, understandable way**
- Feels **modern, solid, and trustworthy** — not templated or generic
- Can evolve over time without collapsing under technical debt

This is not a flashy marketing toy.  
It is an **industrial-grade website**, built with the same mindset as the company’s work.

---

## 🏗️ What the Website Covers

The website is designed to showcase:

- Steel construction systems (charpente métallique, sandwich panels, galvanisation, etc.)
- Technical product variants and specifications
- Company history and positioning
- Past projects and references
- Contact and inquiry entry points

It is **purely informational and branding-oriented**.

### Explicitly out of scope
This project does **not** include:
- E-commerce
- ERP or internal business tooling
- User authentication flows
- Dashboards or admin panels

Those were intentionally excluded to keep the system focused and robust.

---

## 🧠 Source of Truth

> **Firebase Studio is the canonical source of truth for this project.**

All major refactors, layout decisions, and product system changes were done inside Firebase Studio first, then mirrored into this GitHub repository.

This repo exists to:
- Track changes
- Ensure build stability
- Enable collaboration and review
- Support long-term maintenance

If something in this repo conflicts with Firebase Studio, **Firebase Studio wins**.

---

## 🧩 Technology Stack

This project uses a modern, production-ready stack:

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **UI**: React
- **Styling**: Tailwind CSS
- **Component system**: shadcn/ui (Radix primitives)
- **Animations**: Framer Motion for UI motion; **anime.js** scoped to the SVG
  technical wireframes in `src/components/wireframes/` (deliberate, contained —
  see that folder's components for why)
- **Forms**: react-hook-form
- **Testing**: Vitest
- **Hosting**: currently served from **Netlify**. Firebase App Hosting config
  (`apphosting.yaml`) and classic Firebase Hosting config (`firebase.json`) both
  still exist in the repo — security headers are therefore declared in
  `next.config.ts` so they apply regardless of which host actually serves.

The stack was chosen to balance:
- Performance
- Developer velocity
- Long-term maintainability
- Industry relevance

---

## 🧱 Architectural Philosophy

- **Server Components by default**
- Client Components only where interaction or animation is required
- Clear separation between:
  - UI components
  - Content/configuration
  - Routing
- Data-driven product rendering (no hardcoded pages per product)

The system favors **clarity over cleverness**.

A detailed breakdown lives in `ARCHITECTURE.md`.

---

## 📁 Project Structure (High Level)

```text
src/
├─ app/                  # Next.js App Router. Each page.tsx is a thin wrapper.
├─ components/
│  ├─ pages/             # One content component per route
│  ├─ sections/          # Composable page sections
│  ├─ product-variants/  # Generic, data-driven product renderer
│  ├─ wireframes/        # anime.js technical drawings (SVG)
│  └─ ui/                # shadcn/ui primitives
├─ config/               # ALL site copy and product data (the source of truth)
├─ hooks/                # Custom React hooks
└─ lib/                  # Utilities
public/
├─ media/                # All site photography (self-hosted, optimised)
├─ logos/                # Client logos
└─ documents/            # Downloadable PDFs
tests/                   # Vitest integrity suite
```

The structure is intentionally boring — boring scales.

**The rule that matters most:** user-facing text and product data live in
`src/config/**`, never inline in JSX. If you are about to type French copy into
a component, it belongs in config instead.

---

## 🖼️ Visuals (Placeholders)

> These will be added to document the final UI and structure.

```md
![Homepage](docs/screenshots/homepage.png)
![Product Page](docs/screenshots/product-page.png)
![Architecture Diagram](docs/diagrams/architecture-overview.png)
![UI Interactions](docs/gifs/ui-interactions.gif)
```

---

## 🚀 Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The app usually runs on:

```
http://localhost:9002
```

Before pushing, run the same four checks CI enforces — all must be clean:

```bash
npm run typecheck   # tsc --noEmit (strict + noUncheckedIndexedAccess)
npm run lint        # next lint
npm test            # vitest — config/asset integrity suite
npm run build       # next build (type + lint errors fail the build)
```

### The test suite

`tests/` holds a fast (<1s) integrity suite that guards the failure modes this
project has actually suffered, rather than chasing coverage:

| File | Guards against |
|---|---|
| `media-integrity.test.ts` | image paths pointing at nothing; new third-party image hotlinks creeping back in |
| `product-tables.test.ts` | spec-table header spans not matching the data (this once shipped an invalid `colSpan={0.5}`); two parts sharing one photo |
| `navigation-and-config.test.ts` | menu links to non-existent routes; unresolvable image keys; malformed contact details |

They are pure Node — no DOM, no browser — which is why they cost one dev
dependency and run in well under a second. Component and end-to-end tests are a
reasonable next step but are not present today.

---

## ☁️ Deployment

The site is currently served from **Netlify**; the repo also still carries
Firebase App Hosting (`apphosting.yaml`) and classic Firebase Hosting
(`firebase.json`) configuration from an earlier setup.

Because those two Firebase products read different config and Netlify reads
neither, **security and cache headers are declared in `next.config.ts`** so they
ship with the application whatever the host. The `firebase.json` block is kept
in sync deliberately: duplicated headers are harmless, missing ones are not.

> **Open decision:** consolidating on one host, and choosing the canonical
> domain, are both outstanding (see *Honest Status* above).

---

## ⚠️ Honest Status

The codebase itself is in good shape. Four gates are green (typecheck, lint,
test, build — 36 static pages), TypeScript runs `strict` plus
`noUncheckedIndexedAccess`, there are **zero** `any` casts and zero
`@ts-ignore`, and `npm audit` reports zero vulnerabilities. All 52 findings from
the engineering audit are closed; see `KNOWN-ISSUES.md`.

**What is genuinely still open is not code — it is content and decisions:**

* **The live domain `bordjsteel.dz` serves an expired TLS certificate.** Visitors
  get a browser security warning before they see anything. This outranks
  everything else here.
* **The canonical domain is undecided.** `siteUrl` points at `bordj-steel.com`,
  which does not resolve to a public host, while the new site deploys to Netlify
  and `.dz` serves the old site. Every canonical/OG/sitemap URL derives from that
  one value, so it is a one-line fix once the hostname is chosen.
* **Published capacity figures contradict each other** — galvanisation appears as
  60 000, 25 000 and 20 000 T/an on different pages. Only the client can say which
  is right.
* **Missing client assets**: the three ISO certificate PDFs, a photo of the
  exterior corner piece, and the identity of the "Tazedj" client logo.
* **Image provenance**: the photography originated as Pinterest/stock URLs and is
  almost certainly not Bordj Steel's own. It is now self-hosted and fast, but
  self-hosting confers no licence — see `docs/MEDIA.md`.
* **No CMS.** All copy lives in typed config, so every text change needs a
  developer and a redeploy. Defensible at this size; the first thing to revisit
  if the client wants to edit their own content.

Nothing here is hidden behind a build flag — `next.config.ts` deliberately does
not suppress type or lint errors.

---

## 🧹 Editing Rules (Read This First)

* Do not introduce parallel product systems
* Do not normalize or rewrite product content unless restoring it verbatim
* Prefer deleting or archiving legacy code over keeping hybrids
* Stability beats novelty

This is a **real client project**, not a sandbox.

---

## 📚 Documentation

* `README.md` — project overview (this file)
* `ARCHITECTURE.md` — technical structure and decisions
* `CLAUDE.md` — contributor / agent guide (commands, conventions, editing rules)
* `KNOWN-ISSUES.md` — the defect register: what was found, what was fixed, what is still blocked on the client
* `docs/MEDIA.md` — the image pipeline (self-hosting, AVIF, how to add a photo)
* `TODO.md` — remaining cleanup roadmap
* `docs/archive/` — historical point-in-time reports from June 2026. **Superseded and largely inaccurate** — they reference file paths that no longer exist. Kept for provenance only; do not treat them as current.

---

## Final Note

This repository represents **professional work delivered to a real company**.

Every decision here was made with:

* Constraints
* Deadlines
* Maintainability
* And future developers in mind

If you’re reading this as a developer:
this is meant to be understandable.

If you’re reading this as a client:
this is meant to last.

