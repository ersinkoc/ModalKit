import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@oxog/modalkit/react': resolve(__dirname, 'public/lib/react/index.js'),
      '@oxog/modalkit': resolve(__dirname, 'public/lib/index.js'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
