
export const productData = {
  couverture: {
    title: '1-PANNEAUX SANDWICHS DE COUVERTURE',
    subtitle: '',
    image: {
      src: 'https://images.unsplash.com/photo-1673157142067-1f64f0ae9047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxtZXRhbCUyMHNoZWV0c3xlbnwwfHx8fDE3NTU1MDE5ODJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
      aiHint: 'metal sheets',
    },
    features: {
      utilisation: [
        'Bâtiments industriels et modulaires',
        'Ateliers de production',
        'Entrepôts',
        'Centres commerciaux',
        'Complexes sportifs',
        'Ensembles scolaires et universitaires',
        'ainsi que dans toute autre construction nécessitant une isolation thermique',
      ],
      definition: {
        acier: 'Nuance S250, S280, S320',
        parementExterne: {
            profil: 'Profil type: 5.40.1000 mm',
            description: '4 ondes avec mousse et 1 onde sans mousse',
            epaisseur: 'Épaisseur: 0,5mm - 0,6 mm - 0,7 mm',
        },
        parementInterne: {
            profil: 'Profil à nervuration en faible profondeur',
            epaisseur: 'Épaisseur: 0,5mm - 0,6 mm - 0,7 mm',
        },
      },
      revetement: 'polyester pour la face extérieure : 25 µm, polyester pour la face intérieure: 7µm',
      ameIsolante: {
        type: 'Mousse polyuréthane rigide sans CFC (avec du N-Pentane)',
        conductivite: '0,023 W/m. °c',
        densite: '38/41 kg/m³',
      },
      reactionAuFeu: 'B3: standard, B,S2-d0.',
      tolerance: [
        'Sur épaisseur ±3mm',
        'Sur longueur ± 3mm',
        'Sur largeur ± 3mm',
        'Sur équerrage ± 3mm',
      ],
    },
    tables: {
      isolation: {
        title: 'Coefficient d’isolation thermique',
        headers: ['Épaisseur en (mm)', 'W/m²K', 'Kcal/m²h°c'],
        rows: [
          { 'Épaisseur en (mm)': 30, 'W/m²K': '0,55', 'Kcal/m²h°c': '0,48' },
          { 'Épaisseur en (mm)': 35, 'W/m²K': '0,49', 'Kcal/m²h°c': '0,43' },
          { 'Épaisseur en (mm)': 40, 'W/m²K': '0,44', 'Kcal/m²h°c': '0,38' },
          { 'Épaisseur en (mm)': 60, 'W/m²K': '0,31', 'Kcal/m²h°c': '0,27' },
        ],
      },
      dimensionnement: {
        title: 'Dimensionnement du panneau',
        headers: ['Type', 'Longueur (mm)', 'Largueur standard (mm)', 'Épaisseur (mm)', 'Poids Kg/m²'],
        rows: [
            { Type: 'TL70', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 30, 'Poids Kg/m²': 10.3 },
            { Type: 'TL75', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 35, 'Poids Kg/m²': 10.5 },
            { Type: 'TL80', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 40, 'Poids Kg/m²': 10.7 },
            { Type: 'TL100', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 60, 'Poids Kg/m²': 11.5 },
        ],
      },
      chargesPortees: {
        title: 'LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)',
        subtitle: 'Tôle en acier épaisseur 0,5mm',
        headers: [
            { title: 'Charge utile uniformément repartie', colspan: 2, isGroup: true },
            { title: 'Epaisseur du panneau en mm (2 appuis)', colspan: 4, isGroup: true },
            { title: 'Epaisseur du panneau en mm (3 appuis)', colspan: 4, isGroup: true },
        ],
        subheaders: ['Kg/m²', 'daN/m²', '30', '35', '40', '60', '30', '35', '40', '60'],
        rows: [
            { 'Kg/m²': 80, 'daN/m²': 87, 'c1_30': 345, 'c1_35': 365, 'c1_40': 390, 'c1_60': 485, 'c2_30': 400, 'c2_35': 425, 'c2_40': 455, 'c2_60': 560 },
            { 'Kg/m²': 120, 'daN/m²': 177, 'c1_30': 290, 'c1_35': 310, 'c1_40': 335, 'c1_60': 415, 'c2_30': 345, 'c2_35': 365, 'c2_40': 390, 'c2_60': 485 },
            { 'Kg/m²': 150, 'daN/m²': 147, 'c1_30': 265, 'c1_35': 285, 'c1_40': 305, 'c1_60': 375, 'c2_30': 315, 'c2_35': 335, 'c2_40': 355, 'c2_60': 440 },
            { 'Kg/m²': 200, 'daN/m²': 196, 'c1_30': 235, 'c1_35': 250, 'c1_40': 270, 'c1_60': 340, 'c2_30': 285, 'c2_35': 305, 'c2_40': 325, 'c2_60': 400 },
            { 'Kg/m²': 250, 'daN/m²': 245, 'c1_30': 210, 'c1_35': 225, 'c1_40': 245, 'c1_60': 305, 'c2_30': 255, 'c2_35': 275, 'c2_40': 295, 'c2_60': 360 },
        ]
      }
    },
    pose: {
      title: 'La pose de panneaux sandwichs',
      decoupage: "Pour avoir un bon résultat il est conseillé d'utiliser une scie sauteuse électrique à lame d'acier.",
      fixation: "Les panneaux doivent être fixés au sommet de chaque nervure sur les pannes d'extrémité, Sur les pannes intermédiaires. Lors de la pose, les panneaux doivent être serrés sur la partie Longitudinale afin que le joint d'étanchéité à l'air remplisse son effet, Il est recommandé d'utiliser un joint d'étanchéité à l'air avec une face adhésive sur les faces d'appuis du panneau situées sur les pannes d'extrémité, les chéneaux, les gouttières, les recouvrements."
    },
    etancheite: "Les panneaux sandwichs de couverture présentent une rive mâle (avec mousse) et une nervure femelle (sans mousse) permettant un assemblage par emboitement. La nervure mâle est fermée par une bande adhésive, et la nervure femelle d'un joint d'étanchéité à l'air",
    sens: "les panneaux sandwichs de couverture sont désignés en fonction de leur situation sur l'ouvrage et par rapport à la direction des vents dominants. Un panneau est de type droit si la nervure de la rive longitudinale femelle venant en recouvrement en regardant le faîtage. il est de type gauche dans le sens inverse."
  },
  bardage: {
    title: '2-PANNEAUX SANDWICHS DE BARDAGE',
    subtitle: '(Fixations cachées et visibles)',
    image: {
      src: 'https://images.unsplash.com/photo-1518718913060-947cd98c5550?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxOHx8ZmFjdG9yeSUyMGJ1aWxkaW5nJTIwJTIwc2FuZHdpc2glMjAlMjBwYW5uZWx8ZW58MHx8fHwxNzU1MDc3NDgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      aiHint: 'cladding panels',
    },
    features: {
      utilisation: [
        'Bâtiments industriels',
        'Entrepôts',
        'Centres logistiques',
        'Grandes surfaces commerciales',
        'Show-rooms',
        'Salles de sport',
      ],
      definition: { 
        acier: 'Nuance S250, S280, S320', 
        parementExterne: {profil: 'Profil à nervurations trapézoïdales ou profil lisse', description: '', epaisseur: 'Épaisseur: 0,5mm - 0,6 mm - 0,7 mm'}, 
        parementInterne: {profil: 'Profil à nervuration en faible profondeur', epaisseur: 'Épaisseur: 0,5mm - 0,6 mm'}
      },
      revetement: 'Polyester pour la face extérieure : 25 µm, polyester pour la face intérieure: 7µm',
      ameIsolante: { type: 'Mousse polyuréthane rigide sans CFC (avec du N-Pentane)', conductivite: '0,023 W/m. °c', densite: '38/41 kg/m³'},
      reactionAuFeu: 'B3: standard, B,S2-d0.',
      tolerance: [
        'Sur épaisseur ±3mm',
        'Sur longueur ± 3mm',
        'Sur largeur ± 3mm',
        'Sur équerrage ± 3mm',
      ],
    },
    tables: {
      isolation: { 
        title: 'Coefficient d’isolation thermique', 
        headers: ['Épaisseur en (mm)', 'W/m²K', 'Kcal/m²h°c'], 
        rows: [
          { 'Épaisseur en (mm)': 30, 'W/m²K': '0,55', 'Kcal/m²h°c': '0,48' },
          { 'Épaisseur en (mm)': 40, 'W/m²K': '0,44', 'Kcal/m²h°c': '0,38' },
          { 'Épaisseur en (mm)': 50, 'W/m²K': '0,36', 'Kcal/m²h°c': '0,31' },
          { 'Épaisseur en (mm)': 60, 'W/m²K': '0,31', 'Kcal/m²h°c': '0,27' },
          { 'Épaisseur en (mm)': 80, 'W/m²K': '0,24', 'Kcal/m²h°c': '0,21' },
          { 'Épaisseur en (mm)': 100, 'W/m²K': '0,20', 'Kcal/m²h°c': '0,17' },
        ] 
      },
      dimensionnement: { 
        title: 'Dimensionnement du panneau', 
        headers: ['Type', 'Longueur (mm)', 'Largueur standard (mm)', 'Épaisseur (mm)', 'Poids Kg/m²'], 
        rows: [
            { Type: 'TBN/L 70', 'Longueur (mm)': 12000, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 30, 'Poids Kg/m²': 10.3 },
            { Type: 'TBN/L 80', 'Longueur (mm)': 12000, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 40, 'Poids Kg/m²': 10.7 },
            { Type: 'TBN/L 90', 'Longueur (mm)': 12000, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 50, 'Poids Kg/m²': 11.1 },
            { Type: 'TBN/L 100', 'Longueur (mm)': 12000, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 60, 'Poids Kg/m²': 11.5 },
            { Type: 'TBN/L 120', 'Longueur (mm)': 10000, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 80, 'Poids Kg/m²': 12.3 },
            { Type: 'TBN/L 140', 'Longueur (mm)': 8000, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 100, 'Poids Kg/m²': 13.1 },
        ] 
      },
       chargesPortees: { 
        title: 'Portées admissibles (m)', 
        subtitle: 'Charge uniformément répartie (daN/m²)',
        headers: [
            { title: 'Épaisseur (mm)', colspan: 1, isGroup: false },
            { title: '40', colspan: 1, isGroup: false },
            { title: '60', colspan: 1, isGroup: false },
            { title: '80', colspan: 1, isGroup: false },
            { title: '100', colspan: 1, isGroup: false },
        ],
        subheaders: [],
        rows: [
            { 'Épaisseur (mm)': 30, '40': 3.10, '60': 2.70, '80': 2.50, '100': 2.30},
            { 'Épaisseur (mm)': 40, '40': 3.40, '60': 3.00, '80': 2.70, '100': 2.50},
            { 'Épaisseur (mm)': 50, '40': 3.60, '60': 3.20, '80': 2.90, '100': 2.70},
            { 'Épaisseur (mm)': 60, '40': 3.80, '60': 3.40, '80': 3.10, '100': 2.90},
            { 'Épaisseur (mm)': 80, '40': 4.30, '60': 3.80, '80': 3.50, '100': 3.30},
            { 'Épaisseur (mm)': 100, '40': 4.70, '60': 4.20, '80': 3.90, '100': 3.60},
        ] 
      }
    },
    pose: { title: 'La pose de panneaux sandwichs', decoupage: "Pour avoir un bon résultat il est conseillé d'utiliser une scie sauteuse électrique à lame d'acier.", fixation: "Les panneaux doivent être fixés au sommet de chaque nervure sur les pannes d'extrémité, Sur les pannes intermédiaires. Lors de la pose, les panneaux doivent être serrés sur la partie Longitudinale afin que le joint d'étanchéité à l'air remplisse son effet, Il est recommandé d'utiliser un joint d'étanchéité à l'air avec une face adhésive sur les faces d'appuis du panneau situées sur les pannes d'extrémité, les chéneaux, les gouttières, les recouvrements."},
    etancheite: "Les panneaux sandwichs de couverture présentent une rive mâle (avec mousse) et une nervure femelle (sans mousse) permettant un assemblage par emboitement. La nervure mâle est fermée par une bande adhésive, et la nervure femelle d'un joint d'étanchéité à l'air",
    sens: "les panneaux sandwichs de couverture sont désignés en fonction de leur situation sur l'ouvrage et par rapport à la direction des vents dominants. Un panneau est de type droit si la nervure de la rive longitudinale femelle venant en recouvrement en regardant le faîtage. il est de type gauche dans le sens inverse."
  },
  frigorifique: {
    title: '3-PANNEAUX SANDWICHS FRIGORIFIQUE',
    subtitle: '',
    image: {
        src: 'https://images.unsplash.com/photo-1614356693127-b314f9e55d82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxGUkVFWkVSJTIwUk9PTVMlMjB8ZW58MHx8fHwxNzU1MDg4NDM4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'refrigeration panels',
    },
    features: {
        utilisation: [
            'Bâtiments industriels et modulaires',
            'Ateliers de production',
            'Entrepôts',
            'Complexes sportifs',
            'Centres commerciaux',
            'Ensembles scolaires et universitaires',
            'Chambres froides',
            'Les structures agricoles & agro-alimentaires',
        ],
        definition: {
            acier: 'Nuance S250, S280, S320',
            parementExterne: { profil: 'Profil à nervurassions en faible profondeur, pour le type lisse pas de nervurassions.', description: '', epaisseur: 'Épaisseur: 0,5mm - 0,6 mm - 0,7 mm (Selon la demande du Client)' },
            parementInterne: { profil: '', epaisseur: '' },
        },
        revetement: 'polyester pour la face extérieure : 25 µm, polyester pour la face intérieure: 7µm',
        ameIsolante: {
            type: 'Mousse polyurethane rigide sans CFC (avec du N-Pentane)',
            conductivite: '0,023 W/m. °c',
            densite: '38/41 kg/m³',
        },
        reactionAuFeu: 'B3: standard, B,S2-d0.',
        tolerance: [
            'Sur épaisseur ±3mm',
            'Sur longueur ± 3mm',
            'Sur largeur ± 3mm',
            'Sur équerrage ± 3mm',
        ],
    },
    tables: {
        isolation: {
            title: 'Coefficient d’isolation thermique',
            headers: ['Épaisseur en mm', 'W/m²K', 'Kcal/m²h°c'],
            rows: [
                { 'Épaisseur en mm': 80, 'W/m²K': '0,26', 'Kcal/m²h°c': '0,23' },
                { 'Épaisseur en mm': 100, 'W/m²K': '0,21', 'Kcal/m²h°c': '0,18' },
                { 'Épaisseur en mm': 120, 'W/m²K': '0,18', 'Kcal/m²h°c': '0,15' },
                { 'Épaisseur en mm': 150, 'W/m²K': '0,14', 'Kcal/m²h°c': '0,12' },
                { 'Épaisseur en mm': 180, 'W/m²K': '0,12', 'Kcal/m²h°c': '0,10' },
                { 'Épaisseur en mm': 200, 'W/m²K': '0,11', 'Kcal/m²h°c': '0,09' },
            ],
        },
        dimensionnement: {
            title: 'Dimensionnement du panneau',
            headers: ['Type', 'Longueur (mm)', 'Largueur standard (mm)', 'Épaisseur (mm)', 'Poids Kg/m²'],
            rows: [
                { 'Type': 'LL80', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 80, 'Poids Kg/m²': 11.6 },
                { 'Type': 'LL100', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 100, 'Poids Kg/m²': 12.40 },
                { 'Type': 'LL120', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 120, 'Poids Kg/m²': 13.40 },
                { 'Type': 'LL150', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 150, 'Poids Kg/m²': 10.40 },
                { 'Type': 'LL180', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 180, 'Poids Kg/m²': 15.6 },
                { 'Type': 'LL200', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 200, 'Poids Kg/m²': 16.4 },
            ],
        },
        chargesPortees: {
            title: 'LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m²)',
            subtitle: 'Tôle en acier épaisseur 0,5mm',
            headers: [
                { title: 'Charge utile uniformément repartie', colspan: 2, isGroup: true },
                { title: 'Epaisseur du panneau en mm (2 appuis)', colspan: 6, isGroup: true },
                { title: 'Epaisseur du panneau en mm (3 appuis)', colspan: 6, isGroup: true },
            ],
            subheaders: ['Kg/m²', 'daN/m²', '80', '100', '120', '150', '180', '200', '80', '100', '120', '150', '180', '200'],
            rows: [
                { 'Kg/m²': 60, 'daN/m²': 58, c1_80: 545, c1_100: 635, c1_120: 715, c1_150: 790, c1_180: 845, c1_200: 870, c2_80: 620, c2_100: 725, c2_120: 805, c2_150: 905, c2_180: 975, c2_200: 1035 },
                { 'Kg/m²': 80, 'daN/m²': 78, c1_80: 490, c1_100: 570, c1_120: 640, c1_150: 700, c1_180: 740, c1_200: 765, c2_80: 565, c2_100: 655, c2_120: 735, c2_150: 805, c2_180: 865, c2_200: 920 },
                { 'Kg/m²': 100, 'daN/m²': 98, c1_80: 450, c1_100: 525, c1_120: 590, c1_150: 640, c1_180: 670, c1_200: 690, c2_80: 520, c2_100: 605, c2_120: 680, c2_150: 740, c2_180: 800, c2_200: 855 },
                { 'Kg/m²': 120, 'daN/m²': 117, c1_80: 420, c1_100: 490, c1_120: 550, c1_150: 590, c1_180: 610, c1_200: 625, c2_80: 485, c2_100: 565, c2_120: 635, c2_150: 685, c2_180: 735, c2_200: 755 },
                { 'Kg/m²': 140, 'daN/m²': 137, c1_80: 395, c1_100: 460, c1_120: 520, c1_150: 545, c1_180: 555, c1_200: 560, c2_80: 460, c2_100: 535, c2_120: 600, c2_150: 640, c2_180: 675, c2_200: 700 },
                { 'Kg/m²': 160, 'daN/m²': 156, c1_80: 375, c1_100: 435, c1_120: 490, c1_150: 515, c1_180: 525, c1_200: 530, c2_80: 435, c2_100: 510, c2_120: 575, c2_150: 605, c2_180: 630, c2_200: 650 },
            ]
        }
    },
    pose: {
        title: 'La pose de panneaux sandwichs',
        decoupage: "Pour avoir un bon résultat il est conseillé d'utiliser une scie sauteuse électrique à lame d'acier.",
        fixation: "Les panneaux doivent être fixés au sommet de chaque nervure sur les pannes d'extrémité, Sur les pannes intermédiaires. Lors de la pose, les panneaux doivent être serrés sur la partie Longitudinale afin que le joint d'étanchéité à l'air remplisse son effet, Il est recommandé d'utiliser un joint d'étanchéité à l'air avec une face adhésive sur les faces d'appuis du panneau situées sur les pannes d'extrémité, les chéneaux, les gouttières, les recouvrements."
    },
    etancheite: "Les panneaux sandwichs de bardages présentent une rive mâle et une rive femelle permettant un assemblage par emboitement. Les nervures mâle et femelle sont fermées par une bande adhésive. Tous les panneaux bardage sont munis sur la nervure femelle d'un joint d'étanchéité à l'air; leurs parements pré-laqués sont protégés par un film adhésif à retirer à la pose.",
    sens: ''
  },
  toleNervuree: {
    title: '4-TÔLE NERVURÉE',
    subtitle: 'TOLE NERVURÉE TN40',
     image: {
      src: 'https://images.unsplash.com/photo-1706029831375-c090c70c161d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtZXRhbCUyMHNoZWV0JTIwfGVufDB8fHx8MTc1NTA5MDY2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      aiHint: 'ribbed steel sheet',
    },
    features: {
      utilisation: [
        'Bâtiments industriels',
        'Ateliers de production',
        'Entrepôts agricoles',
        'Centres commerciaux',
      ],
      definition: { acier: '', parementExterne: {profil: '', description: '', epaisseur: ''}, parementInterne: {profil: '', epaisseur: ''}},
      revetement: 'Sans spécifications particulière les profils nervurés sont livrés en qualité standard. Galvanisé seul qualité Z200. Galvanisé pré-laqué, face extérieure finition laquée polyester ép. 25µ',
      ameIsolante: { type: '', conductivite: '', densite: ''},
      reactionAuFeu: 'Classement de réaction au feu M0',
      tolerance: [],
      miseEnOeuvre: {
        title: "Mise en œuvre",
        manutention: "Manutention : Les profils ne doivent pas être choqué ou griffés pour éviter toute mise à nu du métal."
      },
      caracteristiquesGeometriques: {
        title: "Caractéristiques Géométriques",
        image: {
          src: '/diagrams/tole-nervuree-geometrie.png',
          aiHint: 'geometric characteristics diagram'
        }
      }
    },
    tables: {
        isolation: { title: '', headers: [], rows: [] },
        dimensionnement: { 
          title: '', 
          headers: ['Type', 'Longueur (ml)', 'Largeur standard (mm)', 'Épaisseurs (mm)', 'Poids (kg/m²)', 'J (cm²/m)', 'W (cm³/m)', 'Système de revêtement'], 
          rows: [
            { type: 'TN 40', longueur: 1500, largeur: 1000, details: [
              { epaisseur: 0.5, poids: 4.91, j: 12.3, w: 3.92, systeme: 'Galvanisée Pré laquée' },
              { epaisseur: 0.6, poids: 5.90, j: 16.05, w: 5.30, systeme: 'Galvanisée Pré laquée' },
              { epaisseur: 0.7, poids: 6.88, j: 18.72, w: 6.18, systeme: 'Galvanisée Pré laquée' },
              { epaisseur: 1.0, poids: 9.81, j: 26.75, w: 8.83, systeme: 'Galvanisée Pré laquée' },
            ]}
          ] 
        },
        chargesPortees: { 
            title: 'LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)',
            subtitle: '',
            headers: [
              { title: 'EP (mm)', colspan: 1, isGroup: true },
              { title: 'Portée (m)', colspan: 10, isGroup: true },
            ],
            subheaders: ['EP (mm)', '1,00', '1,25', '1,50', '1,75', '2,00', '2,25', '2,50', '2,75', '3', '3,25'],
            rows: [
              { type: '2 appuis', epaisseur: 0.5, '1,00': 439, '1,25': 281, '1,50': 185, '1,75': 143, '2,00': 109, '2,25': 86, '2,50': 63, '2,75': 47, '3': 36, '3,25': null },
              { type: '2 appuis', epaisseur: 0.6, '1,00': 614, '1,25': 393, '1,50': 273, '1,75': 200, '2,00': 153, '2,25': 115, '2,50': 84, '2,75': 63, '3': 48, '3,25': 38 },
              { type: '2 appuis', epaisseur: 0.7, '1,00': 716, '1,25': 458, '1,50': 318, '1,75': 234, '2,00': 179, '2,25': 135, '2,50': 98, '2,75': 73, '3': 57, '3,25': null },
              { type: '3 appuis', epaisseur: 0.5, '1,00': 570, '1,25': 365, '1,50': 252, '1,75': 180, '2,00': 141, '2,25': 111, '2,50': 90, '2,75': 67, '3': 51, '3,25': 40 },
              { type: '3 appuis', epaisseur: 0.6, '1,00': 768, '1,25': 491, '1,50': 341, '1,75': 251, '2,00': 192, '2,25': 152, '2,50': 123, '2,75': 101, '3': 81, '3,25': 64 },
              { type: '3 appuis', epaisseur: 0.7, '1,00': 896, '1,25': 573, '1,50': 398, '1,75': 292, '2,00': 224, '2,25': 177, '2,50': 143, '2,75': 118, '3': 95, '3,25': 74 },
              { type: '3 appuis', epaisseur: 1.0, '1,00': 1280, '1,25': 819, '1,50': 569, '1,75': 418, '2,00': 320, '2,25': 253, '2,50': 204, '2,75': 169, '3': 135, '3,25': 106 },
            ]
        }
    },
    pose: { title: '', decoupage: '', fixation: ''},
    etancheite: '',
    sens: ''
  },
};

    