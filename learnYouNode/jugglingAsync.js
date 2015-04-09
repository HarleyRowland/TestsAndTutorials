var http = require('http');

// I will store the three URLs passed to the module in an array so I can loop over them more easily.
var urls = [process.argv[2], process.argv[3], process.argv[4]];
// An array to add completed strings to.
var endStrings = [];
// A count to check if all free URLs have finished sending data.
var endCount = 0;
// I am going to loop over the urls array and for each URL I am going to call my responseCounter method and
// and pass it a number which will be either 0, 1 or 2 (this will be used to assign a string to an array index
// later) and a URL which will be used in the http.get method.
for(var url in urls){
  responseCounter(url, urls[url]);
}

// Remember that there will be three instances of this function, one for each URL.
function responseCounter(count, url){
  // Make my get request to the URL passed in.
  http.get(url, function(response){
    response.setEncoding('utf8');
    var dataString = "";
    // Collect data in the dataString variable.
    response.on("data", function(data){
      dataString = dataString + data;
    });
    response.on("error", function(e){
      console.log("ERROR!");
    });
    // When we get an end message we will do this.
    response.on('end', function(){
      // Assign my dataString to a index in endStrings which will be different for each instance of this
      // function (0, 1 or 2).
      endStrings[count] = dataString;
      // Increment my end count.
      endCount++;
      // We need to wait for all three instances of response to end and when the last one does, endCount will be
      // two and the logically expression in the if statement below will pass, printing out the contents 
      // of endStrings.
      if(endCount >= 3){
        endStrings.forEach(function(element){
          console.log(element);
        });
      }
    });
  });
}