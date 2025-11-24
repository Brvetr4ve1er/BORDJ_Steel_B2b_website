
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

const DetailedStatCard = dynamic(() => import('./detailed-stat-card').then(mod => mod.DetailedStatCard));


const GeometricTechnicalTable = () => {
  const tableData = [
    { capacite: 3, format: "1 250", epaisseur: 4, longVirole: "2 200.00", longTotale: "2 730.00", poidsUnite: "468,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
    { capacite: 5, format: "1 250", epaisseur: 5, longVirole: "3 850.00", longTotale: "4 290.00", poidsUnite: "469,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
    { capacite: 10, format: "1 900", epaisseur: 6, longVirole: "3 200.00", longTotale: "4 010.00", poidsUnite: "1 387,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
    { capacite: 15, format: "1 900", epaisseur: 6, longVirole: "5 000.00", longTotale: "5 810.00", poidsUnite: "1 908,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
    { capacite: 20, format: "2 500", epaisseur: 6, longVirole: "5 810.00", longTotale: "4 692.00", poidsUnite: "2 102,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
    { capacite: 30, format: "2 500", epaisseur: 6, longVirole: "5 700.00", longTotale: "6 742.00", poidsUnite: "2 909,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
    { capacite: 40, format: "3 000", epaisseur: 6, longVirole: "5 130.00", longTotale: "6 193.00", poidsUnite: "3 363,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
    { capacite: 50, format: "3 000", epaisseur: 6, longVirole: "6 560.00", longTotale: "7 626.00", poidsUnite: "4 133,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
    { capacite: 60, format: "3 000", epaisseur: 6, longVirole: "8 000.00", longTotale: "9 066.00", poidsUnite: "4 803,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
    { capacite: 100, format: "3 000", epaisseur: 6, longVirole: "13 600.00", longTotale: "14 886.00", poidsUnite: "7 611,00", nbreTrous: "1", pressionEpreuve: "3 Bars" }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-red-700 leading-tight">
            CARACTÉRISTIQUES GÉOMÉTRIQUES<br/>ET TECHNIQUES
          </h1>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-red-200">
                <th className="border border-red-300 px-3 py-3 text-center text-xs font-bold text-gray-800">
                  CAPACITÉ
                </th>
                <th className="border border-red-300 px-3 py-3 text-center text-xs font-bold text-gray-800">
                  FORMAT
                </th>
                <th className="border border-red-300 px-3 py-3 text-center text-xs font-bold text-gray-800">
                  ÉPAISSEUR
                </th>
                <th className="border border-red-300 px-3 py-3 text-center text-xs font-bold text-gray-800">
                  LONGUEUR<br/>VIROLE
                </th>
                <th className="border border-red-300 px-3 py-3 text-center text-xs font-bold text-gray-800">
                  LONGUEUR<br/>TOTALE
                </th>
                <th className="border border-red-300 px-3 py-3 text-center text-xs font-bold text-gray-800">
                  Poids en<br/>unité
                </th>
                <th className="border border-red-300 px-3 py-3 text-center text-xs font-bold text-gray-800">
                  NBRE<br/>trous D'homme
                </th>
                <th className="border border-red-300 px-3 py-3 text-center text-xs font-bold text-gray-800">
                  pression<br/>de service
                </th>
                <th className="border border-red-300 px-3 py-3 text-center text-xs font-bold text-gray-800">
                  pression<br/>d'épreuve
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-red-50'}>
                  <td className="border border-gray-300 px-3 py-3 text-center text-sm font-semibold text-gray-800">
                    {row.capacite}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 text-center text-sm text-gray-700">
                    {row.format}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 text-center text-sm text-gray-700">
                    {row.epaisseur}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 text-center text-sm text-gray-700">
                    {row.longVirole}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 text-center text-sm text-gray-700">
                    {row.longTotale}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 text-center text-sm text-gray-700">
                    {row.poidsUnite}
                  </td>
                  <td className="border border-gray-300 px-3 py-3 text-center text-sm text-gray-700">
                    {row.nbreTrous}
                  </td>
                  {index === 0 && (
                    <td rowSpan={tableData.length} className="border border-gray-300 bg-white relative" style={{ width: '50px' }}>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="transform -rotate-90 whitespace-nowrap text-xs font-bold text-gray-800 tracking-wider">
                          ATMOSPHERIQUE
                        </div>
                      </div>
                    </td>
                  )}
                  <td className="border border-gray-300 px-3 py-3 text-center text-sm text-gray-700">
                    {row.pressionEpreuve}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const TechnicalSpecsSection = () => {
   return (
     <div className="p-8 bg-white">
       <div className="max-w-6xl mx-auto">
         <div className="grid md:grid-cols-2 gap-6">
           {/* Left Column - Assembly and Welding Process */}
           <div className="bg-white">
             <h2 className="text-red-700 font-bold text-sm mb-4 uppercase tracking-wide">
               PROCÉDÉ D'ASSEMBLAGE ET SOUDAGE
             </h2>
             <div className="space-y-2 text-xs leading-relaxed">
               <p className="text-gray-800">
                 <span className="font-bold">ROBÉ ET FOND:</span> PAR RECOUVREMENT EN V
               </p>
               <p className="text-gray-800">
                 <span className="font-bold">TUBULURE, BRIDE, ANNEAU DE LEVAGE:</span> EN V RENFORCÉ
               </p>
               <p className="text-gray-800">
                 <span className="font-bold">SOUDURES :</span> CONFORMES AUX NORMES API 650 STD
               </p>
               <p className="text-gray-800">
                 <span className="font-bold">TOLÉRANCE DE FABRICATION:</span> + 0,1%
               </p>
               <p className="text-gray-800">
                 <span className="font-bold">ÉPREUVE HYDRAULIQUE:</span> TEST D'ÉTANCHÉITÉ
               </p>
               <p className="text-gray-800">
                 <span className="font-bold">TRAITEMENT DE SURFACE:</span> SABLAGE EXTÉRIEUR + PEINTURE (SELON PRODUIT STOCKÉ)
               </p>
             </div>
           </div>
           {/* Right Column - Materials */}
           <div className="bg-white">
             <h2 className="text-red-700 font-bold text-sm mb-4 uppercase tracking-wide">
               MATÉRIAUX
             </h2>
             <div className="space-y-2 text-xs leading-relaxed">
               <p className="text-gray-800">
                 <span className="font-bold">TÔLE:</span> S 275JR / E28
               </p>
               <p className="text-gray-800">
                 <span className="font-bold">PROFILÉ:</span> IDEM
               </p>
               <p className="text-gray-800">
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
      <section id="product-details" className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-10 gap-12">
            <div className="lg:col-span-4">
              <AnimatedWrapper animation="fade-in">
                <Card>
                  <CardHeader>
                    <CardTitle>Dessins Techniques</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Placeholder for technical drawings */}
                    <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">Dessin technique à venir</p>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedWrapper>
            </div>
            <div className="lg:col-span-6">
              <AnimatedWrapper animation="fade-in" staggerIndex={1}>
                <GeometricTechnicalTable />
                <div className="mt-8 prose prose-lg max-w-none">
                    <TechnicalSpecsSection />
                </div>
              </AnimatedWrapper>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
