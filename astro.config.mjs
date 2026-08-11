// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const siteUrl =
  process.env.SITE_URL ??
  process.env.URL ??
  'https://chitowntrolley.com';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: '/',

  // Static-first marketing site — no server runtime needed.
  output: 'static',

  integrations: [sitemap()],
});
