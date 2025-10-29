

"use client";

import Image from 'next/image';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { ChevronsRight, Snowflake, Pilcrow, Settings, ArrowRight } from 'lucide-react';
import { AnimatedWrapper } from './animated-wrapper';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { productData } from '@/config/products-data';
import { cn } from '@/lib/utils';
import type { ProductImage } from './product-image-gallery';
import images from '@/app/lib/placeholder-images.json';
import dynamic from 'next/dynamic';
import { ScrollArea } from './ui/scroll-area';
import { DownloadButton } from './ui/download-button';

const ProductImageGallery = dynamic(() => import('./product-image-gallery').then(mod => mod.ProductImageGallery));

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="font-headline text-3xl font-bold text-primary mb-8">{children}</h3>
);

const SubSectionTitle = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <h4 className={cn("font-headline text-2xl font-bold text-primary mt-10 mb-6", className)}>{children}</h4>
);

const ProductFeature = ({ label, value }: { label: string; value: string }) => (
    <div className="flex text-lg">
        <p className="w-48 font-semibold">{label}</p>
        <p>{value}</p>
    </div>
);

const CouvertureIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const BardageIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3ZM19 5V7H5V5H19ZM5 19V9H19V19H5Z" />
      <path d="M7 11H9V13H7V11Z" />
      <path d="M11 11H13V13H11V11Z" />
      <path d="M15 11H17V13H15V11Z" />
      <path d="M7 15H9V17H7V15Z" />
      <path d="M11 15H13V17H11V15Z" />
      <path d="M15 15H17V17H15V15Z" />
    </svg>
);

const FrigorifiqueIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Snowflake {...props} />
);

const HibondIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 3L8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 3L12 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 3L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 3L20 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 15L7 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 15L11 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15L15 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 15L19 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FinitionsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Settings {...props} />
);

function BardageProduct({ product }: { product: any }) {
    const specs = product.productSpecifications;
    const charges = product.chargesEtPorteesAdmissibles;
    const coeff = specs.coefficientIsolationThermique.table;
    const dims = specs.dimensionnementDuPanneau.table.data;
    const chargesRows = charges.tableData;
  
    return (
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-6 space-y-4">
          <h2 className="text-lg font-bold text-primary">{specs.title}</h2>
  
          <div>
            <h3 className="font-semibold">{specs.utilisation.heading}</h3>
            <p className="text-sm mt-1">{specs.utilisation.description}</p>
            <ul className="list-disc ml-5 mt-2 text-sm">
              {specs.utilisation.applications.map((a: string, i: number) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>
  
          <div>
            <h3 className="font-semibold mt-3">{specs.definition.heading}</h3>
            <div className="text-sm mt-1 space-y-1">
              {specs.definition.specifications.map((s: any, i: number) => (
                <p key={i}><strong>{s.parameter}:</strong> {s.value}</p>
              ))}
            </div>
          </div>
  
          <div>
            <h3 className="font-semibold mt-3">{specs.revetement.heading}</h3>
            <ul className="list-disc ml-5 mt-1 text-sm">
              {specs.revetement.specifications.map((r: any, i: number) => (
                <li key={i}>{r.material}</li>
              ))}
            </ul>
          </div>
  
          <div>
            <h3 className="font-semibold mt-3">{specs.ameIsolante.heading}</h3>
            <p className="text-sm mt-1">{specs.ameIsolante.type}</p>
          </div>
  
          <div>
            <h3 className="font-semibold mt-3">Caractéristiques techniques</h3>
            <ul className="mt-1 text-sm space-y-1">
              <li><strong>{specs.caracteristiquesTechniques.conductiviteThermique.label}:</strong> {specs.caracteristiquesTechniques.conductiviteThermique.value}</li>
              <li><strong>{specs.caracteristiquesTechniques.densite.label}:</strong> {specs.caracteristiquesTechniques.densite.value}</li>
              <li><strong>{specs.caracteristiquesTechniques.reactionAuFeu.label}:</strong>
                <ul className="list-disc ml-5 mt-1">
                  {specs.caracteristiquesTechniques.reactionAuFeu.classifications.map((c: string, i: number) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
  
          <div>
            <h3 className="font-semibold mt-3">{specs.tolerance.heading}</h3>
            <ul className="mt-1 text-sm list-disc ml-5">
              {specs.tolerance.tolerances.map((t: any, i: number) => (
                <li key={i}><strong>{t.parameter}:</strong> {t.value}</li>
              ))}
            </ul>
          </div>
  
          <div className="mt-4 p-4 border rounded">
            <h4 className="font-semibold">{specs.coefficientIsolationThermique.heading}</h4>
            <div className="overflow-auto mt-2">
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent text-accent-foreground">
                    <TableHead className="text-accent-foreground">Épaisseur (mm)</TableHead>
                    {coeff.headers.epaisseur_mm.map((h: number) => (
                      <TableHead key={h} className="text-accent-foreground text-center">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {specs.coefficientIsolationThermique.table.data.map((row: any, idx: number) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{row.unit}</TableCell>
                      {coeff.headers.epaisseur_mm.map((h: number) => (
                        <TableCell key={h} className="text-center">{row.values[h]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
  
          <div className="mt-4 p-4 border rounded">
            <h4 className="font-semibold">{specs.dimensionnementDuPanneau.heading}</h4>
            <div className="overflow-auto mt-2">
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent text-accent-foreground">
                    {specs.dimensionnementDuPanneau.table.headers.map((h: string) => (
                      <TableHead key={h} className="text-accent-foreground">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {dims.map((r: any) => (
                    <TableRow key={r.type}>
                      <TableCell>{r.type}</TableCell>
                      <TableCell className="text-center">{r.longueur_mm}</TableCell>
                      <TableCell className="text-center">{r.largeur_utile_mm}</TableCell>
                      <TableCell className="text-center">{r.epaisseur_mm}</TableCell>
                      <TableCell className="text-center">{r.poids_kg_m2}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </section>
  
        <aside className="lg:col-span-6 space-y-4">
          <div className="p-4 border rounded">
            <h3 className="font-semibold">{product.installationInformation.etancheiteDesRives.heading}</h3>
            <div className="text-sm mt-2 space-y-2">
              {product.installationInformation.etancheiteDesRives.paragraphs.map((p: string, i: number) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
  
          <div className="p-4 border rounded">
            <h3 className="font-semibold">{charges.title}</h3>
            <p className="text-xs text-gray-600">{charges.subtitle}</p>
            <div className="mt-3 overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent text-accent-foreground">
                    <TableHead className="text-accent-foreground" rowSpan={2}>{charges.tableStructure.mainHeaders.col1}</TableHead>
                    <TableHead className="text-accent-foreground" rowSpan={2}>{charges.tableStructure.mainHeaders.col2}</TableHead>
                    <TableHead className="text-accent-foreground text-center" colSpan={charges.tableStructure.subHeaders.epaisseurGroup1.length}>{charges.tableStructure.subHeaders.epaisseurGroup1Label}</TableHead>
                    <TableHead className="text-accent-foreground text-center" colSpan={charges.tableStructure.subHeaders.epaisseurGroup2.length}>{charges.tableStructure.subHeaders.epaisseurGroup2Label}</TableHead>
                  </TableRow>
                  <TableRow className="bg-secondary text-secondary-foreground">
                    {charges.tableStructure.subHeaders.epaisseurGroup1.map((h: number) => (
                      <TableHead key={`g1-${h}`} className="text-secondary-foreground text-center">{h}</TableHead>
                    ))}
                    {charges.tableStructure.subHeaders.epaisseurGroup2.map((h: number) => (
                      <TableHead key={`g2-${h}`} className="text-secondary-foreground text-center">{h}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {chargesRows.map((row: any, idx: number) => (
                    <TableRow key={row.kg_m2}>
                      <TableCell>{row.kg_m2}</TableCell>
                      <TableCell>{row.dan_m2}</TableCell>
                      {Object.keys(row.entraxeGroup1).map((k) => (
                        <TableCell key={k} className="text-center">{row.entraxeGroup1[k]}</TableCell>
                      ))}
                      {Object.keys(row.entraxeGroup2).map((k) => (
                        <TableCell key={k} className="text-center">{row.entraxeGroup2[k]}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
  
          <div className="p-4 border rounded">
            <h3 className="font-semibold">{product.caracteristiquesGeometriques.title}</h3>
            <div className="mt-2 space-y-3 text-sm">
              {product.caracteristiquesGeometriques.diagrams.map((d: any, i: number) => (
                <figure key={i} className="border p-2 text-center">
                  <div className="h-28 bg-gray-50 flex items-center justify-center font-mono text-gray-400">Schéma: {d.caption}</div>
                  <figcaption className="text-xs text-gray-600 mt-1">{d.description}</figcaption>
                </figure>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">{product.caracteristiquesGeometriques.notes}</p>
          </div>
        </aside>
      </div>
    );
  }

function CouvertureProductTables({ product }: { product: any }) {
    if (!product.tables) return null;
    return (
        <>
            {product.tables.isolation?.rows?.length > 0 && (
                <div className="mb-16">
                    <SubSectionTitle>{product.tables.isolation.title}</SubSectionTitle>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                                {product.tables.isolation.headers.map((h: string) => <TableHead key={h} className="text-accent font-bold">{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product.tables.isolation.rows.map((row: any, i: number) => (
                                <TableRow key={i}>
                                    {product.tables.isolation.headers.map((h: string) => <TableCell key={h}>{row[h as keyof typeof row] ?? ''}</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {product.tables.dimensionnement?.rows?.length > 0 && (
                <div className="mb-16">
                    <SubSectionTitle>{product.tables.dimensionnement.title}</SubSectionTitle>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                                {product.tables.dimensionnement.headers.map((h: string) => <TableHead key={h} className="text-accent font-bold">{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product.tables.dimensionnement.rows.map((row: any, i: number) => (
                                <TableRow key={i}>
                                    {product.tables.dimensionnement.headers.map((h: string) => <TableCell key={h}>{row[h as keyof typeof row] ?? ''}</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {product.tables.chargesPortees?.rows?.length > 0 && (
                <div className="mb-16">
                    <h5 className="font-headline text-xl font-semibold text-primary mb-2">{product.tables.chargesPortees.title}</h5>
                    <p className="text-sm text-muted-foreground mb-4">{product.tables.chargesPortees.subtitle}</p>
                    <Table>
                        <TableHeader>
                           <TableRow className="bg-accent/10">
                                {product.tables.chargesPortees.headers.map((header: any, index: number) => (
                                    <TableHead key={index} colSpan={header.colspan} className="text-accent font-bold text-center">{header.title}</TableHead>
                                ))}
                            </TableRow>
                            <TableRow className="bg-accent/10">
                                {product.tables.chargesPortees.subheaders.map((sub: string, index: number) => (
                                     <TableHead key={index} className="text-accent font-bold text-center">{sub}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product.tables.chargesPortees.rows.map((row: any, i: number) => (
                                <TableRow key={i}>
                                    <TableCell>{row['Kg/m²']}</TableCell>
                                    <TableCell>{row['daN/m²']}</TableCell>
                                    <TableCell className="text-center">{row['30']}</TableCell>
                                    <TableCell className="text-center">{row['35']}</TableCell>
                                    <TableCell className="text-center">{row['40']}</TableCell>
                                    <TableCell className="text-center">{row['60']}</TableCell>
                                    <TableCell className="text-center">{row['30_3app']}</TableCell>
                                    <TableCell className="text-center">{row['35_3app']}</TableCell>
                                    <TableCell className="text-center">{row['40_3app']}</TableCell>
                                    <TableCell className="text-center">{row['60_3app']}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </>
    );
}

function BardageProductTables({ product }: { product: any }) {
    if (!product.tables) return null;
    return (
        <>
            {product.tables.isolation?.rows?.length > 0 && (
                <div className="mb-16">
                    <SubSectionTitle>{product.tables.isolation.title}</SubSectionTitle>
                     <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                                {product.tables.isolation.headers.map((h: string) => <TableHead key={h} className="text-accent font-bold">{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product.tables.isolation.rows.map((row: any, i: number) => (
                                <TableRow key={i}>
                                    {product.tables.isolation.headers.map((h: string) => <TableCell key={h}>{row[h as keyof typeof row] ?? ''}</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {product.tables.dimensionnement?.rows?.length > 0 && (
                <div className="mb-16">
                    <SubSectionTitle>{product.tables.dimensionnement.title}</SubSectionTitle>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                                {product.tables.dimensionnement.headers.map((h: string) => <TableHead key={h} className="text-accent font-bold">{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product.tables.dimensionnement.rows.map((row: any, i: number) => (
                                <TableRow key={i}>
                                    {product.tables.dimensionnement.headers.map((h: string) => <TableCell key={h}>{row[h as keyof typeof row] ?? ''}</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {(product.tables.chargesPortees as any)?.rows?.length > 0 && (
                <div className="mb-16">
                    <h5 className="font-headline text-xl font-semibold text-primary mb-2">{product.tables.chargesPortees.title}</h5>
                    <p className="text-sm text-muted-foreground mb-4">{product.tables.chargesPortees.subtitle}</p>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                                <TableHead className="text-accent font-bold" rowSpan={2}>Épaisseur (mm)</TableHead>
                                {product.tables.chargesPortees.headers.slice(1).map((header: any, index: number) => (
                                    <TableHead key={index} colSpan={header.colspan} className="text-accent font-bold text-center">{header.title}</TableHead>
                                ))}
                            </TableRow>
                            <TableRow className="bg-accent/10">
                                {product.tables.chargesPortees.subheaders.slice(1).map((sub: string, index: number) => (
                                     <TableHead key={index} className="text-accent font-bold text-center">{sub}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product.tables.chargesPortees.rows.map((row: any, i: number) => (
                                <TableRow key={i}>
                                    <TableCell>{row['Épaisseur (mm)']}</TableCell>
                                    <TableCell className="text-center">{row['40']}</TableCell>
                                    <TableCell className="text-center">{row['60']}</TableCell>
                                    <TableCell className="text-center">{row['80']}</TableCell>
                                    <TableCell className="text-center">{row['100']}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </>
    );
}
function FrigorifiqueProductTables({ product }: { product: any }) {
    if (!product.tables) return null;
    return (
        <>
            {product.tables.isolation?.rows?.length > 0 && (
                <div className="mb-16">
                    <SubSectionTitle>{product.tables.isolation.title}</SubSectionTitle>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                                {product.tables.isolation.headers.map((h: string) => <TableHead key={h} className="text-accent font-bold">{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product.tables.isolation.rows.map((row: any, i: number) => (
                                <TableRow key={i}>
                                    {product.tables.isolation.headers.map((h: string) => <TableCell key={h}>{row[h as keyof typeof row] ?? ''}</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {product.tables.dimensionnement?.rows?.length > 0 && (
                <div className="mb-16">
                    <SubSectionTitle>{product.tables.dimensionnement.title}</SubSectionTitle>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                                {product.tables.dimensionnement.headers.map((h: string) => <TableHead key={h} className="text-accent font-bold">{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product.tables.dimensionnement.rows.map((row: any, i: number) => (
                                <TableRow key={i}>
                                    {product.tables.dimensionnement.headers.map((h: string) => <TableCell key={h}>{row[h as keyof typeof row] ?? ''}</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {product.tables.chargesPortees?.rows?.length > 0 && (
                <div className="mb-16">
                    <h5 className="font-headline text-xl font-semibold text-primary mb-2">{product.tables.chargesPortees.title}</h5>
                    <p className="text-sm text-muted-foreground mb-4">{product.tables.chargesPortees.subtitle}</p>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                                {product.tables.chargesPortees.headers.map((header: any, index: number) => (
                                    <TableHead key={index} colSpan={header.colspan} className="text-accent font-bold text-center">{header.title}</TableHead>
                                ))}
                            </TableRow>
                            <TableRow className="bg-accent/10">
                                {product.tables.chargesPortees.subheaders.map((sub: string, index: number) => (
                                     <TableHead key={index} className="text-accent font-bold text-center">{sub}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                         <TableBody>
                            {product.tables.chargesPortees.rows.map((row: any, i: number) => (
                                <TableRow key={i}>
                                    <TableCell>{row['Kg/m²']}</TableCell>
                                    <TableCell>{row['daN/m²']}</TableCell>
                                    <TableCell className="text-center">{row['80']}</TableCell>
                                    <TableCell className="text-center">{row['100']}</TableCell>
                                    <TableCell className="text-center">{row['120']}</TableCell>
                                    <TableCell className="text-center">{row['150']}</TableCell>
                                    <TableCell className="text-center">{row['180']}</TableCell>
                                    <TableCell className="text-center">{row['200']}</TableCell>
                                    <TableCell className="text-center">{row['80_3app']}</TableCell>
                                    <TableCell className="text-center">{row['100_3app']}</TableCell>
                                    <TableCell className="text-center">{row['120_3app']}</TableCell>
                                    <TableCell className="text-center">{row['150_3app']}</TableCell>
                                    <TableCell className="text-center">{row['180_3app']}</TableCell>
                                    <TableCell className="text-center">{row['200_3app']}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </>
    );
}

function ToleNervureeProductTables({ product }: { product: any }) {
    if (!product.tables) return null;
    return (
        <>
            {product.tables.dimensionnement?.rows?.length > 0 && (
                <div className="mb-16">
                    <SubSectionTitle>{product.tables.dimensionnement.title}</SubSectionTitle>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                                {product.tables.dimensionnement.headers.map((h: string) => <TableHead key={h} className="text-accent font-bold">{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product.tables.dimensionnement.rows.map((row: any, i: number) => (
                                row.details && Array.isArray(row.details) && row.details.map((detail: any, j: number) => (
                                    <TableRow key={`${i}-${j}`}>
                                        {j === 0 && <TableCell rowSpan={row.details.length} className="align-middle">{row['Type']}</TableCell>}
                                        {j === 0 && <TableCell rowSpan={row.details.length} className="align-middle">{row['Longueur (ml)']}</TableCell>}
                                        {j === 0 && <TableCell rowSpan={row.details.length} className="align-middle">{row['Largueur standard (mm)']}</TableCell>}
                                        <TableCell>{detail['Epaisseurs (mm)']}</TableCell>
                                        <TableCell>{detail['Poids (kg/m2)']}</TableCell>
                                        <TableCell>{detail['j']}</TableCell>
                                        <TableCell>{detail['w']}</TableCell>
                                        {j === 0 && <TableCell rowSpan={row.details.length} className="align-middle">{detail['Système de revêtement']}</TableCell>}
                                    </TableRow>
                                ))
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {product.tables.chargesPortees?.rows?.length > 0 && (
                <div className="mb-16">
                    <h5 className="font-headline text-xl font-semibold text-primary mb-2">{product.tables.chargesPortees.title}</h5>
                    <Table>
                        <TableHeader>
                           <TableRow className="bg-accent/10">
                               <TableHead className="text-accent font-bold">Portée (m)</TableHead>
                               <TableHead className="text-accent font-bold">Support</TableHead>
                               <TableHead className="text-accent font-bold">Ép (mm)</TableHead>
                               {(product.tables.chargesPortees.porteeValues_m || []).map((h: number) => (
                                   <TableHead key={h} className="text-accent font-bold text-center">{h.toFixed(2)}</TableHead>
                               ))}
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                        {product.tables.chargesPortees.rows.map((row: any, i: number) => (
                            <TableRow key={i}>
                                <TableCell>{row.epaisseur}</TableCell>
                                <TableCell>{row.nbEspacement}</TableCell>
                                <TableCell>{row.cas}</TableCell>
                                {row.values.map((val: number, j: number) => (
                                    <TableCell key={j} className="text-center">{val.toFixed(2)}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {product.tables.proprietes?.rows?.length > 0 && (
                <div className="mb-16">
                    <SubSectionTitle>{product.tables.proprietes.title}</SubSectionTitle>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                            {product.tables.proprietes.headers.map((h: string, i: number) => (
                                <TableHead key={i} colSpan={product.tables.proprietes.subheaders[h]?.length || 1} className="text-accent font-bold text-center">{h}</TableHead>
                            ))}
                            </TableRow>
                            <TableRow className="bg-accent/10">
                                <TableHead className="text-accent font-bold">ÉP</TableHead>
                                <TableHead className="text-accent font-bold">Poids-Kg/m</TableHead>
                                {Object.values(product.tables.proprietes.subheaders).flat().map((sh: any, i: number) => (
                                    <TableHead key={i} className="text-accent font-bold text-center">{sh}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {product.tables.proprietes.rows.map((row: any, i: number) => (
                            <TableRow key={i}>
                                <TableCell>{row['ÉP']}</TableCell>
                                <TableCell>{row['Poids-Kg/m']}</TableCell>
                                {Object.keys(product.tables.proprietes.subheaders).map(headerKey => 
                                    Object.keys(row[headerKey] ?? {}).map((subKey, j) => (
                                        <TableCell key={`${headerKey}-${j}`} className="text-center">{row[headerKey]?.[subKey] ?? ''}</TableCell>
                                    ))
                                )}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </>
    );
}

function HibondProductTables({ product }: { product: any }) {
    if (!product.tables) return null;
    return (
        <>
           {product.tables.dimensionnement?.rows?.length > 0 && (
                <div className="mb-16">
                    <SubSectionTitle>{product.tables.dimensionnement.title}</SubSectionTitle>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                                {product.tables.dimensionnement.headers.map((h: string) => <TableHead key={h} className="text-accent font-bold">{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {product.tables.dimensionnement.rows.map((row: any, i: number) => (
                                row.epaisseurs && Array.isArray(row.epaisseurs) && row.epaisseurs.map((epaisseur: any, j: number) => (
                                    <TableRow key={`${i}-${j}`}>
                                        {j === 0 && <TableCell rowSpan={row.epaisseurs.length} className="align-middle">{row['type']}</TableCell>}
                                        {j === 0 && <TableCell rowSpan={row.epaisseurs.length} className="align-middle">{row['longueur']}</TableCell>}
                                        {j === 0 && <TableCell rowSpan={row.epaisseurs.length} className="align-middle">{row['largeur_standard']}</TableCell>}
                                        <TableCell>{epaisseur['valeur_mm']}</TableCell>
                                        <TableCell>{epaisseur['poids_kg_m2']}</TableCell>
                                        {j === 0 && <TableCell rowSpan={row.epaisseurs.length} className="align-middle">{row['revetement_systeme']}</TableCell>}
                                    </TableRow>
                                ))
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {product.tables.proprietes?.rows?.length > 0 && (
                <div className="mb-16">
                    <SubSectionTitle>{product.tables.proprietes.title}</SubSectionTitle>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                            {product.tables.proprietes.headers.map((h: string, i: number) => (
                                <TableHead key={i} colSpan={product.tables.proprietes.subheaders[h]?.length || 1} className="text-accent font-bold text-center">{h}</TableHead>
                            ))}
                            </TableRow>
                            <TableRow className="bg-accent/10">
                                {Object.values(product.tables.proprietes.subheaders).flat().map((sh: any, i: number) => (
                                    <TableHead key={i} className="text-accent font-bold text-center">{sh}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {product.tables.proprietes.rows.map((row: any, i: number) => (
                            <TableRow key={i}>
                                <TableCell>{row.epaisseur}</TableCell>
                                <TableCell>{row.poids}</TableCell>
                                {Object.keys(product.tables.proprietes.subheaders).map(headerKey => 
                                    Object.keys(row[headerKey.toLowerCase().replace(/ /g,'_')] ?? {}).map((subKey, j) => (
                                        <TableCell key={`${headerKey}-${j}`} className="text-center">{row[headerKey.toLowerCase().replace(/ /g,'_')][subKey] ?? ''}</TableCell>
                                    ))
                                )}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            )}
            {product.tables.chargesPortees?.rows?.length > 0 && (
                 <div className="mb-16">
                    <h5 className="font-headline text-xl font-semibold text-primary mb-2">{product.tables.chargesPortees.table_title}</h5>
                    <Table>
                        <TableHeader>
                           <TableRow className="bg-accent/10">
                               <TableHead className="text-accent font-bold">Ép (mm)</TableHead>
                               <TableHead className="text-accent font-bold">Nb. Espacement</TableHead>
                               <TableHead className="text-accent font-bold">Cas</TableHead>
                               {(product.tables.chargesPortees.espacements_header || []).map((h: number) => (
                                   <TableHead key={h} className="text-accent font-bold text-center">{h.toFixed(2)}</TableHead>
                               ))}
                           </TableRow>
                        </TableHeader>
                        <TableBody>
                        {product.tables.chargesPortees.rows.map((row: any, i: number) => (
                            <TableRow key={i}>
                                <TableCell>{row.epaisseur_mm}</TableCell>
                                <TableCell>{row.nombre_espacement}</TableCell>
                                <TableCell>{row.cas}</TableCell>
                                {row.valeurs.map((val: number, j: number) => (
                                    <TableCell key={j} className="text-center">{val.toFixed(2)}</TableCell>
                                ))}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </>
    );
}

const ProductDetails = ({ product }: { product: any }) => {
    if (!product) return null;
  
    return (
        <Card className="shadow-lg">
            <CardHeader className="bg-accent text-accent-foreground rounded-t-lg">
                <CardTitle className="text-4xl font-bold">{product.title || product.documentMetadata?.productCategory}</CardTitle>
            </CardHeader>
            <CardContent className="p-8 bg-background">
                {product.title?.includes('COUVERTURE') ? (
                    <CouvertureProductTables product={product} />
                ) : product.documentMetadata?.productCategory.includes('BARDAGE') ? (
                    <BardageProduct product={product} />
                ) : product.title?.includes('FRIGORIFIQUE') ? (
                    <FrigorifiqueProductTables product={product} />
                ) : product.title?.includes('TÔLE NERVURÉE') ? (
                    <ToleNervureeProductTables product={product} />
                ) : product.title?.includes('HI-BOND') ? (
                    <HibondProductTables product={product} />
                ) : (
                    <Card className="p-8">
                        <CardHeader>
                            <CardTitle className="text-primary text-3xl font-bold mb-6">CARACTÉRISTIQUE PRODUIT</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                           {product.features && (
                             <>
                                {product.features.utilisation && product.features.utilisation.length > 0 && (
                                    <div>
                                        <SubSectionTitle>Utilisation</SubSectionTitle>
                                        <ul className="list-disc pl-6 space-y-2">
                                            {product.features.utilisation.map((item: string) => <li key={item}>{item}</li>)}
                                        </ul>
                                    </div>
                                )}
                                {product.features.application && product.features.application.length > 0 &&
                                    <div>
                                        <SubSectionTitle>Application conseillée</SubSectionTitle>
                                        <p>{product.features.application}</p>
                                    </div>
                                }
                                {product.features.avantages && product.features.avantages.length > 0 &&
                                    <div>
                                        <SubSectionTitle>Les avantages de l'utilisation</SubSectionTitle>
                                        <ul className="list-disc pl-6 space-y-2">
                                            {product.features.avantages.map((item: string) => <li key={item}>{item}</li>)}
                                        </ul>
                                    </div>
                                }
                                {product.features.definition?.acier &&
                                    <div>
                                        <SubSectionTitle>Définition</SubSectionTitle>
                                        <ProductFeature label="Identification d'acier:" value={product.features.definition.acier} />
                                        {product.features.definition.parementExterne?.profil &&
                                            <>
                                                <p className="font-semibold mt-6">Parement externe:</p>
                                                <ul className="list-disc pl-8 mt-2 space-y-1">
                                                    <li>{product.features.definition.parementExterne.profil}</li>
                                                    {product.features.definition.parementExterne.description && <li>{product.features.definition.parementExterne.description}</li>}
                                                    <li>{product.features.definition.parementExterne.epaisseur}</li>
                                                </ul>
                                            </>
                                        }
                                        {product.features.definition.parementInterne?.profil &&
                                            <>
                                                <p className="font-semibold mt-6">Parement interne:</p>
                                                <ul className="list-disc pl-8 mt-2 space-y-1">
                                                    <li>{product.features.definition.parementInterne.profil}</li>
                                                    <li>{product.features.definition.parementInterne.epaisseur}</li>
                                                </ul>
                                            </>
                                        }
                                    </div>
                                }
                                {product.features.revetement && <div>
                                    <SubSectionTitle>Revêtement</SubSectionTitle>
                                    <p className="whitespace-pre-wrap">{product.features.revetement}</p>
                                </div>}
                                {product.features.ameIsolante?.type && <div>
                                    <SubSectionTitle>Ame isolante</SubSectionTitle>
                                    <p className="mb-4">{product.features.ameIsolante.type}</p>
                                    <ProductFeature label="Conductivité thermique:" value={product.features.ameIsolante.conductivite} />
                                    <ProductFeature label="Densité:" value={product.features.ameIsolante.densite} />
                                </div>}
                                {product.features.reactionAuFeu && <div>
                                    <SubSectionTitle>Réaction au feu</SubSectionTitle>
                                    <p>{product.features.reactionAuFeu}</p>
                                </div>}
                                {product.features.tolerance?.length > 0 && <div>
                                    <SubSectionTitle>Tolérance sur panneaux</SubSectionTitle>
                                    <ul className="list-disc pl-6 space-y-2">
                                        {product.features.tolerance.map((item: string) => <li key={item}>{item}</li>)}
                                    </ul>
                                </div>}
                             </>
                           )}
                        </CardContent>
                    </Card>
                )}
            </CardContent>
        </Card>
    );
};


export function SandwichPanelsPage() {
  const [activeProductKey, setActiveProductKey] = useState<keyof typeof productData>('bardage');
  const activeProduct = productData[activeProductKey];
  const heroImage = images['sandwich-panels'].hero;
  const [displayedImage, setDisplayedImage] = useState<ProductImage>(activeProduct.galleryImages[0]);

  useEffect(() => {
    setDisplayedImage(activeProduct.galleryImages[0]);
  }, [activeProductKey, activeProduct.galleryImages]);


  const productButtons = [
    { key: 'couverture', label: 'Panneaux de Couverture', icon: CouvertureIcon },
    { key: 'bardage', label: 'Panneaux de Bardage', icon: BardageIcon },
    { key: 'frigorifique', label: 'Panneaux Frigorifiques', icon: FrigorifiqueIcon },
    { key: 'toleNervuree', label: 'Tôle Nervurée', icon: ChevronsRight },
    { key: 'hibond', label: 'Hi-Bond 77', icon: HibondIcon },
    { key: 'finitions', label: 'Pièces de Finition', icon: FinitionsIcon },
  ];

  return (
    <>
      <section className="relative h-screen w-full flex items-end justify-start text-white overflow-hidden">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          className="z-0 object-cover"
          data-ai-hint={heroImage.aiHint}
          priority
          placeholder="blur"
          blurDataURL={heroImage.blurDataUrl}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
        <div className="relative z-20 w-full px-8 md:px-12 pb-24">
            <AnimatedWrapper animation="zoom-in">
              <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white">
                Panneaux Sandwichs
              </h1>
              <p className="mt-8 text-xl md:text-2xl max-w-3xl text-gray-200">
                Solutions d'isolation haute performance pour la construction moderne.
              </p>
              <div className="mt-12 flex justify-start items-center gap-4">
                <Button size="lg" variant="destructive" className="group">
                    Explorer les produits <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Button>
                <DownloadButton text="Voir la brochure" />
              </div>
            </AnimatedWrapper>
        </div>
      </section>
      
      <section id="product-details" className="bg-secondary/20 py-20">
        <div className="container mx-auto px-4 max-w-screen-2xl">
          <AnimatedWrapper animation="fade-in">
              <Card className="text-center mb-20 p-8 bg-background shadow-lg">
                  <h2 className="font-headline text-5xl font-bold text-primary mb-6">Panneaux Sandwichs & Solutions de Construction</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                      Découvrez notre gamme complète de panneaux sandwichs et solutions pour bâtiments préfabriqués (PEB). Conçus pour offrir une isolation thermique et acoustique supérieure, nos panneaux sont la solution idéale pour les toitures, les bardages et les chambres froides. Chaque variation est conçue avec précision pour répondre aux exigences spécifiques de votre projet, garantissant durabilité, efficacité énergétique et une finition esthétique impeccable.
                  </p>
              </Card>
          </AnimatedWrapper>
          
          <AnimatedWrapper animation="fade-in">
            <div className="mb-24 flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
              {productButtons.map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setActiveProductKey(key as keyof typeof productData)}>
                  <div className={cn(
                      "w-32 h-32 rounded-full flex items-center justify-center border-4 border-background transition-all duration-300 transform group-hover:scale-110",
                      activeProductKey === key ? 'bg-accent shadow-lg' : 'bg-secondary'
                  )}>
                      <Icon className={cn(
                          "h-14 w-14 transition-colors duration-300",
                          activeProductKey === key ? 'text-accent-foreground' : 'text-primary',
                          key === 'toleNervuree' && "rotate-[-90deg]"
                      )} />
                  </div>
                  <Button
                      variant={activeProductKey === key ? 'destructive' : 'outline'}
                      onClick={() => setActiveProductKey(key as keyof typeof productData)}
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
          
          <div className="grid lg:grid-cols-3 gap-x-8 gap-y-16">
              <div className="lg:col-span-1 h-max space-y-8">
                  <ProductImageGallery 
                      mainImage={displayedImage}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    {activeProduct.galleryImages.slice(1, 3).map((image, index) => (
                        <div key={index} className="cursor-pointer rounded-lg overflow-hidden border-2 hover:border-accent transition-all" onClick={() => setDisplayedImage(image)}>
                            <Image src={image.src} alt={image.alt} width={400} height={400} className="w-full h-full object-cover aspect-square" />
                        </div>
                    ))}
                  </div>
              </div>

              <div className="lg:col-span-2">
                <AnimatedWrapper animation="fade-in">
                    <ProductDetails product={activeProduct} />
                </AnimatedWrapper>
              </div>
            </div>
        </div>
      </section>
    </>
  );
}


  