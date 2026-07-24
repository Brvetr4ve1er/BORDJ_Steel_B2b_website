import * as React from 'react';
import { WF, WF_FONT } from './wf-theme';

/** A text label that fades/rises in after the lines draw. */
export function Label({
  x,
  y,
  children,
  anchor = 'middle',
  size = 15,
  weight = 600,
  color = WF.label,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  size?: number;
  weight?: number;
  color?: string;
}) {
  return (
    <text
      className="wf-fade"
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={WF_FONT}
      fontSize={size}
      fontWeight={weight}
      fill={color}
      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
    >
      {children}
    </text>
  );
}

const TICK = 6;

/** Horizontal dimension line at `y` spanning x1..x2, with end ticks + centered label. */
export function DimH({
  x1,
  x2,
  y,
  label,
  color = WF.dim,
  labelColor,
  below = false,
}: {
  x1: number;
  x2: number;
  y: number;
  label: string;
  color?: string;
  labelColor?: string;
  below?: boolean;
}) {
  const d = `M ${x1} ${y} L ${x2} ${y} M ${x1} ${y - TICK} L ${x1} ${y + TICK} M ${x2} ${y - TICK} L ${x2} ${y + TICK}`;
  return (
    <g>
      <path className="wf-line" d={d} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Label x={(x1 + x2) / 2} y={below ? y + 20 : y - 9} size={14} weight={600} color={labelColor ?? WF.label}>
        {label}
      </Label>
    </g>
  );
}

/** Vertical dimension line at `x` spanning y1..y2, with end ticks + label. */
export function DimV({
  x,
  y1,
  y2,
  label,
  color = WF.dim,
  labelColor,
  labelSide = 'left',
}: {
  x: number;
  y1: number;
  y2: number;
  label: string;
  color?: string;
  labelColor?: string;
  labelSide?: 'left' | 'right';
}) {
  const d = `M ${x} ${y1} L ${x} ${y2} M ${x - TICK} ${y1} L ${x + TICK} ${y1} M ${x - TICK} ${y2} L ${x + TICK} ${y2}`;
  return (
    <g>
      <path className="wf-line" d={d} fill="none" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Label
        x={labelSide === 'left' ? x - 12 : x + 12}
        y={(y1 + y2) / 2 + 5}
        anchor={labelSide === 'left' ? 'end' : 'start'}
        size={14}
        weight={700}
        color={labelColor ?? WF.label}
      >
        {label}
      </Label>
    </g>
  );
}

/** A leader line from a point on the drawing to a label. */
export function Leader({
  from,
  to,
  label,
  anchor = 'start',
  color = WF.dim,
}: {
  from: [number, number];
  to: [number, number];
  label: string;
  anchor?: 'start' | 'middle' | 'end';
  color?: string;
}) {
  return (
    <g>
      <path
        className="wf-line"
        d={`M ${from[0]} ${from[1]} L ${to[0]} ${to[1]}`}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <circle className="wf-line" cx={from[0]} cy={from[1]} r={2.5} fill={color} stroke={color} />
      <Label x={to[0] + (anchor === 'end' ? -6 : 6)} y={to[1] + 4} anchor={anchor} size={13} weight={600}>
        {label}
      </Label>
    </g>
  );
}
