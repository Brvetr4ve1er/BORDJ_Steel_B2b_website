# docs/archive - historical documents

**Index written 2026-10-26.** Everything in this folder is a point-in-time record.
It is kept because each file preserves a fact or a decision that is recorded
nowhere else - *not* because it describes the project as it stands.

**None of it is current guidance.** For that, read:

| Question | Live document |
|---|---|
| What is this project, how do I run it? | `README.md` |
| How is the code organised? | `ARCHITECTURE.md` |
| What is still broken or waiting on the client? | `KNOWN-ISSUES.md` |
| What has to happen before delivery? | `DELIVERY-PLAN.md` |
| Conventions and editing rules | `CLAUDE.md` |
| Photography and media pipeline | `docs/MEDIA.md` |
| What must the client decide or supply? | `docs/CLIENT-DECISIONS.md` |

## What survives here, and why

### `AUDIT_REPORT.md` - written 2026-05-29, closed 2026-06-02

The first full engineering audit, from before six later waves of remediation. Most
of its findings are long fixed and many of the paths it names no longer exist.

Kept for one reason: it is the only record of **why the ESLint rule
`react/no-unescaped-entities` is turned off** - it fires on the apostrophes in the
French copy written as JSX text. The config file carries no explanation today, so
without this file the next maintainer sees a disabled lint rule with no rationale
and may "fix" it. It also documents the ESLint/CI bring-up and the
import-graph check that caught two live components mistaken for dead ones (the
lesson is now a rule in `CLAUDE.md`).

### `blueprint.md` - written 2025-07-30

The genesis scaffold prompt, from commit 8df3b16 "Initial prototype". It
describes a site that was never built: English navigation labels (Home, About,
Services, Portfolio, Approvals, Clients, Contact) and a language toggle, where
the real navigation is French and config-driven from `company-data.ts`.

Kept because it is the only record of *why* the palette (#4B4B4B, #D9D9D9,
#C1272D, #1A1A1A) and the Montserrat/Roboto pairing were chosen - `globals.css`
and `tailwind.config.ts` carry the values with no rationale attached.

### `2026-07-24-product-wireframes-design.md` - written 2026-07-24

The approved design spec for the animated SVG product wireframes. **It has since
been implemented** - the code lives in `src/components/wireframes/` and `animejs`
is pinned in `package.json` - so the spec's own "pending implementation" status
line is historical, and the file layout it sketches drifted during
implementation. Read the components, not this spec, for what the wireframes do.

Kept as the record of the design decisions behind them: the deliberate, contained
exception to the one-animation-library rule, the per-figure architecture, and the
fidelity note stating which drawings are dimensioned from real spec tables
(sandwich panels, charpente) and which are honest schematics (galvanisation,
chaudronnerie).

## What was removed on 2026-10-26

Four reports were deleted as superseded: `CLEANUP_AND_IMPROVEMENT_PLAN.md`,
`PROJECT_CONTEXT.md`, `REFACTOR_ANALYSIS.md` and `TECHNICAL_REPORT.md`. Their
durable content now lives in `CLAUDE.md` (atomic moves, verify-before-delete),
`KNOWN-ISSUES.md` (the client-blocked content items) and `DELIVERY-PLAN.md` (the
current remediation plan). Git history keeps them if anyone needs the originals.
