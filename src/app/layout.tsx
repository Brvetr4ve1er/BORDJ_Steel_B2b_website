
import type { Metadata } from 'next';
import './globals.css';
import './download-button.css';
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

export const metadata: Metadata = {
  title: {
    default: companyData.siteMetadata.title,
    template: `%s | ${companyData.siteMetadata.title}`,
  },
  description: companyData.siteMetadata.description,
  openGraph: {
    title: companyData.siteMetadata.title,
    description: companyData.siteMetadata.description,
    siteName: companyData.siteMetadata.title,
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: companyData.siteMetadata.title,
    description: companyData.siteMetadata.description,
  },
  metadataBase: new URL('https://bordj-steel.com'), // Replace with your actual domain
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
          {children}
          <Toaster />
      </body>
    </html>
  );
}
