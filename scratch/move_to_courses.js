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

const courseId = "evaluacion-forense-de-la-credibilidad";

const credibilidadCourse = {
  id: courseId,
  title: "Evaluación Forense de la Credibilidad",
  desc: "Análisis científico del testimonio y detección de indicadores de engaño mediante protocolos estandarizados.",
  image: "/formaciones/credibilidad.webp",
  cta: "Ver detalles",
  href: "/evaluacion-forense-de-la-credibilidad",
  template: "graficas",
  published: true,
  pageContent: {
    heroTitle: "Especialización en Evaluación Forense de la Credibilidad",
    heroTagline: "¿Buscas dominar el análisis científico del testimonio y aplicar las técnicas de evaluación de credibilidad más avanzadas del mundo?",
    heroDesc: "Esta formación especializada está diseñada para llevar tus habilidades al siguiente nivel en el ámbito forense y la gestión de riesgos corporativos, sustituyendo los mitos del lenguaje corporal por metodologías validadas por la ciencia.",
    heroImage: "/formaciones/credibilidad.webp",
    aboutTitle: "Ejes Temáticos",
    aboutDesc: "Modalidad: Presencial o en línea.",
    focusAreas: [
      {
        title: "Ejes Temáticos",
        items: [
          "Epistemología y bases científicas de la evaluación de la credibilidad.",
          "Psicología del testimonio: Funcionamiento, límites y exactitud de la memoria humana.",
          "Carga cognitiva y su aplicación práctica en la detección de indicadores de engaño.",
          "Evaluación de la credibilidad mediante la fenomenología del recuerdo (Memorias reales vs. Falsas memorias).",
          "Modelos cognitivos y psicofisiológicos estandarizados de credibilidad.",
          "Análisis de contenido verbal y evaluación analítica de declaraciones.",
          "Sesgos cognitivos, vulnerabilidades del testimonio y toma de decisiones forenses.",
          "Protocolos internacionales de control de calidad y buenas prácticas."
        ]
      }
    ],
    customCards: [],
    fichaTecnica: [
      {
        title: "⏱️ 40 horas de duración",
        description: "Formación de alto nivel con enfoque analítico."
      },
      {
        title: "📚 50 lecciones",
        description: "Lecciones especializadas en la materia."
      },
      {
        title: "📄 Plantillas de evaluación y guías de análisis científico descargables.",
        description: "Material práctico descargable."
      },
      {
        title: "📊 +120 Diapositivas académicas descargables.",
        description: "Diapositivas académicas descargables."
      },
      {
        title: "✏️ Quizzes de validación por módulo.",
        description: "Evaluaciones continuas."
      },
      {
        title: "📺 Acceso por 6 meses (pregrabado)",
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
        title: "🎓 Diploma de finalización",
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

// Delete from services if it exists
db.services = db.services.filter(s => s.id !== courseId);

// Add/update in courses
const cIdx = db.courses.findIndex(c => c.id === courseId);
if (cIdx !== -1) {
  db.courses[cIdx] = credibilidadCourse;
} else {
  db.courses.push(credibilidadCourse);
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log("✅ Updated local db.json.");

// 3. Update Supabase
async function run() {
  console.log("Deleting from services table...");
  const { error: delError } = await supabase.from('services').delete().eq('id', courseId);
  if (delError) {
    console.error("❌ Failed to delete from services:", delError.message);
  } else {
    console.log("✅ Deleted from services table.");
  }

  console.log("Upserting to courses table...");
  const { cta, template, ...supabaseCourse } = credibilidadCourse;
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
