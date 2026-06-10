"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
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
    <section id="podcast" className="bg-white py-16 md:py-24 overflow-hidden relative scroll-mt-20">
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col md:flex-row items-center gap-12 lg:gap-20">
        
        {/* Left: Podcast Image with Link and Play Button */}
        <div ref={cardRef} className="w-full md:w-1/2 relative flex justify-center">
          <div className="absolute inset-0 bg-[#700FA3] blur-[100px] opacity-20 rounded-full"></div>
          <Link
            href="/podcast"
            aria-label="Escuchar Podcast"
            className="group relative w-full max-w-[500px] aspect-[4/3] rounded-[20px] overflow-hidden shadow-2xl border-2 border-[#FFC107] block transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src="/blog/PODCAST.webp"
              alt="Podcast One True: Beneficio de un estudio de confiabilidad en Ecuador"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/35 transition-colors duration-300">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-[#FFC107] text-[#5F0091] shadow-lg transition-all duration-300 group-hover:scale-110">
                {/* Ripple outer effects */}
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#FFC107] opacity-75 animate-ping"></span>
                {/* Play SVG icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 relative z-10 translate-x-[2px]"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
            {/* Badge */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold tracking-wider px-4 py-1.5 rounded-full uppercase z-10">
              Podcast
            </div>
          </Link>
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
            className="text-fluid-h3"
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
            En este capítulo abordaremos de manera muy puntual las etapas de las pruebas de polígrafo establecidas por los estándares internacionales de práctica.
          </h2>

          <p className="text-lg text-neutral-600 mb-10 leading-relaxed max-w-lg">
            Descubre en este episodio cómo un estudio de confiabilidad puede proteger tu empresa, reducir riesgos y asegurar que estás tomando las mejores decisiones en la gestión de tu talento humano.
          </p>
          
          <Link
            href="/podcast"
            aria-label="Escucha todos los capítulos del podcast de detección de mentiras y poligrafía"
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
            Escucha todos los capítulos aquí
          </Link>
        </div>

      </div>
    </section>
  );
}
