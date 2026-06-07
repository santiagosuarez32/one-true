"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { Course } from "@/lib/cms";
import { FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";

export default function CoursePageTemplate({ course }: { course: Course }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [country, setCountry] = useState("ec");

  const { pageContent } = course;

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
          src={pageContent.heroImage || "/pruebas-poligrafo/primer.webp"}
          alt={course.title}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-right-top z-0 opacity-40 mix-blend-overlay pointer-events-none"
        />

        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 z-10 flex justify-start items-center">
          <div className="max-w-5xl text-left">
            <Breadcrumbs />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-[#FFC107]" />
              <span
                className="text-xs sm:text-sm md:text-base text-[#FFC107] font-semibold"
                style={{
                  letterSpacing: "0.5px",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                {pageContent.heroTagline}
              </span>
            </div>

            <h1
              className="mb-6 !text-3xl sm:!text-4xl md:!text-5xl lg:!text-[52px] font-semibold leading-tight text-white"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                margin: "0 0 28px 0",
                padding: 0,
                textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)",
              }}
            >
              {pageContent.heroTitle.split(":")[0]}: <strong style={{ fontWeight: "800", textDecoration: "underline", textDecorationColor: "#FFC107", textUnderlineOffset: "6px" }}>{pageContent.heroTitle.split(":")[1] || course.title}</strong>
            </h1>

            <p
              className="mb-6 opacity-95 !text-sm sm:!text-base md:!text-lg font-medium text-white"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                lineHeight: "30px",
              }}
            >
              {pageContent.heroDesc}
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-6 mb-8">
              <a
                href="#contacto"
                className="px-8 py-3 rounded transition-all hover:brightness-110 shadow-lg text-[14px] font-semibold text-[#5F0091] bg-[#FFC107] inline-block text-center cursor-pointer no-underline border-none"
                style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1" }}
              >
                Solicitar información del módulo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Ejes Temáticos */}
      <section className="bg-white py-20">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-col gap-16">
            <div className="flex flex-col gap-12 items-start">
              <div className="w-full max-w-4xl flex flex-col text-left">
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
                  className="mb-6 text-[#48255A]"
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "clamp(24px, 5vw, 36px)",
                    fontWeight: "700",
                    lineHeight: "1.2",
                  }}
                >
                  {pageContent.aboutTitle || "Ejes Temáticos:"}
                </h2>

                <p
                  className="text-[#525252] text-[15px] leading-[26px] font-light"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {pageContent.aboutDesc || "Profundice en los estándares, principios y procesos metodológicos que sostienen esta especialización técnica."}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-8">
              {pageContent.focusAreas.map((area, idx) => (
                <div key={idx} className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 bg-white p-8 lg:p-10 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(112,15,163,0.04)] transition-all duration-300">
                  <div className="shrink-0 w-[70px] h-[70px] rounded-full bg-[#700FA3]/10 flex items-center justify-center text-[#700FA3]">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3
                      className="text-lg md:text-xl font-bold text-[#48255A] mb-4"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3", marginBottom: "14px" }}
                    >
                      {area.title}
                    </h3>
                    <p className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {area.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Características Generales Section */}
      <section className="bg-white py-16 md:py-24 border-t border-neutral-100">
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
            {pageContent.fichaTecnica.map((item, idx) => (
              <div key={idx} className="flex flex-col bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="text-4xl mb-3">
                  {item.title.startsWith("⏱️") ? "⏱️" : item.title.startsWith("📚") ? "📚" : item.title.startsWith("📄") ? "📄" : item.title.startsWith("❓") ? "❓" : item.title.startsWith("📺") ? "📺" : item.title.startsWith("✅") ? "✅" : item.title.startsWith("🔐") ? "🔐" : "🎓"}
                </div>
                <h3 className="text-lg font-bold text-[#48255A] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>
                  {item.title.replace(/^[^\s]+\s/, "")}
                </h3>
                <p className="text-[#525252] text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulario de Contacto */}
      <section
        id="contacto"
        className="py-12 md:py-16 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(60deg, #700FA3 50%, #8A15C4 90%)",
          fontFamily: "var(--font-montserrat), sans-serif",
        }}
      >
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#FFC107]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl lg:max-w-7xl xl:max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <div className="lg:col-span-6 flex flex-col text-left">
              <div className="mb-4 flex justify-start">
                <img src="/FORM.webp" alt="One True Logo" loading="lazy" className="h-20 md:h-24 w-auto object-contain" />
              </div>

              <h2
                style={{
                  fontSize: "clamp(24px, 5vw, 36px)",
                  fontWeight: "bold",
                  lineHeight: "40px",
                  color: "#ffffff",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  marginTop: "10px",
                  marginBottom: "20px",
                }}
              >
                Contactos
              </h2>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.155-.44.011-.928.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", fontFamily: "var(--font-montserrat), sans-serif", marginBottom: "4px" }}>
                      Teléfono
                    </h3>
                    <a href={`tel:${pageContent.contactPhone}`} style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "16px", fontWeight: "300", fontFamily: "var(--font-montserrat), sans-serif" }} className="hover:text-[#FFC107] transition-colors">
                      {pageContent.contactPhone === "0981296179" ? "098 129 6179" : pageContent.contactPhone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75m3-3h.75m-.75 3h.75m-6 3h.75m3 0h.75m3 0h.75" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", fontFamily: "var(--font-montserrat), sans-serif", marginBottom: "4px" }}>
                      Agencia Quito
                    </h3>
                    <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "15px", fontWeight: "300", fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.4" }}>
                      Av. Pérez Guerrero OE3-124 y San Gregorio, Instituto de Diagnóstico Médico, tercer piso, oficina #303, Quito-Ecuador.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", fontFamily: "var(--font-montserrat), sans-serif", marginBottom: "4px" }}>
                      Correo
                    </h3>
                    <a href="mailto:info@somosonetrue.com" style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "16px", fontWeight: "300", fontFamily: "var(--font-montserrat), sans-serif" }} className="hover:text-[#FFC107] transition-colors">
                      info@somosonetrue.com
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start gap-3 mt-6 pt-4 border-t border-white/10 w-full">
                <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", fontFamily: "var(--font-montserrat), sans-serif", marginBottom: "4px" }}>
                  Síguenos:
                </h3>
                <div className="flex items-center gap-3">
                  <a href="https://www.facebook.com/share/1F8T24NNKE/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#700FA3] shadow-md hover:scale-110 transition-transform">
                    <FaFacebook className="w-5 h-5" />
                  </a>
                  <a href="https://www.instagram.com/somosonetrue?igsh=bXNmOWYwaWpsdDVh" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#700FA3] shadow-md hover:scale-110 transition-transform">
                    <FaInstagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="bg-white rounded p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-neutral-100 relative overflow-hidden transition-all duration-500">
                {!formSubmitted ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setFormSubmitted(true);
                    }}
                    className="flex flex-col gap-3"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Nombre *</label>
                        <input type="text" placeholder="Tu nombre" className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white text-sm font-medium" required />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Apellido *</label>
                        <input type="text" placeholder="Tu apellido" className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white text-sm font-medium" required />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Correo electrónico *</label>
                      <input type="email" placeholder="correo@empresa.com" className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white text-sm font-medium" required />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Número de teléfono *</label>
                      <div className="relative flex items-center border-0 rounded bg-neutral-50 overflow-hidden">
                        <div className="flex items-center gap-2 pl-3 border-r border-neutral-200/60 bg-transparent shrink-0">
                          <img src={`https://flagcdn.com/w20/${country}.png`} alt={country} className="w-5 h-auto object-contain select-none" />
                          <select
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="bg-transparent border-0 py-2.5 pl-1 pr-6 text-sm font-semibold text-neutral-700 outline-none cursor-pointer appearance-none"
                            style={{
                              backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                              backgroundPosition: "right 0.1rem center",
                              backgroundSize: "1.1em 1.1em",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <option value="ec">+593</option>
                            <option value="co">+57</option>
                            <option value="pe">+51</option>
                            <option value="cl">+56</option>
                            <option value="us">+1</option>
                          </select>
                        </div>
                        <input type="tel" placeholder="099 371 2790" className="flex-1 px-4 py-2.5 bg-transparent border-none text-neutral-800 focus:outline-none text-sm font-medium" required />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Ciudad *</label>
                      <input type="text" placeholder="Tu ciudad" className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white text-sm font-medium" required />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Mensaje *</label>
                      <textarea placeholder="Indíquenos qué módulo avanzado le interesa..." rows={2} className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white text-sm font-medium resize-none" required />
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                      <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
                        Al enviar este formulario, acepto que mis datos personales sean tratados de acuerdo con la política de tratamiento de datos personales.
                      </p>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="aceptar-check" className="w-4 h-4 rounded border-neutral-300 text-[#700FA3] cursor-pointer" required />
                        <label htmlFor="aceptar-check" className="text-xs font-bold text-neutral-700 cursor-pointer select-none">
                          Aceptar
                        </label>
                      </div>
                    </div>

                    <button type="submit" className="mt-2 px-8 py-3.5 bg-[#700FA3] hover:bg-[#5C0B87] text-white font-bold rounded transition-all w-full shadow-lg shadow-[#700FA3]/25 text-base" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Cotizar ahora
                    </button>

                    <div className="flex flex-col items-center gap-1.5 mt-5 pt-4 border-t border-neutral-100 w-full">
                      <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "14px", fontWeight: "bold", color: "#48255A" }}>
                        O escríbenos
                      </span>
                      <a
                        className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00C233] hover:bg-[#00a82c] text-white font-bold transition-all rounded shadow-sm w-full"
                        href={pageContent.contactWhatsapp || "https://api.whatsapp.com/send?phone=593099371290&text=Hola!%20Deseo%20conocer%20mas%20informacion."}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif", fontSize: "15px" }}
                      >
                        WhatsApp Directo
                      </a>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-center text-center py-10">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>
                    <h3 className="text-3xl font-extrabold text-[#48255A] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      ¡Solicitud Recibida!
                    </h3>
                    <p className="text-neutral-500 text-sm font-light max-w-sm mb-8 leading-relaxed" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Gracias por su interés. Un asesor de One True se comunicará con usted lo antes posible.
                    </p>
                    <button onClick={() => setFormSubmitted(false)} className="px-6 py-3 border-2 border-[#700FA3] text-[#700FA3] hover:bg-[#700FA3] hover:text-white font-bold rounded transition-all text-sm" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Volver al formulario
                    </button>
                  </div>
                )}
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
