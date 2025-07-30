
"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import * as React from "react";

export function Products() {
  const { products } = companyData.pages;

  return (
    <section id="products" className="bg-background">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{products.title}</h2>
        </AnimatedWrapper>
        <AnimatedWrapper animation="fade-in">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {products.items.map((product, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1 h-full">
                    <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl h-full flex flex-col">
                      <CardHeader className="p-0">
                        <Image
                          src={product.image.src}
                          alt={product.name}
                          width={800}
                          height={600}
                          className="w-full h-64 object-cover"
                          data-ai-hint={product.image.aiHint}
                        />
                      </CardHeader>
                      <CardContent className="p-6 flex flex-col flex-grow">
                        <CardTitle className="font-headline text-2xl text-primary">{product.name}</CardTitle>
                        <p className="mt-2 text-lg flex-grow">{product.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
