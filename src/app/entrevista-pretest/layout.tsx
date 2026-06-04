import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Entrevista Pretest en Poligrafía | One True",
  description:
    "Especialización avanzada en entrevista pretest para poligrafistas certificados. Fortalezca rapport, formulación de preguntas y análisis conductual previo al examen poligráfico.",
  keywords: [
    "entrevista pretest poligrafia",
    "curso entrevista pretest",
    "formacion poligrafistas ecuador",
    "poligrafia avanzada quito",
    "poligrafia avanzada guayaquil",
    "one true academia",
  ],
  openGraph: {
    title: "Entrevista Pretest en Poligrafía | One True",
    description:
      "Especialización avanzada para estructurar y conducir entrevistas pretest con rigor técnico, rapport profesional y criterios conductuales.",
    url: "https://somosonetrue.com/entrevista-pretest",
    siteName: "One True Ecuador",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Entrevista Pretest en Poligrafía - One True",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
};

export default function EntrevistaPretestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
