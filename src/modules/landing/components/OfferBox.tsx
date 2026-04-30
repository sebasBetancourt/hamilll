"use client";
// ─── OfferBox · Free AI Audit — Adeptos ──────────────────────────────────────

import { useState } from "react";
import type { Language } from "@/modules/landing/domain/types";
import { FORM_ENDPOINTS } from "@/modules/landing/data/constants";

interface Props { lang: Language; }

export default function OfferBox({ lang }: Props) {
  const [email, setEmail] = useState("");
  const [sent, setSent]   = useState(false);

  const t = {
    eyebrow:     "Adeptos AI",
    label:       lang === "es" ? "Auditoria de IA Gratuita"                                 : "Free AI Audit",
    desc:        lang === "es"
      ? "Descubre exactamente cuanto revenue estas perdiendo cada mes por no tener un agente de IA. Lanzamiento, monitoreo y mejora de cada workflow desde un solo panel."
      : "Find out exactly how much revenue you're leaking every month without an AI agent. Launch, monitor, and improve every workflow from one control center.",
    placeholder: lang === "es" ? "Tu correo electronico"                                    : "Your email address",
    btn:         lang === "es" ? "Reservar Auditoria Gratis"                                : "Book Free AI Audit",
    note:        lang === "es"
      ? "Sin compromiso. Recibes un diagnostico claro de tu negocio en 48 horas."
      : "No commitment. You receive a clear business diagnosis within 48 hours.",
    done:        lang === "es"
      ? "Reserva recibida. Te contactamos en menos de 48 horas."
      : "Booking received. We'll contact you within 48 hours.",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Si hay un endpoint configurado en constants.ts, envía los datos.
    // Si no, simplemente muestra el mensaje de confirmación.
    if (FORM_ENDPOINTS.aiAudit) {
      await fetch(FORM_ENDPOINTS.aiAudit, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ email }),
      }).catch(() => {/* silently fail */});
    }

    setSent(true);
  }

  return (
    <div className="offer-box">
      <span className="offer-eyebrow">{t.eyebrow}</span>
      <p className="offer-label">{t.label}</p>
      <p className="offer-desc">{t.desc}</p>

      {sent ? (
        <p className="subscribe-done">{t.done}</p>
      ) : (
        <form className="subscribe-form" onSubmit={handleSubmit}>
          <input
            className="offer-input"
            type="email"
            placeholder={t.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="offer-cta-btn" type="submit">{t.btn}</button>
        </form>
      )}

      <p className="offer-note">{t.note}</p>
    </div>
  );
}
