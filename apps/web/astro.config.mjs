import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';
const root = fileURLToPath(new URL('../../', import.meta.url));
export default defineConfig({
  output: 'static',
  publicDir: `${root}public`,
  integrations: [react()],
  build: { format: 'directory' },
  vite: {
    build: { cssCodeSplit: true },
    resolve: { alias: { '@content': `${root}content` } }
  }
});
