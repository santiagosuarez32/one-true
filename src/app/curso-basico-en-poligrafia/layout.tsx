import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Curso Básico en Poligrafía 400 H Acreditado APA | One True",
  description: "Certifíquese como Poligrafista Profesional y Evaluador Científico de la Credibilidad en Quito y Guayaquil. Programa de 400 horas académicas diseñado bajo los más altos estándares científicos y avalado internacionalmente.",
  keywords: [
    "curso de poligrafia ecuador",
    "aprender poligrafia quito",
    "certificacion poligrafista guayaquil",
    "academia de poligrafia ecuador",
    "formacion poligrafia apa",
    "evaluador forense de credibilidad",
    "one true ecuador",
    "escuela de poligrafia ecuador"
  ],
  openGraph: {
    title: "Curso Básico en Poligrafía 400 H Acreditado APA | One True",
    description: "Certifíquese como Poligrafista Profesional y Evaluador Científico de la Credibilidad en Quito y Guayaquil. Programa de 400 horas académicas diseñado bajo los más altos estándares científicos y avalado internacionalmente.",
    url: "https://somosonetrue.com/curso-basico-en-poligrafia",
    siteName: "One True Ecuador",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Formación en Poligrafía - One True Ecuador",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
};

export default function CursoBasicoPoligrafiaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
