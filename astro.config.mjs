// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

const siteUrl = isGitHubPages
  ? 'https://chitowntracking.github.io'
  : process.env.SITE_URL ??
    process.env.URL ??
    'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
  site: siteUrl,
  base: isGitHubPages ? '/Trolley/' : '/',

  // Static-first marketing site — no server runtime needed.
  output: 'static',

  integrations: [
    sitemap({
      // Draft legal pages remain reachable for review but must not be advertised
      // to crawlers until owner/legal approval is documented.
      filter: (page) =>
        !page.endsWith('/privacy-policy/') &&
        !page.endsWith('/terms-and-conditions/'),
    }),
  ],
});
