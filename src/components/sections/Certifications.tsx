
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { companyData } from '@/config/company-data';

export function Certifications() {
  const { certifications } = companyData.pages;

  return (
    <section id="approvals" className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-16">{certifications.title}</h2>
        </AnimatedWrapper>
        {/* No badge visuals here: `companyData.pages.certifications` carries no
            per-certification image, and three identical generic icons told the
            visitor nothing. The norm and its scope carry the section instead. */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {certifications.items.map((cert, index) => {
            const parts = cert.split(' - ');
            const iso = parts[0];
            const description = parts[1];

            return (
              <AnimatedWrapper key={cert} animation="fade-in-stagger" staggerIndex={index}>
                <div className="h-full rounded-lg border-l-4 border-accent bg-background p-8 shadow-md">
                  <h3 className="font-headline text-2xl font-bold tracking-tight text-accent">{iso}</h3>
                  {description && (
                    <p className="mt-3 text-lg leading-relaxed text-primary">{description}</p>
                  )}
                </div>
              </AnimatedWrapper>
            )
          })}
        </div>
      </div>
    </section>
  );
}
