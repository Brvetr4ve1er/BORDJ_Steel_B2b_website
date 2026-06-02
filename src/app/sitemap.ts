import type { MetadataRoute } from 'next';
import { companyData } from '@/config/company-data';
import { articles } from '@/config/blog-data';

const BASE_URL = companyData.siteMetadata.siteUrl;

// Every public route. Keep in sync with src/app/**; the blog detail pages are
// generated from the article data so they never drift.
const staticPaths = [
  '/',
  '/about/history',
  '/contact',
  '/references',
  '/recrutement',
  '/media-center',
  '/media-center/actualites',
  '/media-center/videos',
  '/media-center/gallery',
  '/media-center/blog',
  '/products/charpente-metallique',
  '/products/chaudronnerie',
  '/products/galvanisation-a-chaud',
  '/products/sandwich-panels',
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
