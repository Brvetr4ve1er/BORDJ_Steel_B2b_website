import type { CSSProperties } from 'react';
import Image from 'next/image';
import { companyData } from '@/config/company-data';
import images from '@/app/lib/placeholder-images.json';
import { HeroScrollCue } from '@/components/sections/hero/HeroScrollCue';
import { HeroCountUp } from '@/components/sections/hero/HeroCountUp';

/**
 * "Plan-Séquence" — the homepage hero.
 *
 * One full-bleed factory photograph behind a left-anchored editorial title
 * block, framed by drafting trim marks, with the three capacity figures set as
 * a title-block cartouche along the bottom rule. The house shop-drawing
 * vernacular (`ProductsHeroBackdrop`, `FactoryLocationCard`, `steel-loader`,
 * `PrsGirderIcon`) applied to a photograph for the first time: trim marks, a
 * station line, a dimension rule with an accent extent and weld-flashed
 * terminators, a cartouche hairline. Nothing invented — every gesture already
 * exists elsewhere in this repo.
 *
 * This is a SERVER component. The image, scrim, trim frame, h1, subheadline and
 * all three formatted figures render on the server; the only client code above
 * the fold is `HeroScrollCue`, a ~40-line button.
 *
 * Deliberately removed from the shipped version:
 *   - `AnimatedWrapper` (x4). It is `"use client"`, mounts at `opacity-0`, and
 *     reveals only after hydration + IntersectionObserver — a JS gate on the
 *     LCP region, and invisible forever if JS fails. Replaced by scoped CSS
 *     keyframes that start at first style resolution.
 *   - `AnimatedNumber` (x3). It renders the literal string `0` until an
 *     IntersectionObserver fires, so with JS disabled or hydration failed the
 *     client's homepage stated its capacity as "0". Figures are now formatted
 *     on the server and are correct on first paint.
 *     NOTE, for whoever is tempted to swap the count-up back in: the bundle
 *     argument is NOT the reason. `framer-motion` is already in the homepage's
 *     static graph via `vision-mission.tsx` and `sections/StatsSection.tsx`
 *     (see the comment at the top of `home-page.tsx`), so the bundle delta of
 *     removing it here is zero. The real wins are three fewer hydration roots,
 *     three fewer IntersectionObservers, three fewer 2-second rAF loops
 *     competing with image decode at exactly the moment LCP resolves, and
 *     figures that are correct without JS. `AnimatedNumber` also never checks
 *     `prefers-reduced-motion`; `VisionMission` and `StatsSection` still carry
 *     both exposures and want a separate fix.
 *   - `backdrop-blur-sm` on the stats panel — a full-width backdrop filter
 *     above the fold, re-rasterised on every scroll frame. The panel is gone
 *     entirely; the figures sit directly on the photograph.
 */

/** The section this hero scrolls to. Consumed by `HeroScrollCue`. */
/*
 * Ideally `vision-mission.tsx` would render `<section id={HERO_NEXT_SECTION_ID}>`
 * instead of its hardcoded `id="about"`, in the same commit, so the two ends of
 * the coupling cannot drift. That edit is out of scope for this change, so the
 * cue instead falls back to the hero's next element sibling if the id ever
 * disappears — the failure degrades rather than going silent. See
 * `src/components/vision-mission.tsx` (the `<section id="about">`).
 */
export const HERO_NEXT_SECTION_ID = 'about';

/**
 * Evaluated once, at module scope. The whole site is French: a visitor browsing
 * in en-US must still read "25 000", never "25,000".
 *
 * The server bakes the final figure into the HTML with this, so the capacity is
 * correct on first paint and without JS. `HeroCountUp` then animates from 0 to
 * that value using the SAME formatter, so the U+202F group separator cannot
 * change shape between an intermediate frame and the resting value.
 */
const HERO_LOCALE = 'fr-FR';
const nf = new Intl.NumberFormat(HERO_LOCALE);

/**
 * The scrim. ONE element, ONE paint, four comma-separated gradients — not four
 * stacked divs, no `backdrop-filter`, no `mix-blend-mode`.
 *
 * It sculpts rather than darkens: the left third is graded down like a key
 * light falling off, and the right two-thirds of the photograph stay open.
 *
 * ACCEPTANCE TEST, not taste. Compositing black at alpha `a` over a worst-case
 * blown-white pixel yields sRGB `1 - a`; solving 1.05 / (L + 0.05) >= 4.5 gives
 * a >= 0.535 for AA normal text and a >= 0.411 for AA large text. Composite
 * alpha of stacked blacks is 1 - PROD(1 - a_i). Measured against this image
 * (`/media/d503286d…-77bc4a92.webp`: pale wall across the top, cream glove at
 * centre-left, spark spray through the lower-left, red welding helmet upper
 * centre-right):
 *
 *   zone                     1440x900   375x812   floor   worst-case ratio
 *   eyebrow      (8%, 40%)     0.68        —      0.535   5.8:1  (white/80)
 *   headline     (8%, 56%)     0.74      0.69     0.411   10.1:1 / 8.1:1
 *   subheadline  (8%, 72%)     0.82      0.76     0.535   13.5:1 / 11.0:1
 *   figures      (88%, 90%)    0.75      0.84     0.535   10.6:1 / 14.7:1
 *   labels       (as above)      —         —      0.535   6.2:1 / 7.9:1 (white/70)
 *
 * The left key-light stop is 0.62, deliberately NOT the 0.86 that would also
 * clear the floor: 0.86 reads as a black wedge over a photograph whose left
 * third is the spark spray, and the numbers above show ~2x headroom over AA at
 * 0.62. If anyone raises these, re-run the table — do not eyeball it.
 */
const HERO_SCRIM: CSSProperties = {
  backgroundImage: [
    // Corner falloff — a cinematic vignette that keeps the trim frame from
    // floating and pulls the blown-out spark field in the lower-left down.
    'radial-gradient(120% 92% at 74% 26%, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 46%, rgba(0,0,0,0.30) 100%)',
    // Left key-light shaper — anchors the type column, releases the right of
    // the frame. On a narrow viewport the whole frame sits nearer the dark end,
    // which is exactly the extra scrim a small screen needs.
    // The tail reaches 82%, not 66%: measured against the real photograph, the
    // last glyphs of "BÂTIR L'AVENIR," land at x≈64% directly over a blown-out
    // spark, and a 66% falloff left that pixel at 2.79:1 — under the 3:1 large-
    // text floor. Extending the falloff rather than flattening a horizontal
    // band keeps this a key light and keeps the right edge of the frame open.
    'linear-gradient(100deg, rgba(0,0,0,0.64) 0%, rgba(0,0,0,0.52) 24%, rgba(0,0,0,0.36) 46%, rgba(0,0,0,0.14) 68%, rgba(0,0,0,0) 82%)',
    // Vertical grade — deep at the cartouche, light at the top (the navbar
    // ships its own `from-black/55` scrim while transparent).
    'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.62) 14%, rgba(0,0,0,0.30) 38%, rgba(0,0,0,0.10) 62%, rgba(0,0,0,0.08) 100%)',
    // Flat floor — the guaranteed contrast baseline everywhere else fails.
    'linear-gradient(rgba(0,0,0,0.14), rgba(0,0,0,0.14))',
  ].join(', '),
};

/** Trim-mark arm. Borders, not SVG: `preserveAspectRatio="none"` on a
 *  viewport-ratio box stretches L-arms unevenly. Lengths in px — at the 70%
 *  root `h-6` is 16.8px, smaller than the mobile arm. */
const TRIM_ARM = 'absolute h-[18px] w-[18px] border-white/25 md:h-[26px] md:w-[26px]';

export function HomePageHero() {
  const { hero } = companyData.pages.homepage.content;
  const heroImage = images.homepage.hero;
  // Derived from config, exactly as `ProductsHeroBackdrop` already derives it.
  // An eyebrow line that invents nothing.
  const unitCount = companyData.pages.units.items.length;

  return (
    <section
      id="home"
      className="hk-plate relative isolate grid min-h-[100dvh] w-full grid-rows-[minmax(0,1fr)_auto] overflow-hidden bg-primary p-0 text-white"
    >
      {/*
        DEFECT 1 — `h-[100dvh]` (100vh) replaced by `min-h-[100dvh]`, matching
        `home-page.tsx`. To be precise about what dvh does, because two of the
        three design concepts described it backwards: `dvh` is the *dynamic*
        viewport unit, so it DOES track the collapsing mobile URL bar (`svh`/
        `lvh` are the static ones). That is the desired behaviour here — the
        hero always fills exactly what the user can see, the extra height lands
        in the `minmax(0,1fr)` row, and scroll-driven viewport resizes are
        excluded from CLS by definition. The bottom band does translate down as
        the bar hides; that is deliberate, not a regression.

        DEFECT 2 — the chevron/stats collision, fixed BY CONSTRUCTION. There are
        exactly two in-flow grid rows and ZERO absolutely-positioned content:
        row 1 is the type lockup, row 2 is the cartouche band, and the band
        holds the figures and the scroll cue as ordinary flex siblings. Two
        in-flow siblings cannot overlap at any viewport, any label wrap, any
        font size, any dvh value. The shipped failure mode (a mobile
        `grid-cols-1` stats panel growing to ~290px and swallowing a
        `bottom-32` chevron) is not mitigated here; it is unrepresentable.

        `minmax(0,1fr)`, not a bare `1fr`: a bare `1fr` track carries an
        automatic min-content floor, so a Montserrat font-swap that flips the
        headline from two lines to three would grow the track, grow the section
        past 100dvh and push the band down — a large CLS on the LCP surface.
        With `minmax(0,1fr)` the band and the image are immune to font swap.

        `p-0` still overrides the global `section { @apply py-16 md:py-24 lg:py-32 }`.
        `isolate` scopes the z-stack so nothing here can fight the fixed z-50 navbar.
        `bg-primary` is the pre-decode floor, so the scrim maths hold before paint.
      */}
      <style>{HERO_CSS}</style>

      {/* ---------------- backdrop (out of flow, creates no grid track) ------ */}
      <div className="hk-drift absolute inset-0 z-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          sizes="100vw"
          priority
          placeholder="blur"
          blurDataURL={heroImage.blurDataUrl}
          className="object-cover object-center"
          data-ai-hint={heroImage.aiHint}
        />
      </div>
      <div aria-hidden="true" className="absolute inset-0 z-10" style={HERO_SCRIM} />

      {/* Sheet trim marks. Start BELOW the fixed header (h-20 = 56px,
          md:h-24 = 67.2px at the 70% root) so they never collide with the logo. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[10px] bottom-[10px] top-[68px] z-10 md:inset-x-[22px] md:bottom-[22px] md:top-[88px]"
      >
        <span className={`${TRIM_ARM} left-0 top-0 border-l border-t`} />
        <span className={`${TRIM_ARM} right-0 top-0 border-r border-t`} />
        <span className={`${TRIM_ARM} bottom-0 left-0 border-b border-l`} />
        <span className={`${TRIM_ARM} bottom-0 right-0 border-b border-r`} />
      </div>

      {/* ---------------- ROW 1 — the lockup --------------------------------- */}
      <div className="relative z-20 mx-auto flex w-full max-w-[1600px] flex-col justify-end px-[var(--hk-g)] pb-[clamp(20px,4.5vh,56px)] pt-[clamp(72px,13vh,104px)]">
        <div className="relative border-l border-white/20 pl-[16px] md:pl-[30px]">
          {/* Station line — an accent segment where the eyebrow sits. */}
          <span
            aria-hidden="true"
            className="hk-wy absolute -left-px top-0 h-[clamp(26px,6vh,64px)] w-px bg-accent"
          />

          <p className="hk-r hk-d0 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 sm:text-[11px] sm:tracking-[0.3em]">
            {unitCount} unités de production
            <span className="hidden sm:inline"> — Bordj Bou Arréridj, Algérie</span>
          </p>

          {/* The headline runs the full measure. There is deliberately NO
              extension hairline beside it: `max-w-[18ch]` is a ch measure and the
              font size is a vw/vh clamp, so the h1's box is a near-constant
              fraction of the column at every width — measured at 1440x900 the
              leftover for a `flex-1` rule was 0px, which paints an orphan
              terminator tick and reads as a bug. The "line running to the sheet
              edge" gesture is carried by the dimension rule below and the
              cartouche rule instead, both of which always render. */}
          <h1 className="hk-h1 hk-r hk-d1 mt-[clamp(12px,2.2vh,24px)] max-w-[18ch] font-headline font-bold uppercase leading-[0.95] tracking-[-0.02em] [text-shadow:0_1px_2px_rgba(0,0,0,0.55),0_10px_34px_rgba(0,0,0,0.45)]">
            {hero.headline}
          </h1>

          {/* Dimension rule, read left to right as a draughtsman would set it
              out: witness tick, accent extent, witness tick, hairline
              continuation, closing witness tick. The three ticks flash as they
              seat, on the `sl-weld` curve from `ui/steel-loader.tsx`
              (0 -> 1 -> 0.3 -> 0.95 -> settle) — reused, not reinvented. */}
          <div
            aria-hidden="true"
            className="mt-[clamp(16px,2.4vh,30px)] flex h-[10px] w-full max-w-[520px] items-center"
          >
            <span className="hk-weld h-full w-px bg-accent" />
            <span className="hk-w h-[3px] w-[clamp(52px,7vw,96px)] bg-accent" />
            <span className="hk-weld hk-weld-2 h-full w-px bg-accent" />
            <span className="hk-w hk-w2 h-px flex-1 bg-white/25" />
            <span className="hk-weld hk-weld-3 h-[6px] w-px bg-white/40" />
          </div>

          <p className="hk-sub hk-r hk-d3 mt-[clamp(12px,1.9vh,22px)] max-w-[46ch] font-medium leading-[1.5] text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.7)]">
            {hero.subheadline}
          </p>
        </div>
      </div>

      {/* ---------------- ROW 2 — the cartouche band ------------------------- */}
      {/* `env(safe-area-inset-bottom)`: this band is the element you least want
          an iOS home indicator / Android gesture bar sitting on. */}
      <div className="relative z-20 mx-auto w-full max-w-[1600px] px-[var(--hk-g)] pb-[max(clamp(14px,2.6vh,32px),env(safe-area-inset-bottom))]">
        {/* Cartouche caption. Real drafting shorthand, and a truth claim about
            the *drawing*: it asserts no scale and no dimensions, which is what
            lets the plate be this elaborate without fabricating a single fact. */}
        {/* white/55, not /45: measured against the real photograph, /45 lands at
            4.52:1 — inside measurement noise of the 4.5:1 floor. */}
        <p className="hk-r hk-d4 mb-[6px] hidden text-right text-[9px] font-medium uppercase tracking-[0.28em] text-white/55 sm:block">
          ÉCH. — · DIM. NON COTÉES
        </p>

        {/* Band rule — echoes the dimension rule above. */}
        <div aria-hidden="true" className="flex h-px w-full">
          <span className="hk-w hk-w2 w-[clamp(52px,7vw,96px)] bg-accent" />
          <span className="hk-w hk-w2 flex-1 bg-white/20" />
        </div>

        <div className="flex flex-col gap-6 pt-[clamp(12px,2vh,20px)] md:flex-row-reverse md:items-end md:justify-between md:gap-12">
          {/*
            THE RAIL STAYS `grid-cols-3` AT EVERY BREAKPOINT. Do not "improve"
            this by collapsing to one column on phones: three stacked figures is
            precisely what made the old panel 250–330px tall and let it swallow
            the chevron. Three columns keep this band ~60–90px at every width.

            A fourth capacity stat, if the client ever adds one, wraps onto a
            second grid row and the band simply grows in flow. Nothing overlaps.
          */}
          <dl className="grid grid-cols-3 gap-x-2 sm:gap-x-6 md:gap-x-10">
            {hero.stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`hk-r hk-d${5 + i} flex min-w-0 flex-col-reverse border-l border-white/15 pl-[6px] sm:pl-4 md:pl-5`}
              >
                {/* `<dt>` before `<dd>` in the DOM (so a screen reader announces
                    "Tonnes/an Charpente : 25 000") but `flex-col-reverse` puts
                    the numeral above the label, so all three numerals share one
                    baseline and unequal label wrapping grows downward only.
                    `<div>` wrappers inside `<dl>` are valid HTML5. */}
                <dt className="mt-[6px] text-[10px] font-medium uppercase leading-[1.35] tracking-[0.14em] text-white/70 sm:text-[11px]">
                  {stat.label}
                </dt>
                {/*
                  Figures are WHITE and the accent lives on the RULE. That is not
                  a colour preference: #C1272D over this band computes to ~3.1:1,
                  which scrapes the large-text threshold with no margin, and
                  `wf-theme.ts` defines accent as "the highlighted / interactive
                  dimension" — the rule, not the value. (The shipped hero puts
                  `text-accent` on 44.8px figures over `bg-black/35`; that is a
                  live AA failure, not just an aesthetic one.)

                  Width check, the narrowest real case. Montserrat Bold tabular
                  figures run ~0.63em; `1 500 000` from `fr-FR` is 7 digits plus
                  two U+202F narrow no-break spaces (~0.30em, and they do not
                  wrap), and `tracking-[-0.02em]` claws back 0.18em across the
                  nine glyphs: ~4.83em total. At a 320px viewport each column is
                  ~93.6px, less a 1px hairline and 6px of padding = ~86.6px; the
                  16px floor needs 77.3px. Fits with ~9px to spare, and the
                  margin only grows from there.
                */}
                {/*
                  The figure is server-rendered at its final value, then counted
                  up as progressive enhancement — see `HeroCountUp`. This keeps
                  the property the previous revision gained (the capacity is
                  correct without JS, never "0") while restoring the animation.
                  `tabular-nums` above is load-bearing during the count: it stops
                  the column reflowing as digits change width.
                */}
                <dd className="hk-fig font-headline font-bold leading-none tracking-[-0.02em] text-white [font-variant-numeric:tabular-nums]">
                  <HeroCountUp value={stat.value} locale={HERO_LOCALE}>
                    {nf.format(stat.value)}
                  </HeroCountUp>
                </dd>
              </div>
            ))}
          </dl>

          {/* DOM order is figures -> cue, so reading and focus order are
              figures -> cue. `md:flex-row-reverse` puts the cue on the LEFT of
              the band (continuing the station line under the headline) with the
              figures right. The `<dl>` contains nothing focusable, so the
              visual reversal creates no focus-order problem. */}
          <HeroScrollCue targetId={HERO_NEXT_SECTION_ID} />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ *
 * Scoped stylesheet. Namespaced `.hk-*`, rendered inside the server
 * component exactly as `ProductsHeroBackdrop` (`.phb-*`), `steel-loader`
 * (`.sl-*`) and `PrsGirderIcon` (`.pil-*`) already do. Zero JS drives any
 * animation and nothing waits for hydration.
 *
 * Every animated property is `opacity` or `transform` — neither participates
 * in layout, so no reveal here can produce a layout shift.
 *
 * No `will-change` anywhere. A permanent compositing layer for a
 * 1920x1280 full-viewport image is real mobile memory cost, and an animated
 * transform is auto-promoted regardless.
 *
 * The string below is deliberately terse: it is inlined verbatim into the HTML
 * of the LCP surface, so every byte of prose in it is a byte the visitor
 * downloads before first paint. All the reasoning lives here, in TS comments
 * the compiler strips.
 *
 * `--hk-g` — ONE gutter drives the type column and the cartouche band, so the
 *   two can never drift apart. px-based on purpose: the site root is
 *   `font-size: 70%`, so a rem-scale utility silently renders at 70% nominal.
 *
 * `.hk-h1` — `min(vw, vh)`, not vw alone. On a short landscape phone (812x375)
 *   a pure-vw headline is ~70px, overflows the `minmax(0,1fr)` track, and —
 *   because the lockup is bottom-anchored — the overflow clips the eyebrow off
 *   the top. Bounding on vh keeps the whole lockup inside one viewport at every
 *   aspect ratio: 38px at 375w, ~43px at 812x375, ~103px at 1440x900, capped at
 *   124px. The shipped hero's `lg:text-8xl` is 67.2px at this root.
 *
 * `.hk-fig` — two expressions, because the figures get very different amounts
 *   of room either side of `md`. Below 768px the band is a `flex-col` and the
 *   `<dl>` spans the full column, so 5vw is affordable. At `md` the band becomes
 *   `flex-row-reverse` and the `<dl>` shares the row with the ~134px cue: at
 *   768px each column is only ~146px of usable width, and 5vw (capped at 34px)
 *   made "1 500 000" overflow its cell by 6px at 812x375 — measured, not
 *   guessed. 3.4vw keeps the widest figure inside its column from 768px up
 *   while still reaching the 34px cap by ~1000px, so desktop loses nothing.
 *
 * `.hk-drift` — the signature gesture. Composite-only: transform, no layout, no
 *   repaint, and it cannot delay image decode or first paint. Geometry is safe
 *   by construction — at `scale(1.05)` the overflow margin is 2.5% per side and
 *   the translate never exceeds 1.1%.
 *   Gated to >=768px AND `no-preference`: it force-promotes a ~1.25x-viewport
 *   texture and keeps the compositor awake for as long as the hero is visible,
 *   which is a battery and thermal cost on exactly the low-end mobile this site
 *   serves — and a 28s imperceptible drift reads on a large screen and reads as
 *   nothing on a phone. Below the gate the image rests at its natural crop.
 *
 * `.hk-w` / `.hk-wy` — the same "line drawn onto the sheet" idiom as
 *   `.phb-draw`'s dash-offset sweep, done with transforms because these are
 *   divs, not paths.
 *
 * `.hk-weld` — curve lifted from `sl-weld` in `ui/steel-loader.tsx`: strike,
 *   cool, re-strike, settle. The dimension terminators seat AFTER the rule
 *   arrives, which is the order a draughtsman works in.
 *
 * `.hk-cue` — replaces `animate-bounce`, which throws the element 25% of its
 *   height every second, forever. Five patient 4px settles (~12s), then it
 *   rests holding the final frame; no forever-loop is left running on a page
 *   someone leaves open.
 *
 * The `prefers-reduced-motion` block is last AND `!important`: the delay classes
 * carry the `animation` shorthand at equal specificity, so relying on cascade
 * order alone would make a silent, invisible dependency out of source order. It
 * is not redundant with the global rule in `globals.css`, which only pins
 * `animation-duration` and `animation-iteration-count` — `animation: none` is
 * what actually stops an infinite alternate cycle. Every animated property
 * lands on its final state: image at its natural crop, all type opaque and
 * untranslated, every rule at full extent, chevron still.
 * ------------------------------------------------------------------------ */
const HERO_CSS = `
.hk-plate { --hk-g: clamp(14px, 4vw, 56px); }
.hk-h1 { font-size: clamp(38px, min(8.6vw, 11.5vh), 124px); }
.hk-sub { font-size: clamp(15px, 1.5vw, 24px); }
.hk-fig { font-size: clamp(16px, 5vw, 34px); }
@media (min-width: 768px) { .hk-fig { font-size: clamp(20px, 3.4vw, 34px); } }
@media (min-width: 768px) and (prefers-reduced-motion: no-preference) {
  .hk-drift {
    animation: hk-drift 28s cubic-bezier(0.37, 0, 0.63, 1) infinite alternate;
  }
}
@keyframes hk-drift {
  from { transform: scale(1.05) translate3d(0, 0, 0); }
  to   { transform: scale(1.10) translate3d(-1.1%, -0.8%, 0); }
}

.hk-r {
  opacity: 0;
  transform: translate3d(0, 14px, 0);
  animation: hk-rise 620ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes hk-rise {
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}
.hk-d0 { animation-delay: 0ms; }
.hk-d1 { animation-delay: 70ms; }
.hk-d3 { animation-delay: 260ms; }
.hk-d4 { animation-delay: 380ms; }
.hk-d5 { animation-delay: 440ms; }
.hk-d6 { animation-delay: 510ms; }
.hk-d7 { animation-delay: 580ms; }
.hk-d8 { animation-delay: 660ms; }

.hk-w {
  transform: scaleX(0);
  transform-origin: left;
  animation: hk-wipe 760ms cubic-bezier(0.22, 1, 0.36, 1) 300ms both;
}
.hk-w2 { animation-delay: 420ms; }
.hk-wy {
  transform: scaleY(0);
  transform-origin: top;
  animation: hk-wipe-y 620ms cubic-bezier(0.22, 1, 0.36, 1) 120ms both;
}
@keyframes hk-wipe   { to { transform: scaleX(1); } }
@keyframes hk-wipe-y { to { transform: scaleY(1); } }

.hk-weld {
  opacity: 0;
  animation: hk-weld 880ms ease-in-out 860ms both;
}
.hk-weld-2 { animation-delay: 980ms; }
.hk-weld-3 { animation-delay: 1100ms; }
@keyframes hk-weld {
  0%   { opacity: 0; }
  22%  { opacity: 1; }
  40%  { opacity: 0.3; }
  62%  { opacity: 0.95; }
  100% { opacity: 1; }
}

.hk-cue {
  animation: hk-cue 2.4s ease-in-out 1.2s 5 both;
}
@keyframes hk-cue {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(4px); }
}
.hk-cue-btn:hover .hk-cue,
.hk-cue-btn:focus-visible .hk-cue {
  animation: hk-cue-nudge 520ms cubic-bezier(0.33, 1, 0.68, 1) 1 both;
}
@keyframes hk-cue-nudge {
  0%   { transform: translateY(0); }
  45%  { transform: translateY(5px); }
  100% { transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .hk-drift,
  .hk-r,
  .hk-w,
  .hk-wy,
  .hk-weld,
  .hk-cue,
  .hk-cue-btn:hover .hk-cue,
  .hk-cue-btn:focus-visible .hk-cue {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
}
`;
