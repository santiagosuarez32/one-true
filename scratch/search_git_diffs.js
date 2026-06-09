const { execSync } = require('child_process');

const commits = ['2023319', '1c01db4', '82d8e3f', 'dbb565b', '35c68b8'];

commits.forEach(hash => {
  console.log(`=== COMMIT ${hash} ===`);
  try {
    const show = execSync(`git show ${hash}`, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'ignore'] });
    // Look for lines containing blog contents or verdad-o-mentira
    const lines = show.split('\n');
    const matchedLines = lines.filter(l => l.includes('verdad-o-mentira') || l.includes('preempleo-rutina-investigacion'));
    matchedLines.forEach(l => console.log("Match: " + l.slice(0, 150)));
  } catch (err) {
    console.error("Error showing commit:", err.message);
  }
  console.log("=====================\n");
});
