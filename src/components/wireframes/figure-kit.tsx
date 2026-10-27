import * as React from 'react';
import { WF, WF_FONT } from './wf-theme';

/**
 * Shared primitives for the flat, static technical figures used outside the
 * animated product wireframes — the /contact department cards and the
 * /about/history milestones.
 *
 * Extracted rather than copied. The contact figures defined these first; the
 * history figures needed the same stroke weights and the same caption style,
 * and two sets of "almost the same" line art is the failure mode this whole
 * visual system exists to avoid.
 *
 * These are deliberately NOT the `.wf-line` / `.wf-fade` classes used by
 * `ProductWireframe`. Those are driven imperatively by `use-draw-in.ts` and
 * have no CSS fallback, so anything using them outside that shell renders at
 * the mercy of a hook that never runs. Everything here is plain SVG.
 */

export const INK = WF.ink;
export const DIM = WF.dim;
export const ACCENT = WF.accent;

/** One hand across every figure. */
export const W_MAIN = 3.0;
export const W_THIN = 1.75;
export const W_ACCENT = 3.4;

/** Small caption, sized to stay legible when a 360x240 figure is scaled down. */
export function Cap({
  x,
  y,
  children,
  anchor = 'middle',
  color = WF.labelMuted,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  color?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={WF_FONT}
      fontSize={15}
      fontWeight={600}
      letterSpacing={0.2}
      fill={color}
    >
      {children}
    </text>
  );
}

/** Horizontal dimension line with end ticks and a centred label. */
export function Dim({
  x1,
  x2,
  y,
  label,
  color = DIM,
  labelColor = WF.label,
}: {
  x1: number;
  x2: number;
  y: number;
  label: string;
  color?: string;
  labelColor?: string;
}) {
  return (
    <g>
      <path
        d={`M ${x1} ${y} L ${x2} ${y} M ${x1} ${y - 5} L ${x1} ${y + 5} M ${x2} ${y - 5} L ${x2} ${y + 5}`}
        fill="none"
        stroke={color}
        strokeWidth={W_THIN}
        strokeLinecap="round"
      />
      <Cap x={(x1 + x2) / 2} y={y - 9} color={labelColor}>
        {label}
      </Cap>
    </g>
  );
}
