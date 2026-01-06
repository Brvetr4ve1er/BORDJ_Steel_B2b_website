
"use client";

import { AnimatedWrapper } from '@/components/animated-wrapper';
import { Award } from 'lucide-react';
import { companyData } from '@/config/company-data';

export function Certifications() {
  const { certifications } = companyData.pages;

  return (
    <section id="approvals" className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-16">{certifications.title}</h2>
        </AnimatedWrapper>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-20">
          {certifications.items.map((cert, index) => {
            const parts = cert.split(' - ');
            const iso = parts[0];
            const description = parts[1];

            return (
              <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                <div className="flex flex-col items-center text-center gap-4 group">
                  <div className="relative w-40 h-40 rounded-full bg-white shadow-lg flex items-center justify-center transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-2xl border-4 border-accent/20">
                     <Award className="h-20 w-20 text-accent transition-colors duration-300 group-hover:text-accent/80" />
                  </div>
                  <h3 className="font-headline font-semibold text-primary max-w-xs">
                    <span className="text-accent font-bold text-2xl">{iso}</span>
                    <br />
                    {description}
                  </h3>
                </div>
              </AnimatedWrapper>
            )
          })}
        </div>
      </div>
    </section>
  );
}

    