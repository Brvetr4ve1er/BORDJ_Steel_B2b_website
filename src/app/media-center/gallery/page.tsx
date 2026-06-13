
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Galerie | Bordj Steel',
  description:
    'Galerie photo des réalisations Bordj Steel : charpentes métalliques, panneaux sandwich et projets industriels en images.',
};

export default function GalleryPage() {
  const heroImage = {
    src: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=800&q=80",
    alt: "Art gallery with photos on the wall",
    aiHint: "photo gallery"
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
              Galerie
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
              Explorez nos réalisations en images.
            </p>
          </AnimatedWrapper>
        </div>
      </section>
      <section>
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold">Contenu à venir</h2>
            <p className="text-lg text-muted-foreground mt-4">Cette page est en cours de construction.</p>
          </div>
      </section>
    </ProductPageLayout>
  );
}

    