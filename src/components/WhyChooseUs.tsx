"use client";

import React, { useState, useEffect, useRef } from "react";

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = "", duration = 2000 }: CounterProps) {
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
      
      // Easing function: easeOutQuad
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
    <div 
      ref={elementRef} 
      className="text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-black mb-2 select-none tracking-tight"
      style={{ 
        color: "#FFC107", 
        lineHeight: "1",
        fontFamily: "var(--font-montserrat), sans-serif" 
      }}
    >
      {count.toLocaleString("es-ES")}{suffix}
    </div>
  );
}

export default function WhyChooseUs() {
  const results = [
    {
      target: 12,
      suffix: "+",
      desc: "Años de excelencia técnica bajo estándares globales."
    },
    {
      target: 10000,
      suffix: " +",
      desc: "Evaluaciones ejecutadas con precisión científica."
    },
    {
      target: 95,
      suffix: "%",
      desc: "De Exactitud: Certeza técnica en cada informe entregado."
    },
    {
      target: 24,
      suffix: "H",
      desc: "Garantizamos resultados precisos en 24 horas o menos, eliminando la incertidumbre y agilizando sus procesos."
    }
  ];

  return (
    <section 
      className="relative overflow-hidden py-20 md:py-24 text-center"
      style={{
        background: "linear-gradient(135deg, #3B1154 0%, #7B18AE 100%)"
      }}
    >
      <div className="w-full max-w-[1450px] mx-auto px-4 md:px-6 flex flex-col items-center">
        
        {/* Yellow Prefix Divider & Label (Matching exact styling of Services title but in yellow) */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-[3px] bg-[#FFC107]" />
          <span
            className="text-sm sm:text-base md:text-[18px]"
            style={{
              letterSpacing: "0.5px",
              color: "#FFC107",
              fontWeight: "600",
              fontFamily: "var(--font-montserrat), sans-serif",
            }}
          >
            Nuestros resultados
          </span>
        </div>

        {/* Title Heading - Forced color to white to completely bypass aggressive global CSS style leaks */}
        <h2 
          className="text-fluid-h2" 
          style={{
            color: "#FFFFFF",
            fontWeight: "bold",
            textAlign: "center",
            fontFamily: "var(--font-montserrat), sans-serif",
            margin: "0 auto 48px auto",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          Información que impacta la contratación de las empresas
        </h2>

        {/* Counters Row Layout - 4-column responsive grid mapping perfectly on the panoramic width */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6 w-full mb-14">
          {results.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center px-4">
              {/* Dynamic Animated Counter */}
              <AnimatedCounter end={item.target} suffix={item.suffix} />
              
              {/* Description Label - Explicitly set white text to defeat global CSS p, span, li, a { color: #411A56 } leaks */}
              <p 
                className="leading-relaxed max-w-[250px] mx-auto"
                style={{ 
                  color: "#FFFFFF", 
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "15px",
                  fontWeight: "600",
                  textAlign: "center",
                  opacity: 0.9
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Centered Primary CTA Button */}
        <a
          href="/cotiza"
          aria-label="Contactar a un experto ahora"
          className="px-8 py-3 rounded transition-all hover:brightness-110 shadow-lg text-sm md:text-base inline-block"
          style={{
            fontFamily: "var(--font-montserrat), sans-serif",
            lineHeight: "1",
            textAlign: "center",
            fontWeight: "600",
            fill: "#5F0091",
            color: "#5F0091",
            backgroundColor: "#FFC107",
            display: "inline-block",
            textDecoration: "none",
            border: "none",
            cursor: "pointer",
          }}
        >
          Contactar a un experto ahora
        </a>

      </div>
    </section>
  );
}
