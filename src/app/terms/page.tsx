import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { TermsPageContent } from '@/components/pages/terms/TermsPageContent';

export const metadata: Metadata = {
  title: "Conditions d'Utilisation",
  description:
    "Conditions d'utilisation du site web de Bordj Steel : propriété intellectuelle, usage du contenu et limitations de responsabilité.",
};

export default function TermsPage() {
  return (
    <ProductPageLayout>
      <TermsPageContent />
    </ProductPageLayout>
  );
}
