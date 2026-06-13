// Editorial + gallery content for the Charpente Métallique page, extracted
// verbatim from the page component. Icons are resolved by name in the component.

// "Nos Projets" gallery — expanding image strip.
export const charpenteGalleryImages: string[] = [
  "https://i.pinimg.com/736x/ec/93/b8/ec93b8a90b0c088c23cdf817613dd183.jpg",
  "https://i.pinimg.com/736x/34/9a/c5/349ac528cf2b299e8e9d38dcf88e029d.jpg",
  "https://i.pinimg.com/736x/5f/00/6f/5f006fef04a5f7af462ba580abbb2adc.jpg",
  "https://i.pinimg.com/736x/7a/da/ff/7adaff64dfee8fb4467082a0a5daa933.jpg",
  "https://i.pinimg.com/736x/53/07/e6/5307e6787500b6efff734990a41772e5.jpg",
  "https://i.pinimg.com/736x/db/65/cd/db65cdc8fcf0205a18de1498e1a987c7.jpg",
];

// Domaines d'Application — icon resolved by name in the component.
export const charpenteApplications: { iconName: string; text: string }[] = [
  { iconName: 'Building', text: "Bâtiments industriels & commerciaux" },
  { iconName: 'Factory', text: "Hangars de stockage & agricoles" },
  { iconName: 'Tractor', text: "Infrastructures logistiques" },
  { iconName: 'HardHat', text: "Projets sur mesure" },
];

// "Pourquoi Nous Choisir?" — icon resolved by name in the component.
export const charpenteWhyChooseUs: { iconName: string; title: string; description: string }[] = [
  {
    iconName: 'Award',
    title: "Standards & Certifications",
    description: "Nous respectons les normes internationales les plus strictes (ISO, EN) pour garantir la qualité et la sécurité de chaque structure.",
  },
  {
    iconName: 'Zap',
    title: "Capacités de Production",
    description: "Avec des machines CNC de pointe et des soudeuses automatiques, nous avons une capacité de production massive pour les projets de toute envergure.",
  },
  {
    iconName: 'ShieldCheck',
    title: "Expertise & Innovation",
    description: "Notre bureau d'études et nos équipes s'appuient sur une riche expérience et des références solides pour innover et relever les défis complexes.",
  },
];
