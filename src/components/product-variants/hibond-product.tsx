
import React from 'react';

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


const HiBondProduct = () => {
  return (
    <div className="p-8 bg-white min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Title Section */}
        <div className="mb-6">
          <h1 className="text-red-700 text-2xl font-bold mb-4">
            PLANCHER COLLABORANT "HI-BOND 77"
          </h1>
          <p className="text-black font-bold mb-4">
            Application conseillée : <span className="font-normal">Coffrage et armature de dalles béton</span>
          </p>
        </div>

        {/* Benefits Section */}
        <div className="mb-6">
          <h2 className="text-black font-bold text-lg mb-2">Les avantages de l'utilisation</h2>
          <ul className="list-none ml-0 space-y-1">
            <li className="text-black"><span className="font-bold">•</span> Rapidité de pose.</li>
            <li className="text-black"><span className="font-bold">•</span> Participe à la structure de la dalle béton.</li>
            <li className="text-black"><span className="font-bold">•</span> Idéal en construction et rénovation.</li>
          </ul>
        </div>

        {/* First Table - Technical Specifications */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-red-700 text-white">
                <th className="border border-white p-2 text-left text-sm font-bold">Type</th>
                <th className="border border-white p-2 text-center text-sm font-bold">Longueur (ml)</th>
                <th className="border border-white p-2 text-center text-sm font-bold">
                  Largeur<br/>standard (mm)
                </th>
                <th className="border border-white p-2 text-center text-sm font-bold">Epaisseurs (mm)</th>
                <th className="border border-white p-2 text-center text-sm font-bold">Poids (kg/m2)</th>
                <th className="border border-white p-2 text-center text-sm font-bold">
                  Système de<br/>revêtement
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Row 1 - Galvanisée */}
              <tr>
                <td rowSpan={3} className="bg-red-700 text-white border border-white p-2 text-sm font-bold align-top">
                  Plancher<br/>collaborant<br/>HI-BOND 77<br/>Galvanisée
                </td>
                <td rowSpan={3} className="bg-gray-300 border border-gray-400 p-2 text-center text-sm font-bold align-middle">
                  15000
                </td>
                <td rowSpan={3} className="bg-gray-300 border border-gray-400 p-2 text-center text-sm font-bold align-middle">
                  732
                </td>
                <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">0.70</td>
                <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">9.17</td>
                <td rowSpan={3} className="bg-gray-300 border border-gray-400 p-2 text-center text-sm font-bold align-middle">
                  Galvanisée
                </td>
              </tr>
              <tr>
                <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">1.00</td>
                <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">13.10</td>
              </tr>
              <tr>
                <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">1.50</td>
                <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">19.66</td>
              </tr>
                             
              {/* Row 2 - Pré laqué */}
              <tr>
                <td rowSpan={3} className="bg-red-700 text-white border border-white p-2 text-sm font-bold align-top">
                  plancher<br/>collaborant<br/>HI-BOND 77<br/>Pré laqué
                </td>
                <td rowSpan={3} className="bg-gray-300 border border-gray-400 p-2 text-center text-sm font-bold align-middle">
                  15000
                </td>
                <td rowSpan={3} className="bg-gray-300 border border-gray-400 p-2 text-center text-sm font-bold align-middle">
                  732
                </td>
                <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">0.70</td>
                <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">9.17</td>
                <td rowSpan={3} className="bg-gray-300 border border-gray-400 p-2 text-center text-sm font-bold align-middle">
                  pré laqué
                </td>
              </tr>
              <tr>
                <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">1.00</td>
                <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">13.10</td>
              </tr>
              <tr>
                <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">1.50</td>
                <td className="bg-gray-300 border border-gray-400 p-2 text-center text-sm">19.66</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Coating Section */}
        <div className="mb-8">
          <h2 className="text-black font-bold text-base mb-2">Revêtement :</h2>
          <p className="text-black text-sm mb-1">
            Sans spécifications particulière les profils nervurés sont livrés en qualité standard
          </p>
          <ul className="list-none ml-0 space-y-1 text-sm">
            <li className="text-black"><span className="font-bold">•</span> Galvanisé seul qualité <span className="font-bold">Z200</span></li>
            <li className="text-black"><span className="font-bold">•</span> Galvanisé pré-laqué, face extérieure finition laqué polyester ép. <span className="font-bold">25μ</span></li>
          </ul>
          <h3 className="text-black font-bold text-base mt-3 mb-1">Réaction au feu :</h3>
          <p className="text-black text-sm">
            Classement de réaction au feu MO
          </p>
        </div>

        {/* Second Table Title */}
        <div className="mb-4">
          <h2 className="text-gray-600 font-bold text-lg">PROPRIÉTÉS DE LA TÔLE HI-BOND 77</h2>
        </div>

        {/* Second Table - Properties */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-400 text-xs">
            <thead>
              <tr>
                <th rowSpan={2} className="bg-red-700 text-white border border-white p-2 font-bold align-middle">
                  EP
                </th>
                <th rowSpan={2} className="bg-red-700 text-white border border-white p-2 font-bold align-middle">
                  Poids<br/>kg/m
                </th>
                <th colSpan={4} className="bg-red-700 text-white border border-white p-2 font-bold">
                  Haut de la tôle en compression
                </th>
                <th colSpan={4} className="bg-red-700 text-white border border-white p-2 font-bold">
                  Bas de la tôle en compression
                </th>
                <th colSpan={2} className="bg-red-700 text-white border border-white p-2 font-bold">
                  Cisaillement<br/>voilement
                </th>
              </tr>
              <tr>
                <th className="bg-red-700 text-white border border-white p-1 font-bold text-xs">Lx (Cm4)</th>
                <th className="bg-red-700 text-white border border-white p-1 font-bold text-xs">Zx-top (Cm3)</th>
                <th className="bg-red-700 text-white border border-white p-1 font-bold text-xs">Zx-bot (Cm3)</th>
                <th className="bg-red-700 text-white border border-white p-1 font-bold text-xs">Ma (Kn.m)</th>
                <th className="bg-red-700 text-white border border-white p-1 font-bold text-xs">Lx (Cm4)</th>
                <th className="bg-red-700 text-white border border-white p-1 font-bold text-xs">Zx-top (Cm3)</th>
                <th className="bg-red-700 text-white border border-white p-1 font-bold text-xs">Zx-bot (Cm3)</th>
                <th className="bg-red-700 text-white border border-white p-1 font-bold text-xs">Ma (Kn.m)</th>
                <th className="bg-red-700 text-white border border-white p-1 font-bold text-xs">Va (KN)</th>
                <th className="bg-red-700 text-white border border-white p-1 font-bold text-xs">Pa (KN)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center font-bold">0.70</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">6.87</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">83.27</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">14.34</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">18.87</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">2.32</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">83.27</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">21.16</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">16.56</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">2.68</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">22.18</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">11.28</td>
              </tr>
              <tr>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center font-bold">1.00</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">9.81</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">119.0</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">23.34</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">27.87</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">3.77</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">119.0</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">31.03</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">26.74</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">4.32</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">51.37</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">21.83</td>
              </tr>
              <tr>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center font-bold">1.50</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">14.72</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">178.0</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">41.11</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">43.20</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">6.65</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">178.0</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">47.27</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">43.73</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">7.07</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">91.16</td>
                <td className="bg-gray-100 border border-gray-400 p-2 text-center">45.20</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
       <ChargesTable />
    </div>
  );
};

export default HiBondProduct;

    