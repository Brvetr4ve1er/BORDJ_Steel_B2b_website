
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { GalvanisationPageContent } from '@/components/galvanisation-page-content';
import { ProductPageLayout } from '@/components/product-page-layout';

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
