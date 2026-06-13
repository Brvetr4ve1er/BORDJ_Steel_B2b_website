
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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imghippo.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ibb.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.condor.dz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ifri-dz.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'sonatrach.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'metidji.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.maxtor.dz',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.soummam-dz.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'smartmedia.digital4danone.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.faae1-1.fna.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent.faae1-2.fna.fbcdn.net',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'groupesim.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.colinco-dz.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'utec.com.sa',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'softal-construction.dz',
        port: '',
        pathname: '/**',
      },
       {
        protocol: 'https',
        hostname: 'cdn.brandfetch.io',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.cosider-groupe.dz',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
