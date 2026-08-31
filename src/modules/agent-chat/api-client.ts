import { getApiBaseUrl } from "./config";

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

function extractErrorMessage(body: unknown, fallback: string): string {
  if (body && typeof body === "object") {
    const record = body as Record<string, unknown>;
    if (typeof record.error === "string" && record.error.trim()) return record.error;
    if (typeof record.message === "string" && record.message.trim()) return record.message;
  }
  return fallback;
}

export async function apiFetch<T>(
  path: string,
  options: {
    method?: string;
    body?: unknown;
    visitorToken?: string;
  } = {},
): Promise<T> {
  const base = getApiBaseUrl();
  let url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  if (base.includes("/__adeptos-api") && !url.endsWith("/")) {
    url += "/";
  }

  const headers: Record<string, string> = {
    Accept: "application/json",
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (options.visitorToken) {
    headers["X-Visitor-Token"] = options.visitorToken;
    headers.Authorization = `Bearer ${options.visitorToken}`;
  }

  let res: Response;
  try {
    res = await fetch(url, {
      method: options.method || "GET",
      headers,
      credentials: "include",
      body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
    });
  } catch {
    throw new ApiError(
      `No se pudo conectar con el API (${base}). ¿Está corriendo en ${base}?`,
      0,
    );
  }

  let parsed: unknown = null;
  const text = await res.text();
  if (text) {
    try {
      parsed = JSON.parse(text);
    } catch {
      parsed = text;
    }
  }

  if (!res.ok) {
    throw new ApiError(
      extractErrorMessage(parsed, `Request failed (${res.status})`),
      res.status,
      parsed,
    );
  }

  return parsed as T;
}
