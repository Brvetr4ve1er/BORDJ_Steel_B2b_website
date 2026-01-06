

"use client";

import Image from 'next/image';
import * as React from 'react';
import { useMemo, useState } from 'react';
import { ChevronsRight, Snowflake, Settings, ArrowRight, DollarSign, Smartphone, Star, Users, Layers, Thermometer, ShieldCheck, Ruler } from 'lucide-react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import images from '@/app/lib/placeholder-images.json';
import { DownloadButton } from '@/components/ui/download-button';
import { motion } from 'framer-motion';
import { productVariants } from '@/config/product-variants.config';
import { ProductVariantDetails } from '@/components/product-variants/ProductVariantDetails';
import type { ProductVariant } from '@/config/product-variant-schema';

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

interface StatsCardsProps {
  stats?: Array<{
    value: string
    label: string
    description?: string
    icon?: string
    trend?: {
      value: string
      direction: "up" | "down"
    }
  }>
}

const iconMap: { [key: string]: React.ElementType } = {
  DollarSign: DollarSign,
  Users: Users,
  Star: Star,
  Smartphone: Smartphone,
  Layers: Layers,
  Thermometer: Thermometer,
  ShieldCheck: ShieldCheck,
  Ruler: Ruler
}

function StatsCards({
  stats = [
    {
      value: "2.5M",
      label: "Revenue",
      description: "Annual recurring revenue",
      icon: "DollarSign",
      trend: { value: "+12%", direction: "up" },
    },
    {
      value: "45K",
      label: "Customers",
      description: "Happy customers worldwide",
      icon: "Users",
      trend: { value: "+8%", direction: "up" },
    },
    {
      value: "98%",
      label: "Satisfaction",
      description: "Customer satisfaction rate",
      icon: "Star",
      trend: { value: "+2%", direction: "up" },
    },
    {
      value: "1.2M",
      label: "Downloads",
      description: "Total app downloads",
      icon: "Smartphone",
      trend: { value: "+15%", direction: "up" },
    },
  ],
}: StatsCardsProps) {
  const ref = React.useRef(null)

  return (
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 px-4 sm:px-6 lg:px-8 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
            className="group backdrop-blur-sm bg-white/10 relative overflow-hidden rounded-2xl border border-white/20 p-6 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-accent transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />
            <div className="relative">
              <motion.div
                className="mb-4 text-3xl text-white"
                initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1}}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1 + 0.3,
                }}
              >
                {React.createElement(
                  iconMap[stat.icon as keyof typeof iconMap] || DollarSign,
                  {
                    className: "h-8 w-8",
                  }
                )}
              </motion.div>

              <motion.div
                className="text-white mb-1 text-2xl font-bold lg:text-3xl"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1 + 0.4,
                }}
              >
                {stat.value}
              </motion.div>

              <h3 className="text-white/90 mb-2 text-sm font-semibold tracking-wide uppercase">
                {stat.label}
              </h3>

              {stat.description && (
                <p className="text-white/70 mb-3 text-xs">
                  {stat.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
  )
}


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
              <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white">
                  Panneaux Sandwichs
              </h1>
              <p className="mt-8 text-xl md:text-2xl max-w-3xl text-gray-200">
                  Solutions d'isolation haute performance pour la construction moderne.
              </p>
              <div className="mt-12 flex justify-start items-center gap-4">
                  <Button size="lg" variant="destructive" className="group">
                      Explorer les produits <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
                  </Button>
                  <DownloadButton text="Voir la brochure" />
              </div>
          </AnimatedWrapper>
           <StatsCards stats={[
             { value: '30-200mm', label: 'Épaisseur', description: 'Gamme complète pour tous besoins', icon: 'Layers' },
             { value: '0.023 W/mK', label: 'Conductivité', description: 'Performance thermique optimale', icon: 'Thermometer' },
             { value: 'B, S2-d0', label: 'Réaction au feu', description: 'Sécurité et conformité maximales', icon: 'ShieldCheck' },
             { value: '15.4m', label: 'Longueur Max', description: 'Adapté aux grandes portées', icon: 'Ruler' },
           ]}/>
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

const ProductSelector = React.memo(function ProductSelector({ activeProductKey, onSelectProduct }: { activeProductKey: keyof typeof productVariants | null, onSelectProduct: (key: keyof typeof productVariants) => void }) {
  return (
    <AnimatedWrapper animation="fade-in">
      <div className="mb-24 flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
        {productButtons.map(({ key, label, icon: Icon }) => (
          <div key={key} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => onSelectProduct(key as keyof typeof productVariants)}>
            <div className={cn(
              "w-32 h-32 rounded-full flex items-center justify-center border-4 border-background transition-all duration-300 transform group-hover:scale-110",
              activeProductKey === key ? 'bg-accent shadow-lg' : 'bg-secondary'
            )}>
              <Icon className={cn(
                "h-14 w-14 transition-colors duration-300",
                activeProductKey === key ? 'text-accent-foreground' : 'text-primary',
                key === 'toleNervuree' && "rotate-[-90deg]"
              )} />
            </div>
            <Button
              variant={activeProductKey === key ? 'destructive' : 'outline'}
              className={cn(
                "h-auto py-2 px-6 transition-all duration-300 text-center",
                activeProductKey === key ? 'bg-accent shadow-lg' : 'bg-secondary text-primary hover:bg-accent/10'
              )}
            >
              <span className="text-center text-lg font-semibold">{label}</span>
            </Button>
          </div>
        ))}
      </div>
    </AnimatedWrapper>
  );
});

interface SandwichPanelsPageProps {
  productData: typeof productVariants;
}

export function SandwichPanelsPage({ productData }: SandwichPanelsPageProps) {
  const [activeProductKey, setActiveProductKey] = useState<keyof typeof productVariants | null>(null);
  
  const activeProduct = useMemo(() => {
    if (!activeProductKey) return null;
    return productData[activeProductKey];
  }, [activeProductKey, productData]);

  return (
    <>
      <HeroSection />
      
      <section id="product-details" className="bg-secondary/20 py-20">
        <div className="container mx-auto px-4 max-w-screen-2xl">
          <AnimatedWrapper animation="fade-in">
              <Card className="text-center mb-20 p-8 bg-background shadow-lg">
                  <h2 className="font-headline text-5xl font-bold text-primary mb-6">Panneaux Sandwichs & Solutions de Construction</h2>
                  <p className="text-xl text-muted-foreground leading-relaxed max-w-4xl mx-auto">
                      Découvrez notre gamme complète de panneaux sandwichs et solutions pour bâtiments préfabriqués (PEB). Conçus pour offrir une isolation thermique et acoustique supérieure, nos panneaux sont la solution idéale pour les toitures, les bardages et les chambres froides. Chaque variation est conçue avec précision pour répondre aux exigences spécifiques de votre projet, garantissant durabilité, efficacité énergétique et une finition esthétique impeccable.
                  </p>
              </Card>
          </AnimatedWrapper>
          
          <ProductSelector activeProductKey={activeProductKey} onSelectProduct={setActiveProductKey} />
          
          {activeProduct && (
            <AnimatedWrapper key={activeProductKey} animation="zoom-in">
                <Card className="shadow-lg">
                    <CardContent className="p-4 md:p-8">
                        <ProductVariantDetails product={activeProduct} />
                    </CardContent>
                </Card>
            </AnimatedWrapper>
          )}
        </div>
      </section>
    </>
  );
}

    