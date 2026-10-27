import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { MediaCenterHubContent } from '@/components/pages/media-center/MediaCenterHubContent';

export const metadata: Metadata = {
  title: 'Media Center',
  description:
    'Le centre de médias de Bordj Steel : actualités, projets, vidéos et ressources sur la construction métallique en Algérie.',
};

export default function MediaCenterPage() {
  return (
    <ProductPageLayout>
      <MediaCenterHubContent />
    </ProductPageLayout>
  );
}
