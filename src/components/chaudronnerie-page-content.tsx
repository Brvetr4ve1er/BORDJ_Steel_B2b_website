
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Button } from './ui/button';
import { ArrowRight, Database, Wind, Construction, Cog } from 'lucide-react';
import React, { useState } from 'react';
import { chaudronnerieData } from '@/config/chaudronnerie-data';
import { cn } from '@/lib/utils';
import { ProductImageGallery } from './product-image-gallery';
import { Card, CardContent } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-headline text-3xl font-bold text-primary mb-8">{children}</h3>
);

const SubSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h4 className="font-headline text-2xl font-bold text-primary mt-10 mb-6">{children}</h4>
);

export function ChaudronneriePageContent() {
  const [activeProductKey, setActiveProductKey] = useState<keyof typeof chaudronnerieData>('silos');
  const activeProduct = chaudronnerieData[activeProductKey];

  const productButtons = [
    { key: 'silos', label: 'Silos & Réservoirs', icon: Database },
    { key: 'conduites', label: 'Conduites & Gaines', icon: Wind },
    { key: 'structures', label: 'Structures Spéciales', icon: Construction },
    { key: 'equipements', label: 'Équipements Industriels', icon: Cog },
  ];

  return (
    <div className="bg-background text-foreground">
      {/* 1. Hero Banner */}
      <section className="relative h-[70vh] w-full flex items-center justify-start text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1510900767338-8bf61abf2562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMG1lbHRpbmclMjBmYWN0b3J5fGVufDB8fHx8MTc1Mzg3Njc2NXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Opération de chaudronnerie"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-40"
          data-ai-hint="metal fabrication"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20 z-10" />
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl text-left">
            <AnimatedWrapper animation="zoom-in">
              <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase text-primary">
                Chaudronnerie
              </h1>
              <p className="mt-6 text-xl md:text-2xl max-w-3xl text-foreground/80">
                Fabrication sur mesure d'équipements industriels de haute précision.
              </p>
            </AnimatedWrapper>
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
                <div key={key} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setActiveProductKey(key as keyof typeof chaudronnerieData)}>
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
                      onClick={() => setActiveProductKey(key as keyof typeof chaudronnerieData)}
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
