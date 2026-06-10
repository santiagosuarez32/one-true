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

const targetIds = [
  "evaluacion-forense-de-la-credibilidad",
  "elicitacion-conversacional",
  "modelos-de-entrevista-investigativa"
];

// 2. Update local db.json
const dbPath = path.join(__dirname, '../src/data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

db.courses = db.courses.map(c => {
  if (targetIds.includes(c.id)) {
    if (!c.pageContent) c.pageContent = {};
    c.pageContent.isComplementary = true;
    // Remove isComplementary from root just in case
    delete c.isComplementary;
  }
  return c;
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
console.log("✅ Updated local db.json.");

// 3. Update Supabase
async function run() {
  console.log("Syncing isComplementary flags to Supabase...");
  for (const id of targetIds) {
    const course = db.courses.find(c => c.id === id);
    if (!course) continue;

    const { template, ...supabaseCourse } = course;
    if (supabaseCourse.pageContent) {
      supabaseCourse.pageContent.template = template;
      supabaseCourse.pageContent.isComplementary = true;
    }

    const { error } = await supabase.from('courses').upsert(supabaseCourse);
    if (error) {
      console.error(`❌ Failed to update ${id}:`, error.message);
    } else {
      console.log(`✅ Updated flag for ${id}.`);
    }
  }
}

run();
