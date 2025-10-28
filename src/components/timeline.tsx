
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
    <div className="container mx-auto px-6">
      <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">
        Notre Parcours
      </h2>

      <div className="relative">
        {/* Central vertical line */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-accent/30 transform -translate-x-1/2"></div>

        <div className="space-y-16">
          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            const Icon = iconMap[event.icon];

            return (
              <div
                key={i}
                className={cn(
                  "relative flex items-center",
                  isLeft ? "justify-start" : "justify-end"
                )}
              >
                {/* Horizontal Connector Line (desktop) */}
                <div
                  className={cn(
                    "hidden md:block absolute top-1/2 w-1/2 h-0.5 bg-accent/30",
                    isLeft ? "left-0" : "right-0"
                  )}
                  style={{
                    width: 'calc(50% - 1.25rem)',
                    transform: 'translateY(-50%)'
                  }}
                />

                {/* Connector dot */}
                <div
                  className={cn(
                    "hidden md:block absolute top-1/2 w-5 h-5 bg-accent rounded-full border-4 border-gray-50 shadow-md z-10",
                    "left-1/2 -translate-x-1/2 -translate-y-1/2"
                  )}
                  aria-hidden="true"
                />

                <div
                  className={cn(
                    "w-full md:w-1/2",
                    isLeft ? "md:pr-8" : "md:pl-8"
                  )}
                >
                  <AnimatedWrapper animation="slide-up">
                    <article className={cn(
                      "p-6 bg-white rounded-lg shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 relative",
                      isLeft ? "text-right" : "text-left"
                    )}>
                       <p className={cn("text-2xl font-bold text-accent mb-2")}>{event.year}</p>
                      <div className={cn("flex items-center gap-3 mb-3", isLeft ? 'justify-end' : '')}>
                        {Icon && <Icon className={cn("h-6 w-6 text-primary", isLeft ? 'order-2' : 'order-1')} />}
                        <h3 className={cn("text-2xl font-semibold text-primary", isLeft ? 'order-1' : 'order-2')}>{event.title}</h3>
                      </div>
                      <p className="text-gray-600 text-base leading-relaxed">{event.description}</p>
                    </article>
                  </AnimatedWrapper>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

