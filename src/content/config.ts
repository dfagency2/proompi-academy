import { defineCollection, z } from 'astro:content';

const docs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    section: z.enum([
      'getting-started',
      'prompt-enhancement',
      'image-generation',
      'workflows',
      'video-generation',
      'music-generation',
      'graphics-editing',
      'plans-credits',
      'tips',
    ]),
    order: z.number().default(0),
    lang: z.enum(['pl', 'en']),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    badge: z.string().optional(), // e.g. "Nowość", "Pro"
    youtubeId: z.string().optional(),
  }),
});

export const collections = { docs };
