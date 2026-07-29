
import { ProductPageLayout } from '@/components/product-page-layout';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import Image from 'next/image';

type PlaceholderPageProps = {
  /** Hero heading (rendered uppercase). */
  title: string;
  /** Single sentence shown under the heading. */
  subtitle: string;
  image: {
    src: string;
    alt: string;
    aiHint?: string;
  };
};

/**
 * Shared "Contenu à venir" treatment for the Media Center sections that are not
 * built yet. Each route keeps its own `metadata`, hero image, title and subtitle;
 * everything else lives here so the treatment is changed in one place.
 */
export function PlaceholderPage({ title, subtitle, image }: PlaceholderPageProps) {
  return (
    <ProductPageLayout>
      <section className="relative h-[60vh] w-full flex items-center justify-center text-white overflow-hidden p-0">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="z-0 object-cover"
          priority
          data-ai-hint={image.aiHint}
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <AnimatedWrapper animation="zoom-in">
            <h1 className="font-headline text-6xl md:text-8xl leading-tight md:leading-tight lg:leading-tight font-bold tracking-tighter uppercase text-white">
              {title}
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
              {subtitle}
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
