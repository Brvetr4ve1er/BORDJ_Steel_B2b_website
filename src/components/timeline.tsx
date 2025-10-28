
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
        <div className="absolute left-1/2 top-0 h-full w-0.5 bg-accent/30 transform -translate-x-1/2"></div>
        
        <div className="space-y-12">
          {events.map((event, i) => {
            const isLeft = i % 2 === 0;
            const Icon = iconMap[event.icon];

            return (
              <AnimatedWrapper animation="slide-up" key={i}>
                <div className={cn("grid grid-cols-9 items-center")}>
                  {isLeft ? (
                    <>
                      {/* Left Card */}
                      <div className="col-span-4">
                        <article className="relative p-6 pr-12 bg-white rounded-lg shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
                          <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center border-4 border-gray-50 shadow-md">
                            {Icon && <Icon className="w-8 h-8" />}
                          </div>
                          <div className="text-right">
                             <div className="text-2xl font-bold text-accent mb-2">{event.year}</div>
                            <h3 className="text-2xl font-semibold text-primary mb-3">{event.title}</h3>
                            <p className="text-gray-600 text-base leading-relaxed">{event.description}</p>
                          </div>
                        </article>
                      </div>
                      
                      {/* Center elements */}
                      <div className="col-span-1 flex justify-center items-center h-full relative">
                        <div className="absolute left-1/2 top-1/2 h-0.5 bg-accent/30 w-full transform -translate-x-1/2" aria-hidden="true" />
                        <div className="relative w-5 h-5 bg-accent rounded-full border-4 border-gray-50 shadow-md z-10" aria-hidden="true" />
                      </div>

                      {/* Empty right side */}
                      <div className="col-span-4"></div>
                    </>
                  ) : (
                    <>
                      {/* Empty left side */}
                      <div className="col-span-4"></div>

                      {/* Center elements */}
                      <div className="col-span-1 flex justify-center items-center h-full relative">
                        <div className="absolute left-1/2 top-1/2 h-0.5 bg-accent/30 w-full transform -translate-x-1/2" aria-hidden="true" />
                        <div className="relative w-5 h-5 bg-accent rounded-full border-4 border-gray-50 shadow-md z-10" aria-hidden="true" />
                      </div>

                      {/* Right Card */}
                      <div className="col-span-4">
                         <article className="relative p-6 pl-12 bg-white rounded-lg shadow-lg border border-gray-100/50 hover:shadow-xl transition-all duration-300">
                          <div className="absolute -top-6 -right-6 w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center border-4 border-gray-50 shadow-md">
                            {Icon && <Icon className="w-8 h-8" />}
                          </div>
                          <div className="text-left">
                            <div className="text-2xl font-bold text-accent mb-2">{event.year}</div>
                            <h3 className="text-2xl font-semibold text-primary mb-3">{event.title}</h3>
                            <p className="text-gray-600 text-base leading-relaxed">{event.description}</p>
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
