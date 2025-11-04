

"use client";

import Image from 'next/image';
import * as React from 'react';
import { useState, useMemo } from 'react';
import { ChevronsRight, Snowflake, Settings, ArrowRight } from 'lucide-react';
import { AnimatedWrapper } from './animated-wrapper';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { productData } from '@/config/products-data';
import { cn } from '@/lib/utils';
import images from '@/app/lib/placeholder-images.json';
import dynamic from 'next/dynamic';
import { DownloadButton } from './ui/download-button';
import CouvertureProduct from './product-variants/couverture-product';
import BardageProduct from './product-variants/bardage-product';
import FrigorifiqueProduct from './product-variants/frigorifique-product';
import ToleNervureeProduct from './product-variants/tole-nervuree-product';
import HibondProduct from './product-variants/hibond-product';
import FinitionsProduct from './product-variants/finitions-product';
import { ImageDialog } from './ui/image-dialog';

const HoverImageGallery = dynamic(() => import('./ui/hover-image-gallery').then(mod => mod.HoverImageGallery));

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

const ProductDetails = ({ product, activeProductKey }: { product: any; activeProductKey: keyof typeof productData }) => {
    if (!product) return null;
  
    const chunkedImages = useMemo(() => {
        const gallery = product.galleryImages || [];
        const size = Math.ceil(gallery.length / 3);
        const chunks = Array.from({ length: 3 }, (_, i) =>
            gallery.slice(i * size, (i + 1) * size)
        );
        return chunks.map(chunk => chunk.length > 0 ? chunk : chunks[0] || []);
    }, [product.galleryImages, activeProductKey]);
    
    const renderProduct = () => {
        if (product.documentMetadata?.productType?.includes('COUVERTURE')) {
            return <CouvertureProduct product={product} />;
        }
        if (product.documentMetadata?.productCategory?.includes('BARDAGE')) {
            return <BardageProduct product={product} />;
        }
        if (product.title?.includes('FRIGORIFIQUE')) {
            return <FrigorifiqueProduct product={product} />;
        }
        if (product.title?.includes('TÔLE NERVURÉE')) {
            return <ToleNervureeProduct product={product} />;
        }
        if (product.title?.includes('HI-BOND')) {
            return <HibondProduct product={product} />;
        }
        if (product.title?.includes('FINITION')) {
            return <FinitionsProduct product={product} />;
        }
        return <p>Sélectionnez un produit pour voir les détails.</p>;
    }

    return (
        <Card className="shadow-lg">
            <CardHeader className="bg-accent text-accent-foreground rounded-t-lg">
                <CardTitle className="text-4xl font-bold">{product.title || product.documentMetadata?.productCategory || product.documentMetadata?.productType}</CardTitle>
            </CardHeader>
            <CardContent className="p-8 bg-background">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-1 flex flex-col justify-between space-y-8">
                       {chunkedImages.map((chunk, i) => {
                         if (!chunk || chunk.length === 0) return null;
                         if (i === 1) { // Middle element is a static image
                            return (
                                <ImageDialog key={`${activeProductKey}-static-${i}`} imageUrl={chunk[0]?.src || chunk[0]} alt={chunk[0]?.alt || `Static product image`}>
                                    <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer group">
                                        <Image
                                            src={chunk[0]?.src || chunk[0]}
                                            alt={chunk[0]?.alt || `Static product image`}
                                            fill
                                            className="object-contain w-full h-full transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                </ImageDialog>
                            );
                         }
                         return (
                           <HoverImageGallery
                             key={`${activeProductKey}-gallery-${i}`}
                             images={chunk.map((img: any) => img.src || img)}
                           />
                         );
                       })}
                    </div>
                    <div className="md:col-span-2">
                        {renderProduct()}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};


export function SandwichPanelsPage() {
  const [activeProductKey, setActiveProductKey] = useState<keyof typeof productData>('couverture');
  const activeProduct = productData[activeProductKey];
  const heroImage = images['sandwich-panels'].hero;

  const productButtons = [
    { key: 'couverture', label: 'Panneaux de Couverture', icon: CouvertureIcon },
    { key: 'bardage', label: 'Panneaux de Bardage', icon: BardageIcon },
    { key: 'frigorifique', label: 'Panneaux Frigorifiques', icon: FrigorifiqueIcon },
    { key: 'toleNervuree', label: 'Tôle Nervurée', icon: ChevronsRight },
    { key: 'hibond', label: 'Hi-Bond 77', icon: HibondIcon },
    { key: 'finitions', label: 'Pièces de Finition', icon: FinitionsIcon },
  ];

  return (
    <>
      <section className="relative h-screen w-full flex items-end justify-start text-white overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10" />
        <div className="relative z-20 w-full px-8 md:px-12 pb-24">
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
        </div>
      </section>
      
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
          
          <AnimatedWrapper animation="fade-in">
            <div className="mb-24 flex flex-wrap justify-center items-center gap-x-12 gap-y-4">
              {productButtons.map(({ key, label, icon: Icon }) => (
                <div key={key} className="flex flex-col items-center gap-2 cursor-pointer group" onClick={() => setActiveProductKey(key as keyof typeof productData)}>
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
                      onClick={() => setActiveProductKey(key as keyof typeof productData)}
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
          
          <AnimatedWrapper key={activeProductKey} animation="fade-in">
              <ProductDetails product={activeProduct} activeProductKey={activeProductKey} />
          </AnimatedWrapper>
        </div>
      </section>
    </>
  );
}
