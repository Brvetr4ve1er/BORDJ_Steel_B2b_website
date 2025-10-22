
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
        "name": "About",
        "href": "#about",
        "icon": "Info",
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
          { name: 'UTEC', location: 'Ain Oulmen' },
          { name: 'STAR GOOD', location: 'Oued Smar' },
          { name: 'CFCE', location: 'Oran' },
          { name: 'Base Logistique CONDOR', location: '' },
          { name: 'Softal', location: 'Boufarik' },
          { name: 'Duct & Piping', location: '(Bordj Steel)' },
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
    linkedin: "https://dz.linkedin.com/in/bordj-steel-spa-2a082616a",
    github: "#",
    facebook: "https://web.facebook.com/spabordjsteel/?_rdc=1&_rdr",
    instagram: "https://www.instagram.com/bordj_steel/",
    tiktok: "#",
    whatsapp: "#"
  },
};
