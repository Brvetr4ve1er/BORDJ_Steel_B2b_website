
import React from 'react';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { OneSupportIcon } from './one-support-icon';
import { TwoSupportsIcon } from './two-supports-icon';


export default function ToleNervureeProduct({ product }: { product: any }) {
    if (!product) {
      return <p>Données produit non disponibles.</p>;
    }
  
    return (
      <div className="bg-background min-h-screen p-8 font-sans">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="border-l-8 border-accent pl-4">
            <h1 className="text-2xl font-bold text-accent uppercase">
              ■ 4-TÔLE NERVURÉE
            </h1>
          </div>
  
          <h2 className="text-xl font-bold text-accent mb-4">TÔLE NERVURÉE TN40</h2>
  
          <div className="mb-6">
            <h3 className="font-bold mb-2 text-lg">Utilisation :</h3>
            <ul className="list-disc ml-5 text-base space-y-1">
                <li>Bâtiments industriels</li>
                <li>Ateliers de production</li>
                <li>Entrepôts agricoles</li>
                <li>Centres commerciaux</li>
            </ul>
          </div>
  
          <div className="bg-secondary/10 h-48 flex items-center justify-center border rounded-lg mb-8">
             <Image 
                src="https://i.imghippo.com/files/tqXJd1721663116.png" 
                alt="TN40 Profile Image" 
                width={600} 
                height={150}
                className="object-contain"
                data-ai-hint="technical drawing"
             />
          </div>
  
          <div className="mb-8 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-accent text-accent-foreground">
                  <TableHead className="text-accent-foreground">Type</TableHead>
                  <TableHead className="text-accent-foreground">Longueur<br />(m)</TableHead>
                  <TableHead className="text-accent-foreground">Largeur<br />Standard<br />(mm)</TableHead>
                  <TableHead className="text-accent-foreground">Épaisseurs<br />(mm)</TableHead>
                  <TableHead className="text-accent-foreground">Poids<br />(kg/m²)</TableHead>
                  <TableHead className="text-accent-foreground">I (cm⁴/m)</TableHead>
                  <TableHead className="text-accent-foreground">W (cm³/m)</TableHead>
                  <TableHead className="text-accent-foreground">Système de<br />revêtement</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-semibold" rowSpan={4}>TN 40</TableCell>
                  <TableCell className="text-center" rowSpan={4}>1500</TableCell>
                  <TableCell className="text-center" rowSpan={4}>1000</TableCell>
                  <TableCell className="text-center">0.5</TableCell>
                  <TableCell className="text-center">4.91</TableCell>
                  <TableCell className="text-center">12.3</TableCell>
                  <TableCell className="text-center">3.92</TableCell>
                  <TableCell className="text-center" rowSpan={4}>Galvanisée<br />Pré laquée</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">0.6</TableCell>
                  <TableCell className="text-center">5.90</TableCell>
                  <TableCell className="text-center">16.05</TableCell>
                  <TableCell className="text-center">5.30</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">0.7</TableCell>
                  <TableCell className="text-center">6.88</TableCell>
                  <TableCell className="text-center">18.72</TableCell>
                  <TableCell className="text-center">6.18</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="text-center">1.0</TableCell>
                  <TableCell className="text-center">9.81</TableCell>
                  <TableCell className="text-center">26.75</TableCell>
                  <TableCell className="text-center">8.83</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
  
          <div className="mb-6">
            <h3 className="font-bold mb-2 text-lg">Revêtement :</h3>
            <p className="text-base">
              Sans spécifications particulière les profils nervurés sont livrés en qualité standard
            </p>
            <ul className="list-disc ml-5 text-base space-y-1">
              <li>Galvanisé seul qualité Z200</li>
              <li>Galvanisé pré-laqué, face extérieure finition laquée polyester ép. 25μ</li>
            </ul>
          </div>
  
          <div className="mb-6">
            <h3 className="font-bold mb-2 text-lg">Réaction au feu</h3>
            <p className="text-base">Classement de réaction au feu M0</p>
          </div>
  
          <div className="mb-8">
            <h3 className="font-bold mb-2 text-lg">Mise en œuvre :</h3>
            <p className="text-base">
              <span className="font-bold">Manutention :</span> Les profils ne doivent pas être choqué ou griffés pour éviter toute mise
              à nu du métal.
            </p>
          </div>
  
          <div>
            <h3 className="font-semibold text-muted-foreground mb-3 text-lg">LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)</h3>
            <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                    <TableRow className="bg-accent text-accent-foreground">
                        <TableHead className="text-accent-foreground" rowSpan={2}></TableHead>
                        <TableHead className="text-accent-foreground" rowSpan={2}>EP(mm)</TableHead>
                        <TableHead className="text-accent-foreground text-center" colSpan={10}>Portée (m)</TableHead>
                    </TableRow>
                    <TableRow className="bg-accent text-accent-foreground">
                        <TableHead className="text-accent-foreground text-center">1.00</TableHead>
                        <TableHead className="text-accent-foreground text-center">1.25</TableHead>
                        <TableHead className="text-accent-foreground text-center">1.50</TableHead>
                        <TableHead className="text-accent-foreground text-center">1.75</TableHead>
                        <TableHead className="text-accent-foreground text-center">2.00</TableHead>
                        <TableHead className="text-accent-foreground text-center">2.25</TableHead>
                        <TableHead className="text-accent-foreground text-center">2.50</TableHead>
                        <TableHead className="text-accent-foreground text-center">2.75</TableHead>
                        <TableHead className="text-accent-foreground text-center">3</TableHead>
                        <TableHead className="text-accent-foreground text-center">3.25</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow>
                    <TableCell className="font-semibold bg-accent text-accent-foreground" rowSpan={4}>
                        <div className="flex items-center justify-center">
                            <OneSupportIcon className="h-8" />
                        </div>
                    </TableCell>
                    <TableCell className="text-center bg-secondary/20">0.5</TableCell>
                    <TableCell className="text-center bg-secondary/20">439</TableCell>
                    <TableCell className="text-center bg-secondary/20">281</TableCell>
                    <TableCell className="text-center bg-secondary/20">195</TableCell>
                    <TableCell className="text-center bg-secondary/20">143</TableCell>
                    <TableCell className="text-center bg-secondary/20">109</TableCell>
                    <TableCell className="text-center bg-secondary/20">86</TableCell>
                    <TableCell className="text-center bg-secondary/20">63</TableCell>
                    <TableCell className="text-center bg-secondary/20">47</TableCell>
                    <TableCell className="text-center bg-secondary/20">36</TableCell>
                    <TableCell className="text-center bg-secondary/20">-</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="text-center">0.6</TableCell>
                    <TableCell className="text-center">614</TableCell>
                    <TableCell className="text-center">393</TableCell>
                    <TableCell className="text-center">273</TableCell>
                    <TableCell className="text-center">200</TableCell>
                    <TableCell className="text-center">153</TableCell>
                    <TableCell className="text-center">115</TableCell>
                    <TableCell className="text-center">84</TableCell>
                    <TableCell className="text-center">63</TableCell>
                    <TableCell className="text-center">48</TableCell>
                    <TableCell className="text-center">38</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="text-center bg-secondary/20">0.7</TableCell>
                    <TableCell className="text-center bg-secondary/20">716</TableCell>
                    <TableCell className="text-center bg-secondary/20">458</TableCell>
                    <TableCell className="text-center bg-secondary/20">318</TableCell>
                    <TableCell className="text-center bg-secondary/20">234</TableCell>
                    <TableCell className="text-center bg-secondary/20">179</TableCell>
                    <TableCell className="text-center bg-secondary/20">135</TableCell>
                    <TableCell className="text-center bg-secondary/20">98</TableCell>
                    <TableCell className="text-center bg-secondary/20">73</TableCell>
                    <TableCell className="text-center bg-secondary/20">57</TableCell>
                    <TableCell className="text-center bg-secondary/20">-</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="text-center">1.0</TableCell>
                    <TableCell className="text-center">570</TableCell>
                    <TableCell className="text-center">365</TableCell>
                    <TableCell className="text-center">252</TableCell>
                    <TableCell className="text-center">180</TableCell>
                    <TableCell className="text-center">141</TableCell>
                    <TableCell className="text-center">111</TableCell>
                    <TableCell className="text-center">90</TableCell>
                    <TableCell className="text-center">67</TableCell>
                    <TableCell className="text-center">51</TableCell>
                    <TableCell className="text-center">40</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-semibold bg-accent text-accent-foreground" rowSpan={3}>
                        <div className="flex items-center justify-center">
                            <TwoSupportsIcon className="h-8" />
                        </div>
                    </TableCell>
                    <TableCell className="text-center bg-secondary/20">0.6</TableCell>
                    <TableCell className="text-center bg-secondary/20">768</TableCell>
                    <TableCell className="text-center bg-secondary/20">491</TableCell>
                    <TableCell className="text-center bg-secondary/20">341</TableCell>
                    <TableCell className="text-center bg-secondary/20">251</TableCell>
                    <TableCell className="text-center bg-secondary/20">192</TableCell>
                    <TableCell className="text-center bg-secondary/20">152</TableCell>
                    <TableCell className="text-center bg-secondary/20">123</TableCell>
                    <TableCell className="text-center bg-secondary/20">101</TableCell>
                    <TableCell className="text-center bg-secondary/20">81</TableCell>
                    <TableCell className="text-center bg-secondary/20">64</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="text-center">0.7</TableCell>
                    <TableCell className="text-center">896</TableCell>
                    <TableCell className="text-center">573</TableCell>
                    <TableCell className="text-center">398</TableCell>
                    <TableCell className="text-center">292</TableCell>
                    <TableCell className="text-center">224</TableCell>
                    <TableCell className="text-center">177</TableCell>
                    <TableCell className="text-center">143</TableCell>
                    <TableCell className="text-center">118</TableCell>
                    <TableCell className="text-center">95</TableCell>
                    <TableCell className="text-center">74</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="text-center bg-secondary/20 font-bold">1.0</TableCell>
                    <TableCell className="text-center bg-secondary/20 font-bold">1280</TableCell>
                    <TableCell className="text-center bg-secondary/20 font-bold">819</TableCell>
                    <TableCell className="text-center bg-secondary/20 font-bold">569</TableCell>
                    <TableCell className="text-center bg-secondary/20 font-bold">418</TableCell>
                    <TableCell className="text-center bg-secondary/20 font-bold">320</TableCell>
                    <TableCell className="text-center bg-secondary/20 font-bold">253</TableCell>
                    <TableCell className="text-center bg-secondary/20 font-bold">204</TableCell>
                    <TableCell className="text-center bg-secondary/20 font-bold">169</TableCell>
                    <TableCell className="text-center bg-secondary/20 font-bold">135</TableCell>
                    <TableCell className="text-center bg-secondary/20 font-bold">106</TableCell>
                </TableRow>
                </TableBody>
            </Table>
            </div>
          </div>
  
          <div className="mb-8">
            <h3 className="font-semibold mb-3 text-lg">Caractéristiques Géométriques</h3>
            <div className="border-2 border-border bg-secondary/10 p-4">
              <div className="bg-white border border-border h-32 flex items-center justify-center">
                <Image 
                    src="https://i.imghippo.com/files/tqXJd1721663116.png" 
                    alt="Technical Drawing"
                    width={600} 
                    height={100}
                    className="object-contain"
                    data-ai-hint="technical drawing"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
