
import { SandwichPanelsPage } from '@/components/sandwich-panels-page';
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';

export const metadata: Metadata = {
  title: `Panneaux Sandwichs PEB | ${companyData.siteMetadata.title}`,
  description: 'Découvrez nos panneaux sandwichs PEB haute performance pour une isolation thermique et acoustique optimale.',
};

export default function SandwichPanelsProductPage() {
  return (
    <ProductPageLayout>
      <SandwichPanelsPage />
    </ProductPageLayout>
  );
}
