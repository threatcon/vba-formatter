var vbsparser = function vbsparser_(options) {
  var
    tokens = [],
    tokenTypes = [],
    tokenTable = {
      "step": { "label": "Step", "type": "STEP"},
      "class": { "label": "Class", "type": "CLASS"},
      "const": { "label": "Const", "type": "CONST"},
      "function": { "label": "Function", "type": "FUNCTION"},
      "property": { "label": "Property", "type": "PROPERTY"},
      "sub": { "label": "Sub", "type": "SUB"},
      "goto": { "label": "Goto", "type": "GOTO"},
      "xor": { "label": "Xor", "type": "BINARY_OPERATOR"},
      "or": { "label": "Or", "type": "BINARY_OPERATOR"},
      "and": { "label": "And", "type": "BINARY_OPERATOR"},
      "not": { "label": "Not", "type": "BINARY_OPERATOR"},
      "eqv": { "label": "Eqv", "type": "BINARY_OPERATOR"},
      "imp": { "label": "Imp", "type": "BINARY_OPERATOR"},
      "=": { "label": "=", "type": "COMPARISON_OPERATOR"},
      "<=": { "label": "<=", "type": "COMPARISON_OPERATOR"},
      ">=": { "label": ">=", "type": "COMPARISON_OPERATOR"},
      "<>": { "label": "<>", "type": "COMPARISON_OPERATOR"},
      "is": { "label": "Is", "type": "COMPARISON_OPERATOR"},
      "<": { "label": "<", "type": "COMPARISON_OPERATOR"},
      ">": { "label": ">", "type": "COMPARISON_OPERATOR"},
      "mod": { "label": "Mod", "type": "ARTHMETIC_OPERATOR"},
      "dim": { "label": "Dim", "type": "DIM"},
      "redim": { "label": "ReDim", "type": "REDIM"},
      "preserve": { "label": "Preserve", "type": "PRESERVE"},
      "public": { "label": "Public", "type": "PUBLIC"},
      "private": { "label": "Private", "type": "PRIVATE"},
      "default": { "label": "Default", "type": "DEFAULT"},
      "next": { "label": "Next", "type": "FOR_LOOP_NEXT"},
      "nothing": { "label": "Nothing", "type": "OBJECT_NOTHING"},
      "null": { "label": "Null", "type": "VALUE_NULL"},
      "true": { "label": "True", "type": "VALUE_TRUE"},
      "false": { "label": "False", "type": "VALUE_FALSE"},
      "empty": { "label": "Empty", "type": "VALUE_EMPTY"},
      "byval": { "label": "ByVal", "type": "BYVAL"},
      "byref": { "label": "ByRef", "type": "BYREF"},
      "select": { "label": "Select", "type": "SELECT"},
      "case": { "label": "Case", "type": "CASE"},
      "if": { "label": "If", "type": "IF"},
      "else": { "label": "Else", "type": "ELSE"},
      "elseif": { "label": "ElseIf", "type": "ELSE_IF"},
      "exit": { "label": "Exit", "type": "EXIT"},
      "end": { "label": "End", "type": "END"},
      "then": { "label": "Then", "type": "THEN"},
      "err": { "label": "Err", "type": "ERR"},
      "regexp": { "label": "RegExp", "type": "REGEXP"},
      "call": { "label": "Call", "type": "CALL"},
      "erase": { "label": "Erase", "type": "ERASE"},
      "with": { "label": "With", "type": "WITH"},
      "stop": { "label": "Stop", "type": "STOP"},
      "on": { "label": "On", "type": "ON"},
      "error": { "label": "Error", "type": "ERROR"},
      "resume": { "label": "Resume", "type": "RESUME"},
      "option": { "label": "Option", "type": "OPTION"},
      "explicit": { "label": "Explicit", "type": "EXPLICIT"},
      "do": { "label": "Do", "type": "DO_LOOP"},
      "while": { "label": "While", "type": "WHILE_LOOP"},
      "wend": { "label": "Wend", "type": "WHILE_LOOP_WEND"},
      "until": { "label": "Until", "type": "DO_LOOP_UNTIL"},
      "loop": { "label": "Loop", "type": "DO_LOOP_END"},
      "for": { "label": "For", "type": "FOR_LOOP"},
      "to": { "label": "To", "type": "FOR_LOOP_TO"},
      "in": { "label": "In", "type": "FOR_LOOP_IN"},
      "set": { "label": "Set", "type": "SET_OPERATOR"},
      "new": { "label": "New", "type": "NEW_OPERATOR"},
      "abs": { "label": "Abs", "type": "VBSCRIPT_FUNCTION"},
      "array": { "label": "Array", "type": "VBSCRIPT_FUNCTION"},
      "asc": { "label": "Asc", "type": "VBSCRIPT_FUNCTION"},
      "atn": { "label": "Atn", "type": "VBSCRIPT_FUNCTION"},
      "cbool": { "label": "CBool", "type": "VBSCRIPT_FUNCTION"},
      "cbyte": { "label": "CByte", "type": "VBSCRIPT_FUNCTION"},
      "ccur": { "label": "CCur", "type": "VBSCRIPT_FUNCTION"},
      "cdate": { "label": "CDate", "type": "VBSCRIPT_FUNCTION"},
      "cdbl": { "label": "CDbl", "type": "VBSCRIPT_FUNCTION"},
      "chr": { "label": "Chr", "type": "VBSCRIPT_FUNCTION"},
      "cint": { "label": "CInt", "type": "VBSCRIPT_FUNCTION"},
      "clng": { "label": "CLng", "type": "VBSCRIPT_FUNCTION"},
      "conversions": { "label": "Conversions", "type": "VBSCRIPT_FUNCTION"},
      "cos": { "label": "Cos", "type": "VBSCRIPT_FUNCTION"},
      "createobject": { "label": "CreateObject", "type": "VBSCRIPT_FUNCTION"},
      "csng": { "label": "CSng", "type": "VBSCRIPT_FUNCTION"},
      "cstr": { "label": "CStr", "type": "VBSCRIPT_FUNCTION"},
      "date": { "label": "Date", "type": "VBSCRIPT_FUNCTION"},
      "dateadd": { "label": "DateAdd", "type": "VBSCRIPT_FUNCTION"},
      "datediff": { "label": "DateDiff", "type": "VBSCRIPT_FUNCTION"},
      "datepart": { "label": "DatePart", "type": "VBSCRIPT_FUNCTION"},
      "dateserial": { "label": "DateSerial", "type": "VBSCRIPT_FUNCTION"},
      "datevalue": { "label": "DateValue", "type": "VBSCRIPT_FUNCTION"},
      "day": { "label": "Day", "type": "VBSCRIPT_FUNCTION"},
      "derived math": { "label": "Derived Math", "type": "VBSCRIPT_FUNCTION"},
      "escape": { "label": "Escape", "type": "VBSCRIPT_FUNCTION"},
      "eval": { "label": "Eval", "type": "VBSCRIPT_FUNCTION"},
      "exp": { "label": "Exp", "type": "VBSCRIPT_FUNCTION"},
      "filter": { "label": "Filter", "type": "VBSCRIPT_FUNCTION"},
      "formatcurrency": { "label": "FormatCurrency", "type": "VBSCRIPT_FUNCTION"},
      "formatdatetime": { "label": "FormatDateTime", "type": "VBSCRIPT_FUNCTION"},
      "formatnumber": { "label": "FormatNumber", "type": "VBSCRIPT_FUNCTION"},
      "formatpercent": { "label": "FormatPercent", "type": "VBSCRIPT_FUNCTION"},
      "getlocale": { "label": "GetLocale", "type": "VBSCRIPT_FUNCTION"},
      "getobject": { "label": "GetObject", "type": "VBSCRIPT_FUNCTION"},
      "getref": { "label": "GetRef", "type": "VBSCRIPT_FUNCTION"},
      "hex": { "label": "Hex", "type": "VBSCRIPT_FUNCTION"},
      "hour": { "label": "Hour", "type": "VBSCRIPT_FUNCTION"},
      "inputbox": { "label": "InputBox", "type": "VBSCRIPT_FUNCTION"},
      "instr": { "label": "InStr", "type": "VBSCRIPT_FUNCTION"},
      "instrrev": { "label": "InStrRev", "type": "VBSCRIPT_FUNCTION"},
      "int, fix": { "label": "Int, Fix", "type": "VBSCRIPT_FUNCTION"},
      "isarray": { "label": "IsArray", "type": "VBSCRIPT_FUNCTION"},
      "isdate": { "label": "IsDate", "type": "VBSCRIPT_FUNCTION"},
      "isempty": { "label": "IsEmpty", "type": "VBSCRIPT_FUNCTION"},
      "isnull": { "label": "IsNull", "type": "VBSCRIPT_FUNCTION"},
      "isnumeric": { "label": "IsNumeric", "type": "VBSCRIPT_FUNCTION"},
      "isobject": { "label": "IsObject", "type": "VBSCRIPT_FUNCTION"},
      "join": { "label": "Join", "type": "VBSCRIPT_FUNCTION"},
      "lbound": { "label": "LBound", "type": "VBSCRIPT_FUNCTION"},
      "lcase": { "label": "LCase", "type": "VBSCRIPT_FUNCTION"},
      "left": { "label": "Left", "type": "VBSCRIPT_FUNCTION"},
      "len": { "label": "Len", "type": "VBSCRIPT_FUNCTION"},
      "loadpicture": { "label": "LoadPicture", "type": "VBSCRIPT_FUNCTION"},
      "log": { "label": "Log", "type": "VBSCRIPT_FUNCTION"},
      "ltrim": { "label": "LTrim", "type": "VBSCRIPT_FUNCTION"},
      "maths": { "label": "Maths", "type": "VBSCRIPT_FUNCTION"},
      "mid": { "label": "Mid", "type": "VBSCRIPT_FUNCTION"},
      "minute": { "label": "Minute", "type": "VBSCRIPT_FUNCTION"},
      "month": { "label": "Month", "type": "VBSCRIPT_FUNCTION"},
      "monthname": { "label": "MonthName", "type": "VBSCRIPT_FUNCTION"},
      "msgbox": { "label": "MsgBox", "type": "VBSCRIPT_FUNCTION"},
      "now": { "label": "Now", "type": "VBSCRIPT_FUNCTION"},
      "oct": { "label": "Oct", "type": "VBSCRIPT_FUNCTION"},
      "replace": { "label": "Replace", "type": "VBSCRIPT_FUNCTION"},
      "rgb": { "label": "RGB", "type": "VBSCRIPT_FUNCTION"},
      "right": { "label": "Right", "type": "VBSCRIPT_FUNCTION"},
      "rnd": { "label": "Rnd", "type": "VBSCRIPT_FUNCTION"},
      "round": { "label": "Round", "type": "VBSCRIPT_FUNCTION"},
      "rtrim": { "label": "RTrim", "type": "VBSCRIPT_FUNCTION"},
      "scriptengine": { "label": "ScriptEngine", "type": "VBSCRIPT_FUNCTION"},
      "scriptenginebuildversion": { "label": "ScriptEngineBuildVersion", "type": "VBSCRIPT_FUNCTION"},
      "scriptenginemajorversion": { "label": "ScriptEngineMajorVersion", "type": "VBSCRIPT_FUNCTION"},
      "scriptengineminorversion": { "label": "ScriptEngineMinorVersion", "type": "VBSCRIPT_FUNCTION"},
      "second": { "label": "Second", "type": "VBSCRIPT_FUNCTION"},
      "setlocale": { "label": "SetLocale", "type": "VBSCRIPT_FUNCTION"},
      "sgn": { "label": "Sgn", "type": "VBSCRIPT_FUNCTION"},
      "sin": { "label": "Sin", "type": "VBSCRIPT_FUNCTION"},
      "space": { "label": "Space", "type": "VBSCRIPT_FUNCTION"},
      "split": { "label": "Split", "type": "VBSCRIPT_FUNCTION"},
      "sqr": { "label": "Sqr", "type": "VBSCRIPT_FUNCTION"},
      "strcomp": { "label": "StrComp", "type": "VBSCRIPT_FUNCTION"},
      "string": { "label": "String", "type": "VBSCRIPT_FUNCTION"},
      "strreverse": { "label": "StrReverse", "type": "VBSCRIPT_FUNCTION"},
      "tan": { "label": "Tan", "type": "VBSCRIPT_FUNCTION"},
      "time": { "label": "Time", "type": "VBSCRIPT_FUNCTION"},
      "timer": { "label": "Timer", "type": "VBSCRIPT_FUNCTION"},
      "timeserial": { "label": "TimeSerial", "type": "VBSCRIPT_FUNCTION"},
      "timevalue": { "label": "TimeValue", "type": "VBSCRIPT_FUNCTION"},
      "trim": { "label": "Trim", "type": "VBSCRIPT_FUNCTION"},
      "typename": { "label": "TypeName", "type": "VBSCRIPT_FUNCTION"},
      "ubound": { "label": "UBound", "type": "VBSCRIPT_FUNCTION"},
      "ucase": { "label": "UCase", "type": "VBSCRIPT_FUNCTION"},
      "unescape": { "label": "Unescape", "type": "VBSCRIPT_FUNCTION"},
      "vartype": { "label": "VarType", "type": "VBSCRIPT_FUNCTION"},
      "weekday": { "label": "Weekday", "type": "VBSCRIPT_FUNCTION"},
      "weekdayname": { "label": "WeekdayName", "type": "VBSCRIPT_FUNCTION"},
      "year": { "label": "Year", "type": "VBSCRIPT_FUNCTION"},
      "vbcr": { "label": "vbCr", "type": "VBSCRIPT_CONSTANT_STRING"},
      "vbcrlf": { "label": "VbCrLf", "type": "VBSCRIPT_CONSTANT_STRING"},
      "vbformfeed": { "label": "vbFormFeed", "type": "VBSCRIPT_CONSTANT_STRING"},
      "vblf": { "label": "vbLf", "type": "VBSCRIPT_CONSTANT_STRING"},
      "vbnewline": { "label": "vbNewLine", "type": "VBSCRIPT_CONSTANT_STRING"},
      "vbnullchar": { "label": "vbNullChar", "type": "VBSCRIPT_CONSTANT_STRING"},
      "vbnullstring": { "label": "vbNullString", "type": "VBSCRIPT_CONSTANT_STRING"},
      "vbtab": { "label": "vbTab", "type": "VBSCRIPT_CONSTANT_STRING"},
      "vbverticaltab": { "label": "vbVerticalTab", "type": "VBSCRIPT_CONSTANT_STRING"},
      "vbempty": { "label": "vbEmpty", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbnull": { "label": "vbNull", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbinteger": { "label": "vbInteger", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vblong": { "label": "vbLong", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbsingle": { "label": "vbSingle", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbdouble": { "label": "vbDouble", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbcurrency": { "label": "vbCurrency", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbdate": { "label": "vbDate", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbstring": { "label": "vbString", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbobject": { "label": "vbObject", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vberror": { "label": "vbError", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbboolean": { "label": "vbBoolean", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbvariant": { "label": "vbVariant", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbdataobject": { "label": "vbDataObject", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbdecimal": { "label": "vbDecimal", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbbyte": { "label": "vbByte", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbarray": { "label": "vbArray", "type": "VBSCRIPT_CONSTANT_VARTYPE"},
      "vbusedefault": { "label": "vbUseDefault", "type": "VBSCRIPT_CONSTANT_TRISTATE"},
      "vbtrue": { "label": "vbTrue", "type": "VBSCRIPT_CONSTANT_TRISTATE"},
      "vbfalse": { "label": "vbFalse", "type": "VBSCRIPT_CONSTANT_TRISTATE"},
      "vbokonly": { "label": "vbOKOnly", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbokcancel": { "label": "vbOKCancel", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbabortretryignore": { "label": "vbAbortRetryIgnore", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbyesnocancel": { "label": "vbYesNoCancel", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbyesno": { "label": "vbYesNo", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbretrycancel": { "label": "vbRetryCancel", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbcritical": { "label": "vbCritical", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbquestion": { "label": "vbQuestion", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbexclamation": { "label": "vbExclamation", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbinformation": { "label": "vbInformation", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbdefaultbutton1": { "label": "vbDefaultButton1", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbdefaultbutton2": { "label": "vbDefaultButton2", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbdefaultbutton3": { "label": "vbDefaultButton3", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbdefaultbutton4": { "label": "vbDefaultButton4", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbapplicationmodal": { "label": "vbApplicationModal", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbsystemmodal": { "label": "vbSystemModal", "type": "VBSCRIPT_CONSTANT_MSGBOX"},
      "vbok": { "label": "vbOK", "type": "VBSCRIPT_CONSTANT_MSGBOX_RETVAL"},
      "vbcancel": { "label": "vbCancel", "type": "VBSCRIPT_CONSTANT_MSGBOX_RETVAL"},
      "vbabort": { "label": "vbAbort", "type": "VBSCRIPT_CONSTANT_MSGBOX_RETVAL"},
      "vbretry": { "label": "vbRetry", "type": "VBSCRIPT_CONSTANT_MSGBOX_RETVAL"},
      "vbignore": { "label": "vbIgnore", "type": "VBSCRIPT_CONSTANT_MSGBOX_RETVAL"},
      "vbyes": { "label": "vbYes", "type": "VBSCRIPT_CONSTANT_MSGBOX_RETVAL"},
      "vbno": { "label": "vbNo", "type": "VBSCRIPT_CONSTANT_MSGBOX_RETVAL"},
      "vbobjecterror": { "label": "vbObjectError", "type": "VBSCRIPT_CONSTANT_ERROR"},
      "vbgeneraldate": { "label": "vbGeneralDate", "type": "VBSCRIPT_CONSTANT_DATEFORMAT"},
      "vblongdate": { "label": "vbLongDate", "type": "VBSCRIPT_CONSTANT_DATEFORMAT"},
      "vbshortdate": { "label": "vbShortDate", "type": "VBSCRIPT_CONSTANT_DATEFORMAT"},
      "vblongtime": { "label": "vbLongTime", "type": "VBSCRIPT_CONSTANT_DATEFORMAT"},
      "vbshorttime": { "label": "vbShortTime", "type": "VBSCRIPT_CONSTANT_DATEFORMAT"},
      "vbbinarycompare": { "label": "vbBinaryCompare", "type": "VBSCRIPT_CONSTANT_COMPARE"},
      "vbtextcompare": { "label": "vbTextCompare", "type": "VBSCRIPT_CONSTANT_COMPARE"},
      "vbblack": { "label": "vbBlack", "type": "VBSCRIPT_CONSTANT_COLOR"},
      "vbred": { "label": "vbRed", "type": "VBSCRIPT_CONSTANT_COLOR"},
      "vbgreen": { "label": "vbGreen", "type": "VBSCRIPT_CONSTANT_COLOR"},
      "vbyellow": { "label": "vbYellow", "type": "VBSCRIPT_CONSTANT_COLOR"},
      "vbblue": { "label": "vbBlue", "type": "VBSCRIPT_CONSTANT_COLOR"},
      "vbmagenta": { "label": "vbMagenta", "type": "VBSCRIPT_CONSTANT_COLOR"},
      "vbcyan": { "label": "vbCyan", "type": "VBSCRIPT_CONSTANT_COLOR"},
      "vbwhite": { "label": "vbWhite", "type": "VBSCRIPT_CONSTANT_COLOR"},
    },
    source = options.source || '',
    lastParsedToken = '',
    lastNonWSParsedToken = '',
    pushToken = function vbsparser_pushToken(token, tokenType) {
      tokens.push(token);
      tokenTypes.push(tokenType);
      lastParsedToken = tokenType;
      if (tokenType === 'WHITESPACE' || tokenType === 'NEWLINE')
        lastNonWSParsedToken = tokenType;
    };


  //Lexical Analysis
  (function vbsparser_tokenizer() {
    var
      index = 0,
      bLength = source.length,
      buffer = options.source.split(''),
      n = 0,
      isSpace = function vbsparser_tokenizer_isSpace(char) {
        return (char === ' ' || char === '\t' || char === '\f' || char ===
          '\v');
      },
      isEOLorEOF = function vbsparser_tokenizer_isEOLorEOF(char) {
        char = char || buffer[index];
        if (char === -1) return true;
        if (char === '\r' && nextChar() === '\n') {
          return true;
        }
        if (char === '\n') return true;
        return false;
      },
      isAlphaNumeric = function vbsparser_tokenizer_isAlphaNumeric(char) {
        return char !== -1 && /[a-zA-Z0-9_]/.test(char);
      },
      isDigit = function vbsparser_tokenizer_isDigit(char) {
        return /[0-9]/.test(char);
      },
      read = function vbsparser_tokenizer_read(length) {
        var str = '';
        length = length || 1;
        if (index + length > bLength) {
          return -1;
        }
        str = buffer.slice(index, index + length).join('');
        index += length;
        return str;
      },
      currentChar = function vbsparser_tokenizer_currentChar() {
        return (index >= 0 && index < bLength) ? buffer[index] : -1;
      },
      charAt = function vbsparser_tokenizer_charAt(chrIndex) {
        if (chrIndex >= 0 && chrIndex < bLength) {
          return buffer[chrIndex]
        }
        return -1;
      },
      prevChar = function vbsparser_tokenizer_prevChar() {
        if (index - 1 >= 0 && bLength > 0) {
          return -1;
        }
        return buffer[index - 1]
      },
      nextChar = function vbsparser_tokenizer_nextChar() {
        if (index + 1 >= bLength) {
          return -1;
        }
        return buffer[index + 1]
      },
      readTill = function vbsparser_tokenizer_readTill(fn) {
        var n = 0,
          str = '',
          peeked;

        while ((peeked = charAt(index + n)) !== -1 && !(isEOLorEOF(peeked)) &&
          fn(peeked, buffer, index)) {
          n++;
        }
        if (n === 0) return '';
        str = read(n);
        return str;
      },
      readSpace = function vbsparser_tokenizer_readSpace() {
        return readTill(function(char) {
          return isSpace(char);
        });
      },
      readNextWord = function vbsparser_tokenizer_readNextWord() {
        var ch,
          str = '';
        //n = 0;
        do {
          ch = charAt(index + n++);
        } while (isSpace(ch) || ch === '_' || ch === '\r' || ch === '\n');
        n--;
        if (n === 0) {
          return '';
        }
        while (isAlphaNumeric(ch = charAt(index + n++))) {
          str += ch;
        }
        n--;
        return str;
      },
      readString = function vbsparser_tokenizer_readString() {
        var n = 1,
          str = '',
          peeked;

        while ((peeked = charAt(index + n)) !== -1 && !(isEOLorEOF(peeked))) {
          if(peeked !== '\"'){
            str += peeked;
          } else if (charAt(index + n + 1) === '\"') {
            n++;
          } else {
            n++;
            break;
          }
          n++;
        }
        if (n === 0) return '';
        str = read(n);
        return str;
      },
      readLine = function vbsparser_tokenizer_readLine() {
        return readTill(function(char) {
          return !isEOLorEOF(char);
        });
      },
      readAlphaNumeric = function vbsparser_tokenizer_readAlphaNumeric() {
        return readTill(function(char) {
          return isAlphaNumeric(char);
        });
      },
      readNumber = function vbsparser_tokenizer_readNumber() {
        var str = '';

        str += readTill(function(chr) {
          return isDigit(chr);
        });

        if (currentChar() === '.') str += read();

        if (str.length === 0) return '';
        str += readTill(function(chr) {
          return isDigit(chr);
        });

        if (currentChar() === 'e' || currentChar() === 'E') {
          str += read();
          if (currentChar() === '+' || currentChar() === '-') str += read();
          str += readTill(function(chr) {
            return isDigit(chr);
          });
        }
        return str;
      };

    var
      curChar,
      nextChr,
      ch,
      word;

    while ((ch = currentChar()) !== -1) {
      word = '';
      switch (ch) {
        /*case '~':
        case ';':
        case '?':
        case '|':
        case '`':
        case '!':
        case '{':
        case '}':
            pushToken(ch, UNKNOWN);
            break;*/
        case '\t':
        case '\v':
        case ' ':
        case '\f':
          pushToken(readSpace(), 'WHITESPACE');
          break;
        case '(':
          pushToken(read(), 'OPEN_BRACKET');
          break;
        case ')':
          pushToken(read(), 'CLOSE_BRACKET');
          break;
        case '\"':
          pushToken(readString(), 'STRING');
          break;
        case '\'':

          pushToken(readLine(), 'COMMENT');
          break;
        case '#':
          read();
          word = '#' + readTill(function(char) {
            return char !== '#';
          }) + '#';
          read();
          pushToken(word, 'DATE');
          break;
        case '[':
          word = readTill(function(char) {
            return char !== ']';
          }) + "]";
          read();
          pushToken(word, 'IDENTIFIER');
          break;
        case '_':
          pushToken(read(), 'STATEMENT_CONTINUATION');
          break;
        case ':':
          pushToken(read(), 'STATEMENT_SEPARATOR');
          break;
        case '@':
          if (nextChar() === '@') pushToken(readLine(), 'COMMENT');
          else pushToken(read(), 'UNKNOWN');
          break;
        case '+':
        case '^':
        case '%':
        case '-':
        case '*':
        case '/':
        case '\\':
        case '=':
          pushToken(read(), 'ARTHMETIC_OPERATOR');
          break;
        case '<':
          nextChr = nextChar();

          if (nextChr === '>') {
            pushToken(read(2), 'COMPARISON_OPERATOR');
          } else if (nextChr === '=') {
            pushToken(read(2), 'COMPARISON_OPERATOR');
          } else {
            pushToken(read(), 'COMPARISON_OPERATOR');
          }

          break;
        case '>':
          nextChr = nextChar();

          if (nextChr === '=') {
            pushToken(read(2), 'COMPARISON_OPERATOR');
          } else {
            pushToken(read(), 'COMPARISON_OPERATOR');
          }

          break;
        case '&':
          nextChr = nextChar();

          if (nextChr === 'H' || nextChr === 'h') {
            //this is a hexa decimal value
            pushToken(read() + readAlphaNumeric(), 'HEXNUMBER');
          } else {
            pushToken(read(), 'ARTHMETIC_OPERATOR');
          }

          break;
        case '.':
          nextChr = nextChar();

          if (isDigit(nextChr)) {
            pushToken(readNumber(), 'NUMBER');
          } else {
            //record dot operator
            pushToken(read(), 'DOT_OPERATOR');
          }
          break;
        case '\r':
          if (nextChar() === '\n') {
            pushToken(read(2), 'NEWLINE');
          } else {
            pushToken(read(), 'NEWLINE');
          }

          break;
        case '\n':
          pushToken(read(), 'NEWLINE');
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          pushToken(readNumber(), 'NUMBER');
          break;
        case ',':
          pushToken(read(), 'COMMA');
          break;
        default:

          if (!isAlphaNumeric(ch)) {
            pushToken(read(), 'INVALID');
            continue;
          }

          word = readAlphaNumeric();
          n = 0;

          if (lastNonWSParsedToken !== 'DOT_OPERATOR' && tokenTable[word.toLowerCase()] !== undefined) {

            switch (word.toLowerCase()) {
              case 'do':
                nextWord = readNextWord().toLowerCase();

                if (nextWord === 'while') {
                  read(n);
                  pushToken('Do While', 'DO_LOOP_START_WHILE');
                } else if (nextWord === 'until') {
                  read(n);
                  pushToken('Do Until', 'DO_LOOP_START_UNTIL');
                } else {
                  pushToken(tokenTable[word.toLowerCase()].label, tokenTable[word.toLowerCase()].type);
                }

                break;
              case 'loop':
                nextWord = readNextWord().toLowerCase();

                if (nextWord === 'while') {
                  read(n);
                  pushToken('Loop While', 'DO_LOOP_END_WHILE');
                } else if (nextWord === 'until') {
                  read(n);
                  pushToken('Loop Until', 'DO_LOOP_END_UNTIL');
                }else {
                  pushToken('Loop', 'DO_LOOP_END');
                }

                break;
              case 'for':
                nextWord = readNextWord();

                if (nextWord.toLowerCase() === 'each') {
                  read(n);
                  pushToken('For Each', 'FOR_EACHLOOP');
                } else {
                  pushToken(tokenTable[word.toLowerCase()].label, tokenTable[word.toLowerCase()].type);
                }

                break;
              case 'on':
                nextWord = readNextWord();

                if (nextWord.toLowerCase() === 'error') {
                  nextWord1 = readNextWord().toLowerCase();
                  nextWord2 = readNextWord().toLowerCase();

                  if (nextWord1 === 'resume' && nextWord2 === 'next') {
                    read(n);
                    pushToken('On Error Resume Next',
                      'ON_ERROR_RESUME_NEXT');
                  } else if (nextWord1 === 'goto' && nextWord2 === '0') {
                    read(n);
                    pushToken('On Error GoTo 0', 'ON_ERROR_GOTO_0');
                  } else {
                    pushToken(tokenTable[word.toLowerCase()].label, tokenTable[word.toLowerCase()].type);
                  }
                }

                break;
              case 'case':
                nextWord = readNextWord();

                if (nextWord.toLowerCase() === 'else') {
                  read(n);
                  pushToken('Case Else', 'CASE_ELSE');
                } else {
                  pushToken(tokenTable[word.toLowerCase()].label, tokenTable[word.toLowerCase()].type);
                }

                break;
              case 'select':
                nextWord = readNextWord();

                if (nextWord.toLowerCase() === 'case') {
                  read(n);
                  pushToken('Select Case', 'SELECT_CASE');
                } else {
                  pushToken(tokenTable[word.toLowerCase()].label, tokenTable[word.toLowerCase()].type);
                }

                break;
              case 'end':
                nextWord = readNextWord();

                switch (nextWord.toLowerCase()) {
                  case 'function':
                    read(n);
                    pushToken('End Function', 'END_FUNCTION');

                    break;
                  case 'class':
                    read(n);
                    pushToken('End Class', 'END_CLASS');
                    break;
                  case 'sub':
                    read(n);
                    pushToken('End Sub', 'END_SUB');

                    break;
                  case 'property':
                    read(n);
                    pushToken('End Property', 'END_PROPERTY');

                    break;
                  case 'if':
                    read(n);
                    pushToken('End If', 'END_IF');

                    break;
                  case 'with':
                    read(n);
                    pushToken('End With', 'END_WITH');

                    break;
                  case 'select':
                    read(n);
                    pushToken('End Select', 'END_SELECT');

                    break;
                  default:
                    pushToken(tokenTable[word.toLowerCase()].label, tokenTable[word.toLowerCase()].type);

                    break;
                }
                break;
              case 'exit':
                nextWord = readNextWord();

                switch (nextWord.toLowerCase()) {
                  case 'function':
                    read(n);
                    pushToken('Exit Function', 'EXIT_FUNCTION');

                    break;
                  case 'for':
                    read(n);
                    pushToken('Exit For', 'EXIT_FOR');

                    break;
                  case 'do':
                    read(n);
                    pushToken('Exit Do', 'EXIT_DO');

                    break;
                  case 'property':
                    read(n);
                    pushToken('Exit Property', 'EXIT_PROPERTY');

                    break;
                  case 'sub':
                    read(n);
                    pushToken('Exit Sub', 'EXIT_SUB');

                    break;
                  default:
                    pushToken(tokenTable[word.toLowerCase()].label, tokenTable[word.toLowerCase()].type);
                    break;
                }

                break;
              default:
                pushToken(tokenTable[word.toLowerCase()].label, tokenTable[word.toLowerCase()].type);
                break;
            }
          } else {
            /*switch (word.toUpperCase()) {
                            case 'REM':
                                pushToken(word + readLine(), 'COMMENT');
                                break;
                            default:*/
            pushToken(word, 'UNKNOWN');
            /*break;
                        }*/
          }

          break;
      }
    }

    pushToken(null, 'EOF');
  })();
  //Syntatic Analysis
  (function vbsparser_analizer() {
    var
      i = 0,
      lTokens = tokens.length,
      n = 0,
      curToken = null,
      curTokenType = null,
      nextToken = null,
      skipToToken = function vbsparser_analizer_skipToToken(tokenType) {

        while (n < lTokens && tokenTypes[++n] !== tokenType);
      },
      skipToEndOfStatement = function vbsparser_analizer_skipToEndOfStatement(fn) {
        var
          bIgnoreNewLine = false,
          tokenType = null;

        while (n < lTokens) {
          tokenType = tokenTypes[++n];
          switch (tokenType) {
            case 'STATEMENT_SEPARATOR':
              if (options.breakOnSeperator) return;
              break;
            case 'NEWLINE':
              if (bIgnoreNewLine) {
                bIgnoreNewLine = false;
                break;
              }
              return;
            case 'STATEMENT_CONTINUATION':
              bIgnoreNewLine = true;
              break;
            default:
              break;
          }
          if (fn) {
            fn(tokenType);
          }
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
      }

      n = i;

      switch (curTokenType) {
        case 'IF':
          skipToToken('THEN')
          while (tokenTypes[++n] !== 'NEWLINE') {
            if (!(tokenTypes[n] === 'WHITESPACE' || tokenTypes[n] ===
                'COMMENT')) {
              tokenTypes[i] = 'IF_ELSE_ONE_LINE';
              break;
            }
          }
          break;
        case 'DIM':
          skipToEndOfStatement(function(t) {
            if (t === 'UNKNOWN') {
              tokenTypes[n] = 'VARIABLE_NAME';
            }
          });

          break;
        case 'CLASS':
          skipToToken('UNKNOWN');

          tokenTypes[n] = 'CLASS_NAME';

          break;
        case 'REDIM':
          skipToEndOfStatement(function(t) {
            if (t === 'UNKNOWN') {
              tokenTypes[n] = 'VARIABLE_NAME';
            }
          });

          break;
        case 'CONST':
          skipToEndOfStatement(function(t) {
            if (t === 'UNKNOWN') {
              tokenTypes[n] = 'CONST_VARIABLE_NAME';
            }
          });

          break;
        default:
          break;
      }

      lastTokenType = tokenTypes[i];

      if (lastTokenType !== 'WHITESPACE' && lastTokenType !== 'NEWLINE') {
        lastNonWSParsedToken = lastTokenType;
      }

      if (lastNonWSParsedToken != 'WHITESPACE') {
        lastNonWSLNParsedToken = lastTokenType;
      }
    }
  })();

  return {
    tokens: tokens,
    tokenTypes: tokenTypes
  };
};
module.exports = vbsparser;
