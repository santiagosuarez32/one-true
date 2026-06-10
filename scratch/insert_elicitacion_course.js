const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Parse env variables
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.substring(1, value.length - 1);
    env[match[1]] = value;
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
const supabase = createClient(supabaseUrl, supabaseKey);

const courseId = "elicitacion-conversacional";

const elicitacionCourse = {
  id: courseId,
  title: "Elicitación Conversacional",
  desc: "Formación avanzada en técnicas de obtención de información sutil y estratégica mediante interacciones fluidas y persuasivas.",
  image: "/formaciones/elicitacion.webp",
  cta: "Ver detalles",
  href: "/elicitacion-conversacional",
  template: "graficas",
  published: true,
  pageContent: {
    heroTitle: "Especialización en Elicitación Conversacional",
    heroTagline: "¿Quieres dominar la obtención estratégica de información mediante interacciones fluidas, estrategias de persuasión argumentativa y técnicas científicamente comprobadas?",
    heroDesc: "Esta formación especializada está diseñada para llevar tus habilidades al siguiente nivel, permitiéndote recopilar datos críticos sin levantar sospechas ni activar mecanismos defensivos en la administración de riesgos corporativos.",
    heroImage: "/formaciones/elicitacion.webp",
    aboutTitle: "Ejes Temáticos",
    aboutDesc: "Modalidad: Presencial o en línea.",
    focusAreas: [
      {
        title: "Ejes Temáticos",
        items: [
          "Fundamentos y Arquitectura de la Elicitación: Diferencias entre interrogatorio, entrevista y obtención sutil de información en entornos de contrainteligencia.",
          "Dinámicas de la Comunicación Persuasiva: El uso del rapport estratégico, empatía táctica y neutralización de barreras psicológicas conscientes.",
          "Disparadores Cognitivos y Vulnerabilidades del Discurso: Explotación ética de tendencias humanas (necesidad de corregir, deseo de reconocimiento, validación social y sesgo de reciprocidad).",
          "Ingeniería de Preguntas y Estímulos Conversacionales: Diseño de narrativas de apariencia natural para la activación micro-selectiva de memoria sin generar reactividad.",
          "Estrategias Avanzadas de Extracción de información: Técnicas de asunción deliberada, declaraciones provocativas y contrastes de información para la confirmación de datos no públicos.",
          "Detección de Inconsistencias en Flujos Pasivos: Identificación de indicadores de ocultamiento, desvío conductual y evasión en entornos no restrictivos.",
          "Aplicación en la Gestión de Riesgos Corporativos: Protocolos de elicitación aplicados a auditorías de seguridad, debida diligencia (due diligence) e investigaciones internas."
        ]
      }
    ],
    customCards: [],
    fichaTecnica: [
      {
        title: "⏱️ 15 horas de duración",
        description: "Formación de alto nivel con enfoque analítico."
      },
      {
        title: "📚 35 lecciones",
        description: "Lecciones especializadas en la materia."
      },
      {
        title: "📄 Guiones de práctica y matrices de planificación conversacional descargables.",
        description: "Material práctico descargable."
      },
      {
        title: "📊 +80 Diapositivas académicas descargables.",
        description: "Diapositivas académicas descargables."
      },
      {
        title: "✏️ Ejercicios y Quizzes interactivos.",
        description: "Evaluaciones continuas interactiva."
      },
      {
        title: "📺 Acceso por 3 meses (pregrabado)",
        description: "Material pregrabado disponible."
      },
      {
        title: "✅ 30 días de garantía.",
        description: "Garantía de satisfacción total."
      },
      {
        title: "🔐 Acceso a la comunidad ONE TRUE.",
        description: "Acceso exclusivo a la red académica."
      },
      {
        title: "🎓 Diploma de finalización.",
        description: "Diploma oficial al concluir."
      }
    ],
    contactPhone: "0981296179",
    contactWhatsapp: "https://api.whatsapp.com/send?phone=593981296179",
    contactWhatsappText: "+593 98 129 6179"
  }
};

// 2. Update local db.json
const dbPath = path.join(__dirname, '../src/data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Add/update in courses
const cIdx = db.courses.findIndex(c => c.id === courseId);
if (cIdx !== -1) {
  db.courses[cIdx] = elicitacionCourse;
} else {
  db.courses.push(elicitacionCourse);
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log("✅ Updated local db.json.");

// 3. Update Supabase
async function run() {
  console.log("Upserting to courses table...");
  const { cta, template, ...supabaseCourse } = elicitacionCourse;
  if (supabaseCourse.pageContent) {
    supabaseCourse.pageContent.template = template;
  }
  const { error: upsError } = await supabase.from('courses').upsert(supabaseCourse);
  if (upsError) {
    console.error("❌ Failed to upsert to courses:", upsError.message);
  } else {
    console.log("✅ Upserted to courses table.");
  }
}

run();
