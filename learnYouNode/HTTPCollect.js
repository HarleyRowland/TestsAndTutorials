var http = require('http');

http.get(process.argv[2], function(response){
  response.setEncoding('utf8');
  var dataString = "";
  // Collect data in the dataString.
  response.on("data", function(data){
    dataString = dataString + data;
  });
  response.on("error", function(e){
    console.log("ERROR!");
  });
  // The main difference with this and HTTPClient is that we collect our string to log out in one go and
  // only log out when we get an end response.
  response.on("end", function(){
    console.log(dataString.length);
    console.log(dataString);
  });
})