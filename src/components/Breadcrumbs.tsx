"use client";

import React from "react";
import { usePathname } from "next/navigation";

type Crumb = { label: string; href?: string };

// Per-page trail (Inicio is prepended automatically; the last item is the
// current page and is rendered as plain text). Pages not listed render nothing.
const TRAIL: Record<string, Crumb[]> = {
  // Evaluaciones
  "/pruebas-poligraficas": [{ label: "Evaluaciones", href: "/#services" }, { label: "Pruebas Poligráficas" }],
  "/vetting": [{ label: "Evaluaciones", href: "/#services" }, { label: "Vetting" }],
  "/estudio-de-confiabilidad-360": [{ label: "Evaluaciones", href: "/#services" }, { label: "Estudio de Confiabilidad 360°" }],
  "/visitas-domiciliarias": [{ label: "Evaluaciones", href: "/#services" }, { label: "Visitas Domiciliarias" }],
  "/pruebas-toxicologicas": [{ label: "Evaluaciones", href: "/#services" }, { label: "Pruebas Toxicológicas" }],
  "/evaluaciones-psicometricas": [{ label: "Evaluaciones", href: "/#services" }, { label: "Evaluaciones Psicométricas" }],
  "/prueba-de-honestidad-etica-y-valores": [{ label: "Evaluaciones", href: "/#services" }, { label: "Prueba de Honestidad, Ética y Valores" }],

  // Academia
  "/curso-basico-en-poligrafia": [{ label: "Academia", href: "/#service-7" }, { label: "Curso Básico en Poligrafía" }],
  "/cursos-avanzados-en-poligrafia": [{ label: "Academia", href: "/#service-7" }, { label: "Cursos Avanzados en Poligrafía" }],
  "/formaciones-complementarias": [{ label: "Academia", href: "/#service-7" }, { label: "Formaciones Complementarias" }],

  // Cursos avanzados (detalle)
  "/calificacion-graficas-analisis-datos": [{ label: "Academia", href: "/#service-7" }, { label: "Cursos Avanzados", href: "/cursos-avanzados-en-poligrafia" }, { label: "Calificación de Gráficas y Análisis de Datos" }],
  "/sistema-calificacion-ess-m": [{ label: "Academia", href: "/#service-7" }, { label: "Cursos Avanzados", href: "/cursos-avanzados-en-poligrafia" }, { label: "Sistema de Calificación ESS-M" }],
  "/entrevista-pretest": [{ label: "Academia", href: "/#service-7" }, { label: "Cursos Avanzados", href: "/cursos-avanzados-en-poligrafia" }, { label: "Entrevista Pre-test" }],
  "/tecnicas-poligraficas": [{ label: "Academia", href: "/#service-7" }, { label: "Cursos Avanzados", href: "/cursos-avanzados-en-poligrafia" }, { label: "Técnicas Poligráficas" }],
  "/control-de-calidad-en-poligrafia": [{ label: "Academia", href: "/#service-7" }, { label: "Cursos Avanzados", href: "/cursos-avanzados-en-poligrafia" }, { label: "Control de Calidad en Poligrafía" }],
};

export default function Breadcrumbs() {
  const pathname = usePathname();
  const trail = pathname ? TRAIL[pathname] : undefined;
  if (!trail) return null;

  const items: Crumb[] = [{ label: "Inicio", href: "/" }, ...trail];

  return (
    <nav aria-label="Ruta de navegación" className="mb-5">
      <ol
        className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm"
        style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-x-2">
              {item.href && !isLast ? (
                <a
                  href={item.href}
                  className="text-white! hover:text-[#FFC107]! transition-colors font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className="text-white! font-semibold"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && <span className="text-white/70! select-none">›</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
