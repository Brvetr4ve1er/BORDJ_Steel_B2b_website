
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
        src: "/media/1585829365295-8c75ac1e.webp",
        alt: "Espace médias Bordj Steel",
        aiHint: "media center",
      }}
    />
  );
}
