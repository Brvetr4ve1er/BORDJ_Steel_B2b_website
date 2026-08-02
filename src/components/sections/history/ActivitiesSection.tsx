import * as React from 'react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { Card, CardContent } from '@/components/ui/card';
import {
  CharpenteIcon,
  GalvanisationIcon,
  SandwichPanelIcon,
  ChaudronnerieIcon,
} from '@/components/icons/product-icons';
import { WF } from '@/components/wireframes/wf-theme';

/**
 * "Notre domaine d'activité" — the four production families, rendered as
 * shop-drawing plates rather than generic cards.
 *
 * Each entry uses the bespoke product icon that actually depicts the product
 * (welded I-section, galvanising bath, sandwich panel cross-section, rolled
 * vessel) instead of a stand-in lucide glyph. Those icons animate from CSS they
 * embed themselves, keyed off the parent's Tailwind `group` class — which is why
 * every Card below carries `group`.
 *
 * Copy is client copy and is reproduced verbatim. Nothing here is derived from
 * anything but the list itself: the only numbers on screen are the positional
 * plate index (01 … 04) and the list length.
 *
 * Server component — no hooks, no event handlers. Motion is CSS-only, and every
 * animation collapses under `prefers-reduced-motion: reduce`.
 */

type ActivityIcon = React.ComponentType<{ className?: string; size?: number }>;

interface Activity {
  readonly Icon: ActivityIcon;
  readonly title: string;
  readonly description: string;
}

const activities: readonly Activity[] = [
  {
    Icon: CharpenteIcon,
    title: "Charpente métallique",
    description: "Conception, fabrication et montage de structures adaptées à tous types de projets industriels, agricoles et logistiques."
  },
  {
    Icon: GalvanisationIcon,
    title: "Galvanisation à chaud",
    description: "Traitement de protection anticorrosion garantissant la longévité et la résistance des structures."
  },
  {
    Icon: SandwichPanelIcon,
    title: "Panneaux sandwich",
    description: "Production et fourniture de panneaux isolants destinés aux bâtiments industriels, frigorifiques et tertiaires."
  },
  {
    Icon: ChaudronnerieIcon,
    title: "Chaudronnerie",
    description: "Conception et réalisation d'équipements métalliques spécifiques selon les besoins des clients."
  }
];

export function ActivitiesSection() {
  const total = activities.length;

  return (
    <section className="bg-background" aria-labelledby="activites-section-title">
      <div className="container mx-auto px-4">
        <style>{ACT_CSS}</style>

        <AnimatedWrapper animation="fade-in">
          <h2
            id="activites-section-title"
            className="font-headline text-4xl font-bold text-center text-primary mb-4"
          >
            Notre domaine d'activité
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
            Depuis sa création, BordjSteel s'est imposée comme un acteur majeur dans le domaine de la construction métallique en Algérie.
          </p>
          <DraftingRule />
        </AnimatedWrapper>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {activities.map((activity, index) => {
            const { Icon } = activity;

            return (
              <AnimatedWrapper
                key={activity.title}
                animation="fade-in-stagger"
                staggerIndex={index}
              >
                <Card className="group relative h-full overflow-hidden border-l-4 border-l-accent shadow-sm transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                  {/* Accent sweep along the top edge — fires once per hover. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-px overflow-hidden"
                  >
                    <span className="act-sweep block h-full w-1/3" />
                  </span>

                  {/* Registration marks — the plate's corner ticks. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t border-border transition-colors duration-300 group-hover:border-accent motion-reduce:transition-none"
                  />
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute bottom-2 right-2 h-3 w-3 border-b border-r border-border transition-colors duration-300 group-hover:border-accent motion-reduce:transition-none"
                  />

                  <CardContent className="flex items-start gap-5 p-6 sm:gap-6 md:p-8">
                    <div className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-secondary transition-colors duration-300 group-hover:border-accent/50 motion-reduce:transition-none">
                      <PlateGrid />
                      <Icon size={44} className="relative z-10" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-4">
                        <h3 className="text-2xl font-bold text-primary">{activity.title}</h3>
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
                        className="mt-3 block h-px w-16 overflow-hidden bg-border"
                      >
                        <span className="block h-full w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:scale-x-100 motion-reduce:transition-none" />
                      </span>

                      <p className="mt-4 text-muted-foreground">{activity.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/**
 * Faint graph-paper backing for the icon plate, so each bespoke figure reads as
 * a detail lifted off a drawing sheet. Lines are inset from the edges so they
 * never collide with the plate's rounded corners.
 */
function PlateGrid() {
  return (
    <svg
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40 transition-opacity duration-300 group-hover:opacity-70 motion-reduce:transition-none"
    >
      <g stroke={WF.dim} strokeWidth={0.6} strokeDasharray="2 4" fill="none">
        <path d="M 6 20 L 74 20 M 6 40 L 74 40 M 6 60 L 74 60" />
        <path d="M 20 6 L 20 74 M 40 6 L 40 74 M 60 6 L 60 74" />
      </g>
    </svg>
  );
}

/**
 * Centred drafting rule under the section intro: a dashed dimension line with
 * end ticks and an accent centre mark, plus a slow accent traveller that runs
 * the length of the line. The traveller is removed entirely under reduced
 * motion, leaving the rule pinned and static.
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
      <circle className="act-trace" cx={0} cy={8} r={2.5} fill={WF.accent} />
    </svg>
  );
}

/* ---------- scoped animation stylesheet ----------
 * Only the keyframed pieces live here; everything else is expressed with
 * Tailwind's `group-hover:` / `motion-reduce:` variants above. Class names are
 * prefixed `act-` so nothing leaks into other sections. */
const ACT_CSS = `
.act-sweep {
  background-image: linear-gradient(90deg, transparent, ${WF.accent}, transparent);
  transform: translateX(-110%);
  opacity: 0;
}
.group:hover .act-sweep {
  animation: act-sweep 900ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
.act-trace {
  opacity: 0;
  animation: act-trace 12s linear infinite;
}
@keyframes act-sweep {
  0%   { transform: translateX(-110%); opacity: 0; }
  15%  { opacity: 1; }
  85%  { opacity: 1; }
  100% { transform: translateX(310%); opacity: 0; }
}
@keyframes act-trace {
  0%   { transform: translateX(10px); opacity: 0; }
  8%   { opacity: 0.85; }
  92%  { opacity: 0.85; }
  100% { transform: translateX(230px); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .act-sweep {
    display: none;
    animation: none;
  }
  .group:hover .act-sweep {
    animation: none;
  }
  .act-trace {
    display: none;
    animation: none;
    opacity: 0;
  }
}
`;
