import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/index.ts',
        'src/adapters/react/**/*.{ts,tsx}',
        'src/types.ts',
        'src/features/scroll-lock.ts', // iOS-specific code requires real browser
      ],
      all: false,
      thresholds: {
        lines: 98,
        branches: 90,
        functions: 98,
        statements: 98,
      },
    },
  },
})
