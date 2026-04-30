"use client";
// ─── Application Layer ────────────────────────────────────────────────────────
// Coordinates state between data and components.

import { useState } from "react";
import type { Language } from "@/modules/landing/domain/types";

export function useLanguage() {
  const [lang, setLang] = useState<Language>("es");

  const toggle = () => setLang((prev) => (prev === "es" ? "en" : "es"));

  return { lang, toggle };
}
