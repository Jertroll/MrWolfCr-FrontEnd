import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
        globals: true, // Habilita las funciones globales de pruebas
    environment: 'jsdom',
    setupFiles: './src/test/setup.jsx'
  }
})
