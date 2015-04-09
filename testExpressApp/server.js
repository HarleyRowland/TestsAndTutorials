var express = require('express')
var app = express()
var hbs = require('hbs');

var getNameController = require('./controllers/getNameController');
var showNameAndAgeController = require('./controllers/showNameAndAgeController')
var logMiddleware = require('./lib/logMiddleware');

app.use(logMiddleware.sayHello);
app.use(logMiddleware.whatIsMyAge);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.post('/', function(request, response){
  response.send("You have used the method POST.");
});

app.get('/sayHello', function (request, response) {
  response.send("Hello World");
});

app.get('/getName', function (request, response) {
  if(request && request.query && request.query.name) {
    response.send("Your name is " + request.query.name + ".");
  } else {
    response.send("I don't know your name.");
  }
});

app.get('/getNameModular', function (request, response) {
  getNameController(request, response);
});

app.get('/bonjour', logMiddleware.sayHelloInFrench, function (request, response) {
  response.send("Check your console.");
});

app.get('/showView', function (request, response) {
	showNameAndAgeController(request, response);
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("My test APP is listening at http://%s:%s", host, port);

});
