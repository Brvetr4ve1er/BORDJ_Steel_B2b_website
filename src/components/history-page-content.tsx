
"use client";

import Image from 'next/image';
import { Building, Milestone, Zap } from 'lucide-react';
import { companyData } from '@/config/company-data';
import { AnimatedWrapper } from './animated-wrapper';
import images from '@/app/lib/placeholder-images.json';

const timelineData = [
  {
    year: '2015',
    title: 'Création de Bordj Steel',
    description: 'Fondation de l\'entreprise avec la mission de fournir des solutions en acier de haute qualité pour l\'industrie moderne.',
    icon: <Milestone />,
  },
  {
    year: '2017',
    title: 'Lancement de l\'Unité Charpente',
    description: 'Démarrage de la production de charpentes métalliques, devenant rapidement un pilier de notre offre.',
    icon: <Building />,
  },
  {
    year: '2019',
    title: 'Expansion & Diversification',
    description: 'Inauguration des unités de panneaux sandwichs et de galvanisation à chaud, élargissant notre gamme de produits.',
    icon: <Zap />,
  },
  {
    year: '2021',
    title: 'Reconnaissance Nationale',
    description: 'Bordj Steel devient un acteur respecté et fiable, accompagnant des projets majeurs à travers l\'Algérie.',
    icon: <Building />,
  },
  {
    year: 'Aujourd\'hui',
    title: 'Leader de l\'Industrie',
    description: 'Nous continuons d\'innover et de fournir des solutions durables pour les usines, projets agricoles et promoteurs industriels.',
    icon: <Milestone />,
  },
];

export function HistoryPageContent() {
  const { about } = companyData.pages;
  const heroImage = images.homepage.hero;

  return (
    <div className="bg-background text-foreground">
      <section className="relative h-[60vh] w-full flex items-center justify-center text-white overflow-hidden">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          className="z-0 object-cover"
          priority
          data-ai-hint={heroImage.aiHint}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <AnimatedWrapper animation="zoom-in">
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white">
              Notre Histoire
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
              Forger l'avenir de la construction métallique en Algérie, un projet à la fois.
            </p>
          </AnimatedWrapper>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
           <AnimatedWrapper animation="fade-in">
             <h2 className="font-headline text-5xl font-bold text-center text-primary mb-12">
                BORDJ <span className="text-accent">STEEL</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-20">
              Bordj Steel {about.content.history}
            </p>
          </AnimatedWrapper>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-border rounded-full" />

            {timelineData.map((item, index) => (
              <AnimatedWrapper key={index} animation="slide-up">
                <div className="mb-12 flex justify-center items-center">
                  <div className="w-1/2 flex justify-end pr-8">
                    {index % 2 === 0 && (
                      <div className="max-w-sm text-right">
                        <h3 className="font-headline text-2xl font-bold text-primary">{item.title}</h3>
                        <p className="mt-2 text-muted-foreground">{item.description}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                     <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center z-10 relative border-4 border-background">
                       {item.icon}
                    </div>
                     <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-accent/20 animate-ping" style={{animationDuration: '3s'}}/>
                  </div>

                  <div className="w-1/2 flex justify-start pl-8">
                    {index % 2 !== 0 && (
                      <div className="max-w-sm text-left">
                        <h3 className="font-headline text-2xl font-bold text-primary">{item.title}</h3>
                        <p className="mt-2 text-muted-foreground">{item.description}</p>
                      </div>
                    )}
                  </div>
                </div>
                 <div className="mb-12 flex justify-center items-center text-center">
                    <div className="w-full">
                        <p className="font-headline text-4xl font-bold text-accent">{item.year}</p>
                    </div>
                 </div>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

    