
"use client";

import Image from 'next/image';
import React, { useMemo } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { galvanisationContent } from '@/config/galvanisation-data';
import { ArrowRight, Info } from 'lucide-react';
import { iconMap as galvanisationIconMap } from '@/config/galvanisation-data';
import { cn } from '@/lib/utils';
import { AnimatedWrapper } from './animated-wrapper';
import { DownloadButton } from './ui/download-button';
import { BathsIcon } from './icons/baths-icon';
import dynamic from 'next/dynamic';

const DynamicAnimatedBaths = dynamic(() => import('./animated-baths').then(mod => mod.AnimatedBaths));

const HeroSection = dynamic(() => Promise.resolve(UnwrappedHeroSection));
const ProcessTimeline = dynamic(() => Promise.resolve(UnwrappedProcessTimeline));
const BenefitsSection = dynamic(() => Promise.resolve(UnwrappedBenefitsSection));
const HighlightSection = dynamic(() => Promise.resolve(UnwrappedHighlightSection));
const CTASection = dynamic(() => Promise.resolve(UnwrappedCTASection));
const TechniquesAndStandardsSection = dynamic(() => Promise.resolve(UnwrappedTechniquesAndStandardsSection));


// Main Page Component
export function GalvanisationPageContent() {
  return (
    <div className="text-foreground">
      <HeroSection />
      <ProcessTimeline />
      <BenefitsSection />
      <HighlightSection />
      <CTASection />
    </div>
  );
}

// 1. Hero Section
function UnwrappedHeroSection() {
  const { hero } = galvanisationContent;
  const largeStat = hero.stats.find(s => s.large);
  const smallStats = hero.stats.filter(s => !s.large);
  const iconMap = useMemo(() => galvanisationIconMap, []);

  return (
    <section className="relative min-h-screen flex items-end bg-background pb-24 sm:pb-32">
      <div className="absolute inset-0 z-0">
        <Image
          src={hero.image_url}
          alt="Bain de galvanisation à chaud"
          fill
          className="object-cover"
          priority
          data-ai-hint="molten zinc"
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
                <h2 className="font-headline text-5xl md:text-8xl font-bold text-white leading-tight">
                  {hero.title}
                </h2>
                <div className="mt-4 text-lg text-gray-300 max-w-xl">
                    <p className="font-bold">UNITE DE PRODUCTION</p>
                    <p>Surface de 40.000 m2 dont 6.000 m2 couvert Démarrage de la production : Octobre 2016 Budget d’investissement : 8</p>
                    <p>Constitué de Bains d’immersion de 13x1,8x3,5 m, permettant de traiter des articles métalliques de diverses longueurs allant jusqu’à 13m. Capacité de production: (08 heures) 1600 t / mois. 20.000 t/an.</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                 <Button size="lg" variant="destructive">{hero.cta_primary} <ArrowRight className="ml-2" /></Button>
                 <DownloadButton text={hero.cta_secondary} />
              </div>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper animation="slide-up" staggerIndex={1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {largeStat && (
                <AnimatedWrapper animation="fade-in-stagger" staggerIndex={1}>
                  <Card className="group bg-background/50 backdrop-blur-md border-border text-white h-full relative overflow-hidden transition-all duration-500 hover:border-accent">
                    <div className="absolute inset-0 bg-accent transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />
                    <CardContent className="relative p-4 flex flex-col items-center justify-center text-center h-full">
                      <DynamicAnimatedBaths />
                    </CardContent>
                  </Card>
                </AnimatedWrapper>
              )}
              <div className="grid grid-cols-2 gap-4">
                {smallStats.map((stat, index) => {
                  const Icon = iconMap[stat.icon];
                  return (
                    <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index + 2}>
                      <Card className="group bg-background/50 backdrop-blur-md border-border text-white relative overflow-hidden transition-all duration-500 hover:border-accent">
                        <div className="absolute inset-0 bg-accent transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />
                        <CardContent className="relative p-4 flex items-center gap-3">
                          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center transition-colors duration-300 group-hover:bg-accent-foreground/10">
                            {Icon && <Icon className="h-6 w-6 text-accent transition-colors duration-300 group-hover:text-white" />}
                          </div>
                          <div>
                            <p className="text-xl font-bold">{stat.value}</p>
                            <p className="text-xs text-gray-300 group-hover:text-gray-100">{stat.title}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </AnimatedWrapper>
                  );
                })}
              </div>
            </div>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
}


// 2. Process Timeline Section
function UnwrappedProcessTimeline() {
    const { galvanisation_steps } = galvanisationContent;
    const iconMap = useMemo(() => galvanisationIconMap, []);
  
    return (
      <section className="relative w-full bg-secondary text-foreground py-32 px-6">
        <AnimatedWrapper 
            animation="fade-in"
            className="text-center mb-24 max-w-screen-xl mx-auto"
        >
            <h2 className="font-headline text-5xl font-bold text-center text-accent mb-4">
                LE PROCEDE D'APPLICATION
            </h2>
            <p className='text-center text-lg text-muted-foreground max-w-3xl mx-auto'>
                Chaque pièce d’acier passe par une transformation alchimique. De brute et vulnérable, elle ressort invincible, gainée d’un bouclier de zinc. Voici le voyage, étape par étape.
            </p>
        </AnimatedWrapper>
        <div className="relative max-w-screen-2xl mx-auto">
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-accent/30 hidden md:block" />
          {galvanisation_steps.map((step, i) => {
                const Icon = iconMap[step.icon];
                const isLeft = i % 2 === 0;
                return (
                <AnimatedWrapper
                    key={i}
                    animation={isLeft ? 'slide-up' : 'slide-up'}
                    className={cn("mb-12 flex w-full items-center", isLeft ? "md:justify-start" : "md:justify-end")}
                >
                    <div className="w-full md:w-1/2 relative px-4 md:px-0">
                      <div className="absolute -top-5 md:top-1/2 md:-translate-y-1/2 flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground font-bold text-2xl border-4 border-secondary z-10"
                          style={isLeft ? {right: '-2rem'} : {left: '-2rem'}}
                      >
                          {step.step}
                      </div>
                      <div className={cn("hidden md:block absolute top-1/2 -translate-y-1/2 h-0.5 w-8 bg-accent/30", isLeft ? 'right-0' : 'left-0')} />
                      
                      <div
                          className={cn(
                              "relative bg-card text-foreground rounded-xl border border-border shadow-lg group transition-all duration-300 hover:border-accent overflow-hidden",
                          )}
                      >
                        {/* Shape-defining elements */}
                        <div className="absolute -top-2 -right-2 w-12 h-12 bg-secondary transform rotate-45"></div>
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary transform rotate-45"></div>
                        <div className="absolute top-0 right-0 w-8 h-8 bg-card rounded-bl-full"></div>
                        <div className="absolute bottom-0 left-0 w-12 h-12 bg-card rounded-tr-full"></div>
                        
                        <div className="relative z-10 p-6 flex items-start gap-6">
                           <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 border-2 border-accent mt-1">
                              {Icon && <Icon className="h-8 w-8 text-accent" />}
                          </div>
                          <div className="flex-grow">
                              <h3 className="text-4xl font-extrabold text-primary mb-1 uppercase tracking-wider">
                                  {step.title}
                              </h3>
                              <p className="text-xl text-accent font-semibold mb-3">{step.shortDesc}</p>
                          </div>
                        </div>
                        <div className="relative z-10 h-0 overflow-hidden group-hover:h-auto transition-all duration-500 ease-in-out">
                            <div className="px-6 pb-6">
                                <blockquote className="text-lg text-muted-foreground italic border-l-2 border-border pl-4">
                                {step.longDesc}
                                </blockquote>
                                <div className="mt-4 text-base text-muted-foreground/80 flex flex-col sm:flex-row justify-end gap-x-4 gap-y-1 font-mono pr-4">
                                    <span>TEMP: {step.meta.temperature}</span>
                                    <span>DURÉE: {step.meta.duration}</span>
                                </div>
                            </div>
                        </div>

                      </div>
                    </div>
                </AnimatedWrapper>
                )
          })}
        </div>
      </section>
    );
}

// 3. Benefits Section
function UnwrappedBenefitsSection() {
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
                          <p className="text-lg text-muted-foreground mt-4 text-justify">La galvanisation à chaud ne consiste pas uniquement à déposer du zinc à la surface de l’acier. Le revêtement de zinc est métallurgiquement lié à l’acier de base, car il se produit une réaction métallurgique de diffusion entre le zinc et le fer. Quand on retire l’acier du bain, il s’est formé à sa surface plusieurs couches d’alliages zinc-fer sur lesquelles le zinc entraîné se solidifie. <strong className="font-bold text-accent">Ces différentes couches d’alliages plus dures que l’acier de base ont une teneur en zinc de plus en plus élevée au fur et à mesure que l’on se rapproche de la surface du revêtement.</strong> Ainsi, cette spécificité liée au procédé de galvanisation offre au revêtement protecteur adhérence, imperméabilité, et résistance mécanique. De plus, l’épaisseur de ce est supérieure à celle obtenue avec les autres techniques de protection</p>
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

function UnwrappedTechniquesAndStandardsSection() {
  return (
    <div className="bg-background rounded-2xl shadow-xl overflow-hidden h-full">
        <div className="bg-accent px-8 py-10">
          <h2 className="text-3xl md:text-4xl font-bold text-accent-foreground mb-4">
            TECHNIQUES ET NORMES
          </h2>
          <p className="text-xl text-accent-foreground/80 italic font-medium">
            « Une technique qui repose sur un choix pertinent de l'acier »
          </p>
        </div>
        <div className="px-8 py-10 space-y-8">
          <div className="prose max-w-none">
            <p className="text-foreground leading-relaxed text-justify mb-4 text-lg">
              Le revêtement d'une pièce galvanisée à chaud (épaisseur, structure et aspect) varie
              principalement suivant la composition de l'acier. Sa teneur en silicium et en phosphore
              joue un rôle important sur sa réactivité vis-à-vis du zinc liquide.
            </p>
            <p className="text-foreground leading-relaxed mb-2 text-lg">
              D'où l'importance de bien choisir l'acier que l'on va galvaniser.
            </p>
            <p className="text-foreground leading-relaxed text-lg">
              La norme <span className="font-semibold">NF A 35-503 (2008)</span> définit 3 catégories d'aciers aptes à la galvanisation,
              suivant la teneur de ces deux éléments.
            </p>
          </div>
          <div className="bg-primary/5 border-l-4 border-primary p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-primary mb-3">
              Les aciers de catégorie A et catégorie B sont normalement réactifs :
            </h3>
            <p className="text-foreground leading-relaxed text-lg">
              Après galvanisation, ils ont un bel aspect uniforme avec des épaisseurs au moins conformes
              à la norme <span className="font-semibold">NF EN ISO 1461</span>.
            </p>
          </div>
          <div className="overflow-x-auto">
            <h3 className="text-lg font-bold text-accent-foreground bg-accent px-4 py-3 mb-0">
              La Norme AFNOR NF 35-503 : Ce qu'il faut en retenir(*)
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">Aspect</th>
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">
                    Résistance mécanique<br/>du revêtement
                  </th>
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">
                    Masse de revêtement
                  </th>
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">Utilisation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-background hover:bg-muted/50 transition-colors">
                  <td className="border border-border px-4 py-4">
                    <div className="flex items-center">
                      <span className="bg-accent text-accent-foreground font-bold px-3 py-1 rounded mr-3">Cat. A</span>
                      <span className="text-foreground">Excellent</span>
                    </div>
                  </td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">Excellente</td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">
                    Standard, conforme au<br/>minimum de la norme
                  </td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">
                    Recherche esthétique et<br/>anticorrosion
                  </td>
                </tr>
                <tr className="bg-muted/50 hover:bg-muted/80 transition-colors">
                  <td className="border border-border px-4 py-4">
                    <div className="flex items-center">
                      <span className="bg-accent text-accent-foreground font-bold px-3 py-1 rounded mr-3">Cat. B</span>
                      <span className="text-foreground">Bon</span>
                    </div>
                  </td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">Bonne</td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">
                    Standard, Généralement<br/>supérieure au minimum de la<br/>norme
                  </td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">
                    Recherche anticorrosion et<br/>aspect correct
                  </td>
                </tr>
                <tr className="bg-background hover:bg-muted/50 transition-colors">
                  <td className="border border-border px-4 py-4">
                    <div className="flex items-center">
                      <span className="bg-accent text-accent-foreground font-bold px-3 py-1 rounded mr-3">Cat. C</span>
                      <span className="text-foreground">Moyen</span>
                    </div>
                  </td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">Moyenne</td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">
                    Plus forte - pour milieux<br/>agressifs
                  </td>
                  <td className="border border-border px-4 py-4 text-center text-foreground">
                    Recherche optimum de<br/>protection
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-muted-foreground mt-2 italic">(*)Ces éléments sont purement indicatifs.</p>
          </div>
          <div className="bg-destructive/10 border-l-4 border-destructive p-6 rounded-r-lg">
            <h3 className="text-xl font-bold text-primary mb-3">
              Les aciers de catégorie C sont plus réactifs :
            </h3>
            <p className="text-foreground leading-relaxed mb-3 text-lg">
              Leur aspect après galvanisation est plus mat, avec possibilité de zones grisées marbrées
              ou rugueuses, sans conséquence sur la tenue à la corrosion.
            </p>
            <p className="text-foreground leading-relaxed text-lg">
              Les épaisseurs atteignent 120 à 200 microns, voire plus. Elles peuvent dépasser 200
              microns pour des pièces nécessitant des temps d'immersion plus importants.
            </p>
          </div>
          <div className="overflow-x-auto">
            <h3 className="text-lg font-bold text-accent-foreground bg-accent px-4 py-3 mb-0">
              Classification des aciers suivant leur teneur en silicium et en phosphore (*)
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">Elément %</th>
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">Catégorie A</th>
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">Catégorie B</th>
                  <th className="border border-border px-4 py-3 text-center font-bold text-sm">Catégorie C</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-background hover:bg-muted/50 transition-colors">
                  <td className="border border-border px-4 py-3 text-center font-bold text-primary">Si</td>
                  <td className="border border-border px-4 py-3 text-center text-foreground">&lt; 0.030</td>
                  <td className="border border-border px-4 py-3 text-center text-foreground">&lt; 0.040</td>
                  <td className="border border-border px-4 py-3 text-center text-foreground">0.14 &lt; Si &lt; 0.25</td>
                </tr>
                <tr className="bg-muted/50 hover:bg-muted/80 transition-colors">
                  <td className="border border-border px-4 py-3 text-center font-bold text-primary">
                    Si +2.5 P<br/>P
                  </td>
                  <td className="border border-border px-4 py-3 text-center text-foreground">&lt; 0.090</td>
                  <td className="border border-border px-4 py-3 text-center text-foreground">&lt; 0.110</td>
                  <td className="border border-border px-4 py-3 text-center text-foreground">0.035</td>
                </tr>
              </tbody>
            </table>
            <div className="bg-accent text-accent-foreground px-4 py-3 mt-0 text-center text-sm">
              Par accord à la commande, l'analyse sur produit peut être effectuée.
            </div>
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground italic">(*) Extrait de la norme NF A 35-503</p>
          </div>
        </div>
      </div>
  );
}


// 4. Highlight Section
function UnwrappedHighlightSection() {
    const { highlight } = galvanisationContent;
    const iconMap = useMemo(() => galvanisationIconMap, []);
  
    return (
      <section className="py-32 bg-secondary">
        <div className="max-w-screen-xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <AnimatedWrapper animation="slide-up">
                <h2 className="font-headline text-4xl font-bold text-primary">
                    {highlight.title}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-lg">
                    {highlight.text}
                </p>
            </AnimatedWrapper>
            <AnimatedWrapper animation="fade-in">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                    {highlight.icons.map((iconName, index) => {
                        const Icon = iconMap[iconName];
                        return (
                           <AnimatedWrapper
                              key={iconName}
                              animation="zoom-in"
                              staggerIndex={index}
                            >
                                <div className="flex flex-col items-center justify-center p-6 bg-background rounded-lg text-center">
                                    {Icon && <Icon className="h-12 w-12 text-accent mb-2" />}
                                    <span className="text-foreground font-semibold capitalize">{iconName}</span>
                                </div>
                            </AnimatedWrapper>
                        );
                    })}
                </div>
            </AnimatedWrapper>
        </div>
      </section>
    );
}

// 5. CTA Section
function UnwrappedCTASection() {
    const { cta } = galvanisationContent;
  
    return (
      <section className="py-32 bg-background">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
            <AnimatedWrapper animation="zoom-in">
                <h2 className="font-headline text-4xl font-bold text-primary max-w-2xl mx-auto">
                    {cta.title}
                </h2>
                <div className="mt-8 flex justify-center flex-wrap gap-4">
                    <Button asChild size="lg" variant="destructive">
                        <a href={cta.form_url} className="flex items-center gap-2">
                            {cta.button_primary} <ArrowRight className="ml-2" />
                        </a>
                    </Button>
                    <DownloadButton text={cta.button_secondary} />
                </div>
            </AnimatedWrapper>
        </div>
      </section>
    );
}

    