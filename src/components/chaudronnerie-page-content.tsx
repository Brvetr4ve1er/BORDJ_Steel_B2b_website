
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Button } from './ui/button';
import { ArrowRight, Database, Wind, Construction, Cog, ShieldCheck, Zap, HardHat, Package, Check, Ruler, Scale } from 'lucide-react';
import React, { useState } from 'react';
import { chaudronnerieData } from '@/config/chaudronnerie-data';
import { cn } from '@/lib/utils';
import { ProductImageGallery } from './product-image-gallery';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import images from '@/app/lib/placeholder-images.json';
import { DownloadButton } from './ui/download-button';


const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-headline text-3xl font-bold text-primary mb-8">{children}</h3>
);

const SubSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h4 className="font-headline text-2xl font-bold text-primary mt-10 mb-6">{children}</h4>
);

const featureCards = [
  {
    icon: Zap,
    title: 'Cutting-Edge Technology',
    description: 'Utilizing advanced CNC machinery for unparalleled precision.',
  },
  {
    icon: HardHat,
    title: 'Skilled Workforce',
    description: 'A team of certified welders and experienced technicians.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description: 'Rigorous testing and quality control at every production stage.',
  },
  {
    icon: Construction,
    title: 'Custom Fabrication',
    description: 'Tailor-made solutions to meet unique and complex project needs.',
  }
];

export function ChaudronneriePageContent() {
  const [activeProductKey, setActiveProductKey] = useState<keyof typeof chaudronnerieData.products>('silos');
  const activeProduct = chaudronnerieData.products[activeProductKey];
  const { hero } = chaudronnerieData;
  const smallStats = hero.stats.filter(s => !s.large);

  const iconMap: { [key: string]: React.ElementType } = {
    Package,
    Ruler,
    Scale
  };


  const productButtons = [
    { key: 'silos', label: 'Silos & Réservoirs', icon: Database },
    { key: 'conduites', label: 'Conduites & Gaines', icon: Wind },
    { key: 'structures', label: 'Structures Spéciales', icon: Construction },
    { key: 'equipements', label: 'Équipements Industriels', icon: Cog },
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                    {smallStats.map((stat, index) => {
                      const Icon = iconMap[stat.icon];
                      return (
                        <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index + 2}>
                          <Card className="bg-background/50 backdrop-blur-md border-border text-white">
                            <CardContent className="p-4 flex items-center gap-4">
                              {Icon && <Icon className="h-10 w-10 text-accent" />}
                              <div>
                                <p className="text-2xl font-bold">{stat.value}</p>
                                <p className="text-sm text-gray-300">{stat.title}</p>
                              </div>
                            </CardContent>
                          </Card>
                        </AnimatedWrapper>
                      );
                    })}
                </div>
              </AnimatedWrapper>
            </div>
          </div>
        </section>

      {/* Feature Cards Section */}
      <section className="bg-secondary -mt-24 md:-mt-32 relative z-30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featureCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                  <Card className="bg-background/80 backdrop-blur-sm p-6 text-center shadow-lg h-full border border-border transition-all duration-300 hover:border-accent hover:shadow-xl">
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                    </div>
                    <h3 className="font-headline font-bold text-xl text-primary h-12 flex items-center justify-center">{card.title}</h3>
                    <p className="text-muted-foreground text-sm h-16">{card.description}</p>
                  </Card>
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
          
          <AnimatedWrapper animation="fade-in">
            <div className="mb-24 flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
              {productButtons.map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setActiveProductKey(key as keyof typeof chaudronnerieData.products)}>
                  <div className={cn(
                      "w-32 h-32 rounded-full flex items-center justify-center border-4 border-background transition-all duration-300 transform group-hover:scale-110",
                      activeProductKey === key ? 'bg-accent shadow-lg' : 'bg-secondary'
                  )}>
                      <Icon className={cn(
                          "h-14 w-14 transition-colors duration-300",
                          activeProductKey === key ? 'text-accent-foreground' : 'text-primary'
                      )} />
                  </div>
                  <Button
                      variant={activeProductKey === key ? 'destructive' : 'outline'}
                      onClick={() => setActiveProductKey(key as keyof typeof chaudronnerieData.products)}
                      className={cn(
                          "h-auto py-2 px-6 transition-all duration-300 text-center",
                          activeProductKey === key ? 'bg-accent shadow-lg' : 'bg-secondary text-primary hover:bg-accent/10'
                      )}
                  >
                      <span className="text-center text-lg font-semibold">{label}</span>
                  </Button>
                </div>
              ))}
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
