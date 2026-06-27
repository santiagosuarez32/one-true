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

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('import PhoneCountrySelect')) {
    content = content.replace(
      'import { COUNTRIES, COUNTRY_PREFIXES } from "@/lib/countries";',
      'import { COUNTRIES, COUNTRY_PREFIXES } from "@/lib/countries";\nimport PhoneCountrySelect from "@/components/PhoneCountrySelect";'
    );
  }

  const searchString = '<div className="relative flex items-center border-0 rounded bg-neutral-50 focus-within:ring-2 focus-within:ring-[#700FA3]/20 focus-within:bg-white focus-within:shadow-md transition-all">';
  const searchString2 = '<div className="relative flex items-center border-0 rounded bg-neutral-50 focus-within:ring-2 focus-within:ring-[#700FA3]/20 focus-within:bg-white focus-within:shadow-md transition-all overflow-hidden">';

  let startIndex = content.indexOf(searchString);
  if (startIndex === -1) startIndex = content.indexOf(searchString2);
  
  if (startIndex === -1) {
    console.log("Not found start string in", file);
    continue;
  }

  const preContent = content.substring(0, startIndex);
  let remaining = content.substring(startIndex);
  
  const endMarkerRegex = /<\/svg>\s*<\/div>\s*<\/div>/;
  const match = remaining.match(endMarkerRegex);
  
  if (match) {
    const finalIndex = match.index + match[0].length;
    const block = remaining.substring(0, finalIndex);
    
    if (block.includes('https://flagcdn.com')) {
      const newBlock = '<PhoneCountrySelect country={country} setCountry={setCountry} loading={loading} hasIcon />';
      content = preContent + newBlock + remaining.substring(finalIndex);
      fs.writeFileSync(file, content, 'utf8');
      console.log('Updated', file);
    } else {
      console.log('Block does not contain flag in', file);
    }
  } else {
    console.log('End marker not found in', file);
  }
}
