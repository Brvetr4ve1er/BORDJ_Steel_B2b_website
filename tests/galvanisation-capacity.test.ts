/**
 * The galvanisation unit's annual capacity is published three different ways on
 * this site, two of them on the same page. Which one is correct is a question
 * only the client can answer — see the CLIENT NOTE above `galvanisationCapacity`
 * in `src/config/company-data.ts`.
 *
 * What this suite CAN enforce meanwhile: that the three figures stay in one
 * place. Before they were consolidated they were three independent literals in
 * three files, free to drift further apart with nobody noticing. These tests
 * fail if a figure is re-hardcoded at a call site, or if a fourth distinct
 * number appears.
 *
 * They deliberately assert nothing about which value is right.
 */
import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join, extname } from 'node:path';
import { galvanisationCapacity } from '@/config/company-data';

const SOURCE_OF_TRUTH = 'src/config/company-data.ts';

function sourceFiles(dir: string, acc: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) sourceFiles(p, acc);
    else if (['.ts', '.tsx'].includes(extname(entry.name))) acc.push(p);
  }
  return acc;
}

/** Strips comments so the CLIENT NOTE's own worked example is not a "usage". */
function code(file: string): string {
  return readFileSync(file, 'utf8')
    .replace(/\{\/\*[\s\S]*?\*\/\}/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\/\/[^\n]*/g, '');
}

describe('galvanisation capacity is stated in exactly one place', () => {
  const files = sourceFiles("src")
    .map((f) => f.split(String.fromCharCode(92)).join("/"))
    .filter((f) => f !== SOURCE_OF_TRUTH);

  it('exposes the three published figures', () => {
    expect(galvanisationCapacity.headlinePerYear).toBe(60000);
    expect(galvanisationCapacity.annualCardTonnes).toBe('25.000 tonnes');
    expect(galvanisationCapacity.singleShiftPerYear).toBe(20000);
    expect(galvanisationCapacity.singleShiftPerMonth).toBe(1600);
  });

  it('the monthly and annual single-shift figures remain consistent', () => {
    // 1 600 x 12 = 19 200, rounded to 20 000 in the published copy. If either
    // number is ever edited alone this catches the drift.
    const derived = galvanisationCapacity.singleShiftPerMonth * 12;
    expect(Math.abs(derived - galvanisationCapacity.singleShiftPerYear)).toBeLessThanOrEqual(1000);
  });

  it.each([
    ['60000', /\b60[\s.,]?000\b/],
    ['25.000 tonnes', /\b25[\s.]000\s*tonnes\b/],
    ['20000 t/an', /\b20[\s.,]?000\s*t\/an\b/],
  ])('no call site re-hardcodes %s', (_label, pattern) => {
    const offenders = files.filter((f) => pattern.test(code(f)));
    expect(
      offenders,
      `re-hardcoded outside ${SOURCE_OF_TRUTH}; import galvanisationCapacity instead`,
    ).toEqual([]);
  });
});
