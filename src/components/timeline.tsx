
"use client";
import React from "react";
import { Award, Lightbulb, Search, Cog, Users, BarChart, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { companyData } from "@/config/company-data";

/**
 * Timeline.tsx
 * - Grid-based zigzag timeline
 * - Mobile: stacked center
 * - Desktop (md+): alternating left / right using col-start
 */

const iconMap: { [key: string]: React.ElementType } = {
  Lightbulb,
  Search,
  Cog,
  Users,
  BarChart,
  Target,
  Award
};

const events = [
   { year: '2012', title: 'Création de Bordj Steel', description: 'Fondation de la SPA BORDJ STEEL dans le cadre de la stratégie de développement du groupe CONDOR.', icon: 'Lightbulb' },
   { year: '2013', title: 'Début de la Construction', description: 'En juin, les travaux de construction de l\'unité de charpente métallique débutent.', icon: 'Cog' },
   { year: '2014', title: 'Démarrage de la Production', description: 'Juillet voit le démarrage de la production de l\'unité de charpente métallique.', icon: 'Users' },
   { year: '2015', title: 'Expansion des Capacités', description: 'Septembre est un mois charnière avec le démarrage de la production de panneaux sandwichs.', icon: 'BarChart' },
   { year: '2016', title: 'Inauguration et Finalisation', description: 'En Décembre, le complexe est officiellement inauguré par le ministre de l’intérieur.', icon: 'Target' },
   { year: '2019', title: 'Certification Qualité', description: 'Obtention de la prestigieuse certification ISO 9001 Version 2015.', icon: 'Award' },
   { year: '2025', title: 'Leader Engagé', description: 'Nous continuons d\'innover, guidés par notre système de Management Intégré QSE.', icon: 'Search' }
];

export function Timeline() {
  return (
    <section className="relative w-full bg-secondary/30 py-20 px-4">
      <div className="container mx-auto px-8 max-w-full">
        <h2 className="text-3xl font-bold text-center mb-16 text-primary">
          Notre Parcours
        </h2>
        <div className="relative grid grid-cols-9 gap-y-24">
          {/* Central vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-accent/30 transform -translate-x-1/2"></div>

          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            const Icon = iconMap[event.icon];
            return (
              <div
                key={i}
                className={cn(
                  "col-span-9 md:col-span-4 relative",
                  isLeft
                    ? "md:col-start-1"
                    : "md:col-start-6"
                )}
              >
                {/* Horizontal connector line */}
                <div
                  className={cn(
                    "hidden md:block absolute top-6 w-1/2 h-0.5 bg-accent/30",
                    isLeft ? "right-0" : "left-0"
                  )}
                  aria-hidden="true"
                ></div>

                <div
                  className={cn(
                    "relative flex flex-col items-center",
                    isLeft ? "md:items-end" : "md:items-start"
                  )}
                >
                  {/* Connector dot (desktop only) */}
                  <div
                    className={cn(
                      "hidden md:block absolute top-6 w-5 h-5 bg-accent rounded-full border-4 border-background shadow-md",
                      isLeft ? "right-[-1.25rem]" : "left-[-1.25rem]"
                    )}
                    aria-hidden="true"
                  ></div>

                  {/* Card */}
                   <div className={cn(
                    "p-6 bg-background rounded-lg shadow-lg border border-border/50 hover:shadow-xl transition-shadow w-full max-w-sm",
                    isLeft ? "md:text-right" : "md:text-left"
                   )}>
                    <div className={cn(
                        "flex items-center gap-4 mb-4",
                        isLeft ? "md:flex-row-reverse" : "md:flex-row"
                    )}>
                       {/* Year/Icon for mobile */}
                       <div className="md:hidden flex-shrink-0 w-16 h-16 bg-accent text-accent-foreground rounded-full flex flex-col items-center justify-center">
                           {Icon && <Icon className="w-8 h-8" />}
                       </div>
                       {/* Year for desktop */}
                       <div className={cn(
                        "hidden md:flex flex-shrink-0 text-2xl font-bold text-accent items-center justify-center w-16 h-16 bg-background rounded-full border-2 border-accent/20",
                        isLeft ? 'ml-auto' : 'mr-auto'
                        )}>
                          {event.year}
                       </div>
                       <div className={cn("flex-grow", isLeft ? "text-right" : "text-left")}>
                          <h3 className="text-xl font-semibold text-primary">{event.title}</h3>
                       </div>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">{event.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
