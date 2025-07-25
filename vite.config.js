import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api':  'http://localhost:5000', // Adjust the target to your backend server
      }
  },
  plugins: [react()],
})
