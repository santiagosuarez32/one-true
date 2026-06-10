const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/data/db.json');
if (fs.existsSync(filePath)) {
  const content = fs.readFileSync(filePath, 'utf8');
  const db = JSON.parse(content);
  console.log("Keys in db.json:", Object.keys(db));
  
  // check if any key contains ebook
  const matchingKeys = Object.keys(db).filter(k => k.toLowerCase().includes('ebook'));
  console.log("Matching keys:", matchingKeys);
  
  if (matchingKeys.length > 0) {
    matchingKeys.forEach(k => {
      console.log(`Value of key '${k}':`, JSON.stringify(db[k], null, 2).slice(0, 500));
    });
  }
} else {
  console.log("db.json not found!");
}
