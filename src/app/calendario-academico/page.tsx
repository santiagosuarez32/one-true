import React from "react";
import { getCourses, getCalendarIntakes } from "@/lib/cms";
import CalendarioClient from "./CalendarioClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Calendario Académico | Academia One True",
  description: "Conozca las fechas de inicio, convocatorias y duración de nuestros cursos de poligrafía básica, avanzada y especializaciones. Asegure su cupo ahora.",
  keywords: ["calendario academico de poligrafia", "cursos de poligrafia inicio", "estudiar poligrafia ecuador", "fechas de cursos de seguridad", "formacion profesional poligrafista"],
  openGraph: {
    title: "Calendario Académico | Academia One True",
    description: "Conozca las fechas de inicio, convocatorias y duración de nuestros cursos de poligrafía básica, avanzada y especializaciones. Asegure su cupo ahora.",
    url: "https://somosonetrue.com/calendario-academico",
    type: "website",
  }
};

export const revalidate = 3600;

export default async function CalendarioPage() {
  let courses: any[] = [];
  let intakes: any[] = [];
  try {
    courses = await getCourses();
  } catch (err) {
    console.error("Error loading courses in Academic Calendar server page:", err);
  }

  try {
    intakes = await getCalendarIntakes();
  } catch (err) {
    console.error("Error loading calendar intakes in Academic Calendar server page:", err);
  }

  return <CalendarioClient initialCourses={courses} initialIntakes={intakes} />;
}

