// ─── Data Layer ───────────────────────────────────────────────────────────────
// Static profile data for Ryan Hamill's Linktree.
// Todos los links vienen de @/modules/landing/data/constants.ts

import type { ProfileData } from "@/modules/landing/domain/types";
import { PROFILE, SOCIAL_LINKS, PAGE_LINKS } from "./constants";

export const ryanHamillData: ProfileData = {
  name:       PROFILE.name,
  handle:     PROFILE.handle,
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
      id:      "newsletter",
      icon:    "newsletter",
      label:   { es: "Newsletter", en: "Newsletter" },
      sublabel:{ es: "Secretos de IA y negocios semanalmente", en: "Weekly AI and business secrets" },
      href:    PAGE_LINKS.newsletter,
      badge:   { es: "Suscribirse", en: "Subscribe" },
    },
    {
      id:      "community",
      icon:    "community",
      label:   { es: "Comunidad Adopters", en: "Adopters Community" },
      sublabel:{ es: "Grupo privado de WhatsApp · Gratis", en: "Private WhatsApp Group · Free" },
      href:    PAGE_LINKS.community,
      badge:   { es: "Unirse", en: "Join" },
    },
    {
      id:      "zono-community",
      icon:    "zono",
      label:   { es: "Comunidad Zono", en: "Zono Community" },
      sublabel:{ es: "Únete a los emprendedores que escalan con Zono", en: "Join the entrepreneurs scaling with Zono" },
      href:    PAGE_LINKS.zonoCommunity,
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
    {
      id:      "x-link",
      icon:    "x",
      label:   { es: "X (Twitter)",           en: "X (Twitter)"            },
      sublabel:{ es: "Opiniones y noticias de última hora", en: "Hot takes and breaking news" },
      href:    SOCIAL_LINKS.x,
      badge:   { es: "Seguir", en: "Follow" },
    },
  ],
};
