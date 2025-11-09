
"use client";
import React, { useMemo } from "react";
import { Award, Lightbulb, Search, Cog, Users, BarChart, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedWrapper } from "./animated-wrapper";

// Data for the timeline events, moved here for easier debugging and styling.
// Originally from src/config/company-data.ts
const timelineEvents = [
  { year: '2012', title: 'Création de Bordj Steel', description: 'Fondation de la SPA BORDJ STEEL dans le cadre de la stratégie de développement du groupe CONDOR.', icon: 'Lightbulb' },
  { year: '2013', title: 'Début de la Construction', description: 'En juin, les travaux de construction de l\'unité de charpente métallique débutent.', icon: 'Cog' },
  { year: '2014', title: 'Démarrage de la Production', description: 'Juillet voit le démarrage de la production de l\'unité de charpente métallique.', icon: 'Users' },
  { year: '2015', title: 'Expansion des Capacités', description: 'Septembre est un mois charnière avec le démarrage de la production de panneaux sandwichs.', icon: 'BarChart' },
  { year: '2016', title: 'Inauguration et Finalisation', description: 'En Décembre, le complexe est officiellement inauguré par le ministre de l’intérieur.', icon: 'Target' },
  { year: '2019', title: 'Certification Qualité', description: 'Obtention de la prestigieuse certification ISO 9001 Version 2015.', icon: 'Award' },
  { year: '2025', title: 'Leader Engagé', description: 'Nous continuons d\'innover, guidés par notre système de Management Intégré QSE.', icon: 'Search' }
];


export function Timeline() {
  const events = timelineEvents;
  
  const iconMap = useMemo(() => ({
    Lightbulb,
    Search,
    Cog,
    Users,
    BarChart,
    Target,
    Award,
  }), []);

  return (
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-16 text-primary">
        Notre Parcours
      </h2>

      <div className="relative">
        {/* This is the main vertical timeline bar. Its alignment is key. */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-accent/30 transform -translate-x-1/2"></div>
        
        <div className="space-y-12">
          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            const Icon = iconMap[event.icon as keyof typeof iconMap];

            return (
              <AnimatedWrapper animation="slide-up" key={event.title}>
                <div className="grid grid-cols-1 md:grid-cols-9 items-center">
                  
                  {isLeft ? (
                    <>
                      {/* Left-side Card */}
                      <div className="col-span-1 md:col-span-4">
                        <article className="relative p-6 md:pr-12 bg-card rounded-lg shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300">
                          <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center border-4 border-secondary shadow-md">
                            {Icon && <Icon className="w-8 h-8" />}
                          </div>
                          <div className="text-left md:text-right">
                            <div className="text-2xl font-bold text-accent mb-2">{event.year}</div>
                            <h3 className="text-2xl font-semibold text-primary mb-3">{event.title}</h3>
                            <p className="text-muted-foreground text-base leading-relaxed">{event.description}</p>
                          </div>
                        </article>
                      </div>

                      {/* Middle connector and dot for left side */}
                      <div className="hidden md:block col-span-1 h-full relative">
                        <div className="absolute right-0 top-1/2 h-0.5 w-1/2 bg-accent/30" aria-hidden="true" />
                        <div className="absolute left-1/2 top-1/2 w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-md z-10 transform -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
                      </div>
                      
                      {/* Empty spacer for right side */}
                      <div className="hidden md:block col-span-4"></div>
                    </>
                  ) : (
                    <>
                      {/* Empty spacer for left side */}
                      <div className="hidden md:block col-span-4"></div>

                      {/* Middle connector and dot for right side */}
                      <div className="hidden md:block col-span-1 h-full relative">
                        <div className="absolute left-0 top-1/2 h-0.5 w-1/2 bg-accent/30" aria-hidden="true" />
                        <div className="absolute left-1/2 top-1/2 w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-md z-10 transform -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
                      </div>
                      
                      {/* Right-side Card */}
                      <div className="col-span-1 md:col-span-4">
                        <article className="relative p-6 md:pl-12 bg-card rounded-lg shadow-lg border border-border/50 hover:shadow-xl transition-all duration-300">
                          <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center border-4 border-secondary shadow-md">
                            {Icon && <Icon className="w-8 h-8" />}
                          </div>
                          <div className="text-left">
                            <div className="text-2xl font-bold text-accent mb-2">{event.year}</div>
                            <h3 className="text-2xl font-semibold text-primary mb-3">{event.title}</h3>
                            <p className="text-muted-foreground text-base leading-relaxed">{event.description}</p>
                          </div>
                        </article>
                      </div>
                    </>
                  )}

                </div>
              </AnimatedWrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
