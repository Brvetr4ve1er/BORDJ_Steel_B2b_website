"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import { Button } from './ui/button';
import { ArrowRight, HardHat, Layers, Cog, Anchor } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import images from '@/app/lib/placeholder-images.json';
import { useMemo } from 'react';

export function Facilities() {
  const { units } = companyData.pages;
  const facilityImages = images.facilities;

  const iconMap = useMemo(() => ({
    HardHat,
    Layers,
    Cog,
    Anchor,
  }), []);

  const facilitiesData = [
    { ...units.items[0], image: facilityImages.charpente },
    { ...units.items[1], image: facilityImages.panneaux },
    { ...units.items[2], image: facilityImages.galvanisation },
    { ...units.items[3], image: facilityImages.chaudronnerie },
  ];

  return (
    <section id="services" className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{units.title}</h2>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilitiesData.map((facility, index) => {
             const Icon = iconMap[facility.icon as keyof typeof iconMap];
             return (
                <AnimatedWrapper key={index} animation="slide-up">
                  <Link href={facility.href || '#'} className="group block">
                    <Card className="overflow-hidden shadow-xl transition-shadow hover:shadow-2xl relative aspect-square">
                        <Image
                        src={facility.image.src}
                        alt={facility.title}
                        width={facility.image.width}
                        height={facility.image.height}
                        className={cn(
                            "transition-transform duration-500 group-hover:scale-110 object-cover w-full h-full",
                            facility.title === 'Panneaux Sandwichs' && 'object-top'
                        )}
                        data-ai-hint={facility.image.aiHint}
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Icon visible by default */}
                        {Icon && (
                            <div className={cn(
                                "absolute inset-0 flex items-center justify-center transition-all duration-300",
                                "group-hover:opacity-0 group-hover:scale-75"
                            )}>
                                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                                    <Icon className="h-12 w-12 text-white" />
                                </div>
                            </div>
                        )}

                        {/* Text content fades in on hover */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                           {Icon && (
                                <div className="absolute top-6 left-6 transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0">
                                   <Icon className="h-10 w-10 text-white" />
                                </div>
                           )}
                           <div className="mt-auto">
                                <h3 className="font-headline text-2xl font-bold mb-2">{facility.title}</h3>
                                <p className="text-sm mb-4">{facility.description}</p>
                                <Button asChild variant="destructive" className="mt-auto self-start bg-accent hover:bg-accent transition-all duration-300 ease-in-out transform group-hover:translate-y-0 translate-y-4">
                                    <span>
                                      Lire la suite
                                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                                    </span>
                                </Button>
                           </div>
                        </div>
                    </Card>
                    </Link>
                </AnimatedWrapper>
             )
          })}
        </div>
      </div>
    </section>
  );
}
