
import React from 'react';
import Image from 'next/image';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const ToleNervureeOneSupportIcon = ({ className }: { className?: string }) => (
    <svg width="160" height="80" viewBox="0 0 160 80" className={className}>
      <line x1="20" y1="40" x2="140" y2="40" stroke="currentColor" strokeWidth="3"/>
      <polygon points="20,40 15,50 25,50" fill="currentColor" stroke="currentColor"/>
      <line x1="20" y1="50" x2="20" y2="60" stroke="currentColor" strokeWidth="2"/>
      <polygon points="140,40 135,50 145,50" fill="currentColor" stroke="currentColor"/>
      <line x1="140" y1="50" x2="140" y2="60" stroke="currentColor" strokeWidth="2"/>
    </svg>
);

const ToleNervureeTwoSupportsIcon = ({ className }: { className?: string }) => (
    <svg width="160" height="80" viewBox="0 0 160 80" className={className}>
      <line x1="20" y1="40" x2="140" y2="40" stroke="currentColor" strokeWidth="3"/>
      <polygon points="20,40 15,50 25,50" fill="currentColor" stroke="currentColor"/>
      <line x1="20" y1="50" x2="20" y2="60" stroke="currentColor" strokeWidth="2"/>
      <polygon points="80,40 75,50 85,50" fill="currentColor" stroke="currentColor"/>
      <line x1="80" y1="50" x2="80" y2="60" stroke="currentColor" strokeWidth="2"/>
      <polygon points="140,40 135,50 145,50" fill="currentColor" stroke="currentColor"/>
      <line x1="140" y1="50" x2="140" y2="60" stroke="currentColor" strokeWidth="2"/>
    </svg>
);


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
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="bg-accent border border-border text-accent-foreground text-sm font-bold p-2 text-center" colSpan={2} rowSpan={2}>Support</th>
                            <th className="bg-accent border border-border text-accent-foreground text-sm font-bold p-2">EP (mm)</th>
                            <th colSpan="10" className="bg-accent border border-border text-accent-foreground text-sm font-bold p-2">Portée (m)</th>
                        </tr>
                        <tr>
                            <th className="bg-accent border-border p-0"></th>
                            <th className="bg-accent border border-border text-accent-foreground text-xs font-bold p-2 w-20">1.00</th>
                            <th className="bg-accent border border-border text-accent-foreground text-xs font-bold p-2 w-20">1.25</th>
                            <th className="bg-accent border border-border text-accent-foreground text-xs font-bold p-2 w-20">1.50</th>
                            <th className="bg-accent border border-border text-accent-foreground text-xs font-bold p-2 w-20">1.75</th>
                            <th className="bg-accent border border-border text-accent-foreground text-xs font-bold p-2 w-20">2.00</th>
                            <th className="bg-accent border border-border text-accent-foreground text-xs font-bold p-2 w-20">2.25</th>
                            <th className="bg-accent border border-border text-accent-foreground text-xs font-bold p-2 w-20">2.50</th>
                            <th className="bg-accent border border-border text-accent-foreground text-xs font-bold p-2 w-20">2.75</th>
                            <th className="bg-accent border border-border text-accent-foreground text-xs font-bold p-2 w-20">3</th>
                            <th className="bg-accent border border-border text-accent-foreground text-xs font-bold p-2 w-20">3.25</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td rowSpan={4} className="bg-accent border border-border p-4 w-48">
                                <ToleNervureeOneSupportIcon className="text-white mx-auto w-32" />
                            </td>
                            <td className="border border-border text-center font-bold text-sm p-2 bg-secondary/20">0.5</td>
                            <td className="border border-border text-center text-sm p-2">439</td>
                            <td className="border border-border text-center text-sm p-2">281</td>
                            <td className="border border-border text-center text-sm p-2">185</td>
                            <td className="border border-border text-center text-sm p-2">143</td>
                            <td className="border border-border text-center text-sm p-2">109</td>
                            <td className="border border-border text-center text-sm p-2">86</td>
                            <td className="border border-border text-center text-sm p-2">63</td>
                            <td className="border border-border text-center text-sm p-2">47</td>
                            <td className="border border-border text-center text-sm p-2">36</td>
                            <td className="border border-border text-center text-sm p-2 bg-muted">-</td>
                        </tr>
                        <tr>
                            <td className="border border-border text-center font-bold text-sm p-2 bg-secondary/20">0.6</td>
                            <td className="border border-border text-center text-sm p-2">614</td>
                            <td className="border border-border text-center text-sm p-2">393</td>
                            <td className="border border-border text-center text-sm p-2">273</td>
                            <td className="border border-border text-center text-sm p-2">200</td>
                            <td className="border border-border text-center text-sm p-2">153</td>
                            <td className="border border-border text-center text-sm p-2">115</td>
                            <td className="border border-border text-center text-sm p-2">84</td>
                            <td className="border border-border text-center text-sm p-2">63</td>
                            <td className="border border-border text-center text-sm p-2">48</td>
                            <td className="border border-border text-center text-sm p-2">38</td>
                        </tr>
                        <tr>
                            <td className="border border-border text-center font-bold text-sm p-2 bg-secondary/20">0.7</td>
                            <td className="border border-border text-center text-sm p-2">716</td>
                            <td className="border border-border text-center text-sm p-2">458</td>
                            <td className="border border-border text-center text-sm p-2">318</td>
                            <td className="border border-border text-center text-sm p-2">234</td>
                            <td className="border border-border text-center text-sm p-2">179</td>
                            <td className="border border-border text-center text-sm p-2">135</td>
                            <td className="border border-border text-center text-sm p-2">98</td>
                            <td className="border border-border text-center text-sm p-2">73</td>
                            <td className="border border-border text-center text-sm p-2">57</td>
                            <td className="border border-border text-center text-sm p-2 bg-muted">-</td>
                        </tr>
                         <tr>
                            <td className="border border-border text-center font-bold text-sm p-2 bg-secondary/20">1.0</td>
                            <td colSpan={10} className="border border-border text-center text-sm p-2 font-bold">Non applicable</td>
                        </tr>
                        <tr>
                            <td rowSpan={4} className="bg-accent border border-border p-4">
                                <ToleNervureeTwoSupportsIcon className="text-white mx-auto w-32" />
                            </td>
                            <td className="border border-border text-center font-bold text-sm p-2 bg-secondary/20">0.5</td>
                            <td className="border border-border text-center text-sm p-2">570</td>
                            <td className="border border-border text-center text-sm p-2">365</td>
                            <td className="border border-border text-center text-sm p-2">252</td>
                            <td className="border border-border text-center text-sm p-2">180</td>
                            <td className="border border-border text-center text-sm p-2">141</td>
                            <td className="border border-border text-center text-sm p-2">111</td>
                            <td className="border border-border text-center text-sm p-2">90</td>
                            <td className="border border-border text-center text-sm p-2">67</td>
                            <td className="border border-border text-center text-sm p-2">51</td>
                            <td className="border border-border text-center text-sm p-2">40</td>
                        </tr>
                        <tr>
                            <td className="border border-border text-center font-bold text-sm p-2 bg-secondary/20">0.6</td>
                            <td className="border border-border text-center text-sm p-2">768</td>
                            <td className="border border-border text-center text-sm p-2">491</td>
                            <td className="border border-border text-center text-sm p-2">341</td>
                            <td className="border border-border text-center text-sm p-2">251</td>
                            <td className="border border-border text-center text-sm p-2">192</td>
                            <td className="border border-border text-center text-sm p-2">152</td>
                            <td className="border border-border text-center text-sm p-2">123</td>
                            <td className="border border-border text-center text-sm p-2">101</td>
                            <td className="border border-border text-center text-sm p-2">81</td>
                            <td className="border border-border text-center text-sm p-2">64</td>
                        </tr>
                        <tr>
                            <td className="border border-border text-center font-bold text-sm p-2 bg-secondary/20">0.7</td>
                            <td className="border border-border text-center text-sm p-2">896</td>
                            <td className="border border-border text-center text-sm p-2">573</td>
                            <td className="border border-border text-center text-sm p-2">398</td>
                            <td className="border border-border text-center text-sm p-2">292</td>
                            <td className="border border-border text-center text-sm p-2">224</td>
                            <td className="border border-border text-center text-sm p-2">177</td>
                            <td className="border border-border text-center text-sm p-2">143</td>
                            <td className="border border-border text-center text-sm p-2">118</td>
                            <td className="border border-border text-center text-sm p-2">95</td>
                            <td className="border border-border text-center text-sm p-2">74</td>
                        </tr>
                         <tr>
                            <td className="border border-border text-center font-bold text-sm p-2 bg-secondary/20">1.0</td>
                            <td colSpan={10} className="border border-border text-center text-sm p-2 font-bold">Non applicable</td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
  
          <div className="mb-8">
            <h3 className="font-semibold mb-3 text-lg">Caractéristiques Géométriques</h3>
            <div className="space-y-4">
                <div className="border-2 border-border bg-secondary/10 p-4">
                <div className="bg-white border border-border p-4 flex items-center justify-center">
                    <Image 
                        src="https://i.ibb.co/ccqw6JJN/tole-nervure.png" 
                        alt="tole-nervure"
                        width={800} 
                        height={200}
                        className="object-contain w-full h-auto"
                        data-ai-hint="technical drawing"
                    />
                </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
