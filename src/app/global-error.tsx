'use client';

// Last-resort boundary: it replaces the root layout when a render throws above
// every other boundary, so it must supply its own <html>/<body> and its own
// stylesheet — the layout that normally imports globals.css never runs here.
// Kept deliberately self-contained (no Navbar/Footer, no config imports): the
// recovery UI must not depend on the tree that just failed.
import './globals.css';
import { useEffect } from 'react';
import { AlertTriangle, RotateCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the failure in the browser console / hosting logs.
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      {/* Inline fallbacks so the page stays legible and centred even in the
          edge case where the stylesheet above failed to load too. */}
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          backgroundColor: '#ffffff',
          color: '#4B4B4B',
        }}
      >
        <main className="flex min-h-[100dvh] w-full flex-col items-center justify-center px-4 py-24 text-center">
          <span
            className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 text-accent"
            aria-hidden="true"
          >
            <AlertTriangle className="h-8 w-8" />
          </span>

          <h1 className="mt-8 font-headline text-3xl font-bold uppercase tracking-tighter text-primary md:text-4xl">
            Une erreur est survenue
          </h1>

          <p className="mt-5 max-w-xl text-lg text-muted-foreground">
            Un problème technique a interrompu le chargement de cette page. Vous pouvez réessayer ;
            si le problème persiste, revenez à l'accueil ou contactez-nous.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-accent px-8 text-sm font-medium text-accent-foreground transition-all duration-200 hover:bg-accent/90 hover:shadow-lg active:scale-[0.98]"
            >
              <RotateCw className="h-4 w-4" aria-hidden="true" />
              Réessayer
            </button>

            {/* A hard navigation, not next/link: once the root tree has
                crashed, this boundary owns <html>/<body>, so a soft route
                change would have to reconcile them against the root layout's.
                A full document load is the reliable recovery. A button (rather
                than an anchor) keeps that explicit and avoids pretending this
                is a normal in-app link. */}
            <button
              type="button"
              onClick={() => {
                window.location.assign('/');
              }}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-input bg-background px-8 text-sm font-medium text-foreground transition-all duration-200 hover:border-accent hover:bg-accent hover:text-accent-foreground active:scale-[0.98]"
            >
              Retour à l'accueil
            </button>
          </div>

          {error.digest ? (
            <p className="mt-12 text-sm text-muted-foreground">
              Code de référence : <span className="font-mono">{error.digest}</span>
            </p>
          ) : null}
        </main>
      </body>
    </html>
  );
}
