const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/data/db.json');

try {
  const buffer = fs.readFileSync(targetFile);
  const isUtf16Le = buffer[0] === 0xFF && buffer[1] === 0xFE;
  const isUtf16Be = buffer[0] === 0xFE && buffer[1] === 0xFF;
  
  let content = '';
  if (isUtf16Le) {
    console.log("db.json is UTF-16 LE. Converting to UTF-8...");
    content = buffer.toString('utf16le');
    fs.writeFileSync(targetFile, content, 'utf8');
  } else if (isUtf16Be) {
    console.log("db.json is UTF-16 BE. Converting to UTF-8...");
    content = buffer.toString('utf16be');
    fs.writeFileSync(targetFile, content, 'utf8');
  } else {
    // check null bytes
    let nullCount = 0;
    for (let i = 0; i < Math.min(buffer.length, 1000); i++) {
      if (buffer[i] === 0) nullCount++;
    }
    if (nullCount > 100) {
      console.log("db.json has null bytes, converting from UTF-16 LE...");
      content = buffer.toString('utf16le');
      fs.writeFileSync(targetFile, content, 'utf8');
    } else {
      console.log("db.json is already UTF-8.");
      content = buffer.toString('utf8');
    }
  }

  const db = JSON.parse(content);
  const service = db.services.find(s => s.id === "prueba-de-honestidad-etica-y-valores");
  if (service) {
    console.log("Service found:");
    console.log(JSON.stringify(service, null, 2).slice(0, 1000));
  } else {
    console.log("Service NOT found!");
  }
} catch (err) {
  console.error("Error:", err);
}
