import * as React from 'react';
import { WF, WF_FONT } from '@/components/wireframes/wf-theme';

/**
 * Explanatory figures for the six department cards on /contact.
 *
 * These replace six AI-generated stock photographs of generic office meetings.
 * Those photos showed nothing about the departments they labelled — one of them
 * had the letters "RH" floating in the room as a physical object — and they
 * carried every tell of synthetic imagery. A drawing of the actual work is both
 * more honest and more useful to a buyer deciding who to call.
 *
 * They are drawn in the same technical-drawing language as the product
 * wireframes (`src/components/wireframes/`), reusing the `WF` palette tokens so
 * the two systems cannot drift apart: slate geometry, grey dimension lines, and
 * the brand red reserved for the ONE element each figure is about.
 *
 * DELIBERATELY STATIC. The product wireframes animate via `use-draw-in.ts`,
 * which applies the `.wf-line` / `.wf-fade` classes imperatively — there is no
 * CSS fallback for them. Borrowing those classes here, outside the
 * `ProductWireframe` shell that runs the controller, would mean shipping art
 * whose appearance depends on a hook that never runs. These are plain SVG: no
 * state, no effects, correct with JavaScript disabled.
 *
 * Every figure shares the 360x240 viewBox so the six scale identically in the
 * card header.
 */

export type DepartmentFigureKey =
  | 'devis'
  | 'portique'
  | 'panneau'
  | 'bain'
  | 'support'
  | 'montage';

const INK = WF.ink;
const DIM = WF.dim;
const ACCENT = WF.accent;

/** Shared stroke weights, so the six read as one hand. */
const W_MAIN = 3.0;
const W_THIN = 1.75;
const W_ACCENT = 3.4;

function Cap({ x, y, children, anchor = 'middle', color = WF.labelMuted }: {
  x: number;
  y: number;
  children: React.ReactNode;
  anchor?: 'start' | 'middle' | 'end';
  color?: string;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={WF_FONT}
      fontSize={15}
      fontWeight={600}
      letterSpacing={0.2}
      fill={color}
    >
      {children}
    </text>
  );
}

/** Horizontal dimension line with end ticks. */
function Dim({ x1, x2, y, label, color = DIM, labelColor = WF.label }: {
  x1: number;
  x2: number;
  y: number;
  label: string;
  color?: string;
  labelColor?: string;
}) {
  return (
    <g>
      <path
        d={`M ${x1} ${y} L ${x2} ${y} M ${x1} ${y - 5} L ${x1} ${y + 5} M ${x2} ${y - 5} L ${x2} ${y + 5}`}
        fill="none"
        stroke={color}
        strokeWidth={W_THIN}
        strokeLinecap="round"
      />
      <Cap x={(x1 + x2) / 2} y={y - 9} color={labelColor}>
        {label}
      </Cap>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Bureau Commercial — a quotation sheet                            */
/* ------------------------------------------------------------------ */
function DevisFigure() {
  const rows = [116, 138, 160];
  const sx = 186; // sheet left edge
  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {/* The subject being priced, at left: a profile with its dimensions.
          Putting the steel beside the quote rather than inside it fills the
          frame and says what the department actually does — it puts a number
          on a section. */}
      <rect x={44} y={92} width={86} height={13} fill={WF.steel} stroke={INK} strokeWidth={W_THIN} />
      <rect x={76} y={105} width={22} height={48} fill={WF.steel} stroke={INK} strokeWidth={W_THIN} />
      <rect x={44} y={153} width={86} height={13} fill={WF.steel} stroke={INK} strokeWidth={W_THIN} />
      <Dim x1={44} x2={130} y={80} label="b" />
      <path
        d={`M 150 ${92} L 150 ${166} M 144 ${92} L 156 ${92} M 144 ${166} L 156 ${166}`}
        fill="none"
        stroke={DIM}
        strokeWidth={W_THIN}
      />
      <Cap x={162} y={133} anchor="start">
        h
      </Cap>

      {/* the quotation sheet */}
      <path
        d={`M ${sx} 34 L ${sx + 92} 34 L ${sx + 124} 66 L ${sx + 124} 210 L ${sx} 210 Z`}
        fill="#ffffff"
        stroke={INK}
        strokeWidth={W_MAIN}
      />
      <path
        d={`M ${sx + 92} 34 L ${sx + 92} 66 L ${sx + 124} 66`}
        fill={WF.fill}
        stroke={INK}
        strokeWidth={W_THIN}
      />
      <Cap x={sx + 18} y={62} anchor="start" color={WF.label}>
        DEVIS
      </Cap>

      {/* line items */}
      {rows.map((y, i) => (
        <g key={y}>
          <path
            d={`M ${sx + 18} ${y} L ${sx + (i === 2 ? 68 : 86)} ${y}`}
            fill="none"
            stroke={DIM}
            strokeWidth={W_THIN}
          />
          <rect x={sx + 76} y={y - 6} width={30} height={6} rx={2} fill={WF.steel} />
        </g>
      ))}

      {/* the total — the one thing this department exists to send you */}
      <path d={`M ${sx + 18} 182 L ${sx + 106} 182`} fill="none" stroke={INK} strokeWidth={W_THIN} />
      <rect x={sx + 56} y={190} width={50} height={10} rx={3} fill={ACCENT} />
      <Cap x={sx + 48} y={199} anchor="end" color={WF.label}>
        TOTAL
      </Cap>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Charpente Métallique — a portal frame                            */
/* ------------------------------------------------------------------ */
function PortiqueFigure() {
  const yGround = 198;
  const xL = 74;
  const xR = 286;
  const yEave = 112;
  const yRidge = 64;
  const xMid = (xL + xR) / 2;

  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {/* ground */}
      <path d={`M 40 ${yGround} L 320 ${yGround}`} fill="none" stroke={INK} strokeWidth={W_MAIN} />
      {Array.from({ length: 9 }, (_, i) => 48 + i * 32).map((x) => (
        <path key={x} d={`M ${x} ${yGround} L ${x - 9} ${yGround + 10}`} fill="none" stroke={DIM} strokeWidth={W_THIN} />
      ))}

      {/* columns */}
      <path d={`M ${xL} ${yGround} L ${xL} ${yEave}`} fill="none" stroke={INK} strokeWidth={W_MAIN + 1.4} />
      <path d={`M ${xR} ${yGround} L ${xR} ${yEave}`} fill="none" stroke={INK} strokeWidth={W_MAIN + 1.4} />

      {/* base plates */}
      <rect x={xL - 13} y={yGround - 5} width={26} height={5} fill={WF.steel} stroke={INK} strokeWidth={W_THIN} />
      <rect x={xR - 13} y={yGround - 5} width={26} height={5} fill={WF.steel} stroke={INK} strokeWidth={W_THIN} />

      {/* rafters */}
      <path
        d={`M ${xL} ${yEave} L ${xMid} ${yRidge} L ${xR} ${yEave}`}
        fill="none"
        stroke={INK}
        strokeWidth={W_MAIN + 1.4}
      />

      {/* haunches — the detail that makes it a portal frame and not a shed */}
      <path d={`M ${xL} ${yEave + 26} L ${xL + 30} ${yEave - 13}`} fill="none" stroke={INK} strokeWidth={W_THIN} />
      <path d={`M ${xR} ${yEave + 26} L ${xR - 30} ${yEave - 13}`} fill="none" stroke={INK} strokeWidth={W_THIN} />

      {/* purlins */}
      {[0.25, 0.5, 0.75].map((t) => {
        const x = xL + (xMid - xL) * t;
        const y = yEave + (yRidge - yEave) * t;
        const xm = xR - (xMid - xL) * t;
        return (
          <g key={t}>
            <circle cx={x} cy={y} r={3} fill="#ffffff" stroke={INK} strokeWidth={W_THIN} />
            <circle cx={xm} cy={y} r={3} fill="#ffffff" stroke={INK} strokeWidth={W_THIN} />
          </g>
        );
      })}
      <circle cx={xMid} cy={yRidge} r={3.5} fill="#ffffff" stroke={INK} strokeWidth={W_THIN} />

      {/* the span — what a caller asks about first */}
      <Dim x1={xL} x2={xR} y={222} label="Portée" color={ACCENT} labelColor={ACCENT} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Panneaux Sandwich — cross-section                                */
/* ------------------------------------------------------------------ */
function PanneauFigure() {
  const x0 = 56;
  const x1 = 272;
  const yCoreTop = 104;
  const yCoreBot = 156;
  const skin = 7;
  const ribH = 17;
  const ribs = 4;
  const p = (x1 - x0) / ribs;

  const pts: Array<[number, number]> = [[x0, yCoreTop]];
  for (let i = 0; i < ribs; i++) {
    const xs = x0 + i * p;
    pts.push([xs + p * 0.3, yCoreTop]);
    pts.push([xs + p * 0.46, yCoreTop - ribH]);
    pts.push([xs + p * 0.78, yCoreTop - ribH]);
    pts.push([xs + p, yCoreTop]);
  }
  const outer = 'M ' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ');

  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {/* insulating core */}
      <rect x={x0} y={yCoreTop} width={x1 - x0} height={yCoreBot - yCoreTop} fill={WF.foam} />
      {Array.from({ length: ribs }, (_, i) => {
        const xs = x0 + i * p;
        return (
          <path
            key={i}
            d={`M ${xs + p * 0.3} ${yCoreTop} L ${xs + p * 0.46} ${yCoreTop - ribH} L ${xs + p * 0.78} ${yCoreTop - ribH} L ${xs + p} ${yCoreTop} Z`}
            fill={WF.foam}
          />
        );
      })}

      {/* inner flat skin */}
      <rect x={x0} y={yCoreBot} width={x1 - x0} height={skin} fill={WF.steel} />

      {/* steel skins */}
      <path d={outer} fill="none" stroke={INK} strokeWidth={W_MAIN + 0.4} />
      <path
        d={`M ${x0} ${yCoreBot} L ${x1} ${yCoreBot} M ${x0} ${yCoreBot + skin} L ${x1} ${yCoreBot + skin}`}
        fill="none"
        stroke={INK}
        strokeWidth={W_MAIN + 0.4}
      />
      <path
        d={`M ${x0} ${yCoreTop} L ${x0} ${yCoreBot + skin} M ${x1} ${yCoreTop} L ${x1} ${yCoreBot + skin}`}
        fill="none"
        stroke={INK}
        strokeWidth={W_THIN}
      />

      {/* thickness — the number the caller gives you */}
      <path
        d={`M 296 ${yCoreTop - ribH} L 296 ${yCoreBot + skin} M 291 ${yCoreTop - ribH} L 301 ${yCoreTop - ribH} M 291 ${yCoreBot + skin} L 301 ${yCoreBot + skin}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth={W_ACCENT - 0.6}
      />
      <Cap x={290} y={yCoreTop + 16} anchor="end" color={ACCENT}>
        épaisseur
      </Cap>
      <Cap x={x0} y={yCoreBot + skin + 22} anchor="start">
        âme isolante
      </Cap>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Galvanisation — a piece entering the zinc bath                   */
/* ------------------------------------------------------------------ */
function BainFigure() {
  const tx0 = 54;
  const tx1 = 300;
  const tTop = 112;
  const tBot = 206;
  const zinc = 128;

  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {/* molten zinc */}
      <rect x={tx0 + 4} y={zinc} width={tx1 - tx0 - 8} height={tBot - zinc - 4} fill={WF.zinc} />

      {/* tank walls — open top */}
      <path
        d={`M ${tx0} ${tTop} L ${tx0} ${tBot} L ${tx1} ${tBot} L ${tx1} ${tTop}`}
        fill="none"
        stroke={INK}
        strokeWidth={W_MAIN + 1}
      />

      {/* bath surface */}
      <path
        d={`M ${tx0 + 4} ${zinc} q 20 -5 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 38 0`}
        fill="none"
        stroke={INK}
        strokeWidth={W_THIN}
      />

      {/* lifting beam + slings */}
      <path d="M 120 34 L 236 34" fill="none" stroke={INK} strokeWidth={W_MAIN} />
      <path d="M 148 34 L 162 72 M 208 34 L 194 72" fill="none" stroke={DIM} strokeWidth={W_THIN} />

      {/* the piece, half immersed — drawn in accent because the coating is the product */}
      <path
        d="M 162 72 L 194 72 L 194 170 L 162 170 Z"
        fill="#ffffff"
        stroke={ACCENT}
        strokeWidth={W_ACCENT}
      />
      {/* the immersed part reads through the zinc */}
      <path d="M 162 128 L 194 128" fill="none" stroke={ACCENT} strokeWidth={W_THIN} strokeDasharray="4 4" />

      <Cap x={212} y={100} anchor="start" color={ACCENT}>
        revêtement Zn
      </Cap>
      <path d="M 196 96 L 208 96" fill="none" stroke={ACCENT} strokeWidth={W_THIN} />

      <Cap x={tx0 + 6} y={tBot + 22} anchor="start">
        bain de zinc
      </Cap>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Écoute Client — the 24-hour reply the page promises              */
/* ------------------------------------------------------------------ */
function SupportFigure() {
  const hx = 112; // headset centre
  const hy = 112;

  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {/* Headset at left, large enough to read as the subject rather than an
          icon floating in space. */}
      <path
        d={`M ${hx - 52} ${hy} A 52 52 0 0 1 ${hx + 52} ${hy}`}
        fill="none"
        stroke={INK}
        strokeWidth={W_MAIN + 1}
      />
      <rect x={hx - 64} y={hy - 4} width={24} height={44} rx={9} fill={WF.steel} stroke={INK} strokeWidth={W_MAIN} />
      <rect x={hx + 40} y={hy - 4} width={24} height={44} rx={9} fill={WF.steel} stroke={INK} strokeWidth={W_MAIN} />
      <path d={`M ${hx + 52} ${hy + 36} q -8 30 -40 32`} fill="none" stroke={INK} strokeWidth={W_MAIN} />
      <circle cx={hx + 10} cy={hy + 69} r={6} fill="#ffffff" stroke={INK} strokeWidth={W_THIN} />

      {/* The reply, as a logged dossier. The red tick is the promise the copy
          above this section already makes to the visitor. */}
      <rect x={222} y={62} width={98} height={116} rx={5} fill="#ffffff" stroke={INK} strokeWidth={W_MAIN} />
      {[88, 108, 128].map((y) => (
        <path key={y} d={`M 238 ${y} L ${y === 128 ? 288 : 304} ${y}`} fill="none" stroke={DIM} strokeWidth={W_THIN} />
      ))}
      <path d="M 240 154 L 254 166 L 282 140" fill="none" stroke={ACCENT} strokeWidth={W_ACCENT} />

      {/* call in, answer back */}
      <path d="M 186 104 L 214 104" fill="none" stroke={DIM} strokeWidth={W_THIN} />
      <path d="M 206 98 L 214 104 L 206 110" fill="none" stroke={DIM} strokeWidth={W_THIN} />

      <Cap x={48} y={206} anchor="start">
        votre appel
      </Cap>
      <Cap x={320} y={206} anchor="end" color={ACCENT}>
        réponse 24 h
      </Cap>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Réalisation et Montage — erection on site                        */
/* ------------------------------------------------------------------ */
function MontageFigure() {
  const yGround = 206;
  const mastX = 78;
  const yJib = 52;

  return (
    <g strokeLinecap="round" strokeLinejoin="round">
      {/* ground */}
      <path d={`M 30 ${yGround} L 330 ${yGround}`} fill="none" stroke={INK} strokeWidth={W_MAIN} />
      {Array.from({ length: 10 }, (_, i) => 38 + i * 31).map((x) => (
        <path key={x} d={`M ${x} ${yGround} L ${x - 9} ${yGround + 10}`} fill="none" stroke={DIM} strokeWidth={W_THIN} />
      ))}

      {/* crane mast with lattice bracing */}
      <path d={`M ${mastX - 12} ${yGround} L ${mastX - 12} ${yJib} M ${mastX + 12} ${yGround} L ${mastX + 12} ${yJib}`} fill="none" stroke={INK} strokeWidth={W_MAIN} />
      {Array.from({ length: 5 }, (_, i) => {
        const yT = yJib + i * 30.8;
        const yB = yT + 30.8;
        return (
          <path
            key={i}
            d={`M ${mastX - 12} ${yT} L ${mastX + 12} ${yB} M ${mastX + 12} ${yT} L ${mastX - 12} ${yB}`}
            fill="none"
            stroke={DIM}
            strokeWidth={W_THIN}
          />
        );
      })}

      {/* jib + counter-jib */}
      <path d={`M 34 ${yJib} L 226 ${yJib}`} fill="none" stroke={INK} strokeWidth={W_MAIN + 0.8} />
      <path d={`M ${mastX} ${yJib - 30} L 196 ${yJib} M ${mastX} ${yJib - 30} L 40 ${yJib}`} fill="none" stroke={DIM} strokeWidth={W_THIN} />
      <path d={`M ${mastX} ${yJib} L ${mastX} ${yJib - 30}`} fill="none" stroke={INK} strokeWidth={W_THIN} />

      {/* hoist cable + spreader */}
      <path d={`M 190 ${yJib} L 190 104`} fill="none" stroke={DIM} strokeWidth={W_THIN} />
      <path d="M 176 104 L 204 104" fill="none" stroke={INK} strokeWidth={W_MAIN} />
      <path d="M 180 104 L 158 126 M 200 104 L 222 126" fill="none" stroke={DIM} strokeWidth={W_THIN} />

      {/* the beam in flight — the moment the department is responsible for */}
      <rect x={150} y={126} width={80} height={14} fill="#ffffff" stroke={ACCENT} strokeWidth={W_ACCENT} />

      {/* the portal already standing, waiting for it */}
      <path d={`M 256 ${yGround} L 256 148 M 330 ${yGround} L 330 148`} fill="none" stroke={INK} strokeWidth={W_MAIN + 1} />
      <path d="M 256 148 L 293 128 L 330 148" fill="none" stroke={INK} strokeWidth={W_MAIN + 1} />
      <path d="M 256 166 L 272 150 M 330 166 L 314 150" fill="none" stroke={DIM} strokeWidth={W_THIN} />
      <rect x={245} y={yGround - 5} width={22} height={5} fill={WF.steel} stroke={INK} strokeWidth={W_THIN} />
      <rect x={319} y={yGround - 5} width={22} height={5} fill={WF.steel} stroke={INK} strokeWidth={W_THIN} />

      {/* the bay the slung beam is about to close */}
      <path d="M 234 133 L 252 133" fill="none" stroke={ACCENT} strokeWidth={W_THIN} strokeDasharray="5 5" />
      <path d="M 246 128 L 252 133 L 246 138" fill="none" stroke={ACCENT} strokeWidth={W_THIN} />
    </g>
  );
}

const FIGURES: Record<DepartmentFigureKey, () => React.ReactElement> = {
  devis: DevisFigure,
  portique: PortiqueFigure,
  panneau: PanneauFigure,
  bain: BainFigure,
  support: SupportFigure,
  montage: MontageFigure,
};

/**
 * Renders one department figure. `title` becomes the accessible name — these are
 * meaningful illustrations, not decoration, so they get a label rather than
 * `aria-hidden`.
 */
export function DepartmentFigure({
  figure,
  title,
}: {
  figure: DepartmentFigureKey;
  title: string;
}) {
  // `figure` arrives from config, where it is typed as a plain string. An
  // unknown key must degrade to no illustration, exactly as the sibling icon
  // lookup in contact-info.tsx does — never to a thrown render.
  const Figure = FIGURES[figure];
  if (!Figure) return null;
  return (
    <svg
      viewBox="0 0 360 240"
      role="img"
      aria-label={title}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid meet"
    >
      <Figure />
    </svg>
  );
}
