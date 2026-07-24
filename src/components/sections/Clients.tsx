"use client";

import Image from 'next/image';
import * as React from 'react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { companyData } from '@/config/company-data';

type ClientLogoData = { name: string; image: { src: string; aiHint?: string } };

function ClientLogo({ client }: { client: ClientLogoData }) {
  // Start already in the fallback state when there is no logo file (e.g. Tazedj),
  // and fall back to the name if a logo fails to load.
  const [errored, setErrored] = React.useState(!client.image.src);

  return (
    <div className="group flex h-24 items-center justify-center rounded-xl border border-border/70 bg-white p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-md md:h-28">
      {errored ? (
        <span className="text-center text-sm font-semibold text-muted-foreground">{client.name}</span>
      ) : (
        <Image
          src={client.image.src}
          alt={`Logo ${client.name}`}
          width={200}
          height={94}
          sizes="(max-width: 640px) 40vw, (max-width: 1024px) 22vw, 180px"
          className="max-h-14 w-auto max-w-[88%] object-contain transition-transform duration-300 group-hover:scale-105 md:max-h-16"
          onError={() => setErrored(true)}
          unoptimized={client.image.src.endsWith('.svg')}
        />
      )}
    </div>
  );
}

export function Clients() {
  const { clients } = companyData.pages;

  return (
    <section id="clients" className="bg-secondary/40 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <p className="mb-3 text-center text-sm font-semibold uppercase tracking-widest text-accent">
            Ils nous font confiance
          </p>
          <h2 className="mb-12 text-center font-headline text-4xl font-bold text-primary">
            {clients.title}
          </h2>
        </AnimatedWrapper>
        <AnimatedWrapper animation="fade-in">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {clients.logos.map((client) => (
              <ClientLogo key={client.name} client={client} />
            ))}
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
