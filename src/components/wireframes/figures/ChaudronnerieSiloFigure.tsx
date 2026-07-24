import * as React from 'react';
import { WF } from '../wf-theme';
import { DimV, Label, Leader } from '../wf-primitives';

export interface ChaudronnerieSpec {
  surface: string; // "1 500 m²"
  capacity: string; // "5 000 T/an"
  staff: string; // "30 employés"
}

// Elevation of a fabricated storage silo / tank: cylindrical body, conical hopper,
// support legs, access ladder + platform. Proportions are schematic (dimensions are
// bespoke per project); every label comes from the real silos feature list.
export function ChaudronnerieSiloFigure({ spec }: { spec: ChaudronnerieSpec }) {
  const cx = 290;
  const rx = 92;
  const yTop = 120;
  const yCylBot = 320;
  const yOut = 398;
  const yGround = 432;
  const out = 20;

  return (
    <g strokeLinejoin="round" strokeLinecap="round">
      {/* body fill (fade) */}
      <path className="wf-fade" d={`M ${cx - rx} ${yTop} L ${cx - rx} ${yCylBot} L ${cx + rx} ${yCylBot} L ${cx + rx} ${yTop} Z`} fill={WF.fill} />
      <path className="wf-fade" d={`M ${cx - rx} ${yCylBot} L ${cx - out} ${yOut} L ${cx + out} ${yOut} L ${cx + rx} ${yCylBot} Z`} fill={WF.fill} />

      {/* cylinder */}
      <ellipse className="wf-line" cx={cx} cy={yTop} rx={rx} ry={17} fill="none" stroke={WF.ink} strokeWidth={2.5} />
      <path
        className="wf-line"
        d={`M ${cx - rx} ${yTop} L ${cx - rx} ${yCylBot} M ${cx + rx} ${yTop} L ${cx + rx} ${yCylBot}`}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2.5}
      />
      {/* cylinder bottom rim (front arc) */}
      <path className="wf-line" d={`M ${cx - rx} ${yCylBot} A ${rx} 16 0 0 0 ${cx + rx} ${yCylBot}`} fill="none" stroke={WF.ink} strokeWidth={2} />

      {/* conical hopper + outlet */}
      <path
        className="wf-line"
        d={`M ${cx - rx} ${yCylBot} L ${cx - out} ${yOut} L ${cx + out} ${yOut} L ${cx + rx} ${yCylBot} ` +
          `M ${cx - out} ${yOut} L ${cx - out} ${yOut + 14} L ${cx + out} ${yOut + 14} L ${cx + out} ${yOut}`}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2.5}
      />

      {/* roof vent */}
      <path className="wf-line" d={`M ${cx - 12} ${yTop - 17} L ${cx - 12} ${yTop - 30} L ${cx + 12} ${yTop - 30} L ${cx + 12} ${yTop - 17}`} fill="none" stroke={WF.ink} strokeWidth={2} />

      {/* support legs */}
      <path
        className="wf-line"
        d={`M ${cx - rx + 12} ${yCylBot} L ${cx - rx - 6} ${yGround} M ${cx + rx - 12} ${yCylBot} L ${cx + rx + 6} ${yGround} ` +
          `M ${cx - 30} ${yOut} L ${cx - 34} ${yGround} M ${cx + 30} ${yOut} L ${cx + 34} ${yGround}`}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2.5}
      />
      {/* ground */}
      <path className="wf-line" d={`M ${cx - rx - 40} ${yGround} L ${cx + rx + 40} ${yGround}`} fill="none" stroke={WF.dim} strokeWidth={2} />

      {/* access ladder (right) with rungs */}
      <path
        className="wf-line"
        d={
          `M ${cx + rx + 10} ${yTop + 24} L ${cx + rx + 10} ${yCylBot} M ${cx + rx + 20} ${yTop + 24} L ${cx + rx + 20} ${yCylBot} ` +
          Array.from({ length: 8 }, (_, i) => {
            const y = yTop + 40 + i * 34;
            return `M ${cx + rx + 10} ${y} L ${cx + rx + 20} ${y}`;
          }).join(' ')
        }
        fill="none"
        stroke={WF.dim}
        strokeWidth={1.8}
      />
      {/* top platform + railing */}
      <path
        className="wf-line"
        d={`M ${cx + rx} ${yTop + 26} L ${cx + rx + 34} ${yTop + 26} M ${cx + rx + 34} ${yTop + 26} L ${cx + rx + 34} ${yTop + 8}`}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2}
      />

      {/* height dimension (bespoke) */}
      <DimV x={cx - rx - 44} y1={yTop} y2={yOut} label="H sur mesure" />
      <path
        className="wf-line"
        d={`M ${cx - rx - 50} ${yTop} L ${cx - rx} ${yTop} M ${cx - rx - 50} ${yOut} L ${cx - out} ${yOut}`}
        fill="none"
        stroke={WF.dim}
        strokeWidth={1}
        strokeDasharray="3 3"
      />

      {/* feature callouts */}
      <Leader from={[cx + rx + 20, yTop + 120]} to={[cx + rx + 70, yTop + 96]} label="Échelles & passerelles" anchor="start" />
      <Leader from={[cx, yOut + 7]} to={[cx + 60, yOut + 40]} label="Vidange" anchor="start" />
      <Leader from={[cx - rx, yTop + 150]} to={[cx - rx - 60, yTop + 176]} label="Étanchéité anticorrosion" anchor="end" />
      <Label x={cx} y={yGround + 22} size={12} weight={600} color={WF.labelMuted}>
        Calcul résistance vent & séisme
      </Label>

      {/* plant readout */}
      <Label x={620} y={150} anchor="start" size={13} weight={700} color={WF.accent}>
        {spec.capacity}
      </Label>
      <Label x={620} y={174} anchor="start" size={13} weight={600}>
        {spec.surface}
      </Label>
      <Label x={620} y={198} anchor="start" size={13} weight={600} color={WF.labelMuted}>
        {spec.staff}
      </Label>
    </g>
  );
}
