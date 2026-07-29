"use client";

import * as React from 'react';
import { productVariants } from '@/config/product-variants.config';
import { ProductWireframe, WireframeToggle } from './ProductWireframe';
import { SandwichPanelFigure, type SandwichSpec } from './figures/SandwichPanelFigure';

// Derive the per-thickness specs straight from the bardage config tables so the
// wireframe can never drift from the published figures.
function useSandwichSpecs(): SandwichSpec[] {
  return React.useMemo(() => {
    const sections = (productVariants.bardage?.sections ?? []) as Array<Record<string, unknown>>;
    const dim = sections.find((s) => s.type === 'table' && s.title === 'Dimensionnement du panneau') as
      | { rows: unknown[][] }
      | undefined;
    const uTable = sections.find(
      (s) => s.type === 'table' && typeof s.title === 'string' && (s.title as string).startsWith('Coefficient'),
    ) as { headers: unknown[]; rows: unknown[][] } | undefined;

    const uHeaders = (uTable?.headers ?? []).map((h) => Number(h));
    const uRow = (uTable?.rows ?? []).find((r) => String(r[0]).replace(/\s/g, '').startsWith('W/m'));
    const uFor = (thk: number) => {
      const idx = uHeaders.findIndex((h) => h === thk);
      return idx > 0 && uRow ? String(uRow[idx]) : '—';
    };

    const rows = dim?.rows ?? [];
    return rows
      .map((r) => ({
        typeCode: String(r[0]),
        lengthMm: Number(r[1]),
        widthMm: Number(r[2]),
        thicknessMm: Number(r[3]),
        weightKgM2: Number(r[4]),
        uValue: uFor(Number(r[3])),
      }))
      .filter((s) => Number.isFinite(s.thicknessMm) && s.thicknessMm > 0)
      .sort((a, b) => a.thicknessMm - b.thicknessMm);
  }, []);
}

export function SandwichWireframe() {
  const specs = useSandwichSpecs();
  const defaultIdx = Math.max(0, specs.findIndex((s) => s.thicknessMm === 40));
  const [active, setActive] = React.useState(defaultIdx === -1 ? 0 : defaultIdx);

  // `active` is clamped to the last available spec; when `specs` is empty the
  // lookup yields undefined and the wireframe renders nothing, as before.
  const spec = specs[Math.min(active, specs.length - 1)];
  if (!spec) return null;

  return (
    <ProductWireframe
      viewBox="0 0 800 460"
      redrawKey={spec.thicknessMm}
      eyebrow="Coupe technique"
      title="Anatomie du panneau sandwich"
      caption="Coupe transversale — sélectionnez l'épaisseur d'âme. Cotes, poids et coefficient U issus des fiches techniques Bordj Steel."
      controls={specs.map((s, i) => (
        <WireframeToggle key={s.typeCode} active={i === active} onClick={() => setActive(i)}>
          {s.thicknessMm} mm
        </WireframeToggle>
      ))}
    >
      <SandwichPanelFigure spec={spec} />
    </ProductWireframe>
  );
}
