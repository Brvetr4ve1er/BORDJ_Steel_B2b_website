
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { HistoryPageContent } from '@/components/pages/history/HistoryPageContent';

export const metadata: Metadata = {
  title: 'Notre Histoire',
  description: 'Découvrez les origines, le parcours et les étapes clés de Bordj Steel, complexe métallurgique de référence en Algérie.',
};

export default function HistoryPage() {
  return (
    <ProductPageLayout>
      <HistoryPageContent />
    </ProductPageLayout>
  );
}
