
import { Factory, Thermometer, Shield, Layers, Wind, Droplets, PackageCheck, Atom, Construction, TowerControl, Car, Ship, HardHat, CircleDollarSign, Check, Beaker, SprayCan, Fan, Pipette, Ruler } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import images from '@/app/lib/placeholder-images.json';

// Using an object to map string names to actual Lucide components
export const iconMap: { [key: string]: LucideIcon } = {
  Factory,
  Thermometer,
  Shield,
  Layers,
  cleaning: SprayCan,
  chemical: Pipette,
  fire: Thermometer,
  snowflake: Fan,
  check: Check,
  clock: Shield,
  coin: CircleDollarSign,
  beam: HardHat,
  panel: Layers,
  pylon: TowerControl,
  truss: Construction,
  ship: Ship,
  water: Droplets,
  acid: Beaker,
  ShieldCheck: ShieldCheck,
  Ruler: Ruler
};

export const galvanisationContent = {
  "hero": {
    "title": "GALVANISATION A CHAUD",
    "subtitle": "Notre unité de galvanisation traite jusqu’à 25.000 tonnes/an, avec des bains de zinc de 12m x 1,5m x 3m, offrant une protection anticorrosion homogène, certifiée et durable.",
    "stats": [
      { "title": "Bains de traitement", "value": "13", "icon": "baths", "large": true },
      { "title": "Capacité annuelle", "value": "25.000 tonnes", "icon": "factory" },
      { "title": "Température du bain", "value": "450 °C", "icon": "thermometer" },
      { "title": "Durée de vie", "value": "> 50 ans", "icon": "shield" },
      { "title": "Produits", "value": "Profils | Panneaux | Structures", "icon": "layers" }
    ],
    "image_url": images.galvanisation.hero.src,
    "blurDataUrl": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nAFoAJf/AXV1df+vr6//i4uL/83NzeUAcnJy/3l5ef+3t7f/goKC/wB6enr/ioqK/9bW1v84ODj/PPO09K2pZSsAAAAASUVORK5CYII=",
    "cta_primary": "Demander un devis",
    "cta_secondary": "Télécharger la fiche technique"
  },
  "galvanisation_steps": [
    {
      "step": 1,
      "title": "DÉGRAISSAGE",
      "shortDesc": "Nettoyage alcalin à 60–80°C.",
      "longDesc": "Élimination des huiles et graisses en bains alcalins chauffés, garantissant une surface propre pour le décapage.",
      "icon": "cleaning",
      "meta": { "temperature": "60–80°C", "duration": "5–10 min" }
    },
    {
      "step": 2,
      "title": "RINÇAGE",
      "shortDesc": "Neutralisation des résidus alcalins.",
      "longDesc": "Rinçage intensif à l’eau claire, parfois en cascade, pour neutraliser et purifier l’acier avant le décapage.",
      "icon": "water",
      "meta": { "temperature": "Ambiante", "duration": "2–4 min" }
    },
    {
      "step": 3,
      "title": "DÉCAPAGE",
      "shortDesc": "Élimination des oxydes.",
      "longDesc": "Immersion en bain d’acide chlorhydrique enrichi en inhibiteurs. Surface brillante et chimiquement active.",
      "icon": "acid",
      "meta": { "temperature": "Ambiante", "duration": "10–20 min" }
    },
    {
      "step": 4,
      "title": "RINÇAGE",
      "shortDesc": "Élimination sels et acides.",
      "longDesc": "Rinçage en cascade pour éliminer sels de fer et acides résiduels qui pourraient polluer le fluxage.",
      "icon": "water",
      "meta": { "temperature": "Ambiante", "duration": "2–4 min" }
    },
    {
      "step": 5,
      "title": "FLUXAGE",
      "shortDesc": "Prévenir l’oxydation.",
      "longDesc": "Bain aqueux de chlorure de zinc et ammonium formant une pellicule protectrice. Active la réaction Fe/Zn.",
      "icon": "chemical",
      "meta": { "temperature": "60-70°C", "duration": "3–5 min" }
    },
    {
      "step": 6,
      "title": "SÉCHAGE",
      "shortDesc": "Étuve chauffée.",
      "longDesc": "Étuvage à température contrôlée pour éviter toute projection de zinc liquide à l’immersion.",
      "icon": "snowflake",
      "meta": { "temperature": "~100°C", "duration": "10–15 min" }
    },
    {
      "step": 7,
      "title": "GALVANISATION",
      "shortDesc": "Immersion dans zinc fondu à 450°C.",
      "longDesc": "Immersion contrôlée du métal dans le bain de zinc fondu. Formation de couches d’alliages Zn-Fe.",
      "icon": "fire",
      "meta": { "temperature": "450°C", "duration": "3–15 min" }
    },
    {
      "step": 8,
      "title": "REFROIDISSEMENT & CONTRÔLE",
      "shortDesc": "Stabilisation + inspection.",
      "longDesc": "Refroidissement à l’air ou eau. Contrôle visuel, mesure d’épaisseur (50–200 µm), et tests d’adhérence.",
      "icon": "check",
      "meta": { "temperature": "Refroidissement", "duration": "Variable" }
    }
  ],
  "benefits": [
    {
      "title": "Résistance à la corrosion",
      "text": "Bouclier contre humidité, intempéries et environnements agressifs.",
      "icon": "shield"
    },
    {
      "title": "Durabilité exceptionnelle",
      "text": "Une protection qui dure plusieurs décennies sans entretien coûteux.",
      "icon": "clock"
    },
    {
      "title": "Rentabilité",
      "text": "Réduction des coûts de maintenance, repeinte ou remplacement.",
      "icon": "coin"
    }
  ],
  "highlight": {
    "title": "Applicable à tous types de produits en acier",
    "text": "Des poutrelles industrielles aux structures légères, en passant par les panneaux et pylônes — notre unité s’adapte à vos projets.",
    "icons": ["beam", "panel", "pylon", "truss", "ship"]
  },
  "cta": {
    "title": "Confiez votre projet de galvanisation à BordjSteel",
    "button_primary": "Demander un devis",
    "button_secondary": "Télécharger la fiche technique",
    "form_url": "/contact"
  }
};

    