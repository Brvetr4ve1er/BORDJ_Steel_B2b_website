
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Chaudronnerie | ${companyData.siteMetadata.title}`,
  description: 'Découvrez nos capacités de fabrication sur mesure pour des équipements industriels.',
};

export default function ChaudronneriePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1 pt-32">
        <div className="container mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold font-headline">Chaudronnerie</h1>
          <p className="mt-4 text-lg">Page en construction. Plus de détails sur nos services de chaudronnerie seront bientôt disponibles.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
