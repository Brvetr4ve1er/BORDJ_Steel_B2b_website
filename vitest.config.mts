import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // `tsconfig.json` declares `jsx: "preserve"` because Next's own compiler does
  // the JSX transform. Vite honours that tsconfig, so without this it hands the
  // SSR transform untransformed JSX and the render suites fail to parse before
  // a single assertion runs. Next is unaffected — it never reads this file.
  oxc: {
    jsx: { runtime: 'automatic' },
  },
  test: {
    // Node is the default because most of this suite is data-integrity tests
    // over config + the public/ asset tree: they need fs and no DOM, which
    // keeps them fast. The render suites opt into jsdom per file, with a
    // `// @vitest-environment jsdom` pragma on their first line, so adding
    // them costs the node suites nothing.
    environment: 'node',
    // .tsx too: the render suites are JSX.
    include: ['tests/**/*.test.{ts,tsx}'],
    reporters: 'dot',
  },
});
