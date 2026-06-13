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
const supabaseKey = env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

async function testUploadMime(filename, contentType) {
  try {
    const jsonStr = JSON.stringify({ test: true, timestamp: new Date().toISOString() });
    const options = contentType ? { contentType, upsert: true } : { upsert: true };
    const { data, error } = await supabase.storage
      .from("imagenes")
      .upload(filename, Buffer.from(jsonStr), options);
    
    if (error) {
      console.log(`FAIL: filename="${filename}", contentType="${contentType}" -> Error: ${error.message}`);
    } else {
      console.log(`SUCCESS: filename="${filename}", contentType="${contentType}" -> Path: ${data.path}`);
      // Clean it up immediately if successful
      await supabase.storage.from("imagenes").remove([filename]);
    }
  } catch (err) {
    console.log(`FAIL: filename="${filename}", contentType="${contentType}" -> Exception: ${err.message}`);
  }
}

async function run() {
  await testUploadMime("backups/test_plain.txt", "text/plain");
  await testUploadMime("backups/test_octet.bin", "application/octet-stream");
  await testUploadMime("backups/test_png.png", "image/png");
  await testUploadMime("backups/test_default.json", undefined);
}

run();
