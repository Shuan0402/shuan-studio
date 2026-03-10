import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/shuan-studio/',

  plugins: [react()],

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 0,
  },

  server: {
    port: 5173,
    strictPort: true,
  }
})