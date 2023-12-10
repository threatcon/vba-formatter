var fs = require('fs');
var path = require('path');
var vbspretty = require('../src/vbspretty');

var INPUT = path.join(__dirname, 'input.vbs');

fs.readFile(INPUT, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  var bsource = vbspretty({
    level: 1,
    indentChar: '\t',
    breakLineChar: '\r\n',
    breakOnSeperator: false,
    removeComments: false,
    source: data
  });

  console.log(bsource)
});