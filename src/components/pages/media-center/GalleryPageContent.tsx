"use client";

/**
 * /media-center/gallery — the real photo gallery.
 *
 * WHY THIS WHOLE MODULE IS A CLIENT MODULE
 * The category filter needs `useState` and framer-motion's `useReducedMotion`,
 * and a module carrying `"use client"` makes every export in it a client
 * component. Everything outside the filter (hero, plate, tiles) is static markup
 * with no handlers of its own, so it still server-renders on first paint; the
 * only interactive leaves are the filter chips and the lightbox triggers.
 *
 * WHERE THE PHOTOS COME FROM
 * Not one `/media/...` path is typed in this file. Every tile is derived by
 * mapping over config:
 *   - companyData.pages.references.projects  -> getProjectImage(imageKey)
 *   - companyData.pages.units.items          -> getFacilityImage(imageKey)
 *   - charpenteMetalliqueData.hero / .pillars[].galleryImages
 *   - charpenteGalleryImages
 *   - chaudronnerieData.hero / .products[].galleryImages
 * The same photograph is reused by several config entries, so tiles are
 * de-duplicated by `src` on a first-wins basis, in the priority order above:
 * a named reference project is the most specific description a photo can carry,
 * so it wins over the generic "charpente" strip that reuses the same file.
 *
 * Counts shown in the UI are computed from that assembled list — never typed.
 */

import * as React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Maximize2 } from 'lucide-react';

import { AnimatedWrapper } from '@/components/animated-wrapper';
import { ImageDialog } from '@/components/ui/image-dialog';
import { KenBurns } from '@/components/ui/ken-burns';
import { VideoLoop } from '@/components/ui/video-loop';
import { WF, WF_FONT } from '@/components/wireframes/wf-theme';
import { cn } from '@/lib/utils';
import { companyData, getFacilityImage, getProjectImage } from '@/config/company-data';
import { charpenteGalleryImages, charpenteMetalliqueData } from '@/config/charpente-metallique-data';
import { chaudronnerieData } from '@/config/chaudronnerie-data';

/* -------------------------------------------------------------------------- */
/* Data assembly (module scope — runs once, identical on server and client)    */
/* -------------------------------------------------------------------------- */

const CATEGORIES = [
  'Projets',
  'Unités de production',
  'Charpente métallique',
  'Chaudronnerie',
] as const;

type Category = (typeof CATEGORIES)[number];

const ALL = 'Toutes';
type Filter = typeof ALL | Category;

type Tile = {
  /** Resolved from config. Never hand-written. */
  src: string;
  /** Meaningful French alt: the config's own alt when it has one, else derived. */
  alt: string;
  /** Short label shown in the hover caption bar under the category. */
  caption: string;
  category: Category;
  blurDataUrl?: string;
};

function buildTiles(): Tile[] {
  const seen = new Set<string>();
  const tiles: Tile[] = [];

  /** Returns false when the photo was already contributed by an earlier source. */
  const push = (tile: Tile): boolean => {
    if (seen.has(tile.src)) return false;
    seen.add(tile.src);
    tiles.push(tile);
    return true;
  };

  // 1. Named reference projects — the most specific caption a photo can have.
  for (const project of companyData.pages.references.projects) {
    const image = getProjectImage(project.imageKey);
    push({
      src: image.src,
      alt: image.alt ?? `Projet ${project.name}`,
      caption: project.name,
      category: 'Projets',
      blurDataUrl: image.blurDataUrl,
    });
  }

  // 2. Production units.
  for (const unit of companyData.pages.units.items) {
    const image = getFacilityImage(unit.imageKey);
    push({
      src: image.src,
      alt: image.alt ?? `Unité de production — ${unit.title}`,
      caption: unit.title,
      category: 'Unités de production',
      blurDataUrl: image.blurDataUrl,
    });
  }

  // 3. Charpente métallique — hero, then each pillar's own gallery, then the
  //    "Nos Projets" strip.
  push({
    src: charpenteMetalliqueData.hero.image_url,
    alt: charpenteMetalliqueData.hero.alt,
    caption: charpenteMetalliqueData.hero.title,
    category: 'Charpente métallique',
    blurDataUrl: charpenteMetalliqueData.hero.blurDataUrl,
  });
  for (const pillar of charpenteMetalliqueData.pillars) {
    for (const src of pillar.galleryImages) {
      // The pillar title is the most accurate description available for a bare
      // path that carries no alt of its own.
      push({
        src,
        alt: `Réalisation : ${pillar.title}`,
        caption: pillar.title,
        category: 'Charpente métallique',
      });
    }
  }
  // Numbered against what actually survives de-duplication, so the alt text has
  // no gaps where a photo was already claimed by a named project above.
  let charpenteStripIndex = 0;
  for (const src of charpenteGalleryImages) {
    const added = push({
      src,
      alt: `Réalisation en charpente métallique ${charpenteStripIndex + 1}`,
      caption: 'Charpente métallique',
      category: 'Charpente métallique',
    });
    if (added) charpenteStripIndex += 1;
  }

  // 4. Chaudronnerie — hero, then each product family's gallery (these entries
  //    are objects and already carry their own French alt).
  push({
    src: chaudronnerieData.hero.image_url,
    alt: chaudronnerieData.hero.alt,
    caption: chaudronnerieData.hero.title,
    category: 'Chaudronnerie',
    blurDataUrl: chaudronnerieData.hero.blurDataUrl,
  });
  for (const product of Object.values(chaudronnerieData.products)) {
    for (const image of product.galleryImages) {
      push({
        src: image.src,
        alt: image.alt,
        caption: product.title,
        category: 'Chaudronnerie',
        blurDataUrl: image.blurDataUrl,
      });
    }
  }

  return tiles;
}

/**
 * Round-robins the categories so the unfiltered "Toutes" view reads as a mixed
 * gallery instead of four solid blocks. Deterministic — no randomness, so the
 * server and client markup match.
 */
function interleaveByCategory(tiles: readonly Tile[]): Tile[] {
  const buckets = CATEGORIES.map((category) => tiles.filter((t) => t.category === category));
  const longest = buckets.reduce((max, bucket) => Math.max(max, bucket.length), 0);
  const out: Tile[] = [];
  for (let i = 0; i < longest; i += 1) {
    for (const bucket of buckets) {
      const tile = bucket[i];
      if (tile) out.push(tile);
    }
  }
  return out;
}

const TILES: readonly Tile[] = interleaveByCategory(buildTiles());

/** Only categories that actually produced tiles get a chip. */
const AVAILABLE_CATEGORIES: readonly Category[] = CATEGORIES.filter((category) =>
  TILES.some((tile) => tile.category === category),
);

const FILTERS: readonly Filter[] = [ALL, ...AVAILABLE_CATEGORIES];

const COUNT_BY_FILTER: ReadonlyMap<Filter, number> = new Map<Filter, number>([
  [ALL, TILES.length],
  ...AVAILABLE_CATEGORIES.map(
    (category): [Filter, number] => [category, TILES.filter((t) => t.category === category).length],
  ),
]);

/**
 * Masonry rhythm. Derived from a stable hash of the file path rather than the
 * render index, so a tile keeps exactly the same height whichever filter is
 * active and the layout animation only ever has to move it, never resize it.
 */
function isTallTile(src: string): boolean {
  let hash = 0;
  for (let i = 0; i < src.length; i += 1) {
    hash = (hash * 31 + src.charCodeAt(i)) >>> 0;
  }
  return hash % 5 < 2;
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

export function GalleryPageContent() {
  const [activeFilter, setActiveFilter] = React.useState<Filter>(ALL);
  const prefersReducedMotion = useReducedMotion();
  const animate = !prefersReducedMotion;

  const visibleTiles = React.useMemo(
    () => (activeFilter === ALL ? [...TILES] : TILES.filter((tile) => tile.category === activeFilter)),
    [activeFilter],
  );

  return (
    <>
      <style>{GALLERY_CSS}</style>

      {/* ---------------------------------------------------------------- */}
      {/* Hero — same shape as the other interior pages, with a drafting    */}
      {/* plate laid over the photograph.                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative h-[60dvh] w-full flex items-center justify-center text-white overflow-hidden p-0">
        {/* The drift lives on the wrapper, which now owns the image's own
            `absolute inset-0 z-0`; the scrim below still sits above it. */}
        <KenBurns variant="left" className="absolute inset-0 z-0">
          <Image
            src={HERO_IMAGE.src}
            alt={HERO_IMAGE.alt}
            fill
            className="object-cover"
            priority
            data-ai-hint={HERO_IMAGE.aiHint}
          />
        </KenBurns>
        {/* Ambient loop generated from the hero photograph itself, sitting between
            the photo (z-0) and the scrim — so the scrim, the drafting plate and all
            copy still read exactly as they do over the still. VideoLoop renders
            nothing on the server and declines entirely under reduced motion, under
            768px, or on a save-data connection, so the <Image> above stays the LCP
            element and the real content. Deliberately NOT inside KenBurns: the clip
            already carries its own camera move and nesting it inside the drift would
            double the motion. Hero only — the masonry tiles below keep their stills. */}
        <VideoLoop
          src="/media/loops/gallery-hero.mp4"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <GalleryHeroPlate />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <AnimatedWrapper animation="zoom-in">
            <h1 className="font-headline text-6xl md:text-8xl leading-tight md:leading-tight lg:leading-tight font-bold tracking-tighter uppercase text-white">
              Galerie
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
              Explorez nos réalisations en images.
            </p>
          </AnimatedWrapper>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Filter rail — sticks under the fixed navbar (h-20 / md:h-24).     */}
      {/* ---------------------------------------------------------------- */}
      <section className="sticky top-20 z-30 border-y border-border bg-background/90 py-0 backdrop-blur md:top-24">
        <div className="container mx-auto px-4 py-4 md:py-5">
          <div
            role="group"
            aria-label="Filtrer la galerie par catégorie"
            className="flex flex-wrap items-center gap-2"
          >
            {FILTERS.map((filter) => {
              const isActive = filter === activeFilter;
              const count = COUNT_BY_FILTER.get(filter) ?? 0;
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={isActive}
                  aria-controls="gallery-grid"
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    'inline-flex items-center gap-2 rounded-sm border px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-200 md:px-4 md:text-sm',
                    isActive
                      ? 'border-accent bg-accent text-accent-foreground'
                      : 'border-border bg-background text-muted-foreground hover:border-accent hover:text-primary',
                  )}
                >
                  <span>{filter}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      'rounded-sm px-1.5 py-0.5 font-code text-[11px] leading-none tabular-nums',
                      isActive ? 'bg-black/20 text-accent-foreground' : 'bg-secondary text-muted-foreground',
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Technical readout: a drafting-style status line, all values computed. */}
          <div className="mt-4 flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-border"
              style={{ backgroundImage: `repeating-linear-gradient(90deg, ${WF.dim} 0 6px, transparent 6px 12px)` }}
            />
            <p
              aria-live="polite"
              className="font-code text-[11px] uppercase tracking-[0.2em] text-muted-foreground"
            >
              {`Sélection : ${activeFilter} — ${visibleTiles.length} vue${visibleTiles.length > 1 ? 's' : ''}`}
            </p>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Grid                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-background">
        <div className="container mx-auto px-4">
          {visibleTiles.length === 0 ? (
            <EmptyState />
          ) : (
            <div
              id="gallery-grid"
              className="grid grid-flow-row-dense auto-rows-[4.5rem] grid-cols-2 gap-3 sm:auto-rows-[5.5rem] md:grid-cols-3 md:gap-4 lg:auto-rows-[6.5rem] xl:grid-cols-4"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {visibleTiles.map((tile) => (
                  <GalleryTile key={tile.src} tile={tile} animate={animate} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* -------------------------------------------------------------------------- */
/* Hero image                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * The photograph the live /media-center/gallery route already ships. Kept here
 * verbatim so swapping the placeholder for this component does not change the
 * hero visitors have been seeing; the file is present in public/media and is
 * covered by tests/media-integrity.test.ts.
 */
const HERO_IMAGE = {
  src: '/media/1534353436294-2afca52f.webp',
  alt: 'Galerie de réalisations Bordj Steel',
  aiHint: 'photo gallery',
} as const;

/* -------------------------------------------------------------------------- */
/* Hero drafting plate                                                         */
/* -------------------------------------------------------------------------- */

/**
 * Low-opacity shop-drawing plate over the hero photograph: dashed frame, corner
 * registration crosses, a ticked rule, and a cartouche whose numbers are read
 * off the assembled tile list. Decorative only — `aria-hidden`, never clickable.
 */
function GalleryHeroPlate() {
  const ticks = Array.from({ length: 15 }, (_, i) => 120 + i * 96);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <svg
        viewBox="0 0 1600 500"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        {/* Drafting frame */}
        <rect
          className="gal-plate-draw"
          x={40}
          y={40}
          width={1520}
          height={420}
          fill="none"
          stroke={WF.steel}
          strokeWidth={1.25}
          strokeDasharray="10 8"
          opacity={0.4}
        />

        {/* Corner registration crosses */}
        {(
          [
            [40, 40],
            [1560, 40],
            [40, 460],
            [1560, 460],
          ] as ReadonlyArray<readonly [number, number]>
        ).map(([cx, cy]) => (
          <g className="gal-plate-fade" key={`${cx}-${cy}`} opacity={0.55}>
            <path
              d={`M ${cx - 14} ${cy} L ${cx + 14} ${cy} M ${cx} ${cy - 14} L ${cx} ${cy + 14}`}
              stroke={WF.accent}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
            <circle cx={cx} cy={cy} r={7} fill="none" stroke={WF.steel} strokeWidth={1} opacity={0.7} />
          </g>
        ))}

        {/* Ticked rule across the top of the plate */}
        <g className="gal-plate-draw" opacity={0.35}>
          <path d="M 120 92 L 1480 92" stroke={WF.steel} strokeWidth={1} fill="none" />
          {ticks.map((x, i) => (
            <path
              key={x}
              d={`M ${x} 92 L ${x} ${i % 5 === 0 ? 108 : 101}`}
              stroke={WF.steel}
              strokeWidth={1}
              fill="none"
            />
          ))}
        </g>

        {/* Cartouche — left label, right readout. Both derived, not typed. */}
        <text
          className="gal-plate-fade"
          x={56}
          y={430}
          textAnchor="start"
          fontFamily={WF_FONT}
          fontSize={13}
          fontWeight={700}
          letterSpacing="0.24em"
          fill={WF.steel}
          opacity={0.6}
        >
          GALERIE PHOTOGRAPHIQUE
        </text>
        <text
          className="gal-plate-fade"
          x={1544}
          y={430}
          textAnchor="end"
          fontFamily={WF_FONT}
          fontSize={13}
          fontWeight={700}
          letterSpacing="0.24em"
          fill={WF.steel}
          opacity={0.6}
        >
          {`${TILES.length} VUES · ${AVAILABLE_CATEGORIES.length} CATÉGORIES`}
        </text>

        {/* Ambient accent scan-line */}
        <g className="gal-scan">
          <rect x={-8} y={40} width={16} height={420} fill={WF.accent} opacity={0.12} />
        </g>
      </svg>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Tile                                                                        */
/* -------------------------------------------------------------------------- */

const BRACKETS = [
  { key: 'tl', className: 'gal-bracket-tl left-2 top-2 border-l-2 border-t-2' },
  { key: 'tr', className: 'gal-bracket-tr right-2 top-2 border-r-2 border-t-2' },
  { key: 'br', className: 'gal-bracket-br bottom-2 right-2 border-b-2 border-r-2' },
  { key: 'bl', className: 'gal-bracket-bl bottom-2 left-2 border-b-2 border-l-2' },
] as const;

function GalleryTile({ tile, animate }: { tile: Tile; animate: boolean }) {
  const tall = isTallTile(tile.src);

  return (
    <motion.div
      layout={animate}
      initial={animate ? { opacity: 0, scale: 0.96 } : false}
      animate={{ opacity: 1, scale: 1 }}
      exit={animate ? { opacity: 0, scale: 0.97 } : { opacity: 0 }}
      transition={
        animate
          ? { duration: 0.26, ease: [0.22, 1, 0.36, 1] }
          : { duration: 0 }
      }
      className={cn('relative', tall ? 'row-span-4' : 'row-span-3')}
    >
      <ImageDialog imageUrl={tile.src} alt={tile.alt}>
        <button
          type="button"
          className="gal-tile group relative block h-full w-full cursor-pointer overflow-hidden rounded-sm border border-border bg-secondary p-0 text-left"
        >
          <Image
            src={tile.src}
            alt={tile.alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="gal-photo object-cover"
            {...(tile.blurDataUrl
              ? ({ placeholder: 'blur', blurDataURL: tile.blurDataUrl } as const)
              : {})}
          />

          {/* Hover scrim — same pattern as Facilities.tsx. */}
          <span className="gal-scrim pointer-events-none absolute inset-0 block bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

          {/* Shop-drawing registration brackets tracing in from each corner. */}
          {BRACKETS.map((bracket) => (
            <span
              key={bracket.key}
              aria-hidden="true"
              className={cn('gal-bracket pointer-events-none absolute block h-6 w-6', bracket.className)}
              style={{ borderColor: WF.accent }}
            />
          ))}

          {/* Lightbox affordance. */}
          <span className="gal-zoom pointer-events-none absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-sm bg-black/45 text-white backdrop-blur-sm">
            <Maximize2 className="h-4 w-4" aria-hidden="true" />
          </span>

          {/* Caption bar: category label above the specific source. */}
          <span className="gal-caption pointer-events-none absolute inset-x-0 bottom-0 block px-3 pb-3 pt-6">
            <span
              className="gal-rule mb-2 block h-[2px] w-full origin-left"
              style={{ backgroundColor: WF.accent }}
            />
            <span className="block font-code text-[10px] uppercase tracking-[0.2em] text-white/70">
              {tile.category}
            </span>
            <span className="mt-1 block truncate text-sm font-semibold leading-snug text-white">
              {tile.caption}
            </span>
          </span>
        </button>
      </ImageDialog>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* Empty state                                                                 */
/* -------------------------------------------------------------------------- */

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-border bg-secondary/40 px-6 py-20 text-center">
      <span
        aria-hidden="true"
        className="mb-6 block h-10 w-10 rounded-sm border-2"
        style={{ borderColor: WF.dim }}
      />
      <h2 className="font-headline text-xl font-bold uppercase tracking-wide text-primary">
        Aucune vue dans cette catégorie
      </h2>
      <p className="mt-3 max-w-md text-muted-foreground">
        Sélectionnez une autre catégorie pour afficher les photographies disponibles.
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Scoped stylesheet                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Everything is namespaced under `.gal-*` so it cannot leak. Under
 * `prefers-reduced-motion: reduce` the hover reveals still happen — instantly,
 * with every transition and transform removed, so no element moves.
 */
const GALLERY_CSS = `
.gal-photo {
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1);
}
.gal-tile:hover .gal-photo,
.gal-tile:focus-visible .gal-photo {
  transform: scale(1.05);
}

.gal-scrim,
.gal-zoom {
  opacity: 0;
  transition: opacity 260ms ease-out;
}
.gal-tile:hover .gal-scrim,
.gal-tile:focus-visible .gal-scrim,
.gal-tile:hover .gal-zoom,
.gal-tile:focus-visible .gal-zoom {
  opacity: 1;
}

.gal-bracket {
  opacity: 0;
  transform: scale(0.3);
  transition: opacity 200ms ease-out, transform 340ms cubic-bezier(0.22, 1, 0.36, 1);
}
.gal-tile:hover .gal-bracket,
.gal-tile:focus-visible .gal-bracket {
  opacity: 1;
  transform: scale(1);
}
.gal-bracket-tl { transform-origin: top left; }
.gal-bracket-tr { transform-origin: top right; transition-delay: 45ms; }
.gal-bracket-br { transform-origin: bottom right; transition-delay: 90ms; }
.gal-bracket-bl { transform-origin: bottom left; transition-delay: 135ms; }

.gal-caption {
  opacity: 0;
  transform: translateY(100%);
  transition: opacity 240ms ease-out, transform 340ms cubic-bezier(0.22, 1, 0.36, 1);
}
.gal-tile:hover .gal-caption,
.gal-tile:focus-visible .gal-caption {
  opacity: 1;
  transform: translateY(0);
}

.gal-rule {
  transform: scaleX(0);
  transition: transform 420ms cubic-bezier(0.22, 1, 0.36, 1) 80ms;
}
.gal-tile:hover .gal-rule,
.gal-tile:focus-visible .gal-rule {
  transform: scaleX(1);
}

.gal-plate-draw {
  stroke-dasharray: 3000;
  stroke-dashoffset: 3000;
  animation: gal-plate-draw 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.2s forwards;
}
.gal-plate-fade {
  opacity: 0;
  animation: gal-plate-fade 0.9s ease-out 0.7s forwards;
}
.gal-scan {
  transform: translateX(-12%);
  animation: gal-scan 18s linear infinite;
  will-change: transform;
}
@keyframes gal-plate-draw { to { stroke-dashoffset: 0; } }
@keyframes gal-plate-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes gal-scan {
  0%   { transform: translateX(-12%); }
  100% { transform: translateX(112%); }
}

@media (prefers-reduced-motion: reduce) {
  .gal-photo,
  .gal-scrim,
  .gal-zoom,
  .gal-bracket,
  .gal-caption,
  .gal-rule {
    transition: none;
  }
  .gal-tile:hover .gal-photo,
  .gal-tile:focus-visible .gal-photo {
    transform: none;
  }
  .gal-bracket,
  .gal-tile:hover .gal-bracket,
  .gal-tile:focus-visible .gal-bracket {
    transform: none;
  }
  .gal-caption,
  .gal-tile:hover .gal-caption,
  .gal-tile:focus-visible .gal-caption {
    transform: none;
  }
  .gal-rule,
  .gal-tile:hover .gal-rule,
  .gal-tile:focus-visible .gal-rule {
    transform: scaleX(1);
  }
  .gal-plate-draw {
    stroke-dasharray: 0;
    stroke-dashoffset: 0;
    animation: none;
  }
  .gal-plate-fade {
    opacity: 1;
    animation: none;
  }
  .gal-scan {
    animation: none;
    display: none;
  }
}
`;
