
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
    <div className="space-y-8">
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
        
        {secondaryImages.map((image, index) => (
          <AnimatedWrapper animation="fade-in" staggerIndex={index + 1} key={image.src}>
            <Card className="rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-2xl">
              <Image
                src={image.src}
                alt={image.alt}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                data-ai-hint={image.aiHint}
              />
            </Card>
          </AnimatedWrapper>
        ))}
    </div>
  );
}
