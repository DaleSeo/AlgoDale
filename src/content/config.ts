import { defineCollection, reference, z } from "astro:content";

const tags = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string().optional(),
    icon: z.string().optional(),
    ko: z.array(z.string()),
  }),
});

const problems = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    tags: z.array(reference("tags")),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

const blog = defineCollection({
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    heroImage: z.string().optional(),
  }),
});

export const collections = { tags, problems, blog };
