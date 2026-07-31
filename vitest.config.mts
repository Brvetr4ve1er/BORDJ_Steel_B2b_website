import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: {
    // These are data-integrity tests over config + the public/ asset tree.
    // They need Node APIs (fs) and no DOM, which keeps the suite fast and the
    // dependency footprint to a single dev package.
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    reporters: 'dot',
  },
});
