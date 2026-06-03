"use client";

import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAcademiaOpen, setIsAcademiaOpen] = useState(false);
  const [isAprendeOpen, setIsAprendeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const evaluationsList = [
    { label: "Vetting", href: "/vetting" },
    { label: "Estudio de Confiabilidad 360º", href: "/estudio-de-confiabilidad-360" },
    { label: "Visitas Domiciliarias", href: "/visitas-domiciliarias" },
    { label: "Pruebas Toxicológicas", href: "/pruebas-toxicologicas" },
    { label: "Evaluaciones Psicométricas", href: "/evaluaciones-psicometricas" },
    { label: "Prueba de honestidad ética y valores", href: "/prueba-de-honestidad-etica-y-valores" }
  ];

  const academiaList = [
    { label: "Curso Básico en Poligrafía 400 H", href: "/curso-basico-en-poligrafia" },
    { label: "Cursos Avanzados en Poligrafía", href: "/cursos-avanzados-en-poligrafia" },
    { label: "Formaciones Complementarias", href: "/formaciones-complementarias" },
    { label: "Calendario Académico", href: "/#service-7" }
  ];

  const aprendeList = [
    { label: "Blog", href: "/#recursos" },
    { label: "Podcast", href: "/#podcast" },
    { label: "Ebook", href: "/#ebook" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-8 transition-all duration-500 ${isScrolled
          ? "py-3 bg-[#700FA3] shadow-2xl border-[#9b51e0]/20"
          : "py-6 bg-transparent"
        }`}
    >
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between relative">
        {/* Left Column: Logo */}
        <div className="w-[140px] sm:w-[180px] lg:w-[220px] flex items-center justify-start shrink-0">
          <img src="/navbar.webp" alt="One True Ecuador Logo" className="h-10 sm:h-14 md:h-18 w-auto object-contain" />
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
            
            {/* Dropdown Evaluaciones Accordion wrapper */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <a href="/#services" style={navLinkStyle} className="flex items-center hover:!text-[#FFC107] transition-colors duration-300 lg:!text-[13px] xl:!text-[15px] 2xl:!text-[16px] lg:!px-1.5 xl:!px-3 2xl:!px-3.5">
                Evaluaciones 
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
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 transition-all duration-300 origin-top z-50 ${
                  isDropdownOpen 
                    ? "opacity-100 scale-100 pointer-events-auto translate-y-0" 
                    : "opacity-0 scale-95 pointer-events-none -translate-y-2"
                }`}
              >
                {/* Styled Dropdown Card: Rounded matching the Cotiza gratis buttons (rounded / 4px) & outer borders removed */}
                <div className="bg-white rounded border border-neutral-100 shadow-[0_10px_40px_rgba(0,0,0,0.12)] py-2 overflow-hidden">
                  {evaluationsList.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-2.5 text-xs font-semibold text-[#48255A] hover:bg-[#FFC107] hover:text-[#411A56] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif", textAlign: "left", whiteSpace: "normal" }}
                    >
                      {item.label}
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
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-64 transition-all duration-300 origin-top z-50 ${
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
                      className="block px-4 py-2.5 text-xs font-semibold text-[#48255A] hover:bg-[#FFC107] hover:text-[#411A56] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif", textAlign: "left", whiteSpace: "normal" }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Comunidad */}
            <a href="/comunidad" style={navLinkStyle} className="hover:!text-[#FFC107] transition-colors duration-300 lg:!text-[13px] xl:!text-[15px] 2xl:!text-[16px] lg:!px-1.5 xl:!px-3 2xl:!px-3.5">
              Comunidad
            </a>

            {/* Dropdown Aprende gratis Accordion wrapper */}
            <div 
              className="relative"
              onMouseEnter={() => setIsAprendeOpen(true)}
              onMouseLeave={() => setIsAprendeOpen(false)}
            >
              <a href="/#recursos" style={navLinkStyle} className="flex items-center hover:!text-[#FFC107] transition-colors duration-300 lg:!text-[13px] xl:!text-[15px] 2xl:!text-[16px] lg:!px-1.5 xl:!px-3 2xl:!px-3.5">
                Aprende gratis 
                <svg 
                  className={`w-3 h-3 ml-1.5 transition-transform duration-300 ${isAprendeOpen ? "rotate-180" : ""}`}
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
                className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 w-36 transition-all duration-300 origin-top z-50 ${
                  isAprendeOpen 
                    ? "opacity-100 scale-100 pointer-events-auto translate-y-0" 
                    : "opacity-0 scale-95 pointer-events-none -translate-y-2"
                }`}
              >
                <div className="bg-white rounded border border-neutral-100 shadow-[0_10px_40px_rgba(0,0,0,0.12)] py-2 overflow-hidden">
                  {aprendeList.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      className="block px-4 py-2.5 text-xs font-semibold text-[#48255A] hover:bg-[#FFC107] hover:text-[#411A56] transition-colors duration-200"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif", textAlign: "left", whiteSpace: "normal" }}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>
        </div>

        {/* Right Column: Action Button & Hamburger Toggle */}
        <div className="flex items-center gap-4 justify-end shrink-0">
          <button 
            aria-label="Cotizar gratis servicio de poligrafía y seguridad"
            className="hidden md:block px-6 py-2 bg-[#FFC107] text-[#411A56] font-bold rounded hover:bg-[#FFD54F] transition-colors text-sm whitespace-nowrap"
          >
            Cotiza gratis
          </button>
          
          {/* Hamburger Menu Toggle (visible only on mobile/tablet) */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white hover:text-[#FFC107] focus:outline-none transition-colors p-1 z-50 relative"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? (
              // Close Icon
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Icon
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <div 
        className={`fixed inset-y-0 right-0 z-40 w-full sm:w-80 bg-[#700FA3] border-l border-[#9b51e0]/20 shadow-2xl p-6 sm:p-8 flex flex-col transition-all duration-300 transform lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center mb-8 mt-4">
          <img src="/navbar.webp" alt="One True Ecuador Logo" className="h-10 w-auto object-contain" />
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white hover:text-[#FFC107] focus:outline-none"
            aria-label="Cerrar menú de navegación"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-6 overflow-y-auto pr-2">
          {/* Inicio */}
          <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#FFC107] transition-colors py-2 border-b border-white/10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Inicio
          </a>

          {/* Pruebas Poligráficas */}
          <a href="/pruebas-poligraficas" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#FFC107] transition-colors py-2 border-b border-white/10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Pruebas Poligráficas
          </a>

          {/* Vetting */}
          <a href="/vetting" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#FFC107] transition-colors py-2 border-b border-white/10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Vetting
          </a>

          {/* Confiabilidad 360 */}
          <a href="/estudio-de-confiabilidad-360" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#FFC107] transition-colors py-2 border-b border-white/10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Confiabilidad 360°
          </a>

          {/* Visitas Domiciliarias */}
          <a href="/visitas-domiciliarias" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#FFC107] transition-colors py-2 border-b border-white/10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Visitas Domiciliarias
          </a>

          {/* Pruebas Toxicológicas */}
          <a href="/pruebas-toxicologicas" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#FFC107] transition-colors py-2 border-b border-white/10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Pruebas Toxicológicas
          </a>

          {/* Evaluaciones Psicométricas */}
          <a href="/evaluaciones-psicometricas" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#FFC107] transition-colors py-2 border-b border-white/10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Evaluaciones Psicométricas
          </a>

          {/* Prueba de Honestidad, Ética y Valores */}
          <a href="/prueba-de-honestidad-etica-y-valores" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#FFC107] transition-colors py-2 border-b border-white/10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Prueba de Honestidad, Ética y Valores
          </a>

          {/* Comunidad */}
          <a href="/comunidad" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#FFC107] transition-colors py-2 border-b border-white/10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Comunidad
          </a>

          {/* Blog */}
          <a href="/#recursos" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-white hover:text-[#FFC107] transition-colors py-2 border-b border-white/10" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Blog
          </a>
        </nav>

        {/* Mobile Action Button */}
        <div className="mt-auto">
          <button 
            aria-label="Cotizar gratis servicio de poligrafía y seguridad"
            className="w-full py-3 bg-[#FFC107] text-[#411A56] font-bold rounded hover:bg-[#FFD54F] transition-colors text-base shadow-lg"
          >
            Cotiza gratis
          </button>
        </div>
      </div>
    </header>
  );
}
