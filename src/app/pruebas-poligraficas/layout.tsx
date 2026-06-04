import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pruebas de Polígrafo en Ecuador | Acreditadas por APA | One True",
  description: "Evaluación forense de credibilidad con 95% de exactitud en Quito y Guayaquil. Exámenes poligráficos de preempleo, permanencia e investigativos (robos, fraudes, fuga de información) bajo estándares internacionales de la APA.",
  keywords: [
    "pruebas de poligrafo ecuador",
    "poligrafo quito",
    "poligrafo guayaquil",
    "examen del poligrafo precio ecuador",
    "poligrafistas ecuador",
    "poligrafo preempleo",
    "investigacion de robos poligrafo",
    "APA ecuador"
  ],
  openGraph: {
    title: "Pruebas de Polígrafo en Ecuador | Acreditadas por APA | One True",
    description: "Evaluación forense de credibilidad con 95% de exactitud en Quito y Guayaquil. Exámenes poligráficos de preempleo, permanencia e investigativos (robos, fraudes, fuga de información) bajo estándares internacionales de la APA.",
    url: "https://somosonetrue.com/pruebas-poligraficas",
    siteName: "One True Ecuador",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Pruebas de Polígrafo Acreditadas por APA - One True Ecuador",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
};

export default function PoligrafoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
