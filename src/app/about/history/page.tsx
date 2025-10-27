
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { Timeline, type TimelineEntry } from '@/components/timeline';
import { ProductPageLayout } from '@/components/product-page-layout';
import Image from 'next/image';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { Building, Milestone, Zap, HardHat, Layers, Star, Award, Calendar } from 'lucide-react';
import React from 'react';

export const metadata: Metadata = {
  title: `Notre Histoire | ${companyData.siteMetadata.title}`,
  description: 'Découvrez l\'histoire et l\'évolution de Bordj Steel, un leader de la construction métallique en Algérie.',
};

const timelineSourceData = [
  {
    year: '2012',
    title: 'Création de Bordj Steel',
    description: 'Fondation de la SPA BORDJ STEEL dans le cadre de la stratégie de développement du groupe CONDOR pour consolider sa position de leader algérien.',
    icon: <Milestone className="w-12 h-12" />,
  },
  {
    year: '2013',
    title: 'Début de la Construction',
    description: 'En juin 2013, les travaux de construction de l\'unité de charpente métallique débutent, marquant le commencement de notre complexe industriel.',
    icon: <HardHat className="w-12 h-12" />,
  },
  {
    year: '2014',
    title: 'Démarrage de la Production',
    description: 'Juillet 2014 voit le démarrage de la production de l\'unité de charpente métallique, suivi en juin par le début des travaux de l\'unité de panneaux sandwichs.',
    icon: <Building className="w-12 h-12" />,
  },
  {
    year: '2015',
    title: 'Expansion des Capacités',
    description: 'Septembre 2015 est un mois charnière avec le démarrage de la production de l\'unité de panneaux sandwichs et le lancement des travaux de l\'unité de galvanisation à chaud.',
    icon: <Zap className="w-12 h-12" />,
  },
  {
    year: '2016',
    title: 'Inauguration et Finalisation',
    description: 'La production de l\'unité de galvanisation démarre en Octobre. En Décembre, le complexe est officiellement inauguré par le ministre de l’intérieur, M. BADOUI Nouredinne.',
    icon: <Star className="w-12 h-12" />,
  },
  {
    year: '2019',
    title: 'Certification Qualité',
    description: 'Obtention de la prestigieuse certification ISO 9001 Version 2015, une reconnaissance de notre engagement envers la qualité.',
    icon: <Award className="w-12 h-12" />,
  },
  {
    year: 'Aujourd\'hui',
    title: 'Leader Engagé',
    description: 'Nous continuons d\'innover et de fournir des solutions durables, guidés par notre système de Management Intégré QSE (ISO 9001, 14001 & 45001).',
    icon: <Milestone className="w-12 h-12" />,
  },
];

const timelineEntries: TimelineEntry[] = timelineSourceData.map(item => ({
    title: item.year,
    content: (
        <div key={item.year} className="p-6 rounded-lg border bg-card text-card-foreground shadow-sm h-full">
            <div className="flex items-center gap-4 mb-4">
                <div className="w-24 h-24 rounded-full bg-accent text-accent-foreground flex items-center justify-center z-10 relative border-4 border-background">
                    {item.icon}
                </div>
                <h4 className="font-headline text-2xl font-bold text-primary">{item.title}</h4>
            </div>
            <p className="text-muted-foreground text-lg">{item.description}</p>
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
