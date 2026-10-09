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
      sidebar: sidebar(),
    }),
  ],
});
