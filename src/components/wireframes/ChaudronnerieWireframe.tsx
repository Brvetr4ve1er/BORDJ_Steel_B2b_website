"use client";

import * as React from 'react';
import { cuveGeometry, formatRangeMm } from '@/config/chaudronnerie-tables';
import { ProductWireframe } from './ProductWireframe';
import { ChaudronnerieCuveFigure } from './figures/ChaudronnerieCuveFigure';

export function ChaudronnerieWireframe() {
  // Every cote below is read off `geometricTableData` — the same table the page
  // renders a few sections down — so the drawing cannot state a dimension the
  // table does not. The hero stat strip above already carries the unit's
  // surface, capacity and headcount; the drawing no longer repeats them.
  const spec = {
    diametre: formatRangeMm(cuveGeometry.diametre),
    virole: formatRangeMm(cuveGeometry.virole),
    longueurTotale: formatRangeMm(cuveGeometry.longueurTotale),
    epaisseur: formatRangeMm(cuveGeometry.epaisseur),
    pressionEpreuve: cuveGeometry.pressionEpreuve ?? undefined,
  };

  return (
    <ProductWireframe
      viewBox="0 0 800 470"
      caption="Élévation et vue en bout d'une cuve enterrée standard. Proportions schématiques ; cotes d'après le tableau des caractéristiques géométriques ci-dessous."
      eyebrow="Cuves enterrées"
      title="Anatomie d'une cuve enterrée"
    >
      <ChaudronnerieCuveFigure spec={spec} />
    </ProductWireframe>
  );
}
