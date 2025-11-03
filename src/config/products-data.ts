

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
    },
    image: {
      src: 'https://images.unsplash.com/photo-1614003013812-e397300cd764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzdGVlbCUyMGNvdmVyfGVufDB8fHx8MTc1NjcxODU1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
      aiHint: 'metal sheets',
    },
    galleryImages: [
      { src: 'https://i.pinimg.com/1200x/44/25/ab/4425ab23a5683c6aeff341a8ed0003ea.jpg', alt: 'Panneaux sandwichs de couverture', aiHint: 'roofing sandwich panels' },
      { src: 'https://i.pinimg.com/1200x/ff/96/da/ff96daf1373a332efc6a83bf1d6d83eb.jpg', alt: 'Implementation of roofing panels 1', aiHint: 'roofing panels implementation' },
      { src: 'https://i.pinimg.com/1200x/11/77/f4/1177f4454ac3659e9619a578a1610bfe.jpg', alt: 'Implementation of roofing panels 2', aiHint: 'roofing panels building' },
      { src: 'https://i.pinimg.com/736x/76/d6/80/76d680d6fdc50e1f996f5fe8ccc5029d.jpg', alt: 'Hi-Bond 77 Decking Profile', aiHint: 'decking profile' },
      { src: 'https://i.pinimg.com/736x/54/07/5f/54075f273eeb525e1b437731729f78d9.jpg', alt: 'Hi-Bond 77 Installation', aiHint: 'decking installation' },
      { src: 'https://i.pinimg.com/736x/89/36/d0/8936d00071d42e9079330a38d68f11ea.jpg', alt: 'Hi-Bond 77 Finished Floor', aiHint: 'composite floor' },
      { src: 'https://i.pinimg.com/736x/dd/f2/2e/ddf22eb450691c04b8be2f5dd21cbdaa.jpg', alt: 'Tôle nervurée 1', aiHint: 'ribbed steel sheet' },
      { src: 'https://i.pinimg.com/736x/bc/d7/68/bcd7680b25db47d125f6087409effe4b.jpg', alt: 'Tôle nervurée 2', aiHint: 'metal sheets' },
      { src: 'https://i.pinimg.com/736x/14/f4/3d/14f43d2f6b0012aeccf4ce2b6702d3aa.jpg', alt: 'Tôle nervurée 3', aiHint: 'architectural detail' }
    ]
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
    },
    galleryImages: [
      { src: 'https://i.pinimg.com/736x/8f/f4/7e/8ff47e67584c31185b37265551943445.jpg', alt: 'Bardage panel detail', aiHint: 'building facade' },
      { src: 'https://i.pinimg.com/736x/a2/2a/7c/a22a7c8e9b62f8350f38010375a7c295.jpg', alt: 'Industrial building with sandwich panels', aiHint: 'industrial building' },
      { src: 'https://i.pinimg.com/1200x/44/25/ab/4425ab23a5683c6aeff341a8ed0003ea.jpg', alt: 'Panneaux sandwichs de couverture', aiHint: 'roofing sandwich panels' },
      { src: 'https://i.pinimg.com/1200x/ff/96/da/ff96daf1373a332efc6a83bf1d6d83eb.jpg', alt: 'Implementation of roofing panels 1', aiHint: 'roofing panels implementation' },
      { src: 'https://i.pinimg.com/1200x/11/77/f4/1177f4454ac3659e9619a578a1610bfe.jpg', alt: 'Implementation of roofing panels 2', aiHint: 'roofing panels building' },
      { src: 'https://i.pinimg.com/736x/76/d6/80/76d680d6fdc50e1f996f5fe8ccc5029d.jpg', alt: 'Hi-Bond 77 Decking Profile', aiHint: 'decking profile' },
      { src: 'https://i.pinimg.com/736x/54/07/5f/54075f273eeb525e1b437731729f78d9.jpg', alt: 'Hi-Bond 77 Installation', aiHint: 'decking installation' },
      { src: 'https://i.pinimg.com/736x/89/36/d0/8936d00071d42e9079330a38d68f11ea.jpg', alt: 'Hi-Bond 77 Finished Floor', aiHint: 'composite floor' },
      { src: 'https://i.pinimg.com/736x/dd/f2/2e/ddf22eb450691c04b8be2f5dd21cbdaa.jpg', alt: 'Tôle nervurée 1', aiHint: 'ribbed steel sheet' }
    ]
  },
  frigorifique: {
    title: '3-PANNEAUX SANDWICHS FRIGORIFIQUE',
    subtitle: '',
    image: {
        src: '/images/product-imgaes/sandwich-panels/sandwich pannel.png',
        aiHint: 'refrigeration panels',
    },
    galleryImages: [
      { src: 'https://i.pinimg.com/736x/07/7a/84/077a84358a9015c9e2b49c7173268b84.jpg', alt: 'Cold room panels', aiHint: 'cold storage' },
      { src: 'https://i.pinimg.com/736x/1a/7c/7b/1a7c7b80e466b0d911b3b27c3f3a5f82.jpg', alt: 'Refrigerated warehouse construction', aiHint: 'warehouse construction' },
      { src: 'https://i.pinimg.com/1200x/44/25/ab/4425ab23a5683c6aeff341a8ed0003ea.jpg', alt: 'Panneaux sandwichs de couverture', aiHint: 'roofing sandwich panels' },
      { src: 'https://i.pinimg.com/1200x/ff/96/da/ff96daf1373a332efc6a83bf1d6d83eb.jpg', alt: 'Implementation of roofing panels 1', aiHint: 'roofing panels implementation' },
      { src: 'https://i.pinimg.com/1200x/11/77/f4/1177f4454ac3659e9619a578a1610bfe.jpg', alt: 'Implementation of roofing panels 2', aiHint: 'roofing panels building' },
      { src: 'https://i.pinimg.com/736x/76/d6/80/76d680d6fdc50e1f996f5fe8ccc5029d.jpg', alt: 'Hi-Bond 77 Decking Profile', aiHint: 'decking profile' },
      { src: 'https://i.pinimg.com/736x/54/07/5f/54075f273eeb525e1b437731729f78d9.jpg', alt: 'Hi-Bond 77 Installation', aiHint: 'decking installation' },
      { src: 'https://i.pinimg.com/736x/89/36/d0/8936d00071d42e9079330a38d68f11ea.jpg', alt: 'Hi-Bond 77 Finished Floor', aiHint: 'composite floor' },
      { src: 'https://i.pinimg.com/736x/dd/f2/2e/ddf22eb450691c04b8be2f5dd21cbdaa.jpg', alt: 'Tôle nervurée 1', aiHint: 'ribbed steel sheet' }
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
    subtitle: 'TOLE NERVURÉE TN40 & PLANCHER COLLABORANT "HI-BOND 77"',
     image: {
      src: 'https://images.unsplash.com/photo-1706029831375-c090c70c161d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxtZXRhbCUyMHNoZWV0JTIwfGVufDB8fHx8MTc1NTA5MDY2OHww&ixlib=rb-4.1.0&q=80&w=1080',
      aiHint: 'ribbed steel sheet',
    },
    galleryImages: [
      { src: 'https://i.pinimg.com/736x/74/23/ad/7423ad08020ee23291bdfb37d81af2b7.jpg', alt: 'Tôle nervurée 1', aiHint: 'ribbed steel sheet' },
      { src: 'https://i.pinimg.com/474x/15/b2/92/15b29294e02d11486c212e6fd345dd45.jpg', alt: 'Tôle nervurée 2', aiHint: 'metal sheets' },
      { src: 'https://i.pinimg.com/474x/62/77/fe/6277feb19192dabb46590e94f650efbe.jpg', alt: 'Tôle nervurée 3', aiHint: 'architectural detail' },
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
              src: '/media/hi-bond-77/hi-bond-geometrie.png',
              aiHint: 'geometric characteristics diagram',
              blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nAFoAJf/AXV1df+vr6//i4uL/83NzeUAcnJy/3l5ef+3t7f/goKC/wB6enr/ioqK/9bW1v84ODj/PPO09K2pZSsAAAAASUVORK5CYII='"
            }
        },
        avantages: [
            'Rapidité de pose.',
            'Participe à la structure de la dalle béton.',
            'Idéal en construction et rénovation.',
        ],
        application: 'Coffrage et armature de dalles béton',
        finitions: [
            { name: 'Bande de rive sur mur', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/bande-de-rive.png', aiHint: 'wall edge band', blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nAFoAJf/AXV1df+vr6//i4uL/83NzeUAcnJy/3l5ef+3t7f/goKC/wB6enr/ioqK/9bW1v84ODj/PPO09K2pZSsAAAAASUVORK5CYII=' } },
            { name: 'Angle droit', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/angle-droit.png', aiHint: 'right angle', blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nAFoAJf/AXV1df+vr6//i4uL/83NzeUAcnJy/3l5ef+3t7f/goKC/wB6enr/ioqK/9bW1v84ODj/PPO09K2pZSsAAAAASUVORK5CYII=' } },
            { name: 'Bavette rejet d\'eau', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/bavette-rejet-eau.png', aiHint: 'water drip flashing', blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nAFoAJf/AXV1df+vr6//i4uL/83NzeUAcnJy/3l5ef+3t7f/goKC/wB6enr/ioqK/9bW1v84ODj/PPO09K2pZSsAAAAASUVORK5CYII=' } },
            { name: 'Sous faitière', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/sous-faitiere.png', aiHint: 'under ridge', blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nAFoAJf/AXV1df+vr6//i4uL/83NzeUAcnJy/3l5ef+3t7f/goKC/wB6enr/ioqK/9bW1v84ODj/PPO09K2pZSsAAAAASUVORK5CYII=' } },
            { name: 'Cornière d\'angle intérieur', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/corniere-interieur.png', aiHint: 'internal corner angle', blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nAFoAJf/AXV1df+vr6//i4uL/83NzeUAcnJy/3l5ef+3t7f/goKC/wB6enr/ioqK/9bW1v84ODj/PPO09K2pZSsAAAAASUVORK5CYII=' } },
            { name: 'Cornière d\'angle extérieur', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/corniere-exterieur.png', aiHint: 'external corner angle', blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nAFoAJf/AXV1df+vr6//i4uL/83NzeUAcnJy/3l5ef+3t7f/goKC/wB6enr/ioqK/9bW1v84ODj/PPO09K2pZSsAAAAASUVORK5CYII=' } },
            { name: 'Faîtière', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/faitiere.png', aiHint: 'ridge cap', blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nAFoAJf/AXV1df+vr6//i4uL/83NzeUAcnJy/3l5ef+3t7f/goKC/wB6enr/ioqK/9bW1v84ODj/PPO09K2pZSsAAAAASUVORK5CYII=' } },
            { name: 'U de sol acier galvanisé', length: 'Long. Std. 3m à 6m', image: { src: '/media/finitions/u-de-sol.png', aiHint: 'galvanized steel U-profile', blurDataURL: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nAFoAJf/AXV1df+vr6//i4uL/83NzeUAcnJy/3l5ef+3t7f/goKC/wB6enr/ioqK/9bW1v84ODj/PPO09K2pZSsAAAAASUVORK5CYII=' } },
        ]
    },
    implementationImages: [
        { src: '/media/tole-nervuree/tole-impl-1.png', alt: 'Implementation of ribbed steel sheet 1', aiHint: 'ribbed steel sheet implementation' },
        { src: '/media/tole-nervuree/tole-impl-2.png', alt: 'Implementation of ribbed steel sheet 2', aiHint: 'ribbed steel sheet building' },
    ],
    tables: {
        isolation: { title: '', headers: [], rows: [] },
        dimensionnement: {
            title: 'TÔLE NERVURÉE TN40',
            headers: ['Type', 'Longueur (ml)', 'Largueur standard (mm)', 'Epaisseurs (mm)', 'Poids (kg/m2)', 'j', 'w', 'Système de revêtement'],
            rows: [
                { 'Type': 'TN 40 Galvanisée', 'Longueur (ml)': 15000, 'Largueur standard (mm)': 1000, details: [
                    { 'Epaisseurs (mm)': 0.50, 'Poids (kg/m2)': 4.88, j: '24.23', w: '5.20', 'Système de revêtement': 'Galvanisée' },
                    { 'Epaisseurs (mm)': 0.60, 'Poids (kg/m2)': 5.85, j: '29.35', w: '6.29', 'Système de revêtement': 'Galvanisée' },
                    { 'Epaisseurs (mm)': 0.70, 'Poids (kg/m2)': 6.83, j: '34.46', w: '7.38', 'Système de revêtement': 'Galvanisée' },
                ]},
                { 'Type': 'TN 40 Pré laqué', 'Longueur (ml)': 15000, 'Largueur standard (mm)': 1000, details: [
                    { 'Epaisseurs (mm)': 0.50, 'Poids (kg/m2)': 4.88, j: '24.23', w: '5.20', 'Système de revêtement': 'pré laqué' },
                    { 'Epaisseurs (mm)': 0.60, 'Poids (kg/m2)': 5.85, j: '29.35', w: '6.29', 'Système de revêtement': 'pré laqué' },
                    { 'Epaisseurs (mm)': 0.70, 'Poids (kg/m2)': 6.83, j: '34.46', w: '7.38', 'Système de revêtement': 'pré laqué' },
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
            porteeValues_m: [1.00, 1.25, 1.50, 1.75, 2.00, 2.25, 2.50, 2.75, 3.00, 3.50],
            rows: [
                { epaisseur_mm: '0.70', nombre_espacement: '1', cas: 'G+Q', valeurs: [18.55, 11.87, 8.25, 6.06, 4.64, 3.66, 2.97, 2.45, 2.06, 1.51] },
                { epaisseur_mm: '0.70', nombre_espacement: '2', cas: '', valeurs: [9.02, 7.22, 6.02, 5.16, 4.51, 4.01, 3.43, 2.83, 2.38, 1.75] },
                { epaisseur_mm: '0.70', nombre_espacement: '3', cas: '', valeurs: [10.26, 8.21, 6.84, 5.87, 5.13, 4.56, 4.11, 3.54, 2.98, 2.19] },
                { epaisseur_mm: '1.00', nombre_espacement: '1', cas: 'G+Q', valeurs: [30.16, 19.30, 13.40, 9.85, 7.54, 5.96, 4.83, 3.99, 3.35, 2.44] },
                { epaisseur_mm: '1.00', nombre_espacement: '2', cas: '', valeurs: [17.46, 13.97, 11.64, 9.98, 8.64, 6.83, 5.53, 4.50, 3.84, 2.82] },
                { epaisseur_mm: '1.00', nombre_espacement: '3', cas: '', valeurs: [19.87, 15.89, 13.24, 11.35, 9.93, 8.53, 6.91, 5.71, 4.80, 3.53] },
                { epaisseur_mm: '1.50', nombre_espacement: '1', cas: 'G+Q', valeurs: [53.20, 34.05, 23.64, 17.37, 13.30, 10.57, 8.51, 7.03, 5.80, 3.65] },
                { epaisseur_mm: '1.50', nombre_espacement: '2', cas: '', valeurs: [36.16, 28.93, 24.11, 18.47, 14.40, 11.17, 9.05, 7.48, 6.28, 4.26] },
                { epaisseur_mm: '1.50', nombre_espacement: '3', cas: '', valeurs: [41.13, 32.91, 27.42, 23.09, 17.68, 13.97, 11.31, 9.35, 7.86, 5.77] }
            ]
        },
        proprietes: {
            "title": "PROPRIÉTÉS DE LA TÔLE HI-BOND 77",
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
        }
    },
  },
  hibond: {
    title: '5-PLANCHER COLLABORANT "HI-BOND 77"',
    subtitle: '',
    image: { src: 'https://i.pinimg.com/736x/53/07/e6/5307e6787500b6efff734990a41772e5.jpg', aiHint: 'composite floor' },
    galleryImages: [
        { src: 'https://i.pinimg.com/736x/76/d6/80/76d680d6fdc50e1f996f5fe8ccc5029d.jpg', alt: 'Hi-Bond 77 Decking Profile', aiHint: 'decking profile' },
        { src: 'https://i.pinimg.com/736x/54/07/5f/54075f273eeb525e1b437731729f78d9.jpg', alt: 'Hi-Bond 77 Installation', aiHint: 'decking installation' },
        { src: 'https://i.pinimg.com/736x/89/36/d0/8936d00071d42e9079330a38d68f11ea.jpg', alt: 'Hi-Bond 77 Finished Floor', aiHint: 'composite floor' },
    ],
    features: {
        utilisation: [],
        avantages: [
            'Rapidité de pose.',
            'Participe à la structure de la dalle béton.',
            'Idéal en construction et rénovation.',
        ],
        application: 'Coffrage et armature de dalles béton',
        definition: { acier: '', parementExterne: {profil: '', description: '', epaisseur: ''}, parementInterne: {profil: '', epaisseur: ''}},
        revetement: "Sans spécifications particulières, les profils nervurés sont livrés en qualité standard.\nTypes:\n- Galvanisé seul: qualité Z200\n- Galvanisé pré-laqué: Face extérieure Finition laquée polyester ép. 25µ",
        ameIsolante: { type: '', conductivite: '', densite: ''},
        reactionAuFeu: 'Classement de réaction au feu M0',
        tolerance: [],
        miseEnOeuvre: { title: "", manutention: "" },
        caracteristiquesGeometriques: {
            title: "Caractéristiques Géométriques",
            image: {
              src: '/media/hi-bond-77/hi-bond-geometrie.png',
              aiHint: 'geometric characteristics diagram',
              blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAADCAYAAAC09K7GAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nAFoAJf/AXV1df+vr6//i4uL/83NzeUAcnJy/3l5ef+3t7f/goKC/wB6enr/ioqK/9bW1v84ODj/PPO09K2pZSsAAAAASUVORK5CYII='"
            }
        },
    },
    tables: {
        isolation: { title: '', headers: [], rows: [] },
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
              { "epaisseur_mm": 0.70, "cas": "G+Q", "nombre_espacement": 1, "valeurs": [18.55, 11.87, 8.25, 6.06, 4.64, 3.66, 2.97, 2.45, 2.06, 1.51] },
              { "epaisseur_mm": 0.70, "cas": "G+Q", "nombre_espacement": 2, "valeurs": [9.02, 7.22, 6.02, 5.16, 4.51, 4.01, 3.43, 2.83, 2.38, 1.75] },
              { "epaisseur_mm": 0.70, "cas": "G+Q", "nombre_espacement": 3, "valeurs": [10.26, 8.21, 6.84, 5.87, 5.13, 4.56, 4.11, 3.54, 2.98, 2.19] },
              { "epaisseur_mm": 1.00, "cas": "G+Q", "nombre_espacement": 1, "valeurs": [30.16, 19.30, 13.40, 9.85, 7.54, 5.96, 4.83, 3.99, 3.35, 2.44] },
              { "epaisseur_mm": 1.00, "cas": "G+Q", "nombre_espacement": 2, "valeurs": [17.46, 13.97, 11.64, 9.98, 8.64, 6.83, 5.53, 4.50, 3.84, 2.82] },
              { "epaisseur_mm": 1.00, "cas": "G+Q", "nombre_espacement": 3, "valeurs": [19.87, 15.89, 13.24, 11.35, 9.93, 8.53, 6.91, 5.71, 4.80, 3.53] },
              { "epaisseur_mm": 1.50, "cas": "G+Q", "nombre_espacement": 1, "valeurs": [53.20, 34.05, 23.64, 17.37, 13.30, 10.57, 8.51, 7.03, 5.80, 3.65] },
              { "epaisseur_mm": 1.50, "cas": "G+Q", "nombre_espacement": 2, "valeurs": [36.16, 28.93, 24.11, 18.47, 14.40, 11.17, 9.05, 7.48, 6.28, 4.26] },
              { "epaisseur_mm": 1.50, "cas": "G+Q", "nombre_espacement": 3, "valeurs": [41.13, 32.91, 27.42, 23.09, 17.68, 13.97, 11.31, 9.35, 7.86, 5.77] }
            ]
        }
    },
  },
  finitions: {
    title: '6-PIÈCES DE FINITION',
    subtitle: '',
    image: { src: '', aiHint: '' },
    galleryImages: [
      { src: 'https://i.pinimg.com/736x/28/14/75/28147544dd82d0c459d85954e48f1b83.jpg', alt: 'Bande De Rive Sur Mur', aiHint: 'wall edge band' },
      { src: 'https://i.pinimg.com/736x/52/70/4c/52704c1cb61fbec9f1ab6c2d24ef6b45.jpg', alt: 'Angle Droit', aiHint: 'right angle' },
      { src: 'https://i.pinimg.com/474x/7c/46/24/7c46241638e5e1c9cbe15dea25be9613.jpg', alt: 'Bavette Rejet D\'eau', aiHint: 'water drip flashing' },
      { src: 'https://i.pinimg.com/736x/dd/f2/2e/ddf22eb450691c04b8be2f5dd21cbdaa.jpg', alt: 'Tôle nervurée 1', aiHint: 'ribbed steel sheet' },
      { src: 'https://i.pinimg.com/736x/bc/d7/68/bcd7680b25db47d125f6087409effe4b.jpg', alt: 'Tôle nervurée 2', aiHint: 'metal sheets' },
      { src: 'https://i.pinimg.com/736x/14/f4/3d/14f43d2f6b0012aeccf4ce2b6702d3aa.jpg', alt: 'Tôle nervurée 3', aiHint: 'architectural detail' },
      { src: 'https://i.pinimg.com/736x/7b/d8/0d/7bd80d24cd588606ec1bb880432ce526.jpg', alt: 'Tôle nervurée 4', aiHint: 'stacked sheets' },
      { src: 'https://i.pinimg.com/1200x/44/25/ab/4425ab23a5683c6aeff341a8ed0003ea.jpg', alt: 'Panneaux sandwichs de couverture', aiHint: 'roofing sandwich panels' },
      { src: 'https://i.pinimg.com/1200x/ff/96/da/ff96daf1373a332efc6a83bf1d6d83eb.jpg', alt: 'Implementation of roofing panels 1', aiHint: 'roofing panels implementation' }
    ],
    features: {
        utilisation: [],
        avantages: [],
        application: '',
        definition: { acier: '', parementExterne: {profil: '', description: '', epaisseur: ''}, parementInterne: {profil: '', epaisseur: ''}},
        revetement: '',
        ameIsolante: { type: '', conductivite: '', densite: ''},
        reactionAuFeu: '',
        tolerance: [],
        miseEnOeuvre: { title: "", manutention: "" },
        finitions: [
            { name: 'Bande De Rive Sur Mur', length: 'Long. Std. 3m à 6m', image: { src: 'https://i.pinimg.com/736x/28/14/75/28147544dd82d0c459d85954e48f1b83.jpg', aiHint: 'wall edge band' } },
            { name: 'Angle Droit', length: 'Long. Std. 3m à 6m', image: { src: 'https://i.pinimg.com/736x/52/70/4c/52704c1cb61fbec9f1ab6c2d24ef6b45.jpg', aiHint: 'right angle' } },
            { name: 'Bavette Rejet D\'eau', length: 'Long. Std. 3m à 6m', image: { src: 'https://i.pinimg.com/474x/7c/46/24/7c46241638e5e1c9cbe15dea25be9613.jpg', aiHint: 'water drip flashing' } },
            { name: 'Cornière D\'angle Extérieur', length: 'Long. Std. 3m à 6m', image: { src: 'https://i.pinimg.com/736x/28/dd/e1/28dde1c98701028935e40ac4d9e2aeb0.jpg', aiHint: 'external corner angle' } },
            { name: 'Cornière D\'angle Intérieur', length: 'Long. Std. 3m à 6m', image: { src: 'https://i.pinimg.com/736x/28/dd/e1/28dde1c98701028935e40ac4d9e2aeb0.jpg', aiHint: 'internal corner angle' } },
            { name: 'Faîtière', length: 'Long. Std. 3m à 6m', image: { src: 'https://i.pinimg.com/736x/38/9f/22/389f22b55684dcbf9747652526fcc637.jpg', aiHint: 'ridge cap' } },
            { name: 'Sous Faitière', length: 'Long. Std. 3m à 6m', image: { src: 'https://i.pinimg.com/736x/df/cb/e8/dfcbe8706e2cd65a17a1d73fbad68458.jpg', aiHint: 'under ridge' } },
            { name: 'U De Sol', length: 'Long. Std. 3m à 6m', image: { src: 'https://i.pinimg.com/736x/12/c9/fc/12c9fcea3a33af7b379bbee140210007.jpg', aiHint: 'u-profile floor' } },
        ]
    },
    tables: {
        isolation: { title: '', headers: [], rows: [] },
        dimensionnement: { title: '', headers: [], rows: [] },
    }
  },
};


    