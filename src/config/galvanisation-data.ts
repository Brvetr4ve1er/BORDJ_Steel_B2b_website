
import { Factory, Thermometer, Shield, Layers, Wind, Droplets, PackageCheck, Atom, Construction, TowerControl, Car, Ship, HardHat, CircleDollarSign, Check, Beaker, Spray, Fan, Pipette } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import images from '@/app/lib/placeholder-images.json';

// Using an object to map string names to actual Lucide components
export const iconMap: { [key: string]: LucideIcon } = {
  factory: Factory,
  thermometer: Thermometer,
  shield: Shield,
  layers: Layers,
  cleaning: Spray,
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
  acid: Beaker
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
      "title": "Dégraissage – La première purification",
      "goal": "But : Éliminer graisses, huiles, poussières.",
      "process": "Procédé : Bains alcalins chauffés (60–80°C), composés de carbonate de sodium ou soude.",
      "result": "Surface parfaitement propre, prête à réagir chimiquement.",
      "icon": "cleaning"
    },
    {
      "step": 2,
      "title": "Rinçage – Neutralisation",
      "goal": "But : Éliminer tout résidu alcalin.",
      "process": "Procédé : Rinçage intensif à l’eau claire, souvent en cascade pour garantir zéro trace.",
      "result": "Surface chimiquement neutre, sans risque de réaction parasite.",
      "icon": "water"
    },
     {
      "step": 3,
      "title": "Décapage – L’acier mis à nu",
      "goal": "But : Supprimer oxydes et calamine.",
      "process": "Procédé : Immersion dans acide chlorhydrique (HCl) à température ambiante, inhibé pour protéger l’acier.",
      "result": "Acier parfaitement nu, surface active chimiquement.",
      "icon": "acid"
    },
    {
      "step": 4,
      "title": "Rinçage – Pureté avant activation",
      "goal": "But : Éliminer sels de fer et acides résiduels.",
      "process": "Procédé : Rinçage intensif en cascade pour éviter la pollution du fluxage.",
      "result": "Surface prête pour le fluxage.",
      "icon": "water"
    },
    {
      "step": 5,
      "title": "Fluxage – Le bouclier invisible",
      "goal": "But : Prévenir oxydation avant immersion et activer la réaction Fe/Zn.",
      "process": "Procédé : Bain aqueux de chlorure de zinc (ZnCl₂) + chlorure d’ammonium (NH₄Cl).",
      "result": "Acier protégé, surface réactive prête pour la métallurgie du zinc.",
      "icon": "chemical"
    },
     {
      "step": 6,
      "title": "Séchage – La préparation thermique",
      "goal": "But : Empêcher projections de zinc fondu.",
      "process": "Procédé : Étuvage en four à température contrôlée (~100°C) pour éliminer toute humidité.",
      "result": "Surface sèche, température équilibrée.",
      "icon": "snowflake"
    },
    {
      "step": 7,
      "title": "Galvanisation – L’alliance métallurgique",
      "goal": "But : Former un revêtement métallurgiquement lié.",
      "process": "Procédé : Immersion dans zinc fondu à 450°C, créant des couches d'alliages Fe-Zn.",
      "result": "Revêtement continu, imperméable, ultra-résistant.",
      "icon": "fire"
    },
    {
      "step": 8,
      "title": "Refroidissement & Contrôle – La validation finale",
      "goal": "But : Stabiliser le revêtement et garantir sa qualité.",
      "process": "Procédé : Refroidissement air/eau puis inspection complète (épaisseur, adhérence, dureté).",
      "result": "Pièces conformes, prêtes à durer 30–50 ans en service.",
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
    "form_url": "/contact"
  }
};
