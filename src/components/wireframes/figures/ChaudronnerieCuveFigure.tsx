import * as React from 'react';
import { WF } from '../wf-theme';
import { DimH, DimV, Label, Leader } from '../wf-primitives';

export interface ChaudronnerieCuveSpec {
  /** "1 250 à 3 000 mm" — outside diameter (the table's FORMAT column). */
  diametre: string;
  /** "2 200 à 13 600 mm" — shell-course length (LONGUEUR VIROLE). */
  virole: string;
  /** "2 730 à 14 886 mm" — overall length (LONGUEUR TOTALE). */
  longueurTotale: string;
  /** "4 à 6 mm" — plate thickness (ÉPAISSEUR). */
  epaisseur: string;
  /** "3 Bars" — hydraulic test pressure; omitted when the rows disagree. */
  pressionEpreuve?: string;
}

// WHAT THIS DRAWS, AND WHY IT CHANGED. This figure used to be a vertical silo
// on legs, with a conical hopper and a roof vent. Nothing on this page is that
// object: the ten technical plates in the carousel below are all titled "CUVES
// ENTERREES STANDARD-MRC", and the table beside them is dimensioned in the
// vocabulary of a horizontal tank — FORMAT (outside diameter), LONGUEUR VIROLE,
// LONGUEUR TOTALE, NBRE TROUS D'HOMME, pression d'épreuve. So the lead drawing
// now shows the vessel the page actually documents: a horizontal cylinder with
// dished ends, a bolted manhole carrying the nozzles, and lifting lugs.
//
// WHY NO PLANT READOUT. The old version printed the unit's surface, capacity
// and headcount in its top-right corner. All three are already in the hero stat
// strip directly above, from the same source — and none of them is anything a
// drawing can show. Same reasoning as the CharpenteProfileFigure note.
export function ChaudronnerieCuveFigure({ spec }: { spec: ChaudronnerieCuveSpec }) {
  // Shell: flat virole between two dished ends, drawn as one closed path so the
  // draw-in traces the silhouette in a single stroke.
  const bx0 = 170;
  const bx1 = 520;
  const cyMid = 236;
  const ry = 84;
  const dish = 34;
  const yTop = cyMid - ry;
  const yBot = cyMid + ry;
  const xL = bx0 - dish;
  const xR = bx1 + dish;

  const shell =
    `M ${bx0} ${yTop} L ${bx1} ${yTop} ` +
    `A ${dish} ${ry} 0 0 1 ${bx1} ${yBot} ` +
    `L ${bx0} ${yBot} ` +
    `A ${dish} ${ry} 0 0 1 ${bx0} ${yTop} Z`;

  // Manhole: neck, bolted flange, cover, and the nozzles that sit on the cover
  // (the plates' DETAIL : COUVERCLE — purge, aération, aspiration).
  const mhx = 300;
  const mhNeck = 28;
  const mhFlange = 38;
  const yNeck = 132;
  const yFlange = 124;
  const yCover = 114;

  // Lifting lugs, flanking the manhole as on the plates.
  const lugLeft = 225;
  const lugRight = 455;

  // End view, mirroring the plates' right-hand view.
  const ex = 672;
  const er = 66;

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* shell body (fade) */}
      <path className="wf-fade" d={shell} fill={WF.fill} />
      <circle className="wf-fade" cx={ex} cy={cyMid} r={er} fill={WF.fill} />

      {/* axes */}
      <path
        className="wf-line"
        d={`M ${xL - 26} ${cyMid} L ${xR + 26} ${cyMid} M ${ex - er - 22} ${cyMid} L ${ex + er + 22} ${cyMid} M ${ex} ${cyMid - er - 22} L ${ex} ${cyMid + er + 22}`}
        fill="none"
        stroke={WF.dim}
        strokeWidth={1}
        strokeDasharray="20 5 4 5"
      />

      {/* shell outline (draw) */}
      <path className="wf-line" d={shell} fill="none" stroke={WF.ink} strokeWidth={2.5} />

      {/* virole / fond weld seams, and their extension down to the dimension line */}
      <path
        className="wf-line"
        d={`M ${bx0} ${yTop} L ${bx0} ${yBot + 60} M ${bx1} ${yTop} L ${bx1} ${yBot + 60}`}
        fill="none"
        stroke={WF.dim}
        strokeWidth={1}
        strokeDasharray="5 4"
      />
      {/* extension lines for the overall length, off the crown of each dished end */}
      <path
        className="wf-line"
        d={`M ${xL} ${cyMid} L ${xL} ${yBot + 106} M ${xR} ${cyMid} L ${xR} ${yBot + 106}`}
        fill="none"
        stroke={WF.dim}
        strokeWidth={1}
        strokeDasharray="5 4"
      />

      {/* bearing plates under the flat bottom */}
      <path
        className="wf-line"
        d={`M 206 ${yBot} L 206 ${yBot + 12} L 242 ${yBot + 12} L 242 ${yBot} ` +
          `M 448 ${yBot} L 448 ${yBot + 12} L 484 ${yBot + 12} L 484 ${yBot}`}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2}
      />

      {/* manhole: neck, flange, cover */}
      <path
        className="wf-line"
        d={`M ${mhx - mhNeck} ${yTop} L ${mhx - mhNeck} ${yNeck} L ${mhx + mhNeck} ${yNeck} L ${mhx + mhNeck} ${yTop} ` +
          `M ${mhx - mhFlange} ${yNeck} L ${mhx - mhFlange} ${yFlange} L ${mhx + mhFlange} ${yFlange} L ${mhx + mhFlange} ${yNeck} Z ` +
          `M ${mhx - 30} ${yFlange} L ${mhx - 30} ${yCover} L ${mhx + 30} ${yCover} L ${mhx + 30} ${yFlange}`}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2.5}
      />
      {/* bolts through the flange */}
      <path
        className="wf-line"
        d={[-30, -18, -6, 6, 18, 30]
          .map((dx) => `M ${mhx + dx} ${yFlange} L ${mhx + dx} ${yNeck}`)
          .join(' ')}
        fill="none"
        stroke={WF.dim}
        strokeWidth={1.5}
      />
      {/* nozzles on the cover */}
      <path
        className="wf-line"
        d={[-18, 0, 18]
          .map((dx) => `M ${mhx + dx - 4} ${yCover} L ${mhx + dx - 4} ${yCover - 12} L ${mhx + dx + 4} ${yCover - 12} L ${mhx + dx + 4} ${yCover}`)
          .join(' ')}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2}
      />

      {/* lifting lugs */}
      {[lugLeft, lugRight].map((lx) => (
        <React.Fragment key={lx}>
          <path
            className="wf-line"
            d={`M ${lx - 9} ${yTop} L ${lx - 9} ${yTop - 12} A 9 9 0 0 1 ${lx + 9} ${yTop - 12} L ${lx + 9} ${yTop}`}
            fill="none"
            stroke={WF.ink}
            strokeWidth={2}
          />
          <circle className="wf-line" cx={lx} cy={yTop - 12} r={3.5} fill="none" stroke={WF.ink} strokeWidth={1.5} />
        </React.Fragment>
      ))}

      {/* end view: outline + the manhole neck seen from the end */}
      <circle className="wf-line" cx={ex} cy={cyMid} r={er} fill="none" stroke={WF.ink} strokeWidth={2.5} />
      <path
        className="wf-line"
        d={`M ${ex - 12} ${cyMid - er + 4} L ${ex - 12} ${cyMid - er - 6} L ${ex + 12} ${cyMid - er - 6} L ${ex + 12} ${cyMid - er + 4} ` +
          `M ${ex - 20} ${cyMid - er - 6} L ${ex + 20} ${cyMid - er - 6}`}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2}
      />
      {/* WF.labelMuted is not used for any text here: #94a3b8 on the shell's
          white card is 2.55:1, under the 4.5:1 this size needs. Hierarchy comes
          from size and weight instead. */}
      <Label x={ex} y={cyMid - er - 24} size={12} weight={600}>
        Vue en bout
      </Label>

      {/* dimensions */}
      <DimV x={108} y1={yTop} y2={yBot} label="Ø ext." />
      <DimH x1={bx0} x2={bx1} y={yBot + 52} label={`Longueur virole ${spec.virole}`} />
      <DimH
        x1={xL}
        x2={xR}
        y={yBot + 98}
        label={`Longueur totale ${spec.longueurTotale}`}
        color={WF.accent}
        labelColor={WF.accent}
      />

      {/* what the end view measures */}
      <Label x={ex} y={cyMid + er + 32} size={13} weight={700}>
        {`Ø ext. ${spec.diametre}`}
      </Label>
      <Label x={ex} y={cyMid + er + 54} size={13} weight={600}>
        {`Épaisseur ${spec.epaisseur}`}
      </Label>

      {/* callouts */}
      <Leader from={[mhx, yCover + 4]} to={[238, 96]} label="Trou d'homme et couvercle" anchor="end" />
      <Leader from={[lugRight, yTop - 12]} to={[524, 100]} label="Anneau de levage" anchor="start" />

      {/* service readout */}
      <Label x={740} y={46} anchor="end" size={13} weight={600}>
        Pression de service · atmosphérique
      </Label>
      {spec.pressionEpreuve && (
        <Label x={740} y={68} anchor="end" size={13} weight={700} color={WF.accent}>
          {`Épreuve hydraulique · ${spec.pressionEpreuve}`}
        </Label>
      )}
    </g>
  );
}
