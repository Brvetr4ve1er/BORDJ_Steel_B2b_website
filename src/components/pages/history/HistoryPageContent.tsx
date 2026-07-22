

import Image from 'next/image';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { ActivitiesSection } from '@/components/sections/history/ActivitiesSection';
import { HistoryTimeline } from '@/components/sections/HistoryTimeline';
import { TeamsSection } from '@/components/sections/history/TeamsSection';
import { CertificationsSection } from '@/components/sections/history/CertificationsSection';


export function HistoryPageContent() {
  const heroImage = {
      src: "https://i.pinimg.com/736x/d5/03/28/d503286d2b91eaf2a17fe813878d9568.jpg",
      alt: "Steel factory background",
      aiHint: "welding steel"
  }

  return (
    <>
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
      <ActivitiesSection />
      <section className="bg-secondary py-20">
        <HistoryTimeline />
      </section>
      <TeamsSection />
      <CertificationsSection />
    </>
  );
}

    