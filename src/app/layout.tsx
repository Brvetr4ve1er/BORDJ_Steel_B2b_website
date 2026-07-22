
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Montserrat, Roboto } from 'next/font/google';
import { companyData } from '@/config/company-data';
import Script from 'next/script';

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
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
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
  twitter: {
    card: 'summary_large_image',
    title: companyData.siteMetadata.title,
    description: companyData.siteMetadata.description,
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
  name: companyData.siteMetadata.title,
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
      <head>

      </head>
      <body>
          {/* AnimatedWrapper hides content (opacity-0) until an
              IntersectionObserver fires; without JS nothing would ever appear.
              This noscript override keeps the site fully readable JS-free. */}
          <noscript>
            <style>{`.opacity-0{opacity:1!important;transform:none!important}`}</style>
          </noscript>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:left-4 focus:top-4 focus:rounded focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
          >
            Aller au contenu principal
          </a>
          {children}
          <Toaster />
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
          />
      </body>
    </html>
  );
}
