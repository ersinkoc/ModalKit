import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/adapters/react/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  minify: true,
  treeshake: true,
  sourcemap: true,
  splitting: false,
  outDir: 'dist/react',
  external: ['react', 'react-dom'],
  esbuildOptions(options) {
    options.jsx = 'automatic'
  },
})
