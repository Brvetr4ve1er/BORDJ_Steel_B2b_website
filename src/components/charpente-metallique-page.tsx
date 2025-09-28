
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Factory, CheckCircle, Wind, HardHat, Layers, Truck } from 'lucide-react';
import { companyData } from '@/config/company-data';

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


export function CharpenteMetalliquePageContent() {
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
    </div>
  );
}
