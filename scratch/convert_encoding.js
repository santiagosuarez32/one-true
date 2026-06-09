const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '../src/app/admin/page.tsx');

try {
  const buffer = fs.readFileSync(targetFile);
  
  // Check for UTF-16 LE BOM (FF FE) or UTF-16 BE BOM (FE FF)
  const isUtf16Le = buffer[0] === 0xFF && buffer[1] === 0xFE;
  const isUtf16Be = buffer[0] === 0xFE && buffer[1] === 0xFF;
  
  if (isUtf16Le) {
    console.log("File is encoded in UTF-16 LE. Converting to UTF-8...");
    const content = buffer.toString('utf16le');
    // Write back as UTF-8 (without BOM)
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log("Conversion complete.");
  } else if (isUtf16Be) {
    console.log("File is encoded in UTF-16 BE. Converting to UTF-8...");
    const content = buffer.toString('utf16be');
    fs.writeFileSync(targetFile, content, 'utf8');
    console.log("Conversion complete.");
  } else {
    // Check if there are many null bytes indicating UTF-16 without BOM
    let nullCount = 0;
    for (let i = 0; i < Math.min(buffer.length, 1000); i++) {
      if (buffer[i] === 0) nullCount++;
    }
    if (nullCount > 100) {
      console.log("Detected high null-byte count. Attempting UTF-16 LE conversion...");
      const content = buffer.toString('utf16le');
      fs.writeFileSync(targetFile, content, 'utf8');
      console.log("Conversion complete.");
    } else {
      console.log("File is already in UTF-8 or standard ASCII.");
    }
  }
} catch (err) {
  console.error("Error reading file:", err);
}
