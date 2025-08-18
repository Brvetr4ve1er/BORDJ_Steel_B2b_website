
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { Card } from './ui/card';

export type ProductImage = {
  src: string;
  alt: string;
  aiHint: string;
};

const galleryImages: ProductImage[] = [
  { src: 'https://images.unsplash.com/photo-1501664908582-764f9d0b23ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzdGVlbCUyMHNoZWV0c3xlbnwwfHx8fDE3NTU1MDE5ODN8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Ribbed steel sheets stacked', aiHint: 'steel sheets' },
  { src: 'https://images.unsplash.com/photo-1735044902465-fe2f3eafdf77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtZXRhbCUyMHJvb2Zpbmd8ZW58MHx8fHwxNzU1NTAxOTgzfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Close-up of metal roofing sheets', aiHint: 'metal roofing' },
  { src: 'https://images.unsplash.com/photo-1578776349090-de61da00ff1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxmYWN0b3J5JTIwYnVpbGRpbmd8ZW58MHx8fHwxNzU1NTAxOTgzfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Factory building with sandwich panel walls', aiHint: 'factory building' },
  { src: 'https://images.unsplash.com/photo-1630516750423-7a3f2f4c6023?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxpbnN1bGF0aW9uJTIwcGFuZWxzfGVufDB8fHx8MTc1NTUwMTk4Mnww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Stack of insulation panels', aiHint: 'insulation panels' },
  { src: 'https://images.unsplash.com/photo-1649209481156-2f2d0b2e0b3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjb3JydWdhdGVkJTIwbWV0YWx8ZW58MHx8fHwxNzU1NTAxOTgyfDA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Corrugated metal texture', aiHint: 'corrugated metal' },
  { src: 'https://images.unsplash.com/photo-1634308978621-375d5cfbc458?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw4fHxzdGVlbCUyMGJlYW1zfGVufDB8fHx8MTc1NTUwMTk4Mnww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Construction site with steel beams', aiHint: 'steel beams' },
  { src: 'https://images.unsplash.com/photo-1583528187857-27f818f12caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxmcmVlemVyJTIwcm9vbXxlbnwwfHx8fDE3NTU1MDE5ODN8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Interior of a commercial freezer room', aiHint: 'freezer room' },
  { src: 'https://images.unsplash.com/photo-1740657287772-0efb751f2b33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxtZXRhbCUyMHNoZWV0fGVufDB8fHx8MTc1NTUwMTk4Mnww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'A single metal sheet with a glossy finish', aiHint: 'metal sheet' },
  { src: 'https://images.unsplash.com/photo-1661345118711-a2444650860b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxzdGVlbCUyMGNvaWxzfGVufDB8fHx8MTc1NTUwMTk4M3ww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Large rolls of coiled steel', aiHint: 'steel coils' },
  { src: 'https://images.unsplash.com/photo-1648671921845-895549805092?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxzdGVlbCUyMGZhYnJpY2F0aW9ufGVufDB8fHx8MTc1NTUwMTk4M3ww&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Welder working on steel fabrication', aiHint: 'steel fabrication' },
];

interface ProductImageGalleryProps {
    mainImage: ProductImage;
}

export function ProductImageGallery({ mainImage }: ProductImageGalleryProps) {
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

        <div className="columns-2 gap-4 sm:gap-6">
            <div className="space-y-4 sm:space-y-6">
                 {galleryImages.filter((_, index) => index % 2 === 0).map((image, index) => (
                  <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                    <Card className="break-inside-avoid rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-2xl">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={500}
                        height={index % 2 === 0 ? 400 : 600}
                        className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        data-ai-hint={image.aiHint}
                      />
                    </Card>
                  </AnimatedWrapper>
                ))}
            </div>
            <div className="space-y-4 sm:space-y-6 mt-8 sm:mt-12">
                 {galleryImages.filter((_, index) => index % 2 !== 0).map((image, index) => (
                  <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                    <Card className="break-inside-avoid rounded-lg overflow-hidden shadow-md group transition-all duration-300 hover:shadow-2xl">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={500}
                        height={index % 2 === 0 ? 600 : 400}
                        className="w-full h-auto object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
                        data-ai-hint={image.aiHint}
                      />
                    </Card>
                  </AnimatedWrapper>
                ))}
            </div>
        </div>
    </div>
  );
}
