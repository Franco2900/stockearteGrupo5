import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Cuando se detecte una petición a '/api', se redirigirá al servidor backend 
      '/api': {
        target: 'http://127.0.0.1:5000',  // URL del servidor que devuelve los datos
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/apiSoap': {
        target: 'http://127.0.0.1:7000',  // URL del servidor que devuelve los datos
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apiSoap/, '')
      }
    }
  }
})
