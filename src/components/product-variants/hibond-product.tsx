
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function HibondProduct({ product }: { product: any }) {
    if (!product || !product.features) return <p>Données produit non disponibles.</p>;

    const { features, tables } = product;

    return (
        <article className="max-w-6xl mx-auto bg-white text-gray-900 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column */}
                <section className="lg:col-span-7 space-y-4">
                    <h2 className="text-lg font-bold text-primary">{product.title}</h2>
                    
                    <div>
                        <h3 className="font-semibold">Avantages</h3>
                        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
                            {features.avantages.map((item: string, i: number) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mt-3">Application</h3>
                        <p className="text-sm mt-1">{features.application}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mt-3">Revêtement</h3>
                        <p className="text-sm mt-1 whitespace-pre-line">{features.revetement}</p>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold mt-3">Réaction au feu</h3>
                        <p className="text-sm mt-1">{features.reactionAuFeu}</p>
                    </div>

                     {tables.dimensionnement?.rows?.length > 0 && (
                        <div className="mt-4 p-4 border rounded">
                            <h4 className="font-semibold">{tables.dimensionnement.title}</h4>
                             <div className="overflow-auto mt-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {tables.dimensionnement.headers.map((h: string) => <TableHead key={h}>{h}</TableHead>)}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tables.dimensionnement.rows.map((row: any, i: number) => (
                                            row.epaisseurs && Array.isArray(row.epaisseurs) && row.epaisseurs.map((epaisseur: any, j: number) => (
                                                <TableRow key={`${i}-${j}`}>
                                                    {j === 0 && <TableCell rowSpan={row.epaisseurs.length} className="align-middle">{row['type']}</TableCell>}
                                                    {j === 0 && <TableCell rowSpan={row.epaisseurs.length} className="align-middle text-center">{row['longueur']}</TableCell>}
                                                    {j === 0 && <TableCell rowSpan={row.epaisseurs.length} className="align-middle text-center">{row['largeur_standard']}</TableCell>}
                                                    <TableCell className="text-center">{epaisseur['valeur_mm']}</TableCell>
                                                    <TableCell className="text-center">{epaisseur['poids_kg_m2']}</TableCell>
                                                    {j === 0 && <TableCell rowSpan={row.epaisseurs.length} className="align-middle">{row['revetement_systeme']}</TableCell>}
                                                </TableRow>
                                            ))
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                </section>

                {/* Right Column */}
                <aside className="lg:col-span-5 space-y-4">
                   {tables.proprietes?.rows?.length > 0 && (
                        <div className="p-4 border rounded">
                            <h4 className="font-semibold">{tables.proprietes.title}</h4>
                             <div className="overflow-auto mt-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                        {tables.proprietes.headers.map((h: string, i: number) => (
                                            <TableHead key={i} colSpan={tables.proprietes.subheaders[h]?.length || 1} className="text-center">{h}</TableHead>
                                        ))}
                                        </TableRow>
                                        <TableRow>
                                            {Object.values(tables.proprietes.subheaders).flat().map((sh: any, i: number) => (
                                                <TableHead key={i} className="text-center">{sh}</TableHead>
                                            ))}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {tables.proprietes.rows.map((row: any, i: number) => (
                                        <TableRow key={i}>
                                            <TableCell className="text-center">{row.epaisseur}</TableCell>
                                            <TableCell className="text-center">{row.poids}</TableCell>
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
                        <div className="p-4 border rounded">
                            <h4 className="font-semibold">{tables.chargesPortees.table_title}</h4>
                             <div className="overflow-auto mt-2">
                                <Table>
                                    <TableHeader>
                                       <TableRow>
                                           <TableHead>Ép (mm)</TableHead>
                                           <TableHead>Nb. Espacement</TableHead>
                                           <TableHead>Cas</TableHead>
                                           {(tables.chargesPortees.espacements_header || []).map((h: number) => (
                                               <TableHead key={h} className="text-center">{h.toFixed(2)}</TableHead>
                                           ))}
                                       </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                    {tables.chargesPortees.rows.map((row: any, i: number) => (
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
                        </div>
                    )}
                </aside>
            </div>
        </article>
    );
}
