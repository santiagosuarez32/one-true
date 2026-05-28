"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAcademiaOpen, setIsAcademiaOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle = {
    WebkitTextSizeAdjust: "100%",
    textAlign: "left" as const,
    letterSpacing: "0px",
    listStyle: "none",
    WebkitTapHighlightColor: "rgba(0,0,0,0)",
    backgroundColor: "transparent",
    outline: "none",
    boxShadow: "none",
    textDecoration: "none",
    position: "relative" as const,
    alignItems: "center",
    display: "flex",
    lineHeight: "20px",
    transition: ".4s",
    padding: "13px 14px",
    flexGrow: 1,
    whiteSpace: "nowrap" as const,
    fontFamily: "var(--font-montserrat), sans-serif",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#FFFFFF",
    fill: "#FFFFFF",
  };

  const servicesList = [
    "Pruebas de Polígrafo Profesionales.",
    "Vetting (Verificación de Antecedentes)",
    "Estudio de Confiabilidad 360°",
    "Visitas Domiciliarias",
    "Pruebas Toxicológicas",
    "Evaluaciones Psicométricas",
    "Formación en Poligrafía Acreditada por APA"
  ];

  const academiaList = [
    { label: "Curso Básico", href: "/#service-7" },
    { label: "Curso Avanzado de Poligrafía", href: "/#service-7" },
    { label: "Formaciones Complementarias", href: "/#service-7" },
    { label: "Calendario Académico", href: "/#service-7" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-8 transition-all duration-500 ${isScrolled
          ? "py-3 bg-[#700FA3] shadow-2xl border-[#9b51e0]/20"
          : "py-6 bg-transparent"
        }`}
    >
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between relative">
        {/* Left Column: Logo */}
        <div className="w-[180px] lg:w-[220px] flex items-center justify-start shrink-0">
          <img src="/navbar.png" alt="Globalwork Logo" className="h-14 md:h-18 w-auto object-contain" />
        </div>

        {/* Centered Column: Links */}
        <div className="hidden lg:flex items-center justify-center flex-1">
          <nav className="flex items-center">
            {/* Inicio */}
            <a href="/" style={navLinkStyle} className="hover:!text-[#FFC107] transition-colors duration-300 lg:!text-[13px] xl:!text-[15px] 2xl:!text-[16px] lg:!px-1.5 xl:!px-3 2xl:!px-3.5">
              Inicio
            </a>

            {/* Pruebas Poligráficas */}
            <a href="/pruebas-poligraficas" style={navLinkStyle} className="hover:!text-[#FFC107] transition-colors duration-300 lg:!text-[13px] xl:!text-[15px] 2xl:!text-[16px] lg:!px-1.5 xl:!px-3 2xl:!px-3.5">
              Pruebas Poligráficas
            </a>
            
            {/* Dropdown Servicios Accordion wrapper */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <a href="/#services" style={navLinkStyle} className="flex items-center hover:!text-[#FFC107] transition-colors duration-300 lg:!text-[13px] xl:!text-[15px] 2xl:!text-[16px] lg:!px-1.5 xl:!px-3 2xl:!px-3.5">
                Servicios 
                <svg 
                  className={`w-3 h-3 ml-1.5 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ strokeWidth: 4 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </a>

              {/* Dropdown Menu Overlay - Wrapped with padding-top bridge to guarantee continuous hover focus */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80 transition-all duration-300 origin-top z-50 ${
                  isDropdownOpen 
                    ? "opacity-100 scale-100 pointer-events-auto translate-y-0" 
                    : "opacity-0 scale-95 pointer-events-none -translate-y-2"
                }`}
              >
                {/* Styled Dropdown Card: Rounded matching the Cotiza gratis buttons (rounded / 4px) & outer borders removed */}
                <div className="bg-white rounded border border-neutral-100 shadow-[0_10px_40px_rgba(0,0,0,0.12)] py-2 overflow-hidden">
                  {servicesList.map((service, index) => (
                    <a
                      key={index}
                      href={`/#service-${index}`}
                      className="block px-6 py-2.5 text-xs font-semibold text-[#48255A] hover:bg-[#FFC107] hover:text-[#411A56] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif", textAlign: "left", whiteSpace: "normal" }}
                    >
                      {service}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Dropdown Academia Accordion wrapper */}
            <div 
              className="relative"
              onMouseEnter={() => setIsAcademiaOpen(true)}
              onMouseLeave={() => setIsAcademiaOpen(false)}
            >
              <a href="/#service-7" style={navLinkStyle} className="flex items-center hover:!text-[#FFC107] transition-colors duration-300 lg:!text-[13px] xl:!text-[15px] 2xl:!text-[16px] lg:!px-1.5 xl:!px-3 2xl:!px-3.5">
                Academia 
                <svg 
                  className={`w-3 h-3 ml-1.5 transition-transform duration-300 ${isAcademiaOpen ? "rotate-180" : ""}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ strokeWidth: 4 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </a>

              {/* Dropdown Menu Overlay */}
              <div 
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-80 transition-all duration-300 origin-top z-50 ${
                  isAcademiaOpen 
                    ? "opacity-100 scale-100 pointer-events-auto translate-y-0" 
                    : "opacity-0 scale-95 pointer-events-none -translate-y-2"
                }`}
              >
                <div className="bg-white rounded border border-neutral-100 shadow-[0_10px_40px_rgba(0,0,0,0.12)] py-2 overflow-hidden">
                  {academiaList.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-6 py-2.5 text-xs font-semibold text-[#48255A] hover:bg-[#FFC107] hover:text-[#411A56] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif", textAlign: "left", whiteSpace: "normal" }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Comunidad */}
            <a href="/#podcast" style={navLinkStyle} className="hover:!text-[#FFC107] transition-colors duration-300 lg:!text-[13px] xl:!text-[15px] 2xl:!text-[16px] lg:!px-1.5 xl:!px-3 2xl:!px-3.5">
              Comunidad
            </a>

            {/* Cotiza aquí */}
            <a 
              href="https://wa.me/593981296179?text=Hola!%20Quiero%20cotizar%20un%20servicio%20de%20poligraf%C3%ADa." 
              target="_blank" 
              rel="noopener noreferrer" 
              style={navLinkStyle} 
              className="hover:!text-[#FFC107] transition-colors duration-300 lg:!text-[13px] xl:!text-[15px] 2xl:!text-[16px] lg:!px-1.5 xl:!px-3 2xl:!px-3.5"
            >
              Cotiza aquí
            </a>

            {/* Aprende gratis */}
            <a href="/#recursos" style={navLinkStyle} className="hover:!text-[#FFC107] transition-colors duration-300 lg:!text-[13px] xl:!text-[15px] 2xl:!text-[16px] lg:!px-1.5 xl:!px-3 2xl:!px-3.5">
              Aprende gratis
            </a>
          </nav>
        </div>

        {/* Right Column: Action Button */}
        <div className="w-[180px] xl:w-[280px] flex justify-end shrink-0">
          <button className="hidden md:block px-6 py-2 bg-[#FFC107] text-[#411A56] font-bold rounded hover:bg-[#FFD54F] transition-colors text-sm whitespace-nowrap">
            Cotiza gratis
          </button>
        </div>
      </div>
    </header>
  );
}
