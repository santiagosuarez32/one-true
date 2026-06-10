import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | One True Ecuador",
  description: "Consulta los Términos y Condiciones de uso del sitio web y servicios de One True Ecuador. Normativa de uso legal, propiedad intelectual y responsabilidades.",
};

export default function TerminosCondicionesPage() {
  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      <Navbar />

      {/* Hero Section (Academia Style) */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-36 pb-24 bg-[#700FA3]">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #700FA3 0%, #700FA3 35%, rgba(112, 15, 163, 0.9) 48%, rgba(112, 15, 163, 0.6) 60%, rgba(112, 15, 163, 0.3) 72%, rgba(112, 15, 163, 0.05) 86%, transparent 100%)",
          }}
        />

        <img
          src="/hero/slider-3.webp"
          alt="Términos y Condiciones - One True Academia"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-right-top z-0 opacity-25 mix-blend-overlay pointer-events-none"
        />

        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 z-10 flex justify-start items-center">
          <div className="max-w-3xl text-left">
            <Breadcrumbs />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-[3px] bg-[#FFC107]" />
              <span
                className="text-xs sm:text-sm md:text-base font-semibold text-[#FFC107]"
                style={{
                  letterSpacing: "0.5px",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Condiciones de Uso del Portal
              </span>
            </div>

            <h1
              className="mb-6 !text-3xl sm:!text-4xl md:!text-5xl lg:!text-[52px] font-semibold leading-tight text-white"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)",
              }}
            >
              Términos y{" "}
              <strong
                style={{
                  fontWeight: "800",
                  textDecoration: "underline",
                  textDecorationColor: "#FFC107",
                  textUnderlineOffset: "6px",
                }}
              >
                Condiciones
              </strong>
            </h1>

            <p
              className="opacity-95 !text-sm sm:!text-base md:!text-lg font-medium text-white"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                lineHeight: "32px",
              }}
            >
              Por favor, lee con detenimiento los términos y condiciones que rigen el uso de nuestro portal web antes de interactuar con el contenido o los servicios.
            </p>
            <div className="text-xs text-white/80 mt-4 font-semibold uppercase tracking-wider" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
              Última actualización: 10 de junio de 2026
            </div>
          </div>
        </div>
      </section>

      {/* Content Section (Academia Style Layout) */}
      <section className="bg-[#fcfbfd] py-20 relative overflow-hidden">
        {/* Soft Grid Background */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(112,15,163,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(112,15,163,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none" />

        <div className="w-full max-w-4xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex flex-col gap-12 text-left">
            
            {/* 1. Objeto */}
            <div className="flex flex-col items-start bg-white p-8 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FFC107] rounded-l-2xl" />
              <h2
                className="mb-4"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#48255A",
                }}
              >
                1. Objeto de las Condiciones
              </h2>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 text-justify">
                El presente documento regula el acceso y la utilización del sitio web <a href="https://somosonetrue.com" className="text-[#700FA3] hover:underline font-bold">somosonetrue.com</a>. El acceso a la web y el uso de su contenido implica la aceptación plena de todos los términos establecidos en este documento. Si no estás de acuerdo con estos términos, deberás abstenerte de navegar y hacer uso del portal.
              </p>
            </div>

            {/* 2. Propiedad Intelectual */}
            <div className="flex flex-col items-start bg-white p-8 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#700FA3] rounded-l-2xl" />
              <h2
                className="mb-4"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#48255A",
                }}
              >
                2. Propiedad Intelectual e Industrial
              </h2>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 text-justify">
                Todos los derechos de propiedad intelectual del contenido de este sitio web, incluyendo de forma enunciativa mas no limitativa: textos, imágenes, logotipos, marcas comerciales, estructura de navegación, código fuente y archivos de audio/video, son propiedad exclusiva de <strong>One True</strong> o de terceros que han autorizado su uso legal. Queda estrictamente prohibida la reproducción, distribución o comunicación pública de cualquier fragmento o material del sitio sin la autorización expresa y por escrito de la Empresa.
              </p>
            </div>

            {/* 3. Obligaciones del Usuario */}
            <div className="flex flex-col items-start bg-white p-8 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FFC107] rounded-l-2xl" />
              <h2
                className="mb-4"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#48255A",
                }}
              >
                3. Obligaciones del Usuario
              </h2>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 mb-4 text-justify">
                Como usuario del sitio, te comprometes a realizar un uso adecuado y lícito de la web, respetando las siguientes directrices:
              </p>
              <ul className="space-y-3 list-disc list-inside text-sm text-[#525252] font-semibold pl-2">
                <li>Proporcionar información verídica, exacta y actualizada al completar cualquiera de nuestros formularios.</li>
                <li>No utilizar el portal con fines ilícitos, lesivos para la Empresa o para terceros, ni que atenten contra la seguridad informática del sitio.</li>
                <li>No alterar ni intentar acceder de forma no autorizada al panel de administración o bases de datos de la plataforma.</li>
                <li>Hacer un uso personal y profesional legítimo de los contenidos y Ebooks gratuitos descargados, sin revenderlos ni adjudicarse su autoría.</li>
              </ul>
            </div>

            {/* 4. Limitación de Responsabilidad */}
            <div className="flex flex-col items-start bg-white p-8 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#700FA3] rounded-l-2xl" />
              <h2
                className="mb-4"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#48255A",
                }}
              >
                4. Limitación de Responsabilidad
              </h2>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 text-justify">
                One True realiza el máximo esfuerzo para mantener la disponibilidad ininterrumpida y el contenido actualizado de la web. Sin embargo, no nos responsabilizamos por interrupciones técnicas temporales, errores de red, ni por posibles daños derivados de software malicioso introducido por terceros ajenos a nuestro control. Asimismo, la información compartida en el blog y los Ebooks tiene un carácter informativo y de orientación profesional; no constituye una asesoría jurídica vinculante ni reemplaza los criterios técnicos de evaluación formal.
              </p>
            </div>

            {/* 5. Cursos y Calendario */}
            <div className="flex flex-col items-start bg-white p-8 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FFC107] rounded-l-2xl" />
              <h2
                className="mb-4"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#48255A",
                }}
              >
                5. Políticas sobre Cursos y Formaciones
              </h2>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 text-justify">
                La publicación de cursos y el calendario académico en la web constituye una invitación a registrarse e informarse de los programas disponibles. One True se reserva el derecho de modificar fechas, temarios, conferencistas y cupos mínimos para la apertura de las formaciones complementarias o avanzadas. Toda matrícula formal y sus términos comerciales específicos se formalizan a través de contratos y facturación independiente fuera del portal.
              </p>
            </div>

            {/* 6. Enlaces */}
            <div className="flex flex-col items-start bg-white p-8 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#700FA3] rounded-l-2xl" />
              <h2
                className="mb-4"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#48255A",
                }}
              >
                6. Enlaces Externos
              </h2>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 text-justify">
                Este portal puede contener enlaces a perfiles externos (como nuestras redes sociales oficiales o canales de vídeo). One True no tiene control sobre las políticas de seguridad ni el tratamiento de datos de estos portales de terceros, por lo que te recomendamos revisar detenidamente sus respectivos términos de uso y políticas de privacidad al salir de nuestro dominio.
              </p>
            </div>

            {/* 7. Modificación */}
            <div className="flex flex-col items-start bg-white p-8 rounded-2xl border border-neutral-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] transition-all duration-300 relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#FFC107] rounded-l-2xl" />
              <h2
                className="mb-4"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "22px",
                  fontWeight: "800",
                  color: "#48255A",
                }}
              >
                7. Modificación de las Condiciones y Legislación Aplicable
              </h2>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 mb-4 text-justify">
                Nos reservamos el derecho de modificar o actualizar estos Términos y Condiciones en cualquier momento sin necesidad de notificación previa. Las modificaciones entrarán en vigencia a partir de su publicación en el sitio web.
              </p>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 text-justify">
                Estos Términos y Condiciones se rigen bajo las leyes vigentes de la República del Ecuador. Para cualquier controversia derivada del uso del portal o de la interpretación de este documento, las partes se someten a la jurisdicción de los tribunales de la ciudad de Quito, Ecuador.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
