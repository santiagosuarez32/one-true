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
          src="/blog/2.webp"
          alt="¿Preempleo, Rutina o Investigación? Descubre qué prueba de polígrafo necesitas realmente"
          className="w-full h-full object-cover"
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
            ¿Preempleo, Rutina o Investigación? Descubre qué prueba de polígrafo necesitas realmente.
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-500 mb-8" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            <span>Publicado el 20 de Noviembre, 2024</span>
            <span>•</span>
            <span>6 min de lectura</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose prose-lg max-w-none" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
          <h2 className="text-2xl font-bold mt-0 mb-6" style={{ color: "#48255A" }}>
            Introducción
          </h2>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            ¿Sientes que necesitas evaluar la confiabilidad de alguien en tu empresa, pero no estás seguro de cómo hacerlo? No te preocupes, es una duda muy frecuente. Sabes que el polígrafo (o detector de mentiras) es la herramienta adecuada, pero quizás no sabías que existen diferentes tipos de pruebas diseñadas para situaciones muy distintas.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Elegir la prueba incorrecta puede llevarte a no obtener las respuestas que buscas. Por eso, en OneTrue, hemos preparado esta guía sencilla. Nuestro objetivo es ayudarte a identificar tu situación actual para que elijas la prueba de polígrafo exacta que te dará la tranquilidad y la información objetiva que necesitas para tomar decisiones acertadas.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            ¡Vamos a verlo!
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: "#48255A" }}>
            Los 3 tipos principales de pruebas de polígrafo
          </h2>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            No todas las pruebas son iguales. Dependiendo de si estás contratando, evaluando a tu personal actual o resolviendo un problema, el enfoque cambia por completo. Aquí te explicamos las tres categorías clave:
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: "#700FA3" }}>
            1. Prueba de Preempleo: Para elegir al mejor candidato
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Esta es, quizás, la más conocida y contratada. Su objetivo es filtrar y seleccionar al personal más confiable antes de que ingresen a tu empresa.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            <strong>¿Cuándo la necesitas?</strong>
          </p>

          <ul className="list-disc list-inside mb-6 text-lg leading-relaxed text-gray-700">
            <li>Estás en pleno proceso de contratación de nuevo personal.</li>
            <li>El puesto a cubrir es sensible (manejo de dinero, información confidencial, seguridad).</li>
          </ul>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            <strong>¿Qué evalúa?</strong>
          </p>

          <ul className="list-disc list-inside mb-6 text-lg leading-relaxed text-gray-700">
            <li>Verifica la veracidad de la información en su currículum y solicitud.</li>
            <li>Explora temas de integridad como: antecedentes laborales negativos no declarados, historial de robos en empleos anteriores, consumo de sustancias ilegales, o vínculos con actividades ilícitas.</li>
          </ul>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            <strong>El Beneficio Principal:</strong> Prevenir es mejor que lamentar. Te ayuda a evitar contratar a personas que podrían representar un riesgo futuro para tu organización, asegurando un equipo de trabajo íntegro desde el primer día.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: "#700FA3" }}>
            2. Prueba de Rutina o Permanencia: Para mantener la confianza
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            La confianza no es algo de una sola vez; hay que mantenerla. Esta prueba se aplica al personal que ya trabaja contigo.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            <strong>¿Cuándo la necesitas?</strong>
          </p>

          <ul className="list-disc list-inside mb-6 text-lg leading-relaxed text-gray-700">
            <li>De forma periódica (por ejemplo, cada tres meses, cada seis meses o cada año) para empleados en puestos clave, el rango del tiempo está en función de los riesgos que maneje cada persona.</li>
            <li>Cuando vas a promover a alguien a un cargo de mayor responsabilidad.</li>
          </ul>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            <strong>¿Qué evalúa?</strong>
          </p>

          <ul className="list-disc list-inside mb-6 text-lg leading-relaxed text-gray-700">
            <li>Se enfoca en el comportamiento del empleado durante el tiempo que ha estado en tu empresa.</li>
            <li>Busca asegurar que no hayan incurrido en faltas graves como robo hormiga, fuga de información, violaciones a políticas de seguridad o beneficios indebidos desde su última evaluación o ingreso.</li>
          </ul>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            <strong>El Beneficio Principal:</strong> Actúa como un poderoso disuasivo contra malas prácticas y te permite detectar focos rojos a tiempo, manteniendo un ambiente laboral sano y seguro.
          </p>

          <h3 className="text-xl font-bold mt-8 mb-4" style={{ color: "#700FA3" }}>
            3. Prueba Específica o de Investigación: Para resolver un incidente
          </h3>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Esta prueba es reactiva. Se utiliza cuando lamentablemente ya ha ocurrido un hecho concreto y negativo dentro de la empresa.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            <strong>¿Cuándo la necesitas?</strong>
          </p>

          <ul className="list-disc list-inside mb-6 text-lg leading-relaxed text-gray-700">
            <li>Se ha detectado un robo interno, fraude, abuso de confianza, acoso o filtración de información confidencial.</li>
            <li>Hay sospechosos identificados pero no pruebas contundentes.</li>
          </ul>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            <strong>¿Qué evalúa?</strong>
          </p>

          <ul className="list-disc list-inside mb-6 text-lg leading-relaxed text-gray-700">
            <li>A diferencia de las otras, esta prueba se centra exclusivamente en el incidente en cuestión.</li>
            <li>Las preguntas buscan determinar si la persona evaluada participó directamente, tiene conocimiento de quién lo hizo, o se benefició del hecho.</li>
          </ul>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            <strong>El Beneficio Principal:</strong> Es una herramienta crucial para esclarecer la verdad en situaciones críticas, ayudando a identificar a los responsables y, muy importante, a descartar a los inocentes, permitiendo tomar medidas disciplinarias o legales basadas en información objetiva.
          </p>

          <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: "#48255A" }}>
            Guía rápida: ¿Cuál es tu caso?
          </h2>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Para hacértelo aún más fácil, responde a esta simple pregunta: ¿En qué situación te encuentras ahora mismo?
          </p>

          <ul className="list-none mb-8 text-lg leading-relaxed text-gray-700">
            <li className="mb-4">
              <strong style={{ color: "#700FA3" }}>🔴 "Estoy a punto de contratar a alguien nuevo."</strong>
              <br />→ Necesitas una Prueba de Preempleo.
            </li>
            <li className="mb-4">
              <strong style={{ color: "#700FA3" }}>🟡 "Quiero asegurarme de que mi personal actual sigue siendo confiable."</strong>
              <br />→ Necesitas una Prueba de Rutina/Permanencia.
            </li>
            <li className="mb-4">
              <strong style={{ color: "#700FA3" }}>🟣 "Pasó algo malo en la empresa (robo, fraude) y necesito saber quién fue."</strong>
              <br />→ Necesitas una Prueba Específica de Investigación.
            </li>
          </ul>

          <h2 className="text-2xl font-bold mt-12 mb-6" style={{ color: "#48255A" }}>
            Conclusión
          </h2>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            Como ves, el polígrafo es una herramienta versátil que se adapta a tus necesidades. Elegir el tipo correcto de prueba es el primer paso para obtener resultados útiles y confiables.
          </p>

          <p className="text-lg leading-relaxed mb-6 text-gray-700">
            En OneTrue somos expertos en aplicar cada una de estas evaluaciones con el máximo rigor científico y profesionalismo. Si después de leer esto aún tienes dudas sobre cuál es la ideal para tu caso particular, no dudes en contactarnos. Estaremos encantados de asesorarte gratuitamente para que tomes la mejor decisión para tu empresa.
          </p>
        </div>

        {/* CTA Section */}
        <div className="mt-16 p-8 bg-[#700FA3]/10 rounded-2xl border border-[#700FA3]/20">
          <h3
            className="text-2xl font-bold mb-4"
            style={{ color: "#48255A", fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            ¿No Sabes Cuál Prueba Necesitas?
          </h3>
          <p className="text-lg mb-6 text-gray-700" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
            Contáctanos para una consulta gratuita. Te ayudaremos a identificar qué tipo de evaluación poligráfica es la más indicada para tu empresa.
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
