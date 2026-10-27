# Apostrophe inventory — `src/config/*.ts`

Companion to **DELIVERY-PLAN.md T4-5**. This document is for the developer, not the client.
It contains **no code changes** and recommends none without a decision first.

Measured 2026-10-26 against the working tree on `claude/project-cleanup-plan-DhvG5`
(base `69ff794`).

> **Line numbers are a snapshot.** Several `src/config/*.ts` files were being modified by
> parallel work while this inventory was taken. Totals and classifications were re-verified
> after those changes landed and held; line numbers in
> `charpente-metallique-data.ts`, `chaudronnerie-data.ts`, `company-data.ts` and
> `galvanisation-data.ts` were re-checked and had not shifted. Re-run the matcher before
> acting on a specific line if those files move again.

---

## Headline

| | Count |
|---|---|
| Intra-word ASCII apostrophes (`'`) in `src/config/*.ts` | **116** |
| Intra-word U+2019 apostrophes (`’`) in `src/config/*.ts` | **81** |
| Of the 116 ASCII: not user-visible (code comments / JSDoc) | 31 |
| Of the 116 ASCII: dev-authored, user-visible | 6 |
| Of the 116 ASCII: **likely client copy — do not touch** | **75** |
| Of the 116 ASCII: authorship uncertain | 4 |
| Strings containing *both* forms inside one string | **0** |
| Files containing both forms in rendered output | **4** |

### Correction to T4-5's count

T4-5 states "81 U+2019 and 81 ASCII". The U+2019 figure is right. **The ASCII figure
undercounts by 30.** Across the 14 files T4-5 measured, 81 are written literally in
double-quoted or template strings — but a further **30 are written as `\'` inside
single-quoted strings** and render identically. T4-5's symmetry (81/81) is therefore an
artefact of the matcher, not a real balance; the true figure for those 14 files is 111.

A fifteenth file, `src/config/recruitment-data.ts`, has since been added by parallel work
(DELIVERY-PLAN T3-6). It carries 5 more ASCII occurrences, all in comments. **116 today.**

This matters operationally, not cosmetically. Four files mix escaped and unescaped forms:

| File | unescaped `'` | escaped `\'` |
|---|---|---|
| `src/config/charpente-metallique-data.ts` | 8 | 2 |
| `src/config/company-data.ts` | 14 | 3 |
| `src/config/product-variants.config.ts` | 28 | 6 |
| `src/config/product-heroes.ts` | 2 | 2 |
| `src/config/chaudronnerie-data.ts` | 0 | 17 |

A naive `sed`-style pass matching only unescaped `'` would convert part of a file and skip
the rest — **manufacturing a new mixed convention inside the same object**, which is
exactly the defect this review exists to measure. Any pass must handle `\'`.

### Method

An occurrence counts when an ASCII `'` sits between two letters (Latin-1/Latin-Extended-A
range included, so `d'Énergie` counts). TypeScript string delimiters, `'use client'`-style
literals, union-type members and object keys written in single quotes are therefore
excluded. `\'` is counted after unescaping. Classification of each line as comment or
string is by leading `//`, `*`, `/*`.

---

## The only genuinely visible defect

A reader cannot see which codepoint an apostrophe is. They *can* see two different glyphs
in the same rendered block. That is the whole of the user-facing problem, and it occurs in
**4 files**. No single string mixes forms, so every case below is a mix between sibling
strings rendered together.

### 1. `teams-data.ts` L49–L50 — adjacent, same word, same card

```
L49  title:       "Bureau d'études"                         ASCII
L50  description: "…notre bureau d’études conçoit…"         U+2019
```

A card title and its own body text, rendered one above the other, spell the same word two
ways. **This is the most visible instance in the repo** — and it is also the one the file
forbids changing. `teams-data.ts:36-39` reads:

> Client copy, reproduced exactly as supplied — including the curly apostrophes (U+2019)
> throughout […] do not normalise them.

So the single worst-looking case sits inside the one file carrying an explicit in-tree
no-touch directive. It needs a human decision, not a judgement call.

### 2. `charpente-metallique-data.ts` L55–L56 — adjacent, same object

```
L55  title:       "Supports de Transport d'Énergie"          ASCII
L56  description: "Structures pour l’énergie, …"             U+2019
```

Title and description of one pillar card, rendered together, same root word.

### 3. `charpente-metallique-data.ts` L96 vs L117 — same phrase, same page

```
L96   headlineSpec: "…portée jusqu’à 40 m"                   U+2019
L117  "Valeur": "Jusqu'à 40 mètres"                          ASCII
```

The card headline and the specification table immediately below it state the same fact
with different punctuation.

### 4. `company-data.ts` L288–L296 — one timeline, alternating forms

```
L288  "…construction de l'unité de charpente…"               ASCII (escaped)
L289  "…production de l'unité de charpente…"                 ASCII (escaped)
L291  "…inauguré par le ministre de l’intérieur."            U+2019
L293  "Nous continuons d'innover, …"                         ASCII (escaped)
L296  history: "…exigences de l’industrie moderne. Aujourd’hui…"  U+2019
```

Consecutive entries of a single rendered timeline. A visitor scrolling the history section
passes through both forms four times.

### 5. `product-variants.config.ts` — the same label, two forms, sibling product pages

```
L24   value: 'Identification d'acier: …'          (couverture)    ASCII (escaped)
L137  value: "Identification d'acier : …"         (bardage)       ASCII
L242  value: "Identification d’acier: …"          (frigorifique)  U+2019

L46   title: "Coefficient d'isolation thermique"  (couverture)    ASCII
L159  title: "Coefficient d'isolation thermique"  (bardage)       ASCII
L264  title: "Coefficient d’isolation thermique"  (frigorifique)  U+2019
```

Not adjacent lines, but the same field on sibling variants, rendered by the same component.
The `couverture` and `bardage` variants use ASCII; `frigorifique` uses U+2019. A buyer
comparing a cladding panel against a cold-room panel sees both forms of the same label. The
split falls exactly on a variant boundary, which is strong evidence these tables were
transcribed from the client's spec sheet in more than one pass.

### Not a defect: `press-data.ts`

`press-data.ts` holds 2 ASCII and 23 U+2019 and so appears mixed by raw count. It is not:
**both ASCII occurrences are in the file's header comment**, and all 23 U+2019 are inside
quoted published-article text. Rendered output is uniformly U+2019. Nothing to do here, and
nothing that may be done — these are verbatim quotations of third-party published articles.

### Also not a defect: `chaudronnerie-data.ts`

17 ASCII, 0 U+2019 — uniformly ASCII, internally consistent, nothing visible wrong. It
appears in no mixed-form list. Normalising it would be a pure-cost change: 17 edits to
client copy for zero visible improvement. It is also the file a `\'`-blind matcher would
skip entirely, which in this one case is the correct outcome.

---

## Full inventory

Legend: **CMT** = code comment / JSDoc, not user-visible, zero risk · **DEV** =
dev-authored user-visible string, probably safe · **CLIENT** = likely client copy, do not
touch · **UNC** = uncertain. `esc` marks an apostrophe written `\'`.

### `src/config/blog-data.ts` — 12 ASCII, 0 U+2019

Provenance: the article bodies are emoji-led posts carrying the company's own phone numbers
and `@bordjsteel.dz` addresses inline. This is republished marketing copy, not editorial
written here.

| Line | Field | Fragment | Class |
|---|---|---|---|
| L6 | `description` | `…Contactez-nous dès aujourd'hui et obtenez votre consultation…` | CLIENT |
| L35 | `description` | `…une précision d'assemblage optimale…` | CLIENT |
| L35 | `description` | `…Contactez-nous pour plus d'informations ou une étude…` | CLIENT |
| L49 | `description` | `…Un design sur mesure qui s'adapte à tous vos projets…` | CLIENT |
| L49 | `description` | `…Contactez-nous pour plus d'informations ou une étude…` | CLIENT |
| L91 | `description` | `"[emoji] La rouille n'a plus sa chance ! …` | CLIENT |
| L91 | `description` | `…Chez nous, la galvanisation c'est : …` | CLIENT |
| L119 | `description` | `"Nous sommes fiers d'annoncer notre prochain grand projet…` | CLIENT |
| L119 | `description` | `…Restez à l'écoute pour plus de détails…` | CLIENT |
| L146 | `title` | `"Notre engagement pour l'environnement"` | CLIENT |
| L147 | `description` | `…respectueuse de l'environnement."` | CLIENT |
| L160 | `title` | `"Portrait d'équipe : Rencontrez nos ingénieurs"` | CLIENT |

### `src/config/charpente-metallique-data.ts` — 10 ASCII, 10 U+2019 — **both forms**

| Line | Field | Fragment | Class |
|---|---|---|---|
| L8 | `subtitle` | `"Solutions d'ingénierie robustes pour les projets…"` | CLIENT |
| L12 | `title` | `{ title: "Surface de l'unité", value: 10000, …}` | UNC |
| L27 | — | `// pillar's \`specifications\` — no new claim…` | CMT |
| L46 | *(list item)* | `'Ponts et ouvrages d\'art'` · esc | CLIENT |
| L55 | `title` | `"Supports de Transport d'Énergie"` | CLIENT |
| L107 | *(list item)* | `'Ateliers de production et d\'assemblage'` · esc | CLIENT |
| L117 | `"Valeur"` | `"Portée" : "Jusqu'à 40 mètres"` | CLIENT |
| L171 | — | `// Domaines d'Application — icon resolved by name…` | CMT |
| L194 | `description` | `"Notre bureau d'études et nos équipes…"` | CLIENT |
| L194 | `description` | `…et nos équipes s'appuient sur une riche expérience…` | CLIENT |

L12 is UNC: `"Surface de l'unité"` is a stat-card label wrapping a client figure. Whether
the label itself was supplied or written here is not recorded anywhere in the tree.

### `src/config/chaudronnerie-data.ts` — 17 ASCII (all esc), 0 U+2019

Uniformly ASCII; no visible defect. All 17 are product prose or spec-table values.

| Line | Field | Fragment | Class |
|---|---|---|---|
| L36 | `subtitle` | `'Fabrication sur mesure d\'équipements industriels de haute précision…'` | CLIENT |
| L57 | *(list item)* | `'Intégration d\'accessoires : échelles, passerelles…'` | CLIENT |
| L72 | `valeur` | `'Diamètre' : 'Jusqu\'à 30 mètres'` | CLIENT |
| L73 | `valeur` | `'Hauteur' : 'Jusqu\'à 50 mètres'` | CLIENT |
| L74 | `valeur` | `'Épaisseur de tôle' : 'Jusqu\'à 40 mm'` | CLIENT |
| L86 | `description` | `…de fluides, de gaz, d\'air ou de poussières…` | CLIENT |
| L96 | *(list item)* | `'Tuyauterie de process pour l\'industrie chimique…'` | CLIENT |
| L119 | `description` | `…Notre bureau d\'études travaille en étroite collaboration…` | CLIENT |
| L121 | *(list item)* | `…nos équipements de découpe et d\'assemblage'` | CLIENT |
| L127 | *(list item)* | `'Skids pour l\'industrie pétrolière'` | CLIENT |
| L129 | *(list item)* | `'Supports d\'équipements lourds'` | CLIENT |
| L133 | `materiaux` | `'Tous types d\'aciers de construction…'` | CLIENT |
| L151 | `description` | `…une large gamme d\'équipements pour l'industrie…` | CLIENT |
| L151 | `description` | `…gamme d'équipements pour l\'industrie, en pièce unique…` | CLIENT |
| L170 | `valeur` | `'Découpe Plasma HD' : 'Épaisseur jusqu\'à 60 mm'` | CLIENT |
| L171 | `valeur` | `'Roulage' : 'Épaisseur jusqu\'à 40 mm sur 3 mètres'` | CLIENT |
| L172 | `valeur` | `'Pliage' : 'Jusqu\'à 1000 tonnes'` | CLIENT |

### `src/config/chaudronnerie-tables.ts` — 1 ASCII, 0 U+2019

| Line | Field | Fragment | Class |
|---|---|---|---|
| L41 | — | `// Domaines d'activités — icon resolved by name…` | CMT |

### `src/config/company-data.ts` — 17 ASCII, 5 U+2019 — **both forms**

| Line | Field | Fragment | Class |
|---|---|---|---|
| L193 | — | `* The product page's "CAPACITE DE PRODUCTION…" table…` | CMT |
| L238 | `description` | `"Fabrication sur mesure d'équipements industriels."` | UNC |
| L272 | `headline` | `"BÂTIR L'AVENIR, ENSEMBLE"` | CLIENT |
| L288 | `description` | `'…les travaux de construction de l\'unité de charpente…'` · esc | CLIENT |
| L289 | `description` | `'…le démarrage de la production de l\'unité…'` · esc | CLIENT |
| L293 | `description` | `'Nous continuons d\'innover, guidés par…'` · esc | CLIENT |
| L309 | `text` | `"Engagée dans une démarche d'excellence, BORDJ STEEL est certifiée…"` | CLIENT |
| L330 | `description` | `` `…Gamme d'épaisseur de 30-200 mm…` `` | CLIENT |
| L337 | `description` | `` `…pour des pièces jusqu'à 15m.` `` | CLIENT |
| L344 | `description` | `` `…spécialisée dans la fabrication d'équipements sur mesure…` `` | CLIENT |
| L544 | `terms` | `"Conditions d'Utilisation"` | DEV |
| L557 | — | `/* "Notre domaine d'activité" (/a-propos/histoire) */` | CMT |
| L590 | `title` | `"Notre domaine d'activité"` | CLIENT |
| L592 | *(paragraph)* | `"Depuis sa création, BordjSteel s'est imposée…"` | CLIENT |
| L616 | *(list item)* | `"Conception et réalisation d'équipements métalliques…"` | CLIENT |
| L664 | — | `/** Resolves a reference project's photo… */` | CMT |
| L669 | — | `/** Resolves a production unit's photo… */` | CMT |

Notes:
- **L238 is UNC** because it is a near-duplicate of `chaudronnerie-data.ts:36` (client
  copy) trimmed to nav length. Trimming was done here; the words were not written here.
- **L544 `"Conditions d'Utilisation"`** is site chrome — a legal-page title and footer link
  label, not supplied prose. Classified DEV.
- **L330 and L337 are in flight.** They carry the capacity and max-piece figures that
  DELIVERY-PLAN T2-3 / T2-5 are waiting on the client to settle, and will be rewritten when
  the answers land. Any apostrophe pass should sequence after that, not race it.

### `src/config/contact-scene.ts` — 2 ASCII, 0 U+2019

| Line | Field | Fragment | Class |
|---|---|---|---|
| L25 | — | `* …published technical copy on a client's commercial site…` | CMT |
| L33 | — | `* The design document's charpente caption read "Portique…"` | CMT |

The rendered captions themselves (`SCENE_CAPTIONS`) contain no apostrophe of either form.

### `src/config/press-data.ts` — 2 ASCII, 23 U+2019 — not a rendered mix

| Line | Field | Fragment | Class |
|---|---|---|---|
| L26 | — | `* …naming Bordj Steel among the group's exhibitors…` | CMT |
| L27 | — | `* …published by the parent group's own corporate site…` | CMT |

All 23 U+2019 are inside verbatim quotations of published articles (TSA, L’Express
Quotidien and others) and their summaries. Hardest no-touch material in the repo; happily,
zero ASCII occurrences fall inside it.

### `src/config/product-heroes.ts` — 4 ASCII, 0 U+2019

| Line | Field | Fragment | Class |
|---|---|---|---|
| L12 | — | `* else's building, under a mountain range that is not in Algeria.` | CMT |
| L49 | `alt` | `'…rouleuse à trois rouleaux et fonds bombés à l\'arrière-plan.'` · esc | DEV |
| L56 | — | `// sat at roughly the wall's own luminance and vanished.` | CMT |
| L59 | `alt` | `'…bobines d\'acier prélaqué en entrée de profileuse…'` · esc | DEV |

L49 and L59 are alt text for the four product hero frames, written in this repo. The file
header establishes the provenance: the frames are generated, and "Each prompt was written
against what the unit actually does, as recorded in `src/config/*-data.ts`". The alt text
describes those generated frames. No client-supplied text is involved anywhere in the file.

### `src/config/product-variant-schema.ts` — 3 ASCII, 0 U+2019

| Line | Field | Fragment | Class |
|---|---|---|---|
| L13 | — | `* …makes the reserved box the picture's own shape…` | CMT |
| L28 | — | `* table's groups must add up to the width of one of its \`rows\`…` | CMT |
| L34 | — | `/** Support-condition diagram drawn above this group's columns. */` | CMT |

This is a types-and-JSDoc file. It contains **no user-visible strings at all**, so there is
nothing here beyond comments.

### `src/config/product-variants.config.ts` — 34 ASCII, 2 U+2019 — **both forms**

The largest concentration, and the most clearly client-supplied: steel grades, coating
micron values, tolerance tables, fire-reaction classes and multi-sentence installation
instructions. This is a transcription of the client's product documentation.

| Line | Field | Fragment | Class |
|---|---|---|---|
| L24 | `value` | `'Identification d\'acier: Nuance S250, S280, S320…'` · esc | CLIENT |
| L46 | `title` | `"Coefficient d'isolation thermique"` | CLIENT |
| L67 | `content` | `…la nervure femelle est munie d'un joint…` | CLIENT |
| L67 | `content` | `…munie d'un joint d'étanchéité à l'air."` | CLIENT |
| L67 | `content` | `…d'un joint d'étanchéité à l'air."` | CLIENT |
| L72 | `content` | `…de leur position sur l'ouvrage et de la direction des vents…` | CLIENT |
| L72 | `content` | `…vient en recouvrement lorsqu'on regarde vers le faîtage…` | CLIENT |
| L77 | `content` | `…il est conseillé d'utiliser une scie sauteuse…` | CLIENT |
| L77 | `content` | `…scie sauteuse électrique à lame d'acier.` | CLIENT |
| L77 | `content` | `…sur les pannes d'extrémité. Sur les pannes intermédiaires…` | CLIENT |
| L77 | `content` | `…afin que le joint d'étanchéité à l'air remplisse son rôle…` | CLIENT |
| L77 | `content` | `…le joint d'étanchéité à l'air remplisse son rôle…` | CLIENT |
| L77 | `content` | `…Il est recommandé d'utiliser un joint d'étanchéité…` | CLIENT |
| L77 | `content` | `…d'utiliser un joint d'étanchéité à l'air avec une face adhésive…` | CLIENT |
| L77 | `content` | `…joint d'étanchéité à l'air avec une face adhésive…` | CLIENT |
| L77 | `content` | `…face adhésive sur les faces d'appuis du panneau…` | CLIENT |
| L77 | `content` | `…situées sur les pannes d'extrémité, les chéneaux…` | CLIENT |
| L137 | `value` | `"Identification d'acier : Nuance S250, S280, S320:…"` | CLIENT |
| L159 | `title` | `"Coefficient d'isolation thermique"` | CLIENT |
| L181 | `content` | `…sur la nervure femelle d'un joint d'étanchéité…` | CLIENT |
| L181 | `content` | `…femelle d'un joint d'étanchéité à l'air ; leurs parements…` | CLIENT |
| L181 | `content` | `…d'un joint d'étanchéité à l'air ; leurs parements pré-laqués…` | CLIENT |
| L209 | — | `// Le schéma « lisse/lisse » reste à fournir : il réutilisait l'image du` | CMT |
| L313 | `caption` | `"Détail de l'assemblage"` | UNC |
| L403 | `title` | `"Les avantages de l'utilisation"` | CLIENT |
| L451 | `headers` | `["EP", "NOMBRE D'ESPACES", "CAS DES CHARGES", …]` | CLIENT |
| L488 | `name` | `'Bavette rejet d\'eau'` · esc | CLIENT |
| L488 | `alt` | `alt: 'Bavette rejet d\'eau'` · esc | DEV* |
| L490 | `name` | `'Cornière d\'angle intérieur'` · esc | CLIENT |
| L490 | `alt` | `alt: 'Cornière d\'angle intérieur'` · esc | DEV* |
| L491 | — | `// Photo de la cornière d'angle extérieur à fournir par le client :` | CMT |
| L492 | — | `// l'entrée réutilisait la photo de l'angle intérieur.` | CMT |
| L492 | — | `// l'entrée réutilisait la photo de l'angle intérieur.` | CMT |
| L493 | `name` | `'Cornière d\'angle extérieur'` · esc | CLIENT |

Notes:
- **DEV\*** — the two `alt` values are dev-authored, but each is a verbatim copy of the
  `name` on the same line, which is a client product name. Normalising the `alt` alone
  would make the alt text differ from the visible label beside it. Treat this pair as one
  unit or leave both.
- **L313 is UNC** — an image caption. It may be a dev-authored label for a client diagram
  or lifted from the spec sheet; nothing in the tree records which.
- L493 is the entry DELIVERY-PLAN T2-7 is waiting on a photo for.

### `src/config/recruitment-data.ts` — 5 ASCII, 0 U+2019

Added during this work session by DELIVERY-PLAN T3-6. **All five occurrences are in
comments or JSDoc; none is user-visible**, and the two French job adverts it publishes
contain no apostrophe of either form. Nothing to decide here.

| Line | Field | Fragment | Class |
|---|---|---|---|
| L2 | — | `* Offres d'emploi — the listings the /recrutement page publishes.` | CMT |
| L5 | — | `* …Every French string below is the client's own copy…` | CMT |
| L10 | — | `* finishing a client's job advert is not this file's job.` | CMT |
| L10 | — | `* …a client's job advert is not this file's job.` | CMT |
| L51 | — | `/** Filter key for the « Type d'emploi » select. */` | CMT |

Unrelated to typography but worth surfacing, since this file did not exist when
DELIVERY-PLAN was written: its header records that the two `posted` dates were
**back-derived from the relative strings the page used to hardcode, not supplied by the
client**, and asks for the real posting dates. That is a client-input item with no entry in
DELIVERY-PLAN Tier 2 or KNOWN-ISSUES. It has been added to `docs/CLIENT-DECISIONS.md` as
question 15 so it has a route to the client; no date is quoted there.

### `src/config/sandwich-panels-data.ts` — 1 ASCII, 0 U+2019

| Line | Field | Fragment | Class |
|---|---|---|---|
| L21 | `subtitle` | `"Solutions d'isolation haute performance pour la construction moderne."` | UNC |

UNC with a stated reason: the file header says this content was "extracted verbatim from
the page component so copy lives in config". That establishes the move preserved the text —
it does not establish who wrote the text in the JSX originally.

### `src/config/teams-data.ts` — 3 ASCII, 14 U+2019 — **both forms**

| Line | Field | Fragment | Class |
|---|---|---|---|
| L6 | — | `* …and, simultaneously, the team's…` | CMT |
| L38 | — | `* …gloss on 'hse'. Those are the client's own punctuation, not…` | CMT |
| L49 | `title` | `"Bureau d'études"` | CLIENT |

L49 is the single highest-visibility occurrence in the repo (see finding 1) and is covered
by an explicit in-file prohibition. Flagged for human decision, not for a judgement call.

### `src/config/videos-data.ts` — 5 ASCII, 0 U+2019

| Line | Field | Fragment | Class |
|---|---|---|---|
| L2 | — | `* The company's own video content.` | CMT |
| L13 | — | `* a third party's video as the company's own media…` | CMT |
| L13 | — | `* …the company's own media on the company's own site` | CMT |
| L13 | — | `* …on the company's own site` | CMT |
| L42 | `description` | `"Visite de l'unité de charpente métallique, publiée par Bordj Steel."` | DEV |

L42 is DEV on the file's own evidence: the `description` field is documented as "One line
of French context. Describes the video, invents nothing about it." Written here.

---

## Recommendation

### Safe to normalise, zero risk — but zero benefit

**31 occurrences, all code comments and JSDoc** (`charpente-metallique-data.ts` L27 L171 ·
`chaudronnerie-tables.ts` L41 · `company-data.ts` L193 L557 L664 L669 · `contact-scene.ts`
L25 L33 · `press-data.ts` L26 L27 · `product-heroes.ts` L12 L56 ·
`product-variant-schema.ts` L13 L28 L34 · `product-variants.config.ts` L209 L491 L492×2 ·
`recruitment-data.ts` L2 L5 L10×2 L51 · `teams-data.ts` L6 L38 · `videos-data.ts` L2 L13×3).

These are English-language developer prose where `'` is the *correct* character
(`the team's`, `the picture's own shape`). French typographic rules do not apply to them at
all. **Recommendation: change nothing here.** Normalising them would touch eleven files, show
up in every future `git blame`, and alter nothing a visitor can see.

### Probably safe — 4 occurrences, pending one caveat on 2 more

Dev-authored and user-visible: `company-data.ts` L544, `product-heroes.ts` L49 and L59,
`videos-data.ts` L42. Each is traceable to authorship in this repo — two by an explicit
header note, one a schema-documented field, one site chrome.

Two further occurrences (`product-variants.config.ts` L488, L490 `alt`) are dev-authored
but mirror a client product name character-for-character on the same line. Change both
sides or neither.

Worth noting: all four of the clean DEV occurrences sit in files with **no U+2019 at all**,
so normalising them fixes no visible inconsistency either. They would merely make four
strings match a convention nothing beside them follows.

### Do not touch without confirmation — 75 occurrences

Product descriptions, spec-table values, installation instructions, the QHSE policy text,
the company slogan, the history timeline, the blog bodies and the team titles. These fall
under the standing rule that client-supplied copy is preserved character-for-character, and
`teams-data.ts` carries an explicit in-file prohibition on top of it.

**This category requires the client's confirmation before anyone touches it.** Not the
project owner's, not a developer's reading of intent — the client's.

### The structural finding

**The safe set and the visible set do not intersect.**

Every one of the five visible mixed-convention cases — including the title-above-its-own-body
case in `teams-data.ts` and the alternating timeline in `company-data.ts` — resolves only by
editing client copy. The 31 comment occurrences and the 4 clean dev-authored occurrences fix
nothing a visitor sees. So "normalise the safe categories" is not a partial fix for the
visible defect; it is a diff with no user-facing effect at all.

That leaves two honest options, and no third:

- **Option A — do nothing.** Defensible. The defect is subtle: two apostrophe glyphs in one
  card. No figure is wrong, no claim is false, no link is broken. It is the lowest-ranked
  item in DELIVERY-PLAN for good reason, and it competes with T2-3 and T2-4, which are
  factual errors a buyer can act on.
- **Option B — ask the client one question**, alongside the questions already going out in
  `docs/CLIENT-DECISIONS.md`: *may we standardise apostrophes to the French typographic
  form (`’`) across the site, without changing a single word?* One yes resolves all 75.

If Option B is taken, the minimal-diff shape is to **normalise ASCII to U+2019 only**, never
the reverse. That direction matches French typography, matches the repository's stated
preference, matches the direction the neighbouring client string already uses in all five
visible cases, and never introduces ASCII into copy the client supplied with U+2019. It also
means `chaudronnerie-data.ts`, `blog-data.ts` and the other uniformly-ASCII files are
in-scope for consistency but gain nothing visible — they can be deferred or skipped without
reintroducing a mix.

Whichever option is taken, two constraints hold:

1. **Any pass must handle `\'`.** 30 of the 111 occurrences are escaped, and four files mix
   escaped with unescaped. A matcher that sees only unescaped `'` will half-convert those
   files and create the very defect being fixed.
2. **Sequence after T2-3 and T2-5.** `company-data.ts` L330 and L337 carry capacity and
   max-piece figures the client is currently being asked to settle. Those strings are being
   rewritten anyway; an apostrophe pass should follow that change, not collide with it.

### Leave alone pending authorship — 4 occurrences

`charpente-metallique-data.ts` L12 · `company-data.ts` L238 ·
`product-variants.config.ts` L313 · `sandwich-panels-data.ts` L21. Each is reasoned in its
table row above. They are stat labels, captions and trimmed nav text — plausibly written
here, plausibly supplied. Four occurrences is not worth a guess; if Option B is taken they
are covered by the same blanket yes, and if Option A is taken they do not matter.
