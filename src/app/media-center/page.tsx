
import type { Metadata } from 'next';
import { ProductPageLayout } from '@/components/product-page-layout';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Media Center | Bordj Steel',
  description:
    'Le centre de médias de Bordj Steel : actualités, projets, vidéos et ressources sur la construction métallique en Algérie.',
};

export default function MediaCenterPage() {
  const heroImage = {
    src: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80",
    alt: "Media center concept with cameras and screens",
    aiHint: "media center"
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
              Media Center
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
              Explorez nos actualités, projets et ressources.
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
