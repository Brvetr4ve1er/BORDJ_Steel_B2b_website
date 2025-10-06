
'use client';

import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductionPillarCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
}

export function ProductionPillarCard({ Icon, title, description }: ProductionPillarCardProps) {
  return (
    <div className={cn(
      "group relative w-full h-[400px] p-5 cursor-pointer",
      "text-primary border-2 border-accent",
      "flex flex-col",
      "transform-origin-center transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]",
      "hover:rounded-xl hover:bg-accent hover:scale-95 hover:rotate-6 hover:shadow-2xl hover:shadow-accent/40"
    )}>
      <div className={cn(
        "transition-colors duration-500",
        "group-hover:text-accent-foreground"
      )}>
        <p className="mb-6 font-semibold">BORDJ STEEL</p>
        <div className="flex-grow">
          <h3 className="text-3xl font-bold leading-tight">{title}</h3>
        </div>
        <p className="font-medium">Production</p>
      </div>
    </div>
  );
}
