import { HomePage } from '@/components/home-page';
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: companyData.siteMetadata.title,
  description: companyData.siteMetadata.description,
};

export default function Home() {
  return <HomePage />;
}
