import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/daily-clanker-site/', // <-- Add this for GitHub Pages
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
