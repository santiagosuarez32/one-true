const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

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

const backupsDir = path.join(process.cwd(), "backups");

async function run() {
  console.log("Listing existing backups in local directory:", backupsDir);
  if (!fs.existsSync(backupsDir)) {
    console.error("Local backups directory does not exist.");
    return;
  }

  const files = fs.readdirSync(backupsDir)
    .filter(file => (file.startsWith("auto-backup-") || file.startsWith("manual-backup-")) && file.endsWith(".json"));

  console.log(`Found ${files.length} local backups. Fetching existing backups from Supabase 'backups' bucket...`);
  const { data: storageFiles, error: listError } = await supabase.storage.from("backups").list();
  if (listError) {
    console.error("Error listing backups in Supabase:", listError);
    return;
  }

  const existingInStorage = new Set(storageFiles.map(f => f.name));
  console.log(`Already ${existingInStorage.size} backups in Supabase storage.`);

  for (const file of files) {
    if (existingInStorage.has(file)) {
      console.log(`[-] Skip: ${file} (already exists in storage)`);
      continue;
    }

    const filePath = path.join(backupsDir, file);
    const fileContent = fs.readFileSync(filePath);
    console.log(`[+] Uploading: ${file}...`);
    
    const { error: uploadError } = await supabase.storage
      .from("backups")
      .upload(file, fileContent, {
        contentType: "application/json",
        upsert: true
      });

    if (uploadError) {
      console.error(`Error uploading ${file}:`, uploadError.message);
    } else {
      console.log(`[OK] Uploaded: ${file}`);
    }
  }

  console.log("\nDone uploading local backups to Supabase.");
}

run();
