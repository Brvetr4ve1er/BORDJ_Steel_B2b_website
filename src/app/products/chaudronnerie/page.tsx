
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { ChaudronneriePageContent } from '@/components/chaudronnerie-page-content';
import { ProductPageLayout } from '@/components/product-page-layout';

export const metadata: Metadata = {
  title: `Chaudronnerie | ${companyData.siteMetadata.title}`,
  description: 'Découvrez nos capacités de fabrication sur mesure pour des équipements industriels.',
};

export default function ChaudronneriePage() {
  return (
    <ProductPageLayout>
        <ChaudronneriePageContent />
    </ProductPageLayout>
  );
}
