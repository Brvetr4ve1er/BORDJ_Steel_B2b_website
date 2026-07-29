"use client";

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import { AnimatedNumber } from './animated-number';
import images from '@/app/lib/placeholder-images.json';

export function HomePageHero() {
  const { hero } = companyData.pages.homepage.content;
  const heroImage = images.homepage.hero;

  return (
    <section id="home" className="relative h-screen w-full p-0">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        className="z-0 object-cover"
        priority
        data-ai-hint={heroImage.aiHint}
      />
       <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 z-10" />
      <div className="relative z-20 flex h-full flex-col items-center justify-center text-center text-white">
        <AnimatedWrapper animation="zoom-in">
            <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl leading-tight md:leading-tight lg:leading-tight font-bold tracking-tight [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
              {hero.headline}
            </h1>
            <div className="h-1 w-24 bg-accent mx-auto mt-6" />
            <p className="mt-4 text-lg md:text-xl lg:text-2xl text-gray-200 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
              {hero.subheadline}
            </p>
        </AnimatedWrapper>
        <button
          aria-label="Défiler vers le bas"
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="absolute bottom-32 left-0 right-0 mx-auto h-10 w-10 animate-bounce text-white opacity-70 hover:opacity-100 transition-opacity"
        >
          <ChevronDown className="h-10 w-10" />
        </button>
        <div className="absolute bottom-10 left-0 right-0">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8 text-center backdrop-blur-sm bg-black/30 rounded-xl px-8 py-6">
            {hero.stats.map((stat, index) => (
              <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index + 1}>
                <div className="font-headline text-4xl font-bold text-accent [text-shadow:0_2px_4px_rgba(0,0,0,0.3)]">
                    <AnimatedNumber value={stat.value} />
                </div>
                <p className="text-sm uppercase tracking-widest text-gray-300 backdrop-blur-sm bg-black/20 rounded-sm px-2">
                  {stat.label}
                </p>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
