"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Service } from "@/lib/cms";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
  fontSize?: string;
}

function AnimatedCounter({ end, suffix = "", duration = 2000, fontSize = "42px" }: CounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = progress * (2 - progress);
      const currentCount = Math.floor(easeProgress * end);
      
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [hasStarted, end, duration]);

  return (
    <span 
      ref={elementRef} 
      style={{ 
        color: "#FFC107", 
        fontSize: fontSize, 
        fontWeight: "900", 
        lineHeight: "1",
        fontFamily: "var(--font-montserrat), sans-serif",
        letterSpacing: "-1px",
        userSelect: "none"
      }}
    >
      {count.toLocaleString("es-ES")}{suffix}
    </span>
  );
}

export default function ServicePageTemplate({ service, allServices }: { service: Service; allServices: Service[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [country, setCountry] = useState("ec");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      
      gsap.from(".solucion-card", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    },
    { scope: containerRef }
  );

  const { pageContent } = service;

  // Filter other solutions dynamically (max 6)
  const otherSolutions = allServices
    .filter((s) => s.id !== service.id && s.published)
    .slice(0, 6);

  const faqs = pageContent.faqs && pageContent.faqs.length > 0 ? pageContent.faqs : [
    {
      q: "¿Cuál es el nivel de exactitud de las pruebas de polígrafo?",
      a: "Bajo los estándares científicos de la American Polygraph Association (APA), y utilizando técnicas y metodologías validadas modernas (como el sistema de puntuación ESS-M), nuestras pruebas tienen un nivel de exactitud comprobado del 92% al 98%, promediando una certeza técnica superior al 95%."
    },
    {
      q: "¿Es legal realizar pruebas de polígrafo a empleados?",
      a: "Sí, es legal siempre que se cumplan las normativas de derechos humanos y laborales de cada país. La evaluación requiere de manera obligatoria el consentimiento expreso y firmado del evaluado."
    },
    {
      q: "¿Cuánto tiempo toma realizar una evaluación completa?",
      a: "Una prueba típica de polígrafo tiene una duración aproximada de 90 a 120 minutos. El proceso incluye tres fases rigurosas: una entrevista previa (pre-test), la fase de adquisición de gráficas y el análisis de datos."
    },
    {
      q: "¿Qué sensores y canales mide el polígrafo?",
      a: "El polígrafo computarizado forense de última generación monitorea múltiples canales fisiológicos simultáneamente: actividad respiratoria torácica y abdominal, actividad electrodérmica (GSR) y actividad cardiovascular."
    }
  ];

  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]" ref={containerRef}>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-start md:items-center justify-center overflow-hidden pt-32 pb-24 bg-[#700FA3]">
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #700FA3 0%, #700FA3 35%, rgba(112, 15, 163, 0.9) 48%, rgba(112, 15, 163, 0.6) 60%, rgba(112, 15, 163, 0.3) 72%, rgba(112, 15, 163, 0.05) 86%, transparent 100%)"
          }}
        />

        <img 
          src={pageContent.heroImage}
          alt={`One True ${service.title}`}
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-right-top z-0 opacity-40 mix-blend-overlay pointer-events-none"
        />

        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 z-10 flex justify-start items-center">
          <div className="max-w-3xl text-left">
            <Breadcrumbs />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-[#FFC107]" />
              <span
                className="text-xs sm:text-sm md:text-base font-semibold text-[#FFC107]"
                style={{
                  letterSpacing: "0.5px",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                {pageContent.heroTagline}
              </span>
            </div>

            <h1
              className="mb-6 !text-3xl sm:!text-4xl md:!text-5xl lg:!text-[52px] font-semibold"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                margin: "0 0 28px 0",
                padding: 0,
                lineHeight: "1.1",
                color: "#FFFFFF",
                textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)"
              }}
            >
              {pageContent.heroTitle} <strong style={{ fontWeight: "800", textDecoration: "underline", textDecorationColor: "#FFC107", textUnderlineOffset: "6px" }}>{pageContent.heroUnderlined}</strong>
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

            {/* Render premium counters if it is the polygraph template */}
            {service.template === "poligrafo" && (
              <div className="flex flex-wrap items-center gap-10 mt-6 mb-8 border-t border-white/10 pt-6 w-full max-w-xl">
                <div className="flex flex-col text-left">
                  <AnimatedCounter end={95} suffix="%" />
                  <span style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-montserrat), sans-serif", marginTop: "4px", opacity: 0.9 }}>
                    Confiables
                  </span>
                </div>
                <div className="hidden sm:block w-[1px] h-10 bg-white/20" />
                <div className="flex flex-col text-left">
                  <AnimatedCounter end={24} suffix="H" />
                  <span style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: "600", fontFamily: "var(--font-montserrat), sans-serif", marginTop: "4px", opacity: 0.9 }}>
                    Resultados en tiempo récord
                  </span>
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-6 mt-6 mb-8">
              <a 
                href="#contacto"
                className="px-8 py-3 rounded transition-all hover:brightness-110 shadow-lg text-[14px] font-semibold text-[#5F0091] bg-[#FFC107] inline-block text-center cursor-pointer no-underline border-none"
                style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1" }}
              >
                <span>Cotizar mi evaluación ahora</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre el Servicio Section */}
      <section className="bg-white py-20">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[3px] bg-[#700FA3]" />
              <span style={{ letterSpacing: "0.5px", fontSize: "18px", color: "#700FA3", fontWeight: "600", fontFamily: "var(--font-montserrat), sans-serif" }}>
                {pageContent.aboutTitle}
              </span>
            </div>
            
            <h2 style={{ fontSize: "clamp(24px, 5vw, 36px)", fontWeight: "bold", lineHeight: "46px", color: "#48255A", fontFamily: "var(--font-montserrat), sans-serif", marginTop: "10px" }}>
              {pageContent.aboutDesc}
            </h2>
          </div>

          {/* Cards Grid */}
          <div className="flex flex-wrap justify-center gap-6 max-w-[1100px] mx-auto">
            {pageContent.aboutCards.map((item, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col bg-white border border-neutral-200/80 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-300 relative pl-4 w-full sm:w-[calc(50%-12px)] ${service.template === "standard" ? "lg:w-[calc(25%-18px)]" : "lg:w-[calc(33.3333%-16px)]"}`}
              >
                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FFC107] rounded-l-xl" />
                <h3 className="text-lg font-bold text-[#48255A] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>
                  {item.title}
                </h3>
                <p className="text-[#525252] text-sm leading-relaxed font-light flex-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios / ¿Por qué contratarnos? Section */}
      <section className="bg-white py-12 md:py-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#700FA3]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
          {/* Left Column: Images */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                <img 
                  src={pageContent.whyImage1 || "/pruebas-poligrafo/primer.webp"}
                  alt="Servicios One True" 
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>
              
              <div className="absolute -bottom-12 -right-12 w-2/3 rounded-3xl overflow-hidden shadow-xl z-20 border-4 border-white hidden md:block">
                <img 
                  src={pageContent.whyImage2 || "/pruebas-poligrafo/segunda.webp"}
                  alt="Análisis de confianza One True" 
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
              <span style={{ letterSpacing: "0.5px", fontSize: "16px", color: "#700FA3", fontWeight: "600", fontFamily: "var(--font-montserrat), sans-serif" }}>
                Beneficios
              </span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-[36px] mb-6 font-bold text-[#48255A]" style={{ lineHeight: "1.2", fontFamily: "var(--font-montserrat), sans-serif" }}>
              {pageContent.whyTitle}
            </h2>

            <ul className="flex flex-col gap-3 w-full mb-6">
              {pageContent.whyPoints.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 py-1">
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-[#700FA3] text-white shrink-0 mt-0.5 shadow-md">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-base text-[#525252] font-medium leading-relaxed" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    <strong className="font-bold text-[#48255A]">{item.title}: </strong>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href="#contacto"
              className="px-8 py-3 rounded transition-all hover:brightness-110 shadow-lg text-[14px] font-semibold text-[#5F0091] bg-[#FFC107] inline-block text-center cursor-pointer no-underline border-none"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              <span>Cotizar servicio</span>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Accordion if it is the polygraph template */}
      {service.template === "poligrafo" && (
        <section className="bg-white py-20 border-t border-neutral-100">
          <div className="w-full max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-[#48255A] text-center mb-12" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Preguntas Frecuentes
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="border border-neutral-200 rounded-xl overflow-hidden">
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center px-6 py-4 text-left font-bold text-[#48255A] hover:bg-neutral-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <svg className={`w-5 h-5 transition-transform duration-300 ${openFaq === idx ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </button>
                  {openFaq === idx && (
                    <div className="px-6 py-4 border-t border-neutral-100 text-sm text-[#525252] leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Otras soluciones */}
      {otherSolutions.length > 0 && (
        <section className="bg-white py-24 overflow-hidden relative border-t border-neutral-100">
          <div className="mx-auto max-w-6xl lg:max-w-7xl xl:max-w-[1350px] px-8 md:px-12 lg:px-16 relative z-10">
            <div className="mb-16 flex flex-col items-center text-center">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-[3px] bg-[#700FA3]" />
                <span style={{ letterSpacing: "0.5px", fontSize: "18px", color: "#700FA3", fontWeight: "600", fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Servicios Integrales
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#48255A]" style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.2" }}>
                Otras Soluciones
              </h2>
            </div>

            <div className="flex flex-wrap justify-center gap-6 max-w-[1100px] mx-auto">
              {otherSolutions.map((item, idx) => (
                <div 
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.location.href = item.href;
                    }
                  }}
                  key={idx}
                  className="solucion-card relative group flex flex-col bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-500 cursor-pointer scroll-mt-28 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.3333%-16px)]"
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                  }}
                >
                  <div 
                    className="pointer-events-none absolute -inset-px z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(112, 15, 163, 0.15), transparent 40%)'
                    }}
                  />
                  <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100 rounded-t-2xl z-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-75"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1 relative z-20">
                    <h3 className="text-xl font-bold mb-5 text-[#48255A] group-hover:text-[#700FA3] transition-colors duration-300" style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>
                      {item.title}
                    </h3>
                    <p className="text-[#525252] text-sm leading-relaxed mb-6 font-light flex-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      {item.desc}
                    </p>
                    <a
                      href={item.href}
                      className="px-4 py-2 rounded transition-all hover:brightness-110 shadow-lg text-xs w-auto self-start mt-auto inline-block text-[#5F0091] bg-[#FFC107] font-bold no-underline"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      {item.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Formulario de Contacto */}
      <section
        id="contacto"
        className="py-12 md:py-16 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(60deg, #700FA3 50%, #8A15C4 90%)",
          fontFamily: "var(--font-montserrat), sans-serif"
        }}
      >
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#FFC107]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl lg:max-w-7xl xl:max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* Lado Izquierdo: Contacto Info */}
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
                      Av. Pérez Guerreo OE3-124 y San Gregorio, Instituto de Diagnóstico Médico, tercer piso, oficina #303, Quito-Ecuador.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#ffffff", fontFamily: "var(--font-montserrat), sans-serif", marginBottom: "4px" }}>
                      Agencia Guayaquil
                    </h3>
                    <p style={{ color: "rgba(255, 255, 255, 0.85)", fontSize: "15px", fontWeight: "300", fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.4" }}>
                      Urdenor 2, Manzana 219, Solar 9
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
                  <a href="https://www.linkedin.com/in/david-coli-fiallo-75679a198?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#700FA3] shadow-md hover:scale-110 transition-transform">
                    <FaLinkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Lado Derecho: Formulario */}
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
                        <input type="tel" placeholder="098 129 6179" className="flex-1 px-4 py-2.5 bg-transparent border-none text-neutral-800 focus:outline-none text-sm font-medium" required />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Ciudad *</label>
                      <input type="text" placeholder="Tu ciudad" className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white text-sm font-medium" required />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Mensaje *</label>
                      <textarea placeholder="Cuéntanos más sobre tus necesidades..." rows={2} className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white text-sm font-medium resize-none" required />
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                      <p className="text-[11px] text-neutral-500 leading-relaxed font-light">
                        Al enviar este formulario, acepto que mis datos personales sean tratados de acuerdo con la política de tratamiento de datos personales.
                      </p>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="aceptar-term" className="w-4 h-4 rounded border-neutral-300 text-[#700FA3] cursor-pointer" required />
                        <label htmlFor="aceptar-term" className="text-xs font-bold text-neutral-700 cursor-pointer select-none">
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
                        href={pageContent.contactWhatsapp || `https://api.whatsapp.com/send?phone=593981296179&text=Hola,%20deseo%20más%20información.`}
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
