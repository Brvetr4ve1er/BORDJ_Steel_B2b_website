import type { Metadata } from 'next';
import { BlogPageContent } from '@/components/pages/blog-page-content';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Actualités, innovations et savoir-faire de l’industrie de l’acier : articles, certifications ISO et catalogue Bordj Steel.',
};

// A plain server page: the content renders on the server, and the one part that
// reads `?tab=` carries its own (empty) Suspense boundary inside
// `BlogPageContent`. Wrapping the whole page here is what used to reduce the
// prerendered HTML to "Chargement…".
export default function BlogPage() {
    return <BlogPageContent />;
}
