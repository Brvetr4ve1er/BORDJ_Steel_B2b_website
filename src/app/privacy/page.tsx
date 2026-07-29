import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { PrivacyPageContent } from '@/components/pages/privacy/PrivacyPageContent';

export const metadata: Metadata = {
  title: 'Politique de Confidentialité',
  description:
    "Politique de confidentialité de Bordj Steel : quelles données nous collectons via le formulaire de contact et comment elles sont utilisées.",
};

export default function PrivacyPage() {
  return (
    <ProductPageLayout>
      <PrivacyPageContent />
    </ProductPageLayout>
  );
}
