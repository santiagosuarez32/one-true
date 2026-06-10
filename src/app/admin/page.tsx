"use client";

import React, { useEffect, useMemo, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Manrope } from "next/font/google";
import { supabase } from "@/lib/supabase";
import { Service, Course, Blog, Podcast, DatabaseSchema } from "@/lib/cms";

const manrope = Manrope({ subsets: ["latin"], weight: ["500", "600", "700", "800"] });

const PURPLE = "#700FA3";
const PURPLE_HOVER = "#5C0B87";
const ACCENT_YELLOW = "#FFC107";

type Tab = "services" | "courses" | "complementarias" | "blogs" | "podcasts";

function prepopulateCourseDefaults(course: any) {
  if (!course) return course;
  if (!course.pageContent) {
    course.pageContent = {
      heroTagline: "",
      heroTitle: "",
      heroDesc: "",
      heroImage: "",
      aboutTitle: "Ejes Temáticos:",
      aboutDesc: "",
      focusAreas: [],
      svgFocusAreas: [],
      customCards: [],
      fichaTecnica: [],
      contactPhone: "099 371 2790",
      contactWhatsapp: "https://api.whatsapp.com/send?phone=593993712790"
    };
  }

  const template = course.template || (
    course.id === "curso-avanzado-tecnicas-poligraficas" || course.id === "tecnicas-poligraficas" ? "tecnicas" :
    course.id === "curso-basico-de-poligrafia" || course.id === "curso-basico-en-poligrafia" ? "basico" :
    course.id === "entrevista-pretest-y-postest" || course.id === "entrevista-pretest" ? "pretest" :
    course.id === "calificacion-de-graficas" || course.id === "calificacion-graficas-analisis-datos" ? "graficas" :
    course.id === "sistema-de-calificacion-ess-m" || course.id === "sistema-calificacion-ess-m" ? "ess-m" :
    course.id === "control-de-calidad-en-poligrafia" ? "control-calidad" :
    "standard"
  );
  course.template = template;

  const pc = course.pageContent;

  if (template === "tecnicas") {
    if (!pc.focusAreas || pc.focusAreas.length === 0) {
      pc.focusAreas = [
        {
          title: "Técnicas Comparativas (MCCA y MPT)",
          description: "Estudio detallado de los formatos de pruebas comparativas, formulación de preguntas y su aplicación operativa."
        },
        {
          title: "Técnicas de Screening / Tamizaje",
          description: "Protocolos recomendados por la APA para selección masiva de personal en seguridad e integridad."
        },
        {
          title: "Técnicas de Conocimiento (CIT/POT)",
          description: "Análisis de pruebas de información oculta o claves del incidente para esclarecimiento judicial."
        }
      ];
    }
    if (!pc.customCards || pc.customCards.length === 0) {
      pc.customCards = [
        {
          title: "ZCT Federal",
          description: "Protocolo estándar federal para evaluaciones de control de información.",
          icon: "/icons/Browser-Page-Account--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "Bi-Zona (Fase Usted)",
          description: "Técnica de dos zonas de respuesta adaptada a contextos específicos.",
          icon: "/icons/Browser-Hand--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "UTAH 3R",
          description: "Protocolo UTAH 3R para evaluaciones de responsabilidad relativa.",
          icon: "/icons/Touchpad-Finger--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "UTAH 4R",
          description: "Protocolo UTAH 4R para evaluaciones cuadrantes de responsabilidad.",
          icon: "/icons/Password-Desktop--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "AFMGQT V1 y V2",
          description: "Versiones 1 y 2 del cuestionario de respuesta forzada para diagnósticos y evaluaciones exploratorias.",
          icon: "/icons/Task-Checklist--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "DLST",
          description: "Prueba estándar de discriminación de mentiras para evaluaciones de veracidad.",
          icon: "/icons/Monitor-Find--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "CIT (Concealed Information Test)",
          description: "Protocolo estándar internacional para la detección de información oculta.",
          icon: "/icons/Touch-Id-Desktop--Streamline-Ultimate.webp",
          items: []
        }
      ];
    }
    if (!pc.fichaTecnica || pc.fichaTecnica.length === 0) {
      pc.fichaTecnica = [
        { title: "⏱️ 20 horas de duración", description: "Formación exhaustiva bajo estándares APA." },
        { title: "📚 40 lecciones", description: "Contenido actualizado a la fecha." },
        { title: "📄 Formatos de test", description: "Acceso a plantillas y modelos de examen." }
      ];
    }
  } else if (template === "ess-m") {
    if (!pc.focusAreas || pc.focusAreas.length === 0) {
      pc.focusAreas = [
        {
          title: "Criterios del ESS-M",
          description: "Reglas objetivas para calificar las reacciones en las diferentes zonas de test poligráfico."
        },
        {
          title: "Estandarización de Gráficas",
          description: "Cómo asegurar que múltiples evaluadores alcancen el mismo resultado en base a criterios multinomiales."
        },
        {
          title: "Software y Algoritmos",
          description: "Integración del ESS-M con plataformas digitales para validación automatizada de resultados."
        }
      ];
    }
    if (!pc.customCards || pc.customCards.length === 0) {
      pc.customCards = [
        {
          title: "Fundamentos del Análisis Bayesiano",
          description: "",
          icon: "/icons/Browser-Page-Account--Streamline-Ultimate.webp",
          items: ["Introducción a la inferencia estadística y el Teorema de Bayes aplicado a la credibilidad."]
        },
        {
          title: "Extracción de Características",
          description: "",
          icon: "/icons/Browser-Hand--Streamline-Ultimate.webp",
          items: ["Protocolos para actividad electrodérmica, cardiovascular, respiratoria y vasomotora."]
        },
        {
          title: "Transformación Numérica y Reducción de Datos",
          description: "",
          icon: "/icons/Touchpad-Finger--Streamline-Ultimate.webp",
          items: ["Uso de puntuaciones de tres posiciones y ponderación del EDA."]
        },
        {
          title: "Funciones de Verosimilitud",
          description: "",
          icon: "/icons/Password-Desktop--Streamline-Ultimate.webp",
          items: ["Interpretación de distribuciones de referencia para exámenes de asunto único y múltiple."]
        },
        {
          title: "Reglas de Decisión Estructuradas",
          description: "",
          icon: "/icons/Task-Checklist--Streamline-Ultimate.webp",
          items: ["Aplicación técnica de la Regla de Gran Total (GTR), Subtotal (SSR) y de Dos Etapas (TSR)."]
        },
        {
          title: "Cálculo de Probabilidades Posteriores",
          description: "",
          icon: "/icons/Monitor-Find--Streamline-Ultimate.webp",
          items: ["Determinación de intervalos de credibilidad y niveles de significancia (Alfa)."]
        },
        {
          title: "Redacción de Informes",
          description: "",
          icon: "/icons/Touch-Id-Desktop--Streamline-Ultimate.webp",
          items: ["Análisis de datos poligráficos mediante algoritmos bayesianos avanzados."]
        }
      ];
    }
    if (!pc.fichaTecnica || pc.fichaTecnica.length === 0) {
      pc.fichaTecnica = [
        { title: "⏱️ 12 horas de duración", description: "Módulo especializado en ESS-M." },
        { title: "📚 24 lecciones", description: "Enfoque práctico y herramientas." }
      ];
    }
  } else if (template === "basico") {
    if (!pc.customCards || pc.customCards.length === 0) {
      pc.customCards = [
        {
          title: "Certificación Internacional APA",
          description: "Rompe las fronteras profesionales. Obtén el único aval que te faculta global y técnicamente para ejercer la poligrafía a nivel mundial. No es un diploma local, es tu pasaporte a la élite forense internacional.",
          icon: "Monitor",
          items: []
        },
        {
          title: "Ciencia Antifraude Infalible",
          description: "Domina el ecosistema científico de la verdad: desde carga cognitiva hasta patrones psicofisiológicos avanzados. Aprende a blindar tus evaluaciones contra cualquier contramedida o técnica de manipulación con precisión matemática.",
          icon: "Brain",
          items: []
        },
        {
          title: "Práctica Forense de Alto Rendimiento",
          description: "Desarrollarás habilidades críticas operando instrumentación digital avanzada y resolviendo casos reales de alta complejidad. Un entorno diseñado para transferir la teoría a la práctica pericial, garantizando tu destreza técnica bajo la mentoría directa de instructores Senior.",
          icon: "Fingerprint",
          items: []
        },
        {
          title: "Autoridad y Liderazgo Pericial",
          description: "Deja de competir por precio. Esta formación te otorga el estatus y la competencia técnica para liderar la toma de decisiones críticas y cotizar tus servicios en los niveles más altos del sector corporativo, multinacional y gubernamental.",
          icon: "Globe",
          items: []
        }
      ];
    }
    if (!pc.svgFocusAreas || pc.svgFocusAreas.length === 0) {
      pc.svgFocusAreas = [
        {
          title: "Kit y Software Forense Incluido",
          description: "Todo lo que necesitas para ejercer con éxito. Olvídate de costos ocultos: desde el primer día accedes a las licencias de software especializado, manuales de vanguardia y guías periciales avaladas que exigen los estándares de la industria.",
          icon: "UserFocus"
        },
        {
          title: "Comunidad y Respaldo Continuo",
          description: "Tu formación no termina al graduarte. Te integras a una red viva de soporte técnico y consultoría para resolver tus primeros casos reales. El respaldo experto de tus instructores te acompaña durante toda tu trayectoria",
          icon: "Devices"
        },
        {
          title: "Certificación de Éxito Asegurado",
          description: "Inversión con cero riesgo. Si cumples con el plan y superas las evaluaciones, garantizamos tu incorporación técnica definitiva y la preparación total exigida para postular como miembro activo a las asociaciones globales más influyentes.",
          icon: "Medal"
        },
        {
          title: "Acceso y Filtro de Admisión",
          description: "No es para todos. Mantenemos el estándar de la comunidad mediante un riguroso proceso de selección de perfiles honorables. Si eres admitido, te aseguras de conectar y hacer networking con la verdadera élite profesional del sector.",
          icon: "Shield"
        }
      ];
    }
    if (!pc.fichaTecnica || pc.fichaTecnica.length === 0) {
      pc.fichaTecnica = [
        { title: "Experiencia Docente", description: "Aprenda de instructores activos con amplia trayectoria en el ámbito forense y de seguridad." },
        { title: "Networking de Élite", description: "Forme parte de una comunidad profesional de poligrafistas en toda la región." },
        { title: "Carrera de Futuro", description: "Acceda a oportunidades laborales en agencias gubernamentales, inteligencia y seguridad corporativa privada." }
      ];
    }
  } else if (template === "pretest") {
    if (!pc.focusAreas || pc.focusAreas.length === 0) {
      pc.focusAreas = [
        {
          title: "Fundamentos y estándares",
          description: "Domina los principios de las prácticas internacionales estandarizadas en entrevistas pretest y aprende los fundamentos metodológicos que garantizan la confiabilidad técnica de la evaluación."
        },
        {
          title: "Preparación y desarrollo del pretest",
          description: "Aprende cada fase de preparación previa al examen y domina el paso a paso del protocolo de entrevista pretest, asegurando consistencia y validez en tus evaluaciones poligráficas."
        },
        {
          title: "Evaluaciones diagnósticas y exploratorias",
          description: "Especialízate en el análisis de evaluaciones poligráficas diagnósticas y exploratorias, incluyendo el protocolo de preguntas específicas para casos de preempleo, rutina y temas investigativos."
        }
      ];
    }
    if (!pc.svgFocusAreas || pc.svgFocusAreas.length === 0) {
      pc.svgFocusAreas = [
        {
          title: "Fundamentos y estándares",
          description: "Domina los principios de las prácticas internacionales estandarizadas en entrevistas pretest y aprende los fundamentos metodológicos que garantizan la confiabilidad técnica de la evaluación.",
          iconViewBox: "0 0 85 93",
          iconPaths: [
            "M27.648 39.7c0 13.904 11.447 25.217 25.516 25.217s25.5-11.312 25.5-25.217a24.71 24.71 0 0 0-2.78-11.457c-1.654-3.2-4.024-6.058-6.878-8.302v-2.443c0-5.292-1.704-9.778-4.926-12.973C61.215 1.672 57.342.066 53.187 0a.87.87 0 0 0-.043 0c-4.158.065-8.033 1.672-10.9 4.524-3.224 3.194-4.927 7.68-4.927 12.973v2.443a25.54 25.54 0 0 0-6.878 8.302c-1.845 3.57-2.78 7.424-2.78 11.457zm44.387 12.6a22.85 22.85 0 0 1-18.871 9.916c-7.844 0-14.775-3.938-18.876-9.918v-3.36c0-5.464 3.526-7.155 7.72-8.368l8.472 4.913c.976.62 1.828.93 2.68.93s1.705-.3 2.68-.93l8.473-4.913c4.193 1.214 7.72 2.904 7.72 8.37v3.36zm-26.4-12.76c1.4-.62 2.137-1.917 2.584-2.96a15.43 15.43 0 0 0 .849.344c1.46.534 2.783.8 4.106.8s2.646-.267 4.102-.8a15.4 15.4 0 0 0 .85-.344c.446 1.045 1.184 2.34 2.584 2.96l-6.263 3.632a1.15 1.15 0 0 0-.051.031c-1.075.688-1.372.688-2.448 0l-.05-.03-6.262-3.63zm30.32.16a22.19 22.19 0 0 1-1.29 7.47c-.774-6.183-5.648-8.096-10.156-9.353l-.033-.01-1.5-.407-.958-.255c-.723-.194-1.163-1.092-1.467-1.86 4.334-2.777 7.708-7.484 8.368-11.878 4.508 4.237 7.047 10.042 7.047 16.3zm-22.78-37c5.98.104 12.385 4.3 13.064 13.2-1.392-.376-2.108-1.098-2.856-1.853-1.046-1.056-2.348-2.37-5.1-1.67l-1.96.5c-1.63.43-2.446.647-3.148.647s-1.528-.217-3.167-.65l-1.947-.507c-2.748-.7-4.05.613-5.094 1.668-.75.755-1.466 1.48-2.862 1.855.68-8.923 7.087-13.108 13.07-13.212zm-13.13 15.988c2.625-.478 3.904-1.767 4.87-2.743.93-.938 1.243-1.253 2.463-.943l1.923.5c1.8.48 2.808.742 3.872.742s2.053-.262 3.854-.74L58.962 15c1.225-.312 1.538.005 2.47.944.967.975 2.244 2.263 4.866 2.74v3.193c0 4.72-4.66 10.568-9.97 12.513-2.327.854-3.978.854-6.3 0-5.312-1.946-9.97-7.794-9.97-12.513v-3.193zm-2.6 4.72c.66 4.393 4.035 9.1 8.37 11.878-.304.767-.745 1.665-1.464 1.86l-.955.254-1.505.405a1.26 1.26 0 0 0-.075.021c-4.5 1.257-9.354 3.175-10.127 9.343a22.18 22.18 0 0 1-1.3-7.47c0-6.25 2.54-12.054 7.047-16.3zm38.193-6.053l-2.087-1.9c-.58-.477-1.44-.4-1.922.175a1.34 1.34 0 0 0 .177 1.9l1.902 1.722C79.23 24.722 82.27 31.98 82.27 39.7s-3.04 14.977-8.562 20.435c-11.4 11.268-29.948 11.268-41.347 0C26.84 54.677 23.8 47.42 23.8 39.7s3.04-14.977 8.563-20.435c.53-.525 1.028-.983 1.52-1.4a1.34 1.34 0 0 0 .148-1.903c-.5-.566-1.352-.63-1.925-.146a29.31 29.31 0 0 0-1.673 1.54C24.395 23.324 21.07 31.26 21.07 39.7a31.12 31.12 0 0 0 6 18.439l-6.165 6.094-.126-.125a2.36 2.36 0 0 0-1.669-.682 2.36 2.36 0 0 0-1.67.683l-4.22 4.175c-.01.01-.02.017-.03.026s-.018.02-.027.03l-3.2 3.16a1.34 1.34 0 0 0 .001 1.908c.533.527 1.398.526 1.93-.001l2.26-2.236 7.036 6.954-9.977 9.86a4.96 4.96 0 0 1-3.517 1.435c-1.333 0-2.582-.5-3.518-1.436a4.87 4.87 0 0 1-1.45-3.477c0-1.317.515-2.553 1.45-3.477l3.56-3.518a1.34 1.34 0 0 0 0-1.908c-.533-.527-1.397-.527-1.93 0l-3.56 3.518A7.52 7.52 0 0 0 0 84.508c0 2.04.8 3.952 2.248 5.385a7.69 7.69 0 0 0 5.449 2.227c2.064 0 4-.8 5.448-2.227l15.2-15c.445-.44.7-1.027.7-1.653s-.245-1.213-.7-1.653l-.123-.122 6.168-6.097c5.55 3.947 12.102 5.922 18.654 5.922 8.186 0 16.372-3.08 22.604-9.24C81.676 56.074 85 48.14 85 39.698s-3.325-16.375-9.362-22.343zM23.122 76.22l-7.037-6.955 3.023-3 7.038 6.957-3.024 2.988zm3.16-6.67l-3.448-3.408 5.936-5.868a32.34 32.34 0 0 0 1.66 1.769c.58.573 1.176 1.12 1.787 1.638L26.28 69.55z"
          ]
        },
        {
          title: "Preparación y desarrollo del pretest",
          description: "Aprende cada fase de preparación previa al examen y domina el paso a paso del protocolo de entrevista pretest, asegurando consistencia y validez en tus evaluaciones poligráficas.",
          iconViewBox: "0 0 84 84",
          iconPaths: [
            "M32.86 25.184h15.535c.898 0 1.627-.734 1.627-1.64s-.73-1.64-1.627-1.64H32.86c-.898 0-1.627.735-1.627 1.64s.728 1.64 1.627 1.64z",
            "M24.51 22.383l-4.24 4.277-.98-.988c-.636-.64-1.666-.64-2.3 0a1.65 1.65 0 0 0 0 2.32l2.13 2.148c.318.32.734.48 1.15.48s.832-.16 1.15-.48l5.39-5.438a1.65 1.65 0 0 0 0-2.32c-.636-.64-1.665-.64-2.3 0z",
            "M32.86 31.746h7.36c.898 0 1.627-.734 1.627-1.64s-.73-1.64-1.627-1.64h-7.36c-.898 0-1.627.735-1.627 1.64s.728 1.64 1.627 1.64z",
            "M24.51 39.446l-4.24 4.277-.98-.988c-.636-.64-1.666-.64-2.3 0a1.65 1.65 0 0 0 0 2.32l2.13 2.148c.318.32.734.48 1.15.48s.832-.16 1.15-.48l5.39-5.438a1.65 1.65 0 0 0 0-2.32c-.636-.64-1.665-.64-2.3 0z",
            "M32.86 42.247h15.535c.898 0 1.627-.734 1.627-1.64s-.73-1.64-1.627-1.64H32.86c-.898 0-1.627.735-1.627 1.64s.728 1.64 1.627 1.64z",
            "M32.86 48.81h7.36c.898 0 1.627-.734 1.627-1.64s-.73-1.64-1.627-1.64h-7.36c-.898 0-1.627.734-1.627 1.64s.728 1.64 1.627 1.64z",
            "M24.51 56.672l-4.24 4.277-.98-.988c-.636-.64-1.666-.64-2.3 0a1.65 1.65 0 0 0 0 2.32l2.13 2.148c.318.32.734.48 1.15.48s.832-.16 1.15-.48l5.39-5.438a1.65 1.65 0 0 0 0-2.32c-.636-.64-1.665-.64-2.3 0z",
            "M32.86 59.473h15.535c.898 0 1.627-.735 1.627-1.64s-.73-1.64-1.627-1.64H32.86c-.898 0-1.627.734-1.627 1.64s.728 1.64 1.627 1.64zm0 6.562h7.36c.898 0 1.627-.734 1.627-1.64s-.73-1.64-1.627-1.64h-7.36c-.898 0-1.627.734-1.627 1.64s.728 1.64 1.627 1.64zM83.286 42c0-9.806-7.866-17.792-17.568-17.88V13.043c0-4.523-3.648-8.203-8.133-8.203H40.42C39.126 1.937 36.233 0 33.002 0h-.286c-3.23 0-6.124 1.937-7.42 4.84H8.133C3.65 4.84 0 8.52 0 13.043v62.754C0 80.32 3.65 84 8.133 84h49.45c4.485 0 8.133-3.68 8.133-8.203V59.88a17.57 17.57 0 0 0 11.463-4.39c.1-.065.172-.14.246-.22 3.596-3.275 5.86-8 5.86-13.27zm-3.253 0a14.61 14.61 0 0 1-3.225 9.177 12.78 12.78 0 0 0-6.276-5.85 6.74 6.74 0 0 0 1.701-4.483V39.57c0-3.714-2.995-6.735-6.678-6.735s-6.677 3.02-6.677 6.735v1.273c0 1.72.644 3.3 1.7 4.483a12.78 12.78 0 0 0-6.276 5.85A14.61 14.61 0 0 1 51.078 42c0-8.05 6.495-14.602 14.478-14.602S80.033 33.95 80.033 42zM56.777 53.603c1.404-3.593 4.878-6.025 8.778-6.025s7.375 2.422 8.78 6.025c-2.437 1.88-5.48 3-8.778 3a14.32 14.32 0 0 1-8.778-3zm5.355-12.76V39.57c0-1.904 1.536-3.454 3.424-3.454s3.424 1.55 3.424 3.454v1.273c0 1.904-1.537 3.453-3.424 3.453s-3.424-1.55-3.424-3.453zm.333-27.8V24.4a17.48 17.48 0 0 0-4.555 1.477v-11.5c0-.906-.728-1.64-1.627-1.64H47.5V9.3c0-.412-.056-.8-.16-1.2h10.246c2.7 0 4.88 2.208 4.88 4.922zM26.437 8.12a1.63 1.63 0 0 0 1.57-1.211c.575-2.136 2.5-3.63 4.7-3.63h.286c2.197 0 4.133 1.493 4.7 3.63a1.63 1.63 0 0 0 1.569 1.211h3.787c.65 0 1.18.534 1.18 1.2v3.404H21.472V9.3c0-.656.53-1.2 1.18-1.2h3.786zm31.148 72.6H8.133c-2.7 0-4.88-2.208-4.88-4.922V13.043c0-2.714 2.2-4.922 4.88-4.922H18.38a4.49 4.49 0 0 0-.16 1.19v3.404H9.435c-.898 0-1.627.734-1.627 1.64v60.13c0 .906.728 1.64 1.627 1.64h16.917c.898 0 1.627-.734 1.627-1.64s-.728-1.64-1.627-1.64H11.06v-56.85h43.595v11.908c-3.404 2.683-5.815 6.6-6.575 11.06H32.86c-.9 0-1.627.735-1.627 1.64s.728 1.64 1.627 1.64h14.97c.07 5.162 2.317 9.803 5.86 13.027a1.51 1.51 0 0 0 .242.216c.237.2.48.4.73.607v16.748h-15.3c-.898 0-1.627.734-1.627 1.64s.728 1.64 1.627 1.64H56.3c.898 0 1.627-.734 1.627-1.64v-16.35a17.48 17.48 0 0 0 4.555 1.477v16.186c0 2.714-2.2 4.922-4.88 4.922z"
          ]
        },
        {
          title: "Evaluaciones diagnósticas y exploratorias",
          description: "Especialízate en el análisis de evaluaciones poligráficas diagnósticas y exploratorias, incluyendo el protocolo de preguntas específicas para casos de preempleo, rutina y temas investigativos.",
          iconViewBox: "0 0 84 84",
          iconPaths: [
            "M57.58 75.012a1.23 1.23 0 0 0-1.23 1.23v5.297h-8.8v-2.084a1.23 1.23 0 1 0-2.461 0v2.084h-7.203l1.996-1.996a8.02 8.02 0 0 0 0-11.417c-2.83-2.83-7.314-3.108-10.467-.8a8.13 8.13 0 0 0-10.467.8 8.02 8.02 0 0 0 0 11.417l1.996 1.996H13.73v-2.084a1.231 1.231 0 1 0-2.461 0v2.084H2.46v-5.297a1.23 1.23 0 1 0-2.461 0v6.527A1.23 1.23 0 0 0 1.229 84h56.35a1.23 1.23 0 0 0 1.23-1.231v-6.527a1.23 1.23 0 0 0-1.23-1.23zm-36.9 2.792c-1.06-1.06-1.644-2.47-1.644-3.968s.584-2.908 1.644-3.968a5.64 5.64 0 0 1 7.871-.062 1.23 1.23 0 0 0 1.712 0c2.187-2.12 5.718-2.1 7.87.062 1.06 1.06 1.644 2.47 1.644 3.968s-.584 2.908-1.644 3.968l-3.736 3.736h-9.982l-3.736-3.736zm28.604-26.03l-12.848-3.426V43.08c4.156-2.317 7.06-6.62 7.42-11.615h.465c2.872 0 5.208-2.336 5.208-5.208 0-1.33-.502-2.545-1.326-3.467V11.837a7.87 7.87 0 0 0-7.86-7.86h-.795C39.267 1.738 37.353 0 35.04 0h-9.944a14.51 14.51 0 0 0-14.489 14.489v8.3c-.824.922-1.326 2.136-1.326 3.467 0 2.872 2.336 5.208 5.208 5.208h.465c.36 4.996 3.264 9.298 7.42 11.615v5.268l-12.85 3.426A12.85 12.85 0 0 0 0 64.171v6.314a1.23 1.23 0 1 0 2.461 0V64.17c0-4.7 3.166-8.812 7.698-10.02l7.267-1.938c1.326 5.453 6.248 9.413 11.978 9.413s10.652-3.96 11.978-9.413l7.267 1.938c4.533 1.2 7.7 5.33 7.7 10.02v6.313a1.231 1.231 0 1 0 2.461 0V64.17a12.85 12.85 0 0 0-9.525-12.398zm-4.964-22.77h-.427V23.5h.427a2.75 2.75 0 0 1 2.747 2.747 2.75 2.75 0 0 1-2.747 2.747zm1.42-17.165v9.4a5.19 5.19 0 0 0-1.421-.199H43.17l-3.588-3.588V6.438h.758a5.41 5.41 0 0 1 5.4 5.4zm-34 14.42a2.75 2.75 0 0 1 2.747-2.747h.427v5.494h-.427a2.75 2.75 0 0 1-2.747-2.747zm5.635 4.158V23.5H21.6a1.231 1.231 0 1 0 0-2.461h-7.1a5.19 5.19 0 0 0-1.421.199V14.5c0-6.632 5.396-12.028 12.028-12.028h9.944c1.15 0 2.084.935 2.084 2.084V17.46l-2.007 2.007a5.36 5.36 0 0 1-3.817 1.58h-3.96a1.23 1.23 0 1 0 0 2.461h3.96a7.81 7.81 0 0 0 5.558-2.302l1.497-1.497 3.078 3.078v7.626c0 6.632-5.396 12.028-12.028 12.028s-12.028-5.396-12.028-12.028zm12.028 14.5a14.43 14.43 0 0 0 4.57-.739v5.128c0 2.52-2.05 4.57-4.57 4.57s-4.57-2.05-4.57-4.57v-5.128a14.43 14.43 0 0 0 4.57.739zm0 14.263a9.89 9.89 0 0 1-9.601-7.587l2.745-.732c.7 3.13 3.513 5.476 6.855 5.476s6.146-2.345 6.856-5.476l2.745.732a9.89 9.89 0 0 1-9.601 7.587zm38.45-56.4c-8.903 0-16.146 7.243-16.146 16.146a16.21 16.21 0 0 0 4.485 11.166l-1.885 4.06a1.23 1.23 0 0 0 1.634 1.635l4.942-2.294a16.2 1.23 0 0 0 6.97 1.58A16.17 16.17 0 0 0 84 18.916C84 10.012 76.756 2.77 67.853 2.77zm0 29.83a13.71 13.71 0 0 1-6.375-1.573A1.23 1.23 0 0 0 60.386 31l-2.43 1.128.833-1.795a1.23 1.23 0 0 0-.276-1.417 13.55 13.55 0 0 1-4.345-10.001c0-7.546 6.14-13.685 13.685-13.685S81.54 11.37 81.54 18.916 75.4 32.6 67.853 32.6zm8.31-20.046c-2.242-2.242-5.767-2.505-8.308-.77-2.54-1.734-6.066-1.47-8.308.77a6.49 6.49 0 0 0-1.914 4.62 6.49 6.49 0 0 0 1.914 4.62l7.438 7.438c.24.24.555.36.87.36s.63-.12.87-.36l7.438-7.438a6.54 6.54 0 0 0 0-9.24zm-1.74 7.5l-6.568 6.568-6.568-6.568c-.77-.77-1.193-1.792-1.193-2.88a4.05 4.05 0 0 1 1.193-2.88A4.06 4.06 0 0 1 67 14.249a1.23 1.23 0 0 0 1.713 0 4.09 4.09 0 0 1 5.712.045 4.08 4.08 0 0 1 0 5.76z"
          ]
        }
      ];
    }
    if (!pc.fichaTecnica || pc.fichaTecnica.length === 0) {
      pc.fichaTecnica = [
        { title: "⏱️ 15 horas de duración", description: "Formación intensiva y estructurada." },
        { title: "📚 32 lecciones", description: "Contenido completo y detallado." },
        { title: "📄 Plantillas descargables", description: "+75 diapositivas y documentos listos." },
        { title: "❓ Quizzes interactivos", description: "Preguntas para reforzar aprendizaje." },
        { title: "📺 Acceso 3 meses", description: "Contenido pregrabado disponible." },
        { title: "✅ 30 días de garantía", description: "Satisfacción garantizada." },
        { title: "🔐 Comunidad ONE TRUE", description: "Acceso exclusivo a la red." },
        { title: "🎓 Diploma oficial", description: "Certificado de finalización." }
      ];
    }
  } else if (template === "graficas") {
    if (!pc.focusAreas || pc.focusAreas.length === 0) {
      pc.focusAreas = [
        {
          title: "Ejes Temáticos",
          description: "La calificación de gráficas poligráficas se estructura en tres ejes metodológicos que garantizan precisión y objetividad en cada evaluación, eliminando la subjetividad del análisis.",
          items: [
            "Un recorrido profundo por el proceso de análisis de datos poligráficos:",
            "Latencia Inferior.",
            "Latencia superior.",
            "Ventana de inicio de respuesta fija.",
            "Ventana de inicio de respuesta permisiva.",
            "Ventana de Evaluación Fija.",
            "Ventana de Evaluación permisiva.",
            "Reacciones simples en EDA y Cardio.",
            "Reacciones Complejas en EDA y Cardio.",
            "Plano cartesiano y el análisis de datos.",
            "Variables extrañas y su impacto en el análisis de los datos.",
            "Criterios de tolerancia para la extracción de características.",
            "Eventos de artefactos y su impacto en el análisis de datos."
          ]
        }
      ];
    }
    if (!pc.customCards || pc.customCards.length === 0) {
      pc.customCards = [
        {
          title: "Análisis de Respiración (RIN/RSC)",
          description: "Evaluación de patrones respiratorios como indicadores de estrés y respuesta fisiológica.",
          icon: "/icons/Browser-Page-Account--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "Análisis Cardiovascular (CVT/GSR)",
          description: "Interpretación de cambios en presión arterial y respuesta galvánica de la piel.",
          icon: "/icons/Browser-Hand--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "Zona de Comparación Relativa",
          description: "Técnica de comparación entre zonas de respuesta para identificar reacciones relevantes.",
          icon: "/icons/Touchpad-Finger--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "Análisis de Artefactos",
          description: "Identificación y evaluación de respuestas causadas por movimiento o factores externos.",
          icon: "/icons/Password-Desktop--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "Scoring Automatizado",
          description: "Uso de software especializado para análisis cuantitativo y comparación de datos.",
          icon: "/icons/Task-Checklist--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "Interpretación Forense",
          description: "Estándares de análisis aplicados en contextos legales y periciales.",
          icon: "/icons/Monitor-Find--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "Reporte Técnico Profesional",
          description: "Redacción de conclusiones y dictámenes basados en análisis e interpretación de datos.",
          icon: "/icons/Touch-Id-Desktop--Streamline-Ultimate.webp",
          items: []
        }
      ];
    }
    if (!pc.fichaTecnica || pc.fichaTecnica.length === 0) {
      pc.fichaTecnica = [
        { title: "⏱️ 15 horas intensivas", description: "Entrenamiento especializado en análisis." },
        { title: "📚 30 lecciones", description: "Especializadas en análisis cuantitativo." },
        { title: "📊 Ejercicios prácticos", description: "Gráficas reales para calibrar criterio." },
        { title: "📄 Guías descargables", description: "Tablas de puntuación y herramientas." },
        { title: "✅ 30 días garantía", description: "Satisfacción garantizada." },
        { title: "🔐 Comunidad ONE TRUE", description: "Resolución de dudas complejas." },
        { title: "🎓 Diploma oficial", description: "Certifica competencia en análisis." }
      ];
    }
  } else if (template === "control-calidad") {
    if (!pc.focusAreas || pc.focusAreas.length === 0) {
      pc.focusAreas = [
        { title: "Estándares de Práctica (APA-ASTM)", description: "Marco normativo internacional que rige la profesión." },
        { title: "Bases del Aseguramiento de Calidad (QA)", description: "Principios preventivos para mantener la integridad del proceso." },
        { title: "Bases del Control de Calidad (CQ)", description: "Metodologías de supervisión técnica directa." },
        { title: "Auditoría de la Etapa Previa", description: "Revisión de la logística, selección de objetivos y preparación de la examinación." },
        { title: "Auditoría de la Entrevista Pre-Test", description: "Supervisión de la fase de entrevista previa a la prueba." },
        { title: "Auditoría de la Prueba In-Test", description: "Verificación de la correcta administración de la etapa de toma de data fisiológica." },
        { title: "Auditoría del Análisis de Datos", description: "Revisión profunda de la interpretación de trazados fisiológicos." },
        { title: "Auditoría de la Entrevista Post-Test", description: "Evaluación del manejo del evaluado tras la examinación." },
        { title: "Sistemas de Calificación Manual y CQ", description: "Protocolo de puntuación manual ESS-M." },
        { title: "Sistema de Calificación Algorítmico OSS-3", description: "Auditoría del análisis computarizado avanzado." },
        { title: "Evaluación Teórica del Control de Calidad", description: "Validación de los conocimientos científicos y normativos en PDD." },
        { title: "Evaluación Práctica del Proceso Integral", description: "Ejecución real de una auditoría completa de control de calidad." }
      ];
    }
    if (!pc.customCards || pc.customCards.length === 0) {
      pc.customCards = [
        {
          title: "Auditoría de Procedimientos",
          description: "Revisión sistemática del cumplimiento de estándares en cada examinación.",
          icon: "/icons/Browser-Page-Account--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "Validación de Datos",
          description: "Verificación de la integridad y consistencia en registros poligráficos.",
          icon: "/icons/Browser-Hand--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "Revisión por Pares",
          description: "Evaluación cruzada de casos entre examinadores certificados.",
          icon: "/icons/Touchpad-Finger--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "Calibración de Equipos",
          description: "Mantenimiento preventivo y control de precisión instrumental.",
          icon: "/icons/Password-Desktop--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "Análisis de Discrepancias",
          description: "Investigación de variaciones en resultados e identificación de causas.",
          icon: "/icons/Task-Checklist--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "Documentación de Conformidad",
          description: "Registro exhaustivo de auditorías y mejoras implementadas.",
          icon: "/icons/Monitor-Find--Streamline-Ultimate.webp",
          items: []
        },
        {
          title: "Mejora Continua",
          description: "Actualización de protocolos basada en hallazgos de auditoría.",
          icon: "/icons/Touch-Id-Desktop--Streamline-Ultimate.webp",
          items: []
        }
      ];
    }
    if (!pc.fichaTecnica || pc.fichaTecnica.length === 0) {
      pc.fichaTecnica = [
        { title: "💻 Modalidad", description: "100% en línea" },
        { title: "📅 Fechas", description: "Consulte nuestra próxima convocatoria." },
        { title: "⏰ Horarios", description: "Lunes a viernes (19:00 a 22:00) y dos sábados (08:00 a 13:00)." }
      ];
    }
  }

  return course;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<Tab>("services");
  const [loading, setLoading] = useState(true);
  const [db, setDb] = useState<DatabaseSchema>({ services: [], courses: [], blogs: [], podcasts: [] });

  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  
  // Entity specific editing states
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [editingPodcast, setEditingPodcast] = useState<Podcast | null>(null);
  const [isNewEntity, setIsNewEntity] = useState(false);

  const [confirmDel, setConfirmDel] = useState<{ type: Tab; id: string; title: string } | null>(null);
  const [toast, setToast] = useState<{ type: "ok" | "err"; msg: string } | null>(null);

  // Auth Guard
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data } = await supabase.auth.getSession();
        if (!mounted) return;
        if (!data.session) {
          router.replace("/login?redirect=/admin");
        } else {
          setEmail(data.session.user?.email ?? null);
          setChecking(false);
        }
      } catch (err) {
        console.error("Session check bypassed for offline/local environment:", err);
        setEmail("admin@somosonetrue.com");
        setChecking(false);
      }
    })();

    const { data: sub } = supabase.auth.onAuthStateChange((_ev, session) => {
      if (!session) {
        router.replace("/login?redirect=/admin");
      } else {
        setEmail(session.user?.email ?? null);
      }
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/cms?t=" + Date.now(), { cache: "no-store" });
      const data = await res.json();
      setDb(data);
    } catch (error) {
      console.error("Failed to fetch CMS DB:", error);
      showToast("err", "Error al leer datos locales.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!checking) fetchData();
  }, [checking]);

  // Lock body and html scroll when editor drawer or confirmation dialog is open
  useEffect(() => {
    if (showForm || confirmDel) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [showForm, confirmDel]);

  const logout = async () => {
    await supabase.auth.signOut();
    router.replace("/login");
  };

  const showToast = (type: "ok" | "err", msg: string) => {
    setToast({ type, msg });
    setTimeout(() => setToast(null), 3000);
  };

  const metrics = useMemo(() => {
    const totalServices = db.services.length;
    const publishedServices = db.services.filter((s) => s.published).length;

    const allCourses = db.courses.filter((c: any) => !c.pageContent?.isComplementary);
    const totalCourses = allCourses.length;
    const publishedCourses = allCourses.filter((c) => c.published).length;

    const allComplementarias = db.courses.filter((c: any) => c.pageContent?.isComplementary === true);
    const totalComplementarias = allComplementarias.length;
    const publishedComplementarias = allComplementarias.filter((c) => c.published).length;

    const totalBlogs = db.blogs.length;
    const publishedBlogs = db.blogs.filter((b) => b.published).length;

    const totalPodcasts = db.podcasts?.length || 0;
    const publishedPodcasts = (db.podcasts || []).filter((p) => p.published).length;

    return {
      services: { total: totalServices, published: publishedServices, drafts: totalServices - publishedServices },
      courses: { total: totalCourses, published: publishedCourses, drafts: totalCourses - publishedCourses },
      complementarias: { total: totalComplementarias, published: publishedComplementarias, drafts: totalComplementarias - publishedComplementarias },
      blogs: { total: totalBlogs, published: publishedBlogs, drafts: totalBlogs - publishedBlogs },
      podcasts: { total: totalPodcasts, published: publishedPodcasts, drafts: totalPodcasts - publishedPodcasts }
    };
  }, [db]);

  const filteredData = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (activeTab === "services") {
      if (!q) return db.services;
      return db.services.filter((s) => s.title.toLowerCase().includes(q) || s.id.toLowerCase().includes(q));
    }
    if (activeTab === "courses") {
      const nonComplementary = db.courses.filter((c: any) => !c.pageContent?.isComplementary);
      if (!q) return nonComplementary;
      return nonComplementary.filter((c) => c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));
    }
    if (activeTab === "complementarias") {
      const complementary = db.courses.filter((c: any) => c.pageContent?.isComplementary === true);
      if (!q) return complementary;
      return complementary.filter((c) => c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));
    }
    if (activeTab === "blogs") {
      if (!q) return db.blogs;
      return db.blogs.filter((b) => b.title.toLowerCase().includes(q) || b.id.toLowerCase().includes(q));
    }
    if (!q) return db.podcasts || [];
    return (db.podcasts || []).filter((p) => p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q));
  }, [db, activeTab, search]);

  const handleAddNew = () => {
    setIsNewEntity(true);
    if (activeTab === "services") {
      setEditingService({
        id: "",
        title: "",
        desc: "",
        image: "",
        cta: "Ver detalles del servicio",
        href: "",
        template: "vetting",
        published: false,
        pageContent: {
          heroTitle: "",
          heroUnderlined: "",
          heroDesc: "",
          heroTagline: "",
          heroImage: "",
          aboutTitle: "",
          aboutDesc: "",
          aboutCards: [],
          whyTitle: "",
          whyPoints: [],
          contactPhone: "0981296179",
          contactWhatsapp: "https://api.whatsapp.com/send?phone=593981296179"
        }
      });
    } else if (activeTab === "courses" || activeTab === "complementarias") {
      setEditingCourse({
        id: "",
        title: "",
        desc: "",
        image: "",
        href: "",
        published: false,
        pageContent: {
          heroTagline: "",
          heroTitle: "",
          heroDesc: "",
          heroImage: "",
          aboutTitle: "Ejes Temáticos:",
          aboutDesc: "",
          focusAreas: [],
          fichaTecnica: [],
          contactPhone: "0981296179",
          contactWhatsapp: "https://api.whatsapp.com/send?phone=593981296179",
          ...(activeTab === "complementarias" ? { isComplementary: true } : {})
        }
      });
    } else if (activeTab === "blogs") {
      setEditingBlog({
        id: "",
        title: "",
        image: "",
        link: "",
        published: false,
        publishDate: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
        readTime: "5 min de lectura",
        content: ""
      });
    } else {
      setEditingPodcast({
        id: "",
        title: "",
        description: "",
        image: "",
        audioUrl: "#",
        duration: "30 min",
        date: new Date().toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" }),
        topic: "General",
        published: false
      });
    }
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setIsNewEntity(false);
    if (activeTab === "services") {
      setEditingService(JSON.parse(JSON.stringify(item)));
    } else if (activeTab === "courses" || activeTab === "complementarias") {
      setEditingCourse(prepopulateCourseDefaults(JSON.parse(JSON.stringify(item))));
    } else if (activeTab === "blogs") {
      setEditingBlog(JSON.parse(JSON.stringify(item)));
    } else {
      setEditingPodcast(JSON.parse(JSON.stringify(item)));
    }
    setShowForm(true);
  };

  const togglePublishedState = async (type: Tab, item: any) => {
    const updated = { ...item, published: !item.published };
    const saveType = type === "complementarias" ? "courses" : type;
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: saveType, action: "save", data: updated })
      });
      if (res.ok) {
        showToast("ok", updated.published ? "Publicado" : "Pasó a borrador");
        fetchData();
      } else {
        throw new Error();
      }
    } catch {
      showToast("err", "Error al actualizar estado.");
    }
  };

  const handleConfirmDelete = async () => {
    if (!confirmDel) return;
    const delType = confirmDel.type === "complementarias" ? "courses" : confirmDel.type;
    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: delType, action: "delete", id: confirmDel.id })
      });
      if (res.ok) {
        showToast("ok", "Eliminado correctamente");
        setConfirmDel(null);
        fetchData();
      } else {
        throw new Error();
      }
    } catch {
      showToast("err", "Error al eliminar elemento.");
    }
  };

  const handleSaveEntity = async (type: Tab, payload: any) => {
    if (!payload.id) {
      showToast("err", "El identificador (slug) es obligatorio.");
      return;
    }
    if (!payload.title) {
      showToast("err", "El título es obligatorio.");
      return;
    }

    if (type === "services") {
      payload.href = `/${payload.id}`;
    } else if (type === "courses" || type === "complementarias") {
      payload.href = `/${payload.id}`;
    } else if (type === "blogs") {
      payload.link = `/blog/${payload.id}`;
    }

    try {
      const res = await fetch("/api/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, action: "save", data: payload })
      });
      if (res.ok) {
        showToast("ok", "Guardado correctamente");
        setShowForm(false);
        setEditingService(null);
        setEditingCourse(null);
        setEditingBlog(null);
        setEditingPodcast(null);
        fetchData();
      } else {
        throw new Error();
      }
    } catch {
      showToast("err", "Error al guardar el elemento.");
    }
  };

  if (checking) {
    return (
      <main className={`${manrope.className} min-h-screen grid place-items-center bg-white`}>
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-neutral-300 border-l-transparent" />
      </main>
    );
  }

  const activeMetrics = activeTab === "services" ? metrics.services : activeTab === "courses" ? metrics.courses : activeTab === "complementarias" ? metrics.complementarias : activeTab === "blogs" ? metrics.blogs : metrics.podcasts;

  return (
    <main className={`${manrope.className} min-h-screen bg-neutral-50 text-neutral-800 selection:bg-[#FFC107] selection:text-neutral-900`}>
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full overflow-hidden flex items-center justify-center bg-white border border-neutral-200 shrink-0">
              <img src="/footer.webp" alt="Logo" className="w-7 h-7 object-contain" />
            </div>
            <div>
              <h1 className="text-base font-extrabold leading-5 text-neutral-900">Panel de administración</h1>
              <p className="text-xs text-neutral-500 leading-4 font-semibold">One True Ecuador</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {email && <span className="hidden text-xs text-neutral-600 sm:block font-medium">{email}</span>}
            <Link href="/" className="rounded-full border px-4 py-2 text-xs font-semibold text-neutral-700 hover:bg-neutral-100 transition-colors">
              Ir al sitio
            </Link>
            <button
              onClick={logout}
              className="rounded-full px-4 py-2 text-xs font-semibold text-white transition-colors"
              style={{ backgroundColor: PURPLE }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = PURPLE_HOVER)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = PURPLE)}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
      </header>

      {/* Grid Content */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-8 lg:grid-cols-12">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-3">
          <nav className="rounded-2xl border border-neutral-200 bg-white p-3 shadow-sm flex flex-col gap-1">
            <button
              onClick={() => { setActiveTab("services"); setSearch(""); }}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                activeTab === "services" ? "bg-neutral-100 text-neutral-900 border-l-4 pl-2" : "text-neutral-600 hover:bg-neutral-50"
              }`}
              style={activeTab === "services" ? { borderLeftColor: PURPLE } : undefined}
            >
              <span>Servicios</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">{db.services.length}</span>
            </button>
            <button
              onClick={() => { setActiveTab("courses"); setSearch(""); }}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                activeTab === "courses" ? "bg-neutral-100 text-neutral-900 border-l-4 pl-2" : "text-neutral-600 hover:bg-neutral-50"
              }`}
              style={activeTab === "courses" ? { borderLeftColor: PURPLE } : undefined}
            >
              <span>Cursos Avanzados</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">{db.courses.length}</span>
            </button>
            <button
              onClick={() => { setActiveTab("blogs"); setSearch(""); }}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                activeTab === "blogs" ? "bg-neutral-100 text-neutral-900 border-l-4 pl-2" : "text-neutral-600 hover:bg-neutral-50"
              }`}
              style={activeTab === "blogs" ? { borderLeftColor: PURPLE } : undefined}
            >
              <span>Blog & Artículos</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">{db.blogs.length}</span>
            </button>
            <button
              onClick={() => { setActiveTab("complementarias"); setSearch(""); }}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                activeTab === "complementarias" ? "bg-neutral-100 text-neutral-900 border-l-4 pl-2" : "text-neutral-600 hover:bg-neutral-50"
              }`}
              style={activeTab === "complementarias" ? { borderLeftColor: PURPLE } : undefined}
            >
              <span>Formaciones Comp.</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">{db.courses.filter((c: any) => c.pageContent?.isComplementary === true).length}</span>
            </button>
            <button
              onClick={() => { setActiveTab("podcasts"); setSearch(""); }}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition-all ${
                activeTab === "podcasts" ? "bg-neutral-100 text-neutral-900 border-l-4 pl-2" : "text-neutral-600 hover:bg-neutral-50"
              }`}
              style={activeTab === "podcasts" ? { borderLeftColor: PURPLE } : undefined}
            >
              <span>Podcasts</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded bg-neutral-200 text-neutral-700">{db.podcasts?.length || 0}</span>
            </button>
          </nav>
        </aside>

        {/* Dashboard Main Workspace */}
        <section className="space-y-6 lg:col-span-9">
          {/* Dashboard Metrics */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <MetricCard title={`Total ${activeTab === "services" ? "Servicios" : activeTab === "courses" ? "Cursos" : activeTab === "complementarias" ? "Formaciones" : activeTab === "blogs" ? "Artículos" : "Episodios"}`} value={activeMetrics.total} />
            <MetricCard title="Publicados" value={activeMetrics.published} accent />
            <MetricCard title="Borradores" value={activeMetrics.drafts} />
          </div>

          {/* Action Row */}
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full sm:w-80">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por título o identificador..."
                className="w-full bg-white border border-neutral-300 rounded-full px-4 py-2.5 text-sm text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 transition-all"
                onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px ${PURPLE}22`)}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
              {search && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded px-2 text-xs text-neutral-500 hover:bg-neutral-100"
                  onClick={() => setSearch("")}
                >
                  Limpiar
                </button>
              )}
            </div>

            <button
              onClick={handleAddNew}
              className="rounded-full px-5 py-2.5 font-semibold text-white transition-colors"
              style={{ backgroundColor: PURPLE }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = PURPLE_HOVER)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = PURPLE)}
            >
              + Nuevo {activeTab === "services" ? "Servicio" : activeTab === "courses" ? "Curso" : activeTab === "complementarias" ? "Formación" : activeTab === "blogs" ? "Artículo" : "Episodio"}
            </button>
          </div>

          {/* Records Table List */}
          <div className="rounded-2xl border border-neutral-200 bg-white overflow-hidden shadow-sm">
            <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4 bg-white">
              <h2 className="text-base font-extrabold text-neutral-850">
                {activeTab === "services" ? "Servicios" : activeTab === "courses" ? "Cursos Avanzados" : activeTab === "complementarias" ? "Formaciones Complementarias" : activeTab === "blogs" ? "Blog & Artículos" : "Episodios de Podcast"}
              </h2>
              <span className="text-xs text-neutral-500 font-semibold">{filteredData.length} resultados</span>
            </div>

            {loading ? (
              <TableSkeleton />
            ) : filteredData.length === 0 ? (
              <p className="px-5 py-12 text-center text-sm text-neutral-500 font-semibold">No se encontraron elementos.</p>
            ) : (
              <ul className="divide-y divide-neutral-100">
                {filteredData.map((item: any) => {
                  const imageSrc = item.image || "/blog/1.webp";
                  const badge = item.published ? (
                    <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">Publicado</span>
                  ) : (
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-700">Borrador</span>
                  );

                  return (
                    <li key={item.id} className="flex items-center gap-4 px-5 py-4 hover:bg-neutral-50 transition-colors duration-150">
                      {/* Thumbnail Cover */}
                      <div className="h-12 w-16 overflow-hidden rounded bg-neutral-100 shrink-0 border border-neutral-200">
                        <img src={imageSrc} alt="" className="h-full w-full object-cover" onError={(e) => { e.currentTarget.src = "/blog/1.webp"; }} />
                      </div>

                      {/* Details */}
                      <div className="min-w-0 grow">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-bold text-sm text-neutral-850 truncate" title={item.title}>
                            {item.title}
                          </span>
                          {badge}
                        </div>
                        <p className="text-xs text-neutral-500 font-semibold mt-0.5">
                          ID: <code className="text-[#700FA3] font-mono">{item.id}</code>
                          {activeTab === "services" && ` — Plantilla: ${item.template}`}
                          {activeTab === "complementarias" && ` — Formación Complementaria`}
                          {activeTab === "podcasts" && ` — Duración: ${item.duration} | Tema: ${item.topic}`}
                        </p>
                      </div>

                      {/* Table Controls */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => togglePublishedState(activeTab, item)}
                          className={`rounded-full px-3 py-1 text-xs font-semibold border transition ${
                            item.published
                              ? "text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                              : "text-amber-700 border-amber-200 hover:bg-amber-50"
                          }`}
                        >
                          {item.published ? "Ocultar" : "Publicar"}
                        </button>
                        <button
                          onClick={() => handleEdit(item)}
                          className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700 hover:bg-neutral-50 transition"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => setConfirmDel({ type: activeTab, id: item.id, title: item.title })}
                          className="rounded-full border border-red-200 px-3 py-1 text-xs text-red-700 hover:bg-red-50 transition"
                        >
                          Borrar
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>
      </div>

      {/* Editor Drawer */}
      {showForm && (
        <SideEditorForm
          type={activeTab}
          isNew={isNewEntity}
          data={activeTab === "services" ? editingService : (activeTab === "courses" || activeTab === "complementarias") ? editingCourse : activeTab === "blogs" ? editingBlog : editingPodcast}
          onClose={() => {
            setShowForm(false);
            setEditingService(null);
            setEditingCourse(null);
            setEditingBlog(null);
            setEditingPodcast(null);
          }}
          onSave={(payload) => {
            const saveTab = activeTab === "complementarias" ? "courses" as Tab : activeTab;
            if (activeTab === "complementarias") {
              payload.pageContent = { ...(payload.pageContent || {}), isComplementary: true };
            }
            handleSaveEntity(saveTab, payload);
          }}
        />
      )}

      {/* Confirm Deletion Alert */}
      {confirmDel && (
        <ConfirmDialog
          title="Eliminar elemento"
          text={`¿Seguro que querés eliminar “${confirmDel.title}”? Esta acción no se puede deshacer y borrará el elemento permanentemente.`}
          confirmLabel="Eliminar"
          onCancel={() => setConfirmDel(null)}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Dynamic Toast Alert */}
      {toast && (
        <div
          className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full px-5 py-2 text-sm font-semibold shadow-lg border flex items-center gap-2 ${
            toast.type === "ok" ? "bg-green-600 text-white border-green-700" : "bg-red-600 text-white border-red-700"
          }`}
        >
          {toast.msg}
        </div>
      )}
    </main>
  );
}

/* Metric Display Card */
function MetricCard({ title, value, accent = false }: { title: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">{title}</p>
      <div className="mt-2 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-neutral-850">{value}</span>
        {accent && <span className="h-2 w-2 rounded-full animate-pulse" style={{ backgroundColor: PURPLE }} />}
      </div>
    </div>
  );
}

/* Table Loading Placeholder skeleton */
function TableSkeleton() {
  return (
    <ul className="divide-y divide-neutral-100 animate-pulse">
      {Array.from({ length: 4 }).map((_, i) => (
        <li key={i} className="flex items-center gap-4 px-5 py-4">
          <div className="h-12 w-16 rounded bg-neutral-200" />
          <div className="min-w-0 grow space-y-2">
            <div className="h-3 w-1/3 rounded bg-neutral-200" />
            <div className="h-2.5 w-1/4 rounded bg-neutral-200" />
          </div>
          <div className="h-6 w-14 rounded-full bg-neutral-200" />
        </li>
      ))}
    </ul>
  );
}

const parseBlogContent = (html: string): any[] => {
  if (typeof window === "undefined") return [];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html || "", "text/html");
  const blocks: any[] = [];

  const children = Array.from(doc.body.children);
  children.forEach((child) => {
    const tagName = child.tagName.toLowerCase();
    if (tagName === "h2") {
      blocks.push({
        type: "h2",
        text: child.innerHTML.trim()
      });
    } else if (tagName === "h3") {
      const svgEl = child.querySelector("svg");
      let svgHtml = "";
      let text = child.innerHTML;
      if (svgEl) {
        svgHtml = svgEl.outerHTML;
        const temp = child.cloneNode(true) as HTMLElement;
        temp.querySelector("svg")?.remove();
        text = temp.innerHTML.trim();
      }
      blocks.push({
        type: "h3",
        text: text,
        svg: svgHtml
      });
    } else if (tagName === "p") {
      blocks.push({
        type: "p",
        text: child.innerHTML.trim()
      });
    } else if (tagName === "ul") {
      const items = Array.from(child.querySelectorAll("li")).map((li) => li.innerHTML.trim());
      const isNone = child.classList.contains("list-none");
      blocks.push({
        type: isNone ? "ul-none" : "ul",
        items: items
      });
    }
  });

  if (blocks.length === 0 && html) {
    blocks.push({ type: "p", text: html });
  }

  return blocks;
};

const serializeBlogContent = (blocks: any[]): string => {
  let isFirstH2 = true;
  return blocks
    .map((block) => {
      if (block.type === "h2") {
        const h2Class = isFirstH2 ? "text-2xl font-bold mt-0 mb-6" : "text-2xl font-bold mt-12 mb-6";
        isFirstH2 = false;
        return `<h2 class="${h2Class}" style="color: #48255A">${block.text || ""}</h2>`;
      }
      if (block.type === "h3") {
        if (block.svg) {
          return `<h3 class="text-xl font-bold mt-8 mb-4 flex items-center gap-3" style="color: #700FA3">${block.svg} ${block.text || ""}</h3>`;
        } else {
          return `<h3 class="text-xl font-bold mt-8 mb-4" style="color: #700FA3">${block.text || ""}</h3>`;
        }
      }
      if (block.type === "p") {
        return `<p class="text-lg leading-relaxed mb-6 text-gray-700">${block.text || ""}</p>`;
      }
      if (block.type === "ul") {
        const items = block.items || [];
        return `<ul class="list-disc list-inside mb-6 text-lg leading-relaxed text-gray-700">\n${items
          .map((item: string) => `  <li>${item || ""}</li>`)
          .join("\n")}\n</ul>`;
      }
      if (block.type === "ul-none") {
        const items = block.items || [];
        return `<ul class="list-none mb-8 text-lg leading-relaxed text-gray-700">\n${items
          .map((item: string) => `  <li class="mb-4">${item || ""}</li>`)
          .join("\n")}\n</ul>`;
      }
      return "";
    })
    .join("\n\n");
};

/* Slide Editor Form Component */
function SideEditorForm({
  type,
  isNew,
  data,
  onClose,
  onSave
}: {
  type: Tab;
  isNew: boolean;
  data: any;
  onClose: () => void;
  onSave: (payload: any) => void;
}) {
  const [form, setForm] = useState<any>(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const [blogBlocks, setBlogBlocks] = useState<any[]>([]);

  useEffect(() => {
    if (type === "blogs" && data) {
      setBlogBlocks(parseBlogContent(data.content || ""));
    }
  }, [data, type]);

  const handleAddBlock = (blockType: string) => {
    setBlogBlocks((prev) => [
      ...prev,
      blockType.startsWith("ul")
        ? { type: blockType, items: ["Nuevo ítem"] }
        : { type: blockType, text: "Nuevo contenido" }
    ]);
  };

  const handleRemoveBlock = (index: number) => {
    setBlogBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateBlock = (index: number, field: string, value: any) => {
    setBlogBlocks((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const handleMoveBlock = (index: number, direction: "up" | "down") => {
    setBlogBlocks((prev) => {
      const copy = [...prev];
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= copy.length) return prev;
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy;
    });
  };

  const updateField = (key: string, val: any) => {
    setForm((prev: any) => ({ ...prev, [key]: val }));
  };

  const updateNestedContentField = (key: string, val: any) => {
    setForm((prev: any) => ({
      ...prev,
      pageContent: {
        ...(prev?.pageContent || {}),
        [key]: val
      }
    }));
  };

  const handleAddListItem = (arrayKey: string, initialItem: any) => {
    const list = [...(form?.pageContent?.[arrayKey] || [])];
    list.push(initialItem);
    updateNestedContentField(arrayKey, list);
  };

  const handleRemoveListItem = (arrayKey: string, index: number) => {
    const list = [...(form?.pageContent?.[arrayKey] || [])];
    list.splice(index, 1);
    updateNestedContentField(arrayKey, list);
  };

  const handleUpdateListItem = (arrayKey: string, index: number, field: string, value: any) => {
    const list = [...(form?.pageContent?.[arrayKey] || [])];
    list[index] = { ...list[index], [field]: value };
    updateNestedContentField(arrayKey, list);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={onClose} />
      
      {/* Container Drawer Panel */}
      <div 
        data-lenis-prevent
        className="relative flex h-full w-full max-w-3xl flex-col bg-white border-l border-neutral-250 shadow-2xl overflow-y-auto p-6 md:p-8"
      >
        <div className="mb-6 flex items-center justify-between border-b border-neutral-200 pb-4 shrink-0">
          <div>
            <h3 className="text-lg font-extrabold text-neutral-850">
              {isNew ? "Crear" : "Editar"} {type === "services" ? "Servicio" : type === "courses" ? "Curso" : type === "complementarias" ? "Formación Complementaria" : type === "blogs" ? "Artículo" : type === "podcasts" ? "Episodio" : "Elemento"}
            </h3>
            <p className="text-xs text-neutral-500 font-semibold mt-0.5">Complete todos los detalles del contenido editable</p>
          </div>
          <button onClick={onClose} className="rounded-full border border-neutral-300 px-3.5 py-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 transition">
            Cerrar
          </button>
        </div>

        {form && (
          <div className="space-y-6 flex-1 pr-1 text-neutral-800">
            {/* Base Settings */}
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                Identificador (slug) *
                <input
                  disabled={!isNew}
                  value={form.id || ""}
                  onChange={(e) => updateField("id", e.target.value.toLowerCase().replace(/[^a-z0-9-_]/g, ""))}
                  placeholder="ej: pruebas-psicometricas"
                  className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
              </label>

              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                Título del listado *
                <input
                  value={form.title || ""}
                  onChange={(e) => updateField("title", e.target.value)}
                  placeholder="ej: Evaluaciones Psicométricas"
                  className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
              </label>
            </div>

            {/* Description (List card) */}
            {type !== "blogs" && (
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                {type === "podcasts" ? "Descripción del Episodio" : "Descripción en listado de Inicio"}
                <textarea
                  rows={3}
                  value={type === "podcasts" ? (form.description || "") : (form.desc || "")}
                  onChange={(e) => updateField(type === "podcasts" ? "description" : "desc", e.target.value)}
                  placeholder={type === "podcasts" ? "Sinopsis del episodio de podcast..." : "Texto resumido para la tarjeta en la página de inicio..."}
                  className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 resize-y"
                  onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                  onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                />
              </label>
            )}

            {/* Template Selector & Toggle */}
            <div className="grid gap-4 sm:grid-cols-2">
              {type === "services" && (
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Estilo / Plantilla
                  <select
                    value={form.template || "vetting"}
                    onChange={(e) => updateField("template", e.target.value)}
                    className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 outline-none focus:ring-2"
                    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <option value="vetting">Vetting (Con imágenes laterales)</option>
                    <option value="standard">Estándar (Con cuadrícula simple)</option>
                    <option value="poligrafo">Polígrafo (Con contador de estadísticas y FAQs)</option>
                  </select>
                </label>
              )}

              {(type === "courses" || type === "complementarias") && (
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Estilo / Plantilla del Curso
                  <select
                    value={form.template || "standard"}
                    onChange={(e) => {
                      const newTemplate = e.target.value;
                      setForm((prev: any) => {
                        const updated = {
                          ...prev,
                          template: newTemplate
                        };
                        return prepopulateCourseDefaults(updated);
                      });
                    }}
                    className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 outline-none focus:ring-2"
                    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  >
                    <option value="standard">Estándar (Plantilla común)</option>
                    <option value="tecnicas">Técnicas Poligráficas (4 columnas)</option>
                    <option value="basico">Curso Básico (Tabla de contenidos y Ficha)</option>
                    <option value="pretest">Entrevista Pretest (3 ejes + 7 técnicas)</option>
                    <option value="graficas">Calificación de Gráficas (Ejes + Ficha con emojis)</option>
                    <option value="ess-m">Sistema ESS-M (Ejes de Puntuación)</option>
                    <option value="control-calidad">Control de Calidad (12 pilares en lista)</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm("¿Seguro que querés sobreescribir las tarjetas y características con los valores e iconos por defecto de esta plantilla? Se perderán los cambios no guardados en estas secciones.")) {
                        setForm((prev: any) => {
                          const resetObj = {
                            ...prev,
                            pageContent: {
                              ...prev.pageContent,
                              focusAreas: [],
                              svgFocusAreas: [],
                              customCards: [],
                              fichaTecnica: []
                            }
                          };
                          return prepopulateCourseDefaults(resetObj);
                        });
                      }
                    }}
                    className="text-[10px] text-[#700FA3] hover:underline font-semibold text-left block mt-1.5"
                  >
                    Restaurar tarjetas e iconos por defecto de esta plantilla
                  </button>
                </label>
              )}

              <div className="flex items-center justify-between rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3">
                <div>
                  <span className="block text-xs font-bold uppercase tracking-wider text-neutral-600">Publicado</span>
                  <span className="text-[10px] text-neutral-500 font-semibold">Habilitar visibilidad en la web</span>
                </div>
                <button
                  type="button"
                  onClick={() => updateField("published", !form.published)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${form.published ? "bg-green-500" : "bg-neutral-300"}`}
                >
                  <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.published ? "translate-x-5" : "translate-x-0"}`} />
                </button>
              </div>
            </div>

            {/* Cover Image URL & Drag-Drop Uploader */}
            <ImageUploadBox
              label="Imagen representativa (URL de imagen)"
              value={form.image || ""}
              onChange={(val) => updateField("image", val)}
              pathPrefix={type}
            />

            {/* SERVICES FIELDS SECTION */}
            {type === "services" && (
              <div className="border-t border-neutral-200 pt-6 space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                  <h4 className="text-xs font-bold text-[#700FA3] uppercase tracking-wider">Contenido de la Página</h4>
                </div>

                <div className="flex items-center justify-between rounded-xl border border-neutral-300 bg-neutral-50 px-4 py-3">
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-neutral-600">Mostrar "Otras Soluciones"</span>
                    <span className="text-[10px] text-neutral-500 font-semibold">Habilitar la sección de otras soluciones al final de la página</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateNestedContentField("showOtherSolutions", form.pageContent?.showOtherSolutions !== false ? false : true)}
                    className={`relative h-6 w-11 rounded-full transition-colors ${form.pageContent?.showOtherSolutions !== false ? "bg-green-500" : "bg-neutral-300"}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.pageContent?.showOtherSolutions !== false ? "translate-x-5" : "translate-x-0"}`} />
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Título Hero Principal
                    <input
                      value={form.pageContent?.heroTitle || ""}
                      onChange={(e) => updateNestedContentField("heroTitle", e.target.value)}
                      placeholder="ej: Verificación Integral de"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Palabra Subrayada en Hero
                    <input
                      value={form.pageContent?.heroUnderlined || ""}
                      onChange={(e) => updateNestedContentField("heroUnderlined", e.target.value)}
                      placeholder="ej: Candidatos"
                      className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Tagline de Sección Hero
                    <input
                      value={form.pageContent?.heroTagline || ""}
                      onChange={(e) => updateNestedContentField("heroTagline", e.target.value)}
                      placeholder="ej: Transformamos la incertidumbre en decisiones seguras"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <ImageUploadBox
                    label="Imagen de Fondo en Hero (URL)"
                    value={form.pageContent?.heroImage || ""}
                    onChange={(val) => updateNestedContentField("heroImage", val)}
                    pathPrefix={`${type}-hero`}
                  />
                </div>

                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Descripción Hero
                  <textarea
                    rows={3}
                    value={form.pageContent?.heroDesc || ""}
                    onChange={(e) => updateNestedContentField("heroDesc", e.target.value)}
                    placeholder="Descripción larga que aparece en la cabecera de la página..."
                    className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 resize-y"
                    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </label>

                {/* About Section */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Título Sección 'Sobre el Servicio'
                    <input
                      value={form.pageContent?.aboutTitle || ""}
                      onChange={(e) => updateNestedContentField("aboutTitle", e.target.value)}
                      placeholder="ej: ¿Qué analizamos?"
                      className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Subtítulo Sección 'Sobre el Servicio'
                    <input
                      value={form.pageContent?.aboutDesc || ""}
                      onChange={(e) => updateNestedContentField("aboutDesc", e.target.value)}
                      placeholder="ej: Cruzamos información en tiempo real en..."
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <div>
                      <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Soluciones desarrolladas / Ejes de Análisis</span>
                      <span className="text-[10px] text-neutral-500 font-semibold block mt-0.5">Podés subir imágenes/iconos y agregar sub-ítems (uno por línea) para las soluciones.</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddListItem("aboutCards", { title: "", text: "", icon: "", items: [] })}
                      className="rounded-full bg-neutral-50 border border-neutral-300 px-3.5 py-1 text-2xs text-[#700FA3] hover:bg-neutral-100 font-bold"
                    >
                      + Agregar Tarjeta
                    </button>
                  </div>

                  {(!form.pageContent?.aboutCards || form.pageContent.aboutCards.length === 0) ? (
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
                      <p className="text-xs text-neutral-400 italic font-semibold mb-2">No hay tarjetas registradas.</p>
                      {form.id === "prueba-de-honestidad-etica-y-valores" && (
                        <button
                          type="button"
                          onClick={() => {
                            updateNestedContentField("aboutCards", [
                              {
                                title: "Factores de Integridad y Ética Laboral",
                                text: "Nuestra prueba analiza de manera integral la orientación conductual y los valores de los evaluados a través de dimensiones críticas estructuradas en tres grandes ejes de riesgo corporativo.",
                                icon: "/icons/eje1.svg",
                                items: [
                                  "Honestidad: Mide la inclinación natural del evaluado a actuar con transparencia y rectitud. Permite predecir la probabilidad de conductas deshonestas en comparación con perfiles de alta integridad.",
                                  "Moralidad: Evalúa la solidez y firmeza de los valores morales individuales frente a presiones externas, identificando si el perfil es altamente manipulable o propenso a quebrantar sus principios.",
                                  "Honestidad al Responder (Control de Deseabilidad Social): Detecta la consistencia y veracidad de la prueba, identificando si el evaluado intenta manipular el test o simular un perfil \"socialmente aceptable\" para ocultar su verdadera conducta."
                                ]
                              },
                              {
                                title: "Identificación de Comportamientos Riesgosos",
                                text: "Nuestra prueba analiza de manera integral la orientación conductual y los valores de los evaluados a través de dimensiones críticas estructuradas en tres grandes ejes de riesgo corporativo.",
                                icon: "/icons/eje2.svg",
                                items: [
                                  "Propensión al Robo: Analiza los indicadores actitudinales que se correlacionan directamente con un mayor riesgo estadístico de cometer robos o apropiación ilícita de recursos.",
                                  "Tendencia al Abuso o Manipulación: Identifica perfiles con rasgos impulsivos o bajo autocontrol que podrían usar la manipulación para fines personales, afectando el clima laboral o el trato al equipo.",
                                  "Riesgo de Daño y Sabotaje: Mide la capacidad de autorregulación emocional ante la frustración o la rabia, previniendo reacciones negativas que pongan en peligro los activos tangibles o el entorno de la empresa.",
                                  "Conductas de Descuido: Evalúa el nivel de rigurosidad y atención al detalle, detectando la tendencia a normalizar errores o priorizar la velocidad por encima de los estándares de calidad requeridos."
                                ]
                              },
                              {
                                title: "Alineación y Cultura Organizacional",
                                text: "Nuestra prueba analiza de manera integral la orientación conductual y los valores de los evaluados a través de dimensiones críticas estructuradas en tres grandes ejes de riesgo corporativo.",
                                icon: "/icons/eje3.svg",
                                items: [
                                  "Apego a las Reglas: Determina el respeto y la importancia que el evaluado otorga a las normas internas, diferenciando a quienes las consideran directrices obligatorias de aquellos que las ven como simples sugerencias opcionales.",
                                  "Equidad y Justicia: Mide la disposición a actuar de manera imparcial y equitativa con los demás, identificando riesgos de sesgos corporativos, prejuicios o tratos de conveniencia.",
                                  "Trabajo en Equipo: Mide el nivel de adaptabilidad y alineación con los objetivos colectivos, priorizando el éxito del equipo por encima de las metas netamente individuales.",
                                  "Interés por el Trabajo (Compromiso Organizacional): Evalúa el valor que la persona le otorga al esfuerzo laboral y su nivel de enfoque para alcanzar las metas estratégicas de la empresa.",
                                  "Interés Egocéntrico: Identifica el grado de focalización exclusiva en el beneficio propio, determinando si esta tendencia puede llegar a desmedro o perjuicio de sus compañeros o de la organización."
                                ]
                              }
                            ]);
                          }}
                          className="rounded-lg bg-neutral-200 border border-neutral-300 px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-250 font-semibold"
                        >
                          Cargar ejes por defecto
                        </button>
                      )}
                      {form.id === "pruebas-poligraficas" && (
                        <button
                          type="button"
                          onClick={() => {
                            updateNestedContentField("aboutCards", [
                              {
                                title: "Polígrafo Específico",
                                text: "Utilizada en procesos investigativos. Esclarezca incidentes internos, pérdidas, robos, asaltos, fuga de información con absoluta objetividad.",
                                icon: "",
                                items: []
                              },
                              {
                                title: "Polígrafo Pre-empleo",
                                text: "Identifica conductas contraproducentes y vulnerabilidades en los candidatos antes de su contratación, permitiéndole mitigar riesgos.",
                                icon: "",
                                items: []
                              },
                              {
                                title: "Polígrafo de Rutina",
                                text: "Monitoreo preventivo para personal que labora en la empresa. Fortalece la lealtad y disuade conductas irregulares internas.",
                                icon: "",
                                items: []
                              }
                            ]);
                          }}
                          className="rounded-lg bg-neutral-200 border border-neutral-300 px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-250 font-semibold"
                        >
                          Cargar tarjetas por defecto
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {form.pageContent.aboutCards.map((card: any, idx: number) => (
                        <div key={idx} className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-4 flex gap-3 flex-col">
                          <div className="flex gap-3 items-center flex-wrap">
                            <div className="h-10 w-10 shrink-0 rounded border border-neutral-200 bg-white flex items-center justify-center overflow-hidden shadow-2xs">
                              {card.icon && (card.icon.startsWith("/") || card.icon.startsWith("http")) ? (
                                <img src={card.icon} alt="Icono" className="h-full w-full object-contain p-0.5" />
                              ) : form.id === "prueba-de-honestidad-etica-y-valores" ? (
                                <img src={`/icons/eje${(idx % 3) + 1}.svg`} alt="Por defecto" className="h-full w-full object-contain p-0.5 opacity-60" />
                              ) : (
                                <span className="text-[10px] text-neutral-400 font-bold">Img</span>
                              )}
                            </div>
                            <input
                              value={card.icon || ""}
                              onChange={(e) => handleUpdateListItem("aboutCards", idx, "icon", e.target.value)}
                              placeholder="Icono (Emoji o URL)"
                              className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 w-48 outline-none font-bold"
                            />
                            <input
                              type="file"
                              id={`file-about-card-${idx}`}
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const files = e.target.files;
                                if (!files || files.length === 0) return;
                                try {
                                  const url = await compressAndUploadImage(files[0], "service-icons");
                                  handleUpdateListItem("aboutCards", idx, "icon", url);
                                } catch (err) {
                                  console.error("Error upload:", err);
                                  alert("Error al subir la imagen");
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById(`file-about-card-${idx}`)?.click()}
                              className="rounded border border-neutral-300 bg-white px-2.5 py-1 text-2xs font-bold text-neutral-700 hover:bg-neutral-50 transition shrink-0"
                            >
                              Subir foto
                            </button>
                            
                            <input
                              value={card.title || ""}
                              onChange={(e) => handleUpdateListItem("aboutCards", idx, "title", e.target.value)}
                              placeholder="Título del Eje"
                              className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-1 min-w-[150px] outline-none font-bold"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveListItem("aboutCards", idx)}
                              className="text-red-600 hover:text-red-500 text-xs font-bold"
                            >
                              Eliminar
                            </button>
                          </div>

                          <textarea
                            rows={2}
                            value={card.text || ""}
                            onChange={(e) => handleUpdateListItem("aboutCards", idx, "text", e.target.value)}
                            placeholder="Descripción corta o introducción..."
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 outline-none resize-y"
                          />

                          <textarea
                            rows={4}
                            value={card.items ? card.items.join('\n') : ""}
                            onChange={(e) => handleUpdateListItem("aboutCards", idx, "items", e.target.value.split('\n'))}
                            placeholder="Sub-ítems (uno por línea, ej: Honestidad: Mide la inclinación...)"
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 outline-none resize-y"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Why Section */}
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Título Sección 'Por qué / Beneficios'
                  <input
                    value={form.pageContent?.whyTitle || ""}
                    onChange={(e) => updateNestedContentField("whyTitle", e.target.value)}
                    placeholder="ej: El Valor para su Empresa"
                    className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </label>

                {/* Why Points Builder */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Puntos o Beneficios</span>
                    <button
                      type="button"
                      onClick={() => handleAddListItem("whyPoints", { title: "", text: "" })}
                      className="rounded-full bg-neutral-50 border border-neutral-300 px-3.5 py-1 text-2xs text-[#700FA3] hover:bg-neutral-100 font-bold"
                    >
                      + Agregar Beneficio
                    </button>
                  </div>

                  {(!form.pageContent?.whyPoints || form.pageContent.whyPoints.length === 0) ? (
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
                      <p className="text-xs text-neutral-400 italic font-semibold mb-2">No hay beneficios registrados.</p>
                      {form.id === "pruebas-poligraficas" && (
                        <button
                          type="button"
                          onClick={() => {
                            updateNestedContentField("whyPoints", [
                              {
                                title: "Reducción de Riesgos",
                                text: "Te ayudamos a eliminar riesgos críticos en tus nuevas contrataciones."
                              },
                              {
                                title: "Certeza Técnica",
                                text: "Identificamos responsables de fraudes con certeza técnica de nivel forense."
                              },
                              {
                                title: "Rapidez",
                                text: "Entrega de resultados preliminares en 4 horas y reportes técnicos en 24 horas."
                              },
                              {
                                title: "Disuasión",
                                text: "Detectamos la deshonestidad interna y prevenimos pérdidas de activos."
                              }
                            ]);
                          }}
                          className="rounded-lg bg-neutral-200 border border-neutral-300 px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-250 font-semibold"
                        >
                          Cargar beneficios por defecto
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {form.pageContent.whyPoints.map((point: any, idx: number) => (
                        <div key={idx} className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex gap-3 flex-col sm:flex-row">
                          <input
                            value={point.title || ""}
                            onChange={(e) => handleUpdateListItem("whyPoints", idx, "title", e.target.value)}
                            placeholder="Ej: Reducción de Riesgos"
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-1 outline-none font-bold"
                          />
                          <input
                            value={point.text || ""}
                            onChange={(e) => handleUpdateListItem("whyPoints", idx, "text", e.target.value)}
                            placeholder="Detalle largo del beneficio..."
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-[2] outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveListItem("whyPoints", idx)}
                            className="text-red-600 hover:text-red-500 text-xs shrink-0 self-center font-bold"
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Why Images */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <ImageUploadBox
                    label="Imagen Beneficios 1 (URL)"
                    value={form.pageContent?.whyImage1 || ""}
                    onChange={(val) => updateNestedContentField("whyImage1", val)}
                    pathPrefix={`${type}-why`}
                  />
                  <ImageUploadBox
                    label="Imagen Beneficios 2 (URL)"
                    value={form.pageContent?.whyImage2 || ""}
                    onChange={(val) => updateNestedContentField("whyImage2", val)}
                    pathPrefix={`${type}-why`}
                  />
                </div>

                {/* FAQs Builder */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-4">
                      <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Preguntas Frecuentes (FAQs)</span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xs font-semibold text-neutral-500">Mostrar Sección:</span>
                        <button
                          type="button"
                          onClick={() => {
                            const currentVal = form.pageContent?.showFaqs !== false;
                            updateNestedContentField("showFaqs", !currentVal);
                          }}
                          className={`relative h-5 w-9 rounded-full transition-colors shrink-0 ${
                            form.pageContent?.showFaqs !== false ? "bg-green-500" : "bg-neutral-300"
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform ${
                              form.pageContent?.showFaqs !== false ? "translate-x-4" : "translate-x-0"
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleAddListItem("faqs", { q: "", a: "" })}
                      className="rounded-full bg-neutral-50 border border-neutral-300 px-3.5 py-1 text-2xs text-[#700FA3] hover:bg-neutral-100 font-bold"
                    >
                      + Agregar FAQ
                    </button>
                  </div>

                  {(!form.pageContent?.faqs || form.pageContent.faqs.length === 0) ? (
                    <p className="text-xs text-neutral-400 italic font-semibold">No hay preguntas frecuentes registradas. (Se mostrarán las por defecto si la plantilla lo requiere)</p>
                  ) : (
                    <div className="space-y-3">
                      {form.pageContent.faqs.map((faq: any, idx: number) => (
                        <div key={idx} className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex gap-3 flex-col">
                          <div className="flex gap-3 items-center">
                            <input
                              value={faq.q || ""}
                              onChange={(e) => handleUpdateListItem("faqs", idx, "q", e.target.value)}
                              placeholder="Pregunta"
                              className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-1 outline-none font-bold"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveListItem("faqs", idx)}
                              className="text-red-600 hover:text-red-500 text-xs font-bold"
                            >
                              Eliminar
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={faq.a || ""}
                            onChange={(e) => handleUpdateListItem("faqs", idx, "a", e.target.value)}
                            placeholder="Respuesta..."
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 outline-none resize-y"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Ficha Técnica Section (Only for Prueba de Honestidad, Ética y Valores) */}
                {form.id === "prueba-de-honestidad-etica-y-valores" && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                      <div>
                        <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Ficha Técnica / Características</span>
                        <span className="text-[10px] text-neutral-500 font-semibold block mt-0.5">Podés agregar emojis en el título (ej: 📊 Volumen de Evaluación) para mantener el estilo original.</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleAddListItem("fichaTecnica", { title: "", description: "" })}
                        className="rounded-full bg-neutral-50 border border-neutral-300 px-3.5 py-1 text-2xs text-[#700FA3] hover:bg-neutral-100 font-bold"
                      >
                        + Agregar Característica
                      </button>
                    </div>

                    {(!form.pageContent?.fichaTecnica || form.pageContent.fichaTecnica.length === 0) ? (
                      <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 text-center">
                        <p className="text-xs text-neutral-400 italic font-semibold mb-2">No hay características registradas. Se usarán las por defecto.</p>
                        <button
                          type="button"
                          onClick={() => {
                            updateNestedContentField("fichaTecnica", [
                              { title: "📊 Volumen de Evaluación", description: "90 reactivos dinámicos y validados psicométricamente." },
                              { title: "💻 Modalidad de Aplicación", description: "Formato flexible: 100% online." },
                              { title: "📄 Entrega de Resultados", description: "Reportes analíticos disponibles de forma inmediata tras finalizar la prueba." },
                              { title: "🔬 Metodología", description: "Indicador referencial de alta precisión para complementar filtros de seguridad y selección." }
                            ]);
                          }}
                          className="rounded-lg bg-neutral-200 border border-neutral-300 px-3 py-1.5 text-xs text-neutral-700 hover:bg-neutral-250 font-semibold"
                        >
                          Cargar valores por defecto
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {form.pageContent.fichaTecnica.map((feat: any, idx: number) => (
                          <div key={idx} className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex gap-3 flex-col">
                            <div className="flex gap-3 items-center">
                              <input
                                value={feat.title || ""}
                                onChange={(e) => handleUpdateListItem("fichaTecnica", idx, "title", e.target.value)}
                                placeholder="Título (ej: 📊 Volumen de Evaluación)"
                                className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-1 outline-none font-bold"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemoveListItem("fichaTecnica", idx)}
                                className="text-red-600 hover:text-red-500 text-xs font-bold"
                              >
                                Eliminar
                              </button>
                            </div>
                            <textarea
                              rows={2}
                              value={feat.description || ""}
                              onChange={(e) => handleUpdateListItem("fichaTecnica", idx, "description", e.target.value)}
                              placeholder="Especificación o descripción..."
                              className="bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 outline-none resize-y"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Contacts */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Teléfono de Contacto
                    <input
                      value={form.pageContent?.contactPhone || ""}
                      onChange={(e) => updateNestedContentField("contactPhone", e.target.value)}
                      placeholder="ej: 0981296179"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    WhatsApp URL
                    <input
                      value={form.pageContent?.contactWhatsapp || ""}
                      onChange={(e) => updateNestedContentField("contactWhatsapp", e.target.value)}
                      placeholder="Enlace API de WhatsApp..."
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* COURSES FIELDS SECTION */}
            {(type === "courses" || type === "complementarias") && (
              <div className="border-t border-neutral-200 pt-6 space-y-6">
                <h4 className="text-xs font-bold text-[#700FA3] uppercase tracking-wider">Contenido de la Página</h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Título de Cabecera Hero
                    <input
                      value={form.pageContent?.heroTitle || ""}
                      onChange={(e) => updateNestedContentField("heroTitle", e.target.value)}
                      placeholder="ej: Curso Avanzado: Entrevista Pretest"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Tagline de Cabecera
                    <input
                      value={form.pageContent?.heroTagline || ""}
                      onChange={(e) => updateNestedContentField("heroTagline", e.target.value)}
                      placeholder="ej: Especialización avanzada..."
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <ImageUploadBox
                    label="Imagen Hero Curso (URL)"
                    value={form.pageContent?.heroImage || ""}
                    onChange={(val) => updateNestedContentField("heroImage", val)}
                    pathPrefix={`${type}-hero`}
                  />

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Título Sección Ejes
                    <input
                      value={form.pageContent?.aboutTitle || ""}
                      onChange={(e) => updateNestedContentField("aboutTitle", e.target.value)}
                      placeholder="ej: Ejes Temáticos:"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>

                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Descripción Hero
                  <textarea
                    rows={3}
                    value={form.pageContent?.heroDesc || ""}
                    onChange={(e) => updateNestedContentField("heroDesc", e.target.value)}
                    placeholder="Descripción introductoria del curso..."
                    className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 resize-y"
                    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </label>

                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                  Descripción de los Ejes Temáticos
                  <textarea
                    rows={2}
                    value={form.pageContent?.aboutDesc || ""}
                    onChange={(e) => updateNestedContentField("aboutDesc", e.target.value)}
                    placeholder="Subtítulo de ejes..."
                    className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 resize-y"
                    onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                    onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                  />
                </label>

                {/* Focus Areas (Ejes) Builder */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Ejes Temáticos</span>
                    <button
                      type="button"
                      onClick={() => handleAddListItem("focusAreas", { title: "", description: "" })}
                      className="rounded-full bg-neutral-50 border border-neutral-300 px-3.5 py-1 text-2xs text-[#700FA3] hover:bg-neutral-100 font-bold"
                    >
                      + Agregar Eje
                    </button>
                  </div>

                  {(!form.pageContent?.focusAreas || form.pageContent.focusAreas.length === 0) ? (
                    <p className="text-xs text-neutral-400 italic font-semibold">No hay ejes temáticos registrados.</p>
                  ) : (
                    <div className="space-y-3">
                      {form.pageContent.focusAreas.map((area: any, idx: number) => (
                        <div key={idx} className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex gap-3 flex-col">
                          <div className="flex gap-3 items-center">
                            <input
                              value={area.title || ""}
                              onChange={(e) => handleUpdateListItem("focusAreas", idx, "title", e.target.value)}
                              placeholder="Título del eje"
                              className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-1 outline-none font-bold"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveListItem("focusAreas", idx)}
                              className="text-red-600 hover:text-red-500 text-xs font-bold"
                            >
                              Eliminar
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={area.description || ""}
                            onChange={(e) => handleUpdateListItem("focusAreas", idx, "description", e.target.value)}
                            placeholder="Descripción o detalle del eje..."
                            className="bg-white border border-neutral-355 rounded px-2.5 py-1.5 text-xs text-neutral-805 placeholder-neutral-400 outline-none resize-y"
                          />
                          <textarea
                            rows={3}
                            value={area.items ? area.items.join('\n') : ""}
                            onChange={(e) => handleUpdateListItem("focusAreas", idx, "items", e.target.value.split('\n'))}
                            placeholder="Lista de items (uno por línea)..."
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-850 placeholder-neutral-400 outline-none resize-y"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* SVG Focus Areas Builder */}
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Ejes (Con Icono Especial)</span>
                    <button
                      type="button"
                      onClick={() => handleAddListItem("svgFocusAreas", { title: "", description: "", icon: "", iconViewBox: "", iconPaths: [] })}
                      className="rounded-full bg-neutral-50 border border-neutral-300 px-3.5 py-1 text-2xs text-[#700FA3] hover:bg-neutral-100 font-bold"
                    >
                      + Agregar Eje Especial
                    </button>
                  </div>

                  {(!form.pageContent?.svgFocusAreas || form.pageContent.svgFocusAreas.length === 0) ? (
                    <p className="text-xs text-neutral-400 italic font-semibold">No hay ejes especiales registrados.</p>
                  ) : (
                    <div className="space-y-3">
                      {form.pageContent.svgFocusAreas.map((area: any, idx: number) => (
                        <div key={idx} className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex gap-3 flex-col">
                          <div className="flex gap-3 items-center">
                            <input
                              value={area.title || ""}
                              onChange={(e) => handleUpdateListItem("svgFocusAreas", idx, "title", e.target.value)}
                              placeholder="Título del eje especial"
                              className="bg-white border border-neutral-350 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-1 outline-none font-bold"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveListItem("svgFocusAreas", idx)}
                              className="text-red-600 hover:text-red-500 text-xs font-bold"
                            >
                              Eliminar
                            </button>
                          </div>

                          <div className="flex gap-3 items-center flex-wrap">
                            <div className="h-10 w-10 shrink-0 rounded border border-neutral-200 bg-white flex items-center justify-center overflow-hidden shadow-2xs">
                              {area.icon && (area.icon.startsWith("/") || area.icon.startsWith("http")) ? (
                                <img src={area.icon} alt="Icono" className="h-full w-full object-contain p-0.5" />
                              ) : (
                                <span className="text-[10px] text-neutral-400 font-bold">Img</span>
                              )}
                            </div>
                            <input
                              value={area.icon || ""}
                              onChange={(e) => handleUpdateListItem("svgFocusAreas", idx, "icon", e.target.value)}
                              placeholder="Icono (Emoji, URL, o nombre de Phosphor)"
                              className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 w-64 outline-none font-semibold text-neutral-700"
                            />
                            <input
                              type="file"
                              id={`file-svg-area-${idx}`}
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const files = e.target.files;
                                if (!files || files.length === 0) return;
                                try {
                                  const url = await compressAndUploadImage(files[0], "area-icons");
                                  handleUpdateListItem("svgFocusAreas", idx, "icon", url);
                                } catch (err) {
                                  console.error("Error upload:", err);
                                  alert("Error al subir la imagen");
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById(`file-svg-area-${idx}`)?.click()}
                              className="rounded border border-neutral-300 bg-white px-2.5 py-1 text-2xs font-bold text-neutral-700 hover:bg-neutral-50 transition shrink-0"
                            >
                              Subir foto
                            </button>
                          </div>

                          <div className="grid gap-2 sm:grid-cols-2">
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                              SVG ViewBox (opcional para pretest/graficas)
                              <input
                                value={area.iconViewBox || ""}
                                onChange={(e) => handleUpdateListItem("svgFocusAreas", idx, "iconViewBox", e.target.value)}
                                placeholder="ej: 0 0 84 84"
                                className="mt-1 w-full bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 outline-none"
                              />
                            </label>
                            <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                              SVG Paths (una por línea, opcional)
                              <textarea
                                rows={1}
                                value={area.iconPaths ? area.iconPaths.join('\n') : ""}
                                onChange={(e) => handleUpdateListItem("svgFocusAreas", idx, "iconPaths", e.target.value.split('\n'))}
                                placeholder="M27.648 39.7c0..."
                                className="mt-1 w-full bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 outline-none resize-y"
                              />
                            </label>
                          </div>

                          <textarea
                            rows={2}
                            value={area.description || ""}
                            onChange={(e) => handleUpdateListItem("svgFocusAreas", idx, "description", e.target.value)}
                            placeholder="Detalle o temario del eje especial..."
                            className="bg-white border border-neutral-355 rounded px-2.5 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 outline-none resize-y"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Custom Cards Builder */}
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Tarjetas Personalizadas</span>
                    <button
                      type="button"
                      onClick={() => handleAddListItem("customCards", { title: "", description: "", icon: "", items: [] })}
                      className="rounded-full bg-neutral-50 border border-neutral-300 px-3.5 py-1 text-2xs text-[#700FA3] hover:bg-neutral-100 font-bold"
                    >
                      + Agregar Tarjeta
                    </button>
                  </div>

                  {(!form.pageContent?.customCards || form.pageContent.customCards.length === 0) ? (
                    <p className="text-xs text-neutral-400 italic font-semibold">No hay tarjetas personalizadas registradas.</p>
                  ) : (
                    <div className="space-y-3">
                      {form.pageContent.customCards.map((card: any, idx: number) => (
                        <div key={idx} className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex gap-3 flex-col">
                          <div className="flex gap-3 items-center flex-wrap">
                            <div className="h-10 w-10 shrink-0 rounded border border-neutral-200 bg-white flex items-center justify-center overflow-hidden shadow-2xs">
                              {card.icon && (card.icon.startsWith("/") || card.icon.startsWith("http")) ? (
                                <img src={card.icon} alt="Icono" className="h-full w-full object-contain p-0.5" />
                              ) : (
                                <span className="text-[10px] text-neutral-400 font-bold">Img</span>
                              )}
                            </div>
                            <input
                              value={card.icon || ""}
                              onChange={(e) => handleUpdateListItem("customCards", idx, "icon", e.target.value)}
                              placeholder="Icono (Emoji o URL)"
                              className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 w-48 outline-none font-bold"
                            />
                            <input
                              type="file"
                              id={`file-custom-card-${idx}`}
                              accept="image/*"
                              className="hidden"
                              onChange={async (e) => {
                                const files = e.target.files;
                                if (!files || files.length === 0) return;
                                try {
                                  const url = await compressAndUploadImage(files[0], "card-icons");
                                  handleUpdateListItem("customCards", idx, "icon", url);
                                } catch (err) {
                                  console.error("Error upload:", err);
                                  alert("Error al subir la imagen");
                                }
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => document.getElementById(`file-custom-card-${idx}`)?.click()}
                              className="rounded border border-neutral-300 bg-white px-2.5 py-1 text-2xs font-bold text-neutral-700 hover:bg-neutral-50 transition shrink-0"
                            >
                              Subir foto
                            </button>
                            
                            <input
                              value={card.title || ""}
                              onChange={(e) => handleUpdateListItem("customCards", idx, "title", e.target.value)}
                              placeholder="Título"
                              className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-1 min-w-[150px] outline-none font-bold"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveListItem("customCards", idx)}
                              className="text-red-600 hover:text-red-500 text-xs font-bold"
                            >
                              Eliminar
                            </button>
                          </div>
                          <textarea
                            rows={2}
                            value={card.description || ""}
                            onChange={(e) => handleUpdateListItem("customCards", idx, "description", e.target.value)}
                            placeholder="Descripción (opcional)..."
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 outline-none resize-y"
                          />
                          <textarea
                            rows={3}
                            value={card.items ? card.items.join('\n') : ""}
                            onChange={(e) => handleUpdateListItem("customCards", idx, "items", e.target.value.split('\n'))}
                            placeholder="Lista de items (uno por línea)..."
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 outline-none resize-y"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Ficha Tecnica Builder */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">Ficha Técnica / Características</span>
                    <button
                      type="button"
                      onClick={() => handleAddListItem("fichaTecnica", { title: "", description: "" })}
                      className="rounded-full bg-neutral-50 border border-neutral-300 px-3.5 py-1 text-2xs text-[#700FA3] hover:bg-neutral-100 font-bold"
                    >
                      + Agregar Ficha
                    </button>
                  </div>

                  {(!form.pageContent?.fichaTecnica || form.pageContent.fichaTecnica.length === 0) ? (
                    <p className="text-xs text-neutral-400 italic font-semibold">No hay características de ficha técnica registradas.</p>
                  ) : (
                    <div className="space-y-3">
                      {form.pageContent.fichaTecnica.map((feat: any, idx: number) => (
                        <div key={idx} className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex gap-3 flex-col sm:flex-row">
                          <input
                            value={feat.title || ""}
                            onChange={(e) => handleUpdateListItem("fichaTecnica", idx, "title", e.target.value)}
                            placeholder="Ej: ⏱️ 15 horas de duración"
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-1 outline-none font-bold"
                          />
                          <input
                            value={feat.description || ""}
                            onChange={(e) => handleUpdateListItem("fichaTecnica", idx, "description", e.target.value)}
                            placeholder="Detalle (ej: Formación intensiva)"
                            className="bg-white border border-neutral-300 rounded px-2.5 py-1 text-xs text-neutral-800 placeholder-neutral-400 flex-[2] outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveListItem("fichaTecnica", idx)}
                            className="text-red-600 hover:text-red-500 text-xs shrink-0 self-center font-bold"
                          >
                            Eliminar
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Contact phone/whatsapp */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Teléfono Contacto Curso
                    <input
                      value={form.pageContent?.contactPhone || ""}
                      onChange={(e) => updateNestedContentField("contactPhone", e.target.value)}
                      placeholder="ej: 099371290"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Enlace WhatsApp Curso
                    <input
                      value={form.pageContent?.contactWhatsapp || ""}
                      onChange={(e) => updateNestedContentField("contactWhatsapp", e.target.value)}
                      placeholder="Enlace completo..."
                      className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* BLOGS FIELDS SECTION */}
            {type === "blogs" && (
              <div className="border-t border-neutral-200 pt-6 space-y-6">
                <h4 className="text-xs font-bold text-[#700FA3] uppercase tracking-wider">Contenido del Artículo</h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Fecha de Publicación
                    <input
                      value={form.publishDate || ""}
                      onChange={(e) => updateField("publishDate", e.target.value)}
                      placeholder="ej: 15 de Noviembre, 2024"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Tiempo de Lectura
                    <input
                      value={form.readTime || ""}
                      onChange={(e) => updateField("readTime", e.target.value)}
                      placeholder="ej: 5 min de lectura"
                      className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <div>
                      <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider font-semibold">Secciones / Bloques de Contenido</span>
                      <span className="text-[10px] text-neutral-500 font-semibold block mt-0.5">Editá las secciones de forma estructurada. Podes reordenar, agregar y eliminar bloques.</span>
                    </div>
                  </div>

                  {blogBlocks.length === 0 ? (
                    <p className="text-xs text-neutral-400 italic font-semibold">No hay bloques de contenido creados.</p>
                  ) : (
                    <div className="space-y-4">
                      {blogBlocks.map((block, idx) => (
                        <div key={idx} className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-4 flex gap-3 flex-col">
                          {/* Block Header Controls */}
                          <div className="flex items-center justify-between border-b border-neutral-150 pb-2 flex-wrap gap-2">
                            <div className="flex items-center gap-2">
                              <span className="text-2xs font-extrabold px-2 py-0.5 rounded bg-[#700FA3]/10 text-[#700FA3] uppercase">
                                {idx + 1}. {block.type === "h2" ? "Subtítulo H2" : block.type === "h3" ? "Subtítulo H3" : block.type === "p" ? "Párrafo" : block.type === "ul" ? "Lista Viñetas" : "Checklist"}
                              </span>
                              <select
                                value={block.type}
                                onChange={(e) => handleUpdateBlock(idx, "type", e.target.value)}
                                className="bg-white border border-neutral-300 rounded px-1.5 py-0.5 text-2xs text-neutral-700 font-semibold outline-none"
                              >
                                <option value="p">Párrafo</option>
                                <option value="h2">Subtítulo Principal (H2)</option>
                                <option value="h3">Subtítulo Secundario (H3)</option>
                                <option value="ul">Lista con Viñetas</option>
                                <option value="ul-none">Checklist (Guía)</option>
                              </select>
                            </div>

                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                disabled={idx === 0}
                                onClick={() => handleMoveBlock(idx, "up")}
                                className="rounded border border-neutral-200 bg-white p-1 text-2xs font-bold text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-white transition"
                                title="Mover arriba"
                              >
                                ▲
                              </button>
                              <button
                                type="button"
                                disabled={idx === blogBlocks.length - 1}
                                onClick={() => handleMoveBlock(idx, "down")}
                                className="rounded border border-neutral-200 bg-white p-1 text-2xs font-bold text-neutral-700 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-white transition"
                                title="Mover abajo"
                              >
                                ▼
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRemoveBlock(idx)}
                                className="rounded border border-red-200 bg-white px-2 py-1 text-2xs font-bold text-red-700 hover:bg-red-50 transition"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>

                          {/* Block Content Inputs */}
                          {block.type.startsWith("ul") ? (
                            <textarea
                              rows={4}
                              value={block.items ? block.items.join("\n") : ""}
                              onChange={(e) => handleUpdateBlock(idx, "items", e.target.value.split("\n"))}
                              placeholder="Escribe cada elemento de la lista en una nueva línea..."
                              className="bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none resize-y leading-relaxed font-sans"
                            />
                          ) : (
                            <textarea
                              rows={block.type === "p" ? 4 : 2}
                              value={block.text || ""}
                              onChange={(e) => handleUpdateBlock(idx, "text", e.target.value)}
                              placeholder={block.type === "p" ? "Escribe el contenido del párrafo..." : "Escribe el texto del subtítulo..."}
                              className="bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none resize-y leading-relaxed font-sans"
                            />
                          )}

                          {/* Read-only preview of original SVG if present */}
                          {block.type === "h3" && block.svg && (
                            <div className="flex items-center gap-2 mt-1 bg-neutral-100 border border-neutral-200 rounded px-2.5 py-1 text-2xs text-neutral-500 font-semibold">
                              <span>Icono SVG asociado:</span>
                              <div className="h-5 w-5 bg-white border border-neutral-200 rounded flex items-center justify-center p-0.5" dangerouslySetInnerHTML={{ __html: block.svg }} />
                              <span className="italic text-neutral-400">(Código SVG conservado automáticamente)</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Block Row */}
                  <div className="flex flex-wrap items-center gap-2 border-t border-neutral-150 pt-4">
                    <span className="text-2xs font-bold uppercase tracking-wider text-neutral-500">Agregar Bloque:</span>
                    <button
                      type="button"
                      onClick={() => handleAddBlock("p")}
                      className="rounded-full bg-white border border-neutral-300 px-3.5 py-1 text-2xs font-bold text-[#700FA3] hover:bg-neutral-50 transition"
                    >
                      + Párrafo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock("h2")}
                      className="rounded-full bg-white border border-neutral-300 px-3.5 py-1 text-2xs font-bold text-[#700FA3] hover:bg-neutral-50 transition"
                    >
                      + Subtítulo H2
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock("h3")}
                      className="rounded-full bg-white border border-neutral-300 px-3.5 py-1 text-2xs font-bold text-[#700FA3] hover:bg-neutral-50 transition"
                    >
                      + Subtítulo H3
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock("ul")}
                      className="rounded-full bg-white border border-neutral-300 px-3.5 py-1 text-2xs font-bold text-[#700FA3] hover:bg-neutral-50 transition"
                    >
                      + Lista Viñetas
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock("ul-none")}
                      className="rounded-full bg-white border border-neutral-300 px-3.5 py-1 text-2xs font-bold text-[#700FA3] hover:bg-neutral-50 transition"
                    >
                      + Checklist
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* PODCASTS FIELDS SECTION */}
            {type === "podcasts" && (
              <div className="border-t border-neutral-200 pt-6 space-y-6">
                <h4 className="text-xs font-bold text-[#700FA3] uppercase tracking-wider">Detalles del Episodio</h4>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Duración (ej: "32 min")
                    <input
                      value={form.duration || ""}
                      onChange={(e) => updateField("duration", e.target.value)}
                      placeholder="ej: 30 min"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Tema / Categoría (ej: "Negocios")
                    <input
                      value={form.topic || ""}
                      onChange={(e) => updateField("topic", e.target.value)}
                      placeholder="ej: RRHH"
                      className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Fecha de Publicación (ej: "15 de Junio, 2024")
                    <input
                      value={form.date || ""}
                      onChange={(e) => updateField("date", e.target.value)}
                      placeholder="ej: 15 de Junio, 2024"
                      className="mt-1.5 w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>

                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
                    Enlace de Audio / Spotify
                    <input
                      value={form.audioUrl || ""}
                      onChange={(e) => updateField("audioUrl", e.target.value)}
                      placeholder="https://open.spotify.com/..."
                      className="mt-1.5 w-full bg-white border border-neutral-355 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
                      onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
                      onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
                    />
                  </label>
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex justify-end gap-3 pt-6 border-t border-neutral-200 shrink-0">
              <button onClick={onClose} className="rounded-full border border-neutral-300 px-5 py-2.5 text-xs font-bold text-neutral-650 hover:text-neutral-800 hover:bg-neutral-50 transition">
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (type === "blogs") {
                    const html = serializeBlogContent(blogBlocks);
                    onSave({ ...form, content: html });
                  } else {
                    onSave(form);
                  }
                }}
                className="rounded-full px-6 py-2.5 text-xs font-bold text-white transition-all shadow-md"
                style={{ backgroundColor: "#700FA3" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#5C0B87")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.backgroundColor = "#700FA3")}
              >
                Guardar cambios
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* --- helper function to compress and upload image to Supabase Storage --- */
const compressAndUploadImage = async (file: File, pathPrefix: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;
        
        // Downscale large files client side to reduce server optimization loads
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        if (width > MAX_WIDTH || height > MAX_HEIGHT) {
          if (width > height) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          } else {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("No se pudo obtener el contexto 2D del lienzo."));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        
        // Export to WebP and compress with 75% quality
        canvas.toBlob(
          async (blob) => {
            if (!blob) {
              reject(new Error("No se pudo generar el Blob WebP."));
              return;
            }
            
            try {
              const filename = file.name.replace(/\.[^/.]+$/, ""); // remove extension
              const safeName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-").slice(0, 30);
              const rand = Math.random().toString(36).substring(2, 8);
              const filePath = `${pathPrefix}/${Date.now()}-${safeName}-${rand}.webp`;
              
              const { error: uploadError } = await supabase.storage
                .from("imagenes")
                .upload(filePath, blob, {
                  contentType: "image/webp",
                  cacheControl: "3600",
                  upsert: false
                });
                
              if (uploadError) {
                reject(uploadError);
                return;
              }
              
              const { data } = supabase.storage
                .from("imagenes")
                .getPublicUrl(filePath);
                
              resolve(data.publicUrl);
            } catch (err) {
              reject(err);
            }
          },
          "image/webp",
          0.75
        );
      };
      img.onerror = () => reject(new Error("Error al cargar la imagen."));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error("Error al leer el archivo."));
    reader.readAsDataURL(file);
  });
};

/* --- Dashed File Uploader Box Component --- */
function ImageUploadBox({
  label,
  value,
  onChange,
  pathPrefix = "images"
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  pathPrefix?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    await processUpload(files[0]);
  };

  const processUpload = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("El archivo seleccionado debe ser una imagen válida.");
      return;
    }
    setUploading(true);
    setError(null);
    try {
      const url = await compressAndUploadImage(file, pathPrefix);
      onChange(url);
    } catch (err: any) {
      console.error("Image upload failed:", err);
      setError(err.message || "Error al subir e integrar la imagen.");
    } finally {
      setUploading(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      await processUpload(files[0]);
    }
  };

  return (
    <div className="space-y-1.5 w-full">
      <div className="flex justify-between items-baseline">
        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-600">
          {label}
        </label>
        {value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-[10px] font-bold text-red-600 hover:underline"
          >
            Quitar
          </button>
        )}
      </div>

      {/* Input URL */}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="ej: /servicios/2.webp o pegar URL absoluta"
        className="w-full bg-white border border-neutral-350 rounded-lg px-3 py-2 text-xs text-neutral-800 placeholder-neutral-400 outline-none focus:ring-2 font-mono"
        onFocus={(e) => (e.currentTarget.style.boxShadow = `0 0 0 2px #700FA322`)}
        onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
      />

      {/* Dashed Drag/Upload Box */}
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-neutral-350 bg-neutral-50 px-4 py-5 hover:bg-neutral-100 hover:border-neutral-400 transition cursor-pointer group"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {uploading ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-neutral-400 border-l-transparent" />
            <span className="text-xs font-semibold text-neutral-500">Comprimiendo y subiendo...</span>
          </div>
        ) : value ? (
          <div className="flex flex-col items-center gap-1.5">
            <img src={value} alt="Previsualización" className="max-h-20 max-w-[200px] object-contain rounded border border-neutral-200 shadow-sm" onError={(e) => { e.currentTarget.style.display = "none"; }} />
            <span className="text-[10px] font-bold text-neutral-400 group-hover:text-neutral-600">Hacé clic para reemplazar la imagen</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <svg
              className="mx-auto h-7 w-7 text-neutral-400 group-hover:text-neutral-500 transition-colors"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-xs font-semibold text-neutral-500 group-hover:text-neutral-700">
              Subir desde tu computadora
            </span>
          </div>
        )}
      </div>
      {error && <p className="text-[10px] font-bold text-red-650">{error}</p>}
    </div>
  );
}

/* Deletion Confirmation Modal Dialog */
function ConfirmDialog({
  title,
  text,
  confirmLabel = "Confirmar",
  onCancel,
  onConfirm
}: {
  title: string;
  text: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4 backdrop-blur-xs">
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-2xl">
        <h4 className="text-base font-extrabold text-neutral-800">{title}</h4>
        <p className="mt-2 text-xs text-neutral-600 leading-relaxed font-semibold">{text}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-full border border-neutral-300 px-5 py-2.5 text-xs text-neutral-600 hover:text-neutral-800 hover:bg-neutral-50 transition font-bold">
            Cancelar
          </button>
          <button onClick={onConfirm} className="rounded-full px-5 py-2.5 text-xs font-bold text-white bg-red-600 hover:bg-red-700 transition">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
