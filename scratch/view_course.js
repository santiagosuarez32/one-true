const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../src/data/db.json');
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

const course = db.courses.find(c => c.id === 'calificacion-graficas-analisis-datos');
console.log(JSON.stringify(course, null, 2));
