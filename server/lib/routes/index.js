'use strict';

var express = require('express');
var fs = require('fs');
var path = require('path');

// function to encode file data to base64 encoded string
function base64_encode(file) {
  // read binary data
  var bitmap = fs.readFileSync(file);
  // convert binary data to base64 encoded string
  return new Buffer(bitmap).toString('base64');
}

// function to create file from base64 encoded string
function base64_decode(base64str, file) {
  // create buffer object from base64 encoded string, it is important to tell the constructor that the string is base64 encoded
  var bitmap = new Buffer(base64str, 'base64');
  // write buffer to file
  fs.writeFileSync(file, bitmap);
  console.log('******** File created from base64 encoded string ********');
}

var router = function router(app) {
  // 跨域处理
  app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Accept");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    // res.header("Content-Type", "application/json;charset=utf-8")
    next();
  });

  app.use('/dist', express.static('dist'));

  app.get('/', function (req, res, next) {
    res.send('hello world');
  });

  app.get('/file/:fileName', function (req, res, next) {
    var fileName = req.params.fileName;

    var filePath = path.resolve(__dirname, '../../dist', fileName);
    var matchFile = fs.existsSync(filePath);
    console.log(matchFile);
    if (!matchFile) {
      return res.send({ code: 'N', body: 'file is not exist' });
    }
    var base64Data = base64_encode(filePath);
    return res.send({ code: 'Y', body: base64Data });
  });
};

module.exports = router;
//# sourceMappingURL=index.js.map
