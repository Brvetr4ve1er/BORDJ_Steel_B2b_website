
import Image from 'next/image';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import dynamic from 'next/dynamic';
import { FactoryLocationCard } from '@/components/sections/contact/FactoryLocationCard';

const ContactInfo = dynamic(() => import('@/components/contact-info').then(mod => mod.ContactInfo));

export function ContactPageContent() {
  const heroImage = {
      src: "/media/1f3da28625335403956d26a2163a-7f7e7da3.webp",
      alt: "Contact center with operators",
      aiHint: "contact center"
  }

  return (
    <>
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
            <h1 className="font-headline text-6xl md:text-8xl leading-tight md:leading-tight lg:leading-tight font-bold tracking-tighter uppercase text-white">
              Contactez-Nous
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
              Notre équipe est prête à vous aider. Prenons contact.
            </p>
          </AnimatedWrapper>
        </div>
      </section>
      <section className="py-16 md:py-24 lg:py-32 bg-secondary">
        <ContactInfo />
      </section>
      <FactoryLocationCard />
    </>
  );
}
