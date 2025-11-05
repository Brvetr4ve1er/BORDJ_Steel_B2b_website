
"use client";
import React, { useMemo } from "react";
import { companyData } from "@/config/company-data";
import { Award, Lightbulb, Search, Cog, Users, BarChart, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedWrapper } from "./animated-wrapper";

export function Timeline() {
  const events = companyData.pages.about.timelineEvents;
  
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
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-accent/30 transform -translate-x-1/2"></div>
        
        <div className="space-y-12">
          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            const Icon = iconMap[event.icon as keyof typeof iconMap];

            return (
              <AnimatedWrapper animation="slide-up" key={i}>
                <div className="grid grid-cols-1 md:grid-cols-9 items-center">
                  
                  {isLeft ? (
                    <>
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
                      <div className="hidden md:block col-span-1 h-full relative">
                        <div className="absolute left-1/2 top-1/2 h-0.5 bg-accent/30 w-full transform -translate-x-1/2" aria-hidden="true" />
                        <div className="absolute left-1/2 top-1/2 w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-md z-10 transform -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
                      </div>
                      <div className="hidden md:block col-span-4"></div>
                    </>
                  ) : (
                    <>
                      <div className="hidden md:block col-span-4"></div>
                      <div className="hidden md:block col-span-1 h-full relative">
                        <div className="absolute left-1/2 top-1/2 h-0.5 bg-accent/30 w-full transform -translate-x-1/2" aria-hidden="true" />
                        <div className="absolute left-1/2 top-1/2 w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-md z-10 transform -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
                      </div>
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
