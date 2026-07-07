import { z } from "zod";

export const projectSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  longDescription: z.string().min(1),
  stack: z.array(z.string().min(1)).min(1),
  image: z.string().min(1),
  github: z.string().url().nullable(),
  demo: z.string().url().nullable(),
  featured: z.boolean(),
  architecture: z.string().min(1),
  challenges: z.string().min(1),
  results: z.string().min(1),
  problem: z.string().min(1).optional(),
  solution: z.string().min(1).optional(),
});

export const projectsArraySchema = z.array(projectSchema).min(1);

export const paginatedMetaSchema = z.object({
  total: z.number().int().nonnegative(),
  skip: z.number().int().nonnegative(),
  take: z.number().int().positive(),
});

export const paginatedProjectsSchema = z.object({
  data: z.array(z.unknown()),
  meta: paginatedMetaSchema,
});

export type ProjectInput = z.infer<typeof projectSchema>;
