/**
 * Offres d'emploi — the listings the /recrutement page publishes.
 *
 * MOVED OUT OF THE COMPONENT. These two offers used to be a literal array
 * inside recruitment-page.tsx. Every French string below is the client's own
 * copy, reproduced character for character: the casing really does differ
 * between "SPA BORDJSTEEL" and "SPA BordjSteel", the first description really
 * does break off at "Diplôme de [...]", and the second really is nothing but
 * its two headings. None of it was tidied, completed or re-punctuated —
 * finishing a client's job advert is not this file's job.
 *
 * THE DATES ARE APPROXIMATE, AND THAT IS THE WHOLE POINT. The component used to
 * carry fixed strings, "Publié il y a 1 mois" and "Publié il y a 2 mois". They
 * were typed once, months ago, and never recomputed — so they were already
 * false by the time anyone read them and would have gone on drifting a month at
 * a time. The relative phrase is now derived at render time from the absolute
 * `posted` dates here, which is the only version of this that stays true.
 *
 * The absolute dates themselves, though, are NOT facts the client gave us. They
 * were back-derived on 2026-10-26 from those two hardcoded strings: "1 mois"
 * became 2026-09-26, "2 mois" became 2026-08-26. They reproduce what the site
 * already claimed and carry no more authority than that. REPLACE THEM WITH THE
 * REAL POSTING DATES once the client supplies them, and do not quote either one
 * as the day an offer actually opened.
 *
 * `category` and `employmentType` are filter keys, not display copy. They have
 * to keep matching the option tables in recruitment-page.tsx, which shows only
 * the filters whose values actually occur below.
 */
export type JobListing = {
  /** Stable key for the rendered list. */
  readonly id: number;
  /** Job title, as published. */
  readonly title: string;
  /** Hiring entity, as published — including its inconsistent casing. */
  readonly company: string;
  /**
   * ISO date (YYYY-MM-DD) the offer went up. APPROXIMATE: back-derived from the
   * relative strings this page used to hardcode, not a date supplied by the
   * client. See the file header before relying on it.
   */
  readonly posted: string;
  /** Body copy, as published. Neither rewritten nor completed. */
  readonly description: string;
  /** Contract wording shown on the card, e.g. "Temps plein". */
  readonly type: string;
  /** Place of work, as published. */
  readonly location: string;
  /** Filter key for the « Catégorie » select. */
  readonly category: string;
  /** Filter key for the « Type d'emploi » select. */
  readonly employmentType: string;
};

export const jobListings: readonly JobListing[] = [
  {
    id: 1,
    title: 'Ingénieur Maintenance',
    company: 'SPA BORDJSTEEL',
    posted: '2026-09-26',
    description:
      'Missions principales : Profil recherché : Capacité à travailler en équipe et à gérer les urgences. Diplôme de [...]',
    type: 'Temps plein',
    location: 'Bordj Bou Arréridj - Algérie',
    category: 'maintenance',
    employmentType: 'temps-plein',
  },
  {
    id: 2,
    title: 'Technicien En Informatique',
    company: 'SPA BordjSteel',
    posted: '2026-08-26',
    description: 'Missions principales : Profil recherché :',
    type: 'Temps plein',
    location: 'Bordj Bou Arréridj - Algérie',
    category: 'informatique',
    employmentType: 'temps-plein',
  },
];
