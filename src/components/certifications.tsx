import { AnimatedWrapper } from './animated-wrapper';
import { CheckCircle } from 'lucide-react';

const certificationsList = [
  "ISO 9001:2015 Quality Management System",
  "ISO 14001:2015 Environmental Management",
  "ISO 45001:2018 Occupational Health & Safety",
  "AISC Certified Fabricator (American Institute of Steel Construction)",
  "EN 1090-1/2 CE Marking for Structural Steel",
  "AWS D1.1 Certified Welding (American Welding Society)",
  "Major Oil & Gas Company Approvals",
  "National Board 'R' Stamp for Repair and Alteration",
  "SSPC Painting Contractor Certification (PCC)",
  "LEED Certification Support for Green Building"
];

export function Certifications() {
  return (
    <section id="approvals" className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">Approvals & Certifications</h2>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {certificationsList.map((cert, index) => (
            <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-headline font-semibold text-primary">{cert}</h3>
                  <p className="text-sm text-muted-foreground">Fully Compliant and Certified</p>
                </div>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
