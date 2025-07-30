
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
        "href": "#about", 
        "icon": "Factory",
        "children": [
          { "name": "Notre Histoire", "href": "#about", "description": "Découvrez nos origines et notre parcours.", "icon": "Building2" },
          { "name": "Vision & Mission", "href": "#about", "description": "Nos valeurs et nos ambitions pour l'avenir.", "icon": "Award" },
          { "name": "Politique QHSE", "href": "#about", "description": "Notre engagement pour la Qualité, Hygiène, Sécurité et Environnement.", "icon": "ShieldCheck" },
        ]
      },
      {
        "name": "Produits",
        "href": "/products",
        "icon": "Package",
        "children": [
          { "name": "Charpente Métallique", "href": "#services", "description": "Solutions robustes pour tous types de bâtiments.", "icon": "HardHat" },
          { "name": "Panneaux Sandwichs", "href": "#services", "description": "Isolation thermique et acoustique performante.", "icon": "Package" },
          { "name": "Galvanisation à Chaud", "href": "#services", "description": "Protection anti-corrosion durable pour vos aciers.", "icon": "Cog" },
          { "name": "Chaudronnerie", "href": "#services", "description": "Fabrication sur mesure d'équipements industriels.", "icon": "Anchor" },
        ]
      },
      { "name": "Références", "href": "#portfolio", "icon": "Briefcase" },
      { 
        "name": "Media Center", 
        "href": "#recruitment", 
        "icon": "Newspaper",
        "children": [
            { "name": "Nos Projets", "href": "#portfolio", "description": "Découvrez nos réalisations et nos projets phares.", "icon": "Briefcase" },
            { "name": "News", "href": "#news", "description": "Lisez les dernières actualités nous concernant.", "icon": "Newspaper" },
            { "name": "Nos certifications", "href": "#approvals", "description": "Consultez nos agréments et certifications.", "icon": "Award" },
            { "name": "Catalogue", "href": "/catalogue.pdf", "description": "Téléchargez notre catalogue complet.", "icon": "FileText" },
            { "name": "Blog", "href": "#blog", "description": "Articles et actualités de l'industrie.", "icon": "BookOpen" },
            { "name": "Video & 3D", "href": "#videos", "description": "Explorez nos produits en vidéos et modèles 3D.", "icon": "View" }
        ]
      },
      { "name": "Recrutement", "href": "#recruitment", "icon": "UserPlus" },
      { "name": "Contact", "href": "#contact", "icon": "Mail" }
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
          image: {
            src: 'https://images.unsplash.com/photo-1598302936625-6075fbd98dd7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxtZXRhbCUyMGZhY3Rvcnl8ZW58MHx8fHwxNzUzODc2NjczfDA&ixlib=rb-4.1.0&q=80&w=1080',
            aiHint: 'steel factory'
          },
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
        image: {
            src: 'https://images.unsplash.com/photo-1600683605785-d51d43138eee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8c3RlZWwlMjBmYWN0b3J5fGVufDB8fHx8MTc1Mzg4MjMwMHww&ixlib=rb-4.1.0&q=80&w=1080',
            alt: 'Siège social de Bordj Steel',
            aiHint: 'company building'
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
          image: { src: 'https://images.unsplash.com/photo-1738162837330-9257f938463c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxzdGVlbCUyMGZhYnJpY2F0aW9ufGVufDB8fHx8MTc1Mzg3NjM3Mnww&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'steel fabrication' },
          icon: 'HardHat'
        },
        {
          title: 'Panneaux Sandwichs',
          description: `Capacité de 5000 m²/jour. Gamme d'épaisseur de 30-200 mm pour couverture, bardage, et chambres froides.`,
          image: { src: 'https://images.unsplash.com/photo-1585435582425-a0399930ee74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyMHx8JTIwbWV0YWwlMjBzaGVldCUyMHBhbmVsJTIwfGVufDB8fHx8MTc1Mzg3NjYwNHww&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'sandwich panels' },
          icon: 'Layers'
        },
        {
          title: 'Galvanisation à Chaud',
          description: `Capacité de 60000 T/an avec un bain de 13m de long pour des pièces jusqu'à 15m.`,
          image: { src: 'https://images.unsplash.com/photo-1569968201228-01aebb252e80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxtZXRhbCUyMGZhY3Rvcnl8ZW58MHx8fHwxNzUzODc2NjczfDA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'hot-dip galvanization' },
          icon: 'Cog'
        },
        {
          title: 'Chaudronnerie',
          description: `Notre unité de chaudronnerie est spécialisée dans la fabrication d'équipements sur mesure pour divers secteurs industriels.`,
          image: { src: 'https://images.unsplash.com/photo-1510900767338-8bf61abf2562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMG1lbHRpbmclMjBmYWN0b3J5fGVufDB8fHx8MTc1Mzg3Njc2NXww&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'boiler making' },
          icon: 'Anchor'
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
          description: 'Tous les accessoires nécessaires pour une finition parfaite : gouttières, faîtages, et plus encore.',
          image: { src: 'https://placehold.co/800x600.png', aiHint: 'metal accessories' }
        }
      ]
    },
    references: {
      slug: '/projets',
      title: 'Nos Références',
      projects: [
          { name: 'UTEC - Ain Oulmen', image: { src: 'https://images.unsplash.com/photo-1684695749295-7ec9ff3b8164?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxpbmR1c3RyaWFsJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzUzODc2MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'industrial warehouse' } },
          { name: 'STAR GOOD - Oued Smar', image: { src: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxpbmR1c3RyaWFsJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzUzODc2MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'commercial building' } },
          { name: 'CFCE - Oran', image: { src: 'https://images.unsplash.com/photo-1684695747624-0dd1b6412bc1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzUzODc2MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'exhibition center' } },
          { name: 'Base Logistique CONDOR', image: { src: 'https://images.unsplash.com/photo-1615797534094-7fde0a4861f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxpbmR1c3RyaWFsJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzUzODc2MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'logistics base' } },
          { name: 'Softal - Boufarik', image: { src: 'https://images.unsplash.com/photo-1615797534094-7fde0a4861f3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxpbmR1c3RyaWFsJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzUzODc2MjA2fDA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'industrial factory' } },
          { name: 'Duct & Piping (Bordj Steel)', image: { src: 'https://images.unsplash.com/photo-1700156316467-7b78b47c2c9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8aW5kdXN0cmlhbCUyMGJ1aWxkaW5nfGVufDB8fHx8MTc1Mzg3NjIwNnww&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'piping system' } },
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
        { name: "Client 1", image: { "src": "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb21wYW55JTIwbG9nb3xlbnwwfHx8fDE3NTM4NzgyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080", "aiHint": "company logo" } },
        { name: "Client 2", image: { "src": "https://images.unsplash.com/photo-1622465911368-72162f8da3e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxjb21wYW55JTIwbG9nb3xlbnwwfHx8fDE3NTM4NzgyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080", "aiHint": "company logo" } },
        { name: "Client 3", image: { "src": "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxjb21wYW55JTIwbG9nb3xlbnwwfHx8fDE3NTM4NzgyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080", "aiHint": "company logo" } },
        { name: "Client 4", image: { "src": "https://images.unsplash.com/photo-1562783912-21ad31ee2a83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxjb21wYW55JTIwbG9nb3xlbnwwfHx8fDE3NTM4NzgyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080", "aiHint": "company logo" } },
        { name: "Client 5", image: { "src": "https://images.unsplash.com/photo-1529612700005-e35377bf1415?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxjb21wYW55JTIwbG9nb3xlbnwwfHx8fDE3NTM4NzgyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080", "aiHint": "company logo" } },
        { name: "Client 6", image: { "src": "https://images.unsplash.com/photo-1687523327554-fa9f50423489?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjb21wYW55JTIwbG9nb3xlbnwwfHx8fDE3NTM4NzgyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080", "aiHint": "company logo" } }
      ]
    },
    contact: {
      slug: '/contact',
      title: 'Contactez-Nous',
      content: {
        address: 'N°1 lieu-dit Mechta Fatima, Bordj Bou Arréridj, Algérie',
        phones: ['+213 770 35 66 86', '+213 561 61 60 05'],
        emails: ['marketing@bordjsteel.dz'],
        form: {
            name: "Nom",
            namePlaceholder: "Votre Nom",
            email: "E-mail",
            emailPlaceholder: "Votre E-mail",
            subject: "Sujet",
            subjectPlaceholder: "Sujet de votre message",
            message: "Message",
            messagePlaceholder: "Votre Message",
            button: "Envoyer le Message",
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
    x: "#",
    linkedin: "#",
    github: "#",
    facebook: "#",
    instagram: "#",
    tiktok: "#",
    whatsapp: "#"
  },
};
