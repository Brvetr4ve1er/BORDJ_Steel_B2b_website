
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function CouvertureProduct({ product }: { product: any }) {
    if (!product || !product.productDescription) return <p>Données produit non disponibles.</p>;

    const {
        section1_caracteristiques: specs,
        section2_etancheite_sens: etancheite,
        section4_charges_portees: charges
    } = product.productDescription;

    if (!specs) return <p>Données produit non disponibles.</p>;

    return (
        <article className="max-w-6xl mx-auto bg-white text-gray-900 font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left Column */}
                <section className="lg:col-span-7 space-y-4">
                    <h2 className="text-lg font-bold text-primary">{specs.title}</h2>

                    <div>
                        <h3 className="font-semibold">{specs.subsection_utilisation.heading}</h3>
                        <ul className="list-disc ml-5 mt-2 text-sm space-y-1">
                            {specs.subsection_utilisation.items.map((item: string, i: number) => <li key={i}>{item}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mt-3">{specs.subsection_definition.heading}</h3>
                        <div className="text-sm mt-1 space-y-1">
                            {specs.subsection_definition.details.map((s: any, i: number) => (
                                <p key={i}><strong>{s.label}:</strong> {s.value}</p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mt-3">{specs.subsection_revetement.heading}</h3>
                        <ul className="list-disc ml-5 mt-1 text-sm">
                            {specs.subsection_revetement.specifications.map((r: any, i: number) => <li key={i}><strong>{r.type}:</strong> {r.material}</li>)}
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mt-3">{specs.subsection_ame_isolante.heading}</h3>
                        <div className="text-sm mt-1 space-y-1">
                            {specs.subsection_ame_isolante.specifications.map((spec: any, i: number) => (
                                <p key={i}><strong>{spec.property}:</strong> {spec.value}</p>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mt-3">{specs.subsection_reaction_au_feu.heading}</h3>
                        <ul className="list-disc ml-5 mt-1 text-sm">
                            {specs.subsection_reaction_au_feu.classifications.map((c: string, i: number) => <li key={i}>{c}</li>)}
                        </ul>
                    </div>
                    
                    <div>
                        <h3 className="font-semibold mt-3">{specs.subsection_tolerance.heading}</h3>
                        <ul className="mt-1 text-sm list-disc ml-5">
                            {specs.subsection_tolerance.tolerances.map((t: any, i: number) => (
                                <li key={i}><strong>{t.parameter}:</strong> {t.value}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* Right Column */}
                <aside className="lg:col-span-5 space-y-4">
                    {specs.subsection_coefficient_isolation && (
                        <div className="p-4 border rounded">
                            <h4 className="font-semibold">{specs.subsection_coefficient_isolation.heading}</h4>
                            <div className="overflow-auto mt-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Epaisseur en mm</TableHead>
                                            {specs.subsection_coefficient_isolation.table.headers.slice(1).map((h: string) => <TableHead key={h} className="text-center">{h}</TableHead>)}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {specs.subsection_coefficient_isolation.table.rows.map((row: any, i: number) => (
                                            <TableRow key={i}>
                                                <TableCell className="font-medium">{row.unit}</TableCell>
                                                {row.values.map((val: string, j: number) => <TableCell key={j} className="text-center">{val}</TableCell>)}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}

                    {specs.subsection_dimensionnement && (
                        <div className="p-4 border rounded">
                            <h4 className="font-semibold">{specs.subsection_dimensionnement.heading}</h4>
                             <div className="overflow-auto mt-2">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            {specs.subsection_dimensionnement.table.headers.map((h: string) => <TableHead key={h}>{h}</TableHead>)}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {specs.subsection_dimensionnement.table.rows.map((row: any, i: number) => (
                                            <TableRow key={i}>
                                                <TableCell>{row.type}</TableCell>
                                                <TableCell className="text-center">{row.longueur}</TableCell>
                                                <TableCell className="text-center">{row.largeur}</TableCell>
                                                <TableCell className="text-center">{row.epaisseur}</TableCell>
                                                <TableCell className="text-center">{row.poids}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    )}
                    
                    {etancheite && (
                        <div className="p-4 border rounded">
                            <h3 className="font-semibold">{etancheite.subsection_etancheite_rives.heading}</h3>
                            <p className="text-sm mt-2">{etancheite.subsection_etancheite_rives.content}</p>
                            <h3 className="font-semibold mt-4">{etancheite.subsection_sens_panneaux.heading}</h3>
                            <p className="text-sm mt-2" dangerouslySetInnerHTML={{ __html: etancheite.subsection_sens_panneaux.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>
                    )}
                </aside>
            </div>
        </article>
    );
}
