"use client";

import * as React from 'react';
import { charpenteCapacity } from '@/config/company-data';
import { ProductWireframe, WireframeToggle } from './ProductWireframe';
import { CharpenteProfileFigure, type PrsVariant } from './figures/CharpenteProfileFigure';

// Fabrication envelope quoted verbatim in the PRS pillar copy
// ("350mm à 2000mm de largeur et maximum 16 000mm de longueur").
const WEB_RANGE = '350 – 2000 mm';
const MAX_LENGTH_M = '16 m';

export function CharpenteWireframe() {
  const [variant, setVariant] = React.useState<PrsVariant>('i');

  const spec = {
    variant,
    webRange: WEB_RANGE,
    maxLengthM: MAX_LENGTH_M,
    // Both figures come from the single source. They used to be read out of
    // `charpenteMetalliqueData.hero.stats` by substring with a literal
    // fallback — `capacity('charpente', 25000)` — and that lookup could never
    // match: the stat titles are "Capacité de production", "Capacité de PRS"
    // and "Surface de l'unité", none of which contains the word "charpente".
    // The figure drawn here was therefore ALWAYS the fallback. It went
    // unnoticed only because the fallback happened to equal the config value;
    // editing the config would have silently left this figure behind.
    prsCapacity: charpenteCapacity.prsPerYear,
    charpenteCapacity: charpenteCapacity.headlinePerYear,
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
