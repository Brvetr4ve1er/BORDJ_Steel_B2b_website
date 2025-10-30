import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="mb-6">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <div className="text-sm space-y-1">
            {children}
        </div>
    </div>
);

const DetailList = ({ items }: { items: { label: string, value: string }[] }) => (
    <ul className="space-y-1">
        {items.map(item => (
            <li key={item.label}><strong>{item.label}:</strong> {item.value}</li>
        ))}
    </ul>
);

export default function CouvertureProduct({ product }: { product: any }) {
    const { productDescription: desc } = product;

    if (!desc) {
        return <p>Données du produit non disponibles.</p>;
    }

    const {
        section1_caracteristiques: specs,
        section2_etancheite_sens: etancheite
    } = desc;

    return (
        <article className="font-sans">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div>
                    <Section title={specs.subsection_utilisation.heading}>
                        <ul className="list-disc list-inside space-y-1">
                            {specs.subsection_utilisation.items.map((item: string, i: number) => <li key={i}>{item}</li>)}
                        </ul>
                    </Section>

                    <Section title={specs.subsection_definition.heading}>
                        <p><strong>{specs.subsection_definition.details[0].label}:</strong> {specs.subsection_definition.details[0].value}</p>
                        <p className="font-semibold mt-2">{specs.subsection_definition.details[1].label}</p>
                        <ul className="list-disc list-inside ml-4">
                            <li>{specs.subsection_definition.details[1].value}</li>
                            <li>{specs.subsection_definition.details[2].value}</li>
                            <li><strong>{specs.subsection_definition.details[3].label}:</strong> {specs.subsection_definition.details[3].value}</li>
                        </ul>
                         <p className="font-semibold mt-2">{specs.subsection_definition.details[4].label}</p>
                         <ul className="list-disc list-inside ml-4">
                            <li>{specs.subsection_definition.details[4].value}</li>
                            <li><strong>{specs.subsection_definition.details[5].label}:</strong> {specs.subsection_definition.details[5].value}</li>
                        </ul>
                    </Section>
                    
                    <div className="mt-4">
                        <h3 className="font-bold mb-2">{specs.subsection_coefficient_isolation.heading}</h3>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-accent text-accent-foreground">
                                    <TableHead className="text-accent-foreground">{specs.subsection_coefficient_isolation.table.headers[0]}</TableHead>
                                    {specs.subsection_coefficient_isolation.table.headers.slice(1).map((h: string) => <TableHead key={h} className="text-accent-foreground text-center">{h}</TableHead>)}
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

                </div>

                {/* Right Column */}
                <div>
                     <Section title={specs.subsection_revetement.heading}>
                        {specs.subsection_revetement.specifications.map((spec: any, i: number) => <p key={i}>{spec.material}</p>)}
                    </Section>

                    <Section title={specs.subsection_ame_isolante.heading}>
                        {specs.subsection_ame_isolante.specifications.map((spec: any, i: number) => (
                            <p key={i}><strong>{spec.property}:</strong> {spec.value}</p>
                        ))}
                    </Section>
                    
                    <Section title={specs.subsection_reaction_au_feu.heading}>
                        <ul className="list-disc list-inside">
                           {specs.subsection_reaction_au_feu.classifications.map((c: string, i: number) => <li key={i}>{c}</li>)}
                        </ul>
                    </Section>

                    <Section title={specs.subsection_tolerance.heading}>
                        <ul className="list-disc list-inside">
                           {specs.subsection_tolerance.tolerances.map((t: any, i: number) => <li key={i}><strong>{t.parameter}:</strong> {t.value}</li>)}
                        </ul>
                    </Section>
                   
                    <div className="mt-4">
                        <h3 className="font-bold mb-2">{specs.subsection_dimensionnement.heading}</h3>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-accent text-accent-foreground">
                                    {specs.subsection_dimensionnement.table.headers.map((h: string) => <TableHead key={h} className="text-accent-foreground">{h}</TableHead>)}
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
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                 <Section title={etancheite.subsection_etancheite_rives.heading}>
                    <p>{etancheite.subsection_etancheite_rives.content}</p>
                </Section>
                <Section title={etancheite.subsection_sens_panneaux.heading}>
                    <p dangerouslySetInnerHTML={{ __html: etancheite.subsection_sens_panneaux.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </Section>
            </div>
        </article>
    );
}
