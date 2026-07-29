
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
        src: "/media/1534353436294-2afca52f.webp",
        alt: "Galerie de réalisations Bordj Steel",
        aiHint: "photo gallery",
      }}
    />
  );
}
