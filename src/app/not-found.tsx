"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-[#700FA3] text-white selection:bg-[#FFC107] selection:text-[#411A56]">
      {/* Navbar */}
      <Navbar />

      {/* Hero / Main 404 Content */}
      <section className="flex-grow relative flex items-center justify-center overflow-hidden pt-36 pb-24 min-h-[75vh]">
        {/* Decorative background blobs matching the brand aesthetics */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#FFC107] opacity-5 rounded-full blur-[100px] -translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4 pointer-events-none" />

        <div className="w-full max-w-4xl mx-auto px-6 text-center z-10 flex flex-col items-center">
          {/* Large Stylized 404 */}
          <div className="relative mb-6">
            <h1 
              className="text-[120px] sm:text-[160px] md:text-[200px] font-black leading-none tracking-tight select-none opacity-20"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                textShadow: "0 0 40px rgba(255,193,7,0.1)"
              }}
            >
              404
            </h1>
            <div 
              className="absolute inset-0 flex items-center justify-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FFC107]"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Upps...
            </div>
          </div>

          {/* Accent Line */}
          <div className="w-16 h-[4px] bg-[#FFC107] mb-8 rounded-full" />

          {/* Message */}
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 max-w-2xl"
            style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}
          >
            Página No Encontrada
          </h2>
          <p 
            className="text-sm sm:text-base md:text-lg text-white/80 font-light mb-10 max-w-lg leading-relaxed"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Lo sentimos, el enlace al que intentas acceder no está disponible, ha cambiado de dirección o ha sido removido temporalmente.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-12">
            <a 
              href="/"
              className="px-8 py-3.5 rounded font-bold text-sm sm:text-base text-[#5F0091] bg-[#FFC107] hover:brightness-110 shadow-lg transition-all duration-300 w-full sm:w-auto text-center"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Volver al inicio
            </a>
            <a 
              href="/cotiza"
              className="px-8 py-3.5 rounded font-bold text-sm sm:text-base text-white border border-white/30 hover:bg-white/10 transition-all duration-300 w-full sm:w-auto text-center"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Cotizar servicio
            </a>
          </div>

          {/* Popular Links Navigation */}
          <div className="border-t border-white/10 pt-8 w-full max-w-xl">
            <p 
              className="text-xs uppercase tracking-widest text-[#FFC107] font-semibold mb-4"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Tal vez te interese visitar:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
              <a href="/pruebas-poligraficas" className="text-white/70 hover:text-white transition-colors hover:underline">Pruebas Poligráficas</a>
              <span className="text-white/20">•</span>
              <a href="/cursos-avanzados-en-poligrafia" className="text-white/70 hover:text-white transition-colors hover:underline">Academia</a>
              <span className="text-white/20">•</span>
              <a href="/blog" className="text-white/70 hover:text-white transition-colors hover:underline">Blog</a>
              <span className="text-white/20">•</span>
              <a href="/podcast" className="text-white/70 hover:text-white transition-colors hover:underline">Podcast</a>
              <span className="text-white/20">•</span>
              <a href="/ebook" className="text-white/70 hover:text-white transition-colors hover:underline">Ebook Gratis</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <FloatingWhatsApp />
    </main>
  );
}
