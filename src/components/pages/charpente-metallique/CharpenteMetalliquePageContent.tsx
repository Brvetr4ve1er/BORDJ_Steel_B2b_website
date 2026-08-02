

"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, HardHat, ShieldCheck, Zap, Award, TowerControl, Car, Tractor, Layers, Cog, Dot } from 'lucide-react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import React, { useState, useMemo } from 'react';
import { AnimatedNumber } from '@/components/animated-number';
import { DownloadButton } from '@/components/ui/download-button';
import dynamic from 'next/dynamic';
import {
  charpenteMetalliqueData,
  charpenteGalleryImages,
  charpenteWhyChooseUs,
} from '@/config/charpente-metallique-data';
import { ImageDialog } from '@/components/ui/image-dialog';
import { HoverImageGallery } from '@/components/ui/hover-image-gallery';
import { cn } from '@/lib/utils';
import { ProductionTables } from '@/components/production-tables';
import { CharpenteWireframe } from '@/components/wireframes/CharpenteWireframe';
import { ApplicationsShowcase } from '@/components/sections/charpente/ApplicationsShowcase';

const FeatureHoverCard = dynamic(() => import('@/components/feature-hover-card').then(mod => mod.FeatureHoverCard));
// Same-module component — reference directly (no code-split benefit from dynamic).
const HeroSection = UnwrappedHeroSection;


const whyChooseUsIconMap = {
  Award,
  Zap,
  ShieldCheck,
} as const;

const pillarIconMap = {
  HardHat,
  Cog,
  Layers,
  TowerControl,
  Car,
  Tractor,
} as const;

function UnwrappedHeroSection({ hero }: { hero: typeof charpenteMetalliqueData.hero }) {
  const iconMap = useMemo(() => ({
    HardHat,
    Cog,
    Layers,
    TowerControl,
    Car,
    Tractor
  }), []);

  return (
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
                <h1 className="font-headline text-6xl md:text-8xl leading-tight md:leading-tight lg:leading-tight font-bold tracking-tighter uppercase text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
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
              {hero.stats.map((stat, index) => {
                const Icon = iconMap[stat.icon as keyof typeof iconMap];
                return (
                  <AnimatedWrapper key={stat.title} animation="fade-in-stagger" staggerIndex={index}>
                     <Card className="group bg-black/50 backdrop-blur-md border-border text-white relative overflow-hidden transition-all duration-500 hover:border-accent">
                        <div className="absolute inset-0 bg-accent transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />
                        <CardHeader className="relative flex-row items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center transition-colors duration-300 group-hover:bg-accent-foreground/10">
                            {Icon && <Icon className="h-6 w-6 text-accent transition-colors duration-300 group-hover:text-white" />}
                            </div>
                            <div>
                            <CardTitle className="text-2xl font-bold text-white"><AnimatedNumber value={stat.value} />{stat.unit}</CardTitle>
                            <p className="text-sm text-gray-200 group-hover:text-gray-100">{stat.title}</p>
                            </div>
                        </CardHeader>
                    </Card>
                  </AnimatedWrapper>
                );
              })}
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}

const NewGallery = () => {
    return (
        <section className="w-full flex flex-col items-center justify-start py-12">
            <div className="max-w-3xl text-center px-4">
                <h2 className="text-3xl font-semibold">Nos Projets</h2>
            </div>
            <div className="flex items-center gap-2 h-[400px] w-full max-w-7xl mt-10 px-4">
                {charpenteGalleryImages.map((src, idx) => (
                    <ImageDialog key={idx} imageUrl={src} alt={`Réalisation charpente métallique ${idx + 1}`}>
                        <button
                            type="button"
                            className="relative group flex-grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full cursor-pointer block p-0 border-0 bg-transparent"
                        >
                            <Image
                                fill
                                sizes="(max-width: 1280px) 100vw, 1280px"
                                className="h-full w-full object-cover object-center"
                                src={src}
                                alt={`Réalisation charpente métallique ${idx + 1}`}
                            />
                        </button>
                    </ImageDialog>
                ))}
            </div>
        </section>
    );
};


export function CharpenteMetalliquePageContent() {
  // Falls back to `null` if the pillar list is ever empty — the detail panel
  // below is already gated on `selectedPillar`, so nothing renders in that case.
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(charpenteMetalliqueData.pillars[0]?.id ?? null);

  const selectedPillar = charpenteMetalliqueData.pillars.find(p => p.id === selectedPillarId);

  const handlePillarClick = (id: string) => {
    setSelectedPillarId(id);
  };

  return (
    <div className="bg-background">
      <HeroSection hero={charpenteMetalliqueData.hero} />

      <NewGallery />

      <section className="bg-secondary/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <CharpenteWireframe />
        </div>
      </section>

      <ApplicationsShowcase />

      <section className="py-20">
        <div className="container mx-auto px-4">
            <AnimatedWrapper animation="fade-in">
                <ProductionTables />
            </AnimatedWrapper>
        </div>
      </section>

      <section className="bg-secondary py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-center text-primary">Nos Piliers de Production</h2>
            <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
                Chacun de nos piliers de production représente un pôle d'excellence, équipé des technologies les plus avancées pour transformer l'acier en solutions innovantes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {charpenteMetalliqueData.pillars.map((pillar, index) => {
              const Icon = pillarIconMap[pillar.iconName as keyof typeof pillarIconMap];
              return (
                <AnimatedWrapper key={pillar.id} animation="fade-in-stagger" staggerIndex={index}>
                  <button
                    type="button"
                    onClick={() => handlePillarClick(pillar.id)}
                    aria-pressed={selectedPillarId === pillar.id}
                    className="group cursor-pointer text-left w-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    <FeatureHoverCard
                        Icon={Icon}
                        title={pillar.title}
                        description={pillar.description}
                    />
                  </button>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>
      </section>

      <section id="specifications-section" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {selectedPillar && (
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <AnimatedWrapper animation="fade-in">
                <HoverImageGallery images={(selectedPillar.galleryImages || []).filter(img => img)} />
              </AnimatedWrapper>
              <AnimatedWrapper key={selectedPillar.id} animation="fade-in" staggerIndex={1}>
                <Card className="shadow-lg border-border">
                  <CardHeader>
                    <CardTitle className="font-headline text-4xl text-accent">{selectedPillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-8">
                     {selectedPillar.specifications.mainDescription && (
                        <p className="text-lg text-muted-foreground">{selectedPillar.specifications.mainDescription}</p>
                     )}
                     
                     {selectedPillar.specifications.details && (
                        <ul className="space-y-3">
                           {selectedPillar.specifications.details.map((item, index) => (
                              <li key={index} className="flex items-start text-lg">
                                 <Dot className="text-accent h-6 w-6 flex-shrink-0 mr-2 mt-0.5" />
                                 <span dangerouslySetInnerHTML={{ __html: item.value }}></span>
                              </li>
                           ))}
                        </ul>
                     )}
                    
                    {selectedPillar.specifications.applications && (
                      <div>
                        <h4 className="font-headline text-2xl font-bold text-primary mb-4">Applications typiques</h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 list-disc pl-5">
                          {selectedPillar.specifications.applications.map((app, index) => (
                            <li key={index} className="text-lg">{app}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                     
                    {selectedPillar.specifications.supportLines && (
                        <div className="space-y-6">
                            {selectedPillar.specifications.supportLines.map((line, lineIndex) => (
                                <div key={lineIndex}>
                                    <h4 className="font-headline text-2xl font-bold text-primary mb-3">{line.title}</h4>
                                    <ul className="space-y-2 pl-5">
                                        {line.items.map((item, itemIndex) => (
                                            <li key={itemIndex} className="flex items-start">
                                                <Dot className="text-accent h-6 w-6 flex-shrink-0 mr-2 mt-0.5" />
                                                <span className="text-lg">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <p className="mt-3 text-right font-semibold">
                                        Capacité de production : <span className="text-accent font-bold">{line.capacity}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {selectedPillar.specifications.notes && (
                        <div className="mt-6 space-y-3">
                             {selectedPillar.specifications.notes.map((note, index) => (
                                <p key={index} className="text-lg text-muted-foreground italic border-l-4 border-accent pl-4" dangerouslySetInnerHTML={{ __html: note }}></p>
                            ))}
                        </div>
                    )}

                    {selectedPillar.specifications.additionalImages && (
                      <div className={cn(
                          "mt-8 grid gap-4",
                          selectedPillar.specifications.additionalImages.length > 1 ? "grid-cols-2" : "grid-cols-1"
                      )}>
                        {selectedPillar.specifications.additionalImages.map((image, index) => (
                          <div key={index} className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              sizes="(max-width: 1024px) 100vw, 50vw"
                              className="object-contain"
                              data-ai-hint={image.aiHint}
                            />
                          </div>
                        ))}
                      </div>
                    )}

                  </CardContent>
                </Card>
              </AnimatedWrapper>
            </div>
          )}
        </div>
      </section>


      <section id="why-choose-us" className="py-20 bg-secondary">
          <div className="container mx-auto px-4">
            <AnimatedWrapper animation="fade-in">
              <h2 className="font-headline text-5xl font-bold text-primary mb-16 text-center">Pourquoi Nous Choisir?</h2>
            </AnimatedWrapper>
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
                {charpenteWhyChooseUs.map((item, index) => {
                    const Icon = whyChooseUsIconMap[item.iconName as keyof typeof whyChooseUsIconMap];
                    return (
                    <AnimatedWrapper key={item.title} animation="fade-in-stagger" staggerIndex={index}>
                        <div className="text-center">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-background text-accent mx-auto mb-6 shadow-lg border">
                                {Icon && <Icon className="w-10 h-10" />}
                            </div>
                            <h3 className="font-headline text-2xl font-bold text-primary mb-3">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                        </div>
                    </AnimatedWrapper>
                    );
                })}
            </div>
          </div>
      </section>

      <section id="cta-bottom" className="py-20 bg-background">
        <div className="container mx-auto px-4">
            <AnimatedWrapper animation="zoom-in">
              <div className="bg-secondary rounded-2xl p-12 text-center max-w-4xl mx-auto shadow-xl">
                <h2 className="font-headline text-4xl font-bold text-primary mb-4">Discutons de votre projet.</h2>
                <p className="text-muted-foreground text-lg mb-8">Notre équipe est prête à transformer vos idées en réalité. Contactez-nous pour un devis ou une consultation technique.</p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <Button asChild size="lg" variant="destructive">
                        <Link href="/contact">
                            Demander un Devis <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                     <DownloadButton text="Télécharger la Brochure" href="/documents/Bordj-Steel-Catalogue-FR.pdf" />
                </div>
              </div>
            </AnimatedWrapper>
        </div>
      </section>

    </div>
  );
}

    