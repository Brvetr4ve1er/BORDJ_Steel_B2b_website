
import React from 'react';
import Papa from 'papaparse';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const CouvertureProduct = ({ product }: { product: any }) => {
    // This component is now self-contained with the data provided in the prompt.
    // The 'product' prop is not used, but kept for consistency with other product variant components.

    // CSV data for thermal coefficient table
   const thermalCoefficientCSV = `Épaisseur en mm,30,35,40,60
W/m²K,0.55,0.49,0.44,0.31
Kcal/hm²°C,0.48,0.43,0.38,0.27`;

    // CSV data for panel dimensions table
   const panelDimensionsCSV = `Type,Longueur (mm),Largeur standard (mm),Épaisseur (mm),Poids kg/m²
TL70,15400,1000,30,10.3
TL75,15400,1000,35,10.5
TL80,15400,1000,40,10.7
TL100,15400,1000,60,11.5`;

    // CSV data for load capacity table
   const loadCapacityCSV = `Charge utile uniformément répartie,Tôle en acier épaisseur 0.5mm,,,,Épaisseur du panneau en mm,,,,Épaisseur du panneau en mm,,
,30,35,40,60,30,35,40,60
kg/m²,daN/m²,,Entraxe Max cm,,,Entraxe Max cm,,
80,87,345,365,390,485,400,425,455,560
120,177,290,310,335,415,345,365,390,485
150,147,265,285,305,375,315,335,355,440
200,196,235,250,270,340,285,305,325,400
250,245,210,225,245,305,255,275,295,360`;

    const thermalData = Papa.parse(thermalCoefficientCSV).data;
    const dimensionsData = Papa.parse(panelDimensionsCSV).data;
    const loadData = Papa.parse(loadCapacityCSV).data;

    return (
     <div className="bg-white p-8 font-sans text-foreground">
       <div className="max-w-7xl mx-auto">
         {/* Header */}
         <div className="border-l-8 border-accent pl-4 mb-6">
           <h1 className="text-2xl font-bold text-accent uppercase">
             ■ 1-PANNEAUX SANDWICHS DE COUVERTURE
           </h1>
           <p className="text-sm text-muted-foreground">(à 05 ondes Ép de 30 mm jusqu'au 60 mm)</p>
         </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Left Column */}
           <div>
             {/* Caractéristique Produit */}
             <h2 className="text-xl font-bold text-accent mb-4">CARACTÉRISTIQUE PRODUIT</h2>

             {/* Utilisation */}
             <div className="mb-6">
               <h3 className="font-bold mb-2">Utilisation</h3>
               <ul className="text-sm space-y-1 list-disc list-inside">
                 <li>Bâtiments industriels et modulaires</li>
                 <li>Ateliers de production</li>
                 <li>Entrepôts</li>
                 <li>Centres commerciaux</li>
                 <li>Complexes sportifs</li>
                 <li>Ensembles scolaires et universitaires</li>
                 <li className="ml-2">ainsi que dans toute autre construction</li>
                 <li className="ml-2">nécessitant une isolation thermique</li>
               </ul>
             </div>

              {/* Definition */}
             <div className="mb-6">
               <h3 className="font-bold mb-2">Definition</h3>
               <p className="text-sm mb-2">
                 Identification d'acier : Nuance S250,<br />
                 S280
               </p>
               <p className="text-sm mb-1">Parement externe</p>
               <p className="text-sm mb-1 list-item ml-4">Profil type: 5 .40 .1000 mm</p>
               <p className="text-sm mb-1">4 ondes profondes et 1 onde sans<br />mousse</p>
               <p className="text-sm mb-2">Épaisseur : 0.5mm - 0.6 mm - 0.7 mm</p>
               <p className="text-sm mb-1">Parement interne</p>
               <p className="text-sm mb-1 list-item ml-4">Profil à nervuration en faible<br />profondeur</p>
               <p className="text-sm">Épaisseur : 0.5mm - 0.6 mm - 0.7 mm</p>
             </div>

              {/* Revêtement */}
             <div className="mb-6">
               <h3 className="font-bold mb-2">Revêtement :</h3>
               <p className="text-sm">polyester pour la face extérieure : 25 μm</p>
               <p className="text-sm">polyester pour la face intérieure : 7μm</p>
             </div>

              {/* Âme isolante */}
             <div className="mb-6">
               <h3 className="font-bold mb-2">Âme isolante : <span className="font-normal">Mousse polyuréthane</span></h3>
               <p className="text-sm">rigide sans CFC (avec du N-Pentane)</p>
               <p className="text-sm">Conductivité thermique : 0.023 W/m. °c</p>
               <p className="text-sm">Densité (kg/m³) = 38/41 kg m3</p>
             </div>

              {/* Réaction au feu */}
             <div className="mb-6">
               <h3 className="font-bold mb-2">Réaction au feu</h3>
               <p className="text-sm">B3 : standard</p>
               <p className="text-sm">B-S2-d0.</p>
             </div>

              {/* Tolérance sur panneaux */}
             <div className="mb-6">
               <h3 className="font-bold mb-2">Tolérance sur panneaux</h3>
               <p className="text-sm">Sur épaisseur ±3mm</p>
               <p className="text-sm">Sur longueur ± 3mm</p>
               <p className="text-sm">Sur largeur ± 3mm</p>
               <p className="text-sm">Sur équerrage ± 3mm</p>
             </div>

              {/* Dimensionnement du panneau */}
             <div className="mb-6">
               <h3 className="font-bold mb-3">Dimensionnement du panneau</h3>
               <div className="overflow-x-auto">
                 <table className="w-full text-xs border-collapse">
                   <thead>
                     <tr className="bg-accent text-accent-foreground">
                       {dimensionsData[0].map((header: string, index: number) => <th key={index} className="border border-border px-2 py-1" dangerouslySetInnerHTML={{ __html: header }}></th>)}
                     </tr>
                   </thead>
                   <tbody>
                    {dimensionsData.slice(1).map((row: string[], rowIndex: number) => (
                      <tr key={rowIndex} className="bg-secondary/30">
                        {row.map((cell: string, cellIndex: number) => <td key={cellIndex} className="border border-border px-2 py-1 text-center">{cell}</td>)}
                      </tr>
                    ))}
                   </tbody>
                 </table>
               </div>
             </div>

              {/* Coefficient d'isolation thermique */}
             <div className="mb-6">
               <h3 className="font-bold mb-3">Coefficient d'isolation thermique</h3>
               <table className="w-full text-xs border-collapse">
                 <thead>
                   <tr className="bg-accent/20">
                    {(thermalData[0] as string[]).map((header: string, index: number) => (
                        <th key={index} className="border border-border px-2 py-1 text-accent" dangerouslySetInnerHTML={{ __html: header.replace(' ', '<br/>') }}></th>
                    ))}
                   </tr>
                 </thead>
                 <tbody>
                    {thermalData.slice(1).map((row: string[], rowIndex: number) => (
                        <tr key={rowIndex}>
                            {row.map((cell: string, cellIndex: number) => (
                                <td key={cellIndex} className={`border border-border px-2 py-1 text-center ${cellIndex === 0 ? 'bg-secondary/30 font-semibold' : ''}`}>{cell}</td>
                            ))}
                        </tr>
                    ))}
                 </tbody>
               </table>
             </div>

              {/* Étanchéité des rives */}
             <div className="mb-6">
               <h3 className="font-bold mb-2">Étanchéité des rives</h3>
               <p className="text-sm text-justify">
                 Les panneaux sandwichs de couverture présentent une rive mâle (avec mousse) et une
                  nervure femelle (sans mousse) permettant un assemblage par emboîtement.
               </p>
               <p className="text-sm text-justify">
                 La nervure mâle est fermée par une bande adhésive, et la nervure femelle d'un joint
                  d'étanchéité à l'air
               </p>
             </div>

              {/* Sens des panneaux */}
             <div className="mb-6">
               <h3 className="font-bold mb-2">Sens des panneaux</h3>
               <p className="text-sm text-justify">
                 les panneaux sandwichs de couverture sont désignés en fonction de leur situation sur
                  l'ouvrage et par rapport à la direction des vents dominants.
               </p>
               <p className="text-sm text-justify">
                 Un panneau est de type droit si la nervure de la rive longitudinale femelle venant en
                  recouvrement en regardant le faîtage. il est de type gauche dans le sens inverse.
               </p>
             </div>
           </div>

            {/* Right Column */}
           <div>
              {/* La pose de panneaux sandwichs */}
             <div className="mb-6">
               <h3 className="font-bold text-lg mb-3">La pose de panneaux sandwichs</h3>

               <h4 className="font-semibold mb-2">Découpage des panneaux :</h4>
               <p className="text-sm mb-4">
                 Pour avoir un bon résultat il est conseillé d'utiliser
                  une scie sauteuse électrique à lame d'acier.
               </p>

                <h4 className="font-semibold mb-2">Fixation des panneaux :</h4>
               <p className="text-sm text-justify mb-4">
                 Les panneaux doivent être fixés au sommet de chaque nervure
                  sur les pannes porteuses. Sur les pannes intermédiaires.
                  Lors de la pose, les panneaux doivent être serrés sur la partie
                  Longitudinale afin que le joint d'étanchéité à l'air remplisse son
                  rôle. Il est recommandé d'utiliser un joint d'étanchéité à l'air en
                  face adhésive sur les faces d'appuis du panneau situées sur les pannes
                  d'extrémité, les chéneaux, les gouttières, les recouvrements.
               </p>
             </div>

              {/* Load capacity table */}
             <div className="mb-6">
               <h3 className="font-semibold mb-3">LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)</h3>
                <table className="w-full text-xs border-collapse">
                    <thead>
                        <tr className="bg-accent text-accent-foreground">
                            <th className="border border-border px-1 py-2" rowSpan={3}>Charge utile<br/>uniformément<br/>répartie</th>
                            <th className="border border-border px-1 py-2" colSpan={8}>Tôle en acier épaisseur 0.5mm</th>
                        </tr>
                        <tr className="bg-secondary/50 text-foreground">
                            <th className="border border-border px-1 py-1" colSpan={4}>Épaisseur du panneau en mm</th>
                            <th className="border border-border px-1 py-1" colSpan={4}>Épaisseur du panneau en mm</th>
                        </tr>
                        <tr className="bg-secondary/30 text-foreground">
                            <th className="border border-border px-1 py-1">30</th>
                            <th className="border border-border px-1 py-1">35</th>
                            <th className="border border-border px-1 py-1">40</th>
                            <th className="border border-border px-1 py-1">60</th>
                            <th className="border border-border px-1 py-1">30</th>
                            <th className="border border-border px-1 py-1">35</th>
                            <th className="border border-border px-1 py-1">40</th>
                            <th className="border border-border px-1 py-1">60</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-accent text-accent-foreground">
                            <td className="border border-border px-2 py-1">kg/m²</td>
                            <td className="border border-border px-2 py-1 bg-secondary/30 text-foreground">daN/m²</td>
                            <td className="border border-border px-2 py-1 text-center" colSpan={4}>Entraxe Max cm</td>
                            <td className="border border-border px-2 py-1 text-center" colSpan={4}>Entraxe Max cm</td>
                        </tr>
                        {loadData.slice(3).map((row: any, rowIndex: number) => (
                           <tr key={rowIndex}>
                            {row.map((cell: string, cellIndex: number) => (
                                <td key={cellIndex} className={`border border-border px-2 py-1 text-center ${cellIndex === 0 ? 'bg-accent text-accent-foreground' : cellIndex === 1 ? 'bg-secondary/30' : ''}`}>{cell}</td>
                            ))}
                           </tr>
                        ))}
                    </tbody>
                </table>
             </div>

              {/* Caractéristiques Géométriques */}
             <div className="mb-6">
               <h3 className="font-semibold mb-3">Caractéristiques Géométriques</h3>
               <div className="border border-border p-4 bg-gray-50">
                 <div className="bg-white p-4 mb-2">
                   <svg viewBox="0 0 800 100" className="w-full">
                     {/* Technical drawing representation */}
                     <line x1="50" y1="50" x2="750" y2="50" stroke="black" strokeWidth="2"/>
                     <line x1="50" y1="30" x2="50" y2="70" stroke="black" strokeWidth="2"/>
                     <line x1="750" y1="30" x2="750" y2="70" stroke="black" strokeWidth="2"/>
                     {/* Wave pattern */}
                     <path d="M 100 50 Q 125 30, 150 50 T 200 50 T 250 50 T 300 50 T 350 50"
                            stroke="black" fill="none" strokeWidth="2"/>
                     <path d="M 450 50 Q 475 70, 500 50 T 550 50 T 600 50 T 650 50 T 700 50"
                            stroke="black" fill="none" strokeWidth="2"/>
                   </svg>
                 </div>
                 <p className="text-center text-sm">Couverture avec 5 ondes</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };
export default CouvertureProduct;
