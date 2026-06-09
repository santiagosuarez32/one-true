import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prueba de Honestidad, Ética y Valores en Ecuador | One True",
  description: "Evalúe con precisión la integridad, ética y valores de sus futuros colaboradores en Quito y Guayaquil. Identifique conductas contraproducentes y fomente un entorno laboral 100% confiable y alineado.",
  keywords: [
    "prueba de honestidad ecuador",
    "evaluacion de etica laboral quito",
    "test de valores guayaquil",
    "seleccion de personal honesto",
    "rrhh ecuador",
    "integridad laboral",
    "one true ecuador"
  ],
  openGraph: {
    title: "Prueba de Honestidad, Ética y Valores en Ecuador | One True",
    description: "Evalúe con precisión la integridad, ética y valores de sus futuros colaboradores en Quito y Guayaquil. Identifique conductas contraproducentes y fomente un entorno laboral 100% confiable y alineado.",
    url: "https://somosonetrue.com/prueba-de-honestidad-etica-y-valores",
    siteName: "One True Ecuador",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Prueba de Honestidad, Ética y Valores - One True Ecuador",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
};

export default function PruebaDeHonestidadEticaYValoresLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
