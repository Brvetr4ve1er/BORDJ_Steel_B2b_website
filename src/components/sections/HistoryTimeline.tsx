import React from 'react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { companyData } from '@/config/company-data';

/**
 * "Notre Parcours" — the company history, drawn as a measured axis.
 *
 * WHAT THIS REPLACED, AND WHY. The previous version was the default alternating
 * card timeline: white cards left and right of a centre rule, each with a
 * lucide icon in a red circle overlapping its corner. Three problems, in order
 * of severity:
 *
 *   - The icons carried no meaning. A lightbulb for founding a steel company, a
 *     gear for building it, a bar chart for adding a production line. They were
 *     decoration standing where information should be, and they are gone. The
 *     `icon` key has been removed from `timelineEvents` in config rather than
 *     left behind as data nothing reads.
 *   - Half the grid was permanently empty. Each row reserved four of nine
 *     columns for a spacer opposite the card, so on a 1024px container roughly
 *     450px per row rendered nothing at all.
 *   - The two branches were ~40 lines of near-duplicate JSX, which this repo's
 *     CLAUDE.md forbids. There is now one row template.
 *
 * THE AXIS IS THE IDEA. Rather than spacing entries evenly, the rule is scaled:
 * every year from the first entry to the last gets a minor tick, and an event
 * sits on its true year. The five-year run from création to inauguration is
 * therefore visibly dense, and the gaps that follow are visibly long. The
 * company's tempo is read off the drawing instead of asserted in copy — which
 * is the one thing an evenly-spaced timeline can never show.
 *
 * Emphasis comes from the DATA: `milestone: true` in `timelineEvents` fills a
 * tick solid. The component does not know which years matter; config does.
 *
 * Server component. The old file was `"use client"` only to reach
 * `AnimatedWrapper`, which is itself the client leaf, and `AnimatedNumber`,
 * which moved out with the human-capital block into `HumanCapital.tsx`.
 */

type TimelineEvent = {
  year: string;
  title: string;
  description: string;
  milestone?: boolean;
};

/**
 * Vertical space, in px, between an entry and the one before it.
 *
 * This is where the scale actually lives. A first attempt positioned tick marks
 * as percentages of the track while the rows sat in normal flow — so the ticks
 * and the events they were supposed to measure could never line up, and the
 * "scale" was decoration. Spacing the ROWS by their year gap instead makes the
 * drawing honest: one year apart is one unit of space, six years apart is six,
 * and the intervening ticks land exactly in between because they are drawn
 * inside that same gap.
 */
const GAP_MIN = 40; // a one-year step
const GAP_PER_YEAR = 34; // each additional year

function gapFor(deltaYears: number): number {
  return GAP_MIN + Math.max(0, deltaYears - 1) * GAP_PER_YEAR;
}

export function HistoryTimeline() {
  // Single source of truth: timeline events live in company-data.ts.
  const events = companyData.pages.about.timelineEvents as readonly TimelineEvent[];

  const years = events.map((e) => Number(e.year)).filter((n) => Number.isFinite(n));
  const first = Math.min(...years);
  const last = Math.max(...years);

  // Each entry carries the gap that separates it from the previous one, and the
  // list of years passed over on the way. Those years become the minor ticks.
  const rows = events.map((event, i) => {
    const prev = i === 0 ? null : Number(events[i - 1]?.year);
    const current = Number(event.year);
    const delta = prev === null || !Number.isFinite(prev) ? 0 : current - prev;
    const skipped =
      delta > 1 && prev !== null
        ? Array.from({ length: delta - 1 }, (_, k) => ({ year: prev + k + 1, t: (k + 1) / delta }))
        : [];
    return { event, gap: i === 0 ? 0 : gapFor(delta), skipped };
  });

  return (
    <div className="container mx-auto px-6">
      <AnimatedWrapper animation="fade-in">
        <div className="mx-auto max-w-5xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
            Depuis {first}
          </p>
          <h2 className="mt-3 font-headline text-4xl font-bold uppercase tracking-tight text-primary md:text-5xl">
            Notre Parcours
          </h2>
          <div className="mt-5 flex items-center gap-4">
            <span aria-hidden="true" className="h-px w-16 bg-accent" />
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {events.length} étapes — {first} à {last}
            </span>
          </div>
        </div>
      </AnimatedWrapper>

      <div className="relative mx-auto mt-14 max-w-5xl">
        {/* The scale. Absolutely positioned minor ticks sit on a continuous
            rule; rows are laid out normally beside it, so the ticks give the
            impression of measurement without the rows depending on it for
            their position. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-[7px] hidden w-px bg-accent/25 md:block"
        />
        <ol>
          {rows.map(({ event, gap, skipped }, i) => (
            <AnimatedWrapper animation="slide-up" key={`${event.year}-${i}`}>
              <li className="relative md:pl-16" style={gap ? { paddingTop: gap } : undefined}>
                {/* Years crossed without an event, drawn inside the gap they
                    created. On a one-year step there are none, which is the
                    point: the empty years are the only thing separating a dense
                    run from a long pause. */}
                {skipped.map(({ year, t }) => (
                  <span
                    key={year}
                    aria-hidden="true"
                    className="absolute left-[3px] hidden h-px w-[7px] bg-accent/30 md:block"
                    style={{ top: gap * t }}
                  />
                ))}
                {/* the node on the axis */}
                {/* `top` clears the gap above: the li's padding box starts at
                    the tick for the previous year, so the node has to be offset
                    by the whole gap to land beside its own card. */}
                <span
                  aria-hidden="true"
                  className={
                    event.milestone
                      ? 'absolute left-0 hidden h-[15px] w-[15px] -translate-x-[4px] rounded-full border-2 border-accent bg-accent md:block'
                      : 'absolute left-0 hidden h-[15px] w-[15px] -translate-x-[4px] rounded-full border-2 border-accent bg-secondary md:block'
                  }
                  style={{ top: gap + 10 }}
                />

                <article className="group relative overflow-hidden rounded-lg border border-border/60 bg-card p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg md:p-8">
                  {/* index, read as a drawing's page number rather than a counter */}
                  <span className="pointer-events-none absolute right-6 top-6 font-mono text-xs tracking-widest text-muted-foreground/50">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  <div className="flex items-baseline gap-4">
                    <span className="font-headline text-4xl font-bold tabular-nums text-accent md:text-5xl">
                      {event.year}
                    </span>
                    {event.milestone ? (
                      <span className="rounded-full border border-accent/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-accent">
                        Étape clé
                      </span>
                    ) : null}
                  </div>

                  <h3 className="mt-3 font-headline text-xl font-semibold text-primary md:text-2xl">
                    {event.title}
                  </h3>
                  <p className="mt-2 max-w-2xl leading-relaxed text-muted-foreground">
                    {event.description}
                  </p>
                </article>
              </li>
            </AnimatedWrapper>
          ))}
        </ol>
      </div>
    </div>
  );
}
