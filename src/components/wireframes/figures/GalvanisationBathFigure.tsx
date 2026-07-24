import * as React from 'react';
import { WF } from '../wf-theme';
import { DimV, DimH, Label, Leader } from '../wf-primitives';

export interface GalvanisationSpec {
  lengthM: string; // "12 m"
  depthM: string; // "3 m"
  widthM: string; // "1,5 m"
  tempC: string; // "450 °C"
  baths: string; // "13"
  capacity: string; // "25 000 t/an"
  lifespan: string; // "> 50 ans"
}

// Cross-section of a hot-dip galvanising bath with a steel member being immersed.
export function GalvanisationBathFigure({ spec }: { spec: GalvanisationSpec }) {
  const bx0 = 150;
  const bx1 = 640;
  const byTop = 250;
  const byBot = 400;
  const wall = 10;

  // vertical member being dipped
  const mx = 540;
  const mw = 24;
  const mTop = 120;
  const mBot = 360;

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* molten zinc (fade) */}
      <rect className="wf-fade" x={bx0} y={byTop} width={bx1 - bx0} height={byBot - byTop} fill={WF.zinc} />

      {/* bath vessel (draw) */}
      <path
        className="wf-line"
        d={`M ${bx0 - wall} ${byTop - 24} L ${bx0 - wall} ${byBot} L ${bx1 + wall} ${byBot} L ${bx1 + wall} ${byTop - 24} ` +
          `M ${bx0} ${byTop - 24} L ${bx0} ${byBot - wall} L ${bx1} ${byBot - wall} L ${bx1} ${byTop - 24}`}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2.5}
      />
      {/* zinc surface */}
      <path className="wf-line" d={`M ${bx0} ${byTop} L ${bx1} ${byTop}`} fill="none" stroke={WF.ink} strokeWidth={1.5} strokeDasharray="6 4" />

      {/* dipped member (draw), drawn over the zinc so it reads as submerged */}
      <path
        className="wf-line"
        d={`M ${mx - mw / 2} ${mTop} L ${mx - mw / 2} ${mBot} L ${mx + mw / 2} ${mBot} L ${mx + mw / 2} ${mTop} Z ` +
          `M ${mx - mw / 2} ${mTop + 10} L ${mx + mw / 2} ${mTop + 10}`}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2.5}
      />
      {/* lifting hook + chain */}
      <path
        className="wf-line"
        d={`M ${mx} ${mTop} L ${mx} ${90} M ${mx} ${90} q -10 -8 0 -16 q 10 -8 6 4`}
        fill="none"
        stroke={WF.dim}
        strokeWidth={2}
      />
      {/* immersion arrow */}
      <path
        className="wf-line"
        d={`M ${mx + 44} ${170} L ${mx + 44} ${300} M ${mx + 38} ${288} L ${mx + 44} ${300} L ${mx + 50} ${288}`}
        fill="none"
        stroke={WF.accent}
        strokeWidth={2}
      />
      <Label x={mx + 58} y={238} anchor="start" size={12} weight={600} color={WF.accent}>
        Immersion
      </Label>

      {/* dimensions */}
      <DimH x1={bx0} x2={bx1} y={byBot + 34} label={`Longueur ${spec.lengthM}`} color={WF.accent} labelColor={WF.accent} below />
      <path className="wf-line" d={`M ${bx0} ${byBot} L ${bx0} ${byBot + 40} M ${bx1} ${byBot} L ${bx1} ${byBot + 40}`} fill="none" stroke={WF.dim} strokeWidth={1} strokeDasharray="3 3" />
      <DimV x={bx0 - 40} y1={byTop} y2={byBot} label={`Prof. ${spec.depthM}`} />
      <Leader from={[bx1 - 60, byTop + 20]} to={[bx1 + 30, byTop - 10]} label={`Largeur ${spec.widthM}`} anchor="start" />

      {/* zinc temperature tag */}
      <Label x={bx0 + 30} y={byTop + 34} anchor="start" size={14} weight={700} color={WF.accent}>
        {`Zinc en fusion · ${spec.tempC}`}
      </Label>

      {/* readout */}
      <Label x={bx0} y={80} anchor="start" size={13} weight={700} color={WF.label}>
        {`${spec.baths} bains`}
      </Label>
      <Label x={bx0 + 90} y={80} anchor="start" size={13} weight={700} color={WF.label}>
        {spec.capacity}
      </Label>
      <Label x={bx0 + 230} y={80} anchor="start" size={13} weight={700} color={WF.label}>
        {`Protection ${spec.lifespan}`}
      </Label>
    </g>
  );
}
