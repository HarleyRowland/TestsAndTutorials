Being a placement student at Holiday Extras, I have only dipped my toes in the ocean of Web Development, however, one amazing piece of technology I have come across is ExpressJS. We use it largely here at Holiday Extras - I have already learnt how simple it is to do so much. So what is ExpressJS? It is a JavaScript framework which runs on Node.JS. Why would you want to use ExpressJS? Because it is simple and efficient to get brilliant results, code can be easily organised into neat modules, it is versatile - you can create whole web applications with UIs or an API to make requests to, you will have access to tons of simple to use functions to create your brand new, cutting-edge, web application and more! 

I will walk you through how to make a basic ExpressJS application step-by-step. The end result will have aspects of an API and of an application rendering a display for a requesting client.

## My Assumptions

* You will have a reasonable understanding of JavaScript and Node.JS.
* You will have already installed ExpressJS.
* You will have a basic understanding of what a templating language is for. 
* You will be making the application with me as we go through the tutorial.

## Routing

Routing is how we decide how we want our web application to react based on a certain requests. If someone makes a GET request to `www.example.com/sayHello` (this being our ExpressJS application) our route would be `/sayHello`. If the request was to `www.example.com` our route would be `/` - this is slightly different because when there is no `/myRoute` part of the request, the route itself is defaulted to just  `/`. So, now what? We need to handle requests based on route and request method (GET, POST, DELETE ect.). Start by adding the below to a JavaScript file.

```
var express = require('express')
var app = express()

app.post('/', function(request, response){
  response.send("You have used the method POST.");
});

app.post('/sayHello', function (request, response) {
  response.send("Hello World");
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("My test API listening at http://%s:%s", host, port)

});
``` 

What does the above piece of code do? `var app = express()` is how we reference our application - so `app` becomes our application as a whole. The next 2 blocks of 3-line code are how handle requests to certain routes. So if we make a POST request to `/` we will respond with "You have used the method POST.". If we make a GET request to `/sayHello` we will respond with “Hello World”. Your browser will send GET requests by default, if you want to find out how to send POST requests and other methods, look into a REST client such as Postman (a Chrome extension). Finally, the part after that is us creating a server. We are telling our application to listen on port 3000 for requests. This is how we run our application. To get your ExpressJS app up and running, you need to run the command `node pathToMyServerFile/server.js` (assuming you save the above code in a file called `server.js`. Once you have done this, go to `http://localhost:3000` `http://localhost:3000/sayHello` and see what you have made!

Remember that each time you add a peice of functionality, you have to kill your server and run `node pathToMyServerFile/server.js`. Alternatively look into the node module called “Nodemon”.

Next up is handle our parameters. `request` in the above code is a JSON object (it holds data to do with the request) and when you send a request with a query, the query is within this `request` object. So we can use `request.query.name` to get the name value in the query string. Add the next route to your `server.js` file.

```
app.get('/getName', function (request, response) {
  if(request && request.query && request.query.name) {
    response.send("Your name is " + request.query.name + ".");
  } else {
    response.send("I don't know your name.");
  }
});
```
So, the above is saying, if we have a name value in the query string, respond in this way. So now if you go to `http://localhost:3000/getName?name=Harley` you will see “Hello, my name is Harley.” and will see “I don’t know your name.” should you not pass a name in the query string.
 
Keeping code neat and understandable is important, so we don’t want to have too much logic in each route. It seems fairly pointless with the above example as it is so simple but when your code becomes more complex, modularity will become more of a necessity.

```
var express = require('express')
var app = express()
var getNameController = require('./controllers/getNameController');

app.get('/getNameModular', function (request, response) {
  getNameController(request, response);
});
```
So now, I have access to `getNameController.js`, I am going to give `request` and `response` straight to the controller and handle the logic there. 

```
module.exports = function(request, response) {
  if(request && request.query && request.query.name) {
    response.send("My name is " + request.query.name + ".");
  } else {
    response.send("I don't know your name.");
  }
};
```
You will have to add the new `getNameModular` route to your `server.js` file and then in a new file, add the controller section. I would recommend adding your code into various folders to make your codebase easy to navigate. 

I have the same logic now in the controller as I did originally in my `/getName` route. You can reply to a `request` anywhere that you have the `response` matching the `request`. The above will return the exact same result if you go to `http://localhost:3000/getNameModular?name=Harley`. 

## Middleware

Another key point of ExpressJS is middleware and the next aspect we will add to our application. Middleware are functions which run before any main functionality happens. You will receive a request to a route, the middleware will run (depending on the route and type of middleware), then you execute the code in your route. You would do this in situations such as checking a user is logged into the website or to parse cookies which the user has access to; however you can do whatever you want to here. So, you can apply middleware to all routes or to specific routes. 

```
var logMiddleware = require('./lib/logMiddleware');

app.use(logMiddleware.sayHello);
app.use(logMiddleware.whatIsMyAge);
```

`app.use` takes a function and for every request, app.use will run the function in it’s parameters, so in this case, `logMiddleware.sayHello` and `logMiddleware.whatIsMyAge` will run for every request. You cannot provide middleware functions with your own parameters because they are handed `request`, `response` and `next` by ExpressJS. `request` holds the information about the request sent by the client, `response` is a way to respond to the user and `next` is a function which must be called at the end of a middleware function to move onto the next piece of middleware.

```
module.exports = {
  sayHello: function(req, res, next) {
    console.log("Hello");
    next();
  },

  whatIsMyAge: function(request, response, next) {
    if(request && request.query && request.query.age){
      console.log(request.query.age);
    } else {
    	console.log("I don't know how old you are.")
    }
    next();
  }
};
```
Add the above first part of code the code (the `app.use` part) to your `server.js` file and make a new file for the part which holds the middleware functions. 

The two functions (`sayHello` and `whatIsMyAge`) have `next()` at the end of them. We call `next()` to move on - whether that be on to the next piece of middleware or to the functionality in the route. Now if you go to `localhost:3000` with any route and check your console, you should see your age if you decided to pass it in and “Hello”.

What if we don’t want to apply something to every route? We can give routes functions to invoke when someone makes a request to them.

```
app.get('/bonjour', logMiddleware.sayHelloInFrench, function (request, response) {
  response.send("Check your console.");
});
```

Add the above route to your `server.js` file. The above means that if we go to the `/bonjour` route, we will call `sayHelloInFrench` for this route only (and any other routes we do this for). 

```
sayHelloInFrench: function(request, response, next) {
  console.log("Bonjour");
  next();
  }
```
Add `sayHelloInFrench` to your `logMiddleware` file. This kind of middleware looks the exact same as the middleware we used in `app.use` and we could if we wanted to pass this function into `app.use` in the same way we did for the previous two middlware functions. 

## Views

I have yet to mention anything to do with user interface - you can use ExpressJS to make a rich UI. A view is the UI and will contain your HTML and your CSS.

How do we load a view? This is done the same way as we have done things in the earlier steps of this tutorial - by hitting a route. Within the routes functionality, we render a view. Before you can render a view however, you must set a view engine - this is ExpressJS’s was of you telling your app which templating language you will use. You must also tell your app where you want your views will be.

```
app.set('view engine', 'hbs');
app.set('views', __dirname + 'pathToMyViews/views');

```

You must add the above somewhere into your `server.js` file. The first line sets which templating language you want you views to use. I have chosen Handlebars.js. If you too want to use Handlebars.js, run `npm install hbs`,  and add `var hbs = require(‘hbs’);` to the top of your `server.js` file. The second line is the way your tell your ExpressJS application where it will find views. 
 
```
<!DOCTYPE html>
<html>
<body>

<h1>This is my heading</h1>

<p>{{infoString}}</p>

</body>
</html>
```
The above is Handlebars and will compile into HTML - add it into a new `.hbs` file. We can include variables passed from the function which renders the view - `infoString` is my variable passed in and you reference it by wrapping it in `{{ }}`. You can do various other functions with Handlebars too.

So now you are set load you view. We must now learn how to render our view and how to pass it variables. First add this route to your `server.js` file:

```
app.get('/showView', function (request, response) {
  showNameAndAgeController(request, response);
});
```

And then create a new controller which renders the view (remember that you must require it at the top of `server.js`). 

```
module.exports = function(request, response){
  var nameAndAge = null;
  if(request && request.query && request.query.name && request.query.age){
    nameAndAge = "Your name is " + request.query.name + " and you are " + request.query.age + " years old."
  } else {
    nameAndAge = "You did not pass in your name and age correctly. Your URL should look like 'localhost:3000/showView?name=yourName&age=yourAge'."
  }
  response.render('showNameAndAge', {
    infoString : nameAndAge
  });
};
```

So our above controller checks if name and age has been passed into the query string and depending on if it has or hasn’t, it sets a certain message in `nameAndAge`. We then `render` on our `response` object and pass in the name of our view and any variables we want to pass to our view. So once you have added the above to your new controller, go to `http://localhost:3000/showView?name=Harley&age=22` and you will see a HTML page render with the variables that you added into the query string.

## Controllers

Finally, I will speak about controllers. I have yet to come across any official explanation of a controller but I think of them as the handlers of the route. This is where the main functionality of the your application should start - whether you respond straight to your client or you call upon another function to act on the request.

I have avoided putting any logic into my routes, except for the earlier stages, I believe that the routes need to be as clear as possible to keep the path through your codebase a simple and understandable as possible. 

I have of course only touched on the very basics of what ExpressJS has to offer. There is still far, far more amazing stuff that you can accomplish with the framework and I hope that this post will start some people off in the right direction. 