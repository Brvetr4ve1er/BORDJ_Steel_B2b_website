
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building, Factory, HardHat, CheckCircle, ShieldCheck, Zap, Award, BookCopy, TowerControl, Car, Tractor, Layers, Cog } from 'lucide-react';
import { AnimatedWrapper } from './animated-wrapper';
import React from 'react';
import images from '@/app/lib/placeholder-images.json';
import { cn } from '@/lib/utils';
import { AnimatedNumber } from './animated-number';
import { DownloadButton } from './ui/download-button';
import dynamic from 'next/dynamic';
import { charpenteMetalliqueData } from '@/config/charpente-metallique-data';

const ExpandableGallery = dynamic(() => import('@/components/ui/expandable-gallery').then(mod => mod.ExpandableGallery));
const FeatureHoverCard = dynamic(() => import('./feature-hover-card').then(mod => mod.FeatureHoverCard));
const HeroSection = dynamic(() => Promise.resolve(UnwrappedHeroSection));


const applications = [
  { icon: <Building className="w-8 h-8" />, text: "Bâtiments industriels & commerciaux" },
  { icon: <Factory className="w-8 h-8" />, text: "Hangars de stockage & agricoles" },
  { icon: <Tractor className="w-8 h-8" />, text: "Infrastructures logistiques" },
  { icon: <HardHat className="w-8 h-8" />, text: "Projets sur mesure" },
];

const pillars = [
    {
        icon: HardHat,
        title: "PRS – Profils Reconstitués Soudés",
        description: "Fabrication sur mesure pour bâtiments industriels, ponts et charpentes lourdes.",
    },
    {
        icon: TowerControl,
        title: "Supports de Transport",
        description: "Structures pour l’énergie, la communication et l’affichage.",
    },
    {
        icon: Tractor,
        title: "Pont Roulant – Mono et Bipoutre",
        description: "Solutions de manutention lourde avec options mono-poutre et bi-poutre.",
    },
    {
        icon: Car,
        title: "Ligne de Fabrication Automobile",
        description: "Ligne complète pour la transformation métallique automobile de haute précision.",
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

const iconMap: { [key: string]: React.ElementType } = {
    HardHat,
    Cog,
    Layers
};

function UnwrappedHeroSection({ hero }: { hero: typeof charpenteMetalliqueData.hero }) {
  return (
    <section className="relative min-h-screen flex items-end bg-background pb-24 sm:pb-32">
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.image_url}
          alt={hero.alt}
          fill
          className="object-cover"
          priority
          data-ai-hint={hero.aiHint}
          placeholder="blur"
          blurDataURL={hero.blurDataUrl}
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 w-full relative z-10">
        <div className="space-y-12">
          <AnimatedWrapper animation="slide-up">
            <div className="text-left space-y-8">
              <div>
                <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white [text-shadow:0_2px_4px_rgba(0,0,0,0.5)]">
                  {hero.title}
                </h1>
                <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 [text-shadow:0_1px_3px_rgba(0,0,0,0.5)]">
                  {hero.subtitle}
                </p>
              </div>
              <div className="flex flex-row items-center gap-4">
                <Button size="lg" variant="destructive">{hero.cta_primary} <ArrowRight className="ml-2" /></Button>
                <DownloadButton text={hero.cta_secondary} />
              </div>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper animation="slide-up" staggerIndex={1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              {hero.stats.map((stat, index) => {
                const Icon = iconMap[stat.icon as keyof typeof iconMap];
                return (
                  <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                    <Card className="bg-background/50 backdrop-blur-md border-border text-white">
                      <CardHeader className="flex-row items-center gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                          {Icon && <Icon className="h-6 w-6 text-accent" />}
                        </div>
                        <div>
                          <CardTitle className="text-2xl font-bold text-white"><AnimatedNumber value={stat.value} />{stat.unit}</CardTitle>
                          <p className="text-sm text-gray-200">{stat.title}</p>
                        </div>
                      </CardHeader>
                    </Card>
                  </AnimatedWrapper>
                );
              })}
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}


export function CharpenteMetalliquePageContent() {
  const galleryImageUrls = images['charpente-metallique'].gallery.map(image => image.src).slice(0, 5);

  return (
    <div className="bg-background">
      <HeroSection hero={charpenteMetalliqueData.hero} />

      <section className="py-16 sm:py-24">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Notre Galerie de Projets
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Explorez nos réalisations en charpente métallique, des structures industrielles complexes aux bâtiments commerciaux.
            </p>
          </div>
          <ExpandableGallery images={galleryImageUrls} className="w-full max-w-7xl mx-auto" />
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

      <section className="bg-secondary py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-5xl font-bold text-center text-primary">Nos Piliers de Production</h2>
            <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
                Chacun de nos piliers de production représente un pôle d'excellence, équipé des technologies les plus avancées pour transformer l'acier en solutions innovantes.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {pillars.map((pillar, index) => {
              return (
                <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                    <FeatureHoverCard
                        Icon={pillar.icon}
                        title={pillar.title}
                        description={pillar.description}
                    />
                </AnimatedWrapper>
              );
            })}
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
                     <DownloadButton text="Télécharger la Brochure" />
                </div>
              </div>
            </AnimatedWrapper>
        </div>
      </section>

    </div>
  );
}
