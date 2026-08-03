
import React from 'react';
import { cn } from '@/lib/utils';
import { WF } from '@/components/wireframes/wf-theme';

interface FeatureHoverCardProps {
    Icon: React.ElementType;
    title: string;
    description: string;
    /**
     * Resting (non-hover) selected state. The card is a selector — the page it
     * lives on swaps a technical specification panel further down when one is
     * picked — so the active card has to be readable at a glance, without
     * hovering, and while a *different* card is being hovered.
     *
     * Optional so the component still renders correctly before the call site
     * passes it; an unpassed card is simply never the active one.
     */
    isSelected?: boolean;
}

/**
 * A pillar plate, in the site's shop-drawing vernacular: a sheet with corner
 * registration marks, a header rule, and the product figure mounted on a
 * neutral plate over faint graph paper.
 *
 * Selection is signalled four ways at rest so it never depends on colour alone
 * (and so it survives a colour-vision deficiency):
 *   1. header rule thickens from a 1px hairline to a 6px solid band,
 *   2. the sheet edge gains a second line (border + inset ring),
 *   3. the sheet lifts and its shadow deepens,
 *   4. a status marker appears in the header strip.
 * Hover is deliberately lighter than selection — a smaller lift, a hairline
 * that stays a hairline, no marker — so the active plate still reads as the
 * active one while a neighbour is hovered.
 *
 * Server-safe: no hooks, no handlers. All motion is Tailwind transitions under
 * 400ms, and every one of them collapses under `prefers-reduced-motion: reduce`
 * (the resting lift of the selected plate is a *state*, not motion, so it is
 * kept — only the movement on hover is removed).
 */
export function FeatureHoverCard({ Icon, title, description, isSelected = false }: FeatureHoverCardProps) {
  return (
    <div className={cn(
        // `group` is load-bearing: the bespoke product figures animate from CSS
        // they embed themselves, keyed off `.group:hover`.
        "group relative flex h-full w-full min-h-[26rem] flex-col overflow-hidden rounded-2xl border bg-background text-center",
        "transition duration-300 ease-out motion-reduce:transition-none",
        isSelected
          ? "-translate-y-1 border-accent shadow-xl ring-1 ring-inset ring-accent hover:-translate-y-2 motion-reduce:hover:-translate-y-1"
          : "border-border shadow-sm hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md motion-reduce:hover:translate-y-0"
    )}>
      {/* Header rule. Hairline at rest, a solid band when this plate is the
          active one — a change of mass, not just of hue. */}
      <span
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 transition-all duration-300 motion-reduce:transition-none",
          isSelected ? "h-1.5 bg-accent" : "h-px bg-border group-hover:bg-accent/40"
        )}
      />

      {/* Corner registration marks — the ticks of a trimmed sheet. */}
      <RegistrationMark className="left-3 top-4 border-l border-t" isSelected={isSelected} />
      <RegistrationMark className="right-3 top-4 border-r border-t" isSelected={isSelected} />
      <RegistrationMark className="bottom-3 left-3 border-b border-l" isSelected={isSelected} />
      <RegistrationMark className="bottom-3 right-3 border-b border-r" isSelected={isSelected} />

      {/* Status strip. The row keeps its height whether or not the marker is
          present, so selecting a plate never reflows the four cards.
          `aria-hidden` because the wrapping control already carries
          `aria-pressed` — this is the visual half of that same statement. */}
      <div aria-hidden="true" className="mt-5 flex h-7 shrink-0 items-center justify-center px-5">
        {isSelected && (
          <span className="inline-flex items-center gap-2 border border-accent bg-accent/10 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-accent">
            <span className="block h-1.5 w-1.5 bg-accent" />
            Fiche affichée
          </span>
        )}
      </div>

      {/* Icon plate. Neutral fill on purpose: the figure carries its own ink,
          steel and accent tones and must not be flattened onto a dark disc. */}
      <div className="mt-4 flex shrink-0 justify-center px-5">
        <div className={cn(
          "relative flex h-28 w-28 items-center justify-center overflow-hidden rounded-md border bg-secondary text-accent",
          "transition-colors duration-300 motion-reduce:transition-none",
          isSelected ? "border-accent" : "border-border group-hover:border-accent/50"
        )}>
          <PlateGrid />
          <Icon size={56} className="relative z-10 h-14 w-14" />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center px-5 pb-8 pt-6">
        <span className="block text-lg font-bold leading-snug text-primary">{title}</span>

        {/* Leader rule: drawn out on hover, held out while selected. */}
        <span aria-hidden="true" className="mt-3 block h-px w-16 overflow-hidden bg-border">
          <span className={cn(
            "block h-full w-full origin-center bg-accent transition-transform duration-300 ease-out motion-reduce:transition-none",
            isSelected ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          )} />
        </span>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
      {/* No CTA here: the whole card is already the pillar-selector control
          (CharpenteMetalliquePageContent wraps it in a <button>), so a hover-only
          "En savoir plus" duplicated that action, mislabelled it as navigation
          and was invisible on touch. */}
    </div>
  );
}

/** One corner tick. `className` places it and picks which two edges it draws. */
function RegistrationMark({ className, isSelected }: { className: string; isSelected: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute h-3 w-3 transition-colors duration-300 motion-reduce:transition-none",
        className,
        isSelected ? "border-accent" : "border-border group-hover:border-accent/60"
      )}
    />
  );
}

/**
 * Faint graph-paper backing behind the icon plate, so each figure reads as a
 * detail lifted off a drawing sheet. Lines are inset from the edges so they
 * never collide with the plate's rounded corners.
 */
function PlateGrid() {
  return (
    <svg
      viewBox="0 0 112 112"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40 transition-opacity duration-300 group-hover:opacity-70 motion-reduce:transition-none"
    >
      <g stroke={WF.dim} strokeWidth={0.7} strokeDasharray="2 5" fill="none">
        <path d="M 8 28 L 104 28 M 8 56 L 104 56 M 8 84 L 104 84" />
        <path d="M 28 8 L 28 104 M 56 8 L 56 104 M 84 8 L 84 104" />
      </g>
    </svg>
  );
}
