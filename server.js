const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const PORT = 3000;


const server = http.createServer((req, res) => {

  let url = req.url;
  console.log(url);


    fs.readFile(`./public/${url}`, (err, fileContent) => {

      if (err) {

        fs.readFile('./public/404.html', (err, fileContent) => {

          res.writeHead(404, {'Content-Type': 'text/html', 'Content-Length': `${fileContent.length}`});
          res.write(fileContent);
          res.end();

        });

      } else {
        res.writeHead(200, {'Content-Type': 'text/html ', 'Content-Length': `${fileContent.length}`});
        res.write(fileContent);
        res.end();

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



























