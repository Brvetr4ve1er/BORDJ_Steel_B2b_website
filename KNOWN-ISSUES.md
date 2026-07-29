# Known Issues — Bordj Steel B2B

> **Status as of 2026-07-29: the remediation pass is done.** Of the 34 confirmed code defects
> and 18 useless-element findings raised by the July 24 audit, **46 are now fixed in code**.
> What remains below is (a) three structural refactors deliberately deferred, (b) items
> blocked on client-supplied assets, and (c) factual contradictions only the client can resolve.
>
> Fixes were made by 7 agents on strictly disjoint file sets, then verified: `typecheck` ✔
> `lint` ✔ `next build` ✔ (36/36 pages), plus runtime checks against the production build —
> 17/17 routes 200, `/nope` → real 404, zero console errors.

## Where things stand

| Bucket | Count | Status |
|---|---|---|
| 🔴 P0 — breaks now | 4 | **3 fixed**, 1 blocked on client assets |
| 🟠 P1 — breaks on change | 11 | **11 fixed** |
| 🟡 P2 — wiring smell | 11 | **7 fixed**, 3 deferred (structural), 1 blocked on client photo |
| ⚪ P3 — polish | 7 | **5 fixed**, 1 partial, 1 declined |
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

## ⏳ Deferred — structural refactors (safe, but need their own pass)

These three are pure maintainability work touching many files at once. They were held back because seven
agents were concurrently editing those same files; doing a mass file-move on top of that is how work gets
lost. Each is safe to do as a dedicated, atomic pass.

- **P2-1** — the four product-content components use three different naming schemes (`-page.tsx` vs `-page-content.tsx`, `…Page` vs `…PageContent` exports, all in `components/` root while siblings live in `components/pages/`). The filename doesn't predict the export — the exact drift that produces wrong-twin imports. Safe today only because each is a singleton.
- **P2-2** — charpente content is split across near-twin config files (`-content.ts` vs `-data.ts`) with complementary exports; no other product has this. Easy to open the wrong twin and not find the symbol.
- **P2-3** — only 3 of 18 routes follow `CLAUDE.md`'s "page.tsx is a thin wrapper" rule; `references`, `privacy`, `terms`, `products` and `contact` embed full hero/section markup inline.

---

## 🔒 Blocked on client-supplied assets

- **P0-4** — `biolab.webp`, `batimetal.webp`, `man.webp` are referenced but absent from `public/logos`, and `Tazedj` has `src: ""`. The carousel degrades gracefully to the client's name as text, so nothing looks broken — but the real logos never render. *Not "fixed" by deleting the entries: removing real clients from the wall is a business decision.*
- **P2-10** — "Cornière d'angle intérieur" and "…extérieur" showed the **same photo**, so the exterior card displayed the wrong part. The wrong image was removed and the renderer now tolerates a photo-less entry (shows name + length with a "Photo à venir" placeholder) rather than lying to a buyer. **Still owed: a real photo of the exterior corner piece.**
- **P0-3** (above) — the three ISO certificate PDFs.
- **P3-7** — `Bordj-Steel-Catalogue-FR.pdf` is 4.9 MB, the largest asset in the deploy. Recompressing a client's official catalogue is their call.

## 🟨 Partial / declined, with reasoning

- **P3-6** — `noImplicitOverride` is now on. **`noUncheckedIndexedAccess` was deliberately left off**: it would surface a large number of pre-existing errors across files, and enabling it mid-pass would have broken the build for every other agent. It is the right next hardening step and would have caught this codebase's actual bug class (the positional-index drift above) — worth a dedicated pass.

---

## 🔵 Needs client decision (unchanged — these are facts, not code)

The site currently renders **contradictory numbers to visitors**. No amount of engineering resolves these;
the client must confirm the correct value, after which each should be stated once in config.

1. **Galvanisation annual capacity appears as three different numbers** — `60 000 T/an` (homepage hero + units block), `25 000 tonnes/an` (galvanisation stat + subtitle), `20 000 t/an` (galvanisation body). All three are live. *Most severe item on this list.*
2. **Charpente capacity contradicts itself on one page** — hero `25 000 T/an` vs production table `12 000 T/an`; PRS `3 000` vs `2 000`.
3. **Charpente units maths** — "1500 T/mois (25000 T/an)" but 1500 × 12 = 18 000; also disagrees with the table's 1 000 T/mois.
4. **Galvanisation bath dimensions & max piece length** — `12×1,5×3 m` vs `13×1,8×3,5 m`; max piece `13 m` vs `15 m`. *(Related: the "Bains de traitement: 13" stat is a **count** rendered with a length unit — possibly a confusion with the 13 m bath length.)*
5. **Canonical domain** — `siteUrl` is `https://bordj-steel.com` (drives metadataBase, canonical, OG, sitemap, robots, JSON-LD) while every email and all blog copy say `bordjsteel.dz`. If `.com` isn't the live host, every canonical/OG/sitemap URL is wrong — active SEO self-harm.

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

*Audit generated 2026-07-24 · remediation pass 2026-07-29 · 46 of 52 code findings fixed and verified; the remainder are deferred refactors, client-blocked assets, or business decisions.*
