import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // Use HTTP instead of HTTPS for local development to match API server
    https: false,
    port: 5173,
    strictPort: false, // Don't exit if port is already in use, find another port
    // Configure CORS for development server
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false
      }
    }
  },
  // Properly handle process signals
  build: {
    // Add source maps for better debugging
    sourcemap: true
  }
});