
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
import { ProductImageGallery, ProductImage } from './product-image-gallery';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-headline text-3xl font-bold text-primary mb-8">{children}</h3>
);

const SubSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h4 className="font-headline text-2xl font-bold text-primary mt-10 mb-6">{children}</h4>
);

const ProductFeature = ({ label, value }: { label: string; value: string }) => (
    <div className="flex text-lg">
        <p className="w-48 font-semibold">{label}</p>
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
        <AnimatedWrapper animation="fade-in">
            <div className="text-center mb-20">
                <h1 className="font-headline text-5xl font-bold text-primary mb-6">Panneaux Sandwichs Haute Performance</h1>
                <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                    Découvrez notre gamme complète de panneaux sandwichs pour bâtiments préfabriqués (PEB). Conçus pour offrir une isolation thermique et acoustique supérieure, nos panneaux sont la solution idéale pour les toitures, les bardages et les chambres froides. Chaque variation est conçue avec précision pour répondre aux exigences spécifiques de votre projet, garantissant durabilité, efficacité énergétique et une finition esthétique impeccable.
                </p>
            </div>
        </AnimatedWrapper>
        
        <AnimatedWrapper animation="fade-in">
          <div className="mb-24 flex flex-wrap justify-center gap-4">
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
                <Icon className={cn("mr-2 h-5 w-5", key === 'toleNervuree' && "rotate-[-90deg]")} />
                {label}
              </Button>
            ))}
          </div>
        </AnimatedWrapper>
        
        <div className="grid lg:grid-cols-3 gap-x-24 gap-y-16">
            <div className="lg:col-span-1 h-max space-y-8">
                <ProductImageGallery 
                    galleryImages={activeProduct.galleryImages}
                    implementationImages={activeProduct.implementationImages}
                />
            </div>

            <div className="lg:col-span-2 space-y-24">
              <AnimatedWrapper animation="fade-in">
                <div>
                    <h2 className="font-headline text-5xl font-bold text-accent mb-16">{activeProduct.title}</h2>
                    <Card className="border-none shadow-none p-0">
                        <CardContent className="p-0">
                            <SectionTitle>CARACTÉRISTIQUE PRODUIT</SectionTitle>
                            <div className="space-y-12 text-lg">
                                {activeProduct.features.utilisation.length > 0 &&
                                <div>
                                    <SubSectionTitle>Utilisation</SubSectionTitle>
                                    <ul className="list-disc pl-6 space-y-2">
                                        {activeProduct.features.utilisation.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>
                                }
                                {activeProduct.features.definition?.acier && 
                                <div>
                                    <SubSectionTitle>Définition</SubSectionTitle>
                                    <ProductFeature label="Identification d'acier:" value={activeProduct.features.definition.acier} />
                                    <p className="font-semibold mt-6">Parement externe:</p>
                                    <ul className="list-disc pl-8 mt-2 space-y-1">
                                        <li>{activeProduct.features.definition.parementExterne.profil}</li>
                                        {activeProduct.features.definition.parementExterne.description && <li>{activeProduct.features.definition.parementExterne.description}</li>}
                                        <li>{activeProduct.features.definition.parementExterne.epaisseur}</li>
                                    </ul>
                                    <p className="font-semibold mt-6">Parement interne:</p>
                                     <ul className="list-disc pl-8 mt-2 space-y-1">
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
                                    <p className="mb-4">{activeProduct.features.ameIsolante.type}</p>
                                     <ProductFeature label="Conductivité thermique:" value={activeProduct.features.ameIsolante.conductivite} />
                                      <ProductFeature label="Densité:" value={activeProduct.features.ameIsolante.densite} />
                                </div>}
                                { activeProduct.features.reactionAuFeu && <div>
                                    <SubSectionTitle>Réaction au feu</SubSectionTitle>
                                    <p>{activeProduct.features.reactionAuFeu}</p>
                                </div>}
                                { activeProduct.features.tolerance.length > 0 && <div>
                                    <SubSectionTitle>Tolérance sur panneaux</SubSectionTitle>
                                     <ul className="list-disc pl-6 space-y-2">
                                        {activeProduct.features.tolerance.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>}
                                { activeProduct.features.miseEnOeuvre && <div>
                                    <SubSectionTitle>{activeProduct.features.miseEnOeuvre.title}</SubSectionTitle>
                                    <p>{activeProduct.features.miseEnOeuvre.manutention}</p>
                                </div>}
                            </div>

                            <section className="mt-24">
                                <SectionTitle>TABLEAUX TECHNIQUES</SectionTitle>
                                {activeProduct.tables.isolation?.rows.length > 0 && (
                                    <div className="mb-16">
                                        <SubSectionTitle>{activeProduct.tables.isolation.title}</SubSectionTitle>
                                        <Table>
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
                                    <div className="mb-16">
                                        <SubSectionTitle>{activeProduct.tables.dimensionnement.title}</SubSectionTitle>
                                        <Table>
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
                                <div className="mb-16">
                                    <SubSectionTitle>{activeProduct.tables.chargesPortees.title}</SubSectionTitle>
                                    {activeProduct.tables.chargesPortees.subtitle && <p className="text-muted-foreground mb-4">{activeProduct.tables.chargesPortees.subtitle}</p>}
                                    <Table>
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
                                <section className="mt-24">
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
                            <section className="mt-24">
                                <SectionTitle>POSE ET ÉTANCHÉITÉ</SectionTitle>
                                <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
                                    <div className="space-y-8">
                                        <div>
                                            <SubSectionTitle>La pose de panneaux sandwichs</SubSectionTitle>
                                            <p className="font-semibold text-lg">Découpage des panneaux:</p>
                                            <p>{activeProduct.pose.decoupage}</p>
                                            <p className="font-semibold mt-4 text-lg">Fixation des panneaux:</p>
                                            <p>{activeProduct.pose.fixation}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-8">
                                        <div>
                                            <SubSectionTitle>Étanchéité des rives</SubSectionTitle>
                                            <p>{activeProduct.etancheite}</p>
                                        </div>
                                        {activeProduct.sens && <div>
                                            <SubSectionTitle>Sens des panneaux</SubSectionTitle>
                                            <p>{activeProduct.sens}</p>
                                        </div>}
                                    </div>
                                </div>
                            </section>
                            }

                        </CardContent>
                    </Card>
                </div>
              </AnimatedWrapper>
            </div>
          </div>
      </div>
    </section>
  );
}
