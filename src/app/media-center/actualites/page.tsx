
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
        src: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=800&q=80",
        alt: "Pile de journaux",
        aiHint: "newspapers stack",
      }}
    />
  );
}
