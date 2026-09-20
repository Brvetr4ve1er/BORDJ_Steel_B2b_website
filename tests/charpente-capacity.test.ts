/**
 * The charpente unit publishes its capacity as two sets of numbers that
 * disagree, and both render on /products/charpente-metallique: a hero stat of
 * 25 000 T/an, and a table headed "CAPACITÉ DE PRODUCTION (EN 08 HEURES)"
 * giving 12 000 T/an. Which is correct is a question only the client can
 * answer — see the CLIENT NOTE above `charpenteCapacity` in
 * `src/config/company-data.ts`.
 *
 * Sibling of tests/galvanisation-capacity.test.ts and the same contract: these
 * tests enforce that the figures stay in ONE place. They deliberately assert
 * nothing about which value is right.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { charpenteCapacity } from '@/config/company-data';

const SOURCE_OF_TRUTH = 'src/config/company-data.ts';

function sourceFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) sourceFiles(p, acc);
    else if (['.ts', '.tsx'].includes(extname(entry.name))) acc.push(p);
  }
  return acc;
}

/** Strips comments so a CLIENT NOTE quoting a figure is not counted as a usage. */
function code(file: string): string {
  return readFileSync(file, 'utf8')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');
}

describe('charpente capacity is stated in exactly one place', () => {
  const files = sourceFiles("src")
    .map((f) => f.split(String.fromCharCode(92)).join("/"))
    .filter((f) => f !== SOURCE_OF_TRUTH);

  it('exposes the published headline figures', () => {
    expect(charpenteCapacity.headlinePerYear).toBe(25000);
    expect(charpenteCapacity.headlinePerMonth).toBe(1500);
    expect(charpenteCapacity.prsPerYear).toBe(3000);
  });

  it('exposes the 8-hour table exactly as published', () => {
    expect(charpenteCapacity.eightHourTable).toEqual([
      { product: 'Charpente métallique', perYear: 12000, perMonth: 1000 },
      { product: 'Ligne de profilés soudés (PRS)', perYear: 2000, perMonth: null },
      { product: 'Mâts et autres produits', perYear: 5000, perMonth: null },
    ]);
  });

  it('the 8-hour table stays internally consistent', () => {
    // 1 000 T/mois x 12 = 12 000 T/an. This table is the only place on the site
    // where a capacity states its basis AND its own arithmetic checks out; if
    // someone edits one cell alone, that stops being true here first.
    for (const row of charpenteCapacity.eightHourTable) {
      if (row.perMonth === null) continue;
      expect(row.perMonth * 12).toBe(row.perYear);
    }
  });

  it('the headline sentence still disagrees with itself', () => {
    // NOT an endorsement — a tripwire. The units list publishes "1500 T/mois
    // (25000 T/an)" and 1 500 x 12 = 18 000. If this ever starts passing as
    // consistent, someone changed a published figure without the client, which
    // is exactly what this pair of suites exists to catch.
    expect(charpenteCapacity.headlinePerMonth * 12).not.toBe(charpenteCapacity.headlinePerYear);
  });

  it.each([
    ['25 000 T/an headline', /\b25[\s.,\u202f]?000\s*T\/an/i],
    ['1 500 T/mois', /\b1[\s.,\u202f]?000\s*T\/mois/i],
    ['3 000 T/an PRS', /\b3[\s.,\u202f]?000\s*T\/an/i],
    ['12 000 T/an table', /\b12[\s.,\u202f]?000\s*T\/an/i],
    ['1 000 T/mois table', /\b1[\s.,\u202f]?000\s*T\/mois/i],
    ['2 000 T/an table', /\b2[\s.,\u202f]?000\s*T\/an/i],
    // The "Mâts et autres produits" row (5 000 T/an) is deliberately NOT
    // guarded here. Chaudronnerie publishes its own, unrelated 5 000 T/an
    // figure (chaudronnerie-data.ts, on an 8h/j basis), so digits-plus-unit
    // cannot tell the two apart and the check flagged that file as an
    // offender. The row is still pinned by value in the table assertion
    // above; only the "nobody re-hardcodes it" sweep skips it.
  ])('no call site re-hardcodes %s', (_label, pattern) => {
    const offenders = files.filter((f) => pattern.test(code(f)));
    expect(
      offenders,
      `re-hardcoded outside ${SOURCE_OF_TRUTH}; import charpenteCapacity instead`,
    ).toEqual([]);
  });
});
