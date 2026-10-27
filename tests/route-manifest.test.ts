/**
 * Keeps the sitemap and the App Router tree honest about each other.
 *
 * `sitemap.ts` carries the instruction "Keep in sync with src/app/**" in a
 * hand-maintained array, which is precisely the kind of list that drifts: a
 * route gets renamed in a refactor and the sitemap keeps advertising the old
 * URL, or a new page ships and no crawler is ever told about it. Nothing in
 * this repo looked in either direction until this file.
 *
 * It also checks what every page must export. The gap this closes is that the
 * rest of the suite reads *config*, so a page could be deleted, renamed, or
 * left without a `metadata` export and every one of them would still pass.
 *
 * Pure static analysis — the sitemap module is imported and called, the pages
 * are read as text. Importing a `page.tsx` here would drag in the whole
 * component tree (three.js, framer-motion) to learn one thing about its
 * exports, and would need a DOM to do it.
 */
import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import sitemap from '@/app/sitemap';
import { companyData } from '@/config/company-data';

const ROOT = process.cwd();
const APP = join(ROOT, 'src', 'app');
const BASE_URL = companyData.siteMetadata.siteUrl;

/** The home page inherits its title and description from the root layout. */
const INHERITS_METADATA = new Set(['/']);

const entries = sitemap();

/** Site-relative path for each sitemap URL ('/' for the root). */
function pathsOf(): string[] {
  return entries.map((e) => e.url.slice(BASE_URL.length) || '/');
}

/** Every `page.tsx` under src/app, as a site-relative route. */
function routeFilesOnDisk(): Array<{ route: string; file: string }> {
  const out: Array<{ route: string; file: string }> = [];
  const walk = (dir: string): void => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, entry.name);
      if (entry.isDirectory()) walk(p);
      else if (entry.name === 'page.tsx') {
        // `sep` rather than a literal: on Windows `relative` returns
        // backslashes, and a route is always spelled with forward ones.
        const segments = relative(APP, dir).split(sep).filter(Boolean);
        // src/app/page.tsx yields no segments, which is exactly the '/' route.
        out.push({ route: `/${segments.join('/')}`, file: p });
      }
    }
  };
  walk(APP);
  return out;
}

const onDisk = routeFilesOnDisk();

/** A route segment Next fills at request time — `[slug]`, `[...rest]`. */
const isDynamic = (route: string) => route.includes('[');

describe('sitemap URLs', () => {
  it('there are URLs to check (guards against the import silently returning nothing)', () => {
    expect(entries.length).toBeGreaterThan(20);
  });

  it('every URL is absolute under the configured siteUrl', () => {
    // The canonical-URL convention in CLAUDE.md, asserted rather than trusted:
    // a hardcoded domain here would outlive the day the client settles on one.
    const offenders = entries.map((e) => e.url).filter((url) => !url.startsWith(`${BASE_URL}/`));
    expect(offenders).toEqual([]);
  });

  it('no URL appears twice', () => {
    const seen = new Map<string, number>();
    for (const e of entries) seen.set(e.url, (seen.get(e.url) ?? 0) + 1);
    const dupes = [...seen].filter(([, n]) => n > 1).map(([url]) => url);
    expect(dupes).toEqual([]);
  });

  it('every URL resolves to a page.tsx on disk', () => {
    // A static path maps to its own directory; a blog article maps to the
    // dynamic [slug] page that generateStaticParams renders it from.
    const staticRoutes = new Set(onDisk.filter((r) => !isDynamic(r.route)).map((r) => r.route));
    const missing: string[] = [];
    for (const path of pathsOf()) {
      if (staticRoutes.has(path)) continue;
      const article = /^\/media-center\/blog\/[^/]+$/.test(path);
      if (article && existsSync(join(APP, 'media-center', 'blog', '[slug]', 'page.tsx'))) continue;
      missing.push(path);
    }
    expect(missing, `Advertised in sitemap.ts, absent from src/app:\n  ${missing.join('\n  ')}`).toEqual(
      [],
    );
  });

  it('every static page.tsx on disk is advertised in the sitemap', () => {
    // The other direction, and the one the sitemap's own comment asks for:
    // "No route is excluded any more." A page nobody is told about is a page
    // nobody reads.
    const advertised = new Set(pathsOf());
    const unlisted = onDisk
      .filter((r) => !isDynamic(r.route))
      .map((r) => r.route)
      .filter((route) => !advertised.has(route));
    expect(
      unlisted,
      `Present in src/app, absent from sitemap.ts staticPaths:\n  ${unlisted.join('\n  ')}`,
    ).toEqual([]);
  });
});

describe('page exports', () => {
  const pages = onDisk.map((r) => [r.route, r.file] as const);

  it('found the pages to check', () => {
    expect(pages.length).toBeGreaterThan(15);
  });

  it.each(pages)('%s exports a default component', (_route, file) => {
    const src = readFileSync(file, 'utf8');
    expect(/^export default (async )?function|^export default \w+;/m.test(src)).toBe(true);
  });

  it.each(pages)('%s exports metadata', (route, file) => {
    // Every route needs its own <title> and description for search results and
    // for a shared link. The home page is the one legitimate exception: it
    // takes both from the root layout, which is where the site-wide defaults
    // live. `generateMetadata` counts — the blog detail page derives its title
    // from the article.
    if (INHERITS_METADATA.has(route)) return;
    const src = readFileSync(file, 'utf8');
    const hasStatic = /^export const metadata\b/m.test(src);
    const hasDynamic = /^export (async )?function generateMetadata\b/m.test(src);
    expect(hasStatic || hasDynamic).toBe(true);
  });

  it('the home page really does inherit, rather than being an oversight', () => {
    // Pins the exemption above to a fact: the layout supplies the defaults.
    // If that ever stops being true, this fails instead of the page quietly
    // shipping with no title of its own.
    const layout = readFileSync(join(APP, 'layout.tsx'), 'utf8');
    expect(/^export const metadata\b/m.test(layout)).toBe(true);
  });
});
