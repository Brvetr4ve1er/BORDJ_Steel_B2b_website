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

export type HeroMotif = 'portal' | 'datum';

export function TechnicalHero({
  eyebrow,
  title,
  subtitle,
  motif,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  motif: HeroMotif;
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
        {motif === 'portal' ? <g transform="translate(0,46)"><PortalMotif /></g> : <g transform="translate(0,40)"><DatumMotif /></g>}
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
