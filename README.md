
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
- **Component system**: shadcn/ui
- **Animations**: Framer Motion
- **AI tooling**: Genkit (non-critical, experimental)
- **Hosting**: Firebase App Hosting

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
├─ app/                # Next.js App Router (public routes)
├─ components/         # Reusable UI and page components
│  ├─ ui/              # shadcn/ui primitives
│  └─ product-variants/# Product rendering logic
├─ config/             # Static content & configuration
├─ hooks/              # Custom React hooks
├─ lib/                # Utilities & static assets
├─ ai/                 # Genkit / AI-related code
public/                # Static assets (logos, images)
````

The structure is intentionally boring — boring scales.

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

For AI-related experimentation:

```bash
npm run genkit:dev
```

---

## ☁️ Deployment

The project is deployed via **Firebase App Hosting**.

* Pushes to `main` trigger automatic builds and deployments
* Configuration lives in:

  * `firebase.json`
  * `apphosting.yaml`

No manual deployment steps are required.

---

## ⚠️ Known Technical Debt (Honest Section)

This project is stable, but not perfect. Known issues include:

* Some large, monolithic page components
* Overuse of `"use client"` driven by animation wrappers
* Historical duplication in product variant components
* A small amount of unused legacy code pending cleanup

These are documented and tracked in `TODO.md`.

No architectural shortcuts were taken to hide these — they’re visible and intentional.

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
* `TODO.md` — known debt and cleanup roadmap

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

