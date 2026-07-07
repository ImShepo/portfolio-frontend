/**
 * Public API contracts — aligned with portfolio-backend/docs/API-CONTRACT.md
 */

export type Project = {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  stack: string[];
  image: string;
  github: string | null;
  demo: string | null;
  featured: boolean;
  architecture: string;
  challenges: string;
  results: string;
  problem?: string;
  solution?: string;
};

export type PaginatedMeta = {
  total: number;
  skip: number;
  take: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: PaginatedMeta;
};

export type SectionPayload = {
  key: string;
  content: unknown;
};

export type ApiErrorResponse = {
  statusCode: number;
  error: string;
  message: string | string[];
  path: string;
  timestamp: string;
  requestId: string;
};
