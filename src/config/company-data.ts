
import images from '@/app/lib/placeholder-images.json';

export const companyData = {
  siteMetadata: {
    title: 'Bordj Steel – Construction métallique en Algérie',
    description: 'Complexe métallurgique Bordj Steel, filiale du groupe Condor, 4 unités de production, projets phares en Algérie.',
    // Single source of truth for the canonical site URL (used by metadata,
    // robots and the sitemap). NOTE: confirm the canonical domain with the
    // client — content elsewhere references bordjsteel.dz, while metadata has
    // historically used bordj-steel.com (kept here to preserve existing SEO).
    siteUrl: 'https://bordj-steel.com',
    language: 'fr',
    slogan: 'NOUS DONNONS DU STEEL À VOS PROJETS',
    sloganArabic: "نمنح مشاريعكم صلابة الفولاذ",
  },
  navigation: {
    mainMenu: [
      {
        "name": "Accueil",
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
        "href": "/media-center/blog",
        "icon": "Newspaper",
        "children": [
          { "name": "Blog", "href": "/media-center/blog", "description": "Nos derniers articles de blog.", "icon": "BookOpen" },
          { "name": "Actualités", "href": "/media-center/actualites", "description": "Les dernières nouvelles de Bordj Steel.", "icon": "Newspaper" },
          { "name": "Vidéos", "href": "/media-center/videos", "description": "Découvrez nos projets en vidéo.", "icon": "Video" },
          { "name": "Galerie", "href": "/media-center/gallery", "description": "Explorez nos réalisations en images.", "icon": "View" },
          { "name": "ISO", "href": "/media-center/blog?tab=iso", "description": "Voir nos certifications ISO.", "icon": "Award" },
          { "name": "Catalogue", "href": "/media-center/blog?tab=catalogue", "description": "Téléchargez notre catalogue de produits.", "icon": "FileText" }
        ]
      },
      { 
        "name": "Contact & RH", 
        "href": "/contact", 
        "icon": "Mail",
        "children": [
          { "name": "Contact", "href": "/contact", "description": "Contactez-nous pour toute demande.", "icon": "Mail" },
          { "name": "RH", "href": "/recrutement", "description": "Rejoignez nos équipes.", "icon": "User" }
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
        history: 'a été créée avec une mission claire : fournir des solutions en acier de haute qualité, conçues avec précision pour répondre aux exigences de l’industrie moderne. Aujourd’hui, nous sommes fiers d’être reconnus comme l’un des acteurs les plus fiables et respectés dans le domaine de la charpente métallique, de la galvanisation et des panneaux sandwichs isolants en Algérie. Grâce à notre engagement pour la durabilité, la performance technique et la satisfaction client, Bordj Steel accompagne les usines, projets agricoles et promoteurs industriels à travers tout le territoire national et au-delà.',
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
      // `imageKey` maps to a key of `facilities` in placeholder-images.json.
      // It is the stable identity of a unit: the photo (and any crop rule that
      // goes with it) follows this key, never the array position or the title.
      items: [
        {
          title: 'Charpente Métallique',
          description: `Capacité de 1500 T/mois (25000 T/an) et PRS 3000 T/an. Nous produisons des hangars, pylônes, et supports publicitaires.`,
          icon: 'HardHat',
          href: '/products/charpente-metallique',
          imageKey: 'charpente'
        },
        {
          title: 'Panneaux Sandwichs',
          description: `Capacité de 5000 m²/jour. Gamme d'épaisseur de 30-200 mm pour couverture, bardage, et chambres froides.`,
          icon: 'Layers',
          href: '/products/sandwich-panels',
          imageKey: 'panneaux'
        },
        {
          title: 'Galvanisation à Chaud',
          description: `Capacité de 60000 T/an avec un bain de 13m de long pour des pièces jusqu'à 15m.`,
          icon: 'Cog',
          href: '/products/galvanisation-a-chaud',
          imageKey: 'galvanisation'
        },
        {
          title: 'Chaudronnerie',
          description: `Notre unité de chaudronnerie est spécialisée dans la fabrication d'équipements sur mesure pour divers secteurs industriels.`,
          icon: 'Anchor',
          href: '/products/chaudronnerie',
          imageKey: 'chaudronnerie'
        }
      ]
    },
    references: {
      slug: '/projets',
      title: 'Nos Références',
      // `imageKey` maps to a key of `portfolio` in placeholder-images.json and is
      // the stable identity of a project. Both /references and the homepage
      // portfolio resolve their photo through it (see getProjectImage below), so
      // renaming or reordering a project can never desync name from image.
      projects: [
          {
            name: 'UTEC',
            location: 'Ain Oulmen - Sétif',
            description: 'Fourniture et montage de la Charpente Métallique et panneaux sandwichs.',
            imageKey: 'utec',
            details: {
              tonnage: '2000 tonnes',
              couverture: '22000 m²',
              bardage: '3800 m²'
            }
          },
          {
            name: 'Star Good',
            location: 'Z.IND oued Smar - Alger',
            description: 'Fourniture et montage de la Charpente Métallique et panneaux sandwich.',
            imageKey: 'star-good',
            details: {
              tonnage: '360 tonnes',
              couverture: '4750 m²'
            }
          },
          {
            name: 'Zenteck-BBA',
            location: 'route de msila BBA',
            description: 'Fourniture et montage de la Charpente Métallique et panneaux sandwich.',
            imageKey: 'zenteck-bba',
            details: {
                tonnage: '1200 tonnes'
            }
          },
          {
            name: 'Base Logistique Condor',
            location: 'Route de Msila, BBA',
            description: 'Fourniture et montage de la Charpente Métallique et panneaux sandwich classe M1(PIR).',
            imageKey: 'base-logistique-condor',
            details: {
              tonnage: '4700 tonnes',
              couverture: '6500 m² (Classe M1 PIR)',
              bardage: '14000 m² (Classe M1)'
            }
          },
          {
            name: 'Softal',
            location: 'Boufarik - Blida',
            description: 'Fourniture et montage de la Charpente Métallique R+1.',
            imageKey: 'softal',
            details: {
              tonnage: '800 tonnes',
            }
          },
          {
            name: 'Unité Duct Piping',
            location: 'Bordj Bou Arréridj',
            description: 'Fourniture et montage de la Charpente Métallique (PRS) et panneaux sandwich.',
            imageKey: 'unité-duct-piping',
            details: {
              tonnage: '120 tonnes (Type PRS)',
              couverture: '1400 m²',
              bardage: '1150 m²'
            }
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
        { name: "Imetal", image: { "src": "/logos/imetal.webp", "aiHint": "Imetal logo" } },
        { name: "Sonelgaz", image: { "src": "/logos/sonelgaz.webp", "aiHint": "Sonelgaz logo" } },
        { name: "Maxtor", image: { "src": "/logos/maxtor.webp", "aiHint": "Maxtor logo" } },
        { name: "Tazedj", image: { src: "", aiHint: "Tazedj logo"} },
        { name: "Colinco", image: { src: "/logos/colinco.webp", aiHint: "Colinco logo"} }
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
            button: "Envoyer le message",
        },
        info: {
          title: "Informations de Contact",
          description: "Remplissez le formulaire et notre équipe vous répondra dans les 24 heures.",
        },
        // Department directory rendered on /contact (ContactInfo component).
        // `icon` is a lucide-react icon name, resolved by the component.
        // CLIENT NOTE: the primary number `phones[0]` (+213 770 35 66 86) is
        // deliberately on no department card — which number is canonical is
        // still an open client decision. Do not "correct" these without it.
        departments: [
          {
            icon: 'Building2',
            title: "Bureau Commercial",
            email: "commercial@bordjsteel.dz",
            phone: "+213 561 61 60 05",
            image: "/media/85abf719f734e7c11defc2c680c1-8a19bd5f.webp",
          },
          {
            icon: 'HardHat',
            title: "Charpente Métallique",
            phone: "+213 770 98 43 14",
            email: "commercial@bordjsteel.dz",
            image: "/media/e4e9e2933ed8fa9f0d49d50c4d61-ffd2b7e1.webp",
          },
          {
            icon: 'Package',
            title: "Panneaux Sandwich",
            phone: "+213 770 70 59 78",
            email: "commercial@bordjsteel.dz",
            image: "/media/f482924f5237e9d9f98da4e26adf-a5890cd7.webp",
          },
          {
            icon: 'Zap',
            title: "Galvanisation",
            phone: "+213 770 35 73 47",
            email: "commercial@bordjsteel.dz",
            image: images.galvanisation.contactCard.src,
          },
          {
            icon: 'Headphones',
            title: "Écoute Client",
            phone: "+213 770 83 25 96",
            // CLIENT NOTE: this address appears nowhere else on the site (see
            // `emails` above). Kept verbatim; confirm with the client.
            email: "marketing@bordjsteel.dz",
            image: "/media/2c792262ee0e5c2f3a1290cd0682-610b04f1.webp",
          },
          {
            icon: 'Wrench',
            title: "Réalisation et Montage",
            phone: "+213 770 98 01 48",
            email: "commercial@bordjsteel.dz",
            image: "/media/a30d652c6e58b3aebe5ca3561af4-c5bd987d.webp",
          },
        ],
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
    facebook: "https://web.facebook.com/spabordjsteel/?_rdc=1&_rdr",
    instagram: "https://www.instagram.com/bordj_steel/",
    whatsapp: "https://wa.me/213770356686"
  },
};

/* -------------------------------------------------------------------------- */
/* Image resolution                                                            */
/* -------------------------------------------------------------------------- */

export type PlaceholderImage = {
  src: string;
  width: number;
  height: number;
  alt?: string;
  aiHint?: string;
  blurDataUrl?: string;
};

const portfolioImages = images.portfolio as unknown as Record<string, PlaceholderImage>;
const facilityImages = images.facilities as unknown as Record<string, PlaceholderImage>;

const MISSING_IMAGE: PlaceholderImage = {
  src: 'https://placehold.co/600x400',
  width: 600,
  height: 400,
  aiHint: 'placeholder',
};

// Single lookup used by every consumer, so two pages can never resolve the same
// entity to different images. A miss returns the placeholder (the page still
// renders) but shouts about it in development instead of failing silently.
function resolveImage(
  group: Record<string, PlaceholderImage>,
  groupName: string,
  imageKey: string
): PlaceholderImage {
  const image = group[imageKey];
  if (!image) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(
        `[company-data] No image "${imageKey}" under "${groupName}" in placeholder-images.json — falling back to a grey placeholder. Add the key or fix the imageKey in company-data.ts.`
      );
    }
    return MISSING_IMAGE;
  }
  return image;
}

/** Resolves a reference project's photo from its stable `imageKey`. */
export function getProjectImage(imageKey: string): PlaceholderImage {
  return resolveImage(portfolioImages, 'portfolio', imageKey);
}

/** Resolves a production unit's photo from its stable `imageKey`. */
export function getFacilityImage(imageKey: string): PlaceholderImage {
  return resolveImage(facilityImages, 'facilities', imageKey);
}
