// ─── constants.ts ─────────────────────────────────────────────────────────────
// Centraliza TODOS los links, endpoints y datos de contacto de la página.
// Cambia aquí y el cambio se refleja en toda la aplicación.

// ── Información personal ───────────────────────────────────────────────────────
export const PROFILE = {
  name:   "Ryan Hamill",
  handle: "@hamilll",
  email:  "ryan@adeptos.ai",
  role: {
    es: "Empresario · Especialista en IA",
    en: "Entrepreneur · AI Specialist",
  },
  bio: {
    es: "Ayudo a empresas a escalar con IA",
    en: "I help businesses scale with AI",
  },
} as const;

// ── Redes sociales (top bar + sección de contactos) ───────────────────────────
export const SOCIAL_LINKS = {
  instagram:  "https://www.instagram.com/hamilll",
  tiktok:     "https://www.tiktok.com/@hamilll",
  x:          "https://x.com/hamilll",
  youtube:    "https://www.youtube.com/@Theryanhamill",
  whatsapp:   "https://chat.whatsapp.com/KV6tkxFAmGz20XGveIfEMb",
} as const;

// ── Links principales (tarjetas de la página) ─────────────────────────────────
export const PAGE_LINKS = {
  adeptos:    "https://adeptos.ai",
  audit:      "https://adeptos.ai/es/audit-ai/",
  zono:       "https://zono.cc/",
  community:  SOCIAL_LINKS.whatsapp,
  zonoCommunity: "https://chat.whatsapp.com/HZ32VE2fGFKJCo7ViJRZR7?mode=gi_t",
  newsletter: "https://adeptos.ai/newsletter",
  consulting: "https://adeptos.ai/consulting",
} as const;

// ── Endpoints de formularios ──────────────────────────────────────────────────
// Cuando tengas un backend o servicio de email (ej. Mailchimp, Brevo, Make),
// reemplaza los valores null con la URL del endpoint correspondiente.
export const FORM_ENDPOINTS = {
  // Formulario principal de suscripción (nombre + email + teléfono)
  subscribe:  "/api/subscribe",   // Proxy seguro hacia GHL

  // Formulario de la Auditoría de IA Gratuita (solo email)
  aiAudit:    null as string | null,   // ej. "https://adeptos.ai/api/audit"
} as const;

// ── Compañías ─────────────────
export const CLIENT_COMPANIES = [
  {
    name: "Adeptos.ai",
    logo: "/logo.png",
    desc: {
      es: "Agencia de automatización con IA líder en Latinoamérica.",
      en: "Leading AI automation agency in Latin America.",
    },
    link: PAGE_LINKS.adeptos,
    hasButton: true,
  },
  {
    name: "Zono",
    logo: "/zono.png",
    desc: {
      es: "Una comunidad de comerciantes para apoyarnos y crecer a través de la tecnología y la automatización ⚡",
      en: "A community of merchants supporting each other and growing through technology and automation ⚡",
    },
    link: PAGE_LINKS.zono,
    hasButton: true,
  },
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
