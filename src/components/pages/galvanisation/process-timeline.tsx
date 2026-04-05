/**
 * Process Timeline Component for Galvanisation Page
 *
 * This component visualizes the step-by-step galvanisation process in a vertical timeline format.
 * Each step alternates left/right alignment and includes animations, descriptive text, and
 * hover states revealing technical meta-information (e.g., temperature and duration).
 */
"use client";

import React, { useMemo } from 'react';
import { galvanisationContent, iconMap as galvanisationIconMap } from '@/config/galvanisation-data';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { cn } from '@/lib/utils';

export function ProcessTimeline() {
    const { galvanisation_steps } = galvanisationContent;
    const iconMap = useMemo(() => galvanisationIconMap, []);

    return (
      <section className="relative w-full bg-secondary text-foreground py-32 px-6">
        <AnimatedWrapper
            animation="fade-in"
            className="text-center mb-24 max-w-screen-xl mx-auto"
        >
            <h2 className="font-headline text-5xl font-bold text-center text-accent mb-4">
                LE PROCEDE D'APPLICATION
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