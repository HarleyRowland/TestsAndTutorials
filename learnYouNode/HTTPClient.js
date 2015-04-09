var http = require('http');
// Make a GET request to a URL. The URL we want to request to is in process.argv[2]. Once we get a 
// response execute the callback passing in the response (this callback does not follow normal convention). 
http.get(process.argv[2], function(response){
  // We set the encoding so we don't have to call toString on our response.
  response.setEncoding('utf8');
  // If the response is data (the response will know) console.log the data out.
  response.on("data", console.log);
  // If the response is an error, log out "ERROR!"
  response.on("error", function(e){
    console.log("ERROR!");
  });
});