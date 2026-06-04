"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Associations() {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { x: -80, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none none"
              }
            }
          );
        }
      });
    });
    return () => ctx.revert();
  }, []);
  const staticPhotos = [
    { src: "/marcas/16.webp", alt: "APA Certification Logo" },
    { src: "/marcas/17.webp", alt: "International Association Logo" },
    { src: "/marcas/18.webp", alt: "Security Association Logo" }
  ];

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 text-center">
        
        {/* Label: Respaldo Institucional Internacional */}
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
            Respaldo Institucional Internacional
          </span>
        </div>

        {/* Text / H2 Title */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] leading-tight sm:leading-snug md:leading-[52px]"
          style={{
            margin: "0 auto 32px auto",
            padding: 0,
            fontWeight: "bold",
            color: "#48255A",
            textAlign: "center",
            fontFamily: "var(--font-montserrat), sans-serif",
            boxSizing: "border-box",
            maxWidth: "850px",
            width: "100%",
          }}
        >
          Somos miembros activos de las organizaciones más prestigiosas de la industria:
        </h2>

        {/* Centered Logos without borders */}
        <div className="flex justify-center mt-8">
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-24 w-full max-w-5xl">
            {staticPhotos.map((photo, index) => (
              <div
                key={index}
                ref={(el) => { cardsRef.current[index] = el; }}
                className="relative flex items-center justify-center bg-transparent"
              >
                <div className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 flex items-center justify-center">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-contain transition-all duration-300 hover:grayscale hover:opacity-60 cursor-pointer"
                    sizes="(max-width: 640px) 128px, (max-width: 768px) 176px, (max-width: 1024px) 224px, 256px"
                    style={{
                      mixBlendMode: "multiply", // Eliminate any white backgrounds transparently
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
