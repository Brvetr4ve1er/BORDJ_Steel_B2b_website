import * as React from 'react';
import { WF, WF_FONT } from '@/components/wireframes/wf-theme';
import { companyData } from '@/config/company-data';

/**
 * Ambient backdrop for the /products hero.
 *
 * A wide shop-drawing composition that sits BEHIND the H1 and subtitle inside
 * the dark hero section. It reads as an engineering plate: four low-opacity
 * technical figures (one per production family) tied together by a top-of-plate
 * dimension line. The number in that dimension is derived from
 * `companyData.pages.units.items.length` — no invented facts, no marketing copy.
 *
 * The layer is `aria-hidden` and `pointer-events-none`; it must never intercept
 * clicks or become the accessible name of anything. Colours use the WF tokens,
 * kept dim enough to sit behind primary-foreground text without competing.
 *
 * Motion:
 *   - draw-in of the geometry on mount (~1.2s, ease-out).
 *   - a thin accent scan-line sweeps left→right on a 15s linear loop, at 10%
 *     opacity, to give ambient life without pulling focus.
 *   - `prefers-reduced-motion: reduce` pins everything to its final state and
 *     removes the scan-line entirely.
 *
 * Server component — no hooks, no event handlers, no client boundary needed.
 */
export function ProductsHeroBackdrop() {
  const unitCount = companyData.pages.units.items.length;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <style>{PHB_CSS}</style>

      <svg
        viewBox="0 0 1600 400"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
        className="phb-svg absolute inset-0 h-full w-full"
      >
        {/* Drafting frame — dashed, understated. */}
        <rect
          className="phb-fade"
          x={24}
          y={24}
          width={1552}
          height={352}
          fill="none"
          stroke={WF.dim}
          strokeWidth={1}
          strokeDasharray="6 6"
          opacity={0.35}
        />

        {/* Faint horizontal reference lines — a construction grid. */}
        <g className="phb-fade" opacity={0.18}>
          <path
            d="M 24 120 L 1576 120"
            stroke={WF.steel}
            strokeWidth={0.75}
            strokeDasharray="2 8"
            fill="none"
          />
          <path
            d="M 24 300 L 1576 300"
            stroke={WF.steel}
            strokeWidth={0.75}
            strokeDasharray="2 8"
            fill="none"
          />
        </g>

        {/* Top-of-plate dimension line spanning the four zones. */}
        <TopDimension unitCount={unitCount} />

        {/* Zone 1 — Charpente PRS: welded I-section cross-section. */}
        <IBeamGlyph cx={220} cy={230} />

        {/* Zone 2 — Panneaux sandwichs: ribbed cross-section. */}
        <SandwichGlyph cx={600} cy={230} />

        {/* Zone 3 — Galvanisation: bath vessel with immersion arrow. */}
        <BathGlyph cx={1000} cy={230} />

        {/* Zone 4 — Chaudronnerie: cylindrical vessel with viroles. */}
        <CylinderGlyph cx={1380} cy={230} />

        {/* Scan-line — a soft vertical accent stripe sweeping the plate. */}
        <g className="phb-scan">
          <rect
            x={-6}
            y={20}
            width={12}
            height={360}
            fill={WF.accent}
            opacity={0.1}
          />
        </g>
      </svg>
    </div>
  );
}

/* ---------- top dimension line ---------- */

function TopDimension({ unitCount }: { unitCount: number }) {
  const y = 74;
  const x0 = 60;
  const x1 = 1540;
  const tick = 8;
  const label = `${unitCount} UNITÉS DE PRODUCTION`;

  // Break the line either side of the label so the text sits inline with the dim.
  const labelHalf = 170;
  const midX = (x0 + x1) / 2;
  const gapL = midX - labelHalf;
  const gapR = midX + labelHalf;

  return (
    <g>
      <path
        className="phb-draw"
        d={
          `M ${x0} ${y} L ${gapL} ${y} M ${gapR} ${y} L ${x1} ${y} ` +
          `M ${x0} ${y - tick} L ${x0} ${y + tick} ` +
          `M ${x1} ${y - tick} L ${x1} ${y + tick}`
        }
        fill="none"
        stroke={WF.dim}
        strokeWidth={1.25}
        strokeDasharray="8 6"
        opacity={0.55}
        strokeLinecap="round"
      />
      <text
        className="phb-fade"
        x={midX}
        y={y + 5}
        textAnchor="middle"
        fontFamily={WF_FONT}
        fontSize={14}
        fontWeight={700}
        letterSpacing="0.22em"
        fill={WF.steel}
        opacity={0.55}
      >
        {label}
      </text>
    </g>
  );
}

/* ---------- Zone 1: welded I-section (Charpente) ---------- */

function IBeamGlyph({ cx, cy }: { cx: number; cy: number }) {
  const H = 170;
  const B = 130;
  const tf = 16;
  const tw = 14;
  const top = cy - H / 2;
  const bot = cy + H / 2;

  const outline =
    `M ${cx - B / 2} ${top} L ${cx + B / 2} ${top} L ${cx + B / 2} ${top + tf} ` +
    `L ${cx + tw / 2} ${top + tf} L ${cx + tw / 2} ${bot - tf} L ${cx + B / 2} ${bot - tf} ` +
    `L ${cx + B / 2} ${bot} L ${cx - B / 2} ${bot} L ${cx - B / 2} ${bot - tf} ` +
    `L ${cx - tw / 2} ${bot - tf} L ${cx - tw / 2} ${top + tf} L ${cx - B / 2} ${top + tf} Z`;

  return (
    <g opacity={0.42}>
      {/* Extension lines around the height dimension */}
      <path
        className="phb-fade"
        d={`M ${cx - B / 2 - 34} ${top} L ${cx - B / 2 - 8} ${top} M ${cx - B / 2 - 34} ${bot} L ${cx - B / 2 - 8} ${bot}`}
        stroke={WF.dim}
        strokeWidth={0.75}
        strokeDasharray="3 3"
        fill="none"
        opacity={0.7}
      />
      {/* Vertical dimension tick */}
      <path
        className="phb-draw"
        d={`M ${cx - B / 2 - 24} ${top} L ${cx - B / 2 - 24} ${bot} M ${cx - B / 2 - 30} ${top} L ${cx - B / 2 - 18} ${top} M ${cx - B / 2 - 30} ${bot} L ${cx - B / 2 - 18} ${bot}`}
        stroke={WF.dim}
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
      />
      {/* I profile */}
      <path
        className="phb-draw"
        d={outline}
        fill="none"
        stroke={WF.steel}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* Weld ticks at the 4 web/flange junctions */}
      <g className="phb-fade">
        {[
          [cx - tw / 2, top + tf, 1],
          [cx + tw / 2, top + tf, 1],
          [cx - tw / 2, bot - tf, -1],
          [cx + tw / 2, bot - tf, -1],
        ].map(([x, y, sign], i) => {
          const nx = x as number;
          const ny = y as number;
          const s = sign as number;
          return (
            <path
              key={i}
              d={`M ${nx - 4} ${ny} L ${nx + 4} ${ny} L ${nx} ${ny + 5 * s} Z`}
              fill={WF.accent}
              opacity={0.55}
            />
          );
        })}
      </g>
      {/* Axis centreline */}
      <path
        className="phb-fade"
        d={`M ${cx} ${top - 12} L ${cx} ${bot + 12}`}
        stroke={WF.dim}
        strokeWidth={0.75}
        strokeDasharray="4 4"
        fill="none"
        opacity={0.5}
      />
    </g>
  );
}

/* ---------- Zone 2: ribbed sandwich panel cross-section ---------- */

function SandwichGlyph({ cx, cy }: { cx: number; cy: number }) {
  const W = 240;
  const x0 = cx - W / 2;
  const x1 = cx + W / 2;
  const coreH = 44;
  const skin = 6;
  const ribH = 18;
  const ribs = 4;
  const coreTop = cy - coreH / 2;
  const coreBot = cy + coreH / 2;
  const ribTop = coreTop - ribH;
  const innerBot = coreBot + skin;
  const p = W / ribs;
  const vw = p * 0.3;
  const rw = p * 0.2;
  const cw = p * 0.3;

  // Ribbed outer skin polyline
  const pts: Array<[number, number]> = [[x0, coreTop]];
  for (let i = 0; i < ribs; i++) {
    const xs = x0 + i * p;
    pts.push([xs + vw, coreTop]);
    pts.push([xs + vw + rw, ribTop]);
    pts.push([xs + vw + rw + cw, ribTop]);
    pts.push([xs + p, coreTop]);
  }
  const outerSkin = 'M ' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ');

  return (
    <g opacity={0.42}>
      {/* Core hatch — a few diagonal marks to suggest fill without ink */}
      <g className="phb-fade" opacity={0.35}>
        {Array.from({ length: 8 }, (_, i) => {
          const gx = x0 + (i + 1) * (W / 9);
          return (
            <path
              key={i}
              d={`M ${gx - 6} ${coreBot - 2} L ${gx + 6} ${coreTop + 2}`}
              stroke={WF.steel}
              strokeWidth={0.75}
              fill="none"
            />
          );
        })}
      </g>
      {/* Outer ribbed skin */}
      <path
        className="phb-draw"
        d={outerSkin}
        fill="none"
        stroke={WF.steel}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* Inner flat skin + core edges */}
      <path
        className="phb-draw"
        d={`M ${x0} ${coreBot} L ${x1} ${coreBot} M ${x0} ${innerBot} L ${x1} ${innerBot} M ${x0} ${coreTop} L ${x0} ${innerBot} M ${x1} ${coreTop} L ${x1} ${innerBot}`}
        fill="none"
        stroke={WF.steel}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* Thickness dimension marker */}
      <path
        className="phb-draw"
        d={`M ${x0 - 24} ${coreTop} L ${x0 - 24} ${innerBot} M ${x0 - 30} ${coreTop} L ${x0 - 18} ${coreTop} M ${x0 - 30} ${innerBot} L ${x0 - 18} ${innerBot}`}
        stroke={WF.dim}
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

/* ---------- Zone 3: galvanising bath with immersed member ---------- */

function BathGlyph({ cx, cy }: { cx: number; cy: number }) {
  const bw = 260;
  const bh = 120;
  const bx0 = cx - bw / 2;
  const bx1 = cx + bw / 2;
  const byTop = cy - bh / 2 + 18;
  const byBot = cy + bh / 2 + 18;
  const wall = 8;

  // Vertical steel member being dipped
  const mx = bx1 - 60;
  const mw = 18;
  const mTop = byTop - 76;
  const mBot = byBot - 24;

  return (
    <g opacity={0.42}>
      {/* Bath vessel — outer + inner shell */}
      <path
        className="phb-draw"
        d={
          `M ${bx0 - wall} ${byTop - 18} L ${bx0 - wall} ${byBot} L ${bx1 + wall} ${byBot} L ${bx1 + wall} ${byTop - 18} ` +
          `M ${bx0} ${byTop - 18} L ${bx0} ${byBot - wall} L ${bx1} ${byBot - wall} L ${bx1} ${byTop - 18}`
        }
        fill="none"
        stroke={WF.steel}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* Zinc surface — dashed */}
      <path
        className="phb-draw"
        d={`M ${bx0} ${byTop} L ${bx1} ${byTop}`}
        fill="none"
        stroke={WF.steel}
        strokeWidth={1.25}
        strokeDasharray="8 5"
      />
      {/* Dipped member */}
      <path
        className="phb-draw"
        d={
          `M ${mx - mw / 2} ${mTop} L ${mx - mw / 2} ${mBot} L ${mx + mw / 2} ${mBot} L ${mx + mw / 2} ${mTop} Z ` +
          `M ${mx - mw / 2} ${mTop + 10} L ${mx + mw / 2} ${mTop + 10}`
        }
        fill="none"
        stroke={WF.steel}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      {/* Lifting cable */}
      <path
        className="phb-draw"
        d={`M ${mx} ${mTop} L ${mx} ${mTop - 40}`}
        fill="none"
        stroke={WF.dim}
        strokeWidth={1.25}
      />
      {/* Immersion arrow */}
      <path
        className="phb-draw"
        d={
          `M ${mx + 34} ${byTop - 34} L ${mx + 34} ${byBot - 30} ` +
          `M ${mx + 28} ${byBot - 42} L ${mx + 34} ${byBot - 30} L ${mx + 40} ${byBot - 42}`
        }
        fill="none"
        stroke={WF.accent}
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.75}
      />
      {/* Bath baseline extension ticks */}
      <path
        className="phb-fade"
        d={`M ${bx0 - wall - 6} ${byBot} L ${bx1 + wall + 6} ${byBot}`}
        stroke={WF.dim}
        strokeWidth={0.75}
        strokeDasharray="2 4"
        fill="none"
        opacity={0.6}
      />
    </g>
  );
}

/* ---------- Zone 4: cylindrical vessel with viroles (Chaudronnerie) ---------- */

function CylinderGlyph({ cx, cy }: { cx: number; cy: number }) {
  const rx = 68;
  const H = 200;
  const yTop = cy - H / 2;
  const yBot = cy + H / 2;
  const ry = 14;

  // Three "viroles" — the horizontal weld seams that divide the shell.
  const seams = [yTop + H * 0.28, yTop + H * 0.56, yTop + H * 0.82];

  return (
    <g opacity={0.42}>
      {/* Top ellipse (roof) */}
      <ellipse
        className="phb-draw"
        cx={cx}
        cy={yTop}
        rx={rx}
        ry={ry}
        fill="none"
        stroke={WF.steel}
        strokeWidth={2}
      />
      {/* Side generators */}
      <path
        className="phb-draw"
        d={`M ${cx - rx} ${yTop} L ${cx - rx} ${yBot} M ${cx + rx} ${yTop} L ${cx + rx} ${yBot}`}
        fill="none"
        stroke={WF.steel}
        strokeWidth={2}
      />
      {/* Bottom front arc */}
      <path
        className="phb-draw"
        d={`M ${cx - rx} ${yBot} A ${rx} ${ry} 0 0 0 ${cx + rx} ${yBot}`}
        fill="none"
        stroke={WF.steel}
        strokeWidth={2}
      />
      {/* Bottom back arc (dashed — hidden edge) */}
      <path
        className="phb-fade"
        d={`M ${cx - rx} ${yBot} A ${rx} ${ry} 0 0 1 ${cx + rx} ${yBot}`}
        fill="none"
        stroke={WF.steel}
        strokeWidth={1.25}
        strokeDasharray="4 4"
        opacity={0.6}
      />
      {/* Virole seams — hint at rolled/welded shell rings */}
      {seams.map((sy, i) => (
        <path
          key={i}
          className="phb-draw"
          d={`M ${cx - rx} ${sy} A ${rx} ${ry} 0 0 0 ${cx + rx} ${sy}`}
          fill="none"
          stroke={WF.dim}
          strokeWidth={1}
          opacity={0.7}
        />
      ))}
      {/* Roof vent */}
      <path
        className="phb-draw"
        d={`M ${cx - 10} ${yTop - ry} L ${cx - 10} ${yTop - ry - 12} L ${cx + 10} ${yTop - ry - 12} L ${cx + 10} ${yTop - ry}`}
        fill="none"
        stroke={WF.steel}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* Height dimension tick */}
      <path
        className="phb-draw"
        d={`M ${cx + rx + 22} ${yTop} L ${cx + rx + 22} ${yBot} M ${cx + rx + 16} ${yTop} L ${cx + rx + 28} ${yTop} M ${cx + rx + 16} ${yBot} L ${cx + rx + 28} ${yBot}`}
        stroke={WF.dim}
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
      />
    </g>
  );
}

/* ---------- animation stylesheet ----------
 * Scoped to the `.phb-*` classes so it cannot leak. Paths that need the
 * draw-in start hidden via a large dasharray + offset; the fill-forwards
 * animation lands them at offset 0. Under prefers-reduced-motion the paths
 * are pinned to their final state and the scan-line is removed entirely. */
const PHB_CSS = `
.phb-draw {
  stroke-dasharray: 2400;
  stroke-dashoffset: 2400;
  animation: phb-draw 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.15s forwards;
}
.phb-fade {
  opacity: 0;
  animation: phb-fade 0.9s ease-out 0.55s forwards;
}
.phb-scan {
  transform: translateX(-15%);
  animation: phb-scan 15s linear infinite;
  will-change: transform;
}
@keyframes phb-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes phb-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes phb-scan {
  0%   { transform: translateX(-15%); }
  100% { transform: translateX(115%); }
}
@media (prefers-reduced-motion: reduce) {
  .phb-draw {
    stroke-dasharray: 0;
    stroke-dashoffset: 0;
    animation: none;
  }
  .phb-fade {
    opacity: 1;
    animation: none;
  }
  .phb-scan {
    animation: none;
    transform: translateX(0);
    display: none;
  }
}
`;
