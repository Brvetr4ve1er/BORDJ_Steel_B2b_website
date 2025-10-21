
import images from '@/app/lib/placeholder-images.json';

export const charpenteMetalliqueData = {
  hero: {
    title: 'Charpente Métallique',
    subtitle: "Solutions d'ingénierie robustes pour les projets les plus ambitieux. Nous concevons, fabriquons et montons des structures en acier pour tous types de bâtiments.",
    stats: [
      { title: 'Capacité de production', value: 25000, unit: ' T/an', icon: 'HardHat' },
      { title: 'Capacité de PRS', value: 3000, unit: ' T/an', icon: 'Cog' },
      { title: "Surface de l'unité", value: 10000, unit: ' m²', icon: 'Layers' },
    ],
    image_url: images['charpente-metallique'].main.src,
    alt: images['charpente-metallique'].main.alt,
    aiHint: images['charpente-metallique'].main.aiHint,
    blurDataUrl: images['charpente-metallique'].main.blurDataUrl,
    cta_primary: 'Demander un devis',
    cta_secondary: 'Télécharger la brochure',
  }
};
