import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ebook Gratuito: Guía de Poligrafía Confiable | One True",
  description: "Descargue gratis nuestra guía práctica para evaluar y contratar servicios de poligrafía de manera confiable y con base científica en su empresa.",
  keywords: ["descargar ebook poligrafia", "guia de poligrafia confiable", "como contratar poligrafista", "evaluacion de confianza gratuita", "seguridad y rrhh ebook"],
  openGraph: {
    title: "Ebook Gratuito: Guía de Poligrafía Confiable | One True",
    description: "Descargue gratis nuestra guía práctica para evaluar y contratar servicios de poligrafía de manera confiable y con base científica en su empresa.",
    url: "https://somosonetrue.com/ebook",
    type: "website",
  }
};

export default function EbookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
