const http = require('http');

http.get('http://localhost:3000/prueba-de-honestidad-etica-y-valores', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("STATUS CODE:", res.statusCode);
    // Find Ficha Técnica text and print surrounding context
    const idx = data.indexOf("Ficha Técnica");
    if (idx !== -1) {
      console.log("FOUND Ficha Técnica. Snippet:");
      console.log(data.substring(idx - 200, idx + 1000));
    } else {
      console.log("Ficha Técnica NOT FOUND in HTML");
      console.log("HTML length:", data.length);
      // Print first 500 chars
      console.log(data.substring(0, 500));
    }
  });
}).on('error', (err) => {
  console.error("Error fetching page:", err);
});
