"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Breadcrumbs from "@/components/Breadcrumbs";
import Link from "next/link";

interface Course {
  id: string;
  title: string;
  desc: string;
  image: string;
  href: string;
  published: boolean;
}

interface CalendarIntake {
  id: string;
  title: string;
  courseId: string;
  category: string;
  badgeText: string;
  badgeColor: string;
  dateDisplay: string;
  durationDisplay: string;
  year: number;
  modalityType: string;
  durationType: string;
  isFeatured: boolean;
  brochureUrl?: string;
  brochureFileName?: string;
  href: string;
  published: boolean;
  sortOrder: number;
  buttonType?: string;
  brochureSize?: string;
}

interface CalendarioClientProps {
  initialCourses: Course[];
  initialIntakes: CalendarIntake[];
}

export default function CalendarioClient({ initialCourses, initialIntakes }: CalendarioClientProps) {
  const [yearFilter, setYearFilter] = useState<string>("todos");
  const [modalityFilter, setModalityFilter] = useState<string>("todos");
  const [durationFilter, setDurationFilter] = useState<string>("todos");

  // Merge scheduled dates with current CMS course information dynamically
  const publishedIntakes = (initialIntakes || []).filter(i => i.published);

  const mergedIntakes = publishedIntakes.map(intake => {
    const matched = initialCourses.find(c => c.id === intake.courseId);
    if (matched) {
      return {
        ...intake,
        title: intake.title || matched.title,
        href: intake.href || matched.href
      };
    }
    return intake;
  });

  const handleDownload = async (e: React.MouseEvent, url: string, defaultTitle: string, customFileName?: string) => {
    e.preventDefault();
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch");
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      
      let ext = ".pdf";
      if (url.toLowerCase().endsWith(".docx")) ext = ".docx";
      else if (url.toLowerCase().endsWith(".doc")) ext = ".doc";
      
      let finalName = "";
      if (customFileName && customFileName.trim().length > 0) {
        finalName = customFileName.trim();
        if (!finalName.toLowerCase().endsWith(ext)) {
          finalName += ext;
        }
      } else {
        const cleanTitle = defaultTitle.toLowerCase().replace(/[^a-z0-9]/g, "-").replace(/-+/g, "-");
        finalName = `brochure-${cleanTitle}${ext}`;
      }
      
      link.download = finalName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Blob download failed, falling back to direct link open:", error);
      window.open(url, "_self");
    }
  };

  const filteredIntakes = mergedIntakes.filter(intake => {
    // Year filter
    if (yearFilter !== "todos" && intake.year.toString() !== yearFilter) {
      return false;
    }
    // Modality filter
    if (modalityFilter !== "todos") {
      if (modalityFilter === "online" && intake.modalityType !== "online" && intake.modalityType !== "hibrido") {
        return false;
      }
      if (modalityFilter === "presencial" && intake.modalityType !== "presencial" && intake.modalityType !== "hibrido") {
        return false;
      }
    }
    // Duration filter
    if (durationFilter !== "todos") {
      const mappedFilter = durationFilter === "cortos" ? "corto" : "certificacion";
      if (intake.durationType !== mappedFilter) {
        return false;
      }
    }
    return true;
  });

  // Toggle helpers for clicking the switch icons
  const toggleYear = () => {
    const options = ["todos", "2026", "2027"];
    const nextIdx = (options.indexOf(yearFilter) + 1) % options.length;
    setYearFilter(options[nextIdx]);
  };

  const toggleModality = () => {
    const options = ["todos", "online", "presencial"];
    const nextIdx = (options.indexOf(modalityFilter) + 1) % options.length;
    setModalityFilter(options[nextIdx]);
  };

  const toggleDuration = () => {
    const options = ["todos", "cortos", "certificaciones"];
    const nextIdx = (options.indexOf(durationFilter) + 1) % options.length;
    setDurationFilter(options[nextIdx]);
  };

  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-36 pb-20 bg-[#700FA3]">
        <style dangerouslySetInnerHTML={{ __html: `
          .calendario-bg {
            object-fit: cover;
            object-position: center center;
          }
          @media (min-width: 768px) {
            .calendario-bg {
              object-fit: cover;
              object-position: right center;
            }
          }
          .calendario-overlay {
            background: linear-gradient(to bottom, rgba(112,15,163,0.96) 0%, rgba(112,15,163,0.82) 45%, rgba(112,15,163,0.55) 100%);
          }
          @media (min-width: 768px) {
            .calendario-overlay {
              background: linear-gradient(to right, #700FA3 0%, #700FA3 35%, rgba(112, 15, 163, 0.9) 48%, rgba(112, 15, 163, 0.6) 60%, rgba(112, 15, 163, 0.3) 72%, rgba(112, 15, 163, 0.05) 86%, transparent 100%);
            }
          }
        `}} />

        <img
          src="/hero/slider-3.webp"
          alt="Calendario Académico One True"
          fetchPriority="high"
          className="calendario-bg absolute inset-0 w-full h-full z-0 pointer-events-none"
        />

        <div className="calendario-overlay absolute inset-0 z-0 pointer-events-none" />

        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 z-10 flex justify-start items-center">
          <div className="max-w-3xl text-left">
            <Breadcrumbs />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-[#FFC107]" />
              <span
                className="text-xs sm:text-sm md:text-base font-semibold"
                style={{
                  letterSpacing: "0.5px",
                  color: "#FFC107",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Planifique su formación en poligrafía y credibilidad.
              </span>
            </div>

            <h1
              className="mb-4 !text-3xl sm:!text-4xl md:!text-5xl lg:!text-[52px] font-bold leading-tight"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "#FFFFFF",
                textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)",
              }}
            >
              Calendario Académico
            </h1>
            <p
              className="opacity-95 !text-sm sm:!text-base md:!text-lg font-medium max-w-2xl leading-relaxed text-white"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Conozca las próximas fechas de inicio, horarios y modalidades de nuestros programas avanzados y certificaciones profesionales acreditadas.
            </p>
          </div>
        </div>
      </section>

      {/* Grid and Filters Section */}
      <section className="bg-[#fcfdfd] py-20 relative overflow-hidden">
        {/* Glow blobs */}
        <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#700FA3]/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[30%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#FFC107]/5 blur-[120px] pointer-events-none" />

        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
          
          <h2 
            className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#48255A] mb-12 tracking-wide uppercase flex items-center justify-center gap-3 select-none"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <span>PRÓXIMOS</span>
            <span className="text-[#FFC107]">CURSOS</span>
          </h2>
          {/* Navigation/Filters bar */}
          <div className="flex flex-col lg:flex-row lg:flex-nowrap w-full items-center justify-center gap-4 lg:gap-6 bg-white rounded-3xl p-6 border border-[#700FA3]/10 shadow-[0_4px_25px_rgba(112,15,163,0.04)] max-w-[1200px] mx-auto mb-16 select-none">
            {/* AÑO FILTER */}
            <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-2">
              <span className="text-xs font-extrabold tracking-wider text-[#700FA3] uppercase" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Año:</span>
              <div className="flex items-center gap-1.5 lg:gap-2 bg-[#700FA3]/5 px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-full border border-[#700FA3]/15">
                {/* Toggle switch icon */}
                <div 
                  onClick={toggleYear}
                  className="w-9 h-5 rounded-full relative cursor-pointer flex items-center transition-colors duration-300 bg-[#700FA3]"
                >
                  <div 
                    className={`w-4 h-4 rounded-full shadow-sm absolute transition-all duration-300 ease-out bg-[#FFC107] ${
                      yearFilter === "todos" ? "left-0.5" : 
                      (yearFilter === "2026" ? "left-[10px]" : "left-[18px]")
                    }`} 
                  />
                </div>
                {/* Text selectors */}
                <div className="flex items-center gap-1 lg:gap-1.5 text-[10px] lg:text-xs font-bold text-[#48255A]/50" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  <span className="text-[#700FA3]/30">[</span>
                  <button 
                    onClick={() => setYearFilter("todos")}
                    className={`hover:text-[#FFC107] transition-colors cursor-pointer uppercase font-extrabold ${yearFilter === "todos" ? "text-[#700FA3]" : "text-[#48255A]/60"}`}
                  >
                    TODOS
                  </button>
                  <span className="text-[#700FA3]/30">|</span>
                  <button 
                    onClick={() => setYearFilter("2026")}
                    className={`hover:text-[#FFC107] transition-colors cursor-pointer uppercase font-extrabold ${yearFilter === "2026" ? "text-[#700FA3]" : "text-[#48255A]/60"}`}
                  >
                    2026
                  </button>
                  <span className="text-[#700FA3]/30">|</span>
                  <button 
                    onClick={() => setYearFilter("2027")}
                    className={`hover:text-[#FFC107] transition-colors cursor-pointer uppercase font-extrabold ${yearFilter === "2027" ? "text-[#700FA3]" : "text-[#48255A]/60"}`}
                  >
                    2027
                  </button>
                  <span className="text-[#700FA3]/30">]</span>
                </div>
              </div>
            </div>

            {/* MODALIDAD FILTER */}
            <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-2">
              <span className="text-xs font-extrabold tracking-wider text-[#700FA3] uppercase" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Modalidad:</span>
              <div className="flex items-center gap-1.5 lg:gap-2 bg-[#700FA3]/5 px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-full border border-[#700FA3]/15">
                {/* Toggle switch icon */}
                <div 
                  onClick={toggleModality}
                  className="w-9 h-5 rounded-full relative cursor-pointer flex items-center transition-colors duration-300 bg-[#700FA3]"
                >
                  <div 
                    className={`w-4 h-4 rounded-full shadow-sm absolute transition-all duration-300 ease-out bg-[#FFC107] ${
                      modalityFilter === "todos" ? "left-0.5" : 
                      (modalityFilter === "online" ? "left-[10px]" : "left-[18px]")
                    }`} 
                  />
                </div>
                {/* Text selectors */}
                <div className="flex items-center gap-1 lg:gap-1.5 text-[10px] lg:text-xs font-bold text-[#48255A]/50" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  <span className="text-[#700FA3]/30">[</span>
                  <button 
                    onClick={() => setModalityFilter("todos")}
                    className={`hover:text-[#FFC107] transition-colors cursor-pointer uppercase font-extrabold ${modalityFilter === "todos" ? "text-[#700FA3]" : "text-[#48255A]/60"}`}
                  >
                    TODOS
                  </button>
                  <span className="text-[#700FA3]/30">|</span>
                  <button 
                    onClick={() => setModalityFilter("online")}
                    className={`hover:text-[#FFC107] transition-colors cursor-pointer uppercase font-extrabold ${modalityFilter === "online" ? "text-[#700FA3]" : "text-[#48255A]/60"}`}
                  >
                    ONLINE
                  </button>
                  <span className="text-[#700FA3]/30">|</span>
                  <button 
                    onClick={() => setModalityFilter("presencial")}
                    className={`hover:text-[#FFC107] transition-colors cursor-pointer uppercase font-extrabold ${modalityFilter === "presencial" ? "text-[#700FA3]" : "text-[#48255A]/60"}`}
                  >
                    PRESENCIAL
                  </button>
                  <span className="text-[#700FA3]/30">]</span>
                </div>
              </div>
            </div>

            {/* DURACIÓN FILTER */}
            <div className="flex flex-col lg:flex-row items-center gap-1.5 lg:gap-2">
              <span className="text-xs font-extrabold tracking-wider text-[#700FA3] uppercase" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Duración:</span>
              <div className="flex items-center gap-1.5 lg:gap-2 bg-[#700FA3]/5 px-2.5 py-1.5 lg:px-3 lg:py-2 rounded-full border border-[#700FA3]/15">
                {/* Toggle switch icon */}
                <div 
                  onClick={toggleDuration}
                  className="w-9 h-5 rounded-full relative cursor-pointer flex items-center transition-colors duration-300 bg-[#700FA3]"
                >
                  <div 
                    className={`w-4 h-4 rounded-full shadow-sm absolute transition-all duration-300 ease-out bg-[#FFC107] ${
                      durationFilter === "todos" ? "left-0.5" : 
                      (durationFilter === "cortos" ? "left-[10px]" : "left-[18px]")
                    }`} 
                  />
                </div>
                {/* Text selectors */}
                <div className="flex items-center gap-1 lg:gap-1.5 text-[10px] lg:text-xs font-bold text-[#48255A]/50" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  <span className="text-[#700FA3]/30">[</span>
                  <button 
                    onClick={() => setDurationFilter("todos")}
                    className={`hover:text-[#FFC107] transition-colors cursor-pointer uppercase font-extrabold ${durationFilter === "todos" ? "text-[#700FA3]" : "text-[#48255A]/60"}`}
                  >
                    TODOS
                  </button>
                  <span className="text-[#700FA3]/30">|</span>
                  <button 
                    onClick={() => setDurationFilter("cortos")}
                    className={`hover:text-[#FFC107] transition-colors cursor-pointer uppercase font-extrabold ${durationFilter === "cortos" ? "text-[#700FA3]" : "text-[#48255A]/60"}`}
                  >
                    CORTOS
                  </button>
                  <span className="text-[#700FA3]/30">|</span>
                  <button 
                    onClick={() => setDurationFilter("certificaciones")}
                    className={`hover:text-[#FFC107] transition-colors cursor-pointer uppercase font-extrabold ${durationFilter === "certificaciones" ? "text-[#700FA3]" : "text-[#48255A]/60"}`}
                  >
                    CERTIFICACIONES
                  </button>
                  <span className="text-[#700FA3]/30">]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Intakes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {filteredIntakes.map((intake, index) => (
              <div
                key={index}
                className={`group flex flex-col bg-white rounded-3xl p-8 shadow-[0_12px_40px_rgba(0,0,0,0.03)] border transition-all duration-500 hover:-translate-y-1.5 ${
                  intake.isFeatured
                    ? "border-2 border-[#FFC107] shadow-[0_20px_50px_rgba(255,193,7,0.15)]"
                    : "border-neutral-100 hover:border-neutral-200/80 hover:shadow-[0_20px_45px_rgba(112,15,163,0.08)]"
                }`}
              >
                {/* Badge text on top */}
                <div className="mb-6 flex justify-start">
                  <span
                    className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      intake.badgeColor === "blue"
                        ? "bg-[#700FA3] text-white"
                        : "bg-[#FFC107] text-[#411A56]"
                    }`}
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    {intake.badgeText}
                  </span>
                </div>

                {/* Course Title */}
                <h3
                  className="font-bold leading-tight group-hover:text-[#700FA3] transition-colors duration-300 mb-6 select-none min-h-[64px] !text-2xl"
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    color: "#48255A"
                  }}
                >
                  {intake.title}
                </h3>

                {/* Info Fields */}
                <div className="flex flex-col gap-4 mb-8 text-sm text-[#4b5563] font-semibold select-none" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-[#700FA3]">📅</span>
                    <span>{intake.dateDisplay}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-[#700FA3]">🕒</span>
                    <span>{intake.durationDisplay}</span>
                  </div>
                </div>

                {/* Button Action */}
                <div className="mt-auto pt-5 border-t border-neutral-100">
                  {(() => {
                    const btnType = intake.buttonType || "default";
                    
                    let showBrochure = false;
                    if (btnType === "brochure" && intake.brochureUrl) {
                      showBrochure = true;
                    } else if (btnType === "info") {
                      showBrochure = false;
                    } else {
                      showBrochure = !!intake.brochureUrl;
                    }

                    if (showBrochure) {
                      return (
                        <button
                          onClick={(e) => handleDownload(e, intake.brochureUrl!, intake.title, intake.brochureFileName)}
                          className={`block w-full text-center py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                            intake.isFeatured
                              ? "bg-[#FFC107] text-[#411A56] hover:brightness-110 shadow-[#FFC107]/20"
                              : "bg-[#700FA3] text-white hover:bg-[#5C0B87] shadow-[#700FA3]/15"
                          }`}
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Descargar Brochure
                        </button>
                      );
                    } else if (btnType === "info") {
                      return (
                        <Link
                          href={intake.href}
                          className={`block w-full text-center py-3 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 shadow-md cursor-pointer ${
                            intake.isFeatured
                              ? "bg-[#FFC107] text-[#411A56] hover:brightness-110 shadow-[#FFC107]/20"
                              : "bg-[#700FA3] text-white hover:bg-[#5C0B87] shadow-[#700FA3]/15"
                          }`}
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                        >
                          Más Información
                        </Link>
                      );
                    } else {
                      // Default non-brochure logic (depends on featured)
                      if (intake.isFeatured) {
                        return (
                          <Link
                            href={`/cotiza?servicio=${intake.courseId}`}
                            className="block w-full text-center py-3 bg-[#FFC107] text-[#411A56] hover:brightness-110 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 shadow-md shadow-[#FFC107]/20 cursor-pointer"
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                          >
                            Solicitar Plaza
                          </Link>
                        );
                      } else {
                        return (
                          <Link
                            href={intake.href}
                            className="block w-full text-center py-3 bg-[#700FA3] text-white hover:bg-[#5C0B87] rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 shadow-md shadow-[#700FA3]/15 cursor-pointer"
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                          >
                            Más Información
                          </Link>
                        );
                      }
                    }
                  })()}
                </div>
              </div>
            ))}
          </div>

          {/* Quick FAQ / Note section */}
          <div className="mt-20 bg-neutral-50 rounded-3xl p-8 sm:p-10 border border-neutral-100 flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-5xl mx-auto">
            <div className="text-center md:text-left md:flex-1">
              <h4
                className="text-xl font-bold text-[#48255A] mb-3"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                ¿Desea planificar una formación corporativa a medida?
              </h4>
              <p
                className="text-sm text-neutral-500 leading-relaxed max-w-2xl font-light"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Ofrecemos programas adaptados a las necesidades específicas de su organización, administrados in-company o de forma híbrida para optimizar los filtros de confianza de su equipo.
              </p>
            </div>
            <Link
              href="/cotiza"
              className="px-8 py-3.5 bg-[#700FA3] hover:bg-[#5C0B87] text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-[#700FA3]/15 whitespace-nowrap"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Contactar asesor académico
            </Link>
          </div>

        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
