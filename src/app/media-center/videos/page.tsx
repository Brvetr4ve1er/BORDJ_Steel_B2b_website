
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
        src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80&auto=format&fit=crop",
        alt: "Production industrielle en acier",
        aiHint: "steel industrial production",
      }}
    />
  );
}
