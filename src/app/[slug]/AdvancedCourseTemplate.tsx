"use client";

import React, { useState } from "react";
import { useContactSubmit } from "@/hooks/useContactSubmit";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Course } from "@/lib/cms";

export default function TecnicasPoligraficasTemplate({ course }: { course: Course }) {
  const { loading, error, success, submitForm, setSuccess } = useContactSubmit(`Formulario de Curso: ${course.title}`);
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
          loading="eager"
          decoding="async"
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

      {/* ── FORMULARIO DE CONTACTO (ESTILO CURSOS AVANZADOS) ── */}
      <section
        id="contacto"
        className="py-12 md:py-16 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(60deg, #700FA3 50%, #8A15C4 90%)",
          fontFamily: "var(--font-montserrat), sans-serif"
        }}
      >
        {/* Background Decorative Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#FFC107]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl lg:max-w-7xl xl:max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">

            {/* LADO IZQUIERDO: Información Comercial */}
            <div className="lg:col-span-6 flex flex-col text-left">
              <div className="mb-4 flex justify-start">
                <img src="/FORM.webp" alt="One True Logo" loading="lazy" className="h-20 md:h-24 w-auto object-contain" />
              </div>

              <h2 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: "bold", lineHeight: "40px", color: "#ffffff", fontFamily: "var(--font-montserrat), sans-serif", marginTop: "10px", marginBottom: "20px" }}>
                Contactos
              </h2>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.155-.44.011-.928.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", fontFamily: "var(--font-montserrat), sans-serif", marginBottom: "4px" }}>Teléfono</h3>
                    <a href={`tel:${contactPhone || "0981296179"}`} style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "16px", fontWeight: "300", fontFamily: "var(--font-montserrat), sans-serif" }} className="hover:text-[#FFC107] transition-colors">
                      {contactPhone || "098 129 6179"}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", fontFamily: "var(--font-montserrat), sans-serif", marginBottom: "4px" }}>Correo</h3>
                    <a href="mailto:info@somosonetrue.com" style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "16px", fontWeight: "300", fontFamily: "var(--font-montserrat), sans-serif" }} className="hover:text-[#FFC107] transition-colors">
                      info@somosonetrue.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 mt-6 pt-4 border-t border-white/10 w-full">
                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", fontFamily: "var(--font-montserrat), sans-serif", marginBottom: "4px" }}>Síguenos:</h3>
                <div className="flex items-center gap-3">
                  {/* LinkedIn */}
                  <a href="https://www.linkedin.com/in/david-coli-fiallo-75679a198?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en LinkedIn" className="w-10 h-10 bg-white rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center text-[#700FA3] shadow-md hover:shadow-lg">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  </a>
                  {/* Facebook */}
                  <a href="https://www.facebook.com/share/1F8T24NNKE/" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Facebook" className="w-10 h-10 bg-white rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center text-[#700FA3] shadow-md hover:shadow-lg">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
                  </a>
                  {/* Instagram */}
                  <a href="https://www.instagram.com/somosonetrue?igsh=bXNmOWYwaWpsdDVh" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Instagram" className="w-10 h-10 bg-white rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center text-[#700FA3] shadow-md hover:shadow-lg">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  {/* YouTube */}
                  <a href="https://youtube.com/@somosonetrue?si=8OI3ZQ0A-4OzF_H0" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en YouTube" className="w-10 h-10 bg-white rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center text-[#700FA3] shadow-md hover:shadow-lg">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* LADO DERECHO: Tarjeta de Formulario */}
            <div className="lg:col-span-6 relative">
              <div className="bg-white rounded p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-neutral-100 relative overflow-hidden transition-all duration-500">
                {!success ? (
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      const formData = new FormData(form);
                      const prefixes: Record<string, string> = {
                        ec: "+593", co: "+57", pe: "+51", cl: "+56", ar: "+54", mx: "+52", es: "+34", us: "+1"
                      };
                      const phonePrefix = prefixes[country] || "+593";
                      const rawPhone = formData.get("telefono") as string || "";
                      const fullPhone = `${phonePrefix} ${rawPhone}`;

                      await submitForm({
                        nombre: formData.get("nombre"),
                        apellido: formData.get("apellido"),
                        email: formData.get("email"),
                        telefono: fullPhone,
                        ciudad: formData.get("ciudad"),
                        mensaje: formData.get("mensaje"),
                      });
                    }}
                    className="flex flex-col gap-3"
                  >
                    {error && (
                      <div className="p-3 bg-red-50 border border-red-200 rounded text-red-650 text-xs font-semibold">
                        ⚠️ {error}
                      </div>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Nombre *</label>
                        <input name="nombre" type="text" placeholder="Tu nombre" className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium" style={{ fontFamily: "var(--font-montserrat), sans-serif" }} required disabled={loading} />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Apellido *</label>
                        <input name="apellido" type="text" placeholder="Tu apellido" className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium" style={{ fontFamily: "var(--font-montserrat), sans-serif" }} required disabled={loading} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Correo electrónico *</label>
                      <input name="email" type="email" placeholder="correo@empresa.com" className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium" style={{ fontFamily: "var(--font-montserrat), sans-serif" }} required disabled={loading} />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Número de teléfono *</label>
                      <div className="relative flex items-center border-0 rounded bg-neutral-50 focus-within:ring-2 focus-within:ring-[#700FA3]/20 focus-within:bg-white focus-within:shadow-md transition-all overflow-hidden">
                        <div className="flex items-center gap-2 pl-3 border-r border-neutral-200/60 bg-transparent shrink-0">
                          <img src={`https://flagcdn.com/w20/${country}.png`} alt={country} className="w-5 h-auto object-contain select-none" />
                          <select value={country} onChange={(e) => setCountry(e.target.value)} className="bg-transparent border-0 py-2.5 pl-1 pr-6 text-sm font-semibold text-neutral-700 outline-none focus:ring-0 cursor-pointer appearance-none" style={{ fontFamily: "var(--font-montserrat), sans-serif", backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`, backgroundPosition: 'right 0.1rem center', backgroundSize: '1.1em 1.1em', backgroundRepeat: 'no-repeat' }} disabled={loading}>
                            <option value="ec">+593</option>
                            <option value="co">+57</option>
                            <option value="pe">+51</option>
                            <option value="cl">+56</option>
                            <option value="ar">+54</option>
                            <option value="mx">+52</option>
                            <option value="es">+34</option>
                            <option value="us">+1</option>
                          </select>
                        </div>
                        <input name="telefono" type="tel" placeholder="098 129 6179" className="flex-1 px-4 py-2.5 bg-transparent border-none text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-0 text-sm font-medium" style={{ fontFamily: "var(--font-montserrat), sans-serif" }} required disabled={loading} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Ciudad *</label>
                      <input name="ciudad" type="text" placeholder="Tu ciudad" className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium" style={{ fontFamily: "var(--font-montserrat), sans-serif" }} required disabled={loading} />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Mensaje *</label>
                      <textarea name="mensaje" placeholder="Escribe tu mensaje aquí..." rows={2} className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium resize-none" style={{ fontFamily: "var(--font-montserrat), sans-serif" }} required disabled={loading}></textarea>
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                      <p className="text-[11px] text-neutral-500 leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                        Al enviar este formulario, acepto que mis datos personales sean tratados de acuerdo con la{" "}
                        <a href="/politica-de-privacidad" className="text-[#700FA3] hover:underline font-bold" style={{ fontSize: "inherit" }}>Política de tratamiento de datos personales</a>{" "}
                        y los{" "}
                        <a href="/terminos-y-condiciones" className="text-[#700FA3] hover:underline font-bold" style={{ fontSize: "inherit" }}>términos establecidos en ella</a>.
                      </p>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="aceptar-adv" className="w-4 h-4 rounded border-neutral-300 text-[#700FA3] focus:ring-[#700FA3] cursor-pointer" required disabled={loading} />
                        <label htmlFor="aceptar-adv" className="text-xs font-bold text-neutral-700 cursor-pointer select-none" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Aceptar</label>
                      </div>
                    </div>

                    <button type="submit" disabled={loading} className="mt-2 px-8 py-3.5 bg-[#700FA3] hover:bg-[#5C0B87] text-white font-bold rounded transition-all duration-300 w-full shadow-lg shadow-[#700FA3]/25 hover:scale-[1.01] active:scale-[0.99] text-base disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {loading ? "Enviando..." : "Cotizar ahora"}
                    </button>

                    <div className="flex flex-col items-center gap-1.5 mt-5 pt-4 border-t border-neutral-100 w-full">
                      <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "14px", fontWeight: "bold", color: "#48255A" }}>O escríbenos</span>
                      <div className="elementor-button-wrapper flex justify-center w-auto mt-1">
                        <a
                          className="elementor-button elementor-button-link elementor-size-sm flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00C233] hover:bg-[#00a82c] text-white font-bold transition-all duration-300 rounded shadow-sm hover:shadow hover:scale-[1.02]"
                          href={`https://api.whatsapp.com/send?phone=593981296179&text=%C2%A1Hola!%20Quiero%20conocer%20más%20sobre%20los%20servicios%20de%20One%20True`}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "15px", fontWeight: "bold", color: "#ffffff" }}
                        >
                          <span className="elementor-button-content-wrapper flex items-center justify-center gap-2" style={{ color: "#ffffff" }}>
                            <span className="elementor-button-icon flex items-center">
                              <svg aria-hidden="true" className="e-font-icon-svg e-fab-whatsapp w-4.5 h-4.5 fill-current" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" style={{ fill: "#ffffff", color: "#ffffff" }}>
                                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                              </svg>
                            </span>
                            <span className="elementor-button-text font-bold" style={{ color: "#ffffff", fontWeight: "bold" }}>+593 98 129 6179</span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-center text-center py-10">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-extrabold text-[#48255A] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>¡Cotización Solicitada!</h3>
                    <p className="text-neutral-500 text-sm font-light max-w-sm mb-8 leading-relaxed" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Muchas gracias por ponerte en contacto con nosotros. Tu mensaje ha sido recibido con éxito. Un representante de One True se comunicará contigo lo antes posible.
                    </p>
                    <button onClick={() => setSuccess(false)} className="px-6 py-3 border-2 border-[#700FA3] text-[#700FA3] hover:bg-[#700FA3] hover:text-white font-bold rounded transition-all duration-300 text-sm cursor-pointer" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Volver al formulario
                    </button>
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
