"use client";

import * as React from 'react';
import { Star, Users, Layers, Thermometer, ShieldCheck, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';

export interface StatsCardsProps {
  stats: Array<{
    value: string
    label: string
    description?: string
    icon?: string
    trend?: {
      value: string
      direction: "up" | "down"
    }
  }>
}

const iconMap: { [key: string]: React.ElementType } = {
  Users: Users,
  Star: Star,
  Layers: Layers,
  Thermometer: Thermometer,
  ShieldCheck: ShieldCheck,
  Ruler: Ruler
}

export function StatsCards({ stats }: StatsCardsProps) {
  const ref = React.useRef(null)

  return (
      <div
        ref={ref}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 px-4 sm:px-6 lg:px-8 gap-4"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.15,
            }}
            className="group backdrop-blur-sm bg-white/10 relative overflow-hidden rounded-2xl border border-white/20 p-6 transition-all duration-500"
          >
            <div className="absolute inset-0 bg-accent transition-all duration-500 origin-bottom scale-y-0 group-hover:scale-y-100" />
            <div className="relative">
              <motion.div
                className="mb-4 text-3xl text-white"
                initial={{ rotate: -10, scale: 0.8, opacity: 0 }}
                animate={{ rotate: 0, scale: 1, opacity: 1}}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1 + 0.3,
                }}
              >
                {React.createElement(
                  iconMap[stat.icon as keyof typeof iconMap] || Layers,
                  {
                    className: "h-8 w-8",
                  }
                )}
              </motion.div>

              <motion.div
                className="text-white mb-1 text-2xl font-bold lg:text-3xl"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1 + 0.4,
                }}
              >
                {stat.value}
              </motion.div>

              <h3 className="text-white/90 mb-2 text-sm font-semibold tracking-wide uppercase">
                {stat.label}
              </h3>

              {stat.description && (
                <p className="text-white/70 mb-3 text-xs">
                  {stat.description}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
  )
}
