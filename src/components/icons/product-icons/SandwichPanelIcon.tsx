import * as React from 'react';
import { WF } from '@/components/wireframes/wf-theme';

interface SandwichPanelIconProps {
  className?: string;
  size?: number;
}

// Cross-section of a three-layer insulated sandwich panel:
//   - trapezoidally-ribbed steel outer skin on top (the cladding profile)
//   - insulating foam core in the middle (WF.foam)
//   - flat steel inner skin on the bottom
// Animation is CSS-only: the parent card owns the `.group` class (Tailwind's
// group-hover convention) — on hover the whole panel lifts ~1px and the foam
// core saturates so the insulating layer reads at a glance. Fully server-safe:
// no hooks, no client boundary. Motion collapses under prefers-reduced-motion.
export default function SandwichPanelIcon({
  className,
  size = 48,
}: SandwichPanelIconProps) {
  // Geometry, tuned for a 48x48 viewBox so the three-layer stack reads at
  // icon size. The top skin is a 2-unit-thick band that follows a
  // trapezoidal cladding profile with three ribs; the core sits directly
  // below at y = 22..34; the bottom skin is a flat band at y = 34..37.
  //   outer profile of the top skin — peaks at y=10, valleys at y=20
  const outer: ReadonlyArray<readonly [number, number]> = [
    [4, 20], [7, 20], [9, 10], [13, 10], [15, 20],
    [19, 20], [21, 10], [25, 10], [27, 20],
    [31, 20], [33, 10], [37, 10], [39, 20], [44, 20],
  ];
  //   inner (underside) profile of the same skin, vertically offset by 2
  const inner: ReadonlyArray<readonly [number, number]> = [
    [44, 22], [39, 22], [37, 12], [33, 12], [31, 22],
    [27, 22], [25, 12], [21, 12], [19, 22],
    [15, 22], [13, 12], [9, 12], [7, 22], [4, 22],
  ];

  const outerPath = outer
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x} ${y}`)
    .join(' ');
  const innerPath = inner.map(([x, y]) => `L ${x} ${y}`).join(' ');
  // Closed top-skin polygon: outer forward, drop down at right, inner back, Z.
  const topSkinPath = `${outerPath} ${innerPath} Z`;

  // Foam packed into each rib cavity (bounded above by the inner profile
  // of the peak and below by the core top line at y = 22).
  const ribCavities: ReadonlyArray<{ key: string; d: string }> = [
    { key: 'r1', d: 'M 7 22 L 9 12 L 13 12 L 15 22 Z' },
    { key: 'r2', d: 'M 19 22 L 21 12 L 25 12 L 27 22 Z' },
    { key: 'r3', d: 'M 31 22 L 33 12 L 37 12 L 39 22 Z' },
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
        .sandwich-icon-body {
          transform-box: fill-box;
          transform-origin: center;
          transition: transform 320ms ease-out;
        }
        .sandwich-icon-foam {
          transition: filter 320ms ease-out;
        }
        .group:hover .sandwich-icon-body,
        .group:focus-visible .sandwich-icon-body {
          transform: translateY(-1px);
        }
        .group:hover .sandwich-icon-foam,
        .group:focus-visible .sandwich-icon-foam {
          filter: saturate(1.65);
        }
        @media (prefers-reduced-motion: reduce) {
          .sandwich-icon-body,
          .sandwich-icon-foam {
            transition: none;
          }
          .group:hover .sandwich-icon-body,
          .group:focus-visible .sandwich-icon-body {
            transform: none;
          }
          .group:hover .sandwich-icon-foam,
          .group:focus-visible .sandwich-icon-foam {
            filter: none;
          }
        }
      `}</style>

      <g className="sandwich-icon-body">
        {/* insulating foam core */}
        <rect
          className="sandwich-icon-foam"
          x={4}
          y={22}
          width={40}
          height={12}
          fill={WF.foam}
        />

        {/* foam packed into each raised rib cavity */}
        {ribCavities.map((c) => (
          <path
            key={c.key}
            className="sandwich-icon-foam"
            d={c.d}
            fill={WF.foam}
          />
        ))}

        {/* ribbed steel top skin */}
        <path d={topSkinPath} fill={WF.steel} />

        {/* flat steel bottom skin */}
        <rect x={4} y={34} width={40} height={3} fill={WF.steel} />

        {/* outer silhouette of the top skin (traces the rib profile) */}
        <path
          d={outerPath}
          stroke={WF.ink}
          strokeWidth={1.4}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* core top / bottom lines and outer bottom edge of the bottom skin */}
        <path
          d="M 4 22 L 44 22 M 4 34 L 44 34 M 4 37 L 44 37"
          stroke={WF.ink}
          strokeWidth={1.4}
          strokeLinecap="round"
        />
        {/* left and right closing edges of the whole panel */}
        <path
          d="M 4 20 L 4 37 M 44 20 L 44 37"
          stroke={WF.ink}
          strokeWidth={1.4}
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
