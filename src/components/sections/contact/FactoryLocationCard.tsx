import * as React from 'react';
import { MapPin, ExternalLink } from 'lucide-react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { companyData } from '@/config/company-data';
import { WF, WF_FONT } from '@/components/wireframes/wf-theme';

/**
 * Localisation band for the Contact page.
 *
 * Pairs the site address (read verbatim from `companyData.pages.contact.content.address`)
 * with a shop-drawing-style silhouette of Algeria, with a pin dropped in the
 * north-central highlands where Bordj Bou Arréridj sits. The silhouette is
 * intentionally stylised — it's a visual anchor, not a survey map. No third-party
 * map iframe, no external script, no coordinates fabricated.
 *
 * A "Ouvrir dans Google Maps" search link is generated inline from the address
 * string via the `?api=1&query=...` deep link — no API key required.
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
            <div className="lg:col-span-3 rounded-md border border-border bg-secondary/40 p-4 md:p-6">
              <AlgeriaSitePlate />
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

/**
 * Stylised Algeria silhouette in the shop-drawing vernacular used elsewhere
 * on the site (see `src/components/wireframes/`). The polygon is a simplified
 * hand-drawn outline — not a projection — with the pin placed in the north
 * of the country, where Bordj Bou Arréridj is located.
 */
function AlgeriaSitePlate() {
  // Pin coordinates chosen to sit inside the polygon at the visual position
  // of Bordj Bou Arréridj (north-central highlands, slightly east of Algiers).
  const pinX = 278;
  const pinY = 118;

  // Callout target for the leader line (top-right of the plate).
  const calloutX = 372;
  const calloutY = 62;

  return (
    <svg
      viewBox="0 0 480 520"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Silhouette stylisée de l'Algérie avec un repère de position sur Bordj Bou Arréridj."
      className="block h-auto w-full"
    >
      {/* Drawing frame */}
      <rect
        x={12}
        y={12}
        width={456}
        height={496}
        fill="none"
        stroke={WF.dim}
        strokeWidth={1}
        strokeDasharray="4 4"
        opacity={0.55}
      />

      {/* Faint interior grid, so it reads as a map plate rather than a random blob. */}
      <g opacity={0.35}>
        <path
          d="M 82 180 L 402 180"
          stroke={WF.dim}
          strokeWidth={0.8}
          strokeDasharray="2 6"
          fill="none"
        />
        <path
          d="M 82 300 L 402 300"
          stroke={WF.dim}
          strokeWidth={0.8}
          strokeDasharray="2 6"
          fill="none"
        />
        <path
          d="M 200 78 L 200 486"
          stroke={WF.dim}
          strokeWidth={0.8}
          strokeDasharray="2 6"
          fill="none"
        />
        <path
          d="M 300 78 L 300 486"
          stroke={WF.dim}
          strokeWidth={0.8}
          strokeDasharray="2 6"
          fill="none"
        />
      </g>

      {/* Algeria silhouette — stylised, not a projection. */}
      <path
        d="M 92 90
           L 152 84
           L 214 82
           L 276 80
           L 332 90
           L 372 100
           L 402 116
           L 406 168
           L 396 218
           L 402 268
           L 388 322
           L 370 378
           L 340 424
           L 300 466
           L 254 484
           L 220 464
           L 198 424
           L 172 380
           L 142 336
           L 116 296
           L 96 254
           L 84 208
           L 82 158
           L 88 122
           Z"
        fill={WF.fill}
        stroke={WF.ink}
        strokeWidth={1.75}
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Mediterranean label above the coast. */}
      <text
        x={244}
        y={60}
        textAnchor="middle"
        fontFamily={WF_FONT}
        fontSize={11}
        fontWeight={600}
        letterSpacing="0.14em"
        fill={WF.labelMuted}
      >
        MER MÉDITERRANÉE
      </text>

      {/* Compass rose — bottom left, drafting style. */}
      <g transform="translate(58,442)">
        <circle r={22} fill="none" stroke={WF.dim} strokeWidth={1} />
        <path d="M 0 -22 L 5 0 L 0 22 L -5 0 Z" fill={WF.ink} opacity={0.65} />
        <path d="M -22 0 L 0 -5 L 22 0 L 0 5 Z" fill="none" stroke={WF.dim} strokeWidth={1} />
        <text
          x={0}
          y={-28}
          textAnchor="middle"
          fontFamily={WF_FONT}
          fontSize={12}
          fontWeight={700}
          fill={WF.label}
        >
          N
        </text>
      </g>

      {/* Scale bar — bottom right. Approximate reference, not a precise scale. */}
      <g transform="translate(300,492)">
        <text
          x={0}
          y={-10}
          textAnchor="start"
          fontFamily={WF_FONT}
          fontSize={10}
          fontWeight={500}
          fill={WF.labelMuted}
        >
          0
        </text>
        <text
          x={120}
          y={-10}
          textAnchor="end"
          fontFamily={WF_FONT}
          fontSize={10}
          fontWeight={500}
          fill={WF.labelMuted}
        >
          ~ 300 km
        </text>
        <rect x={0} y={-4} width={40} height={8} fill={WF.ink} opacity={0.75} />
        <rect
          x={40}
          y={-4}
          width={40}
          height={8}
          fill="none"
          stroke={WF.ink}
          strokeWidth={1}
        />
        <rect x={80} y={-4} width={40} height={8} fill={WF.ink} opacity={0.75} />
      </g>

      {/* Site pin. */}
      <g>
        <path
          d={`M ${pinX} ${pinY} L ${calloutX} ${calloutY}`}
          stroke={WF.accent}
          strokeWidth={1.25}
          fill="none"
        />
        <circle
          cx={pinX}
          cy={pinY}
          r={18}
          fill={WF.accent}
          opacity={0.12}
        />
        <circle
          cx={pinX}
          cy={pinY}
          r={10}
          fill="none"
          stroke={WF.accent}
          strokeWidth={1.25}
          opacity={0.55}
        />
        <circle cx={pinX} cy={pinY} r={4} fill={WF.accent} />
      </g>

      {/* Callout labels. */}
      <text
        x={calloutX + 6}
        y={calloutY - 4}
        textAnchor="start"
        fontFamily={WF_FONT}
        fontSize={13}
        fontWeight={700}
        fill={WF.accent}
      >
        Bordj Bou Arréridj
      </text>
      <text
        x={calloutX + 6}
        y={calloutY + 12}
        textAnchor="start"
        fontFamily={WF_FONT}
        fontSize={11}
        fontWeight={500}
        fill={WF.label}
      >
        Complexe Bordj Steel
      </text>

      {/* Cartouche in the bottom-left corner. */}
      <text
        x={14}
        y={504}
        textAnchor="start"
        fontFamily={WF_FONT}
        fontSize={10}
        fontWeight={600}
        letterSpacing="0.18em"
        fill={WF.labelMuted}
      >
        ALGÉRIE — SITE DE PRODUCTION
      </text>
    </svg>
  );
}
