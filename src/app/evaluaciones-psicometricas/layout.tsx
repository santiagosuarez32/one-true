import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evaluaciones Psicométricas Laborales en Ecuador | One True",
  description: "Optimice su proceso de selección y desarrollo organizacional en Quito y Guayaquil. Pruebas psicométricas avanzadas para medir personalidad, aptitud y conducta ética.",
  keywords: [
    "evaluaciones psicometricas ecuador",
    "pruebas psicometricas quito",
    "seleccion de personal guayaquil",
    "pruebas de aptitud rrhh ecuador",
    "estudios conductuales ecuador",
    "honestidad y etica laboral ecuador",
    "one true ecuador"
  ],
  openGraph: {
    title: "Evaluaciones Psicométricas Laborales en Ecuador | One True",
    description: "Optimice su proceso de selección y desarrollo organizacional en Quito y Guayaquil. Pruebas psicométricas avanzadas para medir personalidad, aptitud y conducta ética.",
    url: "https://somosonetrue.com/evaluaciones-psicometricas",
    siteName: "One True Ecuador",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Evaluaciones Psicométricas - One True Ecuador",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
};

export default function EvaluacionesPsicometricasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
