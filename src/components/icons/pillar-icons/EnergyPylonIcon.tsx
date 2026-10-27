import type { CSSProperties } from 'react';

import { WF } from '@/components/wireframes/wf-theme';

interface EnergyPylonIconProps {
  className?: string;
  size?: number;
}

/**
 * Supports de Transport d'Énergie.
 *
 * Elevation of a lattice transmission pylon: four legs tapering from a wide
 * base to a narrow mast, X-bracing between five levels, two cross-arms and a
 * peak. Insulator strings hang from the arm tips and terminate in accent discs
 * — the conductor attachment points, and the only colour note.
 *
 * Colour: the legs, mast, feet and cross-arms use `currentColor` so the
 * silhouette inherits the surrounding text colour (the pillar cards render the
 * icon on a dark medallion, where a `WF.ink` line would disappear); the bracing
 * sits one tier back in `WF.dim`.
 *
 * Server-safe: no hooks. On hover the bracing traces itself in level by level,
 * bottom to top, the way a pylon is actually erected.
 */

/** Per-panel trace length (user units, rounded up) and stagger delay. */
type TraceStyle = CSSProperties & { '--pyl-len': string; '--pyl-delay': string };

function trace(len: number, delay: number): TraceStyle {
  return { '--pyl-len': `${len}`, '--pyl-delay': `${delay}s` };
}

/**
 * Bracing diagonals, one path each so the dash length is exact.
 * Level half-widths taper linearly from y=44 (x 7 / 41) to y=18 (x 18 / 30);
 * the mast carries on to y=6.
 */
const BRACES: ReadonlyArray<{ key: string; d: string; len: number; delay: number }> = [
  { key: 'a1', d: 'M 7 44 L 38.04 37', len: 32, delay: 0 },
  { key: 'a2', d: 'M 41 44 L 9.96 37', len: 32, delay: 0 },
  { key: 'b1', d: 'M 9.96 37 L 35.08 30', len: 27, delay: 0.09 },
  { key: 'b2', d: 'M 38.04 37 L 12.92 30', len: 27, delay: 0.09 },
  { key: 'c1', d: 'M 12.92 30 L 32.12 23', len: 21, delay: 0.18 },
  { key: 'c2', d: 'M 35.08 30 L 15.88 23', len: 21, delay: 0.18 },
  { key: 'd1', d: 'M 15.88 23 L 30 18', len: 16, delay: 0.27 },
  { key: 'd2', d: 'M 32.12 23 L 18 18', len: 16, delay: 0.27 },
  { key: 'e1', d: 'M 18 18 L 29.5 12', len: 14, delay: 0.36 },
  { key: 'e2', d: 'M 30 18 L 18.5 12', len: 14, delay: 0.36 },
  { key: 'f1', d: 'M 18.5 12 L 29 6', len: 13, delay: 0.45 },
  { key: 'f2', d: 'M 29.5 12 L 19 6', len: 13, delay: 0.45 },
];

/**
 * Conductor attachment points at the four cross-arm tips.
 * The upper discs bottom out at y 13.1, which is why the lower arm sits at
 * y 15 rather than 14: its 2.1-wide stroke reaches up to y 13.95, and at y 14
 * the two would have touched.
 */
const INSULATORS: ReadonlyArray<{ key: string; x: number; y0: number; y1: number; cy: number }> = [
  { key: 'lower-l', x: 4.5, y0: 15, y1: 18.2, cy: 19.8 },
  { key: 'lower-r', x: 43.5, y0: 15, y1: 18.2, cy: 19.8 },
  { key: 'upper-l', x: 10, y0: 8, y1: 10.4, cy: 11.6 },
  { key: 'upper-r', x: 38, y0: 8, y1: 10.4, cy: 11.6 },
];

export default function EnergyPylonIcon({ className, size = 48 }: EnergyPylonIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      width={size}
      height={size}
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <style>{`
        .pil-pyl-brace {
          stroke-dasharray: var(--pyl-len);
          stroke-dashoffset: 0;
        }
        .group:hover .pil-pyl-brace,
        .group:focus-visible .pil-pyl-brace {
          animation: pil-pyl-trace 0.5s ease-out var(--pyl-delay, 0s) both;
        }
        .group:hover .pil-pyl-insulator,
        .group:focus-visible .pil-pyl-insulator {
          animation: pil-pyl-glow 1.8s ease-in-out infinite;
        }
        @keyframes pil-pyl-trace {
          from { stroke-dashoffset: var(--pyl-len); }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes pil-pyl-glow {
          0%, 100% { opacity: 0.65; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pil-pyl-brace {
            stroke-dasharray: none;
            stroke-dashoffset: 0;
          }
          .group:hover .pil-pyl-brace,
          .group:focus-visible .pil-pyl-brace {
            animation: none;
            stroke-dashoffset: 0;
          }
          .group:hover .pil-pyl-insulator,
          .group:focus-visible .pil-pyl-insulator {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

      {/* Horizontal struts at each level — always drawn, so the tower keeps its
          structure before the bracing traces in. */}
      <path
        d="M 9.96 37 L 38.04 37 M 12.92 30 L 35.08 30 M 15.88 23 L 32.12 23 M 18 18 L 30 18 M 18.5 12 L 29.5 12"
        stroke={WF.dim}
        strokeWidth={1}
        strokeLinecap="round"
      />

      {/* X-bracing, panel by panel. */}
      {BRACES.map((b) => (
        <path
          key={b.key}
          className="pil-pyl-brace"
          style={trace(b.len, b.delay)}
          d={b.d}
          stroke={WF.dim}
          strokeWidth={1}
          strokeLinecap="round"
        />
      ))}

      {/* Legs and mast — the tapering four-leg silhouette. */}
      <path
        d="M 7 44 L 18 18 M 41 44 L 30 18 M 18 18 L 19 6 M 30 18 L 29 6"
        stroke="currentColor"
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Foundation pads. */}
      <path
        d="M 4.5 44 L 9.5 44 M 38.5 44 L 43.5 44"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
      />

      {/* Cross-arms — what makes this a power pylon and not a tower. */}
      <path
        d="M 4.5 15 L 43.5 15 M 10 8 L 38 8"
        stroke="currentColor"
        strokeWidth={2.1}
        strokeLinecap="round"
      />

      {/* Peak carrying the earth wire. */}
      <path
        d="M 19 6 L 24 3 L 29 6"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Insulator strings + conductor attachment discs. */}
      {INSULATORS.map((ins) => (
        <g key={ins.key} className="pil-pyl-insulator">
          <path
            d={`M ${ins.x} ${ins.y0} L ${ins.x} ${ins.y1}`}
            stroke={WF.steel}
            strokeWidth={1}
            strokeLinecap="round"
          />
          <circle
            cx={ins.x}
            cy={ins.cy}
            r={1.5}
            fill={WF.accent}
            stroke={WF.steel}
            strokeWidth={0.8}
          />
        </g>
      ))}
    </svg>
  );
}
