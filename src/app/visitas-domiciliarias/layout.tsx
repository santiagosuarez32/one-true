import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Visitas Domiciliarias y Estudios Socioeconómicos en Ecuador | One True",
  description: "Evaluamos el entorno socioeconómico y familiar de candidatos en Quito y Guayaquil. Prevenimos riesgos de vulnerabilidad, validamos coherencia de estilo de vida y domicilio.",
  keywords: [
    "visitas domiciliarias ecuador",
    "estudio socioeconomico quito",
    "verificacion de domicilio guayaquil",
    "rrhh ecuador",
    "seguridad corporativa ecuador",
    "estudios socioeconomicos ecuador",
    "verificacion laboral ecuador",
    "one true ecuador"
  ],
  openGraph: {
    title: "Visitas Domiciliarias y Estudios Socioeconómicos en Ecuador | One True",
    description: "Evaluamos el entorno socioeconómico y familiar de candidatos en Quito y Guayaquil. Prevenimos riesgos de vulnerabilidad, validamos coherencia de estilo de vida y domicilio.",
    url: "https://somosonetrue.com/visitas-domiciliarias",
    siteName: "One True Ecuador",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Visitas Domiciliarias - One True Ecuador",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
};

export default function VisitasDomiciliariasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
