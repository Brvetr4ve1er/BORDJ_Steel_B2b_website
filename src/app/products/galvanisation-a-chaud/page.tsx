
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import dynamic from 'next/dynamic';

const GalvanisationPageContent = dynamic(() => import('@/components/galvanisation-page-content').then(mod => mod.GalvanisationPageContent));


export const metadata: Metadata = {
  title: `Galvanisation à Chaud | ${companyData.siteMetadata.title}`,
  description: 'Découvrez nos services de galvanisation à chaud pour une protection anti-corrosion durable, fiable et économique.',
};

export default function GalvanisationPage() {
  return (
    <ProductPageLayout className="bg-secondary">
        <GalvanisationPageContent />
    </ProductPageLayout>
  );
}
