"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Podcast() {
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
  return (
    <section id="podcast" className="bg-[#fcfafc] py-16 md:py-24 border-t border-neutral-100 overflow-hidden relative scroll-mt-20">
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left: Podcast Image (Static) */}
        <div ref={cardRef} className="w-full md:w-1/2 relative flex justify-center">
          <div className="absolute inset-0 bg-[#700FA3] blur-[100px] opacity-20 rounded-full"></div>
          <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/50">
            <img
              src="/blog/PODCAST.webp"
              alt="Podcast One True: Beneficio de un estudio de confiabilidad en Ecuador"
              className="w-full h-full object-cover"
            />
            {/* Badge */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold tracking-wider px-4 py-1.5 rounded-full uppercase">
              Podcast
            </div>
          </div>
        </div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[3px] bg-[#700FA3]" />
            <span
              className="text-sm sm:text-base md:text-[18px]"
              style={{
                letterSpacing: "0.5px",
                color: "#700FA3",
                fontWeight: "600",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Podcast
            </span>
          </div>
          
          <h2
            className="text-2xl sm:text-3xl lg:text-[40px]"
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
            Podcast en el que te cuento sobre el maravilloso mundo de la detección de mentiras.
          </h2>

          <p className="text-lg text-neutral-600 mb-10 leading-relaxed max-w-lg">
            Descubre en este episodio cómo un estudio de confiabilidad puede proteger tu empresa, reducir riesgos y asegurar que estás tomando las mejores decisiones en la gestión de tu talento humano.
          </p>
          
          <button
            aria-label="Escuchar el episodio del podcast ahora sobre detección de mentiras y poligrafía"
            className="px-8 py-4 bg-[#FFC107] text-[#411A56] font-bold rounded flex items-center gap-3 transition-all duration-300 hover:bg-[#700FA3] hover:text-[#FFC107] shadow-[0_4px_20px_rgba(255,193,7,0.2)] hover:shadow-[0_4px_25px_rgba(112,15,163,0.3)] hover:-translate-y-1"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Escuchar ahora
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
               <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
               <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
            </svg>
          </button>
        </div>

      </div>
    </section>
  );
}
