"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Ebook() {
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
    <section id="ebook" className="bg-[#fcfafc] py-24 relative overflow-hidden scroll-mt-20">
      {/* Decorative background blobs matching the screenshot vibe but with brand colors */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#700FA3] opacity-5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFC107] opacity-5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-8 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left Column: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[3px] bg-[#700FA3]" />
            <span
              style={{
                letterSpacing: "0.5px",
                fontSize: "18px",
                color: "#700FA3",
                fontWeight: "600",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Ebook gratuito
            </span>
          </div>
          
          <h2
            className="text-3xl lg:text-[40px]"
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
            Guía práctica para saber si estoy contratando un servicio de poligrafía confiable.
          </h2>

          <p className="text-lg text-neutral-600 mb-4 leading-relaxed max-w-lg">
            Descarga nuestro Ebook gratuito con la entrega del mes. Nuestro equipo trabaja constantemente para seguir trayendo nuevos ebooks gratuitos una vez al mes.
          </p>




        </div>

        {/* Right Column: Form Card */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div ref={cardRef} className="bg-white rounded-3xl p-8 md:p-10 shadow-[0_20px_50px_rgba(72,37,90,0.08)] border border-neutral-100 w-full max-w-[550px]">
            
            {/* Ebook Mockup Image Container */}
            <div className="w-full h-[220px] bg-neutral-100 rounded-xl mb-8 relative overflow-hidden flex items-center justify-center">
              {/* Fallback pattern / gradient instead of image so it doesn't look broken */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#700FA3]/10 to-[#FFC107]/10"></div>
              <img 
                src="/blog/1.webp" 
                alt="Portada del Ebook One True: Guía práctica para contratar un servicio de poligrafía confiable en Ecuador" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
              />
            </div>

            {/* Form */}
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Correo" 
                className="w-full px-5 py-4 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:border-[#700FA3] transition-all"
                required
              />
              <input 
                type="tel" 
                placeholder="WhatsApp" 
                className="w-full px-5 py-4 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:border-[#700FA3] transition-all"
                required
              />
              <input 
                type="text" 
                placeholder="¿Qué puesto tienes en tu empresa?" 
                className="w-full px-5 py-4 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:border-[#700FA3] transition-all"
                required
              />
              <input 
                type="text" 
                placeholder="¿A qué se dedica tu empresa?" 
                className="w-full px-5 py-4 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:border-[#700FA3] transition-all"
                required
              />
              <input 
                type="text" 
                placeholder="¿Cuántas personas trabajan en tu empresa?" 
                className="w-full px-5 py-4 rounded-xl border border-neutral-200 bg-neutral-50/50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:border-[#700FA3] transition-all"
                required
              />
              
              <button 
                type="submit"
                aria-label="Descargar u obtener Ebook gratuito de Poligrafía"
                className="w-full mt-2 px-6 py-4 bg-[#700FA3] text-white font-bold rounded-xl hover:bg-[#5a0c82] transition-colors duration-300 text-lg shadow-[0_4px_20px_rgba(112,15,163,0.3)]"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Obtener Ebook Gratis
              </button>
            </form>

          </div>
        </div>

      </div>
    </section>
  );
}
