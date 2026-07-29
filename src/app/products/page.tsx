import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { ProductsPageContent } from '@/components/pages/products/ProductsPageContent';

export const metadata: Metadata = {
  title: 'Produits',
  description:
    'Découvrez nos solutions de construction métallique : charpente métallique, panneaux sandwichs, galvanisation à chaud et chaudronnerie.',
};

export default function ProductsPage() {
  return (
    <ProductPageLayout>
      <ProductsPageContent />
    </ProductPageLayout>
  );
}
