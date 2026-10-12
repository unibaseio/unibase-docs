import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import { BASE, generate, sidebar, redirects } from './scripts/gitbook.mjs';

generate();

export default defineConfig({
  site: process.env.DOCS_SITE, // e.g. https://unibaseio.github.io — enables sitemap + canonical URLs
  base: BASE || undefined,
  redirects: redirects(),
  integrations: [
    starlight({
      title: 'Unibase Docs',
      // Same icons as unibase.com
      favicon: '/favicon.ico',
      head: [
        { tag: 'link', attrs: { rel: 'icon', href: '/icon.svg', type: 'image/svg+xml' } },
        { tag: 'link', attrs: { rel: 'apple-touch-icon', href: '/apple-icon.png' } },
      ],
      sidebar: sidebar(),
    }),
  ],
});
