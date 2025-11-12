import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { Contact } from '@/components/contact';
import { companyData } from '@/config/company-data';

export const metadata: Metadata = {
  title: `Contact | ${companyData.siteMetadata.title}`,
  description: 'Contactez Bordj Steel pour toute demande de devis ou d\'information.',
};

export default function ContactPage() {
  return (
    <ProductPageLayout>
      <section className="py-24 md:py-32 lg:py-40 bg-background">
        <Contact />
      </section>
    </ProductPageLayout>
  );
}
