const DEFAULT_PROD_API = "https://api.adeptos.ai";

function isBrowserLocalHost(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1" || host === "avalon";
}

function isLoopbackApiUrl(url: string): boolean {
  try {
    const { hostname } = new URL(url);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

/** Base URL for Adeptos Go API (no trailing slash). */
export function getApiBaseUrl(): string {
  if (typeof window !== "undefined" && isBrowserLocalHost()) {
    // Dev: Next rewrites /__adeptos-api → api.adeptos.ai
    return `${window.location.origin}/__adeptos-api`;
  }

  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.trim();
  if (fromEnv) {
    const cleaned = fromEnv.replace(/\/$/, "");
    if (isLoopbackApiUrl(cleaned)) return DEFAULT_PROD_API;
    return cleaned;
  }
  return DEFAULT_PROD_API;
}

/** Public business UUID/slug for visitor chat (Auditoría IA). */
export function getLandingBusinessUuid(): string {
  return (process.env.NEXT_PUBLIC_LANDING_BUSINESS_UUID || "agent").trim();
}

export const VISITOR_TOKEN_STORAGE_KEY = "hamilll_visitor_chat_token";
export const SESSION_ID_STORAGE_KEY = "hamilll_landing_session_id";

/** Adeptos isotype for empty state (matches landing-adeptos). */
export const ADEPTOS_ISOTYPE_URL = "/adeptos-isotype.png";
