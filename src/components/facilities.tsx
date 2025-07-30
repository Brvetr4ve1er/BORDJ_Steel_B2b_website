
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

export function Facilities() {
  const { units } = companyData.pages;

  return (
    <section id="services" className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{units.title}</h2>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {units.items.map((facility, index) => (
            <AnimatedWrapper key={index} animation="slide-up">
              <Card className="overflow-hidden shadow-xl transition-shadow hover:shadow-2xl h-full flex flex-col">
                <CardContent className="p-0 flex flex-col flex-grow">
                  <div className="relative">
                    <Image
                      src={facility.image.src}
                      alt={facility.title}
                      width={600}
                      height={400}
                      className="w-full h-56 object-cover"
                      data-ai-hint={facility.image.aiHint}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-headline text-2xl font-bold text-primary mb-4">{facility.title}</h3>
                    <p className="text-base mb-6 flex-grow">{facility.description}</p>
                    <Button variant="destructive" className="mt-auto self-start group bg-accent hover:bg-accent/90">
                      Lire la suite
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
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
