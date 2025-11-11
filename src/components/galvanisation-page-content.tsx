
"use client";

import Image from 'next/image';
import * as React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { galvanisationContent } from '@/config/galvanisation-data';
import { ArrowRight, Info } from 'lucide-react';
import { iconMap as galvanisationIconMap } from '@/config/galvanisation-data';
import { cn } from '@/lib/utils';
import { AnimatedWrapper } from './animated-wrapper';
import { DownloadButton } from './ui/download-button';
import { BathsIcon } from './icons/baths-icon';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

const DynamicAnimatedBaths = dynamic(() => import('./animated-baths').then(mod => mod.AnimatedBaths));

const HeroSection = dynamic(() => Promise.resolve(UnwrappedHeroSection));
const ProcessTimeline = dynamic(() => Promise.resolve(UnwrappedProcessTimeline));
const BenefitsSection = dynamic(() => Promise.resolve(UnwrappedBenefitsSection));
const HighlightSection = dynamic(() => Promise.resolve(UnwrappedHighlightSection));
const CTASection = dynamic(() => Promise.resolve(UnwrappedCTASection));


// Main Page Component
export function GalvanisationPageContent() {
  return (
    <div className="text-foreground">
      <HeroSection />
      <ProcessTimeline />
      <BenefitsSection />
      <HighlightSection />
      <CTASection />
    </div>
  );
}

// 1. Hero Section
function UnwrappedHeroSection() {
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
                <p className="mt-4 text-lg text-gray-300 max-w-xl">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {largeStat && (
                <AnimatedWrapper animation="fade-in-stagger" staggerIndex={1}>
                  <Card className="bg-background/50 backdrop-blur-md border-border text-white h-full">
                    <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
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
                      <Card className="bg-background/50 backdrop-blur-md border-border text-white">
                        <CardContent className="p-4 flex items-center gap-3">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                            {Icon && <Icon className="h-6 w-6 text-accent" />}
                          </div>
                          <div>
                            <p className="text-xl font-bold">{stat.value}</p>
                            <p className="text-xs text-gray-300">{stat.title}</p>
                          </div>
                        </CardContent>
                      </Card>
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


// 2. Process Timeline Section
function UnwrappedProcessTimeline() {
    const { galvanisation_steps } = galvanisationContent;
    const iconMap = useMemo(() => galvanisationIconMap, []);
  
    return (
      <section className="relative w-full bg-secondary text-foreground py-32 px-6">
        <AnimatedWrapper 
            animation="fade-in"
            className="text-center mb-24 max-w-screen-xl mx-auto"
        >
            <h2 className="font-headline text-4xl font-bold text-center text-primary mb-4">
                Le processus de galvanisation pas à pas
            </h2>
            <p className='text-center text-lg text-muted-foreground max-w-3xl mx-auto'>
                Chaque pièce d’acier passe par une transformation alchimique. De brute et vulnérable, elle ressort invincible, gainée d’un bouclier de zinc. Voici le voyage, étape par étape.
            </p>
        </AnimatedWrapper>
        <div className="relative max-w-screen-2xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-accent/30 hidden md:block" />
          {galvanisation_steps.map((step, i) => {
                const Icon = iconMap[step.icon];
                const isLeft = i % 2 === 0;
                return (
                <AnimatedWrapper
                    key={i}
                    animation={isLeft ? 'slide-up' : 'slide-up'}
                    className={cn("mb-12 flex w-full items-center", isLeft ? "md:justify-start" : "md:justify-end")}
                >
                    <div className="w-full md:w-1/2 relative px-4 md:px-0">
                      <div className="absolute -top-5 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl border-4 border-secondary z-10"
                          style={isLeft ? {right: '-2rem'} : {left: '-2rem'}}
                      >
                          {step.step}
                      </div>
                      <div className={cn("hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 w-8 bg-accent/30", isLeft ? 'right-0' : 'left-0')} />
                      
                      <div
                          className={cn(
                              "relative bg-card text-foreground rounded-xl border border-border shadow-lg group transition-all duration-300 hover:border-accent overflow-hidden",
                          )}
                      >
                        {/* Shape-defining elements */}
                        <div className="absolute -top-2 -right-2 w-12 h-12 bg-secondary transform rotate-45"></div>
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary transform rotate-45"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 bg-card rounded-bl-full"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-card rounded-tr-full"></div>
                        
                        <div className="relative z-10 p-6 flex items-start gap-6">
                           <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border-2 border-accent mt-1">
                              {Icon && <Icon className="h-8 w-8 text-accent" />}
                          </div>
                          <div className="flex-grow">
                              <h3 className="text-4xl font-extrabold text-primary mb-1 uppercase tracking-wider">
                                  {step.title}
                              </h3>
                              <p className="text-xl text-accent font-semibold mb-3">{step.shortDesc}</p>
                          </div>
                        </div>
                        <div className="relative z-10 h-0 overflow-hidden group-hover:h-auto transition-all duration-500 ease-in-out">
                            <div className="px-6 pb-6">
                                <blockquote className="text-lg text-muted-foreground italic border-l-2 border-border pl-4">
                                {step.longDesc}
                                </blockquote>
                                <div className="mt-4 text-base text-muted-foreground/80 flex flex-col sm:flex-row justify-end gap-x-4 gap-y-1 font-mono pr-4">
                                    <span>TEMP: {step.meta.temperature}</span>
                                    <span>DURÉE: {step.meta.duration}</span>
                                </div>
                            </div>
                        </div>

                      </div>
                    </div>
                </AnimatedWrapper>
                )
          })}
        </div>
      </section>
    );
}

// 3. Benefits Section
function UnwrappedBenefitsSection() {
    const { benefits } = galvanisationContent;
    const iconMap = useMemo(() => galvanisationIconMap, []);
  
    return (
      <section className="py-32 bg-background">
        <div className="max-w-screen-xl mx-auto">
            <AnimatedWrapper animation="fade-in">
              <Card className="bg-secondary border-border p-8 transition-all duration-300 hover:border-accent hover:-translate-y-2">
                  <CardContent className="p-6 flex flex-col md:flex-row items-center gap-10">
                    <div className="flex-shrink-0">
                      {React.createElement(iconMap['ShieldCheck'], { className: "h-24 w-24 text-accent mx-auto mb-4" })}
                    </div>
                    <div className="text-left">
                      <CardTitle className="text-accent text-4xl mb-4">SPÉCIFICITÉ DE LA GALVANISATION À CHAUD</CardTitle>
                      <p className="text-xl text-accent/80 mb-8">
                      « Une protection anticorrosion qui va au-delà d’un simple dépôt de zinc »
                      </p>
                      <p className="text-xl text-muted-foreground max-w-4xl">La galvanisation à chaud ne consiste pas uniquement à déposer du zinc à la surface de l’acier. Le revêtement de zinc est métallurgiquement lié à l’acier de base, car il se produit une réaction métallurgique de diffusion entre le zinc et le fer. Quand on retire l’acier du bain, il s’est formé à sa surface plusieurs couches d’alliages zinc-fer sur lesquelles le zinc entraîné se solidifie. <span className="font-bold text-accent">Ces différentes couches d’alliages plus dures que l’acier de base ont une teneur en zinc de plus en plus élevée au fur et à mesure que l’on se rapproche de la surface du revêtement.</span> Ainsi, cette spécificité liée au procédé de galvanisation offre au revêtement protecteur adhérence, imperméabilité, et résistance mécanique. De plus, l’épaisseur de ce est supérieure à celle obtenue avec les autres techniques de protection</p>
                    </div>
                  </CardContent>
              </Card>
            </AnimatedWrapper>
          <div className="grid md:grid-cols-3 gap-8 mt-16 px-4">
            {benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon];
              return (
                <AnimatedWrapper
                  key={index}
                  animation="slide-up"
                  staggerIndex={index}
                >
                    <Card className="bg-secondary border-border text-center p-8 h-full transition-all duration-300 hover:border-accent hover:-translate-y-2">
                        {Icon && <Icon className="h-12 w-12 text-accent mx-auto mb-4" />}
                        <CardTitle className="text-primary text-2xl">{benefit.title}</CardTitle>
                        <CardContent className="p-0 mt-4">
                            <p className="text-muted-foreground">{benefit.text}</p>
                        </CardContent>
                    </Card>
                </AnimatedWrapper>
              );
            })}
          </div>
        </div>
      </section>
    );
}

// 4. Highlight Section
function UnwrappedHighlightSection() {
    const { highlight } = galvanisationContent;
    const iconMap = useMemo(() => galvanisationIconMap, []);
  
    return (
      <section className="py-32 bg-secondary">
        <div className="max-w-screen-xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedWrapper animation="slide-up">
                <h2 className="font-headline text-4xl font-bold text-primary">
                    {highlight.title}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-lg">
                    {highlight.text}
                </p>
            </AnimatedWrapper>
            <AnimatedWrapper animation="fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {highlight.icons.map((iconName, index) => {
                        const Icon = iconMap[iconName];
                        return (
                           <AnimatedWrapper
                              key={iconName}
                              animation="zoom-in"
                              staggerIndex={index}
                            >
                                <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg text-center">
                                    {Icon && <Icon className="h-12 w-12 text-accent mb-2" />}
                                    <span className="text-foreground font-semibold capitalize">{iconName}</span>
                                </div>
                            </AnimatedWrapper>
                        );
                    })}
                </div>
            </AnimatedWrapper>
        </div>
      </section>
    );
}

// 5. CTA Section
function UnwrappedCTASection() {
    const { cta } = galvanisationContent;
  
    return (
      <section className="py-32 bg-background">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
            <AnimatedWrapper animation="zoom-in">
                <h2 className="font-headline text-4xl font-bold text-primary max-w-2xl mx-auto">
                    {cta.title}
                </h2>
                <div className="mt-8 flex justify-center flex-wrap gap-4">
                    <Button asChild size="lg" variant="destructive">
                        <a href={cta.form_url} className="flex items-center gap-2">
                            {cta.button_primary} <ArrowRight className="ml-2" />
                        </a>
                    </Button>
                    <DownloadButton text={cta.button_secondary} />
                </div>
            </AnimatedWrapper>
        </div>
      </section>
    );
}
