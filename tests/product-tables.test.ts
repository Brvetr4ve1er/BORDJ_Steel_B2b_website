/**
 * Guards the product specification tables — the source of the worst rendering
 * defect this project has had.
 *
 * The renderer used to infer column grouping by substring-matching the French
 * word "appui" and to derive the icon row's width from `headers.length`. That
 * produced a fractional `colSpan={0.5}` (invalid HTML) on one table and a
 * [1,1,1,1,8] span distribution against real 4/4/2 data groups on another.
 *
 * Grouping is now declared data, which makes it checkable: these tests assert
 * the geometry invariants the renderer relies on, so a malformed table fails
 * here instead of silently rendering misaligned numbers to a buyer.
 */
import { describe, it, expect } from 'vitest';
import { productVariants } from '@/config/product-variants.config';
import type { ProductVariantSection, TableSection } from '@/config/product-variant-schema';

const variants = Object.entries(productVariants);

/** Widest body row — the true column count the header must span. */
function bodyWidth(table: TableSection): number {
  return Math.max(...table.rows.map((r) => r.length));
}

function tablesOf(sections: ProductVariantSection[]): TableSection[] {
  return sections.filter((s): s is TableSection => s.type === 'table');
}

describe('product variants', () => {
  it('exposes the expected variants', () => {
    expect(variants.length).toBeGreaterThanOrEqual(5);
  });

  it.each(variants)('%s has a title and at least one section', (_key, variant) => {
    expect(variant.title.trim()).not.toBe('');
    expect(variant.sections.length).toBeGreaterThan(0);
  });

  it.each(variants)('%s — mainImage is either absent or fully specified', (_key, variant) => {
    // Absence is legitimate (a parts grid has no hero shot). What is not
    // legitimate is a half-specified image, or an empty string standing in for
    // "none" — that sentinel is exactly what this asserts against.
    if (variant.mainImage === undefined) return;
    expect(variant.mainImage.src.trim()).not.toBe('');
    expect(variant.mainImage.alt.trim()).not.toBe('');
  });
});

describe('table geometry', () => {
  const allTables = variants.flatMap(([key, v]) =>
    tablesOf(v.sections).map((t) => ({ key, table: t })),
  );

  it('there are tables to check', () => {
    expect(allTables.length).toBeGreaterThan(5);
  });

  it.each(allTables.map((t) => [`${t.key} › ${t.table.title}`, t.table] as const))(
    '%s — every row has at least one cell',
    (_name, table) => {
      expect(table.rows.length).toBeGreaterThan(0);
      for (const row of table.rows) expect(row.length).toBeGreaterThan(0);
    },
  );

  it.each(allTables.map((t) => [`${t.key} › ${t.table.title}`, t.table] as const))(
    '%s — declares headers or headerGroups, never both',
    (_name, table) => {
      const hasHeaders = Array.isArray(table.headers);
      const hasGroups = Array.isArray(table.headerGroups);
      expect(
        hasHeaders !== hasGroups,
        'a table must declare exactly one of `headers` / `headerGroups`',
      ).toBe(true);
    },
  );

  it.each(allTables.map((t) => [`${t.key} › ${t.table.title}`, t.table] as const))(
    '%s — header group spans are positive integers summing to the body width',
    (_name, table) => {
      if (!table.headerGroups) return;
      for (const g of table.headerGroups) {
        expect(Number.isInteger(g.span), `span "${g.label}" must be an integer`).toBe(true);
        expect(g.span, `span "${g.label}" must be >= 1`).toBeGreaterThanOrEqual(1);
      }
      const declared = table.headerGroups.reduce((n, g) => n + g.span, 0);
      expect(declared, 'sum of header group spans must equal the widest body row').toBe(
        bodyWidth(table),
      );
    },
  );

  it.each(allTables.map((t) => [`${t.key} › ${t.table.title}`, t.table] as const))(
    '%s — ungrouped headers provide one label per body column',
    (_name, table) => {
      if (!table.headers) return;
      expect(table.headers.length).toBe(bodyWidth(table));
    },
  );

  it.each(allTables.map((t) => [`${t.key} › ${t.table.title}`, t.table] as const))(
    '%s — subheaders, when present, provide one label per body column',
    (_name, table) => {
      if (!table.subheaders) return;
      expect(table.subheaders.length).toBe(bodyWidth(table));
    },
  );
});

describe('image sections', () => {
  it('every image section has a non-empty src and alt', () => {
    const bad: string[] = [];
    for (const [key, variant] of variants) {
      for (const s of variant.sections) {
        if (s.type === 'image') {
          if (!s.image.src.trim() || !s.image.alt.trim()) bad.push(`${key} › ${s.title}`);
        }
        if (s.type === 'imageGrid') {
          for (const item of s.items) {
            // `image` is intentionally optional (missing client photo), but if
            // present it must be complete.
            if (item.image && (!item.image.src.trim() || !item.image.alt.trim())) {
              bad.push(`${key} › ${item.name}`);
            }
          }
        }
      }
    }
    expect(bad).toEqual([]);
  });

  it('no two differently-named finition parts share the same photo', () => {
    // A real defect once shipped: the interior and exterior corner pieces used
    // an identical image, so one card showed the wrong part to a buyer.
    const clashes: string[] = [];
    for (const [key, variant] of variants) {
      for (const s of variant.sections) {
        if (s.type !== 'imageGrid') continue;
        const bySrc = new Map<string, string[]>();
        for (const item of s.items) {
          if (!item.image?.src) continue;
          const names = bySrc.get(item.image.src) ?? [];
          names.push(item.name);
          bySrc.set(item.image.src, names);
        }
        for (const [src, names] of bySrc) {
          if (names.length > 1) clashes.push(`${key}: ${names.join(' / ')} share ${src}`);
        }
      }
    }
    expect(clashes).toEqual([]);
  });
});
