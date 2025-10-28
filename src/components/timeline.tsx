
"use client";
import React from "react";
import { Award, Lightbulb, Search, Cog, Users, BarChart, Target } from "lucide-react";

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
    <section className="relative py-16">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Notre Parcours</h2>
        <div className="relative grid grid-cols-9 gap-y-12">
          {/* central vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-1 bg-accent/30 transform -translate-x-1/2"></div>

          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            const Icon = iconMap[event.icon];
            return (
              <div
                key={i}
                className={`col-span-9 md:col-span-4 ${
                  isLeft ? "md:col-start-1 md:text-right" : "md:col-start-6 md:text-left"
                }`}
              >
                <div className={`relative flex flex-col ${isLeft ? 'items-end' : 'items-start'}`}>
                  {/* connector dot (only visible on md+) */}
                  <div
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${
                      isLeft ? "right-[-2.5rem]" : "left-[-2.5rem]"
                    } w-20 h-1 bg-accent/30`}
                    aria-hidden="true"
                  ></div>
                  <div
                    className={`hidden md:block absolute top-1/2 -translate-y-1/2 ${
                      isLeft ? "right-[-3.5rem]" : "left-[-3.5rem]"
                    } w-20 h-20 bg-background border-4 border-accent rounded-full shadow-lg flex items-center justify-center`}
                  >
                     <span className="font-headline text-xl font-bold text-accent">
                        {event.year}
                     </span>
                  </div>

                  {/* card */}
                  <article className="p-6 bg-white rounded-lg shadow-md border border-gray-100 hover:shadow-xl transition-shadow w-full md:max-w-sm">
                    <div className="flex items-center gap-4 mb-3">
                        <div className="md:hidden w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
                           {Icon && <Icon className="w-8 h-8"/>}
                        </div>
                        <div>
                             <p className="md:hidden text-left font-headline text-xl font-bold text-accent">{event.year}</p>
                             <h3 className="text-xl font-semibold text-gray-800 text-left">{event.title}</h3>
                        </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed text-left">{event.description}</p>
                  </article>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
