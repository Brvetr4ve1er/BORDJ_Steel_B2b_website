
import React from 'react';
import Image from 'next/image';

const ChargesTable = () => {
  return (
    <div className="mt-8">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-gray-700 text-lg font-bold">
          TABLEAU DES CHARGES SUR LA TÔLE HI-BOND 77 (KN/M²)
        </h1>
      </div>

      {/* Table */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Header Row */}
            <thead>
              <tr>
                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-16">EP</th>
                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-24">
                  NOMBRE<br/>D'ESPACES
                </th>
                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-24">
                  CAS DES<br/>CHARGES
                </th>
                <th colSpan={10} className="bg-red-700 border border-white text-white text-xs font-bold p-2">
                  ESPACEMENT en mm
                </th>
              </tr>
              <tr>
                <th className="bg-red-700 border border-white p-0"></th>
                <th className="bg-red-700 border border-white p-0"></th>
                <th className="bg-red-700 border border-white p-0"></th>
                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-20">1.00</th>
                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-20">1.25</th>
                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-20">1.50</th>
                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-20">1.75</th>
                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-20">2.00</th>
                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-20">2.25</th>
                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-20">2.50</th>
                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-20">2.75</th>
                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-20">3.00</th>
                <th className="bg-red-700 border border-white text-white text-xs font-bold p-2 w-20">3.50</th>
              </tr>
            </thead>
            <tbody>
              {/* EP 0.70 Section */}
              <tr>
                <td rowSpan={3} className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2 align-middle">
                  0.70
                </td>
                <td className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2">1</td>
                <td className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2">G+Q</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">19.55</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">11.87</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">8.25</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">6.06</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">4.64</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">3.66</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">2.97</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">2.45</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">2.06</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">1.51</td>
              </tr>
              <tr>
                <td className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2">2</td>
                <td className="bg-gray-200 border border-gray-300 p-2"></td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">9.02</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">7.22</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">6.02</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">5.16</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">4.51</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">4.01</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">3.43</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">2.83</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">2.38</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">1.75</td>
              </tr>
              <tr>
                <td className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2">3</td>
                <td className="bg-gray-200 border border-gray-300 p-2"></td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">10.26</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">8.21</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">6.84</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">5.87</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">5.13</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">4.56</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">4.11</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">3.54</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">2.98</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">2.19</td>
              </tr>
              {/* EP 1.00 Section */}
              <tr>
                <td rowSpan={3} className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2 align-middle">
                  1.00
                </td>
                <td className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2">1</td>
                <td className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2">G+Q</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">30.16</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">19.30</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">13.40</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">9.85</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">7.54</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">5.96</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">4.83</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">3.99</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">3.35</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">2.44</td>
              </tr>
              <tr>
                <td className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2">2</td>
                <td className="bg-gray-200 border border-gray-300 p-2"></td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">17.46</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">13.97</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">11.64</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">9.98</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">8.64</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">6.83</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">5.53</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">4.5</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">3.84</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">2.82</td>
              </tr>
              <tr>
                <td className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2">3</td>
                <td className="bg-gray-200 border border-gray-300 p-2"></td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">19.87</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">15.89</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">13.24</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">11.35</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">9.93</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">8.53</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">6.91</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">5.71</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">4.80</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">3.53</td>
              </tr>
              {/* EP 1.50 Section */}
              <tr>
                <td rowSpan={3} className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2 align-middle">
                  1.50
                </td>
                <td className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2">1</td>
                <td className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2">G+Q</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">53.20</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">34.05</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">23.64</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">17.37</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">13.30</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">10.57</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">8.51</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">7.03</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">5.80</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">3.65</td>
              </tr>
              <tr>
                <td className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2">2</td>
                <td className="bg-gray-200 border border-gray-300 p-2"></td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">36.16</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">28.93</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">24.11</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">18.47</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">14.40</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">11.17</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">9.05</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">7.48</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">6.28</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">4.26</td>
              </tr>
              <tr>
                <td className="bg-gray-200 border border-gray-300 text-center font-bold text-sm p-2">3</td>
                <td className="bg-gray-200 border border-gray-300 p-2"></td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">41.13</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">32.91</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">27.42</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">23.09</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">17.68</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">13.97</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">11.31</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">9.35</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">7.86</td>
                <td className="bg-gray-200 border border-gray-300 text-center text-sm p-2">5.77</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};


const HiBondProduct = ({ product }: { product: any }) => {
  if (!product) {
    return <p>Données produit non disponibles.</p>;
  }

  const {
    features,
    tables,
  } = product;

  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-red-700 text-2xl font-bold mb-4">
            PLANCHER COLLABORANT "HI-BOND 77"
          </h1>
          <p className="text-black font-bold mb-4">
            Application conseillée : <span className="font-normal">{features.application}</span>
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-6">
          <h2 className="text-black font-bold text-lg mb-2">Les avantages de l'utilisation</h2>
          <ul className="list-none ml-0 space-y-1">
            {features.avantages.map((advantage: string, index: number) => (
              <li key={index} className="text-black"><span className="font-bold">•</span> {advantage}</li>
            ))}
          </ul>
        </div>

        {/* First Table - Technical Specifications */}
        {tables.dimensionnement && (
          <div className="mb-8 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-red-700 text-white">
                  {tables.dimensionnement.headers.map((header: string) => (
                    <th key={header} className="border border-white p-2 text-center text-sm font-bold" dangerouslySetInnerHTML={{ __html: header.replace('(ml)', '<br/>(ml)').replace('(mm)', '<br/>(mm)').replace('(kg/m2)', '<br/>(kg/m2)').replace('Système de', 'Système de<br/>') }}></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tables.dimensionnement.rows.map((row: any, rowIndex: number) => (
                  <React.Fragment key={rowIndex}>
                    <tr>
                      <td rowSpan={row.epaisseurs.length} className="bg-red-700 text-white border border-white p-2 text-sm font-bold align-top">
                        {row.type.split(' ').map((word: string, i: number) => <React.Fragment key={i}>{word}<br/></React.Fragment>)}
                      </td>
                      <td rowSpan={row.epaisseurs.length} className="bg-gray-300 border border-gray-400 p-2 text-center text-sm font-bold align-middle">
                        {row.longueur}
                      </td>
                      <td rowSpan={row.epaisseurs.length} className="bg-gray-300 border border-gray-400 p-2 text-center text-sm font-bold align-middle">
                        {row.largeur_standard}
                      </td>
                      <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">{row.epaisseurs[0].valeur_mm.toFixed(2)}</td>
                      <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">{row.epaisseurs[0].poids_kg_m2.toFixed(2)}</td>
                      <td rowSpan={row.epaisseurs.length} className="bg-gray-300 border border-gray-400 p-2 text-center text-sm font-bold align-middle">
                        {row.revetement_systeme}
                      </td>
                    </tr>
                    {row.epaisseurs.slice(1).map((ep: any, epIndex: number) => (
                      <tr key={epIndex}>
                        <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">{ep.valeur_mm.toFixed(2)}</td>
                        <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">{ep.poids_kg_m2.toFixed(2)}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Coating Section */}
        <div className="mb-8">
          <h2 className="text-black font-bold text-base mb-2">Revêtement :</h2>
          <p className="text-black text-sm mb-1" style={{ whiteSpace: 'pre-line' }}>
            {features.revetement.split('Types:')[0]}
          </p>
          <ul className="list-none ml-0 space-y-1 text-sm">
            {features.revetement.split('Types:')[1].split('\n- ').slice(1).map((item: string, index: number) => (
                 <li key={index} className="text-black"><span className="font-bold">•</span> {item}</li>
            ))}
          </ul>
          <h3 className="text-black font-bold text-base mt-3 mb-1">Réaction au feu :</h3>
          <p className="text-black text-sm">
            {features.reactionAuFeu}
          </p>
        </div>

        {/* Second Table Title */}
        {tables.proprietes && (
          <>
            <div className="mb-4">
              <h2 className="text-gray-600 font-bold text-lg">{tables.proprietes.title}</h2>
            </div>

            {/* Second Table - Properties */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400 text-xs">
                <thead>
                  <tr>
                    <th rowSpan={2} className="bg-red-700 text-white border border-white p-2 font-bold align-middle">
                      {tables.proprietes.headers[0]}
                    </th>
                    <th rowSpan={2} className="bg-red-700 text-white border border-white p-2 font-bold align-middle" dangerouslySetInnerHTML={{__html: tables.proprietes.headers[1].replace(' ', '<br/>')}}>
                    </th>
                    <th colSpan={4} className="bg-red-700 text-white border border-white p-2 font-bold">
                      {tables.proprietes.headers[2]}
                    </th>
                    <th colSpan={4} className="bg-red-700 text-white border border-white p-2 font-bold">
                      {tables.proprietes.headers[3]}
                    </th>
                    <th colSpan={2} className="bg-red-700 text-white border border-white p-2 font-bold" dangerouslySetInnerHTML={{__html: tables.proprietes.headers[4].replace(' ', '<br/>')}}>
                    </th>
                  </tr>
                  <tr>
                    {tables.proprietes.subheaders["Haut de la tôle en compression"].map((sh: string) => <th key={sh} className="bg-red-700 text-white border border-white p-1 font-bold text-xs">{sh}</th>)}
                    {tables.proprietes.subheaders["Bas de la tôle en compression"].map((sh: string) => <th key={sh} className="bg-red-700 text-white border border-white p-1 font-bold text-xs">{sh}</th>)}
                    {tables.proprietes.subheaders["Cisaillement voilement"].map((sh: string) => <th key={sh} className="bg-red-700 text-white border border-white p-1 font-bold text-xs">{sh}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {tables.proprietes.rows.map((row: any, index: number) => (
                    <tr key={index}>
                      <td className="bg-gray-100 border border-gray-400 p-2 text-center font-bold">{row.epaisseur.toFixed(2)}</td>
                      <td className="bg-gray-100 border border-gray-400 p-2 text-center">{row.poids.toFixed(2)}</td>
                      <td className="bg-gray-100 border border-gray-400 p-2 text-center">{row.haut_compression.Lx.toFixed(2)}</td>
                      <td className="bg-gray-100 border border-gray-400 p-2 text-center">{row.haut_compression.Zx_top.toFixed(2)}</td>
                      <td className="bg-gray-100 border border-gray-400 p-2 text-center">{row.haut_compression.Zx_bot.toFixed(2)}</td>
                      <td className="bg-gray-100 border border-gray-400 p-2 text-center">{row.haut_compression.Ma.toFixed(2)}</td>
                      <td className="bg-gray-100 border border-gray-400 p-2 text-center">{row.bas_compression.Lx.toFixed(2)}</td>
                      <td className="bg-gray-100 border border-gray-400 p-2 text-center">{row.bas_compression.Zx_top.toFixed(2)}</td>
                      <td className="bg-gray-100 border border-gray-400 p-2 text-center">{row.bas_compression.Zx_bot.toFixed(2)}</td>
                      <td className="bg-gray-100 border border-gray-400 p-2 text-center">{row.bas_compression.Ma.toFixed(2)}</td>
                      <td className="bg-gray-100 border border-gray-400 p-2 text-center">{row.cisaillement_voilement.Va.toFixed(2)}</td>
                      <td className="bg-gray-100 border border-gray-400 p-2 text-center">{row.cisaillement_voilement.Pa.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
        <ChargesTable />
        
        {features.caracteristiquesGeometriques?.image?.src && (
          <div className="mb-6 mt-8">
            <h3 className="font-semibold text-lg mb-3">{features.caracteristiquesGeometriques.title}</h3>
            <div className="border-2 border-border bg-secondary/10 p-4">
              <div className="bg-white border border-border p-4 flex items-center justify-center">
                <Image 
                  src={features.caracteristiquesGeometriques.image.src}
                  alt={features.caracteristiquesGeometriques.title}
                  width={800}
                  height={250}
                  className="object-contain w-full"
                  data-ai-hint={features.caracteristiquesGeometriques.image.aiHint}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HiBondProduct;

    