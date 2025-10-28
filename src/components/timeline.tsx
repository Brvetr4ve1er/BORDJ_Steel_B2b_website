
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

const events = companyData.pages.about.timelineEvents;

export function Timeline() {
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
                <AnimatedWrapper animation="fade-in">
                  <div className={cn("relative", isLeft ? "md:text-right" : "md:text-left")}>
                    {/* Horizontal Connector Line (Desktop) */}
                    <div className={cn(
                        "hidden md:block absolute top-8 w-1/2 h-0.5 bg-accent/30",
                        isLeft ? "right-[-50%]" : "left-[-50%]"
                    )}></div>

                    {/* Connector dot (desktop only) */}
                    <div
                      className={cn(
                        "hidden md:block absolute top-6 w-5 h-5 bg-accent rounded-full border-4 border-gray-50 shadow-md z-10",
                        isLeft ? "right-[-1.25rem]" : "left-[-1.25rem]"
                      )}
                      aria-hidden="true"
                    />

                    {/* Card */}
                    <article className="p-6 bg-white rounded-lg shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300">
                      <p className="text-xl font-bold text-accent mb-2">{event.year}</p>
                      <div className="flex items-center gap-3 mb-3">
                         {Icon && <Icon className={cn("h-6 w-6 text-primary", isLeft ? 'ml-auto' : '')} />}
                         <h3 className="text-2xl font-semibold text-primary">{event.title}</h3>
                      </div>
                      <p className="text-gray-600 text-base leading-relaxed">{event.description}</p>
                    </article>
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
