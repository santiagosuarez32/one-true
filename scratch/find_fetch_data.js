const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/admin/page.tsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('fetchData') || line.includes('const res = await fetch("/api/cms")')) {
    console.log(`${idx + 1}: ${line}`);
  }
});
