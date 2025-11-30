
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Button } from './ui/button';
import { ArrowRight, Package, Users, Square, Factory, Flame, Bolt, Droplets, Beaker, Construction, Leaf, Filter } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { chaudronnerieData } from '@/config/chaudronnerie-data';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { DownloadButton } from './ui/download-button';
import dynamic from 'next/dynamic';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"
import { cn } from '@/lib/utils';
import type { CardData } from './ui/expandable-cards';

const DetailedStatCard = dynamic(() => import('./detailed-stat-card').then(mod => mod.DetailedStatCard));

const activityCards = [
    { title: 'Hydrocarbures', icon: <Flame className="h-10 w-10" /> },
    { title: 'Énergie et Mines', icon: <Bolt className="h-10 w-10" /> },
    { title: 'Hydraulique', icon: <Droplets className="h-10 w-10" /> },
    { title: 'Pharmaceutique', icon: <Beaker className="h-10 w-10" /> },
    { title: 'Travaux Publics', icon: <Construction className="h-10 w-10" /> },
    { title: 'Environnement', icon: <Leaf className="h-10 w-10" /> },
    { title: 'Traitement des Eaux', icon: <Filter className="h-10 w-10" /> }
];

const ActivityCard = ({ title, icon }: { title: string; icon: React.ReactNode }) => (
    <Card className={cn(
        "group relative flex aspect-square flex-col items-center justify-center p-4 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl bg-secondary/50"
    )}>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
            {icon}
        </div>
        <h3 className="mt-4 text-sm font-bold text-primary">{title}</h3>
    </Card>
);

const ActivitiesSection = () => {
    return (
        <section className="bg-secondary py-16">
            <div className="container mx-auto px-4">
                <AnimatedWrapper animation="fade-in">
                    <h2 className="text-4xl font-bold text-primary text-center mb-4">Nos Domaines d’Activités</h2>
                    <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
                        Notre expertise en chaudronnerie s'étend à de multiples secteurs industriels, où nous fournissons des solutions sur mesure, fiables et performantes.
                    </p>
                </AnimatedWrapper>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                    {activityCards.map((card, index) => (
                        <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                            <ActivityCard title={card.title} icon={card.icon} />
                        </AnimatedWrapper>
                    ))}
                </div>
            </div>
        </section>
    );
};


const GeometricTechnicalTable = ({ api, setCurrent, current }: { api: CarouselApi, setCurrent: (index: number) => void, current: number }) => {
  const tableData = [
    { capacite: 3, format: "1 250", epaisseur: 4, longVirole: "2 200.00", longTotale: "2 730.00", poidsUnite: "468,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
    { capacite: 5, format: "1 250", epaisseur: 5, longVirole: "3 850.00", longTotale: "4 290.00", poidsUnite: "469,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
    { capacite: 10, format: "1 900", epaisseur: 6, longVirole: "3 200.00", longTotale: "4 010.00", poidsUnite: "1 387,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
    { capacite: 15, format: "1 900", epaisseur: 6, longVirole: "5 000.00", longTotale: "5 810.00", poidsUnite: "1 908,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
    { capacite: 20, format: "2 500", epaisseur: 6, longVirole: "4 692.00", longTotale: "5 810.00", poidsUnite: "2 102,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
    { capacite: 30, format: "2 500", epaisseur: 6, longVirole: "5 700.00", longTotale: "6 742.00", poidsUnite: "2 909,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
    { capacite: 40, format: "3 000", epaisseur: 6, longVirole: "5 130.00", longTotale: "6 193.00", poidsUnite: "3 363,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
    { capacite: 50, format: "3 000", epaisseur: 6, longVirole: "6 560.00", longTotale: "7 626.00", poidsUnite: "4 133,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
    { capacite: 60, format: "3 000", epaisseur: 6, longVirole: "8 000.00", longTotale: "9 066.00", poidsUnite: "4 803,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
    { capacite: 100, format: "3 000", epaisseur: 6, longVirole: "13 600.00", longTotale: "14 886.00", poidsUnite: "7 611,00", nbreTrous: "1", pressionEpreuve: "3 Bars" }
  ];

  return (
    <div className="bg-background">
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-accent/10">
                <th className="border border-border px-3 py-3 text-center text-xs font-bold text-accent">
                  CAPACITÉ
                </th>
                <th className="border border-border px-3 py-3 text-center text-xs font-bold text-accent">
                  FORMAT
                </th>
                <th className="border border-border px-3 py-3 text-center text-xs font-bold text-accent">
                  ÉPAISSEUR
                </th>
                <th className="border border-border px-3 py-3 text-center text-xs font-bold text-accent">
                  LONGUEUR<br/>VIROLE
                </th>
                <th className="border border-border px-3 py-3 text-center text-xs font-bold text-accent">
                  LONGUEUR<br/>TOTALE
                </th>
                <th className="border border-border px-3 py-3 text-center text-xs font-bold text-accent">
                  Poids en<br/>unité
                </th>
                <th className="border border-border px-3 py-3 text-center text-xs font-bold text-accent">
                  NBRE<br/>trous D'homme
                </th>
                <th className="border border-border px-3 py-3 text-center text-xs font-bold text-accent">
                  pression<br/>de service
                </th>
                <th className="border border-border px-3 py-3 text-center text-xs font-bold text-accent">
                  pression<br/>d'épreuve
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr 
                  key={index} 
                  className={cn("transition-colors", index % 2 === 0 ? 'bg-white' : 'bg-muted/50', current === index + 1 ? 'bg-accent/20' : '')}
                  onMouseEnter={() => {
                    if (api) {
                        setCurrent(index + 1);
                        api.scrollTo(index);
                    }
                  }}
                >
                  <td className="border border-border px-3 py-3 text-center text-sm font-semibold text-foreground">
                    {row.capacite}
                  </td>
                  <td className="border border-border px-3 py-3 text-center text-sm text-muted-foreground">
                    {row.format}
                  </td>
                  <td className="border border-border px-3 py-3 text-center text-sm text-muted-foreground">
                    {row.epaisseur}
                  </td>
                  <td className="border border-border px-3 py-3 text-center text-sm text-muted-foreground">
                    {row.longVirole}
                  </td>
                  <td className="border border-border px-3 py-3 text-center text-sm text-muted-foreground">
                    {row.longTotale}
                  </td>
                  <td className="border border-border px-3 py-3 text-center text-sm text-muted-foreground">
                    {row.poidsUnite}
                  </td>
                  <td className="border border-border px-3 py-3 text-center text-sm text-muted-foreground">
                    {row.nbreTrous}
                  </td>
                  {index === 0 && (
                    <td rowSpan={tableData.length} className="border border-border bg-white relative" style={{ width: '50px' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="transform -rotate-90 whitespace-nowrap text-xs font-bold text-foreground tracking-wider">
                          ATMOSPHERIQUE
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="border border-border px-3 py-3 text-center text-sm text-muted-foreground">
                    {row.pressionEpreuve}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  );
};

const TechnicalSpecsSection = () => {
   return (
     <div className="p-8 bg-background">
       <div className="max-w-6xl mx-auto">
         <div className="grid md:grid-cols-2 gap-6">
           {/* Left Column - Assembly and Welding Process */}
           <div className="bg-background">
             <h2 className="text-accent font-bold text-sm mb-4 uppercase tracking-wide">
               PROCÉDÉ D'ASSEMBLAGE ET SOUDAGE
             </h2>
             <div className="space-y-2 text-xs leading-relaxed">
               <p className="text-foreground">
                 <span className="font-bold">ROBÉ ET FOND:</span> PAR RECOUVREMENT EN V
               </p>
               <p className="text-foreground">
                 <span className="font-bold">TUBULURE, BRIDE, ANNEAU DE LEVAGE:</span> EN V RENFORCÉ
               </p>
               <p className="text-foreground">
                 <span className="font-bold">SOUDURES :</span> CONFORMES AUX NORMES API 650 STD
               </p>
               <p className="text-foreground">
                 <span className="font-bold">TOLÉRANCE DE FABRICATION:</span> + 0,1%
               </p>
               <p className="text-foreground">
                 <span className="font-bold">ÉPREUVE HYDRAULIQUE:</span> TEST D'ÉTANCHÉITÉ
               </p>
               <p className="text-foreground">
                 <span className="font-bold">TRAITEMENT DE SURFACE:</span> SABLAGE EXTÉRIEUR + PEINTURE (SELON PRODUIT STOCKÉ)
               </p>
             </div>
           </div>
           {/* Right Column - Materials */}
           <div className="bg-background">
             <h2 className="text-accent font-bold text-sm mb-4 uppercase tracking-wide">
               MATÉRIAUX
             </h2>
             <div className="space-y-2 text-xs leading-relaxed">
               <p className="text-foreground">
                 <span className="font-bold">TÔLE:</span> S 275JR / E28
               </p>
               <p className="text-foreground">
                 <span className="font-bold">PROFILÉ:</span> IDEM
               </p>
               <p className="text-foreground">
                 <span className="font-bold">JOINT :</span> KLINGERIT EP: 3mm
               </p>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
};

export function ChaudronneriePageContent() {
  const { hero } = chaudronnerieData;
  const heroStats = hero.stats;
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  const drawingImages = [
    "https://i.pinimg.com/736x/05/76/f1/0576f18a52e3a3bb870dfe46089eae54.jpg",
    "https://i.pinimg.com/736x/51/a9/e3/51a9e370aa2ddbb7439c177612e9a1d2.jpg",
    "https://i.pinimg.com/736x/57/a7/2b/57a72be37dbd74bf3de07deacdf9aa1f.jpg",
    "https://i.pinimg.com/736x/6e/10/d6/6e10d64b38329f46cd84e03b5256f2f3.jpg",
    "https://i.pinimg.com/736x/2a/df/0b/2adf0bc95fdf6b023316e8b398fc7cf9.jpg",
    "https://i.pinimg.com/736x/15/4d/42/154d42e3d73c5e6fdac5e49213e0b2bb.jpg",
    "https://i.pinimg.com/736x/11/67/cd/1167cd7b335b19a5d1695a0993b20d31.jpg",
    "https://i.pinimg.com/736x/22/2e/41/222e41debeda041c6485c8d2ee91f2d5.jpg",
    "https://i.pinimg.com/736x/7d/80/e2/7d80e268117ead2bd32b20f760c46543.jpg",
    "https://i.pinimg.com/736x/0b/9e/6f/0b9e6f0a129b6b060b180e4a575ab74a.jpg"
  ];

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])


  const iconMap = useMemo(() => ({
    Package,
    Users,
    Square,
    Factory,
  }), []);


  return (
    <div className="bg-background text-foreground">
      {/* 1. Hero Banner */}
        <section className="relative min-h-screen flex items-end bg-background pb-24 sm:pb-32">
          <div className="absolute inset-0 z-0">
            <Image
              src={hero.image_url}
              alt={hero.alt}
              fill
              className="object-cover"
              priority
              data-ai-hint={hero.aiHint}
              placeholder="blur"
              blurDataURL={hero.blurDataUrl}
            />
            <div className="absolute inset-0 bg-black/50 z-10" />
          </div>
          <div className="max-w-screen-xl mx-auto px-4 w-full relative z-10">
            <div className="space-y-12">
              <AnimatedWrapper animation="slide-up">
                <div className="text-left space-y-8">
                  <div>
                    <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                      {hero.title}
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                      {hero.subtitle}
                    </p>
                  </div>
                   <div className="flex flex-row items-center gap-4">
                     <Button size="lg" variant="destructive">{hero.cta_primary} <ArrowRight className="ml-2" /></Button>
                     <DownloadButton text={hero.cta_secondary} />
                  </div>
                </div>
              </AnimatedWrapper>

              <AnimatedWrapper animation="slide-up" staggerIndex={1}>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {heroStats.map((stat, index) => {
                      const Icon = iconMap[stat.icon as keyof typeof iconMap];
                      return (
                        <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                           <div className="group relative overflow-hidden rounded-lg">
                                <div className="absolute inset-0 bg-accent transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />
                                <DetailedStatCard 
                                    icon={Icon}
                                    title={stat.title}
                                    value={stat.value}
                                    secondaryValue={(stat as any).secondaryValue}
                                    description={stat.description}
                                    className="bg-background/50 backdrop-blur-md border-border text-white transition-colors duration-300 group-hover:bg-transparent group-hover:border-accent"
                                />
                           </div>
                        </AnimatedWrapper>
                      );
                    })}
                </div>
              </AnimatedWrapper>
            </div>
          </div>
        </section>

      {/* 2. Product Details Section */}
      <ActivitiesSection />
      <section id="product-details" className="bg-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-10 gap-12">
            <div className="lg:col-span-4">
              <div className="space-y-4">
                <Carousel setApi={setApi} className="w-full">
                  <CarouselContent>
                    {drawingImages.map((src, index) => (
                      <CarouselItem key={index} onMouseEnter={() => setCurrent(index + 1)}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="flex aspect-square items-center justify-center p-6 relative">
                              <Image src={src} alt={`Drawing ${index + 1}`} fill className="object-contain rounded-lg" />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
                <div className="py-2 text-center text-sm text-muted-foreground">
                  Schéma {current} sur {count}
                </div>
              </div>
            </div>
            <div className="lg:col-span-6">
              <AnimatedWrapper animation="fade-in" staggerIndex={1}>
                <Card>
                   <CardHeader>
                    <CardTitle className="text-2xl font-bold text-accent">CARACTÉRISTIQUES GÉOMÉTRIQUES ET TECHNIQUES</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <GeometricTechnicalTable api={api as CarouselApi} setCurrent={setCurrent} current={current} />
                    <div className="mt-8 prose prose-lg max-w-none">
                        <TechnicalSpecsSection />
                    </div>
                     <div className="mt-8">
                        <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                            <Image src="https://i.pinimg.com/736x/ac/f1/1d/acf11d05445a30a0c57c86ab75fe9990.jpg" alt="Technical drawing" width={800} height={450} className="rounded-lg object-contain" data-ai-hint="technical drawing" />
                        </div>
                     </div>
                  </CardContent>
                </Card>
              </AnimatedWrapper>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
