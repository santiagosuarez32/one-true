const fs = require('fs');
const c = fs.readFileSync('src/components/CoursePageTemplate.tsx', 'utf8'); 
const regex = /<div className="relative flex items-center[^>]*>[\s\S]*?<select[\s\S]*?<\/select>[\s\S]*?<\/div>\s*<input name="telefono"[\s\S]*?\/>\s*<\/div>/g; 
console.log(c.match(regex));
