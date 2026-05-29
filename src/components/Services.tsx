"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (card) {
          gsap.fromTo(
            card,
            {
              x: -80,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%", // Trigger when the top of the card is 85% down the viewport
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  const serviceItems = [
    {
      title: "Pruebas de Polígrafo Profesionales",
      desc: "Certeza técnica con un 95% de exactitud. Revelamos la verdad en procesos críticos de seguridad y confianza.",
      image: "/servicios/1.webp",
      cta: "Ver detalles del servicio",
      href: "/pruebas-poligraficas"
    },
    {
      title: "Vetting (Verificación de Antecedentes)",
      desc: "Proteja la integridad de su empresa desde el primer día. Filtramos riesgos mediante el rastreo exhaustivo en más de 190 bases de datos nacionales e internacionales (Interpol/OFAC) para garantizar contrataciones 100% seguras.",
      image: "/servicios/2.webp",
      cta: "Ver detalles del servicio",
      href: "/vetting"
    },
    {
      title: "Estudio de Confiabilidad 360°",
      desc: "Confirmamos la honestidad y estabilidad de sus candidatos. Validamos trayectorias (laborales y académicas) y realizamos un análisis profundo de salud financiera y endeudamiento en +190 bases de datos para asegurar un equipo confiable y libre de riesgos.",
      image: "/servicios/3.webp",
      cta: "Ver detalles del servicio",
      href: "/estudio-de-confiabilidad-360"
    },
    {
      title: "Visitas Domiciliarias",
      desc: "Evaluamos el entorno socioeconómico y familiar de sus candidatos en el terreno. Prevenimos riesgos de vulnerabilidad y confirmamos la coherencia entre el estilo de vida y el perfil declarado para garantizar contrataciones íntegras.",
      image: "/servicios/4.webp",
      cta: "Ver detalles del servicio",
      href: "/#service-3"
    },
    {
      title: "Pruebas Toxicológicas",
      desc: "Garantice un ambiente laboral seguro y productivo. Detectamos el consumo de sustancias con un 99% de nivel de confianza, asegurando que su equipo humano opere con la sobriedad y responsabilidad que su empresa exige.",
      image: "/servicios/5.webp",
      cta: "Ver detalles del servicio",
      href: "/#service-4"
    },
    {
      title: "Evaluaciones Psicométricas",
      desc: "Análisis profundo de la personalidad, aptitudes, comportamiento ético del personal para asegurar el ajuste al cargo.",
      image: "/servicios/6.webp",
      cta: "Ver detalles del servicio",
      href: "/#service-5"
    },
    {
      title: "Prueba de Honestidad, Ética y Valores",
      desc: "Un entorno empresarial seguro se construye con personas confiables. Nuestra Prueba de Honestidad, Ética y Valores es una herramienta psicométrica avanzada, compuesta por 90 reactivos estratégicos, diseñada para identificar conductas de riesgo y medir la alineación ética de los evaluados de manera ágil y precisa.",
      image: "/servicios/8.webp",
      cta: "Ver detalles del servicio",
      href: "/#service-6"
    },
    {
      title: "Formación en Poligrafía Acreditada por APA",
      desc: "Conviértase en un experto en Poligrafía y evaluador Forense de la Credibilidad. Certifíquese como poligrafista profesional con nuestro programa de 400 horas, diseñado bajo los más altos estándares científicos y avalado internacionalmente por la APA.",
      image: "/servicios/7.webp",
      cta: "Ver formación en poligrafía",
      href: "/#service-7"
    }
  ];

  return (
    <section id="services" className="bg-[#fcfafc] pt-10 pb-24">
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1650px] mx-auto px-4 md:px-6 lg:px-6">
        
        {/* Centered Header Section */}
        <div className="flex flex-col items-center text-center mb-16">
          
          {/* Label Prefix */}
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
              Conoce nuestros servicios
            </span>
          </div>

          {/* H2 Title */}
          <h2
            style={{
              margin: 0,
              padding: 0,
              fontSize: "40px",
              fontWeight: "bold",
              lineHeight: "52px",
              color: "#48255A",
              fontFamily: "var(--font-montserrat), sans-serif",
              boxSizing: "border-box",
              maxWidth: "850px",
              width: "100%",
            }}
          >
            Seleccione la solución que mejor se adapte a sus necesidades de seguridad y confianza
          </h2>

        </div>

        {/* 4-Card Wide Grid Layout (Editorial Style) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {serviceItems.map((item, idx) => (
            <div 
              ref={(el) => { cardsRef.current[idx] = el; }}
              id={`service-${idx}`}
              key={idx}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
                e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
              }}
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.href = item.href;
                }
              }}
              className="relative group flex flex-col bg-white border border-neutral-100 rounded-2xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.02)] transition-all duration-500 cursor-pointer scroll-mt-28"
            >
              {/* Efecto de resplandor morado que sigue al cursor */}
              <div 
                className="pointer-events-none absolute -inset-px z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: 'radial-gradient(500px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(112, 15, 163, 0.15), transparent 40%)'
                }}
              />

              {/* Card Image Cover (Full Bleed on Top/Left/Right) */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100 rounded-t-2xl z-0">
                <img
                  src={item.image}
                  alt={`Servicio de ${item.title} en Ecuador - One True`}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:brightness-75"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80";
                  }}
                />
              </div>

              {/* Text & Button Padding Container */}
              <div className="p-6 flex flex-col flex-1">
                {/* Title (Hover turns morado) */}
                <h3 
                  className="text-xl font-bold mb-5 text-[#48255A] group-hover:text-[#700FA3] hover:text-[#700FA3] transition-colors duration-300"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}
                >
                  <a href={item.href} className="hover:underline focus:outline-none">
                    {item.title}
                  </a>
                </h3>
                
                {/* Description Paragraph */}
                <p 
                  className="text-[#525252] text-sm leading-relaxed mb-6 font-light flex-1"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {item.desc}
                </p>
                
                {/* CTA Button: Styled exactly like the "Cotiza gratis" button but compact & left-aligned */}
                <a
                  href={item.href}
                  aria-label={`${item.cta} para ${item.title}`}
                  className="px-4 py-2 bg-[#FFC107] text-[#411A56] font-bold rounded transition-colors duration-300 text-xs whitespace-nowrap w-auto self-start mt-auto group-hover:bg-[#700FA3] group-hover:text-white flex items-center justify-center"
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
  );
}
