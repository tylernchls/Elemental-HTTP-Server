const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.end();
});





server.listen(PORT, () => {
  console.log('opened server on', server.address());
});