/*
 * main file for server
 *
 */

// Dependencies
const http = require("http");

// initiating HTTP server
const httpServer = http.createServer(function(req, res){
  serverLogic(req, res);
});

// defining server logic
const serverLogic = function(req, res){

};

// set port for HTTP server to listen to
httpServer.listen(80, function(){
  console.log("server is listening to port 80, press ctrl+c to exits");
});
