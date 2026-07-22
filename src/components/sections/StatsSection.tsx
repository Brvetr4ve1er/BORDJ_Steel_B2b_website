import { AnimatedNumber } from '@/components/animated-number';
import { AnimatedWrapper } from '@/components/animated-wrapper';

type Stat = {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
};

// Figures sourced from company-data / charpente-metallique-data so the
// homepage never contradicts the product pages: fondation 2012,
// completedProjects 300, capacité charpente 25 000 T/an, capacité PRS 3 000 T/an.
const FOUNDING_YEAR = 2012;

const STATS: Stat[] = [
  { value: new Date().getFullYear() - FOUNDING_YEAR, prefix: '+', suffix: ' ans', label: "D'expérience depuis 2012" },
  { value: 300, prefix: '+', suffix: '', label: 'Projets réalisés' },
  { value: 25000, prefix: '', suffix: ' T/an', label: 'Capacité charpente métallique' },
  { value: 3000, prefix: '', suffix: ' T/an', label: 'Capacité profilés PRS' },
];

export function StatsSection() {
  return (
    <section className="w-full bg-slate-900 py-24">
      <div className="container mx-auto px-4">
        <h2 className="sr-only">Chiffres Clés</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, index) => (
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
