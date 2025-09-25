
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Button } from './ui/button';
import { ArrowRight, Zap, ShieldCheck, ChevronsRight, Layers, Wind, Droplets, Thermometer, Sun, PackageCheck } from 'lucide-react';
import React from 'react';
import YouTube from 'react-youtube';

const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-20 sm:py-28 ${className}`}>
    <div className="container mx-auto px-4">{children}</div>
  </section>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="font-headline text-5xl font-bold text-primary mb-16 text-center">
    {children}
  </h2>
);

const processSteps = [
  {
    icon: <Droplets className="h-10 w-10" />,
    title: 'Dégraissage',
    description: 'Élimination des huiles, graisses et salissures de la surface de l’acier.',
  },
  {
    icon: <Zap className="h-10 w-10" />,
    title: 'Décapage',
    description: 'Immersion dans un bain d’acide pour enlever la rouille et la calamine.',
  },
    {
    icon: <Layers className="h-10 w-10" />,
    title: 'Fluxage',
    description: 'Application d’une solution pour prévenir l’oxydation avant l’immersion.',
  },
  {
    icon: <Sun className="h-10 w-10" />,
    title: 'Séchage',
    description: 'Les pièces sont séchées pour éviter les éclaboussures dans le bain de zinc.',
  },
  {
    icon: <Thermometer className="h-10 w-10" />,
    title: 'Galvanisation',
    description: 'Immersion dans un bain de zinc en fusion à 450°C pour créer un revêtement protecteur.',
  },
  {
    icon: <PackageCheck className="h-10 w-10" />,
    title: 'Contrôle',
    description: 'Inspection de la qualité du revêtement, de l’épaisseur et de la finition.',
  },
];

const advantages = [
  {
    title: 'Durabilité Exceptionnelle',
    description: 'Une protection qui peut durer plus de 50 ans, même dans les environnements les plus difficiles.',
    icon: <ShieldCheck className="w-12 h-12" />,
  },
  {
    title: 'Protection Intégrale',
    description: 'Le zinc couvre 100% de la surface, y compris les cavités, les angles et les zones difficiles d’accès.',
    icon: <Layers className="w-12 h-12" />,
  },
  {
    title: 'Rentabilité à Long Terme',
    description: 'Un coût initial compétitif et une absence quasi-totale de maintenance pour des décennies.',
    icon: <Zap className="w-12 h-12" />,
  },
  {
    title: 'Fiabilité et Prévisibilité',
    description: 'Le processus est normé (ISO 1461), garantissant une qualité et une performance constantes et mesurables.',
    icon: <ChevronsRight className="w-12 h-12" />,
  },
];


export function GalvanisationPageContent() {
  const videoId = 'FquIZa7qT6g'; // Example video ID

  return (
    <>
      <section className="relative h-[80vh] w-full flex items-center justify-center text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <YouTube
            videoId={videoId}
            opts={{
              height: '100%',
              width: '100%',
              playerVars: {
                autoplay: 1,
                controls: 0,
                loop: 1,
                mute: 1,
                playlist: videoId,
                showinfo: 0,
                modestbranding: 1,
              },
            }}
            className="absolute top-1/2 left-1/2 w-full h-full -translate-x-1/2 -translate-y-1/2 object-cover"
            onReady={(event) => event.target.playVideo()}
          />
        </div>
        <div className="absolute inset-0 bg-primary/70 z-10" />
        <div className="relative z-20 text-center px-4">
          <AnimatedWrapper animation="fade-in">
            <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase">
              Galvanisation <span className="text-accent">à Chaud</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
              La protection ultime pour l'acier, assurant une longévité et une résistance inégalées contre la corrosion.
            </p>
          </AnimatedWrapper>
        </div>
      </section>

      <Section className="bg-secondary">
        <SectionTitle>Notre Processus de Galvanisation</SectionTitle>
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2 hidden md:block"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {processSteps.map((step, index) => (
              <AnimatedWrapper key={index} animation="slide-up">
                <div className={`flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-shrink-0 w-24 h-24 rounded-full bg-accent text-white flex items-center justify-center border-4 border-white shadow-lg">
                    {step.icon}
                  </div>
                  <div className={`text-left ${index % 2 !== 0 && 'md:text-right'}`}>
                    <h3 className="font-headline text-3xl font-bold text-primary mb-3">{step.title}</h3>
                    <p className="text-lg">{step.description}</p>
                  </div>
                </div>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </Section>
      
      <Section className="bg-background">
        <SectionTitle>Les Avantages Clés</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
              <div className="p-8 border border-border rounded-lg text-center h-full flex flex-col items-center group hover:border-accent transition-colors duration-300">
                <div className="mb-6 text-accent transition-transform duration-300 group-hover:scale-110">
                  {advantage.icon}
                </div>
                <h3 className="font-headline text-2xl font-bold text-primary mb-3">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </Section>

      <Section className="bg-primary text-primary-foreground">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedWrapper animation="zoom-in">
                <div>
                    <h2 className="font-headline text-5xl font-bold mb-6">Nos Capacités Techniques</h2>
                    <p className="text-lg text-primary-foreground/80 mb-8">
                        Notre usine est équipée d'un des plus grands bains de galvanisation en Afrique, nous permettant de traiter des pièces de dimensions exceptionnelles avec une efficacité et une qualité maximales.
                    </p>
                    <div className="space-y-6">
                        <div className="bg-background/10 p-6 rounded-lg">
                            <h3 className="font-headline text-2xl font-bold text-accent">Dimensions du Bain</h3>
                            <p className="text-xl">13m (L) x 1.6m (l) x 3.2m (P)</p>
                        </div>
                         <div className="bg-background/10 p-6 rounded-lg">
                            <h3 className="font-headline text-2xl font-bold text-accent">Capacité Annuelle</h3>
                            <p className="text-xl">60 000 tonnes</p>
                        </div>
                    </div>
                </div>
            </AnimatedWrapper>
            <AnimatedWrapper animation="fade-in-stagger" staggerIndex={1}>
                <Image
                    src="https://images.unsplash.com/photo-1569968201228-01aebb252e80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxtZXRhbCUyMGZhY3Rvcnl8ZW58MHx8fHwxNzUzODc2NjczfDA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Bain de galvanisation"
                    width={600}
                    height={600}
                    className="rounded-lg shadow-2xl w-full h-auto object-cover"
                    data-ai-hint="galvanization bath"
                />
            </AnimatedWrapper>
        </div>
      </Section>

      <Section className="bg-accent">
         <AnimatedWrapper animation="fade-in">
            <div className="text-center">
                <h2 className="font-headline text-4xl font-bold text-accent-foreground mb-4">Protégez vos investissements avec BORDJ STEEL</h2>
                <p className="text-accent-foreground/90 text-lg max-w-3xl mx-auto mb-8">
                    Contactez nos experts pour discuter de votre projet et obtenir un devis personnalisé pour vos besoins en galvanisation.
                </p>
                <Button size="lg" variant="outline" className="bg-background text-primary hover:bg-background/90" asChild>
                    <a href="#contact">
                    Demander un Devis
                    <ArrowRight className="ml-2" />
                    </a>
                </Button>
            </div>
         </AnimatedWrapper>
      </Section>
    </>
  );
}
