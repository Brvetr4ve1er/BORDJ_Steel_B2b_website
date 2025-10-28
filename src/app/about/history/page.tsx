
import { companyData } from '@/config/company-data';
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import Image from 'next/image';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import React from 'react';
import { Timeline } from '@/components/timeline';

export const metadata: Metadata = {
  title: `Notre Histoire | ${companyData.siteMetadata.title}`,
  description: 'Découvrez l\'histoire et l\'évolution de Bordj Steel, un leader de la construction métallique en Algérie.',
};

export default function HistoryPage() {
  const heroImage = {
      src: "https://i.pinimg.com/736x/d5/03/28/d503286d2b91eaf2a17fe813878d9568.jpg",
      alt: "Steel factory background",
      aiHint: "welding steel"
  }
  
  return (
    <ProductPageLayout>
      <section className="relative h-[60vh] w-full flex items-center justify-center text-white overflow-hidden">
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
              Notre Histoire
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
              Forger l'avenir de la construction métallique en Algérie, un projet à la fois.
            </p>
          </AnimatedWrapper>
        </div>
      </section>
      <section className="bg-gray-50 py-20">
        <Timeline />
      </section>
    </ProductPageLayout>
  );
}
