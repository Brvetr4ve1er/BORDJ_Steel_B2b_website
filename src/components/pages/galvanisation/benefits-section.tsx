/**
 * Benefits Section Component for Galvanisation Page
 *
 * This component highlights the primary benefits and expertise of the hot-dip
 * galvanisation process. It dynamically maps benefit items to corresponding icons
 * and renders an embedded secondary component detailing techniques and standards.
 */
"use client";

import React, { useMemo } from 'react';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { galvanisationContent, iconMap as galvanisationIconMap } from '@/config/galvanisation-data';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { TechniquesAndStandardsSection } from './techniques-and-standards-section';

export function BenefitsSection() {
    const { benefits } = galvanisationContent;
    const iconMap = useMemo(() => galvanisationIconMap, []);

    return (
      <section className="py-32 bg-background">
        <div className="container mx-auto">
          <AnimatedWrapper animation="fade-in">
              <Card className="text-center mb-20 p-8 bg-secondary shadow-lg">
                  <h2 className="font-headline text-5xl font-bold text-accent mb-6">Notre Expertise en Galvanisation</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                  Explorez les avantages de notre processus de galvanisation à chaud, une méthode éprouvée pour une protection anti-corrosion supérieure. Nous combinons technologie de pointe et savoir-faire pour garantir la longévité et la fiabilité de chaque pièce traitée.
                  </p>
              </Card>
          </AnimatedWrapper>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            <div className="lg:col-span-2 space-y-8">
                <AnimatedWrapper animation="fade-in">
                    <Card className="bg-secondary border-border p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2">
                        <CardContent className="p-0 flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-shrink-0">
                                {React.createElement(iconMap['ShieldCheck'], { className: "h-20 w-20 text-accent" })}
                            </div>
                            <div className="flex-grow text-left">
                                <CardTitle className="text-accent text-3xl mb-3">SPÉCIFICITÉ DE LA GALVANISATION À CHAUD</CardTitle>
                                <p className="text-xl text-accent/80 mb-4">
                                « Une protection anticorrosion qui va au-delà d’un simple dépôt de zinc »
                                </p>
                            </div>
                        </CardContent>
                          <p className="text-xl text-foreground mt-4 text-justify">La galvanisation à chaud ne consiste pas uniquement à déposer du zinc à la surface de l’acier. Le revêtement de zinc est métallurgiquement lié à l’acier de base, car il se produit une réaction métallurgique de diffusion entre le zinc et le fer. Quand on retire l’acier du bain, il s’est formé à sa surface plusieurs couches d’alliages zinc-fer sur lesquelles le zinc entraîné se solidifie. <strong className="font-bold text-accent">Ces différentes couches d’alliages plus dures que l’acier de base ont une teneur en zinc de plus en plus élevée au fur et à mesure que l’on se rapproche de la surface du revêtement.</strong> Ainsi, cette spécificité liée au procédé de galvanisation offre au revêtement protecteur adhérence, imperméabilité, et résistance mécanique. De plus, l’épaisseur de ce est supérieure à celle obtenue avec les autres techniques de protection</p>
                    </Card>
                </AnimatedWrapper>
                 <div className="grid md:grid-cols-1 gap-8 mt-8">
                    {benefits.map((benefit, index) => {
                      const Icon = iconMap[benefit.icon];
                      return (
                        <AnimatedWrapper
                          key={index}
                          animation="slide-up"
                          staggerIndex={index}
                        >
                            <Card className="bg-secondary border-border p-6 h-full transition-all duration-300 hover:border-accent hover:-translate-y-2">
                                <CardContent className="p-0 flex items-center gap-6">
                                    {Icon && <Icon className="h-12 w-12 text-accent flex-shrink-0" />}
                                    <div>
                                      <CardTitle className="text-primary text-2xl mb-2">{benefit.title}</CardTitle>
                                      <p className="text-muted-foreground">{benefit.text}</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </AnimatedWrapper>
                      );
                    })}
                  </div>
            </div>
            <div className="lg:col-span-3">
                <AnimatedWrapper animation="fade-in" staggerIndex={1}>
                    <TechniquesAndStandardsSection />
                </AnimatedWrapper>
            </div>
          </div>
        </div>
      </section>
    );
}