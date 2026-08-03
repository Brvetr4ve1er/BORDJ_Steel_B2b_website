
import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Mail, Package } from 'lucide-react';

import { ProductPageLayout } from '@/components/product-page-layout';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { Button } from '@/components/ui/button';
import { KenBurns } from '@/components/ui/ken-burns';
import { WF, WF_FONT } from '@/components/wireframes/wf-theme';

type PlaceholderPageProps = {
  /** Hero heading (rendered uppercase). */
  title: string;
  /** Single sentence shown under the heading. */
  subtitle: string;
  image: {
    src: string;
    alt: string;
    aiHint?: string;
  };
};

/**
 * Shared "Contenu à venir" treatment for the Media Center sections that are not
 * built yet. Each route keeps its own `metadata`, hero image, title and subtitle;
 * everything else lives here so the treatment is changed in one place.
 *
 * The body is deliberately empty of *content*: these routes have nothing to show
 * yet, so nothing is invented. Instead the state is drawn as an unissued shop
 * drawing — a sheet with a frame, a blank drawing field, dimension lines whose
 * values are still blank ("—"), and a title block whose RÉV. / DATE / ÉCH. cells
 * are empty. That is exactly what a drawing looks like before it is issued, and
 * it says "not ready" without pretending otherwise.
 *
 * Server component: no hooks, no event handlers. All motion is scoped CSS.
 */
export function PlaceholderPage({ title, subtitle, image }: PlaceholderPageProps) {
  return (
    <ProductPageLayout>
      <section className="relative h-[60vh] w-full flex items-center justify-center text-white overflow-hidden p-0">
        {/* The drift lives on the wrapper, which now owns the image's own
            `absolute inset-0 z-0`; the scrim below still sits above it. Both
            routes that render this component inherit the same move. */}
        <KenBurns variant="right" className="absolute inset-0 z-0">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            priority
            data-ai-hint={image.aiHint}
          />
        </KenBurns>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <AnimatedWrapper animation="zoom-in">
            <h1 className="font-headline text-6xl md:text-8xl leading-tight md:leading-tight lg:leading-tight font-bold tracking-tighter uppercase text-white">
              {title}
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
              {subtitle}
            </p>
          </AnimatedWrapper>
        </div>
      </section>

      <section
        className="bg-background py-20 md:py-28"
        aria-labelledby="placeholder-status-title"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-md border border-border bg-secondary/40 p-4 md:p-8">
              <UnissuedDrawingPlate title={title} />
            </div>

            <AnimatedWrapper animation="slide-up">
              <div className="mt-10 text-center md:mt-12">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-muted-foreground">
                  Section en préparation
                </p>

                <h2
                  id="placeholder-status-title"
                  className="mt-3 font-headline text-3xl md:text-4xl font-bold uppercase tracking-tight text-primary"
                >
                  Contenu à venir
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                  Cette section est en cours de préparation. Les autres pages du site restent
                  consultables.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button asChild variant="accent" size="lg">
                    <Link href="/products">
                      <Package aria-hidden="true" />
                      Voir nos produits
                    </Link>
                  </Button>

                  <Button asChild variant="outline" size="lg">
                    <Link href="/contact">
                      <Mail aria-hidden="true" />
                      Nous contacter
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedWrapper>
          </div>
        </div>
      </section>
    </ProductPageLayout>
  );
}

/* ------------------------------------------------------------------ *
 * Typed style helpers                                                  *
 *                                                                      *
 * The draw-in needs a per-element path length (stroke-dasharray) and a  *
 * per-element delay. Both travel as CSS custom properties so the        *
 * keyframes stay in one scoped stylesheet. Typing them as an            *
 * intersection with CSSProperties keeps this strict-mode clean — no     *
 * casts, no escape hatches.                                            *
 * ------------------------------------------------------------------ */

type DrawStyle = CSSProperties & { '--plh-len': string; '--plh-delay': string };
type FadeStyle = CSSProperties & { '--plh-delay': string };

/** `len` is the approximate path length in user units; `delay` in seconds. */
function draw(len: number, delay: number): DrawStyle {
  return { '--plh-len': `${len}`, '--plh-delay': `${delay}s` };
}

function fade(delay: number): FadeStyle {
  return { '--plh-delay': `${delay}s` };
}

/* ------------------------------------------------------------------ *
 * Plate geometry — a single source of truth for the layout            *
 * ------------------------------------------------------------------ */

// Sheet
const SHEET = { x: 12, y: 12, w: 876, h: 516 } as const;
// Trim line (inside the sheet border)
const TRIM = { x0: 28, y0: 28, x1: 872, y1: 512 } as const;
// Blank drawing field — intentionally left empty
const FIELD = { x0: 96, y0: 96, x1: 566, y1: 380 } as const;
// Title block / cartouche, bottom-right corner of the trim
const BLOCK = { x0: 590, y0: 396, x1: 872, y1: 512 } as const;
// Centre of the "EN PRÉPARATION" stamp (must match transform-origin in the CSS)
const STAMP = { cx: 331, cy: 238 } as const;

const GRID_V = [108, 188, 268, 348, 428, 508, 588, 668, 748];
const GRID_H = [108, 188, 268, 348];

/** Blank dimension value. A dimension line with no value is the honest state. */
const BLANK = '—';

/**
 * An unissued shop drawing, in the site's technical-plate vernacular.
 *
 * Motion: construction lines draw themselves in via `stroke-dashoffset`
 * (~1.2s each, staggered over ~1.5s, ease-out), then the blank dimension values
 * and the empty title-block cells settle into a slow 3s opacity breathe so the
 * plate keeps a small amount of life. Under `prefers-reduced-motion: reduce`
 * every line is pinned drawn, the stamp is pinned placed, and nothing pulses.
 */
function UnissuedDrawingPlate({ title }: { title: string }) {
  const gridPath = [
    ...GRID_V.map((x) => `M ${x} 44 L ${x} 388`),
    ...GRID_H.map((y) => `M 44 ${y} L 856 ${y}`),
  ].join(' ');

  return (
    <>
      <style>{PLATE_CSS}</style>

      <svg
        viewBox="0 0 900 540"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Planche de dessin technique non émise : cadre, champ de dessin vierge, lignes de cote sans valeurs et cartouche dont les cases révision, date et échelle sont vides."
        className="block h-auto w-full"
      >
        {/* Sheet border — dashed, the outermost edge of the plate. */}
        <g className="plh-fade" style={fade(0.05)}>
          <rect
            x={SHEET.x}
            y={SHEET.y}
            width={SHEET.w}
            height={SHEET.h}
            fill="none"
            stroke={WF.dim}
            strokeWidth={1}
            strokeDasharray="6 6"
            opacity={0.55}
          />
        </g>

        {/* Trim line — solid, draws itself in first. Perimeter ≈ 2656. */}
        <path
          className="plh-draw"
          style={draw(2660, 0.1)}
          d={`M ${TRIM.x0} ${TRIM.y0} L ${TRIM.x1} ${TRIM.y0} L ${TRIM.x1} ${TRIM.y1} L ${TRIM.x0} ${TRIM.y1} Z`}
          fill="none"
          stroke={WF.dim}
          strokeWidth={1.25}
        />

        {/* Edge centring ticks — the registration marks of a real sheet. */}
        <path
          className="plh-draw"
          style={draw(60, 0.28)}
          d={`M 450 ${TRIM.y0} L 450 ${TRIM.y0 + 14} M 450 ${TRIM.y1} L 450 ${TRIM.y1 - 14} M ${TRIM.x0} 270 L ${TRIM.x0 + 14} 270 M ${TRIM.x1} 270 L ${TRIM.x1 - 14} 270`}
          fill="none"
          stroke={WF.dim}
          strokeWidth={1.25}
          strokeLinecap="round"
        />

        {/* Construction grid. */}
        <g className="plh-fade" style={fade(0.4)}>
          <path
            d={gridPath}
            fill="none"
            stroke={WF.steel}
            strokeWidth={0.75}
            strokeDasharray="2 8"
            opacity={0.7}
          />
        </g>

        {/* The drawing field itself — left blank, because it is blank. */}
        <g className="plh-fade" style={fade(0.6)}>
          <rect
            x={FIELD.x0}
            y={FIELD.y0}
            width={FIELD.x1 - FIELD.x0}
            height={FIELD.y1 - FIELD.y0}
            fill="none"
            stroke={WF.dim}
            strokeWidth={1}
            strokeDasharray="5 7"
            opacity={0.6}
          />
        </g>

        {/* --- Dimension lines with empty value brackets --- */}

        {/* Overall width, above the field. Gap in the middle holds the value. */}
        <path
          className="plh-draw"
          style={draw(460, 0.65)}
          d={`M ${FIELD.x0} 72 L 309 72 M 353 72 L ${FIELD.x1} 72 M ${FIELD.x0} 65 L ${FIELD.x0} 79 M ${FIELD.x1} 65 L ${FIELD.x1} 79`}
          fill="none"
          stroke={WF.dim}
          strokeWidth={1.25}
          strokeLinecap="round"
        />
        <BlankValue x={331} y={79} />

        {/* Overall height, left of the field. */}
        <path
          className="plh-draw"
          style={draw(272, 0.72)}
          d={`M 66 ${FIELD.y0} L 66 216 M 66 260 L 66 ${FIELD.y1} M 59 ${FIELD.y0} L 73 ${FIELD.y0} M 59 ${FIELD.y1} L 73 ${FIELD.y1}`}
          fill="none"
          stroke={WF.dim}
          strokeWidth={1.25}
          strokeLinecap="round"
        />
        <BlankValue x={66} y={245} />

        {/* Partial width, below the field. */}
        <path
          className="plh-draw"
          style={draw(222, 0.79)}
          d={`M ${FIELD.x0} 406 L 191 406 M 236 406 L 331 406 M ${FIELD.x0} 399 L ${FIELD.x0} 413 M 331 399 L 331 413`}
          fill="none"
          stroke={WF.dim}
          strokeWidth={1.25}
          strokeLinecap="round"
        />
        <BlankValue x={213} y={413} />

        {/* A leader pointing at a detail that has not been specified yet. */}
        <path
          className="plh-draw"
          style={draw(110, 0.86)}
          d="M 150 150 L 250 126"
          fill="none"
          stroke={WF.dim}
          strokeWidth={1.25}
          strokeLinecap="round"
        />
        <g className="plh-fade" style={fade(1.05)}>
          <circle cx={150} cy={150} r={3} fill={WF.dim} />
        </g>
        <BlankValue x={264} y={133} anchor="start" />

        {/* --- "EN PRÉPARATION" stamp, angled across the empty field --- */}
        <g transform={`rotate(-12 ${STAMP.cx} ${STAMP.cy})`}>
          <g className="plh-stamp">
            <rect
              x={STAMP.cx - 170}
              y={STAMP.cy - 34}
              width={340}
              height={68}
              rx={4}
              fill="none"
              stroke={WF.accent}
              strokeWidth={2}
              strokeDasharray="10 6"
              opacity={0.45}
            />
            <text
              x={STAMP.cx}
              y={STAMP.cy + 10}
              textAnchor="middle"
              fontFamily={WF_FONT}
              fontSize={26}
              fontWeight={800}
              letterSpacing="0.14em"
              fill={WF.accent}
              opacity={0.55}
            >
              EN PRÉPARATION
            </text>
          </g>
        </g>

        {/* --- Cartouche / title block --- */}

        <path
          className="plh-draw"
          style={draw(800, 0.95)}
          d={`M ${BLOCK.x0} ${BLOCK.y0} L ${BLOCK.x1} ${BLOCK.y0} L ${BLOCK.x1} ${BLOCK.y1} L ${BLOCK.x0} ${BLOCK.y1} Z`}
          fill="none"
          stroke={WF.ink}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
        <path
          className="plh-draw"
          style={draw(650, 1.05)}
          d={`M ${BLOCK.x0} 424 L ${BLOCK.x1} 424 M ${BLOCK.x0} 470 L ${BLOCK.x1} 470 M 684 470 L 684 ${BLOCK.y1} M 778 470 L 778 ${BLOCK.y1}`}
          fill="none"
          stroke={WF.ink}
          strokeWidth={1}
        />

        {/* Header band — the state of the document. */}
        <text
          className="plh-fade"
          style={fade(1.25)}
          x={600}
          y={415}
          textAnchor="start"
          fontFamily={WF_FONT}
          fontSize={12}
          fontWeight={700}
          letterSpacing="0.22em"
          fill={WF.labelMuted}
        >
          DOCUMENT NON ÉMIS
        </text>

        {/* Title band — the only cell in this block that has a value. */}
        <text
          className="plh-fade"
          style={fade(1.25)}
          x={600}
          y={441}
          textAnchor="start"
          fontFamily={WF_FONT}
          fontSize={10}
          fontWeight={600}
          letterSpacing="0.2em"
          fill={WF.labelMuted}
        >
          TITRE
        </text>
        <text
          className="plh-fade"
          style={fade(1.3)}
          x={600}
          y={463}
          textAnchor="start"
          fontFamily={WF_FONT}
          fontSize={18}
          fontWeight={700}
          fill={WF.ink}
        >
          {title.toUpperCase()}
        </text>

        {/* Bottom band — révision / date / échelle, all still blank. */}
        <BlockCell x={600} label="RÉV." />
        <BlockCell x={694} label="DATE" />
        <BlockCell x={788} label="ÉCH." />
      </svg>
    </>
  );
}

/** A dimension value that has not been fixed yet. */
function BlankValue({
  x,
  y,
  anchor = 'middle',
}: {
  x: number;
  y: number;
  anchor?: 'start' | 'middle' | 'end';
}) {
  return (
    <text
      className="plh-value"
      x={x}
      y={y}
      textAnchor={anchor}
      fontFamily={WF_FONT}
      fontSize={20}
      fontWeight={700}
      fill={WF.label}
    >
      {BLANK}
    </text>
  );
}

/** One empty cell of the title block: a caption over a blank value. */
function BlockCell({ x, label }: { x: number; label: string }) {
  return (
    <>
      <text
        className="plh-fade"
        style={fade(1.3)}
        x={x}
        y={487}
        textAnchor="start"
        fontFamily={WF_FONT}
        fontSize={10}
        fontWeight={600}
        letterSpacing="0.16em"
        fill={WF.labelMuted}
      >
        {label}
      </text>
      <text
        className="plh-value"
        x={x}
        y={505}
        textAnchor="start"
        fontFamily={WF_FONT}
        fontSize={17}
        fontWeight={700}
        fill={WF.label}
      >
        {BLANK}
      </text>
    </>
  );
}

/* ---------- scoped animation stylesheet ----------
 * Every rule is namespaced `.plh-*` so it cannot leak out of this plate.
 *
 *  .plh-draw   solid construction lines; start fully offset and land at 0.
 *              `--plh-len` carries the path length, `--plh-delay` the stagger.
 *  .plh-fade   dashed linework and labels; a plain opacity ramp. Applied to
 *              wrapper <g> elements (never to a node carrying its own `opacity`
 *              attribute, which the CSS property would otherwise override).
 *  .plh-value  the blank "—" values: fade in, then breathe on a 3s cycle.
 *  .plh-stamp  the EN PRÉPARATION stamp: settles from a 7% oversize.
 *
 * `transform-origin` is given in user units and relies on the SVG default
 * `transform-box: view-box`, so it lands on the stamp centre without needing
 * `fill-box` support.
 *
 * Under prefers-reduced-motion everything is pinned to its final state: lines
 * drawn, stamp placed, no pulse, no movement. */
const PLATE_CSS = `
.plh-draw {
  stroke-dasharray: var(--plh-len);
  stroke-dashoffset: var(--plh-len);
  animation: plh-draw 1.2s cubic-bezier(0.22, 1, 0.36, 1) var(--plh-delay, 0s) forwards;
}
.plh-fade {
  opacity: 0;
  animation: plh-fade 0.7s ease-out var(--plh-delay, 0s) forwards;
}
.plh-value {
  opacity: 0;
  animation: plh-fade 0.6s ease-out 1.35s forwards,
             plh-breathe 3s ease-in-out 2s infinite;
}
.plh-stamp {
  opacity: 0;
  transform-origin: 331px 238px;
  animation: plh-stamp 0.8s cubic-bezier(0.22, 1, 0.36, 1) 1.55s forwards;
}
@keyframes plh-draw {
  to { stroke-dashoffset: 0; }
}
@keyframes plh-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes plh-breathe {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
@keyframes plh-stamp {
  from { opacity: 0; transform: scale(1.07); }
  to { opacity: 1; transform: scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .plh-draw {
    stroke-dasharray: none;
    stroke-dashoffset: 0;
    animation: none;
  }
  .plh-fade {
    opacity: 1;
    animation: none;
  }
  .plh-value {
    opacity: 1;
    animation: none;
  }
  .plh-stamp {
    opacity: 1;
    transform: none;
    animation: none;
  }
}
`;
