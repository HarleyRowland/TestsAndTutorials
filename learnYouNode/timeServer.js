var net = require('net');
// We create a server and pass it a callback. This callback will occur everytime a request 
// is sent to the port the server is told to listen on.
var server = net.createServer(function (socket) {
  // Get the current date and select all of the information we need.
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth()+1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  // We need to add a 0 onto the numbers which could be a single digit. For example,
  // we need a 4 to be 04. The below does this. Look into the .splice function of 
  // Javascript if this is confusing.
  if(month < 10) month = ("0" + month).slice(-2);
  if(day < 10) day = ("0" + day).slice(-2);
  // Put the date into the correct format.
  var dateFormat = year + "-" + month + "-" + day + " " + hours + ":" + minutes + "\n";
  // Respond to the request by ending connection and passing the string as a parameter.
  // This responds before ending.
  socket.end(dateFormat);
});

// The server defined above will listen on whichever port is in process.argv[2] and run the
// callback defined above when it receives a request.
server.listen(process.argv[2]);