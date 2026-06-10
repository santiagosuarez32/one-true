"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/calendario-academico" || pathname === "/calendario-academico/";

  // Dynamic styles based on whether we are on the homepage
  const footerBg = isHome ? "bg-[#700FA3] text-white border-t border-[#8c1cc7]" : "bg-white text-[#525252] border-t border-neutral-200";
  const textColorPrimary = isHome ? "text-white" : "text-neutral-800";
  const titleColor = isHome ? "text-[#FFC107]" : "text-[#48255A]";
  const textColorSecondary = isHome ? "text-white/90" : "text-neutral-700";
  const iconColor = isHome ? "text-[#FFC107]" : "text-[#700FA3]";
  const linkHoverColor = isHome ? "hover:text-[#FFC107]" : "hover:text-[#700FA3]";
  const socialIconColor = isHome ? "text-white hover:text-[#FFC107]" : "text-[#700FA3] hover:text-[#5C0B87]";
  const logoFilter = isHome ? "brightness-0 invert" : "";
  const borderBottomClass = isHome ? "border-t border-white/20" : "border-t border-neutral-200";
  const copyTextColor = isHome ? "text-white/60" : "text-neutral-600";
  const copyLinkColor = isHome ? "text-white/60 hover:text-[#FFC107]" : "text-neutral-600 hover:text-[#700FA3]";

  return (
    <footer className={`pt-16 pb-8 w-full ${footerBg}`}>
      <style dangerouslySetInnerHTML={{ __html: `
        .google-review-link {
          color: #FFFFFF !important;
        }
        .google-review-link span {
          color: #FFFFFF !important;
        }
      `}} />
      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-4 md:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 lg:gap-12 mb-16">
          
          {/* Column 1: Logo, Short Description and Socials */}
          <div className="w-full md:w-[28%] flex flex-col items-start text-left">
            {/* Logo */}
            <div className="flex items-center mb-6">
              <img src="/footer.webp" alt="One True Logo" className={`h-24 md:h-32 w-auto object-contain ${logoFilter}`} />
            </div>
            
            <p className={`text-sm md:text-base leading-relaxed font-semibold mb-6 ${textColorPrimary}`} style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Construimos vínculos confiables entre empresas y candidatos
            </p>

            {/* Social Icons Section */}
            <div className="flex flex-col items-start gap-2 w-full">
              <span className={`font-bold text-sm ${titleColor}`} style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Síguenos
              </span>
              <div className="flex items-center gap-6 mt-1">
                {/* LinkedIn */}
                <a href="https://www.linkedin.com/in/david-coli-fiallo-75679a198?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en LinkedIn" className={`transition-colors duration-200 ${socialIconColor}`}>
                  <FaLinkedin className="w-5 h-5" />
                </a>
                {/* Facebook */}
                <a href="https://www.facebook.com/share/1F8T24NNKE/" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Facebook" className={`transition-colors duration-200 ${socialIconColor}`}>
                  <FaFacebook className="w-5 h-5" />
                </a>
                {/* Instagram */}
                <a href="https://www.instagram.com/somosonetrue?igsh=bXNmOWYwaWpsdDVh" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en Instagram" className={`transition-colors duration-200 ${socialIconColor}`}>
                  <FaInstagram className="w-5 h-5" />
                </a>
                {/* YouTube */}
                <a href="https://youtube.com/@somosonetrue?si=8OI3ZQ0A-4OzF_H0" target="_blank" rel="noopener noreferrer" aria-label="Síguenos en YouTube" className={`transition-colors duration-200 ${socialIconColor}`}>
                  <FaYoutube className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Services */}
          <div className="w-full md:w-[32%] flex flex-col items-start text-left">
            <h4 className={`text-lg font-bold mb-6 ${titleColor}`} style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Soluciones
            </h4>
            <ul className="flex flex-col gap-3">
              {[
                { label: 'Pruebas de Polígrafo', href: '/pruebas-poligraficas' },
                { label: 'Vetting', href: '/vetting' },
                { label: 'Estudio de Confiabilidad 360°', href: '/estudio-de-confiabilidad-360' },
                { label: 'Visitas Domiciliarias', href: '/visitas-domiciliarias' },
                { label: 'Pruebas Toxicológicas', href: '/pruebas-toxicologicas' },
                { label: 'Evaluaciones Psicométricas', href: '/evaluaciones-psicometricas' },
                { label: 'Prueba de Honestidad, Ética y Valores', href: '/prueba-de-honestidad-etica-y-valores' }
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className={`transition-colors duration-300 text-sm md:text-base font-semibold ${textColorSecondary} ${linkHoverColor}`}
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div className="w-full md:w-[20%] flex flex-col items-start text-left">
            <h4 className={`text-lg font-bold mb-6 ${titleColor}`} style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Contacto
            </h4>
            <ul className="flex flex-col gap-4">
              <li className={`flex items-center gap-3 text-sm md:text-base font-semibold ${textColorSecondary}`}>
                <svg width="18" height="18" className={`shrink-0 ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                <a href="mailto:info@somosonetrue.com" className={`transition-colors ${textColorSecondary} ${linkHoverColor}`}>info@somosonetrue.com</a>
              </li>
              <li className={`flex items-center gap-3 text-sm md:text-base font-semibold ${textColorSecondary}`}>
                <svg width="18" height="18" className={`shrink-0 ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                <a href="tel:0981296179" className={`transition-colors ${textColorSecondary} ${linkHoverColor}`}>098 129 6179</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Locations */}
          <div className="w-full md:w-[20%] flex flex-col items-start text-left">
            <h4 className={`text-lg font-bold mb-6 ${titleColor}`} style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Localizaciones
            </h4>
            <ul className="flex flex-col gap-4 w-full">
              <li className={`flex items-start gap-3 text-sm md:text-base font-semibold ${textColorSecondary}`}>
                <svg width="18" height="18" className={`mt-1 shrink-0 ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <div>
                  <strong className={`font-bold text-xs block mb-0.5 ${titleColor}`}>Agencia Quito</strong>
                  <span className={`text-xs md:text-sm ${textColorSecondary}`}>Av. Pérez Guerreo OE3-124 y San Gregorio, Instituto de Diagnóstico Médico, tercer piso, oficina #303, Quito-Ecuador.</span>
                </div>
              </li>
              <li className={`flex items-start gap-3 text-sm md:text-base font-semibold ${textColorSecondary}`}>
                <svg width="18" height="18" className={`mt-1 shrink-0 ${iconColor}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <div>
                  <strong className={`font-bold text-xs block mb-0.5 ${titleColor}`}>Agencia Guayaquil</strong>
                  <span className={`text-xs md:text-sm ${textColorSecondary}`}>Urdenor 2, Manzana 219, Solar 9</span>
                </div>
              </li>
            </ul>
          </div>
          
        </div>

        {/* Bottom Section */}
        <div className={`pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs md:text-sm font-semibold ${borderBottomClass}`} style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          <p className={copyTextColor}>© Copyright One True 2026</p>
          <div className="flex gap-6">
            <Link href="#" className={`transition-colors ${copyLinkColor}`}>Política de Privacidad y Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
