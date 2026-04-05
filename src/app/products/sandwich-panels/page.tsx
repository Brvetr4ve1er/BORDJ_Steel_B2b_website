
import { ProductPageLayout } from '@/components/product-page-layout';
import dynamic from 'next/dynamic';
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';

const SandwichPanelsPageContent = dynamic(() => import('@/components/sandwich-panels-page').then(mod => mod.SandwichPanelsPage));

export const metadata: Metadata = {
  title: `Panneaux Sandwichs | ${companyData.siteMetadata.title}`,
  description: 'Découvrez nos panneaux sandwichs PEB haute performance pour une isolation thermique et acoustique optimale.',
};

export default function SandwichPanelsProductPage() {
  return (
    <ProductPageLayout>
      <SandwichPanelsPageContent />
    </ProductPageLayout>
  );
}
