import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pruebas Toxicológicas Laborales y de Selección en Ecuador | One True",
  description: "Garantice un entorno laboral seguro y libre de drogas en Quito y Guayaquil. Pruebas toxicológicas rápidas y confirmatorias multidroga con un 99% de confianza.",
  keywords: [
    "pruebas toxicologicas ecuador",
    "test de drogas laboral quito",
    "prueba antidoping guayaquil",
    "rrhh ecuador",
    "seguridad industrial ecuador",
    "prevencion de drogas ecuador",
    "pruebas de dopaje ecuador",
    "one true ecuador"
  ],
  openGraph: {
    title: "Pruebas Toxicológicas Laborales y de Selección en Ecuador | One True",
    description: "Garantice un entorno laboral seguro y libre de drogas en Quito y Guayaquil. Pruebas toxicológicas rápidas y confirmatorias multidroga con un 99% de confianza.",
    url: "https://somosonetrue.com/pruebas-toxicologicas",
    siteName: "One True Ecuador",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pruebas Toxicológicas - One True Ecuador",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
};

export default function PruebasToxicologicasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
