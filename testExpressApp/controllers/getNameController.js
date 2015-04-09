module.exports = function(request, response) {
  if(request && request.query && request.query.name) {
    response.send("My name is " + request.query.name + ".");
  } else {
    response.send("I don't know your name.");
  }
};
