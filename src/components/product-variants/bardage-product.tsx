import React from 'react';
import Papa from 'papaparse';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

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

    // CSV data for load capacity table
   const loadCapacityCSV = `Charge utile uniformément répartie,daN/m²,Tôle en acier épaisseur 0.5mm,,,,Épaisseur du panneau en mm,,,,
,,30,35,40,50,60,30,35,40,50,60
kg/m²,daN/m²,Entraxe Max cm,,,,Entraxe Max cm,,,,
60,58,285,315,345,485,400,425,455,560,455,560
80,78,255,285,335,415,345,365,390,485,390,485
100,98,235,260,305,375,315,335,385,440,385,440
120,117,220,245,265,310,355,285,360,310,360,310
140,137,205,225,250,395,235,240,340,290,290,290
160,156,195,215,235,280,315,230,225,375,325,370`;

   const parsedThermalCoefficient = Papa.parse(thermalCoefficientCSV, { header: false }).data;
   const parsedPanelDimensions = Papa.parse(panelDimensionsCSV, { header: false }).data;
   const parsedLoadCapacity = Papa.parse(loadCapacityCSV, { header: false }).data;


   const thermalCoeffHeaders = parsedThermalCoefficient[0];
   const thermalCoeffBody = parsedThermalCoefficient.slice(1);

   const panelDimHeaders = parsedPanelDimensions[0];
   const panelDimBody = parsedPanelDimensions.slice(1);


  return (
    <div className="bg-white min-h-screen p-8 font-sans relative">
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
              <p className="text-sm">polyester pour la face extérieure : 25 μm</p>
              <p className="text-sm">polyester pour la face intérieure : 7μm</p>
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
                    {thermalCoeffHeaders.map((header: string, index: number) => <TableHead key={index} className="text-accent-foreground">{header.replace('en mm', 'en<br/>mm')}</TableHead>)}
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
               <h3 className="font-bold text-base mb-2">Étanchéité des rives</h3>
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
              <div className="mb-6">
                <h3 className="font-semibold text-gray-700 mb-3">LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)</h3>
                 <div className="overflow-x-auto my-8">
                    <table className="min-w-full border border-gray-300 text-xs text-center">
                        <thead>
                            <tr><th colSpan={12} className="bg-accent text-accent-foreground font-semibold py-2 border border-border">LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)</th></tr>
                            <tr><th colSpan={12} className="bg-secondary/20 text-foreground font-medium py-2 border border-border">Tôle en acier épaisseur 0,5mm</th></tr>
                            <tr className="bg-secondary/30 text-foreground font-semibold">
                                <th rowSpan={3} className="border border-border px-1 py-2 align-middle">Charge utile<br/>uniformément<br/>répartie</th>
                                <th rowSpan={3} className="border border-border px-1 py-2 align-middle">daN/m²</th>
                                <th colSpan={5} className="border border-border px-1 py-2">Épaisseur du panneau en mm</th>
                                <th colSpan={5} className="border border-border px-1 py-2">Épaisseur du panneau en mm</th>
                            </tr>
                            <tr className="bg-secondary/30"><th colSpan={5} className="border border-border px-1 py-2">Entraxe Max cm</th><th colSpan={5} className="border border-border px-1 py-2">Entraxe Max cm</th></tr>
                            <tr className="bg-secondary/30"><th className="border border-border px-1 py-1">30</th><th className="border border-border px-1 py-1">35</th><th className="border border-border px-1 py-1">40</th><th className="border border-border px-1 py-1">50</th><th className="border border-border px-1 py-1">60</th><th className="border border-border px-1 py-1">30</th><th className="border border-border px-1 py-1">35</th><th className="border border-border px-1 py-1">40</th><th className="border border-border px-1 py-1">50</th><th className="border border-border px-1 py-1">60</th></tr>
                        </thead>
                        <tbody>
                            {[
                                [60, 58, 285, 315, 345, 405, 425, 455, 505, 550, 560],
                                [80, 78, 255, 285, 315, 345, 375, 405, 445, 490, 495],
                                [100, 98, 235, 265, 300, 335, 375, 385, 410, 460, 470],
                                [120, 117, 225, 255, 280, 310, 355, 360, 385, 430, 450],
                                [140, 137, 205, 225, 250, 285, 340, 340, 370, 420, 430],
                                [160, 156, 195, 215, 235, 280, 325, 325, 345, 370, 370]
                            ].map((row, i) => (
                                <tr key={i} className="even:bg-secondary/10">
                                    {row.map((val, j) => (
                                        <td key={j} className="border border-border px-1 py-2">{val}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
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
