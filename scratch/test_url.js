const http = require('http');

http.get('http://localhost:3000/icons/eje1.svg', (res) => {
  console.log('Status Code:', res.statusCode);
  console.log('Headers:', res.headers);
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log('Body length:', data.length);
    console.log('Snippet:', data.slice(0, 100));
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
