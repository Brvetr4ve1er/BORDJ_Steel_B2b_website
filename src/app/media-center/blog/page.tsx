import type { Metadata } from 'next';
import { Suspense } from 'react';
import { BlogPageContent } from '@/components/pages/blog-page-content';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Actualités, innovations et savoir-faire de l’industrie de l’acier : articles, certifications ISO et catalogue Bordj Steel.',
};

export default function BlogPage() {
    return (
        <Suspense fallback={<div>Chargement…</div>}>
            <BlogPageContent />
        </Suspense>
    )
}
