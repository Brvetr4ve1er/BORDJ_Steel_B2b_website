
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { HistoryPageContent } from '@/components/history-page-content';
import { ProductPageLayout } from '@/components/product-page-layout';

export const metadata: Metadata = {
  title: `Notre Histoire | ${companyData.siteMetadata.title}`,
  description: 'Découvrez l\'histoire et l\'évolution de Bordj Steel, un leader de la construction métallique en Algérie.',
};

export default function HistoryPage() {
  return (
    <ProductPageLayout>
      <HistoryPageContent />
    </ProductPageLayout>
  );
}

    