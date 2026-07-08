import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  assertLocaleKeyParity,
  assertLocaleStructure,
  collectMessageKeys,
  localeCodeSchema,
} from "../src/lib/validation/locales";
import { projectsArraySchema } from "../src/lib/validation/project";

const root = resolve(import.meta.dirname, "..");

function readJson(path: string): unknown {
  return JSON.parse(readFileSync(path, "utf8"));
}

function validateProjects(): void {
  const data = readJson(resolve(root, "content/projects.json"));
  const result = projectsArraySchema.safeParse(data);
  if (!result.success) {
    console.error("Invalid content/projects.json:");
    console.error(result.error.flatten());
    process.exit(1);
  }
  console.log(`✓ projects.json (${result.data.length} projects)`);
}

function validateLocales(): void {
  const codes = ["en", "es", "pt", "fr", "it"] as const;
  const parsed: Record<string, Record<string, unknown>> = {};

  for (const code of codes) {
    localeCodeSchema.parse(code);
    const path = resolve(root, `locales/${code}.json`);
    const data = readJson(path);
    assertLocaleStructure(data, `locales/${code}.json`);
    parsed[code] = data as Record<string, unknown>;
    console.log(`✓ locales/${code}.json (${collectMessageKeys(data).length} keys)`);
  }

  const { en, ...others } = parsed;
  assertLocaleKeyParity(en, others);
  console.log("✓ locale key parity across en, es, pt, fr, it");
}

function main(): void {
  console.log("Validating content…\n");
  validateProjects();
  validateLocales();
  console.log("\nAll content validation checks passed.");
}

main();
