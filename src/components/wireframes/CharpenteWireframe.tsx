"use client";

import * as React from 'react';
import { charpenteMetalliqueData } from '@/config/charpente-metallique-data';
import { ProductWireframe, WireframeToggle } from './ProductWireframe';
import { CharpenteProfileFigure, type PrsVariant } from './figures/CharpenteProfileFigure';

// Fabrication envelope quoted verbatim in the PRS pillar copy
// ("350mm à 2000mm de largeur et maximum 16 000mm de longueur").
const WEB_RANGE = '350 – 2000 mm';
const MAX_LENGTH_M = '16 m';

function capacity(title: string, fallback: number) {
  const s = charpenteMetalliqueData.hero.stats.find((x) => x.title.toLowerCase().includes(title));
  return typeof s?.value === 'number' ? s.value : fallback;
}

export function CharpenteWireframe() {
  const [variant, setVariant] = React.useState<PrsVariant>('i');

  const spec = {
    variant,
    webRange: WEB_RANGE,
    maxLengthM: MAX_LENGTH_M,
    prsCapacity: capacity('prs', 3000),
    charpenteCapacity: capacity('charpente', 25000),
  };

  return (
    <ProductWireframe
      viewBox="0 0 800 420"
      redrawKey={variant}
      eyebrow="Profil reconstitué soudé"
      title="Géométrie de la charpente"
      caption="Section d'un PRS soudé et son élévation. Basculez entre profil en I et caisson. Plage de fabrication réelle Bordj Steel."
      controls={
        <>
          <WireframeToggle active={variant === 'i'} onClick={() => setVariant('i')}>
            Profil en I
          </WireframeToggle>
          <WireframeToggle active={variant === 'caisson'} onClick={() => setVariant('caisson')}>
            Caisson
          </WireframeToggle>
        </>
      }
    >
      <CharpenteProfileFigure spec={spec} />
    </ProductWireframe>
  );
}
