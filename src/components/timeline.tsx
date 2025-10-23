
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

  return (
    <div ref={ref} className="relative container mx-auto px-4 py-20">
      <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border -translate-x-1/2">
        <motion.div
          className="absolute top-0 left-0 w-full bg-accent"
          style={{ height: pathLength, originY: 0 }}
        />
      </div>

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
                "relative flex items-center",
                isOdd ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "w-full md:w-5/12",
                  isOdd ? "md:order-last md:pl-8" : "md:order-first md:pr-8"
                )}
              >
                {item.content}
              </div>
              
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full bg-background border-4 border-accent flex items-center justify-center">
                    <p className="font-headline font-bold text-accent text-sm">
                      {item.title}
                    </p>
                  </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
