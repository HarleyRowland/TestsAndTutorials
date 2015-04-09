var fs = require('fs');
// This method is asynchronous, because if there was code after the readFile function, the code would continue
// to execute before the readfile method would return. So we pass in the path to our file as the first
// argument and then a callback. A callback is a function which will be executed at the end of the method or when data is ready
// (or at some other logically point such as an error occuring) and in this case, after the file passed in has been read from.
// If the file is sucessfully read from, the contents will be put in the data parameter, this is what would 
// be returned if this was a synchronous function. If the file isn't able to be read from, err will not be null. 
// The point of a callback is to say that we want to execute the code in the callback function when the data 
// (or error) is ready.
fs.readFile(process.argv[2], function(err, data){
  //if error is set break out of function.
  if (err) return;
  //below here is the same code (nearly) as in myFirstIO.js function.
  var fileContent = data.toString();

  var fileLinesArray = fileContent.split("\n");

  console.log(fileLinesArray.length-1);
});
