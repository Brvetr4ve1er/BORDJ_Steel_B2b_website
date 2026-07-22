import { AnimatedNumber } from '@/components/animated-number';
import { AnimatedWrapper } from '@/components/animated-wrapper';

type Stat = {
  value: number;
  prefix: string;
  suffix: string;
  label: string;
};

const STATS: Stat[] = [
  { value: 25, prefix: '+', suffix: ' ans', label: "D'expérience dans l'industrie" },
  { value: 500, prefix: '+', suffix: '', label: 'Projets réalisés' },
  { value: 20000, prefix: '+', suffix: ' T', label: 'Capacité annuelle en acier' },
  { value: 16, prefix: '+', suffix: '', label: 'Wilayas couvertes' },
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
