

import Image from 'next/image';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { KenBurns } from '@/components/ui/ken-burns';
import { VideoLoop } from '@/components/ui/video-loop';
import { ActivitiesSection } from '@/components/sections/history/ActivitiesSection';
import { HistoryTimeline } from '@/components/sections/HistoryTimeline';
import { TeamsSection } from '@/components/sections/history/TeamsSection';
import { CertificationsSection } from '@/components/sections/history/CertificationsSection';


export function HistoryPageContent() {
  const heroImage = {
      src: "/media/d503286d2b91eaf2a17fe813878d-77bc4a92.webp",
      alt: "Steel factory background",
      aiHint: "welding steel"
  }

  return (
    <>
      <section className="relative h-[60vh] w-full flex items-center justify-center text-white overflow-hidden">
        <KenBurns variant="in" className="absolute inset-0 z-0">
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.aiHint}
          />
        </KenBurns>
        {/*
          * The ambient loop was generated from the still above and sits between it
          * and the scrim, so the scrim and every piece of copy still read exactly
          * as they do over the photo. It renders nothing at all unless it is going
          * to play — see VideoLoop — so the <Image> above remains the LCP element
          * and is what a phone, a reduced-motion visitor and every crawler get.
          * Deliberately NOT inside KenBurns: the clip carries its own camera move,
          * and compounding it with the drift would double the motion.
          */}
        <VideoLoop
          src="/media/loops/history-hero.mp4"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 z-10" />
        <div className="relative z-20 container mx-auto px-4 text-center">
          <AnimatedWrapper animation="zoom-in">
            <h1 className="font-headline text-6xl md:text-8xl leading-tight md:leading-tight lg:leading-tight font-bold tracking-tighter uppercase text-white">
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

    