
export const productData = {
  couverture: {
    title: '1-PANNEAUX SANDWICHS DE COUVERTURE',
    subtitle: '(à 05 ondes Ép de 30 mm jusqu\'au 60 mm)',
    image: {
      src: 'https://images.unsplash.com/photo-1745434038429-3bb5a1a9a383?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxNnx8ZmFjdG9yeSUyMHJvb2Z8ZW58MHx8fHwxNzU1MDc2MTYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
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
            { title: 'Charge utile uniformément repartie', colspan: 2 },
            { title: 'Epaisseur du panneau en mm (2 appuis)', colspan: 4 },
            { title: 'Epaisseur du panneau en mm (3 appuis)', colspan: 4 },
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
      src: 'https://placehold.co/600x600.png',
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
        title: 'LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)', 
        subtitle: 'Tôle en acier épaisseur 0,5mm',
        headers: [
            { title: 'Charge uniformément répartie (daN/m²)', colspan: 1 },
            { title: 'Épaisseur du panneau en mm (3 appuis)', colspan: 6 },
        ],
        subheaders: ['daN/m²', '30', '40', '50', '60', '80', '100'],
        rows: [
            { 'daN/m²': 40, '30': 3.10, '40': 3.40, '50': 3.60, '60': 3.80, '80': 4.30, '100': 4.70 },
            { 'daN/m²': 60, '30': 2.70, '40': 3.00, '50': 3.20, '60': 3.40, '80': 3.80, '100': 4.20 },
            { 'daN/m²': 80, '30': 2.50, '40': 2.70, '50': 2.90, '60': 3.10, '80': 3.50, '100': 3.90 },
            { 'daN/m²': 100, '30': 2.30, '40': 2.50, '50': 2.70, '60': 2.90, '80': 3.30, '100': 3.60 },
        ] 
      }
    },
    pose: { title: 'La pose de panneaux sandwichs', decoupage: "Pour avoir un bon résultat il est conseillé d'utiliser une scie sauteuse électrique à lame d'acier.", fixation: "Les panneaux doivent être fixés au sommet de chaque nervure sur les pannes d'extrémité, Sur les pannes intermédiaires. Lors de la pose, les panneaux doivent être serrés sur la partie Longitudinale afin que le joint d'étanchéité à l'air remplisse son effet, Il est recommandé d'utiliser un joint d'étanchéité à l'air avec une face adhésive sur les faces d'appuis du panneau situées sur les pannes d'extrémité, les chéneaux, les gouttières, les recouvrements."},
    etancheite: "Les panneaux sandwichs de couverture présentent une rive mâle (avec mousse) et une nervure femelle (sans mousse) permettant un assemblage par emboitement. La nervure mâle est fermée par une bande adhésive, et la nervure femelle d'un joint d'étanchéité à l'air",
    sens: "les panneaux sandwichs de couverture sont désignés en fonction de leur situation sur l'ouvrage et par rapport à la direction des vents dominants. Un panneau est de type droit si la nervure de la rive longitudinale femelle venant en recouvrement en regardant le faîtage. il est de type gauche dans le sens inverse."
  },
  frigorifique: {
    title: '3-PANNEAUX SANDWICHS FRIGORIFIQUES',
    subtitle: '(Détails à venir)',
     image: {
      src: 'https://placehold.co/600x600.png',
      aiHint: 'refrigeration panels',
    },
    features: {
        utilisation: [],
        definition: { acier: '', parementExterne: {profil: '', description: '', epaisseur: ''}, parementInterne: {profil: '', epaisseur: ''}},
        revetement: '',
        ameIsolante: { type: '', conductivite: '', densite: ''},
        reactionAuFeu: '',
        tolerance: [],
      },
      tables: {
          isolation: { title: '', headers: [], rows: [] },
          dimensionnement: { title: '', headers: [], rows: [] },
          chargesPortees: { title: '', subtitle: '', headers: [], subheaders: [], rows: [] }
      },
      pose: { title: '', decoupage: '', fixation: ''},
      etancheite: '',
      sens: ''
  },
  laineDeRoche: {
    title: '4-PANNEAUX EN LAINE DE ROCHE',
    subtitle: '(Détails à venir)',
     image: {
      src: 'https://placehold.co/600x600.png',
      aiHint: 'rock wool panels',
    },
    features: {
        utilisation: [],
        definition: { acier: '', parementExterne: {profil: '', description: '', epaisseur: ''}, parementInterne: {profil: '', epaisseur: ''}},
        revetement: '',
        ameIsolante: { type: '', conductivite: '', densite: ''},
        reactionAuFeu: '',
        tolerance: [],
      },
      tables: {
          isolation: { title: '', headers: [], rows: [] },
          dimensionnement: { title: '', headers: [], rows: [] },
          chargesPortees: { title: '', subtitle: '', headers: [], subheaders: [], rows: [] }
      },
      pose: { title: '', decoupage: '', fixation: ''},
      etancheite: '',
      sens: ''
  },
};
