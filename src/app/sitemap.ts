import type { MetadataRoute } from 'next';
import { companyData } from '@/config/company-data';
import { articles } from '@/config/blog-data';

const BASE_URL = companyData.siteMetadata.siteUrl;

// The date the static pages last changed materially — currently the last commit
// to touch page copy and product data. Bump it by hand when you materially edit
// a static page's content; leave it alone for refactors, dependency bumps and
// plain redeploys.
//
// It is a constant rather than `new Date()` deliberately. A build-time timestamp
// claimed that every URL below had changed moments ago, on every single deploy.
// That is false often enough that crawlers learn to discount lastModified
// entirely, and the signal is then worth nothing when a page really does change.
// A slightly stale date that is true beats a fresh one that lies.
const STATIC_CONTENT_LAST_MODIFIED = new Date('2026-10-04T00:00:00.000Z');

// Every indexable public route. Keep in sync with src/app/**; the blog detail
// pages are generated from the article data so they never drift.
//
// No route is excluded any more. All four Media Center sections — the hub,
// gallery, videos and actualites — started as "Contenu à venir" placeholders
// and were noindexed for as long as that was true. Each had its flag dropped
// and was added here once it carried real content; actualites was the last,
// when the revue de presse replaced its placeholder.
const staticPaths = [
  '/',
  '/about/history',
  '/contact',
  '/references',
  '/recrutement',
  '/products',
  '/media-center',
  '/media-center/gallery',
  '/media-center/videos',
  '/media-center/actualites',
  '/media-center/blog',
  '/products/charpente-metallique',
  '/products/chaudronnerie',
  '/products/galvanisation-a-chaud',
  '/products/sandwich-panels',
  '/privacy',
  '/terms',
];

const MONTHS: Record<string, number> = {
  jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11,
};

// blog-data.ts stores each article's date as a display string ("20 Jan 2025"),
// so take it apart explicitly: `new Date(string)` handling of that format is
// implementation-defined. Anything unrecognised falls back to the static content
// date, because a failed parse would otherwise advertise the 1970 epoch.
const parseArticleDate = (value: string): Date => {
  const match = /^(\d{1,2})\s+([A-Za-z]+)\s+(\d{4})$/.exec(value.trim());
  if (!match) return STATIC_CONTENT_LAST_MODIFIED;

  const [, day, monthName, year] = match;
  if (!day || !monthName || !year) return STATIC_CONTENT_LAST_MODIFIED;

  const month = MONTHS[monthName.slice(0, 3).toLowerCase()];
  if (month === undefined) return STATIC_CONTENT_LAST_MODIFIED;

  return new Date(Date.UTC(Number(year), month, Number(day)));
};

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: STATIC_CONTENT_LAST_MODIFIED,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/products') ? 0.9 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/media-center/blog/${article.id}`,
    lastModified: parseArticleDate(article.date),
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
