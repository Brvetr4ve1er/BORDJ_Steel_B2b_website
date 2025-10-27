
"use client";

import React from "react";
import { motion } from "framer-motion";

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface TimelineProps {
  events: TimelineEvent[];
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
  return (
    <section className="relative w-full max-w-5xl mx-auto p-8">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2"></div>

      {events.map((event, index) => {
        const isLeft = index % 2 === 0;

        return (
          <div
            key={index}
            className="relative flex items-center justify-between w-full mb-12"
          >
            {/* Event Card */}
            <div
              className={`w-[calc(50%-2.5rem)] ${isLeft ? "order-1" : "order-3"}`}
            >
              <motion.div
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                <div className="p-6 rounded-lg border bg-card text-card-foreground shadow-lg transition-shadow hover:shadow-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-accent text-accent-foreground flex items-center justify-center flex-shrink-0">
                      {event.icon}
                    </div>
                    <h4 className="font-headline text-2xl font-bold text-primary">
                      {event.title}
                    </h4>
                  </div>
                  <p className="text-muted-foreground text-lg">
                    {event.description}
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Center Node and Connector */}
            <div
              className={`w-20 flex-shrink-0 order-2 flex items-center justify-center`}
            >
              <div
                className={`w-full h-1 ${
                  isLeft ? "bg-gradient-to-l" : "bg-gradient-to-r"
                } from-accent to-border`}
              />
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute w-20 h-20 rounded-full bg-background border-4 border-accent shadow-md flex items-center justify-center z-10"
              >
                <span className="font-headline text-xl font-bold text-accent">
                  {event.year}
                </span>
              </motion.div>
              <div
                className={`w-full h-1 ${
                  isLeft ? "bg-gradient-to-r" : "bg-gradient-to-l"
                } from-accent to-border`}
              />
            </div>

            {/* Spacer */}
            <div
              className={`w-[calc(50%-2.5rem)] ${isLeft ? "order-3" : "order-1"}`}
            ></div>
          </div>
        );
      })}
    </section>
  );
};
