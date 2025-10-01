
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import { AnimatedCounter } from './animated-counter';

export function Hero() {
  const { hero } = companyData.pages.homepage.content;

  return (
    <section id="home" className="relative h-screen w-full p-0">
      <Image
        src={hero.image.src}
        alt="Steel factory background"
        fill
        className="z-0 object-cover"
        priority
        data-ai-hint={hero.image.aiHint}
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
        <AnimatedWrapper animation="zoom-in">
          <h1 className="font-headline text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
            {hero.headline}
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-300">
            {hero.subheadline}
          </p>
        </AnimatedWrapper>
        <div className="absolute bottom-10 left-0 right-0">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {hero.stats.map((stat, index) => (
              <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index + 1}>
                <div className="font-headline text-4xl font-bold text-accent">
                    <AnimatedCounter end={stat.value} />
                </div>
                <p className="text-sm uppercase tracking-widest text-gray-300">{stat.label}</p>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
