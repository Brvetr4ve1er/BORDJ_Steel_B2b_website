import type { ReactNode } from 'react';

import { AnimatedWrapper } from '@/components/animated-wrapper';
import { companyData } from '@/config/company-data';
import { WF } from '@/components/wireframes/wf-theme';
import { cn } from '@/lib/utils';

const LAST_UPDATED = '2 juin 2026';

/**
 * Politique de Confidentialité.
 *
 * The legal prose is untouched. Every sentence below is the client's, moved out
 * of one long <article> and into the `sections` list so that the table of
 * contents and the document body are rendered from the same array and cannot
 * drift apart. Nothing is reworded, reordered or "normalised" — only the
 * structure around the text changed.
 *
 * Server component: no hooks, no handlers. The only motion is the shared
 * `AnimatedWrapper` scroll reveal used by the rest of the site.
 */
export function PrivacyPageContent() {
  const { contact } = companyData.pages;
  const email = contact.content.emails[0];

  const sections: readonly LegalSection[] = [
    {
      id: 'donnees-collectees',
      heading: 'Données que nous collectons',
      body: (
        <>
          <p>
            Ce site est un site vitrine. Nous ne créons pas de comptes utilisateurs et n'effectuons
            aucune vente en ligne. Les seules données personnelles collectées sont celles que vous
            nous transmettez volontairement via le formulaire de contact ou par e-mail :
          </p>
          <ul>
            <li>votre nom ;</li>
            <li>votre adresse e-mail ;</li>
            <li>le contenu de votre message.</li>
          </ul>
        </>
      ),
    },
    {
      id: 'utilisation-des-donnees',
      heading: 'Utilisation des données',
      body: (
        <p>
          Ces informations sont utilisées uniquement pour répondre à votre demande et assurer le
          suivi commercial correspondant. Elles ne sont ni vendues, ni louées, ni transmises à des
          tiers à des fins commerciales.
        </p>
      ),
    },
    {
      id: 'services-tiers',
      heading: 'Services tiers',
      body: (
        <p>
          Certaines pages intègrent une carte Google Maps afin d'afficher notre localisation. Le
          chargement de cette carte peut entraîner le dépôt de cookies par Google, conformément à
          la politique de confidentialité de ce service.
        </p>
      ),
    },
    {
      id: 'conservation-et-securite',
      heading: 'Conservation et sécurité',
      body: (
        <p>
          Les messages reçus sont conservés le temps nécessaire au traitement de votre demande.
          Nous mettons en œuvre des mesures raisonnables pour protéger ces données contre tout
          accès non autorisé.
        </p>
      ),
    },
    {
      id: 'vos-droits',
      heading: 'Vos droits',
      body: (
        <p>
          Vous pouvez demander l'accès, la rectification ou la suppression des données vous
          concernant en nous écrivant à{' '}
          <a className="text-accent underline underline-offset-4" href={`mailto:${email}`}>
            {email}
          </a>
          .
        </p>
      ),
    },
  ];

  return (
    <LegalDocument
      title="Politique de Confidentialité"
      lastUpdated={LAST_UPDATED}
      lead="Chez Bordj Steel, nous accordons de l'importance à la protection de votre vie privée. Cette politique décrit les données que ce site collecte et la manière dont elles sont utilisées."
      sections={sections}
      closing="Ce document est fourni à titre informatif. Bordj Steel se réserve le droit de le mettre à jour à tout moment."
    />
  );
}

/* ------------------------------------------------------------------ *
 * Shared legal-document shell                                        *
 *                                                                    *
 * Both legal pages (this one and Conditions d'Utilisation) use the   *
 * exact same structure, so the shell lives here and Terms imports    *
 * it — one shared treatment, two documents, no third module and no   *
 * second copy of the layout to keep in sync.                         *
 * ------------------------------------------------------------------ */

export type LegalSection = {
  /**
   * Anchor target. These end up in shared/bookmarked links, so treat them as
   * stable identifiers: rename a heading freely, but not the id.
   */
  id: string;
  heading: string;
  /** Semantic markup only (<p>, <ul>, <li>). Typography is applied here. */
  body: ReactNode;
};

export type LegalDocumentProps = {
  title: string;
  lastUpdated: string;
  /** Standfirst paragraph, above the first numbered section. */
  lead: ReactNode;
  sections: readonly LegalSection[];
  /** Optional note under the last section (e.g. an informative disclaimer). */
  closing?: ReactNode;
};

/**
 * A legal document rendered as a technical index + prose column.
 *
 * The index and the body come from the same `sections` array, so a section can
 * never exist in one without the other. Anchors are plain `<a href="#id">`
 * pointing at the `id` on each `<h2>`, so navigation works without JavaScript;
 * `scroll-mt-*` on the heading keeps it clear of the fixed navbar when jumped
 * to (the navbar is h-20 / md:h-24).
 */
export function LegalDocument({
  title,
  lastUpdated,
  lead,
  sections,
  closing,
}: LegalDocumentProps) {
  return (
    <>
      <style>{LEGAL_CSS}</style>

      <LegalHero title={title} lastUpdated={lastUpdated} />

      <div className="container mx-auto px-4 py-16 md:py-20">
        <div className="lg:grid lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          <LegalIndex sections={sections} />

          <article className="max-w-3xl">
            <AnimatedWrapper animation="fade-in">
              <p className="text-lg leading-relaxed text-foreground/90">{lead}</p>
            </AnimatedWrapper>

            <div className="mt-10 space-y-10 md:mt-12 md:space-y-14">
              {sections.map((section, index) => (
                <AnimatedWrapper
                  key={section.id}
                  animation="fade-in-stagger"
                  staggerIndex={index}
                >
                  <section aria-labelledby={section.id} className="border-t border-border pt-8">
                    <div className="flex items-baseline gap-4">
                      <span
                        aria-hidden="true"
                        className="shrink-0 font-code text-xs font-semibold tabular-nums tracking-[0.2em] text-muted-foreground"
                      >
                        {sheetNumber(index)}
                      </span>
                      <h2
                        id={section.id}
                        className="lgl-heading scroll-mt-28 font-headline text-2xl font-bold text-primary md:scroll-mt-36"
                      >
                        {section.heading}
                      </h2>
                    </div>

                    <div className="mt-5 space-y-4 leading-relaxed text-foreground/90 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1.5">
                      {section.body}
                    </div>
                  </section>
                </AnimatedWrapper>
              ))}
            </div>

            {closing ? (
              <AnimatedWrapper animation="fade-in">
                <p className="mt-12 border-t border-border pt-6 text-sm text-muted-foreground md:mt-14">
                  {closing}
                </p>
              </AnimatedWrapper>
            ) : null}
          </article>
        </div>
      </div>
    </>
  );
}

/** Positional sheet number: 01, 02, … Derived, never hand-maintained. */
function sheetNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/**
 * Hero. Deliberately quieter than the marketing pages: the same `bg-primary`
 * band, with the heading set inside a dashed drafting plate — corner
 * registration ticks and one faint rule separating the title from the revision
 * line, like the title block of a drawing. Nothing here moves.
 */
function LegalHero({ title, lastUpdated }: { title: string; lastUpdated: string }) {
  return (
    <section className="bg-primary pb-20 pt-32 text-primary-foreground md:pt-36">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <div className="relative max-w-4xl border border-dashed border-primary-foreground/25 px-6 py-8 md:px-10 md:py-10">
            <PlateCorner className="-left-px -top-px border-l border-t" />
            <PlateCorner className="-right-px -top-px border-r border-t" />
            <PlateCorner className="-bottom-px -left-px border-b border-l" />
            <PlateCorner className="-bottom-px -right-px border-b border-r" />

            <p className="font-code text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-primary-foreground/60">
              Document légal
            </p>

            <h1 className="mt-4 font-headline text-4xl font-bold uppercase tracking-tighter md:text-5xl">
              {title}
            </h1>

            <div
              aria-hidden="true"
              className="-mx-6 mt-8 border-t border-dashed border-primary-foreground/20 md:-mx-10"
            />

            <p className="mt-4 text-primary-foreground/70">Dernière mise à jour : {lastUpdated}</p>
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}

/** One corner registration tick of the hero plate. */
function PlateCorner({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute h-3 w-3 border-primary-foreground/50',
        className,
      )}
    />
  );
}

/**
 * The document index: a sticky sidebar from `lg` up, a plain list above the
 * prose below it. Styled as a drawing index — a hairline running down the
 * items that turns accent on the one under the cursor or keyboard focus.
 */
function LegalIndex({ sections }: { sections: readonly LegalSection[] }) {
  return (
    <nav aria-labelledby="legal-index-title" className="mb-12 lg:mb-0">
      <div className="lg:sticky lg:top-28">
        <h2
          id="legal-index-title"
          className="font-code text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-muted-foreground"
        >
          Sommaire
        </h2>

        <ol className="mt-4">
          {sections.map((section, index) => (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="group flex items-baseline gap-3 border-l-2 border-border py-2.5 pl-4 text-sm leading-snug text-muted-foreground transition-colors duration-200 hover:border-accent hover:text-primary focus-visible:border-accent focus-visible:text-primary motion-reduce:transition-none"
              >
                <span
                  aria-hidden="true"
                  className="shrink-0 font-code text-[0.7rem] font-semibold tabular-nums tracking-[0.18em] text-muted-foreground/70 transition-colors duration-200 group-hover:text-accent motion-reduce:transition-none"
                >
                  {sheetNumber(index)}
                </span>
                <span>{section.heading}</span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

/* ---------- scoped stylesheet ----------
 * One job: when a section has been jumped to from the index, its heading is
 * marked in the brand accent so the reader can see where they landed. `:target`
 * is a native pseudo-class, so this works with JavaScript disabled and needs no
 * client component. Namespaced `lgl-` so it cannot leak.
 *
 * The colour change is the only transition declared here; under
 * prefers-reduced-motion it is dropped and the colour simply snaps. */
const LEGAL_CSS = `
.lgl-heading {
  transition: color 200ms ease-out;
}
.lgl-heading:target {
  color: ${WF.accent};
}
@media (prefers-reduced-motion: reduce) {
  .lgl-heading {
    transition: none;
  }
}
`;
