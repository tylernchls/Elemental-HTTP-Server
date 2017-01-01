const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const PORT = 3000;


const server = http.createServer((req, res) => {
  let pageFound = false;
  let url = req.url.substr(1);
  console.log(url);

  let listArr = fs.readdir('./public', (err, filesInDir) => {
    if (err) throw err;

    filesInDir.forEach((file) => {
      console.log(url, file);

      if(url === file) {
        console.log('first if');
        pageFound = true;
        fs.readFile(`./public/${url}`, (err, file) => {
          console.log('test two');

          if (err) throw err;

          res.writeHead(200, {'Content-Type': 'text/html', 'Content-Length': `${file.length}`});
          res.write(file);
          res.end();
        });

      } else if(url.endsWith('.css')) {
        console.log('in css');
        pageFound = true;
        fs.readFile(`./public/${url}`, (err, file) =>{
          file = file.toString();
          if (err) throw err;

          res.writeHead(200, {'Content-Type': 'text/css', 'Content-Length': `${file.length}`});
          // res.write(file);
          res.end(file);
        });
      }
    });

    console.log('never');

    if(pageFound === false) {

      fs.readFile(`./public/404.html`, (err, file) => {
        if (err) throw err;

        res.writeHead(404, {'Content-Type': 'text/html', 'Content-Length': `${file.length}`});
        res.write(file);
      });
    }

  });













  // Client sends post data
  if(req.method === 'POST') {
    req.on('data', (data) => {
      var dataPost = querystring.parse(data.toString());
      console.log(dataPost);

      var fileContents = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>The Elements - ${dataPost.element}</title>
<link rel="stylesheet" href="/css/styles.css">
<link href = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/BristolStoolChart.png/1024px-BristolStoolChart.png">
</head>
<body>
<h1>${dataPost.element}</h1>
<h2>${dataPost.elementSymbol}</h2>
<h3>${dataPost.elementAtomicNumber}</h3>
<p>${dataPost.elementDescription}</p>
<p><a href="/">back</a></p>
</body>
</html>`


    fs.writeFile(`./public/${dataPost.element}.html`, fileContents, (err) => {
      if (err) throw err;
      res.writeHead(200, {'Content-Type' : 'application/json'});
      res.end({'success': 'true'});
      console.log('file saved');
    });


    });

  }
  // end client post

});











server.listen(PORT, () => {
  console.log('opened server on', server.address());
});