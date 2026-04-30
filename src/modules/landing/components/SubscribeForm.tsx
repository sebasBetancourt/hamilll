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
  const [countryCode, setCountryCode] = useState("+57");
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
        body:    JSON.stringify({ 
          firstName, 
          email, 
          phone: `${countryCode}${phone}` 
        }),
      }).catch(() => {/* silently fail */});
    }

    setSent(true);
  }

  return (
    <div className="subscribe-form-wrapper">
      <h2 className="subscribe-form-title">{t.title}</h2>

      {sent ? (
        <p className="subscribe-done">{t.done}</p>
      ) : (
        <form className="subscribe-form" onSubmit={handleSubmit}>
          <input
            className="subscribe-form-input"
            type="text"
            placeholder={t.firstName}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            className="subscribe-form-input"
            type="email"
            placeholder={t.email}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="phone-input-group">
            <select 
              className="country-select"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              <option value="+57">🇨🇴 +57</option>
              <option value="+52">🇲🇽 +52</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+34">🇪🇸 +34</option>
              <option value="+54">🇦🇷 +54</option>
              <option value="+51">🇵🇪 +51</option>
              <option value="+56">🇨🇱 +56</option>
              <option value="+507">🇵🇦 +507</option>
              <option value="+58">🇻🇪 +58</option>
              <option value="+593">🇪🇨 +593</option>
              <option value="+506">🇨🇷 +506</option>
              <option value="+502">🇬🇹 +502</option>
              <option value="+503">🇸🇻 +503</option>
              <option value="+504">🇭🇳 +504</option>
              <option value="+505">🇳🇮 +505</option>
              <option value="+591">🇧🇴 +591</option>
              <option value="+595">🇵🇾 +595</option>
              <option value="+598">🇺🇾 +598</option>
              <option value="+55">🇧🇷 +55</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+33">🇫🇷 +33</option>
              <option value="+49">🇩🇪 +49</option>
              <option value="+39">🇮🇹 +39</option>
            </select>
            <input
              className="subscribe-form-input phone-input"
              type="tel"
              placeholder={t.phone}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <button className="subscribe-form-btn" type="submit">{t.btn}</button>
        </form>
      )}
    </div>
  );
}
