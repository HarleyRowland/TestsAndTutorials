var url = require('url');
var http = require('http');

server = http.createServer(function(request, response) {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  // We can use the parse method in the url module to get some useful information about the request.
  var requestInfo = url.parse(request.url, true);
  // I have set responseString to "error" because if it gets into either of the below if statements, 
  // it will change and if it doesn't, something is obviously wrong, so the string will not be changed
  // and will therefore still be "error".
  var responseString = "error";
  // In the query part of the requestInfo object is a list of key-value pairs (although there is
  // only one in this request). These pairs are what is passed in the query part of the URL.
  // I have taken the value of the key iso and stored it in timeString.
  var timeString = requestInfo.query.iso;
  // I converted the ISO time to javascript time which is easier to work with as we can use more
  // popular javascript methods on it. ISO is the International Standard Date and Time Notation 
  // and an example of it is: 2015-03-18T18:09:48.697Z.
  var date = new Date(timeString);
  // The below means that if our pathname is /api/parsetime we will get into this if statement. This pathname
  // will ignore the domain name, so any request from any website would get into this if statement if it
  // has this path. www.google.com/api/parsetime would work and so would www.example.com/api/parsetime.
  if(requestInfo.pathname == '/api/parsetime'){
    // I take the data that I want from the date object and put it in JSON format, setting it to 
    // responseString and replacing "error".
    responseString = {
      "hour": date.getHours(),
      "minute": date.getMinutes(),
      "second": date.getSeconds()
    };
  }

  if(requestInfo.pathname == '/api/unixtime'){
    // I can do the following because Unix time will be returned when I call getTime() on an date object. Unix
    // time is how much time in seconds has elapsed since Thursday, 1st January 1970.
    responseString = {
      "unixtime" : date.getTime()
    }
  }
  // We must convert the JSON to a string as the response.end will only take a string or a buffer.
  response.end(JSON.stringify(responseString));
});

server.listen(process.argv[2]);