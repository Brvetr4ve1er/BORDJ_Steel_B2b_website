
import React from 'react';
import Papa from 'papaparse';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


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
            <th className="border border-border px-2 py-3" rowSpan={3} colSpan={2}>
              Charge utile uniformément<br />répartie
            </th>
            <th className="border border-border px-2 py-3" colSpan={10}>
              Tôle en acier épaisseur 0.5mm
            </th>
          </tr>

          {/* Second header row - Gray with icons */}
          <tr className="bg-secondary">
            <th className="border border-border px-2 py-2 text-foreground" colSpan={5}>
              <div className="flex items-center justify-center gap-1 mb-1">
                <svg width="30" height="20" viewBox="0 0 30 20" className="inline-block">
                  <path d="M 2 10 L 8 10 L 8 5 L 12 5 L 12 15 L 8 15 L 8 10 L 2 10"
                         fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="15" y1="10" x2="28" y2="10" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              Épaisseur du panneau en mm
            </th>
            <th className="border border-border px-2 py-2 text-foreground" colSpan={5}>
              <div className="flex items-center justify-center gap-1 mb-1">
                <svg width="40" height="20" viewBox="0 0 40 20" className="inline-block">
                  <path d="M 2 10 L 8 10 L 8 5 L 12 5 L 12 15 L 8 15 L 8 10 L 2 10"
                         fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="15" y1="10" x2="20" y2="10" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M 22 10 L 26 10 L 26 5 L 30 5 L 30 15 L 26 15 L 26 10 L 22 10"
                         fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <line x1="33" y1="10" x2="38" y2="10" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </div>
              Épaisseur du panneau en mm
            </th>
          </tr>

          {/* Third header row - Thickness values */}
          <tr>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">30</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">35</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">40</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">50</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">60</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">30</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">35</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">40</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">50</th>
            <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">60</th>
          </tr>
        </thead>

        <tbody>
          {/* Sub-header row with kg/m² and daN/m² */}
          <tr className="bg-accent text-accent-foreground">
            <td className="border border-border px-2 py-2 font-semibold text-center">kg/m²</td>
            <td className="border border-border px-2 py-2 font-semibold text-center">daN/m²</td>
            <td className="border border-border px-2 py-2 text-center font-semibold" colSpan={5}>
              Entraxe Max cm
            </td>
            <td className="border border-border px-2 py-2 text-center font-semibold" colSpan={5}>
              Entraxe Max cm
            </td>
          </tr>

          {/* Data Row 1 - 60 kg/m² */}
          <tr className="bg-background">
            <td className="border border-border px-3 py-2 font-semibold text-center">60</td>
            <td className="border border-border px-3 py-2 text-center font-semibold">58</td>
            <td className="border border-border px-2 py-2 text-center">285</td>
            <td className="border border-border px-2 py-2 text-center">315</td>
            <td className="border border-border px-2 py-2 text-center">345</td>
            <td className="border border-border px-2 py-2 text-center">485</td>
            <td className="border border-border px-2 py-2 text-center">400</td>
            <td className="border border-border px-2 py-2 text-center">425</td>
            <td className="border border-border px-2 py-2 text-center">455</td>
            <td className="border border-border px-2 py-2 text-center">560</td>
            <td className="border border-border px-2 py-2 text-center">455</td>
            <td className="border border-border px-2 py-2 text-center">560</td>
          </tr>

          {/* Data Row 2 - 80 kg/m² */}
          <tr className="bg-muted/50">
            <td className="border border-border px-3 py-2 font-semibold text-center">80</td>
            <td className="border border-border px-3 py-2 text-center font-semibold">78</td>
            <td className="border border-border px-2 py-2 text-center">255</td>
            <td className="border border-border px-2 py-2 text-center">285</td>
            <td className="border border-border px-2 py-2 text-center">335</td>
            <td className="border border-border px-2 py-2 text-center">415</td>
            <td className="border border-border px-2 py-2 text-center">345</td>
            <td className="border border-border px-2 py-2 text-center">365</td>
            <td className="border border-border px-2 py-2 text-center">390</td>
            <td className="border border-border px-2 py-2 text-center">485</td>
            <td className="border border-border px-2 py-2 text-center">390</td>
            <td className="border border-border px-2 py-2 text-center">485</td>
          </tr>

          {/* Data Row 3 - 100 kg/m² */}
          <tr className="bg-background">
            <td className="border border-border px-3 py-2 font-semibold text-center">100</td>
            <td className="border border-border px-3 py-2 text-center font-semibold">98</td>
            <td className="border border-border px-2 py-2 text-center">235</td>
            <td className="border border-border px-2 py-2 text-center">260</td>
            <td className="border border-border px-2 py-2 text-center">305</td>
            <td className="border border-border px-2 py-2 text-center">375</td>
            <td className="border border-border px-2 py-2 text-center">315</td>
            <td className="border border-border px-2 py-2 text-center">335</td>
            <td className="border border-border px-2 py-2 text-center">385</td>
            <td className="border border-border px-2 py-2 text-center">440</td>
            <td className="border border-border px-2 py-2 text-center">385</td>
            <td className="border border-border px-2 py-2 text-center">440</td>
          </tr>

          {/* Data Row 4 - 120 kg/m² */}
          <tr className="bg-muted/50">
            <td className="border border-border px-3 py-2 font-semibold text-center">120</td>
            <td className="border border-border px-3 py-2 text-center font-semibold">117</td>
            <td className="border border-border px-2 py-2 text-center">220</td>
            <td className="border border-border px-2 py-2 text-center">245</td>
            <td className="border border-border px-2 py-2 text-center">265</td>
            <td className="border border-border px-2 py-2 text-center">310</td>
            <td className="border border-border px-2 py-2 text-center">355</td>
            <td className="border border-border px-2 py-2 text-center">285</td>
            <td className="border border-border px-2 py-2 text-center">360</td>
            <td className="border border-border px-2 py-2 text-center">310</td>
            <td className="border border-border px-2 py-2 text-center">360</td>
            <td className="border border-border px-2 py-2 text-center">310</td>
          </tr>

          {/* Data Row 5 - 140 kg/m² */}
          <tr className="bg-background">
            <td className="border border-border px-3 py-2 font-semibold text-center">140</td>
            <td className="border border-border px-3 py-2 text-center font-semibold">137</td>
            <td className="border border-border px-2 py-2 text-center">205</td>
            <td className="border border-border px-2 py-2 text-center">225</td>
            <td className="border border-border px-2 py-2 text-center">250</td>
            <td className="border border-border px-2 py-2 text-center">395</td>
            <td className="border border-border px-2 py-2 text-center">235</td>
            <td className="border border-border px-2 py-2 text-center">240</td>
            <td className="border border-border px-2 py-2 text-center">340</td>
            <td className="border border-border px-2 py-2 text-center">290</td>
            <td className="border border-border px-2 py-2 text-center">290</td>
            <td className="border border-border px-2 py-2 text-center">290</td>
          </tr>

          {/* Data Row 6 - 160 kg/m² */}
          <tr className="bg-muted/50">
            <td className="border border-border px-3 py-2 font-semibold text-center">160</td>
            <td className="border border-border px-3 py-2 text-center font-semibold">156</td>
            <td className="border border-border px-2 py-2 text-center">195</td>
            <td className="border border-border px-2 py-2 text-center">215</td>
            <td className="border border-border px-2 py-2 text-center">235</td>
            <td className="border border-border px-2 py-2 text-center">280</td>
            <td className="border border-border px-2 py-2 text-center">315</td>
            <td className="border border-border px-2 py-2 text-center">230</td>
            <td className="border border-border px-2 py-2 text-center">225</td>
            <td className="border border-border px-2 py-2 text-center">375</td>
            <td className="border border-border px-2 py-2 text-center">325</td>
            <td className="border border-border px-2 py-2 text-center">370</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};


const CouvertureProduct = ({ product }: { product: any }) => {

    const thermalCoefficientCSV = `Épaisseur en mm,30,35,40,60
W/m²K,0.55,0.49,0.44,0.31
Kcal/hm²°C,0.48,0.43,0.38,0.27`;

    const panelDimensionsCSV = `Type,Longueur (mm),Largeur standard (mm),Épaisseur (mm),Poids kg/m²
TL70,15400,1000,30,10.3
TL75,15400,1000,35,10.5
TL80,15400,1000,40,10.7
TL100,15400,1000,60,11.5`;

    const thermalData = Papa.parse(thermalCoefficientCSV).data;
    const dimensionsData = Papa.parse(panelDimensionsCSV).data;
    
    return (
     <div className="bg-background p-8 font-sans text-foreground">
       <div className="max-w-7xl mx-auto">
         {/* Header */}
         <div className="border-l-8 border-accent pl-4 mb-8">
           <h1 className="text-3xl font-bold text-accent uppercase">
             ■ 1-PANNEAUX SANDWICHS DE COUVERTURE
           </h1>
           <p className="text-lg text-muted-foreground">(à 05 ondes Ép de 30 mm jusqu'au 60 mm)</p>
         </div>

          <div className="grid grid-cols-1 gap-12">
           {/* Content Column */}
           <div className="space-y-8">
             {/* Caractéristique Produit */}
             <h2 className="text-2xl font-bold text-accent mb-4">CARACTÉRISTIQUE PRODUIT</h2>

             {/* Utilisation */}
             <div className="mb-6">
               <h3 className="font-bold text-xl mb-2">Utilisation</h3>
               <ul className="text-lg space-y-1 list-disc list-inside">
                 <li>Bâtiments industriels et modulaires</li>
                 <li>Ateliers de production</li>
                 <li>Entrepôts</li>
                 <li>Centres commerciaux</li>
                 <li>Complexes sportifs</li>
                 <li>Ensembles scolaires et universitaires</li>
                 <li className="ml-4">ainsi que dans toute autre construction</li>
                 <li className="ml-4">nécessitant une isolation thermique</li>
               </ul>
             </div>

              {/* Definition */}
             <div className="mb-6">
               <h3 className="font-bold text-xl mb-2">Definition</h3>
               <p className="text-lg mb-2">
                 Identification d'acier : Nuance S250,<br />
                 S280
               </p>
               <p className="text-lg mb-1 font-semibold">Parement externe</p>
               <p className="text-lg mb-1 list-item ml-4">Profil type: 5 .40 .1000 mm</p>
               <p className="text-lg mb-1">4 ondes profondes et 1 onde sans<br />mousse</p>
               <p className="text-lg mb-2">Épaisseur : 0.5mm - 0.6 mm - 0.7 mm</p>
               <p className="text-lg mb-1 font-semibold">Parement interne</p>
               <p className="text-lg mb-1 list-item ml-4">Profil à nervuration en faible<br />profondeur</p>
               <p className="text-lg">Épaisseur : 0.5mm - 0.6 mm - 0.7 mm</p>
             </div>

              {/* Revêtement */}
             <div className="mb-6">
               <h3 className="font-bold text-xl mb-2">Revêtement :</h3>
               <p className="text-lg">polyester pour la face extérieure : 25 µm</p>
               <p className="text-lg">polyester pour la face intérieure : 7µm</p>
             </div>

              {/* Âme isolante */}
             <div className="mb-6">
               <h3 className="font-bold text-xl mb-2">Âme isolante : <span className="font-normal">Mousse polyuréthane</span></h3>
               <p className="text-lg">rigide sans CFC (avec du N-Pentane)</p>
               <p className="text-lg">Conductivité thermique : 0.023 W/m. °c</p>
               <p className="text-lg">Densité (kg/m³) = 38/41 kg m3</p>
             </div>

              {/* Réaction au feu */}
             <div className="mb-6">
               <h3 className="font-bold text-xl mb-2">Réaction au feu</h3>
               <p className="text-lg">B3 : standard</p>
               <p className="text-lg">B-S2-d0.</p>
             </div>

              {/* Tolérance sur panneaux */}
             <div className="mb-6">
               <h3 className="font-bold text-xl mb-2">Tolérance sur panneaux</h3>
               <p className="text-lg">Sur épaisseur ±3mm</p>
               <p className="text-lg">Sur longueur ± 3mm</p>
               <p className="text-lg">Sur largeur ± 3mm</p>
               <p className="text-lg">Sur équerrage ± 3mm</p>
             </div>

              {/* Dimensionnement du panneau */}
             <div className="mb-6">
               <h3 className="font-bold text-xl mb-3">Dimensionnement du panneau</h3>
               <div className="overflow-x-auto">
                 <Table>
                   <TableHeader>
                     <TableRow className="bg-accent text-accent-foreground">
                       {(dimensionsData[0] as string[]).map((header: string, index: number) => <TableHead key={index} className="text-accent-foreground" dangerouslySetInnerHTML={{ __html: header }}></TableHead>)}
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                    {(dimensionsData.slice(1) as string[][]).map((row: string[], rowIndex: number) => (
                      <TableRow key={rowIndex} className="bg-secondary/30">
                        {row.map((cell: string, cellIndex: number) => <TableCell key={cellIndex} className="text-center text-lg">{cell}</TableCell>)}
                      </TableRow>
                    ))}
                   </TableBody>
                 </Table>
               </div>
             </div>

              {/* Coefficient d'isolation thermique */}
             <div className="mb-6">
               <h3 className="font-bold text-xl mb-3">Coefficient d'isolation thermique</h3>
               <Table>
                 <TableHeader>
                   <TableRow className="bg-accent/20">
                    {(thermalData[0] as string[]).map((header: string, index: number) => (
                        <TableHead key={index} className="text-accent" dangerouslySetInnerHTML={{ __html: header.replace(' ', '<br/>') }}></TableHead>
                    ))}
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                    {(thermalData.slice(1) as string[][]).map((row: string[], rowIndex: number) => (
                        <TableRow key={rowIndex}>
                            {row.map((cell: string, cellIndex: number) => (
                                <TableCell key={cellIndex} className={`text-center text-lg ${cellIndex === 0 ? 'bg-secondary/30 font-semibold' : ''}`}>{cell}</TableCell>
                            ))}
                        </TableRow>
                    ))}
                 </TableBody>
               </Table>
             </div>

              {/* Étanchéité des rives */}
             <div className="mb-6">
               <h3 className="font-bold text-xl mb-2">Étanchéité des rives</h3>
               <p className="text-lg text-justify">
                 Les panneaux sandwichs de couverture présentent une rive mâle (avec mousse) et une
                  nervure femelle (sans mousse) permettant un assemblage par emboîtement.
               </p>
               <p className="text-lg text-justify">
                 La nervure mâle est fermée par une bande adhésive, et la nervure femelle d'un joint
                  d'étanchéité à l'air
               </p>
             </div>

              {/* Sens des panneaux */}
             <div className="mb-6">
               <h3 className="font-bold text-xl mb-2">Sens des panneaux</h3>
               <p className="text-lg text-justify">
                 les panneaux sandwichs de couverture sont désignés en fonction de leur situation sur
                  l'ouvrage et par rapport à la direction des vents dominants.
               </p>
               <p className="text-lg text-justify">
                 Un panneau est de type droit si la nervure de la rive longitudinale femelle venant en
                  recouvrement en regardant le faîtage. il est de type gauche dans le sens inverse.
               </p>
             </div>
              {/* La pose de panneaux sandwichs */}
             <div className="mb-6">
               <h3 className="font-bold text-xl mb-3">La pose de panneaux sandwichs</h3>

               <h4 className="font-semibold text-lg mb-2">Découpage des panneaux :</h4>
               <p className="text-lg mb-4">
                 Pour avoir un bon résultat il est conseillé d'utiliser
                  une scie sauteuse électrique à lame d'acier.
               </p>

                <h4 className="font-semibold text-lg mb-2">Fixation des panneaux :</h4>
               <p className="text-lg text-justify mb-4">
                 Les panneaux doivent être fixés au sommet de chaque nervure
                  sur les pannes porteuses. Sur les pannes intermédiaires.
                  Lors de la pose, les panneaux doivent être serrés sur la partie
                  Longitudinale afin que le joint d'étanchéité à l'air remplisse son
                  rôle. Il est recommandé d'utiliser un joint d'étanchéité à l'air en
                  face adhésive sur les faces d'appuis du panneau situées sur les pannes
                  d'extrémité, les chéneaux, les gouttières, les recouvrements.
               </p>
             </div>

             <LoadCapacityTable />

              {/* Caractéristiques Géométriques */}
             <div className="mb-6">
               <h3 className="font-semibold text-xl mb-3">Caractéristiques Géométriques</h3>
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
                 <p className="text-center text-lg">Couverture avec 5 ondes</p>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
 };
export default CouvertureProduct;
