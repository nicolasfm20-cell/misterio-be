import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Mantém o nome original e a extensão do arquivo na pasta de assets
        assetFileNames: 'assets/[name][extname]'
      }
    }
  }
})