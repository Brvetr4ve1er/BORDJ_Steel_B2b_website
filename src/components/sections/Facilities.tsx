
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { companyData, getFacilityImage } from '@/config/company-data';
import { HardHat, Layers, Cog, Anchor } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { KenBurns, type KenBurnsVariant } from '@/components/ui/ken-burns';

// Static icon map hoisted to module scope so it isn't recreated on every
// render (same pattern as navbar.tsx).
const iconMap = {
  HardHat,
  Layers,
  Cog,
  Anchor,
} as const;

// Crop overrides keyed off the SAME stable key as the photo, so the crop can
// never end up on a different card than the image it was meant for.
const imageCropByKey: Record<string, string> = {
  panneaux: 'object-top',
};

// Ambient drift, rotated by position rather than keyed by unit. Unlike the crop
// above, *which* photo gets *which* move doesn't matter — what matters is that
// no two cards standing side by side share one, or the band would pulse in
// unison. Rotating by index also means a fifth unit added to the config keeps
// alternating without a change here. The four moves also run at four different
// periods (26/29/31/35s), so they never visibly resynchronise.
const driftOrder: readonly KenBurnsVariant[] = ['left', 'right', 'in', 'out'];

export function Facilities() {
  const { units } = companyData.pages;

  // Every unit in the config is rendered and resolves its own photo from its
  // stable `imageKey` — reordering or adding a unit needs no change here.
  const facilitiesData = units.items.map((unit) => ({
    ...unit,
    image: getFacilityImage(unit.imageKey),
  }));

  return (
    <section id="services" className="bg-secondary">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{units.title}</h2>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {facilitiesData.map((facility, index) => {
             const Icon = iconMap[facility.icon as keyof typeof iconMap];
             const drift = driftOrder[index % driftOrder.length] ?? 'in';
             return (
                <AnimatedWrapper key={facility.imageKey} animation="slide-up">
                  <Link href={facility.href || '#'} className="group block">
                    <Card className="overflow-hidden shadow-xl transition-shadow hover:shadow-2xl relative aspect-square">
                        {/*
                          * The photo drifts on its own (KenBurns), so it is now the
                          * wrapper that owns the fill positioning. The image keeps its
                          * own transform for the hover push-in — but that transform now
                          * sits INSIDE an animated one and the two multiply, so the
                          * hover was pulled back from scale-105 to 1.03: against a drift
                          * that already reaches 1.13, the old 5% read as a lurch.
                          */}
                        <KenBurns variant={drift} className="absolute inset-0 z-0">
                          <Image
                          src={facility.image.src}
                          alt={facility.title}
                          width={facility.image.width}
                          height={facility.image.height}
                          className={cn(
                              "transition-transform duration-500 group-hover:scale-[1.03] object-cover w-full h-full",
                              imageCropByKey[facility.imageKey]
                          )}
                          data-ai-hint={facility.image.aiHint}
                          />
                        </KenBurns>
                        {/* Permanent scrim: keeps the always-visible title legible over any photo. */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                        {/* Extra dimming on hover/focus, when the description is revealed. */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300" />

                        {/* Icon visible by default */}
                        {Icon && (
                            <div className={cn(
                                "absolute inset-0 flex items-center justify-center transition-all duration-300",
                                "group-hover:opacity-0 group-hover:scale-75",
                                "group-focus-within:opacity-0 group-focus-within:scale-75"
                            )}>
                                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-full">
                                    <Icon className="h-12 w-12 text-white" />
                                </div>
                            </div>
                        )}

                        {/* Title is always readable; only the description is hover/focus-revealed. */}
                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                           {Icon && (
                                <div className="absolute top-6 left-6 transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:opacity-100 group-focus-within:translate-y-0">
                                   <Icon className="h-10 w-10 text-white" />
                                </div>
                           )}
                           <div className="mt-auto">
                                <h3 className="font-headline text-2xl font-bold drop-shadow-lg">{facility.title}</h3>
                                <p className={cn(
                                    "text-sm max-h-0 overflow-hidden opacity-0 transition-all duration-300",
                                    "group-hover:mt-2 group-hover:max-h-48 group-hover:opacity-100",
                                    "group-focus-within:mt-2 group-focus-within:max-h-48 group-focus-within:opacity-100"
                                )}>
                                  {facility.description}
                                </p>
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

    