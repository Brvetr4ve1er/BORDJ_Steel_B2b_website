import { WF } from '@/components/wireframes/wf-theme';

interface PrsGirderIconProps {
  className?: string;
  size?: number;
}

/**
 * PRS — Profils Reconstitués Soudés.
 *
 * End cross-section of a welded plate girder, drawn the way the production
 * name describes it: three separate plates (two semelles + one âme) assembled
 * into an I, with fillet welds in the four re-entrant corners. Geometry follows
 * `wireframes/figures/CharpenteProfileFigure.tsx` (B/H/tf/tw proportions scaled
 * to a 48-unit box) so the icon and the full plate read as the same drawing.
 *
 * Colour: the plates carry a light `WF.steel` fill with a `WF.ink` outline, so
 * the silhouette reads as a light shape on the dark pillar-card medallion while
 * the internal linework and the accent welds stay legible on the fill.
 *
 * Server-safe: no hooks, no client boundary. Motion is scoped CSS driven by the
 * parent card's Tailwind `group` class.
 */
export default function PrsGirderIcon({ className, size = 48 }: PrsGirderIconProps) {
  // Cross-section, tuned so the "I" is unmistakable at 48px:
  //   flange span      x 9 .. 39   (30 wide)
  //   flange thickness 5
  //   web              x 21.2 .. 26.8 (5.6 wide), y 11.5 .. 36.5
  const FLANGE_X = 9;
  const FLANGE_W = 30;
  const FLANGE_T = 5;
  const TOP_Y = 6.5;
  const BOT_Y = 36.5;
  const WEB_X = 21.2;
  const WEB_W = 5.6;

  // Fillet welds: right-angled triangles tucked into each flange/web corner.
  const weldsTop: ReadonlyArray<{ key: string; d: string }> = [
    { key: 'tl', d: 'M 18.6 11.5 L 21.2 11.5 L 21.2 14.1 Z' },
    { key: 'tr', d: 'M 29.4 11.5 L 26.8 11.5 L 26.8 14.1 Z' },
  ];
  const weldsBottom: ReadonlyArray<{ key: string; d: string }> = [
    { key: 'bl', d: 'M 18.6 36.5 L 21.2 36.5 L 21.2 33.9 Z' },
    { key: 'br', d: 'M 29.4 36.5 L 26.8 36.5 L 26.8 33.9 Z' },
  ];

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
        .pil-prs-plate {
          transition: transform 380ms cubic-bezier(0.2, 0.7, 0.3, 1);
        }
        .pil-prs-weld {
          opacity: 0.6;
          transition: opacity 380ms ease-out;
        }
        .group:hover .pil-prs-plate-top,
        .group:focus-visible .pil-prs-plate-top {
          transform: translateY(1px);
        }
        .group:hover .pil-prs-plate-bot,
        .group:focus-visible .pil-prs-plate-bot {
          transform: translateY(-1px);
        }
        .group:hover .pil-prs-weld,
        .group:focus-visible .pil-prs-weld {
          opacity: 1;
          animation: pil-prs-weld-pulse 1.7s ease-in-out infinite;
        }
        @keyframes pil-prs-weld-pulse {
          0%, 100% { opacity: 0.7; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pil-prs-plate { transition: none; }
          .group:hover .pil-prs-plate-top,
          .group:focus-visible .pil-prs-plate-top,
          .group:hover .pil-prs-plate-bot,
          .group:focus-visible .pil-prs-plate-bot {
            transform: none;
          }
          .pil-prs-weld { opacity: 0.9; transition: none; }
          .group:hover .pil-prs-weld,
          .group:focus-visible .pil-prs-weld {
            animation: none;
            opacity: 0.9;
          }
        }
      `}</style>

      {/* Chain centreline — drawn first so the plates mask it, leaving only the
          short extensions above and below the section, as on a shop drawing. */}
      <path
        d="M 24 2.5 L 24 45.5"
        stroke={WF.dim}
        strokeWidth={0.9}
        strokeDasharray="5 2 1.5 2"
      />

      {/* Âme — the web plate, static: the flanges settle onto it. */}
      <rect
        x={WEB_X}
        y={TOP_Y + FLANGE_T}
        width={WEB_W}
        height={BOT_Y - (TOP_Y + FLANGE_T)}
        fill={WF.steel}
        stroke={WF.ink}
        strokeWidth={1.4}
        strokeLinejoin="round"
      />

      {/* Semelle supérieure + its two fillet welds. */}
      <g className="pil-prs-plate pil-prs-plate-top">
        <rect
          x={FLANGE_X}
          y={TOP_Y}
          width={FLANGE_W}
          height={FLANGE_T}
          fill={WF.steel}
          stroke={WF.ink}
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
        {weldsTop.map((w) => (
          <path key={w.key} className="pil-prs-weld" d={w.d} fill={WF.accent} />
        ))}
      </g>

      {/* Semelle inférieure + its two fillet welds. */}
      <g className="pil-prs-plate pil-prs-plate-bot">
        <rect
          x={FLANGE_X}
          y={BOT_Y}
          width={FLANGE_W}
          height={FLANGE_T}
          fill={WF.steel}
          stroke={WF.ink}
          strokeWidth={1.4}
          strokeLinejoin="round"
        />
        {weldsBottom.map((w) => (
          <path key={w.key} className="pil-prs-weld" d={w.d} fill={WF.accent} />
        ))}
      </g>
    </svg>
  );
}
