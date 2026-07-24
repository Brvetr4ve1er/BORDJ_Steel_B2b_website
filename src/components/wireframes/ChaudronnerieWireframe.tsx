"use client";

import * as React from 'react';
import { chaudronnerieData } from '@/config/chaudronnerie-data';
import { ProductWireframe } from './ProductWireframe';
import { ChaudronnerieSiloFigure } from './figures/ChaudronnerieSiloFigure';

function statValue(needle: string, key: 'value' | 'secondaryValue', fallback: string) {
  const s = chaudronnerieData.hero.stats.find((x) => x.title.toLowerCase().includes(needle));
  const v = s ? (s as Record<string, unknown>)[key] : undefined;
  return typeof v === 'string' ? v : fallback;
}

// Normalise thousands with a thin space, matching the site's French formatting.
const fr = (s: string) => s.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');

export function ChaudronnerieWireframe() {
  const spec = {
    surface: fr(statValue('surface', 'value', '1500 m²')),
    capacity: fr(statValue('capacité', 'secondaryValue', '5000T/an')).replace('T/an', ' T/an').replace(/\s+/g, ' ').trim(),
    staff: fr(statValue('effectif', 'value', '30 Employés')),
  };

  return (
    <ProductWireframe
      viewBox="0 0 800 470"
      caption="Élévation type d'un silo mécano-soudé. Proportions schématiques (dimensions sur mesure) ; équipements d'après la fiche produit."
      eyebrow="Mécano-soudé"
      title="Anatomie d'un silo sur mesure"
    >
      <ChaudronnerieSiloFigure spec={spec} />
    </ProductWireframe>
  );
}
