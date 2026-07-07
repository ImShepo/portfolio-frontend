function parsePositiveInt(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

/**
 * API base URL must be the backend origin only (no path):
 *   ✓ http://localhost:3001
 *   ✗ http://localhost:3001/public
 *   ✗ http://localhost:3001/api
 *
 * Route paths (/public/projects, etc.) are appended in src/lib/api/*.
 */
export function normalizeApiBaseUrl(raw: string): string {
  let url = raw.trim().replace(/\/$/, "");

  // Prevent duplicated segments when API_URL mistakenly includes route prefixes
  if (url.endsWith("/public")) {
    url = url.slice(0, -"/public".length);
  }
  if (url.endsWith("/api")) {
    url = url.slice(0, -"/api".length);
  }

  return url.replace(/\/$/, "");
}

function resolveApiUrl(): string {
  const configured = process.env.API_URL?.trim();

  if (configured) {
    return normalizeApiBaseUrl(configured);
  }

  // Local dev: Next.js defaults to :3000; Nest CMS typically runs on :3001
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:3001";
  }

  return "http://localhost:3000";
}

export const env = {
  apiUrl: resolveApiUrl(),
  revalidateSeconds: parsePositiveInt(process.env.REVALIDATE_SECONDS, 60),
  contentFallback: process.env.CONTENT_FALLBACK_ENABLED === "true",
  staticMode: process.env.STATIC_MODE === "true",
} as const;

export type Env = typeof env;
