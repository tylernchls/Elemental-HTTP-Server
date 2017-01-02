const http = require('http');
const fs = require('fs');
const querystring = require('querystring');
const PORT = 3000;
let fileType;


const server = http.createServer((req, res) => {
  let url = req.url;
  let findFileType = url.split('').splice(-3,3).join('');

  // finds fileType ending and sets it
  if(findFileType === 'css') {
    fileType = 'css';
  } else {
    fileType = 'html';
  }

    /*
    checks if url passed in exits or not, if does exist will read file and send data out.
    if file doens't exist will create the file
    */


    fs.readFile(`./public/${url}`, (err, files) => {
      if (url === '/') {

          fs.readFile('./public/index.html', (err, fileContent) => {
            console.log('testing');

            res.writeHead(200, {'Content-Type': `text/${fileType}`, 'Content-Length': `${fileContent.length}`});
            res.write(fileContent);
            res.end();

          });
          // will throw error if page isn't found
      } else if(err) {
        console.log('this file doesnt exist');


        req.on('data', (data) => {

          var dataPost = querystring.parse(data.toString());
          console.log(dataPost);

          var fileContents = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>The Elements - ${dataPost.elementName}</title>
    <link rel="stylesheet" href="/css/styles.css">
    <link href = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/BristolStoolChart.png/1024px-BristolStoolChart.png">
    </head>
    <body>
    <h1>${dataPost.elementName}</h1>
    <h2>${dataPost.elementSymbol}</h2>
    <h3>${dataPost.elementAtomicNumber}</h3>
    <p>${dataPost.elementDescription}</p>
    <p><a href="/">back</a></p>
    </body>
    </html>`


        fs.writeFile(`./public/${dataPost.elementName}.html`, fileContents, (err) => {
          if (err) throw err;
          res.writeHead(200, {'Content-Type' : 'application/json'});
          res.end({'success': 'true'});
        });


        });

      } else {

        fs.readFile(`./public/${url}`, (err, fileContent) => {
          // takes back to index.html page
          if (url === '/') {

            fs.readFile('./public/index.html', (err, fileContent) => {
              console.log('testing');

              res.writeHead(200, {'Content-Type': `text/${fileType}`, 'Content-Length': `${fileContent.length}`});
              res.write(fileContent);
              res.end();

            });
            // will throw error if page isn't found
          } else if(err) {

            fs.readFile('./public/404.html', (err, fileContent) => {

              res.writeHead(404, {'Content-Type': `text/${fileType}`, 'Content-Length': `${fileContent.length}`});
              res.write(fileContent);
              res.end();

            });
            // writes file if found
          } else {

             res.writeHead(200, {'Content-Type': `text/${fileType}`, 'Content-Length': `${fileContent.length}`});
             res.write(fileContent);
             res.end();

          }

        });

      }

    });


});










server.listen(PORT, () => {
  console.log('opened server on', server.address());
});



























