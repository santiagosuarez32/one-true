import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vetting y Verificación de Antecedentes en Ecuador | One True",
  description: "Filtre riesgos de contratación en Quito y Guayaquil. Cruzamos información en tiempo real en +190 bases de datos (Función Judicial, Policía Nacional, SUPA, ANT, OFAC e Interpol) para preempleo, proveedores y cargos críticos.",
  keywords: [
    "vetting ecuador",
    "verificacion de antecedentes ecuador",
    "antecedentes penales quito",
    "ant guayaquil",
    "funcion judicial ecuador",
    "lista clinton ecuador",
    "vetting de proveedores",
    "vetting de preempleo",
    "seguridad corporativa ecuador"
  ],
  openGraph: {
    title: "Vetting y Verificación de Antecedentes en Ecuador | One True",
    description: "Filtre riesgos de contratación en Quito y Guayaquil. Cruzamos información en tiempo real en +190 bases de datos (Función Judicial, Policía Nacional, SUPA, ANT, OFAC e Interpol) para preempleo, proveedores y cargos críticos.",
    url: "https://somosonetrue.com/vetting",
    siteName: "One True Ecuador",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vetting de Antecedentes - One True Ecuador",
      },
    ],
    locale: "es_EC",
    type: "website",
  },
};

export default function VettingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
