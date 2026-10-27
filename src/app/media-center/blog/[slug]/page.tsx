
import type { Metadata } from 'next';
import { articles } from '@/config/blog-data';
import { companyData } from '@/config/company-data';
import { notFound } from 'next/navigation';
import { ProductPageLayout } from '@/components/product-page-layout';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AnimatedWrapper } from '@/components/animated-wrapper';

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.id,
  }));
}

// Unknown slugs 404 at the router instead of rendering. Without this the
// default `dynamicParams = true` rendered any slug on demand, and because the
// page itself answered, the response was a 200 carrying the global not-found
// body — a soft-404 that Netlify then cached for a year under the route's
// `s-maxage`. Every article is enumerated above, so refusing unknown params
// costs nothing: a new article needs a rebuild either way.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((p) => p.id === slug);

  if (!article) {
    return {
      title: 'Article',
      description:
        'Actualités, innovations et savoir-faire de l’industrie de l’acier par Bordj Steel.',
    };
  }

  const description =
    article.description.length > 155
      ? `${article.description.slice(0, 155).trimEnd()}…`
      : article.description;

  return {
    title: article.title,
    description,
    // `openGraph` and `twitter` are each replaced wholesale by a page-level
    // block rather than merged into the root one, so `type`, `locale` and
    // `siteName` have to be restated here or the article pages emit none of
    // them. `twitter.images` likewise: without it every article inherited the
    // root card's generic /og-image.png. Next fills the card's title and
    // description from `openGraph` below.
    openGraph: {
      type: 'article',
      locale: 'fr_FR',
      siteName: companyData.siteMetadata.title,
      images: [article.imageUrl],
    },
    twitter: {
      images: [article.imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = articles.find((p) => p.id === slug);

  if (!article) {
    notFound();
  }

  return (
    <ProductPageLayout>
        <div className="bg-background pt-24 pb-16 md:pt-32 md:pb-24">
            <div className="container mx-auto px-4">
                <AnimatedWrapper animation="fade-in">
                    <Button asChild variant="outline" className="mb-8">
                        <Link href="/media-center/blog">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Retour au blog
                        </Link>
                    </Button>
                </AnimatedWrapper>
                <article className="max-w-4xl mx-auto">
                    <header className="mb-8">
                        <div className="mb-4">
                            <span className="rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">{article.tag}</span>
                        </div>
                        <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">{article.title}</h1>
                        <div className="flex items-center gap-4 text-muted-foreground">
                            {article.author && (
                            <div className="flex items-center gap-3">
                                {/*
                                  Always the avatarUrl the config points at. This
                                  previously special-cased ".svg" and swapped in the
                                  21 KB inline <Logo> component for a 40x40 avatar —
                                  the very file it stood in for was already in
                                  public/. Avatar/AvatarImage renders a plain <img>,
                                  so the SVG is fetched once and cached rather than
                                  re-inlined into every article's HTML.
                                */}
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={article.author.avatarUrl} alt={article.author.name} className="object-contain" />
                                    <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="font-semibold text-sm">{article.author.name}</span>
                            </div>
                            )}
                            <span className="text-sm">{article.date}</span>
                        </div>
                    </header>

                    <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden mb-8 shadow-lg">
                        <Image
                            src={article.imageUrl}
                            alt={article.title}
                            sizes="(max-width: 1024px) 100vw, 640px"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <AnimatedWrapper animation="fade-in" staggerIndex={2}>
                        <div
                          lang={article.lang ?? 'fr'}
                          dir={article.lang === 'ar' ? 'rtl' : 'ltr'}
                          className="prose prose-lg max-w-none text-foreground text-xl leading-relaxed whitespace-pre-wrap"
                        >
                           {article.description}
                        </div>
                    </AnimatedWrapper>
                </article>
            </div>
        </div>
    </ProductPageLayout>
  );
}
