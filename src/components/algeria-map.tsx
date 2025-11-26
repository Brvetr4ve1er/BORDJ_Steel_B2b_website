"use client";

import React, { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { AnimatedWrapper } from './animated-wrapper';

declare global {
  interface Window {
    simplemaps_countrymap_mapdata: any;
    simplemaps_countrymap: any;
  }
}

export function AlgeriaMap() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Define map data
    window.simplemaps_countrymap_mapdata = {
      main_settings: {
        width: "responsive",
        background_color: "#FFFFFF",
        background_transparent: "yes",
        border_color: "#ffffff",
        state_description: "State description",
        state_color: "#4B4B4B", // Dark grey for default
        state_hover_color: "hsl(var(--accent-hover))",
        state_url: "",
        border_size: 1.5,
        all_states_inactive: "no",
        all_states_zoomable: "yes",
        location_description: "Location description",
        location_url: "",
        location_color: "#FF0067",
        location_opacity: 0.8,
        location_hover_opacity: 1,
        location_size: 25,
        location_type: "square",
        location_image_source: "frog.png",
        location_border_color: "#FFFFFF",
        location_border: 2,
        location_hover_border: 2.5,
        all_locations_inactive: "no",
        all_locations_hidden: "no",
        label_color: "#ffffff",
        label_hover_color: "#ffffff",
        label_size: 16,
        label_font: "Arial",
        label_display: "auto",
        label_scale: "yes",
        hide_labels: "no",
        hide_eastern_labels: "no",
        zoom: "yes",
        manual_zoom: "yes",
        back_image: "no",
        initial_back: "no",
        initial_zoom: "-1",
        initial_zoom_solo: "no",
        region_opacity: 1,
        region_hover_opacity: 0.6,
        zoom_out_incrementally: "yes",
        zoom_percentage: 0.99,
        zoom_time: 0.5,
        popup_color: "white",
        popup_opacity: 0.9,
        popup_shadow: 1,
        popup_corners: 5,
        popup_font: "12px/1.5 Verdana, Arial, Helvetica, sans-serif",
        popup_nocss: "no",
        div: "map",
        auto_load: "yes",
        url_new_tab: "no",
        images_directory: "default",
        fade_time: 0.1,
        link_text: "View Website",
        popups: "detect",
        state_image_url: "",
        state_image_position: "",
        location_image_url: ""
      },
      state_specific: {
        DZ01: { name: "Adrar" },
        DZ02: { name: "Chlef" },
        DZ03: { name: "Laghouat", color: "hsl(var(--accent))", hover_color: "hsl(var(--accent-hover))" },
        DZ04: { name: "Oum El Bouaghi" },
        DZ05: { name: "Batna" },
        DZ06: { name: "Bejaia", color: "hsl(var(--accent))", hover_color: "hsl(var(--accent-hover))" },
        DZ07: { name: "Biskra" },
        DZ08: { name: "Bechar" },
        DZ09: { name: "Blida" },
        DZ10: { name: "Bouira", color: "hsl(var(--accent))", hover_color: "hsl(var(--accent-hover))" },
        DZ11: { name: "Tamanrasset" },
        DZ12: { name: "Tebessa" },
        DZ13: { name: "Tlemcen" },
        DZ14: { name: "Tiaret", color: "hsl(var(--accent))", hover_color: "hsl(var(--accent-hover))" },
        DZ15: { name: "Tizi Ouzou", color: "hsl(var(--accent))", hover_color: "hsl(var(--accent-hover))" },
        DZ16: { name: "Alger" },
        DZ17: { name: "Djelfa" },
        DZ18: { name: "Jijel" },
        DZ19: { name: "Setif" },
        DZ20: { name: "Saida" },
        DZ21: { name: "Skikda" },
        DZ22: { name: "Sidi Bel Abbes" },
        DZ23: { name: "Annaba" },
        DZ24: { name: "Guelma" },
        DZ25: { name: "Constantine" },
        DZ26: { name: "Medea", color: "hsl(var(--accent))", hover_color: "hsl(var(--accent-hover))" },
        DZ27: { name: "Mostaganem" },
        DZ28: { name: "M'Sila" },
        DZ29: { name: "Mascara", color: "hsl(var(--accent))", hover_color: "hsl(var(--accent-hover))" },
        DZ30: { name: "Ouargla" },
        DZ31: { name: "Oran", color: "hsl(var(--accent))", hover_color: "hsl(var(--accent-hover))" },
        DZ32: { name: "El Bayadh" },
        DZ33: { name: "Illizi" },
        DZ34: { name: "Bordj Bou Arreridj", color: "hsl(var(--accent))", hover_color: "hsl(var(--accent-hover))" },
        DZ35: { name: "Boumerdes" },
        DZ36: { name: "El-Tarf" },
        DZ37: { name: "Tindouf" },
        DZ38: { name: "Tissemsilt", color: "hsl(var(--accent))", hover_color: "hsl(var(--accent-hover))" },
        DZ39: { name: "El Oued" },
        DZ40: { name: "Khenchela" },
        DZ41: { name: "Souk-Ahras" },
        DZ42: { name: "Tipaza" },
        DZ43: { name: "Mila" },
        DZ44: { name: "Ain-Defla" },
        DZ45: { name: "Naama" },
        DZ46: { name: "Ain-Temouchent" },
        DZ47: { name: "Ghardaia" },
        DZ48: { name: "Relizane" },
        DZ49: { name: "El M'Ghair" },
        DZ50: { name: "El Menia" },
        DZ51: { name: "Ouled Djellal" },
        DZ52: { name: "Bordj Baji Mokhtar" },
        DZ53: { name: "Béni Abbès" },
        DZ54: { name: "Timimoun" },
        DZ55: { name: "Touggourt" },
        DZ56: { name: "Djanet" },
        DZ57: { name: "In Salah" },
        DZ58: { name: "In Guezzam" }
      },
      locations: {
        "0": { name: "Algiers", lat: "36.763056", lng: "3.050556" }
      },
      labels: {},
      legend: { entries: [] },
      regions: {}
    };

    const script = document.createElement('script');
    script.src = '/countrymap.js';
    script.async = true;
    
    script.onload = () => {
      if (window.simplemaps_countrymap) {
        window.simplemaps_countrymap.load();
      }
    };
    
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <AnimatedWrapper animation="zoom-in" staggerIndex={1}>
        <div id="map" ref={mapRef} style={{ width: '100%', height: '600px' }}></div>
    </AnimatedWrapper>
  );
}