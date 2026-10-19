import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const sections = defineCollection({
  loader: glob({ pattern: "**/[^_]*.mdx", base: "./src/content/sections" }),
  schema: z.object({
    sectionId: z
      .string()
      .regex(
        /^([BIA][1-8]|P1)\.\d{1,2}$/,
        "sectionId debe cumplir el formato ^([BIA][1-8]|P1)\\.\\d{1,2}$ (p. ej. P1.1)"
      ),
    course: z.string(),
    title: z.string(),
    order: z.number().int().positive(),
    minutes: z.number().int().positive().default(60),
    summary: z.string().max(220, "summary debe tener 220 caracteres como máximo"),
  }),
});

export const collections = { sections };
