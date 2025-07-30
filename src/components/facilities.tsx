import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';

export function Facilities() {
  const { services } = companyData;

  return (
    <section id="services" className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{services.title}</h2>
        </AnimatedWrapper>
        <div className="space-y-12">
          {services.items.map((facility, index) => (
            <AnimatedWrapper key={index} animation="slide-up">
              <Card className="overflow-hidden shadow-xl transition-shadow hover:shadow-2xl">
                <CardContent className="p-0">
                  <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className="md:w-1/2">
                      <Image
                        src={facility.image.src}
                        alt={facility.title}
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                        data-ai-hint={facility.image.aiHint}
                      />
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center">
                      <h3 className="font-headline text-2xl font-bold text-primary mb-4">{facility.title}</h3>
                      <p className="text-lg">{facility.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
