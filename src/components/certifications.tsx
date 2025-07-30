
import { AnimatedWrapper } from './animated-wrapper';
import { CheckCircle } from 'lucide-react';
import { companyData } from '@/config/company-data';

export function Certifications() {
  const { certifications } = companyData.pages;

  return (
    <section id="approvals" className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{certifications.title}</h2>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 max-w-4xl mx-auto">
          {certifications.items.map((cert, index) => (
            <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-headline font-semibold text-primary">{cert}</h3>
                </div>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
