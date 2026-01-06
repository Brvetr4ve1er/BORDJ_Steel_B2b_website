
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';

const HibondTable = ({ data, headers, subheaders, title }: any) => {
    return (
        <div className="mt-8">
            <h2 className="text-gray-700 text-lg font-bold mb-6">{title}</h2>
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th rowSpan={2} className="bg-red-700 text-white border border-white p-2 font-bold align-middle">{headers[0]}</th>
                            <th rowSpan={2} className="bg-red-700 text-white border border-white p-2 font-bold align-middle" dangerouslySetInnerHTML={{ __html: headers[1].replace(' ', '<br/>') }}></th>
                            {Object.keys(subheaders).map(key => (
                                <th key={key} colSpan={subheaders[key].length} className="bg-red-700 text-white border border-white p-2 font-bold">{key}</th>
                            ))}
                        </tr>
                        <tr>
                           {Object.values(subheaders).flat().map((sh: any, i) => <th key={i} className="bg-red-700 text-white border border-white p-1 font-bold">{sh}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row: any, rowIndex: number) => (
                            <tr key={rowIndex} className="bg-gray-100">
                                <td className="border border-gray-400 p-2 text-center font-bold">{row.epaisseur}</td>
                                <td className="border border-gray-400 p-2 text-center">{row.poids}</td>
                                <td className="border border-gray-400 p-2 text-center">{row.haut_compression.Lx}</td>
                                <td className="border border-gray-400 p-2 text-center">{row.haut_compression.Zx_top}</td>
                                <td className="border border-gray-400 p-2 text-center">{row.haut_compression.Zx_bot}</td>
                                <td className="border border-gray-400 p-2 text-center">{row.haut_compression.Ma}</td>
                                <td className="border border-gray-400 p-2 text-center">{row.bas_compression.Lx}</td>
                                <td className="border border-gray-400 p-2 text-center">{row.bas_compression.Zx_top}</td>
                                <td className="border border-gray-400 p-2 text-center">{row.bas_compression.Zx_bot}</td>
                                <td className="border border-gray-400 p-2 text-center">{row.bas_compression.Ma}</td>
                                <td className="border border-gray-400 p-2 text-center">{row.cisaillement_voilement.Va}</td>
                                <td className="border border-gray-400 p-2 text-center">{row.cisaillement_voilement.Pa}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ChargesHiBondTable = ({ data, title, espacements_header }: any) => (
    <div className="mt-8">
        <h2 className="text-gray-700 text-lg font-bold mb-6">{title}</h2>
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
            <table className="w-full border-collapse text-xs">
                <thead>
                    <tr>
                        <th className="bg-red-700 text-white border border-white p-2" rowSpan={2}>ÉP<br/>(mm)</th>
                        <th className="bg-red-700 text-white border border-white p-2" rowSpan={2}>NOMBRE<br/>D'ESPACES</th>
                        <th className="bg-red-700 text-white border border-white p-2" rowSpan={2}>CAS DES<br/>CHARGES</th>
                        <th className="bg-red-700 text-white border border-white p-2" colSpan={espacements_header.length}>ESPACEMENT EN m</th>
                    </tr>
                    <tr>
                        {espacements_header.map((h: any, i: any) => <th key={i} className="bg-red-700 text-white border border-white p-1">{h}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row: any, i: number) => (
                        <tr key={i} className="bg-gray-100">
                           <td className="border border-gray-400 p-2 text-center">{row.epaisseur_mm}</td>
                           <td className="border border-gray-400 p-2 text-center">{row.nombre_espacement}</td>
                           <td className="border border-gray-400 p-2 text-center">{row.cas}</td>
                           {row.valeurs.map((v: any, j: number) => <td key={j} className="border border-gray-400 p-2 text-center">{v}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

export default function HibondProduct({ product }: { product: any }) {
    if (!product) return <p>Données produit non disponibles.</p>;

    const { features, tables } = product;

    return (
        <div>
            <div className="border-l-8 border-accent pl-4 mb-6">
                <h1 className="text-2xl font-bold text-accent uppercase">
                    {product.title}
                </h1>
            </div>

            <div className="space-y-6">
                <ul className="list-disc ml-5 space-y-1">
                    {features.avantages.map((item: string, i: number) => <li key={i}>{item}</li>)}
                </ul>
                <p><strong>Application conseillée :</strong> {features.application}</p>
                
                <div>
                    <h3 className="font-bold">Revêtement</h3>
                    <p>{features.revetement}</p>
                </div>
                <div>
                    <h3 className="font-bold">Réaction au feu</h3>
                    <p>{features.reactionAuFeu}</p>
                </div>

                <Table>
                    <TableHeader>
                        <TableRow className="bg-accent text-accent-foreground">
                            {tables.dimensionnement.headers.map((h:string) => <TableHead className="text-accent-foreground" key={h}>{h}</TableHead>)}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tables.dimensionnement.rows.map((row: any, i: number) => (
                            <React.Fragment key={i}>
                                {row.epaisseurs.map((ep: any, j: number) => (
                                    <TableRow key={j}>
                                        {j === 0 && <TableCell rowSpan={row.epaisseurs.length} className="align-top font-semibold">{row.type}</TableCell>}
                                        <TableCell>{row.longueur}</TableCell>
                                        <TableCell>{row.largeur_standard}</TableCell>
                                        <TableCell>{ep.valeur_mm}</TableCell>
                                        <TableCell>{ep.poids_kg_m2}</TableCell>
                                        {j === 0 && <TableCell rowSpan={row.epaisseurs.length} className="align-top">{row.revetement_systeme}</TableCell>}
                                    </TableRow>
                                ))}
                            </React.Fragment>
                        ))}
                    </TableBody>
                </Table>

                <HibondTable data={tables.proprietes.rows} headers={tables.proprietes.headers} subheaders={tables.proprietes.subheaders} title={tables.proprietes.title} />

                <ChargesHiBondTable data={tables.chargesPortees.rows} title={tables.chargesPortees.table_title} espacements_header={tables.chargesPortees.espacements_header} />
                
                <div className="mb-6 mt-8">
                   <h3 className="font-semibold text-lg mb-3">{features.caracteristiquesGeometriques.title}</h3>
                   <div className="border-2 border-border bg-secondary/10 p-4">
                     <div className="bg-white border border-border p-4 flex items-center justify-center">
                       <Image
                        src={features.caracteristiquesGeometriques.image.src}
                        alt="Schéma géométrique"
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

