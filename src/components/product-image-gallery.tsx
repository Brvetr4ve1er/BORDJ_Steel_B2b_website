
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
    <div className="space-y-4 sm:space-y-6">
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

        <div className="grid grid-cols-3 gap-4">
            {images.slice(1).map((image, index) => (
              <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                <Card className="break-inside-avoid rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-2xl cursor-pointer" onClick={() => setMainImage(image)}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={500}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                    data-ai-hint={image.aiHint}
                  />
                </Card>
              </AnimatedWrapper>
            ))}
        </div>
    </div>
  );
}
