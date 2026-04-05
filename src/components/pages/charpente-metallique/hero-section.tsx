/**
 * Hero Section Component for Charpente Métallique Page
 *
 * Displays the main hero banner with a full-width background image, prominent title,
 * description, and call-to-action buttons. It also highlights key statistics using
 * animated counter cards at the bottom of the section.
 */
"use client";

import Image from 'next/image';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, HardHat, TowerControl, Car, Tractor, Layers, Cog } from 'lucide-react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import React, { useMemo } from 'react';
import { AnimatedNumber } from '@/components/animated-number';
import { DownloadButton } from '@/components/ui/download-button';
import { charpenteMetalliqueData } from '@/config/charpente-metallique-data';

export function HeroSection({ hero }: { hero: typeof charpenteMetalliqueData.hero }) {
  const iconMap = useMemo(() => ({
    HardHat,
    Cog,
    Layers,
    TowerControl,
    Car,
    Tractor
  }), []);

  return (
    <section className="relative min-h-screen flex items-end bg-background pb-24 sm:pb-32">
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.image_url}
          alt={hero.alt}
          fill
          className="object-cover"
          priority
          data-ai-hint={hero.aiHint}
          placeholder="blur"
          blurDataURL={hero.blurDataUrl}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 w-full relative z-10">
        <div className="space-y-12">
          <AnimatedWrapper animation="slide-up">
            <div className="text-left space-y-8">
              <div>
                <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                  {hero.title}
                </h1>
                <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                  {hero.subtitle}
                </p>
              </div>
              <div className="flex flex-row items-center gap-4">
                <Button size="lg" variant="destructive">{hero.cta_primary} <ArrowRight className="ml-2" /></Button>
                <DownloadButton text={hero.cta_secondary} />
              </div>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper animation="slide-up" staggerIndex={1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {hero.stats.map((stat, index) => {
                const Icon = iconMap[stat.icon as keyof typeof iconMap];
                return (
                  <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                     <Card className="group bg-background/50 backdrop-blur-md border-border text-white relative overflow-hidden transition-all duration-500 hover:border-accent">
                        <div className="absolute inset-0 bg-accent transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />
                        <CardHeader className="relative flex-row items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center transition-colors duration-300 group-hover:bg-accent-foreground/10">
                            {Icon && <Icon className="h-6 w-6 text-accent transition-colors duration-300 group-hover:text-white" />}
                            </div>
                            <div>
                            <CardTitle className="text-2xl font-bold text-white"><AnimatedNumber value={stat.value} />{stat.unit}</CardTitle>
                            <p className="text-sm text-gray-200 group-hover:text-gray-100">{stat.title}</p>
                            </div>
                        </CardHeader>
                    </Card>
                  </AnimatedWrapper>
                );
              })}
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}