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
  console.log("--- LOCAL DB.JSON BLOGS ---");
  db.blogs.forEach(b => {
    console.log(`Blog ID: ${b.id}`);
    console.log(`Title: ${b.title}`);
    console.log(`Content length: ${b.content ? b.content.length : 0}`);
    console.log(`Content Preview: ${b.content ? b.content.slice(0, 150) : 'none'}`);
    console.log("------------------------");
  });

  console.log("\n--- SUPABASE BLOGS ---");
  const { data, error } = await supabase.from('blogs').select('id, title, content');
  if (error) {
    console.error("Supabase error:", error.message);
  } else if (data) {
    data.forEach(b => {
      console.log(`Blog ID: ${b.id}`);
      console.log(`Title: ${b.title}`);
      console.log(`Content length: ${b.content ? b.content.length : 0}`);
      console.log(`Content Preview: ${b.content ? b.content.slice(0, 150) : 'none'}`);
      console.log("------------------------");
    });
  }
}

inspect();
