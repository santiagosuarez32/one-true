const fs = require('fs');
const path = require('path');

const files = [
  'src/app/[slug]/components/CalificacionGraficas.tsx',
  'src/app/[slug]/components/ControlCalidad.tsx',
  'src/app/[slug]/components/CursoBasico.tsx',
  'src/app/[slug]/components/EntrevistaPretest.tsx',
  'src/app/[slug]/components/SistemaCalificacion.tsx',
  'src/app/[slug]/components/TecnicasPoligraficas.tsx',
  'src/app/prueba-de-honestidad-etica-y-valores/PruebaClient.tsx',
  'src/app/cotiza/page.tsx'
];

files.forEach(fileRelPath => {
  const filePath = path.join(__dirname, '..', fileRelPath);
  if (!fs.existsSync(filePath)) {
    console.log(`File does not exist: ${fileRelPath}`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 1. Add import if not present
  if (!content.includes('import { COUNTRIES, COUNTRY_PREFIXES }')) {
    content = content.replace(
      /import\s+\{\s*useContactSubmit\s*\}\s+from\s+['"]@\/hooks\/useContactSubmit['"];?/,
      'import { useContactSubmit } from "@/hooks/useContactSubmit";\nimport { COUNTRIES, COUNTRY_PREFIXES } from "@/lib/countries";'
    );
  }
  
  // 2. Replace prefixes map logic
  content = content.replace(
    /const\s+prefixes\s*:\s*Record<string,\s*string>\s*=\s*\{[\s\S]*?\};?\s*const\s+phonePrefix\s*=\s*prefixes\[country\]\s*\|\|\s*["']\+593["'];?/,
    'const phonePrefix = COUNTRY_PREFIXES[country] || "+593";'
  );
  
  // 3. Replace select dropdown options (using lookahead to ensure we stop at the correct select closing bracket)
  content = content.replace(
    /(<select\b[\s\S]*?value=\{country\}[\s\S]*?>)(?=\s*<option)([\s\S]*?)(<\/select>)/g,
    (match, openingTag, innerContent, closingTag) => {
      let newOpeningTag = openingTag;
      if (!newOpeningTag.includes('max-w-[')) {
        if (newOpeningTag.includes('className="')) {
          newOpeningTag = newOpeningTag.replace('className="', 'className="max-w-[120px] ');
        } else if (newOpeningTag.includes("className='")) {
          newOpeningTag = newOpeningTag.replace("className='", "className='max-w-[120px] ");
        }
      }
      return `${newOpeningTag}\n                          {COUNTRIES.map((c) => (\n                            <option key={c.code} value={c.code}>\n                              {c.prefix} ({c.name})\n                            </option>\n                          ))}\n                        ${closingTag}`;
    }
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Successfully updated: ${fileRelPath}`);
});
