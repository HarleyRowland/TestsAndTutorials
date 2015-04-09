module.exports = {
  sayHello: function(request, response, next) {
    console.log("Hello");
    next();
  },

  whatIsMyAge: function(request, response, next) {
    if(request && request.query && request.query.age){
      console.log("You are " + request.query.age +".");
    } else {
      console.log("I don't know how old you are.")
    }
    next();
  },

  sayHelloInFrench: function(request, response, next) {
    console.log("Bonjour");
    next();
  }
};