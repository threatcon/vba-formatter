const vscode = require('vscode');
const vbspretty = require('./src/vbspretty');
const path = require('path');
const {
    Position,
    Range,
} = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	vscode.window.showInformationMessage('VBA Beautifier is now active!');

	let disposable = vscode.commands.registerCommand('extension.pretty', function () {
		let acEditor = vscode.window.activeTextEditor;
		if (acEditor && acEditor.document.languageId === 'vbs' || acEditor.document.languageId === 'vb') {
		
			var document = acEditor.document;
			var inFile = document.fileName;
			const documentText = document.getText();
			const fileExtension = getFileExtension(inFile);
			const start = new Position(getStartLine(documentText, fileExtension),0);
			const end = new Position(document.lineCount +1 ,0);
			const range = new Range(start, end);
			const sourceFile = document.getText(range);
			
			var outFile = vbspretty({
				level: 0,
				indentChar: '\t',
				breakLineChar: '\n',
				breakOnSeperator: false,
				removeComments: false,
				source: sourceFile,
			});

			console.info('Writing to vbs file:', inFile);
			acEditor.edit(editBuilder => {
				editBuilder.replace(range, outFile);
			});
			//console.log(outFile);
			console.info('Done!');
			vscode.window.showInformationMessage('Beautifying');
		} else {
			vscode.window.showInformationMessage('Not a Visual Basic or VB Script file!');
		}
	});

	context.subscriptions.push(disposable);
}
//exports.activate = activate;

function getStartLine(text, fileExtension) {

	if (fileExtension === '.cls') {
		const lineNumber = findLineNumber(text,'Attribute VB_Exposed');
		return lineNumber;
	} else if (fileExtension === '.bas') {
		const lineNumber = findLineNumber(text,'Attribute VB_Name');
		return lineNumber;
	}
	else {
		return 0;
	}
}

function findLineNumber(text, searchText) {
	const lines = text.split('\n');
	const lineNumber = lines.findIndex(line => line.includes(searchText)) + 1;
	return lineNumber;
}

function getFileExtension(fileName) {
	return path.extname(fileName);
}


function deactivate() {
	vscode.window.showInformationMessage('deactivated');
}

module.exports = {
	activate,
	deactivate
}
