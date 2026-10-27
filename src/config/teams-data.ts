/* -------------------------------------------------------------------------- */
/* "Nos équipes spécialisées" (/about/history)                                 */
/* -------------------------------------------------------------------------- */

/**
 * Which lucide glyph a given team renders with — and, simultaneously, the team's
 * stable identity (these ids were already the React keys before this copy moved
 * out of JSX, so nothing downstream shifts).
 *
 * Deliberately a union rather than `string`: `TeamsSection` resolves it through a
 * total `Record<TeamIconKey, LucideIcon>`, so adding a team here without adding
 * its icon there is a *compile* error rather than a card that silently loses its
 * figure. Same contract as `ActivityIconKey` in `company-data.ts`.
 */
export type TeamIconKey =
  | 'engineering'
  | 'production'
  | 'quality'
  | 'hse'
  | 'commercial'
  | 'finance'
  | 'hr'
  | 'it'
  | 'assembly';

export type Team = {
  readonly id: TeamIconKey;
  readonly title: string;
  readonly description: string;
  readonly image: string;
};

/**
 * The nine specialised teams, rendered by `TeamsSection` on /about/history.
 *
 * Client copy, reproduced exactly as supplied — including the curly apostrophes
 * (U+2019) throughout, the parentheses wrapping the 'finance' and 'hr' entries,
 * and the leading gloss on 'hse'. Those are the client's own punctuation, not
 * authoring slips: do not normalise them.
 */
export const teamsSection: {
  readonly title: string;
  readonly items: readonly Team[];
} = {
  title: "Nos équipes spécialisées",
  items: [
    {
      id: 'engineering',
      title: "Bureau d'études",
      description: "Véritable moteur de l’innovation, notre bureau d’études conçoit et optimise les structures métalliques selon les besoins spécifiques de chaque client. Il veille à la faisabilité technique, à la solidité et à la performance de nos réalisations.",
      image: "/media/ddd2b884a8cdf6c38c4fe8c6ea24-e643252a.webp",
    },
    {
      id: 'production',
      title: "Équipe Production",
      description: "Au cœur de notre activité, l’équipe de production assure la fabrication, l’assemblage et le contrôle des différents composants. Grâce à une maîtrise technique avancée et à des équipements modernes, elle garantit la fiabilité et la durabilité de nos produits.",
      image: "/media/c122d0a87b9a67655d2af2921bc6-916d01f3.webp",
    },
    {
      id: 'quality',
      title: "Équipe Contrôle Qualité",
      description: "Cette équipe veille à la conformité de nos produits aux normes nationales et internationales. Des contrôles rigoureux sont effectués à chaque étape – de la conception à la livraison – afin d’assurer une qualité irréprochable.",
      image: "/media/361fd5991471a9382f7e7cada21f-41d4fb74.webp",
    },
    {
      id: 'hse',
      title: "Équipe QHSE",
      description: "(Qualité, Hygiène, Sécurité et Environnement) Notre équipe QHSE veille à la qualité de nos processus, à la sécurité de nos collaborateurs, à la prévention des risques professionnels et à la protection de l’environnement. La sécurité, la qualité et la durabilité font partie intégrante de la culture BordjSteel.",
      image: "/media/9914b30d1923fb9585db5fa69276-3ce776ad.webp",
    },
    {
      id: 'commercial',
      title: "Équipe Commerciale et Marketing",
      description: "Toujours à l’écoute du marché, notre équipe commerciale et marketing accompagne nos clients à chaque étape de leurs projets. Elle met un point d’honneur à offrir des solutions personnalisées, un suivi attentif et un service de qualité.",
      image: "/media/2c792262ee0e5c2f3a1290cd0682-610b04f1.webp",
    },
    {
      id: 'finance',
      title: "Équipe Comptabilité et Finances",
      description: "(Chargée de la gestion rigoureuse des ressources financières, cette équipe assure le suivi comptable, le contrôle budgétaire et la transparence de toutes les opérations économiques de l’entreprise. Son objectif : garantir une santé financière solide et durable.)",
      image: "/media/4796a1c0ca2eeec68b8721a16d75-988e5c89.webp",
    },
    {
      id: 'hr',
      title: "Équipe Ressources Humaines",
      description: "(Au centre de la vie de l’entreprise, l’équipe RH veille au bien-être, à la formation et à l’évolution de nos collaborateurs. Elle favorise un environnement de travail motivant et valorisant, essentiel à la performance collective.)",
      image: "/media/f151108391838728e14d8cfa85af-01289a1d.webp",
    },
    {
      id: 'it',
      title: "Équipe Système d’Information",
      description: "Responsable de la gestion et du développement des outils numériques, cette équipe garantit la sécurité, la performance et la continuité des systèmes informatiques. Elle joue un rôle clé dans la transformation digitale de BordjSteel.",
      image: "/media/6ac86a94f2a9c05bf62c26abddb1-46e5dc70.webp",
    },
    {
      id: 'assembly',
      title: "Équipe Réalisation et Montage",
      description: "Spécialisée dans l’installation sur site, cette équipe assure le montage précis et sécurisé de nos structures métalliques. Son savoir-faire garantit la conformité, la stabilité et la qualité de chaque projet livré.",
      image: "/media/a30d652c6e58b3aebe5ca3561af4-c5bd987d.webp",
    },
  ],
};
