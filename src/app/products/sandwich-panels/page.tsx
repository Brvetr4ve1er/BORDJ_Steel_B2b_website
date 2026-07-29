
import { ProductPageLayout } from '@/components/product-page-layout';
import type { Metadata } from 'next';
import { SandwichPanelsPageContent } from '@/components/pages/sandwich-panels/SandwichPanelsPageContent';

export const metadata: Metadata = {
  title: 'Panneaux Sandwichs',
  description: 'Panneaux sandwichs PEB haute performance pour une isolation thermique et acoustique optimale.',
};

export default function SandwichPanelsProductPage() {
  return (
    <ProductPageLayout>
      <SandwichPanelsPageContent />
    </ProductPageLayout>
  );
}
