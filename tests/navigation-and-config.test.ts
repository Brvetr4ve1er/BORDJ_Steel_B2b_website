/**
 * Guards the wiring between `src/config` and the route tree.
 *
 * Past incidents this covers:
 *  - menu entries and CTAs pointing at routes that do not exist
 *  - components binding config arrays by fixed index (`projects[0..5]`), so a
 *    reorder silently mismatched every card and a 7th entry was dropped
 *  - an image key derived from human-facing copy, so renaming a project
 *    swapped in a grey placeholder with no error
 */
import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { companyData } from '@/config/company-data';
import images from '@/app/lib/placeholder-images.json';

const APP = join(process.cwd(), 'src', 'app');

/** Does an App Router page exist for this internal path? */
function routeExists(href: string): boolean {
  const path = href.split('?')[0]?.split('#')[0] ?? '';
  if (path === '/') return existsSync(join(APP, 'page.tsx'));
  const segments = path.split('/').filter(Boolean);
  const dir = join(APP, ...segments);
  if (existsSync(join(dir, 'page.tsx'))) return true;
  // Fall back to a dynamic segment at the same depth, e.g. blog/[slug].
  const parent = join(APP, ...segments.slice(0, -1));
  if (!existsSync(parent)) return false;
  return ['[slug]', '[id]'].some((d) => existsSync(join(parent, d, 'page.tsx')));
}

const menu = companyData.navigation.mainMenu;
const flatMenu = menu.flatMap((item) => [item, ...(item.children ?? [])]);

describe('navigation', () => {
  it('has a main menu', () => {
    expect(menu.length).toBeGreaterThan(0);
  });

  it.each(flatMenu.map((i) => [i.name, i.href] as const))(
    'menu entry "%s" points at a real route (%s)',
    (_name, href) => {
      expect(href.startsWith('/'), 'menu hrefs must be internal').toBe(true);
      expect(routeExists(href)).toBe(true);
    },
  );

  it('menu entries have unique names', () => {
    const names = flatMenu.map((i) => i.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

describe('reference projects', () => {
  const projects = companyData.pages.references.projects;

  it('every project carries a stable imageKey', () => {
    // Images are bound by explicit key, never by array position — this is what
    // makes the list safe to reorder or extend.
    for (const p of projects) {
      expect(p.imageKey, `project "${p.name}" is missing imageKey`).toBeTruthy();
    }
  });

  it('imageKeys are unique', () => {
    const keys = projects.map((p) => p.imageKey);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('every imageKey resolves in placeholder-images.json', () => {
    const portfolio = images.portfolio as Record<string, unknown>;
    const unresolved = projects.filter((p) => !portfolio[p.imageKey]).map((p) => p.imageKey);
    expect(unresolved).toEqual([]);
  });
});

describe('production units', () => {
  const units = companyData.pages.units.items;

  it('every unit has a stable imageKey that resolves', () => {
    const facilities = images.facilities as Record<string, unknown>;
    const unresolved = units.filter((u) => !u.imageKey || !facilities[u.imageKey]);
    expect(unresolved.map((u) => u.title)).toEqual([]);
  });

  it('every unit links to a real product route', () => {
    for (const u of units) expect(routeExists(u.href), `${u.title} → ${u.href}`).toBe(true);
  });
});

describe('contact details', () => {
  const contact = companyData.pages.contact.content;

  it('exposes at least one phone and one email', () => {
    expect(contact.phones.length).toBeGreaterThan(0);
    expect(contact.emails.length).toBeGreaterThan(0);
  });

  it('emails are well-formed', () => {
    for (const e of contact.emails) expect(e).toMatch(/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i);
  });

  it('phone numbers use a consistent international format', () => {
    // Mixed local/international formats have shipped before ("0770…" vs "+213 770…").
    for (const p of contact.phones) expect(p.trim()).toMatch(/^\+\d[\d\s]+$/);
  });
});

describe('site metadata', () => {
  it('siteUrl is an absolute https URL without a trailing slash', () => {
    const url = companyData.siteMetadata.siteUrl;
    expect(url).toMatch(/^https:\/\//);
    expect(url.endsWith('/')).toBe(false);
    // Everything canonical derives from this one value, so it must parse.
    expect(() => new URL(url)).not.toThrow();
  });
});
