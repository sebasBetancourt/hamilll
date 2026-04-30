"use client";
// ─── LinktreePage · Adeptos × Ryan Hamill ────────────────────────────────────

import { ryanHamillData } from "@/modules/landing/data/profileData";
import { useLanguage } from "@/modules/landing/application/useLanguage";
import { CLIENT_COMPANIES, PAGE_LINKS } from "@/modules/landing/data/constants";
import ProfileHeader from "./ProfileHeader";
import LinkCard from "./LinkCard";
import LanguageToggle from "./LanguageToggle";
import SubscribeForm from "./SubscribeForm";
import OfferBox from "./OfferBox";
import StatsSection from "./StatsSection";
import ContactsSection from "./ContactsSection";

export default function LinktreePage() {
  const { lang, toggle } = useLanguage();
  const profile = ryanHamillData;

  return (
    <div className="page-wrapper">
      {/* Ambient glow orbs */}
      <div className="bg-orb bg-orb--1" />
      <div className="bg-orb bg-orb--2" />
      <div className="bg-orb bg-orb--3" />

      {/* Top utility bar */}
      <header className="top-bar">
        <button className="subscribe-pill" aria-label="Subscribe">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{width:13,height:13}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          {lang === "es" ? "Suscribirse" : "Subscribe"}
        </button>
        <LanguageToggle lang={lang} onToggle={toggle} />
        <button className="share-btn" aria-label="Share">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{width:16,height:16}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
        </button>
      </header>

      {/* Main card */}
      <main className="linktree-card">

        {/* 1 — Hero profile (avatar + name + socials) */}
        <ProfileHeader profile={profile} lang={lang} />

        <div className="section-sep" />

        {/* 2 — Offer / Webinar Box */}
        <OfferBox lang={lang} />

        {/* Companies powered by Adeptos */}
        <div className="companies-strip">
          <span className="companies-strip-label">
            {lang === "es" ? "Empresas que confian en Adeptos" : "Companies powered by Adeptos"}
          </span>
          <div className="companies-strip-list">
            {CLIENT_COMPANIES.map((c) => (
              <span className="company-chip" key={c}>{c}</span>
            ))}
          </div>
        </div>

        {/* 3 — How can I help? (link cards) */}
        <p className="links-section-title">
          {lang === "es" ? "Como puedo ayudarte" : "How can I help you"}
        </p>

        <div className="links-list">
          {profile.links.map((card, i) => (
            <LinkCard key={card.id} card={card} lang={lang} index={i} />
          ))}
        </div>

        <div className="section-sep" style={{ margin: "6px 14px" }} />

        {/* 4 — Stats "Sobre mí" */}
        <StatsSection lang={lang} />

        {/* 5 — Contacts */}
        <ContactsSection lang={lang} />

        {/* ZONO callout */}
        <div className="zono-callout">
          <div className="zono-callout-text">
            <span className="zono-callout-brand">ZONO</span>
            <span className="zono-callout-tagline">
              {lang === "es"
                ? "Duplica tus ventas en 90 dias. Tu tienda virtual + automatizacion de ventas en la nube."
                : "Double your sales in 90 days. Your virtual store + cloud sales automation."}
            </span>
          </div>
          <a
            href={PAGE_LINKS.zono}
            target="_blank"
            rel="noopener noreferrer"
            className="zono-callout-btn"
          >
            {lang === "es" ? "Empezar" : "Start"}
          </a>
        </div>

        {/* 6 — Subscribe form */}
        <SubscribeForm lang={lang} handle={profile.handle} />

        {/* Footer */}
        <footer className="card-footer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Adeptos" className="card-footer-logo" />
          <span className="card-footer-text">
            {lang === "es"
              ? "Sígueme en las redes · @hamilll"
              : "Follow me on socials · @hamilll"}
          </span>
        </footer>

      </main>
    </div>
  );
}
