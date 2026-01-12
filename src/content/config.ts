import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Sentinel Nexus Team'),
    pillar: z.enum(['implementation', 'security', 'governance']),
    industry: z.string().optional(),
    tags: z.array(z.string()).default([]),
    image: z.string(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().max(160),
    pubDate: z.coerce.date().optional(),
    client: z.string(),
    industry: z.string(),
    pillar: z.array(z.enum(['implementation', 'security', 'governance'])),
    challenge: z.string(),
    outcome: z.string(),
    metrics: z.object({
      primary: z.object({
        value: z.string(),
        label: z.string(),
      }),
      secondary: z.object({
        value: z.string(),
        label: z.string(),
      }).optional(),
      tertiary: z.object({
        value: z.string(),
        label: z.string(),
      }).optional(),
    }),
    image: z.string(),
    imageAlt: z.string().optional(),
    gated: z.boolean().default(true),
    previewLength: z.number().default(500),
  }),
});

export const collections = { blog, 'case-studies': caseStudies };
