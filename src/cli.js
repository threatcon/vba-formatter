#!/usr/bin/env node
var vbspretty = require('./vbspretty');
var fs = require('fs');
var vscode = require('vscode');
var options = {};
var editor = vscode.window.activeTextEditor;

if (!editor) {
  console.error("No active editor found.");
  process.exit(1);
}

var document = editor.document;
var inFile = document.fileName;
var outFile = inFile;

for (var i = 0; i < process.argv.length; i++) {
  var arg = process.argv[i];
  var option = arg.replace('--', '');

  switch (option) {
    case 'level':
      var value = process.argv[++i];
      if (!isNaN(value)) {
        options[option] = Number(value);
      } else {
        console.error("Option '" + option + "' is expected to be a number, got '" + value + "' instead");
        process.exit(1);
      }
      break;
    case 'indentChar':
      var value = process.argv[++i];
      if (/^(\ +|\\t)$/.test(value)) {
        options[option] = value.replace('\\t', '\t');
      } else {
        console.error("Option '" + option + "' accepts tabs or spaces, got '" + value + "' instead");
        process.exit(2);
      }
      break;
    case 'breakLineChar':
      var value = process.argv[++i];
      if (/^(\\n|\\r\\n)$/.test(value)) {
        options[option] = value.replace('\\n', '\n').replace('\\r', '\r');
      } else {
        console.error("Option '" + option + "' accepts \\n or \\r\\n only, got '" + value + "' instead");
        process.exit(3);
      }
      break;
    case 'breakOnSeperator':
      options[option] = true;
      break;
    case 'removeComments':
      options[option] = true;
      break;
    case 'output':
      var value = process.argv[++i];
      if (value) {
        outFile = value;
      } else {
        console.error("Option '" + option + "' expects a value.");
        process.exit(4);
      }
      break;
    default:
      console.warn("Option '" + option + "' is not valid, will be ignored.");
  }
}

console.info('Prettifying vbs file:', inFile);
var data = document.getText();

var bsource = vbspretty({
  level: options.level,
  indentChar: options.indentChar,
  breakLineChar: options.breakLineChar,
  breakOnSeperator: options.breakOnSeperator,
  removeComments: options.removeComments,
  source: data
});

console.info('Writing to vbs file:', outFile);
editor.edit(editBuilder => {
  editBuilder.replace(document.validateRange(new vscode.Range(0, 0, document.lineCount, 0)), bsource);
});
console.info('Done!');

