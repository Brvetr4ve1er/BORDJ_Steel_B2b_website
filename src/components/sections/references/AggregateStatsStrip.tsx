import { AnimatedWrapper } from '@/components/animated-wrapper';
import { companyData } from '@/config/company-data';
import { Building2, Grid3x3, Layers, Weight } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

/**
 * Parses the leading integer from a French-formatted metric string such as
 * "2000 tonnes", "1 200 tonnes", or "6500 m² (Classe M1 PIR)". Strips any
 * non-digit characters from the leading numeric run so parenthetical
 * qualifiers never derail the parse. Returns 0 for undefined or empty input.
 */
function parseLeadingInteger(value: string | undefined): number {
  if (!value) return 0;
  const match = value.match(/^\s*([\d\s]+)/);
  const raw = match?.[1];
  if (!raw) return 0;
  const digits = raw.replace(/\D/g, '');
  if (digits.length === 0) return 0;
  const parsed = Number.parseInt(digits, 10);
  return Number.isFinite(parsed) ? parsed : 0;
}

type Tile = {
  readonly icon: LucideIcon;
  readonly value: number;
  readonly unit: string;
};

/**
 * "Nos réalisations en chiffres" — a server-rendered stat strip that COMPUTES
 * totals from `companyData.pages.references.projects[].details`, so the
 * displayed figures cannot drift from the project cards rendered below.
 * No count-up animation: the number is final on first paint; only the
 * scroll-triggered fade is animated via <AnimatedWrapper>.
 */
export function AggregateStatsStrip() {
  const projects = companyData.pages.references.projects;

  const totals = projects.reduce(
    (acc, project) => {
      acc.tonnage += parseLeadingInteger(project.details?.tonnage);
      acc.couverture += parseLeadingInteger(project.details?.couverture);
      acc.bardage += parseLeadingInteger(project.details?.bardage);
      return acc;
    },
    { tonnage: 0, couverture: 0, bardage: 0 },
  );

  const tiles: readonly Tile[] = [
    { icon: Building2, value: projects.length, unit: 'projets' },
    { icon: Weight, value: totals.tonnage, unit: 'tonnes livrées' },
    { icon: Layers, value: totals.couverture, unit: 'm² couverts' },
    { icon: Grid3x3, value: totals.bardage, unit: 'm² bardés' },
  ];

  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <div className="mb-12 md:mb-16 max-w-3xl">
            <h2 className="font-headline text-4xl md:text-5xl text-primary tracking-tight">
              Nos réalisations en chiffres
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Volumes cumulés des projets présentés ci-dessous.
            </p>
          </div>
        </AnimatedWrapper>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-8">
          {tiles.map((tile, index) => {
            const Icon = tile.icon;
            return (
              <AnimatedWrapper
                key={tile.unit}
                animation="fade-in-stagger"
                staggerIndex={index}
              >
                <div className="flex h-full flex-col border-l-4 border-accent bg-secondary/40 px-6 py-6">
                  <Icon
                    className="mb-8 h-6 w-6 text-accent"
                    aria-hidden="true"
                    strokeWidth={1.75}
                  />
                  <div className="mt-auto">
                    <div className="font-headline text-5xl leading-none tabular-nums text-primary md:text-6xl">
                      {tile.value.toLocaleString('fr-FR')}
                    </div>
                    <div className="mt-3 text-sm uppercase tracking-wider text-muted-foreground">
                      {tile.unit}
                    </div>
                  </div>
                </div>
              </AnimatedWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
