// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import node from '@astrojs/node';

export default defineConfig({
  output: 'static',
  site: 'https://renderhubmedia.com',
  compressHTML: true,
  adapter: node({ mode: 'standalone' }),
  integrations: [react(), markdoc(), keystatic()],
  build: {
    inlineStylesheets: 'auto',
  },
});
