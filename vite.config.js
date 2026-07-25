import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // if using Tailwind v4 plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    'process.env': {},
  },
})