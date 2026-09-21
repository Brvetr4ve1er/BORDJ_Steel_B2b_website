import Image from 'next/image';
import { ExternalLink, Archive } from 'lucide-react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { KenBurns } from '@/components/ui/ken-burns';
import { VideoLoop } from '@/components/ui/video-loop';
import { pressItemsByDate, type PressItem } from '@/config/press-data';

/**
 * /media-center/actualites.
 *
 * Replaces the "Contenu à venir" placeholder with a REVUE DE PRESSE: articles
 * other people published that name the company. It is deliberately not dressed
 * up as a company news feed, because there is no company news to publish — see
 * the note at the top of `src/config/press-data.ts` for what was accepted,
 * what was rejected and why.
 *
 * Every card states its own evidence: the exact sentence naming Bordj Steel,
 * quoted from the article. A reader can check the claim without following the
 * link, and following the link is always possible.
 *
 * No publisher logos and no article images. The project deliberately removed
 * third-party image hotlinks (tests/media-integrity.test.ts fails if new ones
 * appear), and self-hosting a newspaper's masthead raises a rights question
 * this page does not need to answer. Text cards carry the same information.
 */
const HERO = {
  src: '/media/1495020689067-fda78dfb.webp',
  alt: 'Pile de journaux',
  aiHint: 'newspapers stack',
};

const KIND_LABEL: Record<PressItem['kind'], string> = {
  presse: 'Presse',
  communique: 'Communiqué',
};

/** French long date, e.g. "14 mars 2022". */
function frDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function PressCard({ item }: { item: PressItem }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-sm md:p-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
        <span className="text-sm font-semibold uppercase tracking-widest text-accent">
          {item.publisher}
        </span>
        <span aria-hidden="true" className="h-px w-6 bg-border" />
        <time dateTime={item.date} className="text-sm text-muted-foreground">
          {frDate(item.date)}
        </time>
        {/* The label is the point of this page: a press release relayed by an
            outlet is not the same thing as that outlet's journalism, and a
            visitor is entitled to see which one they are reading. */}
        <span
          className={
            item.kind === 'presse'
              ? 'rounded-full border border-accent/40 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-accent'
              : 'rounded-full border border-border px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-muted-foreground'
          }
        >
          {KIND_LABEL[item.kind]}
        </span>
      </div>

      {/* h3, not h2: the section above already owns the page's only h2, and a
          card headline is subordinate to it. */}
      <h3 className="mt-4 font-headline text-xl font-bold leading-snug text-primary md:text-2xl">
        {item.headline}
      </h3>

      <p className="mt-3 text-muted-foreground">{item.summary}</p>

      <blockquote className="mt-5 border-l-2 border-accent/50 pl-4 text-sm italic leading-relaxed text-foreground/80">
        {`« ${item.quote} »`}
      </blockquote>

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 pt-1">
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 hover:underline"
        >
          Lire l’article
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
        {item.archived ? (
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Archive className="h-3.5 w-3.5" aria-hidden="true" />
            Copie archivée — le site d’origine est inaccessible
          </span>
        ) : null}
      </div>
    </article>
  );
}

export function ActualitesPageContent() {
  const items = pressItemsByDate;
  const count = items.length;
  // Derived, not indexed: `noUncheckedIndexedAccess` makes items[0] possibly
  // undefined, and a template literal would have rendered that as "undefined"
  // rather than failing. Reduce gives a real string or nothing at all.
  const years = items.map((i) => i.date.slice(0, 4)).sort();
  const oldest = years.length ? years.reduce((a, b) => (a < b ? a : b)) : '';
  const newest = years.length ? years.reduce((a, b) => (a > b ? a : b)) : '';

  return (
    <>
      <section className="relative flex h-[60dvh] w-full items-center justify-center overflow-hidden p-0 text-white">
        <KenBurns variant="in" className="absolute inset-0 z-0">
          <Image
            src={HERO.src}
            alt={HERO.alt}
            fill
            className="object-cover"
            priority
            data-ai-hint={HERO.aiHint}
          />
        </KenBurns>
        {/* This loop was generated from the very photograph above, back when
            this route was the "Contenu à venir" placeholder. The placeholder is
            gone; the clip still matches its own still, so it keeps its job here
            rather than being orphaned. Same arrangement as the Media Center hub:
            between the photo (z-0) and the scrim, outside KenBurns so the drift
            and the clip's own camera move are not stacked. VideoLoop renders
            nothing server-side and declines under reduced motion, under 768px or
            on save-data, so the <Image> stays the LCP element. */}
        <VideoLoop
          src="/media/loops/placeholder-hero.mp4"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-black/60" />
        <div className="container relative z-20 mx-auto px-4 text-center">
          <AnimatedWrapper animation="zoom-in">
            <h1 className="font-headline text-6xl font-bold uppercase leading-tight tracking-tighter text-white md:text-8xl md:leading-tight">
              Actualités
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-200 md:text-2xl">
              Bordj Steel dans la presse.
            </p>
          </AnimatedWrapper>
        </div>
      </section>

      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <AnimatedWrapper animation="fade-in">
            <div className="mx-auto max-w-3xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                Revue de presse
              </p>
              <h2 className="mt-3 font-headline text-3xl font-bold uppercase tracking-tight text-primary md:text-4xl">
                Ce que la presse écrit sur nous
              </h2>
              <div className="mt-5 flex items-center gap-4">
                <span aria-hidden="true" className="h-px w-16 bg-accent" />
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {count === 1
                    ? `1 article — ${newest}`
                    : `${count} articles — ${oldest} à ${newest}`}
                </span>
              </div>
              <p className="mt-6 text-muted-foreground">
                Cette page rassemble des articles qui citent nommément Bordj Steel. Nous n’en
                sommes pas l’éditeur : chaque lien renvoie au média qui les a publiés, et chaque
                fiche reproduit la phrase exacte où notre nom apparaît.
              </p>
              <p className="mt-3 text-muted-foreground">
                Les articles signalés « Communiqué » sont des annonces émises par l’entreprise ou
                par le groupe Condor et reprises par le média ; ceux signalés « Presse » relèvent du
                travail éditorial du média lui-même.
              </p>
            </div>
          </AnimatedWrapper>

          <div className="mx-auto mt-12 grid max-w-5xl gap-8 md:grid-cols-2">
            {items.map((item, i) => (
              <AnimatedWrapper key={item.id} animation="fade-in-stagger" staggerIndex={i}>
                <PressCard item={item} />
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
