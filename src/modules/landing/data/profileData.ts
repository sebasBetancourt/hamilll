// ─── Data Layer ───────────────────────────────────────────────────────────────
// Static profile data for Ryan Hamill's Linktree.
// Todos los links vienen de @/modules/landing/data/constants.ts

import type { ProfileData } from "@/modules/landing/domain/types";
import { PROFILE, SOCIAL_LINKS, PAGE_LINKS } from "./constants";

export const ryanHamillData: ProfileData = {
  name:       PROFILE.name,
  handle:     PROFILE.handle,
  avatarUrl:  "/ryan.JPG",
  flagEmojis: ["GB", "CO"],
  bio:        PROFILE.bio,
  stats: {
    posts:     342,
    followers: "4,407",
    following: 1040,
  },
  socials: [
    { id: "tiktok",    label: "TikTok",    href: SOCIAL_LINKS.tiktok,    icon: "tiktok"    },
    { id: "instagram", label: "Instagram", href: SOCIAL_LINKS.instagram, icon: "instagram" },
    { id: "x",         label: "X",         href: SOCIAL_LINKS.x,         icon: "x"         },
    { id: "youtube",   label: "YouTube",   href: SOCIAL_LINKS.youtube,   icon: "youtube"   },
  ],
  links: [
    {
      id:      "adeptos",
      icon:    "adeptos",
      label:   { es: "Adeptos AI",          en: "Adeptos AI"           },
      sublabel:{ es: "Automatiza ventas, soporte y operaciones con IA", en: "Operate every AI agent from one control center" },
      href:    PAGE_LINKS.adeptos,
      badge:   { es: "Visitar", en: "Visit" },
      highlight: true,
    },
    {
      id:      "audit",
      icon:    "audit",
      label:   { es: "Auditoria de IA Gratuita", en: "Free AI Audit"  },
      sublabel:{ es: "Descubre cuanto revenue estas perdiendo cada mes", en: "Find out how much revenue you're leaking every month" },
      href:    PAGE_LINKS.audit,
      badge:   { es: "Reservar", en: "Book" },
    },
    {
      id:      "zono",
      icon:    "zono",
      label:   { es: "ZONO",                en: "ZONO"                 },
      sublabel:{ es: "Tienda virtual + automatizacion de ventas en la nube", en: "Virtual store + cloud sales automation platform" },
      href:    PAGE_LINKS.zono,
      badge:   { es: "Ver", en: "View" },
    },
    {
      id:      "community",
      icon:    "community",
      label:   { es: "Comunidad Adeptos Adopters", en: "Adeptos Adopters Community" },
      sublabel:{ es: "Grupo privado de WhatsApp · Gratis", en: "Private WhatsApp Group · Free" },
      href:    PAGE_LINKS.community,
      badge:   { es: "Unirse", en: "Join" },
    },
    {
      id:      "instagram-link",
      icon:    "instagram",
      label:   { es: "Instagram",           en: "Instagram"            },
      sublabel:{ es: "Contenido diario sobre IA y negocios", en: "Daily content on AI and business" },
      href:    SOCIAL_LINKS.instagram,
      badge:   { es: "Seguir", en: "Follow" },
    },
    {
      id:      "tiktok-link",
      icon:    "tiktok",
      label:   { es: "TikTok",              en: "TikTok"               },
      sublabel:{ es: "Videos cortos sobre automatizacion con IA", en: "Short videos on AI automation" },
      href:    SOCIAL_LINKS.tiktok,
      badge:   { es: "Ver", en: "Watch" },
    },
    {
      id:      "youtube-link",
      icon:    "youtube",
      label:   { es: "YouTube",             en: "YouTube"              },
      sublabel:{ es: "Casos de uso reales y tutoriales de IA", en: "Real use cases and AI tutorials" },
      href:    SOCIAL_LINKS.youtube,
      badge:   { es: "Suscribirse", en: "Subscribe" },
    },
  ],
};
