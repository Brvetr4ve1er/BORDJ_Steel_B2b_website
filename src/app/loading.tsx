import { SteelLoader } from '@/components/ui/steel-loader';

/**
 * Root loading UI for the App Router.
 *
 * Shown while the RSC payload for a navigation streams — client-side route
 * transitions and slow connections. The 36 prerendered pages are served
 * instantly on a fast connection, so this is correctly invisible most of the
 * time; nothing here delays a page to make the loader visible.
 *
 * Deliberately self-contained: no Navbar/Footer import. Those pull in large
 * client trees, and the whole point of this boundary is to paint immediately.
 */
export default function Loading() {
  return (
    <main
      id="main"
      className="flex min-h-[70dvh] w-full flex-col items-center justify-center bg-background px-4 py-20"
    >
      <SteelLoader />
    </main>
  );
}
