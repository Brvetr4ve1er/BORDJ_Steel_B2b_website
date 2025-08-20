"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Card } from './ui/card';
import { useState } from 'react';

export type ProductImage = {
  src: string;
  alt: string;
  aiHint: string;
};

const galleryImages: ProductImage[] = [
  { src: 'https://images.unsplash.com/photo-1501664908582-764f9d0b23ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzdGVlbCUyMHNoZWV0c3xlbnwwfHx8fDE3NTU1MDE5ODN8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Ribbed steel sheets stacked', aiHint: 'steel sheets' },
  { src: 'https://images.unsplash.com/photo-1735044902465-fe2f3eafdf77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtZXRhbCUyMHJvb2Zpbmd8ZW58MHx8fHwxNzU1NTAxOTgzfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Close-up of metal roofing sheets', aiHint: 'metal roofing' },
  { src: 'https://images.unsplash.com/photo-1578776349090-de61da00ff1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxmYWN0b3J5JTIwYnVpbGRpbmd8ZW58MHx8fHwxNzU1NTAxOTgzfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Factory building with sandwich panel walls', aiHint: 'factory building' },
];

interface ProductImageGalleryProps {
    images: ProductImage[];
}

export function ProductImageGallery({ images }: ProductImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0]);

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
            {images.map((image, index) => (
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
