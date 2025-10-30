
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
        section3_pose_installation: pose,
        section4_charges_portees: charges,
    } = product.productDescription;

    if (!specs) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-6">
                <h3 className="font-bold mb-4 text-xl">{specs.subsection_utilisation.heading}</h3>
                <ul className="text-sm space-y-1 list-disc pl-5">
                    {specs.subsection_utilisation.items.map((item: string, index: number) => <li key={index}>{item}</li>)}
                </ul>

                <SubSectionTitle>{specs.subsection_definition.heading}</SubSectionTitle>
                <div className="text-sm space-y-2">
                    {specs.subsection_definition.details.map((detail: any, index: number) => (
                        <p key={index}><strong>{detail.label}:</strong> {detail.value}</p>
                    ))}
                </div>

                <SubSectionTitle>{specs.subsection_revetement.heading}</SubSectionTitle>
                <div className="text-sm space-y-2">
                    {specs.subsection_revetement.specifications.map((spec: any, index: number) => (
                        <p key={index}><strong>{spec.type}:</strong> {spec.material}</p>
                    ))}
                </div>
                
                <SubSectionTitle>{specs.subsection_ame_isolante.heading}</SubSectionTitle>
                <div className="text-sm space-y-2">
                    {specs.subsection_ame_isolante.specifications.map((spec: any, index: number) => (
                        <p key={index}><strong>{spec.property}:</strong> {spec.value}</p>
                    ))}
                </div>

                <SubSectionTitle>{specs.subsection_reaction_au_feu.heading}</SubSectionTitle>
                <ul className="text-sm space-y-1 list-disc pl-5">
                    {specs.subsection_reaction_au_feu.classifications.map((item: string, index: number) => <li key={index}>{item}</li>)}
                </ul>

                <SubSectionTitle>{specs.subsection_tolerance.heading}</SubSectionTitle>
                <ul className="text-sm space-y-1 list-disc pl-5">
                    {specs.subsection_tolerance.tolerances.map((item: any, index: number) => <li key={index}><strong>{item.parameter}:</strong> {item.value}</li>)}
                </ul>

            </div>

            <div className="lg:col-span-6">
                <div className="mb-16">
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

                 <div className="mb-16">
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
                
                {etancheite && (
                    <>
                        <SubSectionTitle>{etancheite.subsection_etancheite_rives.heading}</SubSectionTitle>
                        <p className="text-sm">{etancheite.subsection_etancheite_rives.content}</p>
                        
                        <SubSectionTitle>{etancheite.subsection_sens_panneaux.heading}</SubSectionTitle>
                        <p className="text-sm" dangerouslySetInnerHTML={{ __html: etancheite.subsection_sens_panneaux.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                    </>
                )}
            </div>
            {charges && (
                 <div className="lg:col-span-12 mt-8">
                    <h5 className="font-headline text-xl font-semibold text-primary mb-2">{charges.title}</h5>
                    <p className="text-sm text-muted-foreground mb-4">{charges.subtitle}</p>
                    <Table>
                         <TableHeader>
                            <TableRow className="bg-accent/10">
                                <TableHead colSpan={2} className="text-accent font-bold">{charges.table_principale.structure.header_row_1.col1}</TableHead>
                                <TableHead colSpan={charges.table_principale.structure.header_row_2.col2_subheaders.length} className="text-accent font-bold text-center">{charges.table_principale.structure.header_row_1.col2}</TableHead>
                                <TableHead colSpan={charges.table_principale.structure.header_row_2.col3_subheaders.length} className="text-accent font-bold text-center">{charges.table_principale.structure.header_row_1.col3}</TableHead>
                            </TableRow>
                            <TableRow className="bg-accent/20">
                                {charges.table_principale.structure.header_row_2.col1_subheaders.map((sh: string) => <TableHead key={sh} className="text-accent font-bold">{sh}</TableHead>)}
                                {charges.table_principale.structure.header_row_2.col2_subheaders.map((sh: string) => <TableHead key={sh} className="text-accent font-bold text-center">{sh}</TableHead>)}
                                {charges.table_principale.structure.header_row_2.col3_subheaders.map((sh: string) => <TableHead key={sh} className="text-accent font-bold text-center">{sh}</TableHead>)}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {charges.table_principale.data_rows.map((row: any, i: number) => (
                                <TableRow key={i}>
                                    <TableCell>{row.kg_m2}</TableCell>
                                    <TableCell>{row.dan_m2}</TableCell>
                                    {charges.table_principale.structure.header_row_2.col2_subheaders.map((h: string) => <TableCell key={`g1-${h}`} className="text-center">{row.group1[`ep_${h}`]}</TableCell>)}
                                    {charges.table_principale.structure.header_row_2.col3_subheaders.map((h: string) => <TableCell key={`g2-${h}`} className="text-center">{row.group2[`ep_${h}`]}</TableCell>)}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}

            {pose && (
                <div className="lg:col-span-12 mt-8">
                    <SubSectionTitle>{pose.title}</SubSectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h4 className="font-bold text-lg mb-2">{pose.subsection_decoupage.heading}</h4>
                            <p className="text-sm">{pose.subsection_decoupage.instruction}</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-lg mb-2">{pose.subsection_fixation.heading}</h4>
                            <p className="text-sm">{pose.subsection_fixation.instruction}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

  