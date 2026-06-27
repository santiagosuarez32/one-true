const fs = require('fs');
const files = [
  'src/components/ServicePageTemplate.tsx',
  'src/components/CoursePageTemplate.tsx',
  'src/app/[slug]/AdvancedCourseTemplate.tsx'
];
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('import PhoneCountrySelect')) {
    content = content.replace(
      'import { COUNTRIES, COUNTRY_PREFIXES } from "@/lib/countries";',
      'import { COUNTRIES, COUNTRY_PREFIXES } from "@/lib/countries";\nimport PhoneCountrySelect from "@/components/PhoneCountrySelect";'
    );
    fs.writeFileSync(file, content, 'utf8');
    console.log('Added import to', file);
  }
}
