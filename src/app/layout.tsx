
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Montserrat, Roboto, Cairo } from 'next/font/google';

export const metadata: Metadata = {
  title: 'BORDJ STEEL',
  description: 'Leader de la construction métallique en Algérie',
};

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['400', '700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: ['400', '500'],
});

const cairo = Cairo({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cairo',
  weight: ['700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${montserrat.variable} ${roboto.variable} ${cairo.variable}`}>
      <head>
      </head>
      <body className="font-body antialiased" suppressHydrationWarning>
          {children}
          <Toaster />
      </body>
    </html>
  );
}
