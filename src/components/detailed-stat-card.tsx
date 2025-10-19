
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
  description: string;
  className?: string;
}

export const DetailedStatCard = ({
  icon: Icon,
  title,
  value,
  description,
  className,
}: DetailedStatCardProps) => {
  return (
    <Card
      className={cn("w-full", className)}
      aria-labelledby={`stat-card-title-${title.replace(/\s+/g, '-')}`}
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle id={`stat-card-title-${title.replace(/\s+/g, '-')}`}>{title}</CardTitle>
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
            {Icon && <Icon className="h-6 w-6 text-accent" />}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-5xl font-bold tracking-tighter text-foreground">
            {value}
          </p>
          <CardDescription className="mt-1">
            {description}
          </CardDescription>
        </motion.div>
      </CardContent>
    </Card>
  );
};
