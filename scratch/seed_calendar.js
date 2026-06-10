const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Parse env
const envPath = path.join(__dirname, '../.env.local');
if (!fs.existsSync(envPath)) {
  console.error("Error: .env.local not found");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    else if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    env[match[1]] = value;
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];
const supabase = createClient(supabaseUrl, supabaseKey);

const dbPath = path.join(__dirname, '../src/data/db.json');
let db = {};
if (fs.existsSync(dbPath)) {
  db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
}

const calendarIntakes = [
  {
    id: "curso-basico-en-poligrafia-conv",
    courseId: "curso-basico-en-poligrafia",
    title: "Curso Básico de Poligrafía",
    category: "certificacion",
    badgeText: "CERTIFICACIÓN COMPLETA - 100% PRESENCIAL",
    badgeColor: "blue",
    dateDisplay: "Fechas: Feb - Abr 2027",
    durationDisplay: "Duración: 400 horas",
    year: 2027,
    modalityType: "presencial",
    durationType: "certificacion",
    isFeatured: true,
    href: "/curso-basico-en-poligrafia",
    brochureUrl: "",
    published: true,
    sortOrder: 10
  },
  {
    id: "sistema-calificacion-ess-m-conv",
    courseId: "sistema-calificacion-ess-m",
    title: "Actualización en Poligrafía (ESS-M)",
    category: "avanzado",
    badgeText: "100% ONLINE",
    badgeColor: "green",
    dateDisplay: "Sep 2026",
    durationDisplay: "15 horas",
    year: 2026,
    modalityType: "online",
    durationType: "corto",
    isFeatured: false,
    href: "/sistema-calificacion-ess-m",
    brochureUrl: "",
    published: true,
    sortOrder: 20
  },
  {
    id: "control-de-calidad-en-poligrafia-conv",
    courseId: "control-de-calidad-en-poligrafia",
    title: "Control de Calidad en Poligrafía",
    category: "avanzado",
    badgeText: "100% ONLINE",
    badgeColor: "green",
    dateDisplay: "Oct - Nov 2026",
    durationDisplay: "40 horas",
    year: 2026,
    modalityType: "online",
    durationType: "corto",
    isFeatured: false,
    href: "/control-de-calidad-en-poligrafia",
    brochureUrl: "",
    published: true,
    sortOrder: 30
  },
  {
    id: "entrevista-pretest-conv",
    courseId: "entrevista-pretest",
    title: "Entrevista Pretest",
    category: "avanzado",
    badgeText: "HÍBRIDO - ONLINE + PRÁCTICA",
    badgeColor: "green",
    dateDisplay: "Oct 2026",
    durationDisplay: "15 horas",
    year: 2026,
    modalityType: "hibrido",
    durationType: "corto",
    isFeatured: false,
    href: "/entrevista-pretest",
    brochureUrl: "",
    published: true,
    sortOrder: 40
  },
  {
    id: "calificacion-graficas-analisis-datos-conv",
    courseId: "calificacion-graficas-analisis-datos",
    title: "Calificación de Gráficas y Análisis de Datos",
    category: "avanzado",
    badgeText: "100% ONLINE",
    badgeColor: "green",
    dateDisplay: "Nov 2026",
    durationDisplay: "15 horas",
    year: 2026,
    modalityType: "online",
    durationType: "corto",
    isFeatured: false,
    href: "/calificacion-graficas-analisis-datos",
    brochureUrl: "",
    published: true,
    sortOrder: 50
  },
  {
    id: "tecnicas-poligraficas-conv",
    courseId: "tecnicas-poligraficas",
    title: "Técnicas Poligráficas",
    category: "avanzado",
    badgeText: "100% ONLINE",
    badgeColor: "green",
    dateDisplay: "Dic 2026",
    durationDisplay: "20 horas",
    year: 2026,
    modalityType: "online",
    durationType: "corto",
    isFeatured: false,
    href: "/tecnicas-poligraficas",
    brochureUrl: "",
    published: true,
    sortOrder: 60
  },
  {
    id: "elicitacion-conversacional-conv",
    courseId: "elicitacion-conversacional",
    title: "Elicitación Conversacional",
    category: "complementaria",
    badgeText: "100% ONLINE",
    badgeColor: "green",
    dateDisplay: "Feb 2027",
    durationDisplay: "15 horas",
    year: 2027,
    modalityType: "online",
    durationType: "corto",
    isFeatured: false,
    href: "/formaciones-complementarias",
    brochureUrl: "",
    published: true,
    sortOrder: 70
  }
];

async function seed() {
  // Update local db.json
  db.calendarIntakes = calendarIntakes;
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log("✅ Seeded local db.json with calendarIntakes successfully.");

  // Insert or Update into Supabase calendar_intakes table
  for (const intake of calendarIntakes) {
    const { error } = await supabase
      .from('calendar_intakes')
      .upsert(intake);

    if (error) {
      console.error(`❌ Failed to upsert ${intake.id} in Supabase:`, error.message);
    } else {
      console.log(`✅ Seeded ${intake.id} in Supabase successfully.`);
    }
  }
}

seed();
