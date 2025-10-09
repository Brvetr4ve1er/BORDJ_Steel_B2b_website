
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { CharpenteMetalliquePageContent } from '@/components/charpente-metallique-page';
import { ProductPageLayout } from '@/components/product-page-layout';

export const metadata: Metadata = {
  title: `Charpente Métallique | ${companyData.siteMetadata.title}`,
  description: 'Découvrez nos solutions de charpente métallique pour tous types de bâtiments.',
};

export default function CharpenteMetalliquePage() {
  return (
    <ProductPageLayout mainClassName="bg-secondary/20">
      <CharpenteMetalliquePageContent />
    </ProductPageLayout>
  );
}
