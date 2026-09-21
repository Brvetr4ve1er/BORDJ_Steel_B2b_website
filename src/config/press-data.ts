/**
 * Revue de presse — third-party articles that NAME Bordj Steel.
 *
 * WHAT THIS IS, AND WHAT IT IS NOT. These are not company announcements and
 * this is not a news feed the company writes. Every entry below was published
 * by somebody else, found by search and then read on the live page before being
 * listed. No entry was accepted on the strength of a search-result snippet.
 *
 * ACCEPTANCE RULE. An item qualifies only if the literal string "Bordj Steel"
 * appears in the article BODY. Coverage of CONDOR or of Bordj Bou Arréridj that
 * never names the subsidiary was rejected, and that was the overwhelming
 * majority of what the search returned — the parent group gets far more press
 * than this company does. Each entry carries the exact sentence that earned it
 * its place, quoted character for character, so the claim is checkable without
 * leaving the page.
 *
 * `kind` IS THE HONEST PART, AND IT MATTERS.
 *   presse      — the outlet wrote it. Journalism about the company.
 *   communique  — the company or the group wrote it and the outlet carried it:
 *                 press releases and, in one case (tsa-salons-2019), material
 *                 the outlet itself labels sponsored content.
 * Both belong on a revue de presse. Silently presenting the second kind as the
 * first would not, so the page labels every card.
 *
 * ONE CANDIDATE WAS REJECTED HERE rather than in verification: an article on
 * condor-tunisie.tn naming Bordj Steel among the group's exhibitors. It verified
 * cleanly, but it is published by the parent group's own corporate site. That is
 * the company talking about itself, not press coverage.
 *
 * ARCHIVE LINKS. Entries flagged `archived` point at web.archive.org because the
 * publisher is unreachable, not because the article was deleted. tsa-algerie.com
 * refuses connections outright — the domain root fails too, not just these URLs
 * — so the archived snapshot is the only readable copy. Every other entry links
 * to the live original, confirmed reachable.
 *
 * NOT EXHAUSTIVE. The sweep covered French, Arabic, institutional, B2B and
 * archival angles, but verification was cut short before the Arabic-language
 * outlets and several directories were finished. Absence from this list is not
 * evidence that an article does not exist.
 */
export type PressKind = 'presse' | 'communique';

export type PressItem = {
  readonly id: string;
  /** Outlet that published it. */
  readonly publisher: string;
  /** Verbatim headline as published. */
  readonly headline: string;
  /** Publication date read off the page itself. */
  readonly date: string;
  /** Link a reader can follow. */
  readonly url: string;
  /** True when `url` is a web.archive.org snapshot because the original is unreachable. */
  readonly archived: boolean;
  /** The exact sentence naming the company, copied character for character. */
  readonly quote: string;
  /** One neutral French line of context. Adds no fact the article does not state. */
  readonly summary: string;
  readonly kind: PressKind;
  /** primary = the article is about Bordj Steel; mention = named within a wider story. */
  readonly prominence: 'primary' | 'mention';
};

export const pressItems: readonly PressItem[] = [
  {
    id: 'tsa-hyundai-2021',
    publisher: "TSA (Tout sur l'Algérie)",
    headline: 'Acier : une filiale de Condor décroche un contrat avec Hyundai',
    date: '2021-09-30',
    url: 'https://web.archive.org/web/20210930144453id_/https://www.tsa-algerie.com/acier-une-filiale-de-condor-decroche-un-contrat-avec-hyundai/',
    archived: true,
    quote:
      "Dans le cadre de la réalisation d’une centrale électrique à Biskra (Oumache III), l’entreprise Bordj Steel, filiale du groupe Condor, a décroché un contrat d’un montant de 1,17 milliard de DA avec le sud-coréen Hyundai engineering & construction, pour la fourniture de 3300 tonnes d’acier.",
    summary:
      "Contrat de 1,17 milliard de dinars avec Hyundai Engineering & Construction pour 3 300 tonnes d’acier destinées à la centrale électrique d’Oumache III, à Biskra.",
    kind: 'presse',
    prominence: 'primary',
  },
  {
    id: 'algerie-eco-hyundai-2021',
    publisher: 'Algérie Eco',
    headline:
      'Réalisation d’une centrale électrique à Biskra : Bordj Steel décroche un contrat avec Hyundai E&C',
    date: '2021-09-30',
    url: 'https://www.algerie-eco.com/2021/09/30/realisation-dune-centrale-electrique-a-biskra-bordj-steel-decroche-un-contrat-avec-hyundai-ec/',
    archived: false,
    quote:
      'Bordj Steel, une filiale du groupe Condor, a décroché un contrat avec le sud-coréen Hyundai engineering & construction (Hyundai E&C).',
    summary:
      "Le même contrat, couvert par la presse économique : 3 300 tonnes d’acier pour la centrale d’Oumache III.",
    kind: 'presse',
    prominence: 'primary',
  },
  {
    id: 'express-quotidien-hyundai-2021',
    publisher: 'L’Express Quotidien',
    headline: 'Condor signe un partenariat avec Hyundai pour 11 millions de dollars',
    date: '2021-10-03',
    url: 'https://www.lexpressquotidien.dz/2021/10/03/condor-signe-un-partenariat-avec-hyundai-pour-11-millions-de-dollars/',
    archived: false,
    quote:
      'Filiale du groupe Condor Electronics, Bordj Steel, entreprise spécialisée dans la charpente métallique, la galvanisation et la chaudronnerie, a signé mercredi dernier, un important contrat avec Hyundai engineering –construction (HDEC).',
    summary: 'Reprise du contrat Hyundai, chiffré ici à 11 millions de dollars.',
    kind: 'presse',
    prominence: 'primary',
  },
  {
    id: 'tsa-nouvelles-usines-2022',
    publisher: "TSA (Tout sur l'Algérie)",
    headline: 'Condor autorisé à lancer de nouvelles usines',
    date: '2022-03-14',
    url: 'https://web.archive.org/web/20220316073630id_/https://www.tsa-algerie.com/condor-autorise-a-lancer-de-nouvelles-usines/',
    archived: true,
    quote:
      'Dans le détail, Condor précise que cinq autorisations ont été délivrées au nom de l’entreprise Bordj Steel, filiale du groupe privé spécialisée dans la production de charpente métallique, panneaux sandwiches et galvanisation.',
    summary:
      'Cinq des six autorisations d’exploitation obtenues par le groupe dans la zone industrielle de Bordj Bou Arréridj sont délivrées au nom de Bordj Steel.',
    kind: 'presse',
    prominence: 'mention',
  },
  {
    id: 'la-patrie-news-unites-2022',
    publisher: 'La Patrie News',
    headline: 'Le groupe Condor lance de nouvelles unités de production à Bordj Bou Arréridj',
    date: '2022-03-14',
    url: 'https://lapatrienews.dz/le-groupe-condor-lance-de-nouvelles-unites-de-production-a-bordj-bou-arreridj/',
    archived: false,
    quote:
      'Selon un communiqué de Condor, cinq autorisations ont été délivrées au nom de « l’entreprise Bordj Steel spécialisée dans la production de la charpente métallique, panneaux sandwiches, galvanisation ».',
    summary: 'Couverture de la même annonce, qui détaille les trois activités concernées.',
    kind: 'presse',
    prominence: 'mention',
  },
  {
    id: 'algerie-patriotique-sitp-2018',
    publisher: 'Algérie Patriotique',
    headline: 'A travers sa filiale Bordj Steel : Condor Group participe au SITP 2018',
    date: '2018-11-21',
    url: 'https://algeriepatriotique.com/2018/11/21/a-travers-sa-filiale-bordj-steel-condor-group-participe-au-sitp-2018/',
    archived: false,
    quote:
      'Bordj Steel, filiale du groupe Condor, participe à la seizième édition du Salon international des travaux publics (SITP), qui se déroule du 21 au 25 novembre 2018 à la Safex d’Alger.',
    summary:
      'Participation à la 16e édition du Salon international des travaux publics, à la Safex d’Alger.',
    kind: 'communique',
    prominence: 'primary',
  },
  {
    id: 'algerie-patriotique-djazagro-2019',
    publisher: 'Algérie Patriotique',
    headline:
      'Condor Group participe à plusieurs salons à travers ses filiales Bordj Steel, Security System et AIMA',
    date: '2019-03-01',
    url: 'https://algeriepatriotique.com/2019/03/01/condor-group-participe-a-plusieurs-salons-a-travers-ses-filiales-bordj-steel-security-system-et-aima/',
    archived: false,
    quote:
      'Bordj Steel, filiale du groupe Condor, a participé à la 17e édition du salon professionnel de la production agroalimentaire Djazagro qui s’est déroulé du 25 au 28 février 2019 à la Safex d’Alger.',
    summary:
      'Présentation de la charpente métallique, des panneaux sandwichs et des bardages au salon Djazagro 2019.',
    kind: 'communique',
    prominence: 'mention',
  },
  {
    id: 'tsa-salons-2019',
    publisher: "TSA (Tout sur l'Algérie)",
    headline:
      'A travers ses filiales Bordj Steel, Security System et AIMA : Condor Group participe à plusieurs salons à travers le territoire national',
    date: '2019-03-01',
    url: 'https://web.archive.org/web/20190302144529id_/https://www.tsa-algerie.com/a-travers-ses-filiales-bordj-steel-security-system-et-aima-condor-group-participe-a-plusieurs-salons-a-travers-le-territoire-national/',
    archived: true,
    quote:
      'Doté d’un investissement de 35 millions d’euros, Bordj Steel est spécialisée dans la charpente métallique, la fabrication de panneaux sandwichs ainsi que la galvanisation à chaud.',
    summary:
      'Contenu sponsorisé signé Condor. Cite un investissement de 35 millions d’euros pour Bordj Steel.',
    kind: 'communique',
    prominence: 'mention',
  },
  {
    id: 'algerie360-batimatec-2016',
    publisher: 'Algerie360',
    headline: 'Le Groupe BENHAMADI Présent au salon « BATIMATEC 2016 »',
    date: '2016-05-04',
    url: 'https://www.algerie360.com/le-groupe-benhamadi-present-au-salon-batimatec-2016/',
    archived: false,
    quote: '– Hodna métal et Bordj Steel : Fabrication de panneaux sandwiches',
    summary:
      'La plus ancienne mention retrouvée : Bordj Steel figure parmi les filiales présentes à BATIMATEC 2016.',
    kind: 'communique',
    prominence: 'mention',
  },
];

/** Newest first — the order the page renders. */
export const pressItemsByDate: readonly PressItem[] = [...pressItems].sort((a, b) =>
  b.date.localeCompare(a.date),
);
