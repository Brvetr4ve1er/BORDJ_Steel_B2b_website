import { ProductPageLayout } from '@/components/product-page-layout';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import { TechnicalHero } from '@/components/sections/technical-hero';
import Image from 'next/image';
import { Suspense } from 'react';
import { BookCopy } from 'lucide-react';
import { DownloadButton } from '@/components/ui/download-button';
import { articles as allArticles } from '@/config/blog-data';
import { certifications, type Certification } from '@/config/company-data';
import { Button } from '@/components/ui/button';
import { BlogPostCard } from '@/components/ui/blog-post-card';
import { buildArticleIndex } from '@/components/pages/media-center/blog/blog-article-index';
import { BlogViewProvider } from '@/components/pages/media-center/blog/blog-view-context';
import {
    BlogInitialTab,
    BlogSearchField,
    BlogSortSelect,
    BlogTabs,
} from '@/components/pages/media-center/blog/blog-view-controls';
import {
    BlogArticleGrid,
    BlogArticleSlot,
    BlogEmptyState,
    BlogFeaturedSlot,
    BlogTabPanel,
} from '@/components/pages/media-center/blog/blog-view-slots';

/**
 * This page is server-rendered. It used to be one ~300-line `"use client"`
 * component behind a page-wide `<Suspense>`, and because it called
 * `useSearchParams()` to read `?tab=`, Next.js resolved the whole boundary to
 * its fallback at prerender time: the built HTML for /media-center/blog was the
 * single word "Chargement…" — no hero, no articles, no certificates, nothing a
 * crawler or a no-JS visitor could read.
 *
 * So the content is plain server markup again, and only the reader's *view* of
 * it — active tab, query, sort order — is client state (see
 * `media-center/blog/blog-view-context.tsx`). The `?tab=` read is isolated in
 * `<BlogInitialTab />`, which renders nothing, so its Suspense boundary can
 * fall back to nothing.
 */

/**
 * The certificates live in `certifications` (src/config/company-data.ts),
 * shared with the homepage seal band and /about/history. The `pdf` field is
 * still absent there while the client has not supplied the signed files, which
 * is what keeps the disabled "Bientôt disponible" branch below live.
 */
function CertificationCard({ cert }: { cert: Certification }) {
    return (
        <div className="relative group w-full max-w-sm mx-auto">
            <div className="relative bg-card p-6 rounded-lg shadow-md border border-border transition-all duration-300 ease-in-out group-hover:shadow-2xl flex flex-col items-center justify-center text-center h-56 w-56 mx-auto overflow-hidden">
                <Image
                    src={cert.logo}
                    alt={cert.code}
                    fill
                    sizes="224px"
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                />
            </div>
             <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-primary">{cert.code}</h3>
                <p className="text-md text-muted-foreground">{cert.scope}</p>
                {cert.pdf ? (
                    <Button asChild variant="outline" className="mt-4">
                        <a href={cert.pdf} target="_blank" rel="noopener noreferrer">Voir le document</a>
                    </Button>
                ) : (
                    <Button variant="outline" className="mt-4" disabled>
                        Bientôt disponible
                    </Button>
                )}
            </div>
        </div>
    );
}

export function BlogPageContent() {
    const articleIndex = buildArticleIndex();
    const featuredArticle = allArticles.find(a => a.isFeatured);


    return (
        <ProductPageLayout>
            <TechnicalHero
              eyebrow="Articles"
              title="BLOG"
              subtitle={"Actualités, innovations et savoir-faire de l'industrie de l'acier."}
              motif="column"
              readout={`${allArticles.length} articles`}
            />
            <BlogViewProvider articles={articleIndex}>
                {/* The one deferred read on the page, and it renders nothing. */}
                <Suspense fallback={null}>
                    <BlogInitialTab />
                </Suspense>
                <div className="mx-auto flex w-full flex-col gap-8 px-4 py-16 md:px-8 md:pb-24">
                     <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <BlogSearchField />
                        <div className="w-full md:w-auto md:flex-1 flex justify-center">
                            <BlogTabs />
                        </div>
                        <BlogSortSelect />
                    </div>

                    <div className="mt-4">
                      <BlogTabPanel tab="iso">
                        <AnimatedWrapper animation="fade-in">
                            <div className="grid md:grid-cols-3 gap-8">
                                {certifications.map((cert, index) => (
                                    <AnimatedWrapper key={cert.id} animation="fade-in-stagger" staggerIndex={index}>
                                      <CertificationCard cert={cert} />
                                    </AnimatedWrapper>
                                ))}
                            </div>
                        </AnimatedWrapper>
                      </BlogTabPanel>

                      <BlogTabPanel tab="blog">
                        <div className="bg-background py-8 sm:py-16 lg:py-24">
                            <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                              <div className="mb-12 space-y-4 text-center sm:mb-16 lg:mb-24">
                                <p className="text-primary text-sm font-medium uppercase">Notre Blog</p>
                                <h2 className="text-foreground text-2xl font-semibold md:text-3xl lg:text-4xl">Actualités, innovations et savoir-faire.</h2>
                                <p className="text-foreground/80 text-xl">
                                  Explorez nos articles pour rester à jour sur l'industrie de l'acier.
                                </p>
                              </div>
                              <BlogEmptyState />
                              <BlogArticleGrid>
                                {featuredArticle && (
                                    <BlogFeaturedSlot>
                                        <BlogPostCard
                                            variant="featured"
                                            article={featuredArticle}
                                        />
                                    </BlogFeaturedSlot>
                                )}
                                {allArticles.map((article) => (
                                   <BlogArticleSlot
                                     key={article.id}
                                     articleId={article.id}
                                     isFeatured={article.isFeatured === true}
                                   >
                                     <BlogPostCard article={article} />
                                   </BlogArticleSlot>
                                ))}
                              </BlogArticleGrid>
                            </div>
                          </div>
                      </BlogTabPanel>

                      <BlogTabPanel tab="catalogue">
                        <div className="flex flex-col items-center justify-center text-center py-16">
                            <h2 className="text-3xl font-bold text-primary mb-4">Notre Catalogue</h2>
                            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                                Téléchargez notre catalogue complet pour découvrir en détail l'ensemble de nos produits et solutions de construction métallique.
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                                <div className="flex flex-col items-center gap-2">
                                    <DownloadButton text="Catalogue Français" href="/documents/Bordj-Steel-Catalogue-FR.pdf" download />
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex min-h-11 items-center justify-center gap-2.5 rounded border border-border bg-primary px-8 text-[15px] font-semibold text-primary-foreground opacity-60">
                                        <BookCopy className="h-5 w-5" /> English Catalog
                                    </div>
                                    <span className="text-xs text-muted-foreground">Bientôt disponible</span>
                                </div>
                                <div className="flex flex-col items-center gap-2">
                                    <div className="flex min-h-11 items-center justify-center gap-2.5 rounded border border-border bg-primary px-8 text-[15px] font-semibold text-primary-foreground opacity-60">
                                        <BookCopy className="h-5 w-5" /> دليل المنتجات
                                    </div>
                                    <span className="text-xs text-muted-foreground">Bientôt disponible</span>
                                </div>
                            </div>
                        </div>
                      </BlogTabPanel>
                    </div>
                </div>
            </BlogViewProvider>
        </ProductPageLayout>
    );
};
