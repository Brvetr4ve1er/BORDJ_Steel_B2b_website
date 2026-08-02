
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { GalleryPageContent } from '@/components/pages/media-center/GalleryPageContent';

export const metadata: Metadata = {
  title: 'Galerie',
  description:
    'Galerie photo des réalisations Bordj Steel : charpentes métalliques, panneaux sandwich et projets industriels en images.',
};

export default function GalleryPage() {
  return (
    <ProductPageLayout>
      <GalleryPageContent />
    </ProductPageLayout>
  );
}
