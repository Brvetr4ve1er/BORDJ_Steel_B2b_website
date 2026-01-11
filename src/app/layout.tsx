
import type { Metadata } from 'next';
import './globals.css';
import './download-button.css';
import { Toaster } from "@/components/ui/toaster"
import { Montserrat, Roboto } from 'next/font/google';
import { CartProvider } from '@/contexts/cart-context';
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
    default: 'BORDJ Home Appliances - Modern E-commerce Platform',
    template: `%s | BORDJ Home Appliances`,
  },
  description: 'Modern B2B/B2C e-commerce platform for home appliances in Algeria. Shop refrigerators, washing machines, and more with secure monthly payment options.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BORDJ Home Appliances',
  },
  openGraph: {
    title: 'BORDJ Home Appliances - Modern E-commerce Platform',
    description: 'Modern B2B/B2C e-commerce platform for home appliances in Algeria',
    siteName: 'BORDJ Home Appliances',
    type: 'website',
    locale: 'ar_DZ',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BORDJ Home Appliances',
    description: 'Modern B2B/B2C e-commerce platform for home appliances in Algeria',
  },
  metadataBase: new URL('https://bordj-appliances.com'), // Replace with your actual domain
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
        <CartProvider>
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
