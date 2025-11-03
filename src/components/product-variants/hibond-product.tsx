
import React from 'react';

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
    </div>
  );
};

export default HiBondProduct;

    