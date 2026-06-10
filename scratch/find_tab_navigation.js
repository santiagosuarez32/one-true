const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/app/admin/page.tsx');
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('activeTab') && (line.includes('flex') || line.includes('button') || line.includes('nav'))) {
    console.log(`${idx + 1}: ${line}`);
  }
});
