
export const companyData = {
  siteMetadata: {
    title: 'Bordj Steel – Construction métallique en Algérie',
    description: 'Complexe métallurgique Bordj Steel, filiale du groupe Condor, 4 unités de production, projets phares en Algérie.',
    language: 'fr',
    slogan: 'NOUS DONONS DU STEEL A VOS PROJETS',
    sloganArabic: "نمنح مشاريعكم صلابة الفولاذ",
    lastUpdated: '2025-07-30',
    totalPages: 7
  },
  navigation: {
    mainMenu: [
      { 
        "name": "Home", 
        "href": "/", 
        "icon": "Factory"
      },
      { 
        "name": "Notre Histoire", 
        "href": "/about/history", 
        "description": "Découvrez nos origines et notre parcours.", 
        "icon": "Building2" 
      },
      {
        "name": "Produits",
        "href": "/products",
        "icon": "Package",
        "children": [
          { "name": "Charpente Métallique", "href": "/products/charpente-metallique", "description": "Solutions robustes pour tous types de bâtiments.", "icon": "HardHat" },
          { "name": "Panneaux Sandwichs", "href": "/products/sandwich-panels", "description": "Isolation thermique et acoustique performante.", "icon": "Package" },
          { "name": "Galvanisation à Chaud", "href": "/products/galvanisation-a-chaud", "description": "Protection anti-corrosion durable pour vos aciers.", "icon": "Cog" },
          { "name": "Chaudronnerie", "href": "/products/chaudronnerie", "description": "Fabrication sur mesure d'équipements industriels.", "icon": "Anchor" },
        ]
      },
      { "name": "Références", "href": "/references", "icon": "Briefcase" },
      { 
        "name": "Media Center", 
        "href": "/media-center", 
        "icon": "Newspaper",
        "children": [
          { "name": "Blog", "href": "/media-center/blog", "description": "Nos derniers articles de blog.", "icon": "BookOpen" },
          { "name": "Actualités", "href": "/media-center/actualites", "description": "Les dernières nouvelles de Bordj Steel.", "icon": "Newspaper" },
          { "name": "Vidéos", "href": "/media-center/videos", "description": "Découvrez nos projets en vidéo.", "icon": "Video" },
          { "name": "Galerie", "href": "/media-center/gallery", "description": "Explorez nos réalisations en images.", "icon": "View" }
        ]
      },
      { 
        "name": "Contact & Carrières", 
        "href": "/contact", 
        "icon": "Mail",
        "children": [
          { "name": "Contact", "href": "/contact", "description": "Contactez-nous pour toute demande.", "icon": "Mail" },
          { "name": "Recrutement", "href": "/recrutement", "description": "Rejoignez nos équipes.", "icon": "User" }
        ]
      }
    ],
  },
  pages: {
    homepage: {
      slug: '/',
      title: 'Accueil',
      content: {
        hero: {
          headline: "BÂTIR L'AVENIR, ENSEMBLE",
          subheadline: 'Leader de la construction métallique en Algérie',
          stats: [
            { "value": 25000, "label": "Tonnes/an Charpente" },
            { "value": 1500000, "label": "m²/an Panneaux Sandwich" },
            { "value": 60000, "label": "Tonnes/an Galvanisation" }
          ]
        },
        introduction: 'La SPA BORDJ STEEL comprend 4 unités de production : Charpente Métallique, Panneaux Sandwichs et TN 40, Galvanisation à chaud, Chaudronnerie.'
      },
    },
    about: {
      slug: '/a-propos',
      title: 'Qui sommes-nous',
      timelineEvents: [
        { year: '2012', title: 'Création de Bordj Steel', description: 'Fondation de la SPA BORDJ STEEL dans le cadre de la stratégie de développement du groupe CONDOR.', icon: 'Lightbulb' },
        { year: '2013', title: 'Début de la Construction', description: 'En juin, les travaux de construction de l\'unité de charpente métallique débutent.', icon: 'Cog' },
        { year: '2014', title: 'Démarrage de la Production', description: 'Juillet voit le démarrage de la production de l\'unité de charpente métallique.', icon: 'Users' },
        { year: '2015', title: 'Expansion des Capacités', description: 'Septembre est un mois charnière avec le démarrage de la production de panneaux sandwichs.', icon: 'BarChart' },
        { year: '2016', title: 'Inauguration et Finalisation', description: 'En Décembre, le complexe est officiellement inauguré par le ministre de l’intérieur.', icon: 'Target' },
        { year: '2019', title: 'Certification Qualité', description: 'Obtention de la prestigieuse certification ISO 9001 Version 2015.', icon: 'Award' },
        { year: '2025', title: 'Leader Engagé', description: 'Nous continuons d\'innover, guidés par notre système de Management Intégré QSE.', icon: 'Search' }
      ],
      content: {
        history: 'a été créée avec une mission claire : fournir des solutions en acier de haute qualité, conçues avec précision pour répondre aux exigences de l’industrie moderne. Aujourd’hui, nous sommes fiers d’être reconnus comme l’un des acteurs les plus fiables et respectés dans le domaine de la charpente métallique, de la galvanisation et des panneaux sandwichs isolants en Algérie. Grâce à notre engagement pour la durabilité, la performance technique et la satisfaction client, BordjSteel accompagne les usines, projets agricoles et promoteurs industriels à travers tout le territoire national et au-delà',
        vision: {
            title: "Notre Vision",
            text: "Investir et croître dans les relations avec les développeurs, les investisseurs et les prestataires de services.",
            icon: "Award"
        },
        mission: {
            title: "Notre Mission",
            text: "Fournir des produits en acier de haute qualité, en utilisant des technologies innovantes dans un environnement hautement motivé.",
            icon: "Cog"
        },
        qsePolicy: {
          title: "Politique QHSE",
          text: "Engagée dans une démarche d'excellence, BORDJ STEEL est certifiée ISO 9001:2015, ISO 14001:2015, et ISO 45001:2018. Notre politique Qualité, Hygiène, Sécurité, et Environnement, signée par le Directeur Général M. TRIRAT Samir, est le pilier de notre performance.",
        },
        completedProjects: 300,
      },
    },
    units: {
      slug: '/a-propos/unites',
      title: 'Nos Unités de Production',
      items: [
        {
          title: 'Charpente Métallique',
          description: `Capacité de 1500 T/mois (25000 T/an) et PRS 3000 T/an. Nous produisons des hangars, pylônes, et supports publicitaires.`,
          icon: 'HardHat',
          href: '/products/charpente-metallique'
        },
        {
          title: 'Panneaux Sandwichs',
          description: `Capacité de 5000 m²/jour. Gamme d'épaisseur de 30-200 mm pour couverture, bardage, et chambres froides.`,
          icon: 'Layers',
          href: '/products/sandwich-panels'
        },
        {
          title: 'Galvanisation à Chaud',
          description: `Capacité de 60000 T/an avec un bain de 13m de long pour des pièces jusqu'à 15m.`,
          icon: 'Cog',
          href: '/products/galvanisation-a-chaud'
        },
        {
          title: 'Chaudronnerie',
          description: `Notre unité de chaudronnerie est spécialisée dans la fabrication d'équipements sur mesure pour divers secteurs industriels.`,
          icon: 'Anchor',
          href: '/products/chaudronnerie'
        }
      ]
    },
    products: {
      title: 'Nos Produits',
      items: [
        {
          name: 'Tôles pour PEB',
          description: 'Des tôles nervurées de haute qualité, idéales pour les structures de bâtiments préfabriqués (PEB), offrant durabilité et résistance.',
          image: { src: 'https://placehold.co/800x600.png', aiHint: 'metal sheet' }
        },
        {
          name: 'Poutres et Profilés en Acier',
          description: 'Une gamme complète de poutres et profilés pour des charpentes métalliques robustes et conformes aux normes.',
          image: { src: 'https://placehold.co/800x600.png', aiHint: 'steel beams' }
        },
        {
          name: 'Panneaux de Bardage',
          description: 'Solutions de bardage esthétiques et isolantes pour façades de bâtiments industriels et commerciaux.',
          image: { src: 'https://placehold.co/800x600.png', aiHint: 'cladding panels' }
        },
        {
          name: 'Accessoires de Finition',
          description: 'Tous les accessoires nécessaires pour une finition perfecte : gouttières, faîtages, et plus encore.',
          image: { src: 'https://placehold.co/800x600.png', aiHint: 'metal accessories' }
        }
      ]
    },
    references: {
      slug: '/projets',
      title: 'Nos Références',
      projects: [
          { 
            name: 'UTEC', 
            location: 'Ain Oulmen - Sétif', 
            description: 'Fourniture et montage de la Charpente Métallique et des panneaux sandwichs pour le projet United Technologie (UTEC).',
            details: {
              tonnage: '2000 tonnes',
              couverture: '22000 m²',
              bardage: '3800 m²'
            }
          },
          {
            name: 'STAR GOOD',
            location: 'Z.IND Oued Smar - Alger',
            description: 'Fourniture et montage de la Charpente Métallique et panneaux sandwich.',
            details: {
              tonnage: '360 tonnes',
              couverture: '4750 m²'
            }
          },
          { 
            name: 'CFCE', 
            location: 'Oran', 
            description: 'Construction du Centre de Foires et de Conventions d’Oran, un projet d’envergure avec des portées exceptionnelles sans poteaux intermédiaires grâce à nos Profils Reconstitués Soudés (PRS).' 
          },
          {
            name: 'Base Logistique CONDOR',
            location: 'Route de Msila, BBA',
            description: 'Fourniture et montage de la Charpente Métallique et panneaux sandwich classe M1(PIR).',
            details: {
              tonnage: '4700 tonnes',
              couverture: '6500 m² (Classe M1 PIR)',
              bardage: '14000 m² (Classe M1)'
            }
          },
          { 
            name: 'Softal', 
            location: 'Boufarik', 
            description: 'Construction d’une usine de production avec des spécifications techniques précises pour intégrer des lignes de production automatisées.' 
          },
          { 
            name: 'Duct & Piping', 
            location: '(Bordj Steel)', 
            description: 'Projet interne de fabrication de gaines de ventilation et de tuyauterie, démontrant notre expertise en chaudronnerie complexe et en soudures de haute précision.' 
          },
      ]
    },
    certifications: {
      title: 'Agréments et Certifications',
      items: [
        'ISO 9001:2015 - Système de Management de la Qualité',
        'ISO 14001:2015 - Management Environnemental',
        'ISO 45001:2018 - Santé et Sécurité au Travail',
      ]
    },
    clients: {
      title: "Nos Précieux Clients",
      logos: [
        { name: "Condor", image: { src: "https://www.condor.dz/wp-content/uploads/2024/10/cropped-logo-condor-light-300x103.png", aiHint: "Condor logo" } },
        { name: "Cosider", image: { src: "https://www.cosider-groupe.dz/fr/themes/default/images/logo.png", aiHint: "Cosider logo" } },
        { name: "UTEC", image: { src: "https://utec.com.sa/wp-content/uploads/2025/01/UTECLogo.png", aiHint: "UTEC logo" } },
        { name: "Biolab", image: { src: "/logos/biolab.webp", aiHint: "Biolab logo" } },
        { name: "Hyundai", image: { src: "https://i.pinimg.com/736x/60/3b/83/603b83b35cd26e797e200d9aea13978b.jpg", aiHint: "Hyundai logo" } },
        { name: "Softal", image: { src: "https://softal-construction.dz/wp-content/uploads/2025/04/logo.png", aiHint: "Softal logo" } },
        { name: "Batimetal", image: { src: "/logos/batimetal.webp", aiHint: "Batimetal logo" } },
        { name: "Man", image: { src: "/logos/man.webp", aiHint: "Man logo" } },
        { name: "Cevital", image: { src: "https://cdn.brandfetch.io/idJEGI1qzz/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B", aiHint: "Cevital logo" } },
        { name: "Metidji", image: { src: "https://metidji.com/wp-content/themes/MetidjiTheme/images/logo.svg", aiHint: "Metidji logo" } },
        { name: "Soummam", image: { src: "https://www.soummam-dz.com/cms/Paragraphes/su164384/footer-logo-ombre-1.png", aiHint: "Soummam logo" } },
        { name: "Sim", image: { src: "https://groupesim.com/wp-content/uploads/2021/10/logo-groupe-sim-1-scaled.png", aiHint: "Sim logo" } },
        { name: "Mobilis", image: { "src": "https://cdn.brandfetch.io/idCPr4aU5R/theme/dark/logo.svg?c=1dxbfHSJFAPEGdCLU4o5B", "aiHint": "Mobilis logo" } },
        { name: "Amimer Energie", image: { "src": "/logos/amimer_energie.webp", "aiHint": "Amimer Energie logo" } },
        { name: "Danone", image: { "src": "https://smartmedia.digital4danone.com//is/image/danonecs/danone-logo-12?wid=320&fmt=png-alpha&fit=wrap", "aiHint": "Danone logo" } },
        { name: "Ifri", image: { "src": "https://ifri-dz.com/wp-content/uploads/2020/09/IFRI_logo.jpg", "aiHint": "Ifri logo" } },
        { name: "Sonatrach", image: { "src": "https://sonatrach.com/wp-content/uploads/2024/05/logo-sonatrach-white-text.svg", "aiHint": "Sonatrach logo" } },
        { name: "GCB", image: { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/GCB_Logo.svg/512px-GCB_Logo.svg.png", aiHint: "GCB logo" } },
        { name: "Imetal", image: { "src": "/logos/imetal.webp", "aiHint": "Imetal logo" } },
        { name: "Sonelgaz", image: { "src": "https://i.pinimg.com/736x/bd/81/8b/bd818bea09014d23bfcf6520791027ae.jpg", "aiHint": "Sonelgaz logo" } },
        { name: "Maxtor", image: { "src": "https://www.maxtor.dz/images/logo1.png", "aiHint": "Maxtor logo" } },
        { name: "Tazedj", image: { src: "https://scontent.faae1-2.fna.fbcdn.net/v/t39.30808-6/392766429_643897171187275_4759564167078248932_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Q5zTPInJAvMQ7kNvwEsnE69&_nc_oc=AdmwENqX8N2X65uDgKl0f1LQJ83UEp9UiPTDEIO74fKpmanADP_wV4-LXRvgfN03xbA&_nc_zt=23&_nc_ht=scontent.faae1-2.fna&_nc_gid=2FVtYgEaBkwMS3hwJPyo1w&oh=00_AfhzvXSWLr8z7apgfuzCC1fvfTDTAUQ-sfNQrHa7ie-__g&oe=691A3A01", aiHint: "Tazedj logo"} },
        { name: "Colinco", image: { src: "https://www.colinco-dz.com/templates/vt_law/images/vt_logo_style1.png", aiHint: "Colinco logo"} }
      ]
    },
    contact: {
      slug: '/contact',
      title: 'Contactez-Nous',
      content: {
        address: 'N°1 lieu-dit Mechta Fatima, Bordj Bou Arréridj, Algérie',
        phones: ['+213 770 35 66 86', '+213 561 61 60 05'],
        emails: ['commercial@bordjsteel.dz'],
        form: {
            name: "Nom",
            namePlaceholder: "Votre Nom",
            email: "E-mail",
            emailPlaceholder: "Votre E-mail",
            subject: "Sujet",
            subjectPlaceholder: "Sujet de votre message",
            message: "Message",
            messagePlaceholder: "Votre Message",
        },
        info: {
          title: "Informations de Contact",
          description: "Remplissez le formulaire et notre équipe vous répondra dans les 24 heures.",
        },
      }
    },
  },
  footer: {
      tagline: "Construire les fondations de demain.",
      copyright: "BORDJ STEEL. Tous Droits Réservés.",
      siteLinks: "Liens du Site",
      legal: {
        title: "Légal",
        privacy: "Politique de Confidentialité",
        terms: "Conditions d'Utilisation",
      },
      contactUs: "Contactez-Nous"
  },
  socials: {
    linkedin: "https://dz.linkedin.com/in/bordj-steel-spa-2a082616a",
    github: "#",
    facebook: "https://web.facebook.com/spabordjsteel/?_rdc=1&_rdr",
    instagram: "https://www.instagram.com/bordj_steel/",
    tiktok: "#",
    whatsapp: "#"
  },
};
