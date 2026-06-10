"use client";

import React, { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import gsap from "gsap";

export default function CommunityPage() {
  const heroContentRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate left content: slide from left + fade in
      if (heroContentRef.current) {
        const children = heroContentRef.current.children;
        gsap.fromTo(
          children,
          { x: -60, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
          }
        );
      }

      // Animate benefits box: slide from right + fade in
      if (benefitsRef.current) {
        gsap.fromTo(
          benefitsRef.current,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: 0.3,
          }
        );

        // Animate each benefit card with stagger
        const cards = benefitsRef.current.querySelectorAll(".benefit-card");
        gsap.fromTo(
          cards,
          { y: 25, opacity: 0, scale: 0.92 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.4)",
            stagger: 0.08,
            delay: 0.6,
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);
  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden bg-[#700FA3] pt-32 pb-20 lg:pt-36 lg:pb-20">
        <style dangerouslySetInnerHTML={{ __html: `
          .benefit-card {
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            cursor: default;
          }
          .benefit-card:hover {
            background: rgba(255, 255, 255, 0.25) !important;
            transform: translateY(-4px) scale(1.04);
            box-shadow: 0 8px 25px rgba(255, 193, 7, 0.2);
          }
          .benefit-card:hover .benefit-icon {
            transform: scale(1.15);
          }
          .benefit-icon {
            transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}} />
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #700FA3 0%, #700FA3 35%, rgba(112, 15, 163, 0.9) 48%, rgba(112, 15, 163, 0.6) 60%, rgba(112, 15, 163, 0.3) 72%, rgba(112, 15, 163, 0.05) 86%, transparent 100%)",
          }}
        />

        <img
          src="/servicios/1.webp"
          alt="Comunidad One True"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-[75%_top] md:object-right-top z-0 opacity-40 mix-blend-overlay pointer-events-none"
        />

        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-8 xl:px-16 z-10 flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8 xl:gap-12">
          <div ref={heroContentRef} className="max-w-xl lg:max-w-[480px] xl:max-w-xl text-left flex-1 w-full">
            {/* Tagline */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.75 bg-[#FFC107]" />
              <span
                className="text-xs md:text-sm"
                style={{
                  letterSpacing: "0.5px",
                  color: "#FFC107",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Conecta con profesionales de tu área
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="text-fluid-h1 font-bold mb-5"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                lineHeight: "1.15",
                color: "#FFFFFF",
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)",
              }}
            >
              Únete a la Comunidad One True
            </h1>

            {/* Intro Paragraph */}
            <p
              className="text-sm md:text-base leading-relaxed max-w-xl mb-4"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "#FFFFFF",
                fontWeight: "400",
              }}
            >
              ONE TRUE es más que una comunidad, es el punto de encuentro de los
              profesionales que buscan dominar la ciencia de la Evaluación Forense
              de la Credibilidad y la Poligrafía.
            </p>

            {/* Call to Action Paragraphs */}
            <div className="mb-6 space-y-4">
              <p
                className="text-sm md:text-base leading-relaxed max-w-xl"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "#FFFFFF",
                  fontWeight: "400",
                }}
              >
                Si eres Evaluador Forense de la Credibilidad, Psicólogo Forense, Poligrafista, este es tu espacio para crecer, actualizarte y pertenecer a la élite que impulsa la credibilidad científica en el mundo.
              </p>

              <p
                className="text-sm md:text-base leading-relaxed max-w-xl"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "#FFFFFF",
                  fontWeight: "400",
                }}
              >
                Únete y sé parte de una comunidad que no solo enseña… redefine la forma en que entendemos la verdad.
              </p>

              <p
                className="text-lg md:text-xl font-bold"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "#FFC107",
                  fontWeight: "600",
                }}
              >
                Somos ONE TRUE: donde la ciencia y la autenticidad se encuentran.
              </p>
            </div>

            {/* CTA Button */}
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="https://www.skool.com/somos-one-true-4687/about"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 bg-[#FFC107] text-[#411A56] font-bold rounded hover:bg-[#FFD54F] transition-colors text-sm w-fit"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  textDecoration: "none",
                }}
              >
                Únete Ahora
              </a>
            </div>
          </div>

          {/* Right Column - Benefits Box */}
          <div ref={benefitsRef} className="w-full lg:w-auto flex-shrink-0 mr-0 flex justify-center lg:block">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 lg:p-5 xl:p-6 w-full max-w-md mr-0">
              <h2
                className="text-lg font-bold mb-4"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "#FFC107",
                }}
              >
                Aquí accedes a lo que pocos tienen:
              </h2>

              <div className="grid grid-cols-2 gap-3">
                {/* Card 1 - Biblioteca */}
                <div className="benefit-card bg-white/15 rounded-lg p-3 text-center">
                  <div className="benefit-icon flex justify-center mb-1.5">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                      <path d="M8 7h8M8 11h6" />
                    </svg>
                  </div>
                  <p style={{ color: "#FFFFFF", fontWeight: "500", fontSize: "11px", fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>Una biblioteca exclusiva en Psicofisiología Forense</p>
                </div>
                {/* Card 2 - Documentos */}
                <div className="benefit-card bg-white/15 rounded-lg p-3 text-center">
                  <div className="benefit-icon flex justify-center mb-1.5">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </div>
                  <p style={{ color: "#FFFFFF", fontWeight: "500", fontSize: "11px", fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>Documentos académicos en Evaluación Forense</p>
                </div>
                {/* Card 3 - Formación */}
                <div className="benefit-card bg-white/15 rounded-lg p-3 text-center">
                  <div className="benefit-icon flex justify-center mb-1.5">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 00-3-3.87" />
                      <path d="M16 3.13a4 4 0 010 7.75" />
                    </svg>
                  </div>
                  <p style={{ color: "#FFFFFF", fontWeight: "500", fontSize: "11px", fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>Formación continua con sesiones mensuales</p>
                </div>
                {/* Card 4 - Café */}
                <div className="benefit-card bg-white/15 rounded-lg p-3 text-center">
                  <div className="benefit-icon flex justify-center mb-1.5">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8h1a4 4 0 010 8h-1" />
                      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
                      <line x1="6" y1="1" x2="6" y2="4" />
                      <line x1="10" y1="1" x2="10" y2="4" />
                      <line x1="14" y1="1" x2="14" y2="4" />
                    </svg>
                  </div>
                  <p style={{ color: "#FFFFFF", fontWeight: "500", fontSize: "11px", fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>Hora del café online con miembros</p>
                </div>
                {/* Card 5 - Asesoría */}
                <div className="benefit-card bg-white/15 rounded-lg p-3 text-center">
                  <div className="benefit-icon flex justify-center mb-1.5">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                      <path d="M7 8h4M7 12h8" />
                    </svg>
                  </div>
                  <p style={{ color: "#FFFFFF", fontWeight: "500", fontSize: "11px", fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>Asesoría personalizada para casos reales</p>
                </div>
                {/* Card 6 - Red */}
                <div className="benefit-card bg-white/15 rounded-lg p-3 text-center">
                  <div className="benefit-icon flex justify-center mb-1.5">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                  </div>
                  <p style={{ color: "#FFFFFF", fontWeight: "500", fontSize: "11px", fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>Red internacional de contactos</p>
                </div>
                {/* Card 7 - Cursos en video */}
                <div className="benefit-card bg-white/15 rounded-lg p-3 text-center">
                  <div className="benefit-icon flex justify-center mb-1.5">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="23 7 16 12 23 17 23 7" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  </div>
                  <p style={{ color: "#FFFFFF", fontWeight: "500", fontSize: "11px", fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>Cursos en video a tu ritmo</p>
                </div>
                {/* Card 8 - Descuentos */}
                <div className="benefit-card bg-white/15 rounded-lg p-3 text-center">
                  <div className="benefit-icon flex justify-center mb-1.5">
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#FFC107" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z" />
                      <line x1="7" y1="7" x2="7.01" y2="7" />
                      <line x1="12" y1="17" x2="17" y2="12" />
                      <line x1="13" y1="14" x2="15" y2="12" />
                    </svg>
                  </div>
                  <p style={{ color: "#FFFFFF", fontWeight: "500", fontSize: "11px", fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>Descuentos en congreso anual ONE TRUE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
