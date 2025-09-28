
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { CharpenteMetalliquePageContent } from '@/components/charpente-metallique-page';

export const metadata: Metadata = {
  title: `Charpente Métallique | ${companyData.siteMetadata.title}`,
  description: 'Découvrez nos solutions de charpente métallique pour tous types de bâtiments.',
};

export default function CharpenteMetalliquePage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1 pt-32 bg-secondary/50">
        <CharpenteMetalliquePageContent />
      </main>
      <Footer />
    </div>
  );
}
