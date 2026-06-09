"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Course } from "@/lib/cms";

export default function TecnicasPoligraficasTemplate({ course }: { course: Course }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [country, setCountry] = useState("ec");

  const {
    heroTagline,
    heroTitle,
    heroDesc,
    heroImage,
    aboutTitle,
    aboutDesc,
    svgFocusAreas,
    fichaTecnica,
    contactPhone,
    contactWhatsapp
  } = course.pageContent;

  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-start md:items-center justify-center overflow-hidden pt-32 pb-24 bg-[#700FA3]">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #700FA3 0%, #700FA3 35%, rgba(112, 15, 163, 0.9) 48%, rgba(112, 15, 163, 0.6) 60%, rgba(112, 15, 163, 0.3) 72%, rgba(112, 15, 163, 0.05) 86%, transparent 100%)",
          }}
        />

        <img
          src={heroImage || "/tecnica.webp"}
          alt={heroTitle}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-right-top z-0 opacity-40 mix-blend-overlay pointer-events-none"
        />

        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 z-10 flex justify-start items-center">
          <div className="max-w-5xl text-left">
            <Breadcrumbs />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-[#FFC107]" />
              <span
                className="text-xs sm:text-sm md:text-base"
                style={{
                  letterSpacing: "0.5px",
                  color: "#FFC107",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                {heroTagline}
              </span>
            </div>

            <h1
              className="mb-6 !text-3xl sm:!text-4xl md:!text-5xl lg:!text-[52px] font-semibold"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                margin: "0 0 28px 0",
                padding: 0,
                color: "#FFFFFF",
                textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)",
              }}
            >
              {heroTitle}
            </h1>

            <p
              className="mb-6 opacity-95 !text-sm sm:!text-base md:!text-lg font-medium whitespace-pre-wrap"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "#FFFFFF",
              }}
            >
              {heroDesc}
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-6 mb-8">
              <a
                href="#contacto"
                className="px-8 py-3 rounded transition-all hover:brightness-110 shadow-lg"
                style={{
                  WebkitTextSizeAdjust: "100%",
                  WebkitTapHighlightColor: "transparent",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  lineHeight: "1",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#5F0091",
                  backgroundColor: "#FFC107",
                  display: "inline-block",
                  textDecoration: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Solicitar información del módulo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Ejes Temáticos */}
      <section className="bg-[#fcfbfd] py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(112,15,163,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(112,15,163,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start mb-16">
            
            {/* Left Content (Title & Description) */}
            <div className="w-full lg:w-[45%] flex flex-col sticky top-32">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-[2px] bg-[#700FA3]" />
                <span
                  style={{
                    letterSpacing: "1px",
                    fontSize: "14px",
                    color: "#700FA3",
                    fontWeight: "600",
                    fontFamily: "var(--font-montserrat), sans-serif",
                  }}
                >
                  Ejes Temáticos
                </span>
              </div>
              <h2
                className="mb-6"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: "800",
                  lineHeight: "1.15",
                  color: "#48255A",
                }}
              >
                {aboutTitle}
              </h2>
              <p
                className="text-[#525252] text-[16px] md:text-[17px] leading-[28px] font-medium opacity-90"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                {aboutDesc}
              </p>
            </div>

            {/* Right Content (Cards - SVG Focus Areas) */}
            <div className="w-full lg:w-[55%] flex flex-col gap-6">
              {(svgFocusAreas || []).map((area, index) => (
                <div 
                  key={index} 
                  className="group flex flex-col sm:flex-row items-start gap-6 bg-white p-8 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgba(112,15,163,0.06)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#700FA3]/5 to-transparent rounded-bl-[100px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="shrink-0 w-16 h-16 rounded-xl bg-neutral-50 flex items-center justify-center shadow-inner group-hover:bg-[#700FA3] transition-colors duration-300">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="32" 
                      height="32" 
                      viewBox={area.iconViewBox || "0 0 84 84"}
                      className="fill-[#700FA3] group-hover:fill-white transition-colors duration-300"
                    >
                      {(area.iconPaths || []).map((path, pIdx) => (
                        <path key={pIdx} d={path} />
                      ))}
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold text-[#48255A] mb-3 group-hover:text-[#700FA3] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}
                    >
                      {area.title}
                    </h3>
                    <p className="text-[15px] text-[#525252] leading-relaxed font-light whitespace-pre-wrap" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {area.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Custom Cards Grid (e.g. Tecnicas) */}
          {course.pageContent.customCards && course.pageContent.customCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
              {course.pageContent.customCards.map((technique, idx) => {
                const anyTechnique = technique as any;
                return (
                  <div key={idx} className="flex flex-col items-start gap-4 bg-white p-5 rounded border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(112,15,163,0.04)] transition-all duration-300 h-full">
                    <div className="shrink-0">
                      {anyTechnique.icon.endsWith(".svg") || anyTechnique.icon.endsWith(".png") || anyTechnique.icon.endsWith(".webp") ? (
                        <img src={anyTechnique.icon} alt={technique.title} width={50} height={50} className="w-[50px] h-[50px] object-contain" />
                      ) : (
                        <div className="text-4xl">{anyTechnique.icon}</div>
                      )}
                    </div>
                    <div className="flex-1 w-full">
                      <h3
                        className="text-lg md:text-xl font-bold text-[#48255A] mb-4"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}
                      >
                        {technique.title}
                      </h3>
                      {anyTechnique.description && (
                         <p className="text-sm text-[#525252] leading-relaxed font-light mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                           <strong className="font-semibold text-[#48255A]">{anyTechnique.description}</strong>
                         </p>
                      )}
                      <div className="flex flex-col gap-3">
                        {(technique.items || []).map((item, itemIdx) => (
                          <p key={itemIdx} className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                            <strong className="font-semibold text-[#48255A]">{item}</strong>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Características Generales Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1000px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[#700FA3]" />
            <span
              style={{
                letterSpacing: "1px",
                fontSize: "14px",
                color: "#700FA3",
                fontWeight: "600",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Ficha Técnica
            </span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#48255A] mb-12"
            style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.2" }}
          >
            Características Generales del Curso
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {(fichaTecnica || []).map((feat, index) => {
              // Extraer icono simple del titulo (ej: "⏱️ 15 horas" -> icono "⏱️", texto "15 horas")
              const emojiRegex = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
              const emojiMatch = feat.title.match(emojiRegex);
              const icon = emojiMatch ? emojiMatch[0] : "📌";
              const titleClean = feat.title.replace(icon, "").trim();

              return (
                <div key={index} className="flex flex-col bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="text-4xl mb-3">{icon}</div>
                  <h3 className="text-lg font-bold text-[#48255A] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>
                    {titleClean}
                  </h3>
                  <p className="text-[#525252] text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FORMULARIO DE CONTACTO ── */}
      <section 
        id="contacto" 
        className="py-12 md:py-16 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(60deg, #700FA3 50%, #8A15C4 90%)",
          fontFamily: "var(--font-montserrat), sans-serif"
        }}
      >
        <div className="max-w-6xl lg:max-w-7xl xl:max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-6 flex flex-col text-left">
              <h2 className="text-3xl font-bold text-white mb-6">Contáctanos</h2>
              <div className="flex flex-col gap-5 text-white">
                <p>Teléfono: <a href={`tel:${contactPhone}`} className="text-white hover:text-[#FFC107]">{contactPhone}</a></p>
              </div>
            </div>
            <div className="lg:col-span-6 relative">
              <div className="bg-white rounded p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-neutral-100 relative overflow-hidden">
                {!formSubmitted ? (
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="flex flex-col gap-3"
                  >
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Nombre *</label>
                      <input type="text" placeholder="Tu nombre" className="px-4 py-2.5 rounded border-0 bg-neutral-50" required />
                    </div>
                    <button 
                      type="submit" 
                      className="w-full mt-4 bg-[#700FA3] hover:bg-[#5F0091] text-white font-bold py-3 px-4 rounded transition-colors"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      Enviar Mensaje
                    </button>
                  </form>
                ) : (
                  <div className="flex flex-col items-center text-center p-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-xl font-bold text-neutral-800 mb-2">¡Gracias por tu interés!</h3>
                    <p className="text-neutral-600">Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <FloatingWhatsApp phone={contactPhone || "593099371290"} />
      <Footer />
    </main>
  );
}
