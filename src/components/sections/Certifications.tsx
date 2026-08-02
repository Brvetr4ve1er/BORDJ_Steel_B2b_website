import * as React from 'react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { companyData } from '@/config/company-data';
import { WF, WF_FONT } from '@/components/wireframes/wf-theme';

/**
 * Certifications band — one bespoke shop-drawing ISO seal per certification.
 *
 * Content is read verbatim from `companyData.pages.certifications`. Each item
 * ("ISO 9001:2015 - Système de Management de la Qualité") is split on " - "
 * into an ISO code (rendered inside the seal) and a scope description
 * (rendered below the plate). The seal geometry — outer ring, dashed inner
 * ring, cardinal tick marks, and family-specific pictogram (bullseye for
 * quality, leaf for environment, hard hat for safety) — is drawn inline so it
 * matches the rest of the site's technical-drawing vernacular and stays server
 * rendered.
 *
 * Motion is CSS-only and gated behind `prefers-reduced-motion: no-preference`:
 *   - the dashed inner ring rotates slowly (40 s) with per-tile phase offset
 *   - the four cardinal ticks draw in on mount, staggered 100 ms each
 * Under `prefers-reduced-motion: reduce` the ticks are already drawn and the
 * ring is static.
 */
export function Certifications() {
  const { certifications } = companyData.pages;

  return (
    <section id="approvals" className="bg-secondary">
      {/* Scoped motion CSS. Server-safe: no client boundary needed. */}
      <style>{SEAL_CSS}</style>

      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-16">
            {certifications.title}
          </h2>
        </AnimatedWrapper>

        <AnimatedWrapper animation="fade-in">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            {certifications.items.map((cert, index) => {
              const parts = cert.split(' - ');
              const code = parts[0] ?? cert;
              const description = parts[1];
              const family = familyFor(code);

              return (
                <AnimatedWrapper key={cert} animation="fade-in-stagger" staggerIndex={index}>
                  <div className="flex h-full flex-col items-center gap-5">
                    <div className="group aspect-square w-full rounded-xl border border-border bg-background p-6 shadow-md md:p-7">
                      <div className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                        <IsoSeal code={code} family={family} index={index} />
                      </div>
                    </div>
                    {description && (
                      <p className="text-center text-base leading-relaxed text-muted-foreground">
                        {description}
                      </p>
                    )}
                  </div>
                </AnimatedWrapper>
              );
            })}
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------------------
 * ISO family classification + code parsing
 * -------------------------------------------------------------------------- */

type IsoFamily = 'quality' | 'environment' | 'safety' | 'other';

function familyFor(code: string): IsoFamily {
  if (code.startsWith('ISO 9001')) return 'quality';
  if (code.startsWith('ISO 14001')) return 'environment';
  if (code.startsWith('ISO 45001')) return 'safety';
  return 'other';
}

/** Split "ISO 9001:2015" into { number: "ISO 9001", year: "2015" }. */
function splitCode(code: string): { number: string; year: string } {
  const colon = code.indexOf(':');
  if (colon === -1) return { number: code, year: '' };
  return { number: code.slice(0, colon), year: code.slice(colon + 1) };
}

/* --------------------------------------------------------------------------
 * Family pictogram — drawn behind the ISO type, kept low-opacity so the text
 * always wins. Small, hand-drawn feel; no bitmaps.
 * -------------------------------------------------------------------------- */

function Pictogram({ family }: { family: IsoFamily }) {
  const cx = 140;
  const cy = 140;

  if (family === 'quality') {
    // Bullseye — the QMS "target" motif.
    return (
      <g opacity={0.11} fill="none" stroke={WF.accent} strokeWidth={2}>
        <circle cx={cx} cy={cy} r={54} />
        <circle cx={cx} cy={cy} r={38} />
        <circle cx={cx} cy={cy} r={22} />
        <circle cx={cx} cy={cy} r={5} fill={WF.accent} stroke="none" />
      </g>
    );
  }

  if (family === 'environment') {
    // Stylised leaf silhouette with a central vein.
    return (
      <g opacity={0.12}>
        <path
          d={`M ${cx - 46} ${cy + 46}
              C ${cx - 70} ${cy - 4}, ${cx - 8} ${cy - 66}, ${cx + 54} ${cy - 46}
              C ${cx + 48} ${cy + 8}, ${cx + 14} ${cy + 52}, ${cx - 46} ${cy + 46} Z`}
          fill={WF.accent}
        />
        <path
          d={`M ${cx - 46} ${cy + 46} L ${cx + 42} ${cy - 36}`}
          stroke={WF.accent}
          strokeWidth={1.5}
          opacity={0.55}
          fill="none"
          strokeLinecap="round"
        />
      </g>
    );
  }

  if (family === 'safety') {
    // Hard-hat silhouette — dome, brim, and top ridge.
    return (
      <g opacity={0.13} fill={WF.accent}>
        {/* Brim */}
        <path
          d={`M ${cx - 62} ${cy + 20}
              L ${cx + 62} ${cy + 20}
              L ${cx + 52} ${cy + 32}
              L ${cx - 52} ${cy + 32} Z`}
        />
        {/* Dome */}
        <path
          d={`M ${cx - 44} ${cy + 20}
              C ${cx - 44} ${cy - 46}, ${cx + 44} ${cy - 46}, ${cx + 44} ${cy + 20} Z`}
        />
        {/* Top ridge */}
        <rect x={cx - 6} y={cy - 38} width={12} height={22} />
      </g>
    );
  }

  return null;
}

/* --------------------------------------------------------------------------
 * The seal itself — one SVG per certification.
 * -------------------------------------------------------------------------- */

function IsoSeal({
  code,
  family,
  index,
}: {
  code: string;
  family: IsoFamily;
  index: number;
}) {
  const { number, year } = splitCode(code);

  const cx = 140;
  const cy = 140;
  const outerR = 118;
  const innerR = 100;

  // Cardinal ticks (N/E/S/W) cross the outer ring.
  const tickInner = outerR - 8;
  const tickOuter = outerR + 4;
  const ticks: string[] = [
    `M ${cx} ${cy - tickOuter} L ${cx} ${cy - tickInner}`, // N
    `M ${cx + tickOuter} ${cy} L ${cx + tickInner} ${cy}`, // E
    `M ${cx} ${cy + tickOuter} L ${cx} ${cy + tickInner}`, // S
    `M ${cx - tickOuter} ${cy} L ${cx - tickInner} ${cy}`, // W
  ];

  // Corner registration crosses, one per corner of the drafting frame.
  const corners: Array<[number, number]> = [
    [22, 22],
    [258, 22],
    [22, 258],
    [258, 258],
  ];

  // Offset the ring's rotation phase per tile so the three seals feel
  // independent rather than lockstep.
  const spinDelay = `-${index * 8}s`;

  return (
    <svg
      viewBox="0 0 280 280"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Sceau ${code}`}
      className="block h-full w-full"
    >
      {/* Drafting frame — dashed square that echoes the wireframe plates. */}
      <rect
        x={12}
        y={12}
        width={256}
        height={256}
        fill="none"
        stroke={WF.dim}
        strokeWidth={1}
        strokeDasharray="3 5"
        opacity={0.45}
      />

      {/* Corner registration marks. */}
      {corners.map(([x, y], i) => (
        <path
          key={i}
          d={`M ${x - 5} ${y} L ${x + 5} ${y} M ${x} ${y - 5} L ${x} ${y + 5}`}
          stroke={WF.dim}
          strokeWidth={0.9}
          opacity={0.55}
        />
      ))}

      {/* Family pictogram sits behind the geometry. */}
      <Pictogram family={family} />

      {/* Outer ring. */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR}
        fill="none"
        stroke={WF.ink}
        strokeWidth={2}
      />

      {/* Inner dashed ring — spins slowly (ambient). */}
      <g
        className="iso-seal-ring-spin"
        style={{ animationDelay: spinDelay }}
      >
        <circle
          cx={cx}
          cy={cy}
          r={innerR}
          fill="none"
          stroke={WF.dim}
          strokeWidth={1}
          strokeDasharray="4 5"
        />
      </g>

      {/* Cardinal accent ticks — draw in on mount, staggered. */}
      {ticks.map((d, i) => (
        <path
          key={i}
          d={d}
          className={`iso-seal-tick iso-seal-tick-${i + 1}`}
          stroke={WF.accent}
          strokeWidth={2.5}
        />
      ))}

      {/* ISO number — the seal's headline. */}
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        fontFamily={WF_FONT}
        fontSize={30}
        fontWeight={800}
        letterSpacing="0.02em"
        fill={WF.ink}
      >
        {number}
      </text>

      {/* Year of issue, kept subordinate but visible. */}
      {year && (
        <text
          x={cx}
          y={cy + 22}
          textAnchor="middle"
          fontFamily={WF_FONT}
          fontSize={15}
          fontWeight={700}
          letterSpacing="0.18em"
          fill={WF.accent}
        >
          {`:${year}`}
        </text>
      )}

      {/* Cartouche band under the type — reinforces "seal" reading. */}
      <text
        x={cx}
        y={cy + 62}
        textAnchor="middle"
        fontFamily={WF_FONT}
        fontSize={10}
        fontWeight={600}
        letterSpacing="0.34em"
        fill={WF.labelMuted}
      >
        CERTIFIÉ
      </text>
    </svg>
  );
}

/* --------------------------------------------------------------------------
 * Motion CSS — scoped, gated behind prefers-reduced-motion.
 * Under reduced-motion the initial dash offsets are never applied, so the
 * ticks render fully drawn and the ring stays put.
 * -------------------------------------------------------------------------- */

const SEAL_CSS = `
.iso-seal-ring-spin { transform-box: fill-box; transform-origin: center; }
.iso-seal-tick { fill: none; stroke-linecap: round; }
@media (prefers-reduced-motion: no-preference) {
  .iso-seal-ring-spin {
    animation: iso-seal-spin 40s linear infinite;
  }
  .iso-seal-tick {
    stroke-dasharray: 24;
    stroke-dashoffset: 24;
    animation: iso-seal-tick-in 0.6s ease-out forwards;
  }
  .iso-seal-tick-1 { animation-delay: 0.15s; }
  .iso-seal-tick-2 { animation-delay: 0.25s; }
  .iso-seal-tick-3 { animation-delay: 0.35s; }
  .iso-seal-tick-4 { animation-delay: 0.45s; }
}
@keyframes iso-seal-spin { to { transform: rotate(360deg); } }
@keyframes iso-seal-tick-in { to { stroke-dashoffset: 0; } }
`;
