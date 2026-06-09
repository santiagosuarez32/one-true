const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Parse env
const envPath = path.join(__dirname, '../.env.local');
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

async function inspect() {
  const localService = db.services.find(s => s.id === "prueba-de-honestidad-etica-y-valores");
  console.log("--- LOCAL DB.JSON ---");
  if (localService) {
    console.log("Keys in pageContent:", Object.keys(localService.pageContent));
    console.log("aboutCards exists:", !!localService.pageContent.aboutCards);
    if (localService.pageContent.aboutCards) {
      console.log("aboutCards count:", localService.pageContent.aboutCards.length);
      console.log("aboutCards:", JSON.stringify(localService.pageContent.aboutCards, null, 2));
    }
  } else {
    console.log("Local service not found!");
  }

  console.log("\n--- SUPABASE DB ---");
  const { data, error } = await supabase
    .from('services')
    .select('pageContent')
    .eq('id', 'prueba-de-honestidad-etica-y-valores')
    .single();

  if (error) {
    console.error("Supabase error:", error.message);
  } else if (data) {
    console.log("Keys in Supabase pageContent:", Object.keys(data.pageContent));
    console.log("aboutCards exists in Supabase:", !!data.pageContent.aboutCards);
    if (data.pageContent.aboutCards) {
      console.log("aboutCards count in Supabase:", data.pageContent.aboutCards.length);
      console.log("aboutCards in Supabase:", JSON.stringify(data.pageContent.aboutCards, null, 2));
    }
  }
}

inspect();
