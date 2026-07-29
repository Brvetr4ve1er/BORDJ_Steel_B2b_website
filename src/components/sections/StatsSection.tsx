import { AnimatedNumber } from '@/components/animated-number';
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

  return (
    <section className="w-full bg-slate-900 py-24">
      <div className="container mx-auto px-4">
        <h2 className="sr-only">Chiffres Clés</h2>
        <div className="grid grid-cols-2 gap-8 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <AnimatedWrapper key={stat.label} animation="fade-in-stagger" staggerIndex={index + 1}>
              <div className="text-center">
                <div className="h-1 w-12 bg-accent mx-auto mb-4" />
                <p className="text-accent text-5xl md:text-6xl font-bold font-headline">
                  {stat.prefix}
                  <AnimatedNumber value={stat.value} />
                  {stat.suffix}
                </p>
                <p className="mt-3 text-white/70 text-sm uppercase tracking-widest">{stat.label}</p>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
