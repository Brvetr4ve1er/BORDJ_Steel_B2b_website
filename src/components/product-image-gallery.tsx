"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Card } from './ui/card';
import { useState, useEffect } from 'react';

export type ProductImage = {
  src: string;
  alt: string;
  aiHint: string;
};

interface ProductImageGalleryProps {
    images: ProductImage[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    setMainImage(images[0]);
  }, [images]);

  return (
    <div className="space-y-4">
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
    </div>
  );
}
