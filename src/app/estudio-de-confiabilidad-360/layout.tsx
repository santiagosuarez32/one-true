import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estudio de Confiabilidad 360° en Ecuador | One True",
  description: "Auditoría integral de candidatos en Quito y Guayaquil. Validamos la trayectoria laboral (tres últimas referencias), autenticidad académica, historial de buró de crédito y antecedentes en +190 bases de datos.",
  keywords: [
    "estudio de confiabilidad 360 ecuador",
    "validación de referencias laborales quito",
    "verificacion de titulos academicos ecuador",
    "buro de credito candidatos",
    "auditoria de perfiles ecuador",
    "seleccion de talento humano",
    "analisis de salud financiera candidatos"
  ],
  openGraph: {
    title: "Estudio de Confiabilidad 360° en Ecuador | One True",
    description: "Auditoría integral de candidatos en Quito y Guayaquil. Validamos la trayectoria laboral (tres últimas referencias), autenticidad académica, historial de buró de crédito y antecedentes en +190 bases de datos.",
    url: "https://somosonetrue.com/estudio-de-confiabilidad-360",
    siteName: "One True Ecuador",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Estudios de Confiabilidad 360° - One True Ecuador",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
};

export default function ConfiabilidadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
