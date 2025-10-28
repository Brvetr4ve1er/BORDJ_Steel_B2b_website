
"use client";
import React from "react";
import { companyData } from "@/config/company-data";
import { Award, Lightbulb, Search, Cog, Users, BarChart, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { AnimatedWrapper } from "./animated-wrapper";

const iconMap: { [key: string]: React.ElementType } = {
  Lightbulb,
  Search,
  Cog,
  Users,
  BarChart,
  Target,
  Award,
};

export function Timeline() {
  const events = companyData.pages.about.timelineEvents;

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
          Notre Parcours
        </h2>

        <div className="relative grid grid-cols-9 gap-y-24">
          {/* Central vertical line */}
          <div className="absolute left-1/2 top-0 h-full w-0.5 bg-accent/30 transform -translate-x-1/2"></div>

          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            const Icon = iconMap[event.icon];

            return (
              <div
                key={i}
                className={cn(
                  "col-span-9 md:col-span-4",
                  isLeft ? "md:col-start-1" : "md:col-start-6"
                )}
              >
                <AnimatedWrapper animation="slide-up">
                  <div className={cn("relative", isLeft ? "md:text-right" : "md:text-left")}>
                    
                    {/* Horizontal Connector Line */}
                    <div className={cn(
                        "hidden md:block absolute top-8 h-0.5 bg-accent/30",
                        isLeft ? "left-[calc(50%_+_1.25rem)] w-[calc(50%_-_1.25rem)]" : "right-[calc(50%_+_1.25rem)] w-[calc(50%_-_1.25rem)]"
                    )}></div>

                    {/* Connector dot */}
                    <div
                      className={cn(
                        "hidden md:block absolute top-6 w-5 h-5 bg-accent rounded-full border-4 border-gray-50 shadow-md z-10",
                        isLeft ? "right-[-1.25rem]" : "left-[-1.25rem]"
                      )}
                      aria-hidden="true"
                    />
                    
                    <div className={cn("flex flex-col", isLeft ? 'items-end' : 'items-start')}>
                        <p className={cn("text-2xl font-bold text-accent mb-2", isLeft ? 'mr-12' : 'ml-12')}>{event.year}</p>
                        <article className="p-6 bg-white rounded-lg shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 w-full">
                        <div className={cn("flex items-center gap-3 mb-3", isLeft ? 'justify-end' : '')}>
                            {Icon && <Icon className={cn("h-6 w-6 text-primary", isLeft ? 'order-2' : 'order-1')} />}
                            <h3 className={cn("text-2xl font-semibold text-primary", isLeft ? 'order-1' : 'order-2')}>{event.title}</h3>
                        </div>
                        <p className="text-gray-600 text-base leading-relaxed">{event.description}</p>
                        </article>
                    </div>
                  </div>
                </AnimatedWrapper>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
