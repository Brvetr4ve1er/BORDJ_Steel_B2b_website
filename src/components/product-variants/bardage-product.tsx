
import React from 'react';
import Papa from 'papaparse';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OneSupportIcon } from '../product-variants/one-support-icon';
import { TwoSupportsIcon } from '../product-variants/two-supports-icon';
import Image from 'next/image';

const LoadCapacityTable = () => {
  return (
    <div className="bg-background p-4">
      <h3 className="text-muted-foreground font-semibold mb-3 text-lg">
        LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)
      </h3>

      <table className="w-full border-collapse text-sm">
        <thead>
          {/* First header row - Red spanning all columns */}
          <tr className="bg-accent text-accent-foreground">
            <th className="border border-border px-2 py-3" rowSpan={4} colSpan={2}>
              Charge utile uniformément<br />répartie
            </th>
            <th className="border border-border px-2 py-3" colSpan={7}>
              Tôle en acier épaisseur 0.5mm
            </th>
          </tr>

          {/* New row for the large SVG icons */}
          <tr className="bg-secondary">
               <th className="border border-border p-2" colSpan={4}>
                <div className="flex items-center justify-center gap-1 mb-1 px-4">
                  <OneSupportIcon className="h-16" />
                </div>
               </th>
               <th className="border border-border px-2 py-2 text-foreground" colSpan={3}>
               <div className="flex items-center justify-center gap-1 mb-1 px-4">
                  <TwoSupportsIcon className="h-16" />
               </div>
              </th>
          </tr>

          {/* Second header row - Gray with icons */}
          <tr className="bg-secondary">
            <th className="border border-border px-2 py-2 text-foreground" colSpan={4}>
              Épaisseur du panneau en mm
            </th>
            <th className="border border-border px-2 py-2 text-foreground" colSpan={3}>
              Épaisseur du panneau en mm
            </th>
          </tr>

          {/* Third header row - Thickness values */}
          <tr>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">30</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">35</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">40</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">60</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">30</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">35</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">40</th>
          </tr>
        </thead>

        <tbody>
          {/* Sub-header row with kg/m² and daN/m² */}
          <tr className="bg-accent text-accent-foreground">
            <td className="border border-border px-2 py-2 font-semibold text-center">kg/m²</td>
            <td className="border border-border px-2 py-2 font-semibold text-center">daN/m²</td>
            <td className="border border-border px-2 py-2 text-center font-semibold" colSpan={4}>
              Entraxe Max cm
            </td>
            <td className="border border-border px-2 py-2 text-center font-semibold" colSpan={3}>
              Entraxe Max cm
            </td>
          </tr>

          {/* Data Rows */}
          {[
             ["60", "58", "285", "315", "345", "405", "455", "505", "550"],
             ["80", "78", "255", "285", "315", "345", "405", "445", "490"],
             ["100", "98", "235", "265", "300", "335", "385", "410", "460"],
             ["120", "117", "225", "255", "280", "310", "360", "385", "430"],
             ["140", "137", "205", "225", "250", "285", "340", "370", "420"],
             ["160", "156", "195", "215", "235", "280", "325", "345", "370"],
          ].map((row, rowIndex) => (
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
              <h3 className="font-bold mb-2 text-lg">Utilisation :</h3>
              <p className="text-base mb-2">Les panneaux sandwichs de bardage sont utilisés pour :</p>
              <ul className="text-base space-y-1 list-disc list-inside">
                <li>Atelier de production.</li>
                <li>Entrepôts.</li>
                <li>Bâtiments industrielle & modulaires.</li>
                <li>Centres commerciaux.</li>
                <li>Complexe sportifs.</li>
                <li>Ensembles scolaires et universitaires.</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2 text-lg">Definition :</h3>
              <p className="text-base mb-2 list-item ml-4">
                Identification d'acier : Nuance S250, S280, S320:
              </p>
              <p className="text-base mb-2 list-item ml-4">
                Profil à nervurassions en faible profondeur, pour le type lisse pas de nervurassions.
              </p>
              <p className="text-base list-item ml-4">
                Épaisseur : 0,5mm - 0.6 mm - 0.7 mm (selon la demande du client)
              </p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2 text-lg">Revêtement :</h3>
              <p className="text-base">polyester pour la face extérieure : 25 µm</p>
              <p className="text-base">polyester pour la face intérieure : 7µm</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2 text-lg">Âme isolante : <span className="font-normal">Mousse polyuréthane rigide sans CFC</span></h3>
              <p className="text-base">(avec du N-Pentane)</p>
            </div>

            <div className="mb-4">
              <p className="text-base"><span className="font-bold">Conductivité thermique :</span> 0.023 W/m. °c</p>
              <p className="text-base"><span className="font-bold">Densité (kg/m³) =</span> 38/41 kg m3</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2 text-lg">Réaction au feu</h3>
              <p className="text-base">B3 : standard</p>
              <p className="text-base">B-S2-d0.</p>
            </div>

            <div className="mb-6">
              <h3 className="font-bold mb-2 text-lg">Tolérance sur panneaux</h3>
              <p className="text-base">Sur épaisseur ±3mm</p>
              <p className="text-base">Sur longueur ± 3mm</p>
              <p className="text-base">Sur largeur ± 3mm</p>
              <p className="text-base">Sur équerrage ± 3mm</p>
            </div>

            <div className="mb-4">
              <h3 className="font-bold mb-3 text-lg">Coefficient d'isolation thermique</h3>
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
              <h3 className="font-bold mb-3 text-lg">Dimensionnement du panneau</h3>
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
               <h3 className="font-semibold text-gray-700 mb-3 text-lg">Étanchéité des rives</h3>
               <p className="text-base text-justify mb-2">
                 Les panneaux sandwichs de bardages présentent une rive mâle et une rive femelle permettant un assemblage par emboîtement.
               </p>
               <p className="text-base text-justify mb-2">
                 Les nervures mâle et femelle sont fermées par une bande adhésive.
               </p>
               <p className="text-base text-justify">
                 Tous les panneaux bardage sont munis sur la nervure femelle d'un joint d'étanchéité à l'air ; leurs parements pré-laqués sont protégés par un filmadhésif à retirer à la pose .
               </p>
             </div>
             
             <LoadCapacityTable />

             <div className="mb-6">
               <h3 className="font-semibold text-lg mb-3">Caractéristiques Géométriques</h3>
               <div className="border-2 border-border bg-secondary/10 p-4 mb-3">
                 <div className="bg-white border border-border p-4">
                    <Image 
                      src="https://www.imghippo.com/i/OxI3616rCI.png"
                      alt="Schéma technique A"
                      width={600}
                      height={200}
                      className="object-contain w-full h-auto"
                      data-ai-hint="technical drawing"
                    />
                 </div>
                 <p className="text-center text-sm mt-2">Panneaux sandwichs de bardage nervuré/nervuré</p>
               </div>
                <div className="border-2 border-border bg-secondary/10 p-4 mb-3">
                 <div className="bg-white border border-border p-4 flex items-center justify-center">
                    <Image 
                      src="https://i.imghippo.com/files/Xii4624Ovg.png"
                      alt="Schéma technique B"
                      width={600}
                      height={200}
                      className="object-contain w-full h-auto"
                      data-ai-hint="technical drawing"
                    />
                 </div>
                 <p className="text-center text-sm mt-2">Panneaux sandwichs de bardage lisse/nervuré</p>
               </div>
               <div className="border-2 border-border bg-secondary/10 p-4">
                 <div className="bg-white border border-border p-4 flex items-center justify-center">
                    <Image 
                      src="https://i.imghippo.com/files/lo9648YNk.png"
                      alt="Schéma technique C"
                      width={600}
                      height={200}
                      className="object-contain w-full h-auto"
                      data-ai-hint="technical drawing"
                    />
                 </div>
                 <p className="text-center text-sm mt-2">Panneaux sandwichs de bardage lisse/lisse</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
