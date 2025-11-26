
"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { MapPin } from 'lucide-react';

const distributors = [
  { id: 'algiers', name: 'Distributeur Alger', wilaya: 'Alger', x: '63%', y: '25%', contact: '0555 123 456' },
  { id: 'oran', name: 'Distributeur Oran', wilaya: 'Oran', x: '35%', y: '35%', contact: '0555 234 567' },
  { id: 'constantine', name: 'Distributeur Constantine', wilaya: 'Constantine', x: '80%', y: '30%', contact: '0555 345 678' },
  { id: 'ouargla', name: 'Point de Vente Ouargla', wilaya: 'Ouargla', x: '75%', y: '65%', contact: '0555 456 789' },
  { id: 'tamanrasset', name: 'Point de Vente Tamanrasset', wilaya: 'Tamanrasset', x: '70%', y: '85%', contact: '0555 567 890' },
  { id: 'bechar', name: 'Distributeur Béchar', wilaya: 'Béchar', x: '40%', y: '60%', contact: '0555 678 901' },
];

export function AlgeriaMap() {
  const [selected, setSelected] = useState(distributors[0]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
      <div className="lg:col-span-2">
        <Card className="shadow-lg w-full h-[600px] bg-secondary/30 p-4">
          <div className="relative w-full h-full">
            <svg
              viewBox="0 0 800 750"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <g fill="#D9D9D9" stroke="#4B4B4B" strokeWidth="1.5">
                <path d="M410.5 43.1L402.3 51.3L380.6 50.3L370.8 59.4L372.2 73L363.1 79.8L354.5 76.4L337.2 84.6L324 80.7L314.2 86L307.9 83.1L290.7 93.9L281 89.5L254.2 92.4L238.3 84.6L229.2 89.5L216.5 86L208.8 91.4L188.7 87L181.4 93.9L169.3 92.4L156.6 99.2L152.7 111.4L136.9 111.4L127.3 118.2L121 114.3L101.4 117.2L91.6 112.9L87.2 119.7L73.1 118.2L60.9 126.4L48.7 122L36 127.9L31.6 151.3L15.2 159.5L12.3 182.4L19.6 193.1L12.3 205.3L19.6 220.3L3.3 234.3L1.4 259.7L12.3 268.8L12.3 282L25.5 299L18.1 306.8L31.1 324.2L25.5 341.2L42.8 357.9L32.5 373.1L42.8 382.7L34.9 397.7L46.2 411.7L42.8 427.7L54.5 439.9L46.2 458.8L60.9 470.1L57.4 496.4L75.5 510.4L64.3 530.9L82.4 544L94.5 538.6L103.8 554.2L132.5 560.1L143.2 581.5L132.5 596.5L145.6 612L161.4 612L171.2 626.5L200.5 628L209.7 644.4L245.1 645.9L254.2 654.1L274.3 651.1L285.4 661.3L317.1 659.7L326.4 668.6L348.6 667.1L355.9 674L380.6 672L386.4 679.4L440.7 677.9L460.8 692.5L485.4 689.5L503.6 700.2L529.1 700.2L555.9 713.8L569.8 707.9L583.7 716.8L616.8 713.8L630.7 724.5L653.2 718.3L669.5 727.5L687.2 721.5L711.9 735.2L729.1 730.8L747.3 741.5L773.5 738.6L797.7 701.7L794.7 659.7L786.5 641.4L794.7 618.9L786.5 595L797.7 574.6L786.5 547L797.7 514.8L786.5 487.2L797.7 453L786.5 426.2L797.7 396.2L786.5 357.9L797.7 325.7L786.5 299L797.7 261.2L786.5 231.4L797.7 202.4L785 186.8L794.7 167.3L785 151.3L791.8 131.8L781.1 114.3L785 99.2L769.1 84.6L763.3 62.3L740.9 50.3L726.5 54.7L709.4 46L687.2 46L675.5 35L654.7 35L644.4 27.8L627.8 30.7L616.8 21.6L595.5 23.1L578.4 15.3L554.4 15.3L537.4 24.5L511.2 19.7L494 29.3L469.1 27.8L445.1 38L410.5 43.1Z"/>
              </g>
              {distributors.map((dist) => (
                <TooltipProvider key={dist.id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <g
                        onClick={() => setSelected(dist)}
                        className="cursor-pointer"
                        aria-label={dist.name}
                      >
                        <motion.circle
                          cx={dist.x}
                          cy={dist.y}
                          r="15"
                          className={cn("stroke-background", selected.id === dist.id ? "fill-accent stroke-2" : "fill-primary/50 stroke-1")}
                          initial={{ r: 0 }}
                          animate={{ r: 15 }}
                          transition={{ type: "spring", stiffness: 400, damping: 10, delay: Math.random() * 0.5 }}
                        />
                        <motion.circle
                          cx={dist.x}
                          cy={dist.y}
                          r="15"
                          className="fill-transparent stroke-accent"
                          initial={{ scale: 1, opacity: 1, r:15 }}
                          animate={selected.id === dist.id ? { scale: 2.5, opacity: 0 } : {}}
                          transition={selected.id === dist.id ? { duration: 1, repeat: Infinity, ease: "easeInOut" } : {}}
                        />
                      </g>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{dist.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </svg>
          </div>
        </Card>
      </div>

      <div className="lg:col-span-1">
        <Card className="shadow-lg h-full">
          <CardHeader>
            <CardTitle className="text-2xl text-primary font-bold">{selected.name}</CardTitle>
            <p className="text-muted-foreground">{selected.wilaya}</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-lg">{selected.wilaya}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-accent" />
                <span className="text-lg">{selected.contact}</span>
              </div>
            </div>
            <p className="mt-6 text-sm text-muted-foreground italic">
              Les informations de contact sont des données de test.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
