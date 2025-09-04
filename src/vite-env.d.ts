/// <reference types="vite/client" />

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? '/daily-clanker-site/' : '/',
})

