var vbsbeautifier = function vbsbeautifier_(options) {
    var
        tokens = options.tokens || [],
        tokenTypes = options.tokenTypes || [],
        source = options.source || '',
        output = '',
        lastParsedToken = '',
        lastNonWSParsedToken = '';

    //beautify
    (function vbsbeautifier_beautify() {
        var
            i = 0,
            lTokens = tokens.length,
            n = 0,
            curToken = null,
            curTokenType = null,
            nextToken = null,
            nextTokenType = null,
            lastToken = null,
            currentLevel = 0,
            bNextLineInContinuation = false,
            bUseIndent = true,
            staticIndent = options.indentChar.repeat(options.level),
            dynamicIndent = '',
            ignoreWSToken = function(tokenType) {
                return [
                    'DOT_OPERATOR',
                    'EOF',
                    'OPEN_BRACKET',
                    'INVALID'
                ].indexOf(tokenType) !== -1;
            },
            isOperator = function(tokenType) {
                return [
                    'ARTHMETIC_OPERATOR',
                    'BINARY_OPERATOR',
                    'COMPARISON_OPERATOR',
                    'STEP'
                ].indexOf(tokenType) !== -1;
            },
            indent = function(level) {
              if (!bUseIndent)
                  return '';

              bUseIndent = false;
              if (currentLevel + level < 0)
                  return staticIndent + dynamicIndent;

              return staticIndent + dynamicIndent +  options.indentChar.repeat(currentLevel + level);
            },
            writeCode = function(code) {
                output += code;
            },
            writeToken = function vbsbeautifier_beautify_writeToken() {
                var
                    curTokenWSAfter = '',
                    curTokenWSBefore = '',
                    nextTokenWSBefore = '',
                    nextTokenWSAfter = '',
                    curIndentDelta = 0,
                    curLineIndent = 0,
                    nextIndentDelta = 0,
                    nextLineIndent = 0,
                    setTokenInpact = function(tokenType) {
                        var
                            indent = 0,
                            WSBefore = "",
                            WSAfter = "",
                            lineIndent = 0;

                        switch (tokenType) {
                          case 'ARTHMETIC_OPERATOR':
                          case 'BINARY_OPERATOR':
                          case 'COMPARISON_OPERATOR':
                          case 'STATEMENT_SEPARATOR':
                          case 'STEP':
                          case 'ON':
                          case 'FOR_LOOP_TO':
                          case 'FOR_LOOP_IN':
                              WSBefore = " ";
                              WSAfter = " ";
                              break;
                          case 'BYREF':
                          case 'BYVAL':
                          case 'CALL':
                          case 'CONST':
                          case 'DEFAULT':
                          case 'COMMA':
                          case 'DIM':
                          case 'ERASE':
                          case 'IF_ELSE_ONE_LINE':
                          case 'IF_ONE_LINE':
                          case 'NEW_OPERATOR':
                          case 'OPTION':
                          case 'PRESERVE':
                          case 'PRIVATE':
                          case 'PUBLIC':
                          case 'REDIM':
                          case 'RESUME':
                          case 'ERROR':
                          case 'SET_OPERATOR':
                              WSAfter = " ";
                              break;
                          case 'THEN':
                              break;
                          case 'STATEMENT_CONTINUATION':
                              WSBefore = " ";
                              WSAfter = " ";
                              break;
                          case 'WITH':
                          case 'FUNCTION':
                          case 'PROPERTY':
                          case 'SUB':
                          case 'CLASS':
                          case 'IF':
                              indent = 1;
                              WSAfter = " ";
                              lineIndent = -1;
                              break;
                          case 'END_SUB':
                          case 'END_WITH':
                          case 'END_FUNCTION':
                          case 'END_CLASS':
                          case 'END_IF':
                          case 'END_PROPERTY':
                              indent = -1;
                              break;
                          case 'SELECT_CASE':
                              WSAfter = " ";
                              //we increment twice so that when each case statement coments we
                              //just decrease the indent by 1 using
                              indent = 2;
                              lineIndent = -2;
                              break;
                          case 'CASE':
                          case 'CASE_ELSE':
                              lineIndent = -1;
                              WSAfter = "";
                              break;
                          case 'END_SELECT':
                              indent = -2;
                              break;
                          case 'ELSE_IF':
                              WSAfter = " ";
                              lineIndent = -1;
                              break;
                          case 'ELSE':
                              lineIndent = -1;
                              break;
                          case 'FOR_LOOP':
                          case 'FOR_EACHLOOP':
                          case 'WHILE_LOOP':
                          case 'DO_LOOP':
                          case 'DO_LOOP_START_UNTIL':
                          case 'DO_LOOP_START_WHILE':
                              WSAfter = " ";
                              indent = 1;
                              lineIndent = -1;
                              break;                              
                          case 'DO_LOOP':
                              WSAfter = "";
                              indent = 1;
                              lineIndent = -1;
                              break;
                          case 'FOR_LOOP_NEXT':
                          case 'DO_LOOP_END':
                          case 'WHILE_LOOP_WEND':
                              indent = -1;
                              WSAfter = "";
                              break;                              
                          case 'DO_LOOP_END_UNTIL':
                          case 'DO_LOOP_END_WHILE':
                              indent = -1;
                              WSAfter = " ";
                              break;
                        }

                        return {
                            indent: indent,
                            lineIndent: lineIndent,
                            WSBefore: WSBefore,
                            WSAfter: WSAfter
                        };
                    };

                var currentTokentInpact = setTokenInpact(curTokenType);
                curIndentDelta = currentTokentInpact.indent;
                curLineIndent = currentTokentInpact.lineIndent;
                curTokenWSBefore = currentTokentInpact.WSBefore;
                curTokenWSAfter = currentTokentInpact.WSAfter;

                //if next token is new line then lets not add a space after the current token
                curTokenWSAfter = nextTokenType === 'NEWLINE' ? '' : curTokenWSAfter;

                if (curTokenType !== 'NEWLINE' && !ignoreWSToken(curTokenType)) {

                    var nextTokentInpact = setTokenInpact(nextTokenType);

                    nextIndentDelta = nextTokentInpact.indent;
                    nextLineIndent = nextTokentInpact.lineIndent;
                    nextTokenWSBefore = nextTokentInpact.WSBefore;
                    nextTokenWSAfter = nextTokentInpact.WSAfter;

                    //Let's make sure we don't merge two different tokens because of spacing
                    if (curTokenWSAfter === '' && nextTokenWSBefore === '') {
                        switch (nextTokenType) {
                            case 'NEWLINE':
                            case 'DOT_OPERATOR':
                            case 'OPEN_BRACKET':
                            case 'CLOSE_BRACKET':
                            case 'COMMA':
                            case 'EOF':
                                break;
                            default:
                                curTokenWSAfter = ' ';
                                break;
                        }

                    }

                    // make sure that multiple BINARY_OPERATOR in chain
                    // will not create double spaces
                    if(curTokenWSAfter === ' ' && nextTokenWSBefore === ' '){
                      curTokenWSAfter = ''
                    }
                }

                switch (curTokenType) {
                    case 'STATEMENT_CONTINUATION':
                        bNextLineInContinuation = true;
                        break;
                    case 'NEWLINE':

                        if (lastTokenType !== null && lastNonWSLNParsedToken === 'NEWLINE') {
                            bUseIndent = true;
                            writeCode(indent(curLineIndent) + options.breakLineChar);
                        } else if(nextTokenType !== 'EOF'){
                          writeCode(options.breakLineChar);
                        }

                        bUseIndent = true;
                        if (bNextLineInContinuation) {
                            //we need to add some smart identation to make sure the continued line is extra indented
                            //int length = lastLine.Trim().Length;
                            //get tabe size
                            //length = (int) (length / 4 * 0.4);
                            dynamicIndent = options.indentChar;
                            //indentTabs[length];
                            bNextLineInContinuation = false;
                        } else{
                            dynamicIndent = '';
                        }
                        break;
                }

                currentLevel += curIndentDelta;

                if (curTokenType === 'ELSE' && nextTokenType === 'IF'){
                  curTokenWSAfter = options.breakLineChar;
                }

                if (isOperator(curTokenType) &&
                    isOperator(lastNonWSParsedToken)) {
                    /*curTokenWSAfter = "";
                    curTokenWSBefore = "";*/

                    if (curTokenType === 'BINARY_OPERATOR' && curToken === "Not"){
                      curTokenWSAfter = " ";
                    }
                }

                if (options.removeComments && curTokenType === 'COMMENT') {
                    //lets not do anything and remove this comment
                    if (nextTokenType === 'NEWLINE') {
                        tokens[n] = '';
                        tokenTypes[n] = 'UNKNOWN';
                    }
                } else if ((curTokenType !== 'WHITESPACE' && curTokenType !== 'NEWLINE')) {
                    writeCode(indent(curLineIndent) + curTokenWSBefore + curToken + curTokenWSAfter);
                }

                if (curTokenType === 'ELSE' && nextTokenType === 'IF') {
                    //if have a mistaken else if and not ElseIf. Need to make sure
                    //we add a new line to it
                    bUseIndent = true;
                }
            };

        for (i = 0; i < lTokens - 1; i++) {

            curToken = tokens[i];
            curTokenType = tokenTypes[i];

            n = i + 1;

            while (n < lTokens && tokenTypes[n] === 'WHITESPACE') {
                n++;
            }

            if (n < lTokens) {
                nextToken = tokens[n];
                nextTokenType = tokenTypes[n];
            }

            n = i;

            if (curTokenType !== 'WHITESPACE') {
                writeToken();
            }

            lastTokenType = tokenTypes[i];

            if (lastTokenType !== 'WHITESPACE' && lastTokenType !== 'NEWLINE') {
                lastNonWSParsedToken = lastTokenType;
            }

            if (lastNonWSParsedToken !== 'WHITESPACE') {
                lastNonWSLNParsedToken = lastTokenType;
            }
        }

    })();

    return output;
};
module.exports = vbsbeautifier;
