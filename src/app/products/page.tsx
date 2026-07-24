import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductPageLayout } from '@/components/product-page-layout';
import { companyData } from '@/config/company-data';
import { HardHat, Package, Cog, Anchor, ArrowRight, type LucideIcon } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Produits',
  description:
    'Découvrez nos solutions de construction métallique : charpente métallique, panneaux sandwichs, galvanisation à chaud et chaudronnerie.',
};

type ProductChild = { name: string; href: string; description: string; icon: string };

const iconMap: Record<string, LucideIcon> = { HardHat, Package, Cog, Anchor };

export default function ProductsPage() {
  const products =
    (companyData.navigation.mainMenu.find((i) => i.name === 'Produits') as
      | { children?: ProductChild[] }
      | undefined)?.children ?? [];

  return (
    <ProductPageLayout>
      <section className="bg-primary pb-24 pt-36 text-center text-primary-foreground md:pt-40">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-5xl md:text-6xl font-bold uppercase tracking-tighter">
            Nos Produits
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-primary-foreground/80">
            Quatre savoir-faire complémentaires au service de vos projets de construction métallique.
          </p>
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 sm:grid-cols-2">
            {products.map((product) => {
              const Icon = iconMap[product.icon] ?? Package;
              return (
                <Link
                  key={product.href}
                  href={product.href}
                  className="group relative flex flex-col rounded-xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
                >
                  <span className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-7 w-7" />
                  </span>
                  <h2 className="font-headline text-2xl font-bold text-primary">{product.name}</h2>
                  <p className="mt-3 flex-1 text-muted-foreground">{product.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-accent">
                    Découvrir
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </ProductPageLayout>
  );
}
