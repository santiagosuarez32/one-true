const fs = require('fs');

const files = [
  "src/components/ServicePageTemplate.tsx",
  "src/components/CoursePageTemplate.tsx",
  "src/app/prueba-de-honestidad-etica-y-valores/PruebaClient.tsx",
  "src/app/[slug]/AdvancedCourseTemplate.tsx",
  "src/app/[slug]/components/CalificacionGraficas.tsx",
  "src/app/[slug]/components/ControlCalidad.tsx",
  "src/app/[slug]/components/CursoBasico.tsx",
  "src/app/[slug]/components/EntrevistaPretest.tsx",
  "src/app/[slug]/components/SistemaCalificacion.tsx",
  "src/app/[slug]/components/TecnicasPoligraficas.tsx",
  "src/app/cotiza/page.tsx",
  "src/components/ContactoFormAvanzados.tsx"
];

const newComponentStr = `<PhoneCountrySelect country={country} setCountry={setCountry} loading={loading} />`;
const newComponentStrWithIcon = `<PhoneCountrySelect country={country} setCountry={setCountry} loading={loading} hasIcon />`;

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  
  let content = fs.readFileSync(file, 'utf8');
  const original = content;

  const regex = /<div className="relative flex items-center[^>]*>[\s\S]*?<select[\s\S]*?<\/select>[\s\S]*?<\/div>\s*<input name="telefono"[\s\S]*?\/>\s*<\/div>/g;
  content = content.replace(regex, newComponentStr);
  
  const advancedRegex = /<div className="relative flex items-center[^>]*>[\s\S]*?<div className="flex items-center gap-2 pl-3 border-r border-neutral-200\/60 bg-transparent shrink-0 relative" ref=\{dropdownRef\}>[\s\S]*?<\/div>[\s\S]*?<input name="telefono"[\s\S]*?\/>\s*<div className="pr-3 text-\[\#700FA3\] pointer-events-none">[\s\S]*?<\/div>\s*<\/div>/g;
  content = content.replace(advancedRegex, newComponentStrWithIcon);

  if (content !== original) {
     if (!content.includes('PhoneCountrySelect')) {
       content = content.replace(/(import.*?;?\n)(?!import)/s, '$1import PhoneCountrySelect from "@/components/PhoneCountrySelect";\n');
     }
     fs.writeFileSync(file, content);
     console.log("Updated", file);
  }
});
