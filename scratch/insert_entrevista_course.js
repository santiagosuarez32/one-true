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

const courseId = "modelos-de-entrevista-investigativa";

const entrevistaCourse = {
  id: courseId,
  title: "Modelos de Entrevista Investigativa",
  desc: "Formación en técnicas de obtención de información de alta calidad, basadas en principios de respeto y efectividad forense.",
  image: "/formaciones/entrevista.webp",
  cta: "Ver detalles",
  href: "/modelos-de-entrevista-investigativa",
  template: "graficas",
  published: true,
  pageContent: {
    heroTitle: "Especialización en Modelos de Entrevista Investigativa",
    heroTagline: "¿Buscas transformar tus entrevistas tradicionales en entrevistas de alta calidad basadas en el respeto y la efectividad forense?",
    heroDesc: "Esta formación especializada está diseñada para llevar tus habilidades al siguiente nivel, implementando los protocolos internacionales basados en ciencia que maximizan la obtención de información verídica y mitigan el riesgo de falsas confesiones.",
    heroImage: "/formaciones/entrevista.webp",
    aboutTitle: "Ejes Temáticos",
    aboutDesc: "Modalidad: Presencial o en línea.",
    focusAreas: [
      {
        title: "Ejes Temáticos",
        items: [
          "Evolución y Ciencia de la Entrevista Forense: Transición de los métodos coercitivos tradicionales hacia los modelos basados en evidencia científica.",
          "El Modelo PEACE: Estructuración metodológica de la entrevista corporativa y judicial (Planificación, Explicación, Relato, Cierre y Evaluación).",
          "El Protocolo ORBIT (OxForenses): Gestión de la resistencia, negociación táctica e interacciones con perfiles complejos o no cooperativos bajo principios humanitarios.",
          "La Técnica SUE (Strategic Use of Evidence): Manejo y presentación estratégica de la evidencia para evaluar la consistencia del relato.",
          "Entrevista Cognitiva (EC) y Entrevista Cognitiva Mejorada (MCI): Técnicas avanzadas de reactivación de huellas de memoria y transferencia de control para optimizar el recuerdo de testigos y víctimas."
        ]
      }
    ],
    customCards: [],
    fichaTecnica: [
      {
        title: "⏱️ 30 horas de duración",
        description: "Formación de alto nivel con enfoque analítico."
      },
      {
        title: "📚 45 lecciones",
        description: "Lecciones especializadas en la materia."
      },
      {
        title: "📄 Plantillas de planeación y bitácoras de entrevista forense descargables.",
        description: "Material práctico descargable."
      },
      {
        title: "📊 +100 Diapositivas académicas descargables.",
        description: "Diapositivas académicas descargables."
      },
      {
        title: "✏️ Evaluaciones de caso práctico y Quizzes interactivos.",
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
  db.courses[cIdx] = entrevistaCourse;
} else {
  db.courses.push(entrevistaCourse);
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log("✅ Updated local db.json.");

// 3. Update Supabase
async function run() {
  console.log("Upserting to courses table...");
  const { cta, template, ...supabaseCourse } = entrevistaCourse;
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
