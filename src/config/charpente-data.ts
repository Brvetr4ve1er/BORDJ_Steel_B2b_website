
export type ProductImage = {
  src: string;
  alt: string;
  aiHint: string;
};

export const charpenteData = {
  poutrelles: {
    title: 'Poutrelles (IPN, IPE, HEA, HEB)',
    galleryImages: [
      { src: 'https://picsum.photos/seed/beams/800/600', alt: 'Poutrelles en acier', aiHint: 'steel beams' },
    ],
    features: {
      description: 'Les poutrelles sont des éléments de structure essentiels qui supportent les charges des planchers, des toitures et des murs. Notre gamme comprend des profils IPN, IPE, HEA et HEB pour répondre à toutes les exigences de charge et de portée.',
      avantages: [
        'Haute capacité de charge',
        'Grande variété de sections disponibles',
        'Optimisation du poids et de la résistance',
        'Facilité de connexion avec d\'autres éléments'
      ],
      applications: [
        'Planchers de bâtiments multi-étages',
        'Structures de toiture de grande portée',
        'Ponts et passerelles',
        'Supports pour équipements lourds'
      ],
      normes: 'Produit selon les normes EN 10025, EN 10034.'
    },
    tables: {
      dimensions: {
        title: 'Dimensions et Poids - IPE',
        headers: ['Désignation', 'h (mm)', 'b (mm)', 'Poids (kg/m)'],
        rows: [
          { 'Désignation': 'IPE 100', 'h (mm)': 100, 'b (mm)': 55, 'Poids (kg/m)': 8.1 },
          { 'Désignation': 'IPE 120', 'h (mm)': 120, 'b (mm)': 64, 'Poids (kg/m)': 10.4 },
          { 'Désignation': 'IPE 140', 'h (mm)': 140, 'b (mm)': 73, 'Poids (kg/m)': 12.9 },
          { 'Désignation': 'IPE 160', 'h (mm)': 160, 'b (mm)': 82, 'Poids (kg/m)': 15.8 },
          { 'Désignation': 'IPE 180', 'h (mm)': 180, 'b (mm)': 91, 'Poids (kg/m)': 18.8 },
          { 'Désignation': 'IPE 200', 'h (mm)': 200, 'b (mm)': 100, 'Poids (kg/m)': 22.4 },
        ]
      },
    }
  },
  profiles: {
    title: 'Profilés (Cornières, UPN, UAP)',
    galleryImages: [
      { src: 'https://picsum.photos/seed/profiles/800/600', alt: 'Profilés en acier', aiHint: 'steel profiles' },
    ],
    features: {
      description: 'Les profilés, tels que les cornières et les profilés en U, sont des composants polyvalents utilisés pour les contreventements, les supports secondaires et les assemblages.',
      avantages: [
        'Polyvalence d\'utilisation',
        'Légèreté et résistance',
        'Facilité de perçage, de soudage et de boulonnage',
      ],
      applications: [
        'Contreventements de structures',
        'Supports pour bardage et couverture',
        'Cadres de portes et fenêtres',
        'Assemblages et goussets'
      ],
      normes: 'Produit selon les normes EN 10056, EN 10279.'
    },
    tables: {
      dimensions: {
        title: 'Dimensions - Cornières à ailes égales',
        headers: ['Désignation', 'a x a (mm)', 'e (mm)', 'Poids (kg/m)'],
        rows: [
            { 'Désignation': 'L 40x40x4', 'a x a (mm)': '40x40', 'e (mm)': 4, 'Poids (kg/m)': 2.42 },
            { 'Désignation': 'L 50x50x5', 'a x a (mm)': '50x50', 'e (mm)': 5, 'Poids (kg/m)': 3.77 },
            { 'Désignation': 'L 60x60x6', 'a x a (mm)': '60x60', 'e (mm)': 6, 'Poids (kg/m)': 5.42 },
            { 'Désignation': 'L 80x80x8', 'a x a (mm)': '80x80', 'e (mm)': 8, 'Poids (kg/m)': 9.63 },
        ]
      }
    }
  },
  poteaux: {
    title: 'Poteaux Structurels',
    galleryImages: [
      { src: 'https://picsum.photos/seed/columns/800/600', alt: 'Poteaux en acier', aiHint: 'steel columns' },
    ],
    features: {
      description: 'Les poteaux sont les éléments verticaux de la structure, conçus pour résister aux charges de compression. Nous fabriquons des poteaux à partir de profils laminés à chaud (HE, IPE) ou de profils reconstitués soudés (PRS).',
      avantages: [
        'Excellente résistance à la compression',
        'Permet de créer de grands espaces ouverts',
        'Fabrication sur mesure selon les plans'
      ],
      applications: [
        'Structures porteuses de bâtiments',
        'Supports de mezannines',
        'Colonnes pour halls industriels et entrepôts'
      ],
      normes: 'Conception selon Eurocode 3. Fabrication selon EN 1090.'
    },
    tables: {
      dimensions: {
        title: 'Exemples de sections - HEB',
        headers: ['Désignation', 'h (mm)', 'b (mm)', 'Poids (kg/m)'],
        rows: [
            { 'Désignation': 'HEB 100', 'h (mm)': 100, 'b (mm)': 100, 'Poids (kg/m)': 20.4 },
            { 'Désignation': 'HEB 140', 'h (mm)': 140, 'b (mm)': 140, 'Poids (kg/m)': 33.7 },
            { 'Désignation': 'HEB 200', 'h (mm)': 200, 'b (mm)': 200, 'Poids (kg/m)': 61.3 },
            { 'Désignation': 'HEB 300', 'h (mm)': 300, 'b (mm)': 300, 'Poids (kg/m)': 117.0 },
        ]
      }
    }
  },
  accessoires: {
    title: 'Accessoires de Montage',
    galleryImages: [
      { src: 'https://picsum.photos/seed/accessories/800/600', alt: 'Accessoires de montage', aiHint: 'bolts nuts' },
    ],
    features: {
      description: 'Nous fournissons une gamme complète d\'accessoires pour l\'assemblage de charpentes métalliques, incluant la boulonnerie, les platines, les goussets et les pièces d\'ancrage.',
      avantages: [
        'Qualité contrôlée pour une sécurité maximale',
        'Compatibilité garantie avec nos profils',
        'Différentes classes de résistance disponibles (8.8, 10.9)',
        'Traitement de surface anti-corrosion (galvanisation)'
      ],
      applications: [
        'Assemblages poutre-poteau',
        'Ancrages au sol',
        'Fixation de contreventements',
        'Jonctions de pannes'
      ],
      normes: 'Boulonnerie conforme aux normes ISO 4014/4017.'
    },
    tables: {
        accessoires: {
            title: 'Principaux Accessoires',
            items: [
                { name: 'Boulons HR', image: { src: 'https://picsum.photos/seed/bolts/150/100', aiHint: 'high strength bolts' } },
                { name: 'Platines d\'ancrage', image: { src: 'https://picsum.photos/seed/plates/150/100', aiHint: 'anchor plates' } },
                { name: 'Goussets', image: { src: 'https://picsum.photos/seed/gussets/150/100', aiHint: 'gusset plates' } },
                { name: 'Crapauds', image: { src: 'https://picsum.photos/seed/clamps/150/100', aiHint: 'beam clamps' } },
            ]
        }
    }
  }
};
