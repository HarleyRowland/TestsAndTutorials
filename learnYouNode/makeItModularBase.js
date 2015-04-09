// The same as you require in modules such as "http" or "path", you require in your own modules like
// this and have access to all exported functions.
var myModule = require('./makeItModularFilter');

// As only one function is exported I can just call myModule and pass in parameters. If multiple
// were exported, I would call myModule.myFunction. The function takes a directory path and an
// extension such as ".js". Also a callback function which will log out all files given to it.
myModule(process.argv[2], process.argv[3], function(err, list){
  list.forEach(function(file){
    console.log(file);
  });
});