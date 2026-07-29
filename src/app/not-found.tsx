import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Package } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Page introuvable',
  description: "La page demandée n'existe pas ou a été déplacée.",
};

// Deliberately self-contained: no Navbar/Footer import. Those pull in large
// client trees, and a 404 must stay cheap and render even when the rest of the
// app is unhappy.
export default function NotFound() {
  return (
    <main
      id="main"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-background px-4 py-24 text-center"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-grid-faint opacity-60"
        aria-hidden="true"
      />

      <div className="relative flex flex-col items-center">
        <p className="font-headline text-7xl font-bold leading-none tracking-tighter text-accent md:text-8xl">
          404
        </p>

        <h1 className="mt-6 font-headline text-3xl font-bold uppercase tracking-tighter text-primary md:text-4xl">
          Page introuvable
        </h1>

        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          La page que vous recherchez n'existe pas ou a été déplacée. Vérifiez l'adresse saisie, ou
          repartez de l'accueil pour retrouver votre chemin.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-8 text-sm font-medium text-accent-foreground transition-all duration-200 hover:bg-accent/90 hover:shadow-lg active:scale-[0.98]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Retour à l'accueil
          </Link>

          <Link
            href="/products"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-input bg-background px-8 text-sm font-medium text-foreground transition-all duration-200 hover:border-accent hover:bg-accent hover:text-accent-foreground active:scale-[0.98]"
          >
            <Package className="h-4 w-4" aria-hidden="true" />
            Voir nos produits
          </Link>
        </div>

        <p className="mt-12 text-sm text-muted-foreground">
          Vous ne trouvez pas ce que vous cherchez ?{' '}
          <Link href="/contact" className="font-semibold text-accent underline underline-offset-4">
            Contactez-nous
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
