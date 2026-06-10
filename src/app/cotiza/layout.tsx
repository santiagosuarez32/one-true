import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cotizar Servicios de Poligrafía y Vetting | One True",
  description: "Solicite una cotización sin costo para evaluaciones de polígrafo, estudios de confiabilidad 360°, visitas domiciliarias y pruebas de honestidad.",
  keywords: ["cotizar poligrafo", "precio prueba de poligrafo", "cotizacion vetting", "servicio de poligrafo ecuador", "consultoria de seguridad corporativa"],
  openGraph: {
    title: "Cotizar Servicios de Poligrafía y Vetting | One True",
    description: "Solicite una cotización sin costo para evaluaciones de polígrafo, estudios de confiabilidad 360°, visitas domiciliarias y pruebas de honestidad.",
    url: "https://somosonetrue.com/cotiza",
    type: "website",
  }
};

export default function CotizaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
