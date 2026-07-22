"use client";

import Image from 'next/image';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { companyData } from '@/config/company-data';
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { cn } from '@/lib/utils';

// Logos whose artwork is white/light and need a dark backing to be visible
// on the light carousel background (verified by sampling rendered luminance).
const DARK_BACKED = new Set<string>(['Cosider', 'Imetal', 'Colinco', 'Mobilis']);

type ClientLogoData = { name: string; image: { src: string; aiHint?: string } };

function ClientLogo({ client }: { client: ClientLogoData }) {
  const [errored, setErrored] = React.useState(!client.image.src);
  const darkBacked = DARK_BACKED.has(client.name);

  return (
    <div
      className={cn(
        "group relative flex justify-center items-center p-4 transition-transform duration-300 ease-in-out hover:scale-110 h-64",
        (darkBacked || errored) && 'bg-gray-800 rounded-lg'
      )}
    >
      {errored ? (
        // Graceful fallback when a remote/missing logo fails to load:
        // show the client name instead of an empty cell.
        <span className="text-center text-sm font-semibold text-white/90 px-2">
          {client.name}
        </span>
      ) : (
        <Image
          src={client.image.src}
          alt={client.name}
          width={150}
          height={80}
          className="object-contain"
          onError={() => setErrored(true)}
          unoptimized={client.image.src.endsWith('.svg')}
        />
      )}
    </div>
  );
}

export function Clients() {
  const { clients } = companyData.pages;

  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <section id="clients" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{clients.title}</h2>
        </AnimatedWrapper>
        <AnimatedWrapper animation="fade-in">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {clients.logos.map((client) => (
                <CarouselItem key={client.name} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                  <ClientLogo client={client} />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
