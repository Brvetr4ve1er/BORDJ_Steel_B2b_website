// Hardcoded editorial/tabular content for the Chaudronnerie page, extracted
// verbatim from the page component so the JSX stays presentational.

export interface ChaudronnerieTableRow {
  capacite: number;
  format: string;
  epaisseur: number;
  longVirole: string;
  longTotale: string;
  poidsUnite: string;
  nbreTrous: string;
  pressionEpreuve: string;
}

export const geometricTableData: ChaudronnerieTableRow[] = [
  { capacite: 3, format: "1 250", epaisseur: 4, longVirole: "2 200.00", longTotale: "2 730.00", poidsUnite: "468,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
  { capacite: 5, format: "1 250", epaisseur: 5, longVirole: "3 850.00", longTotale: "4 290.00", poidsUnite: "469,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
  { capacite: 10, format: "1 900", epaisseur: 6, longVirole: "3 200.00", longTotale: "4 010.00", poidsUnite: "1 387,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
  { capacite: 15, format: "1 900", epaisseur: 6, longVirole: "5 000.00", longTotale: "5 810.00", poidsUnite: "1 908,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
  { capacite: 20, format: "2 500", epaisseur: 6, longVirole: "4 692.00", longTotale: "5 810.00", poidsUnite: "2 102,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
  { capacite: 30, format: "2 500", epaisseur: 6, longVirole: "5 700.00", longTotale: "6 742.00", poidsUnite: "2 909,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
  { capacite: 40, format: "3 000", epaisseur: 6, longVirole: "5 130.00", longTotale: "6 193.00", poidsUnite: "3 363,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
  { capacite: 50, format: "3 000", epaisseur: 6, longVirole: "6 560.00", longTotale: "7 626.00", poidsUnite: "4 133,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
  { capacite: 60, format: "3 000", epaisseur: 6, longVirole: "8 000.00", longTotale: "9 066.00", poidsUnite: "4 803,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
  { capacite: 100, format: "3 000", epaisseur: 6, longVirole: "13 600.00", longTotale: "14 886.00", poidsUnite: "7 611,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
];

export const chaudronnerieDrawingImages: string[] = [
  "/media/0576f18a52e3a3bb870dfe46089e-9d58a14a.webp",
  "/media/51a9e370aa2ddbb7439c177612e9-c1faf3df.webp",
  "/media/57a72be37dbd74bf3de07deacdf9-55a5229b.webp",
  "/media/6e10d64b38329f46cd84e03b5256-a3b7bb00.webp",
  "/media/2adf0bc95fdf6b023316e8b398fc-751250e7.webp",
  "/media/154d42e3d73c5e6fdac5e49213e0-a2a07589.webp",
  "/media/1167cd7b335b19a5d1695a0993b2-e6cd66f4.webp",
  "/media/222e41debeda041c6485c8d2ee91-930d5806.webp",
  "/media/7d80e268117ead2bd32b20f760c4-89cfe92b.webp",
  "/media/0b9e6f0a129b6b060b180e4a575a-5c7c4d8e.webp",
];

// Domaines d'activités — icon resolved by name in the component.
export const chaudronnerieActivities: { title: string; iconName: string }[] = [
  { title: 'Hydrocarbures', iconName: 'Flame' },
  { title: 'Énergie et Mines', iconName: 'Bolt' },
  { title: 'Hydraulique', iconName: 'Droplets' },
  { title: 'Pharmaceutique', iconName: 'Beaker' },
  { title: 'Travaux Publics', iconName: 'Construction' },
  { title: 'Environnement', iconName: 'Leaf' },
  { title: 'Traitement des Eaux', iconName: 'Filter' },
];

/**
 * Dimensional envelope of the standard buried-tank range, read off
 * `geometricTableData` rather than restated, so the page's wireframe and the
 * table under it cannot drift apart.
 *
 * UNITS. The table's own headers carry none; millimetres come from the client
 * plates the table mirrors — plate "CUVES ENTERREES STANDARD-MRC-MODEL 5M3"
 * dimensions its end view "Ø EXT: 1500" where this table writes a `format` of
 * "1 500". Capacity is deliberately absent: the page never prints a unit for
 * the `capacite` column (only the plate *titles* say 3M3 / 5M3), and the table
 * sits directly below the drawing anyway.
 */
export interface CuveRangeMm {
  min: number;
  max: number;
}

export interface CuveGeometry {
  /** Outside diameter — the FORMAT column. */
  diametre: CuveRangeMm;
  /** Shell-course length — LONGUEUR VIROLE. */
  virole: CuveRangeMm;
  /** Overall length, dished ends included — LONGUEUR TOTALE. */
  longueurTotale: CuveRangeMm;
  /** Plate thickness — ÉPAISSEUR. */
  epaisseur: CuveRangeMm;
  /** Test pressure, verbatim — null when the rows do not all agree on one. */
  pressionEpreuve: string | null;
}

/** Reads a dimension cell such as "13 600.00" (space-grouped thousands). */
function toMm(cell: string): number {
  const digits = cell.replace(/[^0-9.]/g, '');
  const value = Number(digits);
  if (digits === '' || !Number.isFinite(value)) {
    throw new Error(`chaudronnerie-tables: cannot read a dimension from "${cell}"`);
  }
  return value;
}

function range(values: number[]): CuveRangeMm {
  return { min: Math.min(...values), max: Math.max(...values) };
}

export function deriveCuveGeometry(rows: readonly ChaudronnerieTableRow[]): CuveGeometry {
  const pressions = new Set(rows.map((r) => r.pressionEpreuve));
  return {
    diametre: range(rows.map((r) => toMm(r.format))),
    virole: range(rows.map((r) => toMm(r.longVirole))),
    longueurTotale: range(rows.map((r) => toMm(r.longTotale))),
    epaisseur: range(rows.map((r) => r.epaisseur)),
    pressionEpreuve: pressions.size === 1 ? ([...pressions][0] ?? null) : null,
  };
}

export const cuveGeometry: CuveGeometry = deriveCuveGeometry(geometricTableData);

/** A millimetre value grouped the way the table above groups its own. */
export function formatMm(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/** A range as the drawing prints it: "1 250 à 3 000 mm". */
export function formatRangeMm(r: CuveRangeMm): string {
  return `${formatMm(r.min)} à ${formatMm(r.max)} mm`;
}
