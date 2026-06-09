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
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const aboutCards = [
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
];

async function seed() {
  // Update local db.json
  const sIdx = db.services.findIndex(s => s.id === "prueba-de-honestidad-etica-y-valores");
  if (sIdx !== -1) {
    db.services[sIdx].pageContent.aboutCards = aboutCards;
    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
    console.log("✅ Seeded local db.json successfully.");

    // Update Supabase
    const { error } = await supabase
      .from('services')
      .update({ pageContent: db.services[sIdx].pageContent })
      .eq('id', 'prueba-de-honestidad-etica-y-valores');

    if (error) {
      console.error("❌ Failed to update Supabase:", error.message);
    } else {
      console.log("✅ Seeded Supabase services table successfully.");
    }
  } else {
    console.error("❌ Service not found in db.json.");
  }
}

seed();
