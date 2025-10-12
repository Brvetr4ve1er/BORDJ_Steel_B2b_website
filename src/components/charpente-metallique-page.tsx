
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Factory, HardHat, CheckCircle, ShieldCheck, Zap, Award, BookCopy, TowerControl, Car, Tractor } from 'lucide-react';
import { AnimatedWrapper } from './animated-wrapper';
import React, { useState } from 'react';
import images from '@/app/lib/placeholder-images.json';
import { cn } from '@/lib/utils';
import { AnimatedNumber } from './animated-number';
import { ProductionPillarCard } from './production-pillar-card';
import MetalBeamsBackground from './metal-beams-background';

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
        icon: HardHat,
        title: "PRS – Profils Reconstitués Soudés",
        explanation: "Fabrication sur mesure selon les normes internationales. Grande capacité de portance, adaptées aux bâtiments industriels, ponts et charpentes lourdes.",
        image: images['charpente-metallique']['prs-pillar'],
    },
    {
        icon: TowerControl,
        title: "Supports de Transport",
        explanation: "Conception et production de structures métalliques pour l’énergie (électricité, tours 5G), la communication (projecteurs) et l’affichage (panneaux publicitaires).",
        image: images['charpente-metallique']['pylon-pillar'],
    },
    {
        icon: Tractor,
        title: "Pont Roulant – Mono et Bipoutre",
        explanation: "Production de ponts roulants pour la manutention lourde, avec options mono-poutre et bi-poutre à caisson renforcé.",
        image: images['charpente-metallique']['crane-pillar'],
    },
    {
        icon: Car,
        title: "Ligne de Fabrication Automobile",
        explanation: "Ligne complète pour la transformation métallique automobile, assurant la production de pièces de carrosserie avec haute précision et tolérances strictes.",
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
  const [activeImage, setActiveImage] = useState(images['charpente-metallique'].main);
  const galleryImages = images['charpente-metallique'].gallery;


  return (
    <div className="bg-background">
      <section className="relative bg-primary text-primary-foreground pt-56 lg:pt-80 pb-40 lg:pb-56">
         <div className="absolute inset-0 overflow-hidden">
          <Image
            src={activeImage.src}
            alt={activeImage.alt}
            fill
            className="object-cover opacity-20 transition-all duration-500"
            priority
            key={activeImage.src}
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

       <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {galleryImages.map((image, index) => (
              <AnimatedWrapper animation="zoom-in" staggerIndex={index} key={image.src}>
                <div 
                  className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group shadow-lg"
                  onClick={() => setActiveImage(image)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={cn(
                      "object-cover transition-all duration-300 group-hover:scale-110",
                      activeImage.src === image.src ? 'ring-4 ring-accent ring-offset-2' : 'grayscale group-hover:grayscale-0'
                    )}
                  />
                   <div className={cn("absolute inset-0 bg-black/50 transition-opacity", activeImage.src === image.src ? 'opacity-0' : 'opacity-100 group-hover:opacity-0')}></div>
                </div>
              </AnimatedWrapper>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-20">
        <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
                <AnimatedWrapper animation="fade-in">
                    <div className="grid grid-cols-2 gap-8">
                        <div className="text-center p-6 bg-background rounded-lg shadow-md border">
                            <p className="font-headline text-4xl font-bold text-accent"><AnimatedNumber value={25000} /></p>
                            <p className="text-sm uppercase tracking-wider text-muted-foreground mt-1">Tonnes / an</p>
                            <p className="font-semibold text-primary mt-2">Capacité de production<br/>Charpente</p>
                        </div>
                        <div className="text-center p-6 bg-background rounded-lg shadow-md border">
                            <p className="font-headline text-4xl font-bold text-accent"><AnimatedNumber value={3000} /></p>
                            <p className="text-sm uppercase tracking-wider text-muted-foreground mt-1">Tonnes / an</p>
                            <p className="font-semibold text-primary mt-2">Capacité de production<br/>PRS</p>
                        </div>
                    </div>
                </AnimatedWrapper>
                <AnimatedWrapper animation="fade-in" staggerIndex={1}>
                    <Card className="shadow-lg bg-background">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl text-primary">Domaines d'Application</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-4">
                              {applications.map((app, index) => (
                                <li key={index} className="flex items-center gap-3 text-lg text-foreground">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-secondary text-accent flex items-center justify-center">
                                      {app.icon}
                                    </div>
                                    <span>{app.text}</span>
                                </li>
                              ))}
                            </ul>
                        </CardContent>
                    </Card>
                </AnimatedWrapper>
            </div>
        </div>
      </section>

      <section id="category-pillars" className="py-32 bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <MetalBeamsBackground />
        </div>
        <div className="relative z-10">
          <AnimatedWrapper animation="fade-in">
            <h2 className="font-headline text-5xl font-bold text-white mb-16 text-center">Nos Piliers de Production</h2>
          </AnimatedWrapper>
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {pillars.map((pillar, index) => (
                  <AnimatedWrapper key={index} animation="slide-up" staggerIndex={index}>
                    <ProductionPillarCard
                      Icon={pillar.icon}
                      title={pillar.title}
                      description={pillar.explanation}
                    />
                  </AnimatedWrapper>
              ))}
          </div>
        </div>
      </section>

      <section id="why-choose-us" className="py-20">
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
