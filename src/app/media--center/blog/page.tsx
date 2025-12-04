

"use client";

import { ProductPageLayout } from '@/components/product-page-layout';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import Image from 'next/image';
import ArticleCard from '@/components/ui/multi-media-testimonial';
import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Award, Newspaper, BookOpen, FileText, Search } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DownloadButton } from '@/components/ui/download-button';
import { articles as allArticles } from '@/config/blog-data';
import { Dock, DockItem, DockIcon, DockLabel } from '@/components/ui/dock';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const tabs = [
    { id: "iso", label: "ISO", icon: Award },
    { id: "blog", label: "Blog", icon: BookOpen },
    { id: "catalogue", label: "Catalogue", icon: FileText },
];

const sortByOptions = [
    { id: "recent", label: "Most recent" },
    { id: "popular", label: "Most popular" },
    { id: "viewed", label: "Most viewed" },
];

const certifications = [
  { name: "ISO 9001", description: "Management de la qualité", image: "https://i.pinimg.com/736x/f0/4b/62/f04b6287977e56982f6ccb2a9b65cee7.jpg", logo: "https://i.pinimg.com/736x/1b/c3/3a/1bc33a6cbdf6d1c416b32699f6e5802b.jpg", pdf: "/documents/Bordj-Steel-ISO-9001.pdf" },
  { name: "ISO 14001", description: "Management environnemental", image: "https://i.pinimg.com/736x/85/6f/3f/856f3f85dd8452ba3580e8280f62e093.jpg", logo: "https://i.pinimg.com/736x/85/14/f2/8514f22dc44e52cd093ec0f1be9f641d.jpg", pdf: "/documents/Bordj-Steel-ISO-14001.pdf" },
  { name: "ISO 45001", description: "Santé et sécurité au travail", image: "https://i.pinimg.com/736x/15/a6/0a/15a60ad54ea9e34e77b39205320bd3ae.jpg", logo: "https://i.pinimg.com/736x/85/14/f2/8514f22dc44e52cd093ec0f1be9f641d.jpg", pdf: "/documents/Bordj-Steel-ISO-45001.pdf" }
];

function CertificationCard({ cert, hoverDirection = 'right' }: { cert: { name: string; description: string; image: string; logo: string; pdf: string; }, hoverDirection?: 'left' | 'right' }) {
    return (
        <div className="relative group w-full max-w-sm mx-auto">
            <div className="relative bg-card p-6 rounded-lg shadow-md border border-border transition-all duration-300 ease-in-out group-hover:shadow-2xl flex flex-col items-center justify-center text-center h-56 w-56 mx-auto overflow-hidden">
                <Image
                    src={cert.logo}
                    alt={cert.name}
                    fill
                    className="object-contain p-4 transition-transform duration-300 group-hover:scale-110"
                />
            </div>
             <div className="mt-4 text-center">
                <h3 className="text-xl font-bold text-primary">{cert.name}</h3>
                <p className="text-md text-muted-foreground">{cert.description}</p>
                <a href={cert.pdf} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block">
                    <Button variant="outline">Voir le document</Button>
                </a>
            </div>
             <div className={cn(
                "absolute top-1/2 -translate-y-1/2 w-[32rem] h-[40rem] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto z-50",
                hoverDirection === 'right' ? "left-full ml-4" : "right-full mr-4"
            )}>
                <a href={cert.pdf} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    <div className="relative w-full h-full bg-white rounded-lg shadow-2xl border-2 border-accent overflow-hidden">
                         <Image
                            src={cert.image}
                            alt={`${cert.name} document preview`}
                            fill
                            className="object-contain"
                        />
                    </div>
                </a>
            </div>
        </div>
    );
}

const EmptyContent = ({tab}: {tab: string}) => (
    <div className="text-center py-16">
        <h2 className="text-2xl font-bold">Content for {tab} Coming Soon</h2>
        <p className="text-muted-foreground mt-2">This section is under construction.</p>
    </div>
)

function BlogPageContent() {
    const isDesktop = useBreakpoint("lg");
    const searchParams = useSearchParams();
    const initialTab = searchParams.get('tab');
    const [sortBy, setSortBy] = useState(sortByOptions[0].id);
    const [activeTab, setActiveTab] = useState(initialTab && tabs.some(t => t.id === initialTab) ? initialTab : 'blog');

    const renderContent = () => {
        switch (activeTab) {
            case 'iso':
                return (
                    <AnimatedWrapper animation="fade-in">
                        <div className="grid md:grid-cols-3 gap-8">
                            {certifications.map((cert, index) => (
                                <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                                  <CertificationCard cert={cert} hoverDirection={index === 2 ? 'left' : 'right'} />
                                </AnimatedWrapper>
                            ))}
                        </div>
                    </AnimatedWrapper>
                );
            case 'blog':
                return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                         {allArticles.map((t, i) => (
                           <div key={t.id} className={cn(t.isFeatured ? "sm:col-span-2 lg:col-span-2 xl:col-span-2" : "")}>
                              <ArticleCard article={t} />
                           </div>
                         ))}
                    </div>
                );
            case 'catalogue':
                return (
                    <div className="flex flex-col items-center justify-center text-center py-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">Notre Catalogue</h2>
                        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                            Téléchargez notre catalogue complet pour découvrir en détail l'ensemble de nos produits et solutions de construction métallique.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <a href="/documents/Bordj-Steel-Catalogue-FR.pdf" download="Bordj-Steel-Catalogue-FR.pdf">
                                <DownloadButton text="Catalogue Français" />
                            </a>
                            <a href="/documents/Bordj-Steel-Catalogue-EN.pdf" download="Bordj-Steel-Catalogue-EN.pdf">
                                <DownloadButton text="English Catalog" />
                            </a>
                            <a href="/documents/Bordj-Steel-Catalogue-AR.pdf" download="Bordj-Steel-Catalogue-AR.pdf">
                                <DownloadButton text="الكتالوج العربي" />
                            </a>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
    
    const heroImage = {
        src: "https://i.pinimg.com/736x/1f/3d/a2/1f3da28625335403956d26a2163a1567.jpg",
        alt: "Digital world concept",
        aiHint: "digital world"
    }

    return (
        <ProductPageLayout>
            <section className="relative h-96 w-full flex items-center justify-center text-white overflow-hidden p-0">
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
                    <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white">
                    Notre Blog
                    </h1>
                    <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
                    Actualités, innovations et savoir-faire de l'industrie de l'acier.
                    </p>
                </AnimatedWrapper>
                </div>
            </section>
            <main className="mx-auto flex w-full flex-col gap-12 px-4 py-16 md:gap-16 md:px-8 md:pb-24">
                 <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="w-full md:w-auto md:flex-1 relative">
                       <Input placeholder="Rechercher des articles..." className="h-12 text-lg pl-12" />
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="w-full md:w-auto md:flex-1 flex justify-center">
                        <Dock magnification={140} panelHeight={120}>
                            {tabs.map((tab) => (
                              <DockItem key={tab.id} onClick={() => setActiveTab(tab.id)}>
                                <DockIcon>
                                  <tab.icon className={cn("h-16 w-16", activeTab === tab.id ? 'text-accent' : 'text-primary/50')} />
                                </DockIcon>
                                <DockLabel className={cn('text-xl', activeTab === tab.id ? 'text-accent' : 'text-primary/50')}>{tab.label}</DockLabel>
                              </DockItem>
                            ))}
                        </Dock>
                    </div>
                    <div className="w-full md:w-auto md:flex-1 flex justify-end">
                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="md:max-w-xs h-12 text-lg">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                {sortByOptions.map(option => (
                                <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="mt-12">
                  {renderContent()}
                </div>
            </main>
        </ProductPageLayout>
    );
};

export default function BlogPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BlogPageContent />
        </Suspense>
    )
}

    