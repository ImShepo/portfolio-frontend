import { z } from "zod";

export const localeCodeSchema = z.enum(["en", "es", "pt", "fr", "it"]);

export function collectMessageKeys(value: unknown, prefix = ""): string[] {
  if (typeof value === "string") {
    return prefix ? [prefix] : [];
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return [];
  }

  const keys: string[] = [];
  for (const [key, nested] of Object.entries(value as Record<string, unknown>)) {
    const path = prefix ? `${prefix}.${key}` : key;
    if (typeof nested === "string") {
      keys.push(path);
    } else {
      keys.push(...collectMessageKeys(nested, path));
    }
  }
  return keys.sort();
}

export function assertLocaleStructure(value: unknown, path = "root"): void {
  if (typeof value === "string") {
    if (value.length === 0) {
      throw new Error(`Empty translation at ${path}`);
    }
    return;
  }
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`Invalid locale node at ${path}`);
  }
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    assertLocaleStructure(child, `${path}.${key}`);
  }
}

export function assertLocaleKeyParity(
  base: Record<string, unknown>,
  others: Record<string, Record<string, unknown>>
): void {
  const baseKeys = new Set(collectMessageKeys(base));
  const errors: string[] = [];

  for (const [locale, messages] of Object.entries(others)) {
    const keys = new Set(collectMessageKeys(messages));
    for (const key of baseKeys) {
      if (!keys.has(key)) errors.push(`${locale}: missing key "${key}"`);
    }
    for (const key of keys) {
      if (!baseKeys.has(key)) errors.push(`${locale}: unexpected key "${key}"`);
    }
  }

  if (errors.length > 0) {
    throw new Error(`Locale key mismatch:\n${errors.join("\n")}`);
  }
}
