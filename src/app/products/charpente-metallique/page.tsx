
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import dynamic from 'next/dynamic';

const CharpenteMetalliquePageContent = dynamic(() => import('@/components/pages/charpente-metallique/CharpenteMetalliquePageContent').then(mod => mod.CharpenteMetalliquePageContent));

export const metadata: Metadata = {
  title: 'Charpente Métallique',
  description: 'Découvrez nos solutions de charpente métallique pour tous types de bâtiments.',
};

export default function CharpenteMetalliquePage() {
  return (
    <ProductPageLayout mainClassName="bg-secondary/20">
      <CharpenteMetalliquePageContent />
    </ProductPageLayout>
  );
}
