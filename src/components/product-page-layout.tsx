
import { cn } from '@/lib/utils';
import dynamic from 'next/dynamic';

const Navbar = dynamic(() => import('@/components/navbar').then(mod => mod.Navbar));
const Footer = dynamic(() => import('@/components/footer').then(mod => mod.Footer));

interface ProductPageLayoutProps {
  children: React.ReactNode;
  mainClassName?: string;
  className?: string;
}

export function ProductPageLayout({ children, mainClassName, className }: ProductPageLayoutProps) {
  return (
    <div className={cn("flex min-h-[100dvh] flex-col", className)}>
      <Navbar />
      <main className={cn("flex-1", mainClassName)}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
