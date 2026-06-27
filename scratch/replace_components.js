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

  const regex = /<div className="relative flex items-center border-0 rounded bg-neutral-50 focus-within:ring-2 focus-within:ring-\[#700FA3\]\/20 focus-within:bg-white focus-within:shadow-md transition-all( overflow-hidden)?">[\s\S]*?<img src={`https:\/\/flagcdn\.com\/w20\/\$\{country\}\.png`}[\s\S]*?<select[\s\S]*?<\/select>[\s\S]*?<\/div>[\s\S]*?<input name="telefono"[\s\S]*?<\/div>\s*<\/div>/g;

  if (regex.test(content)) {
    content = content.replace(regex, '<PhoneCountrySelect country={country} setCountry={setCountry} loading={loading} hasIcon />');
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
    total++;
  } else {
    // Check if it's the specific case without name="telefono", but with formData
    const regex2 = /<div className="relative flex items-center border-0 rounded bg-neutral-50 focus-within:ring-2 focus-within:ring-\[#700FA3\]\/20 focus-within:bg-white focus-within:shadow-md transition-all( overflow-hidden)?">[\s\S]*?<img src={`https:\/\/flagcdn\.com\/w20\/\$\{country\}\.png`}[\s\S]*?<select[\s\S]*?<\/select>[\s\S]*?<\/div>[\s\S]*?<input[\s\S]*?type="tel"[\s\S]*?<\/div>\s*<\/div>/g;

    if (regex2.test(content)) {
      console.log('Found alternative match in', file, '- NEEDS MANUAL FIX OR BETTER REGEX');
      // For now, if we know we can just replace with the standard one, we would do it, but since some forms use formData, let's leave it for manual if found
    } else {
      console.log('No match in', file);
    }
  }
}
console.log('Total updated:', total);
