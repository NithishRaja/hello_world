/*
 * main file for server
 *
 */

// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");

// Initiating HTTP server
const httpServer = http.createServer(function(req, res){
  serverLogic(req, res);
});

// Defining server logic
const serverLogic = function(req, res){
  // Parsing url
  const parsedUrl = url.parse(req.url, true);
  // Getting trimmed url
  const trimmedUrl = parsedUrl.pathname.replace(/^\/+|\/+$/g,"");
  console.log(trimmedUrl);
  // Getting request method
  const method = req.method;
  // Getting query
  const query = parsedUrl.query;
  // Getting headers
  const headers = req.headers;
  // Getting req body
  var buffer = "";
  var decoder = new StringDecoder("utf-8");
  // Listening to data stream
  req.on("data", function(data){
    buffer+=decoder.write(data);
  });
  // Listening to end of data stream
  req.on("end", function(){
    buffer+=decoder.end();

    // Getting the handler for the route
    var selectedHandler = typeof(routes[trimmedUrl]) == "function"?routes[trimmedUrl]: handler.notFound;
    console.log(typeof(routes[trimmedUrl]));

    // Preparing data object
    const data = {
      trimmedUrl: trimmedUrl,
      method: method,
      query: query,
      headers: headers,
      payload: buffer
    };

    // Calling selectedHandler
    selectedHandler(data, function(statusCode, payload){
      // Setting default value for status code
      statusCode = typeof(statusCode) == "number"?statusCode:200;
      // Setting default value for payload
      payload = typeof(payload) == "object"?payload:{};
      // converting payload to string
      var payloadString = JSON.stringify(payload);

      // Sending res back
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);

      // Logging the response
      console.log("response: ", statusCode, payload);
    });

  });
};

// Set port for HTTP server to listen to
httpServer.listen(config.httpPort, function(){
  console.log("server is listening to port "+config.httpPort+", press ctrl+c to exit");
});

// Initializing container for handlers
var handler = {};

// Setting handler for /hello route
handler.hello = function(data, callback){
  callback(200, {message: "hello world!!!"});
};

// Setting default handler
handler.notFound = function(data, callback){
  callback(404);
};

// Initializing container for routes
const routes = {
  "hello": handler.hello
};
