import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    date: z.coerce.date(),
    tier: z.enum(['open', 'blackbook']),
    author: z.string().default('The team'),
    readMinutes: z.number().optional(),
  }),
});

export const collections = { articles };
