import { projectSchema } from "@/lib/validation/project";
import type { Project } from "./types";

/** Runtime validation for backend ProjectContract payloads. */
export function normalizeProject(value: unknown): Project | null {
  const parsed = projectSchema.safeParse(value);
  return parsed.success ? parsed.data : null;
}

export function normalizeProjects(values: unknown[]): Project[] {
  return values
    .map((value) => normalizeProject(value))
    .filter((project): project is Project => project !== null);
}
