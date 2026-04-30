// ─── Domain Layer ────────────────────────────────────────────────────────────
// Pure TypeScript types — zero framework dependencies.

export type Language = "es" | "en";

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: "instagram" | "tiktok" | "youtube" | "x" | "linkedin" | "whatsapp" | "globe";
}

export interface LinkCard {
  id: string;
  icon: string; // emoji or URL
  label: { es: string; en: string };
  sublabel?: { es: string; en: string };
  href: string;
  badge?: { es: string; en: string };
  highlight?: boolean;
}

export interface ProfileData {
  name: string;
  handle: string;
  avatarUrl?: string;
  flagEmojis: string[];
  bio: { es: string; en: string };
  stats: { posts: number; followers: string; following: number };
  socials: SocialLink[];
  links: LinkCard[];
}
