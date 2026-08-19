

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, Users, Square, Factory, Flame, Bolt, Droplets, Beaker, Construction, Leaf, Filter } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { chaudronnerieData } from '@/config/chaudronnerie-data';
import {
  geometricTableData,
  chaudronnerieDrawingImages,
  chaudronnerieActivities,
} from '@/config/chaudronnerie-tables';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DownloadButton } from '@/components/ui/download-button';
import { ChaudronnerieWireframe } from '@/components/wireframes/ChaudronnerieWireframe';
import { KenBurns } from '@/components/ui/ken-burns';
import { VideoLoop } from '@/components/ui/video-loop';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

const DetailedStatCard = dynamic(() => import('@/components/detailed-stat-card').then(mod => mod.DetailedStatCard));

const activityIconMap: { [key: string]: LucideIcon } = {
  Flame,
  Bolt,
  Droplets,
  Beaker,
  Construction,
  Leaf,
  Filter,
};

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
                    {chaudronnerieActivities.map((card, index) => {
                        const Icon = activityIconMap[card.iconName];
                        return (
                            <AnimatedWrapper key={card.title} animation="fade-in-stagger" staggerIndex={index}>
                                <ActivityCard title={card.title} icon={Icon ? <Icon className="h-10 w-10" /> : null} />
                            </AnimatedWrapper>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};


const GeometricTechnicalTable = ({ setCurrent, current }: { setCurrent: (index: number) => void, current: number }) => {
  const tableData = geometricTableData;

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
                  onMouseEnter={() => setCurrent(index + 1)}
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
  const [current, setCurrent] = React.useState(1)

  const drawingImages = chaudronnerieDrawingImages;
  const count = drawingImages.length;

  const iconMap = useMemo(() => ({
    Package,
    Users,
    Square,
    Factory,
  }), []);


  return (
    <div className="bg-background text-foreground">
      {/* 1. Hero Banner */}
        <section className="relative min-h-[100dvh] flex items-end bg-background pb-24 sm:pb-32">
          {/* `overflow-hidden`: KenBurns over-scales the photo past this box (it
              has to, or the pan would expose the container edge), and neither
              this wrapper nor the section clipped before. Without it the hero
              photo paints ~3% outside the section and widens the document. */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <KenBurns variant="right" className="absolute inset-0 z-0">
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
            </KenBurns>
            {/*
              * Ambient loop generated from this hero's own photograph, sitting
              * between the still (z-0) and the scrim, so the scrim and every piece
              * of copy still read exactly as they do over the photo. It renders
              * nothing at all unless it is going to play — see VideoLoop — so the
              * Image above remains the LCP element and is what a phone, a
              * reduced-motion visitor and every crawler actually get. Deliberately
              * NOT inside KenBurns: the clip already contains its own camera move,
              * and compounding it with the drift would double the motion.
              */}
            <VideoLoop
              src="/media/loops/chaudronnerie-hero.mp4"
              className="absolute inset-0 z-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 z-10" />
          </div>
          <div className="max-w-screen-xl mx-auto px-4 w-full relative z-10">
            <div className="space-y-12">
              <AnimatedWrapper animation="slide-up">
                <div className="text-left space-y-8">
                  <div>
                    <h1 className="font-headline text-5xl sm:text-6xl md:text-8xl leading-tight md:leading-tight lg:leading-tight font-bold tracking-tighter uppercase text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                      {hero.title}
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                      {hero.subtitle}
                    </p>
                  </div>
                   <div className="flex flex-row items-center gap-4">
                     <Button asChild size="lg" variant="destructive">
                       <Link href="/contact">{hero.cta_primary} <ArrowRight className="ml-2" /></Link>
                     </Button>
                     <DownloadButton text={hero.cta_secondary} href="/documents/Bordj-Steel-Catalogue-FR.pdf" />
                  </div>
                </div>
              </AnimatedWrapper>

              <AnimatedWrapper animation="slide-up" staggerIndex={1}>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                    {heroStats.map((stat, index) => {
                      const Icon = iconMap[stat.icon as keyof typeof iconMap];
                      return (
                        <AnimatedWrapper key={stat.title} animation="fade-in-stagger" staggerIndex={index}>
                           <div className="group relative overflow-hidden rounded-lg">
                                <div className="absolute inset-0 bg-accent transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />
                                <DetailedStatCard 
                                    icon={Icon}
                                    title={stat.title}
                                    value={stat.value}
                                    secondaryValue={stat.secondaryValue}
                                    description={stat.description}
                                    className="bg-black/50 backdrop-blur-md border-border text-white transition-colors duration-300 group-hover:bg-transparent group-hover:border-accent"
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

      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ChaudronnerieWireframe />
        </div>
      </section>

      {/* 2. Product Details Section */}
      <ActivitiesSection />
      <section id="product-details" className="bg-secondary/20 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-10 gap-12">
            <div className="lg:col-span-4 min-w-0">
              <div className="space-y-4">
                <Card>
                  <CardContent className="relative aspect-square p-6">
                    {drawingImages.map((src, index) => (
                      <div
                        key={index}
                        aria-hidden={current !== index + 1}
                        className={cn(
                          "absolute inset-0 p-6 transition-opacity duration-300",
                          current === index + 1 ? "opacity-100" : "pointer-events-none opacity-0"
                        )}
                      >
                        <div className="relative h-full w-full">
                          <Image src={src} alt={`Schéma technique ${index + 1}`} fill className="object-contain rounded-lg" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                <div className="flex items-center justify-center gap-2">
                  {drawingImages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Afficher le schéma technique ${index + 1}`}
                      onClick={() => setCurrent(index + 1)}
                      className={cn(
                        "h-2.5 w-2.5 rounded-full transition-colors",
                        current === index + 1 ? "bg-accent" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                      )}
                    />
                  ))}
                </div>
                <div className="py-2 text-center text-sm text-muted-foreground">
                  Schéma {current} sur {count}
                </div>
              </div>
            </div>
            <div className="lg:col-span-6 min-w-0">
              <AnimatedWrapper animation="fade-in" staggerIndex={1}>
                <Card>
                   <CardHeader>
                    <CardTitle className="text-2xl font-bold text-accent">CARACTÉRISTIQUES GÉOMÉTRIQUES ET TECHNIQUES</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <GeometricTechnicalTable setCurrent={setCurrent} current={current} />
                    <div className="mt-8 prose prose-lg max-w-none">
                        <TechnicalSpecsSection />
                    </div>
                     <div className="mt-8">
                        <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
                            <Image src="/media/acf11d05445a30a0c57c86ab75fe-6202d984.webp" alt="Schéma technique" width={800} height={450} className="rounded-lg object-contain" data-ai-hint="technical drawing" />
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

    