
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  // Type and lint errors fail the build (the codebase is clean as of this change).
  // Do not re-enable ignore flags to paper over errors — fix them instead.
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  images: {
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
        hostname: 'storage.googleapis.com',
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
        hostname: 'www.imghippo.com',
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
        hostname: 'i.imghippo.org',
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
        hostname: 'www.cevital.com',
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
        hostname: 'instagram.faae1-2.fna.fbcdn.net',
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
      {
        protocol: 'https',
        hostname: 'www.untitledui.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

export default nextConfig;
