
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
          { "name": "Politique RH", "href": "#", "description": "Découvrez notre politique de ressources humaines.", "icon": "User" }
        ]
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
      { "name": "Références", "href": "#portfolio", "icon": "Briefcase" },
      { 
        "name": "Media Center", 
        "href": "#", 
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
            src: 'https://i.pinimg.com/736x/7b/2e/0e/7b2e0e0f355e7f114d5f981d2b144175.jpg',
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
          image: { src: 'https://i.pinimg.com/736x/f8/05/39/f80539082e4b8be52b8e586116b367ca.jpg', aiHint: 'steel fabrication' },
          icon: 'HardHat',
          href: '/products/charpente-metallique'
        },
        {
          title: 'Panneaux Sandwichs',
          description: `Capacité de 5000 m²/jour. Gamme d'épaisseur de 30-200 mm pour couverture, bardage, et chambres froides.`,
          image: { src: 'https://i.pinimg.com/736x/ce/22/71/ce227152b9fed3c117cbaad50450656a.jpg', aiHint: 'sandwich panels' },
          icon: 'Layers',
          href: '/products/sandwich-panels'
        },
        {
          title: 'Galvanisation à Chaud',
          description: `Capacité de 60000 T/an avec un bain de 13m de long pour des pièces jusqu'à 15m.`,
          image: { src: 'https://images.unsplash.com/photo-1569968201228-01aebb252e80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxtZXRhbCUyMGZhY3Rvcnl8ZW58MHx8fHwxNzUzODc2NjczfDA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'hot-dip galvanization' },
          icon: 'Cog',
          href: '/products/galvanisation-a-chaud'
        },
        {
          title: 'Chaudronnerie',
          description: `Notre unité de chaudronnerie est spécialisée dans la fabrication d'équipements sur mesure pour divers secteurs industriels.`,
          image: { src: 'https://images.unsplash.com/photo-1510900767338-8bf61abf2562?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxtZXRhbCUyMG1lbHRpbmclMjBmYWN0b3J5fGVufDB8fHx8MTc1Mzg3Njc2NXww&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'boiler making' },
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
          { name: 'UTEC', location: 'Ain Oulmen', image: { src: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxpbmR1c3RyaWFsJTIwd2FyZWhvdXNlfGVufDB8fHx8MTc1NTY4MjMzMXww&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'industrial warehouse' } },
          { name: 'STAR GOOD', location: 'Oued Smar', image: { src: 'https://images.unsplash.com/photo-1603779931001-a6b508e5da81?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxjb21tZXJjaWFsJTIwYnVpbGRpbmd8ZW58MHx8fHwxNzU1NjM2MzgyfDA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'commercial building' } },
          { name: 'CFCE', location: 'Oran', image: { src: 'https://images.unsplash.com/photo-1636905879476-b86b9dfa24f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxleGhpYml0aW9uJTIwY2VudGVyfGVufDB8fHx8MTc1NTY4MjMzMXww&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'exhibition center' } },
          { name: 'Base Logistique CONDOR', location: '', image: { src: 'https://images.unsplash.com/photo-1720382248625-dc19de24834c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxsb2dpc3RpY3MlMjBiYXNlfGVufDB8fHx8MTc1NTY4MjMzMXww&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'logistics base' } },
          { name: 'Softal', location: 'Boufarik', image: { src: 'https://images.unsplash.com/photo-1696194145126-32e22fc61ace?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxpbmR1c3RyaWFsJTIwZmFjdG9yeXxlbnwwfHx8fDE3NTU2ODIzMzF8MA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'industrial factory' } },
          { name: 'Duct & Piping', location: '(Bordj Steel)', image: { src: 'https://images.unsplash.com/photo-1725916631452-b411a5991fce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw0fHxwaXBpbmclMjBzeXN0ZW18ZW58MHx8fHwxNzU1NjgyMzMxfDA&ixlib=rb-4.1.0&q=80&w=1080', aiHint: 'piping system' } },
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
        { name: "Condor", image: { src: "/logos/condor.webp", aiHint: "Condor logo" } },
        { name: "Cosider", image: { src: "/logos/cosider.webp", aiHint: "Cosider logo" } },
        { name: "UTEC", image: { src: "/logos/utec.webp", aiHint: "UTEC logo" } },
        { name: "Biolab", image: { src: "/logos/biolab.webp", aiHint: "Biolab logo" } },
        { name: "Hyundai", image: { src: "/logos/hyundai.webp", aiHint: "Hyundai logo" } },
        { name: "Softal", image: { src: "/logos/softal.webp", aiHint: "Softal logo" } },
        { name: "Batimetal", image: { src: "/logos/batimetal.webp", aiHint: "Batimetal logo" } },
        { name: "Man", image: { src: "/logos/man.webp", aiHint: "Man logo" } },
        { name: "Cevital", image: { src: "/logos/cevital.webp", aiHint: "Cevital logo" } },
        { name: "Metidji", image: { src: "/logos/metidji.webp", aiHint: "Metidji logo" } },
        { name: "Soummam", image: { src: "/logos/soummam.webp", aiHint: "Soummam logo" } },
        { name: "Sim", image: { src: "/logos/sim.webp", aiHint: "Sim logo" } },
        { name: "Mobilis", image: { "src": "/logos/mobilis.webp", "aiHint": "Mobilis logo" } },
        { name: "Amimer Energie", image: { "src": "/logos/amimer_energie.webp", "aiHint": "Amimer Energie logo" } },
        { name: "Danone", image: { "src": "/logos/danone.webp", "aiHint": "Danone logo" } },
        { name: "Ifri", image: { "src": "/logos/ifri.webp", "aiHint": "Ifri logo" } },
        { name: "Sonatrach", image: { "src": "/logos/sonatrach.webp", "aiHint": "Sonatrach logo" } },
        { name: "GCB", image: { "src": "/logos/gcb.webp", "aiHint": "GCB logo" } },
        { name: "Imetal", image: { "src": "/logos/imetal.webp", "aiHint": "Imetal logo" } }
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
