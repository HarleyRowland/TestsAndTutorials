var fs = require('fs');
var path = require('path');

// Another asyncronous method which takes a callback and puts the results of reading the directory
// in list (the elements of lists will be file names with extensions).
fs.readdir(process.argv[2], function(err, list){
  if(err) return;
  // readdir will return an array of file names with thier extensions. We will loop through the 
  // array and act on each. We will call the function once for each element in the array and file
  // will be the current element we are executing on.
  list.forEach(function(file){
    // Path.extname takes a file and returns it's extension with a "." in front of it. So we need to check if
    // it is equal the the extension we want to filter by. We must add a "." as we are only
    // given the extension such as "html" and not ".html".
    if(path.extname(file) === '.' + process.argv[3]){
      // If they are equal, log out the file.
      console.log(file);
    }
  });
});