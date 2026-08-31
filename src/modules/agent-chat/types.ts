export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: string;
}

export interface LandingConfigResponse {
  defaultAgentInstanceId?: number | null;
  recaptchaSiteKey?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  logoUrl?: string;
  [key: string]: unknown;
}

export interface ChatTokenResponse {
  visitorToken: string;
  agentInstanceId: number;
  expiresAt: string;
}

export interface CreateSessionResponse {
  sessionId: string;
  agentInstanceId: number;
}

export interface SendMessageResult {
  response: string;
  userMessageId: string;
  assistantMessageId: string;
  agentDisabled?: boolean;
  handoff?: boolean;
  handoffReason?: string;
}

export interface StoredVisitorAuth {
  visitorToken: string;
  agentInstanceId: number;
  expiresAt: string;
  businessUuid: string;
}
