
import { companyData } from '@/config/company-data';
import { productVariants } from '@/config/product-variants.config';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';

const SandwichPanelsPageContent = dynamic(() => import('@/components/sandwich-panels-page').then(mod => mod.SandwichPanelsPage));

export const metadata: Metadata = {
  title: `Panneaux Sandwichs PEB | ${companyData.siteMetadata.title}`,
  description: 'Découvrez nos panneaux sandwichs PEB haute performance pour une isolation thermique et acoustique optimale.',
};

export default function SandwichPanelsProductPage() {
  return (
    <SandwichPanelsPageContent productData={productVariants} />
  );
}
