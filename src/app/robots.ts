import type { MetadataRoute } from 'next';
import { companyData } from '@/config/company-data';

const BASE_URL = companyData.siteMetadata.siteUrl;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
