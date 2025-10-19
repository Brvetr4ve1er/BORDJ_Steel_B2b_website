
"use client";

import * as React from "react";
import { motion } from "framer-motion";
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
  return (
    <Card
      className={cn("w-full bg-destructive text-destructive-foreground", className)}
      aria-labelledby={`stat-card-title-${title.replace(/\s+/g, '-')}`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle id={`stat-card-title-${title.replace(/\s+/g, '-')}`}>{title}</CardTitle>
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-destructive-foreground/10 flex items-center justify-center">
            {Icon && <Icon className="h-6 w-6 text-destructive-foreground" />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {secondaryValue ? (
            <div className="flex items-baseline justify-between">
              <div className="text-left">
                <p className="text-3xl font-bold text-destructive-foreground">
                  {value}
                </p>
                <p className="text-sm text-destructive-foreground/80">par jour</p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold text-destructive-foreground/80">
                  {secondaryValue}
                </p>
                <p className="text-sm text-destructive-foreground/80">par an</p>
              </div>
            </div>
          ) : (
             <p className="text-5xl font-bold text-destructive-foreground">
              {value}
            </p>
          )}

          <CardDescription className="mt-2 text-destructive-foreground/80 text-left">
            {description}
          </CardDescription>
        </motion.div>
      </CardContent>
    </Card>
  );
};
