/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.ts'],
    exclude: ['node_modules'],
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['test/**/*.ts'],
      reporter: ['text', 'html'],
    },
    typecheck: {
      enabled: true,
    },
  },
});