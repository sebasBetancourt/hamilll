import { apiFetch } from "./api-client";
import type { SendMessageResult } from "./types";

interface ApiSendEnvelope {
  result?: SendMessageResult;
  error?: string;
}

export async function sendVisitorMessage(params: {
  sessionId: string;
  message: string;
  visitorToken: string;
}): Promise<SendMessageResult> {
  const data = await apiFetch<ApiSendEnvelope>("/api/v1/agent/conversation/send", {
    method: "POST",
    visitorToken: params.visitorToken,
    body: {
      sessionId: params.sessionId,
      message: params.message,
    },
  });

  if (!data?.result) {
    throw new Error(data?.error || "Invalid response from conversation/send");
  }
  return data.result;
}
