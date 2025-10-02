
import { Factory, Thermometer, Shield, Layers, Wind, Droplets, PackageCheck, Atom, Construction, TowerControl, Car, Ship, HardHat, CircleDollarSign } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import images from '@/app/lib/placeholder-images.json';

// Using an object to map string names to actual Lucide components
export const iconMap: { [key: string]: LucideIcon } = {
  factory: Factory,
  thermometer: Thermometer,
  shield: Shield,
  layers: Layers,
  cleaning: Droplets,
  chemical: Atom,
  fire: Thermometer, // Representing heat
  snowflake: Wind, // Representing cooling
  check: PackageCheck,
  clock: Shield, // Representing durability
  coin: CircleDollarSign, // More appropriate for rentability
  beam: HardHat,
  panel: Layers,
  pylon: TowerControl,
  truss: Construction,
  ship: Ship,
};

export const galvanisationContent = {
  "hero": {
    "title": "Protégez l’acier pour des décennies grâce à la galvanisation à chaud",
    "subtitle": "Notre unité de galvanisation traite jusqu’à 25.000 tonnes/an, avec des bains de zinc de 12m x 1,5m x 3m, offrant une protection anticorrosion homogène, certifiée et durable.",
    "stats": [
      { "title": "Capacité annuelle", "value": "25.000 tonnes", "icon": "factory" },
      { "title": "Température du bain", "value": "450 °C", "icon": "thermometer" },
      { "title": "Durée de vie", "value": "> 50 ans", "icon": "shield" },
      { "title": "Produits", "value": "Profils | Panneaux | Structures", "icon": "layers" }
    ],
    "image_url": images.galvanisation.hero.src,
    "cta_primary": "Demander un devis",
    "cta_secondary": "Télécharger la fiche technique"
  },
  "galvanisation_steps": [
    {
      "step": 1,
      "title": "Préparation de surface",
      "process": "Dégraissage → décapage acide → rinçage",
      "description": "On élimine toutes les impuretés et oxydes pour garantir une parfaite adhérence du zinc.",
      "icon": "cleaning"
    },
    {
      "step": 2,
      "title": "Fluxage",
      "process": "Application d’un flux de chlorure de zinc et d’ammonium",
      "description": "Le flux évite l’oxydation avant immersion et prépare la surface à la liaison métal-métal.",
      "icon": "chemical"
    },
    {
      "step": 3,
      "title": "Immersion dans le bain de zinc",
      "process": "450 °C | réaction Zn-Fe",
      "description": "Le métal est plongé dans un bain de zinc fondu, formant une couche d’alliage zinc-fer ultra résistante.",
      "icon": "fire"
    },
    {
      "step": 4,
      "title": "Refroidissement & Solidification",
      "process": "",
      "description": "En sortant du bain, le revêtement se solidifie. L’acier est prêt, protégé pour des décennies.",
      "icon": "snowflake"
    },
    {
      "step": 5,
      "title": "Contrôle & Finition",
      "process": "",
      "description": "Inspection visuelle, mesure d’épaisseur, certification qualité BordjSteel.",
      "icon": "check"
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
    "form_url": "https://bordjsteel.com/contact"
  }
};
