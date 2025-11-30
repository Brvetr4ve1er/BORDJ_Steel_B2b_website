
"use client";

import React, { useState, useMemo } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedWrapper } from './animated-wrapper';
import algeriaGeoJson from "@/lib/algeria-wilayas.json";
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { MapPin, Phone } from 'lucide-react';

const highlightedWilayas = [
  "Laghouat",
  "Béjaïa",
  "Bouira",
  "Tiaret",
  "Tizi Ouzou",
  "Médéa",
  "Mascara",
  "Oran",
  "Bordj Bou Arréridj",
  "Tissemsilt",
  "Sétif",
  "Alger",
  "Constantine",
  "Annaba",
  "Skikda"
];

const distributorData: { [key: string]: { name: string; address: string; phone: string; } } = {
  "Oran": { name: "Distributeur Ouest", address: "123 Rue de la Liberté, Oran", phone: "+213 41 00 00 01" },
  "Alger": { name: "Distributeur Centre", address: "456 Av. de l'Indépendance, Alger", phone: "+213 21 00 00 02" },
  "Constantine": { name: "Distributeur Est", address: "789 Bd. des Ponts, Constantine", phone: "+213 31 00 00 03" },
  "Bordj Bou Arréridj": { name: "Siège Social & Usine", address: "N°1 lieu-dit Mechta Fatima, BBA", phone: "+213 35 00 00 04" },
};

export function AlgeriaMap() {
  const [tooltipContent, setTooltipContent] = useState("");
  const [selectedWilaya, setSelectedWilaya] = useState(distributorData["Bordj Bou Arréridj"]);

  const handleWilayaClick = (geo: any) => {
    const { name } = geo.properties;
    if (distributorData[name]) {
      setSelectedWilaya(distributorData[name]);
    } else {
      setSelectedWilaya({ name: name, address: "Aucun distributeur officiel dans cette zone.", phone: "" });
    }
  };

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <AnimatedWrapper animation="zoom-in" className="lg:col-span-7">
          <div className="border-4 border-secondary rounded-lg shadow-lg overflow-hidden bg-primary/5">
              <TooltipProvider>
                  <ComposableMap
                      projection="geoMercator"
                      projectionConfig={{
                          rotate: [-8.0, -28.0, 0],
                          scale: 2800,
                          center: [2.5, 30]
                      }}
                      style={{ width: '100%', height: 'auto' }}
                  >
                      <ZoomableGroup center={[3, 33]} zoom={1.2}>
                          <Geographies geography={algeriaGeoJson}>
                              {({ geographies }) =>
                                  geographies.map((geo) => {
                                      const isHighlighted = highlightedWilayas.includes(geo.properties.name);
                                      const hasDistributor = !!distributorData[geo.properties.name];
                                      return (
                                          <Tooltip key={geo.rsmKey}>
                                              <TooltipTrigger asChild>
                                                  <motion.g
                                                      onMouseEnter={() => setTooltipContent(geo.properties.name)}
                                                      onMouseLeave={() => setTooltipContent("")}
                                                      onClick={() => handleWilayaClick(geo)}
                                                  >
                                                      <Geography
                                                          geography={geo}
                                                          style={{
                                                              default: {
                                                                  fill: isHighlighted ? "hsl(var(--accent))" : "hsl(var(--primary))",
                                                                  stroke: "hsl(var(--background))",
                                                                  strokeWidth: 0.75,
                                                                  outline: 'none',
                                                                  cursor: 'pointer'
                                                              },
                                                              hover: {
                                                                  fill: "hsl(var(--accent-hover))",
                                                                  stroke: "hsl(var(--background))",
                                                                  strokeWidth: 1,
                                                                  outline: 'none',
                                                              },
                                                              pressed: {
                                                                  fill: "hsl(var(--accent-hover))",
                                                                  outline: 'none',
                                                              },
                                                          }}
                                                      />
                                                      {hasDistributor && (
                                                        <circle
                                                            cx={geo.properties.lon}
                                                            cy={geo.properties.lat}
                                                            r={0.1}
                                                            fill="white"
                                                            stroke="hsl(var(--accent))"
                                                            strokeWidth={0.1}
                                                        />
                                                      )}
                                                  </motion.g>
                                              </TooltipTrigger>
                                              {tooltipContent === geo.properties.name && (
                                                  <TooltipContent>
                                                      <p>{tooltipContent}</p>
                                                  </TooltipContent>
                                              )}
                                          </Tooltip>
                                      );
                                  })
                              }
                          </Geographies>
                      </ZoomableGroup>
                  </ComposableMap>
              </TooltipProvider>
          </div>
      </AnimatedWrapper>
       <AnimatedWrapper animation="fade-in" staggerIndex={1} className="lg:col-span-5">
        <Card className="h-full shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-accent">Point de Vente</CardTitle>
          </CardHeader>
          <CardContent>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedWilaya.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-xl font-bold text-primary">{selectedWilaya.name}</h3>
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-1" />
                  <p className="text-muted-foreground">{selectedWilaya.address}</p>
                </div>
                {selectedWilaya.phone && (
                  <div className="flex items-start gap-4">
                    <Phone className="h-5 w-5 text-muted-foreground mt-1" />
                    <p className="text-muted-foreground">{selectedWilaya.phone}</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>
      </AnimatedWrapper>
    </div>
  );
}
