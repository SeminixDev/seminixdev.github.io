import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title:       z.string(),
    subtitle:    z.string(),
    description: z.string(),
    tags:        z.array(z.string()),
    category:    z.enum(['engine', 'game', 'web']),
    role:        z.string(),
    date:        z.string(),
    images:      z.array(z.string()).default([]),
    video:       z.string().optional(),
    links:       z.record(z.string(), z.string()).default({}),
    featured:    z.boolean().default(false),
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title:     z.string(),
    date:      z.string(),
    summary:   z.string(),
    projectId: z.string().optional(),
    tags:      z.array(z.string()).default([]),
    image:     z.string().optional(),
  }),
});

export const collections = { projects, posts };
