import React from "react";
import { getServices } from "@/lib/cms";
import PruebaClient from "./PruebaClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Prueba de Honestidad, Ética y Valores | One True",
  description: "Evaluaciones científicas de honestidad, ética y valores organizacionales en Ecuador. Proteja a su empresa de riesgos internos y fraudes con análisis confiables.",
  keywords: ["prueba de honestidad", "evaluacion de valores", "etica laboral", "fraude interno", "seleccion de personal honesto", "riesgo laboral", "ecuador"],
  openGraph: {
    title: "Prueba de Honestidad, Ética y Valores | One True",
    description: "Evaluaciones científicas de honestidad, ética y valores organizacionales en Ecuador. Proteja a su empresa de riesgos internos y fraudes con análisis confiables.",
    url: "https://somosonetrue.com/prueba-de-honestidad-etica-y-valores",
    type: "website",
  }
};

export const revalidate = 3600; // Revalidate dynamic content every hour

export default async function Page() {
  let dbData: any = null;
  try {
    const services = await getServices();
    dbData = services.find((s: any) => s.id === "prueba-de-honestidad-etica-y-valores") || null;
  } catch (err) {
    console.error("Error fetching service data in server page:", err);
  }

  return <PruebaClient initialData={dbData} />;
}
