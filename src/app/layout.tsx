
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Montserrat, Roboto } from 'next/font/google';
import { companyData } from '@/config/company-data';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
});

// Dedicated 1200x630 raster card — social platforms (Facebook, LinkedIn, X)
// do not render SVG OG images reliably.
const ogImage = '/og-image.png';

export const metadata: Metadata = {
  title: {
    default: companyData.siteMetadata.title,
    template: `%s | ${companyData.siteMetadata.title}`,
  },
  description: companyData.siteMetadata.description,
  // No `icons` entry on purpose. src/app/favicon.ico is served by the App
  // Router file convention on its own, so declaring it here only duplicates it.
  // An apple-touch-icon is deliberately absent rather than aimed at the .ico:
  // Apple wants a 180x180 PNG, and the repo has none to point at yet.
  alternates: {
    canonical: './',
  },
  openGraph: {
    title: companyData.siteMetadata.title,
    description: companyData.siteMetadata.description,
    siteName: companyData.siteMetadata.title,
    type: 'website',
    locale: 'fr_FR',
    images: [ogImage],
  },
  // No `title`/`description` here on purpose. `twitter` is replaced wholesale
  // by a page-level block, not merged, so hardcoding them meant every route
  // that set its own `twitter.images` inherited the site title and description
  // instead of the article's. Next fills both from `openGraph` (then from
  // `description`) when they are absent, so each route keeps a populated card.
  twitter: {
    card: 'summary_large_image',
    images: [ogImage],
  },
  metadataBase: new URL(companyData.siteMetadata.siteUrl),
};

export const viewport: Viewport = {
  themeColor: '#C1272D',
  width: 'device-width',
  initialScale: 1,
};


// Organization / LocalBusiness structured data, built from companyData so it
// stays in sync with the single source of truth in src/config/company-data.ts.
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: companyData.siteMetadata.name,
  url: companyData.siteMetadata.siteUrl,
  logo: new URL('/bordj-steel-logo.svg', companyData.siteMetadata.siteUrl).toString(),
  address: {
    '@type': 'PostalAddress',
    streetAddress: companyData.pages.contact.content.address,
    addressLocality: 'Bordj Bou Arréridj',
    addressCountry: 'DZ',
  },
  telephone: companyData.pages.contact.content.phones[0],
  email: companyData.pages.contact.content.emails[0],
  sameAs: [
    companyData.socials.linkedin,
    companyData.socials.facebook,
    companyData.socials.instagram,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${roboto.variable}`}>
      <body>
          {/* AnimatedWrapper hides content (opacity-0) until an
              IntersectionObserver fires; without JS nothing would ever appear.
              This noscript override keeps the site fully readable JS-free.

              SCOPED TO `.duration-700`, which is AnimatedWrapper's own
              transition class (see animated-wrapper.tsx) and the only place in
              src/ where it meets `opacity-0`. A bare `.opacity-0` matched every
              other Tailwind use of the utility too: the chaudronnerie page
              stacks its technical schematics as absolute slides and hides the
              non-current ones with `opacity-0`, so JS-free visitors got all of
              them superimposed in one card, and the Facilities tiles had their
              hover-only scrim and a duplicate corner icon forced on. */}
          <noscript>
            <style>{`.duration-700.opacity-0{opacity:1!important;transform:none!important}`}</style>
          </noscript>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:left-4 focus:top-4 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
          >
            Aller au contenu principal
          </a>
          {children}
          <Toaster />
          {/* A plain <script>, not next/script: `<Script>` injects the tag from
              the client bundle, so the markup was absent from the server HTML
              and invisible to every non-JS crawler and to any validator the
              client or the next developer points at the URL. Structured data
              has nothing to execute, so there is no loading strategy to gain. */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
      </body>
    </html>
  );
}
