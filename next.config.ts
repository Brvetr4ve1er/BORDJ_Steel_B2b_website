
import type {NextConfig} from 'next';

// ---------------------------------------------------------------------------
// Security + cache headers — host-independent source of truth.
//
// The same rules are also declared in `firebase.json`, but that block only
// applies to *classic* Firebase Hosting. This repo is simultaneously wired for
// Firebase App Hosting (`apphosting.yaml`), and the site is currently also
// served from Netlify — neither reads firebase.json's `hosting.headers`, and
// nor does a plain `next start`. Declaring the headers here ships them with
// the app itself, whatever the host. The firebase.json block is intentionally
// kept as well: duplicated headers are harmless, missing ones are not.
// Keep the two in sync when either changes.
// ---------------------------------------------------------------------------
const securityHeaders = [
  {key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload'},
  {key: 'X-Content-Type-Options', value: 'nosniff'},
  {key: 'X-Frame-Options', value: 'SAMEORIGIN'},
  // Ported verbatim from firebase.json: `frame-ancestors` only. Do NOT grow
  // this into a full CSP without auditing the site's inline styles, the
  // embedded Google Maps iframe and the remote image hosts listed below — a
  // stricter policy would silently break all three.
  {key: 'Content-Security-Policy', value: "frame-ancestors 'self'"},
];

// Mirrors the two `Cache-Control` rules in firebase.json. Sources use
// Next's path-to-regexp syntax rather than globs: `/:path*.:ext(a|b)` is the
// equivalent of firebase.json's `**/*.@(a|b)`.
const immutableCacheHeaders = [
  {key: 'Cache-Control', value: 'public, max-age=31536000, immutable'},
];

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
    ],
  },
  async headers() {
    return [
      // Every route, including `/`.
      {source: '/:path*', headers: securityHeaders},
      // Build output is content-hashed; `/public` holds no js/css today.
      {source: '/:path*.:ext(js|css)', headers: immutableCacheHeaders},
      {
        source: '/:path*.:ext(webp|png|jpg|jpeg|gif|ico|svg|woff2|woff)',
        headers: immutableCacheHeaders,
      },
    ];
  },
};

export default nextConfig;
