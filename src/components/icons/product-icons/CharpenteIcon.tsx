import * as React from 'react';
import { WF } from '@/components/wireframes/wf-theme';

interface CharpenteIconProps {
  className?: string;
  size?: number;
}

// End cross-section of a welded plate girder (PRS) — an "I" profile.
// Two horizontal flanges (semelles), a vertical web (âme), and four accent
// weld marks at the flange/web junctions painted in WF.accent.
// Animation is CSS-only: parent card owns the `.group` class (Tailwind's
// group-hover convention) — on hover the body lifts ~1px and the weld
// marks pulse. Fully server-safe: no hooks, no client boundary.
export default function CharpenteIcon({ className, size = 48 }: CharpenteIconProps) {
  // Cross-section geometry, tuned for a 48x48 viewBox so the silhouette
  // reads as an I-beam at icon size:
  //   flange span:      x = 9..39   (30 wide)
  //   flange thickness: 5
  //   web:              x = 21..27  (6 wide), y = 11..37
  const iBeamPath =
    'M 9 6 L 39 6 L 39 11 L 27 11 L 27 37 L 39 37 L 39 42 L 9 42 ' +
    'L 9 37 L 21 37 L 21 11 L 9 11 Z';

  // Four weld triangles at each flange/web corner, pointing into the web.
  const welds: ReadonlyArray<{ key: string; d: string }> = [
    { key: 'tl', d: 'M 19 11 L 23 11 L 21 14 Z' },
    { key: 'tr', d: 'M 25 11 L 29 11 L 27 14 Z' },
    { key: 'bl', d: 'M 19 37 L 23 37 L 21 34 Z' },
    { key: 'br', d: 'M 25 37 L 29 37 L 27 34 Z' },
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
        .charpente-icon-body {
          transform-box: fill-box;
          transform-origin: center;
          transition: transform 320ms ease-out;
        }
        .charpente-icon-weld {
          opacity: 0.45;
          transform-box: fill-box;
          transform-origin: center;
          transition: opacity 320ms ease-out;
        }
        .group:hover .charpente-icon-body,
        .group:focus-visible .charpente-icon-body {
          transform: translateY(-1.2px);
        }
        .group:hover .charpente-icon-weld,
        .group:focus-visible .charpente-icon-weld {
          opacity: 1;
          animation: charpente-icon-weld-pulse 1.6s ease-in-out infinite;
        }
        @keyframes charpente-icon-weld-pulse {
          0%, 100% { opacity: 0.7; }
          50%      { opacity: 1; }
        }
        @media (prefers-reduced-motion: reduce) {
          .charpente-icon-body {
            transition: none;
          }
          .group:hover .charpente-icon-body,
          .group:focus-visible .charpente-icon-body {
            transform: none;
          }
          .charpente-icon-weld {
            opacity: 0.8;
            transition: none;
          }
          .group:hover .charpente-icon-weld,
          .group:focus-visible .charpente-icon-weld {
            animation: none;
            opacity: 0.9;
          }
        }
      `}</style>

      <g className="charpente-icon-body">
        <path
          d={iBeamPath}
          fill={WF.steel}
          stroke={WF.ink}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <g>
          {welds.map((w) => (
            <path
              key={w.key}
              className="charpente-icon-weld"
              d={w.d}
              fill={WF.accent}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
