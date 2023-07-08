import { defineCollection, z } from "astro:content";

const tags = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
    ko: z.array(z.string()),
  }),
});

const problems = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

const algorithms = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

const dataStructures = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

const guides = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = {
  tags,
  problems,
  algorithms,
  "data-structures": dataStructures,
  guides,
};
