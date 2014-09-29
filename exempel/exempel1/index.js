var http = require('http');

http.createServer(function (req, res) {
  console.log('Request inkommet!');
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(1337, '127.0.0.1');

console.log('Server startad...');