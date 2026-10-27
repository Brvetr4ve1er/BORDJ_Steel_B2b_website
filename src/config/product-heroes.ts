import type { HeroMedia } from '@/components/sections/technical-hero';

/**
 * The photographic ground behind each product hero.
 *
 * PROVENANCE, STATED PLAINLY. These four frames are generated, not photographs
 * of the Bordj Bou Arréridj plant. That is a step up from what they replace,
 * not a new compromise: the galvanisation and chaudronnerie heroes already in
 * the repository were generated too — and badly, with unreadable lettering
 * invented onto an overhead crane and box sections hanging out of a bath at an
 * impossible angle — while the charpente one was stock photography of somebody
 * else's building, under a mountain range that is not in Algeria.
 *
 * Each prompt was written against what the unit actually does, as recorded in
 * `src/config/*-data.ts`: welded plate girders on trestles under a travelling
 * crane; lattice supports lowered into a zinc kettle; a rolled shell on timber
 * packing beside a three-roll bender; pre-painted coil feeding a panel line.
 * No figure, dimension, capacity or certification is depicted — nothing here is
 * evidence of anything, and no lettering was generated at all, which is what
 * gave the previous set away.
 *
 * WHEN THE CLIENT SUPPLIES REAL PHOTOGRAPHY these entries should be replaced
 * src-for-src. Nothing else has to change: `TechnicalHero` takes whatever
 * `HeroMedia` it is handed, and falls back to its drawn motif if `media` is
 * dropped entirely.
 *
 * Encoded at 3200px wide — the band is 1440 CSS wide and KenBurns over-scales
 * it by about 10%, so a 2x screen wants ~3170 and anything beyond that is bytes
 * nobody sees.
 */
export const PRODUCT_HERO_MEDIA = {
  charpente: {
    src: '/media/heroes/charpente-hero-3cb60d90.webp',
    alt:
      'Atelier de charpente métallique Bordj Steel : poutres reconstituées soudées alignées sur chevalets sous un pont roulant.',
    blurDataUrl:
      'data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAAAQAgCdASoQAAkAA4BaJZQCdAEWZfs9/hYAAP68djoNoF52umC4uymRt5bwSPFJ5BsfP1UTr0dOLvqJkGb3IVHkUwAAAA==',
  },
  galvanisation: {
    src: '/media/heroes/galvanisation-hero-9dd2a49b.webp',
    alt:
      'Unité de galvanisation à chaud Bordj Steel : ensemble de supports en treillis descendu au pont roulant dans le bain de zinc en fusion.',
    blurDataUrl:
      'data:image/webp;base64,UklGRlQAAABXRUJQVlA4IEgAAAAwAgCdASoQAAkAA4BaJZQCdAEPh9TxByYKgAD+9aFWGLEGcbUgNg0uOiJMmfmHjCA8C/sZVTuJQXM2zAoQbGI9LcgeHQ98AAA=',
  },
  chaudronnerie: {
    src: '/media/heroes/chaudronnerie-hero-43e7676d.webp',
    alt:
      'Atelier de chaudronnerie Bordj Steel : virole roulée et soudée sur bers, rouleuse à trois rouleaux et fonds bombés à l\'arrière-plan.',
    blurDataUrl:
      'data:image/webp;base64,UklGRlAAAABXRUJQVlA4IEQAAADQAQCdASoQAAkAA4BaJYwCdAEOcbGDEAD+YCyiv4B2Qv6G0HT7OnMlCRwO9EUMHx7QZUbEVr2Y+0lgf40acNMg7bgAAA==',
  },
  sandwich: {
    src: '/media/heroes/sandwich-hero-038f756d.webp',
    // Bright, white-walled factory: at the default scrim the white headline
    // sat at roughly the wall's own luminance and vanished.
    scrim: 'strong',
    alt:
      'Ligne de panneaux sandwichs Bordj Steel : bobines d\'acier prélaqué en entrée de profileuse, panneaux finis empilés sur convoyeur à rouleaux.',
    blurDataUrl:
      'data:image/webp;base64,UklGRkwAAABXRUJQVlA4IEAAAADwAQCdASoQAAkAA4BaJZQC7ADcr0upAQAAy0xNBZTr9GZN3gDK+XRfaPOrf6ecWE8C9slmn92vGU4GCVjKhCAA',
  },
} satisfies Record<string, HeroMedia>;
