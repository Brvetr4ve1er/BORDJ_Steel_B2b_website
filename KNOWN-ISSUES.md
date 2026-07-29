# Known Issues — Bordj Steel B2B

> **Update 2026-07-24:** two new flag registers appended at the bottom:
> **[F] Useless elements** (18 findings, flag-only) and **[G] Content roadmap**
> (12 researched proposals). Visual-geometry bugs found the same day were fixed
> directly in code (see git history) and are not listed here.

> **Status: flagged for review, NOT fixed.** Every item below is a defect found by a
> multi-agent architectural audit and then **independently re-verified by a second agent
> that re-read the actual file** before it was allowed onto this list. Nothing in the
> codebase was changed to produce this document — it is a review artifact.
>
> **How it was produced:** 9 read-only auditors across disjoint dimensions (import graph,
> route↔config wiring, positional coupling, product-variant schema drift, runtime/hydration,
> effect hygiene, build/deploy/CI, assets/git, data integrity) raised 43 candidate findings.
> An adversarial verification pass re-read each one; **34 were confirmed**, **6 require a
> business decision**, and **3 were rejected as false positives** (listed at the bottom for
> transparency). A separate deterministic sweep found **0 import case-sensitivity mismatches**
> (the usual Windows→Linux deploy killer) and the tree builds clean (typecheck + lint + `next build`, 36 pages).

## Summary

| Severity | Count | Meaning |
|---|---|---|
| 🔴 P0 — breaks now | 4 | Wrong or broken for users today |
| 🟠 P1 — breaks on change | 11 | Works now; silently breaks on the next edit / reorder / deploy target |
| 🟡 P2 — wiring smell | 11 | Works, but a genuine maintainability / consistency trap |
| ⚪ P3 — polish | 7 | Minor / cosmetic |
| 🔵 Needs client decision | 5 | Real inconsistency, but the *correct value* is a business call |

The recurring root cause is exactly what you suspected: **content is duplicated between
`src/config` and the components that render it, and several components hardcode values or
index config arrays by position instead of reading them by key.** That is why "editing the
config" often changes one page but not another.

---

## 🔴 P0 — Breaks now

### P0-1 · Product tables: icon sub-header spans the wrong width → misaligned / invalid colSpan
`src/components/product-variants/ProductVariantDetails.tsx:74`
The main header row distributes column spans across the real body width (`bodyCols`), but the
support-icon sub-header row computes spans from `section.headers.length` and hardcodes 2 label
columns. On every "charges/portées admissibles" table the icon row is far narrower than the body
(icons squished at the left). For `toleNervuree` (`headers.length === 3`) it emits `colSpan={0.5}`
— an **invalid fractional colSpan** — and `colSpan={2}` overshoots a table with only 1 label column.
**Fix:** compute the icon row spans from the same `bodyCols`/`colSpans` as the main header; derive the label-column count instead of hardcoding `2`.

### P0-2 · Group-header colSpan hardcoded to the word "appui" → other grouped tables mis-render
`src/components/product-variants/ProductVariantDetails.tsx:47`
When body rows are wider than headers, the extra columns are handed only to headers whose text
matches `/appui/i`; if none match, **all** extra columns dump onto the last header. The Hi-Bond
"PROPRIÉTÉS DE LA TÔLE HI-BOND 77" table uses group headers `compression / compression / cisaillement`
(no "appui"), so spans become `[1,1,1,1,8]` — the two compression groups render 1 column wide while
cisaillement stretches across 8, badly misaligned against its 4/4/2 data groups.
**Fix:** drive column grouping from explicit config metadata (a real `colSpan`/`subheaders` field), not a substring match.

### P0-3 · Three ISO certification PDFs are dead links
`src/components/pages/blog-page-content.tsx:36`
The ISO 9001 / 14001 / 45001 cards link to `/documents/Bordj-Steel-ISO-*.pdf`, but
`public/documents/` contains only `Bordj-Steel-Catalogue-FR.pdf`. Every "Voir le document" click 404s.
**Fix:** add the three PDFs (exact filenames) or disable the links until supplied. *(Client asset — see punch list.)*

### P0-4 · Three client logos referenced but missing from `public/logos`
`src/config/company-data.ts:217`
`biolab.webp`, `batimetal.webp`, `man.webp` are referenced but absent (16 of 19 exist); `Tazedj` has `src:""`.
Each 404s through the image optimizer. The carousel's `onError` degrades to showing the client's name
as text, so it isn't a broken-image icon — but the intended logo never renders.
**Fix:** add the `.webp` files or remove those entries. *(Client asset — see punch list.)*

---

## 🟠 P1 — Breaks on change (silent)

### P1-1 · `/contact` page hardcodes all contact data, bypassing the config source of truth
`src/components/contact-info.tsx:175`
The entire `/contact` body hardcodes six departments' phones/emails/titles/images inline instead of
reading `companyData.pages.contact.content`. It has **already drifted**: the canonical primary phone
(`+213 770 35 66 86`, used by JSON-LD, the homepage form, and WhatsApp) appears nowhere on the page,
and the page invents `marketing@bordjsteel.dz` which isn't in config. Verifying the phone in config
(an open item) will silently leave `/contact` stale.
**Fix:** drive the cards from `companyData.pages.contact.content`.

### P1-2 · Homepage `StatsSection` hardcodes figures while its own comment claims they're from config
`src/components/sections/StatsSection.tsx:11`
The comment says the numbers are "sourced from company-data / charpente-metallique-data so the homepage
never contradicts the product pages" — but the component imports **neither** file and hardcodes literals.
Editing capacity/projects in config will not update the homepage, and the stated invariant is already fiction.
**Fix:** import the figures from config (or a shared stats module) so the invariant is enforced by wiring.

### P1-3 · `portfolio.tsx` binds project images by hardcoded array position `[0..5]`
`src/components/portfolio.tsx:11`
The homepage spreads `references.projects[0]..[5]` and staples a fixed image key to each index.
Reordering the array mismatches every card (image stays at its index; name/text move with config).
Deleting a project makes `[5]` `undefined` → blank-title card, `alt=""`, and `key={undefined}`
(React duplicate key). A 7th project is silently dropped (only 6 indices hardcoded).
**Fix:** `.map` over the array and derive the image key from `project.name` (as `references/page.tsx` already does).

### P1-4 · `Facilities.tsx` binds unit images by hardcoded array position `[0..3]`
`src/components/sections/Facilities.tsx:26`
Same positional-coupling bug for the homepage facilities grid. Worse: line 53 applies an `object-top`
crop by matching `facility.title === 'Panneaux Sandwichs'` (title-keyed) while the image is index-keyed
at `[1]` — so after any reorder the crop and the panneaux image desync onto **different cards**.
**Fix:** key the image lookup off `href`/`title` (or an explicit `imageKey`) and `.map`.

### P1-5 · References page resolves images by slugifying display names, with a silent grey fallback
`src/app/references/page.tsx:24`
Each project image is looked up by lowercasing/hyphenating/paren-stripping `project.name` and indexing
`placeholder-images.json`, falling back to a grey `placehold.co` on any miss. Renaming a project,
adding punctuation, or changing accent handling silently swaps in the placeholder with no error,
because the image key is coupled to human-facing copy rather than a stable id.
**Fix:** give each project an explicit `imageKey` and look up by that.

### P1-6 · Footer copyright year uses `new Date()` in a client component → hydration mismatch
`src/components/footer.tsx:144`
`footer.tsx` is `"use client"` and statically prerendered. The build-time year is baked into SSR HTML
while hydration recomputes `new Date().getFullYear()`. Across a year rollover (or a New-Year timezone
straddle) the two differ → React hydration text mismatch on every visit until the next rebuild.
**Fix:** compute the year server-side and pass it down, set it in a post-mount `useState`, or add `suppressHydrationWarning`.

### P1-7 · Unguarded `React.createElement(iconMap['ShieldCheck'])` can take down the whole route
`src/components/galvanisation-page-content.tsx:236`
This is the **only** unguarded icon lookup in the file (every sibling uses `{Icon && <Icon/>}`). The key
exists today, but if it's renamed/removed, `createElement(undefined)` throws "Element type is invalid",
and with **no `error.tsx` boundary** (see P2-8) the entire `/products/galvanisation-a-chaud` route falls
to Next's default error page.
**Fix:** guard it like the others.

### P1-8 · `@types/node` pinned to Node 25 while every runtime target is Node 20, no `engines` pin
`package.json:35`
Type-checking uses the Node 25 API surface (`@types/node 25.9.1`, exact-pinned), but CI
(`.github/workflows/ci.yml` → `node-version: 20`) and the dev env (`.idx/dev.nix` → `nodejs_20`) run
Node 20, with no `engines` field or `.nvmrc`. Code that calls a Node 21–25-only built-in type-checks
clean and runs on your local Node 25 but **throws at runtime on the Node 20 that CI/deploy use**.
**Fix:** add `"engines": { "node": "20.x" }`, downgrade `@types/node` to `^20`, add `.nvmrc`.

### P1-9 · Security/cache HTTP headers live only in `firebase.json`; `next.config.ts` sets none
`firebase.json:13` · `next.config.ts:4` *(found independently by two dimensions)*
HSTS, X-Frame-Options, X-Content-Type-Options, CSP `frame-ancestors`, and immutable `Cache-Control` are
declared only in `firebase.json`'s **classic** `hosting` block. But the repo is *also* configured for
Firebase **App Hosting** (`apphosting.yaml`), a different product that does **not** apply those headers.
`next.config.ts` has no `headers()` and there's no middleware, so whether any security header reaches
production depends on which of the two coexisting deploy configs actually runs — and any move to
`next start`/Vercel/Netlify drops them silently.
**Fix:** move headers into `next.config.ts` `async headers()` (or middleware); resolve the `apphosting.yaml` vs `firebase.json` duplication.

### P1-10 · Contact phone numbers split across 3 sources; the advertised number is on no card
`src/components/contact-info.tsx:180`
Six department numbers are hardcoded in `contact-info.tsx`; **none** is the config "primary"
`+213 770 35 66 86` that JSON-LD, the homepage form, and WhatsApp all use. So the number search engines
and WhatsApp advertise is not listed on `/contact`, and editing config changes the homepage but not `/contact`.
Emails duplicated the same way.
**Fix:** move the department directory into `src/config`; confirm the canonical primary line *(client decision — see 🔵)*.

### P1-11 · `AnimatedBaths` hardcodes "13 mètres" and ignores the config stat value
`src/components/animated-baths.tsx:46`
The galvanisation hero stat hardcodes `13`, the unit "mètres", 13 ruler segments, and the label
"Bains de traitement" — the component takes no props, so the config value (`galvanisation-data.ts` `'value':'13'`)
is **dead**; editing it changes nothing. Also a unit mismatch: "Bains de traitement" is a *count* of baths,
displayed as "13 mètres" (a *length*).
**Fix:** pass value/label/unit as props from config (or delete the dead field); reconcile count vs length.

---

## 🟡 P2 — Wiring smells (works, but a maintenance trap)

### P2-1 · Product-content components use three different naming schemes (file ≠ export ≠ folder)
`src/components/charpente-metallique-page.tsx:153`
Two files end `-page.tsx`, two end `-page-content.tsx`; exports split `…Page` vs `…PageContent`; all four
sit in `components/` root while sibling page components live in `components/pages/`. The filename doesn't
predict the export — exactly the drift that produces wrong-twin imports. Safe today only because each is a singleton.
**Fix:** standardize on `components/pages/<product>/<Product>PageContent.tsx` and move all four atomically.

### P2-2 · Near-twin charpente config files (`-content.ts` vs `-data.ts`) both feed one component
`src/components/charpente-metallique-page.tsx:15`
Charpente content is split across two similarly-named config files with complementary exports; no other
product has a `-content.ts` twin. A developer looking for charpente copy can easily open the wrong twin
and not find the symbol.
**Fix:** merge into one file, or apply the split uniformly across all products.

### P2-3 · Most `page.tsx` files hold thick inline JSX instead of a thin `pages/` wrapper (violates `CLAUDE.md`)
`src/app/references/page.tsx:32`
`CLAUDE.md` says each `page.tsx` should be a thin wrapper rendering one `components/pages/**` component.
Only 3 of 18 routes comply. `references` (114 lines), `privacy`, `terms`, `products`, `contact`, and the
four media-center placeholders embed full hero/section markup and data-mapping directly.
**Fix:** extract inline bodies into `components/pages/**`; reduce each `page.tsx` to a wrapper.

### P2-4 · Four media-center pages are near-identical copy-paste placeholders
`src/app/media-center/gallery/page.tsx:15`
`media-center`, `gallery`, `videos`, `actualites` are near-byte-identical "Contenu à venir" stubs differing
only in a hardcoded hero URL, title, and one sentence. Any change to the shared hero must be made in four places.
**Fix:** one shared placeholder/hero component fed `{title, subtitle, image}` from config.

### P2-5 · Same projects data bound two incompatible ways (positional vs name-derived)
`src/app/references/page.tsx:23`
`/references` derives images from `project.name` (reorder-safe) while `portfolio.tsx` binds the *same*
projects by fixed index. They agree only because the 6 names happen to normalize to the 6 hardcoded keys;
any reorder/rename makes the two pages show different images for the same project.
**Fix:** make `portfolio.tsx` reuse the name-derived lookup (ties into P1-3).

### P2-6 · `TableSection.subheaders` declared in the schema but never rendered or populated
`src/config/product-variant-schema.ts:13`
The field is declared (and set to `{}` in the example skeleton) but the renderer never reads it and no
config populates it — dead. Tellingly, the Hi-Bond and tôle-nervurée tables *need* a sub-header row and
hack it into `rows[0]` instead — the exact case this field was meant for (ties into P0-1/P0-2).
**Fix:** implement `subheaders` in the renderer and use it for the grouped tables, or delete the field.

### P2-7 · Table cell callback typed `row: any` / `cell: string`, defeating type-checking
`src/components/product-variants/ProductVariantDetails.tsx:87`
`rows` is `(string|number)[][]` with no relationship to `headers.length`, and the renderer maps with
`row: any`. Because `row` is `any`, TypeScript **cannot** flag any of the header-vs-row width mismatches
in P0-1/P0-2 — which is why all that table drift is invisible to the compiler.
**Fix:** type `row` as `(string|number)[]`; add a lint/validation step asserting row length matches column count.

### P2-8 · No App Router `error` / `global-error` / `not-found` boundaries exist anywhere
`src/app/`
No `error.tsx`, `global-error.tsx`, or `not-found.tsx` in the whole tree. Any render-time throw (e.g. P1-7)
bubbles to Next's default error UI with no per-segment recovery, and there's no branded 404. This amplifies
the blast radius of every other runtime hazard.
**Fix:** add `global-error.tsx` and `not-found.tsx`; optionally per-route `error.tsx` for the product pages.

### P2-9 · `StatsSection` "years of experience" is frozen at build time
`src/components/sections/StatsSection.tsx:17`
`new Date().getFullYear() - FOUNDING_YEAR` is evaluated once at module scope in a server component on a
statically prerendered site, so "+N ans" goes stale until the next rebuild. (No hydration bug — server
computes it and passes a plain prop.)
**Fix:** compute at request time, or deliberately accept build-time staleness with a comment.

### P2-10 · Same image reused for "Cornière d'angle intérieur" and "…extérieur"
`src/config/product-variants.config.ts:472`
Two differently-named finition parts point at the identical image URL — copy-paste bug; the exterior-corner
card shows the interior corner's picture.
**Fix:** supply the distinct exterior-corner image (or merge the entries if one image is intended).

### P2-11 · Bardage "nervuré/nervuré" and "lisse/lisse" diagrams use the same image
`src/config/product-variants.config.ts:198`
Two "Caractéristiques Géométriques" images have captions describing different profiles but reference the
identical URL, so at least one caption is paired with the wrong diagram.
**Fix:** provide the distinct lisse/lisse diagram or remove the duplicate.

---

## ⚪ P3 — Polish

- **P3-1** `src/components/galvanisation-page-content.tsx:14` — dangling unused `import { BathsIcon }` (rendered by `DynamicAnimatedBaths` instead). Delete the line.
- **P3-2** `src/config/product-variant-schema.ts:72` — 55-line `exampleSkeleton` exported but imported nowhere; ships as dead sample data. Move to a comment/README or delete.
- **P3-3** `src/config/product-variant-schema.ts:15` — `'one-support'` icon value + its render branch are dead (config only ever uses `'two-supports'`). Confirm unused and drop.
- **P3-4** `src/components/animated-number.tsx:37` — `new Intl.NumberFormat()` with no locale → per-visitor formatting (`25,000` vs `25 000`), not matching the dotted French copy. Pass `'fr-FR'`. *(Not a hydration bug — runs post-mount.)*
- **P3-5** `src/components/contact-info.tsx:55` — copy-confirmation `setTimeout` never cleared → setState-after-unmount risk (benign in React 18). Store the id in a ref and clear on cleanup.
- **P3-6** `tsconfig.json:7` — `strict` is on but `noUncheckedIndexedAccess` / `noImplicitOverride` are not (would have caught much of the positional-index and table-width drift above). Optional hardening.
- **P3-7** `public/documents/Bordj-Steel-Catalogue-FR.pdf` — 4.9 MB, the largest asset in the deploy, shipped in-bundle. Compress or move to object storage/CDN.

---

## 🔵 Needs client decision (real inconsistency, correct value is a business call)

These are **not** code bugs to guess at — they render contradictory facts to users and need the client to
confirm the right value, after which each should be stated **once in config** and referenced everywhere.

1. **Galvanisation annual capacity is given as three different numbers** — `60 000 T/an` (homepage hero + units block), `25 000 tonnes/an` (galvanisation page stat + subtitle), `20 000 t/an` (galvanisation page body). All three are live. `src/config/company-data.ts:75`, `galvanisation-data.ts`, `galvanisation-page-content.tsx`. *(This one is severe — 🔴 in effect.)*
2. **Charpente capacity contradicts itself on one page** — hero stat `25 000 T/an` vs production table `12 000 T/an`; PRS `3 000` vs `2 000 T/an`. `src/components/production-tables.tsx:23` vs `charpente-metallique-page.tsx:175`.
3. **Charpente units description math** — "1500 T/mois (25000 T/an)" but 1500 × 12 = 18 000. Also disagrees with the production table's 1 000 T/mois. `src/config/company-data.ts:118`.
4. **Galvanisation bath dimensions & max piece length disagree** — bath `12×1,5×3 m` (subtitle) vs `13×1,8×3,5 m` (body); max piece `13 m` vs `15 m` (units). `src/components/galvanisation-page-content.tsx:76`.
5. **Canonical domain vs email/website domain** — `siteUrl` (→ metadataBase, canonical, OG, sitemap, robots, JSON-LD) is `https://bordj-steel.com`, but every email is `@bordjsteel.dz` and blog copy says `www.bordjsteel.dz`. If `.com` isn't the live host, every canonical/OG/sitemap URL is wrong (active SEO self-harm). `src/config/company-data.ts:10` (already flagged in a code comment). *(Duplicated across two audit dimensions.)*

---

## ✓ Rejected by verification (reported by a finder, killed on re-read — logged for transparency)

- **"Duplicate Certifications components + inline copy"** — the inventory was accurate but the components are not wrong-twins; each has a distinct purpose and all imports resolve correctly. Not a defect.
- **"charpente defaults to `pillars[0]`"** — flagged as positional coupling, but selection is by `id` via `.find()`; defaulting the initial selection to the first pillar is intentional and reorder-safe. Not a defect.
- **"`use-toast` effect depends on `[state]`, re-subscribes on every toast"** — the mechanics were described correctly but the re-subscribe is cheap and correct (standard shadcn toast pattern); no leak or bug. Not a defect.

---

*Generated 2026-07-24 · 34 confirmed defects, 5 client decisions, 3 false positives rejected · nothing in this list has been modified in the codebase.*

---

# [F] Useless elements — flagged 2026-07-24 (flag-only, awaiting decision)

> From a dedicated UX audit: elements that render but serve no visitor purpose. Each was
> verified at its callsites; 5 borderline candidates were examined and deliberately NOT
> flagged (hero scroll chevron, blog-card ghost button, galvanisation highlight labels,
> AnimatedBaths ruler, product wireframes — each plausibly helps).

| # | Element | Where | Why useless | Suggestion |
|---|---|---|---|---|
| F1 | Logo "shine" mask — ~100 lines of duplicate SVG geometry masking a hover sweep that **can never render** (mask coords 1080×1080 vs 56px target ⇒ resolves fully transparent); ships ~15× on the blog page via card avatars | `logo.tsx:22-126`, `navbar.tsx:232-235` | invisible-in-practice + dead weight | Remove mask defs + shine div |
| F2 | DownloadButton's second panel: permanently hidden behind the opaque layer, translates *out* of the clipped button on hover, yet runs an **infinite 1s animation**; on 8 CTAs | `ui/download-button.tsx:20-22`, `app/download-button.css:37-59` | invisible + perpetual animation cost | Remove `.download` element + CSS |
| F3 | `shiny-button.css` — 275 lines imported by nothing | `src/app/shiny-button.css` | dead stylesheet | Delete |
| F4 | Galvanisation step details (real content: longDesc + temp/durée) hidden in `h-0 group-hover:h-auto` — no tap/focus reveal, invisible to touch users; `h-0→h-auto` can't animate either | `galvanisation-page-content.tsx:197-207` | content behind undiscoverable hover | Show by default or real disclosure |
| F5 | Blog ISO tab: 512×640px hover flyout duplicating the "Voir le document" button below it; unusable on touch; overlaps neighbour card | `blog-page-content.tsx:60-75` | duplicate + hover-only | Remove flyout |
| F6 | Facilities cards: title/description/CTA all `opacity-0` until hover — phone users see 4 unlabeled photo tiles; inner "Lire la suite" duplicates the card's own link | `sections/Facilities.tsx:57-90` | invisible on touch + duplicate | Show title always; drop inner CTA |
| F7 | Sandwich selector: six 128px icon circles with `cursor-pointer` + hover-scale that are **inert** (onClick only on the small button below) | `sandwich-panels-page.tsx:144-154` | looks clickable, does nothing | Make circle+label one button |
| F8 | FeatureHoverCard's hover-only "En savoir plus" fake CTA inside an already-clickable card | `feature-hover-card.tsx:30-38` | duplicate + invisible on touch | Remove the span |
| F9 | Homepage repeats 2 stats across 3 consecutive sections (25 000 T/an: hero + StatsSection; 300 projets: vision-mission + StatsSection) | `home-page-hero.tsx`, `StatsSection.tsx`, `vision-mission.tsx` | redundant | Keep each figure once |
| F10 | Charpente capacity tiles repeat the hero's two stats verbatim mid-page (above tables quoting *different* figures) | `charpente-metallique-page.tsx:180-191` | redundant + amplifies known data conflict | Drop mid-page tiles |
| F11 | Mobile menu: two overlapping close buttons (custom X + shadcn's built-in X, same corner) | `navbar.tsx:265-270`, `ui/sheet.tsx:69-72` | duplicate control | Remove custom one |
| F12 | Google Maps iframe in the site-wide footer; homepage loads a second full Maps embed in its contact section | `footer.tsx:86-97`, `home-page-contact-form.tsx:157-168` | heavy duplicate | Footer → static link/thumbnail |
| F13 | Recruitment: 18 filter options over 2 near-identical jobs — 15 selections yield "Aucune offre" | `recruitment-page.tsx:47-69` | filter without a corpus | Derive options from real jobs |
| F14 | macOS-dock magnification physics (182-line component, framer springs) on a 3-tab switcher — makes targets move under the cursor | `blog-page-content.tsx:230-239`, `ui/dock.tsx` | decoration harming usability | Plain segmented tabs |
| F15 | Blog search + sort render on ISO/Catalogue tabs where they do nothing | `blog-page-content.tsx:216-253` | inert controls | Render only on blog tab |
| F16 | Certifications section: 3 identical generic Award icons in 160px hover-scaling circles (real cert images exist and are used elsewhere) | `sections/Certifications.tsx:22-31` | generic duplicate decoration | Use real badges or drop circles |
| F17 | `staggerIndex` passed with animations that ignore it (4 callsites) — implied stagger never happens | `animated-wrapper.tsx:60` + callsites | vestigial prop | Honor delay for all animations or strip |
| F18 | TeamsSection: `detail` + `color` fields on all 9 entries never rendered | `sections/history/TeamsSection.tsx:7-89` | dead data fields | Delete fields |

# [G] Content roadmap — researched proposals (2026-07-24, needs client sign-off)

> From a copy audit + web research. French drafts exist for each (see the content report in
> session records / ask for the full text). **Critical pre-condition found during research:
> the live `bordjsteel.dz` serves an EXPIRED TLS certificate — browsers show a security
> warning. Fix that first; it outranks all content work.**

1. **FAQ Galvanisation** (EN ISO 1461: épaisseurs de zinc, durée de vie, dimensions max, préparation des pièces) — page galvanisation.
2. **Page "Normes & réglementation"** — CCM97, RPA99 v2003, RNV 2013/DTR C2-4.7, Eurocode 3 (ce que les ingénieurs algériens recherchent; aucun concurrent ne l'explique).
3. **Certifications enrichies** — ISO 9001/14001/45001 expliquées en bénéfice client + homologation SONELGAZ mise en avant + certificats PDF (bloqué: PDFs client).
4. **Section "Le groupe Condor"** sur Qui sommes-nous (création 2012, site 100 000 m² — chiffres publics, à confirmer).
5. **FAQ Panneaux sandwich** (Euroclasse B-s2,d0 expliquée, PUR vs PIR, épaisseurs chambre froide) — règle au passage la contradiction "B3 : standard" (danger commercial, voir audit copy).
6. **Glossaire construction métallique** (20-30 entrées: PRS, panne, plancher collaborant, TN40…) — SEO longue traîne.
7. **Références → mini études de cas** (tonnage/couverture/bardage déjà en config; manque récit + photo + délai).
8. **Page "Bâtiments préfabriqués (PEB)"** — le terme est cité sans être expliqué; forte intention d'achat.
9. **Remplacer les articles filler 9-13** par 5 vrais articles techniques (sujets proposés, gardant les titres).
10. **Salons & événements** — BATI-EST EXPO (8ᵉ édition 14-17 oct. 2026, Zénith Constantine — vérifié; participation à confirmer).
11. **Vraie fiche technique galvanisation PDF** (le CTA existe mais sert le catalogue général; bloqué: chiffres client).
12. **Couverture nationale / livraison par wilaya** — la question n°1 des acheteurs, jamais traitée.
