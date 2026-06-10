import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import Breadcrumbs from "@/components/Breadcrumbs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidad | One True Ecuador",
  description: "Conoce nuestra política de tratamiento y privacidad de datos personales en One True Ecuador. Información detallada sobre el uso de datos en formularios y seguimiento comercial de Ebooks.",
};

export default function PoliticaPrivacidadPage() {
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
          alt="Política de Privacidad - One True Academia"
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
                Transparencia y Protección de Datos
              </span>
            </div>

            <h1
              className="mb-6 !text-3xl sm:!text-4xl md:!text-5xl lg:!text-[52px] font-semibold leading-tight text-white"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                textShadow: "0 2px 4px rgba(0,0,0,0.15), 0 4px 10px rgba(0,0,0,0.18)",
              }}
            >
              Política de{" "}
              <strong
                style={{
                  fontWeight: "800",
                  textDecoration: "underline",
                  textDecorationColor: "#FFC107",
                  textUnderlineOffset: "6px",
                }}
              >
                Privacidad
              </strong>
            </h1>

            <p
              className="opacity-95 !text-sm sm:!text-base md:!text-lg font-medium text-white"
              style={{
                fontFamily: "var(--font-montserrat), sans-serif",
                lineHeight: "32px",
              }}
            >
              En One True protegemos la confidencialidad de tu información personal. 
              A continuación, conoce en detalle cómo tratamos y resguardamos tus datos.
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
            
            {/* 1. Introducción */}
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
                1. Introducción
              </h2>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 text-justify">
                La presente Política de Privacidad describe el modo en que <strong>One True</strong> (en adelante, &quot;nosotros&quot; o &quot;la Empresa&quot;), titular del sitio web <a href="https://somosonetrue.com" className="text-[#700FA3] hover:underline font-bold">somosonetrue.com</a>, recolecta, utiliza y comparte los datos de carácter personal facilitados por los usuarios a través de nuestros formularios digitales.
              </p>
            </div>

            {/* 2. Datos recopilados */}
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
                2. Datos que Recopilamos en los Formularios
              </h2>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 mb-6 text-justify">
                Solicitamos datos específicos y necesarios según la sección de interacción en la web:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="bg-[#fcfbfd] border border-neutral-200/60 rounded-xl p-6">
                  <h3 className="text-base font-bold text-[#48255A] mb-3 uppercase tracking-wider" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Formularios de Contacto y Cotización
                  </h3>
                  <p className="text-xs text-neutral-500 mb-3">
                    Solicitamos información comercial y de contacto para elaborar propuestas personalizadas:
                  </p>
                  <ul className="text-sm text-[#525252] space-y-2 list-disc list-inside font-medium">
                    <li>Nombre y Apellido</li>
                    <li>Correo electrónico (corporativo o personal)</li>
                    <li>Número de WhatsApp / Teléfono de contacto</li>
                    <li>Nombre de la Empresa y Cargo</li>
                    <li>Servicio de interés y Detalles del requerimiento</li>
                  </ul>
                </div>

                <div className="bg-[#fcfbfd] border border-neutral-200/60 rounded-xl p-6">
                  <h3 className="text-base font-bold text-[#48255A] mb-3 uppercase tracking-wider" style={{ fontFamily: "var(--font-montserrat), sans-serif" }}>
                    Descarga de Ebooks Gratuitos
                  </h3>
                  <p className="text-xs text-neutral-500 mb-3">
                    Para acceder a nuestras guías de valor, recolectamos datos del perfil profesional:
                  </p>
                  <ul className="text-sm text-[#525252] space-y-2 list-disc list-inside font-medium">
                    <li>Correo electrónico</li>
                    <li>Número de WhatsApp / Teléfono</li>
                    <li>Cargo o puesto laboral</li>
                    <li>Rubro o actividad de la empresa</li>
                    <li>Tamaño de la empresa (número de empleados)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cláusula Ebooks y Seguimiento */}
            <div className="flex flex-col items-start bg-[#700FA3]/5 p-8 rounded-2xl border-2 border-[#700FA3]/20 shadow-[0_8px_30px_rgba(0,0,0,0.01)] transition-all duration-300 relative pl-8">
              <div className="absolute left-0 top-0 bottom-0 w-[6px] bg-[#700FA3] rounded-l-2xl" />
              <h2
                className="mb-4 flex items-center gap-2"
                style={{
                  fontFamily: "var(--font-montserrat), sans-serif",
                  fontSize: "20px",
                  fontWeight: "800",
                  color: "#48255A",
                }}
              >
                <span>📢</span> Finalidad Especial para la Descarga de Ebooks
              </h2>
              <p className="text-[#48255A] text-[15px] leading-[26px] font-semibold text-justify">
                Al registrar tus datos para descargar cualquiera de nuestros Ebooks y guías, aceptas expresamente que <strong>One True</strong> almacene y procese esta información para realizar un <strong>seguimiento comercial y marketing directo</strong>. Nuestro equipo comercial o de atención al cliente podrá contactarte vía correo electrónico o WhatsApp para evaluar tus necesidades de seguridad, presentarte soluciones integrales de control de confianza (como polígrafo y vetting), y ofrecerte información adaptada al rubro y tamaño de tu empresa.
              </p>
            </div>

            {/* 3. Finalidades generales */}
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
                3. Finalidad del Tratamiento de Datos
              </h2>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 mb-4 text-justify">
                Los datos personales recolectados a través de nuestro sitio web se tratarán con las siguientes finalidades:
              </p>
              <ol className="space-y-3 list-decimal list-inside text-sm text-[#525252] font-semibold pl-2">
                <li>Responder a consultas, cotizaciones de servicios y requerimientos enviados.</li>
                <li>Hacer seguimiento comercial posterior al envío de materiales informativos (Ebooks, plantillas, etc.).</li>
                <li>Enviar boletines informativos, actualizaciones de nuestro calendario académico y convocatorias de cursos.</li>
                <li>Mantener la relación comercial y la facturación de servicios contratados.</li>
              </ol>
            </div>

            {/* 4. Base Legal */}
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
                4. Base Legal y Consentimiento del Usuario
              </h2>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 text-justify">
                La base jurídica para el tratamiento de tus datos es el <strong>consentimiento libre, específico, informado e inequívoco</strong>. Este se otorga de manera activa al marcar las casillas de aceptación de términos y políticas en nuestros formularios y presionar el botón de envío. El usuario tiene derecho a retirar su consentimiento en cualquier momento enviando un correo a la Empresa.
              </p>
            </div>

            {/* 5. Transferencias */}
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
                5. Compartición y Transferencia de Datos
              </h2>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 text-justify">
                En One True no vendemos, alquilamos ni cedemos los datos de nuestros usuarios a terceros. La información se almacena de forma segura en nuestros sistemas de base de datos protegidos y solo es accesible por el personal autorizado para fines de soporte y gestión comercial de la Empresa.
              </p>
            </div>

            {/* 6. Derechos ARCO */}
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
                6. Derechos del Titular (Derechos ARCO)
              </h2>
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 mb-4 text-justify">
                De conformidad con la Ley Orgánica de Protección de Datos Personales aplicable, el usuario dispone en todo momento de los derechos de:
              </p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full text-center mt-2">
                <div className="bg-[#fcfbfd] border border-neutral-200/50 p-4 rounded-xl">
                  <span className="block text-[#700FA3] font-bold text-lg mb-1">Acceso</span>
                  <span className="text-[11px] text-neutral-500 font-medium">Consultar tus datos guardados.</span>
                </div>
                <div className="bg-[#fcfbfd] border border-neutral-200/50 p-4 rounded-xl">
                  <span className="block text-[#700FA3] font-bold text-lg mb-1">Rectificación</span>
                  <span className="text-[11px] text-neutral-500 font-medium">Actualizar datos erróneos.</span>
                </div>
                <div className="bg-[#fcfbfd] border border-neutral-200/50 p-4 rounded-xl">
                  <span className="block text-[#700FA3] font-bold text-lg mb-1">Eliminación</span>
                  <span className="text-[11px] text-neutral-500 font-medium">Borrado definitivo de tu perfil.</span>
                </div>
                <div className="bg-[#fcfbfd] border border-neutral-200/50 p-4 rounded-xl">
                  <span className="block text-[#700FA3] font-bold text-lg mb-1">Oposición</span>
                  <span className="text-[11px] text-neutral-500 font-medium">Oponerse a envíos comerciales.</span>
                </div>
              </div>
              
              <p className="text-[#525252] text-[15px] leading-[26px] font-medium opacity-90 mt-6 text-justify">
                Para ejercer cualquiera de estos derechos, puedes enviar una solicitud formal por escrito adjuntando tu identificación a nuestro correo electrónico: <a href="mailto:info@somosonetrue.com" className="text-[#700FA3] hover:underline font-bold">info@somosonetrue.com</a>.
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
