
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ToleNervureeProduct({ product }: { product: any }) {
    if (!product || !product.features) return <p>Données produit non disponibles.</p>;

    const { features, tables } = product;

    return (
        <div className="bg-background min-h-screen p-8 font-sans relative">
            <div className="max-w-7xl mx-auto">
                <div className="border-l-8 border-accent pl-4 mb-6">
                    <h1 className="text-2xl font-bold text-accent uppercase">
                        {product.title}
                    </h1>
                </div>

                <div className="space-y-8">
                    <h2 className="text-xl font-bold text-accent mb-4">CARACTÉRISTIQUES PRODUIT</h2>

                    <div>
                        <h3 className="font-bold text-lg mb-2">Utilisation</h3>
                        <ul className="list-disc ml-5 mt-2 text-base space-y-1">
                            {features.utilisation.map((item: string, i: number) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mt-3 mb-2">Revêtement</h3>
                        <p className="text-base mt-1">{features.revetement}</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mt-3 mb-2">Réaction au feu</h3>
                        <p className="text-base mt-1">{features.reactionAuFeu}</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mt-3 mb-2">{features.miseEnOeuvre.title}</h3>
                        <p className="text-base mt-1"><strong>Manutention:</strong> {features.miseEnOeuvre.manutention}</p>
                    </div>

                    {tables.dimensionnement?.rows?.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-bold text-lg mb-3">{tables.dimensionnement.title}</h3>
                            <div className="overflow-auto mt-2 border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-accent text-accent-foreground">
                                            {tables.dimensionnement.headers.map((h: string) => <TableHead key={h} className="text-accent-foreground">{h}</TableHead>)}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tables.dimensionnement.rows.map((row: any, i: number) => (
                                            row.details && Array.isArray(row.details) && row.details.map((detail: any, j: number) => (
                                                <TableRow key={`${i}-${j}`} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                                                    {j === 0 && <TableCell rowSpan={row.details.length} className="align-middle font-medium">{row['Type']}</TableCell>}
                                                    {j === 0 && <TableCell rowSpan={row.details.length} className="align-middle text-center">{row['Longueur (ml)']}</TableCell>}
                                                    {j === 0 && <TableCell rowSpan={row.details.length} className="align-middle text-center">{row['Largueur standard (mm)']}</TableCell>}
                                                    <TableCell className="text-center">{detail['Epaisseurs (mm)']}</TableCell>
                                                    <TableCell className="text-center">{detail['Poids (kg/m2)']}</TableCell>
                                                    <TableCell className="text-center">{detail['j']}</TableCell>
                                                    <TableCell className="text-center">{detail['w']}</TableCell>
                                                    {j === 0 && <TableCell rowSpan={row.details.length} className="align-middle">{row.details[0]['Système de revêtement']}</TableCell>}
                                                </TableRow>
                                            ))
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}

                    {tables.proprietes?.rows?.length > 0 && (
                        <div className="mt-8">
                            <h3 className="font-bold text-lg mb-3">{tables.proprietes.title}</h3>
                             <div className="overflow-auto mt-2 border rounded-lg">
                                <Table>
                                    <TableHeader>
                                       <TableRow className="bg-accent text-accent-foreground">
                                        {tables.proprietes.headers.map((h: string, i: number) => (
                                            <TableHead key={i} colSpan={tables.proprietes.subheaders[h]?.length || 1} className="text-center text-accent-foreground">{h}</TableHead>
                                        ))}
                                        </TableRow>
                                        <TableRow className="bg-secondary/50">
                                            {Object.values(tables.proprietes.subheaders).flat().map((sh: any, i: number) => (
                                                <TableHead key={i} className="text-center text-foreground font-semibold">{sh}</TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {tables.proprietes.rows.map((row: any, i: number) => (
                                        <TableRow key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                                            <TableCell className="text-center font-medium">{row['ÉP']}</TableCell>
                                            <TableCell className="text-center">{row['Poids-Kg/m']}</TableCell>
                                            {Object.keys(row.haut_compression).map(key => <TableCell key={key} className="text-center">{row.haut_compression[key]}</TableCell>)}
                                            {Object.keys(row.bas_compression).map(key => <TableCell key={key} className="text-center">{row.bas_compression[key]}</TableCell>)}
                                            {Object.keys(row.cisaillement_voilement).map(key => <TableCell key={key} className="text-center">{row.cisaillement_voilement[key]}</TableCell>)}
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}

                    {tables.chargesPortees?.rows?.length > 0 && (
                         <div className="mt-8">
                            <h3 className="font-bold text-lg mb-3">{tables.chargesPortees.title}</h3>
                            <div className="overflow-auto mt-2 border rounded-lg">
                                <Table>
                                    <TableHeader>
                                       <TableRow className="bg-accent text-accent-foreground">
                                           <TableHead className="text-accent-foreground">Portée (m)</TableHead>
                                           <TableHead className="text-accent-foreground">Support</TableHead>
                                           <TableHead className="text-accent-foreground">Ép (mm)</TableHead>
                                           {(tables.chargesPortees.espacements_header || []).map((h: number) => (
                                               <TableHead key={h} className="text-center text-accent-foreground">{h.toFixed(2)}</TableHead>
                                           ))}
                                       </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {tables.chargesPortees.rows.map((row: any, i: number) => (
                                        <TableRow key={i} className={i % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                                            <TableCell className="font-medium">{row.epaisseur_mm}</TableCell>
                                            <TableCell className="font-medium">{row.nombre_espacement}</TableCell>
                                            <TableCell className="font-medium">{row.cas}</TableCell>
                                            {row.valeurs.map((val: number, j: number) => (
                                                <TableCell key={j} className="text-center">{val.toFixed(2)}</TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
