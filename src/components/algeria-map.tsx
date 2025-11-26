
"use client";

import React, { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from 'react-simple-maps';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from 'framer-motion';
import { AnimatedWrapper } from './animated-wrapper';
import geoUrl from "@/lib/algeria-wilayas.json";

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

export function AlgeriaMap() {
  const [tooltipContent, setTooltipContent] = useState("");

  return (
    <AnimatedWrapper animation="zoom-in" staggerIndex={1}>
        <div className="border-4 border-secondary rounded-lg shadow-lg overflow-hidden">
            <TooltipProvider>
                <ComposableMap
                    projection="geoMercator"
                    projectionConfig={{
                        rotate: [-3.0, -28.0, 0],
                        scale: 2200,
                    }}
                    style={{ width: '100%', height: 'auto' }}
                >
                    <ZoomableGroup center={[4, 33]} zoom={1}>
                        <Geographies geography={geoUrl}>
                            {({ geographies }) =>
                                geographies.map((geo) => {
                                    const isHighlighted = highlightedWilayas.includes(geo.properties.name);
                                    return (
                                        <Tooltip key={geo.rsmKey}>
                                            <TooltipTrigger asChild>
                                                <motion.g
                                                    onMouseEnter={() => {
                                                        const { name } = geo.properties;
                                                        setTooltipContent(`${name}`);
                                                    }}
                                                    onMouseLeave={() => {
                                                        setTooltipContent("");
                                                    }}
                                                >
                                                    <Geography
                                                        geography={geo}
                                                        style={{
                                                            default: {
                                                                fill: isHighlighted ? "hsl(var(--accent))" : "hsl(var(--primary))",
                                                                stroke: "hsl(var(--background))",
                                                                strokeWidth: 0.5,
                                                                outline: 'none',
                                                            },
                                                            hover: {
                                                                fill: "hsl(var(--accent-hover))",
                                                                stroke: "hsl(var(--background))",
                                                                strokeWidth: 1,
                                                                outline: 'none',
                                                            },
                                                            pressed: {
                                                                fill: "hsl(var(--accent-hover))",
                                                                stroke: "hsl(var(--background))",
                                                                strokeWidth: 1,
                                                                outline: 'none',
                                                            },
                                                        }}
                                                    />
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
  );
}
