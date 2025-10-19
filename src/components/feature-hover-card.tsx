
import React from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureHoverCardProps {
    Icon: React.ElementType;
    title: string;
    description: string;
}

export function FeatureHoverCard({ Icon, title, description }: FeatureHoverCardProps) {
  return (
    <div className={cn(
        "group before:hover:scale-95 before:hover:h-72 before:hover:w-80 before:hover:h-44 before:hover:rounded-b-2xl before:transition-all before:duration-500 before:content-[''] before:w-80 before:h-24 before:rounded-t-2xl before:bg-gradient-to-bl from-accent/50 via-primary/50 to-primary before:absolute before:top-0",
        "w-80 h-72 relative bg-background flex flex-col items-center justify-center gap-2 text-center rounded-2xl shadow-lg mx-auto"
    )}>
      <div className="w-28 h-28 bg-primary mt-8 rounded-full border-4 border-background z-10 group-hover:scale-150 group-hover:-translate-x-24 group-hover:-translate-y-20 transition-all duration-500 flex items-center justify-center">
        <Icon className="w-16 h-16 text-primary-foreground" />
      </div>
      <div className="z-10 group-hover:-translate-y-10 transition-all duration-500">
        <span className="text-xl font-bold text-primary">{title}</span>
        <p className="text-muted-foreground px-4">{description}</p>
      </div>
      <Button variant="destructive" className="px-4 py-1 z-10 hover:scale-125 transition-all duration-500 opacity-0 group-hover:opacity-100">
        En savoir plus <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
}
