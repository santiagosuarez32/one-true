"use client";

import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white pt-16 pb-8 text-[#525252] w-full border-t border-neutral-200">
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-12 mb-16">
          
          {/* Column 1: Logo, Short Description and Socials */}
          <div className="w-full md:w-[38%] flex flex-col items-start text-left">
            {/* Logo */}
            <div className="flex items-center mb-6">
              <img src="/footer.webp" alt="One True Logo" className="h-24 md:h-32 w-auto object-contain" />
            </div>
            
            <p className="text-sm md:text-base text-neutral-800 leading-relaxed font-semibold mb-6" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Construimos vínculos confiables entre empresas y candidatos
            </p>

            {/* Social Icons Section */}
            <div className="flex flex-col items-start gap-2 w-full">
              <span className="font-bold text-[#48255A] text-sm" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Síguenos
              </span>
              <div className="flex items-center gap-6 mt-1">
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/company/somosonetrue" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en LinkedIn" className="text-[#700FA3] hover:text-[#5C0B87] transition-colors duration-200">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/somosonetrue" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Facebook" className="text-[#700FA3] hover:text-[#5C0B87] transition-colors duration-200">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                {/* Twitter / X */}
                <a href="https://x.com/somosonetrue" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Twitter/X" className="text-[#700FA3] hover:text-[#5C0B87] transition-colors duration-200">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/somosonetrue" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Instagram" className="text-[#700FA3] hover:text-[#5C0B87] transition-colors duration-200">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                {/* YouTube */}
                <a href="https://www.youtube.com/@somosonetrue" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en YouTube" className="text-[#700FA3] hover:text-[#5C0B87] transition-colors duration-200">
                  <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                {/* WhatsApp */}
                <a href="https://api.whatsapp.com/send?phone=593981296179" target="_blank" rel="noopener noreferrer" aria-label="Contáctanos por WhatsApp" className="text-[#700FA3] hover:text-[#5C0B87] transition-colors duration-200">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997h-.005c-2.005 0-3.973-.524-5.717-1.52L0 24zm6.59-4.846c1.6-1.077 3.428-1.646 5.37-1.645h.005c5.529 0 10.026-4.486 10.028-9.997.001-2.672-1.039-5.185-2.927-7.078-1.888-1.89-4.398-2.93-7.073-2.93-5.53 0-10.03 4.487-10.033 9.996a9.92 9.92 0 0 0 1.503 5.176l-.993 3.626 3.719-.974a9.96 9.96 0 0 0 4.406 1.028zm8.19-6.702c-.3-.15-1.77-.875-2.045-.975-.275-.1-.475-.15-.675.15-.2.3-.775.975-.95 1.175-.175.2-.35.225-.65.075-3.05-1.525-4.25-2.325-5.975-5.325-.225-.4-.05-.625.1-.775.15-.15.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.244-.588-.49-.508-.675-.518-.175-.008-.375-.01-.575-.01-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5s1.025 2.9 1.175 3.1c.15.2 2.025 3.1 4.9 4.35.685.297 1.22.474 1.637.607.685.218 1.312.188 1.807.114.55-.082 1.77-.725 2.02-1.388.25-.662.25-1.225.175-1.338-.075-.112-.275-.262-.575-.412z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="w-full md:w-[12%] flex flex-col items-start text-left">
            <h4 className="text-lg font-bold mb-6 text-[#48255A]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Navegación
            </h4>
            <ul className="flex flex-col gap-3">
              {['Inicio', 'Servicios', 'Sobre Nosotros', 'Academia'].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="text-neutral-700 hover:text-[#700FA3] transition-colors duration-300 text-sm md:text-base font-semibold"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="w-full md:w-[50%] flex flex-col items-start text-left">
            <h4 className="text-lg font-bold mb-6 text-[#48255A]" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Contacto
            </h4>
            <div className="flex flex-col sm:flex-row gap-6 md:gap-8 w-full">
              {/* Left Sub-column: Email, Phone */}
              <div className="w-full sm:w-auto sm:shrink-0 flex flex-col items-start text-left gap-4">
                <ul className="flex flex-col gap-4">
                  <li className="flex items-center gap-3 text-neutral-700 text-sm md:text-base font-semibold">
                    <svg width="18" height="18" className="text-[#700FA3] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                    <a href="mailto:info@somosonetrue.com" className="text-neutral-700 hover:text-[#700FA3] transition-colors">info@somosonetrue.com</a>
                  </li>
                  <li className="flex items-center gap-3 text-neutral-700 text-sm md:text-base font-semibold">
                    <svg width="18" height="18" className="text-[#700FA3] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                    <a href="tel:0981296179" className="text-neutral-700 hover:text-[#700FA3] transition-colors">098 129 6179</a>
                  </li>
                </ul>
              </div>

              {/* Right Sub-column: Locations */}
              <div className="w-full sm:flex-1 flex flex-col items-start text-left gap-4">
                <ul className="flex flex-col gap-4 w-full">
                  <li className="flex items-start gap-3 text-neutral-700 text-sm md:text-base font-semibold">
                    <svg width="18" height="18" className="text-[#700FA3] mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <div>
                      <strong className="font-bold text-[#48255A] text-xs block mb-0.5">Agencia Quito</strong>
                      <span className="text-xs md:text-sm text-neutral-700">Av. Pérez Guerreo OE3-124 y San Gregorio, Instituto de Diagnóstico Médico, tercer piso, oficina #303, Quito-Ecuador.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-neutral-700 text-sm md:text-base font-semibold">
                    <svg width="18" height="18" className="text-[#700FA3] mt-1 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                    <div>
                      <strong className="font-bold text-[#48255A] text-xs block mb-0.5">Agencia Guayaquil</strong>
                      <span className="text-xs md:text-sm text-neutral-700">Solar 26, Mz. 1022, Las Orquídeas, entre lavandería Perfect Wash y Dash Óptica.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm font-semibold" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          <p className="text-neutral-600">© Copyright One True 2026</p>
          <div className="flex gap-6">
            <Link href="#" className="text-neutral-600 hover:text-[#700FA3] transition-colors">Política de Privacidad y Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
