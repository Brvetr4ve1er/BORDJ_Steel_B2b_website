
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { galvanisationContent, iconMap } from '@/config/galvanisation-data';
import { ArrowRight } from 'lucide-react';
import { AnimatedWrapper } from './animated-wrapper';

// Main Page Component
export function GalvanisationPageContent() {
  return (
    <div className="bg-[#101010] text-gray-200">
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
    <section className="relative min-h-screen flex items-end bg-black">
      <div className="absolute inset-0 z-0 opacity-40">
        <Image
          src={hero.image_url}
          alt="Bain de galvanisation à chaud"
          fill
          className="object-cover"
          priority
          data-ai-hint="molten zinc"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="container mx-auto px-4 relative z-10 pb-24">
        <div className="grid md:grid-cols-2 gap-8 items-end">
          <div className="text-left">
            <AnimatedWrapper animation="fade-in">
              <h1 className="font-headline text-5xl md:text-6xl font-bold text-white leading-tight">
                {hero.title}
              </h1>
              <p className="mt-4 text-lg text-gray-300 max-w-xl">
                {hero.subtitle}
              </p>
            </AnimatedWrapper>
            <AnimatedWrapper animation="fade-in" staggerIndex={1}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" variant="destructive" className="bg-accent hover:bg-accent/90">
                  {hero.cta_primary} <ArrowRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 hover:text-white">
                  {hero.cta_secondary}
                </Button>
              </div>
            </AnimatedWrapper>
          </div>
          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-6">
              {hero.stats.map((stat, index) => {
                const Icon = iconMap[stat.icon];
                return (
                  <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                    <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                      <CardContent className="p-6 flex items-center gap-4">
                        {Icon && <Icon className="h-10 w-10 text-accent" />}
                        <div>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-sm text-gray-300">{stat.title}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </AnimatedWrapper>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


// 2. Process Timeline Section
function ProcessTimeline() {
    const { galvanisation_steps } = galvanisationContent;
  
    return (
      <section className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4">
          <AnimatedWrapper animation="fade-in">
            <h2 className="font-headline text-4xl font-bold text-center text-white mb-16">
              Le processus de galvanisation pas à pas
            </h2>
          </AnimatedWrapper>
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-gray-700" />
            {galvanisation_steps.map((step, index) => {
              const Icon = iconMap[step.icon];
              const isEven = index % 2 === 0;
  
              return (
                <motion.div
                  key={step.step}
                  className="relative mb-12 flex items-center"
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <div className={`w-1/2 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                      <div className={`flex items-center gap-4 ${isEven ? 'justify-end' : 'justify-start'}`}>
                        {isEven && <h3 className="font-headline text-xl font-bold text-white">{step.title}</h3>}
                        {Icon && <Icon className="h-8 w-8 text-accent" />}
                        {!isEven && <h3 className="font-headline text-xl font-bold text-white">{step.title}</h3>}
                      </div>
                      <p className="mt-2 text-gray-400">{step.description}</p>
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-accent flex items-center justify-center text-white font-bold border-4 border-[#1A1A1A]">
                    {step.step}
                  </div>
                  <div className="w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    );
}

// 3. Benefits Section
function BenefitsSection() {
    const { benefits } = galvanisationContent;
  
    return (
      <section className="py-20 bg-[#101010]">
        <div className="container mx-auto px-4">
          <AnimatedWrapper animation="fade-in">
            <h2 className="font-headline text-4xl font-bold text-center text-white mb-12">
              Les avantages de la galvanisation
            </h2>
          </AnimatedWrapper>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon];
              return (
                <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                    <Card className="bg-gray-900 border-gray-800 text-center p-8 h-full transition-all duration-300 hover:border-accent hover:-translate-y-2">
                        {Icon && <Icon className="h-12 w-12 text-accent mx-auto mb-4" />}
                        <CardTitle className="text-white text-2xl">{benefit.title}</CardTitle>
                        <CardContent className="p-0 mt-4">
                            <p className="text-gray-400">{benefit.text}</p>
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
      <section className="py-20 bg-[#1A1A1A]">
        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedWrapper animation="fade-in">
                <h2 className="font-headline text-4xl font-bold text-white">
                    {highlight.title}
                </h2>
                <p className="mt-4 text-lg text-gray-400 max-w-lg">
                    {highlight.text}
                </p>
            </AnimatedWrapper>
            <AnimatedWrapper animation="fade-in" staggerIndex={1}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {highlight.icons.map((iconName) => {
                        const Icon = iconMap[iconName];
                        return (
                            <div key={iconName} className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg text-center">
                                {Icon && <Icon className="h-12 w-12 text-accent mb-2" />}
                                <span className="text-white font-semibold capitalize">{iconName}</span>
                            </div>
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
      <section className="py-24 bg-[#101010]">
        <div className="container mx-auto px-4 text-center">
            <AnimatedWrapper animation="zoom-in">
                <h2 className="font-headline text-4xl font-bold text-white max-w-2xl mx-auto">
                    {cta.title}
                </h2>
                <div className="mt-8 flex justify-center flex-wrap gap-4">
                    <Button asChild size="lg" variant="destructive" className="bg-accent hover:bg-accent/90">
                        <a href={cta.form_url}>{cta.button_primary} <ArrowRight className="ml-2" /></a>
                    </Button>
                    <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 hover:text-white">
                        {cta.button_secondary}
                    </Button>
                </div>
            </AnimatedWrapper>
        </div>
      </section>
    );
}
