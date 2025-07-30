
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatedWrapper } from './animated-wrapper';
import { companyData } from '@/config/company-data';

export function Products() {
  const { products } = companyData.pages;

  return (
    <section id="products" className="bg-background">
      <div className="container mx-auto px-4">
        <AnimatedWrapper animation="fade-in">
          <h2 className="font-headline text-4xl font-bold text-center text-primary mb-12">{products.title}</h2>
        </AnimatedWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.items.map((product, index) => (
            <AnimatedWrapper key={index} animation="fade-in-stagger" staggerIndex={index}>
              <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
                <CardHeader>
                  <Image
                    src={product.image.src}
                    alt={product.name}
                    width={800}
                    height={600}
                    className="w-full h-auto object-cover"
                    data-ai-hint={product.image.aiHint}
                  />
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="font-headline text-2xl text-primary">{product.name}</CardTitle>
                  <p className="mt-2 text-lg">{product.description}</p>
                </CardContent>
              </Card>
            </AnimatedWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
