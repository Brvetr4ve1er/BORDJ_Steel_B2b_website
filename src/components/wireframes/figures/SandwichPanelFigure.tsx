import * as React from 'react';
import { WF } from '../wf-theme';
import { DimV, DimH, Label, Leader } from '../wf-primitives';

export interface SandwichSpec {
  thicknessMm: number; // core / panel nominal thickness (30..60)
  typeCode: string; // e.g. "LL40"
  weightKgM2: number; // e.g. 10.2
  uValue: string; // W/m²·K e.g. "0.45"
  widthMm: number; // useful width, e.g. 1000
  lengthMm: number; // max length, e.g. 15400
}

// Cross-section of a sandwich panel: profiled steel outer skin (5 ribs, 4 filled
// with PUR foam + 1 without — per the spec), insulating core, flat inner skin.
export function SandwichPanelFigure({ spec }: { spec: SandwichSpec }) {
  const x0 = 190;
  const x1 = 650;
  const yMid = 250;
  const hCore = Math.round(38 + (spec.thicknessMm - 30) * 1.6); // 30->38px … 60->86px
  const skin = 8;
  const ribH = 20;
  const ribs = 5;
  const foamRibs = 4;
  const p = (x1 - x0) / ribs;

  const yCoreTop = yMid - hCore / 2;
  const yCoreBot = yMid + hCore / 2;
  const yRibTop = yCoreTop - ribH;
  const yInnerBot = yCoreBot + skin;

  // vw = cw = 0.30p, rw = 0.20p  ->  vw + rw + cw + rw = p
  const vw = p * 0.3;
  const cw = p * 0.3;
  const rw = p * 0.2;

  // Outer (ribbed) skin polyline across the full width.
  const pts: Array<[number, number]> = [[x0, yCoreTop]];
  for (let i = 0; i < ribs; i++) {
    const xs = x0 + i * p;
    pts.push([xs + vw, yCoreTop]);
    pts.push([xs + vw + rw, yRibTop]);
    pts.push([xs + vw + rw + cw, yRibTop]);
    pts.push([xs + p, yCoreTop]);
  }
  const outerSkin = 'M ' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ');

  // Foam-filled ribs (first 4); the 5th (male overlap) stays empty.
  const ribFills = Array.from({ length: foamRibs }, (_, i) => {
    const xs = x0 + i * p;
    return `M ${xs + vw} ${yCoreTop} L ${xs + vw + rw} ${yRibTop} L ${xs + vw + rw + cw} ${yRibTop} L ${xs + p} ${yCoreTop} Z`;
  });

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* --- fills (fade in) --- */}
      <rect className="wf-fade" x={x0} y={yCoreTop} width={x1 - x0} height={hCore} fill={WF.foam} />
      {ribFills.map((d, i) => (
        <path key={i} className="wf-fade" d={d} fill={WF.foam} />
      ))}
      <rect className="wf-fade" x={x0} y={yCoreBot} width={x1 - x0} height={skin} fill={WF.steel} />

      {/* --- steel skins & core outline (draw in) --- */}
      <path className="wf-line" d={outerSkin} fill="none" stroke={WF.ink} strokeWidth={2.5} />
      <path
        className="wf-line"
        d={`M ${x0} ${yCoreBot} L ${x1} ${yCoreBot} M ${x0} ${yInnerBot} L ${x1} ${yInnerBot}`}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2.5}
      />
      {/* left & right closing edges */}
      <path
        className="wf-line"
        d={`M ${x0} ${yCoreTop} L ${x0} ${yInnerBot} M ${x1} ${yCoreTop} L ${x1} ${yInnerBot}`}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2.5}
      />

      {/* --- dimensions --- */}
      {/* core thickness (the interactive value) in accent */}
      <DimV
        x={x0 - 34}
        y1={yCoreTop}
        y2={yCoreBot}
        label={`${spec.thicknessMm} mm`}
        color={WF.accent}
        labelColor={WF.accent}
      />
      {/* extension ticks to the core band */}
      <path
        className="wf-line"
        d={`M ${x0 - 40} ${yCoreTop} L ${x0} ${yCoreTop} M ${x0 - 40} ${yCoreBot} L ${x0} ${yCoreBot}`}
        fill="none"
        stroke={WF.dim}
        strokeWidth={1}
        strokeDasharray="3 3"
      />

      {/* useful width */}
      <DimH x1={x0} x2={x1} y={yInnerBot + 34} label={`Largeur utile ${spec.widthMm} mm`} below />
      <path
        className="wf-line"
        d={`M ${x0} ${yInnerBot} L ${x0} ${yInnerBot + 40} M ${x1} ${yInnerBot} L ${x1} ${yInnerBot + 40}`}
        fill="none"
        stroke={WF.dim}
        strokeWidth={1}
        strokeDasharray="3 3"
      />

      {/* rib callout */}
      <Leader from={[x0 + p * 1.5, yRibTop]} to={[x0 + p * 1.5, yRibTop - 34]} label="5 ondes — 4 avec mousse, 1 sans" anchor="middle" />

      {/* inner skin callout */}
      <Leader from={[x1 - 40, yInnerBot - skin / 2]} to={[x1 + 26, yInnerBot + 12]} label="Tôle 0,5–0,7 mm" anchor="start" />

      {/* core material tag */}
      <Label x={(x0 + x1) / 2} y={yMid + 5} size={14} weight={700} color={WF.label}>
        Âme PUR · λ 0,023 W/m·K
      </Label>

      {/* --- data readout (updates with thickness) --- */}
      <g>
        <Label x={x1 + 18} y={yCoreTop - 6} anchor="start" size={20} weight={800} color={WF.accent}>
          {spec.typeCode}
        </Label>
        <Label x={x1 + 18} y={yCoreTop + 18} anchor="start" size={13} weight={600}>
          {`Poids ${spec.weightKgM2.toLocaleString('fr-FR')} kg/m²`}
        </Label>
        <Label x={x1 + 18} y={yCoreTop + 38} anchor="start" size={13} weight={600}>
          {`U ${spec.uValue} W/m²·K`}
        </Label>
        <Label x={x1 + 18} y={yCoreTop + 58} anchor="start" size={13} weight={600} color={WF.labelMuted}>
          {`Long. max ${(spec.lengthMm / 1000).toLocaleString('fr-FR')} m`}
        </Label>
      </g>
    </g>
  );
}
