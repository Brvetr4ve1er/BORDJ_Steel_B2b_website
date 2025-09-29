
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Button } from './ui/button';
import { ArrowRight, Zap, ShieldCheck, Layers, Wind, Droplets, Thermometer, Sun, PackageCheck, Recycle, Calendar, Ruler, Atom, Construction, TowerControl, Car, Ship } from 'lucide-react';
import React from 'react';
import { cn } from '@/lib/utils';
import { AnimatedCounter } from './animated-counter';

const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <section className={`py-20 sm:py-28 ${className}`}>
    <div className="container mx-auto px-4">{children}</div>
  </section>
);

const SectionTitle = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <h2 className={cn("font-headline text-5xl font-bold text-white mb-16 text-center tracking-tighter", className)}>
    {children}
  </h2>
);

const processSteps = [
  {
    icon: <Droplets className="h-10 w-10" />,
    title: '1. Décontamination et Nettoyage',
    description: 'Objectif : Surface Nulle. Immersion dans des bains alcalins pour éliminer huiles, graisses et impuretés. Le moindre contaminant compromettrait l\'activation future de la surface.',
  },
  {
    icon: <Wind className="h-10 w-10" />,
    title: '2. Éradication de l\'Oxydation',
    description: 'Procédure : Activation Chimique. L\'acier passe dans un bain d\'acide chlorhydrique pour retirer calamine et rouille, révélant une surface métallique pure.',
  },
  {
    icon: <Atom className="h-10 w-10" />,
    title: '3. Pré-conditionnement Moléculaire',
    description: 'Mission : Prévenir la Réoxydation. Application d\'un flux de chlorure de zinc et d\'ammonium qui agit comme agent de mouillage et prépare le terrain pour la fusion.',
  },
  {
    icon: <Thermometer className="h-10 w-10" />,
    title: '4. Fusion Contrôlée : Le Bond Métallurgique',
    description: 'Noyau du Protocole. À 450°C, une réaction de diffusion crée les couches d\'alliages Zinc-Fer (Gamma, Delta, Zeta) formant l\'armure. La couche externe est du Zinc pur (Eta).',
  },
  {
    icon: <PackageCheck className="h-10 w-10" />,
    title: '5. Refroidissement et Finalisation',
    description: 'Fin du Cycle. Retrait lent pour l\'égouttage de l\'excès de zinc, suivi d\'un refroidissement. Le revêtement cristallise, créant une surface lisse et prête à l\'emploi.',
  },
];

const advantages = [
  {
    title: 'Protection Totale',
    description: 'Le zinc couvre 100% de la surface, y compris cavités et angles.',
    icon: <Layers className="w-8 h-8" />,
  },
  {
    title: 'Longévité Extrême',
    description: 'Une protection qui peut durer plus de 50 ans.',
    icon: <Calendar className="w-8 h-8" />,
  },
  {
    title: 'Économique',
    description: 'Coût initial compétitif et maintenance quasi nulle.',
    icon: <Zap className="w-8 h-8" />,
  },
  {
    title: 'Écologique',
    description: 'Le zinc est un élément naturel et 100% recyclable.',
    icon: <Recycle className="w-8 h-8" />,
  },
  {
    title: 'Polyvalence',
    description: 'Applicable à une vaste gamme de pièces et de structures.',
    icon: <Zap className="w-8 h-8" />,
  },
   {
    title: 'Résistance',
    description: 'Le revêtement est résistant aux chocs et à l\'abrasion.',
    icon: <ShieldCheck className="w-8 h-8" />,
  },
];

const applications = [
    { name: 'Construction', icon: <Construction className="w-12 h-12" /> },
    { name: 'Pylônes', icon: <TowerControl className="w-12 h-12" /> },
    { name: 'Mobilier Urbain', icon: <Car className="w-12 h-12" /> },
    { name: 'Transport', icon: <Ship className="w-12 h-12" /> },
    { name: 'Ouvrages Maritimes', icon: <Ship className="w-12 h-12" /> },
];

export function GalvanisationPageContent() {
  return (
    <div className="bg-[#1A1A1A] text-gray-200">
      {/* 1. Hero Banner */}
      <section className="relative h-screen w-full flex items-center justify-start text-white overflow-hidden">
        <Image
          src="https://i.pinimg.com/736x/5e/56/c4/5e56c4a55c30e8c82620e6ec3839700d.jpg"
          alt="Bain de galvanisation à chaud"
          layout="fill"
          objectFit="cover"
          className="z-0 opacity-30"
          data-ai-hint="molten zinc"
        />
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-2xl text-left">
            <AnimatedWrapper animation="zoom-in">
              <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase">
                GALVANISATION À CHAUD
              </h1>
              <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-300">
                Protection Intégrale, Pérennité Inégalée.
              </p>
              <Button size="lg" variant="destructive" className="mt-8 bg-[#C1272D] hover:bg-[#E53935] text-white font-bold text-lg px-10 py-6 group">
                  Découvrir le Procédé
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </AnimatedWrapper>
          </div>
        </div>
      </section>

      {/* 2. Service Overview */}
      <Section>
        <AnimatedWrapper animation="slide-up">
            <div className="text-center max-w-4xl mx-auto">
                <SectionTitle>Qu’est-ce que la galvanisation à chaud ?</SectionTitle>
                <p className="text-xl text-gray-400">
                    La galvanisation à chaud n'est pas un simple revêtement, mais la création d'une <strong>liaison métallurgique intégrée</strong>—une armure d'alliages Zinc-Fer programmée pour résister à l'environnement le plus agressif. C'est le standard de l'ingénierie moderne pour la pérennité structurelle.
                </p>
            </div>
            <div className="mt-20 grid md:grid-cols-2 gap-12 items-center">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                    <Image src="https://picsum.photos/seed/galva2/800/600" alt="Liaison métallurgique Zinc-Fer" layout="fill" objectFit='cover' data-ai-hint="metallurgy microscope" />
                </div>
                <div className="bg-gray-800/50 p-8 rounded-lg border border-gray-700">
                    <h3 className="font-headline text-3xl font-bold text-white mb-4">Une Véritable Liaison Métallurgique</h3>
                    <p className="text-lg text-gray-300">
                        Contrairement à une peinture, la galvanisation fusionne le zinc avec l'acier. Cette réaction crée des couches d'alliages ultra-résistantes qui font partie intégrante de la pièce, offrant une protection qui ne s'écaille pas et qui résiste aux impacts.
                    </p>
                </div>
            </div>
        </AnimatedWrapper>
      </Section>

      {/* 3. Detailed Process Steps */}
      <Section className="bg-black/20">
        <SectionTitle>Étapes Détaillées du Processus</SectionTitle>
        <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-1/2 top-0 h-full w-px bg-red-500/30 hidden md:block" />
            {processSteps.map((step, index) => (
                <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                    <div className={cn(
                        "relative flex items-center mb-12",
                         index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                    )}>
                       <div className="hidden md:block w-1/2" />
                        <div className="absolute left-1/2 -translate-x-1/2 hidden md:block">
                            <div className="w-5 h-5 rounded-full bg-[#C1272D] border-4 border-gray-800" />
                        </div>
                        <div className="md:w-1/2 p-8 bg-gray-800/60 border border-gray-700 rounded-lg shadow-lg">
                            <div className="flex items-center gap-6 mb-4">
                                <div className="w-16 h-16 flex-shrink-0 rounded-full bg-[#C1272D]/20 text-[#C1272D] flex items-center justify-center">
                                    {step.icon}
                                </div>
                                <h3 className="font-headline text-3xl font-bold text-white">{step.title}</h3>
                            </div>
                            <p className="text-gray-300 text-lg ml-22 pl-2">{step.description}</p>
                        </div>
                    </div>
                </AnimatedWrapper>
            ))}
        </div>
      </Section>

      {/* 4. Technical Specs & 5. Advantages */}
      <Section>
        <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
                <AnimatedWrapper animation="fade-in">
                    <div className="p-8 rounded-lg bg-gray-800/50 border border-red-500/50 h-full">
                        <h3 className="font-headline text-3xl font-bold text-white mb-6">Caractéristiques Techniques</h3>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Ruler className="w-8 h-8 text-red-400" />
                                <div>
                                    <p className="font-bold text-lg">Épaisseur Standard</p>
                                    <p className="text-gray-400">Garantie de 50 à <AnimatedCounter end={150} duration={2000} className="inline-block"/> µm</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-4">
                                <ShieldCheck className="w-8 h-8 text-red-400" />
                                <div>
                                    <p className="font-bold text-lg">Résistance Exceptionnelle</p>
                                    <p className="text-gray-400">Adhérence et résistance aux chocs supérieures</p>
                                </div>
                            </div>
                             <div className="flex items-center gap-4">
                                <Calendar className="w-8 h-8 text-red-400" />
                                <div>
                                    <p className="font-bold text-lg">Longévité du Bouclier</p>
                                    <p className="text-gray-400">Protection certifiée jusqu'à <AnimatedCounter end={50} duration={2000} className="inline-block"/> ans</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </AnimatedWrapper>
            </div>
            <div className="lg:col-span-3">
                 <AnimatedWrapper animation="fade-in">
                    <h3 className="font-headline text-3xl font-bold text-white mb-6">Avantages de la Galvanisation</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {advantages.map((advantage, index) => (
                          <AnimatedWrapper animation="fade-in-stagger" staggerIndex={index} key={index}>
                            <div className="p-6 rounded-lg bg-gray-900/40 border border-gray-800/70 transition-all duration-300 hover:border-red-500/50 hover:-translate-y-1 h-full">
                                <div className="text-red-500 mb-3">{advantage.icon}</div>
                                <h4 className="font-bold text-lg mb-1">{advantage.title}</h4>
                                <p className="text-sm text-gray-400">{advantage.description}</p>
                            </div>
                          </AnimatedWrapper>
                        ))}
                    </div>
                 </AnimatedWrapper>
            </div>
        </div>
      </Section>
      
      {/* 6. Applications */}
      <Section className="bg-black/20">
          <SectionTitle>Domaines d’Application</SectionTitle>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                {applications.map((app, index) => (
                    <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                      <div className="text-center group">
                          <div className="w-32 h-32 mx-auto rounded-full bg-gray-800/50 border border-gray-700 flex items-center justify-center transition-all duration-300 group-hover:bg-[#C1272D]/20 group-hover:border-[#C1272D]/50">
                            <div className="text-gray-400 transition-colors duration-300 group-hover:text-white"> {app.icon} </div>
                          </div>
                          <p className="mt-4 font-semibold text-lg">{app.name}</p>
                      </div>
                    </AnimatedWrapper>
                ))}
            </div>
      </Section>

      {/* Final CTA */}
      <Section>
         <AnimatedWrapper animation="zoom-in">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="font-headline text-4xl font-bold text-white mb-4">L'investissement dans la durabilité ZERO-MAINTENANCE.</h2>
                <p className="text-gray-400/90 text-lg mb-8">
                    Choisissez la performance BORDJ STEEL pour vos projets critiques. Contactez nos experts pour une consultation technique et un devis personnalisé.
                </p>
                <Button size="lg" variant="destructive" className="bg-[#C1272D] hover:bg-[#E53935] text-white font-bold text-lg px-10 py-6 group">
                    DEMANDER UNE CONSULTATION TECHNIQUE
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                </Button>
            </div>
         </AnimatedWrapper>
      </Section>
    </div>
  );
}
