"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

export default function BlogArticlePage() {
  return (
    <main className="min-h-screen bg-white text-[#525252] selection:bg-[#FFC107] selection:text-[#411A56]">
      <Navbar />

      {/* Hero Section with Image */}
      <section className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <img
          src="/blog/3.webp"
          alt="Garantiza la Verdad: 10 Requisitos Clave para una Prueba de Polígrafo Confiable y Exitosa"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* Article Content */}
      <article className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-16">

        {/* Article Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-0.75 bg-[#700FA3]" />
            <span
              className="text-sm md:text-base"
              style={{
                letterSpacing: "0.5px",
                color: "#700FA3",
                fontWeight: "600",
                fontFamily: "var(--font-montserrat), sans-serif",
              }}
            >
              Blog
            </span>
          </div>

          <h1
            className="text-4xl md:text-5xl font-bold mb-6"
            style={{
              color: "#48255A",
              fontFamily: "var(--font-montserrat), sans-serif",
              lineHeight: "1.2",
            }}
          >
            Garantiza la Verdad: 10 Requisitos Clave para una Prueba de Polígrafo Confiable y Exitosa.
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            <span>Publicado el 25 de Noviembre, 2024</span>
            <span>•</span>
            <span>7 min de lectura</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          <h2 className="text-2xl font-bold mt-0 mb-6" style={{ color: "#48255A" }}>
            Introducción
          </h2>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Has tomado una decisión importante para tu empresa o proceso personal al optar por una prueba de polígrafo. Sin embargo, es crucial entender que la confiabilidad de los resultados no depende únicamente de la tecnología avanzada que utilizamos en OneTrue, sino también de las condiciones en las que se realiza la evaluación.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Tanto si eres el contratante del servicio como si eres la persona que se someterá a la prueba, tu colaboración es fundamental. Un estado físico o mental inadecuado puede interferir con los registros fisiológicos de la prueba de polígrafo, afectando la precisión del análisis.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Por eso, hemos creado esta guía con 10 recomendaciones esenciales. Seguir estos pasos no es solo un trámite, es la garantía de que obtendremos un resultado objetivo, científico y 100% útil para ti.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: "#48255A" }}>
            Los 10 Pasos para un Resultado Exitoso
          </h2>

          <p className="text-lg leading-relaxed mb-8 text-gray-700">
            Aquí te detallamos lo que debes hacer (y lo que debes evitar) antes de tu cita:
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-3" style={{ color: "#700FA3" }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            1. El Descanso es Prioritario
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            El cansancio extremo afecta tu concentración y las reacciones de tu cuerpo. Es fundamental que hayas dormido al menos 6 horas la noche anterior. Venir bien descansado asegura que tus respuestas fisiológicas sean claras y analizables por el polígrafo.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-3" style={{ color: "#700FA3" }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            2. No Vengas en Ayunas
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Contrario a otros exámenes médicos, para la prueba de polígrafo necesitamos que tu cuerpo esté funcionando con normalidad. Por favor, come con normalidad (desayuno o almuerzo ligero) antes de acudir. El hambre genera malestar que puede interferir con el procedimiento.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-3" style={{ color: "#700FA3" }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v12m6-3H6" />
            </svg>
            3. Mantén tu Medicación
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Si tomas medicamentos recetados para controlar condiciones como la presión arterial, diabetes u otras, NO SUSPENDAS TU TRATAMIENTO. Tomar tu medicina habitual es vital para que tus signos vitales estén estables y reflejen tu estado natural.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-3" style={{ color: "#700FA3" }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            4. Cero Sustancias Psicoactivas y Alcohol
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Esta es una regla de oro. Está estrictamente prohibido el consumo de licor o cualquier sustancia psicoactiva (drogas ilegales) en las 24 horas previas a la examinación. Estas sustancias alteran directamente el sistema nervioso central, haciendo imposible una lectura válida del detector de mentiras.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-3" style={{ color: "#700FA3" }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            5. Infórmanos sobre tu Salud
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            La transparencia es clave. Si tienes gripe y tos fuerte, o tienes algún dolor importante que sea comprobable o presentas algún síntoma inusual el día de la prueba, es importante reportarlo antes de comenzar. Esto le permite al poligrafista profesional tomar las medidas necesarias o evaluar si es viable proceder.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-3" style={{ color: "#700FA3" }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            6. Puntualidad y Tiempo
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            El proceso no se puede apresurar. Planifica tu agenda para disponer de aproximadamente 90 a 120 minutos. Además, te pedimos llegar 20 minutos antes de la hora agendada para completar cualquier trámite inicial con calma y sin prisas que generen estrés innecesario.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-3" style={{ color: "#700FA3" }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            7. Documentación Obligatoria
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Para garantizar la legalidad y formalidad del proceso, es indispensable que traigas tu Cédula de Identidad original y vigente. Sin este documento, no podremos iniciar la evaluación.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-3" style={{ color: "#700FA3" }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4l1-12z" />
            </svg>
            8. Comodidad ante Todo
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            La prueba implica estar sentado y conectado a sensores durante un tiempo. Te recomendamos usar ropa cómoda y holgada. Evita prendas demasiado ajustadas, mangas muy largas o exceso de accesorios que puedan incomodarte o interferir con la colocación de los componentes del polígrafo.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-3" style={{ color: "#700FA3" }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            9. Privacidad y Confidencialidad
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            El entorno de la prueba debe ser completamente neutral y libre de distracciones. Por favor, acude solo/a a tu cita. No se permite la presencia de niños, familiares o acompañantes dentro de la sala de evaluación para garantizar la integridad y confidencialidad del proceso.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4 flex items-center gap-3" style={{ color: "#700FA3" }}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            10. Actitud de Cooperación
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Finalmente, el requisito más importante es tu voluntad. El procedimiento es voluntario. Venir con una actitud cooperativa y la intención de aclarar la verdad facilita enormemente el trabajo del examinador y contribuye a un resultado exitoso y transparente.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: "#48255A" }}>
            Conclusión
          </h2>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            En OneTrue, nos comprometemos a brindarte el servicio de poligrafía más profesional y preciso de Ecuador. Al cumplir con estos sencillos pero vitales requisitos, nos ayudas a cumplir esa promesa.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Si tienes alguna duda adicional sobre estas recomendaciones antes de tu cita, no dudes en contactar a nuestro equipo. Estamos aquí para guiarte en cada paso del camino hacia la verdad.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-[#700FA3]/10 rounded-2xl border border-[#700FA3]/20">
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: "#48255A", fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            ¿Listo para una Evaluación de Calidad?
          </h3>
          <p className="text-lg mb-6 text-gray-700" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Contáctanos y conoce cómo nuestro proceso de poligrafía cumple con los más altos estándares internacionales.
          </p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-[#FFC107] text-[#411A56] font-bold rounded hover:bg-[#FFD54F] transition-colors"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Cotizar Evaluación
          </a>
        </div>

        {/* Related Articles */}
        <div className="mt-20 pt-12 border-t border-gray-200">
          <h3
            className="text-2xl font-bold mb-8"
            style={{ color: "#48255A", fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            Artículos Relacionados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <a href="/blog/verdad-o-mentira" className="group">
              <div className="mb-4 overflow-hidden rounded-lg h-48 bg-gray-200">
                <img
                  src="/blog/1.webp"
                  alt="¿Verdad o Mentira?"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="text-lg font-bold text-[#48255A] group-hover:text-[#700FA3] transition-colors" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                ¿Verdad o Mentira? Todo lo que debes saber antes de contratar una prueba de Polígrafo
              </h4>
            </a>

            <a href="/blog/preempleo-rutina-investigacion" className="group">
              <div className="mb-4 overflow-hidden rounded-lg h-48 bg-gray-200">
                <img
                  src="/blog/2.webp"
                  alt="¿Preempleo, Rutina o Investigación?"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="text-lg font-bold text-[#48255A] group-hover:text-[#700FA3] transition-colors" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                ¿Preempleo, Rutina o Investigación? Descubre qué prueba de polígrafo necesitas
              </h4>
            </a>
          </div>
        </div>
      </article>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
