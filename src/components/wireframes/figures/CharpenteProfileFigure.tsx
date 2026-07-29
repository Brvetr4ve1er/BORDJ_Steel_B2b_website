import * as React from 'react';
import { WF } from '../wf-theme';
import { DimV, DimH, Label, Leader } from '../wf-primitives';

export type PrsVariant = 'i' | 'caisson';

export interface CharpenteSpec {
  variant: PrsVariant;
  webRange: string; // "350 – 2000 mm"
  maxLengthM: string; // "16 m"
  prsCapacity: number; // T/an
  charpenteCapacity: number; // T/an
}

// End cross-section of a welded plate girder (PRS) — toggles between an I-section
// and a closed box (caisson) — plus a compact side elevation carrying the length.
export function CharpenteProfileFigure({ spec }: { spec: CharpenteSpec }) {
  const cx = 210;
  const cyMid = 220;
  const H = 210;
  const B = 150;
  const tf = 18;
  const tw = 16;
  const cyTop = cyMid - H / 2;
  const cyBot = cyMid + H / 2;

  const iOutline =
    `M ${cx - B / 2} ${cyTop} L ${cx + B / 2} ${cyTop} L ${cx + B / 2} ${cyTop + tf} ` +
    `L ${cx + tw / 2} ${cyTop + tf} L ${cx + tw / 2} ${cyBot - tf} L ${cx + B / 2} ${cyBot - tf} ` +
    `L ${cx + B / 2} ${cyBot} L ${cx - B / 2} ${cyBot} L ${cx - B / 2} ${cyBot - tf} ` +
    `L ${cx - tw / 2} ${cyBot - tf} L ${cx - tw / 2} ${cyTop + tf} L ${cx - B / 2} ${cyTop + tf} Z`;

  const isI = spec.variant === 'i';

  // side elevation (compressed length)
  const ex0 = 440;
  const ex1 = 740;
  const eyT = cyMid - 34;
  const eyB = cyMid + 34;
  const emid = (ex0 + ex1) / 2;

  // weld ticks at the 4 web/flange junctions of the I
  const weld = (x: number, y: number) =>
    `M ${x - 5} ${y} L ${x + 5} ${y} L ${x} ${y + (y < cyMid ? 6 : -6)} Z`;

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* --- cross-section fill (fade) --- */}
      {isI ? (
        <path className="wf-fade" d={iOutline} fill={WF.steel} />
      ) : (
        <>
          <rect className="wf-fade" x={cx - B / 2} y={cyTop} width={B} height={H} fill={WF.steel} />
          <rect className="wf-fade" x={cx - B / 2 + tw} y={cyTop + tf} width={B - 2 * tw} height={H - 2 * tf} fill="#ffffff" />
        </>
      )}

      {/* --- cross-section outline (draw) --- */}
      {isI ? (
        <path className="wf-line" d={iOutline} fill="none" stroke={WF.ink} strokeWidth={2.5} />
      ) : (
        <>
          <rect className="wf-line" x={cx - B / 2} y={cyTop} width={B} height={H} fill="none" stroke={WF.ink} strokeWidth={2.5} />
          <rect className="wf-line" x={cx - B / 2 + tw} y={cyTop + tf} width={B - 2 * tw} height={H - 2 * tf} fill="none" stroke={WF.ink} strokeWidth={2} />
        </>
      )}

      {/* weld marks (I only) */}
      {isI &&
        ([
          [cx - tw / 2, cyTop + tf],
          [cx + tw / 2, cyTop + tf],
          [cx - tw / 2, cyBot - tf],
          [cx + tw / 2, cyBot - tf],
        ] as const).map(([x, y], i) => <path key={i} className="wf-fade" d={weld(x, y)} fill={WF.accent} />)}

      {/* height dimension (accent — the fabrication range) */}
      <DimV x={cx - B / 2 - 34} y1={cyTop} y2={cyBot} label={spec.webRange} color={WF.accent} labelColor={WF.accent} />
      <path
        className="wf-line"
        d={`M ${cx - B / 2 - 40} ${cyTop} L ${cx - B / 2} ${cyTop} M ${cx - B / 2 - 40} ${cyBot} L ${cx - B / 2} ${cyBot}`}
        fill="none"
        stroke={WF.dim}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      {/* flange width */}
      <DimH x1={cx - B / 2} x2={cx + B / 2} y={cyBot + 30} label="Semelles soudées" below />

      <Leader from={[cx, cyMid]} to={[cx, cyMid - 4]} label="" />
      <Label x={cx} y={cyTop - 22} size={13} weight={700} color={WF.label}>
        {isI ? 'Profil en I (PRS)' : 'Caisson soudé'}
      </Label>

      {/* --- side elevation (length) --- */}
      <rect className="wf-fade" x={ex0} y={eyT} width={ex1 - ex0} height={eyB - eyT} fill={WF.fill} />
      <path
        className="wf-line"
        d={`M ${ex0} ${eyT} L ${ex1} ${eyT} M ${ex0} ${eyB} L ${ex1} ${eyB} M ${ex0} ${eyT} L ${ex0} ${eyB} M ${ex1} ${eyT} L ${ex1} ${eyB}`}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2.5}
      />
      {/* break marks (truncated length) */}
      <path
        className="wf-line"
        d={`M ${emid - 8} ${eyT - 4} L ${emid - 2} ${eyB + 4} M ${emid + 2} ${eyT - 4} L ${emid + 8} ${eyB + 4}`}
        fill="none"
        stroke={WF.dim}
        strokeWidth={2}
      />
      <DimH x1={ex0} x2={ex1} y={eyB + 30} label={`Longueur ≤ ${spec.maxLengthM}`} color={WF.accent} labelColor={WF.accent} below />
      <Label x={(ex0 + ex1) / 2} y={eyT - 14} size={12} weight={600} color={WF.labelMuted}>
        Élévation
      </Label>

      {/* --- capacity readout --- */}
      <Label x={ex0} y={cyTop - 14} anchor="start" size={13} weight={700} color={WF.accent}>
        {`PRS ${spec.prsCapacity.toLocaleString('fr-FR')} T/an`}
      </Label>
      <Label x={ex0 + 150} y={cyTop - 14} anchor="start" size={13} weight={700} color={WF.label}>
        {`Charpente ${spec.charpenteCapacity.toLocaleString('fr-FR')} T/an`}
      </Label>
    </g>
  );
}
