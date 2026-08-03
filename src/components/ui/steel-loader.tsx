import { cn } from '@/lib/utils';
import { WF } from '@/components/wireframes/wf-theme';

type SteelLoaderProps = {
  /** Visible caption under the plate. Decorative — hidden from screen readers. */
  label?: string;
  /** Text announced by screen readers in place of the drawing and the caption. */
  srLabel?: string;
  className?: string;
};

/* ------------------------------------------------------------------ *
 * Section geometry — one source of truth for the plate and the CSS    *
 *                                                                     *
 * The cross-section of a welded plate girder (PRS), drawn the way a    *
 * shop drawing draws it: three separate plates (two flanges + a web),  *
 * their edges left visible because that is what a *welded* built-up    *
 * section is — not an extruded profile.                                *
 * ------------------------------------------------------------------ */

const PLATE = { w: 220, h: 180 } as const;
const FRAME = { x: 6, y: 6, w: 208, h: 168 } as const;

const CX = 110; // section centreline
const B = 88; // flange span
const TF = 13; // flange thickness
const TW = 14; // web thickness
const H = 108; // overall depth
const TOP = 34; // top of the section
const WELD = 8; // leg of the fillet weld marks

const BOT = TOP + H; // 142
const FLANGE_X = CX - B / 2; // 66
const WEB_X = CX - TW / 2; // 103
const WEB_Y = TOP + TF; // 47
const WEB_H = H - 2 * TF; // 82
const BOT_FLANGE_Y = BOT - TF; // 129

/** Distance the flanges travel before they seat onto the web, in user units. */
const SLIDE = 26;

/** Dimension line under the section — carries the flange span. */
const DIM_Y = 160;
const DIM_TICK_TOP = 152;
const DIM_TICK_BOTTOM = 168;
const DIM_LEN = B; // stroke-dasharray for the sweep

/** Fillet welds in the four re-entrant corners of the flange/web junctions. */
const WELDS: ReadonlyArray<{ key: string; d: string }> = [
  {
    key: 'tl',
    d: `M ${WEB_X} ${WEB_Y} L ${WEB_X - WELD} ${WEB_Y} L ${WEB_X} ${WEB_Y + WELD} Z`,
  },
  {
    key: 'tr',
    d: `M ${WEB_X + TW} ${WEB_Y} L ${WEB_X + TW + WELD} ${WEB_Y} L ${WEB_X + TW} ${WEB_Y + WELD} Z`,
  },
  {
    key: 'bl',
    d: `M ${WEB_X} ${BOT_FLANGE_Y} L ${WEB_X - WELD} ${BOT_FLANGE_Y} L ${WEB_X} ${BOT_FLANGE_Y - WELD} Z`,
  },
  {
    key: 'br',
    d: `M ${WEB_X + TW} ${BOT_FLANGE_Y} L ${WEB_X + TW + WELD} ${BOT_FLANGE_Y} L ${WEB_X + TW} ${BOT_FLANGE_Y - WELD} Z`,
  },
];

/**
 * Route-transition loader, in the site's shop-drawing vernacular.
 *
 * A PRS cross-section assembles itself on a 2s loop: centre lines first, then
 * the web grows out of the centreline, the two flanges glide in from above and
 * below to seat on it, the four fillet welds flash, and finally a dimension
 * line sweeps across the flange span. The whole plate then fades out so the
 * restart is seamless — every element ends the cycle at opacity 0, which is
 * also where it starts, so there is no visible jump at the loop seam. Only the
 * dashed sheet frame is static, so the composition never blanks out entirely.
 *
 * This is genuinely a *route-transition* loader. The site is statically
 * prerendered, so on a fast connection a first page load never shows it; it
 * appears while the RSC payload for a client-side navigation streams, and on
 * slow connections. There is deliberately no artificial delay holding it on
 * screen.
 *
 * Server component: no hooks, no handlers, no client boundary. All motion is
 * scoped CSS keyframes namespaced `.sl-*`.
 */
export function SteelLoader({
  label = 'Chargement…',
  srLabel = 'Chargement en cours',
  className,
}: SteelLoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('flex flex-col items-center', className)}
    >
      <style>{LOADER_CSS}</style>

      <span className="sr-only">{srLabel}</span>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${PLATE.w} ${PLATE.h}`}
        aria-hidden="true"
        className="block h-auto w-full max-w-[220px]"
      >
        {/* Sheet frame — static, so the plate is never fully blank. */}
        <rect
          x={FRAME.x}
          y={FRAME.y}
          width={FRAME.w}
          height={FRAME.h}
          fill="none"
          stroke={WF.dim}
          strokeWidth={1}
          strokeDasharray="6 6"
          opacity={0.4}
        />

        {/* Construction / centre lines — dash-dot, the first thing on a sheet. */}
        <g className="sl-guide">
          <path
            d={`M ${CX} ${TOP - 12} L ${CX} ${BOT + 12} M ${FLANGE_X - 20} ${TOP + H / 2} L ${FLANGE_X + B + 20} ${TOP + H / 2}`}
            fill="none"
            stroke={WF.dim}
            strokeWidth={1}
            strokeDasharray="12 4 3 4"
            strokeLinecap="round"
          />
        </g>

        {/* Web (âme) — grows out of the centreline. */}
        <rect
          className="sl-web"
          x={WEB_X}
          y={WEB_Y}
          width={TW}
          height={WEB_H}
          fill={WF.steel}
          stroke={WF.ink}
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Flanges (semelles) — glide in from top and bottom onto the web. */}
        <rect
          className="sl-flange-top"
          x={FLANGE_X}
          y={TOP}
          width={B}
          height={TF}
          fill={WF.steel}
          stroke={WF.ink}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <rect
          className="sl-flange-bot"
          x={FLANGE_X}
          y={BOT_FLANGE_Y}
          width={B}
          height={TF}
          fill={WF.steel}
          stroke={WF.ink}
          strokeWidth={2}
          strokeLinejoin="round"
        />

        {/* Fillet welds — flash once the plates are seated. */}
        {WELDS.map((w) => (
          <path key={w.key} className="sl-weld" d={w.d} fill={WF.accent} />
        ))}

        {/* Dimension ticks, then the rule sweeping between them. */}
        <path
          className="sl-dim-tick"
          d={`M ${FLANGE_X} ${DIM_TICK_TOP} L ${FLANGE_X} ${DIM_TICK_BOTTOM} M ${FLANGE_X + B} ${DIM_TICK_TOP} L ${FLANGE_X + B} ${DIM_TICK_BOTTOM}`}
          fill="none"
          stroke={WF.dim}
          strokeWidth={1.25}
          strokeLinecap="round"
        />
        <path
          className="sl-dim"
          d={`M ${FLANGE_X} ${DIM_Y} L ${FLANGE_X + B} ${DIM_Y}`}
          fill="none"
          stroke={WF.dim}
          strokeWidth={1.25}
          strokeLinecap="round"
        />
      </svg>

      <p
        aria-hidden="true"
        className="mt-5 text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground"
      >
        {label}
      </p>

      {/* Indeterminate progress rule — no percentage is claimed, because none
          is known. */}
      <div
        aria-hidden="true"
        className="mt-4 h-0.5 w-40 overflow-hidden rounded-full bg-border"
      >
        <span className="sl-rail-bead block h-full w-1/3 rounded-full bg-accent" />
      </div>
    </div>
  );
}

/* ---------- scoped animation stylesheet ----------
 *
 * Every rule is namespaced `.sl-*` so nothing leaks out of the loader.
 *
 * One shared 2s duration with zero delay on every element: the stagger is
 * encoded in the keyframe percentages instead of `animation-delay`, which
 * keeps the whole assembly permanently in phase across iterations.
 *
 * Seamless loop: each animation ends its cycle at `opacity: 0`, so the snap
 * back to the starting transform at the 100% → 0% seam happens while the
 * element is invisible.
 *
 * Under prefers-reduced-motion the loader stays on screen — the section is
 * pinned fully assembled, welds placed, dimension drawn, progress rule
 * visible. A loader that hides itself tells the user nothing.
 */
const LOADER_CSS = `
.sl-guide {
  opacity: 0;
  animation: sl-guide 2s ease-in-out infinite;
}
.sl-web {
  opacity: 0;
  transform-box: fill-box;
  transform-origin: center;
  animation: sl-web 2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}
.sl-flange-top {
  opacity: 0;
  animation: sl-flange-top 2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}
.sl-flange-bot {
  opacity: 0;
  animation: sl-flange-bot 2s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}
.sl-weld {
  opacity: 0;
  animation: sl-weld 2s ease-in-out infinite;
}
.sl-dim-tick {
  opacity: 0;
  animation: sl-dim-tick 2s ease-in-out infinite;
}
.sl-dim {
  opacity: 0;
  stroke-dasharray: ${DIM_LEN};
  stroke-dashoffset: ${DIM_LEN};
  animation: sl-dim 2s cubic-bezier(0.33, 1, 0.68, 1) infinite;
}
.sl-rail-bead {
  animation: sl-rail 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
}
@keyframes sl-guide {
  0%, 100%  { opacity: 0; }
  10%, 86%  { opacity: 0.85; }
}
@keyframes sl-web {
  0%, 14%   { opacity: 0; transform: scaleY(0.15); }
  30%, 86%  { opacity: 1; transform: scaleY(1); }
  100%      { opacity: 0; transform: scaleY(1); }
}
@keyframes sl-flange-top {
  0%, 18%   { opacity: 0; transform: translateY(-${SLIDE}px); }
  44%, 86%  { opacity: 1; transform: translateY(0); }
  100%      { opacity: 0; transform: translateY(0); }
}
@keyframes sl-flange-bot {
  0%, 18%   { opacity: 0; transform: translateY(${SLIDE}px); }
  44%, 86%  { opacity: 1; transform: translateY(0); }
  100%      { opacity: 0; transform: translateY(0); }
}
@keyframes sl-weld {
  0%, 44%   { opacity: 0; }
  50%       { opacity: 1; }
  56%       { opacity: 0.3; }
  62%       { opacity: 0.95; }
  86%       { opacity: 0.6; }
  100%      { opacity: 0; }
}
@keyframes sl-dim-tick {
  0%, 52%   { opacity: 0; }
  58%, 86%  { opacity: 0.9; }
  100%      { opacity: 0; }
}
@keyframes sl-dim {
  0%, 56%   { opacity: 0; stroke-dashoffset: ${DIM_LEN}; }
  60%       { opacity: 1; stroke-dashoffset: ${DIM_LEN}; }
  78%, 86%  { opacity: 1; stroke-dashoffset: 0; }
  100%      { opacity: 0; stroke-dashoffset: 0; }
}
@keyframes sl-rail {
  0%   { transform: translateX(-110%); }
  100% { transform: translateX(330%); }
}
@media (prefers-reduced-motion: reduce) {
  .sl-guide {
    opacity: 0.85;
    animation: none;
  }
  .sl-web,
  .sl-flange-top,
  .sl-flange-bot {
    opacity: 1;
    transform: none;
    animation: none;
  }
  .sl-weld {
    opacity: 0.7;
    animation: none;
  }
  .sl-dim-tick {
    opacity: 0.9;
    animation: none;
  }
  .sl-dim {
    opacity: 1;
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    animation: none;
  }
  .sl-rail-bead {
    transform: none;
    animation: none;
  }
}
`;
