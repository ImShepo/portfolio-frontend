import { env, normalizeApiBaseUrl } from "@/lib/env";
import { ApiError } from "./errors";
import type { ApiErrorResponse } from "./types";

type ApiFetchInit = RequestInit & {
  next?: NextFetchRequestConfig;
};

function joinApiUrl(path: string): string {
  const base = normalizeApiBaseUrl(env.apiUrl);
  const route = path.startsWith("/") ? path : `/${path}`;
  return `${base}${route}`;
}

async function parseErrorBody(response: Response): Promise<ApiErrorResponse | null> {
  try {
    const body: unknown = await response.json();
    if (body && typeof body === "object" && "statusCode" in body) {
      return body as ApiErrorResponse;
    }
  } catch {
    // non-JSON error body
  }
  return null;
}

function logApiRequest(url: string, status: number, ok: boolean): void {
  if (process.env.NODE_ENV !== "development") return;
  const label = ok ? "OK" : "FAIL";
  console.info(`[api] ${label} ${status} ${url}`);
}

/**
 * Typed fetch wrapper for the portfolio CMS backend.
 * Intended for Server Components and Route Handlers only.
 */
export async function apiFetch<T>(path: string, init?: ApiFetchInit): Promise<T> {
  const url = joinApiUrl(path);
  const tags = ["cms", ...(init?.next?.tags ?? [])];

  const response = await fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...init?.headers,
    },
    next: {
      revalidate: env.revalidateSeconds,
      ...init?.next,
      tags,
    },
  });

  logApiRequest(url, response.status, response.ok);

  if (!response.ok) {
    const body = await parseErrorBody(response);
    if (process.env.NODE_ENV === "development") {
      console.error(`[api] ${response.status} ${url}`, body?.message ?? body?.error);
    }
    throw new ApiError(response.status, body);
  }

  return response.json() as Promise<T>;
}
