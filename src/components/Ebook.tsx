"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function Ebook() {
  const cardRef = useRef<HTMLDivElement>(null);

  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [puesto, setPuesto] = useState("");
  const [rubro, setRubro] = useState("");
  const [cantPersonas, setCantPersonas] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [ebookPdfUrl, setEbookPdfUrl] = useState("/ebook-poligrafia.pdf");
  const [ebookFileName, setEbookFileName] = useState("One-True-Guia-Poligrafia-Confiable.pdf");
  const [ebookSize, setEbookSize] = useState("");

  useEffect(() => {
    // Fetch ebook settings dynamically
    (async () => {
      try {
        const res = await fetch("/api/cms");
        if (res.ok) {
          const data = await res.json();
          if (data.settings) {
            const found = data.settings.find((s: any) => s.key === "ebook_pdf_url");
            if (found && found.value) {
              setEbookPdfUrl(found.value);
            }
            const foundName = data.settings.find((s: any) => s.key === "ebook_filename");
            if (foundName && foundName.value) {
              setEbookFileName(foundName.value);
            }
            const foundSize = data.settings.find((s: any) => s.key === "ebook_size");
            if (foundSize && foundSize.value) {
              setEbookSize(foundSize.value);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load ebook settings:", err);
      }
    })();
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 85%",
              toggleActions: "play none none none"
            }
          }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  const triggerDownload = async () => {
    // Normalize download filename and ensure it has a proper extension
    let downloadName = ebookFileName.trim();
    if (!downloadName) {
      downloadName = "One-True-Guia-Poligrafia-Confiable.pdf";
    }
    if (!/\.(pdf|doc|docx)$/i.test(downloadName)) {
      downloadName += ".pdf";
    }

    try {
      const fileResponse = await fetch(ebookPdfUrl);
      if (!fileResponse.ok) throw new Error("Error de red al obtener el archivo.");
      const blob = await fileResponse.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.warn("Blob download failed, falling back to direct link", err);
      const link = document.createElement("a");
      link.href = ebookPdfUrl;
      link.target = "_blank";
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          empresa,
          whatsapp,
          puesto,
          rubro,
          cantPersonas,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ocurrió un error al registrar tus datos.");
      }

      setSuccess(true);
      await triggerDownload();
    } catch (err: any) {
      console.error("Form submit error:", err);
      setError(err.message || "Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="ebook" className="bg-white py-16 md:py-24 relative overflow-hidden scroll-mt-20">
      {/* Decorative background blobs matching the screenshot vibe but with brand colors */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#700FA3] opacity-5 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFC107] opacity-5 rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

      <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Left Column: Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
          
          {/* Label */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-[3px] bg-[#700FA3]" />
            <span
              className="text-sm sm:text-base md:text-[18px]"
              style={{
                letterSpacing: "0.5px",
                color: "#700FA3",
                fontWeight: "600",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Ebook gratuito
            </span>
          </div>
          
          <h2
            className="text-fluid-h2"
            style={{
              margin: "0 auto 24px 0",
              padding: 0,
              fontWeight: "bold",
              lineHeight: "1.25",
              color: "#48255A",
              fontFamily: "var(--font-montserrat), sans-serif",
              maxWidth: "800px",
              width: "100%",
            }}
          >
            Guía práctica para saber si estoy contratando un servicio de poligrafía confiable.
          </h2>

          <p className="text-lg text-neutral-600 mb-4 leading-relaxed max-w-lg" style={{ fontFamily: "var(--font-montserrat), sans-serif", fontWeight: "700" }}>
            Descarga nuestro Ebook gratuito con la entrega del mes (PDF). Nuestro equipo trabaja constantemente para seguir trayendo nuevos ebooks gratuitos una vez al mes.
          </p>
        </div>

        {/* Right Column: Form Card */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
          <div ref={cardRef} className="bg-white rounded-2xl p-8 sm:p-10 shadow-[0_20px_50px_rgba(72,37,90,0.08)] border border-neutral-100 w-full max-w-[650px]">
            
            {/* Ebook Mockup Image Container */}
            <div className="w-full h-[180px] bg-neutral-100 rounded mb-6 relative overflow-hidden flex items-center justify-center">
              {/* Fallback pattern / gradient instead of image so it doesn't look broken */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#700FA3]/10 to-[#FFC107]/10"></div>
              <img 
                src="/blog/1.webp" 
                alt="Portada del Ebook One True: Guía práctica para contratar un servicio de poligrafía confiable en Ecuador" 
                className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply"
              />
            </div>

            {/* Form */}
            {success ? (
              <div className="flex flex-col items-center text-center py-6 px-2">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6 border" style={{ backgroundColor: "#DCFCE7", borderColor: "#86EFAC" }}>
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "#15803D" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-[#48255A] mb-3" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  ¡Registro Exitoso!
                </h3>
                <p className="text-sm text-neutral-500 mb-4 leading-relaxed max-w-sm" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Tu Ebook se ha descargado de forma automática.
                </p>
              </div>
            ) : (
              <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded text-red-650 text-xs font-semibold leading-relaxed">
                    ⚠️ {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
                  {/* Correo Electrónico */}
                  <div className="flex flex-col gap-1.5 text-left font-montserrat">
                    <label className="text-xs sm:text-[13px] font-bold text-neutral-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Correo Electrónico
                    </label>
                    <input 
                      type="email" 
                      placeholder="Correo corporativo o personal" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3.5 rounded border border-neutral-200 bg-neutral-50/50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:border-[#700FA3] transition-all text-sm font-semibold"
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Nombre de la Empresa */}
                  <div className="flex flex-col gap-1.5 text-left font-montserrat">
                    <label className="text-xs sm:text-[13px] font-bold text-neutral-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      Nombre de la Empresa
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ej: Mi Empresa S.A." 
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      className="w-full px-4 py-3.5 rounded border border-neutral-200 bg-neutral-50/50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:border-[#700FA3] transition-all text-sm font-semibold"
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* WhatsApp */}
                  <div className="flex flex-col gap-1.5 text-left font-montserrat">
                    <label className="text-xs sm:text-[13px] font-bold text-neutral-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      WhatsApp / Teléfono
                    </label>
                    <input 
                      type="tel" 
                      placeholder="Ej: +593 99 999 9999" 
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      className="w-full px-4 py-3.5 rounded border border-neutral-200 bg-neutral-50/50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:border-[#700FA3] transition-all text-sm font-semibold"
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Puesto */}
                  <div className="flex flex-col gap-1.5 text-left font-montserrat">
                    <label className="text-xs sm:text-[13px] font-bold text-neutral-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      ¿Qué puesto tienes?
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ej: Director de RRHH..." 
                      value={puesto}
                      onChange={(e) => setPuesto(e.target.value)}
                      className="w-full px-4 py-3.5 rounded border border-neutral-200 bg-neutral-50/50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:border-[#700FA3] transition-all text-sm font-semibold"
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Rubro */}
                  <div className="flex flex-col gap-1.5 text-left font-montserrat">
                    <label className="text-xs sm:text-[13px] font-bold text-neutral-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      ¿A qué se dedica tu empresa?
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ej: Logística, Seguridad, Retail..." 
                      value={rubro}
                      onChange={(e) => setRubro(e.target.value)}
                      className="w-full px-4 py-3.5 rounded border border-neutral-200 bg-neutral-50/50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:border-[#700FA3] transition-all text-sm font-semibold"
                      required
                      disabled={loading}
                    />
                  </div>

                  {/* Cantidad de Personas */}
                  <div className="flex flex-col gap-1.5 text-left font-montserrat">
                    <label className="text-xs sm:text-[13px] font-bold text-neutral-500 uppercase tracking-wider" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                      ¿Cuántas personas trabajan?
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ej: 11-50, más de 200..." 
                      value={cantPersonas}
                      onChange={(e) => setCantPersonas(e.target.value)}
                      className="w-full px-4 py-3.5 rounded border border-neutral-200 bg-neutral-50/50 text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#700FA3]/20 focus:border-[#700FA3] transition-all text-sm font-semibold"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
                
                <p className="text-[11px] text-neutral-500 leading-relaxed font-light text-center mt-1 font-montserrat" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                  Al solicitar el Ebook, aceptas nuestra{" "}
                  <a href="/politica-de-privacidad" className="text-[#700FA3] hover:underline font-bold" style={{ fontSize: "inherit" }}>
                    Política de Privacidad
                  </a>.
                </p>

                <button 
                  type="submit"
                  aria-label="Descargar u obtener Ebook gratuito de Poligrafía"
                  disabled={loading}
                  className="w-full mt-2 px-6 py-4 bg-[#700FA3] text-white font-bold rounded hover:bg-[#5a0c82] transition-colors duration-300 text-lg shadow-[0_4px_15px_rgba(112,15,163,0.25)] flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed cursor-pointer font-montserrat"
                  style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-l-transparent" />
                      Procesando...
                    </>
                  ) : (
                    "Obtener Ebook Gratis"
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </section>
  );
}
