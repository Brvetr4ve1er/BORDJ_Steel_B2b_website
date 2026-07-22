
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
        "https://i.pinimg.com/736x/f8/05/39/f80539082e4b8be52b8e586116b367ca.jpg",
        "https://i.ibb.co/NP2NZtW/charpente.jpg",
        "https://i.ibb.co/dJWKv6rp/projet-charpente.jpg"
      ],
      specifications: {
        mainDescription: "Notre complexe Bordj Steel est apte a fabriqué ce type de profilé ( P.R.S ) selon la demande du client et en respectent les normes en vigueurs. Nous pouvons vous accompagné durant toutes les phases de réalisation du projet (Etude, fabrication et Montage) Notre ligne PRS permet la production massive de poutres en PRS de forme L ou en caissons.",
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
        "https://i.ibb.co/tMvKpnJc/support-electrique.jpg",
        "https://i.ibb.co/SDk15wLd/support-electrique-2.jpg",
      ],
      specifications: {
        mainDescription: "Une ligne dédiée à la fabrication de candélabres et supports.",
        supportLines: [
          {
            title: "Candélabres et supports",
            items: [
              "Candélabres et support d’éclairage public de différentes dimensions",
              "Support tubulaires de transport d’électricité",
              "Mats de grandes hauteurs selon la demande du client",
              "Mats et support télésurveillance"
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
          "Produits homologuées par <span class='font-bold text-accent'>SONALGAZ</span>",
          "Galvanisé au sein de notre complexe selon la norme <span class='font-bold text-accent'>en 1461</span>",
          "L’homologation <span class='font-bold text-accent'>SONELGAZ</span> dont nous nous sommes dotés nous permet de proposer à nos clients des supports tubulaires de type <span class='font-bold text-accent'>9T</span> et en barres soudées de type <span class='font-bold text-accent'>BS</span> pour le transport d’électricité à basse et à moyenne tension."
        ],
        additionalImages: [
          { src: "https://i.ibb.co/tMvKpnJc/support-electrique.jpg", alt: "Support électrique 1", aiHint: "electrical support" },
          { src: "https://i.ibb.co/SDk15wLd/support-electrique-2.jpg", alt: "Support électrique 2", aiHint: "power line support" },
        ]
      }
    },
    {
      id: 'ponts-roulants',
      iconName: 'Tractor',
      title: "Pont Roulant – Mono et Bipoutre",
      description: "Solutions de manutention lourde avec options mono-poutre et bi-poutre.",
      galleryImages: [
        "https://i.ibb.co/S4x6CVKH/pont-rouklant-jaune.jpg",
        "https://i.ibb.co/8QQNyHZ/pont-roulant-jaune.jpg",
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
          { src: "https://i.ibb.co/S4x6CVKH/pont-rouklant-jaune.jpg", alt: "Pont roulant jaune vue 1", aiHint: "overhead crane" },
          { src: "https://i.ibb.co/8QQNyHZ/pont-roulant-jaune.jpg", alt: "Pont roulant jaune vue 2", aiHint: "industrial crane" },
        ]
      }
    },
    {
      id: 'automobile',
      iconName: 'Car',
      title: "Ligne de Fabrication Automobile",
      description: "Ligne complète pour la transformation métallique automobile de haute précision.",
      galleryImages: [
        "https://i.ibb.co/0j8hzdNq/carroserie.jpg",
      ],
      specifications: {
        mainDescription: "Notre complexe est agrée par le ministère d’énergie et des mines pour fabriqué :",
        applications: [
          'Carrossage des véhicules complets',
          'Véhicules à châssis nu et véhicules à châssis cabines',
          'Aménagements notables',
        ],
        notes: [
          "<span class='font-bold text-accent'>Ligne de fabrication Carrosserie automobile</span>"
        ],
        additionalImages: [
            { src: "https://i.ibb.co/0j8hzdNq/carroserie.jpg", alt: "Carrosserie automobile", aiHint: "car body" },
        ]
      }
    }
  ]
};
