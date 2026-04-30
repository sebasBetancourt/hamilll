// ─── constants.ts ─────────────────────────────────────────────────────────────
// Centraliza TODOS los links, endpoints y datos de contacto de la página.
// Cambia aquí y el cambio se refleja en toda la aplicación.

// ── Información personal ───────────────────────────────────────────────────────
export const PROFILE = {
  name:   "Ryan Hamill",
  handle: "@hamilll",
  email:  "ryan@adeptos.ai",
  role: {
    es: "Founder · CEO · Adeptos AI",
    en: "Founder · CEO · Adeptos AI",
  },
  bio: {
    es: "Founder · Ayudo a empresas a escalar con Inteligencia Artificial",
    en: "Founder · I help businesses scale with Artificial Intelligence",
  },
} as const;

// ── Redes sociales (top bar + sección de contactos) ───────────────────────────
export const SOCIAL_LINKS = {
  instagram:  "https://www.instagram.com/hamilll",
  tiktok:     "https://www.tiktok.com/@hamilll",
  x:          "https://x.com/hamilll",
  youtube:    "https://www.youtube.com/@hamilll",
  whatsapp:   "https://chat.whatsapp.com/adeptos",   // comunidad Adopters
} as const;

// ── Links principales (tarjetas de la página) ─────────────────────────────────
export const PAGE_LINKS = {
  adeptos:    "https://adeptos.ai",
  audit:      "https://adeptos.ai/audit",            // Auditoría IA Gratuita
  zono:       "https://zono.ai",
  community:  SOCIAL_LINKS.whatsapp,                 // mismo link de la comunidad
  newsletter: "https://adeptos.ai/newsletter",
  consulting: "https://adeptos.ai/consulting",
} as const;

// ── Endpoints de formularios ──────────────────────────────────────────────────
// Cuando tengas un backend o servicio de email (ej. Mailchimp, Brevo, Make),
// reemplaza los valores null con la URL del endpoint correspondiente.
export const FORM_ENDPOINTS = {
  // Formulario principal de suscripción (nombre + email + teléfono)
  subscribe:  null as string | null,   // ej. "https://hook.eu1.make.com/xyz"

  // Formulario de la Auditoría de IA Gratuita (solo email)
  aiAudit:    null as string | null,   // ej. "https://adeptos.ai/api/audit"
} as const;

// ── Empresas cliente que aparecen en el strip de credibilidad ─────────────────
export const CLIENT_COMPANIES = [
  "Valvetronic",
  "216 Maintenance",
  "FR Hotel",
  "Proyectamos",
  "ZONO",
] as const;

// ── Estadísticas de Adeptos (sección "Adeptos en números") ───────────────────
export const ADEPTOS_STATS = [
  {
    number: "97.4%",
    labelEs: "tasa de ejecucion exitosa en flujos de IA",
    labelEn: "successful AI workflow execution rate",
  },
  {
    number: "118+",
    labelEs: "automatizaciones activas en produccion",
    labelEn: "automations running in production",
  },
  {
    number: "18s",
    labelEs: "tiempo promedio de respuesta del agente",
    labelEn: "average AI agent response time",
  },
  {
    number: "$8,500",
    labelEs: "en revenue perdido mensualmente sin un agente de IA",
    labelEn: "average monthly revenue leak without an AI agent",
  },
] as const;
