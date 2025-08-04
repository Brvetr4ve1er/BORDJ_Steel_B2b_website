
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import * as React from "react";

export function Clients() {
  const { clients } = companyData.pages;
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section id="clients" className="bg-background">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{clients.title}</h2>
        </AnimatedWrapper>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[plugin.current]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          className="w-full"
        >
          <CarouselContent>
            {clients.logos.map((client, index) => (
              <CarouselItem key={index} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                 <div className="p-4">
                    <div className="flex justify-center items-center h-20">
                      <Image
                        src={client.image.src}
                        alt={client.name}
                        width={150}
                        height={80}
                        className="grayscale opacity-60 transition-all duration-300 hover:grayscale-0 hover:opacity-100 hover:scale-110 hover:shadow-lg rounded-md"
                        data-ai-hint={client.image.aiHint}
                      />
                    </div>
                  </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
