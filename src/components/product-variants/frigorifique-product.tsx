
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function FrigorifiqueProduct({ product }: { product: any }) {
    if (!product || !product.features) return <p>Données produit non disponibles.</p>;

    const {
        features,
        tables,
    } = product;

    return (
        <article className="max-w-6xl mx-auto bg-white text-gray-900 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column */}
                <section className="lg:col-span-7 space-y-4">
                    <h2 className="text-lg font-bold text-primary">{product.title}</h2>
                    <div>
                        <h3 className="font-semibold">Utilisation</h3>
                        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
                            {features.utilisation.map((item: string, i: number) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mt-3">Définition</h3>
                        <div className="text-sm mt-1 space-y-1">
                            <p><strong>Identification d’acier:</strong> {features.definition.acier}</p>
                            <p><strong>Parement Externe:</strong> {features.definition.parementExterne.profil}</p>
                            <p><strong>Épaisseur:</strong> {features.definition.parementExterne.epaisseur}</p>
                        </div>
                    </div>
                     <div>
                        <h3 className="font-semibold mt-3">Revêtement</h3>
                        <p className="text-sm mt-1">{features.revetement}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mt-3">Âme isolante</h3>
                        <div className="text-sm mt-1 space-y-1">
                            <p><strong>Type:</strong> {features.ameIsolante.type}</p>
                            <p><strong>Conductivité thermique:</strong> {features.ameIsolante.conductivite}</p>
                            <p><strong>Densité:</strong> {features.ameIsolante.densite}</p>
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold mt-3">Réaction au feu</h3>
                        <p className="text-sm mt-1">{features.reactionAuFeu}</p>
                    </div>

                    <div>
                        <h3 className="font-semibold mt-3">Tolérance sur panneaux</h3>
                        <ul className="mt-1 text-sm list-disc ml-5">
                            {features.tolerance.map((t: string, i: number) => (
                                <li key={i}>{t}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Right Column */}
                <aside className="lg:col-span-5 space-y-4">
                    {tables.isolation?.rows?.length > 0 && (
                        <div className="p-4 border rounded">
                            <h4 className="font-semibold">{tables.isolation.title}</h4>
                            <div className="overflow-auto mt-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {tables.isolation.headers.map((h: string) => <TableHead key={h}>{h}</TableHead>)}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tables.isolation.rows.map((row: any, i: number) => (
                                            <TableRow key={i}>
                                                {tables.isolation.headers.map((h: string) => <TableCell key={h}>{row[h as keyof typeof row] ?? ''}</TableCell>)}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                    {tables.dimensionnement?.rows?.length > 0 && (
                        <div className="p-4 border rounded">
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
                                            <TableRow key={i}>
                                                {tables.dimensionnement.headers.map((h: string) => <TableCell key={h}>{row[h as keyof typeof row] ?? ''}</TableCell>)}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                </aside>
            </div>
             {tables.chargesPortees?.rows?.length > 0 && (
                <div className="mt-6 p-4 border rounded">
                    <h4 className="font-semibold">{tables.chargesPortees.title}</h4>
                    <p className="text-xs text-gray-600 mb-2">{tables.chargesPortees.subtitle}</p>
                    <div className="overflow-auto mt-2">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    {tables.chargesPortees.headers.map((header: any, index: number) => (
                                        <TableHead key={index} colSpan={header.colspan} className="text-center">{header.title}</TableHead>
                                    ))}
                                </TableRow>
                                <TableRow>
                                    {tables.chargesPortees.subheaders.map((sub: string, index: number) => (
                                         <TableHead key={index} className="text-center">{sub.replace('_3app', '')}</TableHead>
                                    ))}
                                </TableRow>
                            </TableHeader>
                             <TableBody>
                                {tables.chargesPortees.rows.map((row: any, i: number) => (
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
                </div>
            )}
        </article>
    );
}
