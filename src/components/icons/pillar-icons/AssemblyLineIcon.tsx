import { WF } from '@/components/wireframes/wf-theme';

interface AssemblyLineIconProps {
  className?: string;
  size?: number;
}

/**
 * Ligne de Fabrication Automobile.
 *
 * Elevation of a production line, not a vehicle: a portal gantry straddling a
 * roller conveyor, two welding heads dropped from the gantry beam, and a body
 * shell (caisse en blanc — no wheels, no glazing) carried along on the rollers.
 *
 * Colour: gantry and body shell are light `WF.steel` plates outlined in
 * `WF.ink`, so they read as light silhouettes on the dark pillar medallion;
 * the floor, deck and tool drops use `currentColor`; the rollers are `WF.dim`
 * circles with an ink diameter tick so their rotation is visible.
 *
 * Server-safe: no hooks. On hover the rollers turn and the shell indexes
 * forward along the line.
 */

/** Roller centres along the conveyor deck. */
const ROLLERS = [12, 18, 24, 30, 36] as const;

export default function AssemblyLineIcon({ className, size = 48 }: AssemblyLineIconProps) {
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
        .pil-asm-roller {
          transform-box: fill-box;
          transform-origin: center;
        }
        .pil-asm-body {
          transition: transform 520ms cubic-bezier(0.2, 0.7, 0.3, 1);
        }
        .group:hover .pil-asm-roller,
        .group:focus-visible .pil-asm-roller {
          animation: pil-asm-spin 1.9s linear infinite;
        }
        .group:hover .pil-asm-body,
        .group:focus-visible .pil-asm-body {
          transform: translateX(3px);
        }
        @keyframes pil-asm-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pil-asm-body { transition: none; }
          .group:hover .pil-asm-roller,
          .group:focus-visible .pil-asm-roller {
            animation: none;
            transform: none;
          }
          .group:hover .pil-asm-body,
          .group:focus-visible .pil-asm-body {
            transform: none;
          }
        }
      `}</style>

      {/* Shop floor. */}
      <path d="M 3 41 L 45 41" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" />

      {/* Portal gantry — beam over two columns. */}
      <rect x={4} y={4} width={40} height={4.2} fill={WF.steel} stroke={WF.ink} strokeWidth={1.3} strokeLinejoin="round" />
      <rect x={5} y={8.2} width={3.6} height={32.8} fill={WF.steel} stroke={WF.ink} strokeWidth={1.3} strokeLinejoin="round" />
      <rect x={39.4} y={8.2} width={3.6} height={32.8} fill={WF.steel} stroke={WF.ink} strokeWidth={1.3} strokeLinejoin="round" />

      {/* Welding heads dropped from the beam. */}
      <path
        d="M 16 8.2 L 16 12.4 M 32 8.2 L 32 12.4"
        stroke="currentColor"
        strokeWidth={1.2}
        strokeLinecap="round"
      />
      <rect x={14.6} y={12.4} width={2.8} height={2.8} fill={WF.accent} stroke={WF.steel} strokeWidth={0.8} strokeLinejoin="round" />
      <rect x={30.6} y={12.4} width={2.8} height={2.8} fill={WF.accent} stroke={WF.steel} strokeWidth={0.8} strokeLinejoin="round" />

      {/* Body shell on the line — advances on hover. */}
      <g className="pil-asm-body">
        <path
          d="M 11.5 31.4 L 11.5 26.4 L 17.4 26.4 L 21 20.4 L 29 20.4 L 32.6 26.4 L 34.6 26.4 L 34.6 31.4 Z"
          fill={WF.steel}
          stroke={WF.ink}
          strokeWidth={1.3}
          strokeLinejoin="round"
        />
        <path
          d="M 25 20.4 L 25 31.4 M 32.6 26.4 L 32.6 31.4"
          stroke={WF.dim}
          strokeWidth={1}
        />
      </g>

      {/* Conveyor deck, roller frame and legs. */}
      <path d="M 9.6 31.4 L 38.4 31.4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" />
      <path
        d="M 9.6 36.6 L 38.4 36.6 M 13 36.6 L 13 41 M 35 36.6 L 35 41"
        stroke={WF.dim}
        strokeWidth={1}
        strokeLinecap="round"
      />

      {/* Rollers — the diameter tick makes the rotation read. */}
      {ROLLERS.map((cx) => (
        <g key={cx} className="pil-asm-roller">
          <circle cx={cx} cy={34} r={2} fill={WF.fill} stroke={WF.dim} strokeWidth={1} />
          <path d={`M ${cx} 32 L ${cx} 36`} stroke={WF.ink} strokeWidth={0.9} strokeLinecap="round" />
        </g>
      ))}
    </svg>
  );
}
