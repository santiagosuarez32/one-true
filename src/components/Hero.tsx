"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const slides = [
  {
    id: 1,
    title: (
      <>
        Garantiza la honestidad de tu equipo con <strong style={{ fontWeight: "800", textDecoration: "underline", textDecorationColor: "#FFC107", textUnderlineOffset: "6px" }}>pruebas de polígrafo</strong>, minimizando los riesgos de fraude internos.
      </>
    ),
    subtitle: "Brindamos certeza total en tus procesos de contratación, investigaciones de incidentes y evaluaciones de rutina con tecnología de última generación.",
    cta: "Cotizar mi evaluación ahora",
    image: "/hero/slider-1.png",
    filter: "none"
  },
  {
    id: 2,
    title: (
      <>
        Te ayudamos a construir <strong style={{ fontWeight: "800" }}>equipos confiables y seguros</strong>.
      </>
    ),
    subtitle: (
      <>
        Reduce hasta el <strong style={{ fontWeight: "700", textDecoration: "underline", textDecorationColor: "#FFC107", textUnderlineOffset: "4px" }}>95%</strong> de los riesgos con nuestras metodologías validadas: Estudios de seguridad, Verificaciones de Antecedentes, Verificación laboral, Pruebas toxicológicas, Visitas domiciliarias con nuestro sistema de verificación 360°.
      </>
    ),
    cta: "Contactar a un experto ahora",
    image: "/hero/slider-2.png",
    filter: "none"
  },
  {
    id: 3,
    title: (
      <>
        Inicia tu carrera como <strong style={{ fontWeight: "800" }}>Poligrafista Certificado con aval de la APA</strong>.
      </>
    ),
    subtitle: (
      <>
        Fórmate en <strong style={{ fontWeight: "700", textDecoration: "underline", textDecorationColor: "#FFC107", textUnderlineOffset: "4px" }}>One True Polygraph Training Academy</strong>, la comunidad de expertos más grande de Latinoamérica. Obtén una certificación reconocida globalmente con métodos científicos de última generación.
      </>
    ),
    cta: "Certificarme como Experto",
    image: "/hero/slider-3.jpg",
    filter: "none"
  }
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // 5-second Auto-rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Initial Load Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textContainerRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out", delay: 0.2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Images Cross-fade */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className="absolute inset-0 z-0 transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${slide.image}')`,
            backgroundPosition: "right top",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundColor: "#700FA3",
            filter: slide.filter,
            opacity: activeIndex === idx ? 1 : 0,
          }}
        />
      ))}

      {/* Purple Overlay with smooth cubic-bezier easing gradient */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "linear-gradient(to right, #700FA3 0%, #700FA3 35%, rgba(112, 15, 163, 0.9) 48%, rgba(112, 15, 163, 0.6) 60%, rgba(112, 15, 163, 0.3) 72%, rgba(112, 15, 163, 0.05) 86%, transparent 100%)"
        }}
      />
      
      {/* Centered Grid Container matching a wider content boundary */}
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] px-8 md:px-12 lg:px-16 z-10 flex justify-start items-center mt-16">
        <div 
          ref={textContainerRef}
          className="relative w-full max-w-xl md:max-w-2xl text-left min-h-[380px] md:min-h-[290px] flex items-center"
        >
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-y-0 left-0 w-full flex flex-col justify-center transition-all duration-1000 ease-in-out ${
                activeIndex === idx 
                  ? "opacity-100 translate-x-0 pointer-events-auto" 
                  : "opacity-0 -translate-x-8 pointer-events-none"
              }`}
            >
              {/* Slide Title */}
              <h1 
                className="mb-6"
                style={{
                  WebkitTextSizeAdjust: "100%",
                  WebkitTapHighlightColor: "transparent",
                  textAlign: "start",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  margin: "0 0 28px 0",
                  padding: 0,
                  fontSize: "46px",
                  fontWeight: "600",
                  lineHeight: "1.1",
                  color: "#FFFFFF",
                  textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18), 0 8px 16px rgba(0,0,0,0.2)",
                }}
              >
                {slide.title}
              </h1>

              {/* Slide Subtitle */}
              <p 
                className="mb-10"
                style={{
                  WebkitTextSizeAdjust: "100%",
                  WebkitTapHighlightColor: "transparent",
                  textAlign: "start",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  margin: "0 0 40px 0",
                  padding: 0,
                  fontSize: "18px",
                  fontWeight: "500",
                  lineHeight: "30px",
                  color: "#FFFFFF",
                }}
              >
                {slide.subtitle}
              </p>

              {/* Slide CTA Buttons */}
              <div className="flex flex-wrap items-center gap-6">
                <button 
                  className="px-8 py-3 rounded transition-all hover:brightness-110 shadow-lg"
                  style={{
                    WebkitTextSizeAdjust: "100%",
                    WebkitTapHighlightColor: "transparent",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    lineHeight: "1",
                    textAlign: "center",
                    fontSize: "14px",
                    fontWeight: "600",
                    fill: "#5F0091",
                    color: "#5F0091",
                    backgroundColor: "#FFC107",
                    display: "inline-block",
                    textDecoration: "inherit",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <span className="elementor-button-text">{slide.cta}</span>
                </button>
                <a 
                  href="#nosotros" 
                  className="hover:underline transition-all"
                  style={{
                    WebkitTextSizeAdjust: "100%",
                    WebkitTapHighlightColor: "transparent",
                    fontFamily: "var(--font-montserrat), sans-serif",
                    textAlign: "start",
                    fontWeight: "600",
                    backgroundColor: "transparent",
                    outline: "none",
                    boxShadow: "none",
                    textDecoration: "none",
                    fontSize: "inherit",
                    lineHeight: "inherit",
                    color: "#FFFFFF",
                  }}
                >
                  Leer más acerca de nosotros
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Slider Selectors at the bottom */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] px-8 md:px-12 lg:px-16 z-20 flex justify-start items-center gap-6">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className="group cursor-pointer focus:outline-none py-2"
            style={{ width: "60px" }}
          >
            {/* Thin bar indicator */}
            <div className="relative w-full h-[3px] bg-white/20 rounded-full overflow-hidden transition-all duration-300 group-hover:bg-white/40">
              <div 
                className="absolute top-0 left-0 h-full bg-[#FFC107] transition-all duration-300 ease-out"
                style={{
                  width: activeIndex === idx ? "100%" : "0%",
                }}
              />
            </div>
          </button>
        ))}
      </div>

    </section>
  );
}
