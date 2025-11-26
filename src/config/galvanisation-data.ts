
import { Factory, Thermometer, Shield, Layers, Wind, Droplets, PackageCheck, Atom, Construction, TowerControl, Car, Ship, HardHat, CircleDollarSign, Check, Beaker, SprayCan, Fan, Pipette, Ruler, ShieldCheck, Weight } from 'lucide-react';
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
  clock: ShieldCheck,
  coin: CircleDollarSign,
  Poutre: HardHat,
  Panneau: Layers,
  Pylône: TowerControl,
  Charpente: Construction,
  Navire: Ship,
  water: Droplets,
  acid: Beaker,
  ShieldCheck: ShieldCheck,
  Ruler: Ruler,
  Weight: Weight,
};

export const galvanisationContent = {
  "hero": {
    "title": "GALVANISATION A CHAUD",
    "subtitle": "Notre unité de galvanisation traite jusqu’à 25.000 tonnes/an, avec des bains de zinc de 12m x 1,5m x 3m, offrant une protection anticorrosion homogène, certifiée et durable.",
    "stats": [
      { "title": "Bains de traitement", "value": "13", "icon": "baths", "large": true },
      { "title": "Capacité annuelle", "value": "25.000 tonnes", "icon": "Weight" },
      { "title": "Température du bain", "value": "450 °C", "icon": "Thermometer" },
      { "title": "Durée de vie", "value": "> 50 ans", "icon": "ShieldCheck" },
      { "title": "Produits", "value": "Profils | Panneaux | Structures", "icon": "layers" }
    ],
    "image_url": images.galvanisation.hero.src,
    "blurDataUrl": images.galvanisation.hero.blurDataUrl,
    "cta_primary": "Demander un devis",
    "cta_secondary": "Télécharger la fiche technique"
  },
  "galvanisation_steps": [
    {
      "step": 1,
      "title": "DÉGRAISSAGE",
      "shortDesc": "Nettoyage alcalin à 60–80°C.",
      "longDesc": "Il a pour but d’enlever toutes les salissures et graisses qui empêcheraient la dissolution des oxydes de fer superficiels. Le dégraissage est effectué dans des bains contenant du carbonate de sodium ou de la soude avec addition de détergents et de tensioactifs à 60°C / 80°C. Parfois, des dégraissants acides peuvent être utilisés.",
      "icon": "cleaning",
      "meta": { "temperature": "60–80°C", "duration": "5–10 min" }
    },
    {
      "step": 2,
      "title": "RINÇAGE",
      "shortDesc": "Neutralisation des résidus alcalins.",
      "longDesc": "Un rinçage est effectué après le dégraissage afin de ne pas polluer les opérations suivantes.",
      "icon": "water",
      "meta": { "temperature": "Ambiante", "duration": "2–4 min" }
    },
    {
      "step": 3,
      "title": "DÉCAPAGE",
      "shortDesc": "Élimination des oxydes.",
      "longDesc": "Il a pour but d’enlever la calamine et les autres oxydes présents à la surface de l’acier. Le décapage est effectué dans une solution d’acide chlorhydrique dilué à température ambiante, additionné d’un inhibiteur qui permet d’éviter l’attaque de l’acier lorsqu’il est débarrassé de ses oxydes. Des solutions d’acide sulfurique sont parfois utilisées avec l’inconvénient d’une mise en œuvre à 70°C nécessitant un chauffage. Un décapage mécanique (grenaillage) peut parfois remplacer le décapage chimique, en particulier dans le cas de la fonte, afin d’éliminer la silice se trouvant en surface.",
      "icon": "acid",
      "meta": { "temperature": "Ambiante", "duration": "10–20 min" }
    },
    {
      "step": 4,
      "title": "RINÇAGE",
      "shortDesc": "Élimination sels et acides.",
      "longDesc": "Un rinçage est également effectué après le décapage afin de laver les pièces des sels de fer et des traces d’acide qui pollueraient l’opération suivante.",
      "icon": "water",
      "meta": { "temperature": "Ambiante", "duration": "2–4 min" }
    },
    {
      "step": 5,
      "title": "FLUXAGE",
      "shortDesc": "Prévenir l’oxydation.",
      "longDesc": "Il permet d’éviter que l’acier ne se ré-oxyde avant l’entrée dans le bain de zinc. La décomposition du flux permet également de favoriser la réaction métallurgique fer/zinc lors de l’immersion de la pièce dans le bain de zinc. Le fluxage est effectué par une solution aqueuse de chlorure de zinc et de chlorure d’ammonium.",
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
      "longDesc": "Les pièces sont ensuite immergées dans le bain de zinc fondu à 450°C. Les temps d’immersion varient suivant l’importance des charges, des dimensions et de l’épaisseur des pièces : de 3 à 4 minutes pour des pièces de forme simple, et de 10 à 15 minutes pour des ensembles massifs ou des corps creux de grandes dimensions.",
      "icon": "fire",
      "meta": { "temperature": "450°C", "duration": "3–15 min" }
    },
    {
      "step": 8,
      "title": "REFROIDISSEMENT & CONTRÔLE",
      "shortDesc": "Stabilisation + inspection.",
      "longDesc": "Refroidissement et contrôle : Les pièces galvanisées sont ensuite refroidies et contrôlées.",
      "icon": "check",
      "meta": { "temperature": "Refroidissement", "duration": "Variable" }
    }
  ],
  "benefits": [
    {
      "title": "Résistance à la corrosion",
      "text": "Bouclier contre humidité, intempéries et environnements agressifs.",
      "icon": "ShieldCheck"
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
    "icons": ["Poutre", "Panneau", "Pylône", "Charpente", "Navire"]
  },
  "cta": {
    "title": "Confiez votre projet de galvanisation à BordjSteel",
    "button_primary": "Demander un devis",
    "button_secondary": "Télécharger la fiche technique",
    "form_url": "/contact"
  }
};

    