const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

// 1. Manually parse .env.local
const envPath = path.join(__dirname, "../.env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const idx = trimmed.indexOf("=");
    if (idx !== -1) {
      const key = trimmed.substring(0, idx).trim();
      const val = trimmed.substring(idx + 1).trim().replace(/^['"]|['"]$/g, "");
      process.env[key] = val;
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local!");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Define Card Data
const controlCalidadCards = [
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

const calificacionGraficasCards = [
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

const entrevistaPretestCards = [
  {
    title: "Fundamentos y estándares",
    description: "Domina los principios de las prácticas internacionales estandarizadas en entrevistas pretest y aprende los fundamentos metodológicos que garantizan la confiabilidad técnica de la evaluación.",
    icon: "/icons/Browser-Page-Account--Streamline-Ultimate.webp",
    items: [
      "Estándares de práctica Internacionales y entrevista pretest.",
      "Principios metodológicos de la entrevista pretest."
    ]
  },
  {
    title: "Preparación y desarrollo del pretest",
    description: "Aprende cada fase de preparación previa al examen y domina el paso a paso del protocolo de entrevista pretest, asegurando consistencia y validez en tus evaluaciones poligráficas.",
    icon: "/icons/Browser-Hand--Streamline-Ultimate.webp",
    items: [
      "La fase de preparación como antesala del pretest.",
      "El paso a paso de la entrevista pretest."
    ]
  },
  {
    title: "Evaluaciones diagnósticas y exploratorias",
    description: "Especialízate en el análisis de evaluaciones poligráficas diagnósticas y exploratorias, incluyendo el protocolo de preguntas específicas para casos de preempleo, rutina y temas investigativos.",
    icon: "/icons/Touchpad-Finger--Streamline-Ultimate.webp",
    items: [
      "Proceso metodológico del pretest en evaluaciones poligráficas diagnósticas (Específicas).",
      "Desarrollo de preguntas para evaluaciones poligráficas diagnósticas (Específicas).",
      "Proceso metodológico del pretest en evaluaciones poligráficas exploratorias (Preempleo - Rutina).",
      "Desarrollo de preguntas para evaluaciones poligráficas Exploratorias (Preempleo - Rutina)."
    ]
  }
];

async function run() {
  const dbPath = path.join(__dirname, "../src/data/db.json");
  if (!fs.existsSync(dbPath)) {
    console.error("Local db.json not found at:", dbPath);
    process.exit(1);
  }

  // 3. Read Local db.json
  const db = JSON.parse(fs.readFileSync(dbPath, "utf8"));
  console.log("Read local db.json successfully. Modifying courses...");

  const updates = [
    { id: "control-de-calidad-en-poligrafia", cards: controlCalidadCards },
    { id: "calificacion-graficas-analisis-datos", cards: calificacionGraficasCards },
    { id: "entrevista-pretest", cards: entrevistaPretestCards }
  ];

  for (const update of updates) {
    const course = db.courses.find((c) => c.id === update.id);
    if (course) {
      if (!course.pageContent) course.pageContent = {};
      course.pageContent.customCards = update.cards;
      console.log(`Updated course ${update.id} local content.`);
    } else {
      console.warn(`Course ID ${update.id} not found in local db.courses!`);
    }
  }

  // 4. Save to db.json
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), "utf8");
  console.log("Wrote updated db to local db.json.");

  // 5. Sync to Supabase
  console.log("Syncing to Supabase...");
  for (const update of updates) {
    const course = db.courses.find((c) => c.id === update.id);
    if (course) {
      // Supabase table expects course without template field in root, but pageContent.template instead
      const { template, ...supabaseCourse } = course;
      if (supabaseCourse.pageContent) {
        supabaseCourse.pageContent = {
          ...supabaseCourse.pageContent,
          template: template
        };
      }

      console.log(`Syncing course ${update.id} to Supabase...`);
      const { error } = await supabase.from("courses").upsert(supabaseCourse);
      if (error) {
        console.error(`Error upserting course ${update.id}:`, error.message);
      } else {
        console.log(`Successfully synced course ${update.id} to Supabase.`);
      }
    }
  }

  console.log("Seeding process completed!");
}

run().catch((err) => {
  console.error("Seeding error:", err);
  process.exit(1);
});
