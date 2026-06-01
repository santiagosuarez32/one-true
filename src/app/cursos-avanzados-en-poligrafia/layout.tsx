import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cursos Avanzados en Poligrafía | One True Academia",
  description: "Especialícese con módulos avanzados en poligrafía: entrevista pretest, técnicas poligráficas, calificación de gráficas, sistema ESS-M y control de calidad. Formación profesional en Quito y Guayaquil.",
  keywords: [
    "cursos avanzados poligrafia ecuador",
    "entrevista pretest poligrafia",
    "sistema calificacion ess-m",
    "control calidad poligrafia",
    "formacion poligrafista avanzada",
    "one true academia",
    "calificacion graficas poligrafo"
  ],
  openGraph: {
    title: "Cursos Avanzados en Poligrafía | One True Academia",
    description: "Especialícese con módulos avanzados en poligrafía: entrevista pretest, técnicas poligráficas, calificación de gráficas, sistema ESS-M y control de calidad.",
    url: "https://somosonetrue.com/cursos-avanzados-en-poligrafia",
    siteName: "One True Ecuador",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Cursos Avanzados en Poligrafía - One True Ecuador",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
};

export default function CursosAvanzadosPoligrafiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
