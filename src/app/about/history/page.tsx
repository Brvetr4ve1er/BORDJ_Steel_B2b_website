
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { Timeline, type TimelineEntry } from '@/components/timeline';
import { ProductPageLayout } from '@/components/product-page-layout';
import Image from 'next/image';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { Building, Milestone, Zap } from 'lucide-react';
import React from 'react';

export const metadata: Metadata = {
  title: `Notre Histoire | ${companyData.siteMetadata.title}`,
  description: 'Découvrez l\'histoire et l\'évolution de Bordj Steel, un leader de la construction métallique en Algérie.',
};

const timelineSourceData = [
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

const timelineEntries: TimelineEntry[] = timelineSourceData.map(item => ({
    title: item.year,
    content: (
        <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-accent text-accent-foreground flex items-center justify-center z-10 relative border-4 border-background">
                    {item.icon}
                </div>
                <h4 className="font-headline text-2xl font-bold text-primary">{item.title}</h4>
            </div>
            <p className="text-muted-foreground">{item.description}</p>
        </div>
    )
}));


export default function HistoryPage() {
  const heroImage = {
      src: "https://i.pinimg.com/736x/d5/03/28/d503286d2b91eaf2a17fe813878d9568.jpg",
      alt: "Steel factory background",
      aiHint: "welding steel"
  }
  
  return (
    <ProductPageLayout>
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
      <Timeline data={timelineEntries} />
    </ProductPageLayout>
  );
}
