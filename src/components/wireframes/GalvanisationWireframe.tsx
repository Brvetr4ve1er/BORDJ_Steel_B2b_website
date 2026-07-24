"use client";

import * as React from 'react';
import { galvanisationContent } from '@/config/galvanisation-data';
import { ProductWireframe } from './ProductWireframe';
import { GalvanisationBathFigure } from './figures/GalvanisationBathFigure';

function statValue(needle: string, fallback: string) {
  const s = galvanisationContent.hero.stats.find((x) => x.title.toLowerCase().includes(needle));
  return s?.value ?? fallback;
}

export function GalvanisationWireframe() {
  // Bath dimensions are stated in the hero subtitle: "bains de zinc de 12m x 1,5m x 3m".
  const spec = {
    lengthM: '12 m',
    depthM: '3 m',
    widthM: '1,5 m',
    tempC: String(statValue('température', '450 °C')),
    baths: String(statValue('bains', '13')),
    capacity: String(statValue('capacité', '25 000 t/an')),
    lifespan: String(statValue('durée', '> 50 ans')),
  };

  return (
    <ProductWireframe
      viewBox="0 0 800 470"
      caption="Coupe d'un bain de galvanisation à chaud avec immersion d'une pièce. Dimensions et température issues de la fiche unité Bordj Steel."
      eyebrow="Bain de zinc"
      title="Le bain de galvanisation"
    >
      <GalvanisationBathFigure spec={spec} />
    </ProductWireframe>
  );
}
