import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      'https://narayan-website-backend.onrender.com/api': {
        target: 'https://narayan-website-backend.onrender.com',
        changeOrigin: true,
        secure: true,
      }
    }
  }
})
