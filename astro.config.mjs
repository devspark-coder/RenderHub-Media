// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';

export default defineConfig({
  output: 'static',
  site: 'https://renderhubmedia.com',
  compressHTML: true,
  adapter: netlify(),
  integrations: [react(), markdoc(), keystatic()],
  build: {
    inlineStylesheets: 'auto',
  },
});
