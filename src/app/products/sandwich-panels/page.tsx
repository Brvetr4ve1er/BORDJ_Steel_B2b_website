
import { Navbar } from '@/components/navbar';
import { SandwichPanelsPage } from '@/components/sandwich-panels-page';
import { Footer } from '@/components/footer';
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: `Panneaux Sandwichs PEB | ${companyData.siteMetadata.title}`,
  description: 'Découvrez nos panneaux sandwichs PEB haute performance pour une isolation thermique et acoustique optimale.',
};

export default function SandwichPanelsProductPage() {
  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <main className="flex-1 pt-32">
        <SandwichPanelsPage />
      </main>
      <Footer />
    </div>
  );
}
