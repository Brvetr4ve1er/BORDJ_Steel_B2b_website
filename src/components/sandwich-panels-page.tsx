
"use client";

import Image from 'next/image';
import * as React from 'react';
import { useState } from 'react';
import { Layers, Layers2, Layers3, ChevronsRight } from 'lucide-react';
import { AnimatedWrapper } from './animated-wrapper';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { productData } from '@/config/products-data';
import { cn } from '@/lib/utils';
import { ProductImageGallery, type ProductImage } from './product-image-gallery';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-headline text-3xl font-bold text-primary mb-3">{children}</h3>
);

const SubSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h4 className="font-headline text-2xl font-bold text-primary mt-4 mb-2">{children}</h4>
);

const ProductFeature = ({ label, value }: { label: string; value: string }) => (
    <div className="flex">
        <p className="w-40 font-semibold">{label}</p>
        <p>{value}</p>
    </div>
);

export function SandwichPanelsPage() {
  const [activeProductKey, setActiveProductKey] = useState<keyof typeof productData>('couverture');
  const activeProduct = productData[activeProductKey];

  const productButtons = [
    { key: 'couverture', label: 'Panneaux de Couverture', icon: Layers },
    { key: 'bardage', label: 'Panneaux de Bardage', icon: Layers2 },
    { key: 'frigorifique', label: 'Panneaux Frigorifiques', icon: Layers3 },
    { key: 'toleNervuree', label: 'Tôle Nervurée', icon: ChevronsRight },
  ];

  return (
    <section id="product-details" className="bg-white py-20">
      <div className="container mx-auto px-4 max-w-screen-2xl">
         {/* Parent Product Section */}
        <AnimatedWrapper animation="fade-in">
          <div className="grid md:grid-cols-5 gap-8 items-center mb-16">
            <div className="md:col-span-2">
              <Card className="rounded-lg overflow-hidden shadow-lg group">
                <Image
                  src="https://images.unsplash.com/photo-1585435582425-a03999930ee74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8JTIwbWV0YWwlMjBzaGVldCUyMHBhbmVsJTIwfGVufDB8fHx8MTc1Mzg3NjYwNHww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Panneaux Sandwichs PEB"
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                  data-ai-hint="sandwich panels"
                  priority
                />
              </Card>
            </div>
            <div className="md:col-span-3">
              <h1 className="font-headline text-5xl font-bold text-primary mb-4">Panneaux Sandwichs Haute Performance</h1>
              <p className="text-lg text-muted-foreground">
                Découvrez notre gamme complète de panneaux sandwichs pour bâtiments préfabriqués (PEB). Conçus pour offrir une isolation thermique et acoustique supérieure, nos panneaux sont la solution idéale pour les toitures, les bardages et les chambres froides. Chaque variation est conçue avec précision pour répondre aux exigences spécifiques de votre projet, garantissant durabilité, efficacité énergétique et une finition esthétique impeccable.
              </p>
            </div>
          </div>
        </AnimatedWrapper>
        
        <AnimatedWrapper animation="fade-in">
          {/* Product Variation Buttons */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {productButtons.map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={activeProductKey === key ? 'destructive' : 'outline'}
                size="lg"
                className={cn(
                    "transition-all duration-300",
                    activeProductKey === key ? 'bg-accent shadow-lg' : 'bg-secondary text-primary hover:bg-accent/10'
                )}
                onClick={() => setActiveProductKey(key as keyof typeof productData)}
              >
                <Icon className={cn("mr-3 h-5 w-5", key === 'toleNervuree' && "rotate-[-90deg]")} />
                {label}
              </Button>
            ))}
          </div>
          
          <div className="grid grid-cols-10 gap-12">
            
            {/* Gallery Column */}
            <div className="col-span-3">
               <div className="lg:sticky lg:top-32">
                 <ProductImageGallery mainImage={activeProduct.image} />
               </div>
            </div>

            {/* Content Column */}
            <div className="col-span-7">
                <div className="bg-accent text-white p-4 rounded-t-lg sticky top-24 z-10">
                    <h2 className="font-headline text-4xl font-bold">{activeProduct.title}</h2>
                </div>

                <div className="relative space-y-8 p-6 bg-gray-50 rounded-b-lg">
                    <Card className="border-none shadow-none p-0">
                        <CardContent className="p-0">
                            <SectionTitle>CARACTÉRISTIQUE PRODUIT</SectionTitle>
                            <div className="space-y-4 text-base">
                                {activeProduct.features.utilisation.length > 0 &&
                                <div>
                                    <SubSectionTitle>Utilisation</SubSectionTitle>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {activeProduct.features.utilisation.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                                }
                                {activeProduct.features.definition?.acier && 
                                <div>
                                    <SubSectionTitle>Définition</SubSectionTitle>
                                    <ProductFeature label="Identification d'acier:" value={activeProduct.features.definition.acier} />
                                    <p className="font-semibold mt-2">Parement externe:</p>
                                    <ul className="list-disc pl-8">
                                        <li>{activeProduct.features.definition.parementExterne.profil}</li>
                                        {activeProduct.features.definition.parementExterne.description && <li>{activeProduct.features.definition.parementExterne.description}</li>}
                                        <li>{activeProduct.features.definition.parementExterne.epaisseur}</li>
                                    </ul>
                                    <p className="font-semibold mt-2">Parement interne:</p>
                                     <ul className="list-disc pl-8">
                                        <li>{activeProduct.features.definition.parementInterne.profil}</li>
                                        <li>{activeProduct.features.definition.parementInterne.epaisseur}</li>
                                    </ul>
                                </div>
                                }
                                {activeProduct.features.revetement && <div>
                                    <SubSectionTitle>Revêtement</SubSectionTitle>
                                    <p>{activeProduct.features.revetement}</p>
                                </div>}
                                 { activeProduct.features.ameIsolante.type && <div>
                                    <SubSectionTitle>Ame isolante</SubSectionTitle>
                                    <p>{activeProduct.features.ameIsolante.type}</p>
                                     <ProductFeature label="Conductivité thermique:" value={activeProduct.features.ameIsolante.conductivite} />
                                      <ProductFeature label="Densité:" value={activeProduct.features.ameIsolante.densite} />
                                </div>}
                                { activeProduct.features.reactionAuFeu && <div>
                                    <SubSectionTitle>Réaction au feu</SubSectionTitle>
                                    <p>{activeProduct.features.reactionAuFeu}</p>
                                </div>}
                                { activeProduct.features.tolerance.length > 0 && <div>
                                    <SubSectionTitle>Tolérance sur panneaux</SubSectionTitle>
                                     <ul className="list-disc pl-5 space-y-1">
                                        {activeProduct.features.tolerance.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>}
                                { activeProduct.features.miseEnOeuvre && <div>
                                    <SubSectionTitle>{activeProduct.features.miseEnOeuvre.title}</SubSectionTitle>
                                    <p>{activeProduct.features.miseEnOeuvre.manutention}</p>
                                </div>}
                            </div>

                            <section className="mt-8">
                                <SectionTitle>TABLEAUX TECHNIQUES</SectionTitle>
                                {activeProduct.tables.isolation?.rows.length > 0 && (
                                    <div className="mb-8">
                                        <SubSectionTitle>{activeProduct.tables.isolation.title}</SubSectionTitle>
                                        <Table className="text-base">
                                            <TableHeader>
                                                <TableRow className="bg-accent/10">
                                                    {activeProduct.tables.isolation.headers.map(h => <TableHead key={h} className="text-accent font-bold">{h}</TableHead>)}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {activeProduct.tables.isolation.rows.map((row, i) => (
                                                    <TableRow key={i}>
                                                        {activeProduct.tables.isolation.headers.map(h => <TableCell key={h}>{row[h as keyof typeof row]}</TableCell>)}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                                {activeProduct.tables.dimensionnement?.rows.length > 0 && (
                                    <div className="mb-8">
                                        <SubSectionTitle>{activeProduct.tables.dimensionnement.title}</SubSectionTitle>
                                        <Table className="text-base">
                                            <TableHeader>
                                                <TableRow className="bg-accent/10">
                                                    {activeProduct.tables.dimensionnement.headers.map(h => <TableHead key={h} className="text-accent font-bold">{h}</TableHead>)}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {activeProductKey === 'toleNervuree' ? (
                                                   activeProduct.tables.dimensionnement.rows.map((row: any, i) => (
                                                        row.details.map((detail: any, j: number) => (
                                                            <TableRow key={`${i}-${j}`}>
                                                                {j === 0 && <TableCell rowSpan={row.details.length} className="align-middle">{row.type}</TableCell>}
                                                                {j === 0 && <TableCell rowSpan={row.details.length} className="align-middle">{row.longueur}</TableCell>}
                                                                {j === 0 && <TableCell rowSpan={row.details.length} className="align-middle">{row.largeur}</TableCell>}
                                                                <TableCell>{detail.epaisseur}</TableCell>
                                                                <TableCell>{detail.poids}</TableCell>
                                                                <TableCell>{detail.j}</TableCell>
                                                                <TableCell>{detail.w}</TableCell>
                                                                <TableCell>{detail.systeme}</TableCell>
                                                            </TableRow>
                                                        ))
                                                    ))
                                                ) : (
                                                    activeProduct.tables.dimensionnement.rows.map((row, i) => (
                                                        <TableRow key={i}>
                                                            {activeProduct.tables.dimensionnement.headers.map(h => <TableCell key={h}>{row[h as keyof typeof row]}</TableCell>)}
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                )}
                                {activeProduct.tables.chargesPortees && activeProduct.tables.chargesPortees.rows.length > 0 && (
                                <div className="mb-8">
                                    <SubSectionTitle>{activeProduct.tables.chargesPortees.title}</SubSectionTitle>
                                    {activeProduct.tables.chargesPortees.subtitle && <p className="text-base text-muted-foreground mb-2">{activeProduct.tables.chargesPortees.subtitle}</p>}
                                    <Table className="text-base">
                                        <TableHeader>
                                            <TableRow className="bg-accent/10">
                                                {activeProduct.tables.chargesPortees.headers.map((h, i) => (
                                                    <TableHead key={i} colSpan={h.colspan} className="text-accent font-bold text-center">{h.title}</TableHead>
                                                ))}
                                            </TableRow>
                                            {activeProduct.tables.chargesPortees.subheaders && activeProduct.tables.chargesPortees.subheaders.length > 0 && (
                                                <TableRow className="bg-accent/10">
                                                    {activeProduct.tables.chargesPortees.subheaders.map((sh, i) => (
                                                        <TableHead key={i} className="text-accent font-bold text-center">{sh}</TableHead>
                                                    ))}
                                                </TableRow>
                                            )}
                                        </TableHeader>
                                        <TableBody>
                                            {activeProduct.tables.chargesPortees.rows.map((row: any, i) => (
                                                <TableRow key={i}>
                                                {activeProduct.tables.chargesPortees.subheaders ? 
                                                    activeProduct.tables.chargesPortees.subheaders.map((sh, j) => {
                                                        let key = sh;
                                                        if (activeProductKey === 'couverture' || activeProductKey === 'frigorifique') {
                                                            const keys = Object.keys(row);
                                                            key = keys[j];
                                                        }
                                                        if(activeProductKey === 'toleNervuree'){
                                                            const key = activeProduct.tables.chargesPortees.subheaders[j];
                                                            if (j === 0) return <TableCell key={j} className="text-center font-semibold">{row.type} | {row.epaisseur}</TableCell>;
                                                            return <TableCell key={j} className="text-center">{row[key]}</TableCell>
                                                        }
                                                        return <TableCell key={j} className="text-center">{row[key]}</TableCell>
                                                    })
                                                    :
                                                    Object.values(row).map((cell: any, j: number) => (
                                                        <TableCell key={j} className="text-center">{cell}</TableCell>
                                                    ))
                                                }
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            )}
                            </section>
                            
                            {activeProduct.features.caracteristiquesGeometriques && (
                                <section className="mt-8">
                                    <SectionTitle>{activeProduct.features.caracteristiquesGeometriques.title}</SectionTitle>
                                    <Image 
                                        src={activeProduct.features.caracteristiquesGeometriques.image.src}
                                        alt={activeProduct.features.caracteristiquesGeometriques.title}
                                        width={800}
                                        height={200}
                                        className="w-full object-contain"
                                        data-ai-hint={activeProduct.features.caracteristiquesGeometriques.image.aiHint}
                                    />
                                </section>
                            )}

                            {activeProduct.pose?.decoupage && 
                             <section className="mt-8">
                                <SectionTitle>POSE ET ÉTANCHÉITÉ</SectionTitle>
                                <div className="space-y-4 text-base">
                                    <div>
                                        <SubSectionTitle>La pose de panneaux sandwichs</SubSectionTitle>
                                        <p className="font-semibold">Découpage des panneaux:</p>
                                        <p>{activeProduct.pose.decoupage}</p>
                                        <p className="font-semibold mt-2">Fixation des panneaux:</p>
                                        <p>{activeProduct.pose.fixation}</p>
                                    </div>
                                     <div>
                                        <SubSectionTitle>Étanchéité des rives</SubSectionTitle>
                                        <p>{activeProduct.etancheite}</p>
                                    </div>
                                     {activeProduct.sens && <div>
                                        <SubSectionTitle>Sens des panneaux</SubSectionTitle>
                                        <p>{activeProduct.sens}</p>
                                    </div>}
                                </div>
                            </section>
                            }
                        </CardContent>
                    </Card>
                </div>
            </div>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
