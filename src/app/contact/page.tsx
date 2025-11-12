
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { Contact } from '@/components/contact';
import { companyData } from '@/config/company-data';
import Image from 'next/image';
import { AnimatedWrapper } from '@/components/animated-wrapper';

export const metadata: Metadata = {
  title: `Contact | ${companyData.siteMetadata.title}`,
  description: 'Contactez Bordj Steel pour toute demande de devis ou d\'information.',
};

export default function ContactPage() {
  const heroImage = {
      src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80",
      alt: "Contact center with operators",
      aiHint: "contact center"
  }

  return (
    <ProductPageLayout>
      <section className="relative h-[60vh] w-full flex items-center justify-center text-white overflow-hidden p-0">
        <Image
          src={heroImage.src}
          alt={heroImage.alt}
          fill
          className="z-0 object-cover"
          priority
          data-ai-hint={heroImage.aiHint}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <AnimatedWrapper animation="zoom-in">
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white">
              Contactez-Nous
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
              Notre équipe est prête à vous aider. Prenons contact.
            </p>
          </AnimatedWrapper>
        </div>
      </section>
      <section className="py-16 md:py-24 lg:py-32 bg-secondary">
        <Contact />
      </section>
    </ProductPageLayout>
  );
}
