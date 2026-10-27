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
const MEDIA = join(PUBLIC, 'media');
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

/** Every file under a directory, whatever its extension. */
function walkAssets(dir: string): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walkAssets(p));
    else out.push(p);
  }
  return out;
}

/** Local asset paths ("/media/x.webp", "/logos/y.webp") referenced from source. */
function collectLocalAssetRefs(): Map<string, string[]> {
  const refs = new Map<string, string[]>();
  // Quoted, root-relative path ending in an image/document extension.
  // Video too: public/media/loops holds the ambient loops behind the heroes.
  const re = /['"](\/[\w\-./]+\.(?:webp|png|jpe?g|svg|gif|avif|pdf|mp4|webm))['"]/g;
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

  it('every file in public/media is referenced from src/', () => {
    // The mirror of the assertion above, and the one that catches the opposite
    // defect: photography processed into public/media and then never wired up.
    // 4 such files rode along in every deploy from 7f2ef17 until this test,
    // because nothing had ever looked in this direction.
    const orphans: string[] = [];
    for (const abs of walkAssets(MEDIA)) {
      const assetPath = `/${relative(PUBLIC, abs).replace(/\\/g, '/')}`;
      if (!refs.has(assetPath)) orphans.push(assetPath);
    }
    expect(
      orphans,
      `Unreferenced files in public/media — delete them, or reference them:\n  ${orphans.join('\n  ')}`,
    ).toEqual([]);
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

/**
 * Remote hosts named in an image position, mapped to the files naming them.
 *
 * Anchored on the POSITION, not on a trailing file extension. The previous
 * version required one, and the hotlinks this guard exists for carry none: the
 * dead photo IDs now living locally as `public/media/1504307651254-*.webp` were
 * referenced as extension-less URLs, and so is the allowlisted
 * `https://placehold.co/600x400` fallback. So the sweep matched zero strings in
 * the entire tree — it had never fired, and could not have.
 *
 * `src=` has to sit on an `<Image>`/`<img>` tag and `src:` has to be an object
 * key, which is what keeps the two legitimate third-party `<iframe src>` out of
 * the results: the Google Maps embed and the youtube-nocookie player are not
 * image hosts, and next.config.ts is right not to list them in remotePatterns.
 */
function collectRemoteImageHosts(): Map<string, string[]> {
  const hosts = new Map<string, string[]>();
  const patterns = [
    /<(?:Image|img)\b[^<]*?\bsrc=\{?\s*["'`]https:\/\/([a-z0-9.-]+)/gi,
    /\b(?:imageUrl|poster|src)["']?\s*:\s*["'`]https:\/\/([a-z0-9.-]+)/gi,
    /\b(?:imageUrl|poster)=\{?\s*["'`]https:\/\/([a-z0-9.-]+)/gi,
  ];
  for (const file of walk(SRC)) {
    const text = readFileSync(file, 'utf8');
    for (const re of patterns) {
      for (const m of text.matchAll(re)) {
        const host = m[1];
        if (!host) continue;
        const list = hosts.get(host) ?? [];
        list.push(relative(ROOT, file).replace(/\\/g, '/'));
        hosts.set(host, list);
      }
    }
  }
  return hosts;
}

describe('remote image hosts', () => {
  // All photography was migrated into public/media precisely so a third-party
  // host cannot blank the site. placehold.co is the one allowed fallback.
  const ALLOWED = new Set(['placehold.co']);
  const hosts = collectRemoteImageHosts();

  it('finds remote image URLs to check (guards against the regex silently breaking)', () => {
    // The sentinel the extension-anchored version lacked, and the reason it
    // could report a clean sweep while matching nothing. One hit is the honest
    // floor: the placehold.co fallback at src/config/company-data.ts is the
    // only remote image URL on the site.
    expect(hosts.size).toBeGreaterThan(0);
  });

  it('site photography is self-hosted — no new third-party image hotlinks creep in', () => {
    const offenders: string[] = [];
    for (const [host, usedIn] of hosts) {
      if (!ALLOWED.has(host)) offenders.push(`${host}  <- ${usedIn.join(', ')}`);
    }
    expect(
      offenders,
      `Third-party image hosts — move the file into public/media:\n  ${offenders.join('\n  ')}`,
    ).toEqual([]);
  });
});
