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

async function testUpload(name, key) {
  console.log(`\n=== Testing upload with ${name} ===`);
  try {
    const supabase = createClient(supabaseUrl, key);
    const jsonStr = JSON.stringify({ test: true, timestamp: new Date().toISOString() });
    
    // In Next.js server environment we might use Buffer or Blob. Let's see what works.
    const { data, error } = await supabase.storage
      .from("imagenes")
      .upload(`backups/test-upload-${name.replace(/\s+/g, '-').toLowerCase()}.json`, Buffer.from(jsonStr), {
        contentType: "application/json",
        upsert: true
      });
    
    if (error) {
      console.error(`Upload error with ${name}:`, error.message, error);
    } else {
      console.log(`Upload success with ${name}:`, data);
    }
  } catch (err) {
    console.error(`Exception with ${name}:`, err);
  }
}

async function run() {
  await testUpload("ANON KEY", env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  await testUpload("SERVICE ROLE KEY", env.SUPABASE_SERVICE_ROLE_KEY);
}

run();
