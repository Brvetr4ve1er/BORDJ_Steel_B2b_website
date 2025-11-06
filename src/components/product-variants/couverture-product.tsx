
import React from 'react';
import Papa from 'papaparse';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OneSupportIcon } from './one-support-icon';
import { TwoSupportsIcon } from './two-supports-icon';
import Image from 'next/image';


const ChargesTable = () => {
    return (
      <div className="bg-background p-4">
        <h3 className="text-muted-foreground font-semibold mb-3 text-lg">
          LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)
        </h3>
  
        <table className="w-full border-collapse text-sm">
        <thead>
            <tr className="bg-accent text-accent-foreground">
              <th className="border border-border px-2 py-3" colSpan={2} rowSpan={4}>
                Charge utile uniformément<br />répartie
              </th>
              <th className="border border-border px-2 py-3" colSpan={8}>
                Tôle en acier épaisseur 0.5mm
              </th>
            </tr>
  
             <tr className="bg-secondary">
               <th className="border border-border p-2" colSpan={4}>
                <div className="flex items-center justify-center gap-1 mb-1 px-4">
                  <OneSupportIcon className="h-16" />
                </div>
               </th>
               <th className="border border-border px-2 py-2 text-foreground" colSpan={4}>
               <div className="flex items-center justify-center gap-1 mb-1 px-4">
                  <TwoSupportsIcon className="h-16" />
               </div>
              </th>
             </tr>
  
            <tr className="bg-secondary">
              <th className="border border-border px-2 py-2 text-foreground" colSpan={4}>
                Épaisseur du panneau en mm
              </th>
              <th className="border border-border px-2 py-2 text-foreground" colSpan={4}>
                Épaisseur du panneau en mm
              </th>
            </tr>
  
            <tr>
              <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">30</th>
              <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">35</th>
              <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">40</th>
              <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary/50">60</th>
              <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">30</th>
              <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">35</th>
              <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">40</th>
              <th className="border border-border px-2 py-2 text-foreground font-semibold bg-secondary">60</th>
            </tr>
          </thead>
  
          <tbody>
            <tr className="bg-accent text-accent-foreground">
              <td className="border border-border px-2 py-2 font-semibold text-center">kg/m²</td>
              <td className="border border-border px-2 py-2 font-semibold text-center">daN/m²</td>
              <td className="border border-border px-2 py-2 text-center font-semibold" colSpan={4}>
                Entraxe Max cm
              </td>
              <td className="border border-border px-2 py-2 text-center font-semibold" colSpan={4}>
                Entraxe Max cm
              </td>
            </tr>
  
            {[
              ["80", "87", "345", "365", "390", "485", "400", "425", "455", "560"],
              ["120", "177", "290", "310", "335", "415", "345", "365", "390", "485"],
              ["150", "147", "265", "285", "305", "375", "315", "335", "355", "440"],
              ["200", "196", "235", "250", "270", "340", "285", "305", "325", "400"],
              ["250", "245", "210", "225", "245", "305", "255", "275", "295", "360"],
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

export default function CouvertureProduct({ product, gallery1, gallery2, gallery3 }: { product: any, gallery1: React.ReactNode, gallery2: React.ReactNode, gallery3: React.ReactNode }) {
    if (!product) {
      return <p>Données produit non disponibles.</p>;
    }
  
    const thermalCoefficientCSV = `Épaisseur en mm,30,35,40,60
  W/m²K,0.55,0.49,0.44,0.31
  Kcal/m²h°C,0.48,0.43,0.38,0.27`;
  
    const panelDimensionsCSV = `Type,Longueur (mm),Largeur standard (mm),Épaisseur (mm),Poids kg/m²
  LL70,15400,1000,30,10.3
  LL75,15400,1000,35,10.5
  LL80,15400,1000,40,10.7
  LL100,15400,1000,60,11.5`;
  
    const parsedThermalCoefficient = Papa.parse(thermalCoefficientCSV, { header: false }).data;
    const parsedPanelDimensions = Papa.parse(panelDimensionsCSV, { header: false }).data;
  
    const thermalCoeffHeaders = parsedThermalCoefficient[0] as string[];
    const thermalCoeffBody = parsedThermalCoefficient.slice(1) as string[][];
  
    const panelDimHeaders = parsedPanelDimensions[0] as string[];
    const panelDimBody = parsedPanelDimensions.slice(1) as string[][];
  
    const {
      productDescription: {
        section1_caracteristiques: caracteristiques,
        section2_etancheite_sens: etancheite,
        section3_pose_installation: pose,
      }
    } = product;
  
    return (
      <div className="grid grid-cols-1 gap-8 md:gap-12 lg:grid-cols-2 xl:grid-cols-3">
        <div className="space-y-8">
            <div className="mb-8">{gallery1}</div>
        </div>

        <div className="lg:col-span-1 xl:col-span-2">
          <div className="border-l-8 border-accent pl-4 mb-6">
            <h1 className="text-2xl font-bold text-accent uppercase">
            ■ {product.documentMetadata.productType}
            </h1>
          </div>
  
          <div>
            <h2 className="text-xl font-bold text-accent mb-4">{caracteristiques.title}</h2>
            <div className="mb-6">
              <h3 className="font-bold mb-2 text-lg">{caracteristiques.subsection_utilisation.heading} :</h3>
              <p className="text-base mb-2">{caracteristiques.subsection_utilisation.description}</p>
              <ul className="text-base space-y-1 list-disc list-inside">
                {caracteristiques.subsection_utilisation.items.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
  
            <div className="mb-6">
              <h3 className="font-bold mb-2 text-lg">{caracteristiques.subsection_definition.heading} :</h3>
              {caracteristiques.subsection_definition.details.map((detail: any, index: number) => (
                  <p className="text-base list-item ml-4" key={index}>
                      <strong>{detail.label}:</strong> {detail.value}
                  </p>
              ))}
            </div>
  
            <div className="mb-6">
              <h3 className="font-bold mb-2 text-lg">{caracteristiques.subsection_revetement.heading}</h3>
              {caracteristiques.subsection_revetement.specifications.map((spec: any, index: number) => (
                  <p className="text-base" key={index}>
                      <strong>{spec.type}:</strong> {spec.material}
                  </p>
              ))}
            </div>

            <div className="mb-8">{gallery2}</div>
  
            <div className="mb-6">
              <h3 className="font-bold mb-2 text-lg">{caracteristiques.subsection_ame_isolante.heading}</h3>
               {caracteristiques.subsection_ame_isolante.specifications.map((spec: any, index: number) => (
                  <p className="text-base" key={index}>
                      <strong>{spec.property}:</strong> {spec.value}
                  </p>
              ))}
            </div>
  
            <div className="mb-6">
              <h3 className="font-bold mb-2 text-lg">{caracteristiques.subsection_reaction_au_feu.heading}</h3>
              {caracteristiques.subsection_reaction_au_feu.classifications.map((classification: string, index: number) => (
                  <p className="text-base" key={index}>{classification}</p>
              ))}
            </div>
  
            <div className="mb-6">
              <h3 className="font-bold mb-2 text-lg">{caracteristiques.subsection_tolerance.heading}</h3>
              {caracteristiques.subsection_tolerance.tolerances.map((tolerance: any, index: number) => (
                   <p className="text-base" key={index}>{tolerance.parameter} {tolerance.value}</p>
              ))}
            </div>
  
            <div className="mb-4">
              <h3 className="font-bold mb-3 text-lg">{caracteristiques.subsection_coefficient_isolation.heading}</h3>
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
              <h3 className="font-bold mb-3 text-lg">{caracteristiques.subsection_dimensionnement.heading}</h3>
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
             <h3 className="font-semibold text-lg mb-3">{etancheite.subsection_etancheite_rives.heading}</h3>
             <p className="text-base text-justify mb-2">
               {etancheite.subsection_etancheite_rives.content}
             </p>
           </div>
           
           <div className="mb-6">
             <h3 className="font-semibold text-lg mb-3">{etancheite.subsection_sens_panneaux.heading}</h3>
             <p className="text-base text-justify">
              {etancheite.subsection_sens_panneaux.content}
             </p>
           </div>
           
           <div className="mb-6">
             <h3 className="font-semibold text-lg mb-3">{pose.title}</h3>
             <p className="text-base text-justify mb-2">
               <strong>{pose.subsection_decoupage.heading}</strong> {pose.subsection_decoupage.instruction}
             </p>
              <p className="text-base text-justify mb-2">
               <strong>{pose.subsection_fixation.heading}</strong> {pose.subsection_fixation.instruction}
             </p>
           </div>

           <ChargesTable />
           <div className="mb-8">{gallery3}</div>

           <div className="mb-6">
             <h3 className="font-semibold text-lg mb-3">{product.productDescription.section5_caracteristiques_geometriques.title}</h3>
             <div className="border-2 border-border bg-secondary/10 p-4">
               <div className="bg-white border border-border p-4 flex items-center justify-center">
                 <Image 
                  src="https://i.ibb.co/W4P3mLt2/panneaux-couverture.png"
                  alt="Schéma technique"
                  width={600}
                  height={200}
                  className="object-contain w-full h-auto"
                  data-ai-hint="technical drawing"
                  />
               </div>
               <p className="text-center text-sm mt-2">{product.productDescription.section5_caracteristiques_geometriques.caption}</p>
             </div>
           </div>

          </div>
        </div>
      </div>
    );
  };

    
    

    


