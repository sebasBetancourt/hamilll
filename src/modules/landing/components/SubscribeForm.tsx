"use client";
// ─── SubscribeForm ────────────────────────────────────────────────────────────

import { useState } from "react";
import type { Language } from "@/modules/landing/domain/types";
import { FORM_ENDPOINTS } from "@/modules/landing/data/constants";

interface Props { lang: Language; handle: string; }

export default function SubscribeForm({ lang, handle }: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [sent, setSent]           = useState(false);

  const t = {
    title:     lang === "es" ? `Suscribete a ${handle}`                                       : `Subscribe to ${handle}`,
    sub:       lang === "es" ? "Recibe actualizaciones exclusivas directamente de mi."         : "Sign up to get exclusive email updates directly from me.",
    firstName: lang === "es" ? "Nombre"                                                        : "First Name",
    email:     "Email",
    phone:     lang === "es" ? "Telefono"                                                      : "Phone Number",
    btn:       lang === "es" ? "Suscribirse"                                                   : "Subscribe",
    done:      lang === "es" ? "Gracias. Te contactaremos pronto."                             : "Thanks! We'll be in touch.",
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Si hay un endpoint configurado en constants.ts, envía los datos.
    if (FORM_ENDPOINTS.subscribe) {
      await fetch(FORM_ENDPOINTS.subscribe, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ firstName, email, phone }),
      }).catch(() => {/* silently fail */});
    }

    setSent(true);
  }

  return (
    <div className="subscribe-box">
      <h2 className="subscribe-title">{t.title}</h2>
      <p className="subscribe-sub">{t.sub}</p>

      {sent ? (
        <p className="subscribe-done">{t.done}</p>
      ) : (
        <form className="subscribe-form" onSubmit={handleSubmit}>
          <input
            className="subscribe-input"
            type="text"
            placeholder={t.firstName}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="subscribe-input"
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="subscribe-input"
            type="tel"
            placeholder={t.phone}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="subscribe-btn" type="submit">{t.btn}</button>
        </form>
      )}
    </div>
  );
}
