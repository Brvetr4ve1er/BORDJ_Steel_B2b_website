import { HeroCountUp } from '@/components/sections/hero/HeroCountUp';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { companyData } from '@/config/company-data';
import { charpenteMetalliqueData } from '@/config/charpente-metallique-data';

type Stat = {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
};

// Every figure below is *read* from config so the homepage cannot contradict the
// product pages. (The previous version only claimed this in a comment while
// hardcoding the literals, so editing config changed nothing here.)
//
// The homepage also states each figure exactly once: the hero band owns the three
// headline production capacities (charpente / panneaux sandwich / galvanisation)
// and VisionMission owns the "300+ Projets Réalisés" overlay. This section
// therefore carries only the figures that appear nowhere else on the page.

// Founding year = earliest entry of the company timeline. Derived from the values
// rather than read at a fixed array index, so reordering the timeline in config
// cannot silently change the number rendered here.
const FOUNDING_YEAR = Math.min(
  ...companyData.pages.about.timelineEvents
    .map((event) => Number(event.year))
    .filter((year) => Number.isFinite(year))
);

const prsCapacity = charpenteMetalliqueData.hero.stats.find(
  (stat) => stat.title === 'Capacité de PRS'
);

export function StatsSection() {
  // Evaluated at build time: the homepage is statically prerendered, so this
  // counter only refreshes on redeploy. Accepted deliberately — opting the whole
  // route into dynamic rendering for one once-a-year increment would cost far
  // more than the staleness it removes.
  const yearsOfExperience = new Date().getFullYear() - FOUNDING_YEAR;

  const stats: Stat[] = [
    {
      value: yearsOfExperience,
      prefix: '+',
      suffix: ' ans',
      label: `D'expérience depuis ${FOUNDING_YEAR}`,
    },
    ...(prsCapacity
      ? [
          {
            value: prsCapacity.value,
            prefix: '',
            suffix: prsCapacity.unit,
            label: 'Capacité profilés PRS',
          },
        ]
      : []),
  ];

  // Nothing to show if config yields no figures — render nothing rather than an
  // empty band.
  if (stats.length === 0) return null;

  return (
    // `bg-primary` is the brand's dark grey token. (This band previously used a
    // hardcoded `bg-slate-900`, the only navy in the codebase — it read as a
    // foreign block between two light sections.)
    <section className="w-full bg-primary py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white/70">
          Chiffres clés
        </h2>
        {/* Flex + dividers rather than a fixed column count, so the band stays
            balanced whether config yields one figure or four. The dividers carry
            the brand red — see the figures below. */}
        <ul className="mx-auto flex max-w-4xl flex-col items-stretch justify-center divide-y divide-accent sm:flex-row sm:divide-x sm:divide-y-0">
          {stats.map((stat, index) => (
            <li key={stat.label} className="flex-1 px-6 py-6 sm:py-0">
              <AnimatedWrapper animation="fade-in-stagger" staggerIndex={index + 1}>
                <div className="text-center">
                  {/* Figures are WHITE and the accent lives on the RULE, exactly as
                      the homepage hero already ships it. Not a colour preference:
                      accent #C1272D on this `bg-primary` band (#4B4B4B) computes to
                      1.49:1, half of the 3:1 large-text floor, while white reaches
                      8.73:1. See `home-page-hero.tsx` (the `<dd>` cartouche). */}
                  <p className="font-headline text-5xl font-bold text-white md:text-6xl">
                    {stat.prefix}
                    <HeroCountUp value={stat.value}>
                      {new Intl.NumberFormat('fr-FR').format(stat.value)}
                    </HeroCountUp>
                    {stat.suffix}
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-widest text-white/70">
                    {stat.label}
                  </p>
                </div>
              </AnimatedWrapper>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
