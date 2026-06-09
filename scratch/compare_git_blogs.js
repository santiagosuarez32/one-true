const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Get db.json from HEAD
  const headDbRaw = execSync('git show HEAD:src/data/db.json', { encoding: 'utf8' });
  const headDb = JSON.parse(headDbRaw);

  const localDbPath = path.join(__dirname, '../src/data/db.json');
  const localDb = JSON.parse(fs.readFileSync(localDbPath, 'utf8'));

  console.log("--- BLOGS IN HEAD (GIT COMMIT) ---");
  headDb.blogs.forEach(b => {
    console.log(`ID: ${b.id}`);
    console.log(`Title: ${b.title}`);
    console.log(`Content length: ${b.content ? b.content.length : 0}`);
    console.log(`Content snippet: ${b.content ? b.content.slice(0, 100) : 'none'}`);
    console.log("---------------------------------");
  });

  console.log("\n--- BLOGS IN LOCAL DB.JSON ---");
  localDb.blogs.forEach(b => {
    console.log(`ID: ${b.id}`);
    console.log(`Title: ${b.title}`);
    console.log(`Content length: ${b.content ? b.content.length : 0}`);
    console.log(`Content snippet: ${b.content ? b.content.slice(0, 100) : 'none'}`);
    console.log("---------------------------------");
  });

} catch (err) {
  console.error("Error:", err.message);
}
