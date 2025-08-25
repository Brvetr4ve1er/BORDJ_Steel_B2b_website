
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

  const allImages = [...galleryImages, ...(implementationImages || [])];

  return (
    <div className="space-y-4">
        {allImages.map((image, index) => (
            <AnimatedWrapper key={index} animation="fade-in">
                <Card className="rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-2xl">
                <Image
                    src={image.src}
                    alt={image.alt}
                    width={800}
                    height={600} 
                    className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    data-ai-hint={image.aiHint}
                    priority={index === 0}
                />
                </Card>
            </AnimatedWrapper>
        ))}
    </div>
  );
}
