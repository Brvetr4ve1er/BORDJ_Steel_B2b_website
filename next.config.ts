
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
    // Serve AVIF where the browser supports it (typically 20–40% smaller than
    // WebP at equal quality), falling back to WebP. The sources in
    // `public/media` are high-resolution WebP; Next re-encodes and resizes them
    // per request, so visitors never download the full-size original.
    formats: ['image/avif', 'image/webp'],
    // Optimised derivatives are immutable (the source filenames are content-
    // hashed), so let the optimizer cache them for a year instead of 60s.
    minimumCacheTTL: 31536000,
    // All site photography is now self-hosted under `public/media` (see
    // `docs/MEDIA.md`). The only remaining remote host is the placehold.co
    // fallback used when a project image key fails to resolve.
    // NOTE: `dangerouslyAllowSVG` was removed with the last remote SVG logo —
    // no image passed to next/image is an SVG any more. Do not re-add it
    // without re-auditing: it lets the optimizer serve attacker-controlled SVG.
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', port: '', pathname: '/**' },
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
