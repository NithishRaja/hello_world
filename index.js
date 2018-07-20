/*
 * main file for server
 *
 */

// Dependencies
const http = require("http");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;

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

  });
};

// Set port for HTTP server to listen to
httpServer.listen(80, function(){
  console.log("server is listening to port 80, press ctrl+c to exits");
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
