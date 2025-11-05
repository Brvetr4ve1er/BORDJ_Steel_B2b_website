
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Button } from './ui/button';
import { ArrowRight, Database, Wind, Construction, Cog, ShieldCheck, Zap, HardHat, Package, Check, Ruler, Scale, Factory, Users, Square } from 'lucide-react';
import React, { useState, useMemo } from 'react';
import { chaudronnerieData } from '@/config/chaudronnerie-data';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DownloadButton } from './ui/download-button';
import dynamic from 'next/dynamic';

const ProductImageGallery = dynamic(() => import('./product-image-gallery').then(mod => mod.ProductImageGallery));
const FeatureHoverCard = dynamic(() => import('./feature-hover-card').then(mod => mod.FeatureHoverCard));
const DetailedStatCard = dynamic(() => import('./detailed-stat-card').then(mod => mod.DetailedStatCard));


const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-headline text-3xl font-bold text-primary mb-8">{children}</h3>
);

const SubSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h4 className="font-headline text-2xl font-bold text-primary mt-10 mb-6">{children}</h4>
);

export function ChaudronneriePageContent() {
  const [activeProductKey, setActiveProductKey] = useState<keyof typeof chaudronnerieData.products>('silos');
  const activeProduct = chaudronnerieData.products[activeProductKey];
  const { hero } = chaudronnerieData;
  const heroStats = hero.stats;

  const iconMap = useMemo(() => ({
    Package,
    Ruler,
    Scale,
    Cog,
    Factory,
    Users,
    Square,
    Database,
    Wind,
    Construction,
  }), []);


  const productCards = [
    { key: 'silos', icon: Database, title: 'Silos & Réservoirs', description: 'Solutions de stockage sur mesure pour solides, liquides et gaz.' },
    { key: 'conduites', icon: Wind, title: 'Conduites & Gaines', description: 'Réseaux de tuyauterie pour le transport de fluides et de gaz.' },
    { key: 'structures', icon: Construction, title: 'Structures Spéciales', description: 'Ensembles mécano-soudés complexes et bâtis de machines.' },
    { key: 'equipements', icon: Cog, title: 'Équipements Industriels', description: 'Fabrication de trémies, convoyeurs et équipements sur mesure.' },
  ];

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
                           <DetailedStatCard 
                            icon={Icon}
                            title={stat.title}
                            value={stat.value}
                            secondaryValue={(stat as any).secondaryValue}
                            description={stat.description}
                           />
                        </AnimatedWrapper>
                      );
                    })}
                </div>
              </AnimatedWrapper>
            </div>
          </div>
        </section>

      {/* Feature Cards Section */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productCards.map((card, index) => {
              return (
                <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                    <div onClick={() => setActiveProductKey(card.key as keyof typeof chaudronnerieData.products)} className="cursor-pointer">
                        <FeatureHoverCard
                            Icon={card.icon}
                            title={card.title}
                            description={card.description}
                        />
                    </div>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>
      </section>

      {/* 2. Product Details Section */}
      <section id="product-details" className="bg-white py-20">
        <div className="container mx-auto px-4 max-w-screen-2xl">
          <AnimatedWrapper animation="fade-in">
            <div className="text-center mb-20">
                <h2 className="font-headline text-5xl font-bold text-primary mb-6">Nos Capacités en Chaudronnerie</h2>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                  Notre unité de chaudronnerie est spécialisée dans la conception et la fabrication sur mesure d'équipements pour les secteurs industriels, agroalimentaires et de la construction. Nous transformons l'acier pour donner vie à des projets complexes avec une précision et une qualité inégalées.
                </p>
            </div>
          </AnimatedWrapper>
          
          <div className="grid lg:grid-cols-3 gap-x-24 gap-y-16">
              <div className="lg:col-span-1 h-max space-y-8">
                  <ProductImageGallery 
                      galleryImages={activeProduct.galleryImages}
                  />
              </div>

              <div className="lg:col-span-2">
                <AnimatedWrapper animation="fade-in">
                  <div>
                      <h2 className="font-headline text-5xl font-bold text-accent mb-16">{activeProduct.title}</h2>
                      <Card className="border-none shadow-none p-0">
                          <CardContent className="p-0">
                              <SectionTitle>DESCRIPTION</SectionTitle>
                              <div className="space-y-12 text-lg">
                                  <p>{activeProduct.features.description}</p>
                                  
                                  {activeProduct.features.avantages && activeProduct.features.avantages.length > 0 &&
                                      <div>
                                          <SubSectionTitle>Avantages Clés</SubSectionTitle>
                                          <ul className="list-disc pl-6 space-y-2">
                                              {activeProduct.features.avantages.map(item => <li key={item}>{item}</li>)}
                                          </ul>
                                      </div>
                                  }
                                  {activeProduct.features.applications && activeProduct.features.applications.length > 0 &&
                                  <div>
                                      <SubSectionTitle>Applications Courantes</SubSectionTitle>
                                      <ul className="list-disc pl-6 space-y-2">
                                          {activeProduct.features.applications.map(item => <li key={item}>{item}</li>)}
                                      </ul>
                                  </div>
                                  }
                              </div>

                              <section className="mt-24">
                                  <SectionTitle>SPÉCIFICATIONS TECHNIQUES</SectionTitle>
                                  {activeProduct.tables.materiaux && (
                                      <div className="mb-16">
                                          <SubSectionTitle>Matériaux Utilisés</SubSectionTitle>
                                          <p className="text-lg">{activeProduct.tables.materiaux}</p>
                                      </div>
                                  )}
                                  {activeProduct.tables.capacites?.rows && activeProduct.tables.capacites.rows.length > 0 && (
                                      <div className="mb-16">
                                          <SubSectionTitle>{activeProduct.tables.capacites.title}</SubSectionTitle>
                                          <Table>
                                              <TableHeader>
                                                  <TableRow className="bg-accent/10">
                                                      {activeProduct.tables.capacites.headers.map(h => <TableHead key={h} className="text-accent font-bold">{h}</TableHead>)}
                                                  </TableRow>
                                              </TableHeader>
                                              <TableBody>
                                                  {activeProduct.tables.capacites.rows.map((row: any, i: number) => (
                                                      <TableRow key={i}>
                                                          <TableCell>{row.caracteristique}</TableCell>
                                                          <TableCell>{row.valeur}</TableCell>
                                                      </TableRow>
                                                  ))}
                                              </TableBody>
                                          </Table>
                                      </div>
                                  )}
                                   {activeProduct.tables.normes && (
                                      <div className="mb-16">
                                          <SubSectionTitle>Normes et Conformité</SubSectionTitle>
                                          <p className="text-lg">{activeProduct.tables.normes}</p>
                                      </div>
                                  )}
                              </section>
                          </CardContent>
                      </Card>
                  </div>
                </AnimatedWrapper>
              </div>
            </div>
        </div>
      </section>
    </div>
  );
}
