
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OneSupportIcon } from './one-support-icon';
import { TwoSupportsIcon } from './two-supports-icon';

const ChargesTableFrigorifique = ({ tableData }: { tableData: any }) => {
    if (!tableData?.rows?.length) return null;

    return (
        <div className="bg-background p-4">
            <h3 className="text-muted-foreground font-semibold mb-3 text-lg">
                {tableData.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{tableData.subtitle}</p>

            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-accent text-accent-foreground">
                        <th className="border border-border px-2 py-3" colSpan={2} rowSpan={2}>
                            Charge utile uniformément répartie
                        </th>
                        <th className="border border-border px-2 py-3" colSpan={tableData.subheaders.length / 2}>
                            Epaisseur du panneau en mm (2 appuis)
                        </th>
                        <th className="border border-border px-2 py-3" colSpan={tableData.subheaders.length / 2}>
                            Epaisseur du panneau en mm (3 appuis)
                        </th>
                    </tr>
                    <tr>
                        {tableData.subheaders.map((sub: string, index: number) => (
                             <th key={index} className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">{sub.replace('_3app', '')}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-accent text-accent-foreground">
                        <td className="border border-border px-2 py-2 font-semibold text-center">kg/m²</td>
                        <td className="border border-border px-2 py-2 font-semibold text-center">daN/m²</td>
                        <td className="border border-border px-2 py-2 text-center font-semibold" colSpan={tableData.subheaders.length}>
                            Entraxe Max cm
                        </td>
                    </tr>
                    {tableData.rows.map((row: any, rowIndex: number) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                            <td className="border border-border px-2 py-2 text-center">{row['Kg/m²']}</td>
                            <td className="border border-border px-2 py-2 text-center">{row['daN/m²']}</td>
                            {tableData.subheaders.map((subheader: string) => (
                                <td key={subheader} className="border border-border px-2 py-2 text-center">{row[subheader]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default function FrigorifiqueProduct({ product }: { product: any }) {
    if (!product || !product.features) return <p>Données produit non disponibles.</p>;

    const {
        features,
        tables,
    } = product;

    return (
        <div className="bg-background min-h-screen p-8 font-sans relative">
            <div className="max-w-7xl mx-auto">
                <div className="border-l-8 border-accent pl-4 mb-6">
                    <h1 className="text-2xl font-bold text-accent uppercase">
                        {product.title}
                    </h1>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    <div>
                        <h2 className="text-xl font-bold text-accent mb-4">CARACTÉRISTIQUE PRODUIT</h2>

                        <div className="mb-6">
                            <h3 className="font-bold mb-2 text-lg">Utilisation</h3>
                            <ul className="list-disc ml-5 mt-2 text-base space-y-1">
                                {features.utilisation.map((item: string, i: number) => <li key={i}>{item}</li>)}
                            </ul>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-bold mb-2 text-lg">Définition</h3>
                            <div className="text-base mt-1 space-y-1">
                                <p><strong>Identification d’acier:</strong> {features.definition.acier}</p>
                                <p><strong>Parement Externe:</strong> {features.definition.parementExterne.profil}</p>
                                <p><strong>Épaisseur:</strong> {features.definition.parementExterne.epaisseur}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-bold mb-2 text-lg">Revêtement</h3>
                            <p className="text-base mt-1">{features.revetement}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-bold mb-2 text-lg">Âme isolante</h3>
                            <div className="text-base mt-1 space-y-1">
                                <p><strong>Type:</strong> {features.ameIsolante.type}</p>
                                <p><strong>Conductivité thermique:</strong> {features.ameIsolante.conductivite}</p>
                                <p><strong>Densité:</strong> {features.ameIsolante.densite}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-bold mb-2 text-lg">Réaction au feu</h3>
                            <p className="text-base mt-1">{features.reactionAuFeu}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="font-bold mb-2 text-lg">Tolérance sur panneaux</h3>
                            <ul className="mt-1 text-base list-disc ml-5">
                                {features.tolerance.map((t: string, i: number) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>
                        </div>

                        {tables.isolation?.rows?.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-bold mb-3 text-lg">{tables.isolation.title}</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-accent text-accent-foreground">
                                            {tables.isolation.headers.map((h: string) => <TableHead key={h} className="text-accent-foreground">{h}</TableHead>)}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tables.isolation.rows.map((row: any, i: number) => (
                                            <TableRow key={i}>
                                                {tables.isolation.headers.map((h: string) => <TableCell key={h} className={h.includes('Épaisseur') ? 'font-medium' : 'text-center'}>{row[h as keyof typeof row] ?? ''}</TableCell>)}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}

                        {tables.dimensionnement?.rows?.length > 0 && (
                            <div className="mb-6">
                                <h3 className="font-bold mb-3 text-lg">{tables.dimensionnement.title}</h3>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-accent text-accent-foreground">
                                            {tables.dimensionnement.headers.map((h: string) => <TableHead key={h} className="text-accent-foreground">{h}</TableHead>)}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tables.dimensionnement.rows.map((row: any, i: number) => (
                                            <TableRow key={i}>
                                                {tables.dimensionnement.headers.map((h: string) => <TableCell key={h} className={h === 'Type' ? 'font-medium' : 'text-center'}>{row[h as keyof typeof row] ?? ''}</TableCell>)}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}

                        <ChargesTableFrigorifique tableData={tables.chargesPortees} />

                    </div>
                </div>
            </div>
        </div>
    );
}
