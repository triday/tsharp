/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.ts'],
    exclude: ['node_modules'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['test/**/*.ts'],
      reporter: ['text', 'html'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 80,
      },
    },
    typecheck: {
      enabled: true,
    },
  },
});