var express = require('express');
var multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

function createServer(port) {
  var app = express();

  var schematics = {};
  app.get('/', function (req, res) {
    res.send(generatePage());
  });

  function generatePage()
  {
    var list=Object.keys(schematics).map(name => '<li>'+name+'</li>');
    return '<html><head></head><body>' +
      '<h3>Available schematics</h3>'+
      '<ul>'+list.join("\n")+'</ul>'+
      '<h3>Upload a schematic</h3>'+
      '<form method="POST" enctype="multipart/form-data">' +
      'Name: <input type="text" name="textfield"><br />' +
      'Schematic: <input type="file" name="filefield"><br />' +
      '<input type="submit">' +
      '</form>' +
      '</body></html>';
  }

  app.post('/', upload.single('filefield'), function (req, res) {
    schematics[req.body['textfield']] = req.file.buffer;
    res.send(generatePage());
  });

  app.listen(port);

  return schematics;
}

module.exports=createServer;