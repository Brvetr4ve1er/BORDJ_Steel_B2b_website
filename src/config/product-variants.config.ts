
import { ProductVariant } from './product-variant-schema';

export const productVariants: { [key: string]: ProductVariant } = {
  couverture: {
    id: 'couverture',
    title: 'PANNEAUX SANDWICHS DE COUVERTURE',
    mainImage: {
      src: '/media/1614003013812-fce6c9ac.webp',
      alt: 'Panneaux de couverture en acier',
      aiHint: 'metal sheets',
    },
    sections: [
       {
        type: 'keyValue',
        title: 'CARACTÉRISTIQUE PRODUIT',
        items: [
          {
            key: 'Utilisation',
            value: 'Les panneaux sandwichs de couverture sont utilisés pour : Bâtiments industriels et modulaires, Ateliers de production, Entrepôts, Centres commerciaux, Complexes sportifs, Ensembles scolaires et universitaires ainsi que dans toute autre construction nécessitant une isolation thermique.',
          },
          {
            key: 'Définition',
            value: 'Identification d\'acier: Nuance S250, S280, S320\nParement externe: Profil type: 5 .40 .1000 mm, Structure: 4 ondes avec mousse et 1 onde sans mousse, Epaisseur: 0.5mm - 0.6 mm - 0.7 mm\nParement interne: Profil à nervuration en faible profondeur, Epaisseur: 0.5mm - 0.6 mm - 0.7 mm',
          },
          {
            key: 'Revêtement',
            value: 'Face extérieure: polyester pour la face extérieure : 25 µm\nFace intérieure: polyester pour la face intérieure : 7 µm',
          },
          {
            key: 'Âme isolante',
            value: 'Type: Mousse polyuréthane rigide sans CFC (avec du N-Pentane)\nConductivité thermique: 0.023 W/m. °C\nDensité (kg/m³): 38/41 kg m3',
          },
          {
            key: 'Réaction au feu',
            value: 'B3 : standard\nB,S2-d0.',
          },
          {
            key: 'Tolérance sur panneaux',
            value: 'Sur épaisseur ±3mm\nSur longueur ± 3mm\nSur largeur ± 3mm\nSur équerrage ± 3mm',
          },
        ],
      },
      {
        type: 'table',
        title: "Coefficient d'isolation thermique",
        headers: ['Épaisseur en mm', '30', '35', '40', '60'],
        rows: [
          ['W/m²K', '0.55', '0.49', '0.44', '0.31'],
          ['Kcal/m²h°C', '0.48', '0.43', '0.38', '0.27'],
        ],
      },
      {
        type: 'table',
        title: 'Dimensionnement du panneau',
        headers: ['Type', 'Longueur (mm)', 'Largeur standard (mm)', 'Épaisseur (mm)', 'Poids kg/m²'],
        rows: [
          ['LL70', 15400, 1000, 30, 10.3],
          ['LL75', 15400, 1000, 35, 10.5],
          ['LL80', 15400, 1000, 40, 10.7],
          ['LL100', 15400, 1000, 60, 11.5],
        ],
      },
      {
        type: 'text',
        title: 'Étanchéité des rives',
        content: "Les panneaux sandwichs de couverture présentent une rive mâle (avec mousse) et une nervure femelle (sans mousse) permettant un assemblage par emboîtement. La nervure mâle est fermée par une bande adhésive et la nervure femelle est munie d'un joint d'étanchéité à l'air.",
      },
       {
        type: 'text',
        title: 'Sens des panneaux',
        content: "Les panneaux sandwichs de couverture sont désignés en fonction de leur position sur l'ouvrage et de la direction des vents dominants. Un panneau est dit « droit » si la nervure de rive longitudinale femelle vient en recouvrement lorsqu'on regarde vers le faîtage ; il est dit « gauche » dans le cas inverse.",
      },
       {
        type: 'text',
        title: 'La pose de panneaux sandwichs',
        content: "Découpage des panneaux : Pour avoir un bon résultat il est conseillé d'utiliser une scie sauteuse électrique à lame d'acier.\nFixation des panneaux : Les panneaux doivent être rivés au sommet de chaque nervure sur les pannes d'extrémité. Sur les pannes intermédiaires, lors de la pose, les panneaux doivent être serrés sur la partie longitudinale afin que le joint d'étanchéité à l'air remplisse son rôle. Il est recommandé d'utiliser un joint d'étanchéité à l'air avec une face adhésive sur les faces d'appuis du panneau situées sur les pannes d'extrémité, les chéneaux, les gouttières et les recouvrements.",
      },
       {
        type: 'table',
        title: 'LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)',
        subtitle: 'Tôle en acier épaisseur 0.5mm',
        headerGroups: [
          { label: "Charge utile uniformément répartie", span: 1 },
          { label: " ", span: 1 },
          { label: "1 appui", span: 4, icon: 'two-supports' },
          { label: "2 appuis", span: 4, icon: 'two-supports' },
        ],
        subheaders: ['kg/m²', 'daN/m²', '30', '35', '40', '60', '30', '35', '40', '60'],
        rows: [
          ['80', '78', '345', '365', '390', '485', '400', '425', '455', '560'],
          ['120', '118', '290', '310', '335', '415', '345', '365', '390', '485'],
          ['150', '147', '265', '285', '305', '375', '315', '335', '355', '440'],
          ['200', '196', '235', '250', '270', '340', '285', '305', '325', '400'],
          ['250', '245', '210', '225', '245', '305', '255', '275', '295', '360'],
        ]
      },
      {
        type: 'image',
        title: 'Caractéristiques Géométriques',
        caption: 'Couverture avec 5 ondes',
        image: {
            src: '/media/panneaux-couverture-86aa6d33.webp',
            alt: 'Schéma technique couverture',
            aiHint: 'technical drawing'
        }
      }
    ],
  },
  bardage: {
    id: 'bardage',
    title: 'PANNEAUX SANDWICHS DE BARDAGE',
    mainImage: {
      src: '/media/1545987796-b3eced79.webp',
      alt: 'Panneaux de bardage façade industrielle',
      aiHint: 'industrial building facade cladding'
    },
    sections: [
        {
            type: 'list',
            title: 'Utilisation',
            items: [
                "Atelier de production.",
                "Entrepôts.",
                "Bâtiments industriels et modulaires.",
                "Centres commerciaux.",
                "Complexes sportifs.",
                "Ensembles scolaires et universitaires."
            ]
        },
        {
            type: 'keyValue',
            title: 'CARACTÉRISTIQUE PRODUIT',
            items: [
              {
                key: 'Définition',
                value: "Identification d'acier : Nuance S250, S280, S320:\nProfil à nervures de faible profondeur ; le type lisse est sans nervures.\nÉpaisseur : 0,5mm - 0.6 mm - 0.7 mm (selon la demande du client)"
              },
              {
                key: 'Revêtement',
                value: "polyester pour la face extérieure : 25 µm\npolyester pour la face intérieure : 7µm"
              },
              {
                key: 'Âme isolante',
                value: "Mousse polyuréthane rigide sans CFC (avec du N-Pentane)\nConductivité thermique : 0.023 W/m. °c\nDensité (kg/m³) = 38/41 kg m3"
              },
              {
                key: 'Réaction au feu',
                value: "B3 : standard\nB-S2-d0."
              },
              {
                key: 'Tolérance sur panneaux',
                value: "Sur épaisseur ±3mm\nSur longueur ± 3mm\nSur largeur ± 3mm\nSur équerrage ± 3mm"
              }
            ]
        },
        {
            type: 'table',
            title: "Coefficient d'isolation thermique",
            headers: ["Épaisseur en mm", "30", "35", "40", "50", "60"],
            rows: [
                ["W/m².K", "0.55", "0.50", "0.45", "0.39", "0.35"],
                ["Kcal/m².h.°C", "0.47", "0.43", "0.40", "0.33", "0.30"]
            ]
        },
        {
            type: 'table',
            title: 'Dimensionnement du panneau',
            headers: ["Type", "Longueur (mm)", "Largeur utile (mm)", "Epaisseur (mm)", "Poids (kg/m²)"],
            rows: [
                ["LL30", 15400, 1000, 30, 9.6],
                ["LL35", 15400, 1000, 35, 9.8],
                ["LL40", 15400, 1000, 40, 10.2],
                ["LL50", 15400, 1000, 50, 10.4],
                ["LL60", 15400, 1000, 60, 10.8]
            ]
        },
        {
            type: 'text',
            title: 'Étanchéité des rives',
            content: "Les panneaux sandwichs de bardage présentent une rive mâle et une rive femelle permettant un assemblage par emboîtement.\nLes nervures mâle et femelle sont fermées par une bande adhésive.\nTous les panneaux bardage sont munis sur la nervure femelle d'un joint d'étanchéité à l'air ; leurs parements pré-laqués sont protégés par un film adhésif à retirer à la pose."
        },
        {
            type: 'table',
            title: 'LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m²)',
            subtitle: 'Tôle en acier épaisseur 0.5mm',
            headerGroups: [
              { label: 'Charge utile uniformément répartie', span: 1 },
              { label: '', span: 1 },
              { label: '1 appui - Entraxe Max cm', span: 5, icon: 'two-supports' },
              { label: '2 appuis - Entraxe Max cm', span: 5, icon: 'two-supports' },
            ],
            subheaders: ['kg/m²', 'daN/m²', '30', '35', '40', '50', '60', '30', '35', '40', '50', '60'],
            rows: [
              ['60', '58', '285', '315', '345', '405', '425', '455', '505', '550', '560', ''],
              ['80', '78', '255', '285', '315', '345', '375', '405', '445', '490', '495', ''],
              ['100', '98', '235', '265', '300', '335', '375', '385', '410', '460', '470', ''],
              ['120', '117', '225', '255', '280', '310', '355', '360', '385', '430', '450', ''],
              ['140', '137', '205', '225', '250', '285', '340', '340', '370', '420', '430', ''],
              ['160', '156', '195', '215', '235', '280', '325', '325', '345', '370', '370', ''],
            ]
        },
        {
            type: 'image',
            title: 'Caractéristiques Géométriques',
            image: { src: '/media/xii4624ovg-acc62fc7.webp', alt: 'Schéma technique C', aiHint: 'technical drawing'},
            caption: 'Panneaux sandwichs de bardage nervuré/nervuré'
        }
        // Le schéma « lisse/lisse » reste à fournir : il réutilisait l'image du
        // profil nervuré/nervuré, ce qui contredisait sa légende.
    ]
  },
  frigorifique: {
    id: 'frigorifique',
    title: 'PANNEAUX SANDWICHS FRIGORIFIQUES',
    mainImage: {
      src: '/media/1558618666-e756293b.webp',
      alt: 'Panneaux sandwichs frigorifiques – chambre froide',
      aiHint: 'cold storage refrigeration panels',
    },
    sections: [
        {
            type: 'list',
            title: 'Utilisation',
            items: [
                'Bâtiments industriels et modulaires',
                'Ateliers de production',
                'Entrepôts',
                'Complexes sportifs',
                'Centres commerciaux',
                'Ensembles scolaires et universitaires',
                'Chambres froides',
                'Les structures agricoles & agro-alimentaires'
            ]
        },
        {
            type: 'keyValue',
            title: 'CARACTÉRISTIQUE PRODUIT',
            items: [
                {
                    key: 'Définition',
                    value: "Identification d’acier: Nuance S250, S280, S320\nParement Externe: Profil à nervures de faible profondeur ; le type lisse est sans nervures.\nÉpaisseur: 0,5mm - 0,6 mm - 0,7 mm (Selon la demande du Client)"
                },
                {
                    key: 'Revêtement',
                    value: 'polyester pour la face extérieure : 25 µm, polyester pour la face intérieure: 7µm'
                },
                {
                    key: 'Âme isolante',
                    value: 'Type: Mousse polyurethane rigide sans CFC (avec du N-Pentane)\nConductivité thermique: 0,023 W/m. °c\nDensité: 38/41 kg/m³'
                },
                {
                    key: 'Réaction au feu',
                    value: 'B3: standard, B,S2-d0.'
                },
                {
                    key: 'Tolérance sur panneaux',
                    value: 'Sur épaisseur ±3mm\nSur longueur ± 3mm\nSur largeur ± 3mm\nSur équerrage ± 3mm'
                }
            ]
        },
        {
            type: 'table',
            title: "Coefficient d’isolation thermique",
            headers: ["Épaisseur en mm", "80", "100", "120", "150", "180", "200"],
            rows: [
                ["W/m²K", "0,26", "0,21", "0,18", "0,14", "0,12", "0,11"],
                ["Kcal/m²h°c", "0,23", "0,18", "0,15", "0,12", "0,10", "0,09"]
            ]
        },
        {
            type: 'table',
            title: 'Dimensionnement du panneau',
            headers: ["Type", "Longueur (mm)", "Largeur standard (mm)", "Épaisseur (mm)", "Poids Kg/m²"],
            rows: [
                ["LL80", 15400, 1000, 80, 11.6],
                ["LL100", 15400, 1000, 100, 12.40],
                ["LL120", 15400, 1000, 120, 13.40],
                ["LL150", 15400, 1000, 150, 14.40],
                ["LL180", 15400, 1000, 180, 15.6],
                ["LL200", 15400, 1000, 200, 16.4]
            ]
        },
        {
            type: 'table',
            title: 'LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m²)',
            subtitle: 'Tôle en acier épaisseur 0,5mm',
            headerGroups: [
                { label: 'Charge utile uniformément répartie', span: 1 },
                { label: '', span: 1 },
                { label: '1 appui - Entraxe Max cm', span: 6, icon: 'two-supports' },
                { label: '2 appuis - Entraxe Max cm', span: 6, icon: 'two-supports' },
            ],
            subheaders: ['kg/m²', 'daN/m²', '80', '100', '120', '150', '180', '200', '80', '100', '120', '150', '180', '200'],
            rows: [
                ['60', '58', '545', '635', '715', '790', '845', '870', '620', '725', '805', '905', '975', '1035'],
                ['80', '78', '490', '570', '640', '700', '740', '765', '565', '655', '735', '805', '865', '920'],
                ['100', '98', '450', '525', '590', '640', '670', '690', '520', '605', '680', '740', '800', '855'],
                ['120', '117', '420', '490', '550', '590', '610', '625', '485', '565', '635', '685', '735', '755'],
                ['140', '137', '395', '460', '520', '545', '555', '560', '460', '535', '600', '640', '675', '700'],
                ['160', '156', '375', '435', '490', '515', '525', '530', '435', '510', '575', '605', '630', '650'],
            ]
        },
        {
            type: 'image',
            title: 'Caractéristiques Géométriques',
            caption: 'Panneaux sandwichs frigorifiques lisse/lisse',
            image: { src: '/media/panneaux-frigorifique-1-75998de3.webp', alt: 'panneaux-frigorifique-1', aiHint: 'technical drawing' }
        },
        {
            type: 'image',
            title: '',
            caption: "Détail de l'assemblage",
            image: { src: '/media/panneaux-frigorifique-2-6fd82b09.webp', alt: 'panneaux-frigorifique-2', aiHint: 'technical drawing' }
        }
    ]
  },
  toleNervuree: {
    id: 'toleNervuree',
    title: 'TÔLE NERVURÉE',
    mainImage: {
      src: '/media/1706029831375-5aec7a03.webp',
      alt: 'Tôle nervurée',
      aiHint: 'ribbed steel sheet',
    },
    sections: [
        {
            type: 'text',
            title: 'TÔLE NERVURÉE TN40',
            content: ''
        },
        {
            type: 'list',
            title: 'Utilisation',
            items: [
                'Bâtiments industriels',
                'Ateliers de production',
                'Entrepôts agricoles',
                'Centres commerciaux',
            ]
        },
        {
            type: 'table',
            title: '',
            headers: ["Type", "Longueur (ml)", "Largeur standard (mm)", "Epaisseurs (mm)", "Poids (kg/m2)", "I (cm4/m)", "W (cm3/m)", "Système de revêtement"],
            rows: [
                ['TN 40', '15000', '1000', '0.50', '4.91', '12.3', '3.92', 'Galvanisée'],
                ['', '', '', '0.60', '5.90', '16.05', '5.30', ''],
                ['', '', '', '0.70', '6.88', '18.72', '6.18', ''],
                ['', '', '', '1.00', '9.81', '26.75', '8.83', '']
            ]
        },
        {
            type: 'keyValue',
            title: '',
            items: [
                {key: 'Revêtement', value: 'Sans spécifications particulière les profils nervurés sont livrés en qualité standard\n- Galvanisé seul qualité Z200\n- Galvanisé pré-laqué, face extérieure finition laquée polyester ép. 25μ'},
                {key: 'Réaction au feu', value: 'Classement de réaction au feu M0'},
                {key: 'Mise en œuvre', value: 'Manutention : Les profils ne doivent pas être choqué ou griffés pour éviter toute mise à nu du métal.'}
            ]
        },
        {
            type: 'table',
            title: 'Tableau de charges et portées admissibles',
            subtitle: 'Charges uniformément réparties exprimées en KN/m²',
            headerGroups: [
              { label: "EP (mm)", span: 1 },
              { label: "1 appui", span: 10, icon: 'two-supports' },
              { label: "2 appuis", span: 10, icon: 'two-supports' },
            ],
            subheaders: ['', '1.00', '1.25', '1.50', '1.75', '2.00', '2.25', '2.50', '2.75', '3.00', '3.25', '1.00', '1.25', '1.50', '1.75', '2.00', '2.25', '2.50', '2.75', '3.00', '3.25'],
            rows: [
              ['0.5', '439', '281', '185', '143', '109', '86', '63', '47', '36', '-', '570', '365', '252', '180', '141', '111', '90', '67', '51', '40'],
              ['0.6', '614', '393', '273', '200', '153', '115', '84', '63', '48', '38', '768', '491', '341', '251', '192', '152', '123', '101', '81', '64'],
              ['0.7', '716', '458', '318', '234', '179', '135', '98', '73', '57', '', '896', '573', '398', '292', '224', '177', '143', '118', '95', '74'],
              ['1.0', '', '', '', '', '', '', '', '', '', '', '1280', '819', '569', '418', '320', '253', '204', '169', '135', '106']
            ],
        },
        {
            type: 'image',
            title: 'Caractéristiques Géométriques',
            image: { src: '/media/tole-nervure-e88ce85f.webp', alt: 'tole-nervure', aiHint: 'technical drawing' },
            caption: ''
        }
    ]
  },
  hibond: {
    id: 'hibond',
    title: 'PLANCHER COLLABORANT "HI-BOND 77"',
    mainImage: {
      src: '/media/5307e6787500b6efff734990a417-37a72221.webp',
      alt: 'Plancher collaborant Hi-Bond',
      aiHint: 'composite floor',
    },
    sections: [
        {
            type: 'text',
            title: 'Application conseillée : Coffrage et armature de dalles béton',
            content: ''
        },
        {
            type: 'list',
            title: "Les avantages de l'utilisation",
            items: [
                'Rapidité de pose.',
                'Participe à la structure de la dalle béton.',
                'Idéal en construction et rénovation.',
            ]
        },
         {
            type: 'table',
            title: '',
            headers: ['Type', 'Longueur (ml)', 'Largeur standard (mm)', 'Épaisseurs (mm)', 'Poids (kg/m2)', 'Système de revêtement'],
            rows: [
                ["Plancher collaborant HI-BOND 77 Galvanisé", 15000, 732, '0.70', 9.17, 'Galvanisée'],
                ['', '', '', '1.00', 13.10, ''],
                ['', '', '', '1.50', 19.66, ''],
                ['Plancher collaborant HI-BOND 77 Pré laqué', 15000, 732, '0.70', 9.17, 'Pré laqué'],
                ['', '', '', '1.00', 13.10, ''],
                ['', '', '', '1.50', 19.66, ''],
            ]
        },
        {
            type: 'keyValue',
            title: '',
            items: [
                {key: 'Revêtement', value: "Sans spécifications particulières, les profils nervurés sont livrés en qualité standard.\nTypes:\n- Galvanisé seul: qualité Z200\n- Galvanisé pré-laqué: Face extérieure Finition laquée polyester ép. 25µ"},
                {key: 'Réaction au feu', value: 'Classement de réaction au feu M0'}
            ]
        },
        {
            type: 'table',
            title: 'PROPRIÉTÉS DE LA TÔLE HI-BOND 77',
            headerGroups: [
                { label: "ÉP (mm)", span: 1 },
                { label: "Poids (Kg/m)", span: 1 },
                { label: "Haut de la tôle en compression", span: 4 },
                { label: "Bas de la tôle en compression", span: 4 },
                { label: "Cisaillement voilement", span: 2 },
            ],
            subheaders: ['', '', 'Lx (Cm4)', 'Zx-top (Cm3)', 'Zx-bot (Cm3)', 'Ma (Kn.m)', 'Lx (Cm4)', 'Zx-top (Cm3)', 'Zx-bot (Cm3)', 'Ma (Kn.m)', 'Va (KN)', 'Pa (KN)'],
            rows: [
                ['0.70', 6.87, 83.27, 14.34, 18.87, 2.32, 83.27, 21.16, 16.56, 2.68, 22.18, 11.28],
                ['1.00', 9.81, 119.0, 23.34, 27.87, 3.77, 119.0, 31.03, 26.74, 4.32, 51.37, 21.83],
                ['1.50', 14.72, 178.0, 41.11, 43.20, 6.65, 178.0, 47.27, 43.73, 7.07, 91.16, 45.20],
            ]
        },
         {
            type: 'table',
            title: 'TABLEAU DES CHARGES SUR LA TÔLE HI-BOND 77 (KN/M²)',
            headers: ["EP", "NOMBRE D'ESPACES", "CAS DES CHARGES", "1.00", "1.25", "1.50", "1.75", "2.00", "2.25", "2.50", "2.75", "3.00", "3.50"],
            rows: [
              ['0.70', 1, "G+Q", '19.55', '11.87', '8.25', '6.06', '4.64', '3.66', '2.97', '2.45', '2.06', '1.51'],
              ['', 2, "", '9.02', '7.22', '6.02', '5.16', '4.51', '4.01', '3.43', '2.83', '2.38', '1.75'],
              ['', 3, "", '10.26', '8.21', '6.84', '5.87', '5.13', '4.56', '4.11', '3.54', '2.98', '2.19'],
              ['1.00', 1, "G+Q", '30.16', '19.30', '13.40', '9.85', '7.54', '5.96', '4.83', '3.99', '3.35', '2.44'],
              ['', 2, "", '17.46', '13.97', '11.64', '9.98', '8.64', '6.83', '5.53', '4.50', '3.84', '2.82'],
              ['', 3, "", '19.87', '15.89', '13.24', '11.35', '9.93', '8.53', '6.91', '5.71', '4.80', '3.53'],
              ['1.50', 1, "G+Q", '53.20', '34.05', '23.64', '17.37', '13.30', '10.57', '8.51', '7.03', '5.80', '3.65'],
              ['', 2, "", '36.16', '28.93', '24.11', '18.47', '14.40', '11.17', '9.05', '7.48', '6.28', '4.26'],
              ['', 3, "", '41.13', '32.91', '27.42', '23.09', '17.68', '13.97', '11.31', '9.35', '7.86', '5.77'],
            ]
        },
        {
            type: 'image',
            title: 'Caractéristiques Géométriques',
            caption: '',
            image: {
                src: '/media/hi-bond-77-1b35f148.webp',
                alt: 'hi-bond-77',
                aiHint: 'technical drawing'
            }
        }
    ]
  },
  finitions: {
    id: 'finitions',
    title: 'Pièces de Finition',
    mainImage: { src: '', alt: '' },
    sections: [
        {
            type: 'imageGrid',
            items: [
                { name: 'Bande de rive sur mur', length: 'Long. Std. 3m à 6m', image: { src: '/media/28147544dd82d0c459d85954e48f-5af93d48.webp', alt: 'Bande de rive sur mur', aiHint: 'wall edge band' } },
                { name: 'Angle droit', length: 'Long. Std. 3m à 6m', image: { src: '/media/52704c1cb61fbec9f1ab6c2d24ef-24e2464b.webp', alt: 'Angle droit', aiHint: 'right angle' } },
                { name: 'Bavette rejet d\'eau', length: 'Long. Std. 3m à 6m', image: { src: '/media/7c46241638e5e1c9cbe15dea25be-070533eb.webp', alt: 'Bavette rejet d\'eau', aiHint: 'water drip flashing' } },
                { name: 'Sous faitière', length: 'Long. Std. 3m à 6m', image: { src: '/media/dfcbe8706e2cd65a17a1d73fbad6-80a5736b.webp', alt: 'Sous faitière', aiHint: 'under ridge' } },
                { name: 'Cornière d\'angle intérieur', length: 'Long. Std. 3m à 6m', image: { src: '/media/28dde1c98701028935e40ac4d9e2-c1d510d1.webp', alt: 'Cornière d\'angle intérieur', aiHint: 'internal corner angle' } },
                // Photo de la cornière d'angle extérieur à fournir par le client :
                // l'entrée réutilisait la photo de l'angle intérieur.
                { name: 'Cornière d\'angle extérieur', length: 'Long. Std. 3m à 6m' },
                { name: 'Faîtière', length: 'Long. Std. 3m à 6m', image: { src: '/media/389f22b55684dcbf9747652526fc-c0943445.webp', alt: 'Faîtière', aiHint: 'ridge cap' } },
                { name: 'U de sol acier galvanisé', length: 'Long. Std. 3m à 6m', image: { src: '/media/12c9fcea3a33af7b379bbee14021-b32cd893.webp', alt: 'U de sol acier galvanisé', aiHint: 'galvanized steel U-profile' } },
            ]
        }
    ]
  }
};
