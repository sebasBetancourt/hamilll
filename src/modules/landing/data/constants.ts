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
    es: "Ayudo a empresas a escalar con Inteligencia Artificial",
    en: "I help businesses scale with Artificial Intelligence",
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
  audit:      "https://adeptos.ai",            // Auditoría IA Gratuita
  zono:       "https://zono.cc/",
  community:  SOCIAL_LINKS.whatsapp,                 // mismo link de la comunidad
  zonoCommunity: "https://zono.ai/community",
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
      es: "Plataforma de e-commerce impulsada por IA para escalar ventas.",
      en: "AI-powered e-commerce platform to scale sales.",
    },
    link: PAGE_LINKS.zono,
    hasButton: true,
  },
  {
    name: "Sistemas Que Escalan",
    desc: {
      es: "Consultoría estratégica para optimización de procesos.",
      en: "Strategic consulting for process optimization.",
    },
    link: "https://sistemasqueescalan.com",
    hasButton: false,
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
