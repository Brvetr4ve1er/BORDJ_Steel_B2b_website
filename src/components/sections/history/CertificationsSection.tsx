

import { AnimatedWrapper } from '@/components/animated-wrapper';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Award } from 'lucide-react';
import Image from 'next/image';
import { certifications, type Certification } from '@/config/company-data';

/**
 * "Nos certifications et engagements" — the certificate scans on
 * /about/history. The certificates themselves live in `certifications`
 * (src/config/company-data.ts), shared with the homepage seal band and the
 * Media Center's ISO tab, so no two pages can claim different scopes.
 */
function CertificationCard({ cert }: { cert: Certification }) {
  return (
    <Card className="group overflow-hidden text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <CardHeader className="p-0">
        <div className="bg-secondary p-4">
          <h3 className="text-xl font-bold text-primary">{cert.code}</h3>
          <p className="text-muted-foreground">{cert.scope}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4 bg-background">
        <div className="aspect-[3/4] relative rounded-md overflow-hidden border-4 border-secondary shadow-inner">
          <Image
            src={cert.image}
            alt={`Certification ${cert.code}`}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function CertificationsSection() {
  return (
    <section className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in" className="text-center mb-16">
          <Award className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h2 className="text-4xl font-bold text-primary mb-4">Nos certifications et engagements</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Forte de son expérience et de son savoir-faire, BordjSteel s'engage à respecter les plus hauts standards de qualité et de sécurité.
          </p>
        </AnimatedWrapper>
        <div className="grid md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <AnimatedWrapper key={cert.id} animation="fade-in-stagger" staggerIndex={index}>
              <CertificationCard cert={cert} />
            </AnimatedWrapper>
          ))}
        </div>
        <AnimatedWrapper animation="fade-in" className="mt-16 text-center">
          <p className="text-muted-foreground italic">
            La société détient plusieurs certifications reconnues, témoignant de son sérieux et de sa conformité aux exigences internationales.
          </p>
        </AnimatedWrapper>
      </div>
    </section>
  );
}

    