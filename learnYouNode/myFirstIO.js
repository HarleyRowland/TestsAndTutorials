// This gives us access to the node module fs and all of its exported functions.
var fs = require('fs');
// This reads a file synchronously. Synchronously means that the code will wait for a function to return
// a value before continuing to execute code.
var fileContentBuffer = fs.readFileSync(process.argv[2]);
// As the above fs function returns a buffer we must convert it to a string. This way we can more
// effectively work on it.
var fileContent = fileContentBuffer.toString();
// We know that the file we read from is going to have a new line after every line from the first line
// to the second to last line. So if we split the string by new line which is represented by "\n" we
// get an array with the contents of each line in its own index in the array.
var fileLinesArray = fileContent.split("\n");
// As there is one less new line than there are lines (as the final line doesn't have a "\n" at the end),
// we log out the length of the array minus 1.
console.log(fileLinesArray.length-1);