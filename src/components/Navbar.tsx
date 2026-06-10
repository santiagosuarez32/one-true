"use client";

import React, { useState, useEffect } from "react";

interface MobileAccordionProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  items: { label: string; href: string }[];
  onNavigate: () => void;
}

function MobileAccordion({ label, isOpen, onToggle, items, onNavigate }: MobileAccordionProps) {
  return (
    <div className="border-white/5">
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-bold text-white! transition-colors hover:bg-white/10 hover:text-[#FFC107]!"
      >
        {label}
        <svg
          className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{ strokeWidth: 3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="ml-3 flex flex-col gap-0.5 border-l border-white/15 pl-3 py-1">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={onNavigate}
                className="block rounded-md px-3 py-2.5 text-sm font-semibold text-white/80! transition-colors hover:bg-white/10 hover:text-[#FFC107]!"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAcademiaOpen, setIsAcademiaOpen] = useState(false);
  const [isAprendeOpen, setIsAprendeOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const [isBlogPage, setIsBlogPage] = useState(false);

  useEffect(() => {
    const isBlog = typeof window !== 'undefined' && window.location.pathname.includes('/blog/');
    setIsBlogPage(isBlog);
  }, []);

  // Lock body scroll + flag body while the mobile menu is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    document.body.classList.toggle("menu-open", isMobileMenuOpen);
    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("menu-open");
    };
  }, [isMobileMenuOpen]);

  const toggleAccordion = (key: string) =>
    setMobileAccordion((prev) => (prev === key ? null : key));

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileAccordion(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || window.scrollY || document.body.scrollTop;
      setIsScrolled(scrollTop > 40);
    };

    // Check initial scroll position
    handleScroll();

    // Check again after a small delay
    setTimeout(handleScroll, 100);

    // Listen to scroll and lenis-scroll events
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("lenis-scroll", handleScroll, { passive: true });

    // Use a frequent interval as a fallback to catch scroll position changes
    const intervalId = setInterval(handleScroll, 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("lenis-scroll", handleScroll);
      clearInterval(intervalId);
    };
  }, []);

  // Compute if scrolled based on state OR blog page
  const shouldShowScrolledState = isScrolled || isBlogPage;

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
    { label: "Calendario Académico", href: "/calendario-academico" }
  ];

  const aprendeList = [
    { label: "Blog", href: "/blog" },
    { label: "Podcast", href: "/podcast" },
    { label: "Ebook", href: "/ebook" }
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-4 sm:px-6 md:px-8 transition-all duration-500 ${shouldShowScrolledState
          ? "py-3 bg-[#700FA3] shadow-2xl border-[#9b51e0]/20"
          : "py-6 bg-transparent"
        }`}
    >
      {/* Hide the floating WhatsApp button while the mobile menu is open so it
          doesn't overlap the "Cotiza gratis" action at the bottom of the drawer */}
      <style dangerouslySetInnerHTML={{ __html: `
        body.menu-open .wa-fab {
          opacity: 0 !important;
          pointer-events: none !important;
          transition: opacity .2s ease;
        }
      `}} />
      <div className="w-full max-w-[1600px] mx-auto flex items-center justify-between relative">
        {/* Left Column: Logo */}
        <div className="w-[170px] sm:w-[180px] lg:w-[220px] flex items-center justify-start shrink-0">
          <a href="/" aria-label="Ir a la página de inicio de One True" className="inline-flex">
            <img src="/navbar.webp" alt="One True Ecuador Logo" className="h-14 sm:h-14 md:h-18 w-auto object-contain" />
          </a>
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
          <a
            href="/cotiza"
            className="hidden lg:block px-8 py-3 rounded transition-all hover:brightness-110 shadow-lg text-sm whitespace-nowrap"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              lineHeight: "1",
              textAlign: "center",
              fontWeight: "600",
              fill: "#5F0091",
              color: "#5F0091",
              backgroundColor: "#FFC107",
              textDecoration: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cotiza gratis
          </a>

          {/* Hamburger Menu Toggle (visible only on mobile/tablet) - animated morphing icon */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-[60] mr-2 sm:mr-4 flex h-11 w-11 items-center justify-start rounded-lg text-white! focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFC107]/70 transition-colors"
            aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="relative block h-5 w-7">
              <span
                className={`absolute left-0 block h-[3px] w-7 rounded-full bg-white transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 block h-[3px] w-7 -translate-y-1/2 rounded-full bg-white transition-all duration-200 ease-in-out ${
                  isMobileMenuOpen ? "scale-x-0 opacity-0" : "scale-x-100 opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[3px] w-7 rounded-full bg-white transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      <div
        onClick={closeMobileMenu}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-[88%] max-w-sm flex-col bg-[#5C0B87] shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "linear-gradient(160deg, #5C0B87 0%, #45086a 100%)" }}
      >
        {/* Drawer Header (close is handled by the morphing hamburger which stays on top) */}
        <div className="flex shrink-0 items-center border-b border-white/10 px-6 py-5">
          <a href="/" onClick={closeMobileMenu} aria-label="Ir a la página de inicio de One True" className="inline-flex">
            <img src="/navbar.webp" alt="One True Ecuador Logo" className="h-9 w-auto object-contain" />
          </a>
        </div>

        {/* Scrollable Links */}
        <nav className="flex-1 overflow-y-auto overscroll-contain px-4 py-4" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          <a href="/" onClick={closeMobileMenu} className="block rounded-lg px-3 py-3 text-base font-bold text-white! transition-colors hover:bg-white/10 hover:text-[#FFC107]!">
            Inicio
          </a>
          <a href="/pruebas-poligraficas" onClick={closeMobileMenu} className="block rounded-lg px-3 py-3 text-base font-bold text-white! transition-colors hover:bg-white/10 hover:text-[#FFC107]!">
            Pruebas Poligráficas
          </a>

          {/* Evaluaciones accordion */}
          <MobileAccordion
            label="Evaluaciones"
            isOpen={mobileAccordion === "evaluaciones"}
            onToggle={() => toggleAccordion("evaluaciones")}
            items={evaluationsList}
            onNavigate={closeMobileMenu}
          />

          {/* Academia accordion */}
          <MobileAccordion
            label="Academia"
            isOpen={mobileAccordion === "academia"}
            onToggle={() => toggleAccordion("academia")}
            items={academiaList}
            onNavigate={closeMobileMenu}
          />

          <a href="/comunidad" onClick={closeMobileMenu} className="block rounded-lg px-3 py-3 text-base font-bold text-white! transition-colors hover:bg-white/10 hover:text-[#FFC107]!">
            Comunidad
          </a>

          {/* Aprende gratis accordion */}
          <MobileAccordion
            label="Aprende gratis"
            isOpen={mobileAccordion === "aprende"}
            onToggle={() => toggleAccordion("aprende")}
            items={aprendeList}
            onNavigate={closeMobileMenu}
          />
        </nav>

        {/* Sticky Action Button */}
        <div className="shrink-0 border-t border-white/10 p-5">
          <a
            href="/cotiza"
            onClick={closeMobileMenu}
            aria-label="Cotizar gratis servicio de poligrafía y seguridad"
            className="block w-full rounded py-3.5 text-base shadow-lg transition-all hover:brightness-110"
            style={{
              fontFamily: "var(--font-montserrat), sans-serif",
              lineHeight: "1",
              fontWeight: "600",
              color: "#5F0091",
              backgroundColor: "#FFC107",
              textDecoration: "none",
              textAlign: "center",
            }}
          >
            Cotiza gratis
          </a>
        </div>
      </div>
    </header>
  );
}
