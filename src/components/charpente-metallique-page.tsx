
"use client";

import Image from 'next/image';
import { useState } from 'react';
import { AnimatedWrapper } from './animated-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Factory, CheckCircle, Wind, HardHat, Layers, Truck, GanttChart, Square, Component, ToyBrick } from 'lucide-react';
import { companyData } from '@/config/company-data';
import { charpenteData } from '@/config/charpente-data';
import { ProductImageGallery } from './product-image-gallery';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { cn } from '@/lib/utils';


const applications = [
  { icon: <Building className="w-8 h-8" />, text: "Bâtiments industriels & commerciaux" },
  { icon: <Factory className="w-8 h-8" />, text: "Hangars de stockage & agricoles" },
  { icon: <Truck className="w-8 h-8" />, text: "Infrastructures logistiques" },
  { icon: <HardHat className="w-8 h-8" />, text: "Projets sur mesure" },
];

const advantages = [
    "Conception optimisée par nos ingénieurs",
    "Haute résistance et durabilité",
    "Rapidité de montage sur site",
    "Flexibilité architecturale",
    "Respect des normes parasismiques"
];

const bentoItems = [
  {
    id: 'main',
    colSpan: 'lg:col-span-3',
    rowSpan: 'lg:row-span-2',
    content: (
      <div className="relative w-full h-full">
        <Image
          src={companyData.pages.units.items.find(i => i.title === 'Charpente Métallique')?.image.src || ''}
          alt="Charpente Métallique en construction"
          layout="fill"
          objectFit="cover"
          className="rounded-xl"
          data-ai-hint="steel frame construction"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="font-headline text-5xl font-bold">Charpente Métallique</h1>
          <p className="mt-2 text-xl max-w-lg">Solutions d'ingénierie robustes pour les projets les plus ambitieux.</p>
        </div>
      </div>
    ),
    padding: 'p-0',
  },
  {
    id: 'applications',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-2',
    content: (
        <>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Domaines d'Application</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {applications.map((app, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                                {app.icon}
                            </div>
                            <p className="text-lg font-medium">{app.text}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </>
    ),
  },
  {
    id: 'capacity',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-1',
    content: (
        <div className="text-center flex flex-col justify-center items-center h-full">
            <p className="font-headline text-7xl font-bold text-accent">25,000</p>
            <p className="font-semibold text-xl mt-2 text-muted-foreground">Tonnes / an</p>
            <p className="font-headline text-5xl font-bold text-accent mt-4">3,000</p>
            <p className="font-semibold text-xl mt-2 text-muted-foreground">Tonnes / an de PRS</p>
        </div>
    ),
  },
  {
    id: 'advantages',
    colSpan: 'lg:col-span-3',
    rowSpan: 'lg:row-span-2',
    content: (
        <>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Nos Avantages</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                   {advantages.map((adv, index) => (
                     <li key={index} className="flex items-center gap-3 text-lg">
                       <CheckCircle className="h-6 w-6 text-accent" />
                       <span>{adv}</span>
                     </li>
                   ))}
                </ul>
            </CardContent>
        </>
    ),
  },
   {
    id: 'cta',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-1',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center bg-accent text-accent-foreground rounded-xl">
        <h3 className="font-headline text-3xl font-bold">Un projet en tête?</h3>
        <p className="mt-2 mb-6">Discutons de vos besoins spécifiques.</p>
        <Button size="lg" variant="secondary" className="bg-white text-accent hover:bg-white/90 group">
          Demander un Devis <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    ),
     padding: 'p-0',
  },
];

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-headline text-3xl font-bold text-primary mb-8">{children}</h3>
);

const SubSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h4 className="font-headline text-2xl font-bold text-primary mt-10 mb-6">{children}</h4>
);


export function CharpenteMetalliquePageContent() {
  const [activeProductKey, setActiveProductKey] = useState<keyof typeof charpenteData>('poutrelles');
  const activeProduct = charpenteData[activeProductKey];

  const productButtons = [
    { key: 'poutrelles', label: 'Poutrelles', icon: GanttChart },
    { key: 'profiles', label: 'Profilés', icon: Square },
    { key: 'poteaux', label: 'Poteaux', icon: Component },
    { key: 'accessoires', label: 'Accessoires', icon: ToyBrick },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-3 gap-8 min-h-[80vh]">
        {bentoItems.map((item, index) => (
          <AnimatedWrapper
            key={item.id}
            animation="zoom-in"
            staggerIndex={index}
            className={`${item.colSpan} ${item.rowSpan}`}
          >
            <Card className={`h-full w-full shadow-lg hover:shadow-2xl transition-shadow duration-300 ${item.padding !== 'p-0' ? 'p-6' : ''} ${item.id === 'cta' ? 'bg-transparent border-none' : ''}`}>
              {item.content}
            </Card>
          </AnimatedWrapper>
        ))}
      </div>

      <section id="product-details" className="bg-background py-20 mt-20">
         <AnimatedWrapper animation="fade-in">
            <div className="text-center mb-20">
                <h1 className="font-headline text-5xl font-bold text-primary mb-6">Catalogue Technique de Charpente Métallique</h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                    Explorez notre gamme complète de composants pour charpentes métalliques. Chaque pièce est conçue pour garantir une intégrité structurelle, une durabilité et une conformité aux normes les plus strictes.
                </p>
            </div>
        </AnimatedWrapper>

        <AnimatedWrapper animation="fade-in">
           <div className="mb-24 flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
            {productButtons.map(({ key, label, icon: Icon }) => (
              <div key={key} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setActiveProductKey(key as keyof typeof charpenteData)}>
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
                    onClick={() => setActiveProductKey(key as keyof typeof charpenteData)}
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
            <div className="lg:col-span-1 h-max sticky top-32 space-y-8">
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
                            <SectionTitle>CARACTÉRISTIQUES DU PRODUIT</SectionTitle>
                            <div className="space-y-12 text-lg">
                                {activeProduct.features.description && (
                                  <div>
                                      <SubSectionTitle>Description</SubSectionTitle>
                                      <p>{activeProduct.features.description}</p>
                                  </div>
                                )}
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
                                {activeProduct.features.normes && 
                                  <div>
                                      <SubSectionTitle>Normes et Qualité</SubSectionTitle>
                                      <p>{activeProduct.features.normes}</p>
                                  </div>
                                }
                            </div>

                            <section className="mt-24">
                                <SectionTitle>TABLEAUX TECHNIQUES</SectionTitle>
                                {activeProduct.tables.dimensions?.rows && activeProduct.tables.dimensions.rows.length > 0 && (
                                    <div className="mb-16">
                                        <SubSectionTitle>{activeProduct.tables.dimensions.title}</SubSectionTitle>
                                        <Table>
                                            <TableHeader>
                                                <TableRow className="bg-accent/10">
                                                    {activeProduct.tables.dimensions.headers.map(h => <TableHead key={h} className="text-accent font-bold">{h}</TableHead>)}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {activeProduct.tables.dimensions.rows.map((row, i) => (
                                                    <TableRow key={i}>
                                                        {activeProduct.tables.dimensions.headers.map(h => <TableCell key={h}>{row[h as keyof typeof row] ?? ''}</TableCell>)}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                                 {activeProduct.tables.accessoires && (
                                    <div className="mb-16">
                                        <SubSectionTitle>{activeProduct.tables.accessoires.title}</SubSectionTitle>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                          {activeProduct.tables.accessoires.items.map((item, index) => (
                                            <div key={index} className="text-center">
                                              <Image 
                                                  src={item.image.src} 
                                                  alt={item.name} 
                                                  width={150} 
                                                  height={100}
                                                  className="mx-auto"
                                                  data-ai-hint={item.image.aiHint}
                                              />
                                              <p className="font-semibold mt-2">{item.name}</p>
                                            </div>
                                          ))}
                                        </div>
                                    </div>
                                )}
                            </section>

                        </CardContent>
                    </Card>
                </div>
              </AnimatedWrapper>
            </div>
          </div>
      </section>
    </div>
  );
}

