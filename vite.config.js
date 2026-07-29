import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // if using Tailwind v4 plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // Exposes the dev server to your local Wi-Fi network
  },
  define: {
    'process.env': {},
  },
})