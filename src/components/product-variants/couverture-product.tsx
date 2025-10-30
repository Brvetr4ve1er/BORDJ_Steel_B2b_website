
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SubSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h4 className="font-headline text-2xl font-bold text-primary mt-10 mb-6">{children}</h4>
);

export default function CouvertureProduct({ product }: { product: any }) {
    if (!product || !product.productDescription) return null;

    const {
        section1_caracteristiques: specs,
        section2_etancheite_sens: etancheite,
    } = product.productDescription;

    if (!specs) return null;

    return (
        <div className="space-y-12">
            <div>
                <h3 className="font-headline text-3xl font-bold text-primary mb-4">{specs.subsection_utilisation.heading}</h3>
                <ul className="text-lg space-y-1 list-disc pl-5">
                    {specs.subsection_utilisation.items.map((item: string, index: number) => <li key={index}>{item}</li>)}
                </ul>
            </div>

            <div>
                <SubSectionTitle>{specs.subsection_definition.heading}</SubSectionTitle>
                <div className="text-lg space-y-2">
                    {specs.subsection_definition.details.map((detail: any, index: number) => (
                        <p key={index}><strong>{detail.label}:</strong> {detail.value}</p>
                    ))}
                </div>
            </div>

            <div>
                <SubSectionTitle>{specs.subsection_revetement.heading}</SubSectionTitle>
                <div className="text-lg space-y-2">
                    {specs.subsection_revetement.specifications.map((spec: any, index: number) => (
                        <p key={index}><strong>{spec.type}:</strong> {spec.material}</p>
                    ))}
                </div>
            </div>
            
            <div>
                <SubSectionTitle>{specs.subsection_ame_isolante.heading}</SubSectionTitle>
                <div className="text-lg space-y-2">
                    {specs.subsection_ame_isolante.specifications.map((spec: any, index: number) => (
                        <p key={index}><strong>{spec.property}:</strong> {spec.value}</p>
                    ))}
                </div>
            </div>

            <div>
                <SubSectionTitle>{specs.subsection_reaction_au_feu.heading}</SubSectionTitle>
                <ul className="text-lg space-y-1 list-disc pl-5">
                    {specs.subsection_reaction_au_feu.classifications.map((item: string, index: number) => <li key={index}>{item}</li>)}
                </ul>
            </div>

            <div>
                <SubSectionTitle>{specs.subsection_tolerance.heading}</SubSectionTitle>
                <ul className="text-lg space-y-1 list-disc pl-5">
                    {specs.subsection_tolerance.tolerances.map((item: any, index: number) => <li key={index}><strong>{item.parameter}:</strong> {item.value}</li>)}
                </ul>
            </div>

            {specs.subsection_coefficient_isolation && (
                <div className="my-16">
                    <SubSectionTitle>{specs.subsection_coefficient_isolation.heading}</SubSectionTitle>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                                <TableHead className="text-accent font-bold">{specs.subsection_coefficient_isolation.table.headers[0]}</TableHead>
                                {specs.subsection_coefficient_isolation.table.headers.slice(1).map((h: string) => <TableHead key={h} className="text-accent font-bold text-center">{h}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {specs.subsection_coefficient_isolation.table.rows.map((row: any, i: number) => (
                                <TableRow key={i}>
                                    <TableCell className="font-bold">{row.unit}</TableCell>
                                    {row.values.map((val: string, j: number) => <TableCell key={j} className="text-center">{val}</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {specs.subsection_dimensionnement && (
                 <div className="my-16">
                    <SubSectionTitle>{specs.subsection_dimensionnement.heading}</SubSectionTitle>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-accent/10">
                                {specs.subsection_dimensionnement.table.headers.map((h: string) => <TableHead key={h} className="text-accent font-bold">{h}</TableHead>)}
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
            )}

            {etancheite && (
                <>
                    <div>
                        <SubSectionTitle>{etancheite.subsection_etancheite_rives.heading}</SubSectionTitle>
                        <p className="text-lg">{etancheite.subsection_etancheite_rives.content}</p>
                    </div>
                    
                    <div>
                        <SubSectionTitle>{etancheite.subsection_sens_panneaux.heading}</SubSectionTitle>
                        <p className="text-lg" dangerouslySetInnerHTML={{ __html: etancheite.subsection_sens_panneaux.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </div>
                </>
            )}
        </div>
    );
}

    