import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { KenBurns } from '@/components/ui/ken-burns';
import { companyData } from '@/config/company-data';
import { articles } from '@/config/blog-data';
import { WF, WF_FONT } from '@/components/wireframes/wf-theme';
import { cn } from '@/lib/utils';

/**
 * Body of `/media-center` — the hub route above the four Media Center sections.
 *
 * Everything a visitor reads here is derived, never authored twice:
 *   - the four section names and descriptions come verbatim from
 *     `companyData.navigation.mainMenu` (the "Media Center" entry's children),
 *     so renaming a section in config renames it here;
 *   - the blog card's count is `articles.length` from `@/config/blog-data`;
 *   - the "en ligne / en préparation" caption is counted off the list below.
 *
 * Honesty rule: `/media-center/actualites` and `/media-center/videos` have no
 * data at all today. They are rendered de-emphasised (dashed frame, reduced
 * opacity, "En préparation" badge) and are deliberately NOT links — a visitor is
 * never sent to a page we already know is empty.
 *
 * Server component: no hooks, no event handlers. All motion is CSS scoped to the
 * `.mch-*` classes, every animation pinned to its final state under
 * `prefers-reduced-motion: reduce`.
 */

type NavChild = { name: string; href: string; description: string; icon: string };

type Glyph = () => React.ReactElement;

type SectionStatus =
  | { kind: 'live'; cta: string; meta: string | null }
  | { kind: 'preparing'; note: string };

type SectionPlan = { href: string; Glyph: Glyph; status: SectionStatus };

type SectionCard = SectionPlan & { name: string; description: string };

/** The `mainMenu` entry that owns the Media Center children. */
const MEDIA_MENU_HREF = '/media-center/blog';

const ARTICLE_COUNT = articles.length;

/** "1 article" vs "N articles" — French pluralises from 2. */
const ARTICLE_META = `${ARTICLE_COUNT} article${ARTICLE_COUNT > 1 ? 's' : ''}`;

/**
 * Section order + real status. The labels are NOT here on purpose: they are read
 * from config so this file cannot drift from the navigation.
 */
const SECTION_PLAN: readonly SectionPlan[] = [
  {
    href: '/media-center/blog',
    Glyph: BlogGlyph,
    status: { kind: 'live', cta: 'Consulter le blog', meta: ARTICLE_META },
  },
  {
    href: '/media-center/gallery',
    Glyph: GalerieGlyph,
    status: { kind: 'live', cta: 'Voir la galerie', meta: null },
  },
  {
    href: '/media-center/actualites',
    Glyph: ActualitesGlyph,
    status: { kind: 'preparing', note: 'Aucune publication pour le moment.' },
  },
  {
    href: '/media-center/videos',
    Glyph: VideosGlyph,
    status: { kind: 'preparing', note: 'Aucune vidéo pour le moment.' },
  },
];

/** Children of the "Media Center" menu entry, or an empty list if config moves. */
function readMediaChildren(): readonly NavChild[] {
  for (const item of companyData.navigation.mainMenu) {
    if (item.href !== MEDIA_MENU_HREF) continue;
    const children = 'children' in item ? item.children : undefined;
    if (children) return children;
  }
  return [];
}

/** Joins the plan above with the config labels; a section missing from config is dropped. */
function buildSections(): readonly SectionCard[] {
  const children = readMediaChildren();
  const cards: SectionCard[] = [];
  for (const plan of SECTION_PLAN) {
    const nav = children.find((child) => child.href === plan.href);
    if (!nav) continue;
    cards.push({ ...plan, name: nav.name, description: nav.description });
  }
  return cards;
}

export function MediaCenterHubContent() {
  const sections = buildSections();
  const liveCount = sections.filter((section) => section.status.kind === 'live').length;
  const preparingCount = sections.length - liveCount;
  const caption =
    `${liveCount} section${liveCount > 1 ? 's' : ''} en ligne — ` +
    `${preparingCount} en préparation`;

  return (
    <>
      <style>{MCH_CSS}</style>

      <section className="relative h-[60vh] w-full flex items-center justify-center text-white overflow-hidden p-0">
        {/* The drift lives on the wrapper, which now owns the image's own
            `absolute inset-0 z-0`; the scrim and plate below still sit above it. */}
        <KenBurns variant="in" className="absolute inset-0 z-0">
          <Image
            src="/media/1585829365295-8c75ac1e.webp"
            alt="Espace médias Bordj Steel"
            fill
            className="object-cover"
            priority
            data-ai-hint="media center"
          />
        </KenBurns>
        <div className="absolute inset-0 bg-black/60 z-10" />
        <HeroPlate />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <AnimatedWrapper animation="zoom-in">
            <h1 className="font-headline text-6xl md:text-8xl leading-tight md:leading-tight lg:leading-tight font-bold tracking-tighter uppercase text-white">
              Media Center
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
              Explorez nos actualités, projets et ressources.
            </p>
          </AnimatedWrapper>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24" aria-labelledby="media-center-sections">
        <div className="container mx-auto px-4">
          <AnimatedWrapper animation="fade-in">
            <div className="mb-10 md:mb-14 max-w-2xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Sommaire
              </p>
              <h2
                id="media-center-sections"
                className="mt-3 font-headline text-4xl md:text-5xl font-bold uppercase tracking-tight text-primary"
              >
                Sections
              </h2>
              <div className="mt-5 flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-16 bg-accent" />
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {caption}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {sections.map((section, index) => (
                <AnimatedWrapper
                  key={section.href}
                  animation="fade-in-stagger"
                  staggerIndex={index}
                  className="h-full"
                >
                  <SectionPlate section={section} index={index} total={sections.length} />
                </AnimatedWrapper>
              ))}
            </div>
          </AnimatedWrapper>
        </div>
      </section>
    </>
  );
}

/* ---------- one card = one drafting plate ---------- */

function SectionPlate({
  section,
  index,
  total,
}: {
  section: SectionCard;
  index: number;
  total: number;
}) {
  const status = section.status;
  const isLive = status.kind === 'live';
  const plateRef = `${pad(index + 1)} / ${pad(total)}`;
  const SectionGlyph = section.Glyph;

  const shell =
    'mch-card relative flex h-full flex-col rounded-md border bg-card p-6 md:p-8';

  const body = (
    <>
      <PlateBrackets live={isLive} />

      <div className="flex items-center justify-between gap-4">
        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
          {plateRef}
        </span>
        {status.kind === 'preparing' ? (
          <span className="inline-flex items-center rounded-full border border-dashed border-border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
            En préparation
          </span>
        ) : status.meta ? (
          <span className="inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-primary">
            {status.meta}
          </span>
        ) : null}
      </div>

      <div className="mt-6 rounded-sm border border-border/70 bg-secondary/40 px-4 py-3">
        <SectionGlyph />
      </div>

      <h3 className="mt-6 font-headline text-2xl font-bold uppercase tracking-tight text-primary">
        {section.name}
      </h3>

      <span aria-hidden="true" className="relative mt-3 block h-px w-full bg-border">
        <span className="mch-underline absolute inset-y-0 left-0 block w-full bg-accent" />
      </span>

      <p className="mt-4 flex-1 text-muted-foreground">{section.description}</p>

      {status.kind === 'live' ? (
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent">
          {status.cta}
          <ArrowRight className="mch-arrow h-4 w-4" aria-hidden="true" />
        </span>
      ) : (
        <span className="mt-6 text-sm text-muted-foreground">{status.note}</span>
      )}
    </>
  );

  if (status.kind === 'live') {
    return (
      <Link
        href={section.href}
        className={cn(
          shell,
          'mch-live border-border shadow-sm hover:border-accent hover:shadow-lg',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        )}
      >
        {body}
      </Link>
    );
  }

  return <div className={cn(shell, 'border-dashed border-border opacity-70')}>{body}</div>;
}

function PlateBrackets({ live }: { live: boolean }) {
  const tone = live ? 'border-accent' : 'border-border';
  const base = cn('mch-bracket pointer-events-none absolute h-4 w-4', tone);
  return (
    <>
      <span aria-hidden="true" className={cn(base, 'mch-bracket-tl left-3 top-3 border-l-2 border-t-2')} />
      <span aria-hidden="true" className={cn(base, 'mch-bracket-tr right-3 top-3 border-r-2 border-t-2')} />
      <span aria-hidden="true" className={cn(base, 'mch-bracket-bl bottom-3 left-3 border-b-2 border-l-2')} />
      <span aria-hidden="true" className={cn(base, 'mch-bracket-br bottom-3 right-3 border-b-2 border-r-2')} />
    </>
  );
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

/* ---------- hero backdrop: a drafting plate over the photograph ---------- */

function HeroPlate() {
  const marks: ReadonlyArray<readonly [number, number]> = [
    [96, 96],
    [1504, 96],
    [96, 504],
    [1504, 504],
  ];

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <svg
        viewBox="0 0 1600 600"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <rect
          x={48}
          y={48}
          width={1504}
          height={504}
          fill="none"
          stroke={WF.steel}
          strokeWidth={1}
          strokeDasharray="10 8"
          opacity={0.3}
        />
        {marks.map(([cx, cy]) => (
          <path
            key={`${cx}-${cy}`}
            d={`M ${cx - 14} ${cy} L ${cx + 14} ${cy} M ${cx} ${cy - 14} L ${cx} ${cy + 14}`}
            stroke={WF.steel}
            strokeWidth={1.25}
            fill="none"
            opacity={0.35}
          />
        ))}
        <text
          x={48}
          y={578}
          textAnchor="start"
          fontFamily={WF_FONT}
          fontSize={13}
          fontWeight={600}
          letterSpacing="0.24em"
          fill={WF.steel}
          opacity={0.4}
        >
          BORDJ STEEL — MEDIA CENTER
        </text>
        <g className="mch-scan">
          <rect x={-8} y={48} width={16} height={504} fill={WF.accent} opacity={0.12} />
        </g>
      </svg>
    </div>
  );
}

/* ---------- bespoke section glyphs (WF drafting vernacular) ---------- */

function BlogGlyph() {
  return (
    <GlyphFrame label="Feuillets d'articles">
      <rect
        className="mch-glyph-move mch-sheet-2"
        x={22}
        y={20}
        width={54}
        height={54}
        fill="none"
        stroke={WF.dim}
        strokeWidth={1.25}
      />
      <rect
        className="mch-glyph-move mch-sheet-1"
        x={28}
        y={14}
        width={54}
        height={54}
        fill="none"
        stroke={WF.dim}
        strokeWidth={1.25}
      />
      <path
        d="M 34 8 L 74 8 L 88 22 L 88 62 L 34 62 Z"
        fill={WF.fill}
        stroke={WF.ink}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <path d="M 74 8 L 74 22 L 88 22" fill="none" stroke={WF.ink} strokeWidth={1.25} />
      <path d="M 42 30 L 64 30" stroke={WF.accent} strokeWidth={2.5} strokeLinecap="round" />
      <path
        d="M 42 40 L 80 40 M 42 47 L 80 47 M 42 54 L 68 54"
        stroke={WF.dim}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M 104 8 L 104 62 M 98 8 L 110 8 M 98 62 L 110 62"
        stroke={WF.dim}
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
      />
    </GlyphFrame>
  );
}

function GalerieGlyph() {
  const corners: ReadonlyArray<readonly [number, number, number, number]> = [
    [26, 14, 1, 1],
    [106, 14, -1, 1],
    [26, 66, 1, -1],
    [106, 66, -1, -1],
  ];
  return (
    <GlyphFrame label="Cadre de visée">
      <rect x={26} y={14} width={80} height={52} fill="none" stroke={WF.ink} strokeWidth={1.5} />
      <rect
        className="mch-glyph-move mch-aperture"
        x={38}
        y={23}
        width={56}
        height={34}
        fill={WF.fill}
        stroke={WF.dim}
        strokeWidth={1.25}
      />
      {corners.map(([x, y, sx, sy]) => (
        <path
          key={`${x}-${y}`}
          d={`M ${x + sx * 12} ${y} L ${x} ${y} L ${x} ${y + sy * 12}`}
          fill="none"
          stroke={WF.accent}
          strokeWidth={2}
          strokeLinecap="square"
        />
      ))}
      <path
        d="M 66 26 L 66 54 M 50 40 L 82 40"
        stroke={WF.dim}
        strokeWidth={1}
        strokeDasharray="4 4"
        fill="none"
      />
      <path
        d="M 26 76 L 106 76 M 26 70 L 26 82 M 106 70 L 106 82"
        stroke={WF.dim}
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
      />
    </GlyphFrame>
  );
}

function ActualitesGlyph() {
  return (
    <GlyphFrame label="Bloc de titrage">
      <rect x={22} y={10} width={88} height={16} fill={WF.fill} stroke={WF.ink} strokeWidth={1.25} />
      <path d="M 28 18 L 62 18" stroke={WF.accent} strokeWidth={3} strokeLinecap="round" />
      <path d="M 22 32 L 110 32 M 22 35 L 110 35" stroke={WF.ink} strokeWidth={1} fill="none" />
      <rect x={22} y={42} width={34} height={18} fill={WF.steel} opacity={0.45} />
      <path
        d="M 22 66 L 56 66 M 22 72 L 56 72 M 22 78 L 44 78"
        stroke={WF.dim}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      <path
        d="M 64 42 L 110 42 M 64 48 L 110 48 M 64 54 L 110 54 M 64 60 L 110 60 M 64 66 L 110 66 M 64 72 L 110 72 M 64 78 L 92 78"
        stroke={WF.dim}
        strokeWidth={1.25}
        strokeLinecap="round"
      />
      <path d="M 60 40 L 60 80" stroke={WF.dim} strokeWidth={1} strokeDasharray="3 4" fill="none" />
    </GlyphFrame>
  );
}

function VideosGlyph() {
  const holes = [16, 30, 44, 58];
  return (
    <GlyphFrame label="Fenêtre de projection">
      <rect x={22} y={10} width={88} height={62} fill="none" stroke={WF.ink} strokeWidth={1.5} />
      {holes.map((y) => (
        <React.Fragment key={y}>
          <rect x={27} y={y} width={8} height={8} rx={1} fill={WF.dim} opacity={0.65} />
          <rect x={97} y={y} width={8} height={8} rx={1} fill={WF.dim} opacity={0.65} />
        </React.Fragment>
      ))}
      <rect x={41} y={18} width={50} height={46} fill={WF.fill} stroke={WF.dim} strokeWidth={1.25} />
      <path d="M 59 30 L 78 41 L 59 52 Z" fill={WF.accent} opacity={0.75} />
      <path
        d="M 22 80 L 110 80 M 22 74 L 22 86 M 110 74 L 110 86"
        stroke={WF.dim}
        strokeWidth={1}
        fill="none"
        strokeLinecap="round"
      />
    </GlyphFrame>
  );
}

/** Shared canvas for the four glyphs so they sit on one baseline and one scale. */
function GlyphFrame({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 132 92"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={label}
      className="block h-[92px] w-full max-w-[176px]"
    >
      {children}
    </svg>
  );
}

/* ---------- scoped motion ----------
 * Hover on a LIVE plate: the four corner brackets snap out to the corners, the
 * accent rule under the title extends left→right, the arrow nudges and the
 * plate's own glyph shifts a hair. Everything is ≤ 300ms.
 *
 * The reduced-motion block repeats the hover selectors so it wins on specificity
 * and pins every element to its final state with no movement at all. The hero
 * scan-line is removed outright.
 */
const MCH_CSS = `
.mch-card {
  transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), border-color 260ms ease-out,
    box-shadow 260ms ease-out;
}
.mch-live:hover,
.mch-live:focus-visible {
  transform: translateY(-2px);
}
.mch-bracket {
  opacity: 0.35;
  transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1), opacity 240ms ease-out;
}
.mch-bracket-tl { transform: translate(7px, 7px); }
.mch-bracket-tr { transform: translate(-7px, 7px); }
.mch-bracket-bl { transform: translate(7px, -7px); }
.mch-bracket-br { transform: translate(-7px, -7px); }
.mch-live:hover .mch-bracket,
.mch-live:focus-visible .mch-bracket {
  opacity: 1;
  transform: translate(0, 0);
}
.mch-underline {
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1);
}
.mch-live:hover .mch-underline,
.mch-live:focus-visible .mch-underline {
  transform: scaleX(1);
}
.mch-arrow { transition: transform 240ms ease-out; }
.mch-live:hover .mch-arrow,
.mch-live:focus-visible .mch-arrow { transform: translateX(4px); }
.mch-glyph-move {
  transform-box: fill-box;
  transform-origin: center;
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), opacity 280ms ease-out;
}
.mch-live:hover .mch-sheet-1,
.mch-live:focus-visible .mch-sheet-1 { transform: translate(-3px, -2px); }
.mch-live:hover .mch-sheet-2,
.mch-live:focus-visible .mch-sheet-2 { transform: translate(-6px, -4px); }
.mch-live:hover .mch-aperture,
.mch-live:focus-visible .mch-aperture { transform: scale(1.06); }
.mch-scan {
  transform: translateX(-10%);
  animation: mch-scan 18s linear infinite;
  will-change: transform;
}
@keyframes mch-scan {
  0%   { transform: translateX(-10%); }
  100% { transform: translateX(110%); }
}
@media (prefers-reduced-motion: reduce) {
  .mch-card,
  .mch-bracket,
  .mch-underline,
  .mch-arrow,
  .mch-glyph-move {
    transition: none;
    animation: none;
  }
  .mch-live:hover,
  .mch-live:focus-visible { transform: none; }
  .mch-bracket,
  .mch-bracket-tl,
  .mch-bracket-tr,
  .mch-bracket-bl,
  .mch-bracket-br,
  .mch-live:hover .mch-bracket,
  .mch-live:focus-visible .mch-bracket {
    opacity: 0.75;
    transform: translate(0, 0);
  }
  .mch-underline,
  .mch-live:hover .mch-underline,
  .mch-live:focus-visible .mch-underline { transform: scaleX(1); }
  .mch-arrow,
  .mch-live:hover .mch-arrow,
  .mch-live:focus-visible .mch-arrow { transform: none; }
  .mch-glyph-move,
  .mch-live:hover .mch-sheet-1,
  .mch-live:focus-visible .mch-sheet-1,
  .mch-live:hover .mch-sheet-2,
  .mch-live:focus-visible .mch-sheet-2,
  .mch-live:hover .mch-aperture,
  .mch-live:focus-visible .mch-aperture {
    transform: none;
    animation: none;
  }
  .mch-scan {
    animation: none;
    display: none;
  }
}
`;
