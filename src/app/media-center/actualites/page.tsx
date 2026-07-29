
import type { Metadata } from 'next';
import { PlaceholderPage } from '@/components/pages/media-center/PlaceholderPage';

export const metadata: Metadata = {
  title: 'Actualités',
  description:
    'Les dernières nouvelles, annonces et événements de Bordj Steel, expert algérien de la construction métallique.',
  robots: { index: false, follow: true },
};

export default function ActualitesPage() {
  return (
    <PlaceholderPage
      title="Actualités"
      subtitle="Les dernières nouvelles de Bordj Steel."
      image={{
        src: "/media/1495020689067-fda78dfb.webp",
        alt: "Pile de journaux",
        aiHint: "newspapers stack",
      }}
    />
  );
}
