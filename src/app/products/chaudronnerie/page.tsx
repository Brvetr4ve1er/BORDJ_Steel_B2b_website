
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { ChaudronneriePageContent } from '@/components/chaudronnerie-page-content';

export const metadata: Metadata = {
  title: `Chaudronnerie | ${companyData.siteMetadata.title}`,
  description: 'Découvrez nos capacités de fabrication sur mesure pour des équipements industriels.',
};

export default function ChaudronneriePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1">
        <ChaudronneriePageContent />
      </main>
      <Footer />
    </div>
  );
}
