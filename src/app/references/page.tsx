
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { ReferencesPageContent } from '@/components/pages/references/ReferencesPageContent';

export const metadata: Metadata = {
  title: 'Références',
  description: 'Découvrez les réalisations et projets phares de Bordj Steel : charpente métallique, panneaux sandwichs et montage à travers l\'Algérie.',
};

export default function ReferencesPage() {
  return (
    <ProductPageLayout>
      <ReferencesPageContent />
    </ProductPageLayout>
  );
}
