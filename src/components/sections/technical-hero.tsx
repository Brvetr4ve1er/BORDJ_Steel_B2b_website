import * as React from 'react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { WF } from '@/components/wireframes/wf-theme';

/**
 * Hero band drawn rather than photographed.
 *
 * WHY THIS EXISTS. /contact and /about/history opened on AI-generated stock
 * photographs — a call-centre of smiling operators, a generic welding shot.
 * Neither is this company, neither is this plant, and both carried the usual
 * tells. The client has supplied no photography (it is on the punch list), so
 * the options were to generate replacement "photos" — which is exactly what
 * produced the problem — or to stop pretending and draw.
 *
 * This draws. It is the same technical-drawing language as the department
 * figures, the history milestones and the localisation plate, scaled up to a
 * hero: steel ground, drafting grid, a large outlined motif, and brand red
 * reserved for the single element the drawing is about.
 *
 * WHEN REAL PHOTOGRAPHY ARRIVES this component should lose to it. A photograph
 * of the actual plant beats a drawing of one; a drawing of one beats a stock
 * photograph of somebody else's.
 *
 * Server component. The only client leaf is `AnimatedWrapper` around the copy,
 * and the motif's drift is CSS that pins itself under
 * `prefers-reduced-motion: reduce`.
 */

export type HeroMotif =
  | 'portal'
  | 'datum'
  | 'sheets'
  | 'frames'
  | 'reel'
  | 'press'
  | 'column';

export function TechnicalHero({
  eyebrow,
  title,
  subtitle,
  motif,
  readout,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  motif: HeroMotif;
  /**
   * Optional corner readout, in the manner of a drawing's cartouche.
   *
   * It exists because the gallery's previous hero carried
   * `${TILES.length} VUES · ${AVAILABLE_CATEGORIES.length} CATÉGORIES` — counts
   * derived from the data rather than typed in. That is worth keeping, and
   * worth offering to the other sections, so each hero can state how much it
   * actually holds without anyone maintaining a number by hand.
   */
  readout?: string;
}) {
  return (
    <section className="relative flex h-[60dvh] w-full items-center justify-center overflow-hidden bg-[#1b2430] p-0 text-white">
      {/* ground: drafting grid, drawn light-on-dark rather than reusing
          .wf-ground, which is tuned for the light sections */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }}
      />
      {/* a second, finer grid — the way a drawing sheet carries minor divisions */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '11px 11px',
        }}
      />

      <HeroMotifArt motif={motif} />

      {/* vignette, so the copy holds its contrast over the drawing */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,36,48,0.78)_0%,rgba(27,36,48,0.62)_55%,rgba(27,36,48,0.9)_100%)]"
      />

      {/* sheet rules + corner ticks, the same framing device as the survey plate */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-5 border border-white/15 md:inset-8" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-5 top-5 h-8 w-8 border-l-2 border-t-2 border-accent md:left-8 md:top-8"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-5 right-5 h-8 w-8 border-b-2 border-r-2 border-accent md:bottom-8 md:right-8"
      />

      {readout ? (
        <span className="pointer-events-none absolute bottom-7 left-7 z-20 hidden font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45 md:bottom-10 md:left-10 md:block">
          {readout}
        </span>
      ) : null}

      <div className="container relative z-20 mx-auto px-4 text-center">
        <AnimatedWrapper animation="zoom-in">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
            {eyebrow}
          </p>
          <h1 className="mt-5 font-headline text-6xl font-bold uppercase leading-tight tracking-tighter text-white md:text-8xl md:leading-tight lg:leading-tight">
            {title}
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-200 md:text-2xl">{subtitle}</p>
        </AnimatedWrapper>
      </div>
    </section>
  );
}

const LINE = 'rgba(255,255,255,0.34)';
const FAINT = 'rgba(255,255,255,0.16)';

/**
 * The motif sits behind the copy at low contrast. It is wide (1200x520) and
 * centred so it crops gracefully: on a phone the middle of the drawing is what
 * survives, which is why the subject is centred in both.
 */
function HeroMotifArt({ motif }: { motif: HeroMotif }) {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-10 flex items-center justify-center">
      <svg
        viewBox="0 0 1200 520"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Each motif carries its own vertical offset: the composition is tuned
            per drawing so nothing lands behind the eyebrow, which is the one
            place red copy and red linework can collide. */}
        <g transform={`translate(0,${MOTIFS[motif].dy})`}>{MOTIFS[motif].render()}</g>
      </svg>
    </div>
  );
}

/** A portal frame in elevation — the thing this company actually builds. */
function PortalMotif() {
  const yGround = 430;
  const xL = 330;
  const xR = 870;
  const yEave = 250;
  const yRidge = 150;
  const xMid = (xL + xR) / 2;

  return (
    <g>
      {/* ground line + hatch */}
      <path d={`M 120 ${yGround} L 1080 ${yGround}`} stroke={LINE} strokeWidth={2} fill="none" />
      {Array.from({ length: 28 }, (_, i) => 130 + i * 34).map((x) => (
        <path key={x} d={`M ${x} ${yGround} L ${x - 14} ${yGround + 16}`} stroke={FAINT} strokeWidth={1.5} fill="none" />
      ))}

      {/* columns + base plates */}
      <path d={`M ${xL} ${yGround} L ${xL} ${yEave}`} stroke={LINE} strokeWidth={5} fill="none" />
      <path d={`M ${xR} ${yGround} L ${xR} ${yEave}`} stroke={LINE} strokeWidth={5} fill="none" />
      <path d={`M ${xL - 26} ${yGround} L ${xL + 26} ${yGround}`} stroke={LINE} strokeWidth={4} fill="none" />
      <path d={`M ${xR - 26} ${yGround} L ${xR + 26} ${yGround}`} stroke={LINE} strokeWidth={4} fill="none" />

      {/* rafters — the ridge carries the accent */}
      <path d={`M ${xL} ${yEave} L ${xMid} ${yRidge} L ${xR} ${yEave}`} stroke={WF.accent} strokeWidth={5} fill="none" opacity={0.95} />

      {/* haunches */}
      <path d={`M ${xL} ${yEave + 56} L ${xL + 64} ${yEave - 22}`} stroke={FAINT} strokeWidth={2} fill="none" />
      <path d={`M ${xR} ${yEave + 56} L ${xR - 64} ${yEave - 22}`} stroke={FAINT} strokeWidth={2} fill="none" />

      {/* purlins */}
      {[0.2, 0.4, 0.6, 0.8].map((t) => {
        const x = xL + (xMid - xL) * t;
        const y = yEave + (yRidge - yEave) * t;
        const xm = xR - (xMid - xL) * t;
        return (
          <g key={t}>
            <circle cx={x} cy={y} r={5} fill="none" stroke={LINE} strokeWidth={2} />
            <circle cx={xm} cy={y} r={5} fill="none" stroke={LINE} strokeWidth={2} />
          </g>
        );
      })}

      {/* span dimension */}
      <path
        d={`M ${xL} 478 L ${xR} 478 M ${xL} 470 L ${xL} 486 M ${xR} 470 L ${xR} 486`}
        stroke={FAINT}
        strokeWidth={1.5}
        fill="none"
      />

      {/* repeated bays, fading out — suggests a plant rather than one frame */}
      {[-1, 1].map((dir) =>
        [1, 2].map((n) => (
          <g key={`${dir}-${n}`} opacity={0.32 / n}>
            <path
              d={`M ${xL + dir * n * 150} ${yGround} L ${xL + dir * n * 150} ${yEave} M ${xR + dir * n * 150} ${yGround} L ${xR + dir * n * 150} ${yEave}`}
              stroke={LINE}
              strokeWidth={3}
              fill="none"
            />
            <path
              d={`M ${xL + dir * n * 150} ${yEave} L ${xMid + dir * n * 150} ${yRidge} L ${xR + dir * n * 150} ${yEave}`}
              stroke={LINE}
              strokeWidth={3}
              fill="none"
            />
          </g>
        ))
      )}
    </g>
  );
}

/** A survey datum — concentric rings and a crosshair, echoing the plate below. */
function DatumMotif() {
  const cx = 600;
  const cy = 250;
  return (
    <g>
      {[300, 230, 160, 96].map((r, i) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={i === 3 ? WF.accent : LINE}
          strokeWidth={i === 3 ? 3 : 1.5}
          strokeDasharray={i === 3 ? undefined : '6 12'}
          opacity={i === 3 ? 0.95 : 0.7}
        />
      ))}

      {/* crosshair */}
      <path
        d={`M ${cx - 420} ${cy} L ${cx - 118} ${cy} M ${cx + 118} ${cy} L ${cx + 420} ${cy} M ${cx} ${cy - 320} L ${cx} ${cy - 118} M ${cx} ${cy + 118} L ${cx} ${cy + 320}`}
        stroke={LINE}
        strokeWidth={2}
        fill="none"
      />
      <circle cx={cx} cy={cy} r={9} fill={WF.accent} />

      {/* bearing ticks around the inner ring */}
      {Array.from({ length: 24 }, (_, i) => (i * Math.PI * 2) / 24).map((a, i) => (
        <path
          key={i}
          d={`M ${cx + Math.cos(a) * 160} ${cy + Math.sin(a) * 160} L ${cx + Math.cos(a) * (i % 6 === 0 ? 182 : 172)} ${cy + Math.sin(a) * (i % 6 === 0 ? 182 : 172)}`}
          stroke={FAINT}
          strokeWidth={2}
          fill="none"
        />
      ))}

      {/* corner registration marks, as on a plotted sheet */}
      {[
        [150, 90],
        [1050, 90],
        [150, 430],
        [1050, 430],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M ${Number(x) - 16} ${y} L ${Number(x) + 16} ${y} M ${x} ${Number(y) - 16} L ${x} ${Number(y) + 16}`}
          stroke={FAINT}
          strokeWidth={1.5}
          fill="none"
        />
      ))}
    </g>
  );
}

/* ------------------------------------------------------------------------ */
/* Media Center motifs                                                       */
/*                                                                           */
/* These five replaced AI stock photographs on the Media Center pages — a    */
/* stock newsroom, a stock gallery wall, and so on. Same reasoning as the    */
/* contact and history heroes: the client has supplied no photography, and   */
/* generating more synthetic "photos" is what created the problem. Each      */
/* motif draws the FORM of what the page holds — a sheet, a frame, a reel, a */
/* press sheet, a column — instead of a picture of somebody else's.          */
/* ------------------------------------------------------------------------ */

/** Hub: drawing sheets stacked, because the hub holds every other section. */
function SheetsMotif() {
  const sheets = [
    { x: 300, y: 120, w: 420, h: 300, o: 0.3 },
    { x: 360, y: 90, w: 420, h: 300, o: 0.55 },
    { x: 420, y: 60, w: 420, h: 300, o: 1 },
  ];
  return (
    <g>
      {sheets.map((s, i) => {
        const top = i === sheets.length - 1;
        return (
          <g key={i} opacity={s.o}>
            <path
              d={`M ${s.x} ${s.y} L ${s.x + s.w - 42} ${s.y} L ${s.x + s.w} ${s.y + 42} L ${s.x + s.w} ${s.y + s.h} L ${s.x} ${s.y + s.h} Z`}
              fill="rgba(255,255,255,0.03)"
              stroke={top ? LINE : FAINT}
              strokeWidth={top ? 2.5 : 2}
            />
            <path
              d={`M ${s.x + s.w - 42} ${s.y} L ${s.x + s.w - 42} ${s.y + 42} L ${s.x + s.w} ${s.y + 42}`}
              fill="none"
              stroke={top ? LINE : FAINT}
              strokeWidth={1.5}
            />
            <path
              d={`M ${s.x} ${s.y + s.h - 56} L ${s.x + s.w} ${s.y + s.h - 56} M ${s.x + 150} ${s.y + s.h - 56} L ${s.x + 150} ${s.y + s.h} M ${s.x + 280} ${s.y + s.h - 56} L ${s.x + 280} ${s.y + s.h}`}
              fill="none"
              stroke={top ? LINE : FAINT}
              strokeWidth={1.5}
            />
            {top ? (
              <path
                d={`M ${s.x} ${s.y} L ${s.x} ${s.y + 34} M ${s.x} ${s.y} L ${s.x + 34} ${s.y}`}
                stroke={WF.accent}
                strokeWidth={4}
                fill="none"
              />
            ) : null}
          </g>
        );
      })}
    </g>
  );
}

/** Gallery: a contact sheet of image frames, one registered in red. */
function FramesMotif() {
  const cells: Array<[number, number]> = [];
  for (let r = 0; r < 2; r++) for (let c = 0; c < 4; c++) cells.push([c, r]);
  const w = 200;
  const h = 150;
  const gap = 28;
  const x0 = 600 - (4 * w + 3 * gap) / 2;
  const y0 = 240 - (2 * h + gap) / 2;
  return (
    <g>
      {cells.map(([c, r], i) => {
        const x = x0 + c * (w + gap);
        const y = y0 + r * (h + gap);
        const hot = i === 5;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              fill="rgba(255,255,255,0.03)"
              stroke={hot ? WF.accent : LINE}
              strokeWidth={hot ? 3 : 2}
            />
            {[
              [x, y, 1, 1],
              [x + w, y, -1, 1],
              [x, y + h, 1, -1],
              [x + w, y + h, -1, -1],
            ].map(([cx, cy, sx, sy], j) => (
              <path
                key={j}
                d={`M ${cx} ${Number(cy) + Number(sy) * 14} L ${cx} ${cy} L ${Number(cx) + Number(sx) * 14} ${cy}`}
                stroke={hot ? WF.accent : FAINT}
                strokeWidth={1.5}
                fill="none"
              />
            ))}
            <path
              d={`M ${x + 18} ${y + h * 0.66} L ${x + w - 18} ${y + h * 0.66}`}
              stroke={FAINT}
              strokeWidth={1.5}
              fill="none"
            />
          </g>
        );
      })}
    </g>
  );
}

/** Videos: a film frame with sprockets and a timecode rule. */
function ReelMotif() {
  const x = 330;
  const y = 120;
  const w = 540;
  const h = 290;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="rgba(255,255,255,0.03)" stroke={LINE} strokeWidth={2.5} />
      {Array.from({ length: 11 }, (_, i) => x + 24 + i * 50).map((sx) => (
        <g key={sx}>
          <rect x={sx} y={y - 34} width={26} height={20} rx={3} fill="none" stroke={FAINT} strokeWidth={2} />
          <rect x={sx} y={y + h + 14} width={26} height={20} rx={3} fill="none" stroke={FAINT} strokeWidth={2} />
        </g>
      ))}
      <path
        d={`M ${x + w / 2 - 30} ${y + h / 2 - 42} L ${x + w / 2 + 48} ${y + h / 2} L ${x + w / 2 - 30} ${y + h / 2 + 42} Z`}
        fill="none"
        stroke={WF.accent}
        strokeWidth={4}
      />
      <path d={`M ${x} ${y + h + 62} L ${x + w} ${y + h + 62}`} stroke={LINE} strokeWidth={1.5} fill="none" />
      {Array.from({ length: 19 }, (_, i) => x + i * 30).map((tx, i) => (
        <path
          key={tx}
          d={`M ${tx} ${y + h + 62} L ${tx} ${y + h + (i % 3 === 0 ? 76 : 70)}`}
          stroke={FAINT}
          strokeWidth={1.5}
          fill="none"
        />
      ))}
    </g>
  );
}

/** Actualites: a press sheet — masthead rule, columns, a fold. */
function PressMotif() {
  const x = 340;
  const y = 70;
  const w = 520;
  const h = 360;
  const colW = (w - 2 * 26) / 3;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} fill="rgba(255,255,255,0.03)" stroke={LINE} strokeWidth={2.5} />
      <path d={`M ${x + 26} ${y + 46} L ${x + w - 26} ${y + 46}`} stroke={WF.accent} strokeWidth={4} fill="none" />
      <path d={`M ${x + 26} ${y + 62} L ${x + w - 26} ${y + 62}`} stroke={FAINT} strokeWidth={1.5} fill="none" />
      {[0, 1, 2].map((c) => {
        const cx = x + 26 + c * (colW + 26);
        return (
          <g key={c}>
            {Array.from({ length: 11 }, (_, i) => y + 96 + i * 24).map((ry, i) => (
              <path
                key={ry}
                d={`M ${cx} ${ry} L ${cx + (i === 10 ? colW * 0.55 : colW)} ${ry}`}
                stroke={FAINT}
                strokeWidth={2}
                fill="none"
              />
            ))}
          </g>
        );
      })}
      {[1, 2].map((c) => (
        <path
          key={c}
          d={`M ${x + 13 + c * (colW + 26)} ${y + 80} L ${x + 13 + c * (colW + 26)} ${y + h - 24}`}
          stroke={FAINT}
          strokeWidth={1}
          fill="none"
        />
      ))}
      <path
        d={`M ${x + w / 2} ${y - 18} L ${x + w / 2} ${y + h + 18}`}
        stroke={FAINT}
        strokeWidth={1.5}
        strokeDasharray="8 10"
        fill="none"
      />
    </g>
  );
}

/** Blog: a single article column, set with a drop cap and a measure. */
function ColumnMotif() {
  const x = 420;
  const y = 90;
  const w = 360;
  return (
    <g>
      <rect x={x} y={y} width={76} height={76} fill="none" stroke={WF.accent} strokeWidth={3.5} />
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M ${x + 94} ${y + 16 + i * 26} L ${x + w} ${y + 16 + i * 26}`}
          stroke={LINE}
          strokeWidth={2.5}
          fill="none"
        />
      ))}
      {Array.from({ length: 9 }, (_, i) => y + 108 + i * 26).map((ry, i) => (
        <path
          key={ry}
          d={`M ${x} ${ry} L ${x + (i === 8 ? w * 0.48 : w)} ${ry}`}
          stroke={FAINT}
          strokeWidth={2.5}
          fill="none"
        />
      ))}
      <path
        d={`M ${x} ${y + 360} L ${x + w} ${y + 360} M ${x} ${y + 352} L ${x} ${y + 368} M ${x + w} ${y + 352} L ${x + w} ${y + 368}`}
        stroke={FAINT}
        strokeWidth={1.5}
        fill="none"
      />
    </g>
  );
}

/** Motif registry. `dy` tunes each drawing against the copy block above it. */
const MOTIFS: Record<HeroMotif, { render: () => React.ReactElement; dy: number }> = {
  portal: { render: PortalMotif, dy: 46 },
  datum: { render: DatumMotif, dy: 40 },
  sheets: { render: SheetsMotif, dy: 28 },
  frames: { render: FramesMotif, dy: 24 },
  reel: { render: ReelMotif, dy: 18 },
  press: { render: PressMotif, dy: 6 },
  column: { render: ColumnMotif, dy: -40 },
};
