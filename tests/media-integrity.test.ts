/**
 * Guards the single most frequent defect in this repo's history: an image
 * reference that points at nothing.
 *
 * Past incidents this would have caught before it reached a visitor:
 *  - 20 broken image references (expired CDN tokens, dead photo IDs)
 *  - 3 client logos referenced but absent from public/logos
 *  - a product diagram whose host went down
 *
 * It walks the real source tree rather than a curated list, so a new bad path
 * fails the build no matter which file introduces it.
 */
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync, statSync } from 'node:fs';
import { join, extname, relative } from 'node:path';

const ROOT = process.cwd();
const SRC = join(ROOT, 'src');
const PUBLIC = join(ROOT, 'public');
const CODE_EXT = new Set(['.ts', '.tsx', '.json']);

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else if (CODE_EXT.has(extname(entry.name))) out.push(p);
  }
  return out;
}

/** Local asset paths ("/media/x.webp", "/logos/y.webp") referenced from source. */
function collectLocalAssetRefs(): Map<string, string[]> {
  const refs = new Map<string, string[]>();
  // Quoted, root-relative path ending in an image/document extension.
  const re = /['"](\/[\w\-./]+\.(?:webp|png|jpe?g|svg|gif|avif|pdf))['"]/g;
  for (const file of walk(SRC)) {
    const text = readFileSync(file, 'utf8');
    for (const m of text.matchAll(re)) {
      const p = m[1];
      if (!p) continue;
      const list = refs.get(p) ?? [];
      list.push(relative(ROOT, file).replace(/\\/g, '/'));
      refs.set(p, list);
    }
  }
  return refs;
}

describe('local asset references', () => {
  const refs = collectLocalAssetRefs();

  it('finds asset references to check (guards against the regex silently breaking)', () => {
    expect(refs.size).toBeGreaterThan(50);
  });

  it('every referenced local asset exists in public/', () => {
    const missing: string[] = [];
    for (const [assetPath, usedIn] of refs) {
      if (!existsSync(join(PUBLIC, assetPath))) {
        missing.push(`${assetPath}  <- ${usedIn.join(', ')}`);
      }
    }
    expect(missing, `Missing from public/:\n  ${missing.join('\n  ')}`).toEqual([]);
  });

  it('no referenced asset is an empty file', () => {
    const empty: string[] = [];
    for (const assetPath of refs.keys()) {
      const abs = join(PUBLIC, assetPath);
      if (existsSync(abs) && statSync(abs).size === 0) empty.push(assetPath);
    }
    expect(empty).toEqual([]);
  });
});

describe('remote image hosts', () => {
  it('site photography is self-hosted — no new third-party image hotlinks creep in', () => {
    // All photography was migrated into public/media precisely so a third-party
    // host cannot blank the site. placehold.co is the one allowed fallback.
    const ALLOWED = new Set(['placehold.co']);
    const re = /https:\/\/([a-z0-9.-]+)\/[^\s'"`)]*\.(?:webp|png|jpe?g|avif|gif)/gi;
    const offenders = new Set<string>();
    for (const file of walk(SRC)) {
      for (const m of readFileSync(file, 'utf8').matchAll(re)) {
        const host = m[1];
        if (host && !ALLOWED.has(host)) offenders.add(`${host} (${relative(ROOT, file)})`);
      }
    }
    expect([...offenders]).toEqual([]);
  });
});
