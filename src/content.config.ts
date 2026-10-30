import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const work = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    format: z.string(),
    platform: z.string(),
    vertical: z.string(),
    poster: z.string(),
    driveUrl: z.string(),
    order: z.number(),
  }),
});

const formats = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/formats' }),
  schema: z.object({
    title: z.string(),
    label: z.string(),
    blurb: z.string(),
    order: z.number(),
  }),
});

const process = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/process' }),
  schema: z.object({
    title: z.string(),
    label: z.string(),
    body: z.string(),
    order: z.number(),
  }),
});

export const collections = { work, formats, process };
