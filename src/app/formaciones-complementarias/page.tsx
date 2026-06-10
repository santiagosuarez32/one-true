import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumbs from "@/components/Breadcrumbs";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Link from "next/link";
import ContactoFormAvanzados from "@/components/ContactoFormAvanzados";
import { getCourses } from "@/lib/cms";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Formaciones Complementarias | Academia One True",
  description: "Cursos y talleres complementarios sobre técnicas de entrevista, rapport y psicología del comportamiento. Programas basados en ciencia para investigadores y psicólogos forenses.",
  keywords: ["tecnicas de entrevista", "psicologia del comportamiento", "evaluacion de credibilidad", "entrevistas basadas en ciencia", "psicologia forense", "criminologia"],
  openGraph: {
    title: "Formaciones Complementarias | Academia One True",
    description: "Cursos y talleres complementarios sobre técnicas de entrevista, rapport y psicología del comportamiento. Programas basados en ciencia para investigadores y psicólogos forenses.",
    url: "https://somosonetrue.com/formaciones-complementarias",
    type: "website",
  }
};

export const revalidate = 3600;

const focusAreas = [
  {
    title: "Ejes Temáticos",
    items: [
      "Un recorrido profundo por las formaciones complementarias:",
      "Técnicas avanzadas de entrevista y rapport.",
      "Psicología del comportamiento en contextos de evaluación.",
      "Ética profesional y confidencialidad en poligrafía.",
      "Comunicación efectiva de resultados a stakeholders.",
      "Manejo de situaciones conflictivas y evaluados resistentes.",
      "Normativas legales y admisibilidad de pruebas.",
      "Redacción de reportes profesionales impactantes.",
      "Actualización en tecnología poligráfica moderna.",
      "Casos prácticos y resolución de dilemas éticos.",
      "Especialización en perfiles específicos.",
      "Networking y desarrollo profesional continuo.",
    ],
    iconViewBox: "0 0 85 93",
    iconPaths: [
      "M27.648 39.7c0 13.904 11.447 25.217 25.516 25.217s25.5-11.312 25.5-25.217a24.71 24.71 0 0 0-2.78-11.457c-1.654-3.2-4.024-6.058-6.878-8.302v-2.443c0-5.292-1.704-9.778-4.926-12.973C61.215 1.672 57.342.066 53.187 0a.87.87 0 0 0-.043 0c-4.158.065-8.033 1.672-10.9 4.524-3.224 3.194-4.927 7.68-4.927 12.973v2.443a25.54 25.54 0 0 0-6.878 8.302c-1.845 3.57-2.78 7.424-2.78 11.457zm44.387 12.6a22.85 22.85 0 0 1-18.871 9.916c-7.844 0-14.775-3.938-18.876-9.918v-3.36c0-5.464 3.526-7.155 7.72-8.368l8.472 4.913c.976.62 1.828.93 2.68.93s1.705-.3 2.68-.93l8.473-4.913c4.193 1.214 7.72 2.904 7.72 8.37v3.36zm-26.4-12.76c1.4-.62 2.137-1.917 2.584-2.96a15.43 15.43 0 0 0 .849.344c1.46.534 2.783.8 4.106.8s2.646-.267 4.102-.8a15.4 15.4 0 0 0 .85-.344c.446 1.045 1.184 2.34 2.584 2.96l-6.263 3.632a1.15 1.15 0 0 0-.051.031c-1.075.688-1.372.688-2.448 0l-.05-.03-6.262-3.63zm30.32.16a22.19 22.19 0 0 1-1.29 7.47c-.774-6.183-5.648-8.096-10.156-9.353l-.033-.01-1.5-.407-.958-.255c-.723-.194-1.163-1.092-1.467-1.86 4.334-2.777 7.708-7.484 8.368-11.878 4.508 4.237 7.047 10.042 7.047 16.3zm-22.78-37c5.98.104 12.385 4.3 13.064 13.2-1.392-.376-2.108-1.098-2.856-1.853-1.046-1.056-2.348-2.37-5.1-1.67l-1.96.5c-1.63.43-2.446.647-3.148.647s-1.528-.217-3.167-.65l-1.947-.507c-2.748-.7-4.05.613-5.094 1.668-.75.755-1.466 1.48-2.862 1.855.68-8.923 7.087-13.108 13.07-13.212zm-13.13 15.988c2.625-.478 3.904-1.767 4.87-2.743.93-.938 1.243-1.253 2.463-.943l1.923.5c1.8.48 2.808.742 3.872.742s2.053-.262 3.854-.74L58.962 15c1.225-.312 1.538.005 2.47.944.967.975 2.244 2.263 4.866 2.74v3.193c0 4.72-4.66 10.568-9.97 12.513-2.327.854-3.978.854-6.3 0-5.312-1.946-9.97-7.794-9.97-12.513v-3.193zm-2.6 4.72c.66 4.393 4.035 9.1 8.37 11.878-.304.767-.745 1.665-1.464 1.86l-.955.254-1.505.405a1.26 1.26 0 0 0-.075.021c-4.5 1.257-9.354 3.175-10.127 9.343a22.18 22.18 0 0 1-1.3-7.47c0-6.25 2.54-12.054 7.047-16.3zm38.193-6.053l-2.087-1.9c-.58-.477-1.44-.4-1.922.175a1.34 1.34 0 0 0 .177 1.9l1.902 1.722C79.23 24.722 82.27 31.98 82.27 39.7s-3.04 14.977-8.562 20.435c-11.4 11.268-29.948 11.268-41.347 0C26.84 54.677 23.8 47.42 23.8 39.7s3.04-14.977 8.563-20.435c.53-.525 1.028-.983 1.52-1.4a1.34 1.34 0 0 0 .148-1.903c-.5-.566-1.352-.63-1.925-.146a29.31 29.31 0 0 0-1.673 1.54C24.395 23.324 21.07 31.26 21.07 39.7a31.12 31.12 0 0 0 6 18.439l-6.165 6.094-.126-.125a2.36 2.36 0 0 0-1.669-.682 2.36 2.36 0 0 0-1.67.683l-4.22 4.175c-.01.01-.02.017-.03.026s-.018.02-.027.03l-3.2 3.16a1.34 1.34 0 0 0 .001 1.908c.533.527 1.398.526 1.93-.001l2.26-2.236 7.036 6.954-9.977 9.86a4.96 4.96 0 0 1-3.517 1.435c-1.333 0-2.582-.5-3.518-1.436a4.87 4.87 0 0 1-1.45-3.477c0-1.317.515-2.553 1.45-3.477l3.56-3.518a1.34 1.34 0 0 0 0-1.908c-.533-.527-1.397-.527-1.93 0l-3.56 3.518A7.52 7.52 0 0 0 0 84.508c0 2.04.8 3.952 2.248 5.385a7.69 7.69 0 0 0 5.449 2.227c2.064 0 4-.8 5.448-2.227l15.2-15c.445-.44.7-1.027.7-1.653s-.245-1.213-.7-1.653l-.123-.122 6.168-6.097c5.55 3.947 12.102 5.922 18.654 5.922 8.186 0 16.372-3.08 22.604-9.24C81.676 56.074 85 48.14 85 39.698s-3.325-16.375-9.362-22.343zM23.122 76.22l-7.037-6.955 3.023-3 7.038 6.957-3.024 2.988zm3.16-6.67l-3.448-3.408 5.936-5.868a32.34 32.34 0 0 0 1.66 1.769c.58.573 1.176 1.12 1.787 1.638L26.28 69.55z",
    ],
  },
];

export default async function FormacionesComplementariasPage() {
  let displayCourses: any[] = [];
  try {
    const courses = await getCourses();
    displayCourses = courses.filter((c: any) => c.published && c.pageContent?.isComplementary === true);
  } catch (err) {
    console.error("Error loading complementarias courses:", err);
  }

  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      <Navbar />

      <section className="relative min-h-[80vh] flex items-start md:items-center justify-center overflow-hidden pt-32 pb-24 bg-[#700FA3]">
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(to right, #700FA3 0%, #700FA3 35%, rgba(112, 15, 163, 0.9) 48%, rgba(112, 15, 163, 0.6) 60%, rgba(112, 15, 163, 0.3) 72%, rgba(112, 15, 163, 0.05) 86%, transparent 100%)",
          }}
        />

        <img
          src="/formaciones-complementarias.webp"
          alt="Formaciones Complementarias - One True Academia"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-right-center z-0 opacity-40 mix-blend-overlay pointer-events-none"
        />

        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 z-10 flex justify-start items-center">
          <div className="max-w-5xl text-left">
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
                Domine las técnicas de entrevista y evaluación forense de credibilidad más avanzadas del mundo.
              </span>
            </div>

            <h1
              className="mb-6 !text-2xl sm:!text-3xl md:!text-4xl lg:!text-[42px] font-semibold"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                margin: "0 0 28px 0",
                padding: 0,
                lineHeight: "1.1",
                color: "#FFFFFF",
                textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)",
              }}
            >
              Programas de Especialización en evaluación forense de la credibilidad y protocolos de entrevistas basadas en ciencia.
            </h1>

            <p
              className="mb-6 opacity-95 !text-sm sm:!text-base md:!text-lg font-medium"
              style={{
                textAlign: "start",
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "#FFFFFF",
              }}
            >
              En el ámbito forense y gestión y administración de riesgos corporativos, la actualización constante es la única garantía de precisión. Nuestros programas están diseñados para profesionales que buscan dominar modelos científicos de entrevista e identificación de riesgos, elevando el estándar de sus investigaciones.
            </p>

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
                Solicitar información del programa
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-8 md:px-12 lg:px-16">
          <div className="mb-16 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-10 h-[3px] bg-[#700FA3]" />
              <span
                style={{
                  letterSpacing: "0.5px",
                  fontSize: "16px",
                  color: "#700FA3",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Cursos Online
              </span>
            </div>
            <h2
              className="text-2xl sm:text-3xl md:text-[36px] font-semibold mb-4"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "#48255A",
              }}
            >
              Áreas de Especialización
            </h2>
            <p
              className="text-lg"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                color: "#525252",
                textAlign: "center",
                margin: "0 auto",
              }}
            >
              Desarrolle competencias críticas con metodologías validadas internacionalmente:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
            {displayCourses.map((curso, index) => (
              <Link
                href={curso.href ?? "#contacto"}
                key={index}
                className="group flex flex-col rounded-3xl overflow-hidden bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_50px_rgba(112,15,163,0.18)] hover:-translate-y-2.5 transition-all duration-500 w-full max-w-[380px] border border-neutral-100 no-underline text-inherit hover:text-inherit"
              >
                {/* Imagen Superior */}
                <div className="relative w-full h-52 overflow-hidden bg-gradient-to-br from-[#700FA3] to-[#8A15C4]">
                  <img
                    src={curso.image}
                    alt={curso.title}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-108 transition-transform duration-700 ease-out ${index === 1 ? 'object-top' : ''}`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#700FA3]/40 via-[#700FA3]/20 to-transparent" />
                </div>

                {/* Contenido Inferior */}
                <div className="flex flex-col p-6 text-left flex-1 justify-between">
                  <div>
                    {/* Titulo */}
                    <h3
                      className="text-[#48255A] text-[17px] font-bold mb-3 min-h-[50px] flex items-center group-hover:text-[#700FA3] transition-colors duration-300"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif", lineHeight: "1.3" }}
                    >
                      {curso.title}
                    </h3>

                    {/* Descripción */}
                    <p
                      className="text-[#525252]/95 text-xs leading-relaxed font-medium mb-4"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      {curso.desc}
                    </p>
                  </div>

                  <div>
                    {/* Botón */}
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-2.5 bg-[#700FA3] font-bold rounded-lg text-xs self-start hover:brightness-110 transition-all duration-300 w-full justify-center group-hover:shadow-md"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif", color: "#FFD700" }}
                    >
                      Ver Cursos
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Beneficios Section */}
      <section className="bg-white py-12 md:py-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#700FA3]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />

        <div className="w-full max-w-6xl lg:max-w-7xl xl:max-w-[1350px] mx-auto px-8 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">

          {/* Left Column: Images */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                <img
                  src="/servicios/3.webp"
                  alt="Formaciones Complementarias"
                  loading="lazy"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
              </div>

              <div className="absolute -top-8 -left-8 w-24 h-24 z-0 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(#700FA3 2px, transparent 2px)',
                  backgroundSize: '12px 12px'
                }}
              />
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="w-full lg:w-1/2 flex flex-col items-start lg:pl-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-[2px] bg-[#700FA3]" />
              <span
                style={{
                  letterSpacing: "0.5px",
                  fontSize: "16px",
                  color: "#700FA3",
                  fontWeight: "600",
                  fontFamily: "var(--font-montserrat), sans-serif",
                }}
              >
                Beneficios
              </span>
            </div>

            <h2
              className="text-2xl sm:text-3xl md:text-[36px] mb-6"
              style={{
                fontWeight: "bold",
                lineHeight: "1.2",
                color: "#48255A",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              ¿Por qué elegir nuestra formación?
            </h2>

            <ul className="flex flex-col gap-3 w-full mb-6">
              {[
                { title: "Herramientas de Alto Impacto", text: "Metodologías aplicables de inmediato en investigaciones reales y procesos de selección." },
                { title: "Enfoque Científico", text: "Basamos nuestra enseñanza en estudios de psicología forense y psicofisiología actuales." },
                { title: "Docencia Experta", text: "Dirigido por especialistas activos en el campo de la poligrafía and la criminología." }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 py-1">
                  <div className="w-6 h-6 rounded flex items-center justify-center bg-[#700FA3] text-white shrink-0 mt-0.5 shadow-md">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span
                    className="text-base text-[#525252] font-medium leading-relaxed"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    <strong className="font-bold text-[#48255A]">{item.title}: </strong>
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <a
                href="#contacto"
                className="px-8 py-3 rounded transition-all hover:brightness-110 shadow-lg inline-block text-center cursor-pointer w-full sm:w-auto whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  lineHeight: "1",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#5F0091",
                  backgroundColor: "#FFC107",
                  textDecoration: "none",
                  border: "none"
                }}
              >
                <span>Ver Catálogo de Cursos</span>
              </a>
              <a
                href="#contacto"
                className="px-8 py-3 rounded transition-all hover:brightness-110 shadow-lg inline-block text-center cursor-pointer w-full sm:w-auto whitespace-nowrap"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  lineHeight: "1",
                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#FFFFFF !important",
                  backgroundColor: "#700FA3",
                  textDecoration: "none",
                  border: "none"
                }}
              >
                <span style={{ color: "#FFFFFF" }}>Solicitar Capacitación</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── FORMULARIO DE CONTACTO ── */}
      <ContactoFormAvanzados
        contactPhone="099 371 2790"
        contactWhatsapp="https://api.whatsapp.com/send?phone=593993712790&text=Hola!%20Deseo%20conocer%20mas%20informacion%20sobre%20las%20Formaciones%20Complementarias."
        contactWhatsappText="+593 99 371 2790"
      />

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
