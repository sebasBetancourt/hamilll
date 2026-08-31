import { apiFetch } from "./api-client";
import {
  getLandingBusinessUuid,
  SESSION_ID_STORAGE_KEY,
  VISITOR_TOKEN_STORAGE_KEY,
} from "./config";
import type {
  ChatTokenResponse,
  LandingConfigResponse,
  StoredVisitorAuth,
} from "./types";

function readStoredAuth(): StoredVisitorAuth | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(VISITOR_TOKEN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredVisitorAuth;
    if (!parsed?.visitorToken || !parsed.businessUuid) return null;
    if (parsed.expiresAt && new Date(parsed.expiresAt).getTime() <= Date.now()) {
      sessionStorage.removeItem(VISITOR_TOKEN_STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function writeStoredAuth(auth: StoredVisitorAuth): void {
  sessionStorage.setItem(VISITOR_TOKEN_STORAGE_KEY, JSON.stringify(auth));
}

export async function fetchLandingConfig(
  businessUuid = getLandingBusinessUuid(),
): Promise<LandingConfigResponse> {
  return apiFetch<LandingConfigResponse>(`/wild/${encodeURIComponent(businessUuid)}/landing-config`);
}

export async function issueVisitorChatToken(
  businessUuid = getLandingBusinessUuid(),
): Promise<StoredVisitorAuth> {
  const existing = readStoredAuth();
  if (existing && existing.businessUuid === businessUuid) {
    return existing;
  }
  if (existing) {
    sessionStorage.removeItem(VISITOR_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(SESSION_ID_STORAGE_KEY);
  }

  const data = await apiFetch<ChatTokenResponse>(
    `/wild/${encodeURIComponent(businessUuid)}/chat-token`,
    {
      method: "POST",
      body: {},
    },
  );

  if (!data?.visitorToken) {
    throw new Error("API did not return a visitor token");
  }

  const auth: StoredVisitorAuth = {
    visitorToken: data.visitorToken,
    agentInstanceId: data.agentInstanceId,
    expiresAt: data.expiresAt,
    businessUuid,
  };
  writeStoredAuth(auth);
  return auth;
}

export function getCachedVisitorAuth(): StoredVisitorAuth | null {
  return readStoredAuth();
}

export function clearVisitorAuth(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(VISITOR_TOKEN_STORAGE_KEY);
}
