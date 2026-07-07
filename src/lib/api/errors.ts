import type { ApiErrorResponse } from "./types";

export class ApiError extends Error {
  readonly status: number;
  readonly body: ApiErrorResponse | null;

  constructor(status: number, body: ApiErrorResponse | null, message?: string) {
    super(message ?? body?.message?.toString() ?? `API request failed (${status})`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
