import * as React from 'react';
import { WF } from '@/components/wireframes/wf-theme';
import { INK, DIM, ACCENT, W_MAIN, W_THIN, W_ACCENT, Cap } from '@/components/wireframes/figure-kit';

/**
 * One technical figure per milestone on /about/history.
 *
 * The timeline was the largest section on that page and carried no imagery at
 * all after its meaningless lucide icons were removed — 1 681px of text, 29% of
 * the page. These give it visual substance without reaching for stock
 * photography the client has not supplied.
 *
 * Every figure draws what its OWN entry says happened, and nothing more:
 *
 *   parcelle   2012  "Fondation de la SPA BORDJ STEEL"           -> the plot
 *   fondation  2013  "les travaux de construction ... débutent"  -> footings
 *   prs        2014  "démarrage de la production ... charpente"  -> a welded PRS
 *   panneau    2015  "production de panneaux sandwichs"          -> the panels
 *   site       2016  "le complexe est officiellement inauguré"   -> 4 units
 *   iso        2019  "certification ISO 9001 Version 2015"       -> the mark
 *   qse        2025  "système de Management Intégré QSE"         -> the cycle
 *
 * No figure asserts a capacity, a dimension or a date — those are the client's
 * contested numbers and have no business being drawn into decoration.
 *
 * SMALLER VIEWBOX THAN THE CONTACT FIGURES (240x180 against 360x240) on
 * purpose. These render at roughly half the width beside body copy, and the
 * shared stroke weights in `figure-kit` are tuned for near-1:1 rendering; a
 * 360-wide drawing scaled into this slot would come out visibly fainter than
 * the same hand on /contact.
 */

export type HistoryFigureKey =
  | 'parcelle'
  | 'fondation'
  | 'prs'
  | 'panneau'
  | 'site'
  | 'iso'
  | 'qse';

/* 2012 — the ground is chosen */
function ParcelleFigure() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <path
        d="M 34 54 L 196 42 L 208 136 L 46 148 Z"
        fill={WF.fill}
        stroke={INK}
        strokeWidth={W_MAIN}
        strokeDasharray="7 5"
      />
      {[
        [34, 54],
        [196, 42],
        [208, 136],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M ${Number(x) - 7} ${y} L ${Number(x) + 7} ${y} M ${x} ${Number(y) - 7} L ${x} ${Number(y) + 7}`}
          fill="none"
          stroke={DIM}
          strokeWidth={W_THIN}
        />
      ))}
      {/* the datum the whole site is set out from */}
      <circle cx={46} cy={148} r={7} fill={ACCENT} />
      <path d="M 46 148 L 46 166" fill="none" stroke={ACCENT} strokeWidth={W_THIN} />
      {/* north */}
      <path d="M 196 162 L 202 144 L 208 162 L 202 156 Z" fill={INK} stroke={INK} strokeWidth={W_THIN} />
      <Cap x={24} y={34} anchor="start">
        implantation
      </Cap>
    </g>
  );
}

/* 2013 — footings and holding-down bolts */
function FondationFigure() {
  const grade = 104;
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {/* grade line + hatching */}
      <path d={`M 20 ${grade} L 220 ${grade}`} fill="none" stroke={INK} strokeWidth={W_MAIN} />
      {Array.from({ length: 9 }, (_, i) => 26 + i * 22).map((x) => (
        <path key={x} d={`M ${x} ${grade} L ${x - 8} ${grade + 9}`} fill="none" stroke={DIM} strokeWidth={W_THIN} />
      ))}

      {/* footing below grade, dashed because it is buried */}
      <rect
        x={66}
        y={grade}
        width={108}
        height={40}
        fill={WF.fill}
        stroke={INK}
        strokeWidth={W_THIN}
        strokeDasharray="6 4"
      />
      <rect x={100} y={78} width={40} height={26} fill={WF.fill} stroke={INK} strokeWidth={W_THIN} />

      {/* base plate + anchors */}
      <rect x={86} y={70} width={68} height={8} fill={WF.steel} stroke={INK} strokeWidth={W_MAIN} />
      {[94, 110, 130, 146].map((x) => (
        <path key={x} d={`M ${x} 66 L ${x} ${grade + 16}`} fill="none" stroke={DIM} strokeWidth={W_THIN} />
      ))}

      {/* the column the plant is about to stand on */}
      <rect x={108} y={24} width={24} height={46} fill="#ffffff" stroke={ACCENT} strokeWidth={W_ACCENT} />
      <Cap x={166} y={52} anchor="start" color={ACCENT}>
        ancrage
      </Cap>
    </g>
  );
}

/* 2014 — the first welded profile off the line */
function PrsFigure() {
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <rect x={34} y={58} width={172} height={13} fill={WF.steel} stroke={INK} strokeWidth={W_MAIN} />
      <rect x={108} y={71} width={24} height={44} fill={WF.steel} stroke={INK} strokeWidth={W_MAIN} />
      <rect x={34} y={115} width={172} height={13} fill={WF.steel} stroke={INK} strokeWidth={W_MAIN} />

      {/* the welds that make it a PRS rather than a rolled section */}
      {[
        [108, 71],
        [132, 71],
        [108, 115],
        [132, 115],
      ].map(([x, y], i) => (
        <path
          key={i}
          d={`M ${x} ${y} l ${i % 2 === 0 ? -11 : 11} 0 l ${i % 2 === 0 ? 11 : -11} ${i < 2 ? -11 : 11} Z`}
          fill={ACCENT}
          stroke={ACCENT}
          strokeWidth={W_THIN}
        />
      ))}

      <path d="M 34 146 L 206 146 M 34 141 L 34 151 M 206 141 L 206 151" fill="none" stroke={DIM} strokeWidth={W_THIN} />
      <Cap x={120} y={166}>
        profilé reconstitué soudé
      </Cap>
      <Cap x={120} y={34}>
        âme + semelles
      </Cap>
    </g>
  );
}

/* 2015 — the sandwich-panel line opens */
function PanneauStackFigure() {
  const rows = [
    { y: 52, x: 44, accent: true },
    { y: 86, x: 34, accent: false },
    { y: 120, x: 24, accent: false },
  ];
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {rows.map(({ y, x, accent }) => (
        <g key={y}>
          <rect x={x} y={y} width={166} height={9} fill={WF.steel} stroke={INK} strokeWidth={W_THIN} />
          <rect x={x} y={y + 9} width={166} height={15} fill={WF.foam} stroke={INK} strokeWidth={W_THIN} />
          <rect
            x={x}
            y={y + 24}
            width={166}
            height={9}
            fill={WF.steel}
            stroke={accent ? ACCENT : INK}
            strokeWidth={accent ? W_ACCENT : W_THIN}
          />
          {accent ? (
            <rect x={x} y={y} width={166} height={33} fill="none" stroke={ACCENT} strokeWidth={W_ACCENT} />
          ) : null}
        </g>
      ))}
      <Cap x={120} y={34}>
        âme isolante entre deux peaux
      </Cap>
    </g>
  );
}

/* 2016 — the complex, complete: four production units */
function SiteFigure() {
  const units = [
    { x: 38, y: 50, w: 72, h: 42 },
    { x: 122, y: 50, w: 82, h: 42 },
    { x: 38, y: 102, w: 82, h: 38 },
    { x: 132, y: 102, w: 72, h: 38 },
  ];
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <rect
        x={24}
        y={36}
        width={194}
        height={118}
        fill={WF.fill}
        stroke={DIM}
        strokeWidth={W_THIN}
        strokeDasharray="7 5"
      />
      {units.map((u, i) => (
        <g key={i}>
          <rect
            x={u.x}
            y={u.y}
            width={u.w}
            height={u.h}
            fill="#ffffff"
            stroke={i === 0 ? ACCENT : INK}
            strokeWidth={i === 0 ? W_ACCENT : W_MAIN}
          />
          {/* roof ridge, so they read as sheds in plan */}
          <path
            d={`M ${u.x} ${u.y + u.h / 2} L ${u.x + u.w} ${u.y + u.h / 2}`}
            fill="none"
            stroke={DIM}
            strokeWidth={W_THIN}
          />
        </g>
      ))}
      <Cap x={120} y={24}>
        4 unités de production
      </Cap>
    </g>
  );
}

/* 2019 — the quality mark */
function IsoFigure() {
  const cx = 120;
  const cy = 88;
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      <circle cx={cx} cy={cy} r={58} fill="#ffffff" stroke={INK} strokeWidth={W_MAIN} />
      <circle cx={cx} cy={cy} r={48} fill="none" stroke={DIM} strokeWidth={W_THIN} />
      {/* serrations, so it reads as a struck seal rather than a sticker */}
      {Array.from({ length: 24 }, (_, i) => (i * Math.PI * 2) / 24).map((a, i) => (
        <path
          key={i}
          d={`M ${cx + Math.cos(a) * 58} ${cy + Math.sin(a) * 58} L ${cx + Math.cos(a) * 65} ${cy + Math.sin(a) * 65}`}
          fill="none"
          stroke={DIM}
          strokeWidth={W_THIN}
        />
      ))}
      <path
        d={`M ${cx - 24} ${cy + 2} L ${cx - 8} ${cy + 18} L ${cx + 26} ${cy - 20}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth={W_ACCENT + 1}
      />
      <Cap x={cx} y={cy + 44}>
        ISO 9001
      </Cap>
    </g>
  );
}

/* 2025 — the integrated management cycle */
function QseFigure() {
  const cx = 120;
  const cy = 88;
  const r = 52;
  const arc = (from: number, to: number) => {
    const a0 = (from * Math.PI) / 180;
    const a1 = (to * Math.PI) / 180;
    return `M ${cx + Math.cos(a0) * r} ${cy + Math.sin(a0) * r} A ${r} ${r} 0 0 1 ${cx + Math.cos(a1) * r} ${cy + Math.sin(a1) * r}`;
  };
  // Wider gaps than a first attempt, which rendered as a near-continuous ring
  // — four quadrants that do not visibly separate are just a circle.
  const quads = [
    { from: -78, to: -14, accent: true },
    { from: 12, to: 76, accent: false },
    { from: 102, to: 166, accent: false },
    { from: 192, to: 256, accent: false },
  ];

  /** Solid triangular head on the tangent at `deg`, pointing the way round. */
  function head(deg: number): string {
    const a = (deg * Math.PI) / 180;
    const px = cx + Math.cos(a) * r;
    const py = cy + Math.sin(a) * r;
    const tx = -Math.sin(a);
    const ty = Math.cos(a);
    const nx = Math.cos(a);
    const ny = Math.sin(a);
    const apex = [px + tx * 13, py + ty * 13];
    const b1 = [px - tx * 2 + nx * 7, py - ty * 2 + ny * 7];
    const b2 = [px - tx * 2 - nx * 7, py - ty * 2 - ny * 7];
    return `M ${apex[0]} ${apex[1]} L ${b1[0]} ${b1[1]} L ${b2[0]} ${b2[1]} Z`;
  }

  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {quads.map((q, i) => (
        <g key={i}>
          <path
            d={arc(q.from, q.to)}
            fill="none"
            stroke={q.accent ? ACCENT : INK}
            strokeWidth={q.accent ? W_ACCENT + 1 : W_MAIN + 0.6}
          />
          <path d={head(q.to)} fill={q.accent ? ACCENT : INK} stroke="none" />
        </g>
      ))}
      <Cap x={cx} y={cy + 6} color={WF.label}>
        QSE
      </Cap>
      <Cap x={cx} y={cy + 80}>
        amélioration continue
      </Cap>
    </g>
  );
}

const FIGURES: Record<HistoryFigureKey, () => React.ReactElement> = {
  parcelle: ParcelleFigure,
  fondation: FondationFigure,
  prs: PrsFigure,
  panneau: PanneauStackFigure,
  site: SiteFigure,
  iso: IsoFigure,
  qse: QseFigure,
};

/**
 * Decorative in the accessibility sense: every figure restates what the entry's
 * own title and description already say, so a screen reader gains nothing from
 * a label and loses time to one.
 */
export function HistoryFigure({ figure }: { figure: string }) {
  const Figure = FIGURES[figure as HistoryFigureKey];
  if (!Figure) return null;
  return (
    <svg viewBox="0 0 240 180" aria-hidden="true" focusable="false" className="h-full w-full">
      <Figure />
    </svg>
  );
}
