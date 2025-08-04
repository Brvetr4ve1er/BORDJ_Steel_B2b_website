
"use client";

import Image from 'next/image';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';
import * as React from "react";

export function Clients() {
  const { clients } = companyData.pages;

  return (
    <section id="clients" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{clients.title}</h2>
        </AnimatedWrapper>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
          {clients.logos.map((client, index) => (
            <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
              <div className="group relative flex justify-center items-center p-4 transition-transform duration-300 ease-in-out hover:scale-110">
                <Image
                  src={client.image.src}
                  alt={client.name}
                  width={150}
                  height={80}
                  className="object-contain"
                />
              </div>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
