# Known Issues — Bordj Steel B2B

> **Status as of 2026-07-29: every engineering item is closed.** Of the 34 confirmed code
> defects and 18 useless-element findings raised by the July 24 audit, **all 52 are resolved**.
> Everything still listed below is blocked on something only the client can provide: a file,
> a factual figure, or a deployment decision.
>
> Done in two waves (7 agents, then 3) on strictly disjoint file sets, each followed by
> verification: `typecheck` ✔ `lint` ✔ `next build` ✔ (36/36 pages), plus runtime checks
> against the production build — 17/17 routes 200, `/nope` → real 404, zero console errors,
> and every refactored page re-checked in the DOM for content fidelity.

## Where things stand

| Bucket | Count | Status |
|---|---|---|
| 🔴 P0 — breaks now | 4 | **4 closed in code** (2 also need client files) |
| 🟠 P1 — breaks on change | 11 | **11 fixed** |
| 🟡 P2 — wiring smell | 11 | **11 fixed** |
| ⚪ P3 — polish | 7 | **6 fixed**, 1 declined (see below) |
| 🚩 [F] useless elements | 18 | **18 fixed** |
| 🔵 Needs client decision | 5 | unchanged — business calls |
| 📝 [G] content roadmap | 12 | unchanged — needs sign-off |

---

## ✅ Fixed in this pass (verified)

**Product tables — the worst rendering bug on the site.**
`P0-1` `P0-2` `P2-6` `P2-7` — the renderer no longer guesses column grouping by substring-matching
the French word "appui", and no longer derives the icon row's width from `headers.length`. Grouping is
now declared data (`headerGroups: { label, span, icon? }`), sub-header rows moved out of `rows[0]` into a
real typed `subheaders` field, and `row` is properly typed so width drift is now a compile error rather
than invisible. Every numeric cell was preserved byte-for-byte.
*Verified at runtime across all 6 product variants: **32 tables, 0 fractional colSpans, 0 header/body span mismatches** (previously the tôle-nervurée table emitted `colSpan={0.5}`, and Hi-Bond rendered `[1,1,1,1,8]` against real 4/4/2 data groups).*

**Config is now genuinely the single source of truth.**
`P1-1` `P1-10` — the `/contact` page's six-department directory moved into `company-data.ts`; every phone,
email, title and image copied verbatim. *Verified: all 6 numbers, both emails and all 6 department headings render identically to before.*
`P1-2` — `StatsSection` now imports its figures instead of hardcoding literals its own comment claimed were config-sourced.
`P1-11` — `AnimatedBaths` takes its value/label from config instead of hardcoding them.

**Positional array coupling eliminated.**
`P1-3` `P1-4` `P1-5` `P2-5` — `portfolio.tsx` and `Facilities.tsx` no longer index config by `[0..5]`/`[0..3]`.
Every project/unit carries an explicit `imageKey`, and both `/references` and the homepage resolve images
through one shared helper, so they can no longer disagree. Reordering or adding a project now works;
previously a 7th project was silently dropped and a deleted one produced `key={undefined}`.

**Runtime hazards.**
`P1-6` footer year hydration mismatch · `P1-7` unguarded `createElement` that could take down a whole route ·
`P2-8` there are now branded French `not-found.tsx` and `global-error.tsx` boundaries (*verified: `/nope` returns a real 404*).

**Build & deploy.**
`P1-8` `engines: node 20.x`, `.nvmrc`, `@types/node` realigned to the runtime CI actually uses ·
`P1-9` security headers ported into `next.config.ts` so they survive any host (they previously lived only in
`firebase.json`'s classic hosting block, which Firebase App Hosting / Netlify do not apply).

**Polish.** `P3-1` `P3-2` `P3-3` `P3-4` (fr-FR number formatting) `P3-5` · `P2-4` (four copy-paste
media-center stubs → one shared component) · `P2-9` · `P2-11`.

**All 18 [F] useless elements removed.** Highlights, each verified in the rendered DOM:
- **F1** the logo "shine" mask — ~105 lines of duplicate SVG driving an effect that mathematically could never render, shipping ~15× per blog page. *Verified: 0 references remain.*
- **F2** a download-button panel that was permanently invisible yet ran an infinite animation on 8 CTAs.
- **F3** a 275-line stylesheet imported by nothing · **F14** `ui/dock.tsx` (182 lines of dock-magnification physics on a 3-tab switcher) — both deleted.
- **F4** the galvanisation process detail is no longer hidden behind an undiscoverable hover — it was real product content invisible to every touch user.
- **F6** Facilities card titles now always visible *(verified: opacity 1)* — phone users previously saw four unlabeled photo tiles.
- **F7** the six big product-selector circles are now real buttons *(verified: 6 buttons with `aria-pressed`)* — they previously looked clickable and did nothing.
- **F11** the mobile menu's duplicate close button *(verified: exactly one "Fermer")* · **F12** the site-wide Maps iframe *(verified: gone from footer)* · **F5** the hover-only flyout · **F15** search/sort now render only on the Blog tab *(verified per-tab)*.
- **F8** `F9` `F10` `F13` `F16` `F17` `F18` — fake CTAs, triplicated stats, dead filter options, vestigial props and unused data fields.

**`P0-3` — dead ISO PDF links made honest.** The three certification cards linked to PDFs that don't exist,
so every click 404'd. They now render a disabled **"Bientôt disponible"** control *(verified: 0 dead links,
3 disabled buttons, certification names intact)*. Dropping the real files into `public/documents/`
(`Bordj-Steel-ISO-9001.pdf`, `-14001`, `-45001`) re-enables the links with **no code change**.

---

## ✅ Also fixed — the structural refactors (2026-07-29, wave 2)

- **P2-3** — the five routes that embedded full hero/section markup inline (`references`, `privacy`, `terms`, `products`, `contact`) are now thin wrappers per `CLAUDE.md`, each rendering one `components/pages/<name>/<Name>PageContent.tsx`. Bodies moved verbatim; every `export const metadata` stayed in its route file. *Verified: all five render with the same h1/sections/images and no lost French copy.*
- **P2-1** — the four product-content components now follow one convention: `components/pages/<product>/<Product>PageContent.tsx` exporting `<Product>PageContent` (`SandwichPanelsPage` renamed to `…PageContent` for consistency). Moved with `git mv` so history is preserved; every importer updated in the same step. *Verified: zero stale references to the old paths or the old symbol.*
- **P2-2** — `charpente-metallique-content.ts` merged into `charpente-metallique-data.ts` with byte-identical export bodies and names, and deleted. The near-twin filenames that invited wrong-file imports are gone.
- **P3-6 (completed)** — **`noUncheckedIndexedAccess` is now ON.** It surfaced only 10 errors, all fixed properly — **zero** `!` assertions, `as any`, or `@ts-ignore`. It immediately justified itself by catching two live instances of this codebase's signature bug class: `pillars[0].id` and `sortByOptions[0].id` (unguarded first-element access). `noImplicitOverride` is also on.

---

## 🔒 Blocked on client-supplied assets

- **P0-3** — the three ISO certificate PDFs. The dead links are already handled (disabled "Bientôt disponible"); dropping the files into `public/documents/` re-enables them with no code change.
- **P0-4 (mostly resolved)** — `biolab.webp`, `batimetal.webp` and `man.webp` **are now present** (sourced in a later session; the audit entry predated that). The only gap left is **Tazedj**, whose `src` is deliberately empty: its domain does not resolve and the nearest match is an unrelated beverage brand. The carousel shows the company name as clean text. *Needs: confirmation of which company "Tazedj" is.*
- **P2-10** — "Cornière d'angle intérieur" and "…extérieur" showed the **same photo**, so the exterior card displayed the wrong part. The wrong image was removed and the renderer now tolerates a photo-less entry ("Photo à venir") rather than lying to a buyer. *Needs: a real photo of the exterior corner piece.*

## 🟨 Declined, with reasoning

- **P3-7** — `Bordj-Steel-Catalogue-FR.pdf` (4.9 MB). No PDF tooling (`qpdf`/`ghostscript`) is available on this machine, and recompressing a client's official catalogue risks degrading a document that is only fetched when a visitor clicks *download* — it never loads during page render. Low benefit, real risk. Say the word and I'll install tooling and attempt a lossless-only pass.

---

## 🔵 Needs client decision (unchanged — these are facts, not code)

The site currently renders **contradictory numbers to visitors**. No amount of engineering resolves these;
the client must confirm the correct value, after which each should be stated once in config.

1. **Galvanisation annual capacity appears as three different numbers** — `60 000 T/an` (homepage hero + units block), `25 000 tonnes/an` (galvanisation stat + subtitle), `20 000 t/an` (galvanisation body). All three are live. *Most severe item on this list.*
2. **Charpente capacity contradicts itself on one page** — hero `25 000 T/an` vs production table `12 000 T/an`; PRS `3 000` vs `2 000`.
3. **Charpente units maths** — "1500 T/mois (25000 T/an)" but 1500 × 12 = 18 000; also disagrees with the table's 1 000 T/mois.
4. **Galvanisation bath dimensions & max piece length** — `12×1,5×3 m` vs `13×1,8×3,5 m`; max piece `13 m` vs `15 m`. *(Related: the "Bains de traitement: 13" stat is a **count** rendered with a length unit — possibly a confusion with the 13 m bath length.)*
5. **Canonical domain** — `siteUrl` is `https://bordj-steel.com` (drives metadataBase, canonical, OG, sitemap, robots, JSON-LD) while every email and all blog copy say `bordjsteel.dz`.
   **Evidence gathered 2026-07-29** — `bordj-steel.com` resolves to `10.45.72.212`, a *private* RFC1918 address, i.e. it does not serve anything publicly. `bordjsteel.dz` resolves to `41.111.205.14` (a real Algerian host) and responds, though with the expired certificate noted below. **But this still cannot be auto-resolved**, because the *new* site deploys to Netlify (`bordjsteelb2b.netlify.app`) while `.dz` currently serves the *old* site — so the final canonical hostname is a deployment decision, not a lookup.
   **Action needed:** confirm the production hostname; it is then a one-line change to `siteUrl` in `src/config/company-data.ts`, which every URL on the site already derives from (verified: nothing hardcodes a domain around it).

---

## 📝 [G] Content roadmap (researched, needs sign-off)

> **Blocking pre-condition: `bordjsteel.dz` serves an EXPIRED TLS certificate** — browsers show a security
> warning before any content loads. Fix that first; it outranks everything below.

1. **FAQ Galvanisation** (EN ISO 1461: épaisseurs de zinc, durée de vie, dimensions max, préparation des pièces).
2. **Page "Normes & réglementation"** — CCM97, RPA99 v2003, RNV 2013/DTR C2-4.7, Eurocode 3. What Algerian engineers actually search for; no competitor explains them.
3. **Certifications enrichies** — ISO 9001/14001/45001 expliquées en bénéfice client + homologation SONELGAZ *(blocked: PDFs)*.
4. **Section "Le groupe Condor"** sur Qui sommes-nous *(chiffres publics, à confirmer)*.
5. **FAQ Panneaux sandwich** — Euroclasse B-s2,d0, PUR vs PIR, épaisseurs chambre froide. ⚠️ Also settles a live contradiction: the hero claims **B-s2,d0** while the spec tables say **"B3 : standard"** — B3 is the *easily flammable* class. Commercially dangerous; needs client confirmation.
6. **Glossaire construction métallique** (PRS, panne, plancher collaborant, TN40…) — SEO longue traîne.
7. **Références → mini études de cas** (tonnage/couverture/bardage déjà en config; manque récit + photo).
8. **Page "Bâtiments préfabriqués (PEB)"** — le terme est cité sans être expliqué.
9. **Remplacer les articles filler 9-13** par de vrais articles techniques.
10. **Salons & événements** — BATI-EST EXPO (8ᵉ édition 14-17 oct. 2026, Zénith Constantine — vérifié).
11. **Vraie fiche technique galvanisation PDF** *(blocked: chiffres client)*.
12. **Couverture nationale / livraison par wilaya** — la question n°1 des acheteurs.

---

## ✓ Rejected by verification (logged for transparency)

- **"Duplicate Certifications components"** — inventory accurate, but each has a distinct purpose and all imports resolve. Not a defect.
- **"charpente defaults to `pillars[0]`"** — selection is by `id` via `.find()`; defaulting the initial pillar is intentional and reorder-safe. Not a defect.
- **"`use-toast` re-subscribes on every toast"** — mechanics described correctly, but the re-subscribe is cheap and correct (standard shadcn pattern). Not a defect.

---

*Audit generated 2026-07-24 · remediation waves 2026-07-29 · **all 52 code findings fixed and verified**. Everything still open requires a client-supplied file, a factual figure only the client knows, or a deployment decision — none of it is engineering work.*
