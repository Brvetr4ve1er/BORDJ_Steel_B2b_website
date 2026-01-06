
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Card } from './ui/card';

export type ProductImage = {
  src: string;
  alt: string;
  aiHint: string;
  blurDataUrl?: string;
};

interface ProductImageGalleryProps {
    mainImage: ProductImage;
}

export function ProductImageGallery({ mainImage }: ProductImageGalleryProps) {
  
  if (!mainImage || !mainImage.src) {
    return null;
  }

  return (
    <div className="space-y-8">
        <AnimatedWrapper animation="fade-in">
            <Card className="rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-2xl">
            <Image
                src={mainImage.src}
                alt={mainImage.alt}
                width={800}
                height={600} 
                className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                data-ai-hint={mainImage.aiHint}
                placeholder={mainImage.blurDataUrl ? 'blur' : 'empty'}
                blurDataURL={mainImage.blurDataUrl}
            />
            </Card>
        </AnimatedWrapper>
    </div>
  );
}
