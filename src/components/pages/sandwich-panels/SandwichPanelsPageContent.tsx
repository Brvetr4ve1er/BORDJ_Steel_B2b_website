
"use client";

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useMemo, useState } from 'react';
import { ChevronsRight, Snowflake, Settings, ArrowRight } from 'lucide-react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import images from '@/app/lib/placeholder-images.json';
import { DownloadButton } from '@/components/ui/download-button';
import { productVariants } from '@/config/product-variants.config';
import { ProductVariantDetails } from '@/components/product-variants/ProductVariantDetails';
import { StatsCards } from '@/components/sections/sandwich-panels/StatsCards';
import { ThermalPerformanceBand } from '@/components/sections/sandwich-panels/ThermalPerformanceBand';
import { sandwichHero, sandwichHeroStats, sandwichIntro } from '@/config/sandwich-panels-data';
import { SandwichWireframe } from '@/components/wireframes/SandwichWireframe';

const CouvertureIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline>
    </svg>
);

const BardageIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4C21 3.44772 20.5523 3 20 3ZM19 5V7H5V5H19ZM5 19V9H19V19H5Z" />
      <path d="M7 11H9V13H7V11Z" />
      <path d="M11 11H13V13H11V11Z" />
      <path d="M15 11H17V13H15V11Z" />
      <path d="M7 15H9V17H7V15Z" />
      <path d="M11 15H13V17H11V15Z" />
      <path d="M15 15H17V17H15V15Z" />
    </svg>
);

const FrigorifiqueIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Snowflake {...props} />
);

const HibondIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3 6H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M5 3L8 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 3L12 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M13 3L16 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M17 3L20 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 15L7 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 15L11 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 15L15 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 15L19 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const FinitionsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <Settings {...props} />
);


const HeroSection = React.memo(function HeroSection() {
  const heroImage = images['sandwich-panels'].hero;
  return (
    <section className="relative h-screen w-full flex flex-col justify-end text-white overflow-hidden">
      <Image
        src={heroImage.src}
        alt={heroImage.alt}
        fill
        className="z-0 object-cover"
        data-ai-hint={heroImage.aiHint}
        priority
        placeholder="blur"
        blurDataURL={heroImage.blurDataUrl}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
      <div className="relative z-20 w-full">
        <div className="w-full px-8 md:px-12 pb-10">
          <AnimatedWrapper animation="zoom-in">
              <h1 className="font-headline text-6xl md:text-8xl leading-tight md:leading-tight lg:leading-tight font-bold tracking-tighter uppercase text-white">
                  {sandwichHero.title}
              </h1>
              <p className="mt-8 text-xl md:text-2xl max-w-3xl text-gray-200">
                  {sandwichHero.subtitle}
              </p>
              <div className="mt-12 flex justify-start items-center gap-4">
                  <Button asChild size="lg" variant="destructive" className="group">
                      <Link href="/contact">
                          Explorer les produits <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                      </Link>
                  </Button>
                  <DownloadButton text="Voir la brochure" href="/documents/Bordj-Steel-Catalogue-FR.pdf" />
              </div>
          </AnimatedWrapper>
           <StatsCards stats={sandwichHeroStats}/>
        </div>
      </div>
    </section>
  );
});

const productButtons = [
  { key: 'couverture', label: 'Panneaux de Couverture', icon: CouvertureIcon },
  { key: 'bardage', label: 'Panneaux de Bardage', icon: BardageIcon },
  { key: 'frigorifique', label: 'Panneaux Frigorifiques', icon: FrigorifiqueIcon },
  { key: 'toleNervuree', label: 'Tôle Nervurée', icon: ChevronsRight },
  { key: 'hibond', label: 'Hi-Bond 77', icon: HibondIcon },
  { key: 'finitions', label: 'Pièces de Finition', icon: FinitionsIcon },
];

export function SandwichPanelsPageContent() {
  const [activeProductKey, setActiveProductKey] = useState<string>('couverture');
  
  const activeProductData = useMemo(() => {
    return productVariants[activeProductKey];
  }, [activeProductKey])

  return (
    <>
      <HeroSection />

      <section className="bg-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <SandwichWireframe />
        </div>
      </section>

      <ThermalPerformanceBand />

      <section id="product-details" className="bg-secondary/20 py-20">
        <div className="container mx-auto px-4 max-w-screen-2xl">
          <AnimatedWrapper animation="fade-in">
              <Card className="text-center mb-20 p-8 bg-background shadow-lg">
                  <h2 className="font-headline text-5xl font-bold text-primary mb-6">{sandwichIntro.title}</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                      {sandwichIntro.text}
                  </p>
              </Card>
          </AnimatedWrapper>
          
          <AnimatedWrapper animation="fade-in">
            <div className="mb-24 flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
                {productButtons.map(({ key, label, icon: Icon }) => (
                /* Icon circle + label are one single control: the circle is the
                   obvious click target, so the whole thing carries the onClick. */
                <button
                    key={key}
                    type="button"
                    onClick={() => setActiveProductKey(key)}
                    aria-pressed={activeProductKey === key}
                    className="group flex flex-col items-center gap-2 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                    <span className={cn(
                    "w-32 h-32 rounded-full flex items-center justify-center border-4 border-background transition-all duration-300 transform group-hover:scale-110",
                    activeProductKey === key ? 'bg-accent shadow-lg' : 'bg-secondary'
                    )}>
                    <Icon className={cn(
                        "h-14 w-14 transition-colors duration-300",
                        activeProductKey === key ? 'text-accent-foreground' : 'text-primary',
                        key === 'toleNervuree' && "rotate-[-90deg]"
                    )} />
                    </span>
                    <span className={cn(
                        "inline-flex items-center justify-center rounded-md py-2 px-6 text-center text-lg font-semibold transition-all duration-300",
                        activeProductKey === key
                            ? 'bg-accent text-accent-foreground shadow-lg'
                            : 'border border-input bg-secondary text-primary group-hover:bg-accent/10'
                    )}>
                    {label}
                    </span>
                </button>
                ))}
            </div>
            </AnimatedWrapper>
          
          {activeProductData && (
            <AnimatedWrapper key={activeProductKey} animation="zoom-in">
                <Card className="shadow-lg">
                    <CardContent className="p-4 md:p-8">
                       <ProductVariantDetails product={activeProductData} />
                    </CardContent>
                </Card>
            </AnimatedWrapper>
          )}
        </div>
      </section>
    </>
  );
}

    