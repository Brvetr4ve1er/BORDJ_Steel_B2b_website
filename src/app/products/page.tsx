import { Navbar } from '@/components/navbar';
import { Products } from '@/components/products';
import { Footer } from '@/components/footer';
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `${companyData.pages.products.title} | ${companyData.siteMetadata.title}`,
  description: `Découvrez nos produits: ${companyData.pages.products.items.map(p => p.name).join(', ')}`,
};

export default function ProductsPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1 pt-32">
        <Products />
      </main>
      <Footer />
    </div>
  );
}
