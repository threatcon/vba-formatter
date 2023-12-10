var vbspretty = function vbspretty_(options){


  var
    parse = require('./vbsparser.js'),
    beautify = require('./vbsbeautifier.js');

  options = options || {};
  (function vbspretty_beautify(){
    var tparsed = parse(options);

    (function vbspretty_beautify_options(){
      options.tokens = tparsed.tokens || [];
      options.tokenTypes = tparsed.tokenTypes || [];
      options.level = options.level && /^\d+$/.test(options.level) ? parseInt(options.level) : 0;
      options.indentChar = options.indentChar ? options.indentChar.toString() : '  ';
      options.breakLineChar = options.breakLineChar ? options.breakLineChar.toString() : '\n';
      options.breakOnSeperator = options.breakOnSeperator === true || false;
      options.removeComments = options.removeComments === true || false;
    })();
  })();

  return beautify(options);
};

module.exports = vbspretty;
