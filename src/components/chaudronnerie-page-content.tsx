
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import React from 'react';

export function ChaudronneriePageContent() {
  return (
    <div className="bg-background text-foreground">
      {/* 1. Hero Banner */}
      <section className="relative h-screen w-full flex items-center justify-start text-white overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1510900767338-8bf61abf2562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMG1lbHRpbmclMjBmYWN0b3J5fGVufDB8fHx8MTc1Mzg3Njc2NXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Opération de chaudronnerie"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-40"
          data-ai-hint="metal fabrication"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/20 z-10" />
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl text-left">
            <AnimatedWrapper animation="zoom-in">
              <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase text-primary">
                Chaudronnerie
              </h1>
              <p className="mt-6 text-xl md:text-2xl max-w-3xl text-foreground/80">
                Fabrication sur mesure d'équipements industriels de haute précision.
              </p>
              <Button size="lg" variant="destructive" className="mt-8 bg-accent hover:bg-accent/90 text-white font-bold text-lg px-10 py-6 group">
                  Explorer nos capacités
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </AnimatedWrapper>
          </div>
        </div>
      </section>

      {/* Placeholder for future content */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-4xl font-bold text-primary mb-4">Contenu à venir</h2>
            <p className="text-lg text-muted-foreground">Plus de détails sur nos services de chaudronnerie seront bientôt disponibles ici.</p>
        </div>
      </section>
    </div>
  );
}
