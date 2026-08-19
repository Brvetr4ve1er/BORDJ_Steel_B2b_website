import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { VideosPageContent } from '@/components/pages/media-center/videos/VideosPageContent';

export const metadata: Metadata = {
  title: 'Vidéos',
  description:
    'Découvrez nos projets de construction métallique en vidéo : chantiers, fabrication et réalisations Bordj Steel.',
  // The `robots: { index: false }` that used to sit here was correct while this
  // route rendered "Contenu à venir". It now carries the company's actual video
  // content, so it is indexable and listed in the sitemap.
};

export default function VideosPage() {
  return (
    <ProductPageLayout>
      <VideosPageContent />
    </ProductPageLayout>
  );
}
