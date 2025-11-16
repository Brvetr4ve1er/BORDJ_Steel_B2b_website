
"use client";

import { ProductPageLayout } from '@/components/product-page-layout';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import Image from 'next/image';
import { BlogPostCard, type BlogPostCardProps } from '@/components/ui/blog-post-card';
import { useState } from 'react';
import { ArrowUpRight, Award } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DownloadButton } from '@/components/ui/download-button';

const articles: (Omit<BlogPostCardProps, 'href'> & {id: string, href: string, isFeatured?: boolean})[] = [
    {
        id: "article-1",
        title: "BordjSteel inaugure une nouvelle ligne de production de PRS",
        description: "Découvrez comment notre nouvelle ligne de production de Profils Reconstitués Soudés (PRS) repousse les limites de la construction métallique en Algérie.",
        href: "#",
        tag: "Innovation",
        imageUrl: "https://www.untitledui.com/marketing/spirals.webp",
        date: "20 Jan 2025",
        author: {
            name: "Olivia Rhye",
            avatarUrl: "https://www.untitledui.com/images/avatars/olivia-rhye?fm=webp&q=80",
        },
        isFeatured: true,
    },
    {
        id: "article-2",
        title: "Migrating to Linear 101",
        description: "Linear helps streamline software projects, sprints, tasks, and bug tracking. Here's how to get started.",
        href: "#",
        tag: "Product",
        imageUrl: "https://www.untitledui.com/marketing/conversation.webp",
        date: "19 Jan 2025",
        author: {
            name: "Phoenix Baker",
            avatarUrl: "https://www.untitledui.com/images/avatars/phoenix-baker?fm=webp&q=80",
        },
    },
    {
        id: "article-3",
        title: "Building your API stack",
        description: "The rise of RESTful APIs has been met by a rise in tools for creating, testing, and managing them.",
        href: "#",
        tag: "Software Engineering",
        imageUrl: "https://www.untitledui.com/blog/two-mobile-shapes-pattern.webp",
        date: "18 Jan 2025",
        author: {
            name: "Lana Steiner",
            avatarUrl: "https://www.untitledui.com/images/avatars/lana-steiner?fm=webp&q=80",
        },
    },
    {
        id: "article-3.5",
        title: "Bill Walsh leadership lessons",
        description: "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty?",
        href: "#",
        tag: "Leadership",
        imageUrl: "https://www.untitledui.com/blog/two-people.webp",
        date: "17 Jan 2025",
        author: {
            name: "Alec Whitten",
            avatarUrl: "https://www.untitledui.com/images/avatars/alec-whitten?fm=webp&q=80",
        },
    },
    {
        id: "article-4",
        title: "PM mental models",
        description: "Mental models are simple expressions of complex processes or relationships.",
        href: "#",
        tag: "Product",
        imageUrl: "https://www.untitledui.com/marketing/smiling-girl-6.webp",
        date: "16 Jan 2025",
        author: {
            name: "Demi Wilkinson",
            avatarUrl: "https://www.untitledui.com/images/avatars/demi-wilkinson?fm=webp&q=80",
        },
    },
    {
        id: "article-5",
        title: "What is wireframing?",
        description: "Introduction to Wireframing and its Principles. Learn from the best in the industry.",
        href: "#",
        tag: "Design",
        imageUrl: "https://www.untitledui.com/marketing/wireframing-layout.webp",
        date: "15 Jan 2025",
        author: {
            name: "Candice Wu",
            avatarUrl: "https://www.untitledui.com/images/avatars/candice-wu?fm=webp&q=80",
        },
    },
    {
        id: "article-6",
        title: "How collaboration makes us better designers",
        description: "Collaboration can make our teams stronger, and our individual designs better.",
        href: "#",
        tag: "Design",
        imageUrl: "https://www.untitledui.com/marketing/two-people.webp",
        date: "14 Jan 2025",
        author: {
            name: "Natali Craig",
            avatarUrl: "https://www.untitledui.com/images/avatars/natali-craig?fm=webp&q=80",
        },
    },
    {
        id: "article-7",
        title: "Our top 10 Javascript frameworks to use",
        description: "JavaScript frameworks make development easy with extensive features and functionalities.",
        href: "#",
        tag: "Software Development",
        imageUrl: "https://www.untitledui.com/marketing/workspace-5.webp",
        date: "13 Jan 2025",
        author: {
            name: "Drew Cano",
            avatarUrl: "https://www.untitledui.com/images/avatars/drew-cano?fm=webp&q=80",
        },
    },
    {
        id: "article-8",
        title: "Podcast: Creating a better CX Community",
        description: "Starting a community doesn't need to be complicated, but how do you get started?",
        href: "#",
        tag: "Podcasts",
        imageUrl: "https://www.untitledui.com/marketing/sythesize.webp",
        date: "12 Jan 2025",
        author: {
            name: "Orlando Diggs",
            avatarUrl: "https://www.untitledui.com/images/avatars/orlando-diggs?fm=webp&q=80",
        },
    },
];

const tabs = [
    { id: "iso", label: "ISO" },
    { id: "news", label: "News" },
    { id: "blog", label: "Blog" },
    { id: "catalogue", label: "Catalogue" },
    { id: "videos", label: "Vidéos" },
];

const sortByOptions = [
    { id: "recent", label: "Most recent" },
    { id: "popular", label: "Most popular" },
    { id: "viewed", label: "Most viewed" },
];

const featuredArticle = articles[0];

const certifications = [
  { name: "ISO 9001", description: "Management de la qualité", image: "https://i.pinimg.com/736x/1b/c3/3a/1bc33a6cbdf6d1c416b32699f6e5802b.jpg" },
  { name: "ISO 14001", description: "Management environnemental", image: "https://i.pinimg.com/736x/85/14/f2/8514f22dc44e52cd093ec0f1be9f641d.jpg" },
  { name: "ISO 45001", description: "Santé et sécurité au travail", image: "https://i.pinimg.com/736x/fc/ea/fb/fceafbcc5c3f0645268534eed8924cb3.jpg" }
];

function CertificationCard({ cert }: { cert: { name: string; description: string; image: string; } }) {
    return (
      <Card className="group overflow-hidden text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
        <CardHeader className="p-0">
          <div className="bg-secondary p-4">
            <h3 className="text-xl font-bold text-primary">{cert.name}</h3>
            <p className="text-muted-foreground">{cert.description}</p>
          </div>
        </CardHeader>
        <CardContent className="p-4 bg-background">
          <div className="aspect-[3/4] relative rounded-md overflow-hidden border-4 border-secondary shadow-inner">
            <Image
              src={cert.image}
              alt={`Certification ${cert.name}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardContent>
      </Card>
    );
}

const EmptyContent = ({tab}: {tab: string}) => (
    <div className="text-center py-16">
        <h2 className="text-2xl font-bold">Content for {tab} Coming Soon</h2>
        <p className="text-muted-foreground mt-2">This section is under construction.</p>
    </div>
)

export default function BlogPage() {
    const isDesktop = useBreakpoint("lg");
    const [sortBy, setSortBy] = useState(sortByOptions[0].id);
    const heroImage = {
        src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80",
        alt: "Person reading a book in a library",
        aiHint: "reading library"
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
                        <h1 className="font-headline text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white">
                            Blog & Actualités
                        </h1>
                        <p className="mt-6 text-xl md:text-2xl max-w-3xl text-gray-200 mx-auto">
                            Nos dernières nouvelles et articles.
                        </p>
                    </AnimatedWrapper>
                </div>
            </section>
            <main className="mx-auto flex w-full flex-col gap-12 px-4 py-16 md:gap-16 md:px-8 md:pb-24">
                 <Tabs defaultValue={tabs[0].id} className="w-full">
                    <div className="flex flex-col items-end gap-8 md:flex-row">
                        <TabsList>
                            {tabs.map(tab => <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>)}
                        </TabsList>
                        <div className="relative w-full md:max-w-44">
                            <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger>
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

                    <TabsContent value="iso" className="mt-12">
                        <AnimatedWrapper animation="fade-in">
                            <div className="grid md:grid-cols-3 gap-8">
                                {certifications.map((cert, index) => (
                                    <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
                                    <CertificationCard cert={cert} />
                                    </AnimatedWrapper>
                                ))}
                            </div>
                        </AnimatedWrapper>
                    </TabsContent>
                    <TabsContent value="news"><EmptyContent tab="News" /></TabsContent>
                    <TabsContent value="blog">
                        {featuredArticle && (
                            <a
                                href={featuredArticle.href}
                                className="relative hidden w-full overflow-hidden rounded-2xl outline-none select-none focus-visible:outline-2 focus-visible:outline-offset-4 md:block h-[480px] mt-12"
                            >
                                <Image src={featuredArticle.imageUrl!} alt={featuredArticle.title} className="absolute inset-0 size-full object-cover" fill/>
                                <div className="absolute inset-x-0 bottom-0 w-full bg-gradient-to-t from-black/60 to-transparent pt-24">
                                    <div className="flex w-full flex-col gap-6 p-8">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-4 items-center">
                                                <p className="flex-1 text-3xl font-semibold text-white">{featuredArticle.title}</p>
                                                <ArrowUpRight className="size-6 shrink-0 text-white" />
                                            </div>
                                            <p className="line-clamp-2 text-md text-white">{featuredArticle.description}</p>
                                        </div>
                                        <div className="flex gap-6 items-center">
                                            <div className="flex flex-1 gap-8">
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-sm font-semibold text-white">Written by</p>
                                                    <div className="flex items-center gap-2">
                                                        <Avatar>
                                                            <AvatarImage src={featuredArticle.author!.avatarUrl} alt={featuredArticle.author!.name} />
                                                            <AvatarFallback>{featuredArticle.author!.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <p className="text-sm font-semibold text-white">{featuredArticle.author!.name}</p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-2">
                                                    <p className="text-sm font-semibold text-white">Published on</p>
                                                    <div className="flex h-10 items-center">
                                                        <p className="text-md font-semibold text-white">{featuredArticle.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        )}
                        <div className="md:hidden mt-12">
                            <BlogPostCard {...featuredArticle} />
                        </div>
                        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 mt-12">
                            {articles.slice(1).map((article, index) => (
                                <li key={index} className={cn(!isDesktop && "nth-[n+7]:hidden")}>
                                    <BlogPostCard {...article} />
                                </li>
                            ))}
                        </ul>
                    </TabsContent>
                    <TabsContent value="catalogue">
                        <div className="flex flex-col items-center justify-center text-center py-16">
                            <h2 className="text-3xl font-bold text-primary mb-4">Notre Catalogue</h2>
                            <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
                                Téléchargez notre catalogue complet pour découvrir en détail l'ensemble de nos produits et solutions de construction métallique.
                            </p>
                            <a href="/documents/catalogue.pdf" download="Bordj-Steel-Catalogue.pdf">
                                <DownloadButton text="Télécharger le Catalogue" />
                            </a>
                        </div>
                    </TabsContent>
                    <TabsContent value="videos"><EmptyContent tab="Videos" /></TabsContent>
                 </Tabs>
            </main>
        </ProductPageLayout>
    );
};
