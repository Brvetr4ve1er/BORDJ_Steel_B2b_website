import { WF } from '@/components/wireframes/wf-theme';

interface OverheadCraneIconProps {
  className?: string;
  size?: number;
}

/**
 * Pont Roulant — mono et bipoutre.
 *
 * Elevation of an overhead travelling crane: a welded bridge girder spanning
 * two end carriages, the carriages running on wheels along the two runway rails
 * (drawn with the corbels broken off, as on a shop drawing), and a hoist
 * trolley slung under the girder carrying the hook block and hook.
 *
 * Colour: the crane members are light `WF.steel` / `WF.fill` plates outlined in
 * `WF.ink`, so they read as a light silhouette on the dark pillar medallion and
 * the accent load marker on the hook block stays legible. The runway — building
 * structure, not crane — is drawn in `currentColor`.
 *
 * Server-safe: no hooks. On hover the trolley traverses along the girder.
 */
export default function OverheadCraneIcon({ className, size = 48 }: OverheadCraneIconProps) {
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
        .pil-crn-trolley {
          transition: transform 400ms cubic-bezier(0.2, 0.7, 0.3, 1);
        }
        .group:hover .pil-crn-trolley,
        .group:focus-visible .pil-crn-trolley {
          animation: pil-crn-traverse 3.8s ease-in-out infinite;
        }
        /* The trolley sweeps the runway span. Travel is capped at ±2.8 user
           units: the clear span between the end carriages runs x 16.5 to 31.5
           and the trolley is 8 wide, so a longer stroke drives it into a
           carriage. */
        @keyframes pil-crn-traverse {
          0%, 100% { transform: translateX(0); }
          25%      { transform: translateX(-2.8px); }
          75%      { transform: translateX(2.8px); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pil-crn-trolley { transition: none; }
          .group:hover .pil-crn-trolley,
          .group:focus-visible .pil-crn-trolley {
            animation: none;
            transform: none;
          }
        }
      `}</style>

      {/* A crane elevation is wide and short: the drawn content spans y 6.5 to
          35.8, so the whole assembly is nudged down 3 units to sit centred in
          the 48-box alongside the other three pillar icons. */}
      <g transform="translate(0 3)">
        {/* Runway: rail head, runway girder beneath it, and the corbels broken
            off with the conventional cut ticks. */}
        <path
          d="M 2 21 L 15 21 M 33 21 L 46 21"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
        />
        <path
          d="M 2.5 23.8 L 14.5 23.8 M 33.5 23.8 L 45.5 23.8 M 4 23.8 L 4 30.6 M 44 23.8 L 44 30.6"
          stroke={WF.dim}
          strokeWidth={1.2}
          strokeLinecap="round"
        />
        <path
          d="M 2.6 31 L 5.4 29.4 M 42.6 31 L 45.4 29.4"
          stroke={WF.dim}
          strokeWidth={1}
          strokeLinecap="round"
        />

        {/* Travel wheels, sitting on the rail head. */}
        {[8.5, 13.5, 34.5, 39.5].map((cx) => (
          <circle
            key={cx}
            cx={cx}
            cy={19.5}
            r={1.5}
            fill={WF.fill}
            stroke={WF.ink}
            strokeWidth={0.9}
          />
        ))}

        {/* End carriages. */}
        <rect
          x={5.5}
          y={13}
          width={11}
          height={5}
          fill={WF.fill}
          stroke={WF.ink}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />
        <rect
          x={31.5}
          y={13}
          width={11}
          height={5}
          fill={WF.fill}
          stroke={WF.ink}
          strokeWidth={1.2}
          strokeLinejoin="round"
        />

        {/* Bridge girder — a welded plate section, flanges marked. */}
        <rect
          x={7}
          y={6.5}
          width={34}
          height={6.5}
          fill={WF.steel}
          stroke={WF.ink}
          strokeWidth={1.3}
          strokeLinejoin="round"
        />
        <path d="M 8.2 8.4 L 39.8 8.4 M 8.2 11.1 L 39.8 11.1" stroke={WF.dim} strokeWidth={0.9} />

        {/* Hoist trolley, ropes, hook block and hook — the group that traverses. */}
        <g className="pil-crn-trolley">
          <rect
            x={20}
            y={13}
            width={8}
            height={4.6}
            fill={WF.fill}
            stroke={WF.ink}
            strokeWidth={1.2}
            strokeLinejoin="round"
          />
          <path
            d="M 22.3 17.6 L 22.3 26.5 M 25.7 17.6 L 25.7 26.5"
            stroke="currentColor"
            strokeWidth={1}
            strokeLinecap="round"
          />
          <rect
            x={21}
            y={26.5}
            width={6}
            height={3.4}
            fill={WF.steel}
            stroke={WF.ink}
            strokeWidth={1}
            strokeLinejoin="round"
          />
          <rect x={21.8} y={27.6} width={4.4} height={1.2} fill={WF.accent} />
          <path
            d="M 24 29.9 L 24 32.6 C 24 35.4 20.8 35.8 20.8 33.2"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
}
