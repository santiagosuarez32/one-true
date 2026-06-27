const fs = require('fs');

const files = [
  'src/app/[slug]/components/CalificacionGraficas.tsx',
  'src/app/[slug]/components/ControlCalidad.tsx',
  'src/app/[slug]/components/CursoBasico.tsx',
  'src/app/[slug]/components/EntrevistaPretest.tsx',
  'src/app/[slug]/components/SistemaCalificacion.tsx',
  'src/app/[slug]/components/TecnicasPoligraficas.tsx',
  'src/app/prueba-de-honestidad-etica-y-valores/PruebaClient.tsx'
];

let total = 0;

for (const file of files) {
  if (!fs.existsSync(file)) {
     console.log('Not found:', file);
     continue;
  }
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('import PhoneCountrySelect')) {
    content = content.replace(
      'import { COUNTRIES, COUNTRY_PREFIXES } from "@/lib/countries";',
      'import { COUNTRIES, COUNTRY_PREFIXES } from "@/lib/countries";\nimport PhoneCountrySelect from "@/components/PhoneCountrySelect";'
    );
  }

  // Use a very permissive string split approach for the exact HTML structure
  // We want to replace everything from `<div className="relative flex items-center border-0 rounded bg-neutral-50`
  // up to `</svg></div></div>` where there is a flagcdn inside it.

  // Let's use regex that matches the div exactly.
  // Because the inputs don't have name="telefono" (wait, they do? In CursoBasico it's `<input name="telefono" ...>`)
  // Wait, in CursoBasico: `<input name="telefono" type="tel" ... />`
  
  const targetRegex = /<div className="relative flex items-center border-0 rounded bg-neutral-50 focus-within:ring-2 focus-within:ring-\[#700FA3\]\/20 focus-within:bg-white focus-within:shadow-md transition-all( overflow-hidden)?">[\s\S]*?<img src={`https:\/\/flagcdn\.com\/w20\/\$\{country\}\.png`}[\s\S]*?<select[\s\S]*?<\/select>[\s\S]*?<\/div>[\s\S]*?<input[\s\S]*?name="telefono"[\s\S]*?<\/div>\s*<\/div>/g;

  if (targetRegex.test(content)) {
    content = content.replace(targetRegex, '<PhoneCountrySelect country={country} setCountry={setCountry} loading={loading} hasIcon />');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
    total++;
  } else {
    // maybe it has `type="tel"` and no `name="telefono"`?
    const targetRegex2 = /<div className="relative flex items-center border-0 rounded bg-neutral-50 focus-within:ring-2 focus-within:ring-\[#700FA3\]\/20 focus-within:bg-white focus-within:shadow-md transition-all( overflow-hidden)?">[\s\S]*?<img src={`https:\/\/flagcdn\.com\/w20\/\$\{country\}\.png`}[\s\S]*?<select[\s\S]*?<\/select>[\s\S]*?<\/div>[\s\S]*?<input[\s\S]*?type="tel"[\s\S]*?<\/div>\s*<\/div>/g;
    
    if (targetRegex2.test(content)) {
      content = content.replace(targetRegex2, '<PhoneCountrySelect country={country} setCountry={setCountry} loading={loading} hasIcon />');
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated alternative in', file);
      total++;
    } else {
      console.log('No match in', file);
    }
  }
}
console.log('Total updated:', total);
