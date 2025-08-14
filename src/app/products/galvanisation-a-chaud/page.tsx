
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Galvanisation à Chaud | ${companyData.siteMetadata.title}`,
  description: 'Découvrez nos services de galvanisation à chaud pour une protection anti-corrosion durable.',
};

export default function GalvanisationPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1 pt-32">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold font-headline">Galvanisation à Chaud</h1>
          <p className="mt-4 text-lg">Page en construction. Plus de détails sur nos services de galvanisation à chaud seront bientôt disponibles.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
