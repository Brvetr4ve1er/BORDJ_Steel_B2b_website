
import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/pages/media-center/PlaceholderPage';

export const metadata: Metadata = {
  title: 'Vidéos',
  description:
    'Découvrez nos projets de construction métallique en vidéo : chantiers, fabrication et réalisations Bordj Steel.',
  robots: { index: false, follow: true },
};

export default function VideosPage() {
  return (
    <PlaceholderPage
      title="Vidéos"
      subtitle="Découvrez nos projets en vidéo."
      image={{
        src: "/media/1581091226825-0596e30c.webp",
        alt: "Production industrielle en acier",
        aiHint: "steel industrial production",
      }}
    />
  );
}
