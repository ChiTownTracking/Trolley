import { defineCollection, z } from 'astro:content';

// `category` is a free string (not an enum) so new categories — Weddings,
// Corporate, Christmas, etc. — can be added later just by using a new slug
// in frontmatter plus a matching entry in `guideCategories` (src/data/guides.ts).
const guides = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    category: z.string().default('guides'),
    cover: z.string(),
    coverAlt: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
    author: z.string().default('ChiTown Trolley'),
    /** Manually pin an article as the index page's featured block. */
    featured: z.boolean().default(false),
  }),
});

export const collections = { guides };
