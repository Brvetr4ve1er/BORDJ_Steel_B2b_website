
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from './ui/table';

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
  
  const generalSpecs = [
    { characteristic: 'Largeur utile', value: '1000 mm' },
    { characteristic: 'Longueur', value: 'Sur mesure, jusqu\'à 13 mètres' },
    { characteristic: 'Densité de la mousse', value: '40-42 kg/m³ (PUR/PIR)' },
    { characteristic: 'Classement au feu (PIR)', value: 'B-s2, d0' }
  ];

  const thermalSpecs = [
    { thickness: '30', uValue: '0.74', weight: '9.8' },
    { thickness: '40', uValue: '0.56', weight: '10.2' },
    { thickness: '50', uValue: '0.45', weight: '10.6' },
    { thickness: '60', uValue: '0.38', weight: '11.0' },
    { thickness: '80', uValue: '0.29', weight: '11.8' },
    { thickness: '100', uValue: '0.23', weight: '12.6' },
    { thickness: '120', uValue: '0.19', weight: '13.4' },
    { thickness: '150', uValue: '0.15', weight: '14.6' },
    { thickness: '200', uValue: '0.12', weight: '16.6' }
  ];

  return (
    <section id="product-details" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
            <AnimatedWrapper animation="zoom-in">
                <div className="sticky top-32 space-y-8">
                    <Card className="overflow-hidden shadow-2xl group">
                        <div className="relative aspect-video">
                            <Image
                                src={product.image.src}
                                alt={product.title}
                                layout="fill"
                                objectFit="cover"
                                className="transition-transform duration-500 group-hover:scale-110"
                                data-ai-hint={product.image.aiHint}
                            />
                        </div>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Description Détaillée</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-muted-foreground">
                             <p>
                                Nos panneaux sandwichs pour bâtiments préfabriqués (PEB) sont conçus pour offrir une performance d'isolation supérieure, une installation rapide et une durabilité exceptionnelle. Ils constituent une solution idéale pour les toitures et les bardages de bâtiments industriels, commerciaux et agricoles.
                            </p>
                            <p>
                                **Composition :** Chaque panneau est composé de deux parements en acier galvanisé et pré-laqué, adhérant à une âme isolante en mousse de polyuréthane (PUR) ou polyisocyanurate (PIR) de haute densité. Cette structure composite garantit une excellente rigidité et une résistance mécanique élevée.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </AnimatedWrapper>
            <AnimatedWrapper animation="slide-up">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline text-5xl font-bold text-primary">{product.title} PEB</CardTitle>
                            <CardDescription className="text-xl">{product.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>**Isolation Thermique et Acoustique :** Minimise les ponts thermiques et réduit la transmission du bruit.</li>
                                <li>**Légèreté et Rapidité de Pose :** Faible poids pour une manipulation et une construction accélérées.</li>
                                <li>**Étanchéité Parfaite :** Système d'emboîtement précis pour une protection contre les intempéries.</li>
                                <li>**Esthétique Moderne :** Large gamme de couleurs et de finitions pour des façades personnalisées.</li>
                            </ul>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                           <CardTitle>Spécifications Techniques</CardTitle>
                           <CardDescription>Informations techniques générales sur nos panneaux sandwichs.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Table>
                               <TableHeader>
                                   <TableRow>
                                       <TableHead>Caractéristique</TableHead>
                                       <TableHead className="text-right">Valeur</TableHead>
                                   </TableRow>
                               </TableHeader>
                               <TableBody>
                                   {generalSpecs.map(spec => (
                                       <TableRow key={spec.characteristic}>
                                           <TableCell className="font-medium">{spec.characteristic}</TableCell>
                                           <TableCell className="text-right">{spec.value}</TableCell>
                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                           <CardTitle>Propriétés Thermiques et Physiques</CardTitle>
                            <CardDescription>Données techniques par épaisseur de panneau.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <Table>
                               <TableCaption>Contactez-nous pour des spécifications plus détaillées.</TableCaption>
                               <TableHeader>
                                   <TableRow>
                                       <TableHead>Épaisseur (mm)</TableHead>
                                       <TableHead>Coef. U (W/m².K)</TableHead>
                                       <TableHead className="text-right">Poids (kg/m²)</TableHead>
                                   </TableRow>
                               </TableHeader>
                               <TableBody>
                                   {thermalSpecs.map(spec => (
                                       <TableRow key={spec.thickness}>
                                           <TableCell className="font-medium">{spec.thickness}</TableCell>
                                           <TableCell>{spec.uValue}</TableCell>
                                           <TableCell className="text-right">{spec.weight}</TableCell>
                                       </TableRow>
                                   ))}
                               </TableBody>
                           </Table>
                        </CardContent>
                    </Card>
                </div>
            </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}