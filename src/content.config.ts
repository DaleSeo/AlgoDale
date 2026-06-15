import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const tags = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/tags" }),
  schema: z.object({
    name: z.string().optional(),
    icon: z.string().optional(),
  }),
});

const problems = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/problems",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

const algorithms = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/algorithms",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

const dataStructures = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/data-structures",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/guides" }),
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
