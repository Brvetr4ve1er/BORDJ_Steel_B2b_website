import * as React from 'react';
import { WF } from '@/components/wireframes/wf-theme';

// Side elevation of a fabricated cylindrical vessel (silo / tank / pressure
// equipment): a stubby cylinder built from rolled plates welded course-by-course
// (viroles) with a small roof hatch and a simple ground line. On parent :hover
// (the product card is already a Tailwind `group`), the three virole seams flash
// in the brand red — an in-under-400ms nod to the shop-drawing figure.
export default function ChaudronnerieIcon({
  className,
  size = 48,
}: {
  className?: string;
  size?: number;
}) {
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
        .chd-seam {
          stroke: ${WF.dim};
        }
        .group:hover .chd-seam-1 {
          animation: chd-virole-flash 380ms ease-out both;
        }
        .group:hover .chd-seam-2 {
          animation: chd-virole-flash 380ms ease-out 70ms both;
        }
        .group:hover .chd-seam-3 {
          animation: chd-virole-flash 380ms ease-out 140ms both;
        }
        @keyframes chd-virole-flash {
          0%   { stroke: ${WF.dim}; }
          45%  { stroke: ${WF.accent}; }
          100% { stroke: ${WF.dim}; }
        }
        @media (prefers-reduced-motion: reduce) {
          .group:hover .chd-seam-1,
          .group:hover .chd-seam-2,
          .group:hover .chd-seam-3 {
            animation: none;
          }
        }
      `}</style>

      {/* body fill — cylindrical shell */}
      <path
        d="M 14 10 L 14 40 A 10 2.5 0 0 0 34 40 L 34 10 Z"
        fill={WF.fill}
      />

      {/* roof hatch / vent */}
      <path
        d="M 20 8 L 20 3 L 28 3 L 28 8"
        stroke={WF.ink}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* top rim (cylinder seen slightly from above) */}
      <ellipse
        cx="24"
        cy="10"
        rx="10"
        ry="2.5"
        stroke={WF.ink}
        strokeWidth="1.6"
        fill={WF.fill}
      />

      {/* body vertical edges */}
      <path
        d="M 14 10 L 14 40 M 34 10 L 34 40"
        stroke={WF.ink}
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* bottom rim (front-facing arc) */}
      <path
        d="M 14 40 A 10 2.5 0 0 0 34 40"
        stroke={WF.ink}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* viroles — three horizontal seams where rolled plate courses are welded */}
      <path
        className="chd-seam chd-seam-1"
        d="M 14 18 A 10 2 0 0 0 34 18"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        className="chd-seam chd-seam-2"
        d="M 14 26 A 10 2 0 0 0 34 26"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <path
        className="chd-seam chd-seam-3"
        d="M 14 34 A 10 2 0 0 0 34 34"
        strokeWidth="1.3"
        strokeLinecap="round"
      />

      {/* ground line */}
      <path
        d="M 7 44 L 41 44"
        stroke={WF.dim}
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
