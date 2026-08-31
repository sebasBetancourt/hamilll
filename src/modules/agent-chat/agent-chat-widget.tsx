"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { AgentChatPanel } from "./agent-chat-panel";
import { ADEPTOS_ISOTYPE_URL } from "./config";
import type { ChatLang } from "./i18n";

interface AgentChatWidgetProps {
  lang?: ChatLang;
}

export function AgentChatWidget({ lang = "es" }: AgentChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const popupId = useId();
  const popupRef = useRef<HTMLDivElement | null>(null);
  const fabRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
    }

    function onPointerDown(event: MouseEvent | TouchEvent) {
      const target = event.target as Node | null;
      if (!target) return;
      if (popupRef.current?.contains(target)) return;
      if (fabRef.current?.contains(target)) return;
      close();
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [close, open]);

  return (
    <div className="agent-chat-widget-root">
      {open ? (
        <div
          ref={popupRef}
          id={popupId}
          role="dialog"
          aria-modal="true"
          aria-label={lang === "es" ? "Chat con Adeptos" : "Chat with Adeptos"}
          className="agent-chat-popup"
        >
          <header className="agent-chat-popup-header">
            <div className="agent-chat-popup-brand">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ADEPTOS_ISOTYPE_URL}
                alt=""
                width={24}
                height={24}
                className="agent-chat-popup-logo"
                decoding="async"
              />
              <span>Adeptos</span>
            </div>
            <button
              type="button"
              className="agent-chat-popup-close"
              onClick={close}
              aria-label={lang === "es" ? "Cerrar chat" : "Close chat"}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </header>
          <div className="agent-chat-popup-body">
            <AgentChatPanel lang={lang} />
          </div>
        </div>
      ) : null}

      <button
        ref={fabRef}
        type="button"
        className={`agent-chat-fab${open ? " agent-chat-fab--open" : ""}`}
        onClick={toggle}
        aria-expanded={open}
        aria-controls={popupId}
        aria-label={lang === "es" ? "Abrir chat con Adeptos" : "Open chat with Adeptos"}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ADEPTOS_ISOTYPE_URL}
          alt=""
          width={28}
          height={28}
          className="agent-chat-fab-logo"
          decoding="async"
        />
      </button>
    </div>
  );
}
