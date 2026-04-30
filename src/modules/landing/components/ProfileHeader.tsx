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
      {/* Circular avatar with lime green ring */}
      <div className="avatar-wrapper">
        <div className="avatar-ring">
          <div className="avatar-img-wrap">
            <Image
              src="/ryan.JPG"
              alt={profile.name}
              width={110}
              height={110}
              style={{
                objectFit: "cover",
                objectPosition: "center center",
                transform: "rotate(-90deg)",
                width: "100%",
                height: "100%",
              }}
              priority
            />
          </div>
        </div>
      </div>

      {/* Role + Name */}
      <p className="profile-role">
        {lang === "es" ? "Founder · CEO · Adeptos AI" : "Founder · CEO · Adeptos AI"}
      </p>
      <h1 className="profile-name">{profile.name}</h1>

      {/* Bio */}
      <p className="profile-bio">{profile.bio[lang]}</p>

      {/* Social icons */}
      <div className="socials-row">
        {profile.socials.map((s) => (
          <SocialIcon key={s.id} social={s} />
        ))}
      </div>
    </div>
  );
}
