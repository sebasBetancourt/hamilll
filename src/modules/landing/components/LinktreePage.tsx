"use client";
// ─── LinktreePage · Personal Brand × Ryan Hamill ──────────────────────────────

import { ryanHamillData } from "@/modules/landing/data/profileData";
import { useLanguage } from "@/modules/landing/application/useLanguage";
import { CLIENT_COMPANIES, PAGE_LINKS } from "@/modules/landing/data/constants";
import ProfileHeader from "./ProfileHeader";
import LinkCard from "./LinkCard";
import LanguageToggle from "./LanguageToggle";
import SubscribeForm from "./SubscribeForm";

export default function LinktreePage() {
  const { lang, toggle } = useLanguage();
  const profile = ryanHamillData;

  // Filter links into categories
  const communityLinks = profile.links.filter(l =>
    l.id === "community" || l.id === "zono-community"
  );
  
  const socialLinks = profile.links.filter(l => 
    l.id.includes("instagram") || l.id.includes("tiktok") || l.id.includes("youtube") || l.id.includes("x")
  );

  return (
    <div className="page-wrapper">
      {/* Top utility bar */}
      <header className="top-bar">
        <LanguageToggle lang={lang} onToggle={toggle} />
        
        <button 
          className="share-btn" 
          aria-label="Subscribe"
          onClick={() => {
            document.querySelector('.subscribe-form-wrapper')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{width:13,height:13}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
          </svg>
          <span className="btn-label">{lang === "es" ? "Suscribirse" : "Subscribe"}</span>
        </button>

        <button 
          className="share-btn" 
          aria-label="Share"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: "Ryan Hamill",
                url: window.location.href,
              });
            } else {
              navigator.clipboard.writeText(window.location.href);
              alert(lang === "es" ? "Enlace copiado" : "Link copied");
            }
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} style={{width:16,height:16}}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          <span className="btn-label">{lang === "es" ? "Compartir" : "Share"}</span>
        </button>
      </header>

      {/* Main container */}
      <main className="linktree-card">

        {/* 1 — Hero profile */}
        <ProfileHeader profile={profile} lang={lang} />

        {/* 2 — Audit Section (Restored & Updated) */}
        <section className="audit-cta-section">
          <a href={PAGE_LINKS.audit} target="_blank" rel="noopener noreferrer" className="audit-cta-box">
            <span className="audit-title">
              {lang === "es" ? "Auditoría de IA Gratuita" : "Free AI Audit"}
            </span>
            <p className="audit-desc">
              {lang === "es" 
                ? "Descubre cuánto revenue estás perdiendo cada mes y cómo la IA puede ayudarte a escalar."
                : "Find out how much revenue you're leaking every month and how AI can help you scale."}
            </p>
            <span className="audit-btn">
              {lang === "es" ? "Empezar Auditoría" : "Start Audit"}
            </span>
          </a>
        </section>

        {/* 3 — Companies Section (Redesigned) */}
        <section className="companies-section">
          <div className="section-header">
            <span className="section-label">
              {lang === "es" ? "Mis Compañías" : "My Companies"}
            </span>
          </div>
          {CLIENT_COMPANIES.map((company) => (
            <div className="company-card" key={company.name}>
              <div className="company-card-header">
                {"logo" in company && (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={company.logo} alt={company.name} className="company-logo" />
                )}
                <div className="company-info">
                  <h3 className="company-name">{company.name}</h3>
                  <p className="company-desc">{company.desc[lang]}</p>
                </div>
              </div>
              {company.hasButton && (
                <a 
                  href={company.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="company-btn"
                >
                  {lang === "es" ? "Visitar Sitio" : "Visit Site"}
                </a>
              )}
            </div>
          ))}
        </section>

        {/* 4 — Communities Section */}
        <section className="links-group">
          <div className="section-header">
            <span className="section-label">
              {lang === "es" ? "Comunidades" : "Communities"}
            </span>
          </div>
          <div className="links-list">
            {communityLinks.map((card, i) => (
              <LinkCard key={card.id} card={card} lang={lang} index={i} />
            ))}
          </div>
        </section>

        {/* 5 — Social Networks Section */}
        <section className="links-group">
          <div className="section-header">
            <span className="section-label">
              {lang === "es" ? "Redes" : "Socials"}
            </span>
          </div>
          <div className="links-list">
            {socialLinks.map((card, i) => (
              <LinkCard key={card.id} card={card} lang={lang} index={i} />
            ))}
          </div>
        </section>

        {/* 6 — Subscribe form */}
        <SubscribeForm lang={lang} handle={profile.handle} />

        {/* Footer */}
        <footer className="card-footer">
          <span className="card-footer-text">
            {lang === "es"
              ? "© 2026 Ryan Hamill · @hamilll"
              : "© 2026 Ryan Hamill · @hamilll"}
          </span>
        </footer>

      </main>
    </div>
  );
}
