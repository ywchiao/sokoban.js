
var http = require('http');

http.createServer((request, response) => {
  response.writeHead(200, {
    'Contant-Type': 'text/plain'
  });

  response.end('Hello World!\n');
}).listen(8080);

console.log('Server running at http://127.0.0.1:8080/');

// index.js
