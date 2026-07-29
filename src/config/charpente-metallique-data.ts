
import images from '@/app/lib/placeholder-images.json';

export const charpenteMetalliqueData = {
  hero: {
    title: 'Charpente Métallique',
    subtitle: "Solutions d'ingénierie robustes pour les projets les plus ambitieux. Nous concevons, fabriquons et montons des structures en acier pour tous types de bâtiments.",
    stats: [
      { title: 'Capacité de production', value: 25000, unit: ' T/an', icon: 'HardHat' },
      { title: 'Capacité de PRS', value: 3000, unit: ' T/an', icon: 'Cog' },
      { title: "Surface de l'unité", value: 10000, unit: ' m²', icon: 'Layers' },
    ],
    image_url: images['charpente-metallique'].main.src,
    alt: images['charpente-metallique'].main.alt,
    aiHint: images['charpente-metallique'].main.aiHint,
    blurDataUrl: images['charpente-metallique'].main.blurDataUrl,
    cta_primary: 'Demander un devis',
    cta_secondary: 'Télécharger la brochure',
  },
  pillars: [
    {
      id: 'prs',
      iconName: 'HardHat',
      title: "PRS – Profils Reconstitués Soudés",
      description: "Fabrication sur mesure pour bâtiments industriels, ponts et charpentes lourdes.",
      galleryImages: [
        "/media/f80539082e4b8be52b8e586116b3-58a4871b.webp",
        "/media/charpente-85d5dfe8.webp",
        "/media/projet-charpente-3ecb0dcb.webp"
      ],
      specifications: {
        mainDescription: "Notre complexe Bordj Steel est apte à fabriquer ce type de profilé (PRS) selon la demande du client, en respectant les normes en vigueur. Nous pouvons vous accompagner durant toutes les phases de réalisation du projet (étude, fabrication et montage). Notre ligne PRS permet la production en série de poutres en PRS en I ou en caissons.",
        details: [
          { label: "Notre plage de fabrication est de", value: "<strong class='text-accent font-bold'>350mm</strong> à <strong class='text-accent font-bold'>2000mm</strong> de largeur et de maximum <strong class='text-accent font-bold'>16 000mm</strong> de longueur" },
          { label: "La portée", value: "selon la demande du client" }
        ],
        applications: [
          'Bâtiments industriels de grande portée',
          'Entrepôts logistiques',
          'Ponts et ouvrages d\'art',
          'Structures pour charges lourdes (ponts roulants)',
        ],
      }
    },
    {
      id: 'supports',
      iconName: 'TowerControl',
      title: "Supports de Transport d'Énergie",
      description: "Structures pour l’énergie, la communication et l’affichage.",
      galleryImages: [
        "/media/support-electrique-767b0e78.webp",
        "/media/support-electrique-2-1dd1e149.webp",
      ],
      specifications: {
        mainDescription: "Une ligne dédiée à la fabrication de candélabres et supports.",
        supportLines: [
          {
            title: "Candélabres et supports",
            items: [
              "Candélabres et supports d’éclairage public de différentes dimensions",
              "Supports tubulaires de transport d’électricité",
              "Mâts de grande hauteur selon la demande du client",
              "Mâts et supports de télésurveillance"
            ],
            capacity: "100T /mois"
          },
          {
            title: "Support BS",
            items: [
              "Support BSG –MT&BT pour le transport de l’électricité",
              "Accessoires pour candélabres et mats"
            ],
            capacity: "350 T /mois"
          }
        ],
        notes: [
          "Produits homologués par <span class='font-bold text-accent'>SONELGAZ</span>",
          "Galvanisé au sein de notre complexe selon la norme <span class='font-bold text-accent'>NF EN ISO 1461</span>",
          "L’homologation <span class='font-bold text-accent'>SONELGAZ</span> dont nous nous sommes dotés nous permet de proposer à nos clients des supports tubulaires de type <span class='font-bold text-accent'>9T</span> et en barres soudées de type <span class='font-bold text-accent'>BS</span> pour le transport d’électricité à basse et à moyenne tension."
        ],
        additionalImages: [
          { src: "/media/support-electrique-767b0e78.webp", alt: "Support électrique 1", aiHint: "electrical support" },
          { src: "/media/support-electrique-2-1dd1e149.webp", alt: "Support électrique 2", aiHint: "power line support" },
        ]
      }
    },
    {
      id: 'ponts-roulants',
      iconName: 'Tractor',
      title: "Pont Roulant – Mono et Bipoutre",
      description: "Solutions de manutention lourde avec options mono-poutre et bi-poutre.",
      galleryImages: [
        "/media/pont-rouklant-jaune-37f1823a.webp",
        "/media/pont-roulant-jaune-e49c7ced.webp",
      ],
      specifications: {
        mainDescription: "Nous concevons et fabriquons les structures métalliques complètes pour les ponts roulants, un équipement essentiel pour la manutention dans les usines, les entrepôts et les ateliers. Nos solutions sont adaptées pour des configurations monopoutre (plus légères) et bipoutre (pour charges très lourdes et grandes portées).",
        applications: [
          'Ateliers de production et d\'assemblage',
          'Aciéries et métallurgie',
          'Entrepôts de stockage lourd',
          'Zones de maintenance et de réparation',
        ],
        technicalTable: {
          title: "Spécifications Techniques Ponts Roulants",
          headers: ["Caractéristique", "Valeur"],
          rows: [
            { "Caractéristique": "Capacité de levage", "Valeur": "De 1 tonne à plus de 100 tonnes" },
            { "Caractéristique": "Portée", "Valeur": "Jusqu'à 40 mètres" },
            { "Caractéristique": "Type de poutre", "Valeur": "Profilé standard (IPE, HEA) ou PRS" },
            { "Caractéristique": "Chemin de roulement", "Valeur": "Fabrication et alignement de précision" },
            { "Caractéristique": "Conformité", "Valeur": "FEM (Fédération Européenne de la Manutention)" },
          ],
        },
        additionalImages: [
          { src: "/media/pont-rouklant-jaune-37f1823a.webp", alt: "Pont roulant jaune vue 1", aiHint: "overhead crane" },
          { src: "/media/pont-roulant-jaune-e49c7ced.webp", alt: "Pont roulant jaune vue 2", aiHint: "industrial crane" },
        ]
      }
    },
    {
      id: 'automobile',
      iconName: 'Car',
      title: "Ligne de Fabrication Automobile",
      description: "Ligne complète pour la transformation métallique automobile de haute précision.",
      galleryImages: [
        "/media/carroserie-8aea5d0d.webp",
      ],
      specifications: {
        mainDescription: "Notre complexe est agréé par le ministère de l’Énergie et des Mines pour fabriquer :",
        applications: [
          'Carrossage des véhicules complets',
          'Véhicules à châssis nu et véhicules à châssis cabines',
          'Aménagements notables',
        ],
        notes: [
          "<span class='font-bold text-accent'>Ligne de fabrication Carrosserie automobile</span>"
        ],
        additionalImages: [
            { src: "/media/carroserie-8aea5d0d.webp", alt: "Carrosserie automobile", aiHint: "car body" },
        ]
      }
    }
  ]
};

// ---------------------------------------------------------------------------
// Editorial + gallery content for the Charpente Métallique page, extracted
// verbatim from the page component. Icons are resolved by name in the component.
// ---------------------------------------------------------------------------

// "Nos Projets" gallery — expanding image strip.
export const charpenteGalleryImages: string[] = [
  "/media/ec93b8a90b0c088c23cdf817613d-9a4ab477.webp",
  "/media/349ac528cf2b299e8e9d38dcf88e-7bd5bf8f.webp",
  "/media/5f006fef04a5f7af462ba580abbb-51bd8e30.webp",
  "/media/7adaff64dfee8fb4467082a0a5da-26e3c51d.webp",
  "/media/5307e6787500b6efff734990a417-37a72221.webp",
  "/media/db65cdc8fcf0205a18de1498e1a9-32412004.webp",
];

// Domaines d'Application — icon resolved by name in the component.
export const charpenteApplications: { iconName: string; text: string }[] = [
  { iconName: 'Building', text: "Bâtiments industriels & commerciaux" },
  { iconName: 'Factory', text: "Hangars de stockage & agricoles" },
  { iconName: 'Tractor', text: "Infrastructures logistiques" },
  { iconName: 'HardHat', text: "Projets sur mesure" },
];

// "Pourquoi Nous Choisir?" — icon resolved by name in the component.
export const charpenteWhyChooseUs: { iconName: string; title: string; description: string }[] = [
  {
    iconName: 'Award',
    title: "Standards & Certifications",
    description: "Nous respectons les normes internationales les plus strictes (ISO, EN) pour garantir la qualité et la sécurité de chaque structure.",
  },
  {
    iconName: 'Zap',
    title: "Capacités de Production",
    description: "Avec des machines CNC de pointe et des soudeuses automatiques, nous avons une capacité de production massive pour les projets de toute envergure.",
  },
  {
    iconName: 'ShieldCheck',
    title: "Expertise & Innovation",
    description: "Notre bureau d'études et nos équipes s'appuient sur une riche expérience et des références solides pour innover et relever les défis complexes.",
  },
];
