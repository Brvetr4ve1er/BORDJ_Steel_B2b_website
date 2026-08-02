import * as React from 'react';
import { WF } from '@/components/wireframes/wf-theme';

/**
 * Miniature of GalvanisationBathFigure — a cross-section of a hot-dip
 * galvanising bath with a steel member being lowered into the molten zinc.
 * Server-safe: animation runs from CSS embedded in the SVG and is triggered
 * by the parent card's `.group:hover` state.
 */
export default function GalvanisationIcon({
  className,
  size = 48,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <style>{`
        .galv-icon-member {
          transition: transform 420ms cubic-bezier(0.2, 0.7, 0.3, 1);
        }
        .group:hover .galv-icon-member {
          transform: translateY(2px);
        }
        @media (prefers-reduced-motion: reduce) {
          .galv-icon-member { transition: none; }
          .group:hover .galv-icon-member { transform: none; }
        }
      `}</style>

      {/* molten zinc — sits inside the vessel */}
      <rect x="8" y="24" width="32" height="14" fill={WF.zinc} />

      {/* bath vessel — outer + inner walls, open at the top (U cross-section) */}
      <path
        d="M 6 20 L 6 40 L 42 40 L 42 20 M 8 20 L 8 38 L 40 38 L 40 20"
        stroke={WF.ink}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* zinc surface — dashed level line */}
      <path
        d="M 8 24 L 40 24"
        stroke={WF.ink}
        strokeWidth="0.9"
        strokeDasharray="2 1.5"
      />

      {/* immersion arrow — the only pop of accent, points into the bath */}
      <path
        d="M 36 12 L 36 21 M 34 19 L 36 21 L 38 19"
        stroke={WF.accent}
        strokeWidth="1.25"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* steel member + lifting chain — the group that dips on hover */}
      <g className="galv-icon-member">
        {/* chain */}
        <path
          d="M 22 10 L 22 4"
          stroke={WF.dim}
          strokeWidth="1"
          strokeLinecap="round"
        />
        {/* lifting ring */}
        <circle
          cx="22"
          cy="2.6"
          r="1.3"
          stroke={WF.dim}
          strokeWidth="0.9"
        />
        {/* member — vertical steel section, top flange line for profile read */}
        <path
          d="M 19 10 L 25 10 L 25 34 L 19 34 Z M 19 12 L 25 12"
          stroke={WF.ink}
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
