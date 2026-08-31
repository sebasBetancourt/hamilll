import { apiFetch } from "./api-client";
import { SESSION_ID_STORAGE_KEY } from "./config";
import type { CreateSessionResponse } from "./types";

function pad(n: number, width = 2): string {
  return String(n).padStart(width, "0");
}

export function createLandingSessionId(): string {
  const now = new Date();
  const stamp = [
    now.getFullYear(),
    pad(now.getMonth() + 1),
    pad(now.getDate()),
  ].join("-") +
    "-" +
    [pad(now.getHours()), pad(now.getMinutes()), pad(now.getSeconds())].join("-") +
    "-" +
    pad(now.getMilliseconds(), 3);

  const uuid =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

  return `landing-${stamp}-${uuid}`;
}

function readStoredSessionId(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(SESSION_ID_STORAGE_KEY);
}

function writeStoredSessionId(sessionId: string): void {
  sessionStorage.setItem(SESSION_ID_STORAGE_KEY, sessionId);
}

export async function ensureVisitorSession(
  visitorToken: string,
): Promise<CreateSessionResponse> {
  const existingId = readStoredSessionId();
  if (existingId?.startsWith("landing-")) {
    try {
      const reused = await apiFetch<CreateSessionResponse>("/wild/chat/session", {
        method: "POST",
        visitorToken,
        body: { sessionId: existingId },
      });
      writeStoredSessionId(reused.sessionId);
      return reused;
    } catch {
      // Fall through and create a fresh session id.
    }
  }

  const sessionId = createLandingSessionId();
  const created = await apiFetch<CreateSessionResponse>("/wild/chat/session", {
    method: "POST",
    visitorToken,
    body: { sessionId },
  });
  writeStoredSessionId(created.sessionId);
  return created;
}

export function clearVisitorSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_ID_STORAGE_KEY);
}

export async function loadVisitorSessionMessages(
  sessionId: string,
  visitorToken: string,
): Promise<Array<{ messageId?: string; role?: string; content?: string; createdAt?: string }>> {
  const data = await apiFetch<{ result?: Array<Record<string, unknown>> }>(
    `/wild/chat/session/${encodeURIComponent(sessionId)}/messages`,
    { visitorToken },
  );
  return (data.result || []) as Array<{
    messageId?: string;
    role?: string;
    content?: string;
    createdAt?: string;
  }>;
}
