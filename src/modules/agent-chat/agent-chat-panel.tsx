"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { ADEPTOS_ISOTYPE_URL } from "./config";
import { getChatDict, type ChatLang } from "./i18n";
import { sendVisitorMessage } from "./send-message";
import {
  clearVisitorSession,
  ensureVisitorSession,
  loadVisitorSessionMessages,
} from "./session";
import type { ChatMessage } from "./types";
import { clearVisitorAuth, issueVisitorChatToken } from "./visitor-auth";

const TEXTAREA_MAX_PX = 120;

interface AgentChatPanelProps {
  lang?: ChatLang;
}

function mapHistory(
  rows: Array<{ messageId?: string; role?: string; content?: string; createdAt?: string }>,
): ChatMessage[] {
  return rows
    .map((row, index) => {
      const roleRaw = (row.role || "").toLowerCase();
      const role =
        roleRaw === "user" || roleRaw === "human"
          ? "user"
          : roleRaw === "system"
            ? "system"
            : "assistant";
      const content = typeof row.content === "string" ? row.content.trim() : "";
      if (!content) return null;
      return {
        id: row.messageId || `hist-${index}`,
        role,
        content,
        createdAt: row.createdAt || new Date().toISOString(),
      } satisfies ChatMessage;
    })
    .filter(Boolean) as ChatMessage[];
}

export function AgentChatPanel({ lang = "es" }: AgentChatPanelProps) {
  const dict = getChatDict(lang);
  const [ready, setReady] = useState(false);
  const [bootError, setBootError] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);

  const visitorTokenRef = useRef<string | null>(null);
  const sessionIdRef = useRef<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const stickToBottomRef = useRef(true);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const sendingRef = useRef(false);
  const queuedTextRef = useRef<string | null>(null);

  const suggestions = dict.suggestions.filter(Boolean);
  const isEmpty = messages.length === 0 && !sending;

  const resizeTextarea = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, TEXTAREA_MAX_PX)}px`;
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const bottom = bottomRef.current;
    if (!bottom) return;
    bottom.scrollIntoView({ behavior, block: "end" });
  }, []);

  const handleListScroll = useCallback(() => {
    const el = listRef.current;
    if (!el) return;
    const distance = el.scrollHeight - el.scrollTop - el.clientHeight;
    stickToBottomRef.current = distance < 72;
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function connectOnce(): Promise<boolean> {
      const auth = await issueVisitorChatToken();
      if (cancelled) return false;
      visitorTokenRef.current = auth.visitorToken;

      const session = await ensureVisitorSession(auth.visitorToken);
      if (cancelled) return false;
      sessionIdRef.current = session.sessionId;

      try {
        const history = await loadVisitorSessionMessages(
          session.sessionId,
          auth.visitorToken,
        );
        if (!cancelled) setMessages(mapHistory(history));
      } catch {
        // History is optional on first load.
      }

      if (!cancelled) setReady(true);
      return true;
    }

    async function boot() {
      setBootError(null);
      const delays = [0, 800, 1600, 3200, 5000];
      for (let i = 0; i < delays.length; i += 1) {
        if (cancelled) return;
        if (delays[i] > 0) {
          await new Promise((resolve) => setTimeout(resolve, delays[i]));
        }
        try {
          await connectOnce();
          return;
        } catch {
          clearVisitorAuth();
          clearVisitorSession();
          visitorTokenRef.current = null;
          sessionIdRef.current = null;
        }
      }
      if (!cancelled) setBootError(dict.errorConfig);
    }

    void boot();
    return () => {
      cancelled = true;
    };
  }, [dict.errorConfig]);

  useEffect(() => {
    if (!stickToBottomRef.current) return;
    scrollToBottom(messages.length <= 1 ? "auto" : "smooth");
  }, [messages, sending, scrollToBottom]);

  useEffect(() => {
    resizeTextarea();
  }, [input, resizeTextarea]);

  const submitText = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || sendingRef.current) return;

      if (!ready) {
        queuedTextRef.current = text;
        return;
      }

      const visitorToken = visitorTokenRef.current;
      const sessionId = sessionIdRef.current;
      if (!visitorToken || !sessionId) {
        queuedTextRef.current = text;
        return;
      }

      const optimistic: ChatMessage = {
        id: `local-${Date.now()}`,
        role: "user",
        content: text,
        createdAt: new Date().toISOString(),
      };

      sendingRef.current = true;
      setInput("");
      setSending(true);
      stickToBottomRef.current = true;
      setMessages((prev) => [...prev, optimistic]);
      requestAnimationFrame(() => {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.focus();
      });

      try {
        const result = await sendVisitorMessage({
          sessionId,
          message: text,
          visitorToken,
        });

        const assistantText =
          (result.response || "").trim() ||
          (result.handoff || result.agentDisabled ? dict.handoffNote : "");

        setMessages((prev) => [
          ...prev.filter((m) => m.id !== optimistic.id),
          {
            id: result.userMessageId || optimistic.id,
            role: "user",
            content: text,
            createdAt: optimistic.createdAt,
          },
          {
            id: result.assistantMessageId || `assistant-${Date.now()}`,
            role: "assistant",
            content: assistantText || dict.handoffNote,
            createdAt: new Date().toISOString(),
          },
        ]);
      } catch {
        setMessages((prev) => prev.filter((m) => m.id !== optimistic.id));
        setInput(text);
      } finally {
        sendingRef.current = false;
        setSending(false);
        requestAnimationFrame(() => {
          textareaRef.current?.focus();
        });
      }
    },
    [dict.handoffNote, ready],
  );

  useEffect(() => {
    if (!ready || sendingRef.current) return;
    const queued = queuedTextRef.current;
    if (!queued) return;
    queuedTextRef.current = null;
    void submitText(queued);
  }, [ready, submitText]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await submitText(input);
  }

  return (
    <div className="agent-chat-panel">
      <div
        ref={listRef}
        onScroll={handleListScroll}
        className="agent-chat-scroll"
      >
        {isEmpty ? (
          <div className="agent-chat-empty">
            <img
              src={ADEPTOS_ISOTYPE_URL}
              alt=""
              width={40}
              height={40}
              className="agent-chat-empty-logo"
              decoding="async"
            />
            <p className="agent-chat-empty-hint">{dict.emptyHint}</p>
            {!ready && !bootError ? (
              <p className="agent-chat-connecting" role="status">
                {dict.connecting}
              </p>
            ) : null}
            {bootError ? (
              <p className="agent-chat-boot-error" role="alert">
                {bootError}
              </p>
            ) : null}
            {suggestions.length > 0 ? (
              <div className="agent-chat-suggestions">
                {suggestions.map((chip) => (
                  <button
                    key={chip}
                    type="button"
                    disabled={sending || !ready}
                    onClick={() => void submitText(chip)}
                    className="agent-chat-suggestion"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        ) : (
          <div className="agent-chat-messages">
            {messages.map((message) => {
              const isUser = message.role === "user";
              return (
                <div
                  key={message.id}
                  className={`agent-chat-row ${isUser ? "agent-chat-row--user" : "agent-chat-row--assistant"}`}
                >
                  <div
                    className={`agent-chat-bubble ${isUser ? "agent-chat-bubble--user" : "agent-chat-bubble--assistant"}`}
                  >
                    {message.content}
                  </div>
                </div>
              );
            })}

            {sending ? (
              <div className="agent-chat-row agent-chat-row--assistant" role="status" aria-label={dict.connecting}>
                <span className="agent-chat-typing">
                  <span className="agent-chat-typing-dot" />
                  <span className="agent-chat-typing-dot" />
                  <span className="agent-chat-typing-dot" />
                </span>
              </div>
            ) : null}
          </div>
        )}
        <div ref={bottomRef} className="agent-chat-bottom-anchor" aria-hidden />
      </div>

      <form onSubmit={handleSubmit} className="agent-chat-form">
        <div className="agent-chat-input-shell">
          <label className="sr-only" htmlFor="agent-chat-input">
            {dict.placeholder}
          </label>
          <textarea
            ref={textareaRef}
            id="agent-chat-input"
            rows={1}
            value={input}
            disabled={sending}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (sending) return;
                void handleSubmit(e);
              }
            }}
            placeholder={dict.placeholder}
            spellCheck
            lang={lang}
            autoCorrect="on"
            autoCapitalize="sentences"
            className="agent-chat-textarea"
          />
          <button
            type="submit"
            disabled={sending || !input.trim() || !ready}
            aria-label={dict.send}
            className="agent-chat-send"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}
