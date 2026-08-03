"use client";

import { ProductPageLayout } from '@/components/product-page-layout';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import Image from 'next/image';
import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Award, BookCopy, BookOpen, FileText, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { DownloadButton } from '@/components/ui/download-button';
import { articles as allArticles } from '@/config/blog-data';
import { certifications, type Certification } from '@/config/company-data';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BlogPostCard } from '@/components/ui/blog-post-card';

const tabs = [
    { id: "iso", label: "ISO", icon: Award },
    { id: "blog", label: "Blog", icon: BookOpen },
    { id: "catalogue", label: "Catalogue", icon: FileText },
];

// Named so the initial-state fallback below can never drift from the option list.
const DEFAULT_SORT_ID = "recent";

const sortByOptions = [
    { id: DEFAULT_SORT_ID, label: "Plus récents" },
    { id: "oldest", label: "Plus anciens" },
    { id: "az", label: "A → Z" },
];

const parseArticleDate = (d: string) => {
    const t = new Date(d).getTime();
    return isNaN(t) ? 0 : t;
};

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
    const searchParams = useSearchParams();
    const initialTab = searchParams.get('tab');
    const [sortBy, setSortBy] = useState(sortByOptions[0]?.id ?? DEFAULT_SORT_ID);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState(initialTab && tabs.some(t => t.id === initialTab) ? initialTab : 'blog');

    const displayedArticles = React.useMemo(() => {
        const q = searchQuery.trim().toLowerCase();
        const filtered = allArticles.filter(a =>
            !q || a.title.toLowerCase().includes(q) || a.description.toLowerCase().includes(q)
        );
        return [...filtered].sort((a, b) => {
            if (sortBy === 'az') return a.title.localeCompare(b.title, 'fr');
            if (sortBy === 'oldest') return parseArticleDate(a.date) - parseArticleDate(b.date);
            return parseArticleDate(b.date) - parseArticleDate(a.date); // recent (default)
        });
    }, [searchQuery, sortBy]);

    const renderContent = () => {
        switch (activeTab) {
            case 'iso':
                return (
                    <AnimatedWrapper animation="fade-in">
                        <div className="grid md:grid-cols-3 gap-8">
                            {certifications.map((cert, index) => (
                                <AnimatedWrapper key={cert.id} animation="fade-in-stagger" staggerIndex={index}>
                                  <CertificationCard cert={cert} />
                                </AnimatedWrapper>
                            ))}
                        </div>
                    </AnimatedWrapper>
                );
            case 'blog': {
                const isFiltering = searchQuery.trim() !== '' || sortBy !== 'recent';
                const featuredArticle = !isFiltering ? displayedArticles.find(a => a.isFeatured) : undefined;
                const otherArticles = featuredArticle
                    ? displayedArticles.filter(a => a.id !== featuredArticle.id)
                    : displayedArticles;
                return (
                     <div className="bg-background py-8 sm:py-16 lg:py-24">
                        <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
                          <div className="mb-12 space-y-4 text-center sm:mb-16 lg:mb-24">
                            <p className="text-primary text-sm font-medium uppercase">Notre Blog</p>
                            <h2 className="text-foreground text-2xl font-semibold md:text-3xl lg:text-4xl">Actualités, innovations et savoir-faire.</h2>
                            <p className="text-foreground/80 text-xl">
                              Explorez nos articles pour rester à jour sur l'industrie de l'acier.
                            </p>
                          </div>
                          {displayedArticles.length === 0 ? (
                            <p className="text-center text-lg text-muted-foreground py-12">
                              Aucun article ne correspond à votre recherche.
                            </p>
                          ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                              {featuredArticle && (
                                  <div className="lg:col-span-2">
                                      <BlogPostCard
                                          variant="featured"
                                          article={featuredArticle}
                                      />
                                  </div>
                              )}
                              {otherArticles.map((article) => (
                                 <BlogPostCard
                                   key={article.id}
                                   article={article}
                                 />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                );
            }
            case 'catalogue':
                return (
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
                );
            default:
                return null;
        }
    };

    const heroImage = {
        src: "/media/7f6511da571d8510b554b57a3705-e82c4b97.webp",
        alt: "Univers médias de Bordj Steel",
        aiHint: "digital world"
    }

    return (
        <ProductPageLayout>
            <section className="relative h-[60vh] w-full flex items-center justify-center text-white overflow-hidden p-0">
                <Image
                src={heroImage.src}
                alt={heroImage.alt}
                fill
                className="z-0 object-cover"
                priority
                data-ai-hint={heroImage.aiHint}
                />
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div className="relative z-20 container mx-auto px-4 text-center">
                <AnimatedWrapper animation="zoom-in">
                    <h1 className="font-headline text-6xl md:text-8xl leading-tight md:leading-tight lg:leading-tight font-bold tracking-tighter uppercase text-white">
                    BLOG
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
                    Actualités, innovations et savoir-faire de l'industrie de l'acier.
                    </p>
                </AnimatedWrapper>
                </div>
            </section>
            <div className="mx-auto flex w-full flex-col gap-8 px-4 py-16 md:px-8 md:pb-24">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    {/* Search and sort only drive the "blog" tab — hide them elsewhere. */}
                    {activeTab === 'blog' && (
                      <div className="w-full md:w-auto md:flex-1 relative">
                         <label htmlFor="blog-search" className="sr-only">Rechercher des articles</label>
                         <Input
                            id="blog-search"
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Rechercher des articles..."
                            className="h-12 text-lg pl-12"
                         />
                         <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                      </div>
                    )}
                    <div className="w-full md:w-auto md:flex-1 flex justify-center">
                        <div
                            role="group"
                            aria-label="Sections de la page"
                            className="inline-flex items-center gap-1 rounded-lg border border-border bg-secondary p-1"
                        >
                            {tabs.map((tab) => {
                              const isActive = activeTab === tab.id;
                              return (
                                <button
                                  key={tab.id}
                                  type="button"
                                  onClick={() => setActiveTab(tab.id)}
                                  aria-pressed={isActive}
                                  className={cn(
                                    "inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-4 sm:px-6 text-[15px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                                    isActive
                                      ? "bg-accent text-accent-foreground shadow-sm"
                                      : "text-primary hover:bg-background"
                                  )}
                                >
                                  <tab.icon className="h-5 w-5" aria-hidden="true" />
                                  {tab.label}
                                </button>
                              );
                            })}
                        </div>
                    </div>
                    {activeTab === 'blog' && (
                      <div className="w-full md:w-auto md:flex-1 flex justify-end">
                          <Select value={sortBy} onValueChange={setSortBy}>
                              <SelectTrigger className="md:max-w-xs h-12 text-lg">
                                  <SelectValue placeholder="Trier par" />
                              </SelectTrigger>
                              <SelectContent>
                                  {sortByOptions.map(option => (
                                  <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                                  ))}
                              </SelectContent>
                          </Select>
                      </div>
                    )}
                </div>

                <div className="mt-4">
                  {renderContent()}
                </div>
            </div>
        </ProductPageLayout>
    );
};
