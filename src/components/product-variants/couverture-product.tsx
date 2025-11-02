
import React from 'react';
import Papa from 'papaparse';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


const ChargesTable = () => {
   return (
     <div className="overflow-x-auto my-8">
       <table className="min-w-full border border-border text-base text-center">
         {/* Top Header */}
         <thead>
           <tr>
             <th
               colSpan={11}
               className="bg-accent text-accent-foreground font-semibold py-2 border border-border"
             >
               LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)
             </th>
           </tr>
           <tr>
             <th
               colSpan={11}
               className="bg-secondary/20 text-foreground font-medium py-2 border border-border"
             >
               Tôle en acier épaisseur 0,5mm
             </th>
           </tr>
            
            {/* SVG Icon Row */}
            <tr className="bg-secondary/20">
              <th rowSpan={3} className="border border-border px-3 py-2 text-base align-middle"></th>
              <th rowSpan={3} className="border border-border px-3 py-2 text-base align-middle"></th>
              <th colSpan="8" className="border border-border p-2">
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="1000" zoomAndPan="magnify" viewBox="0 0 750 517.92" height="680" preserveAspectRatio="xMidYMid meet" version="1.0" className="w-24 h-auto mx-auto"><defs><clipPath id="d7b5d2614e"><path d="M 13.917969 171.765625 L 736.082031 171.765625 L 736.082031 245.671875 L 13.917969 245.671875 Z M 13.917969 171.765625 " clip-rule="nonzero"/></clipPath><clipPath id="7747dc7390"><path d="M 0.917969 0.765625 L 723 0.765625 L 723 74.671875 L 0.917969 74.671875 Z M 0.917969 0.765625 " clip-rule="nonzero"/></clipPath><clipPath id="38c88312a4"><rect x="0" width="724" y="0" height="75"/></clipPath><clipPath id="f5288c828e"><path d="M 13.953125 171.765625 L 736.046875 171.765625 L 736.046875 245.664062 L 13.953125 245.664062 Z M 13.953125 171.765625 " clip-rule="nonzero"/></clipPath><clipPath id="c934e68679"><path d="M 13.917969 245.671875 L 174.683594 245.671875 L 174.683594 346.296875 L 13.917969 346.296875 Z M 13.917969 245.671875 " clip-rule="nonzero"/></clipPath><clipPath id="422c1a0f15"><path d="M 94.21875 245.671875 L 174.519531 346.296875 L 13.917969 346.296875 Z M 94.21875 245.671875 " clip-rule="nonzero"/></clipPath><clipPath id="c46bc51134"><path d="M 0.917969 0.671875 L 161.683594 0.671875 L 161.683594 101.296875 L 0.917969 101.296875 Z M 0.917969 0.671875 " clip-rule="nonzero"/></clipPath><clipPath id="219ea61af8"><path d="M 81.21875 0.671875 L 161.519531 101.296875 L 0.917969 101.296875 Z M 81.21875 0.671875 " clip-rule="nonzero"/></clipPath><clipPath id="79220ce091"><rect x="0" width="162" y="0" height="102"/></clipPath><clipPath id="577af55679"><path d="M 13.917969 245.675781 L 174.394531 245.675781 L 174.394531 346.15625 L 13.917969 346.15625 Z M 13.917969 245.675781 " clip-rule="nonzero"/></clipPath><clipPath id="476e3da748"><path d="M 94.214844 245.675781 L 174.511719 346.296875 L 13.917969 346.296875 Z M 94.214844 245.675781 " clip-rule="nonzero"/></clipPath><clipPath id="fe4bbc8465"><path d="M 575.480469 245.671875 L 736.246094 245.671875 L 736.246094 346.296875 L 575.480469 346.296875 Z M 575.480469 245.671875 " clip-rule="nonzero"/></clipPath><clipPath id="ccb44cde5e"><path d="M 655.78125 245.671875 L 736.082031 346.296875 L 575.480469 346.296875 Z M 655.78125 245.671875 " clip-rule="nonzero"/></clipPath><clipPath id="c64c9e1327"><path d="M 0.480469 0.671875 L 161.246094 0.671875 L 161.246094 101.296875 L 0.480469 101.296875 Z M 0.480469 0.671875 " clip-rule="nonzero"/></clipPath><clipPath id="cd7a110029"><path d="M 80.78125 0.671875 L 161.082031 101.296875 L 0.480469 101.296875 Z M 80.78125 0.671875 " clip-rule="nonzero"/></clipPath><clipPath id="ff4f73c67f"><rect x="0" width="162" y="0" height="102"/></clipPath><clipPath id="8ca98bb5de"><path d="M 575.480469 245.675781 L 735.957031 245.675781 L 735.957031 346.15625 L 575.480469 346.15625 Z M 575.480469 245.675781 " clip-rule="nonzero"/></clipPath><clipPath id="d19dfff3f5"><path d="M 655.777344 245.675781 L 736.074219 346.296875 L 575.480469 346.296875 Z M 655.777344 245.675781 " clip-rule="nonzero"/></clipPath></defs><g clip-path="url(#d7b5d2614e)"><g transform="matrix(1, 0, 0, 1, 13, 171)"><g clip-path="url(#38c88312a4)"><g clip-path="url(#7747dc7390)"><path fill="#ffffff" d="M 0.917969 0.765625 L 722.941406 0.765625 L 722.941406 74.671875 L 0.917969 74.671875 Z M 0.917969 0.765625 " fill-opacity="1" fill-rule="nonzero"/></g></g></g></g><g clip-path="url(#f5288c828e)"><path stroke-linecap="butt" transform="matrix(0.749884, 0, 0, 0.749884, 13.952631, 171.766561)" fill="none" stroke-linejoin="miter" d="M 0.000658708 -0.00124831 L 962.941082 -0.00124831 L 962.941082 98.545225 L 0.000658708 98.545225 Z M 0.000658708 -0.00124831 " stroke="#000000" stroke-width="24" stroke-opacity="1" stroke-miterlimit="4"/></g><g clip-path="url(#c934e68679)"><g clip-path="url(#422c1a0f15)"><g transform="matrix(1, 0, 0, 1, 13, 245)"><g clip-path="url(#79220ce091)"><g clip-path="url(#c46bc51134)"><g clip-path="url(#219ea61af8)"><path fill="#ffffff" d="M 0.917969 0.671875 L 161.683594 0.671875 L 161.683594 101.296875 L 0.917969 101.296875 Z M 0.917969 0.671875 " fill-opacity="1" fill-rule="nonzero"/></g></g></g></g></g></g><g clip-path="url(#577af55679)"><g clip-path="url(#476e3da748)"><path stroke-linecap="butt" transform="matrix(0.749884, 0, 0, 0.749884, 13.91891, 245.673971)" fill="none" stroke-linejoin="miter" d="M 107.07778 0.00241434 L 214.156815 134.184593 L -0.00125521 134.184593 Z M 107.07778 0.00241434 " stroke="#000000" stroke-width="24" stroke-opacity="1" stroke-miterlimit="4"/></g></g><g clip-path="url(#fe4bbc8465)"><g clip-path="url(#ccb44cde5e)"><g transform="matrix(1, 0, 0, 1, 575, 245)"><g clip-path="url(#ff4f73c67f)"><g clip-path="url(#c64c9e1327)"><g clip-path="url(#cd7a110029)"><path fill="#ffffff" d="M 0.480469 0.671875 L 161.246094 0.671875 L 161.246094 101.296875 L 0.480469 101.296875 Z M 0.480469 0.671875 " fill-opacity="1" fill-rule="nonzero"/></g></g></g></g></g></g><g clip-path="url(#8ca98bb5de)"><g clip-path="url(#d19dfff3f5)"><path stroke-linecap="butt" transform="matrix(0.749884, 0, 0, 0.749884, 575.480921, 245.673971)" fill="none" stroke-linejoin="miter" d="M 107.078432 0.00241434 L 214.157467 134.184593 L -0.000603004 134.184593 Z M 107.078432 0.00241434 " stroke="#000000" stroke-width="24" stroke-opacity="1" stroke-miterlimit="4"/></g></g></svg>
              </th>
            </tr>


            {/* Subheader with grouping */}
           <tr className="bg-secondary/20 text-foreground font-semibold">
             <th
               rowSpan={2}
               className="border border-border px-3 py-2 text-base align-middle"
             >
               Charge utile uniformément<br />répartie
             </th>
             
             <th
               colSpan={4}
               className="border border-border px-3 py-2 text-base"
             >
               Épaisseur du panneau en mm
             </th>
             <th
               colSpan={5}
               className="border border-border px-3 py-2 text-base"
             >
               Épaisseur du panneau en mm
             </th>
           </tr>

            {/* Second line of headers (visual icons spacing simulated with text) */}
           <tr className="bg-secondary/20">
            <th rowSpan={2} className="border border-border px-3 py-2 text-base align-middle">daN/m²</th>
             <th colSpan="4" className="border border-border px-3 py-2 text-base">
               Entraxe Max cm
             </th>
             <th colSpan="4" className="border border-border px-3 py-2 text-base">
               Entraxe Max cm
             </th>
           </tr>

            {/* Final numeric headers */}
           <tr className="bg-secondary/20">
             <th className="border border-border px-3 py-1">30</th>
             <th className="border border-border px-3 py-1">35</th>
             <th className="border border-border px-3 py-1">40</th>
             <th className="border border-border px-3 py-1">60</th>
             <th className="border border-border px-3 py-1">30</th>
             <th className="border border-border px-3 py-1">35</th>
             <th className="border border-border px-3 py-1">40</th>
             <th className="border border-border px-3 py-1">60</th>
           </tr>
         </thead>

          {/* Table Body */}
         <tbody>
           {[
             [80, 87, 345, 365, 390, 485, 400, 425, 455, 560],
             [120, 177, 290, 310, 335, 415, 345, 365, 390, 485],
             [150, 147, 265, 285, 305, 375, 315, 335, 355, 440],
             [200, 196, 235, 250, 270, 340, 285, 305, 325, 400],
             [250, 245, 210, 225, 245, 305, 255, 275, 295, 360],
           ].map((row, i) => (
             <tr key={i} className="even:bg-gray-50">
               {row.map((val, j) => (
                 <td key={j} className="border border-border px-3 py-2">
                   {val}
                 </td>
               ))}
             </tr>
           ))}
         </tbody>
       </table>
     </div>
   );
 }


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
     <div className="bg-white p-8 font-sans text-foreground">
       <div className="max-w-7xl mx-auto">
         {/* Header */}
         <div className="border-l-8 border-accent pl-4 mb-8">
           <h1 className="text-3xl font-bold text-accent uppercase">
             ■ 1-PANNEAUX SANDWICHS DE COUVERTURE
           </h1>
           <p className="text-lg text-muted-foreground">(à 05 ondes Ép de 30 mm jusqu'au 60 mm)</p>
         </div>

          <div className="grid grid-cols-1 gap-12">
           {/* Left Column */}
           <div>
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
                       {dimensionsData[0].map((header: string, index: number) => <TableHead key={index} className="text-accent-foreground" dangerouslySetInnerHTML={{ __html: header }}></TableHead>)}
                     </TableRow>
                   </TableHeader>
                   <TableBody>
                    {dimensionsData.slice(1).map((row: string[], rowIndex: number) => (
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
                    {thermalData.slice(1).map((row: string[], rowIndex: number) => (
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

             <ChargesTable />

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

```