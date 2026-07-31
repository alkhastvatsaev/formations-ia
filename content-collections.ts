import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";

const formations = defineCollection({
  name: "formations",
  directory: "content/formations",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string().min(40).max(400),
    description: z.string(),
    audience: z.string(),
    duration: z.string(),
    mode: z.enum(["live", "intra", "hybride"]),
    priceCents: z.number().int().positive(),
    currency: z.literal("eur").default("eur"),
    stripePriceId: z.string().optional(),
    level: z.enum(["debutant", "intermediaire", "avance"]),
    outcomes: z.array(z.string()),
    program: z.array(
      z.object({
        title: z.string(),
        items: z.array(z.string()),
      }),
    ),
    faq: z.array(
      z.object({
        question: z.string(),
        answer: z.string().min(40).max(600),
      }),
    ),
    nextSessions: z.array(
      z.object({
        date: z.string(),
        label: z.string(),
      }),
    ),
    publishedAt: z.string(),
    updatedAt: z.string(),
    draft: z.boolean().default(false),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);
    return {
      ...document,
      body,
    };
  },
});

const articles = defineCollection({
  name: "articles",
  directory: "content/articles",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string().min(40).max(400),
    description: z.string(),
    publishedAt: z.string(),
    updatedAt: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    content: z.string(),
  }),
  transform: async (document, context) => {
    const body = await compileMDX(context, document);
    return {
      ...document,
      body,
    };
  },
});

const testimonials = defineCollection({
  name: "testimonials",
  directory: "content/testimonials",
  include: "**/*.mdx",
  schema: z.object({
    name: z.string(),
    role: z.string(),
    company: z.string().optional(),
    quote: z.string(),
    formationSlug: z.string().optional(),
    publishedAt: z.string(),
    content: z.string(),
  }),
});

export default defineConfig({
  collections: [formations, articles, testimonials],
});
