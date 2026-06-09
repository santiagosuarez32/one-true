const { execSync } = require('child_process');

try {
  // Get all commits affecting src/data/db.json
  const commitsRaw = execSync('git log --follow --format="%H %s" -- src/data/db.json', { encoding: 'utf8' });
  const lines = commitsRaw.trim().split('\n');

  console.log(`Found ${lines.length} commits affecting src/data/db.json.`);
  for (const line of lines) {
    const spaceIdx = line.indexOf(' ');
    const hash = line.slice(0, spaceIdx);
    const subject = line.slice(spaceIdx + 1);

    try {
      const contentRaw = execSync(`git show ${hash}:src/data/db.json`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
      const db = JSON.parse(contentRaw);
      if (db.blogs && db.blogs.length > 0) {
        console.log(`Commit ${hash.slice(0, 7)} ("${subject}"):`);
        db.blogs.forEach(b => {
          console.log(`  - Blog ID: ${b.id}, Content Length: ${b.content ? b.content.length : 0}`);
        });
      }
    } catch (e) {
      // Ignore commits where parsing fails
    }
  }
} catch (err) {
  console.error("Error:", err.message);
}
