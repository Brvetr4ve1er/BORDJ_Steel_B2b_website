/**
 * Hero Section Component for Galvanisation Page
 *
 * This component renders the primary hero banner for the galvanisation product page.
 * It displays the main title, background image, key statistics, and call-to-action buttons.
 * The layout is responsive and includes staggered entry animations for visual impact.
 */
"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import React, { useMemo } from 'react';
import { galvanisationContent, iconMap as galvanisationIconMap } from '@/config/galvanisation-data';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { DownloadButton } from '@/components/ui/download-button';
import dynamic from 'next/dynamic';

const DynamicAnimatedBaths = dynamic(() => import('@/components/animated-baths').then(mod => mod.AnimatedBaths));

export function HeroSection() {
  const { hero } = galvanisationContent;
  const largeStat = hero.stats.find(s => s.large);
  const smallStats = hero.stats.filter(s => !s.large);
  const iconMap = useMemo(() => galvanisationIconMap, []);

  return (
    <section className="relative min-h-screen flex items-end bg-background pb-24 sm:pb-32">
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.image_url}
          alt="Bain de galvanisation à chaud"
          fill
          className="object-cover"
          priority
          data-ai-hint="molten zinc"
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
                <h2 className="font-headline text-5xl md:text-8xl font-bold text-white leading-tight">
                  {hero.title}
                </h2>
                <div className="mt-4 text-lg text-gray-300 max-w-xl">
                    <p className="font-bold">UNITE DE PRODUCTION</p>
                    <p>Surface de 40.000 m2 dont 6.000 m2 couvert Démarrage de la production : Octobre 2016 Budget d’investissement : 8</p>
                    <p>Constitué de Bains d’immersion de 13x1,8x3,5 m, permettant de traiter des articles métalliques de diverses longueurs allant jusqu’à 13m. Capacité de production: (08 heures) 1600 t / mois. 20.000 t/an.</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                 <Button size="lg" variant="destructive">{hero.cta_primary} <ArrowRight className="ml-2" /></Button>
                 <DownloadButton text={hero.cta_secondary} />
              </div>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper animation="slide-up" staggerIndex={1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {largeStat && (
                <AnimatedWrapper animation="fade-in-stagger" staggerIndex={1}>
                  <Card className="group bg-background/50 backdrop-blur-md border-border text-white h-full relative overflow-hidden transition-all duration-500 hover:border-accent">
                    <div className="absolute inset-0 bg-accent transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />
                    <CardContent className="relative p-4 flex flex-col items-center justify-center text-center h-full">
                      <DynamicAnimatedBaths />
                    </CardContent>
                  </Card>
                </AnimatedWrapper>
              )}
              <div className="grid grid-cols-2 gap-4">
                {smallStats.map((stat, index) => {
                  const Icon = iconMap[stat.icon];
                  return (
                    <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index + 2}>
                      <div className="group relative overflow-hidden rounded-lg">
                        <div className="absolute inset-0 bg-accent transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />
                          <Card className="bg-background/50 backdrop-blur-md border-border text-white relative transition-colors duration-300 group-hover:bg-transparent group-hover:border-accent">
                            <CardContent className="relative p-4 flex items-center gap-3">
                              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center transition-colors duration-300 group-hover:bg-accent-foreground/10">
                                {Icon && <Icon className="h-6 w-6 text-accent transition-colors duration-300 group-hover:text-white" />}
                              </div>
                              <div>
                                <p className="text-xl font-bold">{stat.value}</p>
                                <p className="text-xs text-gray-300 group-hover:text-gray-100">{stat.title}</p>
                              </div>
                            </CardContent>
                          </Card>
                      </div>
                    </AnimatedWrapper>
                  );
                })}
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}