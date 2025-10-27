
"use client";

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { RunnerIcon } from './icons/runner-icon';
import { FlagIcon } from './icons/flag-icon';
import { Building, Milestone, Zap, HardHat, Star, Award, Search, Lightbulb, Cog, Users, BarChart, Target } from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
  Building,
  Milestone,
  Zap,
  HardHat,
  Star,
  Award,
  Search,
  Lightbulb,
  Cog,
  Users,
  BarChart,
  Target
};

export interface RoadTimelineEvent {
  title: string;
  description: string;
  icon: string;
}

interface RoadTimelineProps {
  events: RoadTimelineEvent[];
}

export const RoadTimeline: React.FC<RoadTimelineProps> = ({ events }) => {
  const roadWidth = 100;
  const segmentHeight = 250;
  const totalHeight = (events.length + 1.5) * segmentHeight;

  const path = [
    `M ${roadWidth / 2},0`,
    `V ${segmentHeight * 0.5}`,
  ];

  events.forEach((_, index) => {
    const y = (index + 1) * segmentHeight;
    const isLeft = index % 2 !== 0;

    const controlPointY = y - segmentHeight / 2;
    const startX = roadWidth / 2;

    const endX = isLeft ? -roadWidth * 1.5 : roadWidth * 2.5;

    path.push(`C ${startX},${controlPointY} ${endX},${controlPointY} ${endX},${y}`);
    
    if(index < events.length -1) {
        const nextY = (index + 2) * segmentHeight;
        const nextControlPointY = nextY - segmentHeight / 2;
        path.push(`C ${endX},${nextControlPointY} ${startX},${nextControlPointY} ${startX},${nextY}`);
    } else {
        path.push(`L ${endX},${y + segmentHeight * 0.5}`);
    }
  });

  const finalPath = path.join(' ');
  
  return (
    <div className="relative w-full max-w-5xl mx-auto" style={{ height: totalHeight }}>
      {/* Start */}
      <motion.div 
        className="absolute z-10" 
        style={{ top: segmentHeight * 0.2, left: `calc(50% - ${roadWidth / 2}px - 100px)` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <RunnerIcon className="w-12 h-12 text-primary" />
        <h2 className="text-3xl font-bold text-primary mt-2">START</h2>
      </motion.div>

      {/* Road */}
      <svg
        width="100%"
        height={totalHeight}
        viewBox={`-250 0 600 ${totalHeight}`}
        className="absolute top-0 left-0"
        preserveAspectRatio="none"
      >
        <motion.path
          d={finalPath}
          fill="none"
          stroke="#333"
          strokeWidth={roadWidth}
          strokeLinecap="round"
        />
        <motion.path
          d={finalPath}
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeDasharray="15 25"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 5, ease: 'easeInOut' }}
        />
      </svg>

      {/* Events */}
      {events.map((event, index) => {
        const y = (index + 1) * segmentHeight;
        const isLeft = index % 2 !== 0;
        const Icon = iconMap[event.icon];

        const iconX = isLeft ? -roadWidth * 1.5 : roadWidth * 2.5;
        const textContainerX = isLeft ? `calc(50% + ${roadWidth * 1.5}px + 60px)` : `calc(50% - ${roadWidth * 2}px - 60px)`;
        const textAlign = isLeft ? 'left' : 'right';
        
        return (
          <React.Fragment key={index}>
            <motion.div
              className="absolute"
              style={{ top: y - 50, left: `calc(50% - 50px + ${iconX}px)` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 + index * 0.5 }}
            >
              <div className="w-24 h-24 rounded-full bg-yellow-400 flex items-center justify-center border-4 border-black shadow-lg">
                {Icon && <Icon className="w-12 h-12 text-black" />}
              </div>
            </motion.div>
            <motion.div
              className="absolute w-80"
              style={{ top: y - 40, left: textContainerX, textAlign }}
              initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.5 }}
            >
              <h3 className="text-2xl font-bold text-primary text-shadow">{event.title}</h3>
              <p className="text-lg text-muted-foreground mt-2">{event.description}</p>
            </motion.div>
          </React.Fragment>
        );
      })}

      {/* Goal */}
       <motion.div 
        className="absolute z-10" 
        style={{ top: (events.length + 1) * segmentHeight, left: `calc(50% - 50px - 100px)`}}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 + events.length * 0.5 }}
       >
        <FlagIcon className="w-12 h-12 text-primary" />
        <h2 className="text-3xl font-bold text-primary mt-2">GOAL</h2>
      </motion.div>
    </div>
  );
};
