const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Parse .env.local for Supabase connection
const envPath = path.join(__dirname, '../.env.local');
if (!fs.existsSync(envPath)) {
  console.error("Error: .env.local file not found in project root.");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[match[1]] = value;
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'] || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL or keys not found in .env.local or process environment.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Define the new service object
const credibilidadService = {
  id: "evaluacion-forense-de-la-credibilidad",
  title: "Evaluación Forense de la Credibilidad",
  desc: "Análisis científico del testimonio y detección de indicadores de engaño mediante protocolos estandarizados.",
  image: "/formaciones/credibilidad.webp",
  cta: "Ver detalles",
  href: "/evaluacion-forense-de-la-credibilidad",
  template: "vetting",
  published: true,
  pageContent: {
    heroTitle: "Especialización en Evaluación Forense de la",
    heroUnderlined: "Credibilidad",
    heroTagline: "¿Buscas dominar el análisis científico del testimonio y aplicar las técnicas de evaluación de credibilidad más avanzadas del mundo?",
    heroDesc: "Esta formación especializada está diseñada para llevar tus habilidades al siguiente nivel en el ámbito forense y la gestión de riesgos corporativos, sustituyendo los mitos del lenguaje corporal por metodologías validadas por la ciencia.",
    heroImage: "/formaciones/credibilidad.webp",
    aboutTitle: "Ejes Temáticos",
    aboutDesc: "Modalidad: Presencial o en línea.",
    aboutCards: [
      {
        title: "Epistemología y Bases Científicas",
        text: "Epistemología y bases científicas de la evaluación de la credibilidad."
      },
      {
        title: "Psicología del Testimonio",
        text: "Funcionamiento, límites y exactitud de la memoria humana."
      },
      {
        title: "Carga Cognitiva",
        text: "Aplicación práctica en la detección de indicadores de engaño."
      },
      {
        title: "Fenomenología del Recuerdo",
        text: "Memorias reales vs. Falsas memorias."
      },
      {
        title: "Modelos Cognitivos",
        text: "Modelos cognitivos y psicofisiológicos estandarizados de credibilidad."
      },
      {
        title: "Análisis de Contenido Verbal",
        text: "Evaluación analítica de declaraciones."
      },
      {
        title: "Sesgos Cognitivos",
        text: "Vulnerabilidades del testimonio y toma de decisiones forenses."
      },
      {
        title: "Control de Calidad",
        text: "Protocolos internacionales de control de calidad y buenas prácticas."
      }
    ],
    whyTitle: "¿Qué incluye este curso?",
    whyPoints: [
      {
        title: "⏱️ Duración",
        text: "40 horas de duración"
      },
      {
        title: "📚 Lecciones",
        text: "50 lecciones"
      },
      {
        title: "📄 Plantillas",
        text: "Plantillas de evaluación y guías de análisis científico descargables."
      },
      {
        title: "📊 Material Académico",
        text: "+120 Diapositivas académicas descargables."
      },
      {
        title: "✏️ Quizzes",
        text: "Quizzes de validación por módulo."
      },
      {
        title: "📺 Acceso",
        text: "Acceso por 6 meses (pregrabado)"
      },
      {
        title: "✅ Garantía",
        text: "30 días de garantía."
      },
      {
        title: "🔐 Comunidad",
        text: "Acceso a la comunidad ONE TRUE."
      },
      {
        title: "🎓 Diploma",
        text: "Diploma de finalización"
      }
    ],
    whyImage1: "/formaciones/credibilidad.webp",
    whyImage2: "/formaciones/credibilidad.webp",
    contactPhone: "0981296179",
    contactWhatsapp: "https://api.whatsapp.com/send?phone=593981296179",
    showOtherSolutions: true
  }
};

// 3. Load and parse db.json
const dbPath = path.join(__dirname, '../src/data/db.json');
if (!fs.existsSync(dbPath)) {
  console.error("Error: src/data/db.json file not found.");
  process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Update local db.json services array
const sIdx = db.services.findIndex(s => s.id === credibilidadService.id);
if (sIdx !== -1) {
  db.services[sIdx] = credibilidadService;
} else {
  db.services.push(credibilidadService);
}

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log("✅ Updated local db.json successfully.");

// 4. Sync to Supabase services table
async function run() {
  console.log("Syncing to Supabase services...");
  const { error } = await supabase.from('services').upsert(credibilidadService);
  if (error) {
    console.error("❌ Supabase upload failed:", error.message);
  } else {
    console.log("✅ Supabase upload successful!");
  }
}

run();
