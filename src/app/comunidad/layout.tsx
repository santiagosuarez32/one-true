import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Comunidad One True | Red de Evaluadores y Poligrafistas",
  description: "Únase a la élite de evaluadores forenses de credibilidad y poligrafistas en Latinoamérica. Comparta conocimientos, bibliografía exclusiva y sesiones mensuales de formación.",
  keywords: ["comunidad de poligrafistas", "red de evaluadores forenses", "skool somos one true", "psicofisiologia forense", "bibliografia de poligrafia", "networking poligrafo"],
  openGraph: {
    title: "Comunidad One True | Red de Evaluadores y Poligrafistas",
    description: "Únase a la élite de evaluadores forenses de credibilidad y poligrafistas en Latinoamérica. Comparta conocimientos, bibliografía exclusiva y sesiones mensuales de formación.",
    url: "https://somosonetrue.com/comunidad",
    type: "website",
  }
};

export default function ComunidadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
