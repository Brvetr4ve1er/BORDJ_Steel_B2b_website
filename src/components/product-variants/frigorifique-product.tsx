
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OneSupportIcon } from './one-support-icon';
import { TwoSupportsIcon } from './two-supports-icon';

const LoadCapacityTableFrigorifique = () => {
    const tableData = [
        [60, 58, 545, 635, 715, 790, 845, 870, 620, 725, 805, 905, 975, 1035],
        [80, 78, 490, 570, 640, 700, 740, 765, 565, 655, 735, 805, 865, 920],
        [100, 98, 450, 525, 590, 640, 670, 690, 520, 605, 680, 740, 800, 855],
        [120, 117, 420, 490, 550, 590, 610, 625, 485, 565, 635, 685, 735, 755],
        [140, 137, 395, 460, 520, 545, 555, 560, 460, 535, 600, 640, 675, 700],
        [160, 156, 375, 435, 490, 515, 525, 530, 435, 510, 575, 605, 630, 650]
    ];

    return (
        <div className="bg-background p-4">
            <h3 className="text-muted-foreground font-semibold mb-3 text-lg">
                LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m²)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Tôle en acier épaisseur 0,5mm</p>

            <table className="w-full border-collapse text-sm">
                <thead>
                    <tr className="bg-accent text-accent-foreground">
                        <th className="border border-border px-2 py-3" colSpan={2} rowSpan={3}>
                            Charge utile uniformément répartie
                        </th>
                        <th className="border border-border px-2 py-3" colSpan={6}>
                            Epaisseur du panneau en mm (2 appuis)
                        </th>
                        <th className="border border-border px-2 py-3" colSpan={6}>
                            Epaisseur du panneau en mm (3 appuis)
                        </th>
                    </tr>
                    <tr className="bg-secondary">
                        <th className="border border-border p-2" colSpan={6}>
                            <div className="flex items-center justify-center gap-1 mb-1 px-4">
                                <OneSupportIcon className="h-16" />
                            </div>
                        </th>
                        <th className="border border-border px-2 py-2 text-foreground" colSpan={6}>
                            <div className="flex items-center justify-center gap-1 mb-1 px-4">
                                <TwoSupportsIcon className="h-16" />
                            </div>
                        </th>
                    </tr>
                    <tr>
                        <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">80</th>
                        <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">100</th>
                        <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">120</th>
                        <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">150</th>
                        <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">180</th>
                        <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">200</th>
                        <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">80</th>
                        <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">100</th>
                        <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">120</th>
                        <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">150</th>
                        <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">180</th>
                        <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">200</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-accent text-accent-foreground">
                        <td className="border border-border px-2 py-2 font-semibold text-center">kg/m²</td>
                        <td className="border border-border px-2 py-2 font-semibold text-center">daN/m²</td>
                        <td className="border border-border px-2 py-2 text-center font-semibold" colSpan={12}>
                            Entraxe Max cm
                        </td>
                    </tr>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                            {row.map((val, valIndex) => (
                                <td key={valIndex} className="border border-border px-2 py-2 text-center">
                                    {val}
                                </td>
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

    const insulationData = tables.isolation.rows;
    const thicknessHeaders = insulationData.map((row: any) => row['Épaisseur en mm']);
    const wmkValues = insulationData.map((row: any) => row['W/m²K']);
    const kcalValues = insulationData.map((row: any) => row['Kcal/m²h°c']);

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
                                            <TableHead className="text-accent-foreground font-medium">Épaisseur en mm</TableHead>
                                            {thicknessHeaders.map((h: string) => <TableHead key={h} className="text-center text-accent-foreground">{h}</TableHead>)}
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell className="font-medium bg-secondary/20">W/m²K</TableCell>
                                            {wmkValues.map((val: string, i: number) => <TableCell key={i} className="text-center">{val}</TableCell>)}
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium bg-secondary/20">Kcal/m²h°c</TableCell>
                                            {kcalValues.map((val: string, i: number) => <TableCell key={i} className="text-center">{val}</TableCell>)}
                                        </TableRow>
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
                        
                        <LoadCapacityTableFrigorifique />
                    </div>
                </div>
            </div>
        </div>
    );
}
