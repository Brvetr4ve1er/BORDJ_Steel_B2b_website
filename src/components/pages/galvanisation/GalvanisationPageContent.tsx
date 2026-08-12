

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { galvanisationContent } from '@/config/galvanisation-data';
import { ArrowRight, Info } from 'lucide-react';
import { iconMap as galvanisationIconMap } from '@/config/galvanisation-data';
import { cn } from '@/lib/utils';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { DownloadButton } from '@/components/ui/download-button';
import dynamic from 'next/dynamic';
import { TechniquesAndStandardsSection } from '@/components/sections/galvanisation/TechniquesAndStandardsSection';
import { ProtectionLifespanBand } from '@/components/sections/galvanisation/ProtectionLifespanBand';
import { GalvanisationWireframe } from '@/components/wireframes/GalvanisationWireframe';
import { KenBurns } from '@/components/ui/ken-burns';
import { VideoLoop } from '@/components/ui/video-loop';

const DynamicAnimatedBaths = dynamic(() => import('@/components/animated-baths').then(mod => mod.AnimatedBaths));

// These sections live in this module; reference them directly. Wrapping a
// same-module component in dynamic(Promise.resolve(...)) adds a lazy boundary
// with no code-splitting benefit.
const HeroSection = UnwrappedHeroSection;
const ProcessTimeline = UnwrappedProcessTimeline;
const BenefitsSection = UnwrappedBenefitsSection;
const HighlightSection = UnwrappedHighlightSection;
const CTASection = UnwrappedCTASection;


// Main Page Component
export function GalvanisationPageContent() {
  return (
    <div className="text-foreground">
      <HeroSection />
      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <GalvanisationWireframe />
        </div>
      </section>
      <ProtectionLifespanBand />
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
  const iconMap = galvanisationIconMap;

  return (
    <section className="relative min-h-screen flex items-end bg-background pb-24 sm:pb-32">
      {/* `overflow-hidden`: KenBurns over-scales the photo past this box (it has
          to, or the pan would expose the container edge), and neither this
          wrapper nor the section clipped before. Without it the hero photo
          paints ~3% outside the section and widens the document. */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <KenBurns variant="out" className="absolute inset-0 z-0">
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
        </KenBurns>
        {/*
          * Ambient loop sitting between the still (z-0) and the scrim, so the
          * scrim and every piece of copy still read exactly as they do over the
          * photo. This hero is shot from the same photograph as the galvanisation
          * unit card, so it reuses that unit's loop rather than a separate file.
          * It renders nothing at all unless it is going to play — see VideoLoop —
          * so the Image above remains the LCP element and is what a phone, a
          * reduced-motion visitor and every crawler actually get. Deliberately NOT
          * inside KenBurns: the clip already contains its own camera move, and
          * compounding it with the drift would double the motion.
          */}
        <VideoLoop
          src="/media/loops/galvanisation.mp4"
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 z-10" />
      </div>
      <div className="max-w-screen-xl mx-auto px-4 w-full relative z-10">
        <div className="space-y-12">
          <AnimatedWrapper animation="slide-up">
            <div className="text-left space-y-8">
              <div>
                <h1 className="font-headline text-5xl md:text-8xl leading-tight md:leading-tight lg:leading-tight font-bold text-white">
                  {hero.title}
                </h1>
                <div className="mt-4 text-lg text-gray-300 max-w-xl">
                    <p className="font-bold">UNITÉ DE PRODUCTION</p>
                    <p>Surface de 40.000 m² dont 6.000 m² couverts. Démarrage de la production : octobre 2016.</p>
                    <p>L’unité est constituée de bains d’immersion de 13 × 1,8 × 3,5 m, permettant de traiter des pièces métalliques jusqu’à 13 m de longueur. Capacité de production (8 h/jour) : 1 600 t/mois, soit 20 000 t/an.</p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4">
                 <Button asChild size="lg" variant="destructive">
                   <Link href="/contact">{hero.cta_primary} <ArrowRight className="ml-2" /></Link>
                 </Button>
                 <DownloadButton text={hero.cta_secondary} href="/documents/Bordj-Steel-Catalogue-FR.pdf" />
              </div>
            </div>
          </AnimatedWrapper>

          <AnimatedWrapper animation="slide-up" staggerIndex={1}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              {largeStat && (
                <AnimatedWrapper animation="fade-in-stagger" staggerIndex={1}>
                  <Card className="group bg-black/50 backdrop-blur-md border-border text-white h-full relative overflow-hidden transition-all duration-500 hover:border-accent">
                    <div className="absolute inset-0 bg-accent transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />
                    <CardContent className="relative p-4 flex flex-col items-center justify-center text-center h-full">
                      {/* Figure and caption come from the config stat itself, so
                          editing `hero.stats` actually changes what renders. */}
                      <DynamicAnimatedBaths value={Number(largeStat.value)} label={largeStat.title} />
                    </CardContent>
                  </Card>
                </AnimatedWrapper>
              )}
              <div className="grid grid-cols-2 gap-4">
                {smallStats.map((stat, index) => {
                  const Icon = iconMap[stat.icon];
                  return (
                    <AnimatedWrapper key={stat.title} animation="fade-in-stagger" staggerIndex={index + 2}>
                      <div className="group relative overflow-hidden rounded-lg">
                        <div className="absolute inset-0 bg-accent transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />
                          <Card className="bg-black/50 backdrop-blur-md border-border text-white relative transition-colors duration-300 group-hover:bg-transparent group-hover:border-accent">
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
                      </div>
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
    const iconMap = galvanisationIconMap;
  
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
                    key={step.step}
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
                        {/* Shown by default: this is the page's substantive content.
                            It previously sat in `h-0 group-hover:h-auto`, which made it
                            unreachable on touch and by keyboard (and could not animate). */}
                        <div className="relative z-10">
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
    const iconMap = galvanisationIconMap;
    // Guarded like every other lookup in this file: an unguarded
    // createElement(undefined) would throw and, with no error boundary, take the
    // whole /products/galvanisation-a-chaud route down if the key is ever renamed.
    const SpecificityIcon = iconMap['ShieldCheck'];

    return (
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedWrapper animation="fade-in">
              <Card className="text-center mb-20 p-8 bg-secondary shadow-lg">
                  <h2 className="font-headline text-5xl font-bold text-accent mb-6">Notre Expertise en Galvanisation</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                  Explorez les avantages de notre processus de galvanisation à chaud, une méthode éprouvée pour une protection anti-corrosion supérieure. Nous combinons technologie de pointe et savoir-faire pour garantir la longévité et la fiabilité de chaque pièce traitée.
                  </p>
              </Card>
          </AnimatedWrapper>
          
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* min-w-0: without it the tables in TechniquesAndStandardsSection
                inflate the single mobile grid track past the viewport. */}
            <div className="min-w-0 lg:col-span-2 space-y-8">
                <AnimatedWrapper animation="fade-in">
                    <Card className="bg-secondary border-border p-6 transition-all duration-300 hover:border-accent hover:-translate-y-2">
                        <CardContent className="p-0 flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-shrink-0">
                                {SpecificityIcon && <SpecificityIcon className="h-20 w-20 text-accent" />}
                            </div>
                            <div className="flex-grow text-left">
                                <CardTitle className="text-accent text-3xl mb-3">SPÉCIFICITÉ DE LA GALVANISATION À CHAUD</CardTitle>
                                <p className="text-xl text-accent/80 mb-4">
                                « Une protection anticorrosion qui va au-delà d’un simple dépôt de zinc »
                                </p>
                            </div>
                        </CardContent>
                          <p className="text-xl text-foreground mt-4 text-justify">La galvanisation à chaud ne consiste pas uniquement à déposer du zinc à la surface de l’acier. Le revêtement de zinc est métallurgiquement lié à l’acier de base, car il se produit une réaction métallurgique de diffusion entre le zinc et le fer. Quand on retire l’acier du bain, il s’est formé à sa surface plusieurs couches d’alliages zinc-fer sur lesquelles le zinc entraîné se solidifie. <strong className="font-bold text-accent">Ces différentes couches d’alliages plus dures que l’acier de base ont une teneur en zinc de plus en plus élevée au fur et à mesure que l’on se rapproche de la surface du revêtement.</strong> Ainsi, cette spécificité liée au procédé de galvanisation offre au revêtement protecteur adhérence, imperméabilité, et résistance mécanique. De plus, l’épaisseur de ce revêtement est supérieure à celle obtenue avec les autres techniques de protection.</p>
                    </Card>
                </AnimatedWrapper>
                 <div className="grid md:grid-cols-1 gap-8 mt-8">
                    {benefits.map((benefit, index) => {
                      const Icon = iconMap[benefit.icon];
                      return (
                        <AnimatedWrapper
                          key={benefit.title}
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
            <div className="min-w-0 lg:col-span-3">
                <AnimatedWrapper animation="fade-in" staggerIndex={1}>
                    <TechniquesAndStandardsSection />
                </AnimatedWrapper>
            </div>
          </div>
        </div>
      </section>
    );
}

// 4. Highlight Section
function UnwrappedHighlightSection() {
    const { highlight } = galvanisationContent;
    const iconMap = galvanisationIconMap;
  
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
                        <Link href={cta.form_url} className="flex items-center gap-2">
                            {cta.button_primary} <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                    <DownloadButton text={cta.button_secondary} href="/documents/Bordj-Steel-Catalogue-FR.pdf" />
                </div>
            </AnimatedWrapper>
        </div>
      </section>
    );
}

    