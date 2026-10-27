/**
 * The chaudronnerie wireframe prints the dimensional envelope of the standard
 * buried-tank range. Those cotes are not written in the drawing — they are read
 * off `geometricTableData`, the same table the page renders a few sections
 * below the figure, so the two cannot disagree.
 *
 * These tests pin that derivation. They assert nothing about the SVG: what
 * matters is that the numbers the drawing is handed are the table's own, and
 * that they stay the table's own if a row is edited.
 */
import { describe, it, expect } from 'vitest';
import {
  cuveGeometry,
  deriveCuveGeometry,
  formatMm,
  formatRangeMm,
  geometricTableData,
  type ChaudronnerieTableRow,
} from '@/config/chaudronnerie-tables';

/** The table's own cells, parsed independently of the helper under test. */
function column(key: 'format' | 'longVirole' | 'longTotale'): number[] {
  return geometricTableData.map((r) => Number(r[key].split(' ').join('')));
}

/**
 * A row written out in full rather than spread off the real table: the
 * degenerate cases below need a row shape, not this product's actual figures,
 * and spelling it out keeps them readable when the table changes.
 */
const sampleRow: ChaudronnerieTableRow = {
  capacite: 3,
  format: '1 250',
  epaisseur: 4,
  longVirole: '2 200.00',
  longTotale: '2 730.00',
  poidsUnite: '468,00',
  nbreTrous: '1',
  pressionEpreuve: '3 Bars',
};

describe('cuve geometry is read off the published table', () => {
  it('spans the diameters the FORMAT column lists', () => {
    const values = column('format');
    expect(cuveGeometry.diametre).toEqual({ min: Math.min(...values), max: Math.max(...values) });
    expect(cuveGeometry.diametre).toEqual({ min: 1250, max: 3000 });
  });

  it('spans the shell-course lengths the LONGUEUR VIROLE column lists', () => {
    const values = column('longVirole');
    expect(cuveGeometry.virole).toEqual({ min: Math.min(...values), max: Math.max(...values) });
    expect(cuveGeometry.virole).toEqual({ min: 2200, max: 13600 });
  });

  it('spans the overall lengths the LONGUEUR TOTALE column lists', () => {
    const values = column('longTotale');
    expect(cuveGeometry.longueurTotale).toEqual({
      min: Math.min(...values),
      max: Math.max(...values),
    });
    expect(cuveGeometry.longueurTotale).toEqual({ min: 2730, max: 14886 });
  });

  it('spans the plate thicknesses the ÉPAISSEUR column lists', () => {
    const values = geometricTableData.map((r) => r.epaisseur);
    expect(cuveGeometry.epaisseur).toEqual({ min: Math.min(...values), max: Math.max(...values) });
  });

  it('every overall length is at least its own shell-course length', () => {
    // The dished ends add to the virole, never subtract. A row that broke this
    // would be a typo, and the drawing would dimension an impossible vessel.
    for (const row of geometricTableData) {
      const virole = Number(row.longVirole.split(' ').join(''));
      const totale = Number(row.longTotale.split(' ').join(''));
      expect(totale, `row ${row.capacite} m³`).toBeGreaterThan(virole);
    }
  });
});

describe('test pressure is published only when the rows agree', () => {
  it('reports the single value the table gives on every row', () => {
    expect(new Set(geometricTableData.map((r) => r.pressionEpreuve)).size).toBe(1);
    expect(cuveGeometry.pressionEpreuve).toBe('3 Bars');
  });

  it('reports nothing at all when two rows disagree', () => {
    // The drawing hides the readout rather than picking a winner — the same
    // contract the galvanisation figure follows for its contested bath size.
    const rows: ChaudronnerieTableRow[] = [
      sampleRow,
      { ...sampleRow, pressionEpreuve: '5 Bars' },
    ];
    expect(deriveCuveGeometry(rows).pressionEpreuve).toBeNull();
  });
});

describe('dimension formatting matches the table above the drawing', () => {
  it('groups thousands with the space the table cells use', () => {
    expect(formatMm(1250)).toBe('1 250');
    expect(formatMm(14886)).toBe('14 886');
    expect(formatMm(4)).toBe('4');
  });

  it('prints a range the way the drawing labels it', () => {
    expect(formatRangeMm(cuveGeometry.longueurTotale)).toBe('2 730 à 14 886 mm');
    expect(formatRangeMm(cuveGeometry.epaisseur)).toBe('4 à 6 mm');
  });
});

describe('unreadable cells fail loudly', () => {
  it('throws rather than silently dimensioning the drawing at zero', () => {
    const rows: ChaudronnerieTableRow[] = [{ ...sampleRow, format: 'n/a' }];
    expect(() => deriveCuveGeometry(rows)).toThrow(/cannot read a dimension/);
  });
});
