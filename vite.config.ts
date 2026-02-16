import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [react()],
    define: {
      // Expose env vars to client side
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || ''),
      // Fallback for libraries using process.env (though we should avoid it)
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || '')
    },
    optimizeDeps: {
      exclude: ['@google/genai']
    },
    build: {
      rollupOptions: {
        external: ['@google/genai'],
        output: {
          paths: {
            '@google/genai': 'https://esm.sh/@google/genai@^1.41.0'
          }
        }
      }
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
