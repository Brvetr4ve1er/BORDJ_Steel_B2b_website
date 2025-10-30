import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const SubSectionTitle = ({ children }: { children: React.ReactNode }) => (
    <h4 className="font-headline text-2xl font-bold text-primary mt-10 mb-6">{children}</h4>
);

export default function ToleNervureeProduct({ product }: { product: any }) {
    if (!product || !product.tables) return null;
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
                                <TableCell>{row['ÉP']}</TableCell>
                                <TableCell>{row['Poids-Kg/m']}</TableCell>
                                {Object.keys(row.haut_compression).map(key => <TableCell key={key} className="text-center">{row.haut_compression[key]}</TableCell>)}
                                {Object.keys(row.bas_compression).map(key => <TableCell key={key} className="text-center">{row.bas_compression[key]}</TableCell>)}
                                {Object.keys(row.cisaillement_voilement).map(key => <TableCell key={key} className="text-center">{row.cisaillement_voilement[key]}</TableCell>)}
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </>
    );
}
