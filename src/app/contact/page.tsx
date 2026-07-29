
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { ContactPageContent } from '@/components/pages/contact/ContactPageContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Bordj Steel pour toute demande de devis ou d\'information.',
};

export default function ContactPage() {
  return (
    <ProductPageLayout>
      <ContactPageContent />
    </ProductPageLayout>
  );
}
