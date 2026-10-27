"use client";

import * as React from 'react';
import { ProductWireframe, WireframeToggle } from './ProductWireframe';
import { CharpenteProfileFigure, type PrsVariant } from './figures/CharpenteProfileFigure';

// Fabrication envelope quoted verbatim in the PRS pillar copy
// ("350mm à 2000mm de largeur et maximum 16 000mm de longueur").
const WEB_RANGE = '350 – 2000 mm';
const MAX_LENGTH_M = '16 m';

export function CharpenteWireframe() {
  const [variant, setVariant] = React.useState<PrsVariant>('i');

  const spec = { variant, webRange: WEB_RANGE, maxLengthM: MAX_LENGTH_M };

  return (
    <ProductWireframe
      viewBox="0 0 800 420"
      redrawKey={variant}
      // No eyebrow/title: the only call site (the "Enveloppe de fabrication /
      // Ce qui passe dans notre atelier" section of the charpente page) already
      // heads this block, and the shell's own h3 renders at the same size as
      // that h2 — two titles of equal weight, one under the other.
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
