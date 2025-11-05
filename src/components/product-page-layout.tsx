
import { cn } from '@/lib/utils';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

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
