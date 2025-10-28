
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

        <div className="grid grid-cols-9 gap-y-24">
          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            const Icon = iconMap[event.icon];

            return (
              <React.Fragment key={i}>
                <div
                  className={cn(
                    "col-span-9 md:col-span-4",
                    isLeft ? "md:col-start-1" : "md:col-start-6"
                  )}
                >
                  <AnimatedWrapper animation="slide-up">
                    <div className={cn("relative flex items-center gap-6", isLeft ? "md:flex-row-reverse" : "md:flex-row")}>
                      
                       <div className="hidden md:block w-32">
                        <div className={cn("text-2xl font-bold text-accent", isLeft ? "text-right" : "text-left")}>{event.year}</div>
                      </div>

                      {/* Horizontal Connector Line (desktop) */}
                      <div className={cn(
                        "hidden md:block absolute top-1/2 h-0.5 bg-accent/30",
                        isLeft ? "right-[8rem] w-[calc(100%-9rem-1.25rem)]" : "left-[8rem] w-[calc(100%-9rem-1.25rem)]"
                      )} aria-hidden="true" />
                      
                      {/* Connector dot */}
                      <div className={cn(
                        "hidden md:block absolute top-1/2 w-5 h-5 bg-accent rounded-full border-4 border-gray-50 shadow-md z-10 transform -translate-y-1/2",
                        isLeft ? "right-[7.5rem]" : "left-[7.5rem]"
                      )} aria-hidden="true" />
                      
                      <article className={cn(
                        "w-full p-6 bg-white rounded-lg shadow-lg border border-gray-200/50 hover:shadow-xl transition-all duration-300 relative"
                      )}>
                        <div className={cn("md:hidden text-2xl font-bold text-accent mb-2")}>{event.year}</div>

                        {Icon && (
                          <div className={cn(
                            "absolute -top-6 w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center border-4 border-gray-50 shadow-md",
                            isLeft ? "md:right-4" : "md:left-4",
                            "left-4"
                          )}>
                            <Icon className="w-8 h-8" />
                          </div>
                        )}
                        
                        <div className={cn("mt-8 text-left")}>
                          <h3 className="text-2xl font-semibold text-primary mb-3">{event.title}</h3>
                          <p className="text-gray-600 text-base leading-relaxed">{event.description}</p>
                        </div>
                      </article>
                    </div>
                  </AnimatedWrapper>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}
