import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: '.',  // Ensures Vite looks in the project root
  build: {
    outDir: 'dist',
  },
  define: {
    global: "window", // 👈 Fix the "global is not defined" error
  },
  plugins: [tailwindcss(),react()],
})
