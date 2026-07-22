
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Pin the workspace root so Next doesn't infer it from a stray parent
  // pnpm-lock.yaml (which triggers the "inferred workspace root" warning).
  outputFileTracingRoot: __dirname,
  turbopack: {
    root: __dirname,
  },
  // Type and lint errors fail the build (the codebase is clean as of this change).
  // Do not re-enable ignore flags to paper over errors — fix them instead.
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
    // Some remote logos are delivered as SVG. Allow them, but harden the
    // optimizer: force download disposition and a restrictive CSP so the
    // SVGs can't execute scripts when served through the image endpoint.
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Only hosts actually referenced by image data in src/ — re-verify with a
    // grep for the hostname before removing entries here.
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'images.unsplash.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'i.pinimg.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'i.imghippo.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'i.ibb.co', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'www.soummam-dz.com', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'cdn.brandfetch.io', port: '', pathname: '/**' },
      { protocol: 'https', hostname: 'www.cosider-groupe.dz', port: '', pathname: '/**' },
    ],
  },
};

export default nextConfig;
