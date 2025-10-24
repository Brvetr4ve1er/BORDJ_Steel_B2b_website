
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React from "react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const cardHeight = 250; // Estimated height of each card section
  const totalHeight = data.length * cardHeight;

  return (
    <div ref={ref} className="relative container mx-auto px-4 py-20">
      <svg
        className="absolute left-0 top-0 w-full h-full"
        width="100%"
        height={totalHeight}
      >
        <motion.path
          d={`M ${window.innerWidth / 2} 0 ${data
            .map((_, i) => {
              const y = i * cardHeight + cardHeight / 2;
              const x = i % 2 === 0 ? "25%" : "75%";
              const nextY = (i + 1) * cardHeight + cardHeight / 2;
              const nextX = (i + 1) % 2 === 0 ? "25%" : "75%";
              if (i < data.length - 1) {
                return `L ${x} ${y} L ${nextX} ${nextY}`;
              }
              return `L ${x} ${y}`;
            })
            .join(" ")}`}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="2"
        />
        <motion.path
          d={`M ${window.innerWidth / 2} 0 ${data
            .map((_, i) => {
              const y = i * cardHeight + cardHeight / 2;
              const x = i % 2 === 0 ? "25%" : "75%";
              const nextY = (i + 1) * cardHeight + cardHeight / 2;
              const nextX = (i + 1) % 2 === 0 ? "25%" : "75%";
              if (i < data.length - 1) {
                return `L ${x} ${y} L ${nextX} ${nextY}`;
              }
              return `L ${x} ${y}`;
            })
            .join(" ")}`}
          fill="none"
          stroke="hsl(var(--accent))"
          strokeWidth="2"
          style={{ pathLength }}
        />
      </svg>

      <div className="relative z-10 flex flex-col gap-12">
        {data.map((item, index) => {
          const isOdd = index % 2 !== 0;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isOdd ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className={cn(
                "relative flex items-center h-[250px]",
                isOdd ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "w-full md:w-5/12",
                  isOdd ? "md:order-first md:pr-8" : "md:order-last md:pl-8"
                )}
              >
                {item.content}
              </div>

              <div
                className={cn(
                  "absolute top-1/2 -translate-y-1/2",
                  isOdd ? "left-1/4 -translate-x-1/2" : "left-3/4 -translate-x-1/2"
                )}
              >
                <div
                  className="group relative w-32 h-16"
                >
                    <div className="absolute inset-0 bg-accent rounded-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"></div>
                    <div className="relative w-full h-full flex items-center justify-center bg-background border-2 border-accent rounded-lg shadow-lg">
                        <p className="font-headline font-bold text-accent text-xl">
                            {item.title}
                        </p>
                    </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
