
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { GalvanisationPageContent } from '@/components/galvanisation-page-content';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: `Galvanisation à Chaud | ${companyData.siteMetadata.title}`,
  description: 'Découvrez nos services de galvanisation à chaud pour une protection anti-corrosion durable, fiable et économique.',
};

export default function GalvanisationPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-secondary">
      <Navbar />
      <main className="flex-1">
        <GalvanisationPageContent />
      </main>
      <Footer />
    </div>
  );
}
