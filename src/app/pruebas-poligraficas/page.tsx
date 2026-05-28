"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

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
      
      // Easing: easeOutQuad
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

export default function PruebasPoligraficasPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const testTypes = [
    {
      title: "Evaluaciones de Preempleo",
      subtitle: "Filtro de Selección Confiable",
      desc: "Proteja los activos de su empresa desde el primer momento. Esta evaluación está diseñada para identificar conductas de riesgo, antecedentes no declarados y evaluar el nivel de honestidad de los postulantes antes de ocupar cargos críticos o de alta responsabilidad.",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
      details: ["Verificación de honestidad en hoja de vida.", "Detección de vínculos con actividades ilícitas.", "Evaluación de consumo de sustancias no declaradas.", "Prevención de filtración de información o fraudes internos."],
      cta: "Cotizar preempleo"
    },
    {
      title: "Evaluaciones de Rutina o Permanencia",
      subtitle: "Prevención y Control Continuo",
      desc: "Salvaguarde la integridad corporativa de forma preventiva. Diseñada para evaluar periódicamente al personal activo que tiene acceso a recursos financieros, bases de datos confidenciales o áreas estratégicas, reforzando la cultura de transparencia y lealtad.",
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=600&q=80",
      details: ["Evaluaciones periódicas de honestidad laboral.", "Detección temprana de fugas de información.", "Disuasión eficaz contra malas prácticas y fraudes.", "Mantenimiento de estándares éticos elevados."],
      cta: "Cotizar rutina"
    },
    {
      title: "Evaluaciones Específicas / Investigación",
      subtitle: "Resolución Técnica de Incidentes",
      desc: "Certeza técnica y forense ante pérdidas o dudas específicas. Se ejecuta de manera rigurosa y objetiva para esclarecer responsabilidades en incidentes específicos de seguridad como robos, fraudes, sabotajes o filtración de información clasificada.",
      image: "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&w=600&q=80",
      details: ["Metodología forense de diagnóstico altamente precisa.", "Esclarecimiento técnico de sospechas e incidentes.", "Análisis objetivo libre de sesgos y presiones.", "Emisión de informes con validez técnica certificada."],
      cta: "Cotizar investigación"
    }
  ];

  const faqs = [
    {
      q: "¿Cuál es el nivel de exactitud de las pruebas de polígrafo?",
      a: "Bajo los estándares científicos de la American Polygraph Association (APA), y utilizando técnicas y metodologías validadas modernas (como el sistema de puntuación ESS-M), nuestras pruebas tienen un nivel de exactitud comprobado del 92% al 98%, promediando una certeza técnica superior al 95%."
    },
    {
      q: "¿Es legal realizar pruebas de polígrafo a empleados?",
      a: "Sí, es legal siempre que se cumplan las normativas de derechos humanos y laborales de cada país. La evaluación requiere de manera obligatoria el consentimiento expreso y firmado del evaluado. En One True operamos bajo estrictos códigos éticos internacionales de la APA que garantizan la confidencialidad, la dignidad y el trato justo en cada etapa del proceso."
    },
    {
      q: "¿Cuánto tiempo toma realizar una evaluación completa?",
      a: "Una prueba típica de polígrafo tiene una duración aproximada de 90 a 120 minutos. El proceso incluye tres fases rigurosas: una entrevista previa (pre-test) para explicar los temas y revisar la salud del evaluado, la fase de adquisición de gráficas (donde se registraron los sensores), y la fase posterior (post-test) de análisis de datos."
    },
    {
      q: "¿Qué sensores y canales mide el polígrafo?",
      a: "El polígrafo computarizado forense de última generación monitorea múltiples canales fisiológicos de manera simultánea: actividad respiratoria torácica y abdominal (mediante neumógrafos), actividad electrodérmica o conductancia de la piel (GSR), y actividad cardiovascular (flujo sanguíneo y presión mediante brazalete neumático), además de sensores de detección de contramedidas físicas."
    }
  ];

  return (
    <main className="min-h-screen bg-[#fcfafc] text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section - Matching the home Hero styling and colors but static */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden pt-32 pb-24 bg-[#700FA3]">
        {/* Purple Overlay with smooth cubic-bezier easing gradient matching home exactly */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #700FA3 0%, #700FA3 35%, rgba(112, 15, 163, 0.9) 48%, rgba(112, 15, 163, 0.6) 60%, rgba(112, 15, 163, 0.3) 72%, rgba(112, 15, 163, 0.05) 86%, transparent 100%)"
          }}
        />

        {/* Dynamic Abstract Background Image matching the header/slider layout */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80')`,
            backgroundPosition: "right center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat"
          }}
        />

        {/* Centered Grid Container */}
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-8 md:px-12 lg:px-16 z-10 flex justify-start items-center">
          <div className="max-w-3xl text-left">
            
            {/* Tag Prefix */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-[#FFC107]" />
              <span
                style={{
                  letterSpacing: "0.5px",
                  fontSize: "18px",
                  color: "#FFC107",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Nuestras soluciones
              </span>
            </div>

            <h1
              className="mb-6"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                margin: "0 0 28px 0",
                padding: 0,
                fontSize: "52px",
                fontWeight: "600",
                lineHeight: "1.1",
                color: "#FFFFFF",
                textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)"
              }}
            >
              Pruebas de <strong style={{ fontWeight: "800", textDecoration: "underline", textDecorationColor: "#FFC107", textUnderlineOffset: "6px" }}>Polígrafo</strong>
            </h1>

            <p
              className="mb-6 opacity-95"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                fontSize: "18px",
                fontWeight: "500",
                lineHeight: "30px",
                color: "#FFFFFF" // Force color to override global CSS leaks
              }}
            >
              Aseguramos su toma de decisiones mediante pruebas de polígrafo con un 95% de exactitud. Validamos la integridad en procesos de selección, monitoreo preventivo de su personal y esclarecimiento de incidentes internos bajo estándares internacionales. Obtenga resultados técnicos en tiempo récord para asegurar la transparencia y proteger los activos de su empresa.
            </p>

            {/* Premium Counters Block */}
            <div className="flex flex-wrap items-center gap-10 mt-6 mb-8 border-t border-white/10 pt-6 w-full max-w-xl">
              {/* Counter 1 */}
              <div className="flex flex-col text-left">
                <AnimatedCounter end={95} suffix="%" />
                <span 
                  style={{ 
                    color: "#FFFFFF", 
                    fontSize: "13px", 
                    fontWeight: "600", 
                    fontFamily: "var(--font-montserrat), sans-serif",
                    marginTop: "4px",
                    opacity: 0.9
                  }}
                >
                  Confiables
                </span>
              </div>

              {/* Vertical Divider */}
              <div className="hidden sm:block w-[1px] h-10 bg-white/20" />

              {/* Counter 2 */}
              <div className="flex flex-col text-left">
                <AnimatedCounter end={24} suffix="H" />
                <span 
                  style={{ 
                    color: "#FFFFFF", 
                    fontSize: "13px", 
                    fontWeight: "600", 
                    fontFamily: "var(--font-montserrat), sans-serif",
                    marginTop: "4px",
                    opacity: 0.9
                  }}
                >
                  Resultados en tiempo récord
                </span>
              </div>
            </div>



          </div>
        </div>
      </section>

      {/* Sobre el Servicio Section */}
      <section className="bg-white py-20 border-b border-neutral-100">
        <div className="w-full max-w-4xl mx-auto px-8">
          
          {/* Centered Small Header */}
          <div className="flex flex-col items-center text-center mb-12">
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
                Sobre el Servicio
              </span>
            </div>
            
            <h2
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                lineHeight: "42px",
                color: "#48255A",
                fontFamily: "var(--font-montserrat), sans-serif",
                marginTop: "10px"
              }}
            >
              ¿Qué resolvemos para su organización?
            </h2>
          </div>

          {/* List items with beautiful customized bullets */}
          <div className="flex flex-col gap-8 max-w-3xl mx-auto">
            {[
              {
                title: "Polígrafo Específico",
                text: "Utilizada en procesos investigativos. Esclarezca incidentes internos, pérdidas, robos, asaltos, fuga de información, temas personales, con absoluta objetividad y confidencialidad."
              },
              {
                title: "Polígrafo Pre-empleo",
                text: "Identificamos riesgos críticos como vínculos ilícitos, consumo de sustancias, omisión de antecedentes, entre otras conductas contraproducentes. Asegure la honestidad de su talento desde el primer día."
              },
              {
                title: "Polígrafo de Rutina",
                text: "Monitoreo preventivo para personal que labora en la empresa. Fortalece la lealtad y disuade conductas irregulares internas."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                {/* Beautiful custom circular bullet */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#700FA3] mt-2.5 shrink-0" />
                <p 
                  className="text-base leading-relaxed text-[#525252] font-light"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  <strong className="font-bold text-[#48255A]">{item.title}: </strong>
                  {item.text}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Grid of Test Types - Styled EXACTLY like the Services list cards on the homepage */}
      <section className="bg-[#fcfafc] py-24 relative border-b border-neutral-100">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-8 md:px-12 lg:px-16 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-[3px] bg-[#700FA3]" />
              <span
                style={{
                  letterSpacing: "0.5px",
                  fontSize: "18px",
                  color: "#700FA3",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Conozca Nuestras Evaluaciones
              </span>
            </div>

            <h2
              style={{
                margin: 0,
                padding: 0,
                fontSize: "40px",
                fontWeight: "bold",
                lineHeight: "52px",
                color: "#48255A",
                fontFamily: "var(--font-montserrat), sans-serif",
                maxWidth: "850px",
                width: "100%",
              }}
            >
              Tipos de Evaluaciones Poligráficas Profesionales
            </h2>
          </div>

          {/* Cards Grid - 3 Column Layout using EXACT home card styles */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testTypes.map((type, idx) => (
              <div
                key={idx}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
                }}
                className="relative group flex flex-col bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-500 cursor-pointer scroll-mt-28"
              >
                {/* Purple mouse-hover glow effect exactly like homepage */}
                <div 
                  className="pointer-events-none absolute -inset-px z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(112, 15, 163, 0.15), transparent 40%)'
                  }}
                />

                {/* Card Cover Image */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100 rounded-t-2xl z-0">
                  <img
                    src={type.image}
                    alt={type.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-75"
                    loading="lazy"
                  />
                </div>

                {/* Content Container */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 
                    className="text-xl font-bold mb-3 text-[#48255A] group-hover:text-[#700FA3] transition-colors duration-300"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}
                  >
                    {type.title}
                  </h3>

                  <span
                    className="text-xs text-[#700FA3] font-bold tracking-wider uppercase block mb-4"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {type.subtitle}
                  </span>
                  
                  <p 
                    className="text-[#525252] text-sm leading-relaxed mb-6 font-light flex-1"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {type.desc}
                  </p>

                  {/* Bullet checklist */}
                  <ul className="border-t border-neutral-100 pt-5 mb-6 flex flex-col gap-2.5">
                    {type.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-neutral-500 font-medium">
                        <svg className="w-4 h-4 text-[#FFC107] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        {detail}
                      </li>
                    ))}
                  </ul>
                  
                  {/* CTA Button */}
                  <button
                    className="px-4 py-2 bg-[#FFC107] text-[#411A56] font-bold rounded transition-colors duration-300 text-xs whitespace-nowrap w-auto self-start mt-auto group-hover:bg-[#700FA3] group-hover:text-white"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {type.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Rigorous Science & Technology - Styled like the high-end Ebook / Podcast sections */}
      <section id="detalles-tecnicos" className="py-24 bg-white relative overflow-hidden border-b border-neutral-100 scroll-mt-24">
        {/* Decorative background blur blobs like home Ebook */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#700FA3] opacity-5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFC107] opacity-5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-8 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
          
          {/* Left Column: Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="flex items-center gap-3 mb-6">
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
                Garantía y Confianza
              </span>
            </div>

            <h2
              className="text-3xl lg:text-[40px]"
              style={{
                margin: 0,
                padding: 0,
                fontWeight: "bold",
                lineHeight: "1.25",
                color: "#48255A",
                fontFamily: "var(--font-montserrat), sans-serif",
                marginBottom: "24px",
              }}
            >
              Tecnología de última generación avalada por la APA
            </h2>

            <p className="text-base text-neutral-600 mb-8 leading-relaxed font-light">
              No dejamos la toma de decisiones al azar. Nuestras evaluaciones poligráficas se ejecutan exclusivamente por profesionales certificados miembros de la American Polygraph Association, utilizando hardware de grado forense y programas informáticos de última generación con una certeza superior al 95%.
            </p>

            {/* Bullet Grid with home matching visual ticks */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
              {[
                { title: "Evaluadores APA", text: "Poligrafistas formados bajo la norma científica forense internacional." },
                { title: "Certeza del 95%", text: "Validación estadística mediante técnicas computarizadas avanzadas." },
                { title: "Emisión Rápida", text: "Informes ejecutivos altamente detallados listos en 24 horas." },
                { title: "Confidencialidad Absoluta", text: "Custodia de datos cifrada y apego absoluto a la protección de datos." }
              ].map((bullet, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#700FA3]/15 flex items-center justify-center shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-[#700FA3]" />
                  </div>
                  <div>
                    <h5 className="font-bold text-[#48255A] text-sm mb-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>{bullet.title}</h5>
                    <p className="text-xs text-neutral-500 font-light leading-relaxed">{bullet.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Premium Card Graphic matches Ebook.tsx form frame */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(72,37,90,0.08)] border border-neutral-100 w-full max-w-[520px]">
              <span className="text-[10px] text-[#700FA3] font-bold tracking-widest uppercase block mb-2" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Canal Fisiológico Forense
              </span>
              <h4 
                className="text-lg font-bold text-[#48255A] mb-6" 
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Adquisición de Gráficas APA
              </h4>
              
              {/* Graphic Mockup Elements */}
              <div className="flex flex-col gap-6">
                {[
                  { label: "Neumógrafo Torácico (Respiración)", color: "#FFC107" },
                  { label: "Respuesta Galvánica (Conductancia GSR)", color: "#700FA3" },
                  { label: "Cardioesfigmógrafo (Presión / Pulso)", color: "#9B51E0" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="flex justify-between text-xs text-neutral-500 font-semibold" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <span>{item.label}</span>
                      <span className="text-[#700FA3] font-bold">Estable</span>
                    </div>
                    {/* Simulated Waveform Line Box */}
                    <div className="h-10 bg-neutral-50 rounded-xl border border-neutral-100 relative overflow-hidden flex items-center">
                      <div 
                        className="absolute inset-0 flex items-center opacity-30"
                        style={{
                          backgroundImage: `radial-gradient(circle, ${item.color} 1px, transparent 1px)`,
                          backgroundSize: '12px 12px'
                        }}
                      />
                      {/* Premium Glowing neon wave line representation */}
                      <svg className="w-full h-8 absolute inset-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                        <path 
                          d="M0,5 Q10,0 20,5 T40,5 T60,5 T80,5 T100,5" 
                          fill="none" 
                          stroke={item.color} 
                          strokeWidth="0.8" 
                          className="opacity-80"
                        />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FAQ Accordion Section - Clean Light Editorial Style */}
      <section className="bg-[#fcfafc] py-24 border-b border-neutral-100">
        <div className="w-full max-w-4xl mx-auto px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-[3px] bg-[#700FA3]" />
              <span
                style={{
                  letterSpacing: "0.5px",
                  fontSize: "18px",
                  color: "#700FA3",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                FAQs
              </span>
            </div>

            <h2
              style={{
                margin: 0,
                padding: 0,
                fontSize: "40px",
                fontWeight: "bold",
                lineHeight: "52px",
                color: "#48255A",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Preguntas Frecuentes
            </h2>
          </div>

          {/* Accordion container */}
          <div className="flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-neutral-100 rounded-2xl bg-white shadow-[0_4px_25px_rgba(0,0,0,0.01)] overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-[#700FA3]/5 transition-colors"
                  >
                    <span 
                      className="font-bold text-[#48255A] text-sm md:text-base pr-4"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      {faq.q}
                    </span>
                    <svg
                      className={`w-5 h-5 text-[#FFC107] shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-[300px] border-t border-neutral-100" : "max-h-0"
                    }`}
                  >
                    <div className="p-6 text-sm text-[#525252] font-light leading-relaxed bg-neutral-50/50">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* CTA Final - Styled exactly like the results banner in WhyChooseUs.tsx */}
      <section 
        className="relative overflow-hidden py-24 text-center"
        style={{
          background: "linear-gradient(135deg, #3B1154 0%, #7B18AE 100%)"
        }}
      >
        <div className="w-full max-w-[1450px] mx-auto px-8 flex flex-col items-center relative z-10">
          
          {/* Yellow Divider & Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[3px] bg-[#FFC107]" />
            <span
              style={{
                letterSpacing: "0.5px",
                fontSize: "18px",
                color: "#FFC107",
                fontWeight: "600",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Comience Hoy
            </span>
          </div>

          <h2 
            className="max-w-4xl mb-6" 
            style={{
              color: "#FFFFFF",
              fontSize: "42px",
              fontWeight: "bold",
              lineHeight: "52px",
              textAlign: "center",
              fontFamily: "var(--font-montserrat), sans-serif",
              margin: "0px 0px 24px 0px",
            }}
          >
            ¿Listo para validar la seguridad de su empresa?
          </h2>

          <p 
            className="opacity-90 text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed"
            style={{ 
              color: "#FFFFFF", // Force color to override global CSS leaks
              fontFamily: "var(--font-montserrat), sans-serif" 
            }}
          >
            Agende hoy mismo sus evaluaciones de polígrafo de preempleo, rutina o investigaciones específicas de grado forense y proteja sus recursos.
          </p>

          {/* Centered Primary CTA Button */}
          <a
            href="https://wa.me/593981296179?text=Hola!%20Quiero%20cotizar%20un%20servicio%20de%20poligraf%C3%ADa."
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 bg-[#FFC107] font-bold rounded shadow-[0_4px_25px_rgba(255,193,7,0.15)] hover:bg-[#FFD54F] hover:scale-105 active:scale-95 transition-all duration-300 text-sm md:text-base tracking-wide" 
            style={{ 
              fontFamily: "var(--font-montserrat), sans-serif",
              color: "#411A56" // Force text color to remain dark on yellow background
            }}
          >
            Solicitar Demostración Gratis
          </a>

        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </main>
  );
}
