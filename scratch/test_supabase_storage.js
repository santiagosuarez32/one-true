const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const envFile = fs.readFileSync('.env.local', 'utf8');
const env = {};
envFile.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    const key = match[1];
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    }
    env[key] = value;
  }
});

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;

async function testWithKey(name, key) {
  console.log(`\n=== Testing with ${name} ===`);
  try {
    const supabase = createClient(supabaseUrl, key);
    const { data: files, error } = await supabase.storage
      .from("imagenes")
      .list("backups", { limit: 100 });
    
    if (error) {
      console.error(`Error listing backups with ${name}:`, error.message, error);
    } else {
      console.log(`Success listing backups with ${name}. Count: ${files ? files.length : 0}`);
      if (files && files.length > 0) {
        console.log("Files:", files.map(f => f.name));
      } else {
        console.log("No files found in backups/ folder of imagenes bucket.");
      }
    }
  } catch (err) {
    console.error(`Exception with ${name}:`, err);
  }
}

async function run() {
  await testWithKey("ANON KEY", env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  await testWithKey("SERVICE ROLE KEY", env.SUPABASE_SERVICE_ROLE_KEY);
}

run();
