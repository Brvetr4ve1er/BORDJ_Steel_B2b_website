
"use client";

import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { galvanisationContent } from '@/config/galvanisation-data';
import { ArrowRight } from 'lucide-react';
import { iconMap } from '@/config/galvanisation-data';
import { cn } from '@/lib/utils';
import { AnimatedWrapper } from './animated-wrapper';

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
function HeroSection() {
  const { hero } = galvanisationContent;

  return (
    <section className="relative min-h-screen flex items-center bg-background py-24 sm:py-32">
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.image_url}
          alt="Bain de galvanisation à chaud"
          fill
          className="object-cover"
          priority
          data-ai-hint="molten zinc"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 w-full relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <AnimatedWrapper animation="slide-up">
            <div className="text-left space-y-8">
              <div>
                <h1 className="font-headline text-5xl md:text-6xl font-bold text-white leading-tight">
                  {hero.title}
                </h1>
                <p className="mt-4 text-lg text-gray-300 max-w-xl">
                  {hero.subtitle}
                </p>
              </div>
              <div className="flex flex-row items-start gap-4">
                 <Button size="lg" variant="destructive">{hero.cta_primary} <ArrowRight className="ml-2" /></Button>
                 <Button size="lg" variant="secondary">{hero.cta_secondary}</Button>
              </div>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper animation="slide-up" staggerIndex={1}>
            <div className="grid grid-cols-2 gap-4">
              {hero.stats.map((stat, index) => {
                const Icon = iconMap[stat.icon];
                return (
                  <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index + 2}>
                    <Card className="bg-background/50 backdrop-blur-md border-border text-white">
                      <CardContent className="p-4 flex items-center gap-3">
                        {Icon && <Icon className="h-8 w-8 text-accent" />}
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
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}


// 2. Process Timeline Section
function ProcessTimeline() {
    const { galvanisation_steps } = galvanisationContent;
  
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
        <div className="relative max-w-5xl mx-auto">
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
                              <h3 className="text-xl font-extrabold text-primary mb-1 uppercase tracking-wider">
                                  {step.title}
                              </h3>
                              <p className="text-sm text-accent font-semibold mb-3">{step.shortDesc}</p>
                          </div>
                        </div>
                        <div className="relative z-10 h-0 overflow-hidden group-hover:h-auto transition-all duration-500 ease-in-out">
                            <div className="px-6 pb-6">
                                <blockquote className="text-sm text-muted-foreground italic border-l-2 border-border pl-4">
                                {step.longDesc}
                                </blockquote>
                                <div className="mt-4 text-xs text-muted-foreground/80 flex flex-col sm:flex-row justify-end gap-x-4 gap-y-1 font-mono pr-4">
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
function BenefitsSection() {
    const { benefits } = galvanisationContent;
  
    return (
      <section className="py-32 bg-background">
        <div className="max-w-screen-xl mx-auto px-4">
          <AnimatedWrapper animation="fade-in">
            <h2 className="font-headline text-4xl font-bold text-center text-primary mb-16">
              Les avantages de la galvanisation
            </h2>
          </AnimatedWrapper>
          <div className="grid md:grid-cols-3 gap-8">
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
function HighlightSection() {
    const { highlight } = galvanisationContent;
  
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
function CTASection() {
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
                    <Button size="lg" variant="secondary">
                        <div className="flex items-center gap-2">
                            {cta.button_secondary}
                        </div>
                    </Button>
                </div>
            </AnimatedWrapper>
        </div>
      </section>
    );
}
