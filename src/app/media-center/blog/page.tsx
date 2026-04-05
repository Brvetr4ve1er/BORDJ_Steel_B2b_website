
import React, { Suspense } from 'react';
import { BlogPageContent } from '@/components/pages/blog/blog-page-content';

export default function BlogPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogPageContent />
        </Suspense>
    )
}

    