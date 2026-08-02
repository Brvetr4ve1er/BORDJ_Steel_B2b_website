"use client";

import Image from 'next/image';
import * as React from 'react';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { companyData } from '@/config/company-data';

type ClientLogoData = { name: string; image: { src: string; aiHint?: string } };

function ClientLogo({
  client,
  variant = 'grid',
}: {
  client: ClientLogoData;
  variant?: 'grid' | 'marquee';
}) {
  // Start already in the fallback state when there is no logo file (e.g. Tazedj),
  // and fall back to the name if a logo fails to load.
  const [errored, setErrored] = React.useState(!client.image.src);
  const isMarquee = variant === 'marquee';

  return (
    <div
      className={[
        'group flex h-24 items-center justify-center rounded-xl border border-border/70 bg-white p-4 shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md md:h-28',
        isMarquee ? 'w-52 shrink-0 md:w-60' : 'w-full',
      ].join(' ')}
    >
      {errored ? (
        <span className="text-center text-sm font-semibold text-muted-foreground">{client.name}</span>
      ) : (
        <Image
          src={client.image.src}
          alt={`Logo ${client.name}`}
          width={200}
          height={94}
          sizes={
            isMarquee
              ? '(max-width: 768px) 208px, 240px'
              : '(max-width: 640px) 40vw, (max-width: 1024px) 22vw, 180px'
          }
          className="max-h-14 w-auto max-w-[88%] object-contain transition-transform duration-300 group-hover:scale-105 md:max-h-16"
          onError={() => setErrored(true)}
          unoptimized={client.image.src.endsWith('.svg')}
        />
      )}
    </div>
  );
}

function MarqueeRow({
  logos,
  direction,
  durationSeconds,
}: {
  logos: ClientLogoData[];
  direction: 'left' | 'right';
  durationSeconds: number;
}) {
  // Duplicate the row's contents once so translateX(-50%) yields a seamless loop.
  const doubled = React.useMemo(() => [...logos, ...logos], [logos]);
  const trackClass = direction === 'left' ? 'marquee-track-left' : 'marquee-track-right';

  return (
    <div className="marquee-row relative overflow-hidden">
      <div
        className={`marquee-track flex w-max items-stretch gap-4 md:gap-6 ${trackClass}`}
        style={{ animationDuration: `${durationSeconds}s` }}
        aria-hidden="false"
      >
        {doubled.map((client, i) => (
          <ClientLogo
            // Same-name logos repeat by design (loop duplicate); the index disambiguates.
            key={`${client.name}-${i}`}
            client={client}
            variant="marquee"
          />
        ))}
      </div>
    </div>
  );
}

export function Clients() {
  const { clients } = companyData.pages;

  // Interleave into two rows so the visual weight of the marquee is balanced
  // rather than front-loaded. With 23 logos this yields rows of 12 and 11.
  const rowA = clients.logos.filter((_, i) => i % 2 === 0);
  const rowB = clients.logos.filter((_, i) => i % 2 === 1);

  return (
    <section id="clients" className="bg-secondary/40 py-20 md:py-24">
      <style>{`
        @keyframes bs-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes bs-marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        .marquee-track {
          animation-iteration-count: infinite;
          animation-timing-function: linear;
          will-change: transform;
        }
        .marquee-track-left  { animation-name: bs-marquee-left;  }
        .marquee-track-right { animation-name: bs-marquee-right; }
        .marquee-row:hover .marquee-track,
        .marquee-row:focus-within .marquee-track {
          animation-play-state: paused;
        }
        .marquee-row {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 80px,
            #000 calc(100% - 80px),
            transparent 100%
          );
                  mask-image: linear-gradient(
            to right,
            transparent 0,
            #000 80px,
            #000 calc(100% - 80px),
            transparent 100%
          );
        }
        /* Swap the marquee for a plain static grid when the user prefers reduced motion. */
        .clients-marquee { display: block; }
        .clients-static  { display: none;  }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; transform: none !important; }
          .marquee-row {
            -webkit-mask-image: none;
                    mask-image: none;
          }
          .clients-marquee { display: none; }
          .clients-static  { display: grid; }
        }
      `}</style>
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
          {/* Motion: dual-row marquee, opposite directions, hover to pause. */}
          <div className="clients-marquee space-y-4 md:space-y-6">
            <MarqueeRow logos={rowA} direction="left" durationSeconds={55} />
            <MarqueeRow logos={rowB} direction="right" durationSeconds={60} />
          </div>

          {/* Reduced motion: same logos, static responsive grid — identical to the legacy layout. */}
          <div className="clients-static grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {clients.logos.map((client) => (
              <ClientLogo key={client.name} client={client} variant="grid" />
            ))}
          </div>
        </AnimatedWrapper>
      </div>
    </section>
  );
}
