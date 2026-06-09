const http = require('http');

http.get('http://localhost:3000/curso-basico-en-poligrafia', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("STATUS CODE:", res.statusCode);
    
    // Check if the restored text is present in the response
    const hasCertificacion = data.includes("Certificación en Poligrafía (400H)");
    const hasApa = data.includes("Acreditada por la APA");
    const hasDominio = data.includes("Dominio Técnico");
    const hasMetodologia = data.includes("Metodología Científica");
    const hasExperiencia = data.includes("Experiencia Docente");
    
    console.log("Has 'Certificación en Poligrafía (400H)':", hasCertificacion);
    console.log("Has 'Acreditada por la APA':", hasApa);
    console.log("Has 'Dominio Técnico':", hasDominio);
    console.log("Has 'Metodología Científica':", hasMetodologia);
    console.log("Has 'Experiencia Docente':", hasExperiencia);
    
    if (!hasCertificacion) {
      console.log("Print first 1000 characters of the page HTML:");
      console.log(data.substring(0, 1000));
    }
  });
}).on('error', (err) => {
  console.error("Error fetching page:", err);
});
