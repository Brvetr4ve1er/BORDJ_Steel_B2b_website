import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { ActualitesPageContent } from '@/components/pages/media-center/actualites/ActualitesPageContent';

export const metadata: Metadata = {
  title: 'Actualités',
  // The previous description promised "nouvelles, annonces et événements de
  // Bordj Steel" — company announcements. This page is a revue de presse:
  // third-party coverage. The description says so rather than over-promising.
  description:
    'Revue de presse Bordj Steel : les articles de la presse algérienne qui citent notre entreprise, de 2016 à 2022.',
  // The `robots: { index: false }` that used to sit here was correct while this
  // route rendered "Contenu à venir". It now carries real, sourced content, so
  // it is indexable and listed in the sitemap.
};

export default function ActualitesPage() {
  return (
    <ProductPageLayout>
      <ActualitesPageContent />
    </ProductPageLayout>
  );
}
