"use client";
// ─── ProfileHeader ─────────────────────────────────────────────────────────────

import Image from "next/image";
import type { ProfileData, Language } from "@/modules/landing/domain/types";
import SocialIcon from "./SocialIcon";

interface Props {
  profile: ProfileData;
  lang: Language;
}

export default function ProfileHeader({ profile, lang }: Props) {
  return (
    <div className="profile-header">
      {/* Name as Logo */}
      <h1 className="profile-name-logo">
        {profile.name.split(" ")[0]}<span>{profile.name.split(" ")[1]}</span>
      </h1>

      {/* Bio */}
      <p className="profile-bio-main">{profile.bio[lang]}</p>

      {/* Social icons */}
      <div className="socials-row">
        {profile.socials.map((s) => (
          <SocialIcon key={s.id} social={s} />
        ))}
      </div>
    </div>
  );
}
