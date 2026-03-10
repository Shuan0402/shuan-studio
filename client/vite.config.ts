// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // 建議引入 path

export default defineConfig({
  plugins: [react()],
  base: '/', // 改回根目錄
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 順手建立別名，之後重構代碼會乾淨很多
    },
  },
})