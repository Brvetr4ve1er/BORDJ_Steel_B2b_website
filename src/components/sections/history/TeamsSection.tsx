import Image from 'next/image';
import {
  Users,
  TrendingUp,
  Factory,
  ClipboardCheck,
  HardHat,
  UserCheck,
  DollarSign,
  Network,
  Wrench,
  type LucideIcon,
} from 'lucide-react';

import { AnimatedWrapper } from '@/components/animated-wrapper';
import { WF } from '@/components/wireframes/wf-theme';
import { teamsSection, type TeamIconKey } from '@/config/teams-data';

/**
 * "Nos équipes spécialisées" — the nine teams, rendered as shop-drawing plates
 * rather than generic cards.
 *
 * Rendered on /about/history. Copy, ordering, team ids and photography live in `teamsSection`
 * (src/config/teams-data.ts), per the repo rule that user-facing text never sits
 * inline in JSX. This file owns only the presentation and the icon binding.
 *
 * Nothing on screen is derived from anything but the list itself: the only
 * numbers are the positional plate index (01 … 09) and the list length.
 *
 * Server component — no hooks, no event handlers. Motion is expressed purely
 * with Tailwind's `group-hover:` transitions, each paired with a
 * `motion-reduce:` variant that pins the final state.
 */

/**
 * Total over `TeamIconKey`, so this map is the thing that keeps config and
 * artwork in step: add a team in config without adding its icon here and the
 * build fails, rather than shipping a card with an empty icon plate. Same
 * bindings as before the copy moved out of JSX.
 */
const TEAM_ICONS: Record<TeamIconKey, LucideIcon> = {
  engineering: TrendingUp,
  production: Factory,
  quality: ClipboardCheck,
  hse: HardHat,
  commercial: UserCheck,
  finance: DollarSign,
  hr: Users,
  it: Network,
  assembly: Wrench,
};

export function TeamsSection() {
  const { title, items } = teamsSection;
  const total = items.length;

  return (
    <section className="bg-background" aria-labelledby="teams-section-title">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2
            id="teams-section-title"
            className="font-headline text-4xl font-bold text-center text-primary mb-4"
          >
            {title}
          </h2>
          <DraftingRule />
        </AnimatedWrapper>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          {items.map((team, index) => {
            const Icon = TEAM_ICONS[team.id];

            return (
              <AnimatedWrapper
                key={team.id}
                animation="fade-in-stagger"
                staggerIndex={index}
              >
                <article className="group relative flex h-full overflow-hidden rounded-lg border border-border bg-card shadow-md transition duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {/* Binding edge — the plate's accent rail, deepened on hover. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 left-0 z-20 w-1 bg-accent/70 transition-colors duration-300 group-hover:bg-accent motion-reduce:transition-none"
                  />

                  {/* Registration marks — the plate's corner ticks. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2 top-2 z-20 h-3 w-3 border-r border-t border-border transition-colors duration-300 group-hover:border-accent motion-reduce:transition-none"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-2 right-2 z-20 h-3 w-3 border-b border-r border-border transition-colors duration-300 group-hover:border-accent motion-reduce:transition-none"
                  />

                  <div className="relative aspect-square w-[35%] flex-shrink-0 border-r border-border">
                    <Image
                      src={team.image}
                      alt={team.title}
                      fill
                      sizes="(max-width: 768px) 35vw, 18vw"
                      className="object-cover transition-transform duration-300 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                  </div>

                  <div className="flex w-[65%] flex-col justify-center p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-secondary transition-colors duration-300 group-hover:border-accent/50 motion-reduce:transition-none">
                        <PlateGrid />
                        <Icon className="relative z-10 w-8 h-8 text-accent" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 className="text-xl font-bold text-primary">{team.title}</h3>
                          <span
                            aria-hidden="true"
                            className="shrink-0 text-[0.65rem] font-semibold tracking-[0.2em] text-muted-foreground"
                          >
                            {String(index + 1).padStart(2, '0')}
                            <span className="text-muted-foreground/60">
                              {' / '}
                              {String(total).padStart(2, '0')}
                            </span>
                          </span>
                        </div>

                        {/* Leader rule — draws out in the accent on hover. */}
                        <span
                          aria-hidden="true"
                          className="mt-2 block h-px w-16 overflow-hidden bg-border"
                        >
                          <span className="block h-full w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out group-hover:scale-x-100 motion-reduce:scale-x-100 motion-reduce:transition-none" />
                        </span>
                      </div>
                    </div>

                    <p className="mt-4 text-muted-foreground">{team.description}</p>
                  </div>
                </article>
              </AnimatedWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Faint graph-paper backing for the icon plate, so each glyph reads as a detail
 * lifted off a drawing sheet. Lines are inset from the edges so they never
 * collide with the plate's rounded corners.
 */
function PlateGrid() {
  return (
    <svg
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40 transition-opacity duration-300 group-hover:opacity-70 motion-reduce:transition-none"
    >
      <g stroke={WF.dim} strokeWidth={0.6} strokeDasharray="2 4" fill="none">
        <path d="M 5 16 L 59 16 M 5 32 L 59 32 M 5 48 L 59 48" />
        <path d="M 16 5 L 16 59 M 32 5 L 32 59 M 48 5 L 48 59" />
      </g>
    </svg>
  );
}

/**
 * Centred drafting rule under the section heading: a dashed dimension line with
 * end ticks and an accent centre mark. Static by design — it is a rule, not an
 * animation, so there is nothing for reduced motion to switch off.
 */
function DraftingRule() {
  return (
    <svg
      viewBox="0 0 240 16"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className="mx-auto block h-4 w-60 max-w-full"
    >
      <path
        d="M 10 8 L 230 8"
        stroke={WF.dim}
        strokeWidth={1}
        strokeDasharray="6 5"
        fill="none"
      />
      <path
        d="M 10 3 L 10 13 M 230 3 L 230 13"
        stroke={WF.dim}
        strokeWidth={1.25}
        strokeLinecap="round"
        fill="none"
      />
      <rect x={116} y={5} width={8} height={6} fill={WF.accent} opacity={0.85} />
    </svg>
  );
}
