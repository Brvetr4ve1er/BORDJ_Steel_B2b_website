
"use client";

import { ProductPageLayout } from '@/components/product-page-layout';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import Image from 'next/image';
import { BlogPostCard, type BlogPostCardProps } from '@/components/ui/blog-post-card';
import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Award } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useBreakpoint } from '@/hooks/use-breakpoint';
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { DownloadButton } from '@/components/ui/download-button';
import { Logo } from '@/components/logo';

const articles: (Omit<BlogPostCardProps, 'href'> & {id: string, href: string, isFeatured?: boolean})[] = [
    {
        id: "article-1",
        title: "Découvrez notre gamme complète de panneaux sandwich",
        description: "🏗️ Découvrez notre gamme complète de panneaux sandwich chez Bordj Steel : ✅ Panneau sandwich de bardage ✅ Panneau sandwich de couverture ✅ Panneau sandwich frigorifique ✅ Tole nervurée TN40 ✅ Plancher collaborant \"Hi-Bond 77\" 🔧 Pièces de finition disponibles ✨ Qualité supérieure, isolation optimale et durabilité garantie pour tous vos projets. 👉 Contactez-nous dès aujourd’hui et obtenez votre consultation gratuite ! 📩 marketing@bordjsteel.dz | commercial@bordjsteel.dz 📞 +213 770 83 25 96 / +213 770 98 43 14",
        href: "#",
        tag: "Innovation",
        imageUrl: "https://scontent.faae1-1.fna.fbcdn.net/v/t39.30808-6/549388013_1220983809833610_1149533220390155880_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEHFuUSHW2lLWeBPd_bKrL5eRAE6Huw4YV5EAToe7DhhQBwHbeF9OPLG8IjJNJRWFhQUpbdACMWxL1FdxNGDyhH&_nc_ohc=0arx7LMxbeAQ7kNvwFQarul&_nc_oc=AdkNVRfLvWEky8y-N3RcsuGNc0ptqOAgfQUlJgenxbv8zubD3TjFb_Pu3vWFEldNSgw&_nc_zt=23&_nc_ht=scontent.faae1-1.fna&_nc_gid=83-zVBgCT5FhAFvfk0nIYQ&oh=00_AfhGWNFUmG3GilsFLx8flv0Rdr6d2e1lnYgB6KOpeN_jSg&oe=6920D4BA",
        date: "20 Jan 2025",
        author: {
            name: "Bordj Steel",
            avatarUrl: "/bordj-steel-logo.svg",
        },
        isFeatured: true,
    },
    {
        id: "article-2",
        title: "Votre hangar de rêve devient réalité",
        description: "Chez Bordj Steel, nous transformons vos idées en structures solides, durables et parfaitement adaptées à vos besoins. Grâce à notre expertise dans la fabrication et le montage de charpentes métalliques, nous vous offrons : 🔹 Des solutions sur mesure 🔹 Une qualité irréprochable 🔹 Une exécution rapide et maîtrisée 🔹 Des matériaux certifiés et performants Quel que soit votre projet — industriel, agricole ou logistique — nous vous accompagnons de la conception à la réalisation pour vous livrer un hangar à la hauteur de vos ambitions. 📞 Contactez-nous pour une étude personnalisée !📞 Contactez-nous : ✉️ commercial@bordjsteel.dz | marketing@bordjsteel.dz 📞 +213 770 83 25 96 / +213 770 98 43 14/ +213 561 61 60 05 🌐 www.bordjsteel.dz #BordjSteel #CharpenteMetallique #Construction #Innovation #Acier #MadeInAlgeria",
        href: "#",
        tag: "Projet",
        imageUrl: "https://scontent.faae1-1.fna.fbcdn.net/v/t39.30808-6/583911799_1271059981492659_6000260096783447748_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEsFDsYysC6VmB4UMNVh-gy3NBJVO2b5JTc0ElU7ZvklL0GZen1WjfaZYyfX35tjSWK3jO7bLSk08HN4QX3ArvS&_nc_ohc=AkEkvzXKc9UQ7kNvwHXhElp&_nc_oc=AdkCw_Kht4CMWDfipv9XMPkJJeuOo9Ud15OhgZwZlZ8sf4g_l4yMJ4Hn71RDQDxgMwE&_nc_zt=23&_nc_ht=scontent.faae1-1.fna&_nc_gid=hiOg2otb4p3lVzFsVm0jGw&oh=00_Afg66z48AVQZpRXX74046QGcXNgq0pf_kD6ppxOqIaAYpQ&oe=691FC01C",
        date: "30 Jul 2025",
        author: {
            name: "Bordj Steel",
            avatarUrl: "/bordj-steel-logo.svg",
        },
    },
    {
        id: "article-3",
        title: "La perfection se cache dans les détails",
        description: "Chez Bordj Steel, nous portons une attention particulière à chaque détail. Nos pièces de finition sont conçues pour garantir : Une qualité irréprochable, une précision d’assemblage optimale, et une esthétique soignée qui valorise vos structures métalliques. Parce que la perfection se cache dans les détails, Bordj Steel met tout son savoir-faire au service de la durabilité et du design. 📞 Contactez-nous pour plus d’informations ou une étude personnalisée ! +213 770 83 25 96 / +213 770 70 59 78 / +213 561 61 60 05 📧 commercial@bordjsteel.dz 📧 marketing@bordjsteel.dz 🌐 www.bordjsteel.dz #BordjSteel #Finition #Acier #Construction #Métallique #SavoirFaireAlgérien #Qualité #Industrie",
        href: "#",
        tag: "Qualité",
        imageUrl: "https://scontent.faae1-1.fna.fbcdn.net/v/t39.30808-6/571375868_1253603903238267_7359372654458876570_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFGPRMdAWAjmwK5sXbG-zRi1TXAWeWysVvVNcBZ5bKxW4_pnl1wYQtgBEHDdKT9quazCZ4rGAW2R9GfMomJT7mx&_nc_ohc=y53gj6-1jfIQ7kNvwH_fwwl&_nc_oc=Adnze2IPD-wjmczjE6KwvcttrF74kUTFog7GSA5BWgwpbDqyraH_fer0eVlIe0hghD8&_nc_zt=23&_nc_ht=scontent.faae1-1.fna&_nc_gid=GFe-el5slBBK7mvcpCCM3A&oh=00_AfgfYtAiEAMSa9wRUQ_QIQAcFkZ6x_UGXFi33cNr0ASAnQ&oe=691F94A7",
        date: "28 Jul 2025",
        author: {
            name: "Bordj Steel",
            avatarUrl: "/bordj-steel-logo.svg",
        },
    },
    {
        id: "article-4",
        title: "Pourquoi choisir la charpente métallique Bordj Steel ?",
        description: "Chez Bordj Steel, nous allions solidité, durabilité et précision. Nos charpentes métalliques sont conçues pour offrir : ✅ Une résistance exceptionnelle face aux conditions climatiques. ✅ Une installation rapide et économique. ✅ Un design sur mesure qui s’adapte à tous vos projets industriels, agricoles ou tertiaires. Faites le choix de la performance et de la fiabilité 100% algérienne 📞 Contactez-nous pour plus d’informations ou une étude personnalisée. +213 770 83 25 96 / +213 770 98 43 14/ +213 561 61 60 05 📧 Email : commercial@bordjsteel.dz marketing@bordjsteel.dz 🌐 Site Web : www.bordjsteel.dz",
        href: "#",
        tag: "Savoir-Faire",
        imageUrl: "https://scontent.faae1-1.fna.fbcdn.net/v/t39.30808-6/568389363_1249499766982014_8120807308806462573_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFPt14qcpl7kjw2yCqA1eTvxea1cNTkhBDF5rVw1OSEEG9CT_W6XCTlCagBJUEIPsZmhdPLBPeGDkvqnH4_MfGg&_nc_ohc=LWWgQEGHIl0Q7kNvwFrO8-o&_nc_oc=Admzduc-kM5R6LWzFSmHqzTjJzeNMM0XBUaua4fY3GTgvo6jT8eChZfNFHkNm57v6Cs&_nc_zt=23&_nc_ht=scontent.faae1-1.fna&_nc_gid=GFe-el5slBBK7mvcpCCM3A&oh=00_AfjiV5vZGdizDM25FWs5ThgKTsCLmE7tXiuhasbUj9ShFw&oe=691F9EFE",
        date: "27 Jul 2025",
        author: {
            name: "Bordj Steel",
            avatarUrl: "/bordj-steel-logo.svg",
        },
    },
    {
        id: "article-5",
        title: "Le secret de nos panneaux sandwich : le Polyuréthane (PUR)",
        description: "هل تعلم أن السر وراء مقاومةالحرارة و الماء في ألواح الساندويتش هو مادة البوليوريثان (PUR)؟ هذه المادة الخفيفة والفعالة تخلق حاجزًا يمنع تسرب الماء والرطوبة، وفي نفس الوقت توفر عزلًا حراريًا قويًا يخليك مرتاح في كل الفصول مع Bordj Steel، الجودة ماشي صدفة — بل نتيجة اختيار مواد مدروسة بعناية تجمع بين المتانة، العزل، والابتكار. تواصلوا معنا للحصول على مزيد من المعلومات أو لدراسة مخصصة لمشروعكم! 📞 الهاتف: +213 770 83 25 96 / +213 770 70 59 78 / +213 561 61 60 05 📧 البريد الإلكتروني: commercial@bordjsteel.dz / marketing@bordjsteel.dz 🌐 الموقع الإلكتروني: www.bordjsteel.dz",
        href: "#",
        tag: "Innovation",
        imageUrl: "https://scontent.faae1-2.fna.fbcdn.net/v/t39.30808-6/565127683_1245286394070018_2241164913418861999_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFd7te9WmM-tAfyiwQ2gbTLThS_q2SAW3tOFL-rZIBbe8wCRfCEnPq3SrJX7w6s-OCloKmplFjSsA3Wv00F6qZs&_nc_ohc=23Iycb070owQ7kNvwHjaUDM&_nc_oc=AdnJs8kiX2A87or8l5jBXFFU0TGwUMOVjwcDt7dZ3X1Ws-3W2FHgx6l7OTFrimQjlMg&_nc_zt=23&_nc_ht=scontent.faae1-2.fna&_nc_gid=jwKqt9VubLfKZy35xgI5ng&oh=00_AfiXcVsVI5OQFz3bLYwEE5HFyzIEmokEsJtYzlQIAiIDJg&oe=691FCBDA",
        date: "26 Jul 2025",
        author: {
            name: "Bordj Steel",
            avatarUrl: "/bordj-steel-logo.svg",
        },
    },
    {
        id: "article-6",
        title: "Merci de votre visite à BATI EST EXPO 2025",
        description: "شكر خاص لكل من زارنا في معرض BATI EST EXPO 2025 نودّ أن نتقدّم بجزيل الشكر لإدارة المعرض على التنظيم الرائع، ولكل الزوّار والمهنيين الذين شرفونا بزيارتهم لجناح BordjSteel 🤝 كان المعرض فرصة مميزة للتبادل وتقاسم الخبرات، والتعرّف على شركاء جدد في قطاع البناء والأشغال العمومية 🏗️ شهد جناحنا إقبالًا كبيرًا من المهنيين والمهتمين الذين اكتشفوا منتجاتنا وحلولنا المبتكرة في مجالات الشاربونت، الغلفنة، والبانو ساندويتش 💡 📸 إليكم بعض المقتطفات من أجواء جناحنا خلال أيام الصالون! #BordjSteel #BATI_EST_EXPO2025",
        href: "#",
        tag: "Événement",
        imageUrl: "https://scontent.faae1-2.fna.fbcdn.net/v/t39.30808-6/557848153_1234783215120336_1124929936421243318_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFCzNlBis3kZJ8tgY51Gw0IpIg5NUPp1oqkiDk1Q-nWiipnCP7FLn_t5A_CAXAAsmdiM6J0vdWx106JqjpxoALI&_nc_ohc=vylDLaWMPjkQ7kNvwHmbDov&_nc_oc=AdlZzTrAmdfnXpMaOFSKO_-g8btgEfNufl1PPm0lDuiVtVhtCFyGgmHgsyE-TPkxym4&_nc_zt=23&_nc_ht=scontent.faae1-2.fna&_nc_gid=RiBNy4UDtBmGDriIuz37uw&oh=00_AfgItwa167dUTjk7ZS4It95fcmgyu4b9hpzDVJzyab_FXA&oe=691FC3B2",
        date: "25 Jul 2025",
        author: {
            name: "Bordj Steel",
            avatarUrl: "/bordj-steel-logo.svg",
        },
    },
    {
        id: "article-7",
        title: "La galvanisation, notre garantie anti-rouille !",
        description: "✨ La rouille n’a plus sa chance ! ✨ Chez nous, la galvanisation c’est : ✅ Qualité certifiée ✅ Durabilité garantie ✅ Service professionnel ✅ Prix compétitifs et adaptés à vos besoins 👉 Faites le choix de la fiabilité et de la performance. 📱 Téléphone : 0770 98 43 14 / 0561 61 60 05 🌐 Site web : www.bordjsteel.dz 📧 Email : commercial@bordjsteel.dz",
        href: "#",
        tag: "Savoir-Faire",
        imageUrl: "https://scontent.faae1-1.fna.fbcdn.net/v/t39.30808-6/542752894_1209181164347208_8145503418422825860_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE3yHVjV7eGBXBBy_sFmC9V333iFZQiAAHffeIVlCIAAfRDcC25xwgxOrKNggrAtqwM-Gdj6UwHJbatwplUqX_R&_nc_ohc=b-bkBC-_-xwQ7kNvwEvmQvK&_nc_oc=AdlupLlTWPVaTMRoYbZ-Q0dz0RbEJ0adCX6oOU62vtdXSY9O2NCxsmKOnqCN1_IKx48&_nc_zt=23&_nc_ht=scontent.faae1-1.fna&_nc_gid=wuxQhIoWbPhBme_RH_2JiA&oh=00_AfhbGhtJsExgKpeuXX2KLpE9MntXkeZ956gd9myyU92rGg&oe=6920E7C1",
        date: "22 Jul 2025",
        author: {
            name: "Bordj Steel",
            avatarUrl: "/bordj-steel-logo.svg",
        },
    },
    {
        id: "article-8",
        title: "Charpente métallique by BordjSteel",
        description: "🔹 La solidité, la précision et la qualité… trois valeurs qui définissent chacun de nos projets. ✅ Structures conçues pour supporter les charges les plus lourdes ✅ Fabrication selon des standards internationaux ✅ Robustesse qui garantit la durabilité de vos investissements Avec BordjSteel, choisissez une charpente métallique qui allie force et fiabilité. 📞 +213 770 98 43 14",
        href: "#",
        tag: "Savoir-Faire",
        imageUrl: "https://scontent.faae1-2.fna.fbcdn.net/v/t39.30808-6/539585734_1204873731444618_3505337654299472358_n.jpg?stp=dst-jpg_s640x640_tt6&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeE1araSmD9ZGHv5fgHxOgOJ_ZlquzeEni39mWq7N4SeLXIjr4DygmEcA--FdBoNGHZCo7lugz5PEXnmjP5579YV&_nc_ohc=p0d_TXkJM3IQ7kNvwFKxRke&_nc_oc=AdmoFaebAa5ywkDjNMSpzh7xbwAzLzxV35ZlKb_EWlhWfFNhOYg39Y_fqTXFHNlBW7U&_nc_zt=23&_nc_ht=scontent.faae1-2.fna&_nc_gid=wuxQhIoWbPhBme_RH_2JiA&oh=00_Afi3158cK21eBkB8P-RXj3tl6KW40q0Vy495FKpKCIG2sg&oe=6920DF6E",
        date: "20 Jul 2025",
        author: {
            name: "Bordj Steel",
            avatarUrl: "/bordj-steel-logo.svg",
        },
    },
];

const tabs = [
    { id: "iso", label: "ISO" },
    { id: "news", label: "News" },
    { id: "blog", label: "Blog" },
    { id: "catalogue", label: "Catalogue" },
];

const sortByOptions = [
    { id: "recent", label: "Most recent" },
    { id: "popular", label: "Most popular" },
    { id: "viewed", label: "Most viewed" },
];

const featuredArticle = articles.find(a => a.isFeatured);

const certifications = [
  { name: "ISO 9001", description: "Management de la qualité", image: "https://i.pinimg.com/736x/1b/c3/3a/1bc33a6cbdf6d1c416b32699f6e5802b.jpg" },
  { name: "ISO 14001", description: "Management environnemental", image: "https://i.pinimg.com/736x/85/14/f2/8514f22dc44e52cd093ec0f1be9f641d.jpg" },
  { name: "ISO 45001", description: "Santé et sécurité au travail", image: "https://i.pinimg.com/736x/fc/ea/fb/fceafbcc5c3f0645268534eed8924cb3.jpg" }
];

function CertificationCard({ cert }: { cert: { name: string; description: string; image: string; } }) {
    return (
        <div className="relative group w-full max-w-sm mx-auto">
            <div className="relative bg-card p-6 rounded-lg shadow-md border border-border transition-all duration-300 ease-in-out group-hover:shadow-2xl flex items-center gap-4">
                <div className="flex-shrink-0">
                    <Award className="h-10 w-10 text-accent" />
                </div>
                <div className="flex-grow">
                    <h3 className="text-lg font-bold text-primary">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                </div>
            </div>
            <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 w-48 h-64 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none group-hover:pointer-events-auto">
                <div className="relative w-full h-full bg-white rounded-lg shadow-2xl border-2 border-accent overflow-hidden">
                    <Image
                        src={cert.image}
                        alt={`Certification ${cert.name}`}
                        fill
                        className="object-contain"
                    />
                </div>
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
                 <Tabs defaultValue={tabs[2].id} className="w-full">
                    <div className="flex flex-col items-center gap-8">
                        <TabsList className="h-auto scale-125">
                            {tabs.map(tab => <TabsTrigger key={tab.id} value={tab.id} className="text-lg py-2 px-6">{tab.label}</TabsTrigger>)}
                        </TabsList>
                        <div className="relative w-full max-w-xs mx-auto">
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
                           <BlogPostCard {...featuredArticle} variant="featured" />
                        )}
                        <ul className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3 mt-12">
                            {articles.filter(a => !a.isFeatured).map((article, index) => (
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
                            <a href="/documents/catallogue de produi Final.pdf" download="Bordj-Steel-Catalogue.pdf">
                                <DownloadButton text="Télécharger le Catalogue" />
                            </a>
                        </div>
                    </TabsContent>
                 </Tabs>
            </main>
        </ProductPageLayout>
    );
};

    

    