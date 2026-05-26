"use client";

import React from "react";

export default function Clients() {
  // 15 logos from public/marcas (1.png to 15.png)
  const logos = Array.from({ length: 15 }, (_, i) => `/marcas/${i + 1}.png`);

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-8 md:px-12 lg:px-16 text-center">
        
        {/* Label: Algunos de nuestros clientes */}
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
            Algunos de nuestros clientes
          </span>
        </div>

        {/* H2 Title */}
        <h2
          style={{
            margin: "0 auto 50px auto",
            padding: 0,
            fontSize: "40px",
            fontWeight: "bold",
            lineHeight: "52px",
            color: "#48255A",
            textAlign: "center",
            fontFamily: "var(--font-montserrat), sans-serif",
            boxSizing: "border-box",
            maxWidth: "680px",
            width: "100%",
          }}
        >
          Empresas que redujeron sus riesgo con nuestros servicios
        </h2>

        {/* Inline CSS styles for the high-performance marquee */}
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            width: max-content;
            animation: marquee 35s linear infinite;
          }
          .animate-marquee:hover {
            animation-play-state: paused;
          }
        `}} />

        {/* Infinite Loop Marquee Container */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Symmetrical visual fade masks at the left/right edges for studio finish */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="animate-marquee gap-10 flex items-center">
            {/* First Set of Logos */}
            {logos.map((logo, idx) => (
              <img
                key={`logo-1-${idx}`}
                src={logo}
                alt={`Marca ${idx + 1}`}
                className="h-28 md:h-44 w-auto object-contain transition-all duration-300 filter grayscale opacity-65 hover:grayscale-0 hover:opacity-100 flex-shrink-0"
                style={{
                  mixBlendMode: "multiply", // Strip any background colors automatically
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ))}
            {/* Second Set of Logos (Duplicate to complete infinite scroll seamless seam) */}
            {logos.map((logo, idx) => (
              <img
                key={`logo-2-${idx}`}
                src={logo}
                alt={`Marca ${idx + 1}-duplicate`}
                className="h-28 md:h-44 w-auto object-contain transition-all duration-300 filter grayscale opacity-65 hover:grayscale-0 hover:opacity-100 flex-shrink-0"
                style={{
                  mixBlendMode: "multiply", // Strip any background colors automatically
                }}
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ))}
          </div>
        </div>

        {/* Centered CTA Button under Marquee */}
        <div className="mt-12 flex justify-center">
          <button 
            className="px-8 py-3.5 bg-[#FFC107] text-[#700FA3] font-bold rounded shadow-[0_4px_25px_rgba(255,193,7,0.15)] hover:bg-[#FFD54F] hover:scale-105 active:scale-95 transition-all duration-300 text-sm md:text-base tracking-wide"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Quiero proteger mi empresa
          </button>
        </div>

      </div>
    </section>
  );
}
