"use client";
// ─── LanguageToggle ─────────────────────────────────────────────────────────────

import type { Language } from "@/modules/landing/domain/types";

interface Props {
  lang: Language;
  onToggle: () => void;
}

export default function LanguageToggle({ lang, onToggle }: Props) {
  return (
    <button
      onClick={onToggle}
      className="lang-toggle"
      aria-label="Toggle language"
      id="lang-toggle-btn"
    >
      <span className={`lang-option ${lang === "es" ? "lang-option--active" : ""}`}>
        🇨🇴 ES
      </span>
      <span className="lang-separator">|</span>
      <span className={`lang-option ${lang === "en" ? "lang-option--active" : ""}`}>
        🇬🇧 EN
      </span>
    </button>
  );
}
