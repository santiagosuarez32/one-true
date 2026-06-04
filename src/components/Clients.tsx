"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Clients() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);
  // 15 logos from public/marcas (1.webp to 15.webp)
  const logos = Array.from({ length: 15 }, (_, i) => `/marcas/${i + 1}.webp`);

  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 text-center">
        
        {/* Label: Algunos de nuestros clientes */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-[3px] bg-[#700FA3]" />
          <span
            className="text-sm sm:text-base md:text-[18px]"
            style={{
              letterSpacing: "0.5px",
              color: "#700FA3", // Premium brand purple
              fontWeight: "600",
              fontFamily: "var(--font-montserrat), sans-serif",
            }}
          >
            Algunos de nuestros clientes
          </span>
        </div>

        {/* H2 Title */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight sm:leading-snug md:leading-[52px]"
          style={{
            margin: "0 auto 50px auto",
            padding: 0,
            fontWeight: "bold",
            color: "#48255A",
            textAlign: "center",
            fontFamily: "var(--font-montserrat), sans-serif",
            boxSizing: "border-box",
            maxWidth: "680px",
            width: "100%",
          }}
        >
          Empresas que redujeron sus riesgo con nuestras soluciones
        </h2>

        {/* Inline CSS styles for the high-performance marquee */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
          }
          .marquee-content {
            display: flex;
            flex-shrink: 0;
            animation: marquee 20s linear infinite;
          }
        `}} />

        {/* Infinite Loop Marquee Container */}
        <div ref={cardRef} className="relative w-full overflow-hidden py-4 flex">
          {/* Symmetrical visual fade masks at the left/right edges for studio finish */}
          <div className="absolute inset-y-0 left-0 w-10 sm:w-20 md:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-10 sm:w-20 md:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="marquee-track">
            {/* First Set of Logos */}
            <div className="marquee-content gap-6 sm:gap-10 pr-6 sm:pr-10 items-center flex-nowrap">
              {logos.map((logo, idx) => (
                <img
                  key={`logo-1-${idx}`}
                  src={logo}
                  alt={`Marca ${idx + 1}`}
                  className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto object-contain transition-all duration-300 filter grayscale opacity-65 hover:grayscale-0 hover:opacity-100 flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ))}
            </div>
            {/* Second Set of Logos (Duplicate to complete infinite scroll seamless seam) */}
            <div className="marquee-content gap-6 sm:gap-10 pr-6 sm:pr-10 items-center flex-nowrap">
              {logos.map((logo, idx) => (
                <img
                  key={`logo-2-${idx}`}
                  src={logo}
                  alt={`Marca ${idx + 1}-duplicate`}
                  className="h-20 sm:h-24 md:h-32 lg:h-40 w-auto object-contain transition-all duration-300 filter grayscale opacity-65 hover:grayscale-0 hover:opacity-100 flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Centered CTA Button under Marquee */}
        <div className="mt-12 flex justify-center">
          <a
            href="/cotiza"
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
            Quiero proteger mi empresa
          </a>
        </div>

      </div>
    </section>
  );
}
