
import images from '@/app/lib/placeholder-images.json';

export type ProductImage = {
  src: string;
  alt: string;
  aiHint: string;
  width: number;
  height: number;
};

export const chaudronnerieData = {
  hero: {
    title: 'Chaudronnerie',
    subtitle: 'Fabrication sur mesure d\'équipements industriels de haute précision, des silos de stockage aux structures mécano-soudées complexes.',
    image_url: images.chaudronnerie.hero.src,
    alt: images.chaudronnerie.hero.alt,
    aiHint: images.chaudronnerie.hero.aiHint,
    cta_primary: 'Explorer les produits',
    cta_secondary: 'Notre expertise',
    stats: [
      { title: 'Capacité de levage', value: '50 Tonnes', icon: 'Scale' },
      { title: 'Épaisseur maximale', value: '60 mm', icon: 'Ruler' },
      { title: 'Types d\'acier', value: 'Carbone, Inox, Hardox', icon: 'Package' },
    ],
  },
  products: {
    silos: {
      title: 'Silos & Réservoirs de Stockage',
      galleryImages: [
        { ...images.chaudronnerie.silos, alt: 'Silo en acier de grande capacité' },
      ],
      features: {
        description: 'Nous concevons et fabriquons des silos et réservoirs de toutes tailles pour le stockage de produits pulvérulents (ciment, céréales), de liquides (eau, produits chimiques) et de gaz. Nos solutions sont optimisées pour garantir la sécurité, la durabilité et une conservation optimale du contenu.',
        avantages: [
          'Conception sur mesure selon le produit à stocker',
          'Calcul de structure pour résistance au vent et aux séismes',
          'Étanchéité parfaite et protection contre la corrosion',
          'Intégration d\'accessoires : échelles, passerelles, systèmes de remplissage et de vidange.'
        ],
        applications: [
          'Industrie agroalimentaire (stockage de grains)',
          'Cimenteries et centrales à béton',
          'Industrie chimique',
          'Stations de traitement des eaux'
        ],
      },
      tables: {
        materiaux: 'Acier au carbone (S235, S355), Acier inoxydable (304L, 316L)',
        capacites: {
          title: 'Capacités de Fabrication',
          headers: ['Caractéristique', 'Valeur'],
          rows: [
            { caracteristique: 'Diamètre', valeur: 'Jusqu\'à 30 mètres' },
            { caracteristique: 'Hauteur', valeur: 'Jusqu\'à 50 mètres' },
            { caracteristique: 'Épaisseur de tôle', valeur: 'Jusqu\'à 40 mm' },
          ]
        },
        normes: 'Conception selon les normes API 650, EUROCODE 3.'
      }
    },
    conduites: {
      title: 'Conduites, Gaines et Tuyauterie Industrielle',
      galleryImages: [
        { ...images.chaudronnerie.ducting, alt: 'Gaines de ventilation industrielle' },
      ],
      features: {
        description: 'Fabrication de réseaux de tuyauterie et de gaines pour le transport de fluides, de gaz, d\'air ou de poussières. Nous maîtrisons le travail des aciers pour des applications à haute ou basse pression, à haute température ou en environnement corrosif.',
        avantages: [
          'Préfabrication en atelier pour une installation rapide sur site',
          'Soudage qualifié (TIG, MIG/MAG)',
          'Contrôles non destructifs (radiographie, ressuage)',
          'Adaptation à tous les diamètres et toutes les formes (circulaire, rectangulaire)',
        ],
        applications: [
          'Réseaux de ventilation et de dépoussiérage',
          'Conduites forcées pour centrales hydroélectriques',
          'Tuyauterie de process pour l\'industrie chimique et pétrolière',
          'Cheminées industrielles'
        ],
      },
      tables: {
        materiaux: 'Acier au carbone, Acier inoxydable, Acier réfractaire.',
        capacites: {
          title: 'Capacités de Fabrication',
          headers: ['Caractéristique', 'Valeur'],
          rows: [
            { caracteristique: 'Diamètres', valeur: 'De 100 mm à 4000 mm' },
            { caracteristique: 'Épaisseurs', valeur: 'De 2 mm à 50 mm' },
          ]
        },
        normes: 'Conformité aux codes de construction CODAP, CODETI.'
      }
    },
    structures: {
      title: 'Structures Spéciales et Mécano-soudées',
      galleryImages: [
        { ...images.chaudronnerie.meccano, alt: 'Structure mécano-soudée complexe' },
      ],
      features: {
        description: 'Nous réalisons des ensembles mécano-soudés complexes et des structures métalliques spéciales qui ne rentrent pas dans le cadre de la charpente traditionnelle. Notre bureau d\'études travaille en étroite collaboration avec nos clients pour développer des solutions innovantes et performantes.',
        avantages: [
          'Grande précision dimensionnelle grâce à nos équipements de découpe et d\'assemblage',
          'Capacité à travailler sur des pièces de grande dimension et de fort tonnage',
          'Maîtrise des assemblages complexes',
        ],
        applications: [
          'Bâtis de machines spéciales',
          'Skids pour l\'industrie pétrolière',
          'Éléments de ponts ou de passerelles',
          'Supports d\'équipements lourds'
        ],
      },
      tables: {
        materiaux: 'Tous types d\'aciers de construction, y compris les aciers à haute limite élastique (HLE).',
        capacites: {
          title: 'Capacités de Fabrication',
          headers: ['Caractéristique', 'Valeur'],
          rows: [
            { caracteristique: 'Poids maximal par pièce', valeur: '50 tonnes' },
            { caracteristique: 'Dimensions maximales', valeur: '20m x 5m x 5m' },
          ]
        },
        normes: 'Fabrication selon les plans clients et les normes EN 1090.'
      }
    },
    equipements: {
      title: 'Équipements Industriels Sur Mesure',
      galleryImages: [
        { ...images.chaudronnerie.equipment, alt: 'Équipement industriel en acier' },
      ],
      features: {
        description: 'Notre savoir-faire en chaudronnerie nous permet de fabriquer une large gamme d\'équipements pour l\'industrie, en pièce unique ou en petite série. De la trémie au convoyeur, nous apportons des solutions robustes et fonctionnelles.',
        avantages: [
          'Conception intégrée (mécanique, hydraulique)',
          'Solutions clés en main incluant montage et mise en service',
          'Revêtements spéciaux (anti-abrasion, anti-corrosion)',
        ],
        applications: [
          'Trémies de chargement',
          'Convoyeurs à bande ou à vis',
          'Bacs de rétention',
          'Cyclones et filtres industriels'
        ],
      },
      tables: {
        materiaux: 'Acier au carbone, Acier inoxydable, Acier anti-abrasion (Hardox).',
        capacites: {
          title: 'Capacités de Fabrication',
          headers: ['Caractéristique', 'Valeur'],
          rows: [
            { caracteristique: 'Découpe Plasma HD', valeur: 'Épaisseur jusqu\'à 60 mm' },
            { caracteristique: 'Roulage', valeur: 'Épaisseur jusqu\'à 40 mm sur 3 mètres' },
            { caracteristique: 'Pliage', valeur: 'Jusqu\'à 1000 tonnes' },
          ]
        },
        normes: 'Conception et fabrication selon cahier des charges client.'
      }
    }
  }
};
