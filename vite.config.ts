import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/daily-clanker-site/', // <-- for GitHub Pages
  plugins: [
    react(),
    {
      name: 'create-404-page',
      closeBundle() {
        const indexPath = resolve(__dirname, 'dist/index.html')
        const notFoundPath = resolve(__dirname, 'dist/404.html')
        const indexHtml = readFileSync(indexPath, 'utf-8')
        writeFileSync(notFoundPath, indexHtml)
        console.log('✅ 404.html created for GitHub Pages SPA routing')
      },
    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    target: 'esnext',
  },
})
