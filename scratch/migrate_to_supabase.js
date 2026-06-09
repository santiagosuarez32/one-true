const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Parse .env.local
const envPath = path.join(__dirname, '../.env.local');
if (!fs.existsSync(envPath)) {
  console.error("Error: .env.local file not found in project root.");
  process.exit(1);
}

const envContent = fs.readFileSync(envPath, 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] ? match[2].trim() : '';
    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.substring(1, value.length - 1);
    } else if (value.startsWith("'") && value.endsWith("'")) {
      value = value.substring(1, value.length - 1);
    }
    env[match[1]] = value;
  }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'] || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env['SUPABASE_SERVICE_ROLE_KEY'] || env['NEXT_PUBLIC_SUPABASE_ANON_KEY'] || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: NEXT_PUBLIC_SUPABASE_URL or keys not found in .env.local or process environment.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// 2. Read db.json
const dbPath = path.join(__dirname, '../src/data/db.json');
if (!fs.existsSync(dbPath)) {
  console.error("Error: src/data/db.json file not found.");
  process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

async function migrate() {
  console.log("Starting migration from db.json to Supabase...");

  // Migrate services
  if (db.services && db.services.length > 0) {
    console.log(`\nMigrating ${db.services.length} services...`);
    for (const service of db.services) {
      const { error } = await supabase.from('services').upsert(service);
      if (error) {
        console.error(`❌ Failed to migrate service ${service.id}:`, error.message);
      } else {
        console.log(`✅ Service migrated: ${service.id}`);
      }
    }
  }

  // Migrate courses
  if (db.courses && db.courses.length > 0) {
    console.log(`\nMigrating ${db.courses.length} courses...`);
    for (const course of db.courses) {
      // Omit template from root to match DB columns (template is stored inside pageContent for courses)
      const { template, ...supabaseCourse } = course;
      if (supabaseCourse.pageContent) {
        supabaseCourse.pageContent = {
          ...supabaseCourse.pageContent,
          template: template
        };
      }
      const { error } = await supabase.from('courses').upsert(supabaseCourse);
      if (error) {
        console.error(`❌ Failed to migrate course ${course.id}:`, error.message);
      } else {
        console.log(`✅ Course migrated: ${course.id}`);
      }
    }
  }

  // Migrate blogs
  if (db.blogs && db.blogs.length > 0) {
    console.log(`\nMigrating ${db.blogs.length} blogs...`);
    for (const blog of db.blogs) {
      const { error } = await supabase.from('blogs').upsert(blog);
      if (error) {
        console.error(`❌ Failed to migrate blog ${blog.id}:`, error.message);
      } else {
        console.log(`✅ Blog migrated: ${blog.id}`);
      }
    }
  }

  // Migrate podcasts
  if (db.podcasts && db.podcasts.length > 0) {
    console.log(`\nMigrating ${db.podcasts.length} podcasts...`);
    for (const podcast of db.podcasts) {
      const { error } = await supabase.from('podcasts').upsert(podcast);
      if (error) {
        console.error(`❌ Failed to migrate podcast ${podcast.id}:`, error.message);
      } else {
        console.log(`✅ Podcast migrated: ${podcast.id}`);
      }
    }
  }

  console.log("\nMigration process finished!");
}

migrate();
