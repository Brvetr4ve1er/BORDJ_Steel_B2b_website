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
  // The bath size and the annual capacity are deliberately NOT passed to the
  // figure. The repository records three different bath sizes — this page's own
  // prose says "13 × 1,8 × 3,5 m", `companyData` says "un bain de 13m de long",
  // and `galvanisationContent.hero.subtitle` says "12m x 1,5m x 3m" — and
  // `galvanisationCapacity` is flagged in company-data.ts as unreconciled.
  // A dimensioned section reads as a specification, so publishing one of three
  // candidates inside this drawing would lend it an authority none of them has
  // earned. The numbers go back in once the client settles them; until then the
  // page's prose carries them and the drawing stays silent.
  const spec = {
    tempC: String(statValue('température', '450 °C')),
    baths: String(statValue('bains', '13')),
    lifespan: String(statValue('durée', '> 50 ans')),
  };

  return (
    <ProductWireframe
      viewBox="0 0 800 470"
      caption="Coupe d'un bain de galvanisation à chaud avec immersion d'une pièce. Température du bain issue de la fiche unité Bordj Steel."
      eyebrow="Bain de zinc"
      title="Le bain de galvanisation"
    >
      <GalvanisationBathFigure spec={spec} />
    </ProductWireframe>
  );
}
