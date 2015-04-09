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