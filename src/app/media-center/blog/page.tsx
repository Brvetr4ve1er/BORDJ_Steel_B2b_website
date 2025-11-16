
import { ProductPageLayout } from '@/components/product-page-layout';
import { AnimatedWrapper } from '@/components/animated-wrapper';
import Image from 'next/image';
import { BlogPostCard } from '@/components/ui/blog-post-card';

const blogPosts = [
    {
      href: '#',
      tag: 'Innovation',
      date: '30 Juillet 2025',
      title: 'BordjSteel inaugure une nouvelle ligne de production de PRS',
      description: 'Découvrez comment notre nouvelle ligne de production de Profils Reconstitués Soudés (PRS) repousse les limites de la construction métallique en Algérie.',
      imageUrl: 'https://i.pinimg.com/736x/f8/05/39/f80539082e4b8be52b8e586116b367ca.jpg'
    },
    {
      href: '#',
      tag: 'Qualité',
      date: '15 Juin 2025',
      title: 'Notre engagement pour la certification ISO 9001:2015 renouvelé',
      description: 'La qualité est au coeur de notre ADN. BordjSteel est fier d\'annoncer le renouvellement de sa certification, un gage de confiance pour nos clients.',
      imageUrl: 'https://i.pinimg.com/736x/fc/ea/fb/fceafbcc5c3f0645268534eed8924cb3.jpg'
    },
    {
      href: '#',
      tag: 'Développement durable',
      date: '02 Mai 2025',
      title: 'La galvanisation à chaud : un procédé écologique et durable',
      description: 'Plongez dans les avantages environnementaux de la galvanisation à chaud, une solution de protection de l\'acier qui allie longévité et respect de l\'environnement.',
      imageUrl: 'https://i.pinimg.com/736x/5c/c4/bd/5cc4bd370f1bd95024acf54e7b1ff667.jpg'
    }
  ];

export default function BlogPage() {
  const heroImage = {
    src: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&q=80",
    alt: "Person reading a book in a library",
    aiHint: "reading library"
  }

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

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
      <section className="bg-secondary/50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 md:gap-16">
                {featuredPost && (
                    <AnimatedWrapper animation="slide-up">
                        <BlogPostCard
                            variant="featured"
                            {...featuredPost}
                        />
                    </AnimatedWrapper>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {otherPosts.map((post, index) => (
                         <AnimatedWrapper key={post.title} animation="fade-in-stagger" staggerIndex={index}>
                           <BlogPostCard
                                {...post}
                                className="h-full"
                           />
                        </AnimatedWrapper>
                    ))}
                </div>
            </div>
          </div>
      </section>
    </ProductPageLayout>
  );
}
