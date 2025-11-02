import React from 'react';
import Papa from 'papaparse';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

function ChargesTableDebug() {
  return (
    <div className="overflow-x-auto bg-white p-4">
      <h2 className="text-gray-800 font-bold text-sm mb-2 uppercase tracking-wide">
        [DEBUG] Les Charges et Portées Admissibles au Coulage (kg/m)
      </h2>

      <table className="border-collapse w-full text-[13px] leading-tight font-mono">
        <thead>
          {/* Top red header */}
          <tr>
            <th
              colSpan={12}
              className="bg-accent text-white text-left p-2 uppercase font-semibold tracking-wide border border-black"
            >
              Tôle en acier épaisseur 0,5mm
            </th>
          </tr>

          {/* Header with subgroups */}
          <tr className="bg-gray-100 text-center text-gray-900">
            <th
              rowSpan={3}
              className="border border-black p-2 bg-yellow-100 align-middle"
            >
              Charge utile uniformément<br />répartie
            </th>
            <th
              colSpan={5}
              className="border border-black p-2 bg-green-100 font-semibold"
            >
              Épaisseur du panneau en mm
            </th>
            <th
              colSpan={5}
              className="border border-black p-2 bg-blue-100 font-semibold"
            >
              Épaisseur du panneau en mm
            </th>
          </tr>

          <tr className="bg-gray-100 text-gray-900 text-center">
            <th colSpan={5} className="border border-black p-2 font-semibold">Entraxe Max cm</th>
            <th colSpan={5} className="border border-black p-2 font-semibold">Entraxe Max cm</th>
          </tr>

          {/* Numeric headers */}
          <tr className="bg-gray-100 text-gray-900 text-center">
            <th className="border border-black p-2 bg-green-50">30</th>
            <th className="border border-black p-2 bg-green-50">35</th>
            <th className="border border-black p-2 bg-green-50">40</th>
            <th className="border border-black p-2 bg-green-50">50</th>
            <th className="border border-black p-2 bg-green-50">60</th>
            <th className="border border-black p-2 bg-blue-50">30</th>
            <th className="border border-black p-2 bg-blue-50">35</th>
            <th className="border border-black p-2 bg-blue-50">40</th>
            <th className="border border-black p-2 bg-blue-50">50</th>
            <th className="border border-black p-2 bg-blue-50">60</th>
          </tr>
           <tr className="bg-gray-200 text-gray-900 text-center font-bold">
              <td className="border border-black p-2">kg/m²</td>
              <td className="border border-black p-2">daN/m²</td>
              <td className="border border-black p-2" colSpan={4}></td>
              <td className="border border-black p-2" colSpan={4}></td>
          </tr>
        </thead>

        <tbody className="text-center text-gray-900">
          {[
            ["60", "58", "285", "315", "345", "485", "400", "400", "455", "505", "550", "560"],
            ["80", "78", "255", "285", "315", "485", "375", "405", "445", "490", "495", ""],
            ["100", "98", "235", "265", "300", "415", "375", "385", "410", "460", "470", ""],
            ["120", "117", "225", "255", "280", "345", "355", "360", "385", "430", "450", ""],
            ["140", "137", "205", "225", "250", "310", "340", "340", "370", "420", "430", ""],
            ["160", "156", "195", "215", "235", "280", "325", "325", "345", "370", "370", ""],
          ].map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 ? "bg-gray-50" : "bg-white"}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`border border-black p-2 ${
                    !cell ? "bg-red-300 text-white" : "bg-transparent"
                  }`}
                >
                  {cell || "EMPTY"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-gray-600 mt-4">
        <strong>Legend:</strong>
          <span className="inline-block bg-red-300 text-white px-1 mx-1">EMPTY</span> =
        missing or stripped cell.
          <span className="inline-block bg-yellow-100 px-1 mx-1">YELLOW</span> =
        first column headers.
          <span className="inline-block bg-green-100 px-1 mx-1">GREEN</span> /
        <span className="inline-block bg-blue-100 px-1 mx-1">BLUE</span> =
        grouped headers.
      </p>
    </div>
  );
}


export default function BardageProduct({ product }: { product: any }) {
    // CSV data for thermal coefficient table
   const thermalCoefficientCSV = `Épaisseur en mm,30,35,40,50,60
W/m²K,0.65,0.56,0.50,0.40,0.34
Kcal/hm²°C,0.57,0.49,0.44,0.35,0.30`;

    // CSV data for panel dimensions table
   const panelDimensionsCSV = `Type,Longueur (mm),Largeur standard (mm),Épaisseur (mm),Poids Kg/m²
LL30,15400,1000,30,9.6
LL35,15400,1000,35,9.8
LL40,15400,1000,40,10
LL50,15400,1000,50,10.4
LL60,15400,1000,60,10.8`;

   const parsedThermalCoefficient = Papa.parse(thermalCoefficientCSV, { header: false }).data;
   const parsedPanelDimensions = Papa.parse(panelDimensionsCSV, { header: false }).data;

   const thermalCoeffHeaders = parsedThermalCoefficient[0] as string[];
   const thermalCoeffBody = parsedThermalCoefficient.slice(1) as string[][];

   const panelDimHeaders = parsedPanelDimensions[0] as string[];
   const panelDimBody = parsedPanelDimensions.slice(1) as string[][];


  return (
    <div className="bg-background min-h-screen p-8 font-sans relative">
      <div className="max-w-7xl mx-auto">
        <div className="border-l-8 border-accent pl-4 mb-6">
          <h1 className="text-2xl font-bold text-accent uppercase">
            ■ 2-PANNEAUX SANDWICHS DE BARDAGE
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div>
            <h2 className="text-xl font-bold text-accent mb-4">CARACTÉRISTIQUE PRODUIT</h2>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Utilisation :</h3>
              <p className="text-sm mb-2">Les panneaux sandwichs de bardage sont utilisés pour :</p>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Atelier de production.</li>
                <li>Entrepôts.</li>
                <li>Bâtiments industrielle & modulaires.</li>
                <li>Centres commerciaux.</li>
                <li>Complexe sportifs.</li>
                <li>Ensembles scolaires et universitaires.</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Definition :</h3>
              <p className="text-sm mb-2">Identification d'acier : Nuance S250, S280, S320:</p>
              <p className="text-sm mb-2 list-item ml-4">Profil à nervurassions en faible profondeur, pour le type lisse pas de nervurassions.</p>
              <p className="text-sm list-item ml-4">Épaisseur : 0,5mm - 0.6 mm - 0.7 mm (selon la demande du client)</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Revêtement :</h3>
              <p className="text-sm">polyester pour la face extérieure : 25 µm</p>
              <p className="text-sm">polyester pour la face intérieure : 7µm</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Âme isolante : <span className="font-normal">Mousse polyuréthane rigide sans CFC</span></h3>
              <p className="text-sm">(avec du N-Pentane)</p>
            </div>

            <div className="mb-4">
              <p className="text-sm"><span className="font-bold">Conductivité thermique :</span> 0.023 W/m. °c</p>
              <p className="text-sm"><span className="font-bold">Densité (kg/m³) =</span> 38/41 kg m3</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Réaction au feu</h3>
              <p className="text-sm">B3 : standard</p>
              <p className="text-sm">B-S2-d0.</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2">Tolérance sur panneaux</h3>
              <p className="text-sm">Sur épaisseur ±3mm</p>
              <p className="text-sm">Sur longueur ± 3mm</p>
              <p className="text-sm">Sur largeur ± 3mm</p>
              <p className="text-sm">Sur équerrage ± 3mm</p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold mb-3">Coefficient d'isolation thermique</h3>
              <Table>
                <TableHeader>
                  <TableRow className="bg-accent text-accent-foreground">
                    {thermalCoeffHeaders.map((header: string, index: number) => <TableHead key={index} className="text-accent-foreground" dangerouslySetInnerHTML={{ __html: header.replace('en mm', 'en<br/>mm')}}></TableHead>)}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {thermalCoeffBody.map((row: any, rowIndex: number) => (
                    <TableRow key={rowIndex}>
                      {row.map((cell: string, cellIndex: number) => <TableCell key={cellIndex} className={cellIndex === 0 ? 'bg-secondary/20 font-medium' : 'text-center'}>{cell}</TableCell>)}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-3">Dimensionnement du panneau</h3>
                <Table>
                  <TableHeader>
                    <TableRow className="bg-accent text-accent-foreground">
                      {panelDimHeaders.map((header: string, index: number) => <TableHead key={index} className="text-accent-foreground" dangerouslySetInnerHTML={{ __html: header.replace('(mm)', '<br/>(mm)').replace('kg/m²', 'Kg/m²') }}></TableHead>)}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {panelDimBody.map((row: any, rowIndex: number) => (
                      <TableRow key={rowIndex} className="bg-secondary/30">
                        {row.map((cell: string, cellIndex: number) => <TableCell key={cellIndex} className={cellIndex === 0 ? 'font-semibold' : 'text-center'}>{cell}</TableCell>)}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
            </div>
             <div className="mb-6">
               <h3 className="font-semibold text-gray-700 mb-3">Étanchéité des rives</h3>
               <p className="text-sm text-justify mb-2">
                 Les panneaux sandwichs de bardages présentent une rive mâle et une rive femelle permettant un assemblage par emboîtement.
               </p>
               <p className="text-sm text-justify mb-2">
                 Les nervures mâle et femelle sont fermées par une bande adhésive.
               </p>
               <p className="text-sm text-justify">
                 Tous les panneaux bardage sont munis sur la nervure femelle d'un joint d'étanchéité à l'air ; leurs parements pré-laqués sont protégés par un filmadhésif à retirer à la pose .
               </p>
             </div>
             
             <ChargesTableDebug />

             <div className="mb-6">
               <h3 className="font-semibold mb-3">Caractéristiques Géométriques</h3>
               <div className="border-2 border-border bg-secondary/10 p-4 mb-3">
                 <div className="bg-white border border-border h-32 flex items-center justify-center mb-2">
                   <span className="text-muted-foreground text-sm">[Schéma technique A]</span>
                 </div>
                 <p className="text-center text-xs">Panneaux sandwichs de bardage nervuré/nervuré</p>
               </div>
                <div className="border-2 border-border bg-secondary/10 p-4">
                 <div className="bg-white border border-border h-32 flex items-center justify-center mb-2">
                   <span className="text-muted-foreground text-sm">[Schéma technique B]</span>
                 </div>
                 <p className="text-center text-xs">Panneaux sandwichs de bardage lisse/nervuré</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
