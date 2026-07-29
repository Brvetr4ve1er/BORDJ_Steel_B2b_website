
import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/pages/media-center/PlaceholderPage';

export const metadata: Metadata = {
  title: 'Galerie',
  description:
    'Galerie photo des réalisations Bordj Steel : charpentes métalliques, panneaux sandwich et projets industriels en images.',
  robots: { index: false, follow: true },
};

export default function GalleryPage() {
  return (
    <PlaceholderPage
      title="Galerie"
      subtitle="Explorez nos réalisations en images."
      image={{
        src: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?w=800&q=80",
        alt: "Galerie de réalisations Bordj Steel",
        aiHint: "photo gallery",
      }}
    />
  );
}
