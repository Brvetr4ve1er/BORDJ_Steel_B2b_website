
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
              <Card className="overflow-hidden shadow-xl transition-shadow hover:shadow-2xl group relative h-80">
                <Image
                  src={facility.image.src}
                  alt={facility.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={facility.image.aiHint}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-headline text-2xl font-bold mb-2">{facility.title}</h3>
                  <p className="text-sm mb-4">{facility.description}</p>
                  <Button variant="destructive" className="mt-auto self-start group bg-accent hover:bg-accent/90 transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-4">
                    Lire la suite
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
