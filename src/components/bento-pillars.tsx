
"use client";

import React from "react";
import { motion } from "framer-motion";
import { HardHat, TowerControl, Tractor, Car, ArrowRight } from 'lucide-react';
import { cn } from "@/lib/utils";

const pillars = [
    {
        icon: HardHat,
        title: "PRS – Profils Reconstitués Soudés",
        description: "Fabrication sur mesure pour bâtiments industriels, ponts et charpentes lourdes.",
        className: "col-span-12 md:col-span-4",
        bgClass: "bg-gradient-to-br from-red-400 to-accent",
    },
    {
        icon: TowerControl,
        title: "Supports de Transport",
        description: "Structures pour l’énergie, la communication et l’affichage.",
        className: "col-span-12 md:col-span-8",
        bgClass: "bg-gradient-to-br from-blue-400 to-primary",
    },
    {
        icon: Tractor,
        title: "Pont Roulant – Mono et Bipoutre",
        description: "Solutions de manutention lourde avec options mono-poutre et bi-poutre.",
        className: "col-span-12 md:col-span-8",
        bgClass: "bg-gradient-to-br from-gray-400 to-foreground",
    },
    {
        icon: Car,
        title: "Ligne de Fabrication Automobile",
        description: "Ligne complète pour la transformation métallique automobile de haute précision.",
        className: "col-span-12 md:col-span-4",
        bgClass: "bg-gradient-to-br from-green-400 to-green-600",
    }
];

export const BentoPillars = () => {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 text-primary">
      <div className="mb-12">
        <h2 className="text-5xl font-bold text-center">Nos Piliers de Production</h2>
        <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
            Chacun de nos piliers de production représente un pôle d'excellence, équipé des technologies les plus avancées pour transformer l'acier en solutions innovantes.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {pillars.map((pillar, index) => (
          <BounceCard key={index} className={pillar.className}>
            <CardTitle>{pillar.title}</CardTitle>
            <div className={cn("absolute bottom-0 left-4 right-4 top-32 translate-y-8 rounded-t-2xl p-4 transition-transform duration-[250ms] group-hover:translate-y-4 group-hover:rotate-[2deg]", pillar.bgClass)}>
              <div className="flex flex-col items-center text-center text-white">
                <pillar.icon className="w-12 h-12 mb-4" />
                <p className="text-sm font-semibold">{pillar.description}</p>
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-4 flex items-center gap-2 whitespace-nowrap rounded-lg bg-white px-4 py-2 font-medium text-black shadow-xl transition-colors hover:bg-white/80"
                    >
                    <span>En savoir plus</span>
                    <ArrowRight />
                </motion.button>
              </div>
            </div>
          </BounceCard>
        ))}
      </div>
    </section>
  );
};

type BounceCardProps = {
    className?: string;
    children: React.ReactNode;
}

const BounceCard = ({ className, children }: BounceCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 0.95, rotate: "-1deg" }}
      className={cn(
        "group relative min-h-[300px] cursor-pointer overflow-hidden rounded-2xl bg-secondary p-8",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

const CardTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <h3 className="mx-auto text-center text-3xl font-semibold">{children}</h3>
  );
};
