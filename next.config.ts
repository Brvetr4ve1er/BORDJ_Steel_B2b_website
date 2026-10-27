
import type {NextConfig} from 'next';

// ---------------------------------------------------------------------------
// Security + cache headers — the single source of truth for this site.
//
// These rules used to be duplicated in `firebase.json`. That file and
// `apphosting.yaml` were removed when deployment was consolidated onto
// Netlify, and nothing was lost: neither was ever read by the host that
// actually serves the site, and a plain `next start` reads neither.
// Declaring the headers here instead ships them inside the application, so
// they apply on Netlify today and would survive a move to any other Node host
// tomorrow — there is no deploy config left to keep in step, and none to
// forget to port. Keep them here for that reason: do not push them back out
// into a host-specific config file.
//
// The mentions of `firebase.json` below are historical — they record where
// the exact values were ported from, not a file that still exists.
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
