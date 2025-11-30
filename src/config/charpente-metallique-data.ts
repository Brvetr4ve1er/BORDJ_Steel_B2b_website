
import images from '@/app/lib/placeholder-images.json';

const allGalleryImages = images['charpente-metallique'].gallery;

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
      galleryImages: allGalleryImages.slice(0, 4).map(img => img.src),
      specifications: {
        description: "Notre complexe Bordj Steel est apte a fabriqué ce type de profilé ( P.R.S ) selon la demande du client et en respectent les normes en vigueurs . Nous pouvons vous accompagné durant toutes les phases de réalisation du projet ( Etude , fabrication et Montage ) Notre ligne PRS permet la production massive de poutres en PRS de forme L ou en caissons . • Notre plage de fabrication est de : 350mm à 2000mm de largeur et de maximum 16 000mm de longueur • La portée : selon la demande du client.",
        applications: [
          'Bâtiments industriels de grande portée',
          'Entrepôts logistiques',
          'Ponts et ouvrages d\'art',
          'Structures pour charges lourdes (ponts roulants)',
        ],
        technicalTable: {
          title: "Spécifications Techniques PRS",
          headers: ["Caractéristique", "Valeur"],
          rows: [
            { "Caractéristique": "Nuances d'acier", "Valeur": "S235, S275, S355 et autres sur demande" },
            { "Caractéristique": "Hauteur du profil", "Valeur": "Jusqu'à 2500 mm" },
            { "Caractéristique": "Largeur des semelles", "Valeur": "Jusqu'à 800 mm" },
            { "Caractéristique": "Épaisseur (âme/semelle)", "Valeur": "De 6 mm à 40 mm" },
            { "Caractéristique": "Procédé de soudage", "Valeur": "Arc submergé (SAW) automatisé" },
            { "Caractéristique": "Contrôles", "Valeur": "Ultrasons (UT), Magnétoscopie (MT)" },
          ],
        }
      }
    },
    {
      id: 'supports',
      iconName: 'TowerControl',
      title: "Supports de Transport d'Énergie",
      description: "Structures pour l’énergie, la communication et l’affichage.",
      galleryImages: allGalleryImages.slice(4, 8).map(img => img.src),
      specifications: {
        description: "Une ligne dédiée à la fabrication de candélabres et supports.",
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
          "Produits homologuées par SONALGAZ",
          "Galvanisé au sein de notre complexe selon la norme en 1461",
          "L’homologation SONELGAZ dont nous nous sommes dotés nous permet de proposer à nos clients des supports tubulaires de type 9T et en barres soudées de type BS pour le transport d’électricité à basse et à moyenne tension."
        ]
      }
    },
    {
      id: 'ponts-roulants',
      iconName: 'Tractor',
      title: "Pont Roulant – Mono et Bipoutre",
      description: "Solutions de manutention lourde avec options mono-poutre et bi-poutre.",
      galleryImages: allGalleryImages.slice(8, 12).map(img => img.src),
      specifications: {
        description: "Nous concevons et fabriquons les structures métalliques complètes pour les ponts roulants, un équipement essentiel pour la manutention dans les usines, les entrepôts et les ateliers. Nos solutions sont adaptées pour des configurations monopoutre (plus légères) et bipoutre (pour charges très lourdes et grandes portées).",
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
        }
      }
    },
    {
      id: 'automobile',
      iconName: 'Car',
      title: "Ligne de Fabrication Automobile",
      description: "Ligne complète pour la transformation métallique automobile de haute précision.",
      galleryImages: allGalleryImages.slice(12, 16).map(img => img.src),
      specifications: {
        description: "Bordj Steel possède une expertise spécifique dans la fabrication de composants et de structures pour l'industrie automobile. Notre ligne de production dédiée permet de répondre aux exigences de haute précision, de cadence élevée et de qualité rigoureuse de ce secteur.",
        applications: [
          'Pièces de châssis et de carrosserie',
          'Supports moteurs et berceaux',
          'Lignes d\'assemblage et convoyeurs spécifiques',
          'Outillages et gabarits de production',
        ],
        technicalTable: {
          title: "Spécifications Techniques Automobile",
          headers: ["Caractéristique", "Valeur"],
          rows: [
            { "Caractéristique": "Tolérances", "Valeur": "Précision sub-millimétrique" },
            { "Caractéristique": "Procédés", "Valeur": "Découpe laser, pliage CNC, soudage robotisé" },
            { "Caractéristique": "Matériaux", "Valeur": "Aciers HLE (Haute Limite Élastique), aciers emboutissables" },
            { "Caractéristique": "Contrôle Qualité", "Valeur": "Contrôle tridimensionnel (CMM), Poka-Yoke" },
            { "Caractéristique": "Certifications", "Valeur": "Conformité aux standards IATF 16949 (via partenaires)" },
          ],
        }
      }
    }
  ]
};
