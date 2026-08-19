import type { MetadataRoute } from 'next';
import { companyData } from '@/config/company-data';
import { articles } from '@/config/blog-data';

const BASE_URL = companyData.siteMetadata.siteUrl;

// Every indexable public route. Keep in sync with src/app/**; the blog detail
// pages are generated from the article data so they never drift.
//
// One media-center route remains excluded: /media-center/actualites. It still
// has no content, still renders the "Contenu à venir" placeholder, and is
// noindexed at the route level.
//
// /media-center, /media-center/gallery and /media-center/videos were all
// placeholders too, until each was given real content and had its noindex flag
// dropped. /videos was the last, once the company's own YouTube video was
// wired in; they belong here now.
// /media-center and /media-center/gallery were placeholders too until they
// were given real content, at which point their noindex flags were dropped;
// they belong here now.
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
  '/media-center/blog',
  '/products/charpente-metallique',
  '/products/chaudronnerie',
  '/products/galvanisation-a-chaud',
  '/products/sandwich-panels',
  '/privacy',
  '/terms',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : path.startsWith('/products') ? 0.9 : 0.7,
  }));

  const blogEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/media-center/blog/${article.id}`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.6,
  }));

  return [...staticEntries, ...blogEntries];
}
