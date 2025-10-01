
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Factory, HardHat, CheckCircle, ShieldCheck, Zap, Bot, BookCopy, TowerControl, Car, Tractor, Award } from 'lucide-react';
import { AnimatedWrapper } from './animated-wrapper';
import React from 'react';
import images from '@/app/lib/placeholder-images.json';

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

const bentoItems = [
  {
    id: 'main',
    colSpan: 'lg:col-span-3',
    rowSpan: 'lg:row-span-2',
    content: (
      <div className="relative w-full h-full">
        <Image
          src={images['charpente-metallique'].main.src}
          alt={images['charpente-metallique'].main.alt}
          width={images['charpente-metallique'].main.width}
          height={images['charpente-metallique'].main.height}
          className="rounded-xl object-cover w-full h-full"
          data-ai-hint={images['charpente-metallique'].main.aiHint}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 text-white">
          <h1 className="font-headline text-5xl font-bold">Charpente Métallique</h1>
          <p className="mt-2 text-xl max-w-lg">Solutions d'ingénierie robustes pour les projets les plus ambitieux.</p>
        </div>
      </div>
    ),
    padding: 'p-0',
  },
  {
    id: 'applications',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-2',
    content: (
        <>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Domaines d'Application</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {applications.map((app, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-accent/10 text-accent flex items-center justify-center">
                                {app.icon}
                            </div>
                            <p className="text-lg font-medium">{app.text}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </>
    ),
  },
  {
    id: 'capacity',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-1',
    content: (
        <div className="text-center flex flex-col justify-center items-center h-full">
            <p className="font-headline text-7xl font-bold text-accent">25,000</p>
            <p className="font-semibold text-xl mt-2 text-muted-foreground">Tonnes / an</p>
            <p className="font-headline text-5xl font-bold text-accent mt-4">3,000</p>
            <p className="font-semibold text-xl mt-2 text-muted-foreground">Tonnes / an de PRS</p>
        </div>
    ),
  },
  {
    id: 'advantages',
    colSpan: 'lg:col-span-3',
    rowSpan: 'lg:row-span-2',
    content: (
        <>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Nos Avantages</CardTitle>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                   {advantages.map((adv, index) => (
                     <li key={index} className="flex items-center gap-3 text-lg">
                       <CheckCircle className="h-6 w-6 text-accent" />
                       <span>{adv}</span>
                     </li>
                   ))}
                </ul>
            </CardContent>
        </>
    ),
  },
   {
    id: 'cta',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-1',
    content: (
      <div className="flex flex-col items-center justify-center h-full text-center bg-accent text-accent-foreground rounded-xl">
        <h3 className="font-headline text-3xl font-bold">Un projet en tête?</h3>
        <p className="mt-2 mb-6">Discutons de vos besoins spécifiques.</p>
        <Button size="lg" variant="secondary" className="bg-white text-accent hover:bg-white/90 group">
          Demander un Devis <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </Button>
      </div>
    ),
     padding: 'p-0',
  },
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
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:grid-rows-3 gap-8 min-h-[80vh]">
        {bentoItems.map((item, index) => (
          <AnimatedWrapper
            key={item.id}
            animation="zoom-in"
            staggerIndex={index}
            className={`${item.colSpan} ${item.rowSpan}`}
          >
            <Card className={`h-full w-full shadow-lg hover:shadow-2xl transition-shadow duration-300 ${item.padding !== 'p-0' ? 'p-6' : ''} ${item.id === 'cta' ? 'bg-transparent border-none' : ''}`}>
              {item.content}
            </Card>
          </AnimatedWrapper>
        ))}
      </div>

      <section id="category-pillars" className="py-20 mt-20">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-5xl font-bold text-primary mb-16 text-center">Nos Piliers de Production</h2>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => (
                <AnimatedWrapper key={index} animation="slide-up" staggerIndex={index}>
                   <Card className="group relative overflow-hidden rounded-2xl shadow-lg h-full hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col">
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
                       <CardContent className="p-6 flex flex-col flex-grow">
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

      <section id="why-choose-us" className="py-20">
          <AnimatedWrapper animation="fade-in">
            <h2 className="font-headline text-5xl font-bold text-primary mb-16 text-center">Pourquoi Nous Choisir?</h2>
          </AnimatedWrapper>
          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-12">
              {whyChooseUs.map((item, index) => (
                  <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                      <div className="text-center">
                          <div className="flex items-center justify-center h-20 w-20 rounded-full bg-accent/10 text-accent mx-auto mb-6">
                              {item.icon}
                          </div>
                          <h3 className="font-headline text-2xl font-bold text-primary mb-3">{item.title}</h3>
                          <p className="text-muted-foreground">{item.description}</p>
                      </div>
                  </AnimatedWrapper>
              ))}
          </div>
      </section>

      <section id="cta-bottom" className="py-20">
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
      </section>

    </div>
  );
}
