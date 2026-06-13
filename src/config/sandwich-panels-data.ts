// Editorial content for the Panneaux Sandwichs page, extracted verbatim from
// the page component so copy lives in config rather than JSX.

export interface SandwichStat {
  value: string;
  label: string;
  description?: string;
  icon?: string;
}

// Hero performance highlights shown beneath the headline.
export const sandwichHeroStats: SandwichStat[] = [
  { value: '30-200mm', label: 'Épaisseur', description: 'Gamme complète pour tous besoins', icon: 'Layers' },
  { value: '0.023 W/mK', label: 'Conductivité', description: 'Performance thermique optimale', icon: 'Thermometer' },
  { value: 'B, S2-d0', label: 'Réaction au feu', description: 'Sécurité et conformité maximales', icon: 'ShieldCheck' },
  { value: '15.4m', label: 'Longueur Max', description: 'Adapté aux grandes portées', icon: 'Ruler' },
];

export const sandwichHero = {
  title: 'Panneaux Sandwichs',
  subtitle: "Solutions d'isolation haute performance pour la construction moderne.",
};

export const sandwichIntro = {
  title: 'Panneaux Sandwichs & Solutions de Construction',
  text: "Découvrez notre gamme complète de panneaux sandwichs et solutions pour bâtiments préfabriqués (PEB). Conçus pour offrir une isolation thermique et acoustique supérieure, nos panneaux sont la solution idéale pour les toitures, les bardages et les chambres froides. Chaque variation est conçue avec précision pour répondre aux exigences spécifiques de votre projet, garantissant durabilité, efficacité énergétique et une finition esthétique impeccable.",
};
