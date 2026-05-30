"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#411A56] pt-16 pb-8 !text-white w-full border-t border-[#700FA3]/30">
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 lg:gap-24 mb-16">
          
          {/* Column 1: Logo and Description */}
          <div className="w-full md:w-5/12 flex flex-col items-start text-left">
            {/* Logo */}
            <div className="flex items-center mb-6">
              <img src="/footer.webp" alt="One True Logo" className="h-24 md:h-32 w-auto object-contain" />
            </div>
            
            <p className="text-sm md:text-base !text-neutral-300 leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Expertos en evaluación forense de credibilidad y gestión de riesgos. Nos enfocamos en lograr resultados confiables y justos que permitan a nuestros clientes avanzar hacia un futuro más estable y seguro.
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="w-full md:w-3/12 flex flex-col items-start text-left">
            <h4 className="text-lg font-bold mb-6 !text-white" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Navegación
            </h4>
            <ul className="flex flex-col gap-3">
              {['Inicio', 'Servicios', 'Sobre Nosotros', 'Academia'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="!text-neutral-300 hover:!text-[#FFC107] transition-colors duration-300 text-sm md:text-base font-light"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact and Socials */}
          <div className="w-full md:w-4/12 flex flex-col items-start text-left">
            <h4 className="text-lg font-bold mb-6 !text-white" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Contacto
            </h4>
            <ul className="flex flex-col gap-4 mb-8">
              <li className="flex items-center gap-3 !text-white text-sm md:text-base font-light">
                <svg width="18" height="18" className="text-[#FFC107] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href="mailto:info@somosonetrue.com" className="!text-white hover:!text-[#FFC107] transition-colors">info@somosonetrue.com</a>
              </li>
              <li className="flex items-center gap-3 !text-white text-sm md:text-base font-light">
                <svg width="18" height="18" className="text-[#FFC107] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <a href="tel:0981296179" className="!text-white hover:!text-[#FFC107] transition-colors">098 129 6179</a>
              </li>
              <li className="flex items-start gap-3 !text-white text-sm md:text-base font-light">
                <svg width="18" height="18" className="text-[#FFC107] mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <div>
                  <strong className="font-semibold !text-white text-xs block mb-0.5">Agencia Quito</strong>
                  <span className="text-xs md:text-sm !text-neutral-300">Av. Pérez Guerreo OE3-124 y San Gregorio, Instituto de Diagnóstico Médico, tercer piso, oficina #303, Quito-Ecuador.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 !text-white text-sm md:text-base font-light">
                <svg width="18" height="18" className="text-[#FFC107] mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <div>
                  <strong className="font-semibold !text-white text-xs block mb-0.5">Agencia Guayaquil</strong>
                  <span className="text-xs md:text-sm !text-neutral-300">Solar 26, Mz. 1022, Las Orquídeas, entre lavandería Perfect Wash y Dash Óptica.</span>
                </div>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {/* Instagram */}
              <a href="https://www.instagram.com/somosonetrue" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Instagram" className="w-10 h-10 bg-[#700FA3]/50 rounded hover:bg-[#700FA3] transition-colors duration-300 flex items-center justify-center !text-white">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              {/* WhatsApp */}
              <a href="https://api.whatsapp.com/send?phone=593981296179" target="_blank" rel="noopener noreferrer" aria-label="Contáctanos por WhatsApp" className="w-10 h-10 bg-[#700FA3]/50 rounded hover:bg-[#700FA3] transition-colors duration-300 flex items-center justify-center !text-white">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
              </a>
            </div>
          </div>
          
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-[#700FA3]/50 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          <p className="!text-neutral-400">© Copyright One True 2026</p>
          <div className="flex gap-6">
            <Link href="#" className="!text-neutral-400 hover:!text-white transition-colors">Política de Privacidad y Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
