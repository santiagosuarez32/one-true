const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Parse .env.local for Supabase connection
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

// 2. Map files to blog slugs
const blogMappings = [
  {
    id: "verdad-o-mentira",
    file: "restored_blog_verdad.tsx"
  },
  {
    id: "preempleo-rutina-investigacion",
    file: "restored_blog_preempleo.tsx"
  },
  {
    id: "garantiza-la-verdad",
    file: "restored_blog_garantiza.tsx"
  }
];

// 3. Load and parse db.json
const dbPath = path.join(__dirname, '../src/data/db.json');
if (!fs.existsSync(dbPath)) {
  console.error("Error: src/data/db.json file not found.");
  process.exit(1);
}

const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

// Function to clean and parse the TSX code to HTML
function extractHtmlContent(fileContent) {
  const startTag = '<div className="prose prose-lg max-w-none"';
  const startIndex = fileContent.indexOf(startTag);
  if (startIndex === -1) {
    throw new Error("Could not find start tag");
  }

  const bodyStart = fileContent.indexOf('>', startIndex) + 1;
  const ctaIndex = fileContent.indexOf('{/* CTA Section */}');
  if (ctaIndex === -1) {
    throw new Error("Could not find CTA section marker");
  }

  const bodyEnd = fileContent.lastIndexOf('</div>', ctaIndex);
  if (bodyEnd === -1 || bodyEnd < bodyStart) {
    throw new Error("Could not find matching closing div before CTA");
  }

  let html = fileContent.substring(bodyStart, bodyEnd).trim();

  // Clean React properties to standard HTML
  // Replace className=" with class="
  html = html.replace(/className=/g, 'class=');

  // Replace style={{ color: "#..." }} with style="color: #..."
  html = html.replace(/style=\{\{\s*color:\s*(['"])(.*?)\1\s*\}\}/g, 'style="color: $2"');

  // SVG adjustments
  html = html.replace(/strokeLinecap="/g, 'stroke-linecap="');
  html = html.replace(/strokeLinejoin="/g, 'stroke-linejoin="');
  html = html.replace(/strokeWidth=\{([^}]+)\}/g, 'stroke-width="$1"');

  return html;
}

async function run() {
  console.log("Starting extraction and restoration of blogs...");

  for (const mapping of blogMappings) {
    const filePath = path.join(__dirname, mapping.file);
    if (!fs.existsSync(filePath)) {
      console.error(`Error: restored file ${filePath} does not exist.`);
      continue;
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    try {
      const extractedHtml = extractHtmlContent(fileContent);
      console.log(`\n--- Extracted ${mapping.id} (${extractedHtml.length} chars) ---`);
      console.log(extractedHtml.substring(0, 300) + "...\n");

      // Update local db object
      const blog = db.blogs.find(b => b.id === mapping.id);
      if (blog) {
        blog.content = extractedHtml;
        console.log(`✅ Updated local db object for ${mapping.id}`);
      } else {
        console.warn(`⚠️ Warning: Blog ${mapping.id} not found in db.json blogs list.`);
      }
    } catch (e) {
      console.error(`❌ Error parsing ${mapping.file}:`, e.message);
    }
  }

  // Write updated db.json
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');
  console.log("\n✅ Wrote updated db.json to disk.");

  // Upload to Supabase
  console.log("\nUploading to Supabase...");
  for (const mapping of blogMappings) {
    const blog = db.blogs.find(b => b.id === mapping.id);
    if (blog) {
      const { error } = await supabase.from('blogs').upsert(blog);
      if (error) {
        console.error(`❌ Supabase upload failed for ${mapping.id}:`, error.message);
      } else {
        console.log(`✅ Supabase upload successful for ${mapping.id}`);
      }
    }
  }

  console.log("\nRestoration process complete!");
}

run();
