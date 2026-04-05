/**
 * Highlight Section Component for Galvanisation Page
 *
 * Displays key highlights or features related to the galvanisation service,
 * presenting them in a responsive grid layout with animated icons.
 */
"use client";

import React, { useMemo } from 'react';
import { galvanisationContent, iconMap as galvanisationIconMap } from '@/config/galvanisation-data';
import { AnimatedWrapper } from '@/components/animated-wrapper';

export function HighlightSection() {
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