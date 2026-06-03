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
          src="/blog/1.webp"
          alt="¿Verdad o Mentira? Todo lo que debes saber antes de contratar una prueba de Polígrafo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </section>

      {/* Article Content */}
      <article className="w-full max-w-4xl mx-auto px-4 sm:px-8 md:px-12 py-16">

        {/* Article Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-[3px] bg-[#700FA3]" />
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
            ¿Verdad o Mentira? Todo lo que debes saber antes de contratar una prueba de Polígrafo.
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            <span>Publicado el 15 de Noviembre, 2024</span>
            <span>•</span>
            <span>5 min de lectura</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          <h2 className="text-2xl font-bold mt-0 mb-6" style={{ color: "#48255A" }}>
            Introducción
          </h2>

          <p className="text-lg leading-relaxed mb-4 text-gray-700">
            Tomar la decisión de evaluar la confianza de tu personal o investigar un incidente delicado (como un robo o fraude interno) no es fácil. Seguramente has escuchado hablar del polígrafo o detector de mentiras, pero es normal que surjan dudas: ¿Realmente funciona? ¿Es legal? ¿Qué tan complicado es?
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            En mi experiencia ayudando a empresas a seleccionar candidatos confiables, he notado que la falta de información clara es el principal obstáculo. Por eso, he recopilado las preguntas más habituales que recibo sobre la poligrafía y las he respondido de forma sencilla. El objetivo es que tengas toda la información sobre la mesa para tomar una decisión objetiva y segura para tu empresa.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Las pruebas de polígrafo son una herramienta forense ampliamente utilizada en procesos de selección, investigaciones internas y evaluaciones de confiabilidad. Sin embargo, existen muchos mitos y malinterpretaciones sobre cómo funcionan y qué tan precisas son. En este artículo, te ayudaremos a separar la verdad de la ficción.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: "#48255A" }}>
            Lo que necesitas saber sobre las pruebas de polígrafo (Preguntas Frecuentes)
          </h2>

          <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: "#700FA3" }}>
            1. ¿Qué tan confiable es realmente el polígrafo o también llamado "detector de mentiras"?
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Esta es la duda número uno. A diferencia de lo que se ve en las películas, el polígrafo es un instrumento científico, no mágico. Estudios internacionales han demostrado que, cuando la prueba es realizada por un profesional certificado, la precisión de los resultados supera el 90%. Actualmente, es la tecnología más precisa para evaluar la credibilidad de una persona, superando a otras herramientas de evaluación de credibilidad.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: "#700FA3" }}>
            2. ¿Cómo funciona una prueba de polígrafo? ¿Es solo conectar cables?
          </h3>

          <p className="text-lg leading-relaxed mb-4 text-gray-700">
            No, es un proceso mucho más completo y humano. Una prueba de Polígrafo profesional consta de tres etapas claras:
          </p>

          <ul className="list-disc list-inside mb-6 text-lg leading-relaxed text-gray-700">
            <li><strong>La entrevista previa (Pre-test):</strong> Conversamos con la persona para entender su contexto y explicarle el procedimiento.</li>
            <li><strong>La fase de prueba (In-test):</strong> Aquí es donde se usa el polígrafo para registrar las reacciones psicofisiológicas del cuerpo mientras se hacen las preguntas.</li>
            <li><strong>El análisis:</strong> Interpretamos esos datos para entregarte un resultado objetivo.</li>
          </ul>

          <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: "#700FA3" }}>
            3. ¿Cuánto tiempo tarda todo el proceso?
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Para garantizar un resultado de calidad, no podemos apresurarnos. Una prueba de polígrafo bien hecha dura normalmente entre 90 y 120 minutos según estándares internacionales. Este tiempo es necesario para que la persona evaluada esté tranquila y el procedimiento se haga correctamente.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: "#700FA3" }}>
            4. ¿Qué se necesita para hacerle la prueba a un empleado o candidato?
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            El requisito más importante es el consentimiento. La poligrafía es un proceso voluntario; la persona debe firmar una autorización escrita aceptando someterse a la evaluación. No se puede obligar a nadie, ya que la cooperación es clave para el éxito de la prueba, nosotros nos encargamos de todo.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: "#700FA3" }}>
            5. ¿Puedo hacer todas las preguntas que quiera?
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Muchas veces los clientes quieren aprovechar para preguntar de todo, pero para que la prueba de polígrafo sea efectiva, debemos enfocarnos. Aunque en la entrevista previa se tocan muchos temas, durante la prueba instrumental (con el equipo conectado) nos centramos generalmente en 3 o 4 preguntas clave relacionadas directamente con el objetivo (ej. "¿Robaste el dinero de la caja?", "¿Has cometido fraude en tu empleo anterior?"). Esto garantiza mayor precisión.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: "#700FA3" }}>
            6. ¿Tengo que llevar a mi personal a sus oficinas o pueden venir a mi empresa?
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Sabemos que la logística a veces es complicada. Por eso, las pruebas de polígrafo pueden realizarse en tus instalaciones si así lo prefieres. Solo necesitamos un espacio privado, libre de distracciones, con un escritorio y dos sillas. Nosotros nos encargamos del resto.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: "#700FA3" }}>
            7. ¿Cuánto tardan en entregarme los resultados?
          </h3>

          <p className="text-lg leading-relaxed mb-8 text-gray-700">
            Entendemos que en situaciones de robos o contratación, el tiempo es dinero. Por lo general, entregamos los resultados en tan solo 4 horas después de haber concluido las pruebas y los informes técnicos en 24 horas.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: "#48255A" }}>
            Conclusión: La tranquilidad de decidir con la verdad
          </h2>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Contratar un servicio de poligrafía no se trata solo de "atrapar a alguien", sino de crear un ambiente de trabajo seguro y honesto. Ya sea que necesites filtrar a un nuevo candidato o resolver un incidente interno, ahora sabes cómo funciona esta herramienta.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Si tienes más dudas o necesitas asesoría sobre qué tipo de prueba es la ideal para tu caso, no dudes en contactarnos. Estamos aquí para ayudarte a descubrir la verdad.
          </p>

        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-[#700FA3]/10 rounded-2xl border border-[#700FA3]/20">
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: "#48255A", fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            ¿Necesitas una Prueba de Polígrafo?
          </h3>
          <p className="text-lg mb-6 text-gray-700" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Contáctanos para conocer nuestros servicios y obtener más información sobre cómo podemos ayudarte.
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

            <a href="/blog/garantiza-la-verdad" className="group">
              <div className="mb-4 overflow-hidden rounded-lg h-48 bg-gray-200">
                <img
                  src="/blog/3.webp"
                  alt="Garantiza la Verdad"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h4 className="text-lg font-bold text-[#48255A] group-hover:text-[#700FA3] transition-colors" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                Garantiza la Verdad: 10 Requisitos Clave para una Prueba de Polígrafo Confiable
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
