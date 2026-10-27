import * as React from 'react';
import { AnimatedWrapper } from '@/components/animated-wrapper';

/**
 * The approvals and norms this unit actually works to.
 *
 * WHY THIS BAND EXISTS. Every item below was already on the page, but each was
 * buried inside one pillar's detail panel, behind a click. The SONELGAZ
 * homologation in particular is the strongest commercial fact on this page —
 * a competitor without it cannot supply BT/MT supports at all — and it was a
 * bullet point three interactions deep.
 *
 * NOTHING HERE IS NEW. Each line is lifted from
 * `charpente-metallique-data.ts`, where it is stated in the pillar it belongs
 * to:
 *
 *   SONELGAZ        pillar `supports`, notes — "Produits homologués par
 *                   SONELGAZ", with types 9T and BS for BT and MT transport.
 *   NF EN ISO 1461  pillar `supports`, notes — "Galvanisé au sein de notre
 *                   complexe selon la norme NF EN ISO 1461". The "au sein de
 *                   notre complexe" matters commercially and is kept.
 *   FEM             pillar `ponts-roulants`, technical table — "Conformité:
 *                   FEM (Fédération Européenne de la Manutention)".
 *   Ministère       pillar `automobile` — "agréé par le ministère de l'Énergie
 *                   et des Mines".
 *
 * No certificate number, no issue date and no scope wording is invented. Where
 * the client has not supplied a document, the claim stays exactly as broad as
 * the client already made it.
 */

type Credential = {
  /** The mark, as the client writes it. */
  name: string;
  /** What it covers, in the client's own terms. */
  scope: string;
};

const CREDENTIALS: readonly Credential[] = [
  {
    name: 'SONELGAZ',
    scope: 'Supports BT et MT homologués, types 9T (tubulaire) et BS (barres soudées).',
  },
  {
    name: 'NF EN ISO 1461',
    scope: 'Galvanisation à chaud réalisée au sein de notre propre complexe.',
  },
  {
    name: 'FEM',
    scope: 'Ponts roulants conformes à la Fédération Européenne de la Manutention.',
  },
  {
    name: 'Ministère de l’Énergie et des Mines',
    scope: 'Agrément pour la ligne de carrosserie automobile.',
  },
];

export function CredentialsBand() {
  return (
    <section className="border-y border-border bg-background py-14 md:py-20" aria-labelledby="charpente-credentials">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <div className="mb-10 max-w-3xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em] text-accent">
              Homologations et normes
            </p>
            <h2
              id="charpente-credentials"
              className="mt-3 font-headline text-3xl font-bold uppercase tracking-tight text-primary md:text-4xl"
            >
              Ce qui nous autorise à produire
            </h2>
          </div>

          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {CREDENTIALS.map((c) => (
              <div key={c.name} className="flex flex-col bg-background p-6">
                <dt className="font-headline text-lg font-bold leading-tight text-accent">{c.name}</dt>
                <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.scope}</dd>
              </div>
            ))}
          </dl>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
