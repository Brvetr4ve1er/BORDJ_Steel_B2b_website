
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

  const cardHeight = 350; 
  const totalHeight = (data.length + 1) * cardHeight;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

  const getPath = (currentWidth: number) => {
    if (currentWidth === 0) return "";
    
    const centerX = currentWidth / 2;
    const amplitude = currentWidth / 8; // How far the line curves
    let path = `M ${centerX} -50`;

    data.forEach((_, i) => {
      const y1 = i * cardHeight + cardHeight / 4;
      const y2 = i * cardHeight + (cardHeight * 3) / 4;
      const x1 = centerX + (i % 2 === 0 ? -amplitude : amplitude);
      const x2 = centerX + (i % 2 === 0 ? amplitude : -amplitude);
      
      const prevY2 = (i - 1) * cardHeight + (cardHeight * 3) / 4;
      const prevX2 = centerX + ((i - 1) % 2 === 0 ? amplitude : -amplitude);

      if (i === 0) {
        path += ` C ${centerX} ${y1 / 2}, ${x1} ${y1 / 2}, ${x1} ${y1}`;
      } else {
        path += ` C ${prevX2} ${prevY2 + cardHeight / 4}, ${x1} ${y1 - cardHeight / 4}, ${x1} ${y1}`;
      }
      path += ` S ${x1} ${y2}, ${x2} ${y2}`;
    });

    return path;
  };
  
  const path = getPath(width);

  return (
    <div ref={ref} style={{ height: totalHeight }} className="relative container mx-auto px-4 py-20">
      <svg
        className="absolute left-0 top-0 w-full h-full"
        width="100%"
        height="100%"
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
          strokeDasharray="4 4"
          style={{ pathLength }}
        />
      </svg>

      <div className="relative z-10 w-full h-full">
        {data.map((item, index) => {
          const isOdd = index % 2 !== 0;
          const y = index * cardHeight + cardHeight / 2;
          const xOffset = width / 4; // 25% of width

          return (
            <div
              key={index}
              className="absolute"
              style={{
                top: `${y - cardHeight/2}px`,
                left: isOdd ? `${width / 2 + xOffset / 4}px` : `${width / 2 - xOffset * 1.25 - (width/12)}px`,
                width: `${width / 2.5}px`
              }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
              >
                {item.content}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={cn(
                  "absolute top-1/2 -translate-y-1/2"
                )}
                style={{
                  left: isOdd ? `-${xOffset / 2}px` : `calc(100% + ${xOffset / 4}px)`,
                }}
              >
                <div className="group relative w-32 h-16">
                  <div className="absolute inset-0 bg-accent rounded-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"></div>
                  <div className="relative w-full h-full flex items-center justify-center bg-background border-2 border-accent rounded-lg shadow-lg">
                    <p className="font-headline font-bold text-accent text-xl">
                      {item.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
