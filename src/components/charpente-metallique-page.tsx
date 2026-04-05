/**
 * Main Content Component for the Charpente Métallique Page
 *
 * Orchestrates the layout of the page by dynamically importing and assembling
 * all sub-sections. Manages state for the selected production pillar to drive
 * the dynamic specifications display.
 */
"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Factory, HardHat, ShieldCheck, Zap, Award, TowerControl, Car, Tractor, Layers, Cog, Dot } from 'lucide-react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { AnimatedNumber } from '@/components/animated-number';
import { DownloadButton } from '@/components/ui/download-button';
import dynamic from 'next/dynamic';
import { charpenteMetalliqueData } from '@/config/charpente-metallique-data';
import { cn } from '@/lib/utils';
import { ProductionTables } from '@/components/production-tables';

const FeatureHoverCard = dynamic(() => import('@/components/feature-hover-card').then(mod => mod.FeatureHoverCard));
const HoverImageGallery = dynamic(() => import('@/components/ui/hover-image-gallery').then(mod => mod.HoverImageGallery), { ssr: false });

const HeroSection = dynamic(() => import('@/components/pages/charpente-metallique/hero-section').then(mod => mod.HeroSection));
const GallerySection = dynamic(() => import('@/components/pages/charpente-metallique/gallery-section').then(mod => mod.GallerySection));

const applications = [
  { icon: <Building className="w-8 h-8" />, text: "Bâtiments industriels & commerciaux" },
  { icon: <Factory className="w-8 h-8" />, text: "Hangars de stockage & agricoles" },
  { icon: <Tractor className="w-8 h-8" />, text: "Infrastructures logistiques" },
  { icon: <HardHat className="w-8 h-8" />, text: "Projets sur mesure" },
];

const whyChooseUs = [
    {
        icon: <Award className="w-10 h-10" />,
        title: "Standards & Certifications",
        description: "Nous respectons les normes internationales les plus strictes (ISO, EN) pour garantir la qualité et la sécurité de chaque structure."
    },
    {
        icon: <Zap className="w-10 h-10" />,
        title: "Capacités de Production",
        description: "Avec des machines CNC de pointe et des soudeuses automatiques, nous avons une capacité de production massive pour les projets de toute envergure."
    },
    {
        icon: <ShieldCheck className="w-10 h-10" />,
        title: "Expertise & Innovation",
        description: "Notre bureau d'études et nos équipes s'appuient sur une riche expérience et des références solides pour innover et relever les défis complexes."
    }
];

export function CharpenteMetalliquePageContent() {
  const [selectedPillarId, setSelectedPillarId] = useState<string | null>(charpenteMetalliqueData.pillars[0].id);

  const selectedPillar = charpenteMetalliqueData.pillars.find(p => p.id === selectedPillarId);

  const handlePillarClick = (id: string) => {
    setSelectedPillarId(id);
  };
  
  const iconMap = useMemo(() => ({
    HardHat,
    Cog,
    Layers,
    TowerControl,
    Car,
    Tractor
  }), []);

  return (
    <div className="bg-background">
      <HeroSection hero={charpenteMetalliqueData.hero} />

      <GallerySection />
      
      <section className="py-20">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <AnimatedWrapper animation="fade-in">
                    <div className="space-y-8">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="text-center p-6 bg-background rounded-lg shadow-md border">
                                <p className="font-headline text-4xl font-bold text-accent"><AnimatedNumber value={25000} /></p>
                                <p className="text-sm uppercase tracking-wider text-muted-foreground mt-1">Tonnes / an</p>
                                <p className="font-semibold text-primary mt-2">Capacité de production<br/>Charpente</p>
                            </div>
                            <div className="text-center p-6 bg-background rounded-lg shadow-md border">
                                <p className="font-headline text-4xl font-bold text-accent"><AnimatedNumber value={3000} /></p>
                                <p className="text-sm uppercase tracking-wider text-muted-foreground mt-1">Tonnes / an</p>
                                <p className="font-semibold text-primary mt-2">Capacité de production<br/>PRS</p>
                            </div>
                        </div>
                         <ProductionTables />
                    </div>
                </AnimatedWrapper>
                <AnimatedWrapper animation="fade-in" staggerIndex={1}>
                    <Card className="shadow-lg bg-background">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl text-primary">Domaines d'Application</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                              {applications.map((app, index) => (
                                <li key={index} className="flex items-center gap-3 text-lg text-foreground">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-accent flex items-center justify-center">
                                      {app.icon}
                                    </div>
                                    <span>{app.text}</span>
                                </li>
                              ))}
                            </ul>
                        </CardContent>
                    </Card>
                </AnimatedWrapper>
            </div>
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
              const Icon = iconMap[pillar.iconName as keyof typeof iconMap];
              return (
                <AnimatedWrapper key={pillar.id} animation="fade-in-stagger" staggerIndex={index}>
                  <div onClick={() => handlePillarClick(pillar.id)} className="cursor-pointer">
                    <FeatureHoverCard
                        Icon={Icon}
                        title={pillar.title}
                        description={pillar.description}
                    />
                  </div>
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
                                 <span dangerouslySetInnerHTML={{ __html: item.value.replace(/(\d+mm|\d+\s*mm|\d+\s*m)/g, '<strong class="text-accent font-bold">$1</strong>') }}></span>
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
                {whyChooseUs.map((item, index) => (
                    <AnimatedWrapper key={item.title} animation="fade-in-stagger" staggerIndex={index}>
                        <div className="text-center">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-background text-accent mx-auto mb-6 shadow-lg border">
                                {item.icon}
                            </div>
                            <h3 className="font-headline text-2xl font-bold text-primary mb-3">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                        </div>
                    </AnimatedWrapper>
                ))}
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
                    <Button size="lg" variant="destructive">
                        Demander un Devis <ArrowRight className="ml-2" />
                    </Button>
                     <DownloadButton text="Télécharger la Brochure" />
                </div>
              </div>
            </AnimatedWrapper>
        </div>
      </section>

    </div>
  );
}