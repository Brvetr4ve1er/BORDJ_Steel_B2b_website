
type Language = 'en' | 'fr';

type CompanyData = {
  [key in Language]: {
    companyName: string;
    navItems: string[];
    languageToggle: string;
    metadata: {
      title: string;
      description: string;
    };
    contact: {
      phone: string;
      email: string;
      address: string;
    };
    socials: {
      twitter: string;
      linkedin: string;
      github: string;
    };
    hero: {
      headline: string;
      subheadline: string;
      image: {
        src: string;
        aiHint: string;
      };
      stats: {
        value: number;
        label: string;
      }[];
    };
    about: {
      visionTitle: string;
      vision: string;
      missionTitle: string;
      mission: string;
    };
    services: {
      title: string;
      items: {
        title: string;
        description: string;
        image: {
          src: string;
          aiHint: string;
        };
      }[];
    };
    portfolio: {
      title: string;
      projects: {
        name: string;
        image: {
          src: string;
          aiHint: string;
        };
      }[];
    };
    certifications: {
      title: string;
      items: string[];
    };
    clients: {
      title: string;
      logos: {
        name: string;
        image: {
          src: string;
          aiHint: string;
        };
      }[];
    };
    contactCta: {
      title: string;
      info: {
        title: string;
        description: string;
      },
      form: {
        name: string;
        namePlaceholder: string;
        email: string;
        emailPlaceholder: string;
        message: string;
        messagePlaceholder: string;
        button: string;
      }
    },
    footer: {
      tagline: string;
      copyright: string;
    },
    legal: {
      title: string;
      siteLinks: string;
      privacy: string;
      terms: string;
      contactUs: string;
    }
  }
}

export const companyData: CompanyData = {
  en: {
    companyName: "BORDJ STEEL",
    navItems: ['Home', 'About', 'Services', 'Portfolio', 'Approvals', 'Clients', 'Contact'],
    languageToggle: 'Français',
    metadata: {
      title: "BORDJ STEEL",
      description: "Leading innovations in steel fabrication and construction."
    },
    contact: {
      phone: "+1 (555) 123-4567",
      email: "contact@bordjsteel.com",
      address: "123 Industrial Park Avenue, Steel City, ST 54321, USA"
    },
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    },
    hero: {
      headline: "BUILDING THE FUTURE",
      subheadline: "WITH STEEL AND PRECISION",
      image: {
        src: "https://placehold.co/1920x1080.png",
        aiHint: "steel factory"
      },
      stats: [
        { "value": 25, "label": "Years of Experience" },
        { "value": 500, "label": "Projects Completed" },
        { "value": 120, "label": "Happy Clients" }
      ]
    },
    about: {
      visionTitle: "Our Vision",
      vision: "To be the benchmark in the steel construction industry, recognized for our innovation, quality, and commitment to sustainable development, shaping a stronger and more resilient future.",
      missionTitle: "Our Mission",
      mission: "To deliver exceptional steel solutions through cutting-edge technology, superior craftsmanship, and unwavering client focus, ensuring every project is built with precision, safety, and integrity."
    },
    services: {
      title: "Our Facilities",
      items: [
        {
          title: "Structural Steel Fabrication",
          description: "Our state-of-the-art facility is equipped with advanced machinery for precision cutting, bending, and assembling of structural steel components.",
          image: { "src": "https://placehold.co/600x400.png", "aiHint": "steel fabrication" }
        },
        {
          title: "Pre-Engineered Buildings",
          description: "We specialize in the design and manufacturing of pre-engineered steel buildings (PEBs) tailored to meet diverse industrial and commercial needs.",
          image: { "src": "https://placehold.co/600x400.png", "aiHint": "engineered building" }
        },
        {
          title: "Automated Blasting & Painting",
          description: "A fully automated blasting and painting line ensures superior surface preparation and coating application for long-lasting corrosion protection.",
          image: { "src": "https://placehold.co/600x400.png", "aiHint": "industrial painting" }
        },
        {
          title: "Quality Control & Testing",
          description: "Our dedicated QC department employs rigorous testing methods, including ultrasonic and radiographic testing, to guarantee the integrity of every weld and component.",
          image: { "src": "https://placehold.co/600x400.png", "aiHint": "quality control" }
        }
      ]
    },
    portfolio: {
      title: "Project Portfolio",
      projects: [
        { name: "Industrial Warehouse Complex", image: { "src": "https://placehold.co/400x300.png", "aiHint": "industrial warehouse" } },
        { name: "Multi-Storey Commercial Tower", image: { "src": "https://placehold.co/400x300.png", "aiHint": "commercial building" } },
        { name: "Airport Hangar Structure", image: { "src": "https://placehold.co/400x300.png", "aiHint": "airport hangar" } },
        { name: "Pedestrian Steel Bridge", image: { "src": "https://placehold.co/400x300.png", "aiHint": "steel bridge" } },
        { name: "Power Plant Structure", image: { "src": "https://placehold.co/400x300.png", "aiHint": "power plant" } },
        { name: "Sports Stadium Roof", image: { "src": "https://placehold.co/400x300.png", "aiHint": "stadium roof" } },
        { name: "Petrochemical Pipe Racks", image: { "src": "https://placehold.co/400x300.png", "aiHint": "pipe rack" } },
        { name: "Shopping Mall Framework", image: { "src": "https://placehold.co/400x300.png", "aiHint": "shopping mall" } }
      ]
    },
    certifications: {
      title: "Approvals & Certifications",
      items: [
        "ISO 9001:2015 Quality Management System",
        "ISO 14001:2015 Environmental Management",
        "ISO 45001:2018 Occupational Health & Safety",
        "AISC Certified Fabricator (American Institute of Steel Construction)",
        "EN 1090-1/2 CE Marking for Structural Steel",
        "AWS D1.1 Certified Welding (American Welding Society)",
        "Major Oil & Gas Company Approvals",
        "National Board 'R' Stamp for Repair and Alteration",
        "SSPC Painting Contractor Certification (PCC)",
        "LEED Certification Support for Green Building"
      ]
    },
    clients: {
      title: "Our Valued Clients",
      logos: [
        { name: "Client 1", image: { "src": "https://placehold.co/150x80.png", "aiHint": "company logo" } },
        { name: "Client 2", image: { "src": "https://placehold.co/150x80.png", "aiHint": "company logo" } },
        { name: "Client 3", image: { "src": "https://placehold.co/150x80.png", "aiHint": "company logo" } },
        { name: "Client 4", image: { "src": "https://placehold.co/150x80.png", "aiHint": "company logo" } },
        { name: "Client 5", image: { "src": "https://placehold.co/150x80.png", "aiHint": "company logo" } },
        { name: "Client 6", image: { "src": "https://placehold.co/150x80.png", "aiHint": "company logo" } }
      ]
    },
    contactCta: {
      title: "Get In Touch",
      info: {
        title: "Contact Information",
        description: "Fill up the form and our team will get back to you within 24 hours.",
      },
      form: {
        name: "Name",
        namePlaceholder: "Your Name",
        email: "Email",
        emailPlaceholder: "Your Email",
        message: "Message",
        messagePlaceholder: "Your Message",
        button: "Send Message",
      }
    },
    footer: {
      tagline: "Engineering the foundations of tomorrow.",
      copyright: "BORDJ STEEL. All Rights Reserved."
    },
    legal: {
      title: "Legal",
      siteLinks: "Site Links",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      contactUs: "Contact Us"
    }
  },
  fr: {
    companyName: "BORDJ STEEL",
    navItems: ['Accueil', 'À Propos', 'Services', 'Portfolio', 'Agréments', 'Clients', 'Contact'],
    languageToggle: 'English',
    metadata: {
      title: "BORDJ STEEL",
      description: "Leader des innovations dans la fabrication et la construction en acier."
    },
    contact: {
      phone: "+1 (555) 123-4567",
      email: "contact@bordjsteel.com",
      address: "123 Avenue du Parc Industriel, Steel City, ST 54321, USA"
    },
    socials: {
      twitter: "#",
      linkedin: "#",
      github: "#"
    },
    hero: {
      headline: "CONSTRUIRE L'AVENIR",
      subheadline: "AVEC ACIER ET PRÉCISION",
      image: {
        src: "https://placehold.co/1920x1080.png",
        aiHint: "steel factory"
      },
      stats: [
        { "value": 25, "label": "Années d'Expérience" },
        { "value": 500, "label": "Projets Réalisés" },
        { "value": 120, "label": "Clients Satisfaits" }
      ]
    },
    about: {
      visionTitle: "Notre Vision",
      vision: "Être la référence dans l'industrie de la construction métallique, reconnue pour notre innovation, notre qualité et notre engagement envers le développement durable, façonnant un avenir plus solide et plus résilient.",
      missionTitle: "Notre Mission",
      mission: "Fournir des solutions en acier exceptionnelles grâce à une technologie de pointe, un savoir-faire supérieur et une orientation client inébranlable, garantissant que chaque projet est construit avec précision, sécurité et intégrité."
    },
    services: {
      title: "Nos Installations",
      items: [
        {
          title: "Fabrication d'Acier de Construction",
          description: "Notre usine à la pointe de la technologie est équipée de machines avancées pour la découpe, le pliage et l'assemblage de précision des composants en acier de construction.",
          image: { "src": "https://placehold.co/600x400.png", "aiHint": "steel fabrication" }
        },
        {
          title: "Bâtiments Préfabriqués",
          description: "Nous sommes spécialisés dans la conception et la fabrication de bâtiments en acier préfabriqués (PEB) adaptés pour répondre à divers besoins industriels et commerciaux.",
          image: { "src": "https://placehold.co/600x400.png", "aiHint": "engineered building" }
        },
        {
          title: "Grenaillage et Peinture Automatisés",
          description: "Une ligne de grenaillage et de peinture entièrement automatisée assure une préparation de surface et une application de revêtement supérieures pour une protection durable contre la corrosion.",
          image: { "src": "https://placehold.co/600x400.png", "aiHint": "industrial painting" }
        },
        {
          title: "Contrôle Qualité et Essais",
          description: "Notre département QC dédié emploie des méthodes d'essai rigoureuses, y compris des essais par ultrasons et radiographiques, pour garantir l'intégrité de chaque soudure et composant.",
          image: { "src": "https://placehold.co/600x400.png", "aiHint": "quality control" }
        }
      ]
    },
    portfolio: {
      title: "Portefeuille de Projets",
      projects: [
        { name: "Complexe d'Entrepôts Industriels", image: { "src": "https://placehold.co/400x300.png", "aiHint": "industrial warehouse" } },
        { name: "Tour Commerciale à Plusieurs Étages", image: { "src": "https://placehold.co/400x300.png", "aiHint": "commercial building" } },
        { name: "Structure de Hangar d'Aéroport", image: { "src": "https://placehold.co/400x300.png", "aiHint": "airport hangar" } },
        { name: "Passerelle Piétonne en Acier", image: { "src": "https://placehold.co/400x300.png", "aiHint": "steel bridge" } },
        { name: "Structure de Centrale Électrique", image: { "src": "https://placehold.co/400x300.png", "aiHint": "power plant" } },
        { name: "Toit de Stade de Sport", image: { "src": "https://placehold.co/400x300.png", "aiHint": "stadium roof" } },
        { name: "Supports de Tuyauterie Pétrochimique", image: { "src": "https://placehold.co/400x300.png", "aiHint": "pipe rack" } },
        { name: "Ossature de Centre Commercial", image: { "src": "https://placehold.co/400x300.png", "aiHint": "shopping mall" } }
      ]
    },
    certifications: {
      title: "Agréments et Certifications",
      items: [
        "Système de Management de la Qualité ISO 9001:2015",
        "Management Environnemental ISO 14001:2015",
        "Santé et Sécurité au Travail ISO 45001:2018",
        "Fabricant Certifié AISC (American Institute of Steel Construction)",
        "Marquage CE EN 1090-1/2 pour l'Acier de Construction",
        "Soudage Certifié AWS D1.1 (American Welding Society)",
        "Agréments des Grandes Compagnies Pétrolières et Gazières",
        "Timbre 'R' du National Board pour la Réparation et la Modification",
        "Certification d'Entrepreneur en Peinture SSPC (PCC)",
        "Soutien à la Certification LEED pour les Bâtiments Écologiques"
      ]
    },
    clients: {
      title: "Nos Précieux Clients",
      logos: [
        { name: "Client 1", image: { "src": "https://placehold.co/150x80.png", "aiHint": "company logo" } },
        { name: "Client 2", image: { "src": "https://placehold.co/150x80.png", "aiHint": "company logo" } },
        { name: "Client 3", image: { "src": "https://placehold.co/150x80.png", "aiHint": "company logo" } },
        { name: "Client 4", image: { "src": "https://placehold.co/150x80.png", "aiHint": "company logo" } },
        { name: "Client 5", image: { "src": "https://placehold.co/150x80.png", "aiHint": "company logo" } },
        { name: "Client 6", image: { "src": "https://placehold.co/150x80.png", "aiHint": "company logo" } }
      ]
    },
    contactCta: {
      title: "Contactez-Nous",
      info: {
        title: "Informations de Contact",
        description: "Remplissez le formulaire et notre équipe vous répondra dans les 24 heures.",
      },
      form: {
        name: "Nom",
        namePlaceholder: "Votre Nom",
        email: "Email",
        emailPlaceholder: "Votre Email",
        message: "Message",
        messagePlaceholder: "Votre Message",
        button: "Envoyer le Message",
      }
    },
    footer: {
      tagline: "Construire les fondations de demain.",
      copyright: "BORDJ STEEL. Tous Droits Réservés."
    },
    legal: {
      title: "Légal",
      siteLinks: "Liens du Site",
      privacy: "Politique de Confidentialité",
      terms: "Conditions d'Utilisation",
      contactUs: "Contactez-Nous"
    }
  }
};
