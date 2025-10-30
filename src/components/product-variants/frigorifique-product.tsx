import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SubSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h4 className="font-headline text-2xl font-bold text-primary mt-10 mb-6">{children}</h4>
);

export default function FrigorifiqueProduct({ product }: { product: any }) {
    if (!product || !product.tables) return null;

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
