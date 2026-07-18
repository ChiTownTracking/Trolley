// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://chitowntracking.github.io',
  base: '/Trolley',
  // Static-first marketing site — no server runtime needed.
  output: 'static',
  integrations: [
    sitemap({
      // Draft legal pages remain reachable for review but must not be advertised
      // to crawlers until owner/legal approval is documented.
      filter: (page) =>
        !page.endsWith('/privacy-policy/') && !page.endsWith('/terms-and-conditions/'),
    }),
  ],
});
