
export const productData = {
  couverture: {
    documentMetadata: {
      productType: "PANNEAUX SANDWICHS DE COUVERTURE",
      productRange: "à 05 ondes Ep de 30 mm jusqu'au 60 mm",
      pageNumber: 17,
      language: "fr"
    },
    productDescription: {
      section1_caracteristiques: {
        title: "CARACTÉRISTIQUE PRODUIT",
        subsection_utilisation: {
          heading: "Utilisation",
          items: [
          "Bâtiments industriels et modulaires",
            "Ateliers de production",
            "Entrepôts",
            "Centres commerciaux",
            "Complexes sportifs",
            "Ensembles scolaires et universitaires ainsi que dans toute autre construction nécessitant une isolation thermique"
          ]
        },
        subsection_definition: {
          heading: "Définition",
          details: [
            {
              label: "Identification d'acier",
              "value": "Nuance S250, S280, S320"
            },
            {
              label: "Parement externe",
              value: "Profil type: 5 .40 .1000 mm"
            },
            {
              label: "Structure",
              value: "4 ondes avec mousse et 1 onde sans mousse"
            },
            {
              label: "Epaisseur",
              value: "0.5mm - 0.6 mm - 0.7 mm"
            },
            {
              label: "Parement interne",
              value: "Profil à nervuration en faible profondeur"
            },
            {
              label: "Epaisseur",
              value: "0.5mm - 0.6 mm - 0.7 mm"
            }
          ]
        },
        subsection_revetement: {
          heading: "Revêtement :",
          specifications: [
            {
              type: "Face extérieure",
              material: "polyester pour la face extérieure : 25 µm"
            },
            {
              type: "Face intérieure",
              material: "polyester pour la face intérieure : 7 µm"
            }
          ]
        },
        subsection_ame_isolante: {
          heading: "Ame isolante :",
          specifications: [
            {
              property: "Type",
              value: "Mousse polyuréthane rigide sans CFC (avec du N-Pentane)"
            },
            {
              property: "Conductivité thermique",
              value: "0.023 W/m. °C"
            },
            {
              property: "Densité (kg/m³)",
              value: "38/41 kg m3"
            }
          ]
        },
        subsection_reaction_au_feu: {
          heading: "Réaction au feu",
          classifications: [
            "B3 : standard",
            "B,S2-d0."
          ]
        },
        subsection_tolerance: {
          heading: "Tolérance sur panneaux",
          tolerances: [
            {
              parameter: "Sur épaisseur",
              value: "±3mm"
            },
            {
              parameter: "Sur longueur",
              value: "±3mm"
            },
            {
              parameter: "Sur largeur",
              value: "±3mm"
            },
            {
              parameter: "Sur équerrage",
              value: "±3mm"
            }
          ]
        },
        subsection_coefficient_isolation: {
          heading: "Coefficient d'isolation thermique",
          table: {
            headers: ["Epaisseur en mm", "30", "35", "40", "60"],
            rows: [
              {
                unit: "W/m²K",
                values: [0.55, 0.49, 0.44, 0.31]
              },
              {
                unit: "Kcal/m²h°C",
                values: [0.48, 0.43, 0.38, 0.27]
              }
            ]
          }
        },
        subsection_dimensionnement: {
          heading: "Dimensionnement du panneau",
          table: {
            headers: ["Type", "Longueur (mm)", "Largeur standard (mm)", "Epaisseur (mm)", "Poids kg/m²"],
            rows: [
              {
                type: "LL70",
                longueur: 15400,
                largeur: 1000,
                epaisseur: 30,
                poids: 10.3
              },
              {
                type: "LL75",
                longueur: 15400,
                largeur: 1000,
                epaisseur: 35,
                poids: 10.5
              },
              {
                type: "LL80",
                longueur: 15400,
                largeur: 1000,
                epaisseur: 40,
                poids: 10.7
              },
              {
                type: "LL100",
                longueur: 15400,
                largeur: 1000,
                epaisseur: 60,
                poids: 11.5
              }
            ]
          }
        }
      },
      section2_etancheite_sens: {
        subsection_etancheite_rives: {
          heading: "Etanchéité des rives",
          content: "Les panneaux sandwichs de couverture présentent une rive mâle (avec mousse) et une nervure femelle (sans mousse) permettant un assemblage par emboîtement. La nervure mâle est fermée par une bande adhésive. et la nervure femelle d'un joint d'étanchéité à l'air"
        },
        subsection_sens_panneaux: {
          heading: "Sens des panneaux",
          content: "les panneaux sandwichs de couverture sont désignés en fonction de leur situation sur l'ouvrage et par rapport à la direction des vents dominants. Un panneau est de type droit si la nervure de la rive longitudinale femelle venant en recouvrement en regardant le faîtage. Il est de type gauche dans le sens inverse."
        }
      },
      section3_pose_installation: {
        title: "La pose de panneaux sandwichs",
        subsection_decoupage: {
          heading: "Découpage des panneaux :",
          instruction: "Pour avoir un bon résultat il est conseillé d'utiliser une scie sauteuse électrique à lame d'acier."
        },
        subsection_fixation: {
          heading: "Fixation des panneaux :",
          instruction: "Les panneaux doivent être rivés au sommet de chaque nervure sur les pannes d'extrémité. Sur les pannes intermédiaires. lors de la pose. les panneaux doivent être serrés sur la partie Longitudinale afin que le joint d'étanchéité à l'air remplisse son effet. Il est recommandé d'utiliser un joint d'étanchéité à l'air avec une face adhésive sur les faces d'appuis du panneau situées sur les pannes d'extrémité. les chéneaux. les gouttières, les recouvrements."
        }
      },
      section4_charges_portees: {
        title: "LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m)",
        subtitle: "Tôle en acier épaisseur 0.5mm",
        table_principale: {
          structure: {
            header_row_1: {
              col1: "Charge utile uniformément répartie",
              col2: "Epaisseur du panneau en mm",
              col3: "Epaisseur du panneau en mm"
            },
            header_row_2: {
              col1_subheaders: ["Kg/m²", "daN/m²"],
              col2_subheaders: ["30", "35", "40", "60"],
              col2_label: "Entraxe Max cm",
              col3_subheaders: ["30", "35", "40", "60"],
              col3_label: "Entraxe Max cm"
            }
          },
          data_rows: [
            {
              kg_m2: 80,
              dan_m2: 87,
              group1: {
                ep_30: 345,
                ep_35: 365,
                ep_40: 390,
                ep_60: 485
              },
              group2: {
                ep_30: 400,
                ep_35: 425,
                ep_40: 455,
                ep_60: 560
              }
            },
            {
              kg_m2: 120,
              dan_m2: 177,
              group1: {
                ep_30: 290,
                ep_35: 310,
                ep_40: 335,
                ep_60: 415
              },
              group2: {
                ep_30: 345,
                ep_35: 365,
                ep_40: 390,
                ep_60: 485
              }
            },
            {
              kg_m2: 150,
              dan_m2: 147,
              group1: {
                ep_30: 265,
                ep_35: 285,
                ep_40: 305,
                ep_60: 375
              },
              group2: {
                ep_30: 315,
                ep_35: 335,
                ep_40: 355,
                ep_60: 440
              }
            },
            {
              kg_m2: 200,
              dan_m2: 196,
              group1: {
                ep_30: 235,
                ep_35: 250,
                ep_40: 270,
                ep_60: 340
              },
              group2: {
                ep_30: 285,
                ep_35: 305,
                ep_40: 325,
                ep_60: 400
              }
            },
            {
              kg_m2: 250,
              dan_m2: 245,
              group1: {
                ep_30: 210,
                ep_35: 225,
                ep_40: 245,
                ep_60: 305
              },
              group2: {
                ep_30: 255,
                ep_35: 275,
                ep_40: 295,
                ep_60: 360
              }
            }
          ]
        }
      },
      section5_caracteristiques_geometriques: {
        title: "Caractéristiques Géométriques",
        diagram_description: "Schéma en coupe transversale montrant le profil du panneau sandwich de couverture avec 5 ondes",
        caption: "Couverture avec 5 ondes"
      }
    },
    layoutInstructions: {
      pageLayout: "two_column",
      leftColumn: {
        width: "45%",
        sections: [
          "section1_caracteristiques",
          "section2_etancheite_sens"
        ]
      },
      rightColumn: {
        width: "55%",
        sections: [
          "section3_pose_installation",
          "section4_charges_portees",
          "section5_caracteristiques_geometriques"
        ]
      },
      stylingGuidelines: {
        colors: {
          primary: "#C41E3A",
          secondary: "#808080",
          tableHeader: "#C41E3A",
          tableSubHeader: "#A8A8A8",
          tableAlternateRow: "#E8E8E8"
        },
        typography: {
          mainTitle: {
            size: "18px",
            weight: "bold",
            color: "#C41E3A"
          },
          sectionHeading: {
            size: "14px",
            weight: "bold",
            color: "#000000"
          },
          bodyText: {
            size: "11px",
            weight: "normal",
            color: "#000000"
          }
        },
        tables: {
          borderColor: "#000000",
          cellPadding: "8px",
          headerBackground: "#C41E3A",
          headerTextColor: "#FFFFFF"
        }
      }
    }
  },
  bardage: {
    documentMetadata: {
      productCategory: "2 – PANNEAUX SANDWICHS DE BARDAGE",
      pageNumber: 18,
      language: "fr",
      documentType: "Fiche Technique"
    },
    productSpecifications: {
      title: "CARACTÉRISTIQUE PRODUIT",
      utilisation: {
        heading: "Utilisation",
        description: "Les panneaux sandwichs de bardage sont utilisés pour :",
        applications: [
          "Atelier de production.",
          "Entrepôts.",
          "Bâtiments industriels & modulaires.",
          "Centres commerciaux.",
          "Complexes sportifs.",
          "Ensembles scolaires et universitaires."
        ]
      },
      definition: {
        heading: "Définition",
        specifications: [
          { parameter: "Identification d’acier", value: "Nuance S250, S280, S320" },
          { parameter: "Profil", value: "Profil à nervurations en faible profondeur, pour le type lisse pas de nervurations." },
          { parameter: "Épaisseur", value: "0,5mm – 0,6mm – 0,7mm (selon la demande du client)" }
        ]
      },
      revetement: {
        heading: "Revêtement",
        specifications: [
          { material: "polyester pour la face extérieure : 25 µm" },
          { material: "polyester pour la face intérieure : 7 µm" }
        ]
      },
      ameIsolante: {
        heading: "Âme isolante",
        type: "Mousse polyuréthane rigide sans CFC (avec du N-Pentane)",
        conductiviteThermique: "λ = 0,023 W/m.°C",
        densite: "≈ 38/41 kg/m³"
      },
      caracteristiquesTechniques: {
        conductiviteThermique: { label: "Conductivité thermique", value: "λ = 0,023 W/m.°C" },
        densite: { label: "Densité (kg/m³)", value: "≈ 38/41 kg/m³" },
        reactionAuFeu: {
          label: "Réaction au feu",
          classifications: ["B3 : standard", "B.S2.d0"]
        }
      },
      tolerance: {
        heading: "Tolérance sur panneaux",
        tolerances: [
          { parameter: "Sur épaisseur", value: "±3mm" },
          { parameter: "Sur longueur", value: "±3mm" },
          { parameter: "Sur largeur", value: "±3mm" },
          { parameter: "Sur épaisseur", value: "±3mm" }
        ]
      },
      coefficientIsolationThermique: {
        heading: "Coefficient d’isolation thermique",
        table: {
          headers: {
            epaisseur_mm: [30, 35, 40, 50, 60]
          },
          data: [
            { unit: "W/m².K", values: { "30": "0.55", "35": "0.50", "40": "0.45", "50": "0.39", "60": "0.35" } },
            { unit: "Kcal/m².h.°C", values: { "30": "0.47", "35": "0.43", "40": "0.40", "50": "0.33", "60": "0.30" } }
          ]
        }
      },
      dimensionnementDuPanneau: {
        heading: "Dimensionnement du panneau",
        table: {
          headers: ["Type", "Longueur (mm)", "Largeur utile (mm)", "Epaisseur (mm)", "Poids (kg/m²)"],
          data: [
            { type: "LL30", longueur_mm: 15400, largeur_utile_mm: 1000, epaisseur_mm: 30, poids_kg_m2: 9.6 },
            { type: "LL35", longueur_mm: 15400, largeur_utile_mm: 1000, epaisseur_mm: 35, poids_kg_m2: 9.8 },
            { type: "LL40", longueur_mm: 15400, largeur_utile_mm: 1000, epaisseur_mm: 40, poids_kg_m2: 10.2 },
            { type: "LL50", longueur_mm: 15400, largeur_utile_mm: 1000, epaisseur_mm: 50, poids_kg_m2: 10.4 },
            { type: "LL60", longueur_mm: 15400, largeur_utile_mm: 1000, epaisseur_mm: 60, poids_kg_m2: 10.8 }
          ]
        }
      }
    },
    installationInformation: {
      etancheiteDesRives: {
        heading: "Étanchéité des rives",
        paragraphs: [
          "Les panneaux sandwichs de bardages présentent une rive mâle et une rive femelle permettant un assemblage par emboîtement.",
          "Les nervures mâle et femelle sont fermées par une bande adhésive.",
          "Tous les panneaux bardage sont munis sur la nervure femelle d’un joint d’étanchéité à l’air ; leurs parements pré-laqués sont protégés par un film adhésif à retirer à la pose."
        ]
      }
    },
    chargesEtPorteesAdmissibles: {
      title: "LES CHARGES ET PORTÉES ADMISSIBLES AU COULAGE (kg/m²)",
      subtitle: "Tôle en acier épaisseur 0,5mm",
      tableStructure: {
        mainHeaders: {
          col1: "Charge utile uniformément répartie",
          col2: "Kg/m²",
          col3: "daN/m²",
          col4: "Épaisseur du panneau en mm"
        },
        subHeaders: {
          epaisseurGroup1Label: "Entraxe Max cm",
          epaisseurGroup1: [30, 35, 40, 50, 60],
          epaisseurGroup2Label: "Entraxe Max cm",
          epaisseurGroup2: [30, 35, 40, 50, 60]
        }
      },
      tableData: [
        { kg_m2: 60, dan_m2: 58, entraxeGroup1: { ep30: 285, ep35: 315, ep40: 345, ep50: 405, ep60: 425 }, entraxeGroup2: { ep30: 455, ep35: 505, ep40: 550, ep50: 560, ep60: 0 } },
        { kg_m2: 80, dan_m2: 78, entraxeGroup1: { ep30: 255, ep35: 285, ep40: 315, ep50: 345, ep60: 375 }, entraxeGroup2: { ep30: 405, ep35: 445, ep40: 490, ep50: 495, ep60: 0 } },
        { kg_m2: 100, dan_m2: 98, entraxeGroup1: { ep30: 235, ep35: 265, ep40: 300, ep50: 335, ep60: 375 }, entraxeGroup2: { ep30: 385, ep35: 410, ep40: 460, ep50: 470, ep60: 0 } },
        { kg_m2: 120, dan_m2: 117, entraxeGroup1: { ep30: 225, ep35: 255, ep40: 280, ep50: 310, ep60: 355 }, entraxeGroup2: { ep30: 360, ep35: 385, ep40: 430, ep50: 450, ep60: 0 } },
        { kg_m2: 140, dan_m2: 137, entraxeGroup1: { ep30: 205, ep35: 225, ep40: 250, ep50: 285, ep60: 340 }, entraxeGroup2: { ep30: 340, ep35: 370, ep40: 420, ep50: 430, ep60: 0 } },
        { kg_m2: 160, dan_m2: 156, entraxeGroup1: { ep30: 195, ep35: 215, ep40: 235, ep50: 280, ep60: 325 }, entraxeGroup2: { ep30: 325, ep35: 345, ep40: 370, ep50: 370, ep60: 0 } }
      ]
    },
    caracteristiquesGeometriques: {
      title: "Caractéristiques Géométriques",
      notes: "schéma technique visible sur référence image",
      diagrams: [
        { caption: "Panneaux sandwichs de bardage nervuré/nervuré", description: "Schéma technique A" },
        { caption: "Panneaux sandwichs de bardage lisse/nervuré", description: "Schéma technique B" }
      ]
    },
    stylingGuidelines: {
      colors: {
        primary: "#C41E3A",
        secondary: "#808080",
        tableHeader: "#C41E3A",
        subHeaderBackground: "#808080"
      }
    }
  },
  frigorifique: {
    title: '3-PANNEAUX SANDWICHS FRIGORIFIQUE',
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
    },
    pose: {
        title: 'La pose de panneaux sandwichs',
        decoupage: "Pour avoir un bon résultat il est conseillé d'utiliser une scie sauteuse électrique à lame d'acier.",
        fixation: "Les panneaux doivent être fixés au sommet de chaque nervure sur les pannes d'extrémité, Sur les pannes intermédiaires. Lors de la pose, les panneaux doivent être serrés sur la partie Longitudinale afin que le joint d'étanchéité à l'air remplisse son effet, Il est recommandé d'utiliser un joint d'étanchéité à l'air avec une face adhésive sur les faces d'appuis du panneau situées sur les pannes d'extrémité, les chéneaux, les gouttières, les recouvrements."
    },
    etancheite: "Les panneaux sandwichs de bardages présentent une rive mâle et une rive femelle permettant un assemblage par emboitement. Les nervures mâle et femelle sont fermées par une bande adhésive. Tous les panneaux bardage sont munis sur la nervure femelle d'un joint d'étanchéité à l'air; leurs parements pré-laqués sont protégés par un film adhésif à retirer à la pose."
  },
  toleNervuree: {
    title: '4-TÔLE NERVURÉE',
    subtitle: 'TOLE NERVURÉE TN40 & PLANCHER COLLABORANT "HI-BOND 77"',
    features: {
        utilisation: [
            'Bâtiments industriels',
            'Ateliers de production',
            'Entrepôts agricoles',
            'Centres commerciaux',
            'Coffrage et armature de dalles béton',
        ],
        revetement: 'Sans spécifications particulière les profils nervurés sont livrés en qualité standard. Galvanisé seul qualité Z200. Galvanisé pré-laqué, face extérieure finition laquée polyester ép. 25µ',
        reactionAuFeu: 'Classement de réaction au feu M0',
        miseEnOeuvre: {
            title: "Mise en œuvre",
            manutention: "Manutention : Les profils ne doivent pas être choqué ou griffés pour éviter toute mise à nu du métal."
        },
    },
    tables: {
        dimensionnement: {
            title: 'TÔLE NERVURÉE TN40',
            headers: ['Type', 'Longueur (ml)', 'Largueur standard (mm)', 'Epaisseurs (mm)', 'Poids (kg/m2)', 'I (cm4/m)', 'W (cm3/m)', 'Système de revêtement'],
            rows: [
                { 'Type': 'TN 40', 'Longueur (ml)': 15000, 'Largueur standard (mm)': 1000, details: [
                    { 'Epaisseurs (mm)': 0.50, 'Poids (kg/m2)': 4.91, 'I (cm4/m)': 12.3, 'W (cm3/m)': 3.92, 'Système de revêtement': 'Galvanisée' },
                    { 'Epaisseurs (mm)': 0.60, 'Poids (kg/m2)': 5.90, 'I (cm4/m)': 16.05, 'W (cm3/m)': 5.30, 'Système de revêtement': 'Galvanisée' },
                    { 'Epaisseurs (mm)': 0.70, 'Poids (kg/m2)': 6.88, 'I (cm4/m)': 18.72, 'W (cm3/m)': 6.18, 'Système de revêtement': 'Galvanisée' },
                    { 'Epaisseurs (mm)': 1.00, 'Poids (kg/m2)': 9.81, 'I (cm4/m)': 26.75, 'W (cm3/m)': 8.83, 'Système de revêtement': 'Galvanisée' },
                ]},
            ]
        },
        chargesPortees: {
            title: "Tableau de charges et portées admissibles",
            subtitle: "Charges uniformément réparties exprimées en KN/m²",
            headers: ['EP (mm)', '1 appui', '2 appuis'],
            subheaders: { '1 appui': [1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.25], '2 appuis': [1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.25] },
            rows: [
              { 'EP (mm)': '0.5', '1 appui': [439, 281, 185, 143, 109, 86, 63, 47, 36, '-'], '2 appuis': [570, 365, 252, 180, 141, 111, 90, 67, 51, 40] },
              { 'EP (mm)': '0.6', '1 appui': [614, 393, 273, 200, 153, 115, 84, 63, 48, 38], '2 appuis': [768, 491, 341, 251, 192, 152, 123, 101, 81, 64] },
              { 'EP (mm)': '0.7', '1 appui': [716, 458, 318, 234, 179, 135, 98, 73, 57, ''], '2 appuis': [896, 573, 398, 292, 224, 177, 143, 118, 95, 74] },
              { 'EP (mm)': '1.0', '1 appui': ['', '', '', '', '', '', '', '', '', ''], '2 appuis': [1280, 819, 569, 418, 320, 253, 204, 169, 135, 106] }
            ],
        },
    },
  },
  hibond: {
    title: '5-PLANCHER COLLABORANT "HI-BOND 77"',
    features: {
        avantages: [
            'Rapidité de pose.',
            'Participe à la structure de la dalle béton.',
            'Idéal en construction et rénovation.',
        ],
        application: 'Coffrage et armature de dalles béton',
        revetement: "Sans spécifications particulières, les profils nervurés sont livrés en qualité standard.\nTypes:\n- Galvanisé seul: qualité Z200\n- Galvanisé pré-laqué: Face extérieure Finition laquée polyester ép. 25µ",
        reactionAuFeu: 'Classement de réaction au feu M0',
    },
    tables: {
        dimensionnement: {
            title: 'PLANCHER COLLABORANT HI-BOND 77',
            headers: ['Type', 'Longueur (ml)', 'Largeur standard (mm)', 'Épaisseurs (mm)', 'Poids (kg/m2)', 'Système de revêtement'],
            rows: [
                {
                    'type': "Plancher collaborant HI-BOND 77 Galvanisé",
                    'longueur': 15000,
                    'largeur_standard': 732,
                    'epaisseurs': [
                      { "valeur_mm": 0.70, "poids_kg_m2": 9.17 },
                      { "valeur_mm": 1.00, "poids_kg_m2": 13.10 },
                      { "valeur_mm": 1.50, "poids_kg_m2": 19.66 }
                    ],
                    'revetement_systeme': "Galvanisée"
                },
                {
                    'type': "Plancher collaborant HI-BOND 77 Pré laqué",
                    'longueur': 15000,
                    'largeur_standard': 732,
                    'epaisseurs': [
                        { "valeur_mm": 0.70, "poids_kg_m2": 9.17 },
                        { "valeur_mm": 1.00, "poids_kg_m2": 13.10 },
                        { "valeur_mm": 1.50, "poids_kg_m2": 19.66 }
                    ],
                    'revetement_systeme': "Pré laqué"
                }
            ]
        },
        proprietes: {
            "title": "Propriétés de la tôle HI-BOND 77",
            "headers": ["ÉP (mm)", "Poids (Kg/m)", "Haut de la tôle en compression", "Bas de la tôle en compression", "Cisaillement voilement"],
            "subheaders": {
                "Haut de la tôle en compression": ["Lx (Cm4)", "Zx-top (Cm3)", "Zx-bot (Cm3)", "Ma (Kn.m)"],
                "Bas de la tôle en compression": ["Lx (Cm4)", "Zx-top (Cm3)", "Zx-bot (Cm3)", "Ma (Kn.m)"],
                "Cisaillement voilement": ["Va (KN)", "Pa (KN)"]
            },
            "rows": [
                {
                    "epaisseur": 0.70,
                    "poids": 6.87,
                    "haut_compression": { "Lx": 83.27, "Zx_top": 14.34, "Zx_bot": 18.87, "Ma": 2.32 },
                    "bas_compression": { "Lx": 83.27, "Zx_top": 21.16, "Zx_bot": 16.56, "Ma": 2.68 },
                    "cisaillement_voilement": { "Va": 22.18, "Pa": 11.28 }
                },
                {
                    "epaisseur": 1.00,
                    "poids": 9.81,
                    "haut_compression": { "Lx": 119.0, "Zx_top": 23.34, "Zx_bot": 27.87, "Ma": 3.77 },
                    "bas_compression": { "Lx": 119.0, "Zx_top": 31.03, "Zx_bot": 26.74, "Ma": 4.32 },
                    "cisaillement_voilement": { "Va": 51.37, "Pa": 21.83 }
                },
                {
                    "epaisseur": 1.50,
                    "poids": 14.72,
                    "haut_compression": { "Lx": 178.0, "Zx_top": 41.11, "Zx_bot": 43.20, "Ma": 6.65 },
                    "bas_compression": { "Lx": 178.0, "Zx_top": 47.27, "Zx_bot": 43.73, "Ma": 7.07 },
                    "cisaillement_voilement": { "Va": 91.16, "Pa": 45.20 }
                }
            ]
        },
        chargesPortees: {
            "table_title": "Tableau des charges sur la tôle HI-BOND 77 (kN/m²)",
            "espacements_header": [1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.50],
            "rows": [
              { "epaisseur_mm": 0.70, "nombre_espacement": 1, "cas": "G+Q", "valeurs": [18.55, 11.87, 8.25, 6.06, 4.64, 3.66, 2.97, 2.45, 2.06, 1.51] },
              { "epaisseur_mm": 0.70, "nombre_espacement": 2, "cas": "", "valeurs": [9.02, 7.22, 6.02, 5.16, 4.51, 4.01, 3.43, 2.83, 2.38, 1.75] },
              { "epaisseur_mm": 0.70, "nombre_espacement": 3, "cas": "", "valeurs": [10.26, 8.21, 6.84, 5.87, 5.13, 4.56, 4.11, 3.54, 2.98, 2.19] },
              { "epaisseur_mm": 1.00, "nombre_espacement": 1, "cas": "G+Q", "valeurs": [30.16, 19.30, 13.40, 9.85, 7.54, 5.96, 4.83, 3.99, 3.35, 2.44] },
              { "epaisseur_mm": 1.00, "nombre_espacement": 2, "cas": "", "valeurs": [17.46, 13.97, 11.64, 9.98, 8.64, 6.83, 5.53, 4.50, 3.84, 2.82] },
              { "epaisseur_mm": 1.00, "nombre_espacement": 3, "cas": "", "valeurs": [19.87, 15.89, 13.24, 11.35, 9.93, 8.53, 6.91, 5.71, 4.80, 3.53] },
              { "epaisseur_mm": 1.50, "nombre_espacement": 1, "cas": "G+Q", "valeurs": [53.20, 34.05, 23.64, 17.37, 13.30, 10.57, 8.51, 7.03, 5.80, 3.65] },
              { "epaisseur_mm": 1.50, "nombre_espacement": 2, "cas": "", "valeurs": [36.16, 28.93, 24.11, 18.47, 14.40, 11.17, 9.05, 7.48, 6.28, 4.26] },
              { "epaisseur_mm": 1.50, "nombre_espacement": 3, "cas": "", "valeurs": [41.13, 32.91, 27.42, 23.09, 17.68, 13.97, 11.31, 9.35, 7.86, 5.77] }
            ]
        }
    },
  },
  finitions: {
    title: '6-PIÈCES DE FINITION',
    features: {
        finitions: [
            { name: 'Bande De Rive Sur Mur', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/bande-de-rive.png', aiHint: 'wall edge band' } },
            { name: 'Angle Droit', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/angle-droit.png', aiHint: 'right angle' } },
            { name: 'Bavette Rejet D\'eau', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/bavette-rejet-eau.png', aiHint: 'water drip flashing' } },
            { name: 'Cornière D\'angle Extérieur', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/corniere-exterieur.png', aiHint: 'external corner angle' } },
            { name: 'Cornière D\'angle Intérieur', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/corniere-interieur.png', aiHint: 'internal corner angle' } },
            { name: 'Faîtière', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/faitiere.png', aiHint: 'ridge cap' } },
            { name: 'Sous Faitière', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/sous-faitiere.png', aiHint: 'under ridge' } },
            { name: 'U De Sol', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/u-de-sol.png', aiHint: 'u-profile floor' } },
        ]
    }
  },
};
