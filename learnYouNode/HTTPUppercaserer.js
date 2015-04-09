var map = require('through2-map');
var http = require('http');

server = http.createServer(function(request, response) {
  // End current request stream if method isn't POST.
  if (request.method != 'POST') return response.end('Post requests only please.');
  // The map function will take data in, alter it in a certain way and then return it.
  // So we pipe in the request, alter it using the map function and pipe out the response.
  request.pipe(map(function (input) {
    // So for each input, it will convert to a string and then make it uppercase.
    // It will then return the input to be piped out to response.
    return input.toString().toUpperCase();
  })).pipe(response);
});

server.listen(process.argv[2]);