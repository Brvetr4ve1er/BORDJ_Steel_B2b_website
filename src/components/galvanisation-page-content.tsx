
"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { galvanisationContent } from '@/config/galvanisation-data';
import { ArrowRight } from 'lucide-react';
import { iconMap } from '@/config/galvanisation-data';

// Main Page Component
export function GalvanisationPageContent() {
  return (
    <div className="text-gray-200">
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
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <h1 className="font-headline text-5xl md:text-6xl font-bold text-white leading-tight">
                {hero.title}
              </h1>
              <p className="mt-4 text-lg text-gray-300 max-w-xl">
                {hero.subtitle}
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" variant="destructive" className="bg-accent hover:bg-accent/90">
                  {hero.cta_primary} <ArrowRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-white border-white/50 hover:bg-white/10 hover:text-white">
                  {hero.cta_secondary}
                </Button>
              </div>
                 <div className="mt-12 grid grid-cols-2 gap-6">
                  {hero.stats.map((stat, index) => {
                    const Icon = iconMap[stat.icon];
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      >
                        <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white">
                          <CardContent className="p-6 flex items-center gap-4">
                            {Icon && <Icon className="h-10 w-10 text-accent" />}
                            <div>
                              <p className="text-2xl font-bold">{stat.value}</p>
                              <p className="text-sm text-gray-300">{stat.title}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
            </motion.div>
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
      <section className="relative w-full bg-[#1A1A1A] text-gray-200 py-24 px-6">
        <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true, amount: 0.5 }} 
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
        >
            <h2 className="font-headline text-4xl font-bold text-center text-white mb-4">
                Le processus de galvanisation pas à pas
            </h2>
            <p className='text-center text-lg text-gray-400 max-w-3xl mx-auto'>
                Chaque pièce d’acier passe par une transformation alchimique. De brute et vulnérable, elle ressort invincible, gainée d’un bouclier de zinc. Voici le voyage, étape par étape.
            </p>
        </motion.div>
        <div className="relative max-w-6xl mx-auto">
            {/* The visual connecting line */}
            <div className="absolute left-1/2 top-0 h-full w-0.5 bg-accent/30 hidden md:block" />
            <div className="space-y-16">
            {galvanisation_steps.map((step, i) => {
                 const Icon = iconMap[step.icon];
                 const isLeft = i % 2 === 0;
                 return (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        className={`relative flex items-center ${
                          isLeft ? "justify-start" : "justify-end"
                        }`}
                    >
                        <div className={`hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent items-center justify-center text-white font-bold border-4 border-[#1A1A1A]`}>
                            {step.step}
                        </div>
                        <div className={`w-full md:w-5/12 ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
                            <div className="relative bg-black/50 backdrop-blur-sm text-gray-200 rounded-xl border border-gray-700 shadow-lg p-6 group transition-all duration-300 hover:border-accent">
                                <div className="flex md:hidden absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-accent items-center justify-center text-white font-bold border-4 border-[#1A1A1A]">
                                    {step.step}
                                </div>
                                <div className="absolute -top-3 -left-3 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center border-2 border-accent transition-all duration-300 group-hover:scale-110">
                                   {Icon && <Icon className="h-6 w-6 text-accent" />}
                                </div>
                                <h3 className="text-xl font-extrabold text-accent mb-2 uppercase tracking-wider mt-8">
                                    {step.title}
                                </h3>
                                <p className="text-sm text-gray-300 opacity-90 mb-4">{step.shortDesc}</p>
                                <p className="text-xs text-gray-400 font-mono">{step.longDesc}</p>
                                <div className="mt-4 text-xs text-accent/80 flex justify-between font-mono">
                                    <span>{step.meta.temperature}</span>
                                    <span>{step.meta.duration}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                 )
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
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
            <h2 className="font-headline text-4xl font-bold text-center text-white mb-12">
              Les avantages de la galvanisation
            </h2>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = iconMap[benefit.icon];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                    <Card className="bg-gray-900 border-gray-800 text-center p-8 h-full transition-all duration-300 hover:border-accent hover:-translate-y-2">
                        {Icon && <Icon className="h-12 w-12 text-accent mx-auto mb-4" />}
                        <CardTitle className="text-white text-2xl">{benefit.title}</CardTitle>
                        <CardContent className="p-0 mt-4">
                            <p className="text-gray-400">{benefit.text}</p>
                        </CardContent>
                    </Card>
                </motion.div>
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
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
                <h2 className="font-headline text-4xl font-bold text-white">
                    {highlight.title}
                </h2>
                <p className="mt-4 text-lg text-gray-400 max-w-lg">
                    {highlight.text}
                </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {highlight.icons.map((iconName, index) => {
                        const Icon = iconMap[iconName];
                        return (
                           <motion.div
                              key={iconName}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true, amount: 0.5 }}
                              transition={{ duration: 0.4, delay: index * 0.1 }}
                            >
                                <div className="flex flex-col items-center justify-center p-6 bg-gray-800 rounded-lg text-center">
                                    {Icon && <Icon className="h-12 w-12 text-accent mb-2" />}
                                    <span className="text-white font-semibold capitalize">{iconName}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </motion.div>
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
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.6 }}>
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
            </motion.div>
        </div>
      </section>
    );
}
