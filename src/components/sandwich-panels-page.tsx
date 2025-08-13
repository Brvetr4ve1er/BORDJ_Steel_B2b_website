
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from './ui/table';
import { cn } from '@/lib/utils';
import { Square } from 'lucide-react';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <Square className="w-5 h-5 text-accent fill-accent" />
    <h2 className="font-headline text-3xl font-bold text-primary">{children}</h2>
  </div>
);

const ProductionCapacityTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="font-headline text-2xl font-bold text-center text-primary uppercase mb-6">{children}</h2>
);


export function SandwichPanelsPage() {
  const { units } = companyData.pages;
  const product = units.items.find(item => item.title === 'Panneaux Sandwichs');

  if (!product) {
    return (
        <section className="bg-background py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-bold">Produit non trouvé</h2>
            </div>
        </section>
    );
  }
  
  const productionCapacity = [
    { product: 'Panneaux sandwichs', capacity: '1.500.000 m²/an (5 000 m²/jour)' },
    { product: 'Fabrication de Tôle nervurée (TN40)', capacity: '1.500.000 m²/an (5 000 m²/jour)' },
    { product: 'Fabrication de Tôle nervurée collaborant', capacity: '1.500.000 m²/an (5 000 m²/jour)' },
    { product: 'Accesoires de finition en tôle pliées', capacity: '2.500 Tonnes/an (8.33 T/jour)' },
  ];

  return (
    <section id="product-details" className="bg-white py-20">
      <div className="container mx-auto px-4 max-w-4xl">
        <AnimatedWrapper animation="fade-in">
            <div className="space-y-12">
                
                {/* UNITÉ DE PRODUCTION */}
                <Card className="border-none shadow-none">
                    <CardContent className="p-0">
                        <SectionTitle>UNITÉ DE PRODUCTION</SectionTitle>
                        <ul className="space-y-2 text-lg text-foreground pl-8">
                            <li><strong>Surface :</strong> 20 000 m² dont 6 000 m² couvert</li>
                            <li><strong>Démarrage de la production :</strong> Septembre 2015</li>
                            <li><strong>Effectif :</strong> 50 employés</li>
                        </ul>
                    </CardContent>
                </Card>

                {/* PRODUITS */}
                <Card className="border-none shadow-none">
                    <CardContent className="p-0">
                        <SectionTitle>PRODUITS</SectionTitle>
                        <ul className="space-y-4 text-lg text-foreground pl-8 list-disc">
                            <li>
                                <strong>Panneaux sandwichs de couverture à 05 ondes</strong>
                                <p className="text-muted-foreground ml-4">Ép de 30 mm jusqu'au 60 mm.</p>
                            </li>
                             <li>
                                <strong>Panneaux sandwichs de Bardage à simple emboitement (M/F)</strong>
                                <p className="text-muted-foreground ml-4">Ép de 30 mm jusqu'au 60 mm.</p>
                            </li>
                            <li>
                                <strong>Panneaux sandwichs frigorifiques à simple emboitement (M/F)</strong>
                                <p className="text-muted-foreground ml-4">Ép de 80 mm jusqu'à 200 mm.</p>
                            </li>
                            <li>
                                <strong>Tôle nervurée</strong>
                                <ul className="list-[circle] pl-8 mt-2 space-y-1">
                                    <li>
                                        Tôle nervurée TN40 galvanisée ou pré-laquée
                                        <p className="text-muted-foreground ml-4">Ép de 0,5 mm jusqu'à 0,7 mm.</p>
                                    </li>
                                     <li>
                                        Tôle nervurée pour plancher collaborant (Hi-Bond 77)
                                        <p className="text-muted-foreground ml-4">Ép de 0.7mm jusqu'à 1,5mm.</p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <strong>Accessoires de finition en tôle</strong>
                                <p className="text-muted-foreground ml-4">(galvanisée ou pré-laquée) ou en PVC (pour chambres froides)</p>
                            </li>
                        </ul>
                    </CardContent>
                </Card>

                {/* CAPACITÉ DE PRODUCTION */}
                 <Card className="border-none shadow-none pt-8">
                    <CardContent className="p-0">
                       <ProductionCapacityTitle>CAPACITÉ DE PRODUCTION (EN 08 HEURES)</ProductionCapacityTitle>
                       <div className="overflow-hidden rounded-lg border">
                           <Table>
                               <TableHeader>
                                   <TableRow className="bg-accent hover:bg-accent/90">
                                       <TableHead className="text-white font-bold text-lg">Produits</TableHead>
                                       <TableHead className="text-white font-bold text-lg text-right">Par An / Par Jour</TableHead>
                                   </TableRow>
                               </TableHeader>
                               <TableBody>
                                   {productionCapacity.map((item, index) => (
                                       <TableRow key={item.product} className={cn(index % 2 === 0 ? 'bg-secondary/50' : 'bg-white')}>
                                           <TableCell className="font-medium text-base">{item.product}</TableCell>
                                           <TableCell className="text-right text-base">{item.capacity}</TableCell>
                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                       </div>
                    </CardContent>
                </Card>
            </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
