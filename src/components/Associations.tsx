"use client";

import React from "react";

export default function Associations() {
  const associations = [
    "/marcas/16.png",
    "/marcas/17.png",
    "/marcas/18.png"
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
            margin: "0 auto 50px auto",
            padding: 0,
            fontSize: "30px",
            fontWeight: "bold",
            lineHeight: "42px",
            color: "#48255A",
            textAlign: "center",
            fontFamily: "var(--font-montserrat), sans-serif",
            boxSizing: "border-box",
            maxWidth: "800px",
            width: "100%",
          }}
        >
          Somos miembros activos de las organizaciones más prestigiosas de la industria:
        </h2>

        {/* Logos Grid: 3 centered transparent logos */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 max-w-4xl mx-auto py-4">
          {associations.map((logo, idx) => (
            <div key={idx} className="flex items-center justify-center p-4 bg-white rounded-lg transition-all duration-300 hover:scale-105">
              <img
                src={logo}
                alt={`Asociación ${idx + 1}`}
                className="h-20 md:h-28 w-auto object-contain transition-all duration-300 filter grayscale opacity-75 hover:grayscale-0 hover:opacity-100 flex-shrink-0"
                style={{
                  mixBlendMode: "multiply", // Eliminate any white backgrounds transparently
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
