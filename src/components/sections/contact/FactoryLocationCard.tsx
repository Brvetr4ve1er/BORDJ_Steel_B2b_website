import * as React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { companyData } from '@/config/company-data';
import { WF, WF_FONT } from '@/components/wireframes/wf-theme';

/**
 * Localisation band for the Contact page.
 *
 * Pairs the site address (read verbatim from
 * `companyData.pages.contact.content.address`) with a survey plate of Algeria
 * drawn in the same technical-drawing language as the rest of the site.
 *
 * A "Ouvrir dans Google Maps" search link is generated inline from the address
 * string via the `?api=1&query=...` deep link — no API key required, no
 * third-party map iframe, no external script.
 */
export function FactoryLocationCard() {
  const address = companyData.pages.contact.content.address;
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;

  return (
    <section className="bg-background py-16 md:py-24" aria-labelledby="factory-location-title">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <div className="mb-12 max-w-2xl">
            <h2
              id="factory-location-title"
              className="font-headline text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary"
            >
              Localisation
            </h2>
            <p className="mt-4 text-muted-foreground">
              Notre complexe industriel dans la wilaya de Bordj Bou Arréridj, en Algérie.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-start">
            <div className="relative lg:col-span-3 overflow-hidden rounded-md border border-border bg-secondary/40 p-4 md:p-6">
              {/* Same drafting ground as the contact figures and the history
                  timeline — one definition in globals.css. */}
              <div aria-hidden="true" className="wf-ground absolute inset-0" />
              <div className="relative">
                <AlgeriaSitePlate />
              </div>
            </div>

            <address className="lg:col-span-2 not-italic rounded-md border border-border bg-background p-6 md:p-8">
              <div className="flex items-start gap-4">
                <span
                  aria-hidden="true"
                  className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border bg-secondary text-accent"
                >
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Adresse du siège
                  </div>
                  <p className="mt-2 text-lg font-medium leading-snug text-primary">
                    {address}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Wilaya de Bordj Bou Arréridj
                  </p>
                </div>
              </div>

              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-border pt-6">
                <div>
                  <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Latitude
                  </dt>
                  <dd className="mt-1 font-mono text-sm tabular-nums text-primary">
                    {SITE.lat.toFixed(4)}° N
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Longitude
                  </dt>
                  <dd className="mt-1 font-mono text-sm tabular-nums text-primary">
                    {SITE.lon.toFixed(4)}° E
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">
                    Distance d&apos;Alger
                  </dt>
                  <dd className="mt-1 text-sm text-primary">
                    <span className="font-mono tabular-nums">{ALGER_KM}</span> km à vol d&apos;oiseau
                  </dd>
                </div>
              </dl>

              <div className="mt-6 border-t border-border pt-6">
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 text-sm font-medium text-accent underline-offset-4 hover:underline focus-visible:underline"
                >
                  Ouvrir dans Google Maps
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </address>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */
/* Survey data                                                               */
/* ------------------------------------------------------------------------ */

/**
 * Bordj Bou Arréridj, geocoded via OpenStreetMap/Nominatim. Alger is carried
 * only as a reference point so a reader can place the site at a glance.
 */
const SITE = { lat: 36.0741, lon: 4.7613 };
const ALGER = { lat: 36.7729, lon: 3.0588 };

/** Great-circle distance, computed from the two coordinate pairs above. */
function haversineKm(a: typeof SITE, b: typeof SITE): number {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const la1 = (a.lat * Math.PI) / 180;
  const la2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

const ALGER_KM = Math.round(haversineKm(SITE, ALGER));

/**
 * The national outline, projected to this viewBox.
 *
 * REPLACED A HAND-DRAWN BLOB. The previous plate carried a 24-point polygon
 * described in its own comment as "intentionally stylised — a visual anchor,
 * not a survey map". It did not read as Algeria: a rounded shield with none of
 * the Mediterranean coastline, the Saharan bulk or the south-east salient. A
 * map of the country a buyer is trying to locate you in should look like the
 * country.
 *
 * These 62 points are the real national boundary (Natural Earth derived
 * GeoJSON), projected equirectangular with a cos(28°) easting correction —
 * 28° being the mean latitude of a country spanning 19°N to 37°N. Mercator
 * would have visibly stretched the Saharan south against the coast; a conic
 * needs two standard parallels for little gain at this size.
 *
 * CONSEQUENCE, STATED BECAUSE IT IS VISIBLE: easting is exact only at 28°N. In
 * the north, where the site actually is, east–west distance is overstated by
 * roughly 9%. The scale bar is therefore marked approximate, and the kilometre
 * figure in the panel is a haversine on the real coordinates rather than
 * anything measured off the drawing.
 */
const ALGERIA_PATH =
  'M 474.3 361.3 L 406.6 403.9 L 349.4 447.8 L 321.5 457.8 L 299.6 460 L 299.4 445.8 L 290.3 442.1 L 278 435.7 L 273.3 425.3 L 206.6 376.4 L 140 327.6 L 65.7 273.5 L 66.1 269.1 L 66.1 267.7 L 65.9 241.1 L 97.8 224.6 L 117.6 221.2 L 133.7 215.2 L 141.3 204 L 164.4 195.2 L 165.2 178.6 L 176.6 176.7 L 185.6 168.4 L 211.4 164.6 L 215.1 155.9 L 209.8 151.2 L 203 127.5 L 201.9 113.9 L 194.4 99.6 L 213.4 87.4 L 234.7 83.5 L 247.2 74.3 L 266.2 67.5 L 299.7 63.5 L 332.4 61.7 L 342.3 65 L 360.9 56.2 L 382 56 L 390.1 61.2 L 403.6 59.8 L 399.6 71.3 L 402.7 92.7 L 398 111.1 L 385.9 123.6 L 387.6 140.4 L 403.8 153.8 L 403.9 159.2 L 416.1 168.2 L 424.5 208.3 L 430.9 228.1 L 432 238.5 L 428.5 256.7 L 429.9 266.9 L 427.4 279.2 L 429.2 293.2 L 421.3 302.6 L 433 318.9 L 433.7 328.5 L 440.8 341 L 450 336.9 L 465.6 347.2 L 474.3 361.3 Z';

/** Projected positions, from the same transform as the outline. */
const PT = {
  site: { x: 331.3, y: 79.4 },
  alger: { x: 297.7, y: 63.7 },
};

/** Real meridians and parallels, at their projected positions. */
const MERIDIANS = [
  { label: '5° O', x: 138.5 },
  { label: '0°', x: 237.3 },
  { label: '5° E', x: 336 },
  { label: '10° E', x: 434.8 },
];
const PARALLELS = [
  { label: '35° N', y: 103.4 },
  { label: '30° N', y: 215.2 },
  { label: '25° N', y: 327.1 },
  { label: '20° N', y: 438.9 },
];

/** 300 km of easting at the projection's standard parallel. */
const KM300_PX = 60.3;

const MAP = { top: 48, bottom: 466, left: 36, right: 504 };

function Mono({
  x,
  y,
  children,
  size = 9,
  anchor = 'start',
  color = WF.labelMuted,
  weight = 600,
}: {
  x: number;
  y: number;
  children: React.ReactNode;
  size?: number;
  anchor?: 'start' | 'middle' | 'end';
  color?: string;
  weight?: number;
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily="ui-monospace, SFMono-Regular, Menlo, monospace"
      fontSize={size}
      fontWeight={weight}
      letterSpacing="0.1em"
      fill={color}
    >
      {children}
    </text>
  );
}

/**
 * Algeria as a drawing sheet: framed, gridded, scaled, with a title block.
 *
 * Every label stays inside the viewBox. The previous version ran its callout
 * text off the right edge, so the page shipped "Bordj Bou Arréri…" and
 * "Complexe Bordj Stee…" clipped mid-word.
 */
function AlgeriaSitePlate() {
  return (
    <svg
      viewBox="0 0 540 600"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Plan de situation : l'Algérie, avec le complexe Bordj Steel repéré dans la wilaya de Bordj Bou Arréridj, au nord-est du pays."
      className="block h-auto w-full"
      fontFamily={WF_FONT}
    >
      <defs>
        {/* Confines the Sahara tint to the national outline. */}
        <clipPath id="bs-dz-clip">
          <path d={ALGERIA_PATH} />
        </clipPath>
      </defs>

      {/* ---- sheet frame + corner ticks ---- */}
      <rect x={16} y={16} width={508} height={568} fill="none" stroke={WF.ink} strokeWidth={1.5} />
      <rect x={24} y={24} width={492} height={552} fill="none" stroke={WF.dim} strokeWidth={0.75} />
      {[
        [16, 16, 1, 1],
        [524, 16, -1, 1],
        [16, 584, 1, -1],
        [524, 584, -1, -1],
      ].map(([cx, cy, sx, sy], i) => (
        <path
          key={i}
          d={`M ${cx} ${Number(cy) + Number(sy) * 22} L ${cx} ${cy} L ${Number(cx) + Number(sx) * 22} ${cy}`}
          fill="none"
          stroke={WF.accent}
          strokeWidth={2.5}
        />
      ))}

      {/* ---- graticule ---- */}
      <g opacity={0.45}>
        {MERIDIANS.map((m) => (
          <path
            key={m.label}
            d={`M ${m.x} ${MAP.top} L ${m.x} ${MAP.bottom}`}
            stroke={WF.dim}
            strokeWidth={0.75}
            strokeDasharray="2 7"
            fill="none"
          />
        ))}
        {PARALLELS.map((p) => (
          <path
            key={p.label}
            d={`M ${MAP.left} ${p.y} L ${MAP.right} ${p.y}`}
            stroke={WF.dim}
            strokeWidth={0.75}
            strokeDasharray="2 7"
            fill="none"
          />
        ))}
      </g>
      {MERIDIANS.map((m) => (
        <Mono key={m.label} x={m.x} y={MAP.bottom + 13} anchor="middle" size={8}>
          {m.label}
        </Mono>
      ))}
      {PARALLELS.map((p) => (
        <Mono key={p.label} x={MAP.left - 4} y={p.y + 3} anchor="end" size={8}>
          {p.label}
        </Mono>
      ))}

      {/* ---- the country ---- */}
      <path d={ALGERIA_PATH} fill={WF.fill} stroke={WF.ink} strokeWidth={2} strokeLinejoin="round" />
      {/* Saharan bulk, clipped to the outline: everything below the 30th parallel. */}
      <g clipPath="url(#bs-dz-clip)">
        <rect x={0} y={215.2} width={540} height={400} fill={WF.steel} opacity={0.4} />
        {Array.from({ length: 26 }, (_, i) => 230 + i * 9).map((y) => (
          <path
            key={y}
            d={`M 40 ${y} L 500 ${y - 30}`}
            stroke={WF.dim}
            strokeWidth={0.5}
            opacity={0.35}
            fill="none"
          />
        ))}
      </g>
      <Mono x={250} y={330} anchor="middle" size={10} color={WF.labelMuted}>
        SAHARA
      </Mono>

      {/* ---- sea + neighbours ---- */}
      <Mono x={270} y={40} anchor="middle" size={9} color={WF.dim}>
        MER MÉDITERRANÉE
      </Mono>
      {[
        { t: 'MAROC', x: 120, y: 120 },
        { t: 'TUNISIE', x: 432, y: 104 },
        { t: 'LIBYE', x: 466, y: 250 },
        { t: 'NIGER', x: 404, y: 452 },
        { t: 'MALI', x: 168, y: 408 },
        { t: 'MAURITANIE', x: 92, y: 336 },
      ].map((n) => (
        <Mono key={n.t} x={n.x} y={n.y} anchor="middle" size={8} color={WF.dim} weight={500}>
          {n.t}
        </Mono>
      ))}

      {/* ---- Alger, as a reference only ---- */}
      <circle cx={PT.alger.x} cy={PT.alger.y} r={3} fill="#ffffff" stroke={WF.ink} strokeWidth={1.5} />
      <Mono x={PT.alger.x - 7} y={PT.alger.y + 3} anchor="end" size={8} color={WF.label}>
        ALGER
      </Mono>

      {/* ---- the dimension between the two, the figure printed beside the map ---- */}
      <path
        d={`M ${PT.alger.x} ${PT.alger.y} L ${PT.site.x} ${PT.site.y}`}
        stroke={WF.accent}
        strokeWidth={1}
        strokeDasharray="4 3"
        fill="none"
        opacity={0.8}
      />
      <Mono x={300} y={99} anchor="start" size={8} color={WF.accent}>
        {`${ALGER_KM} KM`}
      </Mono>

      {/* ---- the site ---- */}
      <circle cx={PT.site.x} cy={PT.site.y} r={16} fill={WF.accent} opacity={0.12} />
      <circle cx={PT.site.x} cy={PT.site.y} r={9} fill={WF.accent} opacity={0.22} />
      <circle cx={PT.site.x} cy={PT.site.y} r={4.5} fill={WF.accent} />
      {/* crosshair, so the pin reads as a surveyed point rather than a dot */}
      <path
        d={`M ${PT.site.x - 24} ${PT.site.y} L ${PT.site.x - 11} ${PT.site.y} M ${PT.site.x + 11} ${PT.site.y} L ${PT.site.x + 24} ${PT.site.y} M ${PT.site.x} ${PT.site.y - 24} L ${PT.site.x} ${PT.site.y - 11} M ${PT.site.x} ${PT.site.y + 11} L ${PT.site.x} ${PT.site.y + 24}`}
        stroke={WF.accent}
        strokeWidth={1.25}
        fill="none"
      />
      {/* Leader elbow out to the right margin — inside the frame, unlike the
          version this replaced. */}
      <path
        d={`M ${PT.site.x + 24} ${PT.site.y} L 362 ${PT.site.y} L 372 ${PT.site.y - 10}`}
        stroke={WF.accent}
        strokeWidth={1.25}
        fill="none"
      />
      <text
        x={376}
        y={66}
        fontFamily={WF_FONT}
        fontSize={13}
        fontWeight={700}
        fill={WF.accent}
        paintOrder="stroke"
        stroke="#ffffff"
        strokeWidth={3}
        strokeLinejoin="round"
      >
        BORDJ STEEL
      </text>
      <text
        x={376}
        y={80}
        fontFamily={WF_FONT}
        fontSize={10}
        fontWeight={600}
        fill={WF.label}
        paintOrder="stroke"
        stroke="#ffffff"
        strokeWidth={3}
        strokeLinejoin="round"
      >
        Bordj Bou Arréridj
      </text>

      {/* ---- north arrow ---- */}
      <g transform="translate(62,432)">
        <circle r={19} fill="#ffffff" stroke={WF.dim} strokeWidth={1} opacity={0.9} />
        <path d="M 0 -14 L 5.5 4 L 0 0.5 Z" fill={WF.accent} />
        <path d="M 0 -14 L -5.5 4 L 0 0.5 Z" fill={WF.ink} />
        <Mono x={0} y={-19} anchor="middle" size={8} color={WF.ink} weight={700}>
          N
        </Mono>
      </g>

      {/* ---- title block ---- */}
      <path d={`M 24 490 L 516 490`} stroke={WF.ink} strokeWidth={1.25} fill="none" />
      <path d={`M 24 538 L 516 538`} stroke={WF.dim} strokeWidth={0.75} fill="none" />
      <path d={`M 212 490 L 212 576 M 352 490 L 352 576`} stroke={WF.dim} strokeWidth={0.75} fill="none" />

      <Mono x={34} y={506} size={8}>
        RAISON SOCIALE
      </Mono>
      <text x={34} y={526} fontFamily={WF_FONT} fontSize={14} fontWeight={700} fill={WF.accent}>
        BORDJ STEEL
      </text>

      <Mono x={222} y={506} size={8}>
        IMPLANTATION
      </Mono>
      <text x={222} y={522} fontFamily={WF_FONT} fontSize={11} fontWeight={600} fill={WF.label}>
        Wilaya de Bordj
      </text>
      <text x={222} y={537} fontFamily={WF_FONT} fontSize={11} fontWeight={600} fill={WF.label}>
        Bou Arréridj
      </text>

      <Mono x={362} y={506} size={8}>
        COORDONNÉES
      </Mono>
      <Mono x={362} y={522} size={11} color={WF.label} weight={700}>
        {`${SITE.lat.toFixed(4)}° N`}
      </Mono>
      <Mono x={362} y={537} size={11} color={WF.label} weight={700}>
        {`${SITE.lon.toFixed(4)}° E`}
      </Mono>

      {/* scale bar — two 300 km divisions, drawn at the projected length */}
      <g transform="translate(34,556)">
        <rect x={0} y={0} width={KM300_PX} height={7} fill={WF.ink} />
        <rect x={KM300_PX} y={0} width={KM300_PX} height={7} fill="#ffffff" stroke={WF.ink} strokeWidth={1} />
        <Mono x={0} y={21} size={8} anchor="middle">
          0
        </Mono>
        <Mono x={KM300_PX} y={21} size={8} anchor="middle">
          300
        </Mono>
        <Mono x={KM300_PX * 2} y={21} size={8} anchor="middle">
          600
        </Mono>
        <Mono x={KM300_PX * 2 + 14} y={7} size={8} color={WF.labelMuted}>
          KM (≈)
        </Mono>
      </g>

      <Mono x={222} y={560} size={8}>
        PROJECTION
      </Mono>
      <Mono x={222} y={572} size={8} color={WF.label}>
        ÉQUIRECT. 28° N
      </Mono>

      <Mono x={362} y={560} size={8}>
        PLAN DE SITUATION
      </Mono>
      <Mono x={362} y={572} size={8} color={WF.label}>
        ALGÉRIE — DZA
      </Mono>
    </svg>
  );
}
