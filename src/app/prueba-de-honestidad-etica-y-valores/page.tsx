"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function PruebaDeHonestidadEticaYValoresPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [country, setCountry] = useState("ec");

  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-start md:items-center justify-center overflow-hidden pt-32 pb-24 bg-[#700FA3]">
        {/* Purple Overlay */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #700FA3 0%, #700FA3 35%, rgba(112, 15, 163, 0.9) 48%, rgba(112, 15, 163, 0.6) 60%, rgba(112, 15, 163, 0.3) 72%, rgba(112, 15, 163, 0.05) 86%, transparent 100%)"
          }}
        />

        <img 
          src="/pruebas-poligrafo/primer.webp"
          alt="One True Prueba de Honestidad, Ética y Valores Laborales"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-right-top z-0 opacity-40 mix-blend-overlay pointer-events-none"
        />

        {/* Centered Grid Container */}
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 z-10 flex justify-start items-center">
          <div className="max-w-5xl text-left">
            
            {/* Tag Prefix */}
            <Breadcrumbs />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-[#FFC107]" />
              <span
                className="text-xs sm:text-sm md:text-base"
                style={{
                  letterSpacing: "0.5px",
                  color: "#FFC107",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Evalúa la Integridad Colectiva y Mitiga el Riesgo Interno en tu Organización.
              </span>
            </div>

            <h1
              className="mb-6 !text-3xl sm:!text-4xl md:!text-5xl lg:!text-[52px] font-semibold"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                margin: "0 0 28px 0",
                padding: 0,
                color: "#FFFFFF",
                textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)"
              }}
            >
              Prueba de <strong style={{ fontWeight: "800", textDecoration: "underline", textDecorationColor: "#FFC107", textUnderlineOffset: "6px" }}>Honestidad, Ética y Valores</strong>
            </h1>

            <p
              className="mb-6 opacity-95 !text-sm sm:!text-base md:!text-lg font-medium"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "#FFFFFF"
              }}
            >
              La Prueba de Honestidad, Ética y Valores es una evaluación psicométrica de 90 reactivos que mide de forma objetiva la alineación ética y detecta conductas de riesgo. Funciona como un indicador de referencia clave que, junto con entrevistas y antecedentes, optimiza la selección de capital humano.
            </p>

            {/* Hero CTA Button */}
            <div className="flex flex-wrap items-center gap-6 mt-6 mb-8">
              <a 
                href="#contacto"
                className="px-8 py-3 rounded transition-all hover:brightness-110 shadow-lg"
                style={{
                  WebkitTextSizeAdjust: "100%",
                  WebkitTapHighlightColor: "transparent",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  lineHeight: "1",
                  textAlign: "center",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#5F0091",
                  backgroundColor: "#FFC107",
                  display: "inline-block",
                  textDecoration: "none",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <span className="elementor-button-text">Cotizar mi evaluación ahora</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Sobre el Servicio Section */}
      <section className="bg-white py-20">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="flex flex-col gap-16">
            
            {/* ENCABEZADO — Título */}
            <div className="flex flex-col gap-12 items-start">
              <div className="w-full max-w-4xl flex flex-col text-left">
                {/* Tag Prefix con línea */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-[2px] bg-[#700FA3]" />
                  <span
                    style={{
                      letterSpacing: "1px",
                      fontSize: "14px",
                      color: "#700FA3",
                      fontWeight: "600",
                      fontFamily: "var(--font-montserrat), sans-serif",
                    }}
                  >
                    Conoce nuestra evaluación
                  </span>
                </div>

                <h2
                  className="mb-6"
                  style={{
                    fontFamily: "var(--font-montserrat), sans-serif",
                    fontSize: "clamp(24px, 5vw, 36px)",
                    fontWeight: "700",
                    lineHeight: "1.2",
                    color: "#48255A",
                  }}
                >
                  Soluciones desarrolladas para mitigar el riesgo interno en tu organización
                </h2>

                <p
                  className="text-[#525252] text-[15px] leading-[26px] font-light"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  Nuestra prueba analiza de manera integral la orientación conductual y los valores de los evaluados a través de dimensiones críticas estructuradas en tres grandes ejes de riesgo corporativo.
                </p>
              </div>
            </div>

            {/* LAS 3 CARDS (APILADAS) */}
            <div className="flex flex-col gap-8">
              
              {/* EJE 1: Factores de Integridad y Ética Laboral */}
              <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 bg-white p-8 lg:p-10 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(112,15,163,0.04)] transition-all duration-300">
                <div className="shrink-0 w-[70px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="78" fill="#700FA3" viewBox="0 0 85 93">
                    <path d="M27.648 39.7c0 13.904 11.447 25.217 25.516 25.217s25.5-11.312 25.5-25.217a24.71 24.71 0 0 0-2.78-11.457c-1.654-3.2-4.024-6.058-6.878-8.302v-2.443c0-5.292-1.704-9.778-4.926-12.973C61.215 1.672 57.342.066 53.187 0a.87.87 0 0 0-.043 0c-4.158.065-8.033 1.672-10.9 4.524-3.224 3.194-4.927 7.68-4.927 12.973v2.443a25.54 25.54 0 0 0-6.878 8.302c-1.845 3.57-2.78 7.424-2.78 11.457zm44.387 12.6a22.85 22.85 0 0 1-18.871 9.916c-7.844 0-14.775-3.938-18.876-9.918v-3.36c0-5.464 3.526-7.155 7.72-8.368l8.472 4.913c.976.62 1.828.93 2.68.93s1.705-.3 2.68-.93l8.473-4.913c4.193 1.214 7.72 2.904 7.72 8.37v3.36zm-26.4-12.76c1.4-.62 2.137-1.917 2.584-2.96a15.43 15.43 0 0 0 .849.344c1.46.534 2.783.8 4.106.8s2.646-.267 4.102-.8a15.4 15.4 0 0 0 .85-.344c.446 1.045 1.184 2.34 2.584 2.96l-6.263 3.632a1.15 1.15 0 0 0-.051.031c-1.075.688-1.372.688-2.448 0l-.05-.03-6.262-3.63zm30.32.16a22.19 22.19 0 0 1-1.29 7.47c-.774-6.183-5.648-8.096-10.156-9.353l-.033-.01-1.5-.407-.958-.255c-.723-.194-1.163-1.092-1.467-1.86 4.334-2.777 7.708-7.484 8.368-11.878 4.508 4.237 7.047 10.042 7.047 16.3zm-22.78-37c5.98.104 12.385 4.3 13.064 13.2-1.392-.376-2.108-1.098-2.856-1.853-1.046-1.056-2.348-2.37-5.1-1.67l-1.96.5c-1.63.43-2.446.647-3.148.647s-1.528-.217-3.167-.65l-1.947-.507c-2.748-.7-4.05.613-5.094 1.668-.75.755-1.466 1.48-2.862 1.855.68-8.923 7.087-13.108 13.07-13.212zm-13.13 15.988c2.625-.478 3.904-1.767 4.87-2.743.93-.938 1.243-1.253 2.463-.943l1.923.5c1.8.48 2.808.742 3.872.742s2.053-.262 3.854-.74L58.962 15c1.225-.312 1.538.005 2.47.944.967.975 2.244 2.263 4.866 2.74v3.193c0 4.72-4.66 10.568-9.97 12.513-2.327.854-3.978.854-6.3 0-5.312-1.946-9.97-7.794-9.97-12.513v-3.193zm-2.6 4.72c.66 4.393 4.035 9.1 8.37 11.878-.304.767-.745 1.665-1.464 1.86l-.955.254-1.505.405a1.26 1.26 0 0 0-.075.021c-4.5 1.257-9.354 3.175-10.127 9.343a22.18 22.18 0 0 1-1.3-7.47c0-6.25 2.54-12.054 7.047-16.3zm38.193-6.053l-2.087-1.9c-.58-.477-1.44-.4-1.922.175a1.34 1.34 0 0 0 .177 1.9l1.902 1.722C79.23 24.722 82.27 31.98 82.27 39.7s-3.04 14.977-8.562 20.435c-11.4 11.268-29.948 11.268-41.347 0C26.84 54.677 23.8 47.42 23.8 39.7s3.04-14.977 8.563-20.435c.53-.525 1.028-.983 1.52-1.4a1.34 1.34 0 0 0 .148-1.903c-.5-.566-1.352-.63-1.925-.146a29.31 29.31 0 0 0-1.673 1.54C24.395 23.324 21.07 31.26 21.07 39.7a31.12 31.12 0 0 0 6 18.439l-6.165 6.094-.126-.125a2.36 2.36 0 0 0-1.669-.682 2.36 2.36 0 0 0-1.67.683l-4.22 4.175c-.01.01-.02.017-.03.026s-.018.02-.027.03l-3.2 3.16a1.34 1.34 0 0 0 .001 1.908c.533.527 1.398.526 1.93-.001l2.26-2.236 7.036 6.954-9.977 9.86a4.96 4.96 0 0 1-3.517 1.435c-1.333 0-2.582-.5-3.518-1.436a4.87 4.87 0 0 1-1.45-3.477c0-1.317.515-2.553 1.45-3.477l3.56-3.518a1.34 1.34 0 0 0 0-1.908c-.533-.527-1.397-.527-1.93 0l-3.56 3.518A7.52 7.52 0 0 0 0 84.508c0 2.04.8 3.952 2.248 5.385a7.69 7.69 0 0 0 5.449 2.227c2.064 0 4-.8 5.448-2.227l15.2-15c.445-.44.7-1.027.7-1.653s-.245-1.213-.7-1.653l-.123-.122 6.168-6.097c5.55 3.947 12.102 5.922 18.654 5.922 8.186 0 16.372-3.08 22.604-9.24C81.676 56.074 85 48.14 85 39.698s-3.325-16.375-9.362-22.343zM23.122 76.22l-7.037-6.955 3.023-3 7.038 6.957-3.024 2.988zm3.16-6.67l-3.448-3.408 5.936-5.868a32.34 32.34 0 0 0 1.66 1.769c.58.573 1.176 1.12 1.787 1.638L26.28 69.55z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg md:text-xl font-bold text-[#48255A]"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3", marginBottom: "14px" }}
                  >
                    Factores de Integridad y Ética Laboral
                  </h3>
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <strong className="font-semibold text-[#48255A]">Honestidad:</strong> Mide la inclinación natural del evaluado a actuar con transparencia y rectitud. Permite predecir la probabilidad de conductas deshonestas en comparación con perfiles de alta integridad.
                    </p>
                    <p className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <strong className="font-semibold text-[#48255A]">Moralidad:</strong> Evalúa la solidez y firmeza de los valores morales individuales frente a presiones externas, identificando si el perfil es altamente manipulable o propenso a quebrantar sus principios.
                    </p>
                    <p className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <strong className="font-semibold text-[#48255A]">Honestidad al Responder (Control de Deseabilidad Social):</strong> Detecta la consistencia y veracidad de la prueba, identificando si el evaluado intenta manipular el test o simular un perfil "socialmente aceptable" para ocultar su verdadera conducta.
                    </p>
                  </div>
                </div>
              </div>

              {/* EJE 2: Identificación de Comportamientos Riesgosos */}
              <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 bg-white p-8 lg:p-10 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(112,15,163,0.04)] transition-all duration-300">
                <div className="shrink-0 w-[70px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#700FA3" viewBox="0 0 84 84">
                    <path d="M32.86 25.184h15.535c.898 0 1.627-.734 1.627-1.64s-.73-1.64-1.627-1.64H32.86c-.898 0-1.627.735-1.627 1.64s.728 1.64 1.627 1.64z"/>
                    <path d="M24.51 22.383l-4.24 4.277-.98-.988c-.636-.64-1.666-.64-2.3 0a1.65 1.65 0 0 0 0 2.32l2.13 2.148c.318.32.734.48 1.15.48s.832-.16 1.15-.48l5.39-5.438a1.65 1.65 0 0 0 0-2.32c-.636-.64-1.665-.64-2.3 0z"/>
                    <path d="M32.86 31.746h7.36c.898 0 1.627-.734 1.627-1.64s-.73-1.64-1.627-1.64h-7.36c-.898 0-1.627.735-1.627 1.64s.728 1.64 1.627 1.64z"/>
                    <path d="M24.51 39.446l-4.24 4.277-.98-.988c-.636-.64-1.666-.64-2.3 0a1.65 1.65 0 0 0 0 2.32l2.13 2.148c.318.32.734.48 1.15.48s.832-.16 1.15-.48l5.39-5.438a1.65 1.65 0 0 0 0-2.32c-.636-.64-1.665-.64-2.3 0z"/>
                    <path d="M32.86 42.247h15.535c.898 0 1.627-.734 1.627-1.64s-.73-1.64-1.627-1.64H32.86c-.898 0-1.627.735-1.627 1.64s.728 1.64 1.627 1.64z"/>
                    <path d="M32.86 48.81h7.36c.898 0 1.627-.734 1.627-1.64s-.73-1.64-1.627-1.64h-7.36c-.898 0-1.627.734-1.627 1.64s.728 1.64 1.627 1.64z"/>
                    <path d="M24.51 56.672l-4.24 4.277-.98-.988c-.636-.64-1.666-.64-2.3 0a1.65 1.65 0 0 0 0 2.32l2.13 2.148c.318.32.734.48 1.15.48s.832-.16 1.15-.48l5.39-5.438a1.65 1.65 0 0 0 0-2.32c-.636-.64-1.665-.64-2.3 0z"/>
                    <path d="M32.86 59.473h15.535c.898 0 1.627-.735 1.627-1.64s-.73-1.64-1.627-1.64H32.86c-.898 0-1.627.734-1.627 1.64s.728 1.64 1.627 1.64zm0 6.562h7.36c.898 0 1.627-.734 1.627-1.64s-.73-1.64-1.627-1.64h-7.36c-.898 0-1.627.734-1.627 1.64s.728 1.64 1.627 1.64zM83.286 42c0-9.806-7.866-17.792-17.568-17.88V13.043c0-4.523-3.648-8.203-8.133-8.203H40.42C39.126 1.937 36.233 0 33.002 0h-.286c-3.23 0-6.124 1.937-7.42 4.84H8.133C3.65 4.84 0 8.52 0 13.043v62.754C0 80.32 3.65 84 8.133 84h49.45c4.485 0 8.133-3.68 8.133-8.203V59.88a17.57 17.57 0 0 0 11.463-4.39c.1-.065.172-.14.246-.22 3.596-3.275 5.86-8 5.86-13.27zm-3.253 0a14.61 14.61 0 0 1-3.225 9.177 12.78 12.78 0 0 0-6.276-5.85 6.74 6.74 0 0 0 1.701-4.483V39.57c0-3.714-2.995-6.735-6.678-6.735s-6.677 3.02-6.677 6.735v1.273c0 1.72.644 3.3 1.7 4.483a12.78 12.78 0 0 0-6.276 5.85A14.61 14.61 0 0 1 51.078 42c0-8.05 6.495-14.602 14.478-14.602S80.033 33.95 80.033 42zM56.777 53.603c1.404-3.593 4.878-6.025 8.778-6.025s7.375 2.422 8.78 6.025c-2.437 1.88-5.48 3-8.778 3a14.32 14.32 0 0 1-8.778-3zm5.355-12.76V39.57c0-1.904 1.536-3.454 3.424-3.454s3.424 1.55 3.424 3.454v1.273c0 1.904-1.537 3.453-3.424 3.453s-3.424-1.55-3.424-3.453zm.333-27.8V24.4a17.48 17.48 0 0 0-4.555 1.477v-11.5c0-.906-.728-1.64-1.627-1.64H47.5V9.3c0-.412-.056-.8-.16-1.2h10.246c2.7 0 4.88 2.208 4.88 4.922zM26.437 8.12a1.63 1.63 0 0 0 1.57-1.211c.575-2.136 2.5-3.63 4.7-3.63h.286c2.197 0 4.133 1.493 4.7 3.63a1.63 1.63 0 0 0 1.569 1.211h3.787c.65 0 1.18.534 1.18 1.2v3.404H21.472V9.3c0-.656.53-1.2 1.18-1.2h3.786zm31.148 72.6H8.133c-2.7 0-4.88-2.208-4.88-4.922V13.043c0-2.714 2.2-4.922 4.88-4.922H18.38a4.49 4.49 0 0 0-.16 1.19v3.404H9.435c-.898 0-1.627.734-1.627 1.64v60.13c0 .906.728 1.64 1.627 1.64h16.917c.898 0 1.627-.734 1.627-1.64s-.728-1.64-1.627-1.64H11.06v-56.85h43.595v11.908c-3.404 2.683-5.815 6.6-6.575 11.06H32.86c-.9 0-1.627.735-1.627 1.64s.728 1.64 1.627 1.64h14.97c.07 5.162 2.317 9.803 5.86 13.027a1.51 1.51 0 0 0 .242.216c.237.2.48.4.73.607v16.748h-15.3c-.898 0-1.627.734-1.627 1.64s.728 1.64 1.627 1.64H56.3c.898 0 1.627-.734 1.627-1.64v-16.35a17.48 17.48 0 0 0 4.555 1.477v16.186c0 2.714-2.2 4.922-4.88 4.922z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg md:text-xl font-bold text-[#48255A]"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3", marginBottom: "14px" }}
                  >
                    Identificación de Comportamientos Riesgosos
                  </h3>
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <strong className="font-semibold text-[#48255A]">Propensión al Robo:</strong> Analiza los indicadores actitudinales que se correlacionan directamente con un mayor riesgo estadístico de cometer robos o apropiación ilícita de recursos.
                    </p>
                    <p className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <strong className="font-semibold text-[#48255A]">Tendencia al Abuso o Manipulación:</strong> Identifica perfiles con rasgos impulsivos o bajo autocontrol que podrían usar la manipulación para fines personales, afectando el clima laboral o el trato al equipo.
                    </p>
                    <p className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <strong className="font-semibold text-[#48255A]">Riesgo de Daño y Sabotaje:</strong> Mide la capacidad de autorregulación emocional ante la frustración o la rabia, previniendo reacciones negativas que pongan en peligro los activos tangibles o el entorno de la empresa.
                    </p>
                    <p className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <strong className="font-semibold text-[#48255A]">Conductas de Descuido:</strong> Evalúa el nivel de rigurosidad y atención al detalle, detectando la tendencia a normalizar errores o priorizar la velocidad por encima de los estándares de calidad requeridos.
                    </p>
                  </div>
                </div>
              </div>

              {/* EJE 3: Alineación y Cultura Organizacional */}
              <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 bg-white p-8 lg:p-10 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(112,15,163,0.04)] transition-all duration-300">
                <div className="shrink-0 w-[70px]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="#700FA3" viewBox="0 0 84 84">
                    <path d="M57.58 75.012a1.23 1.23 0 0 0-1.23 1.23v5.297h-8.8v-2.084a1.23 1.23 0 1 0-2.461 0v2.084h-7.203l1.996-1.996a8.02 8.02 0 0 0 0-11.417c-2.83-2.83-7.314-3.108-10.467-.8a8.13 8.13 0 0 0-10.467.8 8.02 8.02 0 0 0 0 11.417l1.996 1.996H13.73v-2.084a1.231 1.231 0 1 0-2.461 0v2.084H2.46v-5.297a1.23 1.23 0 1 0-2.461 0v6.527A1.23 1.23 0 0 0 1.229 84h56.35a1.23 1.23 0 0 0 1.23-1.231v-6.527a1.23 1.23 0 0 0-1.23-1.23zm-36.9 2.792c-1.06-1.06-1.644-2.47-1.644-3.968s.584-2.908 1.644-3.968a5.64 5.64 0 0 1 7.871-.062 1.23 1.23 0 0 0 1.712 0c2.187-2.12 5.718-2.1 7.87.062 1.06 1.06 1.644 2.47 1.644 3.968s-.584 2.908-1.644 3.968l-3.736 3.736h-9.982l-3.736-3.736zm28.604-26.03l-12.848-3.426V43.08c4.156-2.317 7.06-6.62 7.42-11.615h.465c2.872 0 5.208-2.336 5.208-5.208 0-1.33-.502-2.545-1.326-3.467V11.837a7.87 7.87 0 0 0-7.86-7.86h-.795C39.267 1.738 37.353 0 35.04 0h-9.944a14.51 14.51 0 0 0-14.489 14.489v8.3c-.824.922-1.326 2.136-1.326 3.467 0 2.872 2.336 5.208 5.208 5.208h.465c.36 4.996 3.264 9.298 7.42 11.615v5.268l-12.85 3.426A12.85 12.85 0 0 0 0 64.171v6.314a1.23 1.23 0 1 0 2.461 0V64.17c0-4.7 3.166-8.812 7.698-10.02l7.267-1.938c1.326 5.453 6.248 9.413 11.978 9.413s10.652-3.96 11.978-9.413l7.267 1.938c4.533 1.2 7.7 5.33 7.7 10.02v6.313a1.231 1.231 0 1 0 2.461 0V64.17a12.85 12.85 0 0 0-9.525-12.398zm-4.964-22.77h-.427V23.5h.427a2.75 2.75 0 0 1 2.747 2.747 2.75 2.75 0 0 1-2.747 2.747zm1.42-17.165v9.4a5.19 5.19 0 0 0-1.421-.199H43.17l-3.588-3.588V6.438h.758a5.41 5.41 0 0 1 5.4 5.4zm-34 14.42a2.75 2.75 0 0 1 2.747-2.747h.427v5.494h-.427a2.75 2.75 0 0 1-2.747-2.747zm5.635 4.158V23.5H21.6a1.231 1.231 0 1 0 0-2.461h-7.1a5.19 5.19 0 0 0-1.421.199V14.5c0-6.632 5.396-12.028 12.028-12.028h9.944c1.15 0 2.084.935 2.084 2.084V17.46l-2.007 2.007a5.36 5.36 0 0 1-3.817 1.58h-3.96a1.23 1.23 0 1 0 0 2.461h3.96a7.81 7.81 0 0 0 5.558-2.302l1.497-1.497 3.078 3.078v7.626c0 6.632-5.396 12.028-12.028 12.028s-12.028-5.396-12.028-12.028zm12.028 14.5a14.43 14.43 0 0 0 4.57-.739v5.128c0 2.52-2.05 4.57-4.57 4.57s-4.57-2.05-4.57-4.57v-5.128a14.43 14.43 0 0 0 4.57.739zm0 14.263a9.89 9.89 0 0 1-9.601-7.587l2.745-.732c.7 3.13 3.513 5.476 6.855 5.476s6.146-2.345 6.856-5.476l2.745.732a9.89 9.89 0 0 1-9.601 7.587zm38.45-56.4c-8.903 0-16.146 7.243-16.146 16.146a16.21 16.21 0 0 0 4.485 11.166l-1.885 4.06a1.23 1.23 0 0 0 1.634 1.635l4.942-2.294a16.2 16.2 0 0 0 6.97 1.58A16.17 16.17 0 0 0 84 18.916C84 10.012 76.756 2.77 67.853 2.77zm0 29.83a13.71 13.71 0 0 1-6.375-1.573A1.23 1.23 0 0 0 60.386 31l-2.43 1.128.833-1.795a1.23 1.23 0 0 0-.276-1.417 13.55 13.55 0 0 1-4.345-10.001c0-7.546 6.14-13.685 13.685-13.685S81.54 11.37 81.54 18.916 75.4 32.6 67.853 32.6zm8.31-20.046c-2.242-2.242-5.767-2.505-8.308-.77-2.54-1.734-6.066-1.47-8.308.77a6.49 6.49 0 0 0-1.914 4.62 6.49 6.49 0 0 0 1.914 4.62l7.438 7.438c.24.24.555.36.87.36s.63-.12.87-.36l7.438-7.438a6.54 6.54 0 0 0 0-9.24zm-1.74 7.5l-6.568 6.568-6.568-6.568c-.77-.77-1.193-1.792-1.193-2.88a4.05 4.05 0 0 1 1.193-2.88A4.06 4.06 0 0 1 67 14.249a1.23 1.23 0 0 0 1.713 0 4.09 4.09 0 0 1 5.712.045 4.08 4.08 0 0 1 0 5.76z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3
                    className="text-lg md:text-xl font-bold text-[#48255A]"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3", marginBottom: "14px" }}
                  >
                    Alineación y Cultura Organizacional
                  </h3>
                  <div className="flex flex-col gap-3">
                    <p className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <strong className="font-semibold text-[#48255A]">Apego a las Reglas:</strong> Determina el respeto y la importancia que el evaluado otorga a las normas internas, diferenciando a quienes las consideran directrices obligatorias de aquellos que las ven como simples sugerencias opcionales.
                    </p>
                    <p className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <strong className="font-semibold text-[#48255A]">Equidad y Justicia:</strong> Mide la disposición a actuar de manera imparcial y equitativa con los demás, identificando riesgos de sesgos corporativos, prejuicios o tratos de conveniencia.
                    </p>
                    <p className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <strong className="font-semibold text-[#48255A]">Trabajo en Equipo:</strong> Mide el nivel de adaptabilidad y alineación con los objetivos colectivos, priorizando el éxito del equipo por encima de las metas netamente individuales.
                    </p>
                    <p className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <strong className="font-semibold text-[#48255A]">Interés por el Trabajo (Compromiso Organizacional):</strong> Evalúa el valor que la persona le otorga al esfuerzo laboral y su nivel de enfoque para alcanzar las metas estratégicas de la empresa.
                    </p>
                    <p className="text-sm text-[#525252] leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      <strong className="font-semibold text-[#48255A]">Interés Egocéntrico:</strong> Identifica el grado de focalización exclusiva en el beneficio propio, determinando si esta tendencia puede llegar a desmedro o perjuicio de sus compañeros o de la organización.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Características Generales Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1000px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-[2px] bg-[#700FA3]" />
            <span
              style={{
                letterSpacing: "1px",
                fontSize: "14px",
                color: "#700FA3",
                fontWeight: "600",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Ficha Técnica
            </span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#48255A] mb-12"
            style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.2" }}
          >
            Características Generales de la Aplicación
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="flex flex-col bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-lg font-bold text-[#48255A] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>
                Volumen de Evaluación
              </h3>
              <p className="text-[#525252] text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                90 reactivos dinámicos y validados psicométricamente.
              </p>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl mb-3">💻</div>
              <h3 className="text-lg font-bold text-[#48255A] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>
                Modalidad de Aplicación
              </h3>
              <p className="text-[#525252] text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Formato flexible: 100% online.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl mb-3">📄</div>
              <h3 className="text-lg font-bold text-[#48255A] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>
                Entrega de Resultados
              </h3>
              <p className="text-[#525252] text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Reportes analíticos disponibles de forma inmediata tras finalizar la prueba.
              </p>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col bg-white border border-neutral-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="text-4xl mb-3">🔬</div>
              <h3 className="text-lg font-bold text-[#48255A] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}>
                Metodología
              </h3>
              <p className="text-[#525252] text-sm leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Indicador referencial de alta precisión para complementar filtros de seguridad y selección.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Cuándo implementar esta evaluación? Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <div className="flex items-center gap-3 mb-6 justify-center">
            <div className="w-12 h-[2px] bg-[#700FA3]" />
            <span
              style={{
                letterSpacing: "1px",
                fontSize: "14px",
                color: "#700FA3",
                fontWeight: "600",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Aplicabilidad
            </span>
          </div>

          <h2
            className="text-2xl sm:text-3xl md:text-[36px] font-bold text-[#48255A] mb-12 text-center"
            style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.2" }}
          >
            ¿Cuándo implementar esta evaluación?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="flex flex-col bg-white border border-neutral-200/80 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-[#FFC107]/50 transition-all duration-300 relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FFC107] rounded-l-xl" />
              <h3 className="text-lg md:text-xl font-bold text-[#48255A]" style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3", marginBottom: "14px" }}>
                Procesos de Selección (Pre-empleo)
              </h3>
              <p className="text-[#525252] text-sm leading-relaxed font-light flex-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Para filtrar perfiles confiables en puestos clave, de confianza, de alta responsabilidad o con acceso directo a valores y datos sensibles.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="flex flex-col bg-white border border-neutral-200/80 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-[#FFC107]/50 transition-all duration-300 relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FFC107] rounded-l-xl" />
              <h3 className="text-lg md:text-xl font-bold text-[#48255A]" style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3", marginBottom: "14px" }}>
                Evaluaciones de Permanencia (Periódicas)
              </h3>
              <p className="text-[#525252] text-sm leading-relaxed font-light flex-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Como auditoría preventiva para monitorear que los estándares éticos de tu personal activo se mantengan firmes a lo largo del ciclo laboral.
              </p>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col bg-white border border-neutral-200/80 rounded-xl p-8 shadow-sm hover:shadow-md hover:border-[#FFC107]/50 transition-all duration-300 relative pl-6">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FFC107] rounded-l-xl" />
              <h3 className="text-lg md:text-xl font-bold text-[#48255A]" style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3", marginBottom: "14px" }}>
                Promociones y Transferencias
              </h3>
              <p className="text-[#525252] text-sm leading-relaxed font-light flex-1" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Para asegurar que el colaborador que asumirá nuevas responsabilidades críticas posee la madurez moral y el apego a las normas que el puesto exige.
              </p>
            </div>
          </div>

        </div>
      </section>



      {/* ── FORMULARIO DE CONTACTO ── */}
      <section 
        id="contacto" 
        className="py-12 md:py-16 relative overflow-hidden"
        style={{
          backgroundImage: "linear-gradient(60deg, #700FA3 50%, #8A15C4 90%)",
          fontFamily: "var(--font-montserrat), sans-serif"
        }}
      >
        {/* Background Decorative Blobs */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-white/5 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#FFC107]/5 blur-[120px] pointer-events-none" />

        <div className="max-w-6xl lg:max-w-7xl xl:max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            {/* LADO IZQUIERDO: Información Comercial */}
            <div className="lg:col-span-6 flex flex-col text-left">
              {/* Logo de One True */}
              <div className="mb-4 flex justify-start">
                <img src="/FORM.webp" alt="One True Logo" loading="lazy" className="h-20 md:h-24 w-auto object-contain" />
              </div>

              {/* Título adaptado al estilo estándar de la página */}
              <h2
                style={{
                  fontSize: "clamp(24px, 5vw, 36px)",
                  fontWeight: "bold",
                  lineHeight: "40px",
                  color: "#ffffff",
                  fontFamily: "var(--font-montserrat), sans-serif",
                  marginTop: "10px",
                  marginBottom: "20px"
                }}
              >
                Contactos
              </h2>

              {/* Items List */}
              <div className="flex flex-col gap-5">
                {/* 1. Teléfono */}
                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.155-.44.011-.928.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 
                      style={{ 
                        fontSize: "18px", 
                        fontWeight: "bold", 
                        color: "#ffffff", 
                        fontFamily: "var(--font-montserrat), sans-serif",
                        marginBottom: "4px"
                      }}
                    >
                      Teléfono
                    </h3>
                    <a 
                      href="tel:0981296179" 
                      style={{ 
                        color: "rgba(255, 255, 255, 0.85)", 
                        fontSize: "16px", 
                        fontWeight: "300", 
                        fontFamily: "var(--font-montserrat), sans-serif" 
                      }}
                      className="hover:text-[#FFC107] transition-colors"
                    >
                      098 129 6179
                    </a>
                  </div>
                </div>

                {/* 2. Agencia Quito */}
                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75m3-3h.75m-.75 3h.75m-6 3h.75m3 0h.75m3 0h.75" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 
                      style={{ 
                        fontSize: "18px", 
                        fontWeight: "bold", 
                        color: "#ffffff", 
                        fontFamily: "var(--font-montserrat), sans-serif",
                        marginBottom: "4px"
                      }}
                    >
                      Agencia Quito
                    </h3>
                    <p 
                      style={{ 
                        color: "rgba(255, 255, 255, 0.85)", 
                        fontSize: "15px", 
                        fontWeight: "300", 
                        fontFamily: "var(--font-montserrat), sans-serif",
                        lineHeight: "1.4"
                      }}
                    >
                      Av. Pérez Guerreo OE3-124 y San Gregorio, Instituto de Diagnóstico Médico, tercer piso, oficina #303, Quito-Ecuador.
                    </p>
                  </div>
                </div>

                {/* 3. Agencia Guayaquil */}
                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 
                      style={{ 
                        fontSize: "18px", 
                        fontWeight: "bold", 
                        color: "#ffffff", 
                        fontFamily: "var(--font-montserrat), sans-serif",
                        marginBottom: "4px"
                      }}
                    >
                      Agencia Guayaquil
                    </h3>
                    <p 
                      style={{ 
                        color: "rgba(255, 255, 255, 0.85)", 
                        fontSize: "15px", 
                        fontWeight: "300", 
                        fontFamily: "var(--font-montserrat), sans-serif",
                        lineHeight: "1.4"
                      }}
                    >
                      Urdenor 2, Manzana 219, Solar 9
                    </p>
                  </div>
                </div>

                {/* 4. Correo */}
                <div className="flex items-start gap-5">
                  <svg className="w-8 h-8 text-white flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <div className="flex flex-col">
                    <h3 
                      style={{ 
                        fontSize: "18px", 
                        fontWeight: "bold", 
                        color: "#ffffff", 
                        fontFamily: "var(--font-montserrat), sans-serif",
                        marginBottom: "4px"
                      }}
                    >
                      Correo
                    </h3>
                    <a 
                      href="mailto:info@somosonetrue.com" 
                      style={{ 
                        color: "rgba(255, 255, 255, 0.85)", 
                        fontSize: "16px", 
                        fontWeight: "300", 
                        fontFamily: "var(--font-montserrat), sans-serif" 
                      }}
                      className="hover:text-[#FFC107] transition-colors"
                    >
                      info@somosonetrue.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Redes Sociales y Síguenos */}
              <div className="flex flex-col items-start gap-3 mt-6 pt-4 border-t border-white/10 w-full">
                <h3 
                  style={{ 
                    fontSize: "18px", 
                    fontWeight: "bold", 
                    color: "#ffffff", 
                    fontFamily: "var(--font-montserrat), sans-serif",
                    marginBottom: "4px"
                  }}
                >
                  Síguenos:
                </h3>
                <div className="flex items-center gap-3">
                  {/* Facebook */}
                  <a 
                    href="https://www.facebook.com/share/1F8T24NNKE/" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Síguenos en Facebook"
                    className="w-10 h-10 bg-white rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center text-[#700FA3] shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a 
                    href="https://www.instagram.com/somosonetrue?igsh=bXNmOWYwaWpsdDVh" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Síguenos en Instagram"
                    className="w-10 h-10 bg-white rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center text-[#700FA3] shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  {/* LinkedIn */}
                  <a 
                    href="https://www.linkedin.com/in/david-coli-fiallo-75679a198?utm_source=share_via&utm_content=profile&utm_medium=member_android" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Síguenos en LinkedIn"
                    className="w-10 h-10 bg-white rounded-full hover:scale-110 transition-all duration-300 flex items-center justify-center text-[#700FA3] shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* LADO DERECHO: Tarjeta de Formulario */}
            <div className="lg:col-span-6 relative">
              <div className="bg-white rounded p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.35)] border border-neutral-100 relative overflow-hidden transition-all duration-500">
                
                {!formSubmitted ? (
                  /* FORMULARIO ACTIVO */
                  <div>
                    <form 
                      onSubmit={(e) => {
                        e.preventDefault();
                        setFormSubmitted(true);
                      }}
                      className="flex flex-col gap-3"
                    >
                      {/* Fila 1: Nombre y Apellido */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Nombre *</label>
                          <input 
                            type="text" 
                            placeholder="Tu nombre" 
                            className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium" 
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                            required 
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Apellido *</label>
                          <input 
                            type="text" 
                            placeholder="Tu apellido" 
                            className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium" 
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                            required 
                          />
                        </div>
                      </div>

                      {/* Correo electrónico */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Correo electrónico *</label>
                        <div className="relative">
                          <input 
                            type="email" 
                            placeholder="correo@empresa.com" 
                            className="px-4 py-2.5 pr-10 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium" 
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                            required 
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-[#700FA3]">
                            <svg className="w-5 h-5 text-[#700FA3]" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Teléfono con Selector Bandera y Prefijo Real de Países */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Número de teléfono *</label>
                        <div className="relative flex items-center border-0 rounded bg-neutral-50 focus-within:ring-2 focus-within:ring-[#700FA3]/20 focus-within:bg-white focus-within:shadow-md transition-all overflow-hidden">
                          {/* Selector de Bandera y Prefijo Real de Países */}
                          <div className="flex items-center gap-2 pl-3 border-r border-neutral-200/60 bg-transparent shrink-0">
                            <img 
                              src={`https://flagcdn.com/w20/${country}.png`} 
                              alt={country} 
                              className="w-5 h-auto object-contain select-none" 
                            />
                            <select 
                              value={country}
                              onChange={(e) => setCountry(e.target.value)}
                              className="bg-transparent border-0 py-2.5 pl-1 pr-6 text-sm font-semibold text-neutral-700 outline-none focus:ring-0 cursor-pointer appearance-none"
                              style={{ 
                                fontFamily: "var(--font-montserrat), sans-serif",
                                backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                                backgroundPosition: 'right 0.1rem center',
                                backgroundSize: '1.1em 1.1em',
                                backgroundRepeat: 'no-repeat',
                              }}
                            >
                              <option value="ec">+593</option>
                              <option value="co">+57</option>
                              <option value="pe">+51</option>
                              <option value="cl">+56</option>
                              <option value="ar">+54</option>
                              <option value="mx">+52</option>
                              <option value="es">+34</option>
                              <option value="us">+1</option>
                            </select>
                          </div>
                          {/* Input */}
                          <input 
                            type="tel" 
                            placeholder="098 129 6179" 
                            className="flex-1 px-4 py-2.5 bg-transparent border-none text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-0 text-sm font-medium" 
                            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                            required 
                          />
                          <div className="pr-3 text-[#700FA3] pointer-events-none">
                            <svg className="w-5 h-5 text-[#700FA3]" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                            </svg>
                          </div>
                        </div>
                      </div>

                      {/* Ciudad */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Ciudad *</label>
                        <input 
                          type="text" 
                          placeholder="Tu ciudad" 
                          className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium" 
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                          required 
                        />
                      </div>

                      {/* Mensaje */}
                      <div className="flex flex-col gap-1">
                        <label className="text-xs font-semibold text-neutral-600" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>Mensaje *</label>
                        <textarea 
                          placeholder="Escribe tu mensaje aquí..." 
                          rows={2} 
                          className="px-4 py-2.5 rounded border-0 bg-neutral-50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:bg-white focus:shadow-md transition-all w-full text-sm font-medium resize-none" 
                          style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                          required 
                        ></textarea>
                      </div>

                      {/* Cláusula de Aceptación */}
                      <div className="flex flex-col gap-4 mt-2">
                        <p className="text-[11px] text-neutral-500 leading-relaxed font-light" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                          Al enviar este formulario, acepto que mis datos personales sean tratados de acuerdo con la{" "}
                          <a 
                            href="#" 
                            className="text-[#700FA3] hover:underline font-bold"
                          >
                            Política de tratamiento de datos personales
                          </a>{" "}
                          y los{" "}
                          <a 
                            href="#" 
                            className="text-[#700FA3] hover:underline font-bold"
                          >
                            términos establecidos en ella
                          </a>.
                        </p>
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            id="aceptar" 
                            className="w-4 h-4 rounded border-neutral-300 text-[#700FA3] focus:ring-[#700FA3] cursor-pointer" 
                            required 
                          />
                          <label htmlFor="aceptar" className="text-xs font-bold text-neutral-700 cursor-pointer select-none" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                            Aceptar
                          </label>
                        </div>
                      </div>

                      {/* Botón de Cotización */}
                      <button
                        type="submit"
                        className="mt-2 px-8 py-3.5 bg-[#700FA3] hover:bg-[#5C0B87] text-white font-bold rounded transition-all duration-300 w-full shadow-lg shadow-[#700FA3]/25 hover:scale-[1.01] active:scale-[0.99] text-base"
                        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                      >
                        Cotizar ahora
                      </button>

                      {/* WhatsApp Callout inside the Form */}
                      <div className="flex flex-col items-center gap-1.5 mt-5 pt-4 border-t border-neutral-100 w-full">
                        <span 
                          style={{ 
                            fontFamily: "var(--font-montserrat), sans-serif",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#48255A"
                          }}
                        >
                          O escríbenos
                        </span>
                        <div className="elementor-button-wrapper flex justify-center w-auto mt-1">
                          <a 
                            className="elementor-button elementor-button-link elementor-size-sm flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00C233] hover:bg-[#00a82c] text-white font-bold transition-all duration-300 rounded shadow-sm hover:shadow hover:scale-[1.02]"
                            href="https://api.whatsapp.com/send?phone=593981296179&text=%C2%A1Hola!%20Quiero%20conocer%20m%C3%A1s%20sobre%20los%20servicios%20de%20One%20True"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ 
                              fontFamily: "var(--font-montserrat), sans-serif", 
                              fontSize: "15px", 
                              fontWeight: "bold",
                              color: "#ffffff" 
                            }}
                          >
                            <span className="elementor-button-content-wrapper flex items-center justify-center gap-2" style={{ color: "#ffffff" }}>
                              <span className="elementor-button-icon flex items-center">
                                <svg 
                                  aria-hidden="true" 
                                  className="e-font-icon-svg e-fab-whatsapp w-4.5 h-4.5 fill-current" 
                                  viewBox="0 0 448 512" 
                                  xmlns="http://www.w3.org/2000/svg"
                                  style={{ fill: "#ffffff", color: "#ffffff" }}
                                >
                                  <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                                </svg>
                              </span>
                              <span className="elementor-button-text font-bold" style={{ color: "#ffffff", fontWeight: "bold" }}>+593 98 129 6179</span>
                            </span>
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  /* PANTALLA DE ÉXITO */
                  <div className="flex flex-col items-center text-center py-10">
                    <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6 animate-bounce">
                      <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                    </div>

                    <h3 className="text-3xl font-extrabold text-[#48255A] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      ¡Cotización Solicitada!
                    </h3>

                    <p className="text-neutral-500 text-sm font-light max-w-sm mb-8 leading-relaxed" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Muchas gracias por ponerte en contacto con nosotros. Tu mensaje ha sido recibido con éxito. Un representante de **One True** se comunicará contigo lo antes posible para darte información personalizada.
                    </p>

                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-3 border-2 border-[#700FA3] text-[#700FA3] hover:bg-[#700FA3] hover:text-white font-bold rounded transition-all duration-300 text-sm"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      Volver al formulario
                    </button>
                  </div>
                )}

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      
      {/* WhatsApp Button */}
      <FloatingWhatsApp />
    </main>
  );
}
