
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Card } from './ui/card';

export type ProductImage = {
  src: string;
  alt: string;
  aiHint: string;
};

interface ProductImageGalleryProps {
    galleryImages: ProductImage[];
    implementationImages?: ProductImage[];
}

export function ProductImageGallery({ galleryImages, implementationImages }: ProductImageGalleryProps) {
  
  if (!galleryImages || galleryImages.length === 0) {
    return null;
  }

  const mainImage = galleryImages[0];
  const secondaryImages = implementationImages || [];

  return (
    <div className="space-y-4">
        {mainImage && (
            <AnimatedWrapper animation="fade-in">
                <Card className="rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-2xl">
                <Image
                    src={mainImage.src}
                    alt={mainImage.alt}
                    width={800}
                    height={600} 
                    className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    data-ai-hint={mainImage.aiHint}
                    priority
                />
                </Card>
            </AnimatedWrapper>
        )}
        
        {/* Large empty space */}
        <div className="h-[800px] w-full" />

        {secondaryImages.length > 0 && (
            <AnimatedWrapper animation="fade-in">
                <Card className="rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-2xl">
                <Image
                    src={secondaryImages[0].src}
                    alt={secondaryImages[0].alt}
                    width={800}
                    height={600} 
                    className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    data-ai-hint={secondaryImages[0].aiHint}
                />
                </Card>
            </AnimatedWrapper>
        )}

        {secondaryImages.length > 1 && (
            <>
                {/* Large empty space */}
                <div className="h-[800px] w-full" />
                <AnimatedWrapper animation="fade-in">
                    <Card className="rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-2xl">
                    <Image
                        src={secondaryImages[1].src}
                        alt={secondaryImages[1].alt}
                        width={800}
                        height={600} 
                        className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        data-ai-hint={secondaryImages[1].aiHint}
                    />
                    </Card>
                </AnimatedWrapper>
            </>
        )}
    </div>
  );
}
