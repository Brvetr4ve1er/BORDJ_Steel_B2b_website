
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OneSupportIcon } from './one-support-icon';
import { TwoSupportsIcon } from './two-supports-icon';
import Image from 'next/image';

const ChargesToleNervureeTable = ({ data, headers, subheaders, porteeValues }: any) => {
    return (
        <div className="bg-background p-4 mt-8">
          <h3 className="text-muted-foreground font-semibold mb-3 text-lg">
            {headers.main}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{headers.subtitle}</p>
    
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-accent text-accent-foreground">
                <th className="border border-border px-2 py-3" rowSpan={3}>
                  ÉP<br />(mm)
                </th>
                <th className="border border-border px-2 py-3" colSpan={porteeValues.length}>
                  {headers.appuiHeader}
                </th>
              </tr>
    
              <tr className="bg-secondary">
                <th className="border border-border p-2" colSpan={porteeValues.length / 2}>
                 <div className="flex items-center justify-center gap-1 mb-1 px-4">
                    <OneSupportIcon className="h-16" />
                 </div>
                </th>
                <th className="border border-border px-2 py-2 text-foreground" colSpan={porteeValues.length / 2}>
                 <div className="flex items-center justify-center gap-1 mb-1 px-4">
                    <TwoSupportsIcon className="h-16" />
                 </div>
                </th>
              </tr>
    
              <tr>
                {porteeValues.map((h: number) => <th key={h} className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">{h.toFixed(2)}</th>)}
              </tr>
            </thead>
    
            <tbody>
              {data.map((row: any, rowIndex: number) => (
                <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-background' : 'bg-muted/50'}>
                    <td className="border border-border px-2 py-2 text-center font-semibold">{row['EP (mm)']}</td>
                    {row['1 appui'].map((val: string, i: number) => (
                        <td key={i} className="border border-border px-2 py-2 text-center">{val}</td>
                    ))}
                    {row['2 appuis'].map((val: string, i: number) => (
                        <td key={i} className="border border-border px-2 py-2 text-center">{val}</td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
};


export default function ToleNervureeProduct({ product }: { product: any }) {
    if (!product) return <p>Données produit non disponibles.</p>;

    const { features, tables } = product;

    return (
        <div>
            <div className="border-l-8 border-accent pl-4 mb-6">
                <h1 className="text-2xl font-bold text-accent uppercase">
                    {product.title}
                </h1>
                <h2 className="text-lg font-semibold text-muted-foreground">{product.subtitle}</h2>
            </div>
            
            <div className="space-y-6">
                <div>
                    <h3 className="font-bold text-lg mb-2">Utilisation</h3>
                    <ul className="list-disc ml-5 space-y-1">
                        {features.utilisation.map((item: string, i: number) => <li key={i}>{item}</li>)}
                    </ul>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-accent text-accent-foreground">
                            {tables.dimensionnement.headers.map((h: string) => <TableHead className="text-accent-foreground" key={h}>{h}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tables.dimensionnement.rows.map((row: any, i: number) => (
                            <React.Fragment key={i}>
                                <TableRow>
                                    <TableCell rowSpan={row.details.length + 1} className="align-top font-semibold">{row.Type}</TableCell>
                                </TableRow>
                                {row.details.map((detail: any, j: number) => (
                                    <TableRow key={j}>
                                        <TableCell>{row['Longueur (ml)']}</TableCell>
                                        <TableCell>{row['Largueur standard (mm)']}</TableCell>
                                        <TableCell>{detail['Epaisseurs (mm)']}</TableCell>
                                        <TableCell>{detail['Poids (kg/m2)']}</TableCell>
                                        <TableCell>{detail['j']}</TableCell>
                                        <TableCell>{detail['w']}</TableCell>
                                        <TableCell>{detail['Système de revêtement']}</TableCell>
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>

                <div>
                    <h3 className="font-bold">Revêtement</h3>
                    <p>{features.revetement}</p>
                </div>
                <div>
                    <h3 className="font-bold">Réaction au feu</h3>
                    <p>{features.reactionAuFeu}</p>
                </div>
                <div>
                    <h3 className="font-bold">{features.miseEnOeuvre.title}</h3>
                    <p>{features.miseEnOeuvre.manutention}</p>
                </div>

                <ChargesToleNervureeTable 
                    data={tables.chargesPortees.rows} 
                    headers={{main: tables.chargesPortees.title, subtitle: tables.chargesPortees.subtitle, appuiHeader: 'Portée en m'}} 
                    porteeValues={tables.chargesPortees.subheaders['1 appui']}
                />

                <div className="mb-6 mt-8">
                   <h3 className="font-semibold text-lg mb-3">Caractéristiques Géométriques</h3>
                   <div className="border-2 border-border bg-secondary/10 p-4">
                     <div className="bg-white border border-border p-4 flex items-center justify-center">
                       <Image
                        src="https://i.ibb.co/ccqw6JJN/tole-nervure.png"
                        alt="Tôle nervurée géométrie"
                        width={800}
                        height={250}
                        className="object-contain"
                       />
                     </div>
                   </div>
                 </div>
            </div>
        </div>
    );
}

