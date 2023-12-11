# vba-formatter README
This is a VS Code extension to indent VBA and VBS files in the active text editor. As the title states, it's mainly for VBA files.

This is a fork/adaptation of VBSPretty by lenilsondc, Lenilson de Castro.
You can check out the original here: https://www.npmjs.com/package/vbspretty

I made the following modifications:
1. Adapted the .js to work insde of a VS Code extension.
2. Adjust the new line from '\r\n' to '\n'. The former was always creating new lines under comments.
3. Added logic to adapt to VBA files with headers. It will ignore the standard VBA headers and begin formatting the first line afterwards.
   
## Features

Formats VBA and VBS files.

## Requirements
VS Code v.1.85.0

## Extension Settings
None

## Known Issues
None at this time.

## Release Notes

### 0.0.1
Iniital release

### 0.0.2
Added default line start of 0 when file does not have VBA headers

**Enjoy!**
