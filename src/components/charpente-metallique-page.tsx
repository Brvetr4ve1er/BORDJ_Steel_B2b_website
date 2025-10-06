
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Factory, HardHat, CheckCircle, ShieldCheck, Zap, Bot, BookCopy, TowerControl, Car, Tractor, Award } from 'lucide-react';
import { AnimatedWrapper } from './animated-wrapper';
import React from 'react';
import images from '@/app/lib/placeholder-images.json';
import { cn } from '@/lib/utils';
import { AnimatedCounter } from './animated-counter';

const applications = [
  { icon: <Building className="w-8 h-8" />, text: "Bâtiments industriels & commerciaux" },
  { icon: <Factory className="w-8 h-8" />, text: "Hangars de stockage & agricoles" },
  { icon: <Tractor className="w-8 h-8" />, text: "Infrastructures logistiques" },
  { icon: <HardHat className="w-8 h-8" />, text: "Projets sur mesure" },
];

const advantages = [
    "Conception optimisée par nos ingénieurs",
    "Haute résistance et durabilité",
    "Rapidité de montage sur site",
    "Flexibilité architecturale",
    "Respect des normes parasismiques"
];

const pillars = [
    {
        icon: <HardHat className="w-12 h-12" />,
        title: "PRS – Profils Reconstitués Soudés",
        explanation: "Fabrication sur mesure selon les normes internationales. Grande capacité de portance, adaptées aux bâtiments industriels, ponts et charpentes lourdes.",
        advantages: ["Précision", "Durabilité", "Optimisation du poids"],
        image: images['charpente-metallique']['prs-pillar'],
    },
    {
        icon: <TowerControl className="w-12 h-12" />,
        title: "Supports de Transport",
        explanation: "Conception et production de structures métalliques pour l’énergie (électricité, tours 5G), la communication (projecteurs) et l’affichage (panneaux publicitaires).",
        advantages: ["Fiabilité climatique", "Stabilité", "Longévité"],
        image: images['charpente-metallique']['pylon-pillar'],
    },
    {
        icon: <Tractor className="w-12 h-12" />,
        title: "Pont Roulant – Mono et Bipoutre",
        explanation: "Production de ponts roulants pour la manutention lourde, avec options mono-poutre et bi-poutre à caisson renforcé.",
        advantages: ["Usines", "Ateliers", "Entrepôts"],
        image: images['charpente-metallique']['crane-pillar'],
    },
    {
        icon: <Car className="w-12 h-12" />,
        title: "Ligne de Fabrication Automobile",
        explanation: "Ligne complète pour la transformation métallique automobile, assurant la production de pièces de carrosserie avec haute précision et tolérances strictes.",
        advantages: ["Haute précision", "Tolérances strictes", "Adapté aux constructeurs"],
        image: images['charpente-metallique']['auto-pillar'],
    }
];

const whyChooseUs = [
    {
        icon: <Award className="w-10 h-10" />,
        title: "Standards & Certifications",
        description: "Nous respectons les normes internationales les plus strictes (ISO, EN) pour garantir la qualité et la sécurité de chaque structure."
    },
    {
        icon: <Zap className="w-10 h-10" />,
        title: "Capacités de Production",
        description: "Avec des machines CNC de pointe et des soudeuses automatiques, nous avons une capacité de production massive pour les projets de toute envergure."
    },
    {
        icon: <ShieldCheck className="w-10 h-10" />,
        title: "Expertise & Innovation",
        description: "Notre bureau d'études et nos équipes s'appuient sur une riche expérience et des références solides pour innover et relever les défis complexes."
    }
];

export function CharpenteMetalliquePageContent() {
  return (
    <div className="bg-background">
      <section className="relative bg-primary text-primary-foreground pt-48 lg:pt-64 pb-32 lg:pb-40">
         <div className="absolute inset-0 overflow-hidden">
          <Image
            src={images['charpente-metallique'].main.src}
            alt={images['charpente-metallique'].main.alt}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/70 to-transparent"></div>
        </div>
        <div className="container mx-auto px-4 relative">
            <div className="grid lg:grid-cols-2 gap-12 items-stretch">
                <div>
                  <AnimatedWrapper animation="fade-in">
                    <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight uppercase">
                        Charpente Métallique
                    </h1>
                    <p className="mt-4 text-lg md:text-xl max-w-lg text-primary-foreground/80">
                      Solutions d'ingénierie robustes pour les projets les plus ambitieux.
                    </p>
                  </AnimatedWrapper>
                </div>
                <div className="flex">
                  <AnimatedWrapper animation="fade-in" staggerIndex={1} className="flex-grow flex">
                      <Card className="shadow-lg bg-background/90 backdrop-blur-sm min-h-full flex flex-col w-full">
                          <CardHeader>
                              <CardTitle className="font-headline text-2xl text-primary">Nos Avantages</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow flex flex-col justify-center">
                              <ul className="space-y-4">
                                {advantages.map((adv, index) => (
                                  <li key={index} className="flex items-center gap-3 text-lg text-foreground">
                                    <CheckCircle className="h-6 w-6 text-accent" />
                                    <span>{adv}</span>
                                  </li>
                                ))}
                              </ul>
                          </CardContent>
                      </Card>
                  </AnimatedWrapper>
                </div>
            </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 items-center">
            <div className="flex gap-8">
              <AnimatedWrapper animation="slide-up">
                <Card className="text-center p-6 bg-accent text-accent-foreground flex-1 shadow-lg">
                  <p className="font-headline font-bold text-5xl">
                    <AnimatedCounter end={25000} />
                  </p>
                  <p className="font-semibold text-lg mt-2">Tonnes / an</p>
                  <p className="text-sm mt-4">Capacité de production<br/>Charpente</p>
                </Card>
              </AnimatedWrapper>
               <AnimatedWrapper animation="slide-up" staggerIndex={1}>
                <Card className="text-center p-6 bg-primary text-primary-foreground flex-1 shadow-lg">
                  <p className="font-headline font-bold text-5xl">
                    <AnimatedCounter end={3000} />
                  </p>
                  <p className="font-semibold text-lg mt-2">Tonnes / an</p>
                  <p className="text-sm mt-4">Capacité de production<br/>PRS</p>
                </Card>
              </AnimatedWrapper>
            </div>
            <div className="flex justify-center items-center">
              <AnimatedWrapper animation="zoom-in">
                  <div className="w-32 h-32 rounded-full bg-background flex items-center justify-center shadow-2xl border-4 border-accent">
                    <HardHat className="w-16 h-16 text-accent" />
                  </div>
              </AnimatedWrapper>
            </div>
            <div>
              <AnimatedWrapper animation="fade-in">
                  <h3 className="font-headline text-3xl font-bold text-primary">Domaines d'Application</h3>
                  <div className="mt-6 space-y-4">
                      {applications.map((app, index) => (
                          <div key={index} className="flex items-center gap-4">
                              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                                  {app.icon}
                              </div>
                              <p className="text-lg font-medium">{app.text}</p>
                          </div>
                      ))}
                  </div>
              </AnimatedWrapper>
            </div>
          </div>
        </div>
      </section>

      <section id="category-pillars" className="py-32 bg-background">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-5xl font-bold text-primary mb-16 text-center">Nos Piliers de Production</h2>
        </AnimatedWrapper>
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
                <AnimatedWrapper key={index} animation="slide-up" staggerIndex={index}>
                   <Card className="group relative overflow-hidden rounded-2xl shadow-lg h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col bg-secondary/30">
                       <div className="relative h-56">
                           <Image
                               src={pillar.image.src}
                               alt={pillar.title}
                               width={pillar.image.width}
                               height={pillar.image.height}
                               className="transition-transform duration-500 group-hover:scale-110 object-cover w-full h-full"
                               data-ai-hint={pillar.image.aiHint}
                           />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                           <div className="absolute top-4 left-4 bg-accent/80 text-accent-foreground p-3 rounded-full backdrop-blur-sm">
                               {pillar.icon}
                           </div>
                       </div>
                       <CardContent className="p-6 flex flex-col flex-grow bg-card">
                           <h3 className="font-headline text-2xl font-bold text-primary mb-3">{pillar.title}</h3>
                           <p className="text-muted-foreground mb-4 flex-grow">{pillar.explanation}</p>
                           <ul className="space-y-2 mt-auto">
                               {pillar.advantages.map((adv, i) => (
                                   <li key={i} className="flex items-center gap-2 text-sm">
                                       <CheckCircle className="h-4 w-4 text-accent" />
                                       <span>{adv}</span>
                                   </li>
                               ))}
                           </ul>
                       </CardContent>
                   </Card>
                </AnimatedWrapper>
            ))}
        </div>
      </section>

      <section id="why-choose-us" className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <AnimatedWrapper animation="fade-in">
              <h2 className="font-headline text-5xl font-bold text-primary mb-16 text-center">Pourquoi Nous Choisir?</h2>
            </AnimatedWrapper>
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
                {whyChooseUs.map((item, index) => (
                    <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                        <div className="text-center">
                            <div className="flex items-center justify-center h-20 w-20 rounded-full bg-background text-accent mx-auto mb-6 shadow-lg border">
                                {item.icon}
                            </div>
                            <h3 className="font-headline text-2xl font-bold text-primary mb-3">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                        </div>
                    </AnimatedWrapper>
                ))}
            </div>
          </div>
      </section>

      <section id="cta-bottom" className="py-20 bg-background">
        <div className="container mx-auto px-4">
            <AnimatedWrapper animation="zoom-in">
              <div className="bg-secondary rounded-2xl p-12 text-center max-w-4xl mx-auto shadow-xl">
                <h2 className="font-headline text-4xl font-bold text-primary mb-4">Discutons de votre projet.</h2>
                <p className="text-muted-foreground text-lg mb-8">Notre équipe est prête à transformer vos idées en réalité. Contactez-nous pour un devis ou une consultation technique.</p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <Button size="lg" variant="destructive">
                        Demander un Devis <ArrowRight className="ml-2" />
                    </Button>
                    <Button size="lg" variant="outline" className="bg-white hover:bg-white/90 border-primary/20">
                        <BookCopy className="mr-2" />
                        Télécharger la Brochure
                    </Button>
                </div>
              </div>
            </AnimatedWrapper>
        </div>
      </section>

    </div>
  );
}
