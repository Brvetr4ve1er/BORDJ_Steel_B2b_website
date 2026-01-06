
import React from 'react';
import Papa from 'papaparse';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OneSupportIcon } from './one-support-icon';
import { TwoSupportsIcon } from './two-supports-icon';
import Image from 'next/image';

const ChargesTableBardage = () => {
    return (
        <div className="bg-background p-4">
          <h3 className="text-muted-foreground font-semibold mb-3 text-lg">
            LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)
          </h3>
          <p className="text-sm text-muted-foreground mb-4">Tôle en acier épaisseur 0.5mm</p>
    
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-accent text-accent-foreground">
                <th className="border border-border px-2 py-3" colSpan={2} rowSpan={3}>
                  Charge utile uniformément<br />répartie
                </th>
                <th className="border border-border px-2 py-3" colSpan={10}>
                  Épaisseur du panneau en mm
                </th>
              </tr>
    
              <tr className="bg-secondary">
                <th className="border border-border p-2" colSpan={5}>
                 <div className="flex items-center justify-center gap-1 mb-1 px-4">
                    <OneSupportIcon className="h-16" />
                 </div>
                </th>
                <th className="border border-border px-2 py-2 text-foreground" colSpan={5}>
                 <div className="flex items-center justify-center gap-1 mb-1 px-4">
                    <TwoSupportsIcon className="h-16" />
                 </div>
                </th>
              </tr>
    
              <tr>
                <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">30</th>
                <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">35</th>
                <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">40</th>
                <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">50</th>
                <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">60</th>

                <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">30</th>
                <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">35</th>
                <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">40</th>
                <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">50</th>
                <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">60</th>
              </tr>
            </thead>
    
            <tbody>
              <tr className="bg-accent text-accent-foreground">
                <td className="border border-border px-2 py-2 font-semibold text-center">kg/m²</td>
                <td className="border border-border px-2 py-2 font-semibold text-center">daN/m²</td>
                <td className="border border-border px-2 py-2 text-center font-semibold" colSpan={10}>
                  Entraxe Max cm
                </td>
              </tr>
    
              {[
                ["60", "58", "285", "315", "345", "485", "400", "425", "455", "560", "455", "560"],
                ["80", "78", "255", "285", "335", "415", "345", "365", "390", "485", "390", "485"],
                ["100", "98", "235", "260", "305", "375", "315", "335", "385", "440", "385", "440"],
                ["120", "117", "220", "245", "265", "310", "355", "285", "360", "310", "360", "310"],
                ["140", "137", "205", "225", "250", "395", "235", "240", "340", "290", "290", "290"],
                ["160", "156", "195", "215", "235", "280", "315", "230", "225", "375", "325", "370"]
              ].map((row, rowIndex) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                  {row.slice(0, 12).map((val, valIndex) => (
                    <td key={valIndex} className="border border-border px-2 py-2 text-center">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};

export default function BardageProduct({ product }: { product: any }) {
    if (!product) return <p>Données produit non disponibles.</p>;

    const {
        productSpecifications: {
            utilisation,
            definition,
            revetement,
            ameIsolante,
            caracteristiquesTechniques,
            tolerance,
            coefficientIsolationThermique,
            dimensionnementDuPanneau
        },
        installationInformation,
        caracteristiquesGeometriques,
    } = product;
    
    return (
        <div>
            <div className="border-l-8 border-accent pl-4 mb-6">
                <h1 className="text-2xl font-bold text-accent uppercase">
                    ■ {product.documentMetadata.productCategory}
                </h1>
            </div>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-accent mb-4">CARACTÉRISTIQUE PRODUIT</h2>
                    <h3 className="font-bold text-lg mb-2">{utilisation.heading}</h3>
                    <ul className="list-disc ml-5 space-y-1">
                        {utilisation.applications.map((app: string, i: number) => <li key={i}>{app}</li>)}
                    </ul>
                </div>
                
                <div className="space-y-2">
                    <h3 className="font-bold text-lg">{definition.heading}</h3>
                    {definition.specifications.map((spec: any, i: number) => <p key={i}><strong>{spec.parameter}:</strong> {spec.value}</p>)}
                </div>

                <div className="space-y-2">
                    <h3 className="font-bold text-lg">{revetement.heading}</h3>
                    {revetement.specifications.map((spec: any, i: number) => <p key={i}>{spec.material}</p>)}
                </div>

                <div className="space-y-2">
                    <h3 className="font-bold text-lg">{ameIsolante.heading}</h3>
                    <p><strong>Type:</strong> {ameIsolante.type}</p>
                    <p><strong>Conductivité thermique:</strong> {ameIsolante.conductiviteThermique}</p>
                    <p><strong>Densité:</strong> {ameIsolante.densite}</p>
                    <p><strong>Réaction au feu:</strong> {caracteristiquesTechniques.reactionAuFeu.classifications.join(', ')}</p>
                </div>
                
                <div className="space-y-2">
                    <h3 className="font-bold text-lg">{tolerance.heading}</h3>
                    <ul className="list-disc ml-5">
                       {tolerance.tolerances.map((t: any, i: number) => <li key={i}>{t.parameter}: {t.value}</li>)}
                    </ul>
                </div>

                <div className="mb-4">
                    <h3 className="font-bold mb-3 text-lg">{coefficientIsolationThermique.heading}</h3>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent text-accent-foreground">
                                <TableHead className="text-accent-foreground">Épaisseur en mm</TableHead>
                                {coefficientIsolationThermique.table.headers.epaisseur_mm.map((h: number) => <TableHead key={h} className="text-center text-accent-foreground">{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {coefficientIsolationThermique.table.data.map((row: any, i: number) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium bg-secondary/20">{row.unit}</TableCell>
                                    {Object.values(row.values).map((val: any, j: number) => <TableCell key={j} className="text-center">{val}</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                
                <div className="mb-6">
                    <h3 className="font-bold mb-3 text-lg">{dimensionnementDuPanneau.heading}</h3>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent text-accent-foreground">
                                {dimensionnementDuPanneau.table.headers.map((h: string) => <TableHead key={h} className="text-accent-foreground">{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {dimensionnementDuPanneau.table.data.map((row: any, i: number) => (
                                <TableRow key={i} className="bg-secondary/30">
                                    <TableCell>{row.type}</TableCell>
                                    <TableCell className="text-center">{row.longueur_mm}</TableCell>
                                    <TableCell className="text-center">{row.largeur_utile_mm}</TableCell>
                                    <TableCell className="text-center">{row.epaisseur_mm}</TableCell>
                                    <TableCell className="text-center">{row.poids_kg_m2}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <div className="space-y-2">
                    <h3 className="font-bold text-lg">{installationInformation.etancheiteDesRives.heading}</h3>
                    {installationInformation.etancheiteDesRives.paragraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
                </div>

                <ChargesTableBardage />

                <div className="space-y-4 mt-6">
                   <h3 className="font-bold text-lg">{caracteristiquesGeometriques.title}</h3>
                   <div className="border-2 border-border bg-secondary/10 p-4">
                       <div className="bg-white border border-border p-4 flex items-center justify-center">
                           <Image src="https://i.imghippo.com/files/Xii4624Ovg.png" alt="Schéma B" width={800} height={200} className="object-contain" />
                       </div>
                       <p className="text-center text-sm mt-2">{caracteristiquesGeometriques.diagrams[1].caption}</p>
                   </div>
                   <div className="border-2 border-border bg-secondary/10 p-4">
                       <div className="bg-white border border-border p-4 flex items-center justify-center">
                           <Image src="https://i.imghippo.com/files/lo9648YNk.png" alt="Schéma C" width={800} height={200} className="object-contain" />
                       </div>
                       <p className="text-center text-sm mt-2">{caracteristiquesGeometriques.diagrams[0].caption}</p>
                   </div>
                </div>
            </div>
        </div>
    );
}

