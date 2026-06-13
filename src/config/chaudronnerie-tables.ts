// Hardcoded editorial/tabular content for the Chaudronnerie page, extracted
// verbatim from the page component so the JSX stays presentational.

export interface ChaudronnerieTableRow {
  capacite: number;
  format: string;
  epaisseur: number;
  longVirole: string;
  longTotale: string;
  poidsUnite: string;
  nbreTrous: string;
  pressionEpreuve: string;
}

export const geometricTableData: ChaudronnerieTableRow[] = [
  { capacite: 3, format: "1 250", epaisseur: 4, longVirole: "2 200.00", longTotale: "2 730.00", poidsUnite: "468,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
  { capacite: 5, format: "1 250", epaisseur: 5, longVirole: "3 850.00", longTotale: "4 290.00", poidsUnite: "469,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
  { capacite: 10, format: "1 900", epaisseur: 6, longVirole: "3 200.00", longTotale: "4 010.00", poidsUnite: "1 387,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
  { capacite: 15, format: "1 900", epaisseur: 6, longVirole: "5 000.00", longTotale: "5 810.00", poidsUnite: "1 908,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
  { capacite: 20, format: "2 500", epaisseur: 6, longVirole: "4 692.00", longTotale: "5 810.00", poidsUnite: "2 102,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
  { capacite: 30, format: "2 500", epaisseur: 6, longVirole: "5 700.00", longTotale: "6 742.00", poidsUnite: "2 909,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
  { capacite: 40, format: "3 000", epaisseur: 6, longVirole: "5 130.00", longTotale: "6 193.00", poidsUnite: "3 363,00", nbreTrous: "1 ou 2", pressionEpreuve: "3 Bars" },
  { capacite: 50, format: "3 000", epaisseur: 6, longVirole: "6 560.00", longTotale: "7 626.00", poidsUnite: "4 133,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
  { capacite: 60, format: "3 000", epaisseur: 6, longVirole: "8 000.00", longTotale: "9 066.00", poidsUnite: "4 803,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
  { capacite: 100, format: "3 000", epaisseur: 6, longVirole: "13 600.00", longTotale: "14 886.00", poidsUnite: "7 611,00", nbreTrous: "1", pressionEpreuve: "3 Bars" },
];

export const chaudronnerieDrawingImages: string[] = [
  "https://i.pinimg.com/736x/05/76/f1/0576f18a52e3a3bb870dfe46089eae54.jpg",
  "https://i.pinimg.com/736x/51/a9/e3/51a9e370aa2ddbb7439c177612e9a1d2.jpg",
  "https://i.pinimg.com/736x/57/a7/2b/57a72be37dbd74bf3de07deacdf9aa1f.jpg",
  "https://i.pinimg.com/736x/6e/10/d6/6e10d64b38329f46cd84e03b5256f2f3.jpg",
  "https://i.pinimg.com/736x/2a/df/0b/2adf0bc95fdf6b023316e8b398fc7cf9.jpg",
  "https://i.pinimg.com/736x/15/4d/42/154d42e3d73c5e6fdac5e49213e0b2bb.jpg",
  "https://i.pinimg.com/736x/11/67/cd/1167cd7b335b19a5d1695a0993b20d31.jpg",
  "https://i.pinimg.com/736x/22/2e/41/222e41debeda041c6485c8d2ee91f2d5.jpg",
  "https://i.pinimg.com/736x/7d/80/e2/7d80e268117ead2bd32b20f760c46543.jpg",
  "https://i.pinimg.com/736x/0b/9e/6f/0b9e6f0a129b6b060b180e4a575ab74a.jpg",
];

// Domaines d'activités — icon resolved by name in the component.
export const chaudronnerieActivities: { title: string; iconName: string }[] = [
  { title: 'Hydrocarbures', iconName: 'Flame' },
  { title: 'Énergie et Mines', iconName: 'Bolt' },
  { title: 'Hydraulique', iconName: 'Droplets' },
  { title: 'Pharmaceutique', iconName: 'Beaker' },
  { title: 'Travaux Publics', iconName: 'Construction' },
  { title: 'Environnement', iconName: 'Leaf' },
  { title: 'Traitement des Eaux', iconName: 'Filter' },
];
