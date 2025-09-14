
export const productData = {
  couverture: {
    title: '1-PANNEAUX SANDWICHS DE COUVERTURE',
    subtitle: '',
    image: {
      src: 'https://images.unsplash.com/photo-1614003013812-e397300cd764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzdGVlbCUyMGNvdmVyfGVufDB8fHx8MTc1NjcxODU1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      aiHint: 'metal sheets',
    },
    galleryImages: [
      { src: 'https://i.pinimg.com/1200x/44/25/ab/4425ab23a5683c6aeff341a8ed0003ea.jpg', alt: 'Panneaux sandwichs de couverture', aiHint: 'roofing sandwich panels' },
    ],
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
      avantages: [],
      application: '',
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
            { 'Type': 'TL70', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 30, 'Poids Kg/m²': 10.3 },
            { 'Type': 'TL75', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 35, 'Poids Kg/m²': 10.5 },
            { 'Type': 'TL80', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 40, 'Poids Kg/m²': 10.7 },
            { 'Type': 'TL100', 'Longueur (mm)': 15400, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 60, 'Poids Kg/m²': 11.5 },
        ],
      },
      chargesPortees: {
        title: 'LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)',
        subtitle: 'Tôle en acier épaisseur 0,5mm',
        headers: [
            { title: 'Charge utile uniformément repartie', colspan: 2 },
            { title: 'Epaisseur du panneau en mm (2 appuis)', colspan: 4 },
            { title: 'Epaisseur du panneau en mm (3 appuis)', colspan: 4 },
        ],
        subheaders: ['Kg/m²', 'daN/m²', '30', '35', '40', '60', '30_3app', '35_3app', '40_3app', '60_3app'],
        rows: [
            { 'Kg/m²': 80, 'daN/m²': 87, '30': 345, '35': 365, '40': 390, '60': 485, '30_3app': 400, '35_3app': 425, '40_3app': 455, '60_3app': 560 },
            { 'Kg/m²': 120, 'daN/m²': 177, '30': 290, '35': 310, '40': 335, '60': 415, '30_3app': 345, '35_3app': 365, '40_3app': 390, '60_3app': 485 },
            { 'Kg/m²': 150, 'daN/m²': 147, '30': 265, '35': 285, '40': 305, '60': 375, '30_3app': 315, '35_3app': 335, '40_3app': 355, '60_3app': 440 },
            { 'Kg/m²': 200, 'daN/m²': 196, '30': 235, '35': 250, '40': 270, '60': 340, '30_3app': 285, '35_3app': 305, '40_3app': 325, '60_3app': 400 },
            { 'Kg/m²': 250, 'daN/m²': 245, '30': 210, '35': 225, '40': 245, '60': 305, '30_3app': 255, '35_3app': 275, '40_3app': 295, '60_3app': 360 },
        ]
      }
    },
    implementationImages: [
        { src: 'https://i.pinimg.com/1200x/ff/96/da/ff96daf1373a332efc6a83bf1d6d83eb.jpg', alt: 'Implementation of roofing panels 1', aiHint: 'roofing panels implementation' },
        { src: 'https://i.pinimg.com/1200x/11/77/f4/1177f4454ac3659e9619a578a1610bfe.jpg', alt: 'Implementation of roofing panels 2', aiHint: 'roofing panels building' },
    ],
    pose: {
      title: 'La pose de panneaux sandwichs',
      decoupage: "Pour avoir un bon résultat il est conseillé d'utiliser une scie sauteuse électrique à lame d'acier.",
      fixation: "Les panneaux doivent être fixés au sommet de chaque nervure sur les pannes d'extrémité, Sur les pannes intermédiaires. Lors de la pose, les panneaux doivent être serrés sur la partie Longitudinale afin que le joint d'étanchéité à l'air remplisse son effet, Il est recommandé d'utiliser un joint d'étanchéité à l'air avec une face adhésive sur les faces d'appuis du panneau situées sur les pannes d'extrémité, les chéneaux, les gouttières, les recouvrements."
    },
    etancheite: "Les panneaux sandwichs de couverture présentent une rive mâle (avec mousse) et une nervure femelle (sans mousse) permettant un assemblage par emboitement. La nervure mâle est fermée par une bande adhésive, et la nervure femelle d'un joint d'étanchéité à l'air",
    sens: "les panneaux sandwichs de couverture sont désignés en fonction de leur situation sur l'ouvrage et par rapport à la direction des vents dominants. Un panneau est de type droit si la nervure de la rive longitudinale femelle venant en recouvrement en regardant le faîtage. il est de type gauche dans le sens inverse."
  },
  bardage: {
    title: '2-PANNAUX SANDWICHS DE BARDAGE',
    subtitle: '(Fixations cachées et visibles)',
    image: {
      src: '/images/product-imgaes/sandwich-panels/peb promo style  .png',
      aiHint: 'cladding panels',
    },
    galleryImages: [
      { src: '/media/bardage/bardage-main.png', alt: 'Panneaux sandwichs de bardage', aiHint: 'cladding sandwich panels' },
    ],
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
      avantages: [],
      application: '',
    },
    implementationImages: [
        { src: '/media/bardage/bardage-impl-1.png', alt: 'Implementation of cladding panels 1', aiHint: 'cladding panels implementation' },
        { src: '/media/bardage/bardage-impl-2.png', alt: 'Implementation of cladding panels 2', aiHint: 'cladding panels building' },
    ],
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
            { 'Type': 'TBN/L 70', 'Longueur (mm)': 12000, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 30, 'Poids Kg/m²': 10.3 },
            { 'Type': 'TBN/L 80', 'Longueur (mm)': 12000, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 40, 'Poids Kg/m²': 10.7 },
            { 'Type': 'TBN/L 90', 'Longueur (mm)': 12000, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 50, 'Poids Kg/m²': 11.1 },
            { 'Type': 'TBN/L 100', 'Longueur (mm)': 12000, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 60, 'Poids Kg/m²': 11.5 },
            { 'Type': 'TBN/L 120', 'Longueur (mm)': 10000, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 80, 'Poids Kg/m²': 12.3 },
            { 'Type': 'TBN/L 140', 'Longueur (mm)': 8000, 'Largueur standard (mm)': 1000, 'Épaisseur (mm)': 100, 'Poids Kg/m²': 13.1 },
        ] 
      },
       chargesPortees: { 
        title: 'Portées admissibles (m)', 
        subtitle: 'Charge uniformément répartie (daN/m²)',
        headers: [
            { title: 'Épaisseur (mm)', colspan: 1 },
            { title: '40', colspan: 1 },
            { title: '60', colspan: 1 },
            { title: '80', colspan: 1 },
            { title: '100', colspan: 1 },
        ],
        subheaders: ['Épaisseur (mm)', '40', '60', '80', '100'],
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
        src: '/images/product-imgaes/sandwich-panels/sandwich pannel.png',
        aiHint: 'refrigeration panels',
    },
    galleryImages: [
      { src: '/media/frigorifique/frigorifique-main.png', alt: 'Panneaux sandwichs frigorifiques', aiHint: 'refrigeration sandwich panels' },
    ],
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
        avantages: [],
        application: '',
    },
    implementationImages: [
        { src: '/media/frigorifique/frigorifique-impl-1.png', alt: 'Implementation of refrigeration panels 1', aiHint: 'refrigeration panels implementation' },
        { src: '/media/frigorifique/frigorifique-impl-2.png', alt: 'Implementation of refrigeration panels 2', aiHint: 'refrigeration panels building' },
    ],
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
                { title: 'Charge utile uniformément repartie', colspan: 2 },
                { title: 'Epaisseur du panneau en mm (2 appuis)', colspan: 6 },
                { title: 'Epaisseur du panneau en mm (3 appuis)', colspan: 6 },
            ],
            subheaders: ['Kg/m²', 'daN/m²', '80', '100', '120', '150', '180', '200', '80_3app', '100_3app', '120_3app', '150_3app', '180_3app', '200_3app'],
            rows: [
                { 'Kg/m²': 60, 'daN/m²': 58, '80': 545, '100': 635, '120': 715, '150': 790, '180': 845, '200': 870, '80_3app': 620, '100_3app': 725, '120_3app': 805, '150_3app': 905, '180_3app': 975, '200_3app': 1035 },
                { 'Kg/m²': 80, 'daN/m²': 78, '80': 490, '100': 570, '120': 640, '150': 700, '180': 740, '200': 765, '80_3app': 565, '100_3app': 655, '120_3app': 735, '150_3app': 805, '180_3app': 865, '200_3app': 920 },
                { 'Kg/m²': 100, 'daN/m²': 98, '80': 450, '100': 525, '120': 590, '150': 640, '180': 670, '200': 690, '80_3app': 520, '100_3app': 605, '120_3app': 680, '150_3app': 740, '180_3app': 800, '200_3app': 855 },
                { 'Kg/m²': 120, 'daN/m²': 117, '80': 420, '100': 490, '120': 550, '150': 590, '180': 610, '200': 625, '80_3app': 485, '100_3app': 565, '120_3app': 635, '150_3app': 685, '180_3app': 735, '200_3app': 755 },
                { 'Kg/m²': 140, 'daN/m²': 137, '80': 395, '100': 460, '120': 520, '150': 545, '180': 555, '200': 560, '80_3app': 460, '100_3app': 535, '120_3app': 600, '150_3app': 640, '180_3app': 675, '200_3app': 700 },
                { 'Kg/m²': 160, 'daN/m²': 156, '80': 375, '100': 435, '120': 490, '150': 515, '180': 525, '200': 530, '80_3app': 435, '100_3app': 510, '120_3app': 575, '150_3app': 605, '180_3app': 630, '200_3app': 650 },
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
    galleryImages: [
      { src: '/media/tole-nervuree/tole-main.png', alt: 'Tôle nervurée', aiHint: 'ribbed steel sheet' },
    ],
    features: {
      utilisation: [
        'Bâtiments industriels',
        'Ateliers de production',
        'Entrepôts agricoles',
        'Centres commerciaux',
        'Coffrage et armature de dalles béton',
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
          src: '/media/tole-nervuree/tole-geometrie.png',
          aiHint: 'geometric characteristics diagram'
        }
      },
      avantages: [
        'Rapidité de pose.',
        'Participe à la structure de la dalle béton.',
        'Idéal en construction et rénovation.',
      ],
      application: 'Coffrage et armature de dalles béton',
    },
    implementationImages: [
        { src: '/media/tole-nervuree/tole-impl-1.png', alt: 'Implementation of ribbed steel sheet 1', aiHint: 'ribbed steel sheet implementation' },
        { src: '/media/tole-nervuree/tole-impl-2.png', alt: 'Implementation of ribbed steel sheet 2', aiHint: 'ribbed steel sheet building' },
    ],
    tables: {
        isolation: { title: '', headers: [], rows: [] },
        dimensionnement: { 
          title: 'PLANCHER COLLABORANT HI-BOND 77', 
          headers: ['Type', 'Longueur (ml)', 'Largueur standard (mm)', 'Epaisseurs (mm)', 'Poids (kg/m2)', 'Système de revêtement'],
          rows: [
            { 'Type': 'plancher collaborant HI-BOND 77 Galvanisé', 'Longueur (ml)': 15000, 'Largueur standard (mm)': 732, details: [
                { 'Epaisseurs (mm)': 0.70, 'Poids (kg/m2)': 9.17, 'Système de revêtement': 'Galvanisée' },
                { 'Epaisseurs (mm)': 1.00, 'Poids (kg/m2)': 13.10, 'Système de revêtement': 'Galvanisée' },
                { 'Epaisseurs (mm)': 1.50, 'Poids (kg/m2)': 19.66, 'Système de revêtement': 'Galvanisée' },
            ]},
            { 'Type': 'plancher collaborant HI-BOND 77 Pré laqué', 'Longueur (ml)': 15000, 'Largueur standard (mm)': 732, details: [
                { 'Epaisseurs (mm)': 0.70, 'Poids (kg/m2)': 9.17, 'Système de revêtement': 'pré laqué' },
                { 'Epaisseurs (mm)': 1.00, 'Poids (kg/m2)': 13.10, 'Système de revêtement': 'pré laqué' },
                { 'Epaisseurs (mm)': 1.50, 'Poids (kg/m2)': 19.66, 'Système de revêtement': 'pré laqué' },
            ]},
          ] 
        },
        chargesPortees: { 
            title: 'TABLEAU DES CHARGES SUR LA TÔLE HI-BOND 77 (KN/M²)',
            subtitle: '',
            headers: [
              { title: 'ÉP', colspan: 1},
              { title: 'NOMBRE D\'ESPACEMENT', colspan: 1},
              { title: 'CAS DES CHARGES', colspan: 1},
              { title: 'ESPACEMENT en mm', colspan: 10},
            ],
            subheaders: ['ÉP', 'NOMBRE D\'ESPACEMENT', 'CAS DES CHARGES', '1,00', '1,25', '1,50', '1,75', '2,00', '2,25', '2,50', '2,75', '3,00', '3,50'],
            rows: [
                { 'ÉP': '0.70', 'NOMBRE D\'ESPACEMENT': '1', 'CAS DES CHARGES': 'G+Q', '1,00': '18,55', '1,25': '11,87', '1,50': '8,25', '1,75': '6,06', '2,00': '4,64', '2,25': '3,66', '2,50': '2,97', '2,75': '2,45', '3,00': '2,06', '3,50': '1,51' },
                { 'ÉP': '0.70', 'NOMBRE D\'ESPACEMENT': '2', 'CAS DES CHARGES': '', '1,00': '9,02', '1,25': '7,22', '1,50': '6,02', '1,75': '5,16', '2,00': '4,51', '2,25': '4,01', '2,50': '3,43', '2,75': '2,83', '3,00': '2,38', '3,50': '1,75' },
                { 'ÉP': '0.70', 'NOMBRE D\'ESPACEMENT': '3', 'CAS DES CHARGES': '', '1,00': '10,26', '1,25': '8,21', '1,50': '6,84', '1,75': '5,87', '2,00': '5,13', '2,25': '4,56', '2,50': '4,11', '2,75': '3,54', '3,00': '2,98', '3,50': '2,19' },
                { 'ÉP': '1.00', 'NOMBRE D\'ESPACEMENT': '1', 'CAS DES CHARGES': 'G+Q', '1,00': '30,16', '1,25': '19,30', '1,50': '13,40', '1,75': '9,85', '2,00': '7,54', '2,25': '5,96', '2,50': '4,83', '2,75': '3,99', '3,00': '3,35', '3,50': '2,44' },
                { 'ÉP': '1.00', 'NOMBRE D\'ESPACEMENT': '2', 'CAS DES CHARGES': '', '1,00': '17,46', '1,25': '13,97', '1,50': '11,64', '1,75': '9,98', '2,00': '8,64', '2,25': '6,83', '2,50': '5,53', '2,75': '4,5', '3,00': '3,84', '3,50': '2,82' },
                { 'ÉP': '1.00', 'NOMBRE D\'ESPACEMENT': '3', 'CAS DES CHARGES': '', '1,00': '19,87', '1,25': '15,89', '1,50': '13,24', '1,75': '11,35', '2,00': '9,93', '2,25': '8.53', '2,50': '6.91', '2,75': '5.71', '3,00': '4.80', '3,50': '3.53' },
                { 'ÉP': '1.50', 'NOMBRE D\'ESPACEMENT': '1', 'CAS DES CHARGES': 'G+Q', '1,00': '53,20', '1,25': '34,05', '1,50': '23,64', '1,75': '17,37', '2,00': '13,30', '2,25': '10,57', '2,50': '8,51', '2,75': '7,03', '3,00': '5,80', '3,50': '3,65' },
                { 'ÉP': '1.50', 'NOMBRE D\'ESPACEMENT': '2', 'CAS DES CHARGES': '', '1,00': '36,16', '1,25': '28,93', '1,50': '24,11', '1,75': '18,47', '2,00': '14,40', '2,25': '11,17', '2,50': '9,05', '2,75': '7,48', '3,00': '6,28', '3,50': '4,26' },
                { 'ÉP': '1.50', 'NOMBRE D\'ESPACEMENT': '3', 'CAS DES CHARGES': '', '1,00': '41,13', '1,25': '32,91', '1,50': '27,42', '1,75': '23,09', '2,00': '17,68', '2,25': '13,97', '2,50': '11,31', '2,75': '9,35', '3,00': '7,86', '3,50': '5,77' },
            ]
        },
        proprietes: {
            title: 'PROPRIÉTÉS DE LA TÔLE HI-BOND 77',
            headers: ['ÉP', 'Poids-Kg/m', 'Haut de la tôle en compression', 'Bas de la tôle en compression', 'Cisaillement voilement'],
            subheaders: {
                'Haut de la tôle en compression': ['Lx Cm4', 'Zx-top Cm3', 'Zx-bot Cm3', 'Ma Kn.m'],
                'Bas de la tôle en compression': ['Lx Cm4', 'Zx-top Cm3', 'Zx-bot Cm3', 'Ma Kn.m'],
                'Cisaillement voilement': ['Va KN', 'Pa KN']
            },
            rows: [
                { 'ÉP': '0,70', 'Poids-Kg/m': '6.87', 'Haut de la tôle en compression': { 'Lx Cm4': '83.27', 'Zx-top Cm3': '14.34', 'Zx-bot Cm3': '18.87', 'Ma Kn.m': '2,32' }, 'Bas de la tôle en compression': { 'Lx Cm4': '83,27', 'Zx-top Cm3': '21,16', 'Zx-bot Cm3': '16,56', 'Ma Kn.m': '2.68' }, 'Cisaillement voilement': { 'Va KN': '22,18', 'Pa KN': '11,28' } },
                { 'ÉP': '1,00', 'Poids-Kg/m': '9,81', 'Haut de la tôle en compression': { 'Lx Cm4': '119,0', 'Zx-top Cm3': '23,34', 'Zx-bot Cm3': '27,87', 'Ma Kn.m': '3,77' }, 'Bas de la tôle en compression': { 'Lx Cm4': '119,0', 'Zx-top Cm3': '31,03', 'Zx-bot Cm3': '26,74', 'Ma Kn.m': '4.32' }, 'Cisaillement voilement': { 'Va KN': '51,37', 'Pa KN': '21,83' } },
                { 'ÉP': '1,50', 'Poids-Kg/m': '14.72', 'Haut de la tôle en compression': { 'Lx Cm4': '178.0', 'Zx-top Cm3': '41.11', 'Zx-bot Cm3': '43.20', 'Ma Kn.m': '6.65' }, 'Bas de la tôle en compression': { 'Lx Cm4': '178,0', 'Zx-top Cm3': '47,27', 'Zx-bot Cm3': '43,73', 'Ma Kn.m': '7.07' }, 'Cisaillement voilement': { 'Va KN': '91,16', 'Pa KN': '45,20' } },
            ]
        }
    },
    pose: { title: '', decoupage: '', fixation: ''},
    etancheite: '',
    sens: ''
  },
  hiBond77: {
    title: 'PLANCHER COLLABORANT "HI-BOND 77"',
    subtitle: '',
    image: {
        src: 'https://images.unsplash.com/photo-1519995520935-3c106938393c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtZXRhbCUyMGZsb29yJTIwZGVja2luZ3xlbnwwfHx8fDE3MjE4MTQwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        aiHint: 'metal floor decking',
    },
    galleryImages: [
        { src: 'https://images.unsplash.com/photo-1519995520935-3c106938393c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxtZXRhbCUyMGZsb29yJTIwZGVja2luZ3xlbnwwfHx8fDE3MjE4MTQwMjl8MA&ixlib=rb-4.1.0&q=80&w=1080', alt: 'Plancher Collaborant HI-BOND 77', aiHint: 'collaborative flooring' },
    ],
    features: {
        application: 'Coffrage et armature de dalles béton',
        avantages: [
            'Rapidité de pose.',
            'Participe à la structure de la dalle béton.',
            'Idéal en construction et rénovation.',
        ],
        revetement: 'Sans spécifications particulière les profils nervurés sont livrés en qualité standard\n• Galvanisé seul qualité Z200\n• Galvanisé pré-laqué, face extérieure finition laquée polyester ép. 25µ',
        reactionAuFeu: 'Classement de reaction au feu M0',
        caracteristiquesGeometriques: {
            title: "Caractéristiques Géométriques",
            image: {
              src: '/media/hi-bond-77/hi-bond-geometrie.png',
              aiHint: 'HI-BOND 77 geometric characteristics'
            }
        },
        utilisation: [],
        definition: { acier: '', parementExterne: {profil: '', description: '', epaisseur: ''}, parementInterne: {profil: '', epaisseur: ''}},
        ameIsolante: { type: '', conductivite: '', densite: ''},
        tolerance: [],
    },
    tables: {
        dimensionnement: {
            title: 'PLANCHER COLLABORANT HI-BOND 77',
            headers: ['Type', 'Longueur (ml)', 'Largueur standard (mm)', 'Epaisseurs (mm)', 'Poids (kg/m2)', 'Système de revêtement'],
            rows: [
                { 'Type': 'plancher collaborant HI-BOND 77 Galvanisé', 'Longueur (ml)': 15000, 'Largueur standard (mm)': 732, details: [
                    { 'Epaisseurs (mm)': 0.70, 'Poids (kg/m2)': 9.17, 'Système de revêtement': 'Galvanisée' },
                    { 'Epaisseurs (mm)': 1.00, 'Poids (kg/m2)': 13.10, 'Système de revêtement': 'Galvanisée' },
                    { 'Epaisseurs (mm)': 1.50, 'Poids (kg/m2)': 19.66, 'Système de revêtement': 'Galvanisée' },
                ]},
                { 'Type': 'plancher collaborant HI-BOND 77 Pré laqué', 'Longueur (ml)': 15000, 'Largueur standard (mm)': 732, details: [
                    { 'Epaisseurs (mm)': 0.70, 'Poids (kg/m2)': 9.17, 'Système de revêtement': 'pré laqué' },
                    { 'Epaisseurs (mm)': 1.00, 'Poids (kg/m2)': 13.10, 'Système de revêtement': 'pré laqué' },
                    { 'Epaisseurs (mm)': 1.50, 'Poids (kg/m2)': 19.66, 'Système de revêtement': 'pré laqué' },
                ]},
            ],
        },
        chargesPortees: {
            title: 'TABLEAU DES CHARGES SUR LA TÔLE HI-BOND 77 (KN/M²)',
            subtitle: '',
            headers: [
                { title: 'ÉP', colspan: 1},
                { title: 'NOMBRE D\'ESPACEMENT', colspan: 1},
                { title: 'CAS DES CHARGES', colspan: 1},
                { title: 'ESPACEMENT en mm', colspan: 10},
            ],
            subheaders: ['ÉP', 'NOMBRE D\'ESPACEMENT', 'CAS DES CHARGES', '1,00', '1,25', '1,50', '1,75', '2,00', '2,25', '2,50', '2,75', '3,00', '3,50'],
            rows: [
                { 'ÉP': '0.70', 'NOMBRE D\'ESPACEMENT': '1', 'CAS DES CHARGES': 'G+Q', '1,00': '18,55', '1,25': '11,87', '1,50': '8,25', '1,75': '6,06', '2,00': '4,64', '2,25': '3,66', '2,50': '2,97', '2,75': '2,45', '3,00': '2,06', '3,50': '1,51' },
                { 'ÉP': '0.70', 'NOMBRE D\'ESPACEMENT': '2', 'CAS DES CHARGES': '', '1,00': '9,02', '1,25': '7,22', '1,50': '6,02', '1,75': '5,16', '2,00': '4,51', '2,25': '4,01', '2,50': '3,43', '2,75': '2,83', '3,00': '2,38', '3,50': '1,75' },
                { 'ÉP': '0.70', 'NOMBRE D\'ESPACEMENT': '3', 'CAS DES CHARGES': '', '1,00': '10,26', '1,25': '8,21', '1,50': '6,84', '1,75': '5,87', '2,00': '5,13', '2,25': '4,56', '2,50': '4,11', '2,75': '3,54', '3,00': '2,98', '3,50': '2,19' },
                { 'ÉP': '1.00', 'NOMBRE D\'ESPACEMENT': '1', 'CAS DES CHARGES': 'G+Q', '1,00': '30,16', '1,25': '19,30', '1,50': '13,40', '1,75': '9,85', '2,00': '7,54', '2,25': '5,96', '2,50': '4,83', '2,75': '3,99', '3,00': '3,35', '3,50': '2,44' },
                { 'ÉP': '1.00', 'NOMBRE D\'ESPACEMENT': '2', 'CAS DES CHARGES': '', '1,00': '17,46', '1,25': '13,97', '1,50': '11,64', '1,75': '9,98', '2,00': '8,64', '2,25': '6,83', '2,50': '5,53', '2,75': '4,5', '3,00': '3,84', '3,50': '2,82' },
                { 'ÉP': '1.00', 'NOMBRE D\'ESPACEMENT': '3', 'CAS DES CHARGES': '', '1,00': '19,87', '1,25': '15,89', '1,50': '13,24', '1,75': '11,35', '2,00': '9,93', '2,25': '8.53', '2,50': '6.91', '2,75': '5.71', '3,00': '4.80', '3,50': '3.53' },
                { 'ÉP': '1.50', 'NOMBRE D\'ESPACEMENT': '1', 'CAS DES CHARGES': 'G+Q', '1,00': '53,20', '1,25': '34,05', '1,50': '23,64', '1,75': '17,37', '2,00': '13,30', '2,25': '10,57', '2,50': '8,51', '2,75': '7,03', '3,00': '5,80', '3,50': '3,65' },
                { 'ÉP': '1.50', 'NOMBRE D\'ESPACEMENT': '2', 'CAS DES CHARGES': '', '1,00': '36,16', '1,25': '28,93', '1,50': '24,11', '1,75': '18,47', '2,00': '14,40', '2,25': '11,17', '2,50': '9,05', '2,75': '7,48', '3,00': '6,28', '3,50': '4,26' },
                { 'ÉP': '1.50', 'NOMBRE D\'ESPACEMENT': '3', 'CAS DES CHARGES': '', '1,00': '41,13', '1,25': '32,91', '1,50': '27,42', '1,75': '23,09', '2,00': '17,68', '2,25': '13,97', '2,50': '11,31', '2,75': '9,35', '3,00': '7,86', '3,50': '5,77' },
            ]
        },
        proprietes: {
            title: 'PROPRIÉTÉS DE LA TÔLE HI-BOND 77',
            headers: ['ÉP', 'Poids-Kg/m', 'Haut de la tôle en compression', 'Bas de la tôle en compression', 'Cisaillement voilement'],
            subheaders: {
                'Haut de la tôle en compression': ['Lx Cm4', 'Zx-top Cm3', 'Zx-bot Cm3', 'Ma Kn.m'],
                'Bas de la tôle en compression': ['Lx Cm4', 'Zx-top Cm3', 'Zx-bot Cm3', 'Ma Kn.m'],
                'Cisaillement voilement': ['Va KN', 'Pa KN']
            },
            rows: [
                { 'ÉP': '0,70', 'Poids-Kg/m': '6.87', 'Haut de la tôle en compression': { 'Lx Cm4': '83.27', 'Zx-top Cm3': '14.34', 'Zx-bot Cm3': '18.87', 'Ma Kn.m': '2,32' }, 'Bas de la tôle en compression': { 'Lx Cm4': '83,27', 'Zx-top Cm3': '21,16', 'Zx-bot Cm3': '16,56', 'Ma Kn.m': '2.68' }, 'Cisaillement voilement': { 'Va KN': '22,18', 'Pa KN': '11,28' } },
                { 'ÉP': '1,00', 'Poids-Kg/m': '9,81', 'Haut de la tôle en compression': { 'Lx Cm4': '119,0', 'Zx-top Cm3': '23,34', 'Zx-bot Cm3': '27,87', 'Ma Kn.m': '3,77' }, 'Bas de la tôle en compression': { 'Lx Cm4': '119,0', 'Zx-top Cm3': '31,03', 'Zx-bot Cm3': '26,74', 'Ma Kn.m': '4.32' }, 'Cisaillement voilement': { 'Va KN': '51,37', 'Pa KN': '21,83' } },
                { 'ÉP': '1,50', 'Poids-Kg/m': '14.72', 'Haut de la tôle en compression': { 'Lx Cm4': '178.0', 'Zx-top Cm3': '41.11', 'Zx-bot Cm3': '43.20', 'Ma Kn.m': '6.65' }, 'Bas de la tôle en compression': { 'Lx Cm4': '178,0', 'Zx-top Cm3': '47,27', 'Zx-bot Cm3': '43,73', 'Ma Kn.m': '7.07' }, 'Cisaillement voilement': { 'Va KN': '91,16', 'Pa KN': '45,20' } },
            ]
        }
    },
  },
};

    