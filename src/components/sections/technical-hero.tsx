import * as React from 'react';
import Image from 'next/image';
import { HeroMotifArt, type HeroMotif } from '@/components/sections/hero/HeroMotifArt';
import { KenBurns } from '@/components/ui/ken-burns';
import { VideoLoop } from '@/components/ui/video-loop';

/**
 * Hero band drawn rather than photographed.
 *
 * WHY THIS EXISTS. /contact and /about/history opened on AI-generated stock
 * photographs — a call-centre of smiling operators, a generic welding shot.
 * Neither is this company, neither is this plant, and both carried the usual
 * tells. The client has supplied no photography (it is on the punch list), so
 * the options were to generate replacement "photos" — which is exactly what
 * produced the problem — or to stop pretending and draw.
 *
 * This draws. It is the same technical-drawing language as the department
 * figures, the history milestones and the localisation plate, scaled up to a
 * hero: steel ground, drafting grid, a large outlined motif, and brand red
 * reserved for the single element the drawing is about.
 *
 * WHEN REAL PHOTOGRAPHY ARRIVES this component should lose to it. A photograph
 * of the actual plant beats a drawing of one; a drawing of one beats a stock
 * photograph of somebody else's.
 *
 * Server component, with no client leaf of its own: the copy block's entrance
 * is the scoped CSS below rather than `AnimatedWrapper`, and the motif's drift
 * is CSS as well. Both pin themselves under `prefers-reduced-motion: reduce`.
 * The only `"use client"` code this band can mount is `VideoLoop`, and only
 * when a `media.loop` is configured.
 */

/**
 * The copy block's entrance, as CSS rather than as `AnimatedWrapper`.
 *
 * WHY NOT `AnimatedWrapper`. It is `"use client"`, mounts at `opacity-0` and
 * reveals only after hydration plus an IntersectionObserver — a JS gate on the
 * one element all eleven of these routes open with. The `<h1>` painted late, or
 * never if the route chunk failed, and an `opacity-0` element is not even an
 * LCP candidate. This runs at first style resolution instead, so the headline
 * is there with or without JS.
 *
 * Namespaced `.th-*`, and deliberately NOT a copy of `home-page-hero`'s
 * `HERO_CSS` / `.hk-*`: that stylesheet is tuned to the homepage's staggered
 * cartouche, and duplicating it here would leave the repo maintaining two of
 * the same thing. This is the same principle at the size this band needs — one
 * reveal, matching the `zoom-in` it replaces.
 *
 * Inline `<style>` rather than `globals.css` keyframes, and safe here for the
 * reason `ui/ken-burns.tsx` gives for the opposite choice: that component
 * renders up to four times on one page, this band renders once per route.
 */
const HERO_REVEAL_CSS = `
.th-reveal {
  opacity: 0;
  transform: scale(0.95);
  animation: th-reveal 700ms cubic-bezier(0.16, 1, 0.3, 1) both;
}
@keyframes th-reveal {
  to { opacity: 1; transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .th-reveal {
    animation: none;
    opacity: 1;
    transform: none;
  }
}
`;

/**
 * Re-exported, not merely imported. `HeroMotif` was part of this module's
 * public surface before the motifs moved into `hero/HeroMotifArt`, and a caller
 * that names the type should not have to care which file now draws it.
 */
export type { HeroMotif };

/**
 * A photographic backdrop for the band, in place of the drawn motif.
 *
 * This is the "WHEN REAL PHOTOGRAPHY ARRIVES" escape hatch named above. It is
 * additive on purpose: passing `media` swaps the ground, nothing else. The stat
 * strip, the eyebrow/title/subtitle block (including galvanisation's verbatim
 * client copy), the sheet rules and the corner ticks all render exactly as they
 * do over a drawing, so a page can gain or lose a photograph without any of its
 * content moving.
 *
 * `motif` stays required even with `media` set, because it is what the band
 * falls back to if the photograph is ever pulled.
 */
export type HeroMedia = {
  /** Still that fills the band. Rendered `fill` + `object-cover`, so a landscape frame crops least. */
  src: string;
  alt: string;
  /**
   * Ambient loop laid over the still, between the photo and the scrim. Optional
   * and genuinely so: `VideoLoop` renders nothing at all unless it is going to
   * play — not on a phone, not under reduced motion, not on a metered
   * connection — so the still below stays the LCP element and is what crawlers
   * and most visitors actually get.
   */
  loop?: string;
  /** Base64 LQIP. Omitted where the config has none; next/image then just fades in. */
  blurDataUrl?: string;
  /**
   * How hard to darken the photograph under the copy.
   *
   * `normal` suits a mid-dark frame — a fabrication hall, a galvanising bay.
   * `strong` is for a bright one: the sandwich panel line is a white-walled,
   * brightly lit factory, and at `normal` the white headline sat on roughly the
   * same luminance as the wall behind it and effectively disappeared. This is a
   * property of the picture, so it belongs with the picture rather than in the
   * component.
   */
  scrim?: 'normal' | 'strong';
};

export function TechnicalHero({
  eyebrow,
  title,
  subtitle,
  motif,
  media,
  readout,
  stats,
  actions,
}: {
  eyebrow: string;
  title: string;
  /**
   * A node, not a string: the galvanisation hero carries three sentences of
   * client copy (bath dimensions, max piece length, the 8 h/jour capacity)
   * that must survive this refactor character for character. Narrowing this to
   * a string would have meant either dropping that copy or retyping it.
   */
  subtitle: React.ReactNode;
  motif: HeroMotif;
  /**
   * Optional corner readout, in the manner of a drawing's cartouche.
   *
   * It exists because the gallery's previous hero carried
   * `${TILES.length} VUES · ${AVAILABLE_CATEGORIES.length} CATÉGORIES` — counts
   * derived from the data rather than typed in. That is worth keeping, and
   * worth offering to the other sections, so each hero can state how much it
   * actually holds without anyone maintaining a number by hand.
   */
  readout?: string;
  /**
   * Product-page stat strip, rendered along the foot of the hero like the
   * cells of a title block.
   *
   * The four product pages each had their OWN hero markup and their own stat
   * shape — charpente `{value, unit, icon}`, chaudronnerie
   * `{value, secondaryValue, description}`, galvanisation `{value, large}` —
   * at three, three and five cells, in heroes that were 60dvh, 60dvh and
   * 100dvh. Normalising to one shape here is most of what makes them read as
   * a set.
   *
   * VALUES ARE PASSED THROUGH AS STRINGS, deliberately. Several are the
   * capacity figures the client has still not reconciled (see the CLIENT NOTEs
   * on `charpenteCapacity` and `galvanisationCapacity`). This component
   * formats them; it must never compute or round them.
   */
  stats?: ReadonlyArray<{ label: string; value: string; note?: string }>;
  /** Photographic ground. Omit to keep the drawn motif. */
  media?: HeroMedia;
  /** Primary and secondary calls to action. */
  actions?: React.ReactNode;
}) {
  return (
    <section
      className={`relative flex w-full items-center justify-center overflow-hidden bg-[#1b2430] p-0 text-white ${
        stats && stats.length > 0 ? 'h-[86dvh] pb-28 md:pb-32' : 'h-[60dvh]'
      }`}
    >
      {media ? (
        <>
          {/* `overflow-hidden`: KenBurns over-scales the still past this box — it
              has to, or the pan would expose the container edge — so the wrapper
              must clip or the photo paints outside the section and widens the
              document. */}
          <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
            <KenBurns variant="in" className="absolute inset-0 z-0">
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="100vw"
                className="object-cover"
                priority
                {...(media.blurDataUrl ? { placeholder: 'blur' as const, blurDataURL: media.blurDataUrl } : {})}
              />
            </KenBurns>
            {media.loop ? (
              /* Between the still and the scrim, so every piece of copy reads
                 over it exactly as it reads over the photograph. Deliberately
                 NOT inside KenBurns: the clip carries its own camera move, and
                 compounding the two doubles the motion. */
              <VideoLoop src={media.loop} className="absolute inset-0 z-0 h-full w-full object-cover" />
            ) : null}
          </div>
          {/* Flat scrim, not the vignette: a photograph already has its own
              tonal centre, and a radial darkening fights it. */}
          <div
            aria-hidden="true"
            className={`absolute inset-0 z-10 ${media.scrim === 'strong' ? 'bg-black/70' : 'bg-black/55'}`}
          />
        </>
      ) : (
        <>
          {/* ground: drafting grid, drawn light-on-dark rather than reusing
              .wf-ground, which is tuned for the light sections */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '44px 44px',
            }}
          />
          {/* a second, finer grid — the way a drawing sheet carries minor divisions */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '11px 11px',
            }}
          />

          <HeroMotifArt motif={motif} />

          {/* vignette, so the copy holds its contrast over the drawing */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,36,48,0.78)_0%,rgba(27,36,48,0.62)_55%,rgba(27,36,48,0.9)_100%)]"
          />
        </>
      )}

      {/* sheet rules + corner ticks, the same framing device as the survey plate */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-5 border border-white/15 md:inset-8" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l-2 border-t-2 border-accent md:left-8 md:top-8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b-2 border-r-2 border-accent md:bottom-8 md:right-8"
      />

      {readout ? (
        /* white/55, not /45: over this band /45 composites to rgb(130,135,141)
           = 4.32:1, under the 4.5:1 floor that 10px text needs. /55 lands at
           ~5.56:1. Same measurement as the homepage cartouche caption. */
        <span className="pointer-events-none absolute bottom-7 left-7 z-20 hidden font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55 md:bottom-10 md:left-10 md:block">
          {readout}
        </span>
      ) : null}

      <style>{HERO_REVEAL_CSS}</style>

      <div className="container relative z-20 mx-auto px-4 text-center">
        <div className="th-reveal">
          {/* white/80, not `text-accent`: brand red on this band's #1b2430
              ground is 2.68:1, and `text-[11px]` is a literal px value the 70%
              root does not scale, so the floor is the 4.5:1 of normal text, not
              3:1. white/80 composites to ~10.4:1. The brand colour stays where
              it already clears the floor — the corner ticks above. */}
          <p className={`font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80${media ? " [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]" : ""}`}>
            {eyebrow}
          </p>
          <h1 className={`mt-5 font-headline text-6xl font-bold uppercase leading-tight tracking-tighter text-white md:text-8xl md:leading-tight lg:leading-tight${media ? " [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]" : ""}`}>
            {title}
          </h1>
          {/* div, not p: subtitle is a ReactNode and the galvanisation hero passes
              block-level copy. Nesting <p> inside <p> is invalid, and the browser
              auto-closes it — which shows up as a hydration mismatch. */}
          <div className={`mx-auto mt-6 max-w-3xl text-xl text-gray-200 md:text-2xl${media ? " [text-shadow:0_2px_10px_rgba(0,0,0,0.6)]" : ""}`}>{subtitle}</div>
          {actions ? <div className="mt-9 flex flex-wrap items-center justify-center gap-4">{actions}</div> : null}
        </div>
      </div>

      {/* Stat strip, read as the cells of a title block rather than as floating
          cards. Scrolls horizontally on a phone instead of wrapping into a
          stack, so the row stays a row and the hero keeps its height.

          THE CELLS ARE 40% WIDE, NOT 46%. At 46% two cells filled a 347px strip
          to within 7px, so the third — "Surface de l'unité 10 000 m²" on
          charpente — sat entirely off-screen with nothing to suggest it was
          there. A phone visitor read a three-stat strip as a two-stat strip.
          At 40% the third cell is cut mid-way instead of hidden, which is the
          whole affordance: a cell sliced by the edge says "scroll me" and a
          clean edge says "that is all of them". */}
      {stats && stats.length > 0 ? (
        <div className="absolute inset-x-0 bottom-0 z-20">
          <div className="mx-5 border-t border-white/15 md:mx-8">
            <dl className="flex snap-x snap-mandatory overflow-x-auto md:justify-center">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={`min-w-[40%] max-w-[62%] shrink-0 snap-start px-3.5 py-5 sm:min-w-0 sm:max-w-none sm:flex-1 md:max-w-[220px] md:px-7 md:py-6 ${
                    i > 0 ? 'border-l border-white/12' : ''
                  }`}
                >
                  {/* white/55 for the same measured reason as the readout above. */}
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-white/55">
                    {s.label}
                  </dt>
                  <dd className="mt-2 font-headline text-2xl font-bold tabular-nums leading-none text-white md:text-3xl">
                    {s.value}
                  </dd>
                  {s.note ? <p className="mt-1.5 text-xs leading-snug text-white/50">{s.note}</p> : null}
                </div>
              ))}
            </dl>
          </div>
        </div>
      ) : null}
    </section>
  );
}
