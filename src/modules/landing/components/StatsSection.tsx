"use client";
// ─── StatsSection · Adeptos en numeros ───────────────────────────────────────

import type { Language } from "@/modules/landing/domain/types";
import { ADEPTOS_STATS } from "@/modules/landing/data/constants";

interface Props { lang: Language; }

export default function StatsSection({ lang }: Props) {
  return (
    <div className="stats-section">
      <p className="stats-section-title">
        {lang === "es" ? "Impacto" : "Impact"}
      </p>
      {ADEPTOS_STATS.map((s) => (
        <div className="stat-item" key={s.number}>
          <span className="stat-number">{s.number}</span>
          <span className="stat-label">
            {lang === "es" ? s.labelEs : s.labelEn}
          </span>
        </div>
      ))}
    </div>
  );
}
