"use client";

import React from "react";
import Image from "next/image";

export default function Associations() {
  const staticPhotos = [
    { src: "/marcas/16.png", alt: "APA Certification Logo" },
    { src: "/marcas/17.png", alt: "International Association Logo" },
    { src: "/marcas/18.png", alt: "Security Association Logo" }
  ];

  return (
    <section className="bg-white py-20 md:py-24 border-t border-neutral-100">
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-8 md:px-12 lg:px-16 text-center">
        
        {/* Label: Respaldo Institucional Internacional */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-[3px] bg-[#700FA3]" />
          <span
            style={{
              letterSpacing: "0.5px",
              fontSize: "18px",
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
          style={{
            margin: "0 auto 32px auto",
            padding: 0,
            fontSize: "40px",
            fontWeight: "bold",
            lineHeight: "52px",
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

        {/* Centered Grid of Logos (Squared Border Matrix Style) */}
        <div className="flex justify-center">
          <div className="grid grid-cols-3 border-l border-t border-black/10 w-full max-w-2xl">
            {staticPhotos.map((photo, index) => (
              <div
                key={index}
                className="relative aspect-square border-r border-b border-black/10 flex items-center justify-center bg-transparent"
              >
                <div className="relative w-[92%] h-[92%] flex items-center justify-center">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-contain transition-all duration-300 hover:grayscale hover:opacity-60 cursor-pointer"
                    sizes="33vw"
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
