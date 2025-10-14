
'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface ProductionPillarCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export function ProductionPillarCard({ Icon, title, description }: ProductionPillarCardProps) {
  return (
    <div className={cn(
      "group relative w-full h-[400px] p-6 cursor-pointer overflow-hidden",
      "bg-black/30 backdrop-blur-sm text-white border-2 border-white/20",
      "flex flex-col justify-between",
      "transform-origin-center transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
      "hover:bg-accent hover:border-accent-foreground rounded-lg hover:scale-105 hover:shadow-2xl hover:shadow-accent/40"
    )}>
      {/* Top section with Icon and Title */}
      <div className={cn(
        "transition-all duration-500",
        "group-hover:-translate-y-4"
      )}>
        <div className="mb-4">
          <Icon className="h-10 w-10 transition-colors duration-500 group-hover:text-accent-foreground" />
        </div>
        <h3 className="text-3xl font-bold leading-tight">{title}</h3>
      </div>
      
      {/* Hidden description, revealed on hover */}
      <div className={cn(
        "absolute left-6 right-6 bottom-6 transition-all duration-500",
        "opacity-0 group-hover:opacity-100",
        "transform translate-y-8 group-hover:translate-y-0"
      )}>
        <p className="text-sm mb-4 text-accent-foreground/80">{description}</p>
        <Button variant="secondary" size="sm" className="bg-accent-foreground/10 text-accent-foreground hover:bg-accent-foreground/20">
          En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Static text at the bottom */}
      <div className={cn(
        "transition-all duration-500",
        "group-hover:opacity-0 group-hover:invisible"
      )}>
        <p className="font-semibold text-white/50">BORDJ STEEL Production</p>
      </div>
    </div>
  );
}

