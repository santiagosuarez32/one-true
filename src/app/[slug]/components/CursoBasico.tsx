"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import { Monitor, Brain, Fingerprint, Globe, UserFocus, Devices, BookOpen, Certificate, Medal, Shield, Microscope, Crown } from "@phosphor-icons/react";

import { Course } from "@/lib/cms";

const phosphorIconMap: Record<string, React.ComponentType<any>> = {
  Monitor, Brain, Fingerprint, Globe, UserFocus, Devices, BookOpen, Certificate, Medal, Shield, Microscope, Crown
};

export default function CursoBasicoPoligrafiaPage({ course }: { course: Course }) {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [country, setCountry] = useState("ec");

  const {
    heroTagline,
    heroTitle,
    heroDesc,
    heroImage,
    contactPhone,
    contactWhatsapp,
    customCards,
    svgFocusAreas,
    fichaTecnica
  } = course.pageContent;

  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-36 pb-24 bg-[#700FA3]">
        {/* Purple Overlay */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #700FA3 0%, #700FA3 35%, rgba(112, 15, 163, 0.9) 48%, rgba(112, 15, 163, 0.6) 60%, rgba(112, 15, 163, 0.3) 72%, rgba(112, 15, 163, 0.05) 86%, transparent 100%)"
          }}
        />

        <img 
          src={heroImage || "/servicios/7.webp"}
          alt={heroTitle || "Academia de Poligrafía One True"}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-right-top z-0 opacity-45 mix-blend-overlay pointer-events-none"
        />

        {/* Hero Content Container */}
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 z-10 flex justify-start items-center">
          <div className="max-w-3xl text-left">
            
            {/* Tag Prefix */}
            <Breadcrumbs />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-[#FFC107]" />
              <span
                className="text-xs sm:text-sm md:text-base font-semibold"
                style={{
                  letterSpacing: "0.5px",
                  color: "#FFC107",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                {heroTagline}
              </span>
            </div>

            <h1
              className="mb-6 !text-3xl sm:!text-4xl md:!text-5xl lg:!text-[52px] font-semibold leading-tight"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                margin: "0 0 28px 0",
                padding: 0,
                color: "#FFFFFF",
                textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)"
              }}
            >
              {heroTitle}
            </h1>

            <p
              className="mb-8 opacity-95 !text-sm sm:!text-base md:!text-lg font-medium"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                lineHeight: "32px",
                color: "#FFFFFF"
              }}
            >
              {heroDesc}
            </p>

            {/* Hero Action Button */}
            <div className="flex flex-wrap items-center gap-6">
              <a 
                href="#contacto"
                className="px-8 py-3.5 rounded transition-all hover:brightness-110 shadow-lg text-center"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  lineHeight: "1",
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
                <span>Solicitar Admisión e Información</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Curricular: "¿Qué obtendrá en esta formación?" (Grid en Fila de Estilo Vetting) */}
      <section className="bg-white py-24">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Centered Small Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[3px] bg-[#700FA3]" />
              <span
                style={{
                  letterSpacing: "0.5px",
                  fontSize: "18px",
                  color: "#700FA3",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Beneficios Académicos
              </span>
            </div>
            
            <h2
              style={{
                fontSize: "clamp(24px, 5vw, 36px)",
                fontWeight: "bold",
                lineHeight: "46px",
                color: "#48255A",
                fontFamily: "var(--font-montserrat), sans-serif",
                marginTop: "10px"
              }}
            >
              ¿Qué obtendrá en esta formación?
            </h2>

            <p 
              className="text-[#525252] text-base mt-4 max-w-2xl font-light"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Un entrenamiento riguroso diseñado para alcanzar la excelencia profesional:
            </p>
          </div>
            {(customCards && customCards.length > 0 ? customCards : [
              {
                title: "Certificación Internacional APA",
                description: "Rompe las fronteras profesionales. Obtén el único aval que te faculta global y técnicamente para ejercer la poligrafía a nivel mundial. No es un diploma local, es tu pasaporte a la élite forense internacional.",
              },
              {
                title: "Ciencia Antifraude Infalible",
                description: "Domina el ecosistema científico de la verdad: desde carga cognitiva hasta patrones psicofisiológicos avanzados. Aprende a blindar tus evaluaciones contra cualquier contramedida o técnica de manipulación con precisión matemática.",
              },
              {
                title: "Práctica Forense de Alto Rendimiento",
                description: "Desarrollarás habilidades críticas operando instrumentación digital avanzada y resolviendo casos reales de alta complejidad. Un entorno diseñado para transferir la teoría a la práctica pericial, garantizando tu destreza técnica bajo la mentoría directa de instructores Senior.",
              },
              {
                title: "Autoridad y Liderazgo Pericial",
                description: "Deja de competir por precio. Esta formación te otorga el estatus y la competencia técnica para liderar la toma de decisiones críticas y cotizar tus servicios en los niveles más altos del sector corporativo, multinacional y gubernamental.",
              }
            ]).map((item, idx) => {
              const anyItem = item as any;
              const iconMap = [
                <Monitor key={0} size={72} weight="thin" color="#700FA3" className="shrink-0" />,
                <Brain key={1} size={72} weight="thin" color="#700FA3" className="shrink-0" />,
                <Fingerprint key={2} size={72} weight="thin" color="#700FA3" className="shrink-0" />,
                <Globe key={3} size={72} weight="thin" color="#700FA3" className="shrink-0" />
              ];
              const IconComp = anyItem.icon ? phosphorIconMap[anyItem.icon] : null;
              const isImage = anyItem.icon && (anyItem.icon.endsWith(".svg") || anyItem.icon.endsWith(".png") || anyItem.icon.endsWith(".webp") || anyItem.icon.endsWith(".jpg") || anyItem.icon.endsWith(".jpeg") || anyItem.icon.startsWith("/") || anyItem.icon.startsWith("http"));
              const icon = isImage ? (
                <img src={anyItem.icon} alt={item.title} className="w-16 h-16 object-contain" />
              ) : IconComp ? (
                <IconComp size={72} weight="thin" color="#700FA3" className="shrink-0" />
              ) : anyItem.icon ? (
                <div className="text-5xl">{anyItem.icon}</div>
              ) : (
                iconMap[idx] || <Monitor size={72} weight="thin" color="#700FA3" className="shrink-0" />
              );
              return (
                <div
                  key={idx}
                  className="flex flex-col bg-white border border-neutral-200/80 rounded-xl p-8 shadow-sm relative pl-6 pt-8 text-left w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
                >
                  {/* Elegant left gold accent bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FFC107] rounded-l-xl" />
                  
                  {/* Icon Container with elegant soft glow background */}
                  <div className="flex justify-start mb-6 h-[76px] items-center text-[#700FA3] relative">
                    <div className="absolute -left-2 w-16 h-16 rounded-full bg-[#700FA3]/5 blur-[8px] pointer-events-none" />
                    <div className="relative z-10">
                      {icon}
                    </div>
                  </div>
                  
                  {/* Card Title */}
                  <h3 
                    className="text-lg font-bold mb-16 text-[#48255A]"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}
                  >
                    {item.title}
                  </h3>
                  
                  {/* Description Text */}
                  <p 
                    className="text-[#525252] text-sm leading-relaxed font-light flex-1"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {item.description || (item as any).desc}
                  </p>
                </div>
              );
            })}

        </div>
      </section>

      {/* Cuadrícula de Requisitos y Recursos (2x2 Soft Grid) */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1650px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[#700FA3]" />
              <span
                style={{
                  letterSpacing: "0.5px",
                  fontSize: "16px",
                  color: "#700FA3",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Detalles de Admisión
              </span>
            </div>
            
            <h2
              className="text-2xl sm:text-3xl md:text-[36px]"
              style={{
                fontWeight: "bold",
                lineHeight: "1.2",
                color: "#48255A",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              El Ecosistema del Éxito: Tu Pasaporte a la Élite Forense
            </h2>
          </div>

          {/* Grid Cards - Rediseñadas en una sola fila (4 columnas en escritorio) con fondo amarillo y sin hover */}
            {(svgFocusAreas && svgFocusAreas.length > 0 ? svgFocusAreas : [
              {
                title: "Kit y Software Forense Incluido",
                description: "Todo lo que necesitas para ejercer con éxito. Olvídate de costos ocultos: desde el primer día accedes a las licencias de software especializado, manuales de vanguardia y guías periciales avaladas que exigen los estándares de la industria.",
              },
              {
                title: "Comunidad y Respaldo Continuo",
                description: "Tu formación no termina al graduarte. Te integras a una red viva de soporte técnico y consultoría para resolver tus primeros casos reales. El respaldo experto de tus instructores te acompaña durante toda tu trayectoria",
              },
              {
                title: "Certificación de Éxito Asegurado",
                description: "Inversión con cero riesgo. Si cumples con el plan y superas las evaluaciones, garantizamos tu incorporación técnica definitiva y la preparación total exigida para postular como miembro activo a las asociaciones globales más influyentes.",
              },
              {
                title: "Acceso y Filtro de Admisión",
                description: "No es para todos. Mantenemos el estándar de la comunidad mediante un riguroso proceso de selección de perfiles honorables. Si eres admitido, te aseguras de conectar y hacer networking con la verdadera élite profesional del sector.",
              }
            ]).map((item, idx) => {
              const anyItem = item as any;
              const iconMap = [
                <UserFocus key={0} size={72} weight="thin" color="#700FA3" className="shrink-0" />,
                <Devices key={1} size={72} weight="thin" color="#700FA3" className="shrink-0" />,
                <Medal key={2} size={72} weight="thin" color="#700FA3" className="shrink-0" />,
                <Shield key={3} size={72} weight="thin" color="#700FA3" className="shrink-0" />
              ];
              const IconComp = anyItem.icon ? phosphorIconMap[anyItem.icon] : null;
              const isImage = anyItem.icon && (anyItem.icon.endsWith(".svg") || anyItem.icon.endsWith(".png") || anyItem.icon.endsWith(".webp") || anyItem.icon.endsWith(".jpg") || anyItem.icon.endsWith(".jpeg") || anyItem.icon.startsWith("/") || anyItem.icon.startsWith("http"));
              const icon = isImage ? (
                <img src={anyItem.icon} alt={item.title} className="w-16 h-16 object-contain" />
              ) : IconComp ? (
                <IconComp size={72} weight="thin" color="#700FA3" className="shrink-0" />
              ) : anyItem.icon ? (
                <div className="text-5xl">{anyItem.icon}</div>
              ) : (
                iconMap[idx] || <UserFocus size={72} weight="thin" color="#700FA3" className="shrink-0" />
              );
              return (
                <div
                  key={idx}
                  className="flex flex-col bg-white rounded-3xl p-6 shadow-sm relative text-left border border-neutral-200/80"
                >
                  {/* Icon Container with elegant soft glow background */}
                  <div className="flex justify-start mb-6 h-[76px] items-center text-[#700FA3] relative">
                    <div className="absolute -left-2 w-16 h-16 rounded-full bg-[#700FA3]/10 blur-[6px] pointer-events-none" />
                    <div className="relative z-10">
                      {icon}
                    </div>
                  </div>
                  
                  {/* Card Title */}
                  <h3 
                    className="text-lg font-bold mb-16 text-[#48255A]"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}
                  >
                    {item.title}
                  </h3>
                  
                  {/* Description Text */}
                  <p
                    className="text-[#525252] text-sm leading-relaxed font-light flex-1 text-justify"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {item.description || (item as any).text}
                  </p>
                </div>
              );
            })}

        </div>
      </section>

      {/* Sección: Ventajas de formarse con nosotros (Estilo Beneficios Vetting) */}
      <section className="bg-white py-12 md:py-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#700FA3]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-8 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
          
          {/* Left Column: Images */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                <img 
                  src="/pruebas-poligrafo/primer.webp" 
                  alt="Estudiante de poligrafía en formación técnica" 
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>
              
              <div className="absolute -bottom-12 -right-12 w-2/3 rounded-3xl overflow-hidden shadow-xl z-20 border-4 border-white hidden md:block">
                <img 
                  src="/pruebas-poligrafo/segunda.webp" 
                  alt="Práctica pericial con polígrafo" 
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>

              <div className="absolute -top-8 -left-8 w-24 h-24 z-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(#700FA3 2px, transparent 2px)',
                  backgroundSize: '12px 12px'
                }}
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start lg:pl-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[#700FA3]" />
              <span
                style={{
                  letterSpacing: "0.5px",
                  fontSize: "16px",
                  color: "#700FA3",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Ventajas Exclusivas
              </span>
            </div>
            
            <h2
              className="text-2xl sm:text-3xl md:text-[36px] mb-6"
              style={{
                fontWeight: "bold",
                lineHeight: "1.2",
                color: "#48255A",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Ventajas de formarse con nosotros
            </h2>

            <ul className="flex flex-col gap-3 w-full mb-6">
              {(fichaTecnica && fichaTecnica.length > 0 ? fichaTecnica : [
                { 
                  title: "Experiencia Docente", 
                  description: "Aprenda de instructores activos con amplia trayectoria en el ámbito forense y de seguridad." 
                },
                { 
                  title: "Networking de Élite", 
                  description: "Forme parte de una comunidad profesional de poligrafistas en toda la región." 
                },
                { 
                  title: "Carrera de Futuro", 
                  description: "Acceda a oportunidades laborales en agencias gubernamentales, inteligencia y seguridad corporativa privada." 
                }
              ]).map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 py-1">
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-[#700FA3] text-white shrink-0 mt-0.5 shadow-md">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span 
                    className="text-base text-[#525252] font-medium leading-relaxed"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    <strong className="font-bold text-[#48255A]">{item.title}: </strong>
                    {item.description || (item as any).text}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#contacto"
              className="px-8 py-3 rounded transition-all hover:brightness-110 shadow-lg inline-block text-center cursor-pointer"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                lineHeight: "1",
                fontSize: "14px",
                fontWeight: "600",
                color: "#5F0091",
                backgroundColor: "#FFC107",
                textDecoration: "none",
                border: "none"
              }}
            >
              <span>Solicitar Admisión e Información</span>
            </a>

          </div>
        </div>
      </section>

      {/* ── FORMULARIO DE CONTACTO (Estilo Vetting) ── */}
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
              {/* Logo de One True */}
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
                  marginBottom: "20px"
                }}
              >
                Contactos
              </h2>

              {/* Items List */}
              <div className="flex flex-col gap-5">
                {/* 1. Teléfono */}
                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.155-.44.011-.928.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 
                      style={{ 
                        fontSize: "18px", 
                        fontWeight: "bold", 
                        color: "#ffffff", 
                        fontFamily: "var(--font-montserrat), sans-serif",
                        marginBottom: "4px"
                      }}
                    >
                      Teléfono
                    </h3>
                    <a 
                      href={`tel:${contactPhone || "0981296179"}`} 
                      style={{ 
                        color: "rgba(255, 255, 255, 0.85)", 
                        fontSize: "16px", 
                        fontWeight: "300", 
                        fontFamily: "var(--font-montserrat), sans-serif" 
                      }}
                      className="hover:text-[#FFC107] transition-colors"
                    >
                      {contactPhone || "+593 099 371 2790"}
                    </a>
                  </div>
                </div>

                {/* 2. Agencia Quito */}
                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75m3-3h.75m-.75 3h.75m-6 3h.75m3 0h.75m3 0h.75" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 
                      style={{ 
                        fontSize: "18px", 
                        fontWeight: "bold", 
                        color: "#ffffff", 
                        fontFamily: "var(--font-montserrat), sans-serif",
                        marginBottom: "4px"
                      }}
                    >
                      Agencia Quito
                    </h3>
                    <p 
                      style={{ 
                        color: "rgba(255, 255, 255, 0.85)", 
                        fontSize: "15px", 
                        fontWeight: "300", 
                        fontFamily: "var(--font-montserrat), sans-serif",
                        lineHeight: "1.4"
                      }}
                    >
                      Av. Pérez Guerreo OE3-124 y San Gregorio, Instituto de Diagnóstico Médico, tercer piso, oficina #303, Quito-Ecuador.
                    </p>
                  </div>
                </div>

                {/* 3. Agencia Guayaquil */}
                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 
                      style={{ 
                        fontSize: "18px", 
                        fontWeight: "bold", 
                        color: "#ffffff", 
                        fontFamily: "var(--font-montserrat), sans-serif",
                        marginBottom: "4px"
                      }}
                    >
                      Agencia Guayaquil
                    </h3>
                    <p 
                      style={{ 
                        color: "rgba(255, 255, 255, 0.85)", 
                        fontSize: "15px", 
                        fontWeight: "300", 
                        fontFamily: "var(--font-montserrat), sans-serif",
                        lineHeight: "1.4"
                      }}
                    >
                      Urdenor 2, Manzana 219, Solar 9
                    </p>
                  </div>
                </div>

                {/* 4. Correo */}
                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 
                      style={{ 
                        fontSize: "18px", 
                        fontWeight: "bold", 
                        color: "#ffffff", 
                        fontFamily: "var(--font-montserrat), sans-serif",
                        marginBottom: "4px"
                      }}
                    >
                      Correo
                    </h3>
                    <a 
                      href="mailto:info@somosonetrue.com" 
                      style={{ 
                        color: "rgba(255, 255, 255, 0.85)", 
                        fontSize: "16px", 
                        fontWeight: "300", 
                        fontFamily: "var(--font-montserrat), sans-serif" 
                      }}
                      className="hover:text-[#FFC107] transition-colors"
                    >
                      info@somosonetrue.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Redes Sociales y Síguenos */}
              <div className="flex flex-col items-start gap-3 mt-6 pt-4 border-t border-white/10 w-full">
                <h3 
                  style={{ 
                    fontSize: "18px", 
                    fontWeight: "bold", 
                    color: "#ffffff", 
                    fontFamily: "var(--font-montserrat), sans-serif",
                    marginBottom: "4px"
                  }}
                >
                  Síguenos:
                </h3>
                <div className="flex items-center gap-3">
                  <a 
                    href="https://www.facebook.com/share/1F8T24NNKE/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Síguenos en Facebook"
                    className="w-10 h-10 bg-white rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center text-[#700FA3] shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.instagram.com/somosonetrue?igsh=bXNmOWYwaWpsdDVh" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Síguenos en Instagram"
                    className="w-10 h-10 bg-white rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center text-[#700FA3] shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href="https://www.linkedin.com/in/david-coli-fiallo-75679a198?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Síguenos en LinkedIn"
                    className="w-10 h-10 bg-white rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center text-[#700FA3] shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* LADO DERECHO: Tarjeta de Formulario */}
            <div className="lg:col-span-6 relative">
              <div className="bg-white rounded p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-neutral-100 relative overflow-hidden transition-all duration-500">
                
                {!formSubmitted ? (
                  <div>
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
                          <input 
                            type="text" 
                            placeholder="Tu nombre" 
                            className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium" 
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                            required 
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Apellido *</label>
                          <input 
                            type="text" 
                            placeholder="Tu apellido" 
                            className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium" 
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                            required 
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Correo electrónico *</label>
                        <div className="relative">
                          <input 
                            type="email" 
                            placeholder="correo@empresa.com" 
                            className="px-4 py-2.5 pr-10 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium" 
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                            required 
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#700FA3]">
                            <svg className="w-5 h-5 text-[#700FA3]" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Número de teléfono *</label>
                        <div className="relative flex items-center border-0 rounded bg-neutral-50 focus-within:ring-2 focus-within:ring-[#700FA3]/20 focus-within:bg-white focus-within:shadow-md transition-all overflow-hidden">
                          <div className="flex items-center gap-2 pl-3 border-r border-neutral-200/60 bg-transparent shrink-0">
                            <img 
                              src={`https://flagcdn.com/w20/${country}.png`} 
                              alt={country} 
                              className="w-5 h-auto object-contain select-none" 
                            />
                            <select 
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              className="bg-transparent border-0 py-2.5 pl-1 pr-6 text-sm font-semibold text-neutral-700 outline-none focus:ring-0 cursor-pointer appearance-none"
                              style={{ 
                                fontFamily: "var(--font-montserrat), sans-serif",
                                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                                backgroundPosition: 'right 0.1rem center',
                                backgroundSize: '1.1em 1.1em',
                                backgroundRepeat: 'no-repeat',
                              }}
                            >
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
                          <input 
                            type="tel" 
                            placeholder="+593 099 371 2790" 
                            className="flex-1 px-4 py-2.5 bg-transparent border-none text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-0 text-sm font-medium" 
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                            required 
                          />
                          <div className="pr-3 text-[#700FA3] pointer-events-none">
                            <svg className="w-5 h-5 text-[#700FA3]" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Ciudad *</label>
                        <input 
                          type="text" 
                          placeholder="Tu ciudad" 
                          className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium" 
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                          required 
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Mensaje *</label>
                        <textarea 
                          placeholder="Escribe tu mensaje aquí..." 
                          rows={2} 
                          className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium resize-none" 
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                          required 
                        ></textarea>
                      </div>

                      <div className="flex flex-col gap-4 mt-2">
                        <p className="text-[11px] text-neutral-500 leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                          Al enviar este formulario, acepto que mis datos personales sean tratados de acuerdo con la{" "}
                          <a href="#" className="text-[#700FA3] hover:underline font-bold">
                            Política de tratamiento de datos personales
                          </a>{" "}
                          y los{" "}
                          <a href="#" className="text-[#700FA3] hover:underline font-bold">
                            términos establecidos en ella
                          </a>.
                        </p>
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="aceptar-curso" 
                            className="w-4 h-4 rounded border-neutral-300 text-[#700FA3] focus:ring-[#700FA3] cursor-pointer" 
                            required 
                          />
                          <label htmlFor="aceptar-curso" className="text-xs font-bold text-neutral-700 cursor-pointer select-none" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                            Aceptar
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="mt-2 px-8 py-3.5 bg-[#700FA3] hover:bg-[#5C0B87] text-white font-bold rounded transition-all duration-300 w-full shadow-lg shadow-[#700FA3]/25 hover:scale-[1.01] active:scale-[0.99] text-base"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        Cotizar ahora
                      </button>

                      <div className="flex flex-col items-center gap-1.5 mt-5 pt-4 border-t border-neutral-100 w-full">
                        <span 
                          style={{ 
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#48255A"
                          }}
                        >
                          O escríbenos
                        </span>
                        <div className="elementor-button-wrapper flex justify-center w-auto mt-1">
                          <a 
                            className="elementor-button elementor-button-link elementor-size-sm flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00C233] hover:bg-[#00a82c] text-white font-bold transition-all duration-300 rounded shadow-sm hover:shadow hover:scale-[1.02]"
                            href="https://api.whatsapp.com/send?phone=593099371290&text=Hola!%20Deseo%20conocer%20mas%20informacion%20sobre%20el%20Curso%20Basico%20de%20Poligrafia%20400H."
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ 
                              fontFamily: "var(--font-montserrat), sans-serif", 
                              fontSize: "15px", 
                              fontWeight: "bold",
                              color: "#ffffff" 
                            }}
                          >
                            <span className="elementor-button-content-wrapper flex items-center justify-center gap-2" style={{ color: "#ffffff" }}>
                              <span className="elementor-button-icon flex items-center">
                                <svg 
                                  aria-hidden="true" 
                                  className="e-font-icon-svg e-fab-whatsapp w-4.5 h-4.5 fill-current" 
                                  viewBox="0 0 448 512" 
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ fill: "#ffffff", color: "#ffffff" }}
                                >
                                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                                </svg>
                              </span>
                              <span className="elementor-button-text font-bold" style={{ color: "#ffffff", fontWeight: "bold" }}>+593 099 371 2790</span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-center py-10">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
                      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>

                    <h3 className="text-3xl font-extrabold text-[#48255A] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      ¡Cotización Solicitada!
                    </h3>

                    <p className="text-neutral-500 text-sm font-light max-w-sm mb-8 leading-relaxed" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Muchas gracias por ponerte en contacto con nosotros. Tu mensaje ha sido recibido con éxito. Un representante de **One True** se comunicará contigo lo antes posible para darte información personalizada.
                    </p>

                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-3 border-2 border-[#700FA3] text-[#700FA3] hover:bg-[#700FA3] hover:text-white font-bold rounded transition-all duration-300 text-sm"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      Volver al formulario
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Button */}
      <FloatingWhatsApp />
    </main>
  );
}
