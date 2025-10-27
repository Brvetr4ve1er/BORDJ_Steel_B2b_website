
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const cardHeight = 350; 
  const totalHeight = (data.length + 1) * cardHeight;

  const getPath = (currentWidth: number) => {
    if (currentWidth === 0) return "";
    
    const cardWidth = currentWidth > 768 ? currentWidth * (5 / 12) : currentWidth;
    const dateWidth = 128; // w-32
    
    const startX = currentWidth / 2;
    const startY = -50;

    let path = `M ${startX} ${startY}`;

    data.forEach((_, i) => {
      const cardY = i * cardHeight + cardHeight / 2;
      const isOdd = i % 2 !== 0;

      const dateX = currentWidth / 2;
      const cardX = currentWidth > 768 
        ? (isOdd ? currentWidth - cardWidth / 2 : cardWidth / 2) 
        : currentWidth / 2;
      
      const dateCardOffset = dateWidth / 2 + 16;
      const finalDateX = currentWidth > 768 
        ? (isOdd ? dateX - dateCardOffset : dateX + dateCardOffset)
        : dateX;

      const controlPointY = cardY - cardHeight / 4;
      const prevCardY = (i-1) * cardHeight + cardHeight/2;

      if(i > 0) {
        const wasOdd = (i - 1) % 2 !== 0;
        const prevDateCardOffset = dateWidth / 2 + 16;
        const prevFinalDateX = currentWidth > 768 
          ? (wasOdd ? dateX - prevDateCardOffset : dateX + prevDateCardOffset)
          : dateX;
        
        path += ` L ${prevFinalDateX} ${prevCardY}`;
      }

      path += ` L ${finalDateX} ${cardY}`;
      path += ` L ${cardX} ${cardY}`;
    });

    return path;
  };

  const path = getPath(width);


  return (
    <div ref={ref} className="relative container mx-auto px-4 py-20">
      <svg
        className="absolute left-0 top-0 w-full h-full"
        width="100%"
        height={totalHeight}
      >
        <motion.path
          d={path}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="2"
        />
        <motion.path
          d={path}
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
                "relative flex items-center h-[280px]", // Adjusted height
                isOdd ? "justify-end" : "justify-start"
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

              <div
                className={cn(
                  "absolute top-1/2 -translate-y-1/2",
                   isOdd ? "left-1/4 -translate-x-1/2" : "right-1/4 translate-x-1/2"
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
