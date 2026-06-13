
"use client";
import React, { useMemo } from "react";
import { Award, Lightbulb, Search, Cog, Users, BarChart, Target } from "lucide-react";
import { AnimatedWrapper } from "@/components/animated-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/animated-number";
import { companyData } from "@/config/company-data";


export function HistoryTimeline() {
  // Single source of truth: timeline events live in company-data.ts.
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
        {/* This is the main vertical timeline bar. Its alignment is key. */}
        <div className="absolute left-1/2 top-8 h-[calc(100%-4rem)] w-0.5 bg-accent/30 transform -translate-x-1/2"></div>
        
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
                        <div className="absolute left-1/2 top-1/2 h-0.5 w-1/2 bg-accent/30 transform -translate-x-full" aria-hidden="true" />
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
                        <div className="absolute left-1/2 top-1/2 h-0.5 w-1/2 bg-accent/30" aria-hidden="true" />
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

        {/* Final Horizontal Card */}
        <div className="relative mt-12">
            <div className="absolute left-1/2 top-0 h-12 w-0.5 bg-accent/30 transform -translate-x-1/2" aria-hidden="true" />
             <div className="absolute left-1/2 top-12 w-5 h-5 bg-accent rounded-full border-4 border-secondary shadow-md z-10 transform -translate-x-1/2" aria-hidden="true" />
            <div className="pt-20">
                <AnimatedWrapper animation="fade-in">
                    <Card className="bg-background shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <CardContent className="p-10 text-center">
                            <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6 border-4 border-accent/20">
                                <Users className="w-12 h-12 text-accent" />
                            </div>
                            <h2 className="text-4xl font-bold text-primary mb-4">Notre capital humain</h2>
                            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                                Avec plus de <span className="font-bold text-accent text-3xl"><AnimatedNumber value={700} /> collaborateurs</span>, BordjSteel s'appuie sur une équipe compétente, engagée et passionnée par l'excellence industrielle.
                            </p>
                            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                                Chaque membre contribue au succès de l'entreprise à travers son savoir-faire, sa rigueur et son professionnalisme.
                            </p>
                        </CardContent>
                    </Card>
                </AnimatedWrapper>
            </div>
        </div>
      </div>
    </div>
  );
}
