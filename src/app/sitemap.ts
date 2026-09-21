import type { MetadataRoute } from 'next';
import { companyData } from '@/config/company-data';
import { articles } from '@/config/blog-data';

const BASE_URL = companyData.siteMetadata.siteUrl;

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
