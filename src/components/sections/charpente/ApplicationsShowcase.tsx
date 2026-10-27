import { AnimatedWrapper } from '@/components/animated-wrapper';
import { charpenteApplications } from '@/config/charpente-metallique-data';
import { Building, Factory, Tractor, HardHat, type LucideIcon } from 'lucide-react';

// Enrichment band for the Charpente Métallique page.
// Renders the `charpenteApplications` config as a 4-tile grid of the sectors
// covered by our steel-frame work. Icon names are resolved locally so the
// config file stays free of runtime imports.
const iconMap: Record<string, LucideIcon> = {
  Building,
  Factory,
  Tractor,
  HardHat,
};

export function ApplicationsShowcase() {
  return (
    <section className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-4">
              Domaines d&apos;application
            </h2>
            <p className="text-lg text-muted-foreground">
              Notre expertise couvre l&apos;ensemble des secteurs qui exigent une ossature acier durable et parfaitement dimensionnée.
            </p>
          </div>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {charpenteApplications.map((app, index) => {
            const Icon = iconMap[app.iconName];
            return (
              <AnimatedWrapper
                key={app.text}
                animation="fade-in-stagger"
                staggerIndex={index}
                className="h-full"
              >
                <div className="group h-full bg-background border border-border rounded-xl p-6 flex flex-col items-center text-center transition-all duration-300 hover:border-accent hover:scale-[1.03] hover:shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-secondary text-accent flex items-center justify-center mb-5 transition-colors duration-300 group-hover:bg-accent group-hover:text-accent-foreground">
                    {Icon ? <Icon className="w-8 h-8" strokeWidth={1.75} aria-hidden="true" /> : null}
                  </div>
                  <h3 className="font-headline text-lg font-semibold text-primary leading-snug">
                    {app.text}
                  </h3>
                </div>
              </AnimatedWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
