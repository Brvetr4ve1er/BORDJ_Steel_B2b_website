
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
        <h2 className="text-3xl font-bold text-center mb-16 text-white">
          Notre Parcours
        </h2>

        <div className="relative grid grid-cols-9 gap-y-12">
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
                    {/* Connector dot (desktop only) */}
                    <div
                      className={cn(
                        "hidden md:block absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-accent rounded-full border-4 border-gray-900 shadow-md z-10",
                        isLeft ? "right-[-1.125rem]" : "left-[-1.125rem]"
                      )}
                      aria-hidden="true"
                    />

                    {/* Card */}
                    <article className="p-6 bg-gray-800 rounded-lg shadow-lg border border-gray-700/50 hover:shadow-accent/20 hover:shadow-2xl transition-all duration-300">
                      <p className="text-xl font-bold text-accent mb-2">{event.year}</p>
                      <h3 className="text-2xl font-semibold mb-3 text-white">{event.title}</h3>
                      <p className="text-gray-400 text-base leading-relaxed">{event.description}</p>
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
