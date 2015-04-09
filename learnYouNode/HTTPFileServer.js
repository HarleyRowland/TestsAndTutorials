var fs = require('fs');
var http = require('http');
// Rather than sending lots of invidual messages, we can open a pipe and stream uninterupted 
// data down it. We create a http server. Both request and response can be used in pipes.
server = http.createServer(function(request, response) {
  // We create a stream of data which reads from a file and then sends it all to the response,
  // which is how we respond to a request using pipes.
  fs.createReadStream(process.argv[3]).pipe(response);
});

// The server defined above will listen on whichever port is in process.argv[2] and run the
// callback defined above.
server.listen(process.argv[2]);