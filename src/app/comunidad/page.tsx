"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function CommunityPage() {
  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#700FA3]">
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
          className="absolute inset-0 w-full h-full object-cover object-right-top z-0 opacity-40 mix-blend-overlay pointer-events-none"
        />

        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 z-10 flex justify-between items-center gap-8">
          <div className="max-w-3xl text-left flex-1">
            {/* Tagline */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-0.75 bg-[#FFC107]" />
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
              className="text-3xl sm:text-6xl lg:text-7xl font-bold mb-2"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                lineHeight: "1.1",
                color: "#FFFFFF",
                textShadow:
                  "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)",
              }}
            >
              Únete a la Comunidad One True
            </h1>

            {/* Intro Paragraph */}
            <p
              className="text-base md:text-lg leading-relaxed max-w-3xl"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "#FFFFFF",
                fontWeight: "500",
              }}
            >
              ONE TRUE es más que una comunidad, es el punto de encuentro de los
              profesionales que buscan dominar la ciencia de la Evaluación Forense
              de la Credibilidad y la Poligrafía.
            </p>

            {/* Call to Action Paragraphs */}
            <div className="mb-8 space-y-6">
              <p
                className="text-base md:text-lg leading-relaxed"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "#FFFFFF",
                  fontWeight: "500",
                }}
              >
                Si eres Evaluador Forense de la Credibilidad, Psicólogo Forense, Poligrafista, este es tu espacio para crecer, actualizarte y pertenecer a la élite que impulsa la credibilidad científica en el mundo.
              </p>

              <p
                className="text-base md:text-lg leading-relaxed"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "#FFFFFF",
                  fontWeight: "500",
                }}
              >
                Únete y sé parte de una comunidad que no solo enseña… redefine la forma en que entendemos la verdad.
              </p>

              <p
                className="text-xl md:text-2xl font-bold"
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

            {/* Footer Text */}
            <div className="flex items-center gap-2 mt-12">
              <div className="text-3xl">❤️</div>
              <span
                style={{
                  color: "#FFFFFF",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "16px",
                }}
              >
                Hecho con amor por todos los Globalworkers
              </span>
            </div>
          </div>

          {/* Right Column - Benefits Box */}
          <div className="hidden lg:block flex-shrink-0 mr-0">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 max-w-sm mr-0">
              <h2
                className="text-lg font-bold mb-4"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  color: "#FFC107",
                }}
              >
                Aquí accedes a lo que pocos tienen:
              </h2>

              <ul
                className="space-y-2 text-xs"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  listStyleType: "none",
                  padding: 0,
                  lineHeight: "1.4",
                }}
              >
                <li className="flex items-start gap-2">
                  <span style={{ color: "#FFC107", fontSize: "16px", fontWeight: "bold", flexShrink: 0 }}>•</span>
                  <span style={{ color: "#FFFFFF", fontWeight: "500" }}>Una biblioteca exclusiva en Psicofisiología Forense-Poligrafía</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#FFC107", fontSize: "16px", fontWeight: "bold", flexShrink: 0 }}>•</span>
                  <span style={{ color: "#FFFFFF", fontWeight: "500" }}>Documentos académicos en Evaluación Forense de la Credibilidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#FFC107", fontSize: "16px", fontWeight: "bold", flexShrink: 0 }}>•</span>
                  <span style={{ color: "#FFFFFF", fontWeight: "500" }}>Formación continua con sesiones mensuales con expertos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#FFC107", fontSize: "16px", fontWeight: "bold", flexShrink: 0 }}>•</span>
                  <span style={{ color: "#FFFFFF", fontWeight: "500" }}>Hora del café online con miembros de la comunidad</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#FFC107", fontSize: "16px", fontWeight: "bold", flexShrink: 0 }}>•</span>
                  <span style={{ color: "#FFFFFF", fontWeight: "500" }}>Asesoría personalizada para resolver casos reales</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#FFC107", fontSize: "16px", fontWeight: "bold", flexShrink: 0 }}>•</span>
                  <span style={{ color: "#FFFFFF", fontWeight: "500" }}>Red internacional de contactos que comparten conocimiento y experiencias auténticas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#FFC107", fontSize: "16px", fontWeight: "bold", flexShrink: 0 }}>•</span>
                  <span style={{ color: "#FFFFFF", fontWeight: "500" }}>Cursos en video que te permiten aprender a tu ritmo</span>
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "#FFC107", fontSize: "16px", fontWeight: "bold", flexShrink: 0 }}>•</span>
                  <span style={{ color: "#FFFFFF", fontWeight: "500" }}>Descuentos especiales en el congreso anual de la comunidad ONE TRUE</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
