
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import dynamic from 'next/dynamic';

const ChaudronneriePageContent = dynamic(() => import('@/components/chaudronnerie-page-content').then(mod => mod.ChaudronneriePageContent));

export const metadata: Metadata = {
  title: 'Chaudronnerie',
  description: 'Découvrez nos capacités de fabrication sur mesure pour des équipements industriels.',
};

export default function ChaudronneriePage() {
  return (
    <ProductPageLayout>
        <ChaudronneriePageContent />
    </ProductPageLayout>
  );
}
