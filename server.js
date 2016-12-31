const http = require('http');
const fs = require('fs');
const PORT = 3000;

const server = http.createServer((req, res) => {
  let url = req.url.substr(1);
  console.log(url);



  fs.readFile(`./public/${url}`, (err, file) => {
    if (err) throw err;
    if(url.endsWith('.css')){
      res.setHeader('Content-Type', 'text/css');
      res.write(file);
      res.end();
    } else {
      res.setHeader('Content-Type', 'text/html');
      res.write(file);
      res.end();
    }

  });

});






server.listen(PORT, () => {
  console.log('opened server on', server.address());
});