import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// BUILD_TARGET=server → base '/' (nginx / deploy-atheer.sh)
// default (unset)     → base '/Atheer-v2/' (GitHub Pages)
const isServerBuild = process.env.BUILD_TARGET === 'server';

export default defineConfig({
  base: isServerBuild ? '/' : '/Atheer-v2/',
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
  },
});
