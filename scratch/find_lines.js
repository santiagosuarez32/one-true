const fs = require('fs');
const content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');
const lines = content.split('\n');

const keywords = ['customCards', 'focusAreas'];

keywords.forEach(keyword => {
  console.log(`=== Matches for "${keyword}": ===`);
  let count = 0;
  lines.forEach((line, idx) => {
    if (line.toLowerCase().includes(keyword.toLowerCase())) {
      count++;
      console.log(`${idx + 1}: ${line.trim()}`);
    }
  });
  console.log(`Total matches: ${count}\n`);
});
