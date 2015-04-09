var fs = require('fs');
var path = require('path');
// We are only exporting one function, so I would add my code directly inside of the module.exports block.
module.exports = function(directory, extension, callback) {
  fs.readdir(directory, function(err, data){
    // Pass the error back to the callback.
    if (err) return callback(err)
    var list = [];
    // Loop through data returned from readdir and add it into a list array if file extensions match.
    data.forEach(function(file){
      if(path.extname(file) === '.' + extension){
        // Add the current file to the list array.
        list.push(file);
      }
    });
    // If we reach this point we know that there will be no error. So set the first parameter to null,
    // which represents an error in callback convention. Then give callback the list array which will
    // contain only values which we want to print out. The callback will print out all the files in
    // the array. Remembering the callback is set in makeItModularBase.js.
    callback(null, list);
  });
};
