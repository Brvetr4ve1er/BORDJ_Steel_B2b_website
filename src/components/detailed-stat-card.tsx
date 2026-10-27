
"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DetailedStatCardProps {
  icon: React.ElementType;
  title: string;
  value: string;
  secondaryValue?: string;
  description: string;
  className?: string;
}

export const DetailedStatCard = ({
  icon: Icon,
  title,
  value,
  secondaryValue,
  description,
  className,
}: DetailedStatCardProps) => {
  // No `MotionConfig` in this app, so framer-motion defaults to
  // `reducedMotion: 'never'` and this reveal would play regardless of the OS
  // setting. `initial={false}` mounts the card straight at its resting state.
  const prefersReducedMotion = useReducedMotion();

  return (
    <Card
      className={cn("w-full bg-destructive text-destructive-foreground relative", className)}
      aria-labelledby={`stat-card-title-${title.replace(/\s+/g, '-')}`}
    >
      <CardContent className="pt-6">
        <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-left"
        >
          <div className="mb-2 flex items-start justify-between gap-4">
            <CardTitle id={`stat-card-title-${title.replace(/\s+/g, '-')}`} className="text-xl">{title}</CardTitle>
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-destructive-foreground/10">
              {Icon && <Icon className="h-6 w-6 text-destructive-foreground" />}
            </div>
          </div>

          {secondaryValue ? (
            <div className="flex items-baseline justify-between">
              <div className="text-left">
                <p className="text-3xl font-bold">
                  {value}
                </p>
                <p className="text-sm text-destructive-foreground/90">par jour</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold">
                  {secondaryValue}
                </p>
                <p className="text-sm text-destructive-foreground/90">par an</p>
              </div>
            </div>
          ) : (
             <p className="text-5xl font-bold">
              {value}
            </p>
          )}

          {/* /90, not /80: white at 80% over bg-destructive (#C1272D) composites
              to 4.22:1, and at the 70% root all three of these are under the
              large-text threshold, so they need the full 4.5:1. /90 is 4.97:1. */}
          <CardDescription className="mt-2 text-destructive-foreground/90 text-base">
            {description}
          </CardDescription>
        </motion.div>
      </CardContent>
    </Card>
  );
};
