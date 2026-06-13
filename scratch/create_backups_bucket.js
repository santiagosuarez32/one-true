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

async function run() {
  console.log("Checking if 'backups' bucket already exists...");
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    console.error("Error listing buckets:", listError);
    return;
  }

  const backupsBucket = buckets.find(b => b.name === 'backups');
  if (backupsBucket) {
    console.log("'backups' bucket already exists.");
  } else {
    console.log("Creating 'backups' bucket...");
    const { data: createData, error: createError } = await supabase.storage.createBucket('backups', {
      public: false, // keep backups private!
      fileSizeLimit: 10485760 // 10MB limit
    });
    if (createError) {
      console.error("Error creating 'backups' bucket:", createError);
      return;
    }
    console.log("Bucket 'backups' created successfully:", createData);
  }

  console.log("Testing uploading a JSON backup into the 'backups' bucket...");
  const jsonStr = JSON.stringify({ test: true, timestamp: new Date().toISOString() });
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("backups")
    .upload("test-backup.json", Buffer.from(jsonStr), {
      contentType: "application/json",
      upsert: true
    });

  if (uploadError) {
    console.error("Error uploading JSON file to 'backups' bucket:", uploadError);
  } else {
    console.log("Successfully uploaded JSON file to 'backups' bucket:", uploadData);
    
    console.log("Testing listing files in the 'backups' bucket...");
    const { data: files, error: listFilesError } = await supabase.storage
      .from("backups")
      .list();
    
    if (listFilesError) {
      console.error("Error listing files in 'backups' bucket:", listFilesError);
    } else {
      console.log("Files found in 'backups' bucket:", files.map(f => f.name));
    }
    
    console.log("Cleaning up test file...");
    await supabase.storage.from("backups").remove(["test-backup.json"]);
  }
}

run();
