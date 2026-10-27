"use client";

import { ChevronDown } from 'lucide-react';

/**
 * The homepage hero's scroll control — the ONLY client component above the fold.
 *
 * It exists as a `"use client"` leaf so that everything else in the hero (the
 * LCP image, the scrim, the h1, the subheadline, the capacity figures) stays
 * server-rendered. Nothing here gates a paint: the button is inert HTML until
 * hydration and works the moment it arrives.
 *
 * DEFECT 3 (the shipped hero hardcoded `window.scrollTo({ top: window.innerHeight })`)
 * is fixed here. That arithmetic is wrong the instant the hero is not exactly
 * one viewport tall — which, with `min-h-[100dvh]`, it frequently is not.
 * Instead we resolve a real element, in three tiers:
 *
 *   1. `#${targetId}` — `HERO_NEXT_SECTION_ID`, the id on `VisionMission`.
 *   2. the hero's own next element sibling — survives a section reorder or a
 *      rename of that id, so the coupling degrades instead of failing silently.
 *   3. 90% of a viewport — last resort, still not `innerHeight` exactly.
 *
 * `behavior` is deliberately NOT passed. Per spec, omitting it means
 * `behavior: 'auto'`, which defers to the computed `scroll-behavior` of the
 * scrolling element — and `globals.css` already declares
 * `html { scroll-behavior: smooth }` plus a `prefers-reduced-motion` override
 * that flips it to `auto`. Passing an explicit `'smooth'` (as the shipped hero
 * does) OVERRIDES that override, smooth-scrolling users who asked for no
 * motion. Letting CSS decide is both less code and strictly more correct.
 * `scrollIntoView` also inherits `html { scroll-padding-top: 8rem }`, so the
 * fixed 56–67px header is cleared by the existing global rule rather than by a
 * new magic number here.
 */
export function HeroScrollCue({ targetId }: { targetId: string }) {
  const scrollToNext = () => {
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ block: 'start' });
      return;
    }
    const next = document.getElementById('home')?.nextElementSibling;
    if (next instanceof HTMLElement) {
      next.scrollIntoView({ block: 'start' });
      return;
    }
    window.scrollBy({ top: window.innerHeight * 0.9 });
  };

  return (
    <button
      type="button"
      onClick={scrollToNext}
      className={
        // Focus ring: the global `:focus-visible` is 2px of #C1272D, and this
        // photograph contains a brand-red welding helmet — an accent ring can
        // land invisible on it. Forced to white, with a dark halo behind, so it
        // reads over any pixel of any photo the client ever swaps in.
        // `self-start md:self-end`: the band is a `flex-col` on phones, whose
        // default `stretch` would blow this button out to the full width of the
        // hero — a 335px focus ring around a 134px control. At `md` the band
        // becomes `flex-row-reverse items-end`, and `self-end` matches it.
        'hk-cue-btn hk-r hk-d8 group inline-flex shrink-0 self-start items-center gap-3 rounded-full md:self-end ' +
        'focus-visible:outline-white focus-visible:outline-offset-[3px] ' +
        'focus-visible:[box-shadow:0_0_0_6px_rgba(0,0,0,0.55)]'
      }
    >
      <span
        aria-hidden="true"
        // 44x44 in PX, not `h-11`. The site root is `font-size: 70%`, so `h-11`
        // renders at 30.8px — under the 44px minimum tap target.
        className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full border border-white/40 transition-colors duration-300 group-hover:border-accent group-hover:bg-accent/25"
      >
        <ChevronDown className="hk-cue h-[18px] w-[18px]" />
      </span>
      <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-white/80 transition-colors duration-300 group-hover:text-white">
        Découvrir
        {/* Visible label is contained in the accessible name — WCAG 2.5.3. */}
        <span className="sr-only"> la suite du site</span>
      </span>
    </button>
  );
}
