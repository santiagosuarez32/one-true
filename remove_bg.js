const { Jimp } = require('jimp');
const fs = require('fs');
const path = require('path');

const marcasDir = path.join(__dirname, 'public', 'marcas');

async function removeWhiteBackground() {
  const files = fs.readdirSync(marcasDir).filter(f => f.endsWith('.png'));
  
  for (const file of files) {
    const filePath = path.join(marcasDir, file);
    try {
      const image = await Jimp.read(filePath);
      
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
        const r = this.bitmap.data[idx + 0];
        const g = this.bitmap.data[idx + 1];
        const b = this.bitmap.data[idx + 2];
        const a = this.bitmap.data[idx + 3];
        
        // If the pixel is very close to white and fully opaque, make it transparent
        if (r > 240 && g > 240 && b > 240 && a > 0) {
          this.bitmap.data[idx + 3] = 0; // Alpha to 0
        }
      });
      
      await image.write(filePath);
      console.log(`Processed ${file}`);
    } catch (err) {
      console.error(`Failed to process ${file}`, err);
    }
  }
}

removeWhiteBackground();
