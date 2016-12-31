const http = require('http');
const fs = require('fs');
const PORT = 3000;

const server = http.createServer((req, res) => {
  let url = req.url.trim().split('/').join('');
  console.log(url);

  fs.readFile(`./public/${url}`, (err, file) => {
    if (err) throw err;
    res.write(file);
    res.end();
  });

});






server.listen(PORT, () => {
  console.log('opened server on', server.address());
});