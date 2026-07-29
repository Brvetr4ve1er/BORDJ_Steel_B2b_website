
import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/pages/media-center/PlaceholderPage';

export const metadata: Metadata = {
  title: 'Media Center',
  description:
    'Le centre de médias de Bordj Steel : actualités, projets, vidéos et ressources sur la construction métallique en Algérie.',
  robots: { index: false, follow: true },
};

export default function MediaCenterPage() {
  return (
    <PlaceholderPage
      title="Media Center"
      subtitle="Explorez nos actualités, projets et ressources."
      image={{
        src: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800&q=80",
        alt: "Espace médias Bordj Steel",
        aiHint: "media center",
      }}
    />
  );
}
