import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import ContactoFormAvanzados from "@/components/ContactoFormAvanzados";
import { getCourses } from "@/lib/cms";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos Avanzados en Poligrafía | Academia One True",
  description: "Especializaciones y entrenamientos avanzados de poligrafía para profesionales certificados. Actualización continua bajo estándares APA y ASTM en Quito, Guayaquil y online.",
  keywords: ["cursos avanzados de poligrafia", "academia de poligrafia ecuador", "especializacion en poligrafia", "perfeccionamiento poligrafico", "estandares APA", "normas ASTM"],
  openGraph: {
    title: "Cursos Avanzados en Poligrafía | Academia One True",
    description: "Especializaciones y entrenamientos avanzados de poligrafía para profesionales certificados. Actualización continua bajo estándares APA y ASTM en Quito, Guayaquil y online.",
    url: "https://somosonetrue.com/cursos-avanzados-en-poligrafia",
    type: "website",
  }
};

export const revalidate = 3600; // Revalidate every hour or via on-demand revalidation

export default async function CursosAvanzadosPoligrafiaPage() {
  let displayCourses: any[] = [];
  try {
    const courses = await getCourses();
    displayCourses = courses.filter((c: any) => c.published && c.id !== "curso-basico-en-poligrafia" && !c.pageContent?.isComplementary);
  } catch (err) {
    console.error("Error loading courses in server component:", err);
  }

  const firstCourseContent = displayCourses[0]?.pageContent;
  const contactPhone = firstCourseContent?.contactPhone;
  const contactWhatsapp = firstCourseContent?.contactWhatsapp;
  const contactWhatsappText = firstCourseContent?.contactWhatsappText;

  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      <Navbar />

      {/* Hero */}
      <section className="relative min-h-[75vh] flex items-center justify-center overflow-hidden pt-36 pb-24 bg-[#700FA3]">
        <style dangerouslySetInnerHTML={{ __html: `
          .cursos-avanzados-bg {
            object-fit: cover;
            object-position: center center;
          }
          @media (min-width: 768px) {
            .cursos-avanzados-bg {
              object-fit: cover;
              object-position: right center;
            }
          }
          .cursos-avanzados-overlay {
            background: linear-gradient(to bottom, rgba(112,15,163,0.96) 0%, rgba(112,15,163,0.82) 45%, rgba(112,15,163,0.55) 100%);
          }
          @media (min-width: 768px) {
            .cursos-avanzados-overlay {
              background: linear-gradient(to right, #700FA3 0%, #700FA3 35%, rgba(112, 15, 163, 0.9) 48%, rgba(112, 15, 163, 0.6) 60%, rgba(112, 15, 163, 0.3) 72%, rgba(112, 15, 163, 0.05) 86%, transparent 100%);
            }
          }
        `}} />

        <img
          src="/hero/slider-3.webp"
          alt="Cursos Avanzados en Poligrafía - One True Academia"
          fetchPriority="high"
          className="cursos-avanzados-bg absolute inset-0 w-full h-full z-0 pointer-events-none"
        />

        <div className="cursos-avanzados-overlay absolute inset-0 z-0 pointer-events-none" />

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
                Especialización para poligrafistas certificados.
              </span>
            </div>

            <h1
              className="mb-6 !text-3xl sm:!text-4xl md:!text-5xl lg:!text-[52px] font-semibold leading-tight"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                margin: "0 0 28px 0",
                padding: 0,
                color: "#FFFFFF",
                textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)",
              }}
            >
              Cursos Avanzados en{" "}
              <strong
                style={{
                  fontWeight: "800",
                  textDecoration: "underline",
                  textDecorationColor: "#FFC107",
                  textUnderlineOffset: "6px",
                }}
              >
                Poligrafía
              </strong>
            </h1>

            <p
              className="mb-8 opacity-95 !text-sm sm:!text-base md:!text-lg font-medium"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                lineHeight: "32px",
                color: "#FFFFFF",
              }}
            >
              Profundice sus competencias técnicas con cursos especializados diseñados para elevar su desempeño en el área de Poligrafía. Ideal para profesionales que buscan actualización continua bajo los estándares de la{" "}
              <strong
                style={{
                  fontWeight: "800",
                  textDecoration: "underline",
                  textDecorationColor: "#FFC107",
                  textUnderlineOffset: "4px",
                }}
              >
                APA y ASTM
              </strong>
              .
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <a
                href="#modulos"
                className="px-8 py-3.5 rounded transition-all hover:brightness-110 shadow-lg text-center"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  lineHeight: "1",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#5F0091",
                  backgroundColor: "#FFC107",
                  display: "inline-block",
                  textDecoration: "none",
                }}
              >
                Ver cursos disponibles
              </a>
              <a
                href="#contacto"
                className="px-8 py-3.5 rounded transition-all hover:bg-white/10 shadow-lg text-center border border-white/30"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  lineHeight: "1",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#FFFFFF",
                  display: "inline-block",
                  textDecoration: "none",
                }}
              >
                Solicitar información
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Módulos */}
      <section id="modulos" className="bg-white py-24 scroll-mt-24">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[3px] bg-[#700FA3]" />
              <span
                className="text-sm md:text-[18px] text-left"
                style={{
                  letterSpacing: "0.5px",
                  color: "#700FA3",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Programa Avanzado
              </span>
            </div>

            <h2
              className="max-w-3xl mx-auto"
              style={{
                fontSize: "clamp(24px, 5vw, 36px)",
                fontWeight: "bold",
                lineHeight: "46px",
                color: "#48255A",
                fontFamily: "var(--font-montserrat), sans-serif",
                marginTop: "10px",
              }}
            >
              Módulos de Especialización
            </h2>

            <p
              className="text-[#525252] text-base mt-4 max-w-2xl font-light"
              style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
            >
              Seleccione el área en la que desea profundizar. Cada módulo combina teoría actualizada con práctica supervisada.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max justify-items-center">
            {displayCourses.map((modulo, idx) => {
              let gridClass = "";
              if (idx === 3 || idx === 4) {
                gridClass = "lg:col-span-1";
              }
              return (
                <Link
                  href={modulo.href ?? "#contacto"}
                  key={modulo.title}
                  className={`group flex flex-col rounded-3xl overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(112,15,163,0.18)] hover:-translate-y-2.5 transition-all duration-500 w-full max-w-[380px] border border-neutral-100 no-underline text-inherit hover:text-inherit ${gridClass}`}
                >
                  {/* Imagen Superior */}
                  <div className="relative w-full h-52 overflow-hidden bg-gradient-to-br from-[#700FA3] to-[#8A15C4]">
                    <img
                      src={modulo.image}
                      alt={modulo.title}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-108 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#700FA3]/40 via-[#700FA3]/20 to-transparent" />
                  </div>

                  {/* Contenido Inferior */}
                  <div className="flex flex-col p-6 text-left flex-1 justify-between">
                    <div>
                      {/* Titulo del módulo arriba del badge */}
                      <h3
                        className="text-[#48255A] text-[17px] font-bold mb-3 min-h-[50px] flex items-center group-hover:text-[#700FA3] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}
                      >
                        {modulo.title}
                      </h3>

                      {/* Descripción */}
                      <p
                        className="text-[#525252]/95 text-xs leading-relaxed font-medium mb-4"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        {modulo.desc}
                      </p>
                    </div>

                    <div>
                      {/* Información */}
                      <div className="flex items-center gap-2 text-xs text-[#525252] mb-4 border-t border-neutral-100 pt-3">
                        <span style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "600" }}>📚</span>
                        <span style={{ fontFamily: "var(--font-montserrat), sans-serif" }} className="font-bold text-[#48255A]">Curso avanzado</span>
                      </div>

                      {/* Botón */}
                      <div
                        className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-[#700FA3] font-bold rounded-lg text-xs self-start hover:brightness-110 transition-all duration-300 w-full justify-center group-hover:shadow-md"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "#FFD700" }}
                      >
                        Consultar curso
                        <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Formulario de contacto */}
      <ContactoFormAvanzados
        contactPhone={contactPhone}
        contactWhatsapp={contactWhatsapp}
        contactWhatsappText={contactWhatsappText}
      />

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
