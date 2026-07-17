// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.chitowntrolley.com',
  // Static-first marketing site — no server runtime needed.
  output: 'static',
  integrations: [sitemap()],
});
