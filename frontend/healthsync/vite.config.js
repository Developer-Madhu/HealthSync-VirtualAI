import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  define: {
    global: "window", // 👈 Fix the "global is not defined" error
  },
  plugins: [tailwindcss(),react()],
})
